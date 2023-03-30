import express from "express";
import { addComment, deleteComment, getComments } from "../Controller/CommentsController.js";
import { VerifyToken } from "../Util/verifyToken.js";

const router = express.Router();

router.post("/",VerifyToken,addComment)
router.delete("/:id",VerifyToken,deleteComment)
router.get("/:videoId",getComments)
export default router;
