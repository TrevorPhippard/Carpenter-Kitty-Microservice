import { useEffect } from "react";
import { useUserStore } from "./use-user-store.hook";
import { useLocation, useNavigate } from "@tanstack/react-router";

export function useAuthChecker() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useUserStore();

  useEffect(() => {
    const isLoggedIn = !!user;
    const isOnLoginPage = location.pathname.includes("login");

    if (!isLoggedIn && !isOnLoginPage) {
      navigate({ to: "/login" });
      alert("Unauthorized: Please log in.");
    } else if (isLoggedIn && isOnLoginPage) {
      navigate({ to: "/" });
      alert("You are already logged in.");
    }
  }, [location.pathname, navigate, user]);
}
