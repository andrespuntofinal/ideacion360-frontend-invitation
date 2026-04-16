import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Wedding Invitations', href: '/Wedding-Invitation' },
  { label: 'Sitios Web', href: '/#sitios-web' },
  { label: 'Animación Digital', href: '/#animacion' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => setMenuOpen(false), [location]);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: 'var(--nav-height)',
        transition: 'all 0.3s ease',
        background: scrolled
          ? 'rgba(10, 9, 20, 0.95)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : 'none',
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'var(--gradient-brand)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: 700,
            background: 'var(--gradient-brand)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Ideación 360
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              style={{
                textDecoration: 'none',
                color: location.pathname === link.href ? 'var(--color-purple-light)' : 'var(--text-secondary)',
                fontSize: '0.875rem',
                fontWeight: 500,
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => e.target.style.color = 'var(--color-white)'}
              onMouseLeave={e => e.target.style.color = location.pathname === link.href ? 'var(--color-purple-light)' : 'var(--text-secondary)'}
            >
              {link.label}
            </Link>
          ))}
          <Link to="/Wedding-Invitation/Admin/dashboard">
            <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>
              Admin
            </button>
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            background: 'none', border: 'none', color: 'var(--text-primary)',
            cursor: 'pointer', display: 'none', padding: '0.5rem',
          }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{
              background: 'rgba(10, 9, 20, 0.98)',
              backdropFilter: 'blur(20px)',
              borderTop: '1px solid var(--border-glass)',
              padding: '1rem',
            }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                style={{
                  display: 'block',
                  padding: '0.75rem 1rem',
                  textDecoration: 'none',
                  color: 'var(--text-primary)',
                  fontSize: '0.9rem',
                  borderBottom: '1px solid var(--border-glass)',
                }}
              >
                {link.label}
              </Link>
            ))}
            <Link to="/Wedding-Invitation/Admin/dashboard" style={{ display: 'block', marginTop: '1rem' }}>
              <button className="btn-primary" style={{ width: '100%' }}>Admin Panel</button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </motion.header>
  );
};

export default Navbar;
