import { motion } from 'framer-motion';
import { Gift } from 'lucide-react';
import { useCardConfig } from '../CardContext';
import '../vintage.css';

export default function Presents() {
  const { config } = useCardConfig();
  const { presents, envelope } = config;
  const accentColor = envelope.accentColor || '#C9A84C';

  return (
    <section className="w-full py-4 md:py-6 px-0 md:px-2">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9 }}
        className="relative v-corner-card"
        style={{
          background: `linear-gradient(160deg, ${presents.backgroundColorFrom || '#2C1F14'}, ${presents.backgroundColorVia || '#4A3728'}, ${presents.backgroundColorTo || '#3D2B1F'})`,
          border: `1px solid ${accentColor}40`,
          padding: '2rem 1.5rem 1.75rem',
        }}
      >
        {/* Top accent line */}
        <div
          className="absolute top-0 left-8 right-8"
          style={{ height: '1px', background: `linear-gradient(to right, transparent, ${accentColor}60, transparent)` }}
        />

        {/* Icon + title row */}
        <div className="flex items-center gap-3 mb-4">
          <div
            className="flex items-center justify-center flex-shrink-0"
            style={{
              width: '40px', height: '40px',
              backgroundColor: presents.backgroundColorIconMoments || '#4A3728',
              border: `1px solid ${accentColor}50`,
            }}
          >
            <Gift className="w-5 h-5" style={{ color: presents.iconColor || '#C9A84C', opacity: 0.8 }} />
          </div>
          <h3
            className="text-base tracking-[0.1em] uppercase font-medium"
            style={{ fontFamily: 'var(--v-font-utility)', color: presents.titleColor || '#C9A84C' }}
          >
            {presents.presentTitle}
          </h3>
        </div>

        {/* Separator */}
        <div
          className="mb-4"
          style={{ height: '1px', background: `linear-gradient(to right, ${accentColor}40, transparent)` }}
        />

        {/* Message */}
        <p
          className="text-sm leading-relaxed"
          style={{ color: presents.textColor || '#E8D5A3', fontFamily: 'var(--v-font-body)' }}
        >
          {presents.presentMessage}
        </p>
      </motion.div>
    </section>
  );
}
