import express from "express";
import { LogIn, SignUp } from "./../Controller/AuthController.js";
const router = express.Router();
// Router Syntax ----------->>>>      router.MethodName("/path",controllerFile);

//create user
router.post("/signup", SignUp);
// login
router.post("/login", LogIn);

//google auth
export default router;
