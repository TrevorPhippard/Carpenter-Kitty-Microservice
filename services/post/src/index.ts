import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";

import mongoose, { Query } from "mongoose";
import { Post as PostModel } from "./models/post.model.js";

console.log("Posts service starting...");

const MONGO_URL =
  process.env.POSTS_DATABASE_URL || "mongodb://localhost:27017/posts_db";

mongoose.connect(MONGO_URL).then(() => console.log("Connected to MongoDB"));

const typeDefs = gql`
  input CommentInput {
    author: String!
    content: String!
  }

  type Comment {
    id: ID!
    author: String!
    content: String!
  }

  type Post @key(fields: "id") {
    id: ID!
    author: String!
    content: String!
    comments: [Comment!]!
  }

  type Query {
    posts: [Post]
  }

  type Mutation {
    addPost(author: String!, content: String!, comments: [CommentInput!]): Post!
  }
`;

interface Comment {
  content: string;
  author: string;
}

interface PostModel {
  id?: string;
  content: string;
  author: string;
  comments: Comment[];
}

const resolvers = {
  Query: {
    posts: async () => await PostModel.find(),
  },

  Mutation: {
    addPost: async (_: any, { author, content, comments }: PostModel) => {
      const post = new PostModel({
        author,
        content,
        comments: comments ?? [],
      });

      await post.save();
      return post;
    },
  },

  Post: {
    __resolveReference(post: PostModel) {
      return { id: post.id, content: "opinion", author: "test", comments: [] };
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema([{ typeDefs, resolvers }]),
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4003, host: "0.0.0.0" }, // Add host here
});
console.log(`Posts service running at ${url}`);
