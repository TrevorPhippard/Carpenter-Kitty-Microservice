import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Index,
  loader: async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    // throw new Error()
    return {
      someId: "Trevor",
    };
  },
  pendingComponent: () => <div>loading...</div>,
  errorComponent: () => <div>Error Loading</div>,
});

function Index() {
  const { someId } = Route.useLoaderData();

  return (
    <div className="p-2">
      <h3>Welcome Home, {someId}!</h3>
    </div>
  );
}
