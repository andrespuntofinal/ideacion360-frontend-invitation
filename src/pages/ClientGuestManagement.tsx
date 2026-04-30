import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save } from 'lucide-react';
import toast from 'react-hot-toast';
import api, { eventsService } from '../services/api';
import useAuthStore from '../stores/authStore';
import { GuestManagementForm } from './ComponentsManager';

const ClientGuestManagement = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();
  
  const [data, setData] = useState<any>({});
  const [initials, setInitials] = useState<string>('BOD');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Basic auth check
    if (!token || user?.role !== 'client') {
      toast.error('Acceso no autorizado');
      navigate('/wedding/login');
      return;
    }

    if (eventId) {
      loadData();
    }
  }, [eventId, token]);

  const loadData = async () => {
    setIsLoading(true);
    try {
      // Force token in headers if useAuthStore didn't sync immediately
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const res = await eventsService.getById(eventId!);
      const event = res.data.data;

      if (event.status === 'finalized') {
        toast.error('Evento Finalizado');
        navigate('/');
        return;
      }

      const gmData = event.components?.guestManagement || {};
      setData(gmData);

      // Extract initials from envelope or use a default
      const envelopeText = event.components?.envelope?.initialsCoupleText || 'BOD';
      const cleanInitials = envelopeText.replace(/[^a-zA-Z]/g, '').substring(0, 3).toUpperCase();
      setInitials(cleanInitials.length > 0 ? cleanInitials : 'BOD');

    } catch (error: any) {
      toast.error('Error al cargar la información');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const updatedData = { ...data };

      // Ensure all guests have a token and urlCard
      if (updatedData.guests && updatedData.guests.length > 0) {
        updatedData.guests = updatedData.guests.map((g: any) => {
          if (!g.token) {
            const randomStr = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
            g.token = `${initials}${randomStr}`;
            g.urlCard = `${appUrl}/wedding/card/${g.token}`;
          }
          return g;
        });
      }

      await eventsService.updateComponent(eventId!, 'guestManagement', updatedData);
      setData(updatedData);
      toast.success('Cambios guardados exitosamente');
    } catch (error) {
      toast.error('Error al guardar los cambios');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-main)', color: 'var(--text-primary)', padding: '1rem' }}>
      <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <button onClick={() => navigate('/')} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem' }}>
            <ArrowLeft size={18} /> <span className="hide-on-mobile">Volver al Home</span>
          </button>
          
          <button onClick={() => {
            useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            navigate('/');
          }} className="btn-secondary" style={{ padding: '0.5rem 1rem' }}>
            Cerrar Sesión
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ borderBottom: '1px solid var(--border-glass)', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
            <h1 style={{ fontSize: '1.5rem', fontFamily: 'var(--font-display)', color: 'var(--color-purple-light)', marginBottom: '0.5rem' }}>
              Gestión de Invitados
            </h1>
            <p style={{ color: 'var(--text-muted)' }}>Administra la lista de invitados para tu evento.</p>
          </div>

          <GuestManagementForm data={data} onChange={setData} />

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end', paddingTop: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
            <button onClick={handleSave} disabled={isSaving} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem' }}>
              <Save size={20} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ClientGuestManagement;
