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
          autoPlay muted playsInline
        />
        <video
          src={banner.videoResponsive}
          className="w-full h-full object-cover block md:hidden"
          autoPlay muted playsInline
        />
      </motion.div>

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black/60 z-10" />

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
