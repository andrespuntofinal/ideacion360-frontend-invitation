import { motion } from 'framer-motion';
import { Users } from 'lucide-react';

const ControlUser = () => {
  return (
    <div style={{
      minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden',
      padding: '2rem',
    }}>
      <div className="orb orb-blue" style={{ width: 500, height: 500, top: '-100px', right: '-100px', opacity: 0.25 }} />
      <div className="orb orb-purple" style={{ width: 350, height: 350, bottom: '-50px', left: '10%', opacity: 0.25 }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
          style={{ marginBottom: '2rem' }}
        >
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'var(--gradient-brand-alt)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto', boxShadow: 'var(--shadow-glow)',
          }}>
            <Users size={44} color="white" />
          </div>
        </motion.div>
        <h1 style={{
          fontFamily: 'var(--font-display)', fontSize: 'clamp(2rem, 6vw, 3.5rem)',
          marginBottom: '1rem', lineHeight: 1.2,
        }}>
          Panel del <span className="gradient-text-alt">Cliente</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, maxWidth: 480, margin: '0 auto 2rem' }}>
          Aquí el cliente podrá visualizar y gestionar los detalles de su invitación de boda.
          Módulo en desarrollo.
        </p>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
          background: 'rgba(138,196,224,0.1)', border: '1px solid rgba(138,196,224,0.3)',
          borderRadius: 50, padding: '0.5rem 1.25rem', color: 'var(--color-blue)', fontSize: '0.875rem',
        }}>
          <Users size={14} />
          Control Usuario — Coming Soon
        </div>
      </motion.div>
    </div>
  );
};

export default ControlUser;
