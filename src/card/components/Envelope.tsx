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
  const [step, setStep] = useState<'closed' | 'opening' | 'open'>('closed');

  const handleVerDetalles = () => {
    if (step === 'closed') {
      setStep('opening');
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: envelope.confettiColors });
      // After flap animation completes, mark as fully open
      setTimeout(() => setStep('open'), 1200);
    } else if (step === 'opening' || step === 'open') {
      onOpenComplete();
    }
  };

  const isOpening = step === 'opening' || step === 'open';

  const svgDefs = (
    <defs>
      {envelope.textureUrl && (
        <pattern id="envelope-pattern" patternUnits="userSpaceOnUse" width="800" height="600">
          <image href={envelope.textureUrl} x="0" y="0" width="800" height="600" preserveAspectRatio="xMidYMid slice" />
        </pattern>
      )}
      <linearGradient id="envelope-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={envelope.envelopeColor} />
        <stop offset="50%" stopColor={envelope.envelopeColorDeg} />
        <stop offset="100%" stopColor={envelope.envelopeColor} />
      </linearGradient>
      {/* Lighter variant for inside of flap */}
      <linearGradient id="envelope-grad-inner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={envelope.cardBackgroundColor} />
        <stop offset="50%" stopColor={`${envelope.envelopeColorDeg}88`} />
        <stop offset="100%" stopColor={envelope.cardBackgroundColor} />
      </linearGradient>
      <filter id="flap-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="8" stdDeviation="12" floodColor="#000000" floodOpacity="0.3" />
      </filter>
      <filter id="flap-shadow-open" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="-4" stdDeviation="10" floodColor="#000000" floodOpacity="0.2" />
      </filter>
      <filter id="bottom-flap-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="0" dy="-3" stdDeviation="6" floodColor="#000000" floodOpacity="0.2" />
      </filter>
      <filter id="card-shadow" x="-20%" y="-20%" width="140%" height="140%">
        <feDropShadow dx="2" dy="4" stdDeviation="8" floodColor="#000000" floodOpacity="0.25" />
      </filter>
    </defs>
  );

  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 bg-white" />
      <div
        className="fixed inset-0 z-0 opacity-50 pointer-events-none"
        style={{
          backgroundImage: envelope.backgroundImage ? `url(${envelope.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      <div
        className="absolute inset-0 z-0 backdrop-blur-[1px]"
        style={{ backgroundColor: envelope.overlayColor || 'rgba(230, 237, 217, 0.91)' }}
      />

      {/* Message ABOVE Envelope */}
      {!envelope.messageOnEnvelope && (
        <motion.div
          className="relative z-10 flex flex-col items-center text-center mb-8 px-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{
            opacity: isOpening ? 0 : 1,
            y: isOpening ? -20 : 0,
            pointerEvents: isOpening ? 'none' : 'auto'
          }}
          transition={{ duration: 0.8, delay: isOpening ? 0 : 0.3 }}
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
          <div className="flex items-center gap-4 mt-6 opacity-60">
            <div className="h-[1px] w-20" style={{ backgroundColor: envelope.accentColor }} />
            <Heart className="w-5 h-5 fill-current" style={{ color: envelope.accentColor }} />
            <div className="h-[1px] w-20" style={{ backgroundColor: envelope.accentColor }} />
          </div>
        </motion.div>
      )}
      <br />

      {/* Envelope Container */}
      <div
        className="relative w-full max-w-lg z-10"
        style={{
          perspective: '1400px',
          transformStyle: 'preserve-3d',
          aspectRatio: '4/3',
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

          {/* ─── LAYER 1: BACK OF ENVELOPE (inside wall + liner) z-10 ─── */}
          <div className="absolute w-full h-full rounded-2xl shadow-xl overflow-hidden z-10">
            <svg viewBox="0 0 800 600" className="w-full h-full pointer-events-none">
              {svgDefs}
              <rect x="0" y="0" width="800" height="600" fill="url(#envelope-grad)" />
              {envelope.textureUrl && (
                <rect x="0" y="0" width="800" height="600" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />
              )}
              {/* Inner liner */}
              <rect x="15" y="15" width="770" height="570" fill={envelope.cardBackgroundColor} rx="10" opacity="0.9" />
              {envelope.textureUrl && (
                <rect x="15" y="15" width="770" height="570" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply', opacity: 0.9 }} rx="10" />
              )}
              <rect x="15" y="15" width="770" height="570" fill="none" stroke={`${envelope.accentColor}30`} strokeWidth="1.5" rx="10" />
            </svg>
          </div>

          {/* ─── LAYER 2: CARDS INSIDE z-15 (animated out on open) ─── */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Card 1: Guest Info */}
            <motion.div
              className="absolute w-[45%] max-w-[230px] h-[70%] max-h-[280px] shadow-xl rounded-lg p-1 z-10 flex flex-col items-center justify-center text-center border-2 pointer-events-auto"
              initial={{ y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={isOpening ? {
                y: ['10%', '-115%', '-40%'],
                x: [0, '-25%', '-50%'],
                rotate: [0, -6, -12],
                opacity: [0, 1, 1],
                scale: [0.8, 1, 1],
                zIndex: [10, 10, 35]
              } : {
                y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10
              }}
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' }}
              style={{
                backgroundColor: envelope.cardBackgroundColor,
                borderColor: `${envelope.accentColor}4D`,
              }}
            >
              <div
                className="w-full h-full border rounded-md p-2 md:p-4 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ borderColor: `${envelope.accentColor}80` }}
              >
                {envelope.textureUrl && (
                  <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-80"
                    style={{
                      backgroundImage: `url(${envelope.textureUrl})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      mixBlendMode: 'multiply',
                    }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center">
                  <h3
                    className="text-xs md:text-sm mb-1 md:mb-2 tracking-widest"
                    style={{ color: envelope.textColor, fontFamily: envelope.envelopeFont }}
                  >
                    {envelope.cardMessageforguestsText}
                  </h3>
                  <br />
                  <p
                    className="text-base md:text-xl font-bold mb-2 leading-tight"
                    style={{ color: envelope.accentColor, fontFamily: envelope.titleFont }}
                  >
                    {paramsGeneral.guestName}
                  </p>
                  <div className="mt-1 pt-2 border-t w-full" style={{ borderColor: `${envelope.accentColor}4D` }}>
                    <p
                      className="text-xs md:text-sm font-bold"
                      style={{ color: envelope.textDarkColor, fontFamily: envelope.envelopeFont }}
                    >
                      <br />
                      {paramsGeneral.numberGuests} PERSONAS
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Photo */}
            <motion.div
              className="absolute w-[45%] max-w-[230px] h-[70%] max-h-[280px] shadow-2xl p-2 md:p-3 z-10 border-[4px] md:border-[6px] pointer-events-auto"
              initial={{ y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={isOpening ? {
                y: ['10%', '-120%', '-42%'],
                x: [0, '25%', '50%'],
                rotate: [0, 6, 12],
                opacity: [0, 1, 1],
                scale: [0.8, 1, 1],
                zIndex: [10, 10, 34]
              } : {
                y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10
              }}
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
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center text-xs text-gray-400 font-serif italic">
                    Nuestra Foto
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.1)]" />
              </div>
            </motion.div>
          </div>

          {/* ─── LAYER 3: STATIC FRONT BASE (Left, Right, Bottom flaps) z-20 ─── */}
          <div className="absolute w-full h-full pointer-events-none z-20">
            <svg viewBox="0 0 800 600" className="w-full h-full" style={{ overflow: 'visible' }}>
              {svgDefs}
              {/* Left Flap */}
              <g>
                <polygon points="0,0 400,300 0,600" fill="url(#envelope-grad)" />
                {envelope.textureUrl && (
                  <polygon points="0,0 400,300 0,600" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />
                )}
                <polygon points="0,0 400,300 0,600" fill="none" stroke={`${envelope.accentColor}30`} strokeWidth="1" />
              </g>
              {/* Right Flap */}
              <g>
                <polygon points="800,0 400,300 800,600" fill="url(#envelope-grad)" />
                {envelope.textureUrl && (
                  <polygon points="800,0 400,300 800,600" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />
                )}
                <polygon points="800,0 400,300 800,600" fill="none" stroke={`${envelope.accentColor}30`} strokeWidth="1" />
              </g>
              {/* Bottom Flap */}
              <g filter="url(#bottom-flap-shadow)">
                <polygon points="0,600 800,600 400,270" fill="url(#envelope-grad)" />
                {envelope.textureUrl && (
                  <polygon points="0,600 800,600 400,270" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />
                )}
                <polygon points="0,600 800,600 400,270" fill="none" stroke={`${envelope.accentColor}50`} strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* ─── LAYER 4: ANIMATED TOP FLAP with 3D flip ─── */}
          {/*
            KEY FIX: The wrapper div is ONLY the top 60% of the envelope height.
            This means transformOrigin 'top center' = the physical top edge of the envelope.
            The SVG inside uses viewBox 0 0 800 600 but the triangle only draws in the top portion,
            so overflow:visible lets it render without clipping while the pivot is correct.

            When closed  → rotateX(0)   → triangle points downward, sits on top of envelope
            When opening → rotateX(-180) → flap folds backward, inner face shown, sits behind body
          */}
          <motion.div
            className="absolute w-full pointer-events-none"
            style={{
              top: 0,
              height: '60%',
              // Bisagra en el BORDE SUPERIOR del sobre (donde la tapa está unida)
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
            }}
            animate={{
              rotateX: isOpening ? -180 : 0,
              zIndex: isOpening ? 12 : 30,
            }}
            transition={{
              rotateX: { duration: 0.9, ease: [0.4, 0, 0.2, 1] },
              zIndex: { duration: 0.01, delay: isOpening ? 0.45 : 0 },
            }}
          >
            {/* OUTSIDE face — base en la parte SUPERIOR (y=0), punta hacia ABAJO (y=360)
                Cerrado: se ve con punta hacia abajo ✓
                Al rotar -180° hacia atrás: la cara interior queda visible con punta hacia arriba ✓ */}
            <div
              className="absolute inset-0"
              style={{
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <svg viewBox="0 0 800 360" className="w-full h-full" style={{ overflow: 'visible', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.30))' }}>
                {svgDefs}
                {/* Base arriba (0,0)-(800,0), punta abajo (400,360) */}
                <polygon points="0,0 800,0 400,360" fill="url(#envelope-grad)" />
                {envelope.textureUrl && (
                  <polygon points="0,0 800,0 400,360" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />
                )}
                <polygon points="0,0 800,0 400,360" fill="none" stroke={envelope.accentColor} strokeWidth="2" opacity="0.6" />
              </svg>
              {envelope.messageOnEnvelope && envelope.envelopeMsg && (
                <div
                  className="absolute inset-0 -translate-y-18 px-16 pb-12 flex flex-col items-center justify-center text-center pointer-events-none"
                  style={{
                    color: envelope.envelopeMsgColor || envelope.textDarkColor,
                    fontFamily: envelope.envelopeFont,
                  }}
                >
                  <p className="text-[15px] sm:text-[20px] md:text-[24px] italic leading-relaxed text-justify max-w-[85%]" style={{ textJustify: 'inter-word', textAlign: 'justify', textAlignLast: 'center' }}>
                    {envelope.envelopeMsg}
                  </p>
                </div>
              )}
            </div>

            {/* INSIDE liner face — pre-rotada 180° en X
                Cuando el padre gira -180°, esta cara queda mirando al usuario.
                El triángulo se ve "espejado" → punta hacia arriba, como tapa abierta ✓ */}
            <div
              className="absolute inset-0"
              style={{
                transform: 'rotateY(180deg)',
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            >
              <svg viewBox="0 0 800 360" className="w-full h-full" style={{ overflow: 'visible', filter: 'drop-shadow(0 -4px 10px rgba(0,0,0,0.18))' }}>
                {svgDefs}
                <polygon points="0,0 800,0 400,360" fill="url(#envelope-grad-inner)" />
                {envelope.textureUrl && (
                  <polygon points="0,0 800,0 400,360" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply', opacity: 0.6 }} />
                )}
                <line x1="0" y1="0" x2="800" y2="0" stroke={envelope.accentColor} strokeWidth="2.5" opacity="0.4" />
                <polygon points="0,0 800,0 400,360" fill="none" stroke={envelope.accentColor} strokeWidth="1.5" opacity="0.35" />
              </svg>
            </div>
          </motion.div>

          {/* ─── LAYER 5: WAX SEAL / ACTION BUTTON z-40 ─── */}
          <motion.button
            onClick={handleVerDetalles}
            className="absolute z-40 flex flex-col items-center justify-center cursor-pointer group"
            initial={{ top: '50%', y: '-10%' }}
            animate={{
              top: isOpening ? '60%' : '50%',
              y: isOpening ? '0%' : '-10%',
              scale: isOpening ? 1.1 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div
              className="w-30 h-30 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110"
              style={{ filter: `drop-shadow(0 0 15px ${envelope.accentColor}CC)` }}
            >
              {envelope.sealImage ? (
                <img
                  src={envelope.sealImage}
                  alt="Sello"
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 object-contain drop-shadow-lg"
                />
              ) : (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-amber-800 rounded-full border-4 border-amber-900 shadow-xl flex items-center justify-center">
                  <span className="text-white text-xs font-bold">SELLO</span>
                </div>
              )}
              <div
                className="relative z-10 flex flex-col items-center justify-center"
                style={{ fontFamily: banner.titleFont, color: banner.textColor }}
              >
                {step === 'closed' ? (
                  <>

                    <span
                      className="text-2xl font-bold leading-none"
                      style={{ fontFamily: banner.titleFont, color: banner.textColor }}
                    >
                      <br />
                      <br />
                      <br />

                      {banner.subtextMsg}
                    </span>
                  </>
                ) : (
                  <>

                    <span
                      className="text-[10px] font-bold leading-tight text-center px-1"
                      style={{ fontFamily: envelope.titleFont }}
                    >
                      <br />
                      <br />
                      <br />

                      VER<br />DETALLES
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
