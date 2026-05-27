import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Heart, Smile, Frown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { useCardConfig } from '../CardContext';
import { eventsService } from '../../services/api';

export default function RSVP() {
  const { config } = useCardConfig();
  const { rsvp, paramsGeneral, webhookUrl } = config;

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
        // Use the new backend endpoint for sending emails
        await eventsService.sendRSVP(eventId, payload);
      } else if (webhookUrl) {
        // Fallback to webhook if no id is present but webhook exists
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
  const buttonSendStyle = rsvp.buttonSendStyle as Record<string, string>;

  return (
    <section className="w-full py-12 md:py-20 px-0 md:px-4 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >


      </motion.div>

      <div className="w-full max-w-2xl flex flex-col items-center">
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
                <div className="flex justify-center mt-12 mb-16">
                  <motion.button
                    onClick={() => setIsFormVisible(true)}
                    initial={{ scale: 1 }}
                    animate={{
                      scale: [1, 1.03, 1],
                      boxShadow: [
                        "0 10px 30px rgba(115,83,9,0.3)",
                        "0 15px 45px rgba(115,83,9,0.5)",
                        "0 10px 30px rgba(115,83,9,0.3)"
                      ]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.1,
                      y: -5,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="px-12 md:px-20 py-6 md:py-8 rounded-full text-xl md:text-3xl font-bold tracking-[0.15em] uppercase transition-all duration-500 border-2 border-white/30 relative overflow-hidden group shadow-2xl"
                    style={{
                      background: 'linear-gradient(45deg, #735309 0%, #D7B272 45%, #E8E2D9 50%, #D7B272 55%, #735309 100%)',
                      backgroundSize: '200% 100%',
                      color: '#ffffff',
                      fontFamily: rsvp.buttonTextFont,

                    }}
                  >
                    {/* Inner light sweep effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -skew-x-12"
                      animate={{ x: ['-200%', '200%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                    />

                    <span className="relative z-10 flex items-center justify-center gap-4">
                      <span className="text-2xl md:text-4xl filter drop-shadow-md"></span>
                      {rsvp.buttonText}
                      <span className="text-2xl md:text-4xl filter drop-shadow-md"></span>
                    </span>
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 30 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="w-full rounded-2xl md:rounded-3xl shadow-[0_40px_100px_rgba(0,0,0,0.15)] backdrop-blur-xl border border-white/60 relative overflow-visible"
                  style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,249,250,0.98) 100%)' }}
                >
                  {/* Floating Icon based on selection */}
                  <motion.div
                    key={formData.attendance}
                    initial={{ scale: 0, rotate: -20, x: '-50%' }}
                    animate={{ scale: 1, rotate: 0, x: '-50%' }}
                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="absolute -top-10 left-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl z-20 border-4"
                    style={{
                      background: rsvp.confirmationTitleTextColor,
                      border: `3px solid ${rsvp.confirmationTextColor}`,

                    }}
                  >
                    {formData.attendance === 'si' ? (
                      <Smile className="w-10 h-10" style={{ color: rsvp.confirmationTextColor, opacity: 0.8 }} />
                    ) : (
                      <Frown className="w-10 h-10" style={{ color: rsvp.confirmationTextColor, opacity: 0.8 }} />
                    )}
                  </motion.div>

                  {/* Decorative elements in corners */}
                  <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-[#D7B272]/10 to-transparent pointer-events-none" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-[#D7B272]/10 to-transparent pointer-events-none" />

                  <div className="p-6 md:p-12 pt-14 md:pt-16 relative z-0 flex flex-col items-center">


                    <label
                      className="block text-2xl md:text-2xl tracking-[0.1em] uppercase text-center mb-6 mt-2"
                      style={{ fontFamily: rsvp.title3TextFont, color: rsvp.title3TextColor, fontWeight: '700' }}
                    >
                      <br />
                      <br />
                      {rsvp.title3TextMsg}
                    </label>
                    <br />


                    <form onSubmit={handleSubmit} className="space-y-6 w-full">
                      {/* Attendance toggle */}
                      <div>
                        <div className="flex flex-row gap-4 justify-center">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attendance: 'si' })}
                            className="py-3 px-8 rounded-xl border-2 font-bold transition-all duration-300 text-base tracking-[0.05em] uppercase flex items-center justify-center shadow-sm min-w-[120px]"
                            style={formData.attendance === 'si'
                              ? { background: 'linear-gradient(135deg, #444 0%, #666 100%)', color: '#ffffff', borderColor: '#19284c', transform: 'scale(1.05)' }
                              : { backgroundColor: 'white', color: '#444', borderColor: '#44420' }
                            }
                          >
                            {rsvp.buttonYesMsg}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attendance: 'no' })}
                            className="py-3 px-8 rounded-xl border-2 font-bold transition-all duration-300 text-base tracking-[0.05em] uppercase flex items-center justify-center shadow-sm min-w-[120px]"
                            style={formData.attendance === 'no'
                              ? { background: 'linear-gradient(135deg, #444 0%, #666 100%)', color: '#ffffff', borderColor: '#444', transform: 'scale(1.05)' }
                              : { backgroundColor: 'white', color: '#444', borderColor: '#44420' }
                            }
                          >
                            {rsvp.buttonNotMsg}
                          </button>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <br />
                        <label
                          className="block text-xs tracking-[0.2em] uppercase mb-2"
                          style={{ fontFamily: rsvp.msgTextFont, color: rsvp.msgTextColor }}
                        >
                          {rsvp.msgTextMsg}
                        </label>
                        <div className="relative">
                          <br />
                          <textarea
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            rows={5}
                            placeholder="Escribe tu mensaje para los novios.."
                            className="w-full p-6 rounded-2xl border-2 outline-none resize-none transition-all duration-500 bg-white/40 focus:bg-white focus:border-[#D7B272]/50 focus:shadow-lg"
                            style={{
                              color: '#19284c',
                              fontFamily: textareaStyle.fontFamily,
                              borderColor: '#19284c10'
                            }}
                          />
                          <Heart className="absolute bottom-6 right-6 w-5 h-5 text-[#D7B272] opacity-30" strokeWidth={1.5} />
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-8 flex justify-center">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.05, y: -2 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full md:w-3/4 py-6 rounded-full text-xl md:text-2xl font-bold tracking-[0.15em] uppercase transition-all duration-500 border-2 border-white/30 relative overflow-hidden group shadow-2xl"
                          style={{
                            background: 'linear-gradient(45deg, #735309 0%, #D7B272 45%, #E8E2D9 50%, #D7B272 55%, #735309 100%)',
                            backgroundSize: '200% 100%',
                            color: '#ffffff',
                            fontFamily: rsvp.buttonTextFont,
                            textShadow: '0 2px 10px rgba(0,0,0,0.4)',
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.7 : 1,
                          }}
                        >
                          {/* Inner light sweep effect */}
                          {!isSubmitting && (
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full -skew-x-12"
                              animate={{ x: ['-200%', '200%'] }}
                              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
                            />
                          )}

                          <span className="relative z-10 flex items-center justify-center gap-4">
                            <span className="text-2xl filter drop-shadow-md"></span>
                            {isSubmitting ? 'ENVIANDO...' : rsvp.buttonSendMsg}
                            <span className="text-2xl filter drop-shadow-md"></span>
                          </span>
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isSubmitted && (
          <motion.div
            key="success-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-6"
          >
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={handleClose}
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-lg bg-white rounded-2xl md:rounded-3xl shadow-2xl text-center px-8 py-12 overflow-hidden"
            >
              {/* Decorative background circle */}
              <div
                className="absolute -top-24 -right-24 w-48 h-48 rounded-full opacity-10"
                style={{ backgroundColor: rsvp.confirmationCircleColor }}
              />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                className="absolute top-4 right-4 w-12 h-12 rounded-full flex items-center justify-center transition-all hover:bg-black/5 active:scale-95 z-[60] cursor-pointer"
                style={{ color: rsvp.title3TextColor }}
                aria-label="Cerrar"
              >
                <X className="w-6 h-6" strokeWidth={2.5} />
              </button>

              <motion.div
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 12 }}
                className="relative z-10"
              >
                <div
                  className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: `${rsvp.confirmationCircleColor}15` }}
                >
                  <Heart className="w-10 h-10 fill-current" style={{ color: rsvp.confirmationCircleColor }} />
                </div>
              </motion.div>

              <div className="relative z-10">
                <h3
                  className="text-3xl md:text-3xl mb-2 font-bold"
                  style={{ color: rsvp.title2TextColor, fontFamily: rsvp.confirmationTitleTextFont }}
                >
                  {paramsGeneral.guestName}
                </h3>

                <div
                  className="h-1 w-12 mx-auto mb-6 rounded-full"
                  style={{ backgroundColor: rsvp.confirmationCircleColor, opacity: 0.5 }}
                />

                <p
                  className="text-lg md:text-xl leading-relaxed font-medium px-4"
                  style={{ color: rsvp.confirmationTextColor, fontFamily: rsvp.confirmationTextFont }}
                >
                  {formData.attendance === 'si' ? rsvp.successMessage : rsvp.rejectedMessage}
                </p>


              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <br /><br />
    </section>
  );
}
