import { motion } from "framer-motion";
import Banner from "./Banner";
import Message from "./Message";
import Countdown from "./Countdown";
import Calendar from "./Calendar";
import Carousel from "./Carousel";
import DressCode from "./DressCode";
import EventDetails from "./EventDetails";
import Timeline from "./Timeline";
import Presents from "./Presents";
import ChildRestriction from "./ChildRestriction";
import RSVP from "./RSVP";
import FooterControls from "./FooterControls";
import { useCardConfig } from "../CardContext";

export default function Landing2({ onClose }) {
    const { config, activeComponents } = useCardConfig();
    const { message } = config;

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="min-h-screen w-full relative"
            style={{ backgroundColor: message.backgroundColor || message.backgroundcolor }}>
            {/* Subtle Floral Background */}
            <div className="fixed inset-0 z-0 opacity-25 pointer-events-none"
                style={{ backgroundImage: `url(${message.backgroundImage})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }} />

            <div className="relative z-10 pb-24">
                {activeComponents.banner && <Banner />}
                {activeComponents.message && <Message />}
                {activeComponents.countdown && <Countdown />}
                {activeComponents.calendar && <Calendar />}

                <div className="w-full py-12 md:py-2 my-4 md:my-12">
                    <div className="max-w-[130rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-22 px-0 md:px-8">
                        {activeComponents.eventDetails && <EventDetails />}
                        {activeComponents.dressCode && <DressCode />}
                    </div>
                </div>

                <div className="w-full py-0 md:py-20 my-4 md:my-12">
                    <div className="max-w-[130rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-22 px-0 md:px-8">
                        {activeComponents.childRestriction && <ChildRestriction />}
                        {activeComponents.presents && <Presents />}
                    </div>
                </div>

                {activeComponents.carousel && <Carousel />}
                {activeComponents.timeline && <Timeline />}
                {activeComponents.rsvp && <RSVP />}
            </div>

            <FooterControls onClose={onClose} />
        </motion.div>
    );
}
