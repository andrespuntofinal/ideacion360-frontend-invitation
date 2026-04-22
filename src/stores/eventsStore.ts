import { create } from 'zustand';
import { eventsService } from '../services/api';
import type { EventsState, WeddingEvent } from '../types';

const useEventsStore = create<EventsState>((set) => ({
  events: [],
  currentEvent: null,
  isLoading: false,
  error: null,
  pagination: { total: 0, page: 1, limit: 10, pages: 0 },

  fetchEvents: async (params) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await eventsService.getAll(params);
      set({ events: data.data, pagination: data.pagination, isLoading: false });
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      set({ error: axiosError.response?.data?.message || 'Error al cargar eventos', isLoading: false });
    }
  },

  fetchEventById: async (id: string) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await eventsService.getById(id);
      set({ currentEvent: data.data, isLoading: false });
      return data.data;
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      set({ error: axiosError.response?.data?.message || 'Error al cargar evento', isLoading: false });
      return null;
    }
  },

  createEvent: async (eventData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await eventsService.create(eventData);
      set((state) => ({
        events: [data.data, ...state.events],
        isLoading: false,
      }));
      return { success: true, data: data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || 'Error al crear evento';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  updateEvent: async (id: string, eventData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await eventsService.update(id, eventData);
      set((state) => ({
        events: state.events.map((e) => (e.eventId === id ? data.data : e)),
        currentEvent: data.data,
        isLoading: false,
      }));
      return { success: true, data: data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      const message = axiosError.response?.data?.message || 'Error al actualizar evento';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  deleteEvent: async (id: string) => {
    try {
      await eventsService.delete(id);
      set((state) => ({
        events: state.events.filter((e) => e.eventId !== id && e._id !== id),
      }));
      return { success: true };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return { success: false, message: axiosError.response?.data?.message || 'Error al eliminar' };
    }
  },

  updateComponent: async (eventId: string, type: string, data: Record<string, unknown>) => {
    try {
      const response = await eventsService.updateComponent(eventId, type, data);
      return { success: true, data: response.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return { success: false, message: axiosError.response?.data?.message || 'Error al guardar componente' };
    }
  },

  uploadComponentFiles: async (eventId: string, formData: FormData) => {
    try {
      const { data } = await eventsService.uploadComponentFiles(eventId, formData);
      return { success: true, urlsMap: data.data };
    } catch (error: unknown) {
      const axiosError = error as { response?: { data?: { message?: string } } };
      return { success: false, message: axiosError.response?.data?.message || 'Error al subir archivos' };
    }
  },

  clearCurrentEvent: () => set({ currentEvent: null }),
}));

export default useEventsStore;
