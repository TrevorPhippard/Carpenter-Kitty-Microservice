import { userStoreName } from "../auth/hooks/use-user-store.hook";

/**
 * Check if user is authenticated by verifying localStorage content
 */
export function checkAuthUser(): boolean {
  try {
    const appUser = localStorage.getItem(userStoreName);
    if (!appUser) return false;

    const parsedAppUser = JSON.parse(appUser);
    const user = parsedAppUser?.state?.user;

    if (user && typeof user === "object" && typeof user.id === "string") {
      return true;
    }

    return false;
  } catch {
    return false;
  }
}
