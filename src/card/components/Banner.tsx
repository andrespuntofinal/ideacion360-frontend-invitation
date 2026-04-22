import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function Banner() {
  const { config } = useCardConfig();
  const { banner, weddingData } = config;
  return (
    <section className="relative h-[80vh] w-full overflow-hidden">
      <motion.div initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2 }} className="absolute inset-0">
        <video src={banner.videoDesktop as string} className="w-full h-full object-cover hidden md:block" autoPlay loop muted playsInline />
        <video src={banner.videoResponsive as string} className="w-full h-full object-cover block md:hidden" autoPlay loop muted playsInline />
        <div className="absolute inset-0 mix-blend-multiply" />
      </motion.div>
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
        <motion.h1 initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.8 }}
          className="text-5xl md:text-7xl tracking-widest drop-shadow-lg"
          style={{ color: banner.textColor as string, fontFamily: banner.titleFont as string }}>
          {weddingData.coupleNames}
        </motion.h1>
        <motion.div initial={{ width: 0 }} animate={{ width: '100px' }} transition={{ delay: 1, duration: 0.8 }} className="h-px my-6" />
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}
          className="text-3xl italic drop-shadow-md"
          style={{ color: banner.textColor as string, fontFamily: banner.subtitleFont as string }}>
          {banner.subtextMsg as string}
        </motion.p>
      </div>
    </section>
  );
}
