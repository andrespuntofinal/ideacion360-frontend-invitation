import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function Timeline() {
  const { config } = useCardConfig();
  const { countdown, timeline } = config;

  const steps = [
    { time: timeline.timeStep1, title: timeline.textStep1 },
    { time: timeline.timeStep2, title: timeline.textStep2 },
    { time: timeline.timeStep3, title: timeline.textStep3 },
    { time: timeline.timeStep4, title: timeline.textStep4 },
  ].filter(step => step.time && step.title);

  return (
    <section
      className="w-full py-16 md:py-24 px-4 overflow-hidden relative"
      style={{
        background: `linear-gradient(135deg, ${countdown.backgroundColorFrom} 0%, ${countdown.backgroundColorVia} 50%, ${countdown.backgroundColorTo} 100%)`,
      }}
    >
      {/* Decorative ring overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 md:mb-20 relative z-10"
      >
        <p
          className="text-base sm:text-2xl italic leading-relaxed uppercase mb-2"
          style={{ color: countdown.titleTextColor, opacity: 0.8, fontFamily: countdown.titleTextFont }}
        >
          ✦ &nbsp; Itinerario &nbsp; ✦
        </p>
        <br />
        <br />
      </motion.div>

      {/* Linear timeline matching Countdown */}
      <div className="w-full flex justify-center relative z-10">
        <div className="flex flex-wrap justify-center items-start gap-6 md:gap-10 lg:gap-14 w-full max-w-5xl px-4">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center text-center group"
            >
              {/* Circle */}
              <div
                className="relative flex items-center justify-center rounded-full shadow-2xl mb-3 md:mb-4 transition-all duration-300 group-hover:scale-105"
                style={{
                  width: 'clamp(85px, 20vw, 130px)',
                  height: 'clamp(85px, 20vw, 130px)',
                  background: countdown.backgroundColorCircle,
                  border: `3px solid ${countdown.borderColorCircle}`,
                  boxShadow: `0 0 30px ${countdown.boxShadowColor}44`,
                }}
              >
                {/* Inner ring */}
                <div
                  className="absolute inset-[6px] rounded-full border opacity-30"
                  style={{ borderColor: countdown.borderColorCircle }}
                />
                <span
                  className="relative z-10 leading-normal font-light text-center px-3 break-words overflow-hidden"
                  style={{
                    color: countdown.numberColorText1,
                    fontFamily: countdown.numberFontText,
                    fontSize: 'clamp(0.65rem, 1.8vw, 0.95rem)',
                  }}
                >
                  {step.title}
                </span>
              </div>
              <span
                className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase"
                style={{ color: countdown.numberColorText2, fontFamily: countdown.numberFontText }}
              >
                {step.time}
              </span>
              <br />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
