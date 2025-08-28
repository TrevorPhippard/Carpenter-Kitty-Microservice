import { Link } from "@tanstack/react-router";
import { Avatar } from "./Avatar";

export function LeftSidebar() {
  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="bg-white rounded-lg shadow p-4 space-y-4 sticky top-20">
        <div className="flex flex-col items-center text-center">
          <Avatar size="lg" />
          <h2 className="font-semibold">Trevor</h2>
          <p className="text-sm text-gray-500">Web Dev</p>
        </div>
        <div className="text-sm text-gray-700 space-y-2">
          <Link to="/profile/me" className="block hover:underline">
            View Profile
          </Link>
          <Link to="/connections" className="block hover:underline">
            My Network
          </Link>
          <Link to="/settings" className="block hover:underline">
            Settings
          </Link>
        </div>
      </div>
    </aside>
  );
}
