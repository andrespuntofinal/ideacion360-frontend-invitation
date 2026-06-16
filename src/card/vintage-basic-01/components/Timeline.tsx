import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import '../vintage.css';

// Map icon names to simple SVG paths
const TimelineIconSVG = ({ name, color }: { name: string; color: string }) => {
  const paths: Record<string, string> = {
    Church: 'M10 2 L10 0 M6 4 L14 4 L14 14 L6 14 Z M8 14 L8 10 L12 10 L12 14 M6 4 L10 1 L14 4',
    Camera: 'M3 6 L3 13 L17 13 L17 6 L13 6 L12 4 L8 4 L7 6 Z M10 9.5 A2.5 2.5 0 1 0 10 9.4',
    Wine: 'M7 2 L13 2 L11 8 C11 10 10 11 10 14 M8 14 L12 14 M7 2 Q5 5 9 8',
    Utensils: 'M5 2 L5 8 M5 8 Q5 11 8 11 M8 11 L8 18 M13 2 L13 7 Q13 11 10 11 L10 18',
    Music: 'M9 2 L9 13 M9 13 A2 2 0 1 0 9 17 M9 2 L15 4 L15 8 L9 6 Z',
  };
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d={paths[name] || 'M10 2 A8 8 0 1 0 10 18 A8 8 0 1 0 10 2'} stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

export default function Timeline() {
  const { config } = useCardConfig();
  const { countdown, timeline, envelope } = config;
  const accentColor = envelope.accentColor || '#C9A84C';

  const fromColor = countdown.backgroundColorFrom || '#2C1F14';
  const viaColor  = countdown.backgroundColorVia  || '#4A3728';
  const toColor   = countdown.backgroundColorTo   || '#3D2B1F';
  const goldLight = countdown.borderColorCircle   || '#C9A84C';
  const circBg    = countdown.backgroundColorCircle || '#4A3728';
  const numColor  = countdown.numberColorText1    || '#C9A84C';
  const lblColor  = countdown.numberColorText2    || '#9C8778';

  const icons = [timeline.iconStep1, timeline.iconStep2, timeline.iconStep3, timeline.iconStep4, timeline.iconStep5];

  const steps = [
    { time: timeline.timeStep1, title: timeline.textStep1, icon: icons[0] },
    { time: timeline.timeStep2, title: timeline.textStep2, icon: icons[1] },
    { time: timeline.timeStep3, title: timeline.textStep3, icon: icons[2] },
    { time: timeline.timeStep4, title: timeline.textStep4, icon: icons[3] },
    { time: timeline.timeStep5, title: timeline.textStep5, icon: icons[4] },
  ].filter(step => step.time && step.title);

  return (
    <section
      className="w-full py-16 md:py-24 px-4 overflow-hidden relative"
      style={{ background: `linear-gradient(135deg, ${fromColor} 0%, ${viaColor} 50%, ${toColor} 100%)` }}
    >
      {/* Grain overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />
      {/* Gold top & bottom border lines */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${goldLight}60, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(to right, transparent, ${goldLight}60, transparent)` }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-14 relative z-10"
      >
        <div className="flex items-center justify-center gap-3 mb-3">
          <div style={{ height: '1px', width: '40px', backgroundColor: goldLight, opacity: 0.5 }} />
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <polygon points="8,1 15,8 8,15 1,8" fill="none" stroke={goldLight} strokeWidth="1" strokeOpacity="0.5"/>
            <circle cx="8" cy="8" r="2" fill={goldLight} fillOpacity="0.6"/>
          </svg>
          <div style={{ height: '1px', width: '40px', backgroundColor: goldLight, opacity: 0.5 }} />
        </div>
        <p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: countdown.titleTextColor || '#C9A84C', fontFamily: 'var(--v-font-utility)', opacity: 0.85 }}
        >
          Itinerario
        </p>
      </motion.div>

      {/* Timeline steps — horizontal */}
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
              {/* Vintage square frame */}
              <div
                className="relative flex items-center justify-center mb-3 transition-all duration-300 group-hover:scale-105"
                style={{
                  width: 'clamp(80px, 18vw, 120px)',
                  height: 'clamp(80px, 18vw, 120px)',
                  backgroundColor: circBg,
                  border: `1px solid ${goldLight}60`,
                  boxShadow: `inset 0 0 20px rgba(0,0,0,0.25)`,
                }}
              >
                {/* Inner border */}
                <div className="absolute inset-[5px]" style={{ border: `1px solid ${goldLight}25` }} />
                {/* Corner dots */}
                {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x, y], i) => (
                  <div key={i} className="absolute w-1 h-1" style={{
                    backgroundColor: goldLight, opacity: 0.45,
                    top: x === -1 ? '5px' : undefined, bottom: x === 1 ? '5px' : undefined,
                    left: y === -1 ? '5px' : undefined, right: y === 1 ? '5px' : undefined,
                  }} />
                ))}
                <span
                  className="relative z-10 text-center px-2 leading-tight"
                  style={{
                    color: numColor,
                    fontFamily: timeline.font || 'var(--v-font-display)',
                    fontSize: 'clamp(0.6rem, 1.6vw, 0.85rem)',
                    fontStyle: 'italic',
                  }}
                >
                  {step.title}
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.2em] uppercase"
                style={{ color: lblColor, fontFamily: 'var(--v-font-utility)' }}
              >
                {step.time}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
