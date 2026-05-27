import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Users, ClipboardList, ArrowRight, LogOut, Check, X, Clock, CalendarDays } from 'lucide-react';
import toast from 'react-hot-toast';
import api, { eventsService } from '../services/api';
import useAuthStore from '../stores/authStore';
import logoSitio from '../assets/logositio.jpg';

const formatTime12h = (time24: string): string => {
  if (!time24) return 'Por definir';
  const match = time24.match(/^(\d{1,2}):(\d{2})$/);
  if (!match) return time24;
  
  let hr = parseInt(match[1], 10);
  const min = match[2];
  let meridiem = 'a. m.';
  
  if (hr >= 12) {
    meridiem = 'p. m.';
    if (hr > 12) hr -= 12;
  }
  if (hr === 0) hr = 12;
  
  const hrStr = String(hr).padStart(2, '0');
  return `${hrStr}:${min} ${meridiem}`;
};

const ClientDashboard = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, token, logout } = useAuthStore();

  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Basic auth check
    if (!token || user?.role !== 'client') {
      toast.error('Acceso no autorizado');
      navigate('/wedding/login');
      return;
    }

    if (eventId) {
      loadEventData();
    }
  }, [eventId, token]);

  const loadEventData = async () => {
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
    } catch (error: any) {
      toast.error('Error al cargar la información del evento');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast.success('Sesión cerrada');
    navigate('/wedding/login');
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
      </div>
    );
  }

  const coupleNames = event?.wedding?.coupleNames || 'Boda';
  
  // Calculate quick guest stats
  const guests = event?.components?.guestManagement?.guests || [];
  const attendingGuests = guests.filter((g: any) => g.confirmation === 'si').length;
  const notAttendingGuests = guests.filter((g: any) => g.confirmation === 'no').length;
  const pendingGuests = guests.filter((g: any) => g.confirmation !== 'si' && g.confirmation !== 'no').length;

  const formattedDate = event?.wedding?.weddingDate 
    ? new Date(event.wedding.weddingDate).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })
    : 'Fecha por definir';

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="orb orb-purple" style={{ width: 700, height: 700, top: '-250px', left: '-250px', opacity: 0.15 }} />
        <div className="orb orb-blue" style={{ width: 500, height: 500, bottom: '-150px', right: '-150px', opacity: 0.12 }} />
      </div>

      {/* Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: 'rgba(9, 7, 33, 0.7)',
          borderBottom: '1px solid var(--border-glass)',
          backdropFilter: 'blur(12px)',
          position: 'relative',
          zIndex: 10
        }}
      >
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border-glass)', flexShrink: 0 }}>
            <img src={logoSitio} alt="Ideación 360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <div>
            <div style={{ fontSize: '1rem', fontWeight: 700, fontFamily: 'var(--font-display)', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ideación 360</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Panel de Control</div>
          </div>
        </Link>

        <button
          onClick={handleLogout}
          className="btn-secondary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.5rem 1.2rem',
            fontSize: '0.8rem'
          }}
        >
          <LogOut size={14} /> <span>Cerrar Sesión</span>
        </button>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '3rem 1.5rem', zIndex: 1 }}>
        <div style={{ maxWidth: '900px', width: '100%', textAlign: 'center', marginBottom: '3rem' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              Boda de
            </h2>
            <h1 style={{ fontSize: '3rem', fontFamily: 'var(--font-display)', fontWeight: 800, marginBottom: '1rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              {coupleNames}
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <CalendarDays size={18} color="var(--color-gold)" /> {formattedDate}
            </p>
          </motion.div>
        </div>

        {/* Option Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '2rem',
          width: '100%',
          maxWidth: '900px'
        }}>
          {/* Card 1: Gestionar Invitados */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="glass-card"
            style={{
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: '1px solid var(--border-glass)',
              background: 'linear-gradient(135deg, rgba(20, 44, 75, 0.4) 0%, rgba(9, 7, 33, 0.6) 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => navigate(`/wedding/mi-boda/${eventId}/invitados`)}
          >
            {/* Top highlight gradient */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)' }} />

            <div>
              <div style={{
                width: 60, height: 60, borderRadius: '16px',
                background: 'rgba(59, 130, 246, 0.1)',
                border: '1px solid rgba(59, 130, 246, 0.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }}>
                <Users size={28} color="#3b82f6" />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
                Gestionar Invitados
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Organiza tu lista de asistentes, añade acompañantes, haz seguimiento de confirmaciones y genera los links únicos para las tarjetas digitales.
              </p>
            </div>

            {/* Quick statistics */}
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              justifyContent: 'space-around',
              gap: '0.5rem',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.02)'
            }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', color: '#4ade80', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <Check size={14} /> {attendingGuests}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>Asistirán</div>
              </div>
              <div style={{ textAlign: 'center', borderLeft: '1px solid rgba(255,255,255,0.1)', borderRight: '1px solid rgba(255,255,255,0.1)', padding: '0 1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', color: '#f87171', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <X size={14} /> {notAttendingGuests}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>No asistirán</div>
              </div>
              <div style={{ textAlign: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.2rem', color: '#a78bfa', fontWeight: 'bold', fontSize: '1.1rem' }}>
                  <Clock size={14} /> {pendingGuests}
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginTop: '0.2rem' }}>Pendientes</div>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontWeight: 600, fontSize: '0.9rem' }}>
              Ingresar <ArrowRight size={16} />
            </div>
          </motion.div>

          {/* Card 2: Detalles de la Boda */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            className="glass-card"
            style={{
              padding: '2.5rem 2rem',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              cursor: 'pointer',
              border: '1px solid var(--border-glass)',
              background: 'linear-gradient(135deg, rgba(139, 92, 246, 0.15) 0%, rgba(9, 7, 33, 0.6) 100%)',
              position: 'relative',
              overflow: 'hidden'
            }}
            onClick={() => navigate(`/wedding/mi-boda/${eventId}/detalles`)}
          >
            {/* Top highlight gradient */}
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '4px', background: 'linear-gradient(90deg, #8b5cf6, #D7B272)' }} />

            <div>
              <div style={{
                width: 60, height: 60, borderRadius: '16px',
                background: 'rgba(139, 92, 246, 0.15)',
                border: '1px solid rgba(139, 92, 246, 0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '2rem',
                boxShadow: '0 8px 16px rgba(0,0,0,0.2)'
              }}>
                <ClipboardList size={28} color="#a78bfa" />
              </div>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '1rem', fontFamily: 'var(--font-body)' }}>
                Detalles de la Boda
              </h3>

              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>
                Edita la información esencial de tu boda: fecha y hora, música del sitio, mensaje de portada, cronograma de momentos, código de vestimenta y datos de los regalos.
              </p>
            </div>

            {/* General info details display */}
            <div style={{
              background: 'rgba(0,0,0,0.2)',
              borderRadius: '12px',
              padding: '1rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.4rem',
              marginBottom: '2rem',
              border: '1px solid rgba(255,255,255,0.02)',
              fontSize: '0.8rem',
              color: 'var(--text-muted)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Hora:</span>
                <span style={{ color: 'white', fontWeight: 600 }}>{formatTime12h(event?.wedding?.weddingTime)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Música de fondo:</span>
                <span style={{ color: 'white', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: '120px' }}>
                  {event?.components?.banner?.musicUrl ? 'Configurada' : 'Sin pista mp3'}
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-purple-light)', fontWeight: 600, fontSize: '0.9rem' }}>
              Gestionar detalles <ArrowRight size={16} />
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 1 }}>
        &copy; {new Date().getFullYear()} Ideación 360. Todos los derechos reservados.
      </footer>
    </div>
  );
};

export default ClientDashboard;
