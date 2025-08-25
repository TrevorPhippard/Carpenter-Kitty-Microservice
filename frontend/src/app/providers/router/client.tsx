import { queryClient } from "../query/client";
import { createRouter, ErrorComponent } from "@tanstack/react-router";
import { routeTree } from "../../../routeTree.gen";

// Create a new router instance
export const router = createRouter({
  routeTree,
  defaultPendingComponent: () => <div className="p-3">...loading</div>,
  defaultErrorComponent: ({ error }) => <ErrorComponent error={error} />,
  context: { queryClient },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
});
