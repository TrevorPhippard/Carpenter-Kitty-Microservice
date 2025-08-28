// src/lib/checkAuthUser.ts
export function checkAuthUser() {
  // Replace with your real auth logic
  return Boolean(localStorage.getItem("token"));
}
