import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { APP_CONFIG } from "../constants";

export default function Presents() {
  return (
    <section className="w-full h-full flex flex-col">
      <div className="w-full mx-auto flex-1 flex flex-col">
        <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-10 tracking-widest uppercase"
        style={{ color: APP_CONFIG.presents.titleColor, fontFamily: APP_CONFIG.presents.titleFont }}>
          {APP_CONFIG.presents.presentTitle}
        </h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`flex-1 py-8 px-4 md:p-10 rounded-none md:rounded-3xl shadow-xl flex flex-col items-center justify-center text-center relative overflow-hidden  gap-0`}
          style={{
          background: `linear-gradient(
          to bottom right,
          ${APP_CONFIG.presents.backgroundColorFrom},
          ${APP_CONFIG.presents.backgroundColorVia},
          ${APP_CONFIG.presents.backgroundColorTo}
          )`,
          border: `1px solid ${APP_CONFIG.presents.boderColor}`
          }}
          >
          <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-6 md:mb-8 `}
              style={{
              background: ` ${APP_CONFIG.presents.backgroundColorIconMoments}`,
              border: `3px solid ${APP_CONFIG.presents.borderColorIconMoments}`
              }}
              >
            <Mail className="w-8 h-8 md:w-12 md:h-12"
            style={{ color: APP_CONFIG.presents.iconColor }}/>
          </div>
          
          <p className="text-xs sm:text-sm md:text-base leading-relaxed max-w-2xl"
          style={{ color: APP_CONFIG.presents.textColor, fontFamily: APP_CONFIG.presents.textFont}}>         
            {APP_CONFIG.presents.presentMessage}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
