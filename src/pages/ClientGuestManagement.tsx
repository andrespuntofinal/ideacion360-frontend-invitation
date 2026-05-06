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
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: '#15132a', color: theme.white, padding: '0', fontFamily: 'var(--font-body)' }}>
      {/* Header Section from Image Reference */}
      <header 
        className="app-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0.75rem 2rem',
          background: 'rgba(0,0,0,0.3)',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          backdropFilter: 'blur(10px)',
          position: 'relative',
          zIndex: 100
        }}
      >
        {/* Left: Brand */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.1rem', flexShrink: 0 }}>
          <div className="header-logo" style={{ width: 45, height: 45, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '2px solid white' }}>
            <img src={logoSitio} alt="Ideación 360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span className="header-brand-text" style={{ fontSize: '0.75rem', fontWeight: 'bold', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ideación 360</span>
        </Link>

        {/* Center: Title */}
        <div style={{ textAlign: 'center', flex: 1, padding: '0 0.5rem', minWidth: 0 }}>
          <h1 style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', fontWeight: '500', margin: 0, letterSpacing: '0.01em', color: theme.white, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            Administrar invitados
          </h1>
        </div>

        {/* Right: Exit */}
        <button
          onClick={() => {
            useAuthStore.setState({ token: null, user: null, isAuthenticated: false });
            localStorage.removeItem('auth_token');
            localStorage.removeItem('auth_user');
            navigate('/');
          }}
          className="exit-button"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            background: 'transparent',
            border: `1px solid ${theme.gold}88`,
            color: theme.gold,
            borderRadius: '25px',
            cursor: 'pointer',
            fontSize: '0.8rem',
            transition: 'all 0.3s ease',
            flexShrink: 0
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(212, 175, 55, 0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <ArrowLeft size={14} /> <span>Salir</span>
        </button>
      </header>

      <div className="container" style={{ maxWidth: '100%', width: '100%', padding: '1.5rem', margin: '0 auto' }}>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>

          {/* Summary Panels Grid */}
          <div style={{ textAlign: 'center', flex: 1 }}>

            <h2 style={{ fontSize: 'clamp(0.9rem, 2.5vw, 1.4rem)', fontWeight: '300', margin: '0.2rem 0 0', opacity: 0.9 }}>Boda &nbsp;{coupleNames}</h2>
            <br />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>

            {/* Left Panel: Resumen de Asistencia */}
            <div style={{ flex: '2 1 0', border: `1.5px solid ${theme.gold}88`, borderRadius: '12px', padding: '1.25rem', background: theme.bgFrom, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: theme.gold, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>Resumen de Asistencia</h3>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: theme.bgVia, padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Check size={28} color="#4ade80" style={{ flexShrink: 0, opacity: 0.8 }} />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: theme.white, opacity: 0.7, lineHeight: '1.2' }}>Confirmados que asistirán:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{attendingGuests}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: theme.bgVia, padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <X size={28} color="#ef4444" style={{ flexShrink: 0, opacity: 0.8 }} />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: theme.white, opacity: 0.7, lineHeight: '1.2' }}>Confirmados que no asistirán:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{notAttendingGuests}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: theme.bgVia, padding: '1rem', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <Clock size={28} color={theme.gold} style={{ flexShrink: 0, opacity: 0.8 }} />
                  <div>
                    <div style={{ fontSize: '0.7rem', color: theme.white, opacity: 0.7, lineHeight: '1.2' }}>Faltan por confirmar:</div>
                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>{pendingGuests}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Panel: Cantidad de Invitados */}
            <div style={{ flex: '1 1 0', border: `1.5px solid ${theme.gold}88`, borderRadius: '12px', padding: '1.25rem', background: theme.bgFrom, display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ color: theme.gold, fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1.25rem', letterSpacing: '0.05em' }}>Cantidad de Invitados</h3>

              <div style={{
                position: 'relative',
                marginTop: '0.5rem',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '8px',
                padding: '0.75rem 1rem',
                backgroundColor: theme.bgVia,
              }}>

                <input
                  type="number"
                  value={totalGuests}
                  onChange={e => setTotal(e.target.value)}
                  style={{ width: '100%', background: 'transparent', border: 'none', color: theme.white, fontSize: '1.2rem', fontWeight: 'bold', outline: 'none' }}
                />
              </div>
            </div>

          </div>

          {/* Gestión Individual */}
          <div style={{ border: `1.5px solid ${theme.gold}88`, borderRadius: '12px', padding: '1.25rem', background: theme.bgFrom }}>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {guests.map((g: any, i: number) => {
                const cDate = g.confirmationDate ? new Date(g.confirmationDate) : null;
                const dateStr = cDate ? cDate.toLocaleDateString('es-CO', { day: '2-digit', month: 'long', year: 'numeric' }) : '';
                const timeStr = cDate ? cDate.toLocaleTimeString('es-CO', { hour: 'numeric', minute: '2-digit', hour12: true }) : '';

                const cardUrl = g.urlCard ? (() => {
                  const frontUrl = import.meta.env.VITE_FRONT_URL || window.location.origin;
                  const baseUrl = frontUrl.replace(/\/$/, '');
                  const cardPath = g.urlCard.startsWith('/') ? g.urlCard : `/${g.urlCard}`;
                  return g.urlCard.startsWith('http') ? g.urlCard : `${baseUrl}${cardPath}`;
                })() : '';

                return (
                  <div key={i} style={{ background: theme.white, borderRadius: '12px', overflow: 'hidden', border: `2.5px solid ${theme.gold}`, boxShadow: '0 4px 6px rgba(0,0,0,0.05)' }}>
                    {/* Primary Guest Info Row */}
                    <div style={{ padding: '0.85rem', background: 'rgba(0,0,0,0.02)', borderBottom: '1px solid rgba(0,0,0,0.05)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '2 1 200px' }}>
                        <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Invitado {i + 1}: Nombre</label>
                        <input
                          type="text"
                          placeholder="Ingrese nombre del invitado"
                          value={g.name || ''}
                          onChange={e => setGuest(i, 'name', e.target.value)}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', border: `2px solid ${theme.gold}44`, borderRadius: '8px', background: 'white', color: theme.dark, outline: 'none', fontSize: '0.9rem', transition: 'border-color 0.2s' }}
                          onFocus={(e) => e.target.style.borderColor = theme.gold}
                          onBlur={(e) => e.target.style.borderColor = `${theme.gold}44`}
                        />
                      </div>
                      <div style={{ flex: '1 1 100px' }}>
                        <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Acompañantes</label>
                        <input
                          type="number"
                          min={0}
                          max={20}
                          value={g.companions || 0}
                          onChange={e => setGuest(i, 'companions', e.target.value)}
                          style={{ width: '100%', padding: '0.6rem 0.8rem', border: `2px solid ${theme.gold}44`, borderRadius: '8px', background: 'white', color: theme.dark, outline: 'none', textAlign: 'center', fontSize: '0.9rem' }}
                          onFocus={(e) => e.target.style.borderColor = theme.gold}
                          onBlur={(e) => e.target.style.borderColor = `${theme.gold}44`}
                        />
                      </div>
                    </div>

                    <div style={{ padding: '0.85rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                      {/* Confirmation Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                        <div>
                          <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Confirmación</label>
                          <select
                            value={g.confirmation || 'pendiente'}
                            onChange={e => setGuest(i, 'confirmation', e.target.value)}
                            style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '8px', color: theme.dark, outline: 'none', background: '#f9fafb', fontSize: '0.85rem' }}
                          >
                            <option value="pendiente">⏳ Pendiente</option>
                            <option value="si">✅ Sí asistirá</option>
                            <option value="no">❌ No asistirá</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Fecha</label>
                          <input type="text" readOnly value={dateStr || '—'} style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '8px', color: theme.dark, background: '#f3f4f6', fontSize: '0.8rem', outline: 'none' }} />
                        </div>
                        <div>
                          <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Hora</label>
                          <input type="text" readOnly value={timeStr || '—'} style={{ width: '100%', padding: '0.6rem', border: '1px solid #e5e7eb', borderRadius: '8px', color: theme.dark, background: '#f3f4f6', fontSize: '0.8rem', outline: 'none' }} />
                        </div>
                      </div>

                      {g.message && (
                        <div>
                          <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>Mensaje:</label>
                          <div style={{ width: '100%', padding: '0.75rem', border: '1px solid #e5e7eb', borderRadius: '8px', color: theme.dark, background: '#f9fafb', minHeight: '40px', position: 'relative', fontSize: '0.85rem', lineHeight: '1.4' }}>
                            <div style={{ position: 'absolute', opacity: 0.1, bottom: 2, right: 5, fontSize: '1.2rem' }}>❀</div>
                            {g.message}
                          </div>
                        </div>
                      )}

                      {cardUrl && (
                        <div>
                          <label style={{ display: 'block', color: theme.gold, fontSize: '0.75rem', fontWeight: '600', marginBottom: '0.25rem' }}>URL Tarjeta</label>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <div style={{ flex: 1, padding: '0.6rem', background: `linear-gradient(to right, ${theme.gold}22, #E8E2D944)`, border: `1px solid ${theme.gold}44`, borderRadius: '8px', color: theme.dark, display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden' }}>
                              <Link2 size={14} style={{ color: theme.gold, flexShrink: 0 }} />
                              <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: '500', fontSize: '0.75rem' }}>{cardUrl}</span>
                            </div>
                            <button onClick={() => copyToClipboard(cardUrl)} style={{ width: '42px', flexShrink: 0, background: 'white', border: `1px solid ${theme.gold}`, borderRadius: '8px', color: theme.gold, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', transition: 'all 0.2s' }}>
                              <Copy size={16} />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {guests.length === 0 && (
                <div style={{ textAlign: 'center', padding: '1.5rem', color: theme.white, opacity: 0.7, fontSize: '0.85rem' }}>
                  No hay invitados en la lista.
                </div>
              )}
            </div>
          </div>


          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}>
            <button onClick={handleSave} disabled={isSaving} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.75rem 2rem', background: `linear-gradient(to right, ${theme.gold}, #b8860b)`, border: 'none', borderRadius: '25px', color: theme.dark, fontWeight: 'bold', fontSize: '0.95rem', cursor: 'pointer', transition: 'all 0.3s ease', boxShadow: '0 4px 15px rgba(0,0,0,0.2)', width: '100%', maxWidth: '280px', justifyContent: 'center' }}>
              <Save size={18} /> {isSaving ? 'Guardando...' : 'Guardar Cambios'}
            </button>
          </div>

        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container { padding: 0 0.5rem !important; }
          .main-card { padding: 0.25rem !important; }
          .app-header { padding: 0.5rem 0.5rem !important; }
          .header-logo { width: 35px !important; height: 35px !important; }
          .header-brand-text { fontSize: 0.65rem !important; }
          .exit-button { padding: 0.4rem 0.75rem !important; font-size: 0.75rem !important; }
        }
        @media (min-width: 768px) {
          .main-card { padding: 1rem !important; }
          .container { max-width: 1300px !important; }
        }
      `}</style>
    </div>
  );
};

export default ClientGuestManagement;
