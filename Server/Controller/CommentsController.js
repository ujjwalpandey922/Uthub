import Comments from "../models/Comments.js";
import VideoSchema from "../models/VideoSchema.js";
import { createError } from "../Util/error.js";

export const addComment = async (req, res, next) => {
  // adding all the info of comment plus the logged in user
  const newComment = new Comments({ ...req.body, userId: req.user.id });
  try {
    const savedComment = await newComment.save();
    res.status(200).json(savedComment);
  } catch (error) {
    next(error);
  }
};
export const getComments = async (req, res, next) => {
  try {
    const getAll = await Comments.find({ videoId: req.params.videoId });
    res.status(200).json(getAll);
  } catch (error) {
    next(error);
  }
};
export const deleteComment = async (req, res, next) => {
  try {
    const currComment = await Comments.findById(req.params.id);
    const currVideo = await VideoSchema.findById(currComment.videoId);
    console.log(currVideo);
    if (
      req.user.id === currComment.userId ||
      currVideo.userId === req.user.id
    ) {
      await Comments.findByIdAndDelete(req.params.id);
      res.status(200).json("Comment deleted.....");
    } else {
      next(createError(403, "you can only delete your own Comment"));
    }
  } catch (error) {
    next(error);
  }
};
