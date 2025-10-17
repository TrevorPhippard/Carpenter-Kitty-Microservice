interface PostActionsProps {
  onCommentClick?: () => void
}

export function PostActions({ onCommentClick }: PostActionsProps) {
  return (
    <div className="p-3 border-t text-sm text-gray-600 flex justify-between">
      <div className="flex items-center gap-4">
        <button className="hover:text-blue-600 transition">Like</button>
        <button
          className="hover:text-blue-600 transition"
          onClick={onCommentClick}
        >
          Comment
        </button>
        {/* <button className="hover:text-blue-600 transition">Share</button> */}
      </div>
      <button className="hover:text-blue-600 transition">Repost</button>
    </div>
  )
}
