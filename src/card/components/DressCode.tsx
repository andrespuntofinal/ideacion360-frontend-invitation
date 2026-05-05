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
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        viewport={{ once: false, amount: 0.5 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8 md:mb-12"
      >
        <p className="text-base sm:text-2xl italic leading-relaxed uppercase mb-2" style={{ color: dressCode.titleColor, fontFamily: dressCode.titleFont }}>
          {dressCode.titletext}
        </p>
        <br />
        <br />

      </motion.div>

      {/* Cards */}
      <div className="flex flex-row gap-2 md:gap-6 w-full" style={{ perspective: '1000px' }}>
        {details.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 50, scale: 0.95, filter: 'blur(10px)' }}
            whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{
              delay: i * 0.15,
              duration: 0.8,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="relative flex-1 flex flex-col items-center text-center rounded-2xl md:rounded-3xl shadow-xl px-2 sm:px-6 pt-16 pb-6 sm:pb-8 mt-10"
            style={{
              background: `linear-gradient(160deg, ${dressCode.backgroundColorFrom}, ${dressCode.backgroundColorVia}, ${dressCode.backgroundColorTo})`,
              border: `2px solid ${dressCode.borderColorIconMoments}`,
            }}
          >
            {/* Floating Icon */}
            <div
              className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center shadow-xl z-20"
              style={{
                background: dressCode.backgroundColorIconMoments,
                border: `3px solid ${dressCode.borderColorIconMoments}`,
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
            <br />
            <br />

            {/* Title */}
            <h3
              className="text-sm sm:text-xl font-bold tracking-widest mb-1"
              style={{ fontFamily: dressCode.title2Font, color: dressCode.title2Color }}
            >
              {item.title}
            </h3>
            <br />

            <div className="h-px w-16 mb-4 opacity-40" style={{ backgroundColor: dressCode.borderColorIconMoments }} />

            <p
              className="text-[10px] sm:text-sm leading-relaxed"
              style={{ fontFamily: dressCode.text2Font, color: dressCode.text2Color }}
            >
              {item.text}
            </p>
            <br />
            <br />


          </motion.div>
        ))}
      </div>
    </section>
  );
}
