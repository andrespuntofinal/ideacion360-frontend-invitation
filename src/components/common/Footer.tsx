import { Link } from 'react-router-dom';
import { Zap, Heart, Mail, Globe, MessageCircle } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer style={{ background: 'var(--bg-secondary)', borderTop: '1px solid var(--border-glass)', padding: '3rem 0 1.5rem' }}>
      <div className="container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '2.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: 'var(--gradient-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Zap size={16} color="white" />
              </div>
              <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: 700, background: 'var(--gradient-brand)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                Ideación 360
              </span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', lineHeight: 1.7 }}>
              Transformamos ideas en soluciones digitales. Creamos experiencias únicas e inolvidables.
            </p>
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Servicios</h4>
            {['Wedding Invitation', 'Sitios Web', 'Animación Digital'].map((item) => (
              <div key={item} style={{ marginBottom: '0.5rem' }}>
                <Link to="/wedding"
                  style={{ color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.85rem', transition: 'color 0.2s' }}
                  onMouseEnter={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--color-purple-light)')}
                  onMouseLeave={(e) => ((e.target as HTMLAnchorElement).style.color = 'var(--text-secondary)')}
                >
                  {item}
                </Link>
              </div>
            ))}
          </div>

          <div>
            <h4 style={{ color: 'var(--text-primary)', fontSize: '0.875rem', fontWeight: 600, marginBottom: '1rem', fontFamily: 'var(--font-body)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Contacto</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {[{ icon: Mail, text: 'notificaciones@ideacion360.com' }, { icon: Globe, text: 'ideacion360.com' }, { icon: MessageCircle, text: '@ideacion360' }].map(({ icon: Icon, text }) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <Icon size={14} />{text}
                </div>
              ))}
            </div>
          </div>
        </div>

        <hr className="gradient-divider" />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>© {currentYear} Ideación 360. Todos los derechos reservados.</p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            Hecho con <Heart size={12} color="#f472b6" fill="#f472b6" /> en Colombia
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
