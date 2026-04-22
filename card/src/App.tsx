import React, { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Envelope from "./components/Envelope";
import Landing2 from "./components/Landing2";

export default function App() {
  const [view, setView] = useState<"landing1" | "landing2">("landing1");

  const handleOpenComplete = () => {
    setView("landing2");
  };

  const handleClose = () => {
    setView("landing1");
  };

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === "landing1" ? (
          <Envelope key="landing1" onOpenComplete={handleOpenComplete} />
        ) : (
          <Landing2 key="landing2" onClose={handleClose} />
        )}
      </AnimatePresence>
    </main>
  );
}
