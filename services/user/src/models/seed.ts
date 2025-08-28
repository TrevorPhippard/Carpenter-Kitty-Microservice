import mongoose from "mongoose";
import { User } from "./user.model.js";

const MONGO_URL =
  process.env.POSTS_DATABASE_URL || "mongodb://localhost:27017/posts_db";

mongoose.connect(MONGO_URL).then(async () => {
  console.log("Connected to MongoDB for seeding");

  // Create users
  const users = await User.insertMany([
    { username: "alice", name: "Alice Johnson", bio: "Loves hiking" },
    { username: "bob", name: "Bob Smith", bio: "Full-stack dev" },
    { username: "carol", name: "Carol Chen", bio: "Coffee enthusiast" },
  ]);

  console.log(
    "👤 Users created:",
    users.map((u) => u.username)
  );

  // Add relationships
  const [alice, bob, carol] = users;

  // Alice follows Bob & Carol
  alice.following.push(bob._id, carol._id);
  alice.followingCount = 2;

  // Bob is followed by Alice
  bob.followers.push(alice._id);
  bob.followersCount = 1;

  // Carol is followed by Alice
  carol.followers.push(alice._id);
  carol.followersCount = 1;

  await alice.save();
  await bob.save();
  await carol.save();

  console.log("🔗 Relationships set up");
  console.log("Posts database seeded.");
  mongoose.disconnect();
});
