import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import logoSitio from '../../assets/logositio.jpg';

const navLinks = [
  { label: 'Inicio', href: '/' },
  { label: 'Wedding Invitations', href: '/wedding' },
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
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        height: 'var(--nav-height)', transition: 'all 0.3s ease',
        background: scrolled ? 'rgba(10, 9, 20, 0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-glass)' : 'none',
      }}
    >
      <div className="container" style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
            <img src={logoSitio} alt="Ideación 360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
          <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
            Ideación 360
          </span>
        </Link>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="desktop-nav">
          {navLinks.map((link) => (
            <Link key={link.label} to={link.href}
              style={{ textDecoration: 'none', color: location.pathname === link.href ? 'var(--color-purple-light)' : 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
              onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--color-white)')}
              onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = location.pathname === link.href ? 'var(--color-purple-light)' : 'var(--text-secondary)')}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <Link to="/wedding/login">
              <button className="btn-secondary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Mi boda</button>
            </Link>
            <Link to="/wedding/Admin/dashboard">
              <button className="btn-primary" style={{ padding: '0.5rem 1.25rem', fontSize: '0.8rem' }}>Admin</button>
            </Link>
          </div>
        </nav>

        <button onClick={() => setMenuOpen(!menuOpen)}
          style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none', padding: '0.5rem' }}
          className="mobile-menu-btn"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            style={{ background: 'rgba(10, 9, 20, 0.98)', backdropFilter: 'blur(20px)', borderTop: '1px solid var(--border-glass)', padding: '1rem' }}>
            {navLinks.map((link) => (
              <Link key={link.label} to={link.href}
                style={{ display: 'block', padding: '0.75rem 1rem', textDecoration: 'none', color: 'var(--text-primary)', fontSize: '0.9rem', borderBottom: '1px solid var(--border-glass)' }}>
                {link.label}
              </Link>
            ))}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '1rem' }}>
              <Link to="/wedding/login" style={{ display: 'block' }}>
                <button className="btn-secondary" style={{ width: '100%' }}>Mi boda</button>
              </Link>
              <Link to="/wedding/Admin/dashboard" style={{ display: 'block' }}>
                <button className="btn-primary" style={{ width: '100%' }}>Admin Panel</button>
              </Link>
            </div>
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
