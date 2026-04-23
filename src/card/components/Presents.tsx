import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function Presents() {
  const { config } = useCardConfig();
  const { presents } = config;

  return (
    <section className="w-full py-6 md:py-10 px-0 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12"
      >
        <p className="text-base sm:text-lg tracking-widest uppercase mb-2" style={{ color: presents.titleColor, fontFamily: presents.titleFont }}>
          {presents.presentTitle}
        </p>
        <br />

      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="flex flex-col items-center text-center rounded-2xl md:rounded-3xl overflow-hidden shadow-xl px-6 pt-10 pb-10"
        style={{
          background: `linear-gradient(160deg, ${presents.backgroundColorFrom}, ${presents.backgroundColorVia}, ${presents.backgroundColorTo})`,
          border: `1px solid ${presents.boderColor}`,
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
          style={{
            background: presents.backgroundColorIconMoments,
            border: `3px solid ${presents.borderColorIconMoments}`,
          }}
        >
          <Mail className="w-8 h-8 md:w-10 md:h-10" style={{ color: presents.iconColor }} />
        </div>

        {/* Divider */}
        <div className="h-px w-16 mb-6" style={{ backgroundColor: presents.borderColorIconMoments, opacity: 0.4 }} />

        {/* Message */}
        <p
          className="text-sm md:text-base leading-relaxed max-w-sm"
          style={{ color: presents.textColor, fontFamily: presents.textFont }}
        >
          {presents.presentMessage}
        </p>
      </motion.div>
    </section>
  );
}
