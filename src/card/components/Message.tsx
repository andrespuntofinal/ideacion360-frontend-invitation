import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function Message() {
  const { config } = useCardConfig();
  const { message } = config;

  return (
    <section className="w-full py-24 md:py-36 px-6 relative overflow-hidden flex justify-center">
      <div className="w-full max-w-4xl flex flex-col items-center text-center relative z-10">
        {/* Top floral ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="flex items-center justify-center gap-4 mb-12"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: message.colorParents, opacity: 0.4 }} />
          <span style={{ color: message.colorParents, fontSize: '1.4rem', opacity: 0.7 }}>❧</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: message.colorParents, opacity: 0.4 }} />
        </motion.div>

        {/* Main verse */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: 'easeOut' }}
          className="text-xl md:text-2xl italic leading-relaxed"
          style={{ color: message.colorText1, fontFamily: message.font }}
        >
          "{message.text1}"
        </motion.p>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="h-px w-24 mx-auto mb-10"
          style={{ backgroundColor: message.colorParents, opacity: 0.4 }}
        />

        {/* Parents */}
        {(message.groomParents || message.brideParents) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.9 }}
            className="space-y-1 mb-10"
          >
            {message.groomParents && (
              <p
                className="text-sm md:text-base tracking-widest uppercase"
                style={{ color: message.colorParents, fontFamily: message.font, opacity: 0.85 }}
              >
                {message.groomParents}
              </p>
            )}
            {message.brideParents && (
              <p
                className="text-sm md:text-base tracking-widest uppercase"
                style={{ color: message.colorParents, fontFamily: message.font, opacity: 0.85 }}
              >
                {message.brideParents}
              </p>
            )}
          </motion.div>
        )}
        <br />

        {/* Second text */}
        {message.text2 && (
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.9 }}
            className="text-xl md:text-2xl italic leading-relaxed"
            style={{ color: message.colorText1, fontFamily: message.font, opacity: 0.9 }}
          >
            {message.text2}
          </motion.p>
        )}

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 1 }}
          className="flex items-center justify-center gap-4 mt-12"
        >
          <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: message.colorParents, opacity: 0.4 }} />
          <span style={{ color: message.colorParents, fontSize: '1.4rem', opacity: 0.7 }}>❧</span>
          <div className="h-px flex-1 max-w-[80px]" style={{ backgroundColor: message.colorParents, opacity: 0.4 }} />
        </motion.div>
      </div>
    </section>
  );
}
