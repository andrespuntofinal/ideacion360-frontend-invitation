import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function DressCode() {
  const { config } = useCardConfig();
  const { dressCode } = config;

  const details = [
    { title: dressCode.titleWomen, iconUrl: dressCode.dressCodeIconWomen, text: dressCode.dressCodeTextWomen },
    { title: dressCode.titleMen, iconUrl: dressCode.dressCodeIconMen, text: dressCode.dressCodeTextMen },
  ];

  return (
    <section className="w-full py-6 md:py-10 px-0 md:px-4">
      {/* Section title */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-8 md:mb-12"
      >
        <p className="text-base sm:text-lg tracking-widest uppercase mb-2" style={{ color: dressCode.titleColor, fontFamily: dressCode.titleFont }}>
          {dressCode.titletext}
        </p>
        <br />

      </motion.div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row gap-4 md:gap-6 w-full">
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.8 }}
            className="flex-1 flex flex-col items-center text-center rounded-2xl md:rounded-3xl overflow-hidden shadow-xl px-6 pt-8 pb-8"
            style={{
              background: `linear-gradient(160deg, ${dressCode.backgroundColorFrom}, ${dressCode.backgroundColorVia}, ${dressCode.backgroundColorTo})`,
              border: `1px solid ${dressCode.boderColor}`,
            }}
          >
            {/* Icon circle */}
            <div
              className="w-14 h-14 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-5 shadow-lg"
              style={{
                background: dressCode.backgroundColorIconMoments,
                border: `2px solid ${dressCode.borderColorIconMoments}`,
              }}
            >
              {item.iconUrl ? (
                <img
                  src={item.iconUrl}
                  alt={item.title}
                  className="w-8 h-8 md:w-12 md:h-12 object-contain"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <span className="text-2xl">👗</span>
              )}
            </div>

            {/* Title */}
            <h3
              className="text-base sm:text-lg tracking-widest mb-2"
              style={{ fontFamily: dressCode.title2Font, color: dressCode.title2Color }}
            >
              {item.title}
            </h3>
            <br />

            {/* Divider */}
            <div className="h-px w-16 mb-4" style={{ backgroundColor: dressCode.borderColorIconMoments, opacity: 0.4 }} />

            {/* Description */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ fontFamily: dressCode.text2Font, color: dressCode.text2Color }}
            >
              {item.text}
            </p>
            <br />
            <br />
            <br />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
