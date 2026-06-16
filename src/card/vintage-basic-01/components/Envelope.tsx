import { useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

interface EnvelopeProps {
  onOpenComplete: () => void;
}

/* ── Inline SVG ornaments ────────────────────────────────────────────────── */
const FloralDivider = ({ color = '#C9A84C' }: { color?: string }) => (
  <svg width="180" height="20" viewBox="0 0 180 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="10" x2="70" y2="10" stroke={color} strokeWidth="0.8" strokeOpacity="0.5"/>
    <circle cx="80" cy="10" r="2" fill={color} fillOpacity="0.6"/>
    <circle cx="90" cy="7" r="3" fill={color} fillOpacity="0.4"/>
    <circle cx="90" cy="13" r="3" fill={color} fillOpacity="0.4"/>
    <circle cx="100" cy="10" r="2" fill={color} fillOpacity="0.6"/>
    <line x1="110" y1="10" x2="180" y2="10" stroke={color} strokeWidth="0.8" strokeOpacity="0.5"/>
  </svg>
);

const CornerOrnament = ({ color = '#C9A84C' }: { color?: string }) => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4,4 Q4,44 44,44" stroke={color} strokeWidth="1" strokeOpacity="0.4" fill="none"/>
    <path d="M4,4 Q24,4 44,4" stroke={color} strokeWidth="1" strokeOpacity="0.4" fill="none"/>
    <circle cx="5" cy="5" r="2" fill={color} fillOpacity="0.5"/>
    <circle cx="44" cy="44" r="2" fill={color} fillOpacity="0.5"/>
    <path d="M12,4 Q12,12 4,12" stroke={color} strokeWidth="0.7" strokeOpacity="0.3" fill="none"/>
  </svg>
);

export default function Envelope({ onOpenComplete }: EnvelopeProps) {
  const { config } = useCardConfig();
  const { envelope: rawEnvelope, banner, paramsGeneral, weddingData } = config;
  const envelope = {
    ...rawEnvelope,
    textureUrl: optimizeCloudinaryUrl(rawEnvelope.textureUrl),
    backgroundImage: optimizeCloudinaryUrl(rawEnvelope.backgroundImage),
    cardCouplePhoto: optimizeCloudinaryUrl(rawEnvelope.cardCouplePhoto),
    sealImage: optimizeCloudinaryUrl(rawEnvelope.sealImage),
  };
  const [step, setStep] = useState<'closed' | 'opening' | 'open'>('closed');

  const handleVerDetalles = () => {
    if (step === 'closed') {
      setStep('opening');
      confetti({
        particleCount: 120,
        spread: 65,
        origin: { y: 0.6 },
        colors: envelope.confettiColors?.length ? envelope.confettiColors : ['#C9A84C', '#F5EFE0', '#8B6914'],
        shapes: ['circle'],
        gravity: 0.9,
      });
      setTimeout(() => setStep('open'), 1200);
    } else if (step === 'opening' || step === 'open') {
      onOpenComplete();
    }
  };

  const isOpening = step === 'opening' || step === 'open';

  // Use vintage palette as fallback colors
  const envelopeColor = envelope.envelopeColor || '#2C1F14';
  const envelopeColorDeg = envelope.envelopeColorDeg || '#4A3728';
  const accentColor = envelope.accentColor || '#C9A84C';
  const cardBg = envelope.cardBackgroundColor || '#F5EFE0';
  const overlayColor = envelope.overlayColor || 'rgba(245, 239, 224, 0.88)';

  const svgDefs = (
    <defs>
      {envelope.textureUrl && (
        <pattern id="envelope-pattern" patternUnits="userSpaceOnUse" width="800" height="600">
          <image href={envelope.textureUrl} x="0" y="0" width="800" height="600" preserveAspectRatio="xMidYMid slice" />
        </pattern>
      )}
      <linearGradient id="envelope-grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={envelopeColor} />
        <stop offset="50%" stopColor={envelopeColorDeg} />
        <stop offset="100%" stopColor={envelopeColor} />
      </linearGradient>
      <linearGradient id="envelope-grad-inner" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor={cardBg} />
        <stop offset="50%" stopColor={`${envelopeColorDeg}88`} />
        <stop offset="100%" stopColor={cardBg} />
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
    </defs>
  );

  // Format wedding date for display
  const wDate = weddingData?.weddingDate ? new Date(weddingData.weddingDate) : null;
  const formattedDate = wDate
    ? wDate.toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
    : '';

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center z-50 overflow-hidden"
      style={{ fontFamily: 'var(--v-font-body)' }}
    >
      {/* ── Parchment background ─────────────────────────────────────── */}
      <div
        className="fixed inset-0 z-0"
        style={{ backgroundColor: '#F0E8D2' }}
      />
      {/* Background photo */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: envelope.backgroundImage ? `url(${envelope.backgroundImage})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.40,
        }}
      />
      {/* Cream overlay */}
      <div
        className="absolute inset-0 z-0"
        style={{ backgroundColor: overlayColor }}
      />
      {/* Noise texture */}
      <div
        className="fixed inset-0 z-0 pointer-events-none opacity-30"
        style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: '300px 300px',
        }}
      />

      {/* ── Corner ornaments on page ──────────────────────────────────── */}
      <div className="fixed top-4 left-4 z-10 opacity-50 pointer-events-none"><CornerOrnament color={accentColor} /></div>
      <div className="fixed top-4 right-4 z-10 opacity-50 pointer-events-none" style={{ transform: 'scaleX(-1)' }}><CornerOrnament color={accentColor} /></div>
      <div className="fixed bottom-4 left-4 z-10 opacity-50 pointer-events-none" style={{ transform: 'scaleY(-1)' }}><CornerOrnament color={accentColor} /></div>
      <div className="fixed bottom-4 right-4 z-10 opacity-50 pointer-events-none" style={{ transform: 'scale(-1, -1)' }}><CornerOrnament color={accentColor} /></div>

      {/* ── Header: couple names & date ─────────────────────────────── */}
      <motion.div
        className="relative z-10 flex flex-col items-center text-center px-6 mb-4"
        initial={{ opacity: 0, y: -30 }}
        animate={{
          opacity: isOpening ? 0 : 1,
          y: isOpening ? -20 : 0,
          pointerEvents: isOpening ? 'none' : 'auto',
        }}
        transition={{ duration: 0.8, delay: isOpening ? 0 : 0.3 }}
      >
        {/* Eyebrow text */}
        <p
          className="tracking-[0.3em] uppercase mb-3 text-xs"
          style={{ color: envelope.textColor || '#8B6914', fontFamily: 'var(--v-font-utility)', opacity: 0.75 }}
        >
          {banner.subtextMsg || 'Nuestra Boda'}
        </p>

        {/* Couple names */}
        <h1
          className="text-3xl sm:text-4xl md:text-5xl italic leading-tight"
          style={{
            color: envelope.textDarkColor || '#3D2B1F',
            fontFamily: envelope.titleFont || 'var(--v-font-display)',
          }}
        >
          {weddingData?.coupleNames || 'Juan & Laura'}
        </h1>

        {/* Date */}
        {formattedDate && (
          <p
            className="text-sm mt-3 italic"
            style={{ color: envelope.textColor || '#8B6914', fontFamily: 'var(--v-font-body)', opacity: 0.85 }}
          >
            {formattedDate}
          </p>
        )}

        {/* Floral ornamental divider */}
        <div className="mt-4">
          <FloralDivider color={accentColor} />
        </div>

        {/* Message below divider */}
        {!envelope.messageOnEnvelope && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.9 }}
            className="text-sm md:text-base italic mt-3 leading-relaxed"
            style={{ color: envelope.textDarkColor || '#6B5B4E', fontFamily: envelope.envelopeFont || 'var(--v-font-body)', maxWidth: '320px', opacity: 0.85 }}
          >
            {envelope.envelopeMsg}
          </motion.p>
        )}
      </motion.div>

      {/* ── Envelope Container ───────────────────────────────────────── */}
      <div
        className="relative w-full max-w-lg z-10"
        style={{ perspective: '1400px', transformStyle: 'preserve-3d', aspectRatio: '4/3' }}
      >
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>

          {/* Layer 1: Back of envelope */}
          <div className="absolute w-full h-full rounded-sm shadow-2xl overflow-hidden z-10">
            <svg viewBox="0 0 800 600" className="w-full h-full pointer-events-none">
              {svgDefs}
              <rect x="0" y="0" width="800" height="600" fill="url(#envelope-grad)" />
              {envelope.textureUrl && (
                <rect x="0" y="0" width="800" height="600" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />
              )}
              <rect x="12" y="12" width="776" height="576" fill={cardBg} rx="4" opacity="0.92" />
              {envelope.textureUrl && (
                <rect x="12" y="12" width="776" height="576" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply', opacity: 0.85 }} rx="4" />
              )}
              <rect x="12" y="12" width="776" height="576" fill="none" stroke={`${accentColor}40`} strokeWidth="1.5" rx="4" />
              {/* Inner decorative border lines */}
              <rect x="22" y="22" width="756" height="556" fill="none" stroke={`${accentColor}20`} strokeWidth="0.7" rx="2" strokeDasharray="8 4" />
            </svg>
          </div>

          {/* Layer 2: Cards inside envelope */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* Card 1: Guest Info */}
            <motion.div
              className="absolute w-[45%] max-w-[230px] h-[70%] max-h-[280px] shadow-2xl z-10 pointer-events-auto"
              initial={{ y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={isOpening ? {
                y: ['10%', '-115%', '-40%'],
                x: [0, '-25%', '-50%'],
                rotate: [0, -6, -12],
                opacity: [0, 1, 1],
                scale: [0.8, 1, 1],
                zIndex: [10, 10, 35],
              } : { y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }}
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' }}
              style={{
                backgroundColor: cardBg,
                border: `1px solid ${accentColor}50`,
                borderRadius: '2px',
              }}
            >
              <div
                className="w-full h-full p-3 md:p-5 flex flex-col items-center justify-center relative overflow-hidden"
                style={{ border: `1px solid ${accentColor}30`, borderRadius: '1px', margin: '4px' }}
              >
                {/* Noise texture overlay */}
                {envelope.textureUrl && (
                  <div
                    className="absolute inset-0 z-0 pointer-events-none opacity-70"
                    style={{ backgroundImage: `url(${envelope.textureUrl})`, backgroundSize: 'cover', mixBlendMode: 'multiply' }}
                  />
                )}
                <div className="relative z-10 flex flex-col items-center justify-center text-center">
                  {/* Small ornament */}
                  <div className="mb-2 opacity-40">
                    <FloralDivider color={accentColor} />
                  </div>
                  <p
                    className="text-[9px] md:text-[10px] tracking-[0.25em] uppercase mb-2"
                    style={{ color: envelope.textColor || '#8B6914', fontFamily: 'var(--v-font-utility)', opacity: 0.8 }}
                  >
                    {envelope.cardMessageforguestsText}
                  </p>
                  <p
                    className="text-base md:text-xl italic font-medium leading-tight mb-3"
                    style={{ color: accentColor, fontFamily: envelope.titleFont || 'var(--v-font-display)' }}
                  >
                    {paramsGeneral.guestName}
                  </p>
                  <div
                    className="w-full pt-2 border-t"
                    style={{ borderColor: `${accentColor}30` }}
                  >
                    <p
                      className="text-[10px] md:text-xs tracking-[0.15em] uppercase"
                      style={{ color: envelope.textDarkColor || '#6B5B4E', fontFamily: 'var(--v-font-utility)' }}
                    >
                      {paramsGeneral.numberGuests} {paramsGeneral.numberGuests === 1 ? 'persona' : 'personas'}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card 2: Photo */}
            <motion.div
              className="absolute w-[45%] max-w-[230px] h-[70%] max-h-[280px] shadow-2xl z-10 pointer-events-auto"
              initial={{ y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8 }}
              animate={isOpening ? {
                y: ['10%', '-120%', '-42%'],
                x: [0, '25%', '50%'],
                rotate: [0, 6, 12],
                opacity: [0, 1, 1],
                scale: [0.8, 1, 1],
                zIndex: [10, 10, 34],
              } : { y: '10%', x: 0, rotate: 0, opacity: 0, scale: 0.8, zIndex: 10 }}
              transition={{ duration: 1.5, times: [0, 0.5, 1], ease: 'easeInOut' }}
              style={{
                backgroundColor: envelope.photoBackgroundColor || '#ffffff',
                border: `6px solid ${envelope.photoBackgroundColor || '#ffffff'}`,
                borderRadius: '1px',
              }}
            >
              <div className="w-full h-full relative overflow-hidden shadow-inner">
                {envelope.cardCouplePhoto ? (
                  <img src={envelope.cardCouplePhoto} alt="Pareja" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center text-xs italic"
                    style={{ backgroundColor: '#f0ead8', color: '#9C8778', fontFamily: 'var(--v-font-body)' }}
                  >
                    Nuestra Foto
                  </div>
                )}
                <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_20px_rgba(0,0,0,0.08)]" />
              </div>
            </motion.div>
          </div>

          {/* Layer 3: Front envelope flaps (Left, Right, Bottom) */}
          <div className="absolute w-full h-full pointer-events-none z-20">
            <svg viewBox="0 0 800 600" className="w-full h-full" style={{ overflow: 'visible' }}>
              {svgDefs}
              <polygon points="0,0 400,300 0,600" fill="url(#envelope-grad)" />
              {envelope.textureUrl && <polygon points="0,0 400,300 0,600" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />}
              <polygon points="0,0 400,300 0,600" fill="none" stroke={`${accentColor}25`} strokeWidth="1" />
              <polygon points="800,0 400,300 800,600" fill="url(#envelope-grad)" />
              {envelope.textureUrl && <polygon points="800,0 400,300 800,600" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />}
              <polygon points="800,0 400,300 800,600" fill="none" stroke={`${accentColor}25`} strokeWidth="1" />
              <g filter="url(#bottom-flap-shadow)">
                <polygon points="0,600 800,600 400,270" fill="url(#envelope-grad)" />
                {envelope.textureUrl && <polygon points="0,600 800,600 400,270" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />}
                <polygon points="0,600 800,600 400,270" fill="none" stroke={`${accentColor}45`} strokeWidth="1.5" />
              </g>
            </svg>
          </div>

          {/* Layer 4: Animated top flap */}
          <motion.div
            className="absolute w-full pointer-events-none"
            style={{ top: 0, height: '60%', transformOrigin: 'top center', transformStyle: 'preserve-3d' }}
            animate={{ rotateX: isOpening ? -180 : 0, zIndex: isOpening ? 12 : 30 }}
            transition={{ rotateX: { duration: 0.9, ease: [0.4, 0, 0.2, 1] }, zIndex: { duration: 0.01, delay: isOpening ? 0.45 : 0 } }}
          >
            <div className="absolute inset-0" style={{ backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}>
              <svg viewBox="0 0 800 360" className="w-full h-full" style={{ overflow: 'visible', filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.28))' }}>
                {svgDefs}
                <polygon points="0,0 800,0 400,360" fill="url(#envelope-grad)" />
                {envelope.textureUrl && <polygon points="0,0 800,0 400,360" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply' }} />}
                <polygon points="0,0 800,0 400,360" fill="none" stroke={accentColor} strokeWidth="1.5" opacity="0.5" />
              </svg>
              {envelope.messageOnEnvelope && envelope.envelopeMsg && (
                <div
                  className="absolute inset-0 -translate-y-18 px-16 pb-12 flex flex-col items-center justify-center text-center pointer-events-none"
                  style={{ color: envelope.envelopeMsgColor || envelope.textDarkColor, fontFamily: envelope.envelopeFont }}
                >
                  <p className="text-[22px] sm:text-[18px] md:text-[22px] italic leading-relaxed max-w-[80%]">
                    {envelope.envelopeMsg}
                  </p>
                </div>
              )}
            </div>
            <div
              className="absolute inset-0"
              style={{ transform: 'rotateY(180deg)', backfaceVisibility: 'hidden', WebkitBackfaceVisibility: 'hidden' }}
            >
              <svg viewBox="0 0 800 360" className="w-full h-full" style={{ overflow: 'visible', filter: 'drop-shadow(0 -4px 10px rgba(0,0,0,0.16))' }}>
                {svgDefs}
                <polygon points="0,0 800,0 400,360" fill="url(#envelope-grad-inner)" />
                {envelope.textureUrl && <polygon points="0,0 800,0 400,360" fill="url(#envelope-pattern)" style={{ mixBlendMode: 'multiply', opacity: 0.5 }} />}
                <line x1="0" y1="0" x2="800" y2="0" stroke={accentColor} strokeWidth="2" opacity="0.35" />
                <polygon points="0,0 800,0 400,360" fill="none" stroke={accentColor} strokeWidth="1" opacity="0.25" />
              </svg>
            </div>
          </motion.div>

          {/* Layer 5: Wax seal / action button */}
          <motion.button
            onClick={handleVerDetalles}
            className="absolute z-40 flex flex-col items-center justify-center cursor-pointer group"
            initial={{ top: '50%', y: '-10%' }}
            animate={{
              top: isOpening ? '60%' : '50%',
              y: isOpening ? '0%' : '-10%',
              scale: isOpening ? 1.08 : 1,
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div
              className="w-28 h-28 flex items-center justify-center relative transition-all duration-300 group-hover:scale-110"
              style={{ filter: `drop-shadow(0 4px 16px ${accentColor}80)` }}
            >
              {envelope.sealImage ? (
                <img
                  src={envelope.sealImage}
                  alt="Sello"
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-28 object-contain drop-shadow-lg v-seal-pulse"
                />
              ) : (
                /* Vintage wax seal SVG */
                <svg
                  className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-24 v-seal-pulse"
                  viewBox="0 0 96 96"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="48" cy="48" r="42" fill="#6B2D0F" />
                  <circle cx="48" cy="48" r="38" fill="#7E3610" />
                  <circle cx="48" cy="48" r="34" fill="#8B3D12" stroke="#C9A84C" strokeWidth="0.8" strokeOpacity="0.6" />
                  {/* Ring of dots */}
                  {Array.from({ length: 12 }).map((_, i) => {
                    const angle = (i * 30) * (Math.PI / 180);
                    const cx2 = 48 + 28 * Math.cos(angle);
                    const cy2 = 48 + 28 * Math.sin(angle);
                    return <circle key={i} cx={cx2} cy={cy2} r="1.5" fill="#C9A84C" fillOpacity="0.6" />;
                  })}
                  <text
                    x="48" y="52"
                    textAnchor="middle"
                    fontFamily="'Playfair Display', serif"
                    fontSize="18"
                    fontStyle="italic"
                    fill="#F5EFE0"
                    fillOpacity="0.9"
                  >
                    {rawEnvelope.initialsCoupleText || '♥'}
                  </text>
                </svg>
              )}

              {/* Text below seal */}
              <div
                className="relative z-10 flex flex-col items-center justify-center mt-16"
                style={{ fontFamily: 'var(--v-font-utility)', color: envelope.textDarkColor || '#3D2B1F' }}
              >
                {step === 'closed' ? (
                  <motion.span
                    animate={{ opacity: [0.7, 1, 0.7] }}
                    transition={{ repeat: Infinity, duration: 2.5 }}
                    className="text-[10px] font-medium tracking-[0.2em] uppercase text-center"
                    style={{ color: envelope.textDarkColor || '#6B5B4E' }}
                  >
                    Abrir invitación
                  </motion.span>
                ) : (
                  <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-center"
                    style={{ color: envelope.textDarkColor || '#6B5B4E' }}
                  >
                    Ver detalles
                  </span>
                )}
              </div>
            </div>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
