import mongoose from "mongoose";

const UserSchemaDef = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    subscribers: {
      type: Number,
      default: 0,
    },
    img: {
      type: String,
    },
    subscribedUsers: {
      type: [String],
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchemaDef);
