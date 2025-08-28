import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__appLayout/settings")({
  component: Component,
});

function Component() {
  return (
    <div className="p-4 max-w-md mx-auto">
      <h1>settings</h1>
    </div>
  );
}
