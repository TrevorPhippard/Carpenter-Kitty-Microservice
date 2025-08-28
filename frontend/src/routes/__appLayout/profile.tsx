import { createFileRoute } from "@tanstack/react-router";
import { useParams } from "@tanstack/react-router";
import { Avatar } from "../../components/ui/Avatar";
import { useQuery } from "@tanstack/react-query";
import { PostCard } from "../../components/ui/PostCard";
import { fetchProfile } from "../../lib/mocks";

export const Route = createFileRoute("/__appLayout/profile")({
  component: Component,
});

function Component() {
  const { id } = useParams<{ id: string }>();
  const { data: profile, isLoading } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id),
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (!profile) return <p>Profile not found</p>;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6 flex items-center gap-6">
        <Avatar size="lg" src={profile.avatar} />
        <div>
          <h1 className="text-2xl font-semibold">{profile.name}</h1>
          <p className="text-gray-500">{profile.title}</p>
          <p className="text-gray-400">{profile.location}</p>
        </div>
      </div>
      <div className="space-y-4">
        {profile.posts.map((post) => (
          <PostCard
            key={post.id}
            author={profile.name}
            headline={post.headline}
            content={post.content}
            timestamp={post.timestamp}
          />
        ))}
      </div>
    </div>
  );
}
