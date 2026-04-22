import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

export default function Countdown() {
  const { config } = useCardConfig();
  const { countdown, weddingData } = config;
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    // Treat the wedding date and time as Colombia local time (UTC-5)
    const datePart = weddingData.weddingDate.substring(0, 10);
    const timePart = weddingData.weddingTime || '00:00';
    const targetISO = `${datePart}T${timePart.length === 5 ? timePart + ':00' : timePart}-05:00`;
    const targetDate = new Date(targetISO).getTime();

    const timer = setInterval(() => {
      const distance = targetDate - Date.now();
      if (distance < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
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
    { label: 'Días', value: timeLeft.days },
    { label: 'Horas', value: timeLeft.hours },
    { label: 'Minutos', value: timeLeft.minutes },
    { label: 'Segundos', value: timeLeft.seconds },
  ];

  return (
    <section
      className="w-full relative overflow-hidden py-20 md:py-28 px-4 flex flex-col items-center"
      style={{
        background: `linear-gradient(135deg, ${countdown.backgroundColorFrom} 0%, ${countdown.backgroundColorVia} 50%, ${countdown.backgroundColorTo} 100%)`,
      }}
    >
      {/* Decorative ring overlay */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'radial-gradient(circle at 50% 50%, white 1px, transparent 1px)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl flex flex-col items-center text-center">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-20"
        >
          <p
            className="text-base sm:text-lg md:text-xl lg:text-2xl font-semibold md:font-bold tracking-[0.15em] md:tracking-[0.25em] uppercase mb-2"
            style={{ color: countdown.titleTextColor, opacity: 0.8, fontFamily: countdown.titleTextFont }}
          >
            {countdown.titleTextMsg}
          </p>
          <br />
          <br />

        </motion.div>

        {/* Counters */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 lg:gap-14">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12, duration: 0.7, ease: 'easeOut' }}
              className="flex flex-col items-center"
            >
              {/* Circle */}
              <div
                className="relative flex items-center justify-center rounded-full shadow-2xl mb-3 md:mb-4"
                style={{
                  width: 'clamp(70px, 18vw, 130px)',
                  height: 'clamp(70px, 18vw, 130px)',
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
                  className="relative z-10 leading-none font-light"
                  style={{
                    color: countdown.numberColorText1,
                    fontFamily: countdown.numberFontText,
                    fontSize: 'clamp(1.5rem, 5vw, 2.8rem)',
                  }}
                >
                  {String(item.value).padStart(2, '0')}
                </span>
              </div>
              <span
                className="text-[10px] sm:text-xs md:text-sm tracking-[0.2em] uppercase"
                style={{ color: countdown.numberColorText2, fontFamily: countdown.numberFontText }}
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
