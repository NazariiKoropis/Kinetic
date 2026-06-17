
import { create } from 'zustand';


export const useAuthStore = create(
    (set) => ({
        user: null,
        token: null,
        isAuthenticated: false,
        isInitializing: true,

        login: (userData, token) => set({
            user: userData,
            token: token,
            isAuthenticated: true,
            isInitializing: false,
        }),

        logout: () => set({
            user: null,
            token: null,
            isAuthenticated: false,
            isInitializing: false,
        }),

        setInitializing: (isInitializing) => set({ isInitializing }),
    })
);
