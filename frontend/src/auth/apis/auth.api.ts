import { http } from "../../app/services/http.service";

// Optional: You can still create a runtime validator if needed, but here we skip that

export const authKeys = {
  all: ["auth"] as const,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (params: any) =>
    [...authKeys.all, "login", ...(params ? [params] : [])] as const,
};

export const authRepositories = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: async ({ json }: { json: any }) => {
    const response = await http("auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(json),
    });

    return await response.json();
  },
} as const;
