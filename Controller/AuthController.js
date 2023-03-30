import User from "../models/UserSchema.js";
import bcrypt from "bcryptjs";
import { createError } from "../Util/error.js";
import jwt from "jsonwebtoken";
//async because we are using mongoose
export const SignUp = async (req, res, next) => {
  //to hash a password these two line
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(req.body.password, salt);
  try {
    // logged in user details + hashed Passsword
    const newUser = new User({ ...req.body, password: hash });
    // save to MongoDb
    await newUser.save();
    // response sent to frontend........
    res.status(200).send("User Has Been Created");
  } catch (error) {
    //handle error
    next(error);
  }
};
export const LogIn = async (req, res, next) => {
  try {
    // finding user with same user name ......
    const findUser = await User.findOne({ username: req.body.username });
    if (!findUser) return next(createError(404, "User Not Found...!!!"));
    // to compare password with all saved password
    const matchPassword = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (!matchPassword) return next(createError(400, "Password Incorrect"));

    //If username and password match GIVE THIS MAN A TOKEN (JSON WEB TOKEN)........

    const token = jwt.sign({ id: findUser._id }, process.env.KEY);

    // we do not need to send any password to the user
    const { password, ...other } = findUser._doc;
    // Send this token to cookie using cookie parser
    
    res.status(200).json({ other, token });
  } catch (error) {
    next(error);
  }
};
