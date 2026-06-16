import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import { optimizeCloudinaryUrl } from '../../../utils/cloudinary';
import '../vintage.css';

export default function DressCode() {
  const { config } = useCardConfig();
  const { dressCode, envelope } = config;
  const accentColor = envelope.accentColor || '#C9A84C';

  const details = [
    { title: dressCode.titleWomen, iconUrl: optimizeCloudinaryUrl(dressCode.dressCodeIconWomen), text: dressCode.dressCodeTextWomen, isWomen: true },
    { title: dressCode.titleMen, iconUrl: optimizeCloudinaryUrl(dressCode.dressCodeIconMen), text: dressCode.dressCodeTextMen, isWomen: false },
  ];

  return (
    <section className="w-full py-4 md:py-6 px-0 md:px-2">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: -16, filter: 'blur(8px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-center mb-10"
      >
        <p
          className="text-[10px] tracking-[0.3em] uppercase mb-1"
          style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
        >
          Indumentaria
        </p>
        <h2
          className="text-2xl md:text-3xl italic"
          style={{ color: dressCode.titleColor || '#8B6914', fontFamily: dressCode.titleFont || 'var(--v-font-display)' }}
        >
          {dressCode.titletext}
        </h2>
        <div className="flex items-center justify-center gap-3 mt-3">
          <div style={{ height: '1px', width: '32px', backgroundColor: accentColor, opacity: 0.4 }} />
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <circle cx="4" cy="4" r="2" fill={accentColor} fillOpacity="0.6"/>
          </svg>
          <div style={{ height: '1px', width: '32px', backgroundColor: accentColor, opacity: 0.4 }} />
        </div>
      </motion.div>

      {/* Cards */}
      <div className="flex flex-col gap-5 w-full">
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ delay: i * 0.12, duration: 0.8, type: 'spring', stiffness: 100, damping: 20 }}
            className="relative v-corner-card"
            style={{
              background: `linear-gradient(160deg, ${dressCode.backgroundColorFrom || '#2C1F14'}, ${dressCode.backgroundColorVia || '#4A3728'}, ${dressCode.backgroundColorTo || '#3D2B1F'})`,
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
                className="flex items-center justify-center flex-shrink-0 overflow-hidden"
                style={{
                  width: '44px', height: '44px',
                  backgroundColor: dressCode.backgroundColorIconMoments || '#4A3728',
                  border: `1px solid ${accentColor}50`,
                }}
              >
                {item.iconUrl ? (
                  <img
                    src={item.iconUrl}
                    alt={item.title}
                    className="w-10 h-10 object-contain"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <span className="text-xl" style={{ lineHeight: 1 }}>
                    {item.isWomen ? '♀' : '♂'}
                  </span>
                )}
              </div>
              <h3
                className="text-base tracking-[0.1em] uppercase font-medium"
                style={{ fontFamily: 'var(--v-font-utility)', color: dressCode.title2Color || '#C9A84C' }}
              >
                {item.title}
              </h3>
            </div>

            {/* Separator */}
            <div
              className="mb-4"
              style={{ height: '1px', background: `linear-gradient(to right, ${accentColor}40, transparent)` }}
            />

            {/* Dress code text */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: dressCode.text2Color || '#E8D5A3', fontFamily: 'var(--v-font-body)' }}
            >
              {item.text}
            </p>

            {/* Color palette */}
            {dressCode.activateColorPalette && (
              <div className="flex flex-row gap-2 mt-5 items-center">
                <span
                  className="text-[9px] tracking-[0.2em] uppercase mr-1"
                  style={{ color: accentColor, fontFamily: 'var(--v-font-utility)', opacity: 0.7 }}
                >
                  Paleta
                </span>
                {(item.isWomen ? dressCode.colorPaletteWomen : dressCode.colorPaletteMen)?.map((color, idx) => (
                  <div
                    key={idx}
                    style={{
                      width: '18px', height: '18px',
                      backgroundColor: color || '#ffffff',
                      border: `1px solid ${accentColor}40`,
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
