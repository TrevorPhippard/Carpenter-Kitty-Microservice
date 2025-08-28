export function RightSidebar() {
  return (
    <aside>
      <div className="bg-white rounded-lg shadow p-4 space-y-4 sticky top-20">
        <h3 className="font-semibold text-gray-800">Trending</h3>
        <ul className="text-sm text-gray-700 space-y-2">
          <li className="hover:underline cursor-pointer">A really nice reno</li>
          <li className="hover:underline cursor-pointer">
            New Deals and Kelvins Reno
          </li>
          <li className="hover:underline cursor-pointer">
            updates in T-dot zoning laws
          </li>
        </ul>
      </div>
    </aside>
  );
}
