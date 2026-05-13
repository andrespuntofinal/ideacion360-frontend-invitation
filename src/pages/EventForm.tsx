import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, User, Heart, ToggleLeft, AlertCircle, CheckCircle, Mail, Phone, CreditCard, Calendar, Clock, LayoutGrid, Settings, Ban, CheckCircle2, FilePen } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';
import toast from 'react-hot-toast';

interface ComponentEntry { key: string; label: string; emoji: string; desc: string; }
const COMPONENTS_LIST: ComponentEntry[] = [
  { key: 'banner', label: 'Banner', emoji: '🖼️', desc: 'Imagen o video principal' },
  { key: 'calendar', label: 'Calendario', emoji: '📅', desc: 'Fecha de la boda' },
  { key: 'carousel', label: 'Carrusel', emoji: '🖼️', desc: 'Galería de fotos' },
  { key: 'childRestriction', label: 'Restricción Asistentes', emoji: '🚫', desc: 'Restricciones para menores' },
  { key: 'countdown', label: 'Conteo Regresivo', emoji: '⏱️', desc: 'Timer hasta el gran día' },
  { key: 'dressCode', label: 'Código de Vestimenta', emoji: '👗', desc: 'Dress code del evento' },
  { key: 'envelope', label: 'Sobre Tarjeta', emoji: '💌', desc: 'Sobre animado' },
  { key: 'eventDetails', label: 'Detalles Ceremonia', emoji: '📍', desc: 'Lugares y horarios' },
  { key: 'message', label: 'Mensaje Principal', emoji: '✉️', desc: 'Mensaje de los novios' },
  { key: 'presents', label: 'Regalos', emoji: '🎁', desc: 'Lista de regalos' },
  { key: 'rsvp', label: 'RSVP', emoji: '✅', desc: 'Confirmación digital' },
  { key: 'timeline', label: 'Línea de Tiempo', emoji: '📋', desc: 'Programa del día' },
  { key: 'guestManagement', label: 'Gestión Invitados', emoji: '👥', desc: 'Control de invitados' },
];

interface FormState {
  type: "web" | "video" | "card";
  status: "draft" | "active" | "canceled" | "completed";
  contact: Record<string, string>;
  wedding: Record<string, string>;
  activeComponents: Record<string, boolean>;
}

const defaultForm: FormState = {
  type: 'web', status: 'draft',
  contact: { name: '', email: '', phone: '', identification: '' },
  wedding: { coupleNames: '', weddingDate: '', weddingTime: '' },
  activeComponents: Object.fromEntries(COMPONENTS_LIST.map((c) => [c.key, false])),
};

const EventForm = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { createEvent, updateEvent, fetchEventById, isLoading } = useEventsStore();
  const isEdit = Boolean(id);
  const [form, setForm] = useState<FormState>(defaultForm);
  const [activeStep, setActiveStep] = useState(0);
  const [notification, setNotification] = useState<{ type: string; message: string } | null>(null);

  useEffect(() => {
    if (isEdit && id) {
      fetchEventById(id).then((event) => {
        if (event) {
          setForm({
            type: event.type || 'web',
            status: (event.status as any) || 'draft',
            contact: (event.contact as Record<string, string>) || defaultForm.contact,
            wedding: {
              coupleNames: (event.wedding as Record<string, string>)?.coupleNames || '',
              weddingDate: (event.wedding as Record<string, string>)?.weddingDate
                ? new Date((event.wedding as Record<string, string>).weddingDate).toISOString().split('T')[0] : '',
              weddingTime: (event.wedding as Record<string, string>)?.weddingTime || '',
            },
            activeComponents: { ...defaultForm.activeComponents, ...(event.activeComponents as unknown as Record<string, boolean>) },
          });
        }
      });
    }
  }, [id, isEdit]);

  const setField = (section: keyof FormState, field: string, value: string) =>
    setForm((f) => ({ ...f, [section]: { ...(f[section] as Record<string, string>), [field]: value } }));

  const toggleComponent = (key: string) =>
    setForm((f) => ({ ...f, activeComponents: { ...f.activeComponents, [key]: !f.activeComponents[key] } }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload: any = { ...form, wedding: { ...form.wedding, weddingDate: form.wedding.weddingDate ? new Date(form.wedding.weddingDate).toISOString() : '' } };
    const result = isEdit && id ? await updateEvent(id, payload) : await createEvent(payload);
    if (result.success) {
      setNotification({ type: 'success', message: isEdit ? '¡Evento actualizado!' : '¡Evento creado!' });
      toast.success(isEdit ? 'Evento actualizado' : 'Evento creado');
      setTimeout(() => navigate('/wedding/Admin/dashboard'), 1500);
    } else {
      setNotification({ type: 'error', message: result.message || 'Error al guardar' });
      toast.error(result.message || 'Error al guardar');
    }
  };

  const steps = [
    { label: 'Tipo de Evento', icon: LayoutGrid },
    { label: 'Contacto', icon: User },
    { label: 'Detalles Boda', icon: Heart },
    { label: 'Componentes', icon: Settings }
  ];

  return (
    <AdminLayout>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => navigate('/wedding/Admin/dashboard')}
          style={{ background: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', color: '#a78bfa', padding: '0.5rem', borderRadius: 8, cursor: 'pointer', display: 'flex' }}>
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>{isEdit ? 'Editar Evento' : 'Crear Nuevo Evento'}</h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>{isEdit ? `ID: ${id?.slice(0, 8)}...` : 'Complete los pasos'}</p>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.25rem', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem', background: 'rgba(20, 44, 75, 0.3)', padding: '0.4rem', borderRadius: '14px', border: '1px solid var(--border-glass)' }}>
        {steps.map((step, i) => {
          const StepIcon = step.icon;
          const isActive = activeStep === i;
          return (
            <button key={step.label} onClick={() => setActiveStep(i)}
              style={{
                flex: 1,
                minWidth: 'max-content',
                padding: '0.85rem 1.25rem',
                background: isActive ? 'linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(138, 196, 224, 0.1) 100%)' : 'transparent',
                border: 'none',
                color: isActive ? 'var(--text-secondary)' : 'var(--text-muted)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 700 : 500,
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                borderRadius: '10px',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.6rem',
                whiteSpace: 'nowrap'
              }}>
              <StepIcon size={18} style={{ opacity: isActive ? 1 : 0.6 }} />
              <span className="step-label">{step.label}</span>
            </button>
          );
        })}
      </div>

      {notification && (
        <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', background: notification.type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)', border: `1px solid ${notification.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`, borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem', color: notification.type === 'success' ? '#4ade80' : '#f87171' }}>
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}{notification.message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <motion.div key={activeStep} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.35 }}>
          {activeStep === 0 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={18} color="var(--color-purple-light)" />Tipo de Invitación</h2>
              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[{ value: 'web', label: 'Card Web', emoji: '🌐', desc: 'Página web interactiva' }, { value: 'video', label: 'Card Video', emoji: '🎬', desc: 'Video animado' }, { value: 'card', label: 'Card Digital', emoji: '💌', desc: 'Tarjeta digital' }].map((opt) => (
                  <div key={opt.value} onClick={() => setForm((f) => ({ ...f, type: opt.value as "web" | "video" | "card" }))}
                    style={{ padding: '1.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer', border: `2px solid ${form.type === opt.value ? 'var(--color-purple)' : 'var(--border-glass)'}`, background: form.type === opt.value ? 'rgba(139, 92, 246, 0.12)' : 'var(--bg-card2)', transition: 'all 0.2s', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{opt.emoji}</div>
                    <div style={{ fontWeight: 600, color: form.type === opt.value ? '#a78bfa' : 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.9rem' }}>{opt.label}</div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: '2rem' }}>
                <div style={{ maxWidth: '320px' }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckCircle size={14} color="var(--text-secondary)" />Estado del Evento</label>
                  <div style={{ position: 'relative' }}>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as any }))}
                      className="input-field"
                      style={{ paddingLeft: '2.5rem', appearance: 'auto' }}
                    >
                      <option value="active">✅ Activo</option>
                      <option value="draft">⏳ Borrador</option>
                      <option value="canceled">❌ Cancelado</option>
                      <option value="completed">🏆 Concluido</option>
                    </select>
                    <div style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', opacity: 0.7 }}>
                      {form.status === 'active' ? <CheckCircle size={18} color="#4ade80" /> :
                        form.status === 'draft' ? <FilePen size={18} color="#fbbf24" /> :
                          form.status === 'canceled' ? <Ban size={18} color="#f87171" /> :
                            <CheckCircle2 size={18} color="#3b82f6" />}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 1 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><User size={18} color="var(--color-purple-light)" />Información de Contacto</h2>
              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                {[
                  { field: 'name', label: 'Nombre Contacto', placeholder: 'María García', type: 'text', icon: User },
                  { field: 'email', label: 'Correo Electrónico', placeholder: 'correo@ejemplo.com', type: 'email', icon: Mail },
                  { field: 'phone', label: 'Celular', placeholder: '+57 300 000 0000', type: 'tel', icon: Phone },
                  { field: 'identification', label: 'Identificación', placeholder: '1234567890', type: 'text', icon: CreditCard }
                ].map(({ field, label, placeholder, type, icon: Icon }) => (
                  <div key={field}>
                    <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Icon size={14} color="var(--text-secondary)" />{label}</label>
                    <div style={{ position: 'relative' }}>
                      <input
                        type={type}
                        className="input-field"
                        placeholder={placeholder}
                        value={form.contact[field] || ''}
                        onChange={(e) => setField('contact', field, e.target.value)}
                        style={{ paddingLeft: '2.75rem' }}
                      />
                      <Icon size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, color: 'var(--text-secondary)' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeStep === 2 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={18} color="#f472b6" />Detalles de la Boda</h2>
              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Heart size={14} color="var(--text-secondary)" />Nombre de los Novios</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="text"
                      className="input-field"
                      placeholder="Sebastián & Laura"
                      value={form.wedding.coupleNames || ''}
                      onChange={(e) => setField('wedding', 'coupleNames', e.target.value)}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                    <Heart size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, color: '#f472b6' }} />
                  </div>
                </div>
                <div>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Calendar size={14} color="var(--text-secondary)" />Fecha de la Boda</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="date"
                      className="input-field"
                      value={form.wedding.weddingDate || ''}
                      onChange={(e) => setField('wedding', 'weddingDate', e.target.value)}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                    <Calendar size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, color: 'var(--text-secondary)' }} />
                  </div>
                </div>
                <div>
                  <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Clock size={14} color="var(--text-secondary)" />Hora de la Boda</label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="time"
                      className="input-field"
                      value={form.wedding.weddingTime || ''}
                      onChange={(e) => setField('wedding', 'weddingTime', e.target.value)}
                      style={{ paddingLeft: '2.75rem' }}
                    />
                    <Clock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.4, color: 'var(--text-secondary)' }} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeStep === 3 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><ToggleLeft size={18} color="var(--color-purple-light)" />Componentes</h2>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>{Object.values(form.activeComponents).filter(Boolean).length} / {COMPONENTS_LIST.length}</span>
              </div>
              <div className="grid-responsive" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {COMPONENTS_LIST.map(({ key, label, emoji, desc }) => {
                  const isActive = form.activeComponents[key];
                  return (
                    <motion.div key={key} whileHover={{ scale: 1.01 }} onClick={() => toggleComponent(key)}
                      style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)', border: `1px solid ${isActive ? 'rgba(139, 92, 246, 0.4)' : 'var(--border-glass)'}`, background: isActive ? 'rgba(139, 92, 246, 0.08)' : 'var(--bg-card2)', cursor: 'pointer', transition: 'all 0.2s' }}>
                      <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: isActive ? '#a78bfa' : 'var(--text-primary)', marginBottom: '0.2rem' }}>{label}</div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{desc}</div>
                      </div>
                      <div style={{ width: 44, height: 24, borderRadius: 12, background: isActive ? 'var(--color-purple)' : 'rgba(80,80,100,0.5)', position: 'relative', transition: 'all 0.3s ease', flexShrink: 0, border: `1px solid ${isActive ? 'var(--color-purple)' : 'var(--border-glass)'}` }}>
                        <div style={{ position: 'absolute', top: 2, left: isActive ? 21 : 2, width: 18, height: 18, borderRadius: '50%', background: isActive ? 'white' : 'var(--text-muted)', transition: 'left 0.3s cubic-bezier(0.4,0,0.2,1)', boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '1rem' }}>
          <button type="button" className="btn-secondary" onClick={() => activeStep > 0 ? setActiveStep((s) => s - 1) : navigate('/wedding/Admin/dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowLeft size={16} />{activeStep === 0 ? 'Cancelar' : 'Anterior'}
          </button>
          {activeStep < steps.length - 1 ? (
            <button type="button" className="btn-primary" onClick={() => setActiveStep((s) => s + 1)}>Siguiente →</button>
          ) : (
            <motion.button type="submit" className="btn-primary" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} disabled={isLoading} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1 }}>
              {isLoading ? (<><div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite' }} />Guardando...</>) : (<><Save size={16} />{isEdit ? 'Guardar Cambios' : 'Crear Evento'}</>)}
            </motion.button>
          )}
        </div>
      </form>

      <style>{`
        @media (max-width: 768px) {
          .glass-card {
            padding: 1.25rem !important;
            margin-left: -0.5rem;
            margin-right: -0.5rem;
          }
          
          .step-label {
            display: none;
          }
          
          button[style*="minWidth: max-content"] {
            min-width: auto !important;
            padding: 0.85rem !important;
          }

          .grid-responsive {
            grid-template-columns: 1fr !important;
          }
        }

        @media (max-width: 480px) {
          h1 {
            font-size: 1.3rem !important;
          }
          .input-field {
            font-size: 0.9rem !important;
          }
        }
      `}</style>
    </AdminLayout>
  );
};

export default EventForm;
