import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { eventsService } from '../services/api';
import ElegantCardPage from './elegant-basic-01/CardPage';
import VintageCardPage from './vintage-basic-01/CardPage';

export default function CardPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const [cardType, setCardType] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!eventId) {
      setLoading(false);
      return;
    }
    setLoading(true);

    const fetchPromise = eventId.length < 36
      ? eventsService.getByToken(eventId).then(res => res.data.data.event)
      : eventsService.getById(eventId).then(res => res.data.data);

    fetchPromise
      .then((event) => {
        const type = event?.wedding?.cardType || 'elegant-basic-01';
        setCardType(type);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error('Error fetching event cardType:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [eventId]);

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen" style={{ color: 'var(--color-purple-light)' }}>Cargando invitación...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen text-red-400">Error: {error}. Intenta recargar.</div>;
  }

  if (cardType === 'vintage-basic-01') {
    return <VintageCardPage />;
  }

  // Default to elegant-basic-01
  return <ElegantCardPage />;
}
