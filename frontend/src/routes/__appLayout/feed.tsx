import { createFileRoute } from "@tanstack/react-router";
import { PostForm } from "../../components/forms/PostForm";
import { PostCard } from "../../components/ui/PostCard";
import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../../lib/mocks";

// import { useAuthenticate } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/__appLayout/feed")({
  component: Component,
});

function Component() {
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  return (
    <div className="space-y-6">
      <PostForm />
      {isLoading ? (
        <p>Loading posts...</p>
      ) : (
        posts.map((post) => (
          <PostCard
            key={post.id}
            author={post.author}
            headline={post.headline}
            content={post.content}
            timestamp={post.timestamp}
          />
        ))
      )}
    </div>
  );
}
