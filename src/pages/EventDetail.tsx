import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Edit, Settings2, Calendar, User, Heart, CheckCircle, XCircle } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';

const COMPONENT_LABELS: Record<string, { label: string; emoji: string }> = {
  banner: { label: 'Banner', emoji: '🖼️' },
  calendar: { label: 'Calendario', emoji: '📅' },
  carousel: { label: 'Carrusel', emoji: '🎠' },
  childRestriction: { label: 'Restricción Asistentes', emoji: '🚫' },
  countdown: { label: 'Conteo Regresivo', emoji: '⏱️' },
  dressCode: { label: 'Código de Vestimenta', emoji: '👗' },
  envelope: { label: 'Sobre Tarjeta', emoji: '💌' },
  eventDetails: { label: 'Detalles del Evento', emoji: '📍' },
  message: { label: 'Mensaje Principal', emoji: '✉️' },
  presents: { label: 'Regalos', emoji: '🎁' },
  rsvp: { label: 'RSVP', emoji: '✅' },
  timeline: { label: 'Línea de Tiempo', emoji: '📋' },
  guestManagement: { label: 'Gestión Invitados', emoji: '👥' },
};

const EventDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentEvent, fetchEventById, isLoading } = useEventsStore();

  useEffect(() => { if (id) fetchEventById(id); }, [id]);

  const event = currentEvent;
  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('es-CO', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  if (isLoading || !event) {
    return (
      <AdminLayout>
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ width: 36, height: 36, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite', margin: '0 auto' }} />
        </div>
      </AdminLayout>
    );
  }

  const activeComponents = Object.entries(event.activeComponents || {}).filter(([, v]) => v).map(([k]) => k);

  return (
    <AdminLayout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button onClick={() => navigate('/Wedding-Invitation/Admin/dashboard')}
            style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: 'var(--color-purple-light)', padding: '0.5rem', borderRadius: 8, cursor: 'pointer', display: 'flex' }}>
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>{event.wedding?.coupleNames || 'Detalle del Evento'}</h1>
            <code style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{event.eventId}</code>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="btn-secondary" onClick={() => navigate(`/Wedding-Invitation/Admin/events/${id}/edit`)}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
            <Edit size={15} /> Editar
          </button>
          {event.type === 'web' && (
            <button className="btn-primary" onClick={() => navigate(`/Wedding-Invitation/Admin/events/${id}/components`)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.6rem 1.2rem', fontSize: '0.85rem' }}>
              <Settings2 size={15} /> Gestionar Componentes
            </button>
          )}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.25rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-purple-light)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={16} /> Contacto</h3>
          {[{ label: 'Nombre', value: event.contact?.name }, { label: 'Email', value: event.contact?.email }, { label: 'Celular', value: event.contact?.phone }, { label: 'Identificación', value: event.contact?.identification }].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{label}</div>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{value || '—'}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: '#f472b6', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={16} /> Detalles de la Boda</h3>
          {[{ label: 'Novios', value: event.wedding?.coupleNames }, { label: 'Fecha', value: formatDate(event.wedding?.weddingDate) }, { label: 'Hora', value: event.wedding?.weddingTime || '—' }, { label: 'Tipo', value: event.type === 'web' ? 'Boda Web' : event.type === 'video' ? 'Boda Video' : 'Boda Card' }].map(({ label, value }) => (
            <div key={label} style={{ marginBottom: '0.75rem' }}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{label}</div>
              <div style={{ color: 'var(--text-primary)', fontSize: '0.9rem' }}>{value || '—'}</div>
            </div>
          ))}
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-blue)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={16} /> Componentes ({activeComponents.length} activos)</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {Object.keys(COMPONENT_LABELS).map((key) => {
              const isActive = (event.activeComponents as unknown as Record<string, boolean>)?.[key];
              const { label, emoji } = COMPONENT_LABELS[key];
              return (
                <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', padding: '0.4rem 0' }}>
                  {isActive ? <CheckCircle size={14} color="#4ade80" /> : <XCircle size={14} color="var(--text-muted)" />}
                  <span style={{ fontSize: '1rem' }}>{emoji}</span>
                  <span style={{ fontSize: '0.85rem', color: isActive ? 'var(--text-primary)' : 'var(--text-muted)' }}>{label}</span>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default EventDetail;
