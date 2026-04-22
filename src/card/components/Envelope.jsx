import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useCardConfig } from "../CardContext";

export default function Envelope({ onOpenComplete }) {
    const { config } = useCardConfig();
    const { envelope, paramsGeneral } = config;
    const [step, setStep] = useState("closed");

    const handleVerDetalles = () => {
        if (step === "closed") {
            setStep("opening");
            confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: envelope.confettiColors });
        } else if (step === "opening") {
            onOpenComplete();
        }
    };

    return (
        <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
            <div className="fixed inset-0 z-0 opacity-70 pointer-events-none"
                style={{ backgroundImage: `url(${envelope.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div className="absolute inset-0 z-0 backdrop-blur-[2px]" style={{ backgroundColor: envelope.overlayColor }} />

            <motion.div className="relative z-10 mb-12 text-center px-4 max-w-2xl"
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.5 }} />

            <div className="relative w-full max-w-lg aspect-[4/3] z-10 mt-10 md:mt-20">
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="absolute w-[90%] h-[90%] rounded-md shadow-inner"
                        style={{ backgroundColor: envelope.cardBackgroundColor, backgroundImage: `url(${envelope.textureUrl})`, backgroundBlendMode: 'multiply', opacity: 0.9 }} />

                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        {/* Card 1: Guest Info */}
                        <motion.div className="absolute w-48 h-64 shadow-xl rounded-lg p-1 z-10 flex flex-col items-center justify-center text-center border-2"
                            initial={{ y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                            animate={step === "opening" ? { y: [20, -300, -120], x: [0, -40, -90], rotate: [0, -5, -12], opacity: [0, 1, 1], scale: [0.8, 1, 1], zIndex: [10, 10, 35] } : { y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }}
                            transition={{ duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
                            style={{ backgroundColor: envelope.cardBackgroundColor, borderColor: `${envelope.accentColor}4D`, backgroundImage: `url(${envelope.textureUrl})`, backgroundBlendMode: 'multiply' }}>
                            <div className="w-full h-full border rounded-md p-4 flex flex-col items-center justify-center relative overflow-hidden"
                                style={{ borderColor: `${envelope.accentColor}80` }}>
                                <div className="absolute top-1 left-1 w-4 h-4 border-t border-l" style={{ borderColor: envelope.accentColor }} />
                                <div className="absolute top-1 right-1 w-4 h-4 border-t border-r" style={{ borderColor: envelope.accentColor }} />
                                <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l" style={{ borderColor: envelope.accentColor }} />
                                <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r" style={{ borderColor: envelope.accentColor }} />
                                <h3 className="text-xs mb-2 tracking-widest uppercase" style={{ color: envelope.textColor, fontFamily: envelope.envelopeFont }}>{envelope.cardMessageforguestsText}</h3>
                                <p className="text-xl font-bold mb-4 leading-tight" style={{ color: envelope.accentColor, fontFamily: envelope.titleFont }}>{paramsGeneral.guestName}</p>
                                <div className="mt-2 pt-3 border-t w-full" style={{ borderColor: `${envelope.accentColor}4D` }}>
                                    <p className="text-sm font-bold" style={{ color: envelope.textDarkColor, fontFamily: envelope.envelopeFont }}>{paramsGeneral.numberGuests} PERSONAS</p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Card 2: Photo */}
                        <motion.div className="absolute w-44 h-56 shadow-xl p-2 z-10"
                            initial={{ y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
                            animate={step === "opening" ? { y: [20, -320, -140], x: [0, 40, 90], rotate: [0, 5, 15], opacity: [0, 1, 1], scale: [0.8, 1, 1], zIndex: [10, 10, 34] } : { y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }}
                            transition={{ duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
                            style={{ backgroundColor: envelope.photoBackgroundColor }}>
                            <img src={envelope.cardCouplePhoto} alt="Pareja" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </motion.div>
                    </div>

                    {/* Envelope Front */}
                    <div className="absolute w-full h-full z-20 rounded-md overflow-hidden"
                        style={{ backgroundImage: `linear-gradient(to bottom right, ${envelope.envelopeColor}, ${envelope.envelopeColorDeg}, ${envelope.envelopeColor}), url(${envelope.textureUrl})`, backgroundBlendMode: 'multiply' }}>
                        <div className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40"
                            style={{ background: `linear-gradient(to top, ${envelope.envelopeColor}, 50%, transparent)`, clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }} />
                    </div>

                    {/* Top Flap */}
                    <motion.div className="absolute top-0 left-0 w-full h-[65%] origin-top z-30"
                        style={{ backgroundImage: `linear-gradient(to bottom right, ${envelope.envelopeColor}, ${envelope.envelopeColorDeg}, ${envelope.envelopeColor}), url(${envelope.textureUrl})`, backgroundBlendMode: 'multiply', clipPath: 'polygon(0 0, 100% 0, 50% 100%)' }}
                        animate={{ rotateX: step === "opening" ? -180 : 0, zIndex: step === "opening" ? 5 : 30 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}>
                        <div className="absolute inset-0 bg-black/10" />
                        <motion.div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start pt-8 px-12 text-center pointer-events-none"
                            animate={{ opacity: step === "opening" ? 0 : 1 }} transition={{ duration: 0.3 }}>
                            <p className="text-xl md:text-2xl leading-tight" style={{ color: envelope.envelopeMsgColor, fontFamily: envelope.envelopeFont }}>{envelope.envelopeMsg}</p>
                        </motion.div>
                    </motion.div>

                    {/* Wax Seal */}
                    <motion.button onClick={handleVerDetalles}
                        className="absolute z-40 flex flex-col items-center justify-center cursor-pointer group"
                        initial={{ top: "50%", y: "-10%" }}
                        animate={{ top: step === "opening" ? "60%" : "50%", y: step === "opening" ? "0%" : "-10%", scale: step === "opening" ? 1.1 : 1 }}
                        transition={{ duration: 0.8, ease: "easeInOut" }}>
                        <div className="w-30 h-30 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110"
                            style={{ filter: `drop-shadow(0 0 15px ${envelope.accentColor}CC)` }}>
                            <img src={envelope.sealImage} alt="Sello" className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 object-contain drop-shadow-lg" />
                            <div className="relative z-10 flex flex-col items-center justify-center" style={{ color: envelope.initialsCoupleTextColor }}>
                                {step === "closed" ? (
                                    <>
                                        <span className="text-xs opacity-90 mb-0.5">💍</span>
                                        <span className="text-2xl font-bold leading-none" style={{ fontFamily: envelope.titleFont }}>{envelope.initialsCoupleText}</span>
                                    </>
                                ) : (
                                    <>
                                        <span className="text-[10px] opacity-90 mb-0.5">💍</span>
                                        <span className="text-[10px] font-bold leading-tight text-center px-1" style={{ fontFamily: envelope.titleFont }}>VER<br />DETALLES</span>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.button>
                </div>
            </div>
        </div>
    );
}
