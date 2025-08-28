import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";

import mongoose, { Query } from "mongoose";
import { User as UserModel } from "./models/user.model.js";

console.log("Users service starting...");

const MONGO_URL =
  process.env.UserS_DATABASE_URL || "mongodb://localhost:27017/users_db";

mongoose.connect(MONGO_URL).then(() => console.log("Connected to MongoDB"));

const typeDefs = gql`
  type User @key(fields: "id") {
    id: ID!
    username: String!
    name: String!
    bio: String
    createdAt: String!
    followersCount: Int!
    followingCount: Int!
    followers: [User!]!
    following: [User!]!
  }

  type Query {
    user(id: ID!): User
    users: [User!]!
    followers(userId: ID!): [User!]!
    following(userId: ID!): [User!]!
  }

  type Mutation {
    editUser(author: String!, content: String!): User!
  }
`;

interface UserModel {
  id?: string;
  username: string;
  name: string;
  bio: string;
  createdAt: string;
  followersCount: number;
  followingCount: number;
  followers: UserModel[];
  following: UserModel[];
}

const resolvers = {
  Query: {
    users: async () => await UserModel.find(),
  },

  Mutation: {
    editUser: async (
      _: any,
      {
        username,
        name,
        followersCount,
        followingCount,
        followers,
        following,
      }: UserModel
    ) => {
      const user = new UserModel({
        username,
        name,
        followersCount,
        followingCount,
        followers: UserModel ?? [],
        following: UserModel ?? [],
      });

      await user.save();
      return user;
    },
  },

  User: {
    __resolveReference(user: UserModel) {
      return {
        id: user.id,
        username: user.username,
        name: user.name,
        followersCount: user.followersCount,
        followingCount: user.followingCount,
        followers: user.followers,
        following: user.following,
      };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4004, host: "0.0.0.0" },
});
console.log(`Users service running at ${url}`);
