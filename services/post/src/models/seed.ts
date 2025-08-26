// services/posts/seed.ts
import mongoose from "mongoose";
import { Post } from "./post.model.js";

const MONGO_URL =
  process.env.POSTS_DATABASE_URL || "mongodb://localhost:27017/posts_db";

mongoose.connect(MONGO_URL).then(async () => {
  console.log("Connected to MongoDB for seeding");

  await Post.deleteMany({}); // Clear existing data

  const posts = [
    {
      content: "Hello world from Trevor!",
      author: "trevor",
      comments: [
        { content: "Nice post!", author: "alice" },
        { content: "Welcome!", author: "bob" },
      ],
    },
    {
      content: "Another post on the feed.",
      author: "jane",
      comments: [{ content: "Great content!", author: "trevor" }],
    },
  ];

  await Post.insertMany(posts);

  console.log("Posts database seeded.");
  mongoose.disconnect();
});
