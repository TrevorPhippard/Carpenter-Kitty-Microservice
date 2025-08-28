import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { ApolloGateway, IntrospectAndCompose } from "@apollo/gateway";

const postsUrl =
  process.env.POSTS_SUBGRAPH_URL || "http://localhost:4002/graphql";
const feedUrl =
  process.env.FEED_SUBGRAPH_URL || "http://localhost:4003/graphql";
const usersUrl =
  process.env.USERS_SUBGRAPH_URL || "http://localhost:4004/graphql";

const supergraphSdl = new IntrospectAndCompose({
  subgraphs: [
    { name: "users", url: usersUrl },
    { name: "posts", url: postsUrl },
    { name: "feed", url: feedUrl },
  ],
});

const gateway = new ApolloGateway({ supergraphSdl });
const server = new ApolloServer({ gateway });

const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀 Gateway ready at ${url}`);
