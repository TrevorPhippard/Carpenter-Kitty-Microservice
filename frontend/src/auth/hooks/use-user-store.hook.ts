import { create } from "zustand";
//www.youtube.com/watch?v=QVRIJpXNXR8&list=PL1T-3Hf9FqXbH54aLLMWMpdn6OMa5TWOX&index=5
//www.youtube.com/watch?v=sCe0dhazDRg&list=PL1T-3Hf9FqXbH54aLLMWMpdn6OMa5TWOX&index=7
import { createJSONStorage, devtools, persist } from "zustand/middleware";
export const userStoreName = "app-user";

export interface AuthLoginResponse {
  id: string;
  name: string;
  email: string;
  // Add other fields returned from the login API
}

export interface UserStoreState {
  user: AuthLoginResponse | null;
}

export interface UserStoreActions {
  setUser: (newUser: AuthLoginResponse) => void;
  clearUser: () => void;
}

export type UserStore = UserStoreState & UserStoreActions;

export const useUserStore = create<UserStore>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        setUser: (newUser) => {
          set({ user: newUser });
        },
        clearUser: () => {
          set({ user: null });
        },
      }),
      {
        name: userStoreName,
        version: 0,
        storage: createJSONStorage(() => localStorage),
      }
    ),
    { enable: true } //switch to false for prod
  )
);
