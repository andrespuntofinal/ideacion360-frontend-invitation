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

  const serviceColor = '#8ac4e0';
  const glassGradient = 'linear-gradient(135deg, rgba(73, 139, 237, 0.44) 0%, #141228 100%)';
  const glassBorder = '1px solid rgba(138, 196, 224, 0.3)';

  return (
    <div style={{ minHeight: '100vh', background: '#090721', color: 'white', overflow: 'hidden' }}>
      <Navbar />

      <main style={{
        minHeight: 'calc(100vh - 160px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '6rem 1.5rem 4rem',
        position: 'relative'
      }}>
        {/* Animated Background Elements */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.15, 0.1] }}
          transition={{ duration: 10, repeat: Infinity }}
          style={{ position: 'absolute', width: 600, height: 600, background: 'radial-gradient(circle, rgba(138, 196, 224, 0.2) 0%, transparent 70%)', top: '-10%', left: '-10%', filter: 'blur(80px)', pointerEvents: 'none' }}
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.05, 0.1, 0.05] }}
          transition={{ duration: 15, repeat: Infinity, delay: 2 }}
          style={{ position: 'absolute', width: 500, height: 500, background: 'radial-gradient(circle, rgba(138, 196, 224, 0.15) 0%, transparent 70%)', bottom: '-10%', right: '-5%', filter: 'blur(60px)', pointerEvents: 'none' }}
        />


        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            width: '100%',
            maxWidth: 400,
            background: glassGradient,
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: glassBorder,
            borderRadius: '28px',
            padding: '2.5rem 2rem',
            position: 'relative',
            zIndex: 1,
            boxShadow: '0 40px 100px rgba(0, 0, 0, 0.6), inset 0 1px 1px rgba(255,255,255,0.1)'
          }}
        >
          {/* Top highlight line */}
          <div style={{ position: 'absolute', top: 0, left: '15%', right: '15%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }} />

          {/* Icon Section */}
          <div style={{
            width: 60, height: 60, borderRadius: 16,
            background: 'rgba(138, 196, 224, 0.1)',
            border: '1px solid rgba(138, 196, 224, 0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2rem',
            boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
          }}>
            <ShieldCheck size={30} color={serviceColor} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: serviceColor, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', opacity: 0.8 }}>
              Acceso Administrativo
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem',
              letterSpacing: '-0.03em',
              lineHeight: 1.1
            }}>
              Panel Admin
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '2rem' }}>
              Gestiona todos los eventos, invitados y configuraciones de Ideación 360 desde un solo lugar.
            </p>

            {/* Features */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: serviceColor, fontSize: '0.85rem', marginBottom: '1.5rem', fontWeight: 500 }}>
              <CheckCircle size={16} color={serviceColor} />
              Autenticación segura
            </div>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                background: 'rgba(239, 68, 68, 0.1)',
                border: '1px solid rgba(239, 68, 68, 0.2)',
                borderRadius: 16,
                padding: '1rem',
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
            whileHover={{ scale: 1.03, boxShadow: '0 15px 30px rgba(0,0,0,0.4)' }}
            whileTap={{ scale: 0.97 }}
            style={{
              width: '100%',
              padding: '1.1rem 2rem',
              fontSize: '1rem',
              background: 'rgba(255,255,255,0.03)',
              color: 'white',
              border: '1px solid rgba(255,255,255,0.1)',
              borderRadius: '100px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '1rem',
              cursor: 'pointer',
              fontWeight: 700,
              transition: 'all 0.3s ease',
              boxShadow: '0 10px 20px rgba(0,0,0,0.2)'
            }}
          >
            {isGoogleLoading || isLoading ? (
              <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
            ) : (
              <>
                <svg width="22" height="22" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.73 17.74 9.5 24 9.5z" />
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
                </svg>
                Iniciar Sesión <ArrowRight size={20} />
              </>
            )}
          </motion.button>
        </motion.div>
      </main>


    </div>
  );
};

export default AdminLogin;
