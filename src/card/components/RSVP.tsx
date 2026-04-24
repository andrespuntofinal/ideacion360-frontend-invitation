import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Heart } from 'lucide-react';
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
    <section className="w-full py-24 md:py-32 px-4 flex flex-col items-center">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >

        <Heart className="w-6 h-6 mx-auto mb-4 opacity-50" style={{ color: rsvp.title2TextColor }} />
      </motion.div>

      <div className="w-full max-w-4xl flex flex-col items-center">
        <AnimatePresence mode="wait">
          {!isSubmitted && (
            <motion.div
              key="form-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {!isFormVisible ? (
                <div className="flex justify-center mt-8">
                  <motion.button
                    onClick={() => setIsFormVisible(true)}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-12 py-4 rounded-full text-base md:text-lg font-semibold tracking-wider shadow-xl hover:shadow-2xl transition-all duration-300 border-2"
                    style={{
                      backgroundColor: rsvp.buttonColor,
                      color: rsvp.buttonTextColor,
                      fontFamily: rsvp.buttonTextFont,
                      borderColor: `${rsvp.buttonTextColor}40`,
                    }}
                  >
                    {rsvp.buttonText}
                  </motion.button>
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.15)] backdrop-blur-md border border-white/40"
                  style={{ backgroundColor: `${rsvp.buttonColor}08` }}
                >
                  {/* Floating heart icon on top border */}


                  <div className="p-10 md:p-16 relative z-0">
                    <h2
                      className="text-3xl md:text-4xl text-center mb-1"
                      style={{ fontFamily: rsvp.title2TextFont, color: rsvp.title2TextColor }}
                    >
                      {rsvp.title2TextMsg}
                    </h2>

                    <label
                      className="block text-xs md:text-sm tracking-[0.2em] uppercase text-center mb-3 mt-4"
                      style={{ fontFamily: rsvp.title3TextFont, color: rsvp.title3TextColor, opacity: 0.8 }}
                    >
                      {rsvp.title3TextMsg}
                    </label>

                    {/* Decorative divider */}
                    <div className="flex items-center justify-center gap-3 mb-10">
                      <div className="h-[1px] w-12 bg-[#d4af37]/30"></div>
                      <Heart className="w-3 h-3 text-[#d4af37]/50" />
                      <div className="h-[1px] w-12 bg-[#d4af37]/30"></div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      {/* Attendance toggle */}
                      <div>
                        <div className="flex flex-col sm:flex-row gap-4">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attendance: 'si' })}
                            className="flex-1 py-4 px-6 rounded-lg border font-medium transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-3"
                            style={formData.attendance === 'si'
                              ? { backgroundColor: rsvp.title2TextColor, color: rsvp.buttonTextColor, borderColor: `${rsvp.title2TextColor}30` }
                              : { backgroundColor: 'transparent', color: rsvp.title2TextColor, borderColor: `${rsvp.title2TextColor}30` }
                            }
                          >
                            <CheckCircle2 className="w-4 h-4" />
                            {rsvp.buttonYesMsg}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attendance: 'no' })}
                            className="flex-1 py-4 px-6 rounded-lg border font-medium transition-all duration-300 text-sm tracking-wider uppercase flex items-center justify-center gap-3"
                            style={formData.attendance === 'no'
                              ? { backgroundColor: rsvp.title2TextColor, color: rsvp.buttonTextColor, borderColor: `${rsvp.title2TextColor}30` }
                              : { backgroundColor: 'transparent', color: rsvp.title2TextColor, borderColor: `${rsvp.title2TextColor}30` }
                            }
                          >
                            <X className="w-4 h-4" />
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
                            rows={6}
                            placeholder="Tu mensaje para nosotros..."
                            className="w-full p-5 rounded-none border-0 outline-none resize-none transition-all duration-300 bg-white/50 focus:bg-white"
                            style={{
                              color: rsvp.title2TextColor,
                              fontFamily: textareaStyle.fontFamily,
                              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.02)'
                            }}
                          />
                          <Heart className="absolute bottom-4 right-4 w-4 h-4 text-gray-400 opacity-50" strokeWidth={1} />
                        </div>
                      </div>

                      {/* Submit */}
                      <div className="pt-4">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          className="w-full py-4 px-6 rounded-lg border-0 font-medium tracking-[0.15em] uppercase text-sm transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center gap-3"
                          style={{
                            backgroundColor: '#b89255',
                            color: '#ffffff',
                            fontFamily: buttonSendStyle.fontFamily,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.7 : 1,
                          }}
                        >
                          <span className="opacity-60 text-lg">🌿</span>
                          {isSubmitting ? 'ENVIANDO...' : rsvp.buttonSendMsg}
                          <span className="opacity-60 text-lg">🌿</span>
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
                style={{ color: rsvp.confirmationTitleTextColor }}
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
                  style={{ color: rsvp.confirmationTitleTextColor, fontFamily: rsvp.confirmationTitleTextFont }}
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
    </section>
  );
}
