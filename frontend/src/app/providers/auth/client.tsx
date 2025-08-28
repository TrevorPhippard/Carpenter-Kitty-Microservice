import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "http://localhost:4001/auth",
  loginPath: "/login",
  registerPath: "/register",
  tokenKey: "auth_token",
});
