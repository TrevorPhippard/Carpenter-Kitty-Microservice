import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/__publicLayout")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen">
      <Outlet />
    </div>
  );
}
