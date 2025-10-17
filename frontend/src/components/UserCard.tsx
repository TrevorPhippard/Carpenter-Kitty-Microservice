import Avatar from '../components/Avatar'
import type { User } from '../types/user'

export function UserCard({ user }: { user: User }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 sticky top-20">
      <div className="flex items-center gap-4">
        <Avatar alt="avatar" user={user} />
        <div>
          <div className="font-semibold">{user.fullName}</div>
          <div className="text-xs text-gray-500">{user.title}</div>
        </div>
      </div>

      <div className="mt-4 border-t pt-4 text-sm space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-500">Connections</span>
          <span className="font-semibold">327</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-500">Profile views</span>
          <span className="font-semibold">1,024</span>
        </div>
      </div>

      <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:brightness-95">
        Edit
      </button>
    </div>
  )
}
