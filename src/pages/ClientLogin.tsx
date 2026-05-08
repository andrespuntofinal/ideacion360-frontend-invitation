import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle, Heart } from 'lucide-react';
import toast from 'react-hot-toast';
import { authService } from '../services/api';
import useAuthStore from '../stores/authStore';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const ClientLogin = () => {
  const [step, setStep] = useState<'email' | 'otp'>('email');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const otpRefs = useRef<(HTMLInputElement | null)[]>([]);
  const navigate = useNavigate();

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
    if (value.length > 1) value = value.slice(0, 1);
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

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
        localStorage.setItem('auth_token', res.data.token);
        localStorage.setItem('auth_user', JSON.stringify(res.data.user));
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

  const serviceColor = '#8b5cf6';
  const serviceGradient = 'linear-gradient(135deg, rgba(139, 92, 246, 0.4) 0%, #090721 100%)';
  const serviceBorder = 'rgba(139, 92, 246, 0.3)';

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
        <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-150px', left: '-100px', opacity: 0.15 }} />
        <div className="orb orb-pink" style={{ width: 400, height: 400, bottom: '-100px', right: '-50px', opacity: 0.1 }} />

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
          <div style={{
            position: 'absolute', top: -40, right: -40,
            width: 120, height: 120, borderRadius: '50%',
            background: serviceColor, opacity: 0.15, filter: 'blur(30px)',
          }} />

          <div style={{
            width: 64, height: 64, borderRadius: 16,
            background: `linear-gradient(135deg, ${serviceColor}30, ${serviceColor}10)`,
            border: `1px solid ${serviceBorder}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            marginBottom: '2rem',
          }}>
            <Heart size={32} color={serviceColor} />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <p style={{ color: serviceColor, fontSize: '0.85rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.6rem' }}>
              Acceso Clientes
            </p>
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: 800,
              color: 'white',
              marginBottom: '1rem',
              letterSpacing: '-0.02em'
            }}>
              {step === 'email' ? 'Mi Boda' : 'Verificación'}
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '2rem' }}>
              {step === 'email'
                ? 'Ingresa tu correo registrado para gestionar tu lista de invitados y detalles.'
                : 'Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.'}
            </p>

            <ul style={{ listStyle: 'none', marginBottom: '2.5rem', padding: 0 }}>
              {['Gestión de invitados', 'Confirmaciones RSVP'].map(f => (
                <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '0.75rem' }}>
                  <CheckCircle size={16} color={serviceColor} />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <AnimatePresence mode="wait">
            {step === 'email' ? (
              <motion.form
                key="email-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleRequestOtp}
              >
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.5rem', fontWeight: 500 }}>Correo Electrónico</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
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
                  {isLoading ? (
                    <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                  ) : (
                    <>Solicitar Código <ArrowRight size={18} /></>
                  )}
                </motion.button>
              </motion.form>
            ) : (
              <motion.form
                key="otp-form"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                onSubmit={handleVerifyOtp}
              >
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1rem', fontWeight: 500, textAlign: 'center' }}>Código de Verificación</label>
                  <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        className="input-field"
                        style={{ width: '45px', height: '55px', textAlign: 'center', fontSize: '1.5rem', padding: '0', borderRadius: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        required
                      />
                    ))}
                  </div>
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
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
                  {isLoading ? (
                    <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                  ) : (
                    <>Verificar e Ingresar <ShieldCheck size={18} /></>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  style={{ width: '100%', marginTop: '1.5rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <ArrowLeft size={14} /> Volver a ingresar correo
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ClientLogin;
