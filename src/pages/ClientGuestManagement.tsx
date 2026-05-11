import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, Check, X, Clock, Copy, Link2 } from 'lucide-react';
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
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative', overflow: 'hidden' }}>
      {/* Background orbs */}
      <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-200px', left: '-200px', opacity: 0.2 }} />
      <div className="orb orb-blue" style={{ width: 400, height: 400, bottom: '-100px', right: '-100px', opacity: 0.15 }} />
      {/* Header Section from Image Reference */}
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
          position: 'sticky',
          top: 0,
          zIndex: 100
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

      <div className="container" style={{ position: 'relative', zIndex: 1, padding: '1rem 1.5rem' }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div style={{
            position: 'sticky',
            top: '72px',
            zIndex: 90,
            background: 'var(--bg-primary)',
            padding: '0.75rem 0',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--border-glass)'
          }}>
            <div className="stats-grid" style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '0.75rem',
              marginBottom: '1rem'
            }}>
              <div className="glass-card-sm" style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2) 0%, rgba(9, 7, 33, 0.8) 100%)',
                border: '1px solid rgba(74, 222, 128, 0.3)'
              }}>
                <div className="stat-icon-container" style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(74, 222, 128, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={18} color="#4ade80" />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{attendingGuests}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: '0.1rem' }}>Asistirán</div>
                </div>
              </div>

              <div className="glass-card-sm" style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, rgba(248, 113, 113, 0.2) 0%, rgba(9, 7, 33, 0.8) 100%)',
                border: '1px solid rgba(248, 113, 113, 0.3)'
              }}>
                <div className="stat-icon-container" style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(248, 113, 113, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <X size={18} color="#f87171" />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{notAttendingGuests}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: '0.1rem' }}>No asistirán</div>
                </div>
              </div>

              <div className="glass-card-sm" style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, rgba(167, 139, 250, 0.2) 0%, rgba(9, 7, 33, 0.8) 100%)',
                border: '1px solid rgba(167, 139, 250, 0.3)'
              }}>
                <div className="stat-icon-container" style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(122, 160, 232, 0.27)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Clock size={18} color="#a78bfa" />
                </div>
                <div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)', lineHeight: 1 }}>{pendingGuests}</div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: '0.1rem' }}>Pendientes</div>
                </div>
              </div>

              <div className="glass-card-sm" style={{
                padding: '0.75rem',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                background: 'linear-gradient(135deg, rgba(215, 178, 114, 0.2) 0%, rgba(9, 7, 33, 0.8) 100%)',
                border: '1px solid rgba(215, 178, 114, 0.3)'
              }}>
                <div className="stat-icon-container" style={{ width: 36, height: 36, borderRadius: 10, background: 'rgba(215, 178, 114, 0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span style={{ fontSize: '1rem', fontWeight: 'bold', color: 'var(--color-gold)' }}>#</span>
                </div>
                <div style={{ flex: 1 }}>
                  <input
                    type="number"
                    value={totalGuests}
                    onChange={e => setTotal(e.target.value)}
                    className="input-field"
                    style={{ padding: '0.2rem 0.4rem', fontSize: '1rem', fontWeight: 'bold', textAlign: 'center', height: 'auto', background: 'transparent' }}
                  />
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.6rem', marginTop: '0.1rem', textAlign: 'center' }}>Total</div>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: 'auto',
                  minWidth: '240px',
                  padding: '0.7rem 2rem',
                  fontSize: '0.9rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.6rem',
                  boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
                  background: 'linear-gradient(to right,  #3b82f6, #8b5cf6)',
                }}
              >
                <Save size={18} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
              </motion.button>
            </div>
          </div>

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
                    background: 'linear-gradient(135deg, rgba(73, 139, 237, 0.44) 0%, #141228 100%)',
                    padding: '1.25rem',
                    position: 'relative',
                    border: '1px solid #A5ADB8'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {/* Row 1: Name and Companions */}
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
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

      <style>{`
        .companions-container { width: 100px; }
        
        @media (max-width: 991px) {
          .main-header { padding: 0.5rem 0.75rem !important; height: 56px !important; }
          .header-brand { display: none !important; }
          .header-title-container { position: static !important; transform: none !important; margin: 0 auto; }
          .header-title-container h1 { fontSize: 0.8rem !important; }
          .btn-text { display: none !important; }
          
          .companions-container { width: 100% !important; }
          .stats-grid { 
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 0.5rem !important;
          }
          .glass-card-sm {
            padding: 0.5rem !important;
          }
          .stat-icon-container {
            width: 28px !important;
            height: 28px !important;
          }
          .stat-icon-container svg {
            width: 14px !important;
            height: 14px !important;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
             grid-template-columns: repeat(2, 1fr) !important;
          }
          .glass-card-sm {
            flex-direction: row !important;
            justify-content: center !important;
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
