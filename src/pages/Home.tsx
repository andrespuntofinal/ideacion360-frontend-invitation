import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Globe, Sparkles, ArrowRight, CheckCircle, Star, Users, Award, Zap, Play, ShieldCheck } from 'lucide-react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

import bannerImg from '../assets/banner.png';

const services = [
  {
    id: 'websites',
    icon: Globe,
    title: 'Sitios Web',
    subtitle: 'Desarrollo Web Profesional',
    description: 'Diseñamos y desarrollamos sitios web modernos, rápidos y optimizados para SEO. Desde landing pages hasta aplicaciones web complejas.',
    features: ['Diseño responsive', 'SEO optimizado', 'Alta performance', 'CMS incluido'],
    color: '#8ac4e0',
    gradient: 'linear-gradient(135deg, rgba(73, 139, 237, 0.44) 0%, #141228  100%)',
    border: 'rgba(138,196,224,0.3)',
    href: '/#sitios-web',
    cta: 'Cotizar Proyecto',
  },
  {
    id: 'wedding',
    icon: Heart,
    title: 'Wedding Invitation',
    subtitle: 'Invitaciones Digitales de Boda',
    description: 'Crea invitaciones de boda únicas, interactivas y memorables. Con animaciones, RSVP digital, cuenta regresiva y mucho más.',
    features: ['Sobre animado', 'RSVP Digital', 'Cuenta regresiva', 'Detalles del evento'],
    color: '#f472b6',
    gradient: 'linear-gradient(135deg, rgba(180, 153, 243, 0.46) 0%, #141228  100%)',
    border: 'rgba(244,114,182,0.3)',
    href: '/wedding',
    cta: 'Ver Invitaciones',
  },
  {
    id: 'animation',
    icon: Sparkles,
    title: 'Animación Digital',
    subtitle: 'Motion Design & Animation',
    description: 'Damos vida a tus ideas con animaciones digitales impactantes. Videos animados, motion graphics y efectos especiales que cautivan.',
    features: ['Motion graphics', 'Videos animados', '2D & 3D', 'Brand animations'],
    color: '#D7B272',
    gradient: 'linear-gradient(135deg, rgba(235, 219, 141, 0.6) 0%, #141228 100%)',
    border: 'rgba(251,146,60,0.3)',
    href: '/#animacion',
    cta: 'Ver Portfolio',
  },
];

const stats = [
  { value: '200+', label: 'Bodas realizadas', icon: Heart },
  { value: '98%', label: 'Clientes satisfechos', icon: Star },
  { value: '50+', label: 'Proyectos web', icon: Globe },
  { value: '5★', label: 'Calificación promedio', icon: Award },
];

const testimonials = [
  {
    name: 'Laura & Sebastián',
    text: 'La invitación fue lo más comentado de nuestra boda. Todos preguntaban cómo la habíamos hecho. ¡Absolutamente mágica!',
    rating: 5,
    avatar: 'LS',
  },
  {
    name: 'Valentina Torres',
    text: 'Ideación 360 transformó mi idea en un sitio web increíble. El equipo es profesional, creativo y muy atento a los detalles.',
    rating: 5,
    avatar: 'VT',
  },
  {
    name: 'Carlos & María',
    text: 'El sobre animado de nuestra invitación emocionó a toda la familia. Una experiencia digital que nunca olvidaremos.',
    rating: 5,
    avatar: 'CM',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

const Home = () => {
  return (
    <div style={{ minHeight: '100vh', background: '#090721', color: 'white' }}>
      <Navbar />

      {/* ===== HERO ===== */}
      <section style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
        paddingTop: 'calc(var(--nav-height) + 2rem)',
        paddingBottom: '4rem'
      }}>
        {/* Background orbs */}
        <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-100px', left: '-200px', opacity: 0.3 }} />
        <div className="orb orb-blue" style={{ width: 400, height: 400, top: '50%', right: '-100px', opacity: 0.2 }} />
        <div className="orb orb-pink" style={{ width: 300, height: 300, bottom: '10%', left: '40%', opacity: 0.15 }} />

        <div className="container" style={{ position: 'relative', zIndex: 1, padding: '0 1rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0,1fr) minmax(0,1fr)',
            gap: '3rem',
            alignItems: 'center'
          }} className="hero-grid">

            {/* Left Column: Content */}
            <div style={{ textAlign: 'left' }} className="hero-content">
              {/* Subtitle/Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                style={{
                  color: 'rgba(255,255,255,0.9)',
                  marginBottom: '2rem',
                  maxWidth: 600,
                }}
              >
                <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', fontWeight: 600, lineHeight: 1.2 }}>
                  Transformamos ideas en <br />
                  <span style={{
                    fontWeight: 800,
                    background: 'linear-gradient(to right, #3b82f6, #8b5cf6, #D7B272)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text'
                  }}>soluciones digitales memorables</span>
                </h2>
              </motion.div>

              {/* Hero Cards (3 components) */}
              <motion.div
                className="hero-cards"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                  gap: '1rem',
                  marginTop: '2rem',
                }}
              >
                {[
                  {
                    icon: Globe,
                    title: 'Sitios Web',
                    desc: '',
                    color: '#8ac4e0',
                    gradient: 'linear-gradient(135deg, rgba(73, 139, 237, 0.44) 0%, #141228  100%)'
                  },
                  {
                    icon: Heart,
                    title: 'Invitaciones de Boda',
                    desc: '',
                    color: '#8b5cf6',
                    gradient: 'linear-gradient(135deg, rgba(180, 153, 243, 0.46) 0%, #141228  100%)'
                  },
                  {
                    icon: Play,
                    title: 'Animación Digital',
                    desc: '',
                    color: '#D7B272',
                    gradient: 'linear-gradient(135deg, rgba(235, 219, 141, 0.6) 0%, #141228 100%)'
                  }
                ].map((card, i) => (
                  <motion.div
                    key={i}
                    whileHover={{
                      y: -8,
                      background: 'rgba(255,255,255,0.08)',
                      borderColor: card.color,
                      boxShadow: `0 10px 30px -10px ${card.color}50`
                    }}
                    style={{
                      background: card.gradient,
                      backdropFilter: 'blur(12px)',
                      border: `1px solid ${card.color}40`,
                      borderRadius: '20px',
                      padding: '1.5rem',
                      transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                      position: 'relative',
                      overflow: 'hidden'
                    }}
                    className="hero-card-item"
                  >
                    {/* Subtle inner glow */}
                    <div style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      background: `radial-gradient(circle at top right, ${card.color}15, transparent)`,
                      pointerEvents: 'none'
                    }} />

                    <div style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '12px',
                      background: `${card.color}25`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '1rem',
                      border: `1px solid ${card.color}50`,
                      position: 'relative',
                      zIndex: 1
                    }}>
                      <card.icon size={20} color={card.color} />
                    </div>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem', color: '#FFFFFF', position: 'relative', zIndex: 1 }}>{card.title}</h4>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.5, position: 'relative', zIndex: 1 }}>{card.desc}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}
              className="hero-image-container"
            >
              {/* Static image wrapper */}
              <motion.div
                style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: 580 }}
              >
                <img
                  src={bannerImg}
                  alt="Banner Ideación 360"
                  style={{
                    width: '100%',
                    height: 'auto',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 50px rgba(0,0,0,0.8))',
                    display: 'block',
                  }}
                />
                {/* Glow behind image */}
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '80%',
                  height: '80%',
                  background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, transparent 70%)',
                  filter: 'blur(60px)',
                  zIndex: -1
                }} />
              </motion.div>
            </motion.div>
          </div>

          <style>{`
            @media (max-width: 991px) {
              .hero-grid {
                grid-template-columns: 1fr !important;
                gap: 4rem !important;
              }
              .hero-content {
                text-align: center !important;
                order: 1;
              }
              .hero-content h2 {
                margin: 0 auto !important;
              }
              .hero-image-container {
                order: 2;
                max-width: 100% !important;
              }
              .hero-cards {
                grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)) !important;
                justify-content: center !important;
              }
            }

            @media (max-width: 576px) {
              .hero-cards {
                grid-template-columns: 1fr !important;
              }
              .hero-features {
                justify-content: center !important;
                gap: 0.5rem !important;
              }
              .hero-feature-item {
                width: 100% !important;
                justify-content: center !important;
              }
            }
          `}</style>

          {/* Bottom Features (4 components) moved to bottom of hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              gap: '1rem',
              flexWrap: 'wrap',
              marginTop: '5rem',
              padding: '1.5rem 0',
              borderTop: '1px solid rgba(255,255,255,0.1)',
              background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.02), transparent)'
            }}
            className="hero-features"
          >
            {[
              { label: 'Diseños Exclusivos' },
              { label: '100% Personalizados' },
              { label: 'Entrega Rápida' },
              { label: 'Soporte Premium' }
            ].map((item, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.8rem',
                color: 'rgba(255,255,255,0.7)',
                fontSize: '0.9rem',
                fontWeight: 500,
                padding: '0.5rem 1rem',
                borderRadius: '50px',
                transition: 'all 0.3s ease',
              }} className="hero-feature-item">
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  background: 'rgba(59, 130, 246, 0.1)',
                  border: '1px solid rgba(59, 130, 246, 0.3)'
                }}>
                  <CheckCircle size={14} color="#3b82f6" />
                </div>
                {item.label}
              </div>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{
            position: 'absolute', bottom: '1.5rem', left: '50%', transform: 'translateX(-50%)',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
          }}
          className="scroll-indicator"
        >
          <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Descubrir</span>
          <div style={{
            width: 24, height: 40, border: '2px solid var(--border-glass)',
            borderRadius: 12, display: 'flex', justifyContent: 'center', paddingTop: 6,
          }}>
            <div style={{
              width: 4, height: 8, background: 'var(--gradient-brand)',
              borderRadius: 2, animation: 'float 2s ease-in-out infinite',
            }} />
          </div>
        </motion.div>
      </section>

      {/* ===== STATS ===== */}
      <section style={{ padding: '4rem 0', background: '#090721', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{
              display: 'flex', justifyContent: 'center', gap: 'clamp(2rem, 5vw, 6rem)',
              flexWrap: 'wrap',
            }}
          >
            {stats.map(({ value, label, icon: Icon }) => (
              <div key={label} style={{ textAlign: 'center', minWidth: '140px', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                  <Icon size={18} color="#8b5cf6" />
                  <span style={{
                    fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800,
                    background: 'linear-gradient(to right, #FFFFFF, #8b5cf6)',
                    WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  }}>
                    {value}
                  </span>
                </div>
                <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.85rem', fontWeight: 500 }}>{label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== SERVICIOS ===== */}
      <section className="section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            style={{ textAlign: 'center', marginBottom: '4rem', padding: '0 1rem' }}
          >
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
              background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)',
              borderRadius: 50, padding: '0.3rem 1rem', marginBottom: '1.5rem',
            }}>
              <span style={{ color: 'var(--color-purple-light)', fontSize: '0.8rem', fontWeight: 600 }}>
                Nuestros Servicios
              </span>
            </div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', marginBottom: '1rem', lineHeight: 1.2 }}>
              Transformamos ideas en soluciones{' '}
              <span className="gradient-text">digitales</span>
            </h2>
            <p style={{ color: 'var(--text-secondary)', maxWidth: 600, margin: '0 auto', lineHeight: 1.7, fontSize: '1rem' }}>
              Ofrecemos soluciones digitales completas que van desde la emocionante invitación de tu boda
              hasta tu presencia web profesional.
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              padding: '0 1rem'
            }}
          >
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <motion.div
                  key={service.id}
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  style={{
                    background: service.gradient,
                    border: `1px solid ${service.border}`,
                    borderRadius: 'var(--radius-xl)',
                    padding: '2rem',
                    position: 'relative',
                    overflow: 'hidden',
                    cursor: 'pointer',
                  }}
                >
                  {/* Glow */}
                  <div style={{
                    position: 'absolute', top: -40, right: -40,
                    width: 120, height: 120, borderRadius: '50%',
                    background: service.color, opacity: 0.15, filter: 'blur(30px)',
                  }} />

                  {/* Icon */}
                  <div style={{
                    width: 56, height: 56, borderRadius: 16,
                    background: `linear-gradient(135deg, ${service.color}30, ${service.color}10)`,
                    border: `1px solid ${service.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem',
                  }}>
                    <Icon size={26} color={service.color} />
                  </div>

                  <p style={{ color: service.color, fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                    {service.subtitle}
                  </p>
                  <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)', marginBottom: '1rem' }}>
                    {service.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.5rem' }}>
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul style={{ listStyle: 'none', marginBottom: '2rem', padding: 0 }}>
                    {service.features.map(f => (
                      <li key={f} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
                        <CheckCircle size={14} color={service.color} />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link to={service.href} style={{ textDecoration: 'none' }}>
                    <button
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.5rem',
                        background: 'transparent', border: `1px solid ${service.border}`,
                        color: service.color, padding: '0.6rem 1.2rem',
                        borderRadius: 50, fontSize: '0.85rem', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.2s ease', fontFamily: 'var(--font-body)',
                        width: '100%', justifyContent: 'center'
                      }}
                      onMouseEnter={e => { e.currentTarget.style.background = `${service.color}20`; e.currentTarget.style.transform = 'translateX(4px)'; }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.transform = 'translateX(0)'; }}
                    >
                      {service.cta} <ArrowRight size={14} />
                    </button>
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ===== WHY US ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
        <div className="container" style={{ padding: '0 1.5rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'center' }}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                background: 'rgba(138,196,224,0.1)', border: '1px solid rgba(138,196,224,0.3)',
                borderRadius: 50, padding: '0.3rem 1rem', marginBottom: '1.5rem',
              }}>
                <span style={{ color: 'var(--color-blue)', fontSize: '0.8rem', fontWeight: 600 }}>
                  ¿Por qué Ideación 360?
                </span>
              </div>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '1.5rem', lineHeight: 1.2 }}>
                Donde la tecnología{' '}
                <span className="gradient-text">se encuentra</span>
                {' '}con la emoción
              </h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '1.05rem' }}>
                No solo creamos productos digitales, creamos experiencias que tocan el corazón.
                Cada proyecto es único, personalizado y diseñado para superar tus expectativas.
              </p>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {[
                  { label: 'Diseño Premium', color: '#7C3AED' },
                  { label: 'Soporte 24/7', color: '#f472b6' },
                  { label: 'Entrega Rápida', color: '#8ac4e0' },
                ].map(tag => (
                  <span key={tag.label} style={{
                    background: `${tag.color}15`, border: `1px solid ${tag.color}40`,
                    color: tag.color, padding: '0.4rem 1rem', borderRadius: 50,
                    fontSize: '0.85rem', fontWeight: 600,
                  }}>
                    {tag.label}
                  </span>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}
            >
              {[
                { icon: Heart, title: 'Emoción Digital', text: 'Creamos experiencias que generan una conexión emocional real', color: '#f472b6' },
                { icon: Zap, title: 'Alta Velocidad', text: 'Sitios optimizados para cargar en menos de 2 segundos', color: '#7C3AED' },
                { icon: Users, title: 'Personalizado', text: 'Cada proyecto diseñado a la medida de tu visión y necesidades', color: '#8ac4e0' },
                { icon: Award, title: 'Calidad Garantizada', text: 'Revisiones incluidas hasta que quedes 100% satisfecho', color: '#fb923c' },
              ].map(({ icon: Icon, title, text, color }) => (
                <motion.div
                  key={title}
                  whileHover={{ scale: 1.03 }}
                  className="glass-card-sm"
                  style={{ padding: '1.5rem', height: '100%' }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    background: `${color}15`, border: `1px solid ${color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem',
                  }}>
                    <Icon size={20} color={color} />
                  </div>
                  <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1rem', color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                    {title}
                  </h4>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>{text}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIOS ===== */}
      <section className="section">
        <div className="container" style={{ padding: '0 1rem' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '4rem' }}
          >
            <h2 style={{ fontSize: 'clamp(2rem, 4vw, 2.8rem)', marginBottom: '1rem' }}>
              Lo que dicen nuestros <span className="gradient-text">clientes</span>
            </h2>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass-card"
                style={{ padding: '2rem' }}
              >
                <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '1.25rem' }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={14} color="#fbbf24" fill="#fbbf24" />
                  ))}
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '2rem', fontStyle: 'italic' }}>
                  "{t.text}"
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'var(--gradient-brand)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '0.85rem', fontWeight: 700, color: 'white',
                  }}>
                    {t.avatar}
                  </div>
                  <div>
                    <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.95rem' }}>{t.name}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Cliente verificado</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA FINAL ===== */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-card"
            style={{
              padding: '4rem 2rem', textAlign: 'center', position: 'relative', overflow: 'hidden',
              background: 'linear-gradient(135deg, rgba(124,58,237,0.2) 0%, rgba(80,112,180,0.15) 100%)',
              border: '1px solid rgba(124,58,237,0.3)',
            }}
          >
            <div className="orb orb-purple" style={{ width: 300, height: 300, top: '-100px', left: '-50px', opacity: 0.3 }} />
            <div className="orb orb-pink" style={{ width: 200, height: 200, bottom: '-50px', right: '50px', opacity: 0.3 }} />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{ fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1.25rem' }}>
                ¿Listo para comenzar tu <span className="gradient-text">transformación digital</span>?
              </h2>
              <p style={{ color: 'var(--text-secondary)', maxWidth: 500, margin: '0 auto 2.5rem', lineHeight: 1.7 }}>
                Cuéntanos tu idea y te mostraremos cómo hacerla realidad con tecnología y creatividad.
              </p>
              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <Link to="/wedding">
                  <button className="btn-primary" style={{ padding: '0.9rem 2.5rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Heart size={18} />
                    Crear mi invitación de boda
                  </button>
                </Link>
                <button className="btn-secondary" style={{ padding: '0.9rem 2rem', fontSize: '1rem' }}>
                  Hablar con un asesor
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
