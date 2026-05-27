import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { LucideProps } from 'lucide-react';
import { useCardConfig } from '../CardContext';

type IconName = keyof typeof Icons;

export default function Timeline() {
  const { config } = useCardConfig();
  const { timeline, eventDetails } = config;

  const steps = [
    { time: timeline.timeStep1, title: timeline.textStep1, iconName: timeline.iconStep1 as IconName },
    { time: timeline.timeStep2, title: timeline.textStep2, iconName: timeline.iconStep2 as IconName },
    { time: timeline.timeStep3, title: timeline.textStep3, iconName: timeline.iconStep3 as IconName },
    { time: timeline.timeStep4, title: timeline.textStep4, iconName: timeline.iconStep4 as IconName },
    { time: timeline.timeStep5, title: timeline.textStep5, iconName: timeline.iconStep5 as IconName },
  ];

  const renderIcon = (iconName: IconName) => {
    const IconComponent = (Icons[iconName] || Icons.Circle) as React.ComponentType<LucideProps>;
    return <IconComponent className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />;
  };

  return (
    <section className="w-full py-16 md:py-24 px-4 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center mb-12 md:mb-16"
      >
        <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: timeline.font ? undefined : '#735309', opacity: 0.6 }}>
          ✦ &nbsp; Agenda &nbsp; ✦
        </p>
        <p className="text-base sm:text-2xl italic leading-relaxed uppercase mb-2" style={{ color: eventDetails.detailsColor, fontFamily: eventDetails.detailsFont }}>
          ♥ &nbsp; Itinerario &nbsp; ♥
        </p>
      </motion.div>

      {/* Desktop: horizontal timeline */}
      <div className="max-w-5xl mx-auto hidden md:block">
        <div className="relative flex justify-between items-start">
          {/* Connector line */}
          <div className="absolute top-[30px] left-[8%] right-[8%] h-px opacity-30" style={{ backgroundColor: '#A5ADB8' }} />

          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.7 }}
              className="flex flex-col items-center text-center w-[18%] group"
            >
              {/* Icon bubble */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mb-4 z-10 transition-transform duration-300 group-hover:scale-110 shadow-lg"
                style={{ fontFamily: timeline.font }}
              >
                <div className="w-14 h-14 rounded-full flex flex-col items-center justify-center shadow-md"
                  style={{ background: 'linear-gradient(135deg, #19284c, #5c678d)' }}>
                  <span style={{ color: '#D7B272' }}>{renderIcon(step.iconName)}</span>
                </div>
              </div>

              {/* Time */}
              <span
                className="text-xs font-medium tracking-widest uppercase mb-1"
                style={{ fontFamily: timeline.font, color: '#D7B272' }}
              >
                {step.time}
              </span>

              {/* Label */}
              <h3
                className="text-sm leading-tight"
                style={{ fontFamily: timeline.font, color: '#F7F9FA' }}
              >
                {step.title}
              </h3>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden max-w-sm mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-[28px] top-4 bottom-4 w-px opacity-20" style={{ backgroundColor: '#A5ADB8' }} />

        <div className="space-y-6">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="flex items-center gap-5 relative"
            >
              {/* Icon bubble */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow-md"
                style={{ background: 'linear-gradient(135deg, #19284c, #5c678d)' }}
              >
                <span style={{ color: '#D7B272' }}>{renderIcon(step.iconName)}</span>
              </div>

              {/* Text */}
              <div>
                <span
                  className="text-xs tracking-widest uppercase block mb-0.5"
                  style={{ fontFamily: timeline.font, color: '#D7B272' }}
                >
                  {step.time}
                </span>
                <h3
                  className="text-base font-medium"
                  style={{ fontFamily: timeline.font, color: '#F7F9FA' }}
                >
                  {step.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
