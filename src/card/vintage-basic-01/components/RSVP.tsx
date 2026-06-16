import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Heart, Smile, Frown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCardConfig } from '../CardContext';
import { eventsService } from '../../../services/api';
import '../vintage.css';

/* ── Vintage ornament ───────────────────────────────────────────────────── */
const RsvpOrnament = ({ color = '#C9A84C' }: { color?: string }) => (
  <svg width="160" height="20" viewBox="0 0 160 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="10" x2="60" y2="10" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M68 10 Q74 4 80 10 Q74 16 68 10Z" fill={color} fillOpacity="0.35"/>
    <circle cx="80" cy="10" r="2.5" fill={color} fillOpacity="0.55"/>
    <path d="M88 10 Q94 4 100 10 Q94 16 88 10Z" fill={color} fillOpacity="0.35"/>
    <line x1="108" y1="10" x2="160" y2="10" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>
  </svg>
);

export default function RSVP() {
  const { config } = useCardConfig();
  const { rsvp, paramsGeneral, webhookUrl, envelope, message } = config;
  const accentColor = envelope.accentColor || '#C9A84C';
  const darkBrown = '#3D2B1F';
  const cardBg = message.backgroundColor || '#F5EFE0';

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ message: '', attendance: 'si' });

  const { eventId } = useParams<{ eventId: string }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const payload = {
        message: formData.message,
        attendance: formData.attendance,
        guestName: paramsGeneral.guestName,
        companions: paramsGeneral.numberGuests,
      };
      if (eventId) {
        await eventsService.sendRSVP(eventId, payload);
      } else if (webhookUrl) {
        const webhookPayload = {
          nombre: paramsGeneral.guestName,
          mensaje: formData.message,
          numeroInvitados: paramsGeneral.numberGuests,
          asistencia: formData.attendance,
          fechaConfirmacion: new Date().toISOString(),
        };
        await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(webhookPayload) });
      } else {
        await new Promise((r) => setTimeout(r, 1000));
      }
    } catch (error) {
      console.error('Error al enviar la confirmación:', error);
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => { setIsSubmitted(false); setIsFormVisible(false); setFormData({ message: '', attendance: 'si' }); };
  const textareaStyle = rsvp.textareaStyle as Record<string, string>;

  return (
    <section
      className="w-full py-14 md:py-20 px-4 flex flex-col items-center"
      style={{ backgroundColor: cardBg }}
    >
      <div className="w-full max-w-2xl flex flex-col items-center">
        {/* RSVP section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <p
            className="text-[10px] tracking-[0.3em] uppercase mb-1"
            style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
          >
            Asistencia
          </p>
          <h2
            className="text-2xl md:text-3xl italic"
            style={{ color: rsvp.title2TextColor || '#8B6914', fontFamily: rsvp.title2TextFont || 'var(--v-font-display)' }}
          >
            {rsvp.title2TextMsg || 'Confirmar Asistencia'}
          </h2>
          <div className="flex justify-center mt-4">
            <RsvpOrnament color={accentColor} />
          </div>
        </motion.div>

        <AnimatePresence mode="wait">
          {!isSubmitted && (
            <motion.div
              key="form-area"
              className="w-full flex flex-col items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {!isFormVisible ? (
                /* ── Main CTA button ────────────────────────────────── */
                <div className="flex justify-center mt-4 mb-16">
                  <motion.button
                    onClick={() => setIsFormVisible(true)}
                    whileHover={{ scale: 1.04, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    animate={{
                      boxShadow: [
                        `0 4px 24px ${accentColor}40`,
                        `0 8px 32px ${accentColor}65`,
                        `0 4px 24px ${accentColor}40`,
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                    className="relative overflow-hidden px-14 py-5 text-sm tracking-[0.25em] uppercase"
                    style={{
                      backgroundColor: darkBrown,
                      color: accentColor,
                      border: `1px solid ${accentColor}60`,
                      fontFamily: 'var(--v-font-utility)',
                      outline: `1px solid ${accentColor}20`,
                      outlineOffset: '4px',
                    }}
                  >
                    {/* Gold shimmer sweep */}
                    <motion.div
                      className="absolute inset-0 -skew-x-12"
                      style={{ background: `linear-gradient(to right, transparent, ${accentColor}20, transparent)`, width: '100%' }}
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                    />
                    <span className="relative z-10">{rsvp.buttonText}</span>
                  </motion.button>
                </div>
              ) : (
                /* ── RSVP Form ──────────────────────────────────────── */
                <motion.div
                  initial={{ opacity: 0, scale: 0.96, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full relative v-corner-card"
                  style={{
                    backgroundColor: '#FDFAF3',
                    border: `1px solid ${accentColor}35`,
                    boxShadow: `0 8px 40px rgba(61,43,31,0.12)`,
                    padding: '2rem 1.75rem 2.5rem',
                  }}
                >
                  {/* Top accent line */}
                  <div
                    className="absolute top-0 left-8 right-8"
                    style={{ height: '1px', background: `linear-gradient(to right, transparent, ${accentColor}50, transparent)` }}
                  />

                  {/* Form header */}
                  <div className="text-center mb-7">
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <div style={{ height: '1px', width: '24px', backgroundColor: accentColor, opacity: 0.4 }} />
                      {formData.attendance === 'si'
                        ? <Smile className="w-5 h-5" style={{ color: accentColor, opacity: 0.7 }} />
                        : <Frown className="w-5 h-5" style={{ color: accentColor, opacity: 0.7 }} />}
                      <div style={{ height: '1px', width: '24px', backgroundColor: accentColor, opacity: 0.4 }} />
                    </div>
                    <h3
                      className="text-lg tracking-[0.05em]"
                      style={{ fontFamily: rsvp.title3TextFont || 'var(--v-font-display)', color: rsvp.title3TextColor || darkBrown, fontStyle: 'italic' }}
                    >
                      {rsvp.title3TextMsg}
                    </h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Attendance toggle */}
                    <div className="flex flex-row gap-3 justify-center">
                      {[
                        { value: 'si', label: rsvp.buttonYesMsg },
                        { value: 'no', label: rsvp.buttonNotMsg },
                      ].map(({ value, label }) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => setFormData({ ...formData, attendance: value })}
                          className="flex-1 py-3 text-xs tracking-[0.18em] uppercase transition-all duration-300"
                          style={formData.attendance === value ? {
                            backgroundColor: darkBrown,
                            color: accentColor,
                            border: `1px solid ${accentColor}60`,
                            fontFamily: 'var(--v-font-utility)',
                          } : {
                            backgroundColor: 'transparent',
                            color: darkBrown,
                            border: `1px solid ${accentColor}35`,
                            fontFamily: 'var(--v-font-utility)',
                            opacity: 0.65,
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>

                    {/* Message textarea */}
                    <div>
                      <label
                        className="block text-[9px] tracking-[0.25em] uppercase mb-2"
                        style={{ fontFamily: 'var(--v-font-utility)', color: rsvp.msgTextColor || '#6B5B4E', opacity: 0.75 }}
                      >
                        {rsvp.msgTextMsg}
                      </label>
                      <div className="relative">
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          placeholder="Escribe tu mensaje para los novios..."
                          className="w-full p-4 outline-none resize-none transition-all duration-300"
                          style={{
                            color: darkBrown,
                            fontFamily: 'var(--v-font-body)',
                            fontSize: '1rem',
                            backgroundColor: 'rgba(245,239,224,0.6)',
                            border: `1px solid ${accentColor}25`,
                            borderRadius: 0,
                          }}
                        />
                        <Heart
                          className="absolute bottom-4 right-4 w-4 h-4"
                          style={{ color: accentColor, opacity: 0.25 }}
                          strokeWidth={1.5}
                        />
                      </div>
                    </div>

                    {/* Submit button */}
                    <div className="flex justify-center pt-2">
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: isSubmitting ? 1 : 1.03, y: -1 }}
                        whileTap={{ scale: 0.97 }}
                        className="w-full relative overflow-hidden py-4 text-xs tracking-[0.25em] uppercase"
                        style={{
                          backgroundColor: darkBrown,
                          color: accentColor,
                          border: `1px solid ${accentColor}60`,
                          fontFamily: 'var(--v-font-utility)',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          opacity: isSubmitting ? 0.7 : 1,
                        }}
                      >
                        {!isSubmitting && (
                          <motion.div
                            className="absolute inset-0 -skew-x-12"
                            style={{ background: `linear-gradient(to right, transparent, ${accentColor}18, transparent)`, width: '100%' }}
                            animate={{ x: ['-200%', '200%'] }}
                            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                          />
                        )}
                        <span className="relative z-10">
                          {isSubmitting ? 'Enviando...' : rsvp.buttonSendMsg}
                        </span>
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Success modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            key="success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={handleClose}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-md text-center overflow-hidden v-corner-card"
              style={{
                backgroundColor: '#FDFAF3',
                border: `1px solid ${accentColor}40`,
                padding: '3rem 2rem',
                boxShadow: `0 24px 80px rgba(61,43,31,0.2)`,
              }}
            >
              {/* Top accent */}
              <div className="absolute top-0 left-8 right-8" style={{ height: '1px', background: `linear-gradient(to right, transparent, ${accentColor}50, transparent)` }} />

              <button
                onClick={(e) => { e.stopPropagation(); handleClose(); }}
                className="absolute top-4 right-4 flex items-center justify-center transition-opacity hover:opacity-70"
                style={{ width: '32px', height: '32px', color: accentColor, border: `1px solid ${accentColor}35` }}
                aria-label="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
              >
                <div
                  className="w-16 h-16 mx-auto mb-5 flex items-center justify-center"
                  style={{ backgroundColor: `${accentColor}12`, border: `1px solid ${accentColor}40` }}
                >
                  <Heart className="w-8 h-8 fill-current" style={{ color: accentColor }} />
                </div>
              </motion.div>

              <h3
                className="text-2xl mb-2 italic"
                style={{ color: rsvp.title2TextColor || '#8B6914', fontFamily: rsvp.confirmationTitleTextFont || 'var(--v-font-display)' }}
              >
                {paramsGeneral.guestName}
              </h3>

              <div className="flex justify-center mb-4">
                <RsvpOrnament color={accentColor} />
              </div>

              <p
                className="text-base leading-relaxed"
                style={{ color: rsvp.confirmationTextColor || '#3D2B1F', fontFamily: 'var(--v-font-body)', opacity: 0.85 }}
              >
                {formData.attendance === 'si' ? rsvp.successMessage : rsvp.rejectedMessage}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
