import jwt from "jsonwebtoken";
import { createError } from "./error.js";

export const VerifyToken = (req, res, next) => {

   const token = req.header("access_token");
  //  const token = req.cookies.access_token;
  if (!token) return next(createError(401, "Token Not Found..."));

  jwt.verify(token, process.env.KEY, (err, userData) => {
    if (err) return next(createError(403, "Invalid Token"));
    req.user = userData;
    next();
  });
};
