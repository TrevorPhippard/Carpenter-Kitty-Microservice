import { GraphQLClient } from "graphql-request";

export const graphqlClient = new GraphQLClient(
  "http://localhost:4000/graphql",
  {
    headers: {
      // Optional: add auth if needed
      // Authorization: `Bearer ${token}`,
    },
  }
);
