import { createFileRoute, useNavigate } from "@tanstack/react-router";

export const Route = createFileRoute("/__publicLayout")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // mock login
    localStorage.setItem("token", "mock-token");

    // check if redirect param exists
    const redirectTo = window.location.search
      ? new URLSearchParams(window.location.search).get("redirect")
      : null;

    navigate({ to: redirectTo || "/feed" });
  };

  return (
    <div className="bg-white p-6 rounded shadow w-96">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white rounded px-3 py-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
