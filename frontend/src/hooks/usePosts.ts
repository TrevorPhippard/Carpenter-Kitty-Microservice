import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { graphqlClient } from "../lib/graphqlClient";
import { GET_POSTS, ADD_POST, TOGGLE_POST } from "../lib/posts";

export const usePosts = () => {
  const queryClient = useQueryClient();

  // Fetch posts
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const data = await graphqlClient.request(GET_POSTS);
      return data.posts;
    },
  });

  // Add Post
  const addPost = useMutation({
    mutationFn: async (title: string) => {
      const data = await graphqlClient.request(ADD_POST, { title });
      return data.addPost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  // Toggle Post
  const togglePost = useMutation({
    mutationFn: async (id: string) => {
      const data = await graphqlClient.request(TOGGLE_POST, { id });
      return data.togglePost;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });

  return { ...query, addPost, togglePost };
};
