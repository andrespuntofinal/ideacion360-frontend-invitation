import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { APP_CONFIG } from "../constants";

interface EnvelopeProps {
  onOpenComplete: () => void;
  key?: string;
}

export default function Envelope({ onOpenComplete }: EnvelopeProps) {
  const [step, setStep] = useState<"closed" | "opening">("closed");

  const handleVerDetalles = () => {
    if (step === "closed") {
      setStep("opening");
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: APP_CONFIG.envelope.confettiColors,
      });
    } else if (step === "opening") {
      onOpenComplete();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage: `url(${APP_CONFIG.envelope.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Light overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 backdrop-blur-[2px]" style={{ backgroundColor: APP_CONFIG.envelope.overlayColor }} />

      {/* Message above envelope */}
      <motion.div 
        className="relative z-10 mb-12 text-center px-4 max-w-2xl"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
      
      </motion.div>

      {/* Envelope Container */}
      <div className="relative w-full max-w-lg aspect-[4/3] z-10 mt-10 md:mt-20">
        
        {/* The Envelope */}
        <div className="absolute inset-0 flex items-center justify-center">
          
          {/* Back of envelope (inside) */}
          <div 
            className="absolute w-[90%] h-[90%] rounded-md shadow-inner"
            style={{ 
              backgroundColor: APP_CONFIG.envelope.cardBackgroundColor,
              backgroundImage: `url(${APP_CONFIG.envelope.textureUrl})`,
              backgroundBlendMode: 'multiply',
              opacity: 0.9
            }}
          />

          {/* Mini Cards (Pop out when opened) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            
            {/* Card 1: Guest Info (Left) */}
            <motion.div
              className="absolute w-48 h-64 shadow-xl rounded-lg p-1 z-10 flex flex-col items-center justify-center text-center border-2"
              initial={{ y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={
                step === "opening"
                  ? {
                      y: [20, -300, -120],
                      x: [0, -40, -90],
                      rotate: [0, -5, -12],
                      opacity: [0, 1, 1],
                      scale: [0.8, 1, 1],
                      zIndex: [10, 10, 35],
                    }
                  : { y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }
              }
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
              style={{
                backgroundColor: APP_CONFIG.envelope.cardBackgroundColor,
                borderColor: `${APP_CONFIG.envelope.accentColor}4D`,
                backgroundImage: `url(${APP_CONFIG.envelope.textureUrl})`,
                backgroundBlendMode: 'multiply'
              }}
            >
              <div 
                className="w-full h-full border rounded-md p-4 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ borderColor: `${APP_CONFIG.envelope.accentColor}80` }}
              >
                {/* Decorative corners */}
                <div className="absolute top-1 left-1 w-4 h-4 border-t border-l" style={{ borderColor: APP_CONFIG.envelope.accentColor }}></div>
                <div className="absolute top-1 right-1 w-4 h-4 border-t border-r" style={{ borderColor: APP_CONFIG.envelope.accentColor }}></div>
                <div className="absolute bottom-1 left-1 w-4 h-4 border-b border-l" style={{ borderColor: APP_CONFIG.envelope.accentColor }}></div>
                <div className="absolute bottom-1 right-1 w-4 h-4 border-b border-r" style={{ borderColor: APP_CONFIG.envelope.accentColor }}></div>
                
                <h3 className="text-xs mb-2 tracking-widest uppercase" style={{ color: APP_CONFIG.envelope.textColor, fontFamily: APP_CONFIG.envelope.envelopeFont }}> {APP_CONFIG.envelope.cardMessageforguestsText} </h3>
                <p className="text-xl font-bold mb-4 leading-tight" style={{ color: APP_CONFIG.envelope.accentColor, fontFamily: APP_CONFIG.envelope.titleFont }}>
                  {APP_CONFIG.paramsGeneral.guestName}
                </p>
                <div className="mt-2 pt-3 border-t w-full" style={{ borderColor: `${APP_CONFIG.envelope.accentColor}4D` }}>
                  <p className="text-sm font-bold" style={{ color: APP_CONFIG.envelope.textDarkColor, fontFamily: APP_CONFIG.envelope.envelopeFont }}>{APP_CONFIG.paramsGeneral.numberGuests} PERSONAS</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Photo (Right) */}
            <motion.div
              className="absolute w-44 h-56 shadow-xl p-2 z-10"
              initial={{ y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={
                step === "opening"
                  ? {
                      y: [20, -320, -140],
                      x: [0, 40, 90],
                      rotate: [0, 5, 15],
                      opacity: [0, 1, 1],
                      scale: [0.8, 1, 1],
                      zIndex: [10, 10, 34],
                    }
                  : { y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }
              }
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: "easeInOut" }}
              style={{
                backgroundColor: APP_CONFIG.envelope.photoBackgroundColor,
                
              }}
            >
              <img 
                src={APP_CONFIG.envelope.cardCouplePhoto} 
                alt="Pareja" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            
           
          </div>

          {/* Envelope Front (Bottom flap) */}
          <div 
            className="absolute w-full h-full z-20 rounded-md overflow-hidden"
            style={{ 
              
              backgroundImage: `
      linear-gradient(
        to bottom right,
        ${APP_CONFIG.envelope.envelopeColor},
        ${APP_CONFIG.envelope.envelopeColorDeg},
        ${APP_CONFIG.envelope.envelopeColor}
      ),
      url(${APP_CONFIG.envelope.textureUrl})
    `,
              backgroundBlendMode: 'multiply',
              
            }}
          >
            {/* Diagonal lines to simulate envelope folds */}
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                background: `linear-gradient(
                to top right,
                ${APP_CONFIG.envelope.envelopeColorDeg},                                  
                linear-gradient(to top left, 
                ${APP_CONFIG.envelope.envelopeColorDeg}, `
              }}
            />
            {/* Bottom triangle shadow */}
            <div 
              className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40"
              style={{
                background: `linear-gradient(to top,
                 ${APP_CONFIG.envelope.envelopeColor}, 50%, 
                 transparent)`,
                clipPath: 'polygon(0 100%, 50% 0, 100% 100%)'
              }}
            />
          </div>

          {/* Top Flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[65%] origin-top z-30"
            style={{ 
             
              backgroundImage: `
      linear-gradient(
        to bottom right,
        ${APP_CONFIG.envelope.envelopeColor},
        ${APP_CONFIG.envelope.envelopeColorDeg},
        ${APP_CONFIG.envelope.envelopeColor}
      ),
      url(${APP_CONFIG.envelope.textureUrl})
    `,
              backgroundBlendMode: 'multiply',
              clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
              
            }}
            animate={{ 
              rotateX: step === "opening" ? -180 : 0,
              zIndex: step === "opening" ? 5 : 30 // Move behind front when open
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {/* Inner flap shadow for realism when open */}
            <div className="absolute inset-0 bg-black/10" />
            
           {/* Envelope Message */}
                       <motion.div 
                         className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start pt-8 px-12 text-center pointer-events-none"
                         animate={{ opacity: step === "opening" ? 0 : 1 }}
                         transition={{ duration: 0.3 }}
                       >
                         <p 
                           className="text-xl md:text-2xl leading-tight"
                           style={{
                             color: APP_CONFIG.envelope.envelopeMsgColor,
                             fontFamily: APP_CONFIG.envelope.envelopeFont,
                           }}
                         >
                           {APP_CONFIG.envelope.envelopeMsg}
                         </p>
                       </motion.div>
                     </motion.div>

          {/* Wax Seal / Button */}
          <motion.button
            onClick={handleVerDetalles}
            className="absolute z-40 flex flex-col items-center justify-center cursor-pointer group"
            initial={{ top: "50%", y: "-10%" }}
            animate={{ 
              top: step === "opening" ? "60%" : "50%",
              y: step === "opening" ? "0%" : "-10%",
              scale: step === "opening" ? 1.1 : 1
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
          >
            {step === "closed" && (
              <motion.span 
                className="text-sm mb-4 tracking-widest opacity-80 group-hover:opacity-100 transition-opacity"
                style={{ color: APP_CONFIG.envelope.accentColor, fontFamily: APP_CONFIG.envelope.envelopeFont }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                exit={{ opacity: 0 }}
              >
               
              </motion.span>
            )}
            
            <div 
              className="w-30 h-30 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110"
              style={{ filter: `drop-shadow(0 0 15px ${APP_CONFIG.envelope.accentColor}CC)` }}
            >
              {/* Seal Image */}
              <img 
                src={APP_CONFIG.envelope.sealImage} 
                alt="Sello" 
                className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 object-contain drop-shadow-lg"
              />
              
              {/* Text over the seal */}
              <div className="relative z-10 flex flex-col items-center justify-center" style={{ color: APP_CONFIG.envelope.initialsCoupleTextColor }}>
                {step === "closed" ? (
                  <>
                    <span className="text-xs opacity-90 mb-0.5">💍</span>
                    <span className="text-2xl font-bold leading-none" style={{ fontFamily: APP_CONFIG.envelope.titleFont}}> {APP_CONFIG.envelope.initialsCoupleText}  </span>
                  </>
                ) : (
                  <>
                    <span className="text-[10px] opacity-90 mb-0.5">💍</span>
                    <span className="text-[10px] font-bold leading-tight text-center px-1" style={{ fontFamily: APP_CONFIG.envelope.titleFont }}>
                      VER<br/>DETALLES
                    </span>
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
