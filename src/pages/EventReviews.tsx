import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, User, Heart, MessageSquare, Send, Globe, Play, Sparkles, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios';
import logoImg from '../assets/logositio.jpg';

interface EventData {
  type: 'web' | 'video' | 'card';
  wedding?: {
    coupleNames?: string;
    weddingDate?: string;
    weddingTime?: string;
  };
  reviews?: {
    url?: string;
    comments?: string;
  };
}

const typeLabels: Record<string, { label: string; icon: any; color: string }> = {
  web: { label: 'Invitación Boda Web', icon: Globe, color: '#3b82f6' },
  video: { label: 'Invitación Boda Video', icon: Play, color: '#8b5cf6' },
  card: { label: 'Invitación Boda Card', icon: Heart, color: '#D7B272' }
};

export const EventReviews = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventData | null>(null);
  const [comments, setComments] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(`${API_URL}/api/events/${eventId}`);
        if (res.data?.success && res.data?.data) {
          setEvent(res.data.data);
        } else {
          toast.error('No se pudo encontrar la información del evento');
        }
      } catch (err) {
        console.error('Error fetching event review data:', err);
        toast.error('Error al cargar la información de la reseña');
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEventData();
    }
  }, [eventId, API_URL]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comments.trim()) {
      toast.error('Por favor escribe un comentario antes de enviar.');
      return;
    }

    try {
      setIsSubmitting(true);
      const res = await axios.post(`${API_URL}/api/events/${eventId}/reviews`, { comments });
      if (res.data?.success) {
        setIsSubmitted(true);
        toast.success('¡Gracias por tus comentarios!');
        setTimeout(() => {
          navigate('/');
        }, 5000);
      } else {
        toast.error(res.data?.message || 'Error al guardar los comentarios');
      }
    } catch (err) {
      console.error('Error submitting review comments:', err);
      toast.error('Ocurrió un error al enviar tus comentarios');
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return '—';
    try {
      return new Date(dateStr).toLocaleDateString('es-CO', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (e) {
      return dateStr;
    }
  };

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0B0A24',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}>
        <div style={{ width: 40, height: 40, border: '3px solid rgba(255,255,255,0.05)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
      </div>
    );
  }

  if (!event) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#0B0A24',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'var(--font-body)'
      }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>Evento no encontrado</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>El enlace proporcionado no es válido o ha expirado.</p>
        <button onClick={() => navigate('/')} className="btn-primary" style={{ padding: '0.6rem 1.5rem' }}>Ir al Inicio</button>
      </div>
    );
  }

  const coupleNames = event.wedding?.coupleNames || 'los Novios';
  const eventType = event.type ? (typeLabels[event.type] || { label: 'Boda', icon: Heart, color: '#f472b6' }) : { label: 'Boda', icon: Heart, color: '#f472b6' };
  const TypeIcon = eventType.icon;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#0B0A24',
      background: 'radial-gradient(circle at top, #161545 0%, #0B0A24 100%)',
      fontFamily: "'Outfit', 'Inter', sans-serif",
      color: '#ffffff',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Blur Backgrounds */}
      <div style={{ position: 'absolute', top: '10%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', filter: 'blur(80px)', pointerEvents: 'none', zIndex: 0 }} />
      <div style={{ position: 'absolute', bottom: '15%', right: '10%', width: '350px', height: '350px', borderRadius: '50%', background: 'rgba(215, 178, 114, 0.08)', filter: 'blur(100px)', pointerEvents: 'none', zIndex: 0 }} />

      <motion.div 
        initial={{ opacity: 0, y: 30 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ duration: 0.5 }}
        style={{
          width: '100%',
          maxWidth: '580px',
          zIndex: 1,
          position: 'relative'
        }}
      >
        {/* Header & Logo */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.img 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.4 }}
            src={logoImg} 
            alt="Ideación 360" 
            style={{
              maxHeight: '65px',
              width: 'auto',
              borderRadius: '12px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 10px rgba(99, 102, 241, 0.15)',
              marginBottom: '1rem',
              display: 'block',
              margin: '0 auto'
            }}
          />
          <h1 style={{ 
            fontSize: '1.25rem', 
            fontFamily: "'Playfair Display', Georgia, serif", 
            fontWeight: 700, 
            letterSpacing: '0.5px',
            margin: '0 0 0.25rem 0',
            color: '#ffffff'
          }}>
            Ideación <span style={{ color: '#4b7bec', fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>3</span><span style={{ color: '#a55eea', fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>6</span><span style={{ color: '#ffb142', fontFamily: "'Outfit', sans-serif", fontWeight: 800 }}>0</span>
          </h1>
          <p style={{
            fontSize: '0.8rem',
            color: '#a5b4fc',
            textTransform: 'uppercase',
            letterSpacing: '3px',
            fontWeight: 700,
            opacity: 0.8,
            margin: 0
          }}>
            Reviews Eventos
          </p>
        </div>

        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="review-form"
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass-card"
              style={{
                background: 'linear-gradient(135deg, rgba(24, 23, 77, 0.5) 0%, rgba(18, 17, 58, 0.5) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(43, 40, 131, 0.4)',
                borderRadius: '24px',
                padding: '2.5rem 2rem',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.05)'
              }}
            >
              {/* Event Metadata Card */}
              <div style={{
                background: 'rgba(11, 10, 36, 0.5)',
                border: '1px solid rgba(30, 28, 102, 0.6)',
                borderRadius: '16px',
                padding: '1.25rem',
                marginBottom: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(59, 130, 246, 0.1)',
                    border: '1px solid rgba(59, 130, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: eventType.color
                  }}>
                    <TypeIcon size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Evento</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{eventType.label}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(244, 114, 182, 0.1)',
                    border: '1px solid rgba(244, 114, 182, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#f472b6'
                  }}>
                    <User size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Novios</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{coupleNames}</div>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: 'rgba(139, 92, 246, 0.1)',
                    border: '1px solid rgba(139, 92, 246, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#a78bfa'
                  }}>
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.65rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Fecha</div>
                    <div style={{ fontSize: '0.9rem', color: '#fff', fontWeight: 600 }}>{formatDate(event.wedding?.weddingDate)}</div>
                  </div>
                </div>
              </div>

              {/* Welcoming Message */}
              <p style={{
                color: '#cbd5e1',
                fontSize: '1rem',
                lineHeight: 1.6,
                textAlign: 'center',
                marginBottom: '2rem',
                fontStyle: 'italic',
                fontWeight: 350
              }}>
                "{coupleNames} Fue un verdadero placer acompañarte en este momento tan especial.
                Nos encantaría conocer tu experiencia. Déjanos tu opinión y ayúdanos a seguir creando momentos digitales memorables."
              </p>

              {/* Input Form */}
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  <label htmlFor="comments" style={{
                    fontSize: '0.8rem',
                    color: '#a5b4fc',
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}>
                    <MessageSquare size={14} /> Deja tus comentarios
                  </label>
                  <textarea
                    id="comments"
                    rows={5}
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                    placeholder="Escribe aquí tu experiencia, observaciones o felicitaciones..."
                    style={{
                      width: '100%',
                      background: '#0B0A24',
                      border: '1px solid rgba(43, 40, 131, 0.6)',
                      borderRadius: '16px',
                      padding: '1.2rem',
                      color: '#ffffff',
                      fontSize: '1rem',
                      fontFamily: 'inherit',
                      lineHeight: '1.6',
                      resize: 'vertical',
                      outline: 'none',
                      transition: 'all 0.3s ease',
                      boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.3)'
                    }}
                    onFocus={(e) => {
                      e.target.style.borderColor = '#818cf8';
                      e.target.style.boxShadow = '0 0 10px rgba(129, 140, 248, 0.25), inset 0 2px 4px rgba(0,0,0,0.3)';
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(43, 40, 131, 0.6)';
                      e.target.style.boxShadow = 'inset 0 2px 4px rgba(0,0,0,0.3)';
                    }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting || !comments.trim()}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  style={{
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '50px',
                    padding: '1.1rem 2rem',
                    fontSize: '1rem',
                    fontWeight: 600,
                    cursor: comments.trim() ? 'pointer' : 'not-allowed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                    boxShadow: comments.trim() ? '0 10px 25px -5px rgba(99, 102, 241, 0.4)' : 'none',
                    opacity: comments.trim() ? 1 : 0.6,
                    transition: 'all 0.3s ease'
                  }}
                >
                  {isSubmitting ? (
                    <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                  ) : (
                    <>
                      <Send size={18} /> Enviar comentarios
                    </>
                  )}
                </motion.button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success-screen"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              style={{
                background: 'linear-gradient(135deg, rgba(24, 23, 77, 0.5) 0%, rgba(18, 17, 58, 0.5) 100%)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(43, 40, 131, 0.4)',
                borderRadius: '24px',
                padding: '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 20px rgba(99, 102, 241, 0.05)'
              }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                background: 'rgba(74, 222, 128, 0.1)',
                border: '1px solid rgba(74, 222, 128, 0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1.5rem',
                color: '#4ade80'
              }}>
                <CheckCircle2 size={36} />
              </div>
              
              <h2 style={{
                fontSize: '1.5rem',
                fontWeight: 700,
                color: '#fff',
                marginBottom: '1rem'
              }}>
                ¡Comentario Enviado!
              </h2>

              <p style={{
                color: '#cbd5e1',
                fontSize: '1.05rem',
                lineHeight: 1.6,
                marginBottom: '2rem'
              }}>
                {coupleNames} ¡Gracias por confiar en nosotros y por dedicar unos minutos a contarnos tu experiencia!
              </p>

              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
              }}>
                <div style={{ width: 24, height: 24, border: '2px solid rgba(255,255,255,0.05)', borderTopColor: '#3b82f6', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>Redireccionando al home...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default EventReviews;
