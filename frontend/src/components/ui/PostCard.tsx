import React from "react";
import { Avatar } from "./Avatar";

interface PostCardProps {
  author: string;
  headline: string;
  content: string;
  timestamp: string;
}

export function PostCard({
  author,
  headline,
  content,
  timestamp,
}: PostCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 space-y-3">
      <div className="flex items-center gap-3">
        <Avatar size="sm" />
        <div>
          <p className="font-semibold">{author}</p>
          <p className="text-sm text-gray-500">{headline}</p>
          <p className="text-xs text-gray-400">{timestamp}</p>
        </div>
      </div>
      <p className="text-gray-800 text-left">{content}</p>
      <div className="flex gap-4 text-sm text-gray-500">
        <button className="hover:text-theme-600">Like</button>
        <button className="hover:text-theme-600">Comment</button>
        <button className="hover:text-theme-600">Share</button>
      </div>
    </div>
  );
}
