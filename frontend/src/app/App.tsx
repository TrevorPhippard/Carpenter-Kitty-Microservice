import { StrictMode } from "react";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { createRouter } from "@tanstack/react-router";

const queryClient = new QueryClient();
const router = createRouter({ routeTree });

export const App = () => (
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
