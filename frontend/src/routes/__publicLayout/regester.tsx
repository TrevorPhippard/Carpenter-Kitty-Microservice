import { createFileRoute } from "@tanstack/react-router";
import { AuthView } from "@daveyplate/better-auth-ui";

export const Route = createFileRoute("/__publicLayout/regester")({
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <div className="container flex items-center justify-center min-h-screen bg-gray-50">
      <AuthView redirectTo="/feed" />
    </div>
  );
}
