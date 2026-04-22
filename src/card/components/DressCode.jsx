import { motion } from "framer-motion";
import { useCardConfig } from "../CardContext";

export default function DressCode() {
    const { config } = useCardConfig();
    const { dressCode } = config;

    const details = [
        { title: dressCode.titleWomen, iconUrl: dressCode.dressCodeIconWomen, text: dressCode.dressCodeTextWomen },
        { title: dressCode.titleMen, iconUrl: dressCode.dressCodeIconMen, text: dressCode.dressCodeTextMen },
    ];

    return (
        <section className="w-full h-full flex flex-col">
            <div className="w-full mx-auto flex-1 flex flex-col">
                <h2 className="text-xl md:text-2xl text-center mb-6 md:mb-10 tracking-widest uppercase"
                    style={{ color: dressCode.titleColor, fontFamily: dressCode.titleFont }}>
                    {dressCode.titletext}
                </h2>
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    className="flex-1 py-6 px-1 md:p-10 rounded-none md:rounded-3xl shadow-xl flex flex-row items-start justify-center relative overflow-hidden divide-x divide-[#A5ADB8]/30 gap-0"
                    style={{
                        background: `linear-gradient(to bottom right, ${dressCode.backgroundColorFrom}, ${dressCode.backgroundColorVia}, ${dressCode.backgroundColorTo})`,
                        border: `1px solid ${dressCode.boderColor}`
                    }}>
                    {details.map((item) => (
                        <div key={item.title} className="flex-1 flex flex-col items-center text-center px-1 md:px-8 group w-full">
                            <div className="w-10 h-10 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3 md:mb-6"
                                style={{ background: dressCode.backgroundColorIconMoments, border: `2px solid ${dressCode.borderColorIconMoments}` }}>
                                <div className="w-5 h-5 md:w-12 md:h-12"
                                    style={{
                                        backgroundColor: dressCode.iconbackgroundColor,
                                        WebkitMaskImage: `url(${item.iconUrl})`, maskImage: `url(${item.iconUrl})`,
                                        WebkitMaskRepeat: "no-repeat", maskRepeat: "no-repeat",
                                        WebkitMaskSize: "contain", maskSize: "contain",
                                        WebkitMaskPosition: "center", maskPosition: "center"
                                    }} />
                            </div>
                            <h3 className="text-lg md:text-3xl mb-2 md:mb-4 leading-relaxed"
                                style={{ fontFamily: dressCode.title2Font, color: dressCode.title2Color }}>{item.title}</h3>
                            <p className="text-xs sm:text-sm md:text-base leading-relaxed"
                                style={{ fontFamily: dressCode.text2Font, color: dressCode.text2Color }}>{item.text}</p>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
