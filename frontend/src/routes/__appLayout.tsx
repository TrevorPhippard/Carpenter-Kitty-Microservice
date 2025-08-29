import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import type { Session, AuthClient } from "../lib/authClient";
import { Navbar } from "../components/ui/Navbar";
import { LeftSidebar } from "../components/ui/SidebarLeft";
import { RightSidebar } from "../components/ui/SidebarRight";

type RouterContext = { authClient: AuthClient };
type BeforeLoadReturn = { session: Session };

export const Route = createFileRoute("/__appLayout")({
  beforeLoad: async (ctx): Promise<BeforeLoadReturn | void> => {
    // ctx has the library's complex type; assert the shape we expect
    const { location } = ctx as unknown as {
      location: { pathname: string; search: string };
    };

    // safely assert context shape so TS knows authClient exists:
    const typedContext = (ctx as unknown as { context: RouterContext }).context;
    console.log("authClient", typedContext.authClient);

    if (!typedContext.authClient) {
      throw redirect({
        to: `/authClient/login?redirectTo=${encodeURIComponent(
          location.pathname + location.search
        )}`,
      });
    }
    const session = await typedContext.authClient.getSession();

    console.log("session", session);
    if (!session) {
      throw redirect({
        to: `/session/login?redirectTo=${encodeURIComponent(
          location.pathname + location.search
        )}`,
      });
    }

    return { session };
  },
  component: AppRootLayout,
});

function AppRootLayout() {
  return (
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
  );
}
