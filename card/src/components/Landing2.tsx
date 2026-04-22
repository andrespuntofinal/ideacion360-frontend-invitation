import React from "react";
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
import { APP_CONFIG } from "../constants";

interface Landing2Props {
  onClose: () => void;
  key?: string;
}

export default function Landing2({ onClose }: Landing2Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen w-full relative"
      style={{ backgroundColor: APP_CONFIG.message.backgroundcolor }}
    >
      {/* Subtle Floral Background */}
      <div 
        className="fixed inset-0 z-0 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `url(${APP_CONFIG.message.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      />

       <div className="relative z-10 pb-24">
        <Banner />
        <Message />
        <Countdown />
        <Calendar />
        <div className="w-full  py-12 md:py-2 my-4 md:my-12">
          <div className="max-w-[130rem] mx-auto  grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-22 px-0 md:px-8">
        <EventDetails />
        <DressCode />
          </div>
        </div>
        <div className="w-full py-0 md:py-20 my-4 md:my-12">
          <div className="max-w-[130rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-22 px-0 md:px-8">
            <ChildRestriction />
            <Presents />
          </div>
        </div>
        <Carousel />
        
        <RSVP />
      </div>
      
      <FooterControls onClose={onClose} />
    </motion.div>
  );
}
