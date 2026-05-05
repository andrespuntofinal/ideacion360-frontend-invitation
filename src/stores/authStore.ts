import { create } from 'zustand';
import { authService } from '../services/api';
import { logoutFirebase } from '../lib/firebase';
import type { AuthState, LoginCredentials, AuthUser } from '../types';

const useAuthStore = create<AuthState>((set) => ({
  user: (() => {
    try {
      const stored = localStorage.getItem('auth_user');
      return stored ? (JSON.parse(stored) as AuthUser) : null;
    } catch {
      return null;
    }
  })(),
  token: localStorage.getItem('auth_token'),
  isAuthenticated: !!localStorage.getItem('auth_token'),
  isLoading: false,
  error: null,

  loginWithFirebaseToken: async (idToken: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.loginWithToken(idToken);
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
        return { success: true, user: data.user };
      }
      return { success: false, message: 'Login fallido' };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || 'Error al iniciar sesión con Google';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  login: async (credentials: LoginCredentials) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await authService.login(credentials);
      if (data.success) {
        localStorage.setItem('auth_token', data.token);
        localStorage.setItem('auth_user', JSON.stringify(data.user));
        set({ user: data.user, token: data.token, isAuthenticated: true, isLoading: false });
        return { success: true };
      }
      return { success: false, message: 'Login fallido' };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || 'Error al iniciar sesión';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  logout: () => {
    logoutFirebase().catch(console.error);
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    set({ user: null, token: null, isAuthenticated: false });
  },
}));

export default useAuthStore;
