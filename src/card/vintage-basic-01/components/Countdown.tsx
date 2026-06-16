import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';
import '../vintage.css';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

const labels = ['Días', 'Horas', 'Min', 'Seg'];

export default function Countdown() {
  const { config } = useCardConfig();
  const { countdown, weddingData } = config;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const datePart = weddingData.weddingDate.substring(0, 10);
    const timePart = weddingData.weddingTime || '00:00';
    const targetISO = `${datePart}T${timePart.length === 5 ? timePart + ':00' : timePart}-05:00`;
    const targetDate = new Date(targetISO).getTime();

    const timer = setInterval(() => {
      const distance = targetDate - Date.now();
      if (distance < 0) { clearInterval(timer); setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 }); return; }
      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [weddingData.weddingDate, weddingData.weddingTime]);

  const items = [
    { label: labels[0], value: timeLeft.days },
    { label: labels[1], value: timeLeft.hours },
    { label: labels[2], value: timeLeft.minutes },
    { label: labels[3], value: timeLeft.seconds },
  ];

  // Vintage dark background derived from countdown config or fallback
  const fromColor = countdown.backgroundColorFrom || '#2C1F14';
  const viaColor  = countdown.backgroundColorVia  || '#4A3728';
  const toColor   = countdown.backgroundColorTo   || '#3D2B1F';
  const goldLight = countdown.borderColorCircle   || '#C9A84C';
  const circBg    = countdown.backgroundColorCircle || '#4A3728';
  const numColor  = countdown.numberColorText1    || '#C9A84C';
  const lblColor  = countdown.numberColorText2    || '#9C8778';

  return (
    <section
      className="w-full relative overflow-hidden py-20 md:py-28 px-4 flex flex-col items-center"
      style={{ background: `linear-gradient(135deg, ${fromColor} 0%, ${viaColor} 50%, ${toColor} 100%)` }}
    >
      {/* Subtle cross-hatch grain overlay */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '36px 36px',
        }}
      />

      {/* Decorative gold top border line */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${goldLight}60, transparent)` }}
      />
      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: `linear-gradient(to right, transparent, ${goldLight}60, transparent)` }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Section eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 md:mb-16"
        >
          {/* Vintage decorative label */}
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
            {countdown.titleTextMsg || 'La espera casi termina'}
          </p>
        </motion.div>

        {/* Counters */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-12 lg:gap-16">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Vintage square frame instead of circle */}
              <div
                className="relative flex items-center justify-center mb-3"
                style={{
                  width: 'clamp(72px, 18vw, 120px)',
                  height: 'clamp(72px, 18vw, 120px)',
                  backgroundColor: circBg,
                  border: `1px solid ${goldLight}60`,
                  boxShadow: `inset 0 0 20px rgba(0,0,0,0.3), 0 4px 20px rgba(0,0,0,0.25)`,
                }}
              >
                {/* Inner gold border */}
                <div
                  className="absolute inset-[5px]"
                  style={{ border: `1px solid ${goldLight}30` }}
                />
                {/* Corner dots */}
                {[[-1,-1],[1,-1],[1,1],[-1,1]].map(([x, y], i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1"
                    style={{
                      backgroundColor: goldLight,
                      opacity: 0.5,
                      top: x === -1 ? '6px' : undefined,
                      bottom: x === 1 ? '6px' : undefined,
                      left: y === -1 ? '6px' : undefined,
                      right: y === 1 ? '6px' : undefined,
                    }}
                  />
                ))}
                <span
                  className="relative z-10 leading-none font-light"
                  style={{
                    color: numColor,
                    fontFamily: countdown.numberFontText || 'var(--v-font-display)',
                    fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
                    fontStyle: 'italic',
                  }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span
                className="text-[10px] tracking-[0.25em] uppercase"
                style={{ color: lblColor, fontFamily: 'var(--v-font-utility)' }}
              >
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
