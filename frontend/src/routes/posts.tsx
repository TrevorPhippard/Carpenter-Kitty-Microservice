import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { usePosts } from "../hooks/usePosts";

export const Route = createFileRoute("/posts")({
  component: Posts,
});

interface Post {
  id: string;
  title: string;
  completed: boolean;
}

function Posts() {
  const { data: posts, isLoading, addPost, togglePost } = usePosts();
  const [newTitle, setNewTitle] = useState("");

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">posts</h2>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 flex-1 rounded"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 rounded"
          onClick={() => {
            if (!newTitle) return;
            addPost.mutate(newTitle);
            setNewTitle("");
          }}
        >
          Add
        </button>
      </div>

      <ul className="space-y-2">
        {posts?.map((Post: Post) => (
          <li
            key={Post.id}
            className="flex items-center justify-between p-2 border rounded"
          >
            <span
              className={`cursor-pointer ${Post.completed ? "line-through text-gray-500" : ""}`}
              onClick={() => togglePost.mutate(Post.id)}
            >
              {Post.title}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
