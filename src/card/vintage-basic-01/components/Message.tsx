import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import '../vintage.css';

/* ── Inline SVG ornament ─────────────────────────────────────────────────── */
const VintageSeparator = ({ color = '#C9A84C' }: { color?: string }) => (
  <svg width="200" height="24" viewBox="0 0 200 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <line x1="0" y1="12" x2="76" y2="12" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>
    <path d="M84,12 Q90,5 96,12 Q90,19 84,12Z" fill={color} fillOpacity="0.3"/>
    <circle cx="100" cy="12" r="3" fill={color} fillOpacity="0.5"/>
    <path d="M104,12 Q110,5 116,12 Q110,19 104,12Z" fill={color} fillOpacity="0.3"/>
    <line x1="124" y1="12" x2="200" y2="12" stroke={color} strokeWidth="0.8" strokeOpacity="0.4"/>
  </svg>
);

export default function Message() {
  const { config } = useCardConfig();
  const { message, envelope } = config;
  const accentColor = envelope.accentColor || '#C9A84C';
  const textDark = message.colorText1 || '#3D2B1F';
  const textAccent = message.colorParents || '#8B6914';

  return (
    <section
      className="w-full py-20 md:py-28 px-6 relative overflow-hidden flex justify-center"
      style={{ backgroundColor: message.backgroundColor || '#F5EFE0' }}
    >
      {/* Subtle corner filigrees */}
      <div className="absolute top-8 left-8 opacity-25 pointer-events-none">
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4,4 Q4,44 44,44" stroke={accentColor} strokeWidth="1" fill="none"/>
          <path d="M4,4 Q24,4 44,4" stroke={accentColor} strokeWidth="1" fill="none"/>
          <circle cx="5" cy="5" r="2" fill={accentColor}/>
        </svg>
      </div>
      <div className="absolute bottom-8 right-8 opacity-25 pointer-events-none" style={{ transform: 'rotate(180deg)' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
          <path d="M4,4 Q4,44 44,44" stroke={accentColor} strokeWidth="1" fill="none"/>
          <path d="M4,4 Q24,4 44,4" stroke={accentColor} strokeWidth="1" fill="none"/>
          <circle cx="5" cy="5" r="2" fill={accentColor}/>
        </svg>
      </div>

      <div className="w-full max-w-3xl flex flex-col items-center text-center relative z-10">
        {/* Top ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1 }}
          className="mb-10"
        >
          <VintageSeparator color={accentColor} />
        </motion.div>

        {/* Main verse */}
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-2xl md:text-3xl italic leading-relaxed mb-6"
          style={{ color: textDark, fontFamily: message.font || 'var(--v-font-body)', whiteSpace: 'pre-wrap' }}
        >
          {message.text1}
        </motion.p>

        {/* Reference / parents */}
        {(message.groomParents || message.brideParents) && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.25, duration: 0.9 }}
            className="mb-8 space-y-1"
          >
            {message.groomParents && (
              <p
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: textAccent, fontFamily: 'var(--v-font-utility)', opacity: 0.75 }}
              >
                {message.groomParents}
              </p>
            )}
            {message.brideParents && (
              <p
                className="text-xs tracking-[0.25em] uppercase"
                style={{ color: textAccent, fontFamily: 'var(--v-font-utility)', opacity: 0.75 }}
              >
                {message.brideParents}
              </p>
            )}
          </motion.div>
        )}

        {/* Middle divider */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35, duration: 0.8 }}
          className="mb-8"
        >
          <VintageSeparator color={accentColor} />
        </motion.div>

        {/* Second text */}
        {message.text2 && (
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-lg md:text-xl italic leading-relaxed"
            style={{ color: textDark, fontFamily: message.font || 'var(--v-font-body)', opacity: 0.85 }}
          >
            {message.text2}
          </motion.p>
        )}

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1 }}
          className="mt-10"
        >
          <VintageSeparator color={accentColor} />
        </motion.div>
      </div>
    </section>
  );
}
