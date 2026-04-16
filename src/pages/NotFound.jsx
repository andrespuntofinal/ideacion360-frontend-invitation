import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

const NotFound = () => (
  <div style={{
    minHeight: '100vh', background: 'var(--bg-primary)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    position: 'relative', overflow: 'hidden', padding: '2rem',
  }}>
    <div className="orb orb-purple" style={{ width: 400, height: 400, top: '-100px', left: '-50px', opacity: 0.3 }} />
    <div className="orb orb-blue" style={{ width: 300, height: 300, bottom: '-50px', right: '-50px', opacity: 0.25 }} />

    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
    >
      <motion.div
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
      >
        🔍
      </motion.div>
      <h1 style={{
        fontFamily: 'var(--font-display)', marginBottom: '0.5rem',
        background: 'var(--gradient-brand)',
        WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
        fontSize: 'clamp(4rem, 10vw, 8rem)', lineHeight: 1,
      }}>
        404
      </h1>
      <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', marginBottom: '0.5rem' }}>
        Página no encontrada
      </p>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', maxWidth: 400, margin: '0 auto 2.5rem', lineHeight: 1.6 }}>
        La página que buscas no existe o fue movida.
      </p>
      <Link to="/" style={{ textDecoration: 'none' }}>
        <button className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.8rem 2rem' }}>
          <Home size={16} /> Volver al Inicio
        </button>
      </Link>
    </motion.div>
  </div>
);

export default NotFound;
