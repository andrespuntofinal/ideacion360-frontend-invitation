import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function Presents() {
  const { config } = useCardConfig();
  const { presents } = config;

  return (
    <section className="w-full py-6 md:py-10 px-0 md:px-4">


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative flex flex-col items-center text-center rounded-2xl md:rounded-3xl shadow-xl px-8 pt-16 pb-12 w-full mt-10 h-full"
        style={{
          background: `linear-gradient(160deg, ${presents.backgroundColorFrom}, ${presents.backgroundColorVia}, ${presents.backgroundColorTo})`,
          border: `2px solid ${presents.borderColorIconMoments}`,
        }}
      >
        {/* Floating Icon */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-20"
          style={{
            background: presents.backgroundColorIconMoments,
            border: `3px solid ${presents.borderColorIconMoments}`,
          }}
        >
          <Mail className="w-10 h-10" style={{ color: presents.iconColor, opacity: 0.3 }} />
        </div>
        <br />
        <br />

        {/* Title inside */}
        <h3
          className="text-xl sm:text-2xl font-bold tracking-widest mb-6"
          style={{ color: presents.titleColor, fontFamily: presents.titleFont }}
        >
          {presents.presentTitle}
        </h3>
        <br />

        {/* Message */}
        <p
          className="text-sm md:text-sm leading-relaxed max-w-2xl mx-auto"
          style={{ color: presents.textColor, fontFamily: presents.textFont }}
        >
          {presents.presentMessage}
        </p>
      </motion.div>
    </section>
  );
}
