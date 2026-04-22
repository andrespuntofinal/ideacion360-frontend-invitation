import { motion } from 'framer-motion';
import { useCardConfig } from '../CardContext';

export default function Message() {
  const { config } = useCardConfig();
  const { message } = config;
  return (
    <section className="py-20 px-6 text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto">
        <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorText1 as string, fontFamily: message.font as string }}>{message.text1 as string}</p>
        <br />
        <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorParents as string, fontFamily: message.font as string }}>{message.groomParents as string}</p>
        <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorParents as string, fontFamily: message.font as string }}>{message.brideParents as string}</p>
        <br />
        <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorText1 as string, fontFamily: message.font as string }}>{message.text2 as string}</p>
      </motion.div>
    </section>
  );
}
