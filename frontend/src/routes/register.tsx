import { useForm } from "@tanstack/react-form";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { useUserStore } from "../auth/hooks/use-user-store.hook";
import { useAuthRegister } from "../auth/hooks/use-auth-register.hook";
import { checkAuthUser } from "../lib/checker";

export const Route = createFileRoute("/register")({
  beforeLoad: ({ location }) => {
    if (checkAuthUser()) {
      throw redirect({ to: "/register", search: { redirect: location.href } });
    }
  },
  component: Component,
});

function Component() {
  return (
    <div className="min-h-screen w-full flex">
      <section className="min-h-screen w-full flex flex-col justify-center px-10 ">
        <h1 className="text-center text-3xl text-primary">Register</h1>
        <RegisterForm />
        <p className="py-12 text-center">
          Already have an account?{" "}
          <a
            aria-label="Login here"
            className="text-blue-600 hover:underline"
            href="/login"
          >
            Login here
          </a>
        </p>
      </section>
    </div>
  );
}

function RegisterForm() {
  const navigate = Route.useNavigate();
  const { setUser } = useUserStore();
  const registerMutation = useAuthRegister();

  const form = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      await registerMutation.mutateAsync(value, {
        onSuccess: (user) => {
          setUser(user);
          navigate({ to: "/" });
        },
      });
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
      {/* Username */}
      <Field
        name="username"
        validators={{
          onBlur: ({ value }) => (!value ? "Username is required" : undefined),
        }}
      >
        {(field) => (
          <div className="pt-4">
            <label htmlFor="username" className="block mb-1 font-medium">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
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

      {/* Email */}
      <Field
        name="email"
        validators={{
          onBlur: ({ value }) =>
            !value
              ? "Email is required"
              : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
                ? "Enter a valid email address"
                : undefined,
        }}
      >
        {(field) => (
          <div className="pt-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
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
          onBlur: ({ value }) =>
            !value
              ? "Password is required"
              : value.length < 6
                ? "Password must be at least 6 characters"
                : undefined,
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
        disabled={state.isSubmitting || !state.isValid}
        className={`mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        {state.isSubmitting ? "Registering..." : "Register"}
      </button>
    </form>
  );
}
