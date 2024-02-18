import UserSchema from "../models/UserSchema.js";
import VideoSchema from "../models/VideoSchema.js";
import { createError } from "../Util/error.js";

export const update = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      //----------------to update any usr info------------------
      const updateUser = await UserSchema.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true } // needed to show current user
      );
      res.status(200).json(updateUser);
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only update your acc"));
  }
};
export const deleteUser = async (req, res, next) => {
  if (req.params.id === req.user.id) {
    try {
      //----------------to update any usr info------------------
      await UserSchema.findByIdAndDelete(req.params.id);
      res.status(200).json("User Deleted........");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only Delete your acc"));
  }
};
export const get = async (req, res, next) => {
  try {
    const requiredUser = await UserSchema.findById(req.params.id);
    res.status(200).json(requiredUser);
  } catch (error) {
    next(error);
  }
};
export const subscribe = async (req, res, next) => {
  if (req.user.id !== req.params.channelid) {
    try {
      await UserSchema.findByIdAndUpdate(req.user.id, {
        $push: { subscribedUsers: req.params.channelid },
      });
      await UserSchema.findByIdAndUpdate(req.params.channelid, {
        $inc: { subscribers: 1 },
      });

      res.status(200).json("Subscribed...!!!!!!!!");
    } catch (error) {
      next(error);
    }
  } else {
    next(createError(403, "You can only subscribe to others"));
  }
};
export const unsubscribe = async (req, res, next) => {
  try {
    await UserSchema.findByIdAndUpdate(req.user.id, {
      $pull: { subscribedUsers: req.params.channelid },
    });
    await UserSchema.findByIdAndUpdate(req.params.channelid, {
      $inc: { subscribers: -1 },
    });

    res.status(200).json("Unsubscribed....:(");
  } catch (error) {
    next(error);
  }
};
export const like = async (req, res, next) => {

  const id = req.user.id;
  const videoId = req.params.videoid;
  try {
    await VideoSchema.findByIdAndUpdate(videoId, {
      $addToSet: { likes: id }, // adds only onces hence use addtoSet and not push!!!!!!!!!
      $pull: { dislikes: id },
    });
    res.status(200).json("LIKED.....!!!!!!!");
  } catch (error) {
    next(error);
  }
};
export const dislike = async (req, res, next) => {
  const id = req.user.id;
  const videoId = req.params.videoid;
  try {
    await VideoSchema.findByIdAndUpdate(videoId, {
      $addToSet: { dislikes: id }, // adds only onces hence use addtoSet and not push!!!!!!!!!
      $pull: { likes: id },
    });

    res.status(200).json("DisLiked.....((((");
  } catch (error) {
    next(error);
  }
};
