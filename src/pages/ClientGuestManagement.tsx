import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Check, X, Clock, Copy, Link2, Trash2, Plus, Minus } from 'lucide-react';
import toast from 'react-hot-toast';
import api, { eventsService } from '../services/api';
import useAuthStore from '../stores/authStore';
import logoSitio from '../assets/logositio.jpg';

const ClientGuestManagement = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  const [event, setEvent] = useState<any>(null);
  const [data, setData] = useState<any>({});
  const [initials, setInitials] = useState<string>('BOD');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [guestToDeleteIndex, setGuestToDeleteIndex] = useState<number | null>(null);

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
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }

      const res = await eventsService.getById(eventId!);
      const eventData = res.data.data;

      setEvent(eventData);

      if (eventData.status === 'finalized') {
        toast.error('Evento Finalizado');
        navigate('/');
        return;
      }

      const gmData = eventData.components?.guestManagement || {};
      setData(gmData);

      const envelopeText = eventData.components?.envelope?.initialsCoupleText || 'BOD';
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
      const updatedData = { ...data };

      if (updatedData.guests && updatedData.guests.length > 0) {
        updatedData.guests = updatedData.guests.map((g: any) => {
          if (!g.token) {
            const randomStr = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
            g.token = `${initials}${randomStr}`;
            g.urlCard = `wedding/card/${g.token}`;
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

  // Theming variables
  const colors = event?.components?.eventDetails || {};
  const theme = {
    bgFrom: colors.backgroundColorFrom || '#334155',
    gold: colors.detailItemTitleColor || '#d4af37',
    bgVia: colors.backgroundColorVia || '#475569',
    white: colors.detailItemText1Color || '#ffffff',
    dark: colors.detailIconColor || '#0f172a',
    beige: colors.backgroundColorIconMoments || '#f5f5dc',
    coffee: colors.detailsColor || '#8b4513',
    gray: colors.detailIcon2Color || '#9ca3af',
  };

  const coupleNames = event?.wedding?.coupleNames || '';

  const totalGuests = data?.totalGuests || 0;
  const guests = data?.guests || [];

  const attendingGuests = guests.filter((g: any) => g.confirmation === 'si').length;
  const notAttendingGuests = guests.filter((g: any) => g.confirmation === 'no').length;
  const pendingGuests = guests.filter((g: any) => g.confirmation !== 'si' && g.confirmation !== 'no').length;

  const incrementGuests = () => {
    setTotal((totalGuests + 1).toString());
  };

  const decrementGuests = () => {
    if (totalGuests > 0) {
      setTotal((totalGuests - 1).toString());
    }
  };

  const handleRemoveGuest = (index: number) => {
    setGuestToDeleteIndex(index);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (guestToDeleteIndex === null) return;

    const index = guestToDeleteIndex;
    const newGuests = [...guests];
    newGuests.splice(index, 1);
    const newTotal = newGuests.length;

    const updatedData = { ...data, guests: newGuests, totalGuests: newTotal };
    setData(updatedData);
    setShowDeleteModal(false);
    setGuestToDeleteIndex(null);

    setIsSaving(true);
    try {
      await eventsService.updateComponent(eventId!, 'guestManagement', updatedData);
      toast.success('Invitado eliminado exitosamente');
    } catch (error) {
      toast.error('Error al eliminar el invitado');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const setTotal = (n: string) => {
    const num = Math.max(0, parseInt(n) || 0);
    const newGuests = Array.from({ length: num }, (_, i) => {
      const existing = guests[i] || { name: '', companions: 0, confirmation: 'pendiente' };
      return { ...existing };
    });
    setData({ ...data, totalGuests: num, guests: newGuests });
  };

  const setGuest = (i: number, field: string, value: any) => {
    const newGuests = [...guests];
    const val = field === 'companions' ? (parseInt(value) || 0) : value;
    const updatedGuest = { ...newGuests[i], [field]: val };

    newGuests[i] = updatedGuest;
    setData({ ...data, guests: newGuests });
  };

  const copyToClipboard = (text: string) => {
    if (!text || text === 'Generando...') return;
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative' }}>
      {/* Background orbs wrapper to prevent sticky issues */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-200px', left: '-200px', opacity: 0.2 }} />
        <div className="orb orb-blue" style={{ width: 400, height: 400, bottom: '-100px', right: '-100px', opacity: 0.15 }} />
      </div>

      <div style={{ position: 'sticky', top: 0, zIndex: 100, width: '100%' }}>
        {/* Header Section */}
        <header
          className="main-header"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '1rem 2rem',
            background: 'rgba(9, 7, 33, 0.7)',
            borderBottom: '1px solid var(--border-glass)',
            backdropFilter: 'blur(12px)',
            position: 'relative',
            zIndex: 101
          }}
        >
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border-glass)', flexShrink: 0 }}>
              <img src={logoSitio} alt="Ideación 360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div className="header-brand">
              <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-display)', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ideación 360</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Gestión de Invitados</div>
            </div>
          </Link>

          <div style={{ textAlign: 'center', position: 'absolute', left: '50%', transform: 'translateX(-50%)' }} className="header-title-container">
            <h1 style={{ fontSize: '1rem', fontWeight: 600, margin: 0, color: 'var(--text-primary)', fontFamily: 'var(--font-body)', whiteSpace: 'nowrap' }}>
              Boda <span className="gradient-text" style={{ fontWeight: 700 }}>{coupleNames}</span>
            </h1>
          </div>

          <button
            onClick={() => {
              useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
              localStorage.removeItem('auth_token');
              localStorage.removeItem('auth_user');
              navigate('/');
            }}
            className="btn-secondary"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.5rem 1rem',
              fontSize: '0.8rem',
              flexShrink: 0
            }}
          >
            <ArrowLeft size={14} /> <span className="btn-text">Salir</span>
          </button>
        </header>
        <div className="sticky-stats-bar">
          <div className="container" style={{ padding: '0 1.5rem' }}>
            <div className="glass-card main-dashboard-card" style={{
              padding: '1rem 1.5rem',
              background: 'linear-gradient(135deg, rgba(41, 51, 75, 0.42) 100%, #3531478e  0%)',
              border: '1px solid #0d122aff',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4)',
              overflow: 'hidden'
            }}>
              <div className="dashboard-inner-layout">
                {/* Total invitados section */}
                <div className="total-section">
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: 24, height: 24, borderRadius: 6, background: 'rgba(240, 156, 11, 0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>#</span>
                    </div>
                    <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Total invitados</div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button onClick={decrementGuests} className="guest-control-btn" title="Quitar invitado">
                      <Minus size={16} />
                    </button>
                    <input
                      type="number"
                      value={totalGuests}
                      onChange={e => setTotal(e.target.value)}
                      className="input-field guest-total-input"
                      style={{
                        width: '70px',
                        fontSize: '1.5rem',
                        fontWeight: 800,
                        textAlign: 'center',
                        background: 'rgba(0,0,0,0.3)',
                        border: '1px solid var(--border-glass)',
                        borderRadius: '0.5rem',
                        padding: '0.25rem'
                      }}
                    />
                    <button onClick={incrementGuests} className="guest-control-btn" title="Agregar invitado">
                      <Plus size={16} />
                    </button>
                  </div>
                </div>

                {/* Vertical Divider (Desktop only) */}
                <div className="dashboard-divider" />

                {/* Stats sections */}
                <div className="stats-group">
                  {/* Asistirán */}
                  <div className="stat-item">
                    <div className="stat-icon-wrapper" style={{ background: 'rgba(74, 222, 128, 0.1)' }}>
                      <Check size={18} color="#4ade80" />
                    </div>
                    <div>
                      <div className="stat-value">{attendingGuests}</div>
                      <div className="stat-label">Asistirán</div>
                    </div>
                  </div>

                  {/* No Asistirán */}
                  <div className="stat-item">
                    <div className="stat-icon-wrapper" style={{ background: 'rgba(248, 113, 113, 0.1)' }}>
                      <X size={18} color="#f87171" />
                    </div>
                    <div>
                      <div className="stat-value">{notAttendingGuests}</div>
                      <div className="stat-label">No asistirán</div>
                    </div>
                  </div>

                  {/* Pendientes */}
                  <div className="stat-item">
                    <div className="stat-icon-wrapper" style={{ background: 'rgba(167, 139, 250, 0.1)' }}>
                      <Clock size={18} color="#a78bfa" />
                    </div>
                    <div>
                      <div className="stat-value">{pendingGuests}</div>
                      <div className="stat-label">Pendientes</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1rem' }}>
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: 'auto',
                  minWidth: '240px',
                  padding: '0.75rem 2.5rem',
                  fontSize: '0.95rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.75rem',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  background: 'linear-gradient(to right,  #3b82f6, #8b5cf6)',
                  borderRadius: '2rem'
                }}
              >
                <Save size={20} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '1rem 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem', marginTop: '1rem' }}>
            {guests.map((g: any, i: number) => {
              const cardUrl = g.urlCard ? (() => {
                const frontUrl = import.meta.env.VITE_FRONT_URL || window.location.origin;
                const baseUrl = frontUrl.replace(/\/$/, '');
                const cardPath = g.urlCard.startsWith('/') ? g.urlCard : `/${g.urlCard}`;
                return g.urlCard.startsWith('http') ? g.urlCard : `${baseUrl}${cardPath}`;
              })() : '';

              const cDate = g.confirmationDate ? new Date(g.confirmationDate) : null;
              const dateStr = cDate ? cDate.toLocaleDateString('es-CO', { day: '2-digit', month: 'long' }) : '';
              const timeStr = cDate ? cDate.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';

              const StatusIcon = g.confirmation === 'si' ? Check : g.confirmation === 'no' ? X : Clock;
              const iconColor = g.confirmation === 'si' ? '#4ade80' : g.confirmation === 'no' ? '#f87171' : '#9ca3af';

              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="glass-card"
                  style={{
                    background: 'linear-gradient(135deg, rgba(41, 51, 75, 0.42) 100%, #2b273f8e  100%)',
                    padding: '1.25rem',
                    position: 'relative',
                    border: '1px solid #4f477fff'
                  }}
                >
                  <button
                    onClick={() => handleRemoveGuest(i)}
                    className="guest-delete-btn"
                    title="Eliminar invitado"
                  >
                    <Trash2 size={16} />
                  </button>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Row 1: Name and Companions */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', paddingRight: '2rem' }}>
                      <div style={{ flex: '1 1 200px' }}>
                        <label className="input-label" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Invitado {i + 1}</label>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <div style={{ width: 28, height: 28, borderRadius: '50%', background: `${iconColor}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <StatusIcon size={14} color={iconColor} />
                          </div>
                          <input
                            type="text"
                            value={g.name || ''}
                            onChange={e => setGuest(i, 'name', e.target.value)}
                            className="input-field"
                            placeholder="Nombre del invitado"
                            style={{ opacity: 0.8, fontSize: '0.85rem', padding: '0.4rem 0.75rem' }}
                          />
                        </div>
                      </div>
                      <div style={{ width: '100px', flexShrink: 0 }}>
                        <label className="input-label" style={{ fontSize: '0.6rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Acompañantes</label>
                        <input
                          type="number"
                          min={0}
                          value={g.companions || 0}
                          onChange={e => setGuest(i, 'companions', e.target.value)}
                          className="input-field"
                          style={{ textAlign: 'center', opacity: 0.8, fontSize: '0.85rem', padding: '0.4rem' }}
                        />
                      </div>
                    </div>

                    {/* Row 2: Status, Combined Date & Time */}
                    <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-end' }}>
                      <div style={{ flex: '1 1 40%', minWidth: '0' }}>
                        <label className="input-label" style={{ fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Confirmación</label>
                        <select
                          value={g.confirmation || 'pendiente'}
                          onChange={e => setGuest(i, 'confirmation', e.target.value)}
                          className="input-field"
                          style={{
                            opacity: 0.8,
                            fontSize: '0.8rem',
                            padding: '0 0.75rem',
                            width: '100%',
                            maxWidth: '100%',
                            height: '40px',
                            cursor: 'pointer',
                            appearance: 'auto',
                            boxSizing: 'border-box'
                          }}
                        >
                          <option value="pendiente" style={{ background: '#141228', color: 'white' }}>⏳ Pendiente</option>
                          <option value="si" style={{ background: '#141228', color: 'white' }}>✅ Sí asistirá</option>
                          <option value="no" style={{ background: '#141228', color: 'white' }}>❌ No asistirá</option>
                        </select>
                      </div>
                      <div style={{ flex: '1 1 60%', minWidth: '0' }}>
                        <label className="input-label" style={{ fontSize: '0.6rem', textTransform: 'uppercase', marginBottom: '0.4rem', display: 'block' }}>Fecha y Hora de Confirmación</label>
                        <div className="input-field" style={{
                          opacity: 0.7,
                          fontSize: '0.8rem',
                          padding: '0 0.75rem',
                          display: 'flex',
                          alignItems: 'center',
                          background: 'rgba(0,0,0,0.2)',
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          height: '40px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            {dateStr ? `${dateStr} — ${timeStr}` : 'Pendiente'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Row 3: Message and URL Card */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '2 1 250px' }}>
                        <label className="input-label" style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>Mensaje del Invitado</label>
                        <div className="input-field" style={{ opacity: 0.7, minHeight: '38px', height: 'auto', padding: '0.4rem 0.75rem', fontSize: '0.85rem', color: g.message ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                          {g.message || 'Sin mensaje aún'}
                        </div>
                      </div>
                      <div style={{ flex: '1 1 200px' }}>
                        <label className="input-label" style={{ fontSize: '0.6rem', textTransform: 'uppercase' }}>URL de la Tarjeta</label>
                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                          <div className="input-field" style={{ opacity: 0.7, padding: '0.4rem 0.6rem', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.4rem', overflow: 'hidden', flex: 1 }}>
                            <Link2 size={12} color="var(--color-gold)" style={{ flexShrink: 0 }} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{cardUrl || 'Pendiente'}</span>
                          </div>
                          <button
                            onClick={() => copyToClipboard(cardUrl)}
                            disabled={!cardUrl}
                            className="btn-secondary"
                            style={{ padding: '0.4rem', width: '38px', height: '38px', flexShrink: 0 }}
                          >
                            <Copy size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </motion.div>
      </div>

      {/* Custom Delete Modal */}
      {showDeleteModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0, 0, 0, 0.7)',
          backdropFilter: 'blur(10px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000,
          padding: '1.5rem'
        }}>
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            className="glass-card"
            style={{
              maxWidth: '420px',
              width: '100%',
              padding: '2.5rem 2rem',
              textAlign: 'center',
              background: 'rgba(15, 23, 42, 0.95)',
              border: '1px solid rgba(248, 113, 113, 0.3)',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)',
              position: 'relative',
              overflow: 'hidden'
            }}
          >
            {/* Background glow */}
            <div style={{
              position: 'absolute',
              top: '-50%',
              left: '-50%',
              width: '200%',
              height: '200%',
              background: 'radial-gradient(circle, rgba(248, 113, 113, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <div style={{
                width: 70,
                height: 70,
                borderRadius: '50%',
                background: 'rgba(248, 113, 113, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                border: '1px solid rgba(248, 113, 113, 0.2)',
                boxShadow: '0 0 20px rgba(248, 113, 113, 0.1)'
              }}>
                <Trash2 size={32} color="#f87171" />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem', color: '#fff', fontFamily: 'var(--font-display)' }}>
                ¿Eliminar invitado?
              </h3>

              <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '1rem', marginBottom: '2.5rem', lineHeight: 1.6 }}>
                Estás a punto de eliminar a <span style={{ color: '#fff', fontWeight: 600 }}>{guests[guestToDeleteIndex!]?.name || 'este invitado'}</span>.
                Esta acción es permanente y no se puede deshacer.
              </p>

              <div style={{ display: 'flex', gap: '1rem' }}>
                <button
                  onClick={() => setShowDeleteModal(false)}
                  className="btn-secondary"
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: 600
                  }}
                >
                  Cancelar
                </button>
                <button
                  onClick={confirmDelete}
                  className="btn-primary"
                  style={{
                    flex: 1,
                    padding: '0.85rem',
                    borderRadius: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    background: 'linear-gradient(135deg, #f87171 0%, #ef4444 100%)',
                    border: 'none',
                    boxShadow: '0 4px 15px rgba(239, 68, 68, 0.4)',
                    color: '#fff'
                  }}
                >
                  Sí, eliminar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      <style>{`
        .companions-container { width: 100px; }
        
        .sticky-stats-bar {
          background: rgba(9, 7, 33, 0.85);
          backdrop-filter: blur(15px);
          padding: 1rem 0;
          border-bottom: 1px solid var(--border-glass);
          box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        }

        .dashboard-inner-layout {
          display: flex;
          align-items: center;
          gap: 2rem;
          justify-content: space-between;
        }

        .total-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding-right: 1rem;
        }

        .dashboard-divider {
          width: 1px;
          height: 60px;
          background: var(--border-glass);
        }

        .stats-group {
          display: flex;
          flex: 1;
          justify-content: space-around;
          gap: 1.5rem;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .stat-icon-wrapper {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(255, 255, 255, 0.05);
        }

        .stat-value {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          color: var(--text-muted);
          font-size: 0.7rem;
          text-transform: uppercase;
          margin-top: 0.1rem;
          letter-spacing: 0.02em;
        }

        .guest-control-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .guest-control-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: scale(1.05);
        }

        .guest-delete-btn {
          position: absolute;
          top: 1.25rem;
          right: 1.25rem;
          background: rgba(248, 113, 113, 0.1);
          border: 1px solid rgba(248, 113, 113, 0.3);
          color: #f87171;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          z-index: 10;
        }
        .guest-delete-btn:hover {
          background: rgba(248, 113, 113, 0.2);
          transform: scale(1.1);
        }

        .guest-total-input::-webkit-outer-spin-button,
        .guest-total-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        .guest-total-input[type=number] {
          -moz-appearance: textfield;
        }

        @media (max-width: 991px) {
          .main-header { padding: 0.5rem 0.75rem !important; height: 56px !important; }
          .header-brand { display: none !important; }
          .header-title-container { position: static !important; transform: none !important; margin: 0 auto; }
          .header-title-container h1 { fontSize: 0.8rem !important; }
          .btn-text { display: none !important; }
          
          .companions-container { width: 100% !important; }
          
          .sticky-stats-bar {
            padding: 0.75rem 0;
          }
          .dashboard-inner-layout {
            flex-direction: column;
            gap: 1.25rem;
          }
          .total-section {
            padding-right: 0;
            width: 100%;
          }
          .dashboard-divider {
            width: 100%;
            height: 1px;
          }
          .stats-group {
            width: 100%;
            justify-content: space-between;
            gap: 0.5rem;
          }
          .stat-item {
            flex-direction: column;
            text-align: center;
            gap: 0.4rem;
          }
          .stat-icon-wrapper {
            width: 32px;
            height: 32px;
          }
          .stat-value {
            font-size: 1.1rem;
          }
          .stat-label {
            font-size: 0.6rem;
          }
        }

        @media (max-width: 768px) {
          .container { padding: 0.5rem !important; }
        }
      `}</style>
    </div>
  );
};

export default ClientGuestManagement;
