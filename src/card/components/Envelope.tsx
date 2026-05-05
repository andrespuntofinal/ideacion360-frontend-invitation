import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Heart } from 'lucide-react';
import { useCardConfig } from '../CardContext';

interface EnvelopeProps {
  onOpenComplete: () => void;
}

export default function Envelope({ onOpenComplete }: EnvelopeProps) {
  const { config } = useCardConfig();
  const { envelope, banner, paramsGeneral } = config;
  const [step, setStep] = useState<'closed' | 'opening'>('closed');

  const handleVerDetalles = () => {
    if (step === 'closed') {
      setStep('opening');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: envelope.confettiColors });
    } else if (step === 'opening') {
      onOpenComplete();
    }
  };

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background Image with Bright White Base */}
      <div className="fixed inset-0 z-0 bg-white" />
      <div
        className="fixed inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: envelope.backgroundImage ? `url(${envelope.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {/* Soft Light overlay to ensure text readability */}
      <div className="absolute inset-0 z-0 backdrop-blur-[1px]" style={{ backgroundColor: envelope.overlayColor || 'rgba(255,255,255,0.4)' }} />

      {/* Message ABOVE Envelope */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center mb-8 px-6"
        initial={{ opacity: 0, y: -30 }}
        animate={{ 
          opacity: step === 'opening' ? 0 : 1, 
          y: step === 'opening' ? -20 : 0,
          pointerEvents: step === 'opening' ? 'none' : 'auto'
        }}
        transition={{ duration: 0.8, delay: step === 'opening' ? 0 : 0.3 }}
      >


        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.9 }}
          className="text-xl md:text-2xl italic leading-relaxed"
          style={{ color: envelope.textDarkColor, fontFamily: envelope.envelopeFont, opacity: 0.9 }}
        >
          {envelope.envelopeMsg}
        </motion.p>

        {/* Decorative Divider */}
        <div className="flex items-center gap-4 mt-6 opacity-60">
          <div className="h-[1px] w-20" style={{ backgroundColor: envelope.accentColor }} />
          <Heart className="w-5 h-5 fill-current" style={{ color: envelope.accentColor }} />
          <div className="h-[1px] w-20" style={{ backgroundColor: envelope.accentColor }} />
        </div>
      </motion.div>
      <br />

      {/* Envelope Container */}
      <div className="relative w-full max-w-lg aspect-[4/3] z-10">
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Back of envelope (inside) with Liner */}
          <div
            className="absolute w-full h-full rounded-2xl shadow-inner overflow-hidden"
            style={{
              backgroundColor: envelope.envelopeColor,
              backgroundImage: envelope.textureUrl ? `url(${envelope.textureUrl})` : 'none',
              backgroundBlendMode: 'multiply',
              opacity: 1
            }}
          >
            {/* Inner Liner to fill the gaps and provide contrast */}
            <div 
              className="absolute inset-1 rounded-xl opacity-80"
              style={{ 
                backgroundColor: envelope.cardBackgroundColor,
                backgroundImage: envelope.textureUrl ? `url(${envelope.textureUrl})` : 'none',
                backgroundBlendMode: 'multiply',
              }}
            />
          </div>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Card 1: Guest Info */}
            <motion.div
              className="absolute w-48 h-64 shadow-xl rounded-lg p-1 z-10 flex flex-col items-center justify-center text-center border-2"
              initial={{ y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={step === 'opening' ? { y: [20, -300, -120], x: [0, -40, -90], rotate: [0, -5, -12], opacity: [0, 1, 1], scale: [0.8, 1, 1], zIndex: [10, 10, 35] } : { y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }}
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' }}
              style={{
                backgroundColor: envelope.cardBackgroundColor,
                borderColor: `${envelope.accentColor}4D`,
                backgroundImage: envelope.textureUrl ? `url(${envelope.textureUrl})` : 'none',
                backgroundBlendMode: 'multiply'
              }}
            >
              <div className="w-full h-full border rounded-md p-4 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ borderColor: `${envelope.accentColor}80` }}>
                {/* Decorative corners */}


                <h3 className="text-xs mb-2 tracking-widest uppercase" style={{ color: envelope.textColor, fontFamily: envelope.envelopeFont }}>{envelope.cardMessageforguestsText}</h3>
                <p className="text-xl font-bold mb-4 leading-tight" style={{ color: envelope.accentColor, fontFamily: envelope.titleFont }}>{paramsGeneral.guestName}</p>
                <div className="mt-2 pt-3 border-t w-full" style={{ borderColor: `${envelope.accentColor}4D` }}>
                  <br />
                  <p className="text-sm font-bold" style={{ color: envelope.textDarkColor, fontFamily: envelope.envelopeFont }}>{paramsGeneral.numberGuests} PERSONAS</p>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Photo */}
            <motion.div
              className="absolute w-44 h-56 shadow-2xl p-4 z-10 border-[6px]"
              initial={{ y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={step === 'opening' ? { y: [20, -320, -140], x: [0, 40, 90], rotate: [0, 5, 15], opacity: [0, 1, 1], scale: [0.8, 1, 1], zIndex: [10, 10, 34] } : { y: 20, x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }}
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' }}
              style={{
                backgroundColor: envelope.photoBackgroundColor,
                borderColor: envelope.photoBackgroundColor,

              }}
            >
              <div className="w-full h-full relative overflow-hidden shadow-inner ring-1 ring-black/10">
                {envelope.cardCouplePhoto ? (
                  <img src={envelope.cardCouplePhoto} alt="Pareja" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-serif italic">Nuestra Foto</div>
                )}
                {/* Frame inner shadow/glow */}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
              </div>
            </motion.div>
          </div>

          {/* Envelope Front */}
          <div
            className="absolute w-full h-full z-20 rounded-2xl overflow-hidden"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${envelope.envelopeColor}, ${envelope.envelopeColorDeg}, ${envelope.envelopeColor})${envelope.textureUrl ? `, url(${envelope.textureUrl})` : ''}`,
              backgroundBlendMode: 'multiply'
            }}
          >
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2 opacity-40"
              style={{ background: `linear-gradient(to top, ${envelope.envelopeColor}, 50%, transparent)`, clipPath: 'polygon(0 100%, 50% 0, 100% 100%)' }}
            />
          </div>

          {/* Top Flap with Rounded Corners at Hinge */}
          <motion.div
            className="absolute top-0 left-0 w-full h-[65%] origin-top z-30"
            style={{
              backgroundImage: `linear-gradient(to bottom right, ${envelope.envelopeColor}, ${envelope.envelopeColorDeg}, ${envelope.envelopeColor})${envelope.textureUrl ? `, url(${envelope.textureUrl})` : ''}`,
              backgroundBlendMode: 'multiply',
              // Use a polygon that simulates rounded corners at the hinge (y=0)
              clipPath: 'polygon(0 10%, 2% 4%, 4% 2%, 10% 0, 90% 0, 96% 2%, 98% 4%, 100% 10%, 50% 100%)'
            }}
            animate={{ rotateX: step === 'opening' ? -180 : 0, zIndex: step === 'opening' ? 5 : 30 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div className="absolute inset-0 bg-black/10" />
            <motion.div
              className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-start pt-8 px-12 text-center pointer-events-none"
              animate={{ opacity: step === 'opening' ? 0 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Hidden message inside (no longer needed here) */}
            </motion.div>
          </motion.div>

          {/* Wax Seal */}
          <motion.button
            onClick={handleVerDetalles}
            className="absolute z-40 flex flex-col items-center justify-center cursor-pointer group"
            initial={{ top: '50%', y: '-10%' }}
            animate={{ top: step === 'opening' ? '60%' : '50%', y: step === 'opening' ? '0%' : '-10%', scale: step === 'opening' ? 1.1 : 1 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div
              className="w-30 h-30 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110"
              style={{ filter: `drop-shadow(0 0 15px ${envelope.accentColor}CC)` }}
            >
              {envelope.sealImage ? (
                <img src={envelope.sealImage} alt="Sello" className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 object-contain drop-shadow-lg" />
              ) : (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-800 rounded-full border-4 border-amber-900 shadow-xl flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SELLO</span>
                </div>
              )}
              <div className="relative z-10 flex flex-col items-center justify-center" style={{ fontFamily: banner.titleFont, color: banner.textColor }}>
                {step === 'closed' ? (
                  <>
                    <span className="text-xs opacity-90 mb-0.5">💍</span>
                    <span className="text-2xl font-bold leading-none" style={{ fontFamily: banner.titleFont, color: banner.textColor }}>{banner.subtextMsg}</span>
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
