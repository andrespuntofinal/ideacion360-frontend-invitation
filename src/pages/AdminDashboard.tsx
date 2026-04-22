import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Plus, Trash2, Edit, Eye, Settings2, TrendingUp, CheckCircle, Clock, MoreVertical, CreditCard } from 'lucide-react';
import { ElementType } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';
import toast from 'react-hot-toast';
import type { WeddingEvent } from '../types';

interface StatCard { label: string; value: number; icon: ElementType; color: string; bg: string; }
const statCards = (events: WeddingEvent[]): StatCard[] => [
  { label: 'Total Eventos', value: events.length, icon: Calendar, color: '#7C3AED', bg: 'rgba(124,58,237,0.15)' },
  { label: 'Activos', value: events.filter(e => e.status === 'active').length, icon: CheckCircle, color: '#4ade80', bg: 'rgba(74,222,128,0.15)' },
  { label: 'En Borrador', value: events.filter(e => e.status === 'draft').length, icon: Clock, color: '#fbbf24', bg: 'rgba(251,191,36,0.15)' },
  { label: 'Tipo Web', value: events.filter(e => e.type === 'web').length, icon: TrendingUp, color: '#8ac4e0', bg: 'rgba(138,196,224,0.15)' },
];

const typeLabels: Record<string, string> = { web: 'Inv. Boda Web', video: 'Inv. Boda Video', card: 'Inv. Boda Card' };

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { events, isLoading, fetchEvents, deleteEvent } = useEventsStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => { fetchEvents(); }, []);

  const handleDelete = async (id: string) => {
    const result = await deleteEvent(id);
    if (result.success) { toast.success('Evento eliminado exitosamente'); setDeleteConfirm(null); }
    else { toast.error(result.message || 'Error al eliminar'); }
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <AdminLayout>
      <div className="admin-header" style={{ marginBottom: '2rem' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Dashboard</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Gestiona todos los eventos de bodas</p>
        </div>
        <Link to="/Wedding-Invitation/Admin/events/new" style={{ textDecoration: 'none' }}>
          <motion.button className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 1.5rem', width: 'max-content' }}>
            <Plus size={18} />Crear Evento
          </motion.button>
        </Link>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        {statCards(events).map(({ label, value, icon: Icon, color, bg }, i) => (
          <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
            className="glass-card-sm" style={{ padding: '1.25rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}><Icon size={22} color={color} /></div>
            <div>
              <div style={{ fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{isLoading ? '—' : value}</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem', marginTop: '0.2rem' }}>{label}</div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="glass-card" style={{ padding: 0, overflow: 'visible' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)' }}>Eventos Registrados</h2>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{events.length} total</span>
        </div>
        <div style={{ overflowX: 'auto' }}>
          {isLoading ? (
            <div style={{ padding: '3rem', textAlign: 'center' }}>
              <div style={{ width: 36, height: 36, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite', margin: '0 auto 1rem' }} />
              <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Cargando eventos...</p>
            </div>
          ) : events.length === 0 ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <Calendar size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', display: 'block' }} />
              <p style={{ color: 'var(--text-secondary)', fontWeight: 500, marginBottom: '0.5rem' }}>No hay eventos aún</p>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Crea tu primer evento de boda</p>
              <Link to="/Wedding-Invitation/Admin/events/new"><button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}><Plus size={16} /> Crear Evento</button></Link>
            </div>
          ) : (
            <table className="data-table">
              <thead>
                <tr><th>Tipo</th><th>Contacto</th><th>Novios</th><th>Fecha Boda</th><th>Estado</th><th style={{ textAlign: 'right' }}>Acciones</th></tr>
              </thead>
              <tbody>
                {events.map((event, idx) => {
                  const isLast = idx >= events.length - 2 && events.length > 2;
                  return (
                    <tr key={event._id}>
                      <td><span className={`badge badge-${event.type || 'web'}`}>{typeLabels[event.type || ''] || 'Web'}</span></td>
                      <td>
                        <div style={{ fontWeight: 500 }}>{event.contact?.name || '—'}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>{event.contact?.email || ''}</div>
                      </td>
                      <td style={{ color: 'var(--text-secondary)' }}>{event.wedding?.coupleNames || '—'}</td>
                      <td style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{formatDate(event.wedding?.weddingDate)}</td>
                      <td><span className={`badge badge-${event.status || 'draft'}`}>{event.status === 'active' ? 'Activo' : event.status === 'inactive' ? 'Inactivo' : 'Borrador'}</span></td>
                      <td>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'relative' }}>
                          <button onClick={() => setOpenMenuId(openMenuId === event.eventId ? null : (event.eventId ?? null))}
                            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', padding: '0.4rem', cursor: 'pointer', borderRadius: '50%', transition: 'all 0.2s' }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                            <MoreVertical size={18} />
                          </button>
                          {openMenuId === event.eventId && (
                            <>
                              <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setOpenMenuId(null)} />
                              <div style={{ position: 'absolute', right: '30px', top: isLast ? 'auto' : '0', bottom: isLast ? '0' : 'auto', background: 'var(--bg-card2)', border: '1px solid var(--border-glass)', borderRadius: '12px', padding: '0.5rem', zIndex: 50, display: 'flex', flexDirection: 'column', gap: '0.25rem', minWidth: '160px', boxShadow: 'var(--shadow-card)' }}>
                                {[
                                  { label: 'Ver Detalle', icon: Eye, color: 'var(--color-purple-light)', bg: 'rgba(124,58,237,0.1)', action: () => { setOpenMenuId(null); navigate(`/Wedding-Invitation/Admin/events/${event.eventId}`); } },
                                  ...(event.type === 'web' ? [{ label: 'Componentes', icon: Settings2, color: 'var(--color-blue)', bg: 'rgba(138,196,224,0.1)', action: () => { setOpenMenuId(null); navigate(`/Wedding-Invitation/Admin/events/${event.eventId}/components`); } }] : []),
                                  {
                                    label: 'Ver Tarjeta', icon: CreditCard, color: '#4ade80', bg: 'rgba(74,222,128,0.1)', action: () => {
                                      setOpenMenuId(null);
                                      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
                                      const guestName = encodeURIComponent('Andrés y Johanna');
                                      window.open(`${appUrl}/Wedding-Invitation/card/${event.eventId}?guestName=${guestName}&numberGuests=2`, '_blank');
                                    }
                                  },
                                  { label: 'Editar Evento', icon: Edit, color: '#fbbf24', bg: 'rgba(251,191,36,0.1)', action: () => { setOpenMenuId(null); navigate(`/Wedding-Invitation/Admin/events/${event.eventId}/edit`); } },
                                ].map(({ label, icon: BtnIcon, color: btnColor, bg: btnBg, action }) => (
                                  <button key={label} onClick={action}
                                    style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: 'var(--text-primary)', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', textAlign: 'left', fontSize: '0.85rem' }}
                                    onMouseEnter={(e) => (e.currentTarget.style.background = btnBg)}
                                    onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                    <BtnIcon size={14} color={btnColor} />{label}
                                  </button>
                                ))}
                                <div style={{ height: '1px', background: 'var(--border-glass)', margin: '4px 0' }} />
                                <button onClick={() => { setOpenMenuId(null); setDeleteConfirm(event.eventId ?? null); }}
                                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'transparent', border: 'none', color: '#f87171', padding: '0.5rem', cursor: 'pointer', borderRadius: '6px', textAlign: 'left', fontSize: '0.85rem' }}
                                  onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')}
                                  onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                  <Trash2 size={14} color="#f87171" /> Eliminar
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </motion.div>

      {deleteConfirm && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, backdropFilter: 'blur(4px)', padding: '1rem' }}>
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="glass-card" style={{ padding: '2rem', maxWidth: 400, width: '100%', textAlign: 'center' }}>
            <Trash2 size={40} color="#f87171" style={{ margin: '0 auto 1rem' }} />
            <h3 style={{ color: 'var(--text-primary)', fontSize: '1.2rem', marginBottom: '0.75rem' }}>Eliminar Evento</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>¿Estás seguro de que deseas eliminar este evento? Esta acción no se puede deshacer.</p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button className="btn-secondary" style={{ flex: 1 }} onClick={() => setDeleteConfirm(null)}>Cancelar</button>
              <button className="btn-danger" style={{ flex: 1, padding: '0.75rem', borderRadius: 50 }} onClick={() => handleDelete(deleteConfirm)}>Eliminar</button>
            </div>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminDashboard;
