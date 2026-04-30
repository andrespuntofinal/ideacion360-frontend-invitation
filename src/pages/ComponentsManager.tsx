import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Save, CheckCircle, AlertCircle, ChevronDown, ChevronUp, Copy, Link2, MessageSquare } from 'lucide-react';
import AdminLayout from '../components/admin/AdminLayout';
import useEventsStore from '../stores/eventsStore';
import toast from 'react-hot-toast';

interface FieldProps {
  label: string;
  fieldKey: string;
  value: any;
  onChange: (key: string, val: any) => void;
  type?: string;
  placeholder?: string;
  accept?: string;
  step?: string;
}

const Field = ({ label, fieldKey, value, onChange, type = 'text', placeholder = '', accept = '', step }: FieldProps) => {
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
            if (e.target.files && e.target.files[0]) {
              onChange(fieldKey, e.target.files[0]);
            }
          }} style={{ padding: '0.35rem 0.5rem' }} />
          {value && (
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
              Actual: {value instanceof File ? value.name : (typeof value === 'string' ? value.split('/').pop() : value)}
            </span>
          )}
        </div>
      ) : (
        <input type={type} className="input-field" value={value || ''} onChange={e => onChange(fieldKey, e.target.value)} placeholder={placeholder} />
      )}
    </div>
  );
};

// Component schemas
const componentSchemas: Record<string, any> = {
  banner: {
    label: 'Banner', emoji: '🖼️',
    fields: [
      { key: 'musicUrl', label: 'URL de Música de Fondo', type: 'file', accept: '.mp3' },
      { key: 'videoDesktop', label: 'URL Video Desktop', type: 'file', accept: '.mp4,.webm' },
      { key: 'videoResponsive', label: 'URL Video Responsive', type: 'file', accept: '.mp4,.webm' },
      { key: 'titleFont', label: 'Fuente del Título' },
      { key: 'textColor', label: 'Color del Texto' },
      { key: 'subtitleFont', label: 'Fuente del Subtítulo' },
      { key: 'subtextMsg', label: 'Mensaje Subtexto', type: 'textarea' },
    ],
  },
  calendar: {
    label: 'Calendario', emoji: '📅',
    fields: [
      { key: 'dateImg', label: 'URL Imagen de Fecha', type: 'file', accept: '.jpg,.jpeg,.png' },
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
      { key: 'titleColor', label: 'Color del Título' },
      { key: 'titleFont', label: 'Fuente del Título' },
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
      { key: 'iconColor', label: 'Color Ícono' },
      { key: 'textColor', label: 'Color Texto' },
      { key: 'textFont', label: 'Fuente Texto' },
      { key: 'backgroundColorFrom', label: 'Color Fondo Desde' },
      { key: 'backgroundColorVia', label: 'Color Fondo Via' },
      { key: 'backgroundColorTo', label: 'Color Fondo Hasta' },
      { key: 'boderColor', label: 'Color Borde' },
      { key: 'backgroundColorIconMoments', label: 'Color Fondo Ícono Momentos' },
      { key: 'borderColorIconMoments', label: 'Color Borde Ícono Momentos' },
    ],
  },
  countdown: {
    label: 'Conteo Regresivo', emoji: '⏱️',
    fields: [
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
      { key: 'backgroundColorFrom', label: 'Color Fondo Desde' },
      { key: 'backgroundColorVia', label: 'Color Fondo Via' },
      { key: 'backgroundColorTo', label: 'Color Fondo Hasta' },
      { key: 'boderColor', label: 'Color Borde' },
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
      { key: 'title2Color', label: 'Color Título 2' },
      { key: 'title2Font', label: 'Fuente Título 2' },
      { key: 'text2Color', label: 'Color Texto 2' },
      { key: 'text2Font', label: 'Fuente Texto 2' },
      { key: 'backgroundColorFrom', label: 'Color Fondo Desde' },
      { key: 'backgroundColorVia', label: 'Color Fondo Via' },
      { key: 'backgroundColorTo', label: 'Color Fondo Hasta' },
      { key: 'boderColor', label: 'Color Borde' },
      { key: 'backgroundColorIconMoments', label: 'Color Fondo Ícono Momentos' },
      { key: 'borderColorIconMoments', label: 'Color Borde Ícono Momentos' },
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
      { key: 'backgroundImage', label: 'IMAGEN DE FONDO', type: 'file', accept: '.jpg,.jpeg,.png' },
    ],
  },
  eventDetails: {
    label: 'Detalles del Evento', emoji: '📍',
    fields: [
      { key: 'detailsTitle', label: 'Título Detalles' },
      { key: 'detailsColor', label: 'Color Detalles' },
      { key: 'detailsFont', label: 'Fuente Detalles' },
      { key: 'detailIconColor', label: 'Color Ícono' },
      { key: 'detailItemTitleColor', label: 'Color Título Ítem' },
      { key: 'detailItemTitleFont', label: 'Fuente Título Ítem' },
      { key: 'detailItemText1Color', label: 'Color Texto Ítem' },
      { key: 'detailItemText1Font', label: 'Fuente Texto Ítem' },
      { key: 'detailIcon2Color', label: 'Color Ícono 2' },
      { key: 'detailsMapsTitle', label: 'Título Mapa' },
      { key: 'backgroundColorFrom', label: 'Color Fondo Desde' },
      { key: 'backgroundColorVia', label: 'Color Fondo Via' },
      { key: 'backgroundColorTo', label: 'Color Fondo Hasta' },
      { key: 'boderColor', label: 'Color Borde' },
      { key: 'backgroundColorIconMoments', label: 'Color Fondo Ícono Momentos' },
      { key: 'borderColorIconMoments', label: 'Color Borde Ícono Momentos' },
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
      { key: 'backgroundImage', label: 'Imagen de Fondo', type: 'file', accept: '.jpg,.jpeg,.png' },
      { key: 'backgroundColor', label: 'Color de Fondo' },
    ],
  },
  presents: {
    label: 'Regalos', emoji: '🎁',
    fields: [
      { key: 'presentTitle', label: 'Título', placeholder: 'Lista de Regalos' },
      { key: 'presentMessage', label: 'Mensaje', type: 'textarea', placeholder: 'Si deseas hacernos un regalo...' },
      { key: 'titleColor', label: 'Color Título' },
      { key: 'titleFont', label: 'Fuente Título' },
      { key: 'iconColor', label: 'Color Ícono' },
      { key: 'textColor', label: 'Color Texto' },
      { key: 'textFont', label: 'Fuente Texto' },
      { key: 'backgroundColorFrom', label: 'Color Fondo Desde' },
      { key: 'backgroundColorVia', label: 'Color Fondo Via' },
      { key: 'backgroundColorTo', label: 'Color Fondo Hasta' },
      { key: 'boderColor', label: 'Color Borde' },
      { key: 'backgroundColorIconMoments', label: 'Color Fondo Ícono Momentos' },
      { key: 'borderColorIconMoments', label: 'Color Borde Ícono Momentos' },
    ],
  },
  rsvp: {
    label: 'RSVP', emoji: '✅',
    fields: [
      { key: 'buttonText', label: 'Texto Botón Principal', placeholder: 'Confirmar Asistencia' },
      { key: 'successMessage', label: 'Mensaje de Éxito', type: 'textarea' },
      { key: 'rejectedMessage', label: 'Mensaje de Rechazo', type: 'textarea' },
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

export const GuestManagementForm = ({ data, onChange }: { data: any, onChange: (val: any) => void }) => {
  const { id: eventId } = useParams<{ id: string }>();
  const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
  const [showMessage, setShowMessage] = useState<string | null>(null);

  const totalGuests = data?.totalGuests || 0;
  const guests = data?.guests || [];

  const attendingGuests = guests.filter((g: any) => g.confirmation === 'si').length;
  const notAttendingGuests = guests.filter((g: any) => g.confirmation === 'no').length;
  const pendingGuests = guests.filter((g: any) => g.confirmation !== 'si' && g.confirmation !== 'no').length;

  const setTotal = (n: string) => {
    const num = Math.max(0, parseInt(n) || 0);
    const newGuests = Array.from({ length: num }, (_, i) => {
      const existing = guests[i] || { name: '', companions: 0 };
      return { ...existing };
    });
    onChange({ totalGuests: num, guests: newGuests });
  };

  const setGuest = (i: number, field: string, value: any) => {
    const newGuests = [...guests];
    const val = field === 'companions' ? (parseInt(value) || 0) : value;
    const updatedGuest = { ...newGuests[i], [field]: val };
    
    newGuests[i] = updatedGuest;
    onChange({ ...data, guests: newGuests });
  };

  const copyToClipboard = (text: string) => {
    if (!text || text === 'Generando...') return;
    navigator.clipboard.writeText(text);
    toast.success('Copiado al portapapeles');
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '2rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div style={{ maxWidth: 240 }}>
          <label className="input-label">Cantidad de Invitados</label>
          <input type="number" className="input-field" value={totalGuests} min={0} max={500}
            onChange={e => setTotal(e.target.value)} />
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', background: 'var(--bg-card2)', padding: '1rem', borderRadius: 12, border: '1px solid var(--border-glass)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#4ade80', marginRight: 8, boxShadow: '0 0 5px #4ade80' }}></span>
            Total Invitados que asistirán: <strong>{attendingGuests}</strong>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#fb923c', marginRight: 8, boxShadow: '0 0 5px #fb923c' }}></span>
            Total Invitados que no asistirán: <strong>{notAttendingGuests}</strong>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)' }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, borderRadius: '50%', background: '#9ca3af', marginRight: 8, boxShadow: '0 0 5px #9ca3af' }}></span>
            Total invitados que faltan por confirmar: <strong>{pendingGuests}</strong>
          </div>
        </div>
      </div>

      {guests.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {guests.map((g: any, i: number) => {
            let bgColor = 'var(--bg-card2)';
            let borderColor = 'var(--border-glass)';
            if (g.confirmation === 'si') {
              bgColor = 'rgba(74, 222, 128, 0.08)';
              borderColor = 'rgba(74, 222, 128, 0.3)';
            } else if (g.confirmation === 'no') {
              bgColor = 'rgba(251, 146, 60, 0.08)';
              borderColor = 'rgba(251, 146, 60, 0.3)';
            } else {
              bgColor = 'rgba(156, 163, 175, 0.08)';
              borderColor = 'rgba(156, 163, 175, 0.3)';
            }

            return (
              <div key={i} style={{ background: bgColor, borderRadius: 12, border: `1px solid ${borderColor}`, padding: '1rem', boxShadow: `0 4px 12px ${bgColor}` }}>
                {/* Fila 1: Nombre y Acompañantes */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'end' }}>
                  <div style={{ flex: '1 1 250px' }}>
                    <label className="input-label">Invitado {i + 1}</label>
                    <input type="text" className="input-field" placeholder="Nombre completo" value={g.name || ''}
                      onChange={e => setGuest(i, 'name', e.target.value)} />
                  </div>
                  <div style={{ flex: '1 1 120px' }}>
                    <label className="input-label">Acompañantes</label>
                    <input type="number" className="input-field" min={0} max={20} value={g.companions || 0}
                      onChange={e => setGuest(i, 'companions', e.target.value)} />
                  </div>
                </div>

                {/* Fila 2: Confirmación, Fecha, Mensaje */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '0.75rem', alignItems: 'center' }}>
                  <div style={{ flex: '1 1 150px' }}>
                    <label className="input-label">Confirmación</label>
                    <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--text-primary)', height: '38px', display: 'flex', alignItems: 'center' }}>
                      {g.confirmation === 'si' ? 'Sí asistirá' : g.confirmation === 'no' ? 'No asistirá' : 'Pendiente por confirmar'}
                    </div>
                  </div>
                  <div style={{ flex: '1 1 200px' }}>
                    <label className="input-label">Fecha de confirmación</label>
                    <div style={{ padding: '0.5rem 0.75rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: 8, fontSize: '0.85rem', color: 'var(--text-primary)', height: '38px', display: 'flex', alignItems: 'center' }}>
                      {g.confirmationDate ? new Date(g.confirmationDate).toLocaleString('es-CO', { month: 'long', day: '2-digit', year: 'numeric', hour: 'numeric', minute: '2-digit', hour12: true }) : 'No confirmada'}
                    </div>
                  </div>
                  {g.message && (
                    <div style={{ alignSelf: 'end', flex: '0 0 auto' }}>
                      <label className="input-label" style={{ opacity: 0, marginBottom: 0, display: 'block' }}>Msj</label>
                      <button type="button" onClick={() => setShowMessage(g.message)} className="btn-secondary" style={{ padding: '0.5rem', borderRadius: 8, height: '38px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} title="Ver mensaje">
                        <MessageSquare size={18} />
                      </button>
                    </div>
                  )}
                </div>

                {/* Fila 3: Url Tarjeta */}
                {g.urlCard && (
                  <div>
                    <label className="input-label">Url Tarjeta</label>
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <div style={{ flex: '1 1 200px', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--border-glass)', borderRadius: 8, padding: '0.5rem 0.75rem', fontSize: '0.75rem', color: 'var(--color-purple-light)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <Link2 size={12} style={{ flexShrink: 0 }} />
                        <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{g.urlCard}</span>
                      </div>
                      <button type="button" onClick={() => copyToClipboard(g.urlCard)} className="btn-secondary" style={{ flex: '0 0 auto', padding: '0.5rem', borderRadius: 8, minWidth: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Copy size={14} />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <AnimatePresence>
        {showMessage && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowMessage(null)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)' }} />
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.95 }} style={{ position: 'relative', width: '100%', maxWidth: 400, background: 'var(--bg-card)', borderRadius: 16, border: '1px solid var(--border-glass)', padding: '2rem', boxShadow: '0 20px 40px rgba(0,0,0,0.4)', zIndex: 10 }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '1rem', color: 'var(--color-purple-light)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <MessageSquare size={20} /> Mensaje del Invitado
              </h3>
              <p style={{ color: 'var(--text-primary)', lineHeight: 1.6, marginBottom: '1.5rem', whiteSpace: 'pre-wrap', maxHeight: '300px', overflowY: 'auto' }}>{showMessage}</p>
              <button onClick={() => setShowMessage(null)} className="btn-primary" style={{ width: '100%' }}>Cerrar</button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Component accordion panel
const ComponentPanel = ({ compKey, schema, data, onSave, onUpload, saving }: any) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<any>(data || {});
  const [saved, setSaved] = useState(false);

  useEffect(() => { setFormData(data || {}); }, [data]);

  const handleChange = (field: string, value: any) => setFormData((f: any) => ({ ...f, [field]: value }));

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
          payload.images = payload.images.map((img: any, i: number) =>
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
                  {schema.fields.map((f: any) => (
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
                        const newImages = Array.from({ length: num }, (_, i) => formData.images?.[i] || '');
                        handleChange('images', newImages);
                      }}
                    />
                  </div>

                  {formData.images?.length > 0 && (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                      {formData.images.map((img: any, i: number) => (
                        <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                          <label className="input-label">Imagen {i + 1}</label>
                          <input type="file" accept=".jpg,.jpeg,.png" className="input-field" onChange={e => {
                            if (e.target.files && e.target.files[0]) {
                              const newImages = [...formData.images];
                              newImages[i] = e.target.files[0];
                              handleChange('images', newImages);
                            }
                          }} style={{ padding: '0.35rem 0.5rem' }} />
                          {img && (
                            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              Actual: {img instanceof File ? img.name : (typeof img === 'string' ? img.split('/').pop() : img)}
                            </span>
                          )}
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
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { fetchEventById, updateComponent, uploadComponentFiles, isLoading } = useEventsStore();
  const [event, setEvent] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (id) {
      fetchEventById(id).then((ev: any) => setEvent(ev));
    }
  }, [id]);

  const COMPONENTS_LIST_LOCAL = [
    'banner', 'calendar', 'carousel', 'childRestriction', 'countdown',
    'dressCode', 'envelope', 'eventDetails', 'message', 'presents',
    'rsvp', 'timeline', 'guestManagement',
  ];

  const handleSaveComponent = async (compKey: string, data: any) => {
    if (!id) return { success: false, message: 'ID de evento faltante' };
    setSaving(true);

    if (compKey === 'guestManagement' && data.guests && Array.isArray(data.guests)) {
      const rawInitials = event?.components?.envelope?.initialsCoupleText || 'EVT';
      const initials = rawInitials.replace(/[^A-Za-z]/g, '').toUpperCase().substring(0, 3).padEnd(3, 'X');
      const appUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      
      data.guests = data.guests.map((g: any) => {
        if (!g.token) {
          const randomStr = String(Math.floor(Math.random() * 10000)).padStart(4, '0');
          g.token = `${initials}${randomStr}`;
          g.urlCard = `${appUrl}/wedding/card/${g.token}`;
        }
        return g;
      });
    }

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
          onClick={() => navigate('/wedding/Admin/dashboard')}
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
          <button className="btn-primary" onClick={() => navigate(`/wedding/Admin/events/${id}/edit`)}>
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
                onUpload={async (formDataObj: FormData) => {
                  if (!id) return { success: false, message: 'ID faltante' };
                  setSaving(true);
                  const res = await uploadComponentFiles(id, formDataObj);
                  setSaving(false);
                  return res;
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

export default ComponentsManager;
