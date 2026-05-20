import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { AlertTriangle } from 'lucide-react';
import { CardProvider } from './CardContext';
import Envelope from './components/Envelope';
import Landing2 from './components/Landing2';

import { useCardConfig } from './CardContext';

function EventUnavailable() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/');
    }, 4000);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden', padding: '2rem' }}>
      <div className="orb orb-purple" style={{ width: 400, height: 400, top: '-100px', left: '-50px', opacity: 0.3 }} />
      <div className="orb orb-blue" style={{ width: 300, height: 300, bottom: '-50px', right: '-50px', opacity: 0.25 }} />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1, background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid var(--border-glass)', borderRadius: '24px', padding: '3rem 2rem', maxWidth: '450px', width: '100%' }}
      >
        <motion.div 
          animate={{ y: [0, -10, 0] }} 
          transition={{ repeat: Infinity, duration: 2.5, ease: 'easeInOut' }} 
          style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.1)', border: '1px solid rgba(239, 68, 68, 0.3)', marginBottom: '1.5rem', color: '#ef4444' }}
        >
          <AlertTriangle size={40} />
        </motion.div>
        <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-primary)', fontSize: '2rem', marginBottom: '1rem', fontWeight: 700 }}>
          Evento no disponible
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', marginBottom: '1.5rem', lineHeight: 1.6 }}>
          Esta invitación no se encuentra activa en este momento.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '2px', overflow: 'hidden' }}>
            <motion.div 
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ duration: 4, ease: 'linear' }}
              style={{ height: '100%', background: 'var(--gradient-brand)' }}
            />
          </div>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Redireccionando al inicio...
          </span>
        </div>
      </motion.div>
    </div>
  );
}

function CardContent({ view, setView }: { view: 'landing1' | 'landing2', setView: (v: 'landing1' | 'landing2') => void }) {
  const { loading, error, status } = useCardConfig();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen" style={{ color: 'var(--color-purple-light)' }}>Cargando invitación...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-400">Error: {error}. Intenta recargar.</div>;
  }

  const normalizedStatus = status?.toLowerCase();
  if (normalizedStatus && normalizedStatus !== 'active' && normalizedStatus !== 'draft') {
    return <EventUnavailable />;
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'landing1' ? (
          <Envelope key="landing1" onOpenComplete={() => setView('landing2')} />
        ) : (
          <Landing2 key="landing2" onClose={() => setView('landing1')} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function CardPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [view, setView] = useState<'landing1' | 'landing2'>('landing1');

  return (
    <CardProvider eventId={eventId}>
      <CardContent view={view} setView={setView} />
    </CardProvider>
  );
}
