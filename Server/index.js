import Express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import UserRoute from "./Routes/UserRoute.js";
import VideoRoute from "./Routes/VideoRoute.js";
import CommentsRoute from "./Routes/CommentsRoute.js";
import AuthRoute from "./Routes/AuthRoute.js";
import CookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
const __dirname = path.resolve();
const app = Express(); //needed to start express server
dotenv.config(); // needed to start dot env

// database connecting function.........
const Connect = () => {
  mongoose
    .connect(process.env.MONGO)
    .then(() => {
      console.log("Connected to Db....");
    })
    .catch((err) => {
      throw err;
    });
};
// listen helps start the server any Port
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  Connect();
  console.log(`Server running on port ${PORT}`);
});

//allow application to use json from outer source
app.use(Express.json());
//cookie parser
app.use(CookieParser());
// CORS policy work around
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
// make routes and give route file to it

app.use("/api/auth", AuthRoute);
app.use("/api/users", UserRoute);
app.use("/api/videos", VideoRoute);
app.use("/api/comments", CommentsRoute);

//handle error
app.use((err, req, res, next) => {
  // err has status message etc so we seperate them......
  const status = err.status || 500;
  const message = err.message || "Something Went XXXXXX";
  return res.status(status).json({
    success: false,
    // status:status
    status,
    message,
    // stack: err.stack,//optional
  });
});

// deployment Code on Cyclic.........
// Import path and __dirname !important

// app.use(Express.static(path.join(__dirname, "./client/dist")));
// app.get("*", function (_, res) {
//   res.sendFile(
//     path.join(__dirname, "./client/dist/index.html"),
//     function (err) {
//       res.status(500).send(err);
//     }
//   );
// });
