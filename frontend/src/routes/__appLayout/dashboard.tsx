// __authLayout/dashboard.tsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/__appLayout/dashboard")({
  component: () => <h1>Dashboard Page</h1>,
});
