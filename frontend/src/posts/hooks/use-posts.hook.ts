import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../../lib/graphqlClient";
import { GET_POSTS, ADD_POST } from "../apis/posts.graph";

type CommentInput = {
  author: string;
  content: string;
};

type AddPostInput = {
  author: string;
  content: string;
  comments?: CommentInput[];
};

type Post = {
  id: string;
  author: string;
  content: string;
  comments: Comment[];
};

export const usePosts = () => {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await graphqlClient.request<{ posts: Post[] }>(GET_POSTS);
      return data.posts;
    },
  });

  const addPost = useMutation({
    mutationFn: async (input: AddPostInput) => {
      const data = await graphqlClient.request<{ addPost: Post }>(
        ADD_POST,
        input
      );
      return data.addPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return { ...query, addPost };
};
