import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: String,
  name: String,
  bio: String,
  followersCount: Number,
  followingCount: Number,
  followers: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  following: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
