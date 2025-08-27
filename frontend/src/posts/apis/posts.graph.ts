import { gql } from "graphql-request";

export const GET_POSTS = gql`
  query GetPosts {
    posts {
      id
      author
      comments {
        author
        content
      }
      content
    }
  }
`;

export const ADD_POST = gql`
  mutation AddPost(
    $author: String!
    $content: String!
    $comments: [CommentInput!]
  ) {
    addPost(author: $author, content: $content, comments: $comments) {
      id
      author
      content
      comments {
        id
        author
        content
      }
    }
  }
`;
