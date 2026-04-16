import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Save, ArrowLeft, User, Heart, ToggleLeft, AlertCircle, CheckCircle } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';
import toast from 'react-hot-toast';

const COMPONENTS_LIST = [
  { key: 'banner', label: 'Banner', emoji: '🖼️', desc: 'Imagen o video principal de la invitación' },
  { key: 'calendar', label: 'Calendario', emoji: '📅', desc: 'Visualización de la fecha de la boda' },
  { key: 'carousel', label: 'Carrusel', emoji: '🖼️', desc: 'Galería de fotos de la pareja' },
  { key: 'childRestriction', label: 'Restricción Asistentes', emoji: '🚫', desc: 'Restricciones para menores u otros' },
  { key: 'countdown', label: 'Conteo Regresivo', emoji: '⏱️', desc: 'Timer animado hasta el gran día' },
  { key: 'dressCode', label: 'Código de Vestimenta', emoji: '👗', desc: 'Guía del dress code del evento' },
  { key: 'envelope', label: 'Sobre Tarjeta', emoji: '💌', desc: 'Sobre animado con la invitación' },
  { key: 'eventDetails', label: 'Detalles Ceremonia/Celebración', emoji: '📍', desc: 'Lugares y horarios del evento' },
  { key: 'message', label: 'Mensaje Principal', emoji: '✉️', desc: 'Mensaje personalizado de los novios' },
  { key: 'presents', label: 'Regalos', emoji: '🎁', desc: 'Información sobre lista de regalos' },
  { key: 'rsvp', label: 'RSVP', emoji: '✅', desc: 'Confirmación de asistencia digital' },
  { key: 'timeline', label: 'Línea de Tiempo', emoji: '📋', desc: 'Programa del día de la boda' },
  { key: 'guestManagement', label: 'Gestión Invitados', emoji: '👥', desc: 'Lista y control de invitados' },
];

const defaultForm = {
  type: 'web',
  status: 'draft',
  contact: { name: '', email: '', phone: '', identification: '' },
  wedding: { coupleNames: '', weddingDate: '', weddingTime: '' },
  activeComponents: Object.fromEntries(COMPONENTS_LIST.map(c => [c.key, false])),
};

const EventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { createEvent, updateEvent, fetchEventById, isLoading } = useEventsStore();
  const isEdit = Boolean(id);
  const [form, setForm] = useState(defaultForm);
  const [activeStep, setActiveStep] = useState(0);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    if (isEdit) {
      fetchEventById(id).then(event => {
        if (event) {
          setForm({
            type: event.type || 'web',
            status: event.status || 'draft',
            contact: event.contact || defaultForm.contact,
            wedding: {
              ...event.wedding,
              weddingDate: event.wedding?.weddingDate
                ? new Date(event.wedding.weddingDate).toISOString().split('T')[0]
                : '',
            },
            activeComponents: { ...defaultForm.activeComponents, ...event.activeComponents },
          });
        }
      });
    }
  }, [id, isEdit]);

  const setField = (section, field, value) =>
    setForm(f => ({ ...f, [section]: { ...f[section], [field]: value } }));

  const toggleComponent = (key) =>
    setForm(f => ({ ...f, activeComponents: { ...f.activeComponents, [key]: !f.activeComponents[key] } }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      wedding: {
        ...form.wedding,
        weddingDate: form.wedding.weddingDate ? new Date(form.wedding.weddingDate) : null,
      },
    };

    const result = isEdit ? await updateEvent(id, payload) : await createEvent(payload);

    if (result.success) {
      setNotification({ type: 'success', message: isEdit ? '¡Evento actualizado exitosamente!' : '¡Evento creado exitosamente!' });
      toast.success(isEdit ? 'Evento actualizado' : 'Evento creado');
      setTimeout(() => navigate('/Wedding-Invitation/Admin/dashboard'), 1500);
    } else {
      setNotification({ type: 'error', message: result.message || 'Error al guardar el evento' });
      toast.error(result.message || 'Error al guardar');
    }
  };

  const steps = ['Tipo de Evento', 'Contacto', 'Detalles Boda', 'Componentes'];

  return (
    <AdminLayout>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/Wedding-Invitation/Admin/dashboard')}
          style={{ background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.3)', color: 'var(--color-purple-light)', padding: '0.5rem', borderRadius: 8, cursor: 'pointer', display: 'flex' }}
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', color: 'var(--text-primary)' }}>
            {isEdit ? 'Editar Evento' : 'Crear Nuevo Evento'}
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            {isEdit ? `Editando evento ID: ${id?.slice(0, 8)}...` : 'Complete los pasos para crear la invitación'}
          </p>
        </div>
      </div>

      {/* Stepper */}
      <div style={{ display: 'flex', gap: '0', marginBottom: '2rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {steps.map((step, i) => (
          <button
            key={step}
            onClick={() => setActiveStep(i)}
            style={{
              flex: 1, minWidth: 100, padding: '0.75rem 0.5rem',
              background: activeStep === i ? 'rgba(124,58,237,0.15)' : 'var(--bg-card2)',
              border: '1px solid',
              borderColor: activeStep === i ? 'rgba(124,58,237,0.4)' : 'var(--border-glass)',
              color: activeStep === i ? 'var(--color-purple-light)' : 'var(--text-muted)',
              fontSize: '0.8rem', fontWeight: activeStep === i ? 600 : 400,
              cursor: 'pointer', fontFamily: 'var(--font-body)',
              borderRadius: i === 0 ? '10px 0 0 10px' : i === steps.length - 1 ? '0 10px 10px 0' : '0',
              transition: 'all 0.2s',
            }}
          >
            <span style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              width: 20, height: 20, borderRadius: '50%',
              background: activeStep === i ? 'var(--color-purple)' : 'var(--border-glass)',
              color: 'white', fontSize: '0.7rem', fontWeight: 700, marginRight: '0.4rem',
            }}>
              {i + 1}
            </span>
            {step}
          </button>
        ))}
      </div>

      {/* Notification */}
      {notification && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            background: notification.type === 'success' ? 'rgba(74,222,128,0.1)' : 'rgba(239,68,68,0.1)',
            border: `1px solid ${notification.type === 'success' ? 'rgba(74,222,128,0.3)' : 'rgba(239,68,68,0.3)'}`,
            borderRadius: 10, padding: '1rem 1.25rem', marginBottom: '1.5rem',
            color: notification.type === 'success' ? '#4ade80' : '#f87171',
          }}
        >
          {notification.type === 'success' ? <CheckCircle size={18} /> : <AlertCircle size={18} />}
          {notification.message}
        </motion.div>
      )}

      <form onSubmit={handleSubmit}>
        <motion.div
          key={activeStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.35 }}
        >
          {/* STEP 0: Tipo de Evento */}
          {activeStep === 0 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} color="var(--color-purple-light)" />
                Tipo de Invitación
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                {[
                  { value: 'web', label: 'Invitación Boda Web', emoji: '🌐', desc: 'Página web interactiva completa' },
                  { value: 'video', label: 'Invitación Boda Video', emoji: '🎬', desc: 'Video animado personalizado' },
                  { value: 'card', label: 'Invitación Boda Card', emoji: '💌', desc: 'Tarjeta digital premium' },
                ].map(opt => (
                  <div
                    key={opt.value}
                    onClick={() => setForm(f => ({ ...f, type: opt.value }))}
                    style={{
                      padding: '1.5rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                      border: `2px solid ${form.type === opt.value ? 'var(--color-purple)' : 'var(--border-glass)'}`,
                      background: form.type === opt.value ? 'rgba(124,58,237,0.12)' : 'var(--bg-card2)',
                      transition: 'all 0.2s', textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>{opt.emoji}</div>
                    <div style={{ fontWeight: 600, color: form.type === opt.value ? 'var(--color-purple-light)' : 'var(--text-primary)', marginBottom: '0.4rem', fontSize: '0.9rem' }}>
                      {opt.label}
                    </div>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{opt.desc}</div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '1.5rem' }}>
                <label className="input-label">Estado</label>
                <select
                  value={form.status}
                  onChange={e => setForm(f => ({ ...f, status: e.target.value }))}
                  className="input-field"
                  style={{ width: '100%', maxWidth: 300 }}
                >
                  <option value="draft">Borrador</option>
                  <option value="active">Activo</option>
                  <option value="inactive">Inactivo</option>
                </select>
              </div>
            </div>
          )}

          {/* STEP 1: Contacto */}
          {activeStep === 1 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={18} color="var(--color-purple-light)" />
                Información de Contacto
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                {[
                  { field: 'name', label: 'Nombre Contacto', placeholder: 'Ej: María García', type: 'text' },
                  { field: 'email', label: 'Correo Electrónico', placeholder: 'correo@ejemplo.com', type: 'email' },
                  { field: 'phone', label: 'Celular', placeholder: '+57 300 000 0000', type: 'tel' },
                  { field: 'identification', label: 'Número de Identificación', placeholder: '1234567890', type: 'text' },
                ].map(({ field, label, placeholder, type }) => (
                  <div key={field}>
                    <label className="input-label">{label}</label>
                    <input
                      type={type}
                      className="input-field"
                      placeholder={placeholder}
                      value={form.contact[field]}
                      onChange={e => setField('contact', field, e.target.value)}
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: Detalles Boda */}
          {activeStep === 2 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Heart size={18} color="#f472b6" />
                Detalles de la Boda
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label className="input-label">Nombre de los Novios</label>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Ej: Sebastián & Laura"
                    value={form.wedding.coupleNames}
                    onChange={e => setField('wedding', 'coupleNames', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">Fecha de la Boda</label>
                  <input
                    type="date"
                    className="input-field"
                    value={form.wedding.weddingDate}
                    onChange={e => setField('wedding', 'weddingDate', e.target.value)}
                  />
                </div>
                <div>
                  <label className="input-label">Hora de la Boda</label>
                  <input
                    type="time"
                    className="input-field"
                    value={form.wedding.weddingTime}
                    onChange={e => setField('wedding', 'weddingTime', e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Componentes */}
          {activeStep === 3 && (
            <div className="glass-card" style={{ padding: '2rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <h2 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: '1.1rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <ToggleLeft size={18} color="var(--color-purple-light)" />
                  Componentes de la Invitación
                </h2>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                  {Object.values(form.activeComponents).filter(Boolean).length} de {COMPONENTS_LIST.length} activados
                </span>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '0.75rem' }}>
                {COMPONENTS_LIST.map(({ key, label, emoji, desc }) => {
                  const isActive = form.activeComponents[key];
                  return (
                    <motion.div
                      key={key}
                      whileHover={{ scale: 1.01 }}
                      style={{
                        display: 'flex', alignItems: 'center', gap: '0.875rem',
                        padding: '1rem 1.15rem', borderRadius: 'var(--radius-md)',
                        border: `1px solid ${isActive ? 'rgba(124,58,237,0.4)' : 'var(--border-glass)'}`,
                        background: isActive ? 'rgba(124,58,237,0.08)' : 'var(--bg-card2)',
                        cursor: 'pointer', transition: 'all 0.2s',
                      }}
                      onClick={() => toggleComponent(key)}
                    >
                      <span style={{ fontSize: '1.6rem', flexShrink: 0 }}>{emoji}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontWeight: 600, fontSize: '0.875rem', color: isActive ? 'var(--color-purple-light)' : 'var(--text-primary)', marginBottom: '0.2rem' }}>
                          {label}
                        </div>
                        <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {desc}
                        </div>
                      </div>
                      {/* Toggle */}
                      <div style={{
                        width: 44, height: 24, borderRadius: 12,
                        background: isActive ? 'var(--color-purple)' : 'rgba(80,80,100,0.5)',
                        position: 'relative', transition: 'all 0.3s ease', flexShrink: 0,
                        border: `1px solid ${isActive ? 'var(--color-purple)' : 'var(--border-glass)'}`,
                      }}>
                        <div style={{
                          position: 'absolute', top: 2,
                          left: isActive ? 21 : 2,
                          width: 18, height: 18, borderRadius: '50%',
                          background: isActive ? 'white' : 'var(--text-muted)',
                          transition: 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                          boxShadow: '0 1px 4px rgba(0,0,0,0.3)',
                        }} />
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1.5rem', gap: '1rem' }}>
          <button
            type="button"
            className="btn-secondary"
            onClick={() => activeStep > 0 ? setActiveStep(s => s - 1) : navigate('/Wedding-Invitation/Admin/dashboard')}
            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
          >
            <ArrowLeft size={16} />
            {activeStep === 0 ? 'Cancelar' : 'Anterior'}
          </button>

          {activeStep < steps.length - 1 ? (
            <button
              type="button"
              className="btn-primary"
              onClick={() => setActiveStep(s => s + 1)}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
            >
              Siguiente →
            </button>
          ) : (
            <motion.button
              type="submit"
              className="btn-primary"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              disabled={isLoading}
              style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: isLoading ? 0.7 : 1 }}
            >
              {isLoading ? (
                <>
                  <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite' }} />
                  Guardando...
                </>
              ) : (
                <>
                  <Save size={16} />
                  {isEdit ? 'Guardar Cambios' : 'Crear Evento'}
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </AdminLayout>
  );
};

export default EventForm;
