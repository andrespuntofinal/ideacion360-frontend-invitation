import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShieldCheck, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';
import { signInWithGoogle } from '../lib/firebase';

const AdminLogin = () => {
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { loginWithFirebaseToken, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { idToken } = await signInWithGoogle();
      const result = await loginWithFirebaseToken(idToken);
      if (result?.success) {
        if (result.user?.estado === 'inactivo') {
          useAuthStore.getState().logout();
          return;
        }
        if (result.user?.role !== 'admin') {
          useAuthStore.getState().logout();
          useAuthStore.setState({ error: 'No tienes permisos de administrador.' });
          return;
        }
        navigate('/wedding/Admin/dashboard');
      }
    } catch (err: any) {
      console.error(err);
      useAuthStore.setState({ error: 'Error al iniciar sesión con Google' });
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const serviceColor = '#3b82f6';
  const serviceGradient = 'linear-gradient(135deg, rgba(59, 130, 246, 0.4) 0%, #090721 100%)';
  const serviceBorder = 'rgba(59, 130, 246, 0.3)';

  return (
    <div style={{ minHeight: '100vh', background: '#090721', color: 'white' }}>
      <Navbar />

      <main style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '4rem 1.5rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Orbs */}
        <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-150px', left: '-100px', opacity: 0.15 }} />
        <div className="orb orb-blue" style={{ width: 400, height: 400, bottom: '-100px', right: '-50px', opacity: 0.1 }} />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          style={{
            width: '100%',
            maxWidth: 420,
            background: serviceGradient,
            border: `1px solid ${serviceBorder}`,
            borderRadius: 'var(--radius-xl)',
            padding: '3rem 2.5rem',
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.4)'
          }}
        >
          {/* Glow */}
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 120, height: 120, borderRadius: '50%',
            background: serviceColor, opacity: 0.15, filter: 'blur(30px)',
          }} />

          {/* Icon */}
          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: `linear-gradient(135deg, ${serviceColor}30, ${serviceColor}10)`,
            border: `1px solid ${serviceBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2rem',
          }}>
            <ShieldCheck size={32} color={serviceColor} />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ color: serviceColor, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              Acceso Administrativo
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              Panel Admin
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              Gestiona todos los eventos, invitados y configuraciones de Ideación 360 desde un solo lugar.
            </p>

            {/* Features */}
            <ul style={{ listStyle: 'none', marginBottom: '2.5rem', padding: 0 }}>
              {['Autenticación segura'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={16} color={serviceColor} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 12,
                padding: '0.8rem 1rem',
                marginBottom: '2rem',
                color: '#fca5a5',
                fontSize: '0.85rem'
              }}
            >
              <AlertCircle size={18} />
              {error}
            </motion.div>
          )}

          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            disabled={isGoogleLoading || isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            style={{
              width: '100%',
              padding: '1rem 1.5rem',
              fontSize: '1rem',
              background: 'transparent',
              color: 'white',
              border: `1px solid ${serviceBorder}`,
              borderRadius: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.8rem',
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              fontFamily: 'var(--font-body)'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = `${serviceColor}20`; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
          >
            {isGoogleLoading || isLoading ? (
              <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
            ) : (
              <>
                <svg width="22" height="22" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.73 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                Iniciar Sesión <ArrowRight size={18} />
              </>
            )}
          </motion.button>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminLogin;
