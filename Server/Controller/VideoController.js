import UserSchema from "../models/UserSchema.js";
import VideoSchema from "../models/VideoSchema.js";
import { createError } from "../Util/error.js";

export const addVideo = async (req, res, next) => {
  const newVideo = new VideoSchema({ userId: req.user.id, ...req.body }); // new video will have logged in users Id
  try {
    const saveVideo = await newVideo.save(); // save video
    res.status(200).json(saveVideo);
  } catch (error) {
    next(error);
  }
};
export const deleteVideo = async (req, res, next) => {
  try {
    // checking if video exsists or not
    const video = await VideoSchema.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));
    // if user owns the video or not
    if (req.user.id === req.params.id) {
      await VideoSchema.findByIdAndDelete(req.params.id);
      res.status(200).json("Video Deleted");
    } else {
      next(createError(204, "You can only delete your video"));
    }
  } catch (error) {
    next(error);
  }
};
export const editVideo = async (req, res, next) => {
  try {
    // checking if video exsists or not
    const video = await VideoSchema.findById(req.params.id);
    if (!video) return next(createError(404, "Video not found"));

    // if user owns the video or not
    if (req.user.id === video.userId) {
      const editedVideo = await VideoSchema.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(editedVideo);
    } else {
      next(createError(204, "You can only edit your video"));
    }
  } catch (error) {
    next(error);
  }
};
export const findVideo = async (req, res, next) => {
  try {
    const foundVideo = await VideoSchema.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    if (!foundVideo) return next(createError(404, "Video Not Found"));

    res.status(200).json(foundVideo);
  } catch (error) {
    next(error);
  }
};
// export const addView = async (req, res, next) => {
//   try {
//     await VideoSchema.findByIdAndUpdate(req.params.id, {
//       $inc: { views: 1 },
//     });

//     res.status(200).json("View increased");
//   } catch (error) {
//     next(error);
//   }
// };
export const random = async (req, res, next) => {
  try {
    // give random videos from mongodb
    const foundVideos = await VideoSchema.aggregate([
      { $sample: { size: 40 } },
    ]);

    res.status(200).json(foundVideos);
  } catch (error) {
    next(error);
  }
};
export const tags = async (req, res, next) => {
  const tags = req.query.tags.split(",");
  // anything after url....?tags=a,b,c    so tags= a,b,c
  try {
    // give 20 videos from the tag array
    // $in will look inside each element of array
    const foundVideos = await VideoSchema.find({ tags: { $in: tags } }).limit(
      20
    );
    res.status(200).json(foundVideos);
  } catch (error) {
    next(error);
  }
};
export const search = async (req, res, next) => {
  //query.anything and use it as search?q=adasdnasd
  const search = req.query.q;
  try {
    // use request queries
    const foundVideos = await VideoSchema.find({
      title: { $regex: search, $options: "i" },
    }).limit(20);
    res.status(200).json(foundVideos);
  } catch (error) {
    next(error);
  }
};
export const trend = async (req, res, next) => {
  try {
    // sort to find the videos with most view
    const foundVideos = await VideoSchema.find().sort({ views: -1 });
    res.status(200).json(foundVideos);
  } catch (error) {
    next(error);
  }
};
export const subs = async (req, res, next) => {
  try {
    const user = await UserSchema.findById(req.user.id); // use this because of the middle ware verify Token
    const subsChannels = user.subscribedUsers;
    const list = await Promise.all(
      subsChannels.map((e) => VideoSchema.find({ userId: e }))
    );
    res.status(200).json(list.flat().sort((a, b) => b.createdAt - a.createdAt));
  } catch (error) {
    next(error);
  }
};
