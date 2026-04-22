import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { APP_CONFIG } from "../constants";

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const targetDate = new Date(APP_CONFIG.paramsGeneral.weddingDate).getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(timer);
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
  }, []);

  const items = [
    { label: "Días", value: timeLeft.days },
    { label: "Horas", value: timeLeft.hours },
    { label: "Minutos", value: timeLeft.minutes },
    { label: "Segundos", value: timeLeft.seconds },
  ];

  return (
    <section className={`w-full my-4 md:my-12 md:rounded-3xl  backdrop-blur-lg  relative overflow-hidden py-12 px-2 md:px-6 flex flex-col justify-center`}
    style={{
    background: `linear-gradient(
      to bottom right,
      ${APP_CONFIG.countdown.backgroundColorFrom},
      ${APP_CONFIG.countdown.backgroundColorVia},
      ${APP_CONFIG.countdown.backgroundColorTo}
    )`,
    border: `1px solid ${APP_CONFIG.countdown.boderColor}`
  }}
    >
      <div className="w-full max-w-3xl mx-auto text-center">
        <h2 className={`text-center mb-8 md:mb-16 tracking-widest uppercase text-2xl md:text-3xl`}
        style={{ color: APP_CONFIG.countdown.titleTextColor, fontFamily: APP_CONFIG.countdown.titleTextFont }}
        > {APP_CONFIG.countdown.titleTextMsg} </h2>
        
        
        <div className="flex flex-row justify-center items-center gap-2 md:gap-8">
          {items.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                boxShadow: APP_CONFIG.countdown.boxShadowColor,
                borderColor: APP_CONFIG.countdown.borderColor,
                backgroundColor: APP_CONFIG.countdown.backgroundColor2,
              }}
              className="flex flex-col items-center justify-center w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-4 shadow-xl  transition-all duration-300"
              style={{ borderColor: APP_CONFIG.countdown.borderColorCircle, backgroundColor: APP_CONFIG.countdown.backgroundColorCircle}}
            >
              <span className="text-2xl sm:text-3xl md:text-5xl leading-none"
              style={{ color: APP_CONFIG.countdown.numberColorText1, fontFamily:APP_CONFIG.countdown.numberFontText  }}>
                {item.value}
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs uppercase tracking-widest mt-1 md:mt-2"
               style={{ color: APP_CONFIG.countdown.numberColorText2, fontFamily:APP_CONFIG.countdown.numberFontText  }}>
                {item.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
