import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSubgraphSchema } from "@apollo/subgraph";
import { gql } from "graphql-tag";

// https://www.npmjs.com/package/undici
import { request } from "undici";

const typeDefs = gql`
  extend type Query {
    feed(userId: ID!): [Post!]!
  }

  # Reference to Post entity from the Posts subgraph
  extend type Post @key(fields: "id") {
    id: ID! @external
  }
`;

const USERS_URL =
  process.env.USERS_SUBGRAPH_URL || "http://localhost:4004/graphql";
const POSTS_URL =
  process.env.POSTS_SUBGRAPH_URL || "http://localhost:4002/graphql";

async function gqlFetch(url: string, query: string, variables?: any) {
  const { body } = await request(url, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });
  const data: any = await body.json();
  if (data.errors) {
    throw new Error(JSON.stringify(data.errors));
  }
  return data.data;
}

const resolvers = {
  Query: {
    // Compose feed by fetching followees from users, then posts per followee from posts
    feed: async (_: any, { userId }: { userId: string }) => {
      const followingResp = await gqlFetch(
        USERS_URL,
        `
        query($userId: ID!) {
          following(userId: $userId) { id }
        }
      `,
        { userId }
      );

      const followees = followingResp.following as Array<{ id: string }>;
      const posts: any[] = [];

      for (const f of followees) {
        const postsResp = await gqlFetch(
          POSTS_URL,
          `
          query($userId: ID!) {
            postsByUser(userId: $userId) { id createdAt }
          }
        `,
          { userId: f.id }
        );
        posts.push(...postsResp.postsByUser);
      }

      // Sort by createdAt desc, map to entity references
      posts.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
      return posts.map((p) => ({ __typename: "Post", id: String(p.id) }));
    },
  },
};

const server = new ApolloServer({
  schema: buildSubgraphSchema({ typeDefs, resolvers }),
});

const port = Number(process.env.PORT || 4003);
const { url } = await startStandaloneServer(server, { listen: { port } });
console.log(`🚀 Feed subgraph ready at ${url}`);
