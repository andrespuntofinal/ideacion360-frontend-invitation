import { ReactNode, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { LayoutDashboard, Calendar, LogOut, Menu, ChevronRight, Settings, Bell } from 'lucide-react';
import useAuthStore from '../../stores/authStore';
import logoSitio from '../../assets/logositio.jpg';

interface AdminLayoutProps {
  children: ReactNode;
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/wedding/Admin/dashboard' },
  { icon: Calendar, label: 'Eventos', href: '/wedding/Admin/events' },
  { icon: Settings, label: 'Configuración', href: '/wedding/Admin/settings' },
];

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  const handleLogout = () => { logout(); navigate('/wedding/Admin'); };

  const SidebarContent = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, overflow: 'hidden', border: '1px solid var(--border-glass)' }}>
          <img src={logoSitio} alt="Ideación 360" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '1rem', background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Ideación 360</div>
          <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Admin Panel</div>
        </div>
      </div>

      <nav style={{ flex: 1, padding: '1rem', overflowY: 'auto' }}>
        <div style={{ marginBottom: '0.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '0 0.75rem', marginBottom: '0.5rem' }}>Menú Principal</p>
          {navItems.map(({ icon: Icon, label, href }) => {
            const active = location.pathname === href || location.pathname.startsWith(href + '/');
            return (
              <Link key={href} to={href} style={{ textDecoration: 'none' }} onClick={() => setSidebarOpen(false)}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.7rem 0.75rem', borderRadius: 10, marginBottom: '0.25rem', cursor: 'pointer', background: active ? 'rgba(124,58,237,0.15)' : 'transparent', border: active ? '1px solid rgba(124,58,237,0.3)' : '1px solid transparent', transition: 'all 0.2s' }}
                  onMouseEnter={(e) => { if (!active) e.currentTarget.style.background = 'rgba(124,58,237,0.07)'; }}
                  onMouseLeave={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                >
                  <Icon size={17} color={active ? 'var(--color-purple-light)' : 'var(--text-muted)'} />
                  <span style={{ fontSize: '0.875rem', fontWeight: active ? 600 : 400, color: active ? 'var(--color-purple-light)' : 'var(--text-secondary)' }}>{label}</span>
                  {active && <ChevronRight size={14} color="var(--color-purple-light)" style={{ marginLeft: 'auto' }} />}
                </div>
              </Link>
            );
          })}
        </div>
      </nav>

      <div style={{ padding: '1rem', borderTop: '1px solid var(--border-glass)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem', borderRadius: 10, background: 'rgba(28,26,48,0.8)' }}>
          <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, color: 'white', flexShrink: 0 }}>
            {user?.username?.[0]?.toUpperCase() || 'A'}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: 'var(--text-primary)', fontWeight: 600, fontSize: '0.85rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{user?.name || 'Administrador'}</div>
            <div style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>Admin</div>
          </div>
          <button onClick={handleLogout} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', transition: 'color 0.2s' }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#f87171')}
            onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
          >
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <aside style={{ width: 240, flexShrink: 0, background: 'var(--bg-card)', borderRight: '1px solid var(--border-glass)', position: 'fixed', top: 0, left: 0, bottom: 0, zIndex: 50 }} className="desktop-sidebar">
        <SidebarContent />
      </aside>

      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 100, backdropFilter: 'blur(4px)' }}
            />
            <motion.aside initial={{ x: -260 }} animate={{ x: 0 }} exit={{ x: -260 }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: 240, background: 'var(--bg-card)', borderRight: '1px solid var(--border-glass)', zIndex: 101 }}>
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <div style={{ flex: 1, marginLeft: 240, display: 'flex', flexDirection: 'column' }} className="main-content">
        <header style={{ height: 60, background: 'var(--bg-card)', borderBottom: '1px solid var(--border-glass)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', position: 'sticky', top: 0, zIndex: 40 }}>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="mobile-menu-btn"
            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', display: 'none' }}>
            <Menu size={22} />
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4ade80', boxShadow: '0 0 8px #4ade80' }} />
            <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>Sistema Online</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button style={{ background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}><Bell size={18} /></button>
          </div>
        </header>
        <main style={{ flex: 1, padding: '1.5rem', overflowY: 'auto' }}>{children}</main>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .main-content { margin-left: 0 !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </div>
  );
};

export default AdminLayout;
