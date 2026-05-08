import { motion } from 'framer-motion';
import { Settings, Database, Bell, Shield, Palette } from 'lucide-react';
import { ElementType } from 'react';
import AdminLayout from '../components/admin/AdminLayout';

interface SettingSection { icon: ElementType; title: string; desc: string; color: string; status: string; }

const settingSections: SettingSection[] = [
  { icon: Database, title: 'Base de Datos', desc: 'Conexión MongoDB Atlas activa', color: '#10b981', status: 'Conectado' },
  { icon: Shield, title: 'Autenticación', desc: 'Firebase Google Auth activa', color: '#3b82f6', status: 'Seguro' },
  { icon: Bell, title: 'Notificaciones', desc: 'Sincronización con CRM activa', color: '#8b5cf6', status: 'En Línea' },
  { icon: Palette, title: 'Cloudinary', desc: 'Gestión de media activa', color: '#D7B272', status: 'Conectado' },
];

const AdminSettings = () => (
  <AdminLayout>
    <div style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Configuración</h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Estado de integraciones y servicios del sistema</p>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
      {settingSections.map(({ icon: Icon, title, desc, color, status }, i) => (
        <motion.div key={title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card" style={{ padding: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: `${color}15`, border: `1px solid ${color}30`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon size={20} color={color} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
                <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)' }}>{title}</h3>
                <span style={{ 
                  fontSize: '0.68rem', 
                  fontWeight: 600, 
                  padding: '0.2rem 0.6rem', 
                  borderRadius: 50, 
                  textTransform: 'uppercase', 
                  letterSpacing: '0.05em', 
                  background: `${color}15`, 
                  color: color, 
                  border: `1px solid ${color}40` 
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
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="glass-card" style={{ padding: '1.5rem', marginTop: '1.5rem' }}>
      <h3 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '0.95rem', color: 'var(--text-primary)', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <Settings size={16} color="var(--color-purple-light)" />Información del Sistema
      </h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        {[
          { label: 'Frontend', value: 'React + Vite + TailwindCSS' },
          { label: 'Backend', value: 'Node.js + Express' },
          { label: 'Base de Datos', value: 'MongoDB Atlas' },
          { label: 'Versión', value: 'v1.0.0' },
          { label: 'API URL', value: import.meta.env.VITE_API_URL },
          { label: 'UI Port', value: import.meta.env.VITE_PORT }
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

export default AdminSettings;
