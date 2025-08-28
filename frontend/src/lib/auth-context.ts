import { useState, useEffect } from "react";

export function useAuth() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);

  // ✅ Restore auth from localStorage on first load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({ id: "1", email: "test@example.com" });
    }
  }, []);

  const login = (email: string) => {
    const mockUser = { id: "1", email };
    localStorage.setItem("token", "mock-token");
    setUser(mockUser);
    return mockUser;
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return { user, login, logout };
}
