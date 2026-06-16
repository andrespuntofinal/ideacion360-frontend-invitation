import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

export default function Banner() {
  const { config } = useCardConfig();
  const { banner, weddingData, envelope } = config;

  const videoDesktop = optimizeCloudinaryUrl(banner.videoDesktop);
  const videoResponsive = optimizeCloudinaryUrl(banner.videoResponsive);
  const accentColor = envelope.accentColor || '#C9A84C';

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <video src={videoDesktop} className="w-full h-full object-cover hidden md:block" autoPlay muted playsInline />
        <video src={videoResponsive} className="w-full h-full object-cover block md:hidden" autoPlay muted playsInline />
      </motion.div>

      {/* Gradient overlays — vintage warm tones */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/20 to-black/65 z-10" />
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(61,43,31,0.4) 100%)' }}
      />

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1.2, ease: 'easeOut' }}
        className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6"
      >
        {/* Eyebrow label */}
        <p
          className="text-[10px] tracking-[0.4em] uppercase mb-5 opacity-80"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)' }}
        >
          {banner.subtextMsg || 'Nuestra Boda'}
        </p>

        {/* Couple names */}
        <h1
          className="text-4xl sm:text-5xl md:text-7xl italic font-medium leading-tight mb-4"
          style={{
            color: banner.textColor || '#F5EFE0',
            fontFamily: banner.titleFont || 'var(--v-font-display)',
            textShadow: '0 2px 24px rgba(0,0,0,0.4)',
          }}
        >
          {weddingData?.coupleNames || 'Juan & Laura'}
        </h1>

        {/* Ornamental divider */}
        <div className="flex items-center gap-4 mb-5" style={{ opacity: 0.6 }}>
          <div style={{ height: '1px', width: '60px', backgroundColor: accentColor }} />
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <circle cx="6" cy="6" r="2" fill={accentColor} />
            <circle cx="6" cy="6" r="5" fill="none" stroke={accentColor} strokeWidth="0.6" />
          </svg>
          <div style={{ height: '1px', width: '60px', backgroundColor: accentColor }} />
        </div>

        {/* Wedding date */}
        {weddingData?.weddingDate && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4, duration: 1 }}
            className="text-sm md:text-base italic"
            style={{
              color: banner.textColor || '#F5EFE0',
              fontFamily: 'var(--v-font-body)',
              opacity: 0.85,
              textShadow: '0 1px 8px rgba(0,0,0,0.5)',
            }}
          >
            {new Date(weddingData.weddingDate).toLocaleDateString('es-ES', {
              weekday: 'long',
              day: 'numeric',
              month: 'long',
              year: 'numeric',
              timeZone: 'UTC',
            })}
          </motion.p>
        )}
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <p
          className="text-[9px] tracking-[0.3em] uppercase mb-1"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
        >
          Descubre
        </p>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}>
          <ChevronDown className="w-5 h-5" style={{ color: banner.textColor || '#F5EFE0', opacity: 0.6 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
