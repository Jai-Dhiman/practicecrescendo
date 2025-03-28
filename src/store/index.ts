import { create } from "zustand";

interface AppState {
  // Global application state
}

interface UserState {
  isAuthenticated: boolean;
  skillLevel: string | null;
  setSkillLevel: (level: string) => void;
  login: () => void;
  logout: () => void;
}

export const useAppStore = create<AppState>(() => ({
  // Initialize your app state
}));

export const useUserStore = create<UserState>((set) => ({
  isAuthenticated: false,
  skillLevel: null,
  setSkillLevel: (level) => set({ skillLevel: level }),
  login: () => set({ isAuthenticated: true }),
  logout: () => set({ isAuthenticated: false, skillLevel: null }),
}));
