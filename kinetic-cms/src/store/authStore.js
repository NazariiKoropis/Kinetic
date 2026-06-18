
import { create } from 'zustand';


const useAuthStore = create(
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

export default useAuthStore;