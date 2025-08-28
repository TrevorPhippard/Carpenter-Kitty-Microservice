import { createFileRoute } from "@tanstack/react-router";
import { AuthView, authViewPaths } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/__publicLayout/regester")({
  component: RegisterPage,
});

function RegisterPage() {
  const variant = authViewPaths["SIGN_UP"];

  return (
    <div className="container flex items-center justify-center min-h-screen bg-gray-50">
      <AuthView path={variant} redirectTo="/feed" />
    </div>
  );
}
