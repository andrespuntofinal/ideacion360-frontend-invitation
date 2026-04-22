import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, X } from "lucide-react";
import { useCardConfig } from "../CardContext";

export default function RSVP() {
    const { config } = useCardConfig();
    const { rsvp, paramsGeneral, webhookUrl } = config;

    const [isFormVisible, setIsFormVisible] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ message: "", attendance: "si" });

    const handleSubmit = async (e) => {
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
                await fetch(webhookUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            } catch (error) {
                console.error("Error al enviar datos al webhook:", error);
            }
        } else {
            await new Promise((r) => setTimeout(r, 1000));
        }
        setIsSubmitting(false);
        setIsSubmitted(true);
    };

    const handleClose = () => { setIsSubmitted(false); setIsFormVisible(false); setFormData({ message: "", attendance: "si" }); };

    return (
        <section className="w-full md:w-[95%] max-w-7xl mx-auto my-4 md:my-12 md:rounded-3xl relative overflow-hidden py-24 px-6">
            <div className="max-w-xl mx-auto text-center">
                <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                        <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            {!isFormVisible ? (
                                <button onClick={() => setIsFormVisible(true)}
                                    className="px-10 py-4 rounded-full text-lg hover:scale-105 transition-transform shadow-xl"
                                    style={{ backgroundColor: rsvp.buttonColor, color: rsvp.buttonTextColor, fontFamily: rsvp.buttonTextFont }}>
                                    {rsvp.buttonText}
                                </button>
                            ) : (
                                <motion.form initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onSubmit={handleSubmit} className="space-y-6 text-left">
                                    <div>
                                        <h2 className="text-3xl text-center mb-12" style={{ fontFamily: rsvp.title2TextFont, color: rsvp.title2TextColor }}>{rsvp.title2TextMsg}</h2>
                                        <label className="block text-sm uppercase tracking-widest mb-4" style={{ fontFamily: rsvp.title3TextFont, color: rsvp.title3TextColor }}>{rsvp.title3TextMsg}</label>
                                        <div className="grid grid-cols-2 gap-4">
                                            <button type="button" onClick={() => setFormData({ ...formData, attendance: "si" })}
                                                className="py-3 px-4 rounded-xl border-2 transition-all font-medium"
                                                style={formData.attendance === "si" ? rsvp.buttonYes1Style : rsvp.buttonYes2Style}>
                                                {rsvp.buttonYesMsg}
                                            </button>
                                            <button type="button" onClick={() => setFormData({ ...formData, attendance: "no" })}
                                                className="py-3 px-4 rounded-xl border-2 transition-all font-medium"
                                                style={formData.attendance === "si" ? rsvp.buttonNot1Style : rsvp.buttonNot2Style}>
                                                {rsvp.buttonNotMsg}
                                            </button>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm uppercase tracking-widest mb-2" style={{ fontFamily: rsvp.msgTextFont, color: rsvp.msgTextColor }}>{rsvp.msgTextMsg}</label>
                                        <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full p-4 rounded-xl border-2 outline-none resize-none transition-all duration-300 shadow-sm focus:shadow-md"
                                            style={{ backgroundColor: rsvp.textareaStyle.backgroundColor, color: rsvp.textareaStyle.colorText, borderColor: rsvp.textareaStyle.borderColor, fontFamily: rsvp.textareaStyle.fontFamily }} />
                                    </div>
                                    <div className="flex justify-center">
                                        <button type="submit" disabled={isSubmitting}
                                            className="py-3 px-6 rounded-xl border-2 font-medium transition-all duration-300 shadow-md"
                                            style={{ backgroundColor: rsvp.buttonSendStyle.backgroundColor, color: rsvp.buttonSendStyle.color, borderColor: rsvp.buttonSendStyle.borderColor, fontFamily: rsvp.buttonSendStyle.fontFamily, cursor: isSubmitting ? 'not-allowed' : 'pointer', opacity: isSubmitting ? 0.6 : 1 }}>
                                            {rsvp.buttonSendMsg}
                                        </button>
                                    </div>
                                </motion.form>
                            )}
                        </motion.div>
                    ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="bg-stone-50 p-10 rounded-3xl relative">
                            <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                            <CheckCircle2 className="w-16 h-16 mx-auto mb-6" style={{ color: rsvp.confirmationCircleColor }} />
                            <h3 className="text-2xl mb-4" style={{ color: rsvp.confirmationTitleTextColor, fontFamily: rsvp.confirmationTitleTextFont }}>{paramsGeneral.guestName}</h3>
                            <p className="leading-relaxed" style={{ color: rsvp.confirmationTextColor, fontFamily: rsvp.confirmationTextFont }}>
                                {formData.attendance === "si" ? rsvp.successMessage : rsvp.rejectedMessage}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
