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
            <Heart size={30} color={serviceColor} />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <p style={{ color: serviceColor, fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', opacity: 0.8 }}>
              Acceso Clientes
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
              {step === 'email' ? 'Mi Boda' : 'Verificación'}
            </h1>
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '2rem' }}>
              {step === 'email'
                ? 'Ingresa tu correo registrado para gestionar tu lista de invitados y detalles.'
                : 'Ingresa el código de 6 dígitos que enviamos a tu correo electrónico.'}
            </p>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {['Gestión de invitados', 'Confirmaciones RSVP'].map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.85rem', fontWeight: 500 }}>
                  <CheckCircle size={16} color={serviceColor} />
                  {f}
                </div>
              ))}
            </div>
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
                <div style={{ marginBottom: '2rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '0.75rem', fontWeight: 500 }}>Correo Electrónico</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="ejemplo@correo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'white',
                      padding: '1.1rem 1.5rem',
                      borderRadius: '16px',
                      width: '100%',
                      fontSize: '1rem',
                      outline: 'none',
                      transition: 'all 0.3s ease'
                    }}
                    onFocus={e => e.currentTarget.style.borderColor = serviceColor}
                    onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isLoading}
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
                  {isLoading ? (
                    <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                  ) : (
                    <><p style={{ color: serviceColor, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', opacity: 0.8 }}>
                      Solicitar Código
                    </p>
                      <ArrowRight size={20} /></>
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
                <div style={{ marginBottom: '2.5rem' }}>
                  <label style={{ display: 'block', color: 'rgba(255,255,255,0.7)', fontSize: '0.85rem', marginBottom: '1.25rem', fontWeight: 500, textAlign: 'center' }}>Código de Verificación</label>
                  <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center' }}>
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => { otpRefs.current[index] = el; }}
                        type="text"
                        inputMode="numeric"
                        style={{
                          width: '50px',
                          height: '60px',
                          textAlign: 'center',
                          fontSize: '1.5rem',
                          padding: '0',
                          borderRadius: '14px',
                          background: 'rgba(255,255,255,0.03)',
                          border: '1px solid rgba(255,255,255,0.1)',
                          color: 'white',
                          outline: 'none',
                          transition: 'all 0.3s ease'
                        }}
                        onFocus={e => e.currentTarget.style.borderColor = serviceColor}
                        onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}
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
                  {isLoading ? (
                    <div style={{ width: 22, height: 22, border: '3px solid rgba(255,255,255,0.1)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
                  ) : (
                    <><p style={{ color: serviceColor, fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.2em', marginBottom: '0.5rem', opacity: 0.8 }}>
                      Verificar e Ingresar
                    </p> <ShieldCheck size={20} /></>
                  )}
                </motion.button>

                <button
                  type="button"
                  onClick={() => setStep('email')}
                  style={{ width: '100%', marginTop: '2rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', fontWeight: 500 }}
                >
                  <ArrowLeft size={14} /> Volver a ingresar correo
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>
      </main>


    </div>
  );
};

export default ClientLogin;
