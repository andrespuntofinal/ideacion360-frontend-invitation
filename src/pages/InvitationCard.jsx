import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';

const InvitationCard = () => {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden',
      padding: '2rem',
    }}>
      <div className="orb orb-pink" style={{ width: 500, height: 500, top: '-150px', left: '-100px', opacity: 0.3 }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: '-100px', right: '-50px', opacity: 0.3 }} />

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ fontSize: '5rem', marginBottom: '2rem' }}
        >
          💌
        </motion.div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 4rem)',
          marginBottom: '1rem', lineHeight: 1.2,
        }}>
          <span className="gradient-text">Tu Invitación</span>
          <br />está en camino
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, maxWidth: 500, margin: '0 auto 2rem' }}>
          Esta sección mostrará la invitación de boda interactiva personalizada para ti.
          Próximamente disponible.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(244,114,182,0.1)', border: '1px solid rgba(244,114,182,0.3)',
          borderRadius: 50, padding: '0.5rem 1.25rem', color: '#f472b6', fontSize: '0.875rem',
        }}>
          <Heart size={14} fill="#f472b6" />
          Wedding Invitation Card — Coming Soon
        </div>
      </motion.div>
    </div>
  );
};

export default InvitationCard;
