import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { createAuthClient } from "../lib/authClient";

export default function App() {
  const queryClient = new QueryClient();
  const authClient = createAuthClient({ queryClient });

  const router = createRouter({
    routeTree,
    context: {
      context: { authClient, queryClient },
    },
  });
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </StrictMode>
  );
}
