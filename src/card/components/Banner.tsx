import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function Banner() {
  const { config } = useCardConfig();
  const { banner, weddingData } = config;

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <motion.div
        initial={{ scale: 1.08 }}
        animate={{ scale: 1 }}
        transition={{ duration: 3, ease: 'easeOut' }}
        className="absolute inset-0"
      >
        <video
          src={banner.videoDesktop}
          className="w-full h-full object-cover hidden md:block"
          autoPlay loop muted playsInline
        />
        <video
          src={banner.videoResponsive}
          className="w-full h-full object-cover block md:hidden"
          autoPlay loop muted playsInline
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 z-10" />

      {/* Content */}
      <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-6">
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 0.3, duration: 1.2, ease: 'easeOut' }}
          className="flex items-center gap-4 mb-8"
        >
          <div className="h-px w-16 md:w-28" style={{ backgroundColor: banner.textColor, opacity: 0.6 }} />
          <span style={{ color: banner.textColor, opacity: 0.8, fontSize: '1.2rem' }}>♡</span>
          <div className="h-px w-16 md:w-28" style={{ backgroundColor: banner.textColor, opacity: 0.6 }} />
        </motion.div>

        {/* Couple names */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: 'easeOut' }}
          className="text-5xl md:text-7xl lg:text-8xl leading-tight drop-shadow-2xl mb-6"
          style={{ color: banner.textColor, fontFamily: banner.titleFont }}
        >
          {weddingData.coupleNames}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.9, ease: 'easeOut' }}
          className="text-lg md:text-2xl lg:text-3xl italic tracking-wide drop-shadow-md"
          style={{ color: banner.textColor, fontFamily: banner.subtitleFont, opacity: 0.9 }}
        >
          {banner.subtextMsg}
        </motion.p>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="flex items-center gap-4 mt-8"
        >
          <div className="h-px w-10 md:w-20" style={{ backgroundColor: banner.textColor, opacity: 0.5 }} />
          <span style={{ color: banner.textColor, opacity: 0.6, fontSize: '0.7rem', letterSpacing: '0.25em' }}>✦</span>
          <div className="h-px w-10 md:w-20" style={{ backgroundColor: banner.textColor, opacity: 0.5 }} />
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6" style={{ color: banner.textColor, opacity: 0.7 }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
