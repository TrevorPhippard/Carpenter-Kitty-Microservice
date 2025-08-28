import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__appLayout/about")({
  component: About,
});

function About() {
  return <div className="p-2">About Page</div>;
}
