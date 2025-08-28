import { createFileRoute } from "@tanstack/react-router";
import { AuthView, authViewPaths } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/__publicLayout/login")({
  component: LoginPage,
});

function LoginPage() {
  const variant = authViewPaths["SIGN_IN"];

  return (
    <div className="bg-white  p-6 rounded shadow w-96">
      <AuthView path={variant} redirectTo="/feed" />
    </div>
  );
}
