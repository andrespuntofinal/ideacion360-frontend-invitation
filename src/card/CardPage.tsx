import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { CardProvider } from './CardContext';
import Envelope from './components/Envelope';
import Landing2 from './components/Landing2';

import { useCardConfig } from './CardContext';

function CardContent({ view, setView }: { view: 'landing1' | 'landing2', setView: (v: 'landing1' | 'landing2') => void }) {
  const { loading, error } = useCardConfig();

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen" style={{ color: 'var(--color-purple-light)' }}>Cargando invitación...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-400">Error: {error}. Intenta recargar.</div>;
  }

  return (
    <main className="min-h-screen w-full overflow-x-hidden">
      <AnimatePresence mode="wait">
        {view === 'landing1' ? (
          <Envelope key="landing1" onOpenComplete={() => setView('landing2')} />
        ) : (
          <Landing2 key="landing2" onClose={() => setView('landing1')} />
        )}
      </AnimatePresence>
    </main>
  );
}

export default function CardPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [view, setView] = useState<'landing1' | 'landing2'>('landing1');

  return (
    <CardProvider eventId={eventId}>
      <CardContent view={view} setView={setView} />
    </CardProvider>
  );
}
