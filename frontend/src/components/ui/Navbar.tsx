import { Link } from "@tanstack/react-router";

const navLinks = ["Feed", "About", "Settings"];

export function Navbar() {
  return (
    <nav className="fixed top-0 inset-x-0 h-14 bg-white border-b shadow flex items-center justify-between px-6 z-50">
      <div className="flex items-center gap-4">
        <Link to="/feed" className="font-bold text-theme-600 text-lg">
          Carpenter Kitty
        </Link>
        <input
          type="text"
          placeholder="Search"
          className="hidden md:block border rounded px-3 py-1 text-sm w-64"
        />
      </div>
      <div className="flex items-center gap-6">
        {navLinks.map((linkData: string) => (
          <Link to={linkData} className="[&.active]:font-bold">
            {linkData}
          </Link>
        ))}
        <Link to="/login" className="[&.active]:font-bold">
          SignOut
        </Link>
      </div>
    </nav>
  );
}
