import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Plus, Trash2, Edit, Eye, Settings2, TrendingUp, CheckCircle, Clock, MoreVertical, CreditCard, Mail, Phone, List, ChevronLeft, ChevronRight, Filter, Ban, FilePen, BookCheck } from 'lucide-react';
import { ElementType } from 'react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';
import toast from 'react-hot-toast';
import type { WeddingEvent } from '../types';

const typeLabels: Record<string, string> = { web: 'Inv. Boda Web', video: 'Inv. Boda Video', card: 'Inv. Boda Card' };

const statusLabels: Record<string, string> = {
  all: 'Todos',
  draft: 'Borrador',
  active: 'Activo',
  inactive: 'Cancelado',
  concluded: 'Concluido'
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { events, isLoading, fetchEvents, deleteEvent } = useEventsStore();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => { fetchEvents(); }, []);

  const filteredEvents = events.filter(e => filterStatus === 'all' ? true : e.status === filterStatus);
  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage);
  const paginatedEvents = filteredEvents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const stats = {
    total: events.length,
    draft: events.filter(e => e.status === 'draft').length,
    active: events.filter(e => e.status === 'active').length,
    cancelled: events.filter(e => e.status === 'inactive').length,
    concluded: 0 // Mocked for now as per schema
  };

  const handleDelete = async (id: string) => {
    const result = await deleteEvent(id);
    if (result.success) { toast.success('Evento eliminado exitosamente'); setDeleteConfirm(null); }
    else { toast.error(result.message || 'Error al eliminar'); }
  };

  const formatDate = (d?: string) => d ? new Date(d).toLocaleDateString('es-CO', { day: '2-digit', month: 'short', year: 'numeric' }) : '—';

  return (
    <AdminLayout>
      <div className="admin-header" style={{
        marginBottom: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '1rem',
        flexWrap: 'wrap'
      }}>
        <div style={{ flex: '1 1 300px' }}>
          <h2 style={{ fontSize: 'clamp(1.5rem, 4vw, 2.2rem)', fontWeight: 700, lineHeight: 1.1, margin: 0 }}>
            Gestión de eventos
            <span style={{
              fontWeight: 800,
              background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #D7B272)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginLeft: '0.5rem'
            }}>para bodas</span>
          </h2>
        </div>
        <Link to="/wedding/Admin/events/new" style={{ textDecoration: 'none' }}>
          <motion.button className="btn-primary" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
            style={{
              background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              padding: '0.8rem 1.6rem',
              width: 'max-content',
              borderRadius: '50px',
              fontWeight: 600,
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.4)'
            }}>
            <Plus size={20} /> Crear Evento
          </motion.button>
        </Link>
      </div>

      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        className="glass-card" style={{
          padding: '2rem',
          background: 'linear-gradient(135deg, rgba(73, 139, 237, 0.44) 0%, #141228  100%)',
          border: 'rgba(138,196,224,0.3)',
          borderRadius: '24px',
          marginBottom: '2.5rem',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap'
        }}>
        {/* Primary Stat: Total Events */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', flex: '1 1 200px' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '20px',
            background: 'rgba(139, 92, 246, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid rgba(139, 92, 246, 0.3)'
          }}>
            <Calendar size={32} color="#a78bfa" />
          </div>
          <div>
            <div style={{ fontSize: '2.5rem', fontWeight: 800, color: '#fff', lineHeight: 1 }}>{stats.total}</div>
            <div style={{ fontSize: '0.85rem', color: '#a78bfa', fontWeight: 600, marginTop: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total Eventos</div>
          </div>
        </div>

        <div style={{ width: '1px', height: '60px', background: 'rgba(255,255,255,0.1)', display: 'none' }} className="stats-divider-main" />

        {/* Secondary Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
          gap: '1.5rem',
          flex: '3 1 400px'
        }}>
          {[
            { label: 'Activos', value: stats.active, icon: CheckCircle, color: '#a0aeb9ff', bg: 'rgba(74, 222, 128, 0.1)' },
            { label: 'En Borrador', value: stats.draft, icon: FilePen, color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.1)' },
            { label: 'Cancelados', value: stats.cancelled, icon: Ban, color: '#f87171', bg: 'rgba(248, 113, 113, 0.1)' },
            { label: 'Concluidos', value: stats.concluded, icon: BookCheck, color: '#4ade80', bg: 'rgba(215, 178, 114, 0.1)' },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: item.bg,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: `1px solid ${item.color}33`
              }}>
                <item.icon size={20} color={item.color} />
              </div>
              <div>
                <div style={{ fontSize: '1.25rem', fontWeight: 700, color: '#fff', lineHeight: 1 }}>{item.value}</div>
                <div style={{ fontSize: '0.7rem', color: '#94a3b8', fontWeight: 500, marginTop: '0.2rem' }}>{item.label}</div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>


      <div className="glass-card" style={{ borderRadius: '20px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.08)', background: 'rgba(20, 18, 40, 0.4)' }}>
        <div style={{ padding: '1.25rem 1.5rem', background: 'rgba(231, 12, 12, 0.02)', borderBottom: '1px solid rgba(255,255,255,0.05)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(59, 130, 246, 0.15)', padding: '0.6rem', borderRadius: '10px' }}><List size={20} color="#3b82f6" /></div>
            <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: '#ffffff', margin: 0 }}>Eventos registrados</h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <span style={{ background: 'rgba(255,255,255,0.05)', padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{filteredEvents.length} total</span>
            <div style={{ position: 'relative' }}>
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setCurrentPage(1); }}
                style={{
                  background: 'rgba(20, 18, 40, 0.9)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  padding: '0.6rem 2.5rem 0.6rem 1rem',
                  borderRadius: '10px',
                  fontSize: '0.85rem',
                  appearance: 'none',
                  cursor: 'pointer',
                  minWidth: '140px'
                }}
              >
                {Object.entries(statusLabels).map(([key, label]) => (
                  <option key={key} value={key} style={{ background: '#141228' }}>{label}</option>
                ))}
              </select>
              <Filter size={14} color="#94a3b8" style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} />
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          {isLoading ? (
            <div style={{ padding: '4rem', textAlign: 'center' }}>
              <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.05)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite', margin: '0 auto 1.5rem' }} />
              <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>Cargando eventos...</p>
            </div>
          ) : filteredEvents.length === 0 ? (
            <div style={{ padding: '5rem', textAlign: 'center' }}>
              <Calendar size={56} color="rgba(255,255,255,0.1)" style={{ margin: '0 auto 1.5rem', display: 'block' }} />
              <p style={{ color: '#94a3b8', fontSize: '1rem', marginBottom: '1.5rem' }}>No se encontraron eventos con este estado</p>
              <button className="btn-primary" onClick={() => setFilterStatus('all')} style={{ padding: '0.6rem 1.5rem' }}>Ver todos</button>
            </div>
          ) : (
            <div className="table-responsive-wrapper">
              <table className="data-table dashboard-table" style={{ width: '100%', borderCollapse: 'collapse', color: 'white' }}>
                <thead>
                  <tr style={{ background: 'rgba(255,255,255,0.01)', textAlign: 'left' }}>
                    <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Evento</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Contacto</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', fontWeight: 600, fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.1em', width: '140px' }}>Estado</th>
                    <th style={{ padding: '1.25rem 1.5rem', color: '#94a3b8', width: '80px', textAlign: 'center' }}></th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedEvents.map((event, idx) => {
                    const isLast = idx >= paginatedEvents.length - 2;
                    return (
                      <tr key={event._id} className="dashboard-row" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }}>
                        <td style={{ padding: '1.5rem 1.5rem' }}>
                          <div style={{ marginBottom: '0.6rem' }}>
                            <span className={`badge badge-${event.type || 'web'}`} style={{ fontSize: '0.65rem', borderRadius: '4px', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{typeLabels[event.type || ''] || 'Web'}</span>
                          </div>
                          <div>
                            <div style={{ color: '#FFFFFF', fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.35rem' }}>{event.wedding?.coupleNames || '—'}</div>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                              <Calendar size={14} color="#3b82f6" /> {formatDate(event.wedding?.weddingDate)}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.5rem 1.5rem' }}>
                          <div style={{ fontWeight: 700, color: '#ffffff', fontSize: '1rem', marginBottom: '0.6rem' }}>{event.contact?.name || '—'}</div>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <Mail size={14} color="#8b5cf6" /> {event.contact?.email || '—'}
                            </div>
                            <div style={{ color: '#94a3b8', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                              <Phone size={14} color="#3b82f6" /> {event.contact?.phone || '—'}
                            </div>
                          </div>
                        </td>
                        <td style={{ padding: '1.5rem 1.5rem' }}>
                          <span className={`badge badge-${event.status || 'draft'}`} style={{
                            fontSize: '0.7rem',
                            fontWeight: 800,
                            padding: '0.45rem 1rem',
                            borderRadius: '8px',
                            background: event.status === 'active' ? 'rgba(74, 222, 128, 0.1)' : event.status === 'draft' ? 'rgba(251, 191, 36, 0.1)' : 'rgba(248, 113, 113, 0.1)',
                            color: event.status === 'active' ? '#4ade80' : event.status === 'draft' ? '#fbbf24' : '#f87171',
                            border: `1px solid ${event.status === 'active' ? 'rgba(74, 222, 128, 0.2)' : event.status === 'draft' ? 'rgba(251, 191, 36, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                          }}>
                            {(statusLabels[event.status] || 'Borrador').toUpperCase()}
                          </span>
                        </td>
                        <td style={{ padding: '1.5rem 1.5rem', textAlign: 'center' }}>
                          <div style={{ position: 'relative', display: 'inline-block' }}>
                            <button onClick={() => setOpenMenuId(openMenuId === event.eventId ? null : (event.eventId ?? null))}
                              style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)', color: '#fff', padding: '0.6rem', cursor: 'pointer', borderRadius: '10px', transition: 'all 0.2s' }}>
                              <MoreVertical size={18} />
                            </button>
                            {openMenuId === event.eventId && (
                              <>
                                <div style={{ position: 'fixed', inset: 0, zIndex: 40 }} onClick={() => setOpenMenuId(null)} />
                                <div className="action-menu" style={{ position: 'absolute', right: '0', top: isLast ? 'auto' : '100%', bottom: isLast ? '100%' : 'auto', background: '#141228', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '0.6rem', zIndex: 50, minWidth: '180px', boxShadow: '0 15px 50px rgba(0,0,0,0.6)' }}>
                                  {[
                                    { label: 'Ver Detalle', icon: Eye, color: '#a78bfa', action: () => { setOpenMenuId(null); navigate(`/wedding/Admin/events/${event.eventId}`); } },
                                    ...(event.type === 'web' ? [{ label: 'Componentes', icon: Settings2, color: '#60a5fa', action: () => { setOpenMenuId(null); navigate(`/wedding/Admin/events/${event.eventId}/components`); } }] : []),
                                    {
                                      label: 'Ver Tarjeta', icon: CreditCard, color: '#4ade80', action: () => {
                                        setOpenMenuId(null);
                                        const guests = event.components?.guestManagement?.guests;
                                        const firstGuestUrl = guests && guests.length > 0 ? guests[0].urlCard : null;
                                        const frontUrl = import.meta.env.VITE_FRONT_URL || window.location.origin;
                                        const baseFrontUrl = frontUrl.replace(/\/$/, '');
                                        if (firstGuestUrl) {
                                          window.open(firstGuestUrl.startsWith('http') ? firstGuestUrl : `${baseFrontUrl}/${firstGuestUrl}`, '_blank');
                                        } else {
                                          window.open(`${baseFrontUrl}/wedding/card/${event.eventId}`, '_blank');
                                        }
                                      }
                                    },
                                    { label: 'Editar Evento', icon: Edit, color: '#D7B272', action: () => { setOpenMenuId(null); navigate(`/wedding/Admin/events/${event.eventId}/edit`); } },
                                  ].map(({ label, icon: BtnIcon, color: btnColor, action }) => (
                                    <button key={label} onClick={action} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'transparent', border: 'none', color: '#e2e8f0', padding: '0.7rem 0.85rem', cursor: 'pointer', borderRadius: '10px', width: '100%', fontSize: '0.85rem', transition: 'background 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                      <BtnIcon size={16} color={btnColor} /> {label}
                                    </button>
                                  ))}
                                  <div style={{ height: '1px', background: 'rgba(255,255,255,0.06)', margin: '6px 0' }} />
                                  <button onClick={() => { setOpenMenuId(null); setDeleteConfirm(event.eventId ?? null); }} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', background: 'transparent', border: 'none', color: '#f87171', padding: '0.7rem 0.85rem', cursor: 'pointer', borderRadius: '10px', width: '100%', fontSize: '0.85rem', transition: 'background 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.1)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                                    <Trash2 size={16} color="#f87171" /> Eliminar
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

              {/* Pagination UI */}
              <div style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid rgba(255,255,255,0.05)', background: 'rgba(255,255,255,0.01)' }}>
                <div style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
                  Mostrando <span style={{ color: '#ffffff', fontWeight: 600 }}>{(currentPage - 1) * itemsPerPage + 1}</span> - <span style={{ color: '#ffffff', fontWeight: 600 }}>{Math.min(currentPage * itemsPerPage, filteredEvents.length)}</span> de <span style={{ color: '#ffffff', fontWeight: 600 }}>{filteredEvents.length}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.6rem' }}>
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: currentPage === 1 ? '#475569' : '#fff', padding: '0.5rem', borderRadius: '10px', cursor: currentPage === 1 ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
                  >
                    <ChevronLeft size={18} />
                  </button>
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: currentPage === i + 1 ? 'transparent' : 'rgba(255,255,255,0.08)',
                        background: currentPage === i + 1 ? 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)' : 'rgba(255,255,255,0.03)',
                        color: '#fff',
                        cursor: 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: 700,
                        transition: 'all 0.2s',
                        boxShadow: currentPage === i + 1 ? '0 4px 15px rgba(59, 130, 246, 0.4)' : 'none'
                      }}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages || totalPages === 0}
                    onClick={() => setCurrentPage(p => p + 1)}
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: (currentPage === totalPages || totalPages === 0) ? '#475569' : '#fff', padding: '0.5rem', borderRadius: '10px', cursor: (currentPage === totalPages || totalPages === 0) ? 'not-allowed' : 'pointer', transition: 'all 0.2s' }}
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>


      <style>{`
        @media (min-width: 992px) {
          .stats-divider-main {
            display: block !important;
          }
        }
        
        @media (max-width: 991px) {
          .admin-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.75rem !important;
            margin-bottom: 0.5rem !important;
          }
          .admin-header > div {
            flex: none !important;
          }
          .admin-header h2 {
            margin: 0 !important;
            line-height: 1.2 !important;
          }
          .admin-header > a {
            width: 100%;
          }
          .admin-header button {
            width: 100% !important;
            justify-content: center;
            margin-bottom: 0.5rem;
          }
          
          /* Tighten stats card spacing */
          .glass-card:first-of-type {
            margin-top: 0 !important;
            margin-bottom: 1rem !important;
            padding: 1.25rem !important;
          }
          
          .glass-card {
            margin-left: -1.2rem !important;
            margin-right: -1.2rem !important;
          }
          
          /* Transform table to cards */
          .dashboard-table thead {
            display: none;
          }
          .dashboard-table, .dashboard-table tbody, .dashboard-table tr, .dashboard-table td {
            display: block;
            width: 100%;
          }
          .dashboard-row {
            margin-bottom: 1.25rem;
            background: rgba(255,255,255,0.03) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            border-radius: 16px;
            padding: 1.25rem !important;
            display: flex !important;
            flex-direction: column;
            gap: 1rem;
            position: relative;
          }
          .dashboard-table td {
            padding: 0 !important;
            border-bottom: none !important;
          }
          
          /* Align Action button next to Status */
          .dashboard-row td:last-child {
            position: absolute;
            top: 1.25rem;
            right: 1.25rem;
            width: auto !important;
          }
          
          .action-menu {
            right: 0 !important;
            top: 100% !important;
          }
        }
      `}</style>

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
