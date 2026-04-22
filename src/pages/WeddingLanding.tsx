import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Star, ArrowRight, Shield, Clock, Palette, CheckCircle, Play, Settings } from 'lucide-react';
import React, { ElementType } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

interface Feature { icon: string; title: string; desc: string; }
interface Plan { name: string; price: string; desc: string; color: string; popular?: boolean; features: string[]; }
interface TrustItem { icon: React.ElementType; label: string; color: string; }

const features: Feature[] = [
  { icon: '💌', title: 'Sobre Animado', desc: 'Apertura interactiva con confetti y animaciones cinematográficas' },
  { icon: '📅', title: 'RSVP Digital', desc: 'Confirmación de asistencia integrada y gestión de invitados' },
  { icon: '⏱️', title: 'Cuenta Regresiva', desc: 'Timer animado que genera emoción hasta el gran día' },
  { icon: '🗺️', title: 'Ubicación', desc: 'Mapas integrados para ceremonia y recepción' },
  { icon: '📸', title: 'Galería / Carrusel', desc: 'Comparte fotos de la pareja de forma elegante' },
  { icon: '🎵', title: 'Música de Fondo', desc: 'Canción favorita de la pareja en la invitación' },
  { icon: '👗', title: 'Código de Vestimenta', desc: 'Guía visual del dress code del evento' },
  { icon: '🎁', title: 'Lista de Regalos', desc: 'Información sobre regalos y contribuciones' },
];

const plans: Plan[] = [
  { name: 'Esencial', price: '$199.000', desc: 'Perfecta para una boda íntima y especial', color: '#8ac4e0', features: ['Sobre animado', 'RSVP básico', 'Detalles del evento', 'Música de fondo', 'Soporte 7 días'] },
  { name: 'Premium', price: '$349.000', desc: 'La experiencia completa para tu gran día', color: '#7C3AED', popular: true, features: ['Todo lo de Esencial', 'Galería + Carrusel', 'Cuenta regresiva', 'Código de vestimenta', 'Línea de tiempo', 'Lista de regalos', 'Soporte 30 días'] },
  { name: 'Exclusivo', price: '$599.000', desc: 'Personalización total sin límites', color: '#f472b6', features: ['Todo lo de Premium', 'Video de apertura', 'Diseño personalizado', 'Gestión de invitados', 'Dominio propio', 'Soporte ilimitado'] },
];

const WeddingLanding = () => (
  <div style={{ minHeight: '100vh' }}>
    <Navbar />
    <section style={{ minHeight: '90vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: 'var(--nav-height)' }}>
      <div className="orb orb-pink" style={{ width: 500, height: 500, top: '-100px', left: '-150px', opacity: 0.35 }} />
      <div className="orb orb-purple" style={{ width: 400, height: 400, bottom: '0', right: '-100px', opacity: 0.3 }} />
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ maxWidth: 750, margin: '0 auto', textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} style={{ fontSize: '4rem', marginBottom: '1.5rem', display: 'block' }}>💍</motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(244,114,182,0.15)', border: '1px solid rgba(244,114,182,0.4)', borderRadius: 50, padding: '0.35rem 1rem', marginBottom: '1.5rem' }}>
            <Heart size={14} color="#f472b6" /><span style={{ color: '#f472b6', fontSize: '0.8rem', fontWeight: 600 }}>Wedding Invitation Digital</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)', marginBottom: '1.5rem', lineHeight: 1.15 }}>
            Invitaciones de boda <span className="gradient-text">que emocionan</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Crea una invitación digital interactiva que tus invitados nunca olvidarán.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem' }}><Heart size={18} />Comenzar mi invitación</button>
            <button className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.9rem 2rem' }}><Play size={18} />Ver Demo</button>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} style={{ marginTop: '3rem' }}>
            <Link to="/Wedding-Invitation/Admin" style={{ textDecoration: 'none' }}>
              <button style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: 'var(--color-purple-light)', padding: '0.5rem 1.2rem', borderRadius: 8, fontSize: '0.8rem', fontWeight: 500, cursor: 'pointer', fontFamily: 'var(--font-body)', transition: 'all 0.2s' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(124,58,237,0.2)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(124,58,237,0.1)')}>
                <Settings size={14} />Acceso Administrador
              </button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>Componentes que <span className="gradient-text">hacen la diferencia</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto' }}>Cada invitación incluye componentes interactivos diseñados para crear una experiencia única</p>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
          {features.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }} whileHover={{ scale: 1.02, y: -4 }} className="glass-card-sm" style={{ padding: '1.5rem' }}>
              <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{f.icon}</div>
              <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.95rem' }}>{f.title}</h4>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.6 }}>{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: 'clamp(1.8rem, 3.5vw, 2.8rem)', marginBottom: '1rem' }}>Planes y <span className="gradient-text">Precios</span></h2>
        </motion.div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {plans.map((plan, i) => (
            <motion.div key={plan.name} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} whileHover={{ y: -6 }}
              style={{ background: plan.popular ? 'linear-gradient(135deg, rgba(124,58,237,0.25), rgba(80,112,180,0.2))' : 'var(--bg-card)', border: `1px solid ${plan.popular ? 'rgba(124,58,237,0.5)' : 'var(--border-glass)'}`, borderRadius: 'var(--radius-xl)', padding: '2rem', position: 'relative' }}>
              {plan.popular && (<div style={{ position: 'absolute', top: -14, left: '50%', transform: 'translateX(-50%)', background: 'var(--gradient-brand)', borderRadius: 50, padding: '0.25rem 1rem', fontSize: '0.75rem', fontWeight: 700, color: 'white', whiteSpace: 'nowrap' }}>⭐ Más Popular</div>)}
              <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.2rem', color: plan.color }}>{plan.name}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', marginTop: '0.25rem' }}>{plan.desc}</p>
              <div style={{ margin: '1rem 0 1.5rem' }}>
                <span style={{ fontSize: '2.5rem', fontWeight: 800, color: 'var(--text-primary)', fontFamily: 'var(--font-display)' }}>{plan.price}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}> COP</span>
              </div>
              <ul style={{ listStyle: 'none', marginBottom: '2rem' }}>
                {plan.features.map((f) => (<li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '0.5rem' }}><CheckCircle size={14} color={plan.color} />{f}</li>))}
              </ul>
              <button className={plan.popular ? 'btn-primary' : 'btn-secondary'} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                Elegir {plan.name} <ArrowRight size={14} />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    <section className="section">
      <div className="container">
        <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap' }}>
          {([{ icon: Shield, label: 'Seguro y Privado', color: '#4ade80' }, { icon: Clock, label: 'Entrega en 72h', color: '#8ac4e0' }, { icon: Palette, label: '100% Personalizable', color: '#f472b6' }, { icon: Star, label: '5 estrellas promedio', color: '#fbbf24' }] as TrustItem[]).map(({ icon: Icon, label, color }) => (
            <motion.div key={label} whileHover={{ scale: 1.05 }} style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
              <div style={{ width: 52, height: 52, borderRadius: '50%', background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon size={22} color={color} /></div>
              <span style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', fontWeight: 500 }}>{label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
    <Footer />
  </div>
);

export default WeddingLanding;
