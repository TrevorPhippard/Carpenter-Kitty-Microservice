import { useMutation, type UseMutationOptions } from "@tanstack/react-query";

type RegisterFormData = {
  username: string;
  email: string;
  password: string;
};

export function useAuthRegister(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  options?: UseMutationOptions<any, Error, RegisterFormData>
) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return useMutation<any, Error, RegisterFormData>({
    mutationFn: async (data) => {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to register");
      return await response.json();
    },
    ...options,
  });
}
