import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { eventsService } from '../services/api';
import type { CardConfig, CardContextValue } from '../types';

// ─── Default fallback config (mirrors constants.ts values) ────────────────────
export const DEFAULT_CONFIG: CardConfig = {
  paramsGeneral: {
    guestName: 'Invitado',
    numberGuests: 2,
  },
  weddingData: {
    weddingDate: '2026-09-19T17:00:00',
    weddingTime: '17:00',
    coupleNames: 'Juan & Laura',
  },
  activeComponents: {
    banner: true, calendar: true, carousel: true, childRestriction: true,
    countdown: true, dressCode: true, envelope: true, eventDetails: true,
    message: true, presents: true, rsvp: true, timeline: true,
  },
  envelope: {
    sealColor: '#9b958d', envelopeColor: '#19284c', envelopeColorDeg: '#5c678d',
    innerColor: '#ffffff', cardCouplePhoto: '', textureUrl: '',
    envelopeMsg: 'Nuestra historia sigue creciendo', envelopeMsgColor: '#F7F9FA',
    envelopeFont: "'Cormorant Garamond', serif", sealImage: '',
    confettiColors: ['#b45309', '#fef3c7', '#ffffff'], overlayColor: 'rgba(255,255,255,0.4)',
    cardBackgroundColor: '#fdfbf7', accentColor: '#d4af37', textColor: '#57534e',
    textDarkColor: '#44403c', photoBackgroundColor: '#ffffff',
    titleFont: "'Playfair Display', serif", initialsCoupleTextColor: '#F7F9FA',
    initialsCoupleText: 'J&L', cardMessageforguestsText: 'Nos honra invitar a:',
    backgroundImage: '',
  },
  banner: {
    videoDesktop: '', videoResponsive: '', titleFont: "'Playfair Display', serif",
    textColor: '#F7F9FA', subtitleFont: "'Playfair Display', serif", subtextMsg: 'Nuestra Boda',
    musicUrl: '',
  },
  message: {
    text1: 'Más valen dos que uno.', text2: 'Con el corazón lleno de amor, te invitamos.',
    groomParents: 'Eclesiastés 4, 9-12', brideParents: '',
    font: "'Cormorant Garamond', serif", colorText1: '#19284c', colorParents: '#735309',
    backgroundImage: '', backgroundColor: '#F7F9FA',
  },
  countdown: {
    titleTextFont: "'Montserrat', sans-serif", titleTextColor: '#F7F9FA',
    titleTextMsg: 'La espera casi termina', boxShadowColor: '#d79972',
    borderColor: '#f8f7fa', backgroundColor2: '#A5ADB8', borderColorCircle: '#D7B272',
    backgroundColorCircle: '#E8E2D9', numberColorText1: '#735309', numberColorText2: '#27272B',
    numberFontText: "'Montserrat', sans-serif", backgroundColorFrom: '#19284c',
    backgroundColorVia: '#5c678d', backgroundColorTo: '#19284c', boderColor: '#A5ADB8',
  },
  calendar: {
    dateImg: '', titleTextColor: '#735309', titleTextFont: "'Montserrat', sans-serif",
    titleMsgText: "El día del 'SÍ'", monthColorText: '#27272B', monthFontText: "'Montserrat', sans-serif",
    dayweekColorText: '#735309', dayweekFontText: "'Montserrat', sans-serif",
    dayColorText1: '#A5ADB8', dayColorText2: '#F7F9FA', daySelectedColor: '#19284c',
  },
  carousel: {
    carouselMsg: 'Instantes que nos definen', images: [], autoPlayInterval: 6000,
    titleColor: '#735309', titleFont: "'Montserrat', sans-serif", buttonCloseColor: '#F7F9FA',
  },
  dressCode: {
    titletext: 'Código de Vestimenta', titleColor: '#735309', titleFont: "'Montserrat', sans-serif",
    dressCodeTextWomen: 'Formal - Color blanco reservado para la novia',
    dressCodeTextMen: 'Formal - Color azul reservado para el novio',
    dressCodeIconWomen: '', dressCodeIconMen: '', iconbackgroundColor: '#735309',
    titleWomen: 'Mujeres', titleMen: 'Hombres', title2Color: '#D7B272',
    title2Font: "'Montserrat', sans-serif", text2Color: '#F7F9FA', text2Font: "'Montserrat', sans-serif",
    backgroundColorFrom: '#19284c', backgroundColorVia: '#5c678d', backgroundColorTo: '#19284c',
    boderColor: '#A5ADB8', backgroundColorIconMoments: '#e8dcd9', borderColorIconMoments: '#D7B272',
  },
  eventDetails: {
    detailsTitle: 'Detalles del Evento', detailsColor: '#735309', detailsFont: "'Montserrat', sans-serif",
    detailIconColor: '#735309', detailItemTitleColor: '#D7B272', detailItemTitleFont: "'Montserrat', sans-serif",
    detailItemText1Color: '#F7F9FA', detailItemText1Font: "'Montserrat', sans-serif",
    detailIcon2Color: '#d79f72', detailsMapsTitle: 'Cómo llegar',
    backgroundColorFrom: '#19284c', backgroundColorVia: '#5c678d', backgroundColorTo: '#19284c',
    boderColor: '#A5ADB8', backgroundColorIconMoments: '#e8dcd9', borderColorIconMoments: '#D7B272',
    ceremony: { title: 'Ceremonia', place: '', time: '' },
    celebration: { title: 'Celebración', place: '', time: '' },
    ceremonyMaps: '', celebrationMaps: '',
  },
  timeline: {
    font: "'Cormorant Garamond', serif",
    iconStep1: 'Church', iconStep2: 'Camera', iconStep3: 'Wine', iconStep4: 'Utensils', iconStep5: 'Music',
    textStep1: 'Ceremonia', textStep2: 'Recepción', textStep3: 'Brindis', textStep4: 'Cena', textStep5: 'Cierre',
    timeStep1: '4:00 pm', timeStep2: '6:00 pm', timeStep3: '6:30 pm', timeStep4: '7:00 pm', timeStep5: '8:00 pm',
  },
  presents: {
    presentTitle: 'Lluvia de sobres', presentMessage: 'Tu presencia es nuestro mayor regalo.',
    titleColor: '#735309', titleFont: "'Montserrat', sans-serif", iconColor: '#735309',
    textColor: '#f8faf7', textFont: "'Montserrat', sans-serif",
    backgroundColorFrom: '#19284c', backgroundColorVia: '#5c678d', backgroundColorTo: '#19284c',
    boderColor: '#A5ADB8', backgroundColorIconMoments: '#e8dcd9', borderColorIconMoments: '#D7B272',
  },
  childRestriction: {
    childrestrictionTitle: 'Recomendaciones',
    childrestrictionMessage: 'Celebración íntima solo para adultos.',
    titleColor: '#735309', titleFont: "'Montserrat', sans-serif",
    iconColor: '#735309', textColor: '#F7F9FA', textFont: "'Montserrat', sans-serif",
    backgroundColorFrom: '#19284c', backgroundColorVia: '#5c678d', backgroundColorTo: '#19284c',
    boderColor: '#A5ADB8', backgroundColorIconMoments: '#e8dcd9', borderColorIconMoments: '#D7B272',
  },
  rsvp: {
    buttonText: 'Confirmar tu asistencia',
    successMessage: '¡Genial! Tu presencia hará nuestra fiesta aún más especial.',
    rejectedMessage: 'Gracias por notificarnos.',
    buttonColor: '#19284c', buttonTextColor: '#F7F9FA', buttonTextFont: "'Montserrat', sans-serif",
    title2TextColor: '#D7B272', title2TextFont: "'Montserrat', sans-serif", title2TextMsg: 'Confirmar asistencia',
    title3TextColor: '#27272B', title3TextFont: "'Montserrat', sans-serif", title3TextMsg: '¿Asistirás al evento?',
    buttonYes1Style: { backgroundColor: '#19284c', color: '#A5ADB8', borderColor: '#A5ADB8', fontFamily: "'Montserrat', sans-serif" },
    buttonYes2Style: { backgroundColor: '#E8E2D9', color: '#A5ADB8', borderColor: '#D7B272', fontFamily: "'Montserrat', sans-serif" },
    buttonNot1Style: { backgroundColor: '#E8E2D9', color: '#A5ADB8', borderColor: '#D7B272', fontFamily: "'Montserrat', sans-serif" },
    buttonNot2Style: { backgroundColor: '#19284c', color: '#A5ADB8', borderColor: '#A5ADB8', fontFamily: "'Montserrat', sans-serif" },
    buttonSendStyle: { backgroundColor: '#19284c', color: '#A5ADB8', borderColor: '#A5ADB8', fontFamily: "'Montserrat', sans-serif" },
    buttonYesMsg: 'Sí asistiré', buttonNotMsg: 'No podré asistir',
    msgTextColor: '#27272B', msgTextFont: "'Montserrat', sans-serif", msgTextMsg: 'Mensaje para los novios',
    textareaStyle: { backgroundColor: '#F7F9FA', colorText: '#19284c', borderColor: '#A5ADB8', fontFamily: "'Montserrat', sans-serif" },
    buttonSendMsg: 'Confirmar Asistencia',
    confirmationTitleTextColor: '#19284c', confirmationTitleTextFont: "'Montserrat', sans-serif",
    confirmationTitleTextMsg: '', confirmationCircleColor: '#D7B272',
    confirmationTextFont: "'Montserrat', sans-serif", confirmationTextColor: '#27272B',
  },
  webhookUrl: '',
};

// ─── Context ───────────────────────────────────────────────────────────────────
const CardContext = createContext<CardContextValue | null>(null);

// ─── Provider ─────────────────────────────────────────────────────────────────
interface CardProviderProps {
  eventId?: string;
  children: ReactNode;
}

export function CardProvider({ eventId, children }: CardProviderProps) {
  const location = useLocation();

  const [config, setConfig] = useState<CardConfig>(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const urlGuestName = searchParams.get('guestName');
    const urlNumberGuests = searchParams.get('numberGuests');

    return {
      ...DEFAULT_CONFIG,
      paramsGeneral: {
        guestName: urlGuestName || DEFAULT_CONFIG.paramsGeneral.guestName,
        numberGuests: urlNumberGuests ? parseInt(urlNumberGuests) : DEFAULT_CONFIG.paramsGeneral.numberGuests,
      },
      weddingData: DEFAULT_CONFIG.weddingData
    };
  });

  const [activeComponents, setActiveComponents] = useState(DEFAULT_CONFIG.activeComponents);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<'draft' | 'active' | 'inactive' | 'canceled' | 'completed' | null>(null);

  useEffect(() => {
    if (!eventId) { setLoading(false); return; }
    setLoading(true);

    const searchParams = new URLSearchParams(location.search);
    const urlGuestName = searchParams.get('guestName');
    const urlNumberGuests = searchParams.get('numberGuests');

    const merge = <T extends object>(defaults: T, overrides?: any): T => {
      if (!overrides) return defaults;
      const result = { ...defaults };
      for (const key of Object.keys(overrides) as (keyof T)[]) {
        const val = overrides[key];
        if (val !== null && val !== undefined && val !== '') {
          result[key] = val as T[typeof key];
        }
      }
      return result;
    };

    const fetchPromise = eventId.length < 36
      ? eventsService.getByToken(eventId).then(res => ({
        event: res.data.data.event,
        guestName: res.data.data.guest?.name,
        numberGuests: res.data.data.guest?.companions
      }))
      : eventsService.getById(eventId).then(res => ({
        event: res.data.data,
        guestName: urlGuestName,
        numberGuests: urlNumberGuests
      }));

    fetchPromise
      .then(({ event, guestName, numberGuests }) => {
        const comps = event.components || {};
        const active = event.activeComponents || {};
        const wedding = event.wedding || {};

        setConfig(prev => ({
          ...prev,
          paramsGeneral: {
            guestName: guestName || prev.paramsGeneral.guestName,
            numberGuests: numberGuests ? parseInt(String(numberGuests)) : prev.paramsGeneral.numberGuests,
          },
          weddingData: {
            weddingDate: wedding.weddingDate ? new Date(wedding.weddingDate).toISOString() : DEFAULT_CONFIG.weddingData.weddingDate,
            weddingTime: wedding.weddingTime || DEFAULT_CONFIG.weddingData.weddingTime,
            coupleNames: wedding.coupleNames || DEFAULT_CONFIG.weddingData.coupleNames,
          },
          webhookUrl: event.components?.rsvp?.webhookUrl || DEFAULT_CONFIG.webhookUrl,
          envelope: merge(DEFAULT_CONFIG.envelope, comps.envelope),
          banner: merge(DEFAULT_CONFIG.banner, comps.banner),
          message: {
            ...merge(DEFAULT_CONFIG.message, comps.message),
            backgroundColor: (comps.message as any)?.backgroundColor || DEFAULT_CONFIG.message.backgroundColor,
          },
          countdown: merge(DEFAULT_CONFIG.countdown, comps.countdown),
          calendar: merge(DEFAULT_CONFIG.calendar, comps.calendar),
          carousel: merge(DEFAULT_CONFIG.carousel, comps.carousel),
          dressCode: merge(DEFAULT_CONFIG.dressCode, comps.dressCode),
          eventDetails: {
            ...merge(DEFAULT_CONFIG.eventDetails, comps.eventDetails),
            ceremony: merge(DEFAULT_CONFIG.eventDetails.ceremony, (comps.eventDetails as any)?.ceremony),
            celebration: merge(DEFAULT_CONFIG.eventDetails.celebration, (comps.eventDetails as any)?.celebration),
          } as any,
          timeline: merge(DEFAULT_CONFIG.timeline, comps.timeline),
          presents: merge(DEFAULT_CONFIG.presents, comps.presents),
          childRestriction: merge(DEFAULT_CONFIG.childRestriction, comps.childRestriction),
          rsvp: {
            ...merge(DEFAULT_CONFIG.rsvp, comps.rsvp),
            buttonYes1Style: merge(DEFAULT_CONFIG.rsvp.buttonYes1Style as object, (comps.rsvp as any)?.buttonYes1Style),
            buttonYes2Style: merge(DEFAULT_CONFIG.rsvp.buttonYes2Style as object, (comps.rsvp as any)?.buttonYes2Style),
            buttonNot1Style: merge(DEFAULT_CONFIG.rsvp.buttonNot1Style as object, (comps.rsvp as any)?.buttonNot1Style),
            buttonNot2Style: merge(DEFAULT_CONFIG.rsvp.buttonNot2Style as object, (comps.rsvp as any)?.buttonNot2Style),
            buttonSendStyle: merge(DEFAULT_CONFIG.rsvp.buttonSendStyle as object, (comps.rsvp as any)?.buttonSendStyle),
            textareaStyle: merge(DEFAULT_CONFIG.rsvp.textareaStyle as object, (comps.rsvp as any)?.textareaStyle),
          } as any,
        }));
        setActiveComponents({ ...DEFAULT_CONFIG.activeComponents, ...active });
        setStatus(event.status);
        setLoading(false);
      })
      .catch((err: Error) => {
        console.error('Error loading event config:', err);
        setError(err.message);
        setLoading(false);
      });
  }, [eventId, location.search]);

  return (
    <CardContext.Provider value={{ config, activeComponents, loading, error, status }}>
      {children}
    </CardContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useCardConfig(): CardContextValue {
  const ctx = useContext(CardContext);
  if (!ctx) throw new Error('useCardConfig must be used within CardProvider');
  return ctx;
}
