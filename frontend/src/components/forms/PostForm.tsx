import { useState } from "react";
import { usePosts } from "../../posts/hooks/use-posts.hook";
import { type AddPostInput } from "../../types/api";

export function PostForm() {
  const { data: posts, isLoading, addPost } = usePosts();

  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");

  if (isLoading) return <div>Loading...</div>;

  const handleAddPost = () => {
    if (!author.trim() || !content.trim()) return;

    const newPost: AddPostInput = {
      author: author.trim(),
      content: content.trim(),
      // comments: [],
    };

    addPost.mutate(newPost);
    setAuthor("");
    setContent("");
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Posts</h2>

      <div className="flex flex-col gap-2 mb-4">
        <input
          type="text"
          placeholder="Author"
          className="border p-2 rounded"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <textarea
          placeholder="Content"
          className="border p-2 rounded resize-none"
          rows={3}
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded self-start"
          onClick={handleAddPost}
        >
          Add Post
        </button>
      </div>

      <ul className="space-y-2">
        {posts?.map((postEntry) => (
          <li key={postEntry.id} className="p-2 border rounded">
            <div>
              <strong>{postEntry.author}</strong>: {postEntry.content}
            </div>
            {Array.isArray(postEntry.comments) &&
              postEntry.comments.length > 0 && (
                <ul className="ml-4 mt-2 space-y-1 text-sm text-gray-600">
                  {postEntry.comments
                    .filter((comment) => comment)
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .map((_comment) => (
                      <li key={Math.random()}>
                        <em>test</em>:test
                      </li>
                      //<li key={comment.id}><em>{comment.author}</em>: {comment.content}</li>
                    ))}
                </ul>
              )}
          </li>
        ))}
      </ul>
    </div>
  );
}
