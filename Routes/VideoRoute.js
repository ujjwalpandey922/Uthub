import express from "express";
import { addVideo, deleteVideo, editVideo, findVideo, random, search, subs, tags, trend } from "../Controller/VideoController.js";
import { VerifyToken } from "../Util/verifyToken.js";

const router = express.Router();

router.post("/",VerifyToken,addVideo);
router.delete("/:id", VerifyToken, deleteVideo);
router.put("/:id", VerifyToken, editVideo);
router.put("/find/:id",findVideo);
router.get("/trending",trend);
router.get("/subs", VerifyToken, subs);
router.get("/random",random);
router.get("/tags",tags);
router.get("/search",search);
// router.get("/view/:id",addView);

export default router;
