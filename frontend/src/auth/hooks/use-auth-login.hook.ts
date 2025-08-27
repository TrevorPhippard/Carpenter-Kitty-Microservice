import { authKeys, authRepositories } from "../apis/auth.api";
import { useMutation } from "@tanstack/react-query";

interface authLoginType {
  username: string;
  password: string;
}

export function useAuthLogin(
  params: Parameters<typeof authKeys.login>[0],
  options = {}
) {
  return useMutation({
    mutationKey: authKeys.login(params),
    mutationFn: async (json: authLoginType) => {
      try {
        return await authRepositories.login({ json });
      } catch (err) {
        if (err instanceof Response) {
          throw new Error(`HTTP Error: ${err}`);
        }
        throw err;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: async (error: any) => {
      const res = error?.response;

      if (res instanceof Response) {
        try {
          const json = await res.json();
          console.error(`[Login Error] ${json.message}`);
        } catch {
          console.error(`[Login Error] Failed to parse error response.`);
        }
      } else {
        console.error(`[Login Error] ${String(error)}`);
      }
    },
    ...options,
  });
}
