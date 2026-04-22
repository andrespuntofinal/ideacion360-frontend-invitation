import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, Heart } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function RSVP() {
  const { config } = useCardConfig();
  const { rsvp, paramsGeneral, webhookUrl } = config;

  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ message: '', attendance: 'si' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    if (webhookUrl) {
      try {
        const payload = {
          nombre: paramsGeneral.guestName,
          mensaje: formData.message,
          numeroInvitados: paramsGeneral.numberGuests,
          asistencia: formData.attendance,
          fechaConfirmacion: new Date().toISOString(),
        };
        await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } catch (error) { console.error('Error al enviar datos al webhook:', error); }
    } else {
      await new Promise((r) => setTimeout(r, 1000));
    }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => { setIsSubmitted(false); setIsFormVisible(false); setFormData({ message: '', attendance: 'si' }); };
  const textareaStyle = rsvp.textareaStyle as Record<string, string>;
  const buttonSendStyle = rsvp.buttonSendStyle as Record<string, string>;

  return (
    <section className="w-full py-20 md:py-32 px-4">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12"
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: rsvp.title2TextColor, opacity: 0.6 }}>
          ✦ &nbsp; Confirmación &nbsp; ✦
        </p>
        <Heart className="w-6 h-6 mx-auto mb-4 opacity-50" style={{ color: rsvp.title2TextColor }} />
      </motion.div>

      <div className="max-w-lg mx-auto">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form-area"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {!isFormVisible ? (
                <div className="flex justify-center">
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
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl"
                  style={{ backgroundColor: `${rsvp.buttonColor}15`, border: `1px solid ${rsvp.title2TextColor}30` }}
                >
                  <div className="p-6 md:p-10">
                    <h2
                      className="text-2xl md:text-3xl text-center mb-2"
                      style={{ fontFamily: rsvp.title2TextFont, color: rsvp.title2TextColor }}
                    >
                      {rsvp.title2TextMsg}
                    </h2>
                    <div className="h-px w-16 mx-auto mb-8" style={{ backgroundColor: rsvp.title2TextColor, opacity: 0.3 }} />

                    <form onSubmit={handleSubmit} className="space-y-6">
                      {/* Attendance toggle */}
                      <div>
                        <label
                          className="block text-xs tracking-[0.25em] uppercase mb-4 text-center"
                          style={{ fontFamily: rsvp.title3TextFont, color: rsvp.title3TextColor }}
                        >
                          {rsvp.title3TextMsg}
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attendance: 'si' })}
                            className="py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 text-sm"
                            style={(formData.attendance === 'si' ? rsvp.buttonYes1Style : rsvp.buttonYes2Style) as React.CSSProperties}
                          >
                            {rsvp.buttonYesMsg}
                          </button>
                          <button
                            type="button"
                            onClick={() => setFormData({ ...formData, attendance: 'no' })}
                            className="py-3 px-4 rounded-xl border-2 font-medium transition-all duration-200 text-sm"
                            style={(formData.attendance === 'si' ? rsvp.buttonNot1Style : rsvp.buttonNot2Style) as React.CSSProperties}
                          >
                            {rsvp.buttonNotMsg}
                          </button>
                        </div>
                      </div>

                      {/* Message */}
                      <div>
                        <label
                          className="block text-xs tracking-[0.2em] uppercase mb-2"
                          style={{ fontFamily: rsvp.msgTextFont, color: rsvp.msgTextColor }}
                        >
                          {rsvp.msgTextMsg}
                        </label>
                        <textarea
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          rows={4}
                          className="w-full p-4 rounded-xl border-2 outline-none resize-none transition-all duration-300 focus:shadow-lg"
                          style={{
                            backgroundColor: textareaStyle.backgroundColor,
                            color: textareaStyle.colorText,
                            borderColor: textareaStyle.borderColor,
                            fontFamily: textareaStyle.fontFamily,
                          }}
                        />
                      </div>

                      {/* Submit */}
                      <div className="flex justify-center pt-2">
                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          whileHover={{ scale: isSubmitting ? 1 : 1.04 }}
                          whileTap={{ scale: 0.97 }}
                          className="py-3 px-8 rounded-xl border-2 font-medium tracking-wider text-sm transition-all duration-300"
                          style={{
                            backgroundColor: buttonSendStyle.backgroundColor,
                            color: buttonSendStyle.color,
                            borderColor: buttonSendStyle.borderColor,
                            fontFamily: buttonSendStyle.fontFamily,
                            cursor: isSubmitting ? 'not-allowed' : 'pointer',
                            opacity: isSubmitting ? 0.6 : 1,
                          }}
                        >
                          {isSubmitting ? '...' : rsvp.buttonSendMsg}
                        </motion.button>
                      </div>
                    </form>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl text-center px-8 py-12"
              style={{ backgroundColor: `${rsvp.buttonColor}15`, border: `1px solid ${rsvp.title2TextColor}30` }}
            >
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center transition-colors opacity-50 hover:opacity-100"
                style={{ color: rsvp.confirmationTitleTextColor, backgroundColor: `${rsvp.confirmationCircleColor}20` }}
              >
                <X className="w-4 h-4" />
              </button>

              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 14 }}
              >
                <CheckCircle2 className="w-16 h-16 mx-auto mb-5" style={{ color: rsvp.confirmationCircleColor }} />
              </motion.div>

              <h3
                className="text-2xl md:text-3xl mb-4 font-medium"
                style={{ color: rsvp.confirmationTitleTextColor, fontFamily: rsvp.confirmationTitleTextFont }}
              >
                {paramsGeneral.guestName}
              </h3>

              <div className="h-px w-16 mx-auto mb-5" style={{ backgroundColor: rsvp.confirmationCircleColor, opacity: 0.4 }} />

              <p
                className="leading-relaxed text-sm md:text-base"
                style={{ color: rsvp.confirmationTextColor, fontFamily: rsvp.confirmationTextFont }}
              >
                {formData.attendance === 'si' ? rsvp.successMessage : rsvp.rejectedMessage}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
