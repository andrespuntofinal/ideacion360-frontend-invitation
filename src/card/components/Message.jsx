import { motion } from "framer-motion";
import { useCardConfig } from "../CardContext";

export default function Message() {
    const { config } = useCardConfig();
    const { message } = config;
    return (
        <section className="py-20 px-6 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto">
                <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorText1, fontFamily: message.font }}>{message.text1}</p>
                <br />
                <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorParents, fontFamily: message.font }}>{message.groomParents}</p>
                <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorParents, fontFamily: message.font }}>{message.brideParents}</p>
                <br />
                <p className="text-2xl md:text-3xl italic leading-relaxed" style={{ color: message.colorText1, fontFamily: message.font }}>{message.text2}</p>
            </motion.div>
        </section>
    );
}
