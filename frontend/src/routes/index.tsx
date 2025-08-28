import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    // throw new Error()
    return {
      someId: "Trevor",
    };
  },
  beforeLoad: ({ context, location }) => {
    // if (!context.auth.user) {
    throw redirect({
      to: "/login",
      search: { redirect: location.href },
    });
    // }
  },
  pendingComponent: () => <div>loading...</div>,
  errorComponent: () => <div>Error Loading</div>,
});

function Index() {
  const { someId } = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Bye, {someId}!</h3>
    </div>
  );
}
