import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { APP_CONFIG } from "../constants";

export default function RSVP() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ message: "", attendance: "si" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);      
    
    const webhookUrl = APP_CONFIG.webhookUrl;
    
    if (webhookUrl) {
      try {
        const payload = {
          nombre: APP_CONFIG.paramsGeneral.guestName,
          mensaje: formData.message,
          numeroInvitados: APP_CONFIG.paramsGeneral.numberGuests,
          asistencia: formData.attendance,
          fechaConfirmacion: new Date().toISOString()
        };

        await fetch(webhookUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        });
      } catch (error) {
        console.error("Error al enviar datos al webhook:", error);
      }
    } else {
      console.warn("Webhook URL no está definida. Simulando envío.");
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setIsFormVisible(false);
    setFormData({ message: "", attendance: "si" });
  };

  return (
    <section className="w-full md:w-[95%] max-w-7xl mx-auto my-4 md:my-12 md:rounded-3xl relative overflow-hidden py-24 px-6">
      <div className="max-w-xl mx-auto text-center">
        <AnimatePresence mode="wait">
          {!isSubmitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
             
              {!isFormVisible ? (
                <button
                  onClick={() => setIsFormVisible(true)}
                  className="px-10 py-4 rounded-full text-lg   hover:scale-105 transition-transform shadow-xl"
                  style={{ backgroundColor: APP_CONFIG.rsvp.buttonColor, color:APP_CONFIG.rsvp.buttonTextColor, fontFamily: APP_CONFIG.rsvp.buttonTextFont}}
                >
                  {APP_CONFIG.rsvp.buttonText}
                </button>
              ) : (
                <motion.form
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-6 text-left"
                >
                  <div>
                    <h2 className="text-3xl text-center mb-12"
                    style={{ fontFamily: APP_CONFIG.rsvp.title2TextFont, color:APP_CONFIG.rsvp.title2TextColor}}> {APP_CONFIG.rsvp.title2TextMsg} </h2>
                    
                    <label className="block text-sm uppercase tracking-widest mb-4"
                     style={{ fontFamily: APP_CONFIG.rsvp.title3TextFont, color:APP_CONFIG.rsvp.title3TextColor}}>
                     
                      {APP_CONFIG.rsvp.title3TextMsg}
                    </label>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attendance: "si" })}
                        className="py-3 px-4 rounded-xl border-2 transition-all font-medium"
                        style={
                          formData.attendance === "si"
                            ? APP_CONFIG.rsvp.buttonYes1Style
                            : APP_CONFIG.rsvp.buttonYes2Style
                        }
                      >
                      {APP_CONFIG.rsvp.buttonYesMsg}
                    </button>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, attendance: "no" })}
                        className="py-3 px-4 rounded-xl border-2 transition-all font-medium"
                          style={
                          formData.attendance === "si"
                            ? APP_CONFIG.rsvp.buttonNot1Style
                            : APP_CONFIG.rsvp.buttonNot2Style
                        }
                      >
                         {APP_CONFIG.rsvp.buttonNotMsg}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm uppercase tracking-widest mb-2"
                    style={{ fontFamily: APP_CONFIG.rsvp.msgTextFont, color:APP_CONFIG.rsvp.msgTextColor}}>
                     {APP_CONFIG.rsvp.msgTextMsg}
                    </label>
                    <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 rounded-xl border-2 outline-none resize-none transition-all duration-300 shadow-sm focus:shadow-md"
                    style={{
                      backgroundColor: APP_CONFIG.rsvp.textareaStyle.backgroundColor,
                      color: APP_CONFIG.rsvp.textareaStyle.colorText,
                      borderColor: APP_CONFIG.rsvp.textareaStyle.borderColor,
                      fontFamily: APP_CONFIG.rsvp.textareaStyle.fontFamily
                    }}
                  />
                  </div>
                  <div className="flex justify-center">
  <button
    type="submit"
    disabled={isSubmitting}
    className="py-3 px-6 rounded-xl border-2 font-medium transition-all duration-300 shadow-md"
    style={{
      backgroundColor: APP_CONFIG.rsvp.buttonSendStyle.backgroundColor,
      color: APP_CONFIG.rsvp.buttonSendStyle.color,
      borderColor: APP_CONFIG.rsvp.buttonSendStyle.borderColor,
      fontFamily: APP_CONFIG.rsvp.buttonSendStyle.fontFamily,
      cursor: isSubmitting ? 'not-allowed' : 'pointer',
      opacity: isSubmitting ? 0.6 : 1
    }}
  >
    {APP_CONFIG.rsvp.buttonSendMsg}
  </button>
</div>
                </motion.form>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-stone-50 p-10 rounded-3xl relative"
            >
              <button 
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              <CheckCircle2 className="w-16 h-16  mx-auto mb-6" 
               style={{ color:APP_CONFIG.rsvp.confirmationCircleColor }}/>
              
              <h3 className="text-2xl mb-4"
               style={{ color:APP_CONFIG.rsvp.confirmationTitleTextColor, fontFamily: APP_CONFIG.rsvp.confirmationTitleTextFont}}>{APP_CONFIG.paramsGeneral.guestName}</h3>
             
              <p className="leading-relaxed"
              style={{ color:APP_CONFIG.rsvp.confirmationTextColor, fontFamily:APP_CONFIG.rsvp.confirmationTextFont }}>
              
                {formData.attendance === "si" 
                  ? ` ${APP_CONFIG.rsvp.successMessage}`
                  : ` ${APP_CONFIG.rsvp.rejectedMessage}`}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
