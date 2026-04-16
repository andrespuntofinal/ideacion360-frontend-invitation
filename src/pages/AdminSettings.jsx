import { motion } from 'framer-motion';
import { Settings, Database, Bell, Shield, Palette } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';

const settingSections = [
  {
    icon: Database,
    title: 'Base de Datos',
    desc: 'Conexión MongoDB Atlas activa',
    color: '#4ade80',
    status: 'Conectado',
  },
  {
    icon: Shield,
    title: 'Autenticación',
    desc: 'Credenciales fijas (Firebase Auth — próximamente)',
    color: '#8ac4e0',
    status: 'Básico',
  },
  {
    icon: Bell,
    title: 'Notificaciones',
    desc: 'n8n workflow integration — próximamente',
    color: '#fbbf24',
    status: 'Pendiente',
  },
  {
    icon: Palette,
    title: 'Cloudinary',
    desc: 'Gestión de imágenes y media — próximamente',
    color: '#f472b6',
    status: 'Pendiente',
  },
];

const AdminSettings = () => {
  return (
    <AdminLayout>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
          Configuración
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
          Estado de integraciones y servicios del sistema
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {settingSections.map(({ icon: Icon, title, desc, color, status }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card"
            style={{ padding: '1.5rem' }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12,
                background: `${color}15`, border: `1px solid ${color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={20} color={color} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                  <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>
                    {title}
                  </h3>
                  <span style={{
                    fontSize: '0.68rem', fontWeight: 600, padding: '0.2rem 0.5rem',
                    borderRadius: 50, textTransform: 'uppercase', letterSpacing: '0.05em',
                    background: status === 'Conectado' ? 'rgba(74,222,128,0.15)' : status === 'Básico' ? 'rgba(138,196,224,0.15)' : 'rgba(107,114,128,0.15)',
                    color: status === 'Conectado' ? '#4ade80' : status === 'Básico' ? '#8ac4e0' : '#9ca3af',
                    border: `1px solid ${status === 'Conectado' ? 'rgba(74,222,128,0.3)' : status === 'Básico' ? 'rgba(138,196,224,0.3)' : 'rgba(107,114,128,0.3)'}`,
                  }}>
                    {status}
                  </span>
                </div>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem', lineHeight: 1.5 }}>{desc}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* System Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="glass-card"
        style={{ padding: '1.5rem', marginTop: '1.5rem' }}
      >
        <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Settings size={16} color="var(--color-purple-light)" />
          Información del Sistema
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
          {[
            { label: 'Frontend', value: 'React + Vite + TailwindCSS' },
            { label: 'Backend', value: 'Node.js + Express' },
            { label: 'Base de Datos', value: 'MongoDB Atlas' },
            { label: 'Versión', value: 'v1.0.0' },
            { label: 'Puerto API', value: 'localhost:5001' },
            { label: 'Puerto UI', value: 'localhost:5173' },
          ].map(({ label, value }) => (
            <div key={label}>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.72rem', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.2rem' }}>{label}</div>
              <div style={{ color: 'var(--color-purple-light)', fontSize: '0.875rem', fontWeight: 500 }}>{value}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </AdminLayout>
  );
};

export default AdminSettings;
