import { gql } from "graphql-request";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      title
      completed
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost($title: String!) {
    addPost(title: $title) {
      id
      title
      completed
    }
  }
`;

export const TOGGLE_POST = gql`
  mutation TogglePost($id: ID!) {
    togglePost(id: $id) {
      id
      completed
    }
  }
`;
