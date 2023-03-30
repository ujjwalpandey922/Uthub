import express from "express";
import {
  deleteUser,
  dislike,
  get,
  like,
  subscribe,
  unsubscribe,
  update,
} from "../Controller/UserController.js";
import { VerifyToken } from "../Util/verifyToken.js";

const router = express.Router();

// Update User
router.put("/:id", VerifyToken, update);
// Delete User
router.delete("/:id", VerifyToken, deleteUser);
// Get User
router.get("/find/:id", get);
//subscribe a user
router.put("/sub/:channelid", VerifyToken, subscribe);
//unsubscribe a user
router.put("/unsub/:channelid", VerifyToken, unsubscribe);
//like a video
router.put("/like/:videoid", VerifyToken, like);
//dislike a video
router.put("/dislike/:videoid", VerifyToken, dislike);
export default router;
