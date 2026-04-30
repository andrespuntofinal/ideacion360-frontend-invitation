import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import type { LoginCredentials, WeddingEvent } from '../types';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('auth_user');
      window.location.href = '/Wedding-Invitation/Admin';
    }
    return Promise.reject(error);
  }
);

// Auth
export const authService = {
  login: (credentials: LoginCredentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

// Events
export const eventsService = {
  getAll: (params?: Record<string, unknown>) => api.get('/events', { params }),
  getById: (id: string) => api.get(`/events/${id}`),
  getByToken: (token: string) => api.get(`/events/card/${token}`),
  create: (data: Partial<WeddingEvent>) => api.post('/events', data),
  update: (id: string, data: Partial<WeddingEvent>) => api.put(`/events/${id}`, data),
  delete: (id: string) => api.delete(`/events/${id}`),
  getComponents: (id: string) => api.get(`/events/${id}/components`),
  updateComponent: (id: string, type: string, data: Record<string, unknown>) =>
    api.put(`/events/${id}/components/${type}`, data),
  deleteComponent: (id: string, type: string) => api.delete(`/events/${id}/components/${type}`),
  uploadComponentFiles: (id: string, formData: FormData) =>
    api.post(`/events/${id}/components/upload`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    }),
  sendRSVP: (id: string, data: Record<string, unknown>) => api.post(`/events/${id}/rsvp`, data),
};

// Export services
export default api;
