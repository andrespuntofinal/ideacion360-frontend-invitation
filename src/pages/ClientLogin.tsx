import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ShieldCheck, ArrowRight, ArrowLeft } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/api';
import useAuthStore from '../stores/authStore';

const ClientLogin = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

  // Ensure authStore is updated properly if needed
  // Note: We might just want to store the token locally or use useAuthStore directly
  // since verifyOtp returns token and user. We will update the store manually if useAuthStore doesn't have a direct loginClient.
  
  const handleRequestOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return toast.error('Ingresa tu correo electrónico');
    
    setIsLoading(true);
    try {
      const res = await authService.requestOtp(email);
      if (res.data.success) {
        toast.success('Código enviado a tu correo');
        setStep('otp');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Error al solicitar el código');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) value = value.slice(0, 1); // Only 1 digit
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value !== '' && index < 5) {
      otpRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpRefs.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpCode = otp.join('');
    if (otpCode.length < 6) return toast.error('Ingresa el código completo');

    setIsLoading(true);
    try {
      const res = await authService.verifyOtp(email, otpCode);
      if (res.data.success) {
        toast.success('Acceso permitido');
        
        // Save to local storage
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('auth_user', JSON.stringify(res.data.user));
        
        // Update authStore
        useAuthStore.setState({ 
          token: res.data.token, 
          user: res.data.user, 
          isAuthenticated: true 
        });

        navigate(`/wedding/mi-boda/${res.data.eventId}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Código incorrecto');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', padding: '1.5rem' }}>
      <div className="orb orb-purple" style={{ width: 500, height: 500, top: '-150px', left: '-100px', opacity: 0.4 }} />
      <div className="orb orb-pink" style={{ width: 350, height: 350, bottom: '-100px', right: '-50px', opacity: 0.3 }} />
      <div className="orb orb-blue" style={{ width: 300, height: 300, top: '50%', right: '20%', opacity: 0.2 }} />
      <div style={{ position: 'absolute', inset: 0, opacity: 0.03, backgroundImage: 'linear-gradient(var(--border-glass) 1px, transparent 1px), linear-gradient(90deg, var(--border-glass) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card" style={{ width: '100%', maxWidth: 420, padding: '2.5rem', position: 'relative', zIndex: 1 }}
      >
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            style={{ width: 64, height: 64, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', boxShadow: 'var(--shadow-glow)' }}>
            {step === 'email' ? <Mail size={28} color="white" /> : <ShieldCheck size={28} color="white" />}
          </motion.div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
            {step === 'email' ? 'Gestión de Mi Boda' : 'Verificación'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            {step === 'email' 
              ? 'Ingresa tu correo registrado para acceder a tu panel.' 
              : 'Ingresa el código de 6 dígitos que enviamos a tu correo.'}
          </p>
        </div>

        {step === 'email' ? (
          <form onSubmit={handleRequestOtp}>
            <div style={{ marginBottom: '1.25rem' }}>
              <label className="input-label">Correo Electrónico</label>
              <input
                type="email"
                className="input-field"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>

            <motion.button type="submit" className="btn-primary" disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', opacity: isLoading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {isLoading ? 'Enviando...' : (
                <>Solicitar Código <ArrowRight size={18} /></>
              )}
            </motion.button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOtp}>
            <div style={{ marginBottom: '2rem' }}>
              <label className="input-label" style={{ textAlign: 'center', display: 'block', marginBottom: '1rem' }}>Código OTP</label>
              <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => { otpRefs.current[index] = el; }}
                    type="text"
                    inputMode="numeric"
                    className="input-field"
                    style={{ width: '45px', height: '55px', textAlign: 'center', fontSize: '1.5rem', padding: '0', borderRadius: '10px' }}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    required
                  />
                ))}
              </div>
            </div>

            <motion.button type="submit" className="btn-primary" disabled={isLoading}
              whileHover={{ scale: isLoading ? 1 : 1.02 }} whileTap={{ scale: isLoading ? 1 : 0.98 }}
              style={{ width: '100%', padding: '0.9rem', fontSize: '0.95rem', opacity: isLoading ? 0.7 : 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              {isLoading ? 'Verificando...' : (
                <>Ingresar <ShieldCheck size={18} /></>
              )}
            </motion.button>
            <button 
              type="button" 
              className="btn-secondary" 
              onClick={() => setStep('email')}
              style={{ width: '100%', marginTop: '1rem', padding: '0.9rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.5rem' }}
            >
              <ArrowLeft size={16} /> Volver
            </button>
          </form>
        )}
      </motion.div>
    </div>
  );
};

export default ClientLogin;
