import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { Navbar } from "../components/ui/Navbar";
import { LeftSidebar } from "../components/ui/SidebarLeft";
import { RightSidebar } from "../components/ui/SidebarRight";
// import { checkAuthUser } from "../lib/checkAuthUser";

export const Route = createFileRoute("/__appLayout")({
  beforeLoad: ({ context, location }) => {
    if (!context.auth.user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: () => (
    <>
      <Navbar />
      <main className="flex flex-1 w-full max-w-7xl mx-auto px-4 pt-16 gap-6">
        <LeftSidebar />
        <div className="flex-1 min-w-0">
          <Outlet />
        </div>
        <RightSidebar />
      </main>
    </>
  ),
});
