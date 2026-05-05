import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, AlertCircle } from 'lucide-react';
import useAuthStore from '../stores/authStore';
import logoSitio from '../assets/logositio.jpg';
import { signInWithGoogle } from '../lib/firebase';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { login, loginWithFirebaseToken, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ username, password });
    if (result?.success) { navigate('/wedding/Admin/dashboard'); }
  };

  const handleGoogleLogin = async () => {
    setIsGoogleLoading(true);
    try {
      const { idToken } = await signInWithGoogle();
      const result = await loginWithFirebaseToken(idToken);
      if (result?.success) {
        if (result.user?.estado === 'inactivo') {
          // This should be handled by backend returning 403, but just in case
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

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', padding: '1.5rem' }}>
      <div className="orb orb-purple" style={{ width: 500, height: 500, top: '-150px', left: '-100px', opacity: 0.4 }} />
      <div className="orb orb-pink" style={{ width: 350, height: 350, bottom: '-100px', right: '-50px', opacity: 0.3 }} />
      <div className="orb orb-blue" style={{ width: 300, height: 300, top: '50%', right: '20%', opacity: 0.2 }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(var(--border-glass) 1px, transparent 1px), linear-gradient(90deg, var(--border-glass) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div initial={{ opacity: 0, y: 40, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.6 }}
        className="glass-card" style={{ width: '100%', maxWidth: 420, padding: '2.5rem', position: 'relative', zIndex: 1 }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ width: 80, height: 80, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem', boxShadow: 'var(--shadow-glow)', overflow: 'hidden', border: '2px solid var(--border-glass)' }}>
            <img src={logoSitio} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>Panel Admin</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Ideación 360 — Wedding Invitations</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', borderRadius: 8, padding: '0.75rem 1rem', marginBottom: '1.5rem', color: '#f87171', fontSize: '0.85rem' }}>
              <AlertCircle size={16} />{error}
            </motion.div>
          )}

          <div style={{ marginBottom: '1.25rem' }}>
            <label className="input-label">Usuario</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><User size={16} /></div>
              <input id="admin-username" type="text" className="input-field" placeholder="admin" value={username}
                onChange={(e) => setUsername(e.target.value)} style={{ paddingLeft: '2.5rem' }} required />
            </div>
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <label className="input-label">Contraseña</label>
            <div style={{ position: 'relative' }}>
              <div style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }}><Lock size={16} /></div>
              <input id="admin-password" type={showPassword ? 'text' : 'password'} className="input-field" placeholder="••••••••" value={password}
                onChange={(e) => setPassword(e.target.value)} style={{ paddingLeft: '2.5rem', paddingRight: '3rem' }} required />
              <button type="button" onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex' }}>
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <motion.button type="submit" className="btn-primary" disabled={isLoading}
            whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
            style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', opacity: isLoading ? 0.7 : 1 }}>
            {isLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <div style={{ width: 16, height: 16, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite' }} />
                Ingresando...
              </span>
            ) : 'Ingresar al Panel'}
          </motion.button>
        </form>

        <div style={{ display: 'flex', alignItems: 'center', margin: '1.5rem 0' }}>
          <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
          <span style={{ padding: '0 1rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>O</span>
          <div style={{ flex: 1, height: 1, background: 'var(--border-glass)' }} />
        </div>

        <motion.button type="button" onClick={handleGoogleLogin} disabled={isGoogleLoading || isLoading}
          whileHover={{ scale: isGoogleLoading ? 1 : 1.02 }} whileTap={{ scale: isGoogleLoading ? 1 : 0.98 }}
          style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', background: 'white', color: '#333', border: '1px solid #ddd', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', cursor: 'pointer', fontWeight: 500 }}>
          {isGoogleLoading ? (
             <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
               <div style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.1)', borderTopColor: '#333', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite' }} />
               Conectando con Google...
             </span>
          ) : (
             <>
               <svg width="18" height="18" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
                 <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.73 17.74 9.5 24 9.5z"/>
                 <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"/>
                 <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"/>
                 <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"/>
               </svg>
               Iniciar sesión con Google
             </>
          )}
        </motion.button>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
