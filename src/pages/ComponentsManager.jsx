import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, CheckCircle, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';
import toast from 'react-hot-toast';

const Field = ({ label, fieldKey, value, onChange, type = 'text', placeholder = '', accept = '', step }) => {
  const isColor = /color/i.test(fieldKey) && type !== 'file';
  return (
    <div>
      <label className="input-label" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
        {isColor && (
          <span style={{ width: 10, height: 10, borderRadius: '50%', background: value || '#888', display: 'inline-block', border: '1px solid rgba(255,255,255,0.2)' }} />
        )}
        {label}
      </label>
      {isColor ? (
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input type="color" className="input-color" value={value || '#7C3AED'} onChange={e => onChange(fieldKey, e.target.value)} style={{ width: 56, flexShrink: 0 }} />
          <input type="text" className="input-field" value={value || ''} onChange={e => onChange(fieldKey, e.target.value)} placeholder="#7C3AED" style={{ fontFamily: 'monospace', fontSize: '0.85rem' }} />
        </div>
      ) : type === 'textarea' ? (
        <textarea className="input-field" value={value || ''} onChange={e => onChange(fieldKey, e.target.value)} placeholder={placeholder} rows={3} style={{ resize: 'vertical' }} />
      ) : type === 'number' ? (
        <input type="number" className="input-field" step={step} value={value || ''} onChange={e => onChange(fieldKey, Number(e.target.value))} placeholder={placeholder} />
      ) : type === 'file' ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <input type="file" accept={accept} className="input-field" onChange={e => {
                if(e.target.files && e.target.files[0]) {
                    onChange(fieldKey, e.target.files[0]);
                }
            }} style={{ padding: '0.35rem 0.5rem' }} />
            {value && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Actual: {value instanceof File ? value.name : value}</span>}
        </div>
      ) : (
        <input type={type} className="input-field" value={value || ''} onChange={e => onChange(fieldKey, e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
};

// Component schemas
const componentSchemas = {
  banner: {
    label: 'Banner', emoji: '🖼️',
    fields: [
      { key: 'musicUrl', label: 'URL de Música de Fondo', type: 'file', accept: '.mp3' },
      { key: 'videoDesktop', label: 'URL Video Desktop', type: 'file', accept: '.mp4,.webm' },
      { key: 'videoResponsive', label: 'URL Video Responsive', type: 'file', accept: '.mp4,.webm' },
      { key: 'titleFont', label: 'Fuente del Título' },
      { key: 'titleSize', label: 'Tamaño del Título', placeholder: 'ej: 3rem' },
      { key: 'textColor', label: 'Color del Texto' },
      { key: 'subtitleFont', label: 'Fuente del Subtítulo' },
      { key: 'subtitleSize', label: 'Tamaño del Subtítulo', placeholder: 'ej: 1.5rem' },
      { key: 'subtextMsg', label: 'Mensaje Subtexto', type: 'textarea' },
    ],
  },
  calendar: {
    label: 'Calendario', emoji: '📅',
    fields: [
      { key: 'dateImg', label: 'URL Imagen de Fecha', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'backgroundStyle', label: 'ESTILO FONDO', type: 'text' },
      { key: 'titleTextColor', label: 'Color Título' },
      { key: 'titleTextFont', label: 'Fuente Título' },
      { key: 'titleMsgText', label: 'Texto del Título', type: 'textarea' },
      { key: 'monthColorText', label: 'Color Mes' },
      { key: 'monthFontText', label: 'Fuente Mes' },
      { key: 'dayweekColorText', label: 'Color Día Semana' },
      { key: 'dayweekFontText', label: 'Fuente Día Semana' },
      { key: 'dayColorText1', label: 'Color Día 1' },
      { key: 'dayColorText2', label: 'Color Día 2' },
      { key: 'daySelectedColor', label: 'Color Día Seleccionado' },
    ],
  },
  carousel: {
    label: 'Carrusel', emoji: '🎠',
    fields: [
      { key: 'carouselMsg', label: 'Mensaje del Carrusel' },
      { key: 'autoPlayInterval', label: 'Intervalo Auto-Play (ms)', type: 'number', placeholder: '3000' },
      { key: 'backgroundStyle', label: 'ESTILO FONDO', type: 'text' },
      { key: 'titleColor', label: 'Color del Título' },
      { key: 'titleFont', label: 'Fuente del Título' },
      { key: 'cardStyle', label: 'Estilo de Tarjeta', placeholder: 'ej: rounded, shadow' },
      { key: 'durationTransition', label: 'Duración Transición', type: 'number', step: '0.1', placeholder: '0.8' },
      { key: 'buttonPrevStyle', label: 'Estilo Botón Anterior' },
      { key: 'buttonNextStyle', label: 'Estilo Botón Siguiente' },
      { key: 'backgroundImgZoomStyle', label: 'Estilo Zoom Imagen' },
      { key: 'buttonCloseColor', label: 'Color Botón Cerrar' },
    ],
  },
  childRestriction: {
    label: 'Restricción Asistentes', emoji: '🚫',
    fields: [
      { key: 'childrestrictionTitle', label: 'Título', placeholder: 'Evento solo adultos' },
      { key: 'childrestrictionMessage', label: 'Mensaje', type: 'textarea', placeholder: 'Por favor, este evento es exclusivo para adultos...' },
      { key: 'titleColor', label: 'Color Título' },
      { key: 'titleFont', label: 'Fuente Título' },
      { key: 'cardStyle', label: 'Estilo Card' },
      { key: 'circleStyle', label: 'Estilo Círculo' },
      { key: 'iconColor', label: 'Color Ícono' },
      { key: 'textColor', label: 'Color Texto' },
      { key: 'textFont', label: 'Fuente Texto' },
    ],
  },
  countdown: {
    label: 'Conteo Regresivo', emoji: '⏱️',
    fields: [
      { key: 'backgroundStyle', label: 'ESTILO FONDO', type: 'text' },
      { key: 'titleTextFont', label: 'Fuente Título' },
      { key: 'titleTextColor', label: 'Color Título' },
      { key: 'titleTextMsg', label: 'Mensaje Título', placeholder: 'Faltan para el gran día...' },
      { key: 'boxShadowColor', label: 'Color Sombra Caja' },
      { key: 'borderColor', label: 'Color Borde' },
      { key: 'backgroundColor2', label: 'Color de Fondo 2' },
      { key: 'borderColorCircle', label: 'Color Borde Círculo' },
      { key: 'backgroundColorCircle', label: 'Color Fondo Círculo' },
      { key: 'numberColorText1', label: 'Color Número 1' },
      { key: 'numberColorText2', label: 'Color Número 2' },
      { key: 'numberFontText', label: 'Fuente Número' },
    ],
  },
  dressCode: {
    label: 'Código de Vestimenta', emoji: '👗',
    fields: [
      { key: 'titleFont', label: 'Fuente Título' },
      { key: 'titleColor', label: 'Color Título' },
      { key: 'titletext', label: 'Texto Título', placeholder: 'Código de Vestimenta' },
      { key: 'titleWomen', label: 'Título Mujeres', placeholder: 'Damas' },
      { key: 'titleMen', label: 'Título Hombres', placeholder: 'Caballeros' },
      { key: 'dressCodeTextWomen', label: 'Descripción Mujeres', type: 'textarea' },
      { key: 'dressCodeTextMen', label: 'Descripción Hombres', type: 'textarea' },
      { key: 'dressCodeIconWomen', label: 'URL Ícono Mujeres', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'dressCodeIconMen', label: 'URL Ícono Hombres', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'iconbackgroundColor', label: 'Color Fondo Ícono' },
      { key: 'cardStyle', label: 'Estilo Card' },
      { key: 'circleStyle', label: 'Estilo Círculo' },
      { key: 'title2Color', label: 'Color Título 2' },
      { key: 'title2Font', label: 'Fuente Título 2' },
      { key: 'text2Color', label: 'Color Texto 2' },
      { key: 'text2Font', label: 'Fuente Texto 2' },
    ],
  },
  envelope: {
    label: 'Sobre Tarjeta', emoji: '💌',
    fields: [
      { key: 'sealColor', label: 'Color del Sello' },
      { key: 'envelopeColor', label: 'Color del Sobre' },
      { key: 'envelopeColorDeg', label: 'Grado Gradiente Sobre', placeholder: '135' },
      { key: 'innerColor', label: 'Color Interior' },
      { key: 'cardCouplePhoto', label: 'URL Foto de la Pareja', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'textureUrl', label: 'URL Textura', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'envelopeMsg', label: 'Mensaje del Sobre', type: 'textarea' },
      { key: 'envelopeMsgColor', label: 'Color Mensaje Sobre' },
      { key: 'envelopeFont', label: 'Fuente del Sobre' },
      { key: 'sealImage', label: 'URL Imagen del Sello', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'overlayColor', label: 'Color Overlay' },
      { key: 'cardBackgroundColor', label: 'Color Fondo Tarjeta' },
      { key: 'accentColor', label: 'Color de Acento' },
      { key: 'textColor', label: 'Color de Texto' },
      { key: 'textDarkColor', label: 'Color Texto Oscuro' },
      { key: 'photoBackgroundColor', label: 'Color Fondo Foto' },
      { key: 'titleFont', label: 'Fuente Título' },
      { key: 'initialsCoupleTextColor', label: 'Color Iniciales Pareja' },
      { key: 'initialsCoupleText', label: 'Iniciales Pareja', placeholder: 'S & L' },
      { key: 'cardMessageforguestsText', label: 'Mensaje para Invitados', type: 'textarea' },
    ],
  },
  eventDetails: {
    label: 'Detalles del Evento', emoji: '📍',
    fields: [
      { key: 'detailsTitle', label: 'Título Detalles' },
      { key: 'detailsColor', label: 'Color Detalles' },
      { key: 'detailsFont', label: 'Fuente Detalles' },
      { key: 'cardStyle', label: 'Estilo Card' },
      { key: 'detailIconColor', label: 'Color Ícono' },
      { key: 'detailItemTitleColor', label: 'Color Título Ítem' },
      { key: 'detailItemTitleFont', label: 'Fuente Título Ítem' },
      { key: 'detailItemText1Color', label: 'Color Texto Ítem' },
      { key: 'detailItemText1Font', label: 'Fuente Texto Ítem' },
      { key: 'detailIcon2Color', label: 'Color Ícono 2' },
      { key: 'detailsMapsStyle', label: 'Estilo Mapa' },
      { key: 'detailsMapsTitle', label: 'Título Mapa' },
    ],
  },
  message: {
    label: 'Mensaje Principal', emoji: '✉️',
    fields: [
      { key: 'text1', label: 'Texto 1', type: 'textarea', placeholder: 'Mensaje principal de los novios...' },
      { key: 'text2', label: 'Texto 2', type: 'textarea' },
      { key: 'groomParents', label: 'Padres del Novio', placeholder: 'Sr. y Sra. González' },
      { key: 'brideParents', label: 'Padres de la Novia', placeholder: 'Sr. y Sra. García' },
      { key: 'font', label: 'Fuente del Mensaje' },
      { key: 'colorText1', label: 'Color Texto 1' },
      { key: 'colorParents', label: 'Color Texto Padres' },
      { key: 'textSize', label: 'Tamaño Texto', placeholder: 'ej: 1rem' },
    ],
  },
  presents: {
    label: 'Regalos', emoji: '🎁',
    fields: [
      { key: 'presentTitle', label: 'Título', placeholder: 'Lista de Regalos' },
      { key: 'presentMessage', label: 'Mensaje', type: 'textarea', placeholder: 'Si deseas hacernos un regalo...' },
      { key: 'titleColor', label: 'Color Título' },
      { key: 'titleFont', label: 'Fuente Título' },
      { key: 'cardStyle', label: 'Estilo Card' },
      { key: 'circleStyle', label: 'Estilo Círculo' },
      { key: 'iconColor', label: 'Color Ícono' },
      { key: 'textColor', label: 'Color Texto' },
      { key: 'textFont', label: 'Fuente Texto' },
    ],
  },
  rsvp: {
    label: 'RSVP', emoji: '✅',
    fields: [
      { key: 'buttonText', label: 'Texto Botón Principal', placeholder: 'Confirmar Asistencia' },
      { key: 'successMessage', label: 'Mensaje de Éxito', type: 'textarea' },
      { key: 'rejectedMessage', label: 'Mensaje de Rechazo', type: 'textarea' },
      { key: 'backgroundColor', label: 'Color de Fondo' },
      { key: 'buttonColor', label: 'Color Botón' },
      { key: 'buttonTextColor', label: 'Color Texto Botón' },
      { key: 'buttonTextFont', label: 'Fuente Texto Botón' },
      { key: 'title2TextColor', label: 'Color Título 2' },
      { key: 'title2TextFont', label: 'Fuente Título 2' },
      { key: 'title2TextMsg', label: 'Mensaje Título 2' },
      { key: 'title3TextColor', label: 'Color Título 3' },
      { key: 'title3TextFont', label: 'Fuente Título 3' },
      { key: 'title3TextMsg', label: 'Mensaje Título 3' },
      { key: 'buttonYesMsg', label: 'Texto Botón Sí', placeholder: '¡Sí, asistiré!' },
      { key: 'buttonNotMsg', label: 'Texto Botón No', placeholder: 'No podré asistir' },
      { key: 'msgTextColor', label: 'Color Mensaje' },
      { key: 'msgTextFont', label: 'Fuente Mensaje' },
      { key: 'msgTextMsg', label: 'Texto del Mensaje', type: 'textarea' },
      { key: 'buttonSendMsg', label: 'Texto Botón Enviar', placeholder: 'Enviar Confirmación' },
      { key: 'confirmationTitleTextColor', label: 'Color Título Confirmación' },
      { key: 'confirmationTitleTextFont', label: 'Fuente Título Confirmación' },
      { key: 'confirmationTitleTextMsg', label: 'Mensaje Título Confirmación' },
      { key: 'confirmationCircleColor', label: 'Color Círculo Confirmación' },
      { key: 'confirmationTextFont', label: 'Fuente Texto Confirmación' },
      { key: 'confirmationTextColor', label: 'Color Texto Confirmación' },
    ],
  },
  timeline: {
    label: 'Línea de Tiempo', emoji: '📋',
    fields: [
      { key: 'font', label: 'Fuente' },
      { key: 'textColor', label: 'Color de Texto' },
      { key: 'backgroundColor', label: 'Color de Fondo' },
      { key: 'iconStep1', label: 'Ícono Paso 1', placeholder: '💒' },
      { key: 'textStep1', label: 'Texto Paso 1', placeholder: 'Ceremonia Religiosa' },
      { key: 'timeStep1', label: 'Hora Paso 1', placeholder: '4:00 PM' },
      { key: 'iconStep2', label: 'Ícono Paso 2', placeholder: '🥂' },
      { key: 'textStep2', label: 'Texto Paso 2', placeholder: 'Cóctel de Bienvenida' },
      { key: 'timeStep2', label: 'Hora Paso 2', placeholder: '5:30 PM' },
      { key: 'iconStep3', label: 'Ícono Paso 3', placeholder: '🍽️' },
      { key: 'textStep3', label: 'Texto Paso 3', placeholder: 'Cena de Gala' },
      { key: 'timeStep3', label: 'Hora Paso 3', placeholder: '7:00 PM' },
      { key: 'iconStep4', label: 'Ícono Paso 4', placeholder: '💃' },
      { key: 'textStep4', label: 'Texto Paso 4', placeholder: 'Baile y Celebración' },
      { key: 'timeStep4', label: 'Hora Paso 4', placeholder: '9:00 PM' },
      { key: 'iconStep5', label: 'Ícono Paso 5', placeholder: '🎆' },
      { key: 'textStep5', label: 'Texto Paso 5', placeholder: 'Brindis Final' },
      { key: 'timeStep5', label: 'Hora Paso 5', placeholder: '11:30 PM' },
    ],
  },
  guestManagement: {
    label: 'Gestión de Invitados', emoji: '👥',
    isSpecial: true,
  },
};

const GuestManagementForm = ({ data, onChange }) => {
  const totalGuests = data?.totalGuests || 0;
  const guests = data?.guests || [];

  const setTotal = (n) => {
    const num = Math.max(0, parseInt(n) || 0);
    const newGuests = Array.from({ length: num }, (_, i) => guests[i] || { name: '', companions: 0 });
    onChange({ totalGuests: num, guests: newGuests });
  };

  const setGuest = (i, field, value) => {
    const newGuests = [...guests];
    newGuests[i] = { ...newGuests[i], [field]: field === 'companions' ? parseInt(value) || 0 : value };
    onChange({ ...data, guests: newGuests });
  };

  return (
    <div>
      <div style={{ marginBottom: '1.5rem', maxWidth: 240 }}>
        <label className="input-label">Cantidad de Invitados</label>
        <input type="number" className="input-field" value={totalGuests} min={0} max={500}
          onChange={e => setTotal(e.target.value)} />
      </div>
      {guests.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: 400, overflowY: 'auto' }}>
          {guests.map((g, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0.75rem', padding: '0.875rem', background: 'var(--bg-card2)', borderRadius: 8, border: '1px solid var(--border-glass)', alignItems: 'end' }}>
              <div>
                <label className="input-label">Invitado {i + 1}</label>
                <input type="text" className="input-field" placeholder="Nombre completo" value={g.name}
                  onChange={e => setGuest(i, 'name', e.target.value)} />
              </div>
              <div style={{ width: 100 }}>
                <label className="input-label">Acompañantes</label>
                <input type="number" className="input-field" min={0} max={20} value={g.companions}
                  onChange={e => setGuest(i, 'companions', e.target.value)} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

// Component accordion panel
const ComponentPanel = ({ compKey, schema, data, onSave, onUpload, saving }) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(data || {});
  const [saved, setSaved] = useState(false);

  useEffect(() => { setFormData(data || {}); }, [data]);

  const handleChange = (field, value) => setFormData(f => ({ ...f, [field]: value }));

  const handleSave = async () => {
    let payload = { ...formData };
    let hasFiles = false;
    const formDataObj = new FormData();
    
    for (const [key, value] of Object.entries(payload)) {
      if (value instanceof File) {
        formDataObj.append(key, value);
        hasFiles = true;
      }
    }
    
    if (payload.images && Array.isArray(payload.images)) {
      for (let i = 0; i < payload.images.length; i++) {
        if (payload.images[i] instanceof File) {
          formDataObj.append(`images_${i}`, payload.images[i]);
          hasFiles = true;
        }
      }
    }

    if (hasFiles && onUpload) {
      const uploadRes = await onUpload(formDataObj);
      if (uploadRes.success) {
        const urlsMap = uploadRes.urlsMap;
        for (const [key, value] of Object.entries(payload)) {
          if (value instanceof File) {
             if (urlsMap[key]) {
                 payload[key] = urlsMap[key];
             } else {
                 delete payload[key];
             }
          }
        }
        if (payload.images && Array.isArray(payload.images)) {
          payload.images = payload.images.map((img, i) => 
             (img instanceof File) ? (urlsMap[`images_${i}`] || "") : img
          );
        }
        setFormData(payload);
      } else {
        toast.error(uploadRes.message || 'Error al subir archivos');
        return;
      }
    }

    const result = await onSave(compKey, payload);
    if (result.success) {
      setSaved(true);
      toast.success(`${schema.label} guardado`);
      setTimeout(() => setSaved(false), 3000);
    } else {
      toast.error(result.message || 'Error al guardar');
    }
  };

  return (
    <div style={{
      border: `1px solid ${open ? 'rgba(124,58,237,0.4)' : 'var(--border-glass)'}`,
      borderRadius: 'var(--radius-md)', overflow: 'hidden',
      transition: 'border-color 0.2s',
    }}>
      {/* Header */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', padding: '1rem 1.25rem',
          background: open ? 'rgba(124,58,237,0.1)' : 'var(--bg-card2)',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.75rem',
          transition: 'background 0.2s',
        }}
      >
        <span style={{ fontSize: '1.4rem', flexShrink: 0 }}>{schema.emoji}</span>
        <span style={{ fontWeight: 600, fontSize: '0.9rem', color: open ? 'var(--color-purple-light)' : 'var(--text-primary)', flex: 1, textAlign: 'left' }}>
          {schema.label}
        </span>
        {saved && <CheckCircle size={16} color="#4ade80" />}
        {open ? <ChevronUp size={16} color="var(--text-muted)" /> : <ChevronDown size={16} color="var(--text-muted)" />}
      </button>

      {/* Body */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)' }}>
              {schema.isSpecial ? (
                <GuestManagementForm data={formData} onChange={setFormData} />
              ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.1rem' }}>
                  {schema.fields.map(f => (
                    <Field
                      key={f.key}
                      label={f.label}
                      fieldKey={f.key}
                      value={formData[f.key]}
                      onChange={handleChange}
                      type={f.type}
                      placeholder={f.placeholder}
                      accept={f.accept}
                      step={f.step}
                    />
                  ))}
                </div>
              )}

              {/* Special sub-forms for eventDetails: ceremony & celebration */}
              {compKey === 'eventDetails' && (
                <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                  {['ceremony', 'celebration'].map(section => (
                    <div key={section} style={{ padding: '1.25rem', background: 'var(--bg-card2)', borderRadius: 10, border: '1px solid var(--border-glass)' }}>
                      <h4 style={{ fontFamily: 'var(--font-body)', fontWeight: 600, color: 'var(--color-purple-light)', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                        {section === 'ceremony' ? '💒 Ceremonia' : '🥂 Celebración'}
                      </h4>
                      {['title', 'place', 'time'].map(field => (
                        <div key={field} style={{ marginBottom: '0.75rem' }}>
                          <label className="input-label">{field === 'title' ? 'Título' : field === 'place' ? 'Lugar' : 'Hora'}</label>
                          <input type="text" className="input-field"
                            value={formData[section]?.[field] || ''}
                            onChange={e => handleChange(section, { ...formData[section], [field]: e.target.value })}
                          />
                        </div>
                      ))}
                      <div style={{ marginBottom: '0.75rem' }}>
                        <label className="input-label">URL Google Maps</label>
                        <input type="text" className="input-field"
                          value={formData[`${section}Maps`] || ''}
                          onChange={e => handleChange(`${section}Maps`, e.target.value)}
                          placeholder="https://maps.google.com/..."
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Carrusel images array */}
              {compKey === 'carousel' && (
                <div style={{ marginTop: '1.5rem', background: 'var(--bg-card2)', padding: '1.25rem', borderRadius: 10, border: '1px solid var(--border-glass)' }}>
                  <h4 style={{ color: 'var(--color-purple-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Imágenes del Carrusel</h4>
                  <div style={{ marginBottom: '1rem' }}>
                    <label className="input-label">Número de imágenes</label>
                    <input type="number" min="0" className="input-field" 
                      value={formData.images?.length || 0} 
                      onChange={e => {
                        const num = parseInt(e.target.value) || 0;
                        const newImages = Array.from({length: num}, (_, i) => formData.images?.[i] || '');
                        handleChange('images', newImages);
                      }}
                    />
                  </div>
                  
                  {formData.images?.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      {formData.images.map((img, i) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label className="input-label">Imagen {i + 1}</label>
                          <input type="file" accept=".jpg,.jpeg,.png" className="input-field" onChange={e => {
                            if(e.target.files && e.target.files[0]) {
                              const newImages = [...formData.images];
                              newImages[i] = e.target.files[0];
                              handleChange('images', newImages);
                            }
                          }} style={{ padding: '0.35rem 0.5rem' }} />
                          {img && <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Actual: {img instanceof File ? img.name : img}</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Envelope confettiColors */}
              {compKey === 'envelope' && (
                <div style={{ marginTop: '1.5rem', background: 'var(--bg-card2)', padding: '1.25rem', borderRadius: 10, border: '1px solid var(--border-glass)' }}>
                  <h4 style={{ color: 'var(--color-purple-light)', marginBottom: '1rem', fontSize: '0.9rem' }}>Colores del Confeti</h4>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
                    {[0, 1, 2].map(i => (
                      <div key={i}>
                        <label className="input-label">Color {i + 1}</label>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                          <input type="color" className="input-color" 
                            value={formData.confettiColors?.[i] || '#ffffff'} 
                            onChange={e => {
                              const newColors = [...(formData.confettiColors || ['#ffffff', '#ffffff', '#ffffff'])];
                              newColors[i] = e.target.value;
                              handleChange('confettiColors', newColors);
                            }} 
                            style={{ width: 40, flexShrink: 0 }} 
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                  style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                >
                  {saving ? (
                    <div style={{ width: 14, height: 14, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin-slow 0.7s linear infinite' }} />
                  ) : saved ? (
                    <CheckCircle size={16} />
                  ) : (
                    <Save size={16} />
                  )}
                  {saved ? '¡Guardado!' : 'Guardar Componente'}
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Main page
const ComponentsManager = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fetchEventById, updateComponent, uploadComponentFiles, isLoading } = useEventsStore();
  const [event, setEvent] = useState(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchEventById(id).then(ev => setEvent(ev));
  }, [id]);

  const activeKeys = event
    ? COMPONENTS_LIST.filter(c => event.activeComponents?.[c.key])
    : [];

  const COMPONENTS_LIST_LOCAL = [
    'banner', 'calendar', 'carousel', 'childRestriction', 'countdown',
    'dressCode', 'envelope', 'eventDetails', 'message', 'presents',
    'rsvp', 'timeline', 'guestManagement',
  ];

  const handleSaveComponent = async (compKey, data) => {
    setSaving(true);
    const result = await updateComponent(id, compKey, data);
    setSaving(false);
    return result;
  };

  const activeComponents = event
    ? COMPONENTS_LIST_LOCAL.filter(k => event.activeComponents?.[k])
    : [];

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
            Gestionar Componentes
          </h1>
          {event && (
            <p style={{ color: 'var(--text-muted)', fontSize: '0.82rem' }}>
              {event.wedding?.coupleNames || 'Evento'} · {activeComponents.length} componentes activos
            </p>
          )}
        </div>
      </div>

      {isLoading && !event ? (
        <div style={{ padding: '4rem', textAlign: 'center' }}>
          <div style={{ width: 36, height: 36, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite', margin: '0 auto 1rem' }} />
          <p style={{ color: 'var(--text-muted)' }}>Cargando componentes...</p>
        </div>
      ) : activeComponents.length === 0 ? (
        <div className="glass-card" style={{ padding: '3rem', textAlign: 'center' }}>
          <AlertCircle size={48} color="var(--text-muted)" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h3 style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>Sin componentes activados</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1.5rem' }}>
            Al crear el evento no se activaron componentes. Edita el evento para activarlos.
          </p>
          <button className="btn-primary" onClick={() => navigate(`/Wedding-Invitation/Admin/events/${id}/edit`)}>
            Editar Evento
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {activeComponents.map(compKey => (
            <motion.div
              key={compKey}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ComponentPanel
                compKey={compKey}
                schema={componentSchemas[compKey]}
                data={event?.components?.[compKey]}
                onSave={handleSaveComponent}
                onUpload={async (formDataObj) => {
                  setSaving(true);
                  return await uploadComponentFiles(id, formDataObj);
                }}
                saving={saving}
              />
            </motion.div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
};

const COMPONENTS_LIST = [
  { key: 'banner' }, { key: 'calendar' }, { key: 'carousel' }, { key: 'childRestriction' },
  { key: 'countdown' }, { key: 'dressCode' }, { key: 'envelope' }, { key: 'eventDetails' },
  { key: 'message' }, { key: 'presents' }, { key: 'rsvp' }, { key: 'timeline' },
  { key: 'guestManagement' },
];

export default ComponentsManager;
