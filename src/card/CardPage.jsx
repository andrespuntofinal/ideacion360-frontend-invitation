import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CardProvider } from './CardContext';
import Envelope from './components/Envelope';
import Landing2 from './components/Landing2';

export default function CardPage() {
    const { eventId } = useParams();
    const [view, setView] = useState('landing1');

    return (
        <CardProvider eventId={eventId}>
            <main className="min-h-screen w-full overflow-x-hidden">
                <AnimatePresence mode="wait">
                    {view === 'landing1' ? (
                        <Envelope key="landing1" onOpenComplete={() => setView('landing2')} />
                    ) : (
                        <Landing2 key="landing2" onClose={() => setView('landing1')} />
                    )}
                </AnimatePresence>
            </main>
        </CardProvider>
    );
}
