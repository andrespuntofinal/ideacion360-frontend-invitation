import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';
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
        const payload = { nombre: paramsGeneral.guestName, mensaje: formData.message, numeroInvitados: paramsGeneral.numberGuests, asistencia: formData.attendance, fechaConfirmacion: new Date().toISOString() };
        await fetch(webhookUrl, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      } catch (error) { console.error('Error al enviar datos al webhook:', error); }
    } else { await new Promise((r) => setTimeout(r, 1000)); }
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => { setIsSubmitted(false); setIsFormVisible(false); setFormData({ message: '', attendance: 'si' }); };
  const textareaStyle = rsvp.textareaStyle as Record<string, string>;
  const buttonSendStyle = rsvp.buttonSendStyle as Record<string, string>;

  return (
    <section className="w-full md:w-[95%] max-w-7xl mx-auto my-4 md:my-12 md:rounded-3xl relative overflow-hidden py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {!isFormVisible ? (
                <button onClick={() => setIsFormVisible(true)}
                  className="px-10 py-4 rounded-full text-lg hover:scale-105 transition-transform shadow-xl"
                  style={{ backgroundColor: rsvp.buttonColor as string, color: rsvp.buttonTextColor as string, fontFamily: rsvp.buttonTextFont as string }}>
                  {rsvp.buttonText as string}
                </button>
              ) : (
                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-6 text-left">
                  <div>
                    <h2 className="text-3xl text-center mb-12" style={{ fontFamily: rsvp.title2TextFont as string, color: rsvp.title2TextColor as string }}>{rsvp.title2TextMsg as string}</h2>
                    <label className="block text-sm uppercase tracking-widest mb-4" style={{ fontFamily: rsvp.title3TextFont as string, color: rsvp.title3TextColor as string }}>{rsvp.title3TextMsg as string}</label>
                    <div className="grid grid-cols-2 gap-4">
                      <button type="button" onClick={() => setFormData({ ...formData, attendance: 'si' })}
                        className="py-3 px-4 rounded-xl border-2 transition-all font-medium"
                        style={(formData.attendance === 'si' ? rsvp.buttonYes1Style : rsvp.buttonYes2Style) as React.CSSProperties}>
                        {rsvp.buttonYesMsg as string}
                      </button>
                      <button type="button" onClick={() => setFormData({ ...formData, attendance: 'no' })}
                        className="py-3 px-4 rounded-xl border-2 transition-all font-medium"
                        style={(formData.attendance === 'si' ? rsvp.buttonNot1Style : rsvp.buttonNot2Style) as React.CSSProperties}>
                        {rsvp.buttonNotMsg as string}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm uppercase tracking-widest mb-2" style={{ fontFamily: rsvp.msgTextFont as string, color: rsvp.msgTextColor as string }}>{rsvp.msgTextMsg as string}</label>
                    <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-4 rounded-xl border-2 outline-none resize-none transition-all duration-300 shadow-sm focus:shadow-md"
                      style={{ backgroundColor: textareaStyle.backgroundColor, color: textareaStyle.colorText, borderColor: textareaStyle.borderColor, fontFamily: textareaStyle.fontFamily }} />
                  </div>
                  <div className="flex justify-center">
                    <button type="submit" disabled={isSubmitting}
                      className="py-3 px-6 rounded-xl border-2 font-medium transition-all duration-300 shadow-md"
                      style={{ backgroundColor: buttonSendStyle.backgroundColor, color: buttonSendStyle.color, borderColor: buttonSendStyle.borderColor, fontFamily: buttonSendStyle.fontFamily, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.6 : 1 }}>
                      {rsvp.buttonSendMsg as string}
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          ) : (
            <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-stone-50 p-10 rounded-3xl relative">
              <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><X className="w-6 h-6" /></button>
              <CheckCircle2 className="w-16 h-16 mx-auto mb-6" style={{ color: rsvp.confirmationCircleColor as string }} />
              <h3 className="text-2xl mb-4" style={{ color: rsvp.confirmationTitleTextColor as string, fontFamily: rsvp.confirmationTitleTextFont as string }}>{paramsGeneral.guestName}</h3>
              <p className="leading-relaxed" style={{ color: rsvp.confirmationTextColor as string, fontFamily: rsvp.confirmationTextFont as string }}>
                {formData.attendance === 'si' ? rsvp.successMessage as string : rsvp.rejectedMessage as string}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
