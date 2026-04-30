import { motion } from 'framer-motion';
import { Info } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function ChildRestriction() {
  const { config } = useCardConfig();
  const { childRestriction } = config;

  return (
    <section className="w-full py-6 md:py-10 px-0 md:px-4">


      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative flex flex-col items-center text-center rounded-2xl md:rounded-3xl shadow-xl px-8 pt-16 pb-12 w-full mt-10"
        style={{
          background: `linear-gradient(160deg, ${childRestriction.backgroundColorFrom}, ${childRestriction.backgroundColorVia}, ${childRestriction.backgroundColorTo})`,
          border: `2px solid ${childRestriction.borderColorIconMoments}`,
        }}
      >
        {/* Floating Icon */}
        <div
          className="absolute -top-10 left-1/2 -translate-x-1/2 w-20 h-20 rounded-full flex items-center justify-center shadow-xl z-20"
          style={{
            background: childRestriction.backgroundColorIconMoments,
            border: `3px solid ${childRestriction.borderColorIconMoments}`,
          }}
        >
          <Info className="w-10 h-10" style={{ color: childRestriction.iconColor, opacity: 0.3 }} />
        </div>

        {/* Title inside */}
        <br />
        <br />
        <h3
          className="text-xl sm:text-2xl font-bold tracking-widest mb-6"
          style={{ color: childRestriction.titleColor, fontFamily: childRestriction.titleFont }}
        >
          {childRestriction.childrestrictionTitle}
        </h3>
        <br />

        {/* Message */}
        <p
          className="text-sm md:text-sm leading-relaxed max-w-2xl mx-auto"
          style={{ color: childRestriction.textColor, fontFamily: childRestriction.textFont }}
        >
          {childRestriction.childrestrictionMessage}
        </p>
      </motion.div>
    </section>
  );
}
