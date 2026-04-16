import { create } from 'zustand';
import { eventsService } from '../services/api';

const useEventsStore = create((set, get) => ({
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
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar eventos', isLoading: false });
    }
  },

  fetchEventById: async (id) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await eventsService.getById(id);
      set({ currentEvent: data.data, isLoading: false });
      return data.data;
    } catch (error) {
      set({ error: error.response?.data?.message || 'Error al cargar evento', isLoading: false });
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
    } catch (error) {
      const message = error.response?.data?.message || 'Error al crear evento';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  updateEvent: async (id, eventData) => {
    set({ isLoading: true, error: null });
    try {
      const { data } = await eventsService.update(id, eventData);
      set((state) => ({
        events: state.events.map(e => e.eventId === id ? data.data : e),
        currentEvent: data.data,
        isLoading: false,
      }));
      return { success: true, data: data.data };
    } catch (error) {
      const message = error.response?.data?.message || 'Error al actualizar evento';
      set({ error: message, isLoading: false });
      return { success: false, message };
    }
  },

  deleteEvent: async (id) => {
    try {
      await eventsService.delete(id);
      set((state) => ({
        events: state.events.filter(e => e.eventId !== id && e._id !== id),
      }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error al eliminar' };
    }
  },

  updateComponent: async (eventId, type, data) => {
    try {
      const response = await eventsService.updateComponent(eventId, type, data);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Error al guardar componente' };
    }
  },

  clearCurrentEvent: () => set({ currentEvent: null }),
}));

export default useEventsStore;
