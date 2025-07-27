import { create } from 'zustand';
interface User { id: number; telegram_id: number; username?: string; first_name?: string; }
interface AuthState { token: string | null; user: User | null; isLoading: boolean; isAuthenticated: boolean; setToken: (token: string) => void; setUser: (user: User) => void; setLoading: (loading: boolean) => void; logout: () => void; }
export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('accessToken'), user: null, isLoading: true, isAuthenticated: !!localStorage.getItem('accessToken'),
  setToken: (token) => { localStorage.setItem('accessToken', token); set({ token, isAuthenticated: true }); },
  setUser: (user) => set({ user }), setLoading: (loading) => set({ isLoading: loading }),
  logout: () => { localStorage.removeItem('accessToken'); set({ token: null, user: null, isAuthenticated: false }); },
}));
