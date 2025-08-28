import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { createRouter } from "@tanstack/react-router";
import { AuthProvider } from "./providers/auth/provider";
import { useAuth } from "../lib/auth-context";

export default function App() {
  const queryClient = new QueryClient();
  const auth = useAuth();

  const router = createRouter({
    routeTree,
    context: { auth },
  });
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}
