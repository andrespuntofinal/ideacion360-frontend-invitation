import React from "react";
import { motion } from "framer-motion";
import { APP_CONFIG } from "../constants";
import * as Icons from "lucide-react";

export default function Timeline() {
  const { timeline } = APP_CONFIG;

  const steps = [
    { time: timeline.timeStep1, title: timeline.textStep1, iconName: timeline.iconStep1 },
    { time: timeline.timeStep2, title: timeline.textStep2, iconName: timeline.iconStep2 },
    { time: timeline.timeStep3, title: timeline.textStep3, iconName: timeline.iconStep3 },
    { time: timeline.timeStep4, title: timeline.textStep4, iconName: timeline.iconStep4 },
    { time: timeline.timeStep5, title: timeline.textStep5, iconName: timeline.iconStep5 },
  ];

  const renderIcon = (iconName: string) => {
    const IconComponent = (Icons as any)[iconName] || Icons.Circle;
    return <IconComponent className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-[#D7B272] group-hover:text-[#F7F9FA] transition-colors duration-300 mb-0.5 md:mb-1" strokeWidth={1.5} />;
  };

  return (
    <section className="w-full my-4 md:my-12 md:rounded-3xl border-3 border-[#A5ADB8]/30 backdrop-blur-lg relative overflow-hidden py-12 px-2 md:px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-serif text-2xl md:text-3xl text-center mb-8 md:mb-12 tracking-widest uppercase text-[#735309]">
          Itinerario
        </h2>

        <div className="relative w-full px-1 md:px-4">
          {/* Horizontal line for both mobile and desktop */}
          <div className="absolute top-1/2 left-[5%] right-[5%] h-0.5 bg-[#A5ADB8] -translate-y-1/2 z-0" />

          <div className="flex flex-row justify-between items-center gap-1 sm:gap-2 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group w-[19%] max-w-[130px]"
              >
                <div className="w-full aspect-square bg-gradient-to-br from-[#19284c] via-[#5c678d] to-[#19284c] rounded-full flex flex-col items-center justify-center border-4 border-[#A5ADB8] shadow-md group-hover:scale-105 group-hover:bg-[#616E33]/30 group-hover:border-[#F7F9FA] transition-all duration-300 p-1 sm:p-2">
                  {renderIcon(step.iconName)}
                  <span className="text-[7px] sm:text-[9px] md:text-xs font-bold tracking-widest uppercase text-[#D7B272] group-hover:text-[#F7F9FA] leading-none mb-0.5 md:mb-1 transition-colors duration-300">
                    {step.time}
                  </span>
                  <h3 className="text-[7px] sm:text-[10px] md:text-sm font-serif text-[#F7F9FA] leading-tight px-0.5 line-clamp-2">
                    {step.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
