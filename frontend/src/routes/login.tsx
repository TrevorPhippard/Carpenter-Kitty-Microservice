import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";

import { useAuthLogin } from "../auth/hooks/use-auth-login.hook";
import {
  useUserStore,
  type AuthLoginResponse,
} from "../auth/hooks/use-user-store.hook";
import { checkAuthUser } from "../lib/checker";

export const Route = createFileRoute("/login")({
  beforeLoad: ({ location }) => {
    const authed = checkAuthUser();

    if (authed) {
      throw redirect({
        to: "/login",
        search: { redirect: location.href },
      });
    }
  },
  component: Component,
});

function Component() {
  return (
    <div className="min-h-screen w-full flex">
      <section className="min-h-screen w-full flex flex-col justify-center px-10">
        <h1 className="text-center text-3xl text-primary">Welcome</h1>
        <LoginForm />
        <p className="py-12 text-center">
          No account?{" "}
          <a
            aria-label="Register here"
            className="text-blue-600 hover:underline"
            href="/"
          >
            Register here
          </a>
        </p>
      </section>
    </div>
  );
}

function LoginForm() {
  const navigate = Route.useNavigate();
  const { setUser } = useUserStore();

  const loginMutation = useAuthLogin(undefined, {
    onSuccess: async (user: AuthLoginResponse) => {
      setUser(user);
      await navigate({ to: "/" });
    },
  });

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await loginMutation.mutateAsync(value);
    },
  });

  const { Field, handleSubmit, state } = form;

  return (
    <form
      className="flex flex-col pt-3 md:pt-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      {/* email */}
      <Field
        name="email"
        validators={{
          onBlur: ({ value }) => (!value ? "email is required" : undefined),
        }}
      >
        {(field) => (
          <div className="pt-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              email
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter your email"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={`w-full border px-4 py-2 rounded ${
                field.state.meta.isTouched && field.state.meta.errors
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {field.state.meta.isTouched && field.state.meta.errors && (
              <p className="text-red-600 text-sm mt-1">
                {field.state.meta.isTouched && field.state.meta.errors}
              </p>
            )}
          </div>
        )}
      </Field>

      {/* Password */}
      <Field
        name="password"
        validators={{
          onBlur: ({ value }) => (!value ? "Password is required" : undefined),
        }}
      >
        {(field) => (
          <div className="pt-4">
            <label htmlFor="password" className="block mb-1 font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={field.state.value}
              onChange={(e) => field.handleChange(e.target.value)}
              onBlur={field.handleBlur}
              className={`w-full border px-4 py-2 rounded ${
                field.state.meta.isTouched && field.state.meta.errors
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
            />
            {field.state.meta.isTouched && field.state.meta.errors && (
              <p className="text-red-600 text-sm mt-1">
                {field.state.meta.isTouched && field.state.meta.errors}
              </p>
            )}
          </div>
        )}
      </Field>

      {/* Submit */}
      <button
        type="submit"
        disabled={loginMutation.isPending || !state.isValid}
        className={`mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {loginMutation.isPending ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}
