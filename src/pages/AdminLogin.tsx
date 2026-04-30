import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, User, Eye, EyeOff, Zap, AlertCircle } from 'lucide-react';
import useAuthStore from '../stores/authStore';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading, error } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await login({ username, password });
    if (result?.success) { navigate('/wedding/Admin/dashboard'); }
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
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: 'var(--shadow-glow)' }}>
            <Zap size={28} color="white" />
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

        <div style={{ marginTop: '1.5rem', padding: '0.75rem', borderRadius: 8, background: 'rgba(138,196,224,0.08)', border: '1px solid rgba(138,196,224,0.15)', textAlign: 'center' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
            Credenciales demo: <strong style={{ color: 'var(--color-purple-light)' }}>admin</strong> / <strong style={{ color: 'var(--color-purple-light)' }}>12345</strong>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminLogin;
