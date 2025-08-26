// services/posts/models/post.model.ts
import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
});

const postSchema = new mongoose.Schema({
  content: String,
  author: String,
  createdAt: { type: Date, default: Date.now },
  comments: [commentSchema],
});

export const Post = mongoose.model("Post", postSchema);
