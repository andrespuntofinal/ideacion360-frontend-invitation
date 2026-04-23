import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { useCardConfig } from '../CardContext';

export default function ChildRestriction() {
  const { config } = useCardConfig();
  const { childRestriction } = config;

  return (
    <section className="w-full py-6 md:py-10 px-0 md:px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12"
      >
        <p className="text-base sm:text-lg tracking-widest uppercase mb-2" style={{ color: childRestriction.titleColor, fontFamily: childRestriction.titleFont }}>
          {childRestriction.childrestrictionTitle}
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
          background: `linear-gradient(160deg, ${childRestriction.backgroundColorFrom}, ${childRestriction.backgroundColorVia}, ${childRestriction.backgroundColorTo})`,
          border: `1px solid ${childRestriction.boderColor}`,
        }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-6 shadow-lg"
          style={{
            background: childRestriction.backgroundColorIconMoments,
            border: `3px solid ${childRestriction.borderColorIconMoments}`,
          }}
        >
          <Users className="w-8 h-8 md:w-10 md:h-10" style={{ color: childRestriction.iconColor }} />
        </div>
        <br />


        {/* Message */}
        <p
          className="text-sm md:text-base leading-relaxed max-w-sm"
          style={{ color: childRestriction.textColor, fontFamily: childRestriction.textFont }}
        >
          {childRestriction.childrestrictionMessage}
        </p>
      </motion.div>
    </section>
  );
}
