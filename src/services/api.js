import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
  headers: { 'Content-Type': 'application/json' },
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  (response) => response,
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
  login: (credentials) => api.post('/auth/login', credentials),
  logout: () => api.post('/auth/logout'),
};

// Events
export const eventsService = {
  getAll: (params) => api.get('/events', { params }),
  getById: (id) => api.get(`/events/${id}`),
  create: (data) => api.post('/events', data),
  update: (id, data) => api.put(`/events/${id}`, data),
  delete: (id) => api.delete(`/events/${id}`),
  getComponents: (id) => api.get(`/events/${id}/components`),
  updateComponent: (id, type, data) => api.put(`/events/${id}/components/${type}`, data),
  deleteComponent: (id, type) => api.delete(`/events/${id}/components/${type}`),
  uploadComponentFiles: (id, formData) => api.post(`/events/${id}/components/upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } }),
};

export default api;
