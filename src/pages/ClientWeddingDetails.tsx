import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Save, Music, Image, FileText, Heart, 
  MapPin, Calendar, Clock, Check, Gift, Baby, 
  ChevronDown, ChevronUp, AlertCircle, Plus, Minus, Sparkles
} from 'lucide-react';
import toast from 'react-hot-toast';
import api, { eventsService } from '../services/api';
import useAuthStore from '../stores/authStore';
import logoSitio from '../assets/logositio.jpg';

const parseWeddingTime = (timeStr: string) => {
  if (!timeStr) return { hour: '05', minute: '00', meridiem: 'p. m.' };
  
  const clean = timeStr.toLowerCase().trim();
  const match = clean.match(/^(\d{1,2}):(\d{2})\s*(a\.\s*m\.|p\.\s*m\.|am|pm)?$/);
  
  if (match) {
    let hrVal = parseInt(match[1]);
    let min = match[2];
    let mer = 'p. m.';
    
    if (match[3]) {
      const rawMer = match[3].replace(/\s/g, '');
      if (rawMer === 'am' || rawMer === 'a.m.') {
        mer = 'a. m.';
      }
    } else {
      if (hrVal >= 12) {
        if (hrVal > 12) hrVal -= 12;
        mer = 'p. m.';
      } else {
        mer = 'a. m.';
      }
    }
    
    if (hrVal === 0) hrVal = 12;
    const hr = String(hrVal).padStart(2, '0');
    
    return { hour: hr, minute: min, meridiem: mer };
  }
  
  return { hour: '05', minute: '00', meridiem: 'p. m.' };
};

const convertTo24Hour = (timeStr: string): string => {
  if (!timeStr) return '';
  const { hour, minute, meridiem } = parseWeddingTime(timeStr);
  let hr = parseInt(hour, 10);
  if (meridiem === 'p. m.') {
    if (hr !== 12) hr += 12;
  } else if (meridiem === 'a. m.') {
    if (hr === 12) hr = 0;
  }
  return `${String(hr).padStart(2, '0')}:${minute}`;
};

const ClientWeddingDetails = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const { user, token } = useAuthStore();

  const [event, setEvent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [openSection, setOpenSection] = useState<string | null>('general');
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Form states
  // 1. General & Time
  const [coupleNames, setCoupleNames] = useState('');
  const [weddingDate, setWeddingDate] = useState('');
  const [weddingTime, setWeddingTime] = useState('');

  // 2. Banner Music
  const [musicUrl, setMusicUrl] = useState('');
  const [musicFile, setMusicFile] = useState<File | null>(null);

  // 3. Envelope card
  const [cardCouplePhoto, setCardCouplePhoto] = useState('');
  const [cardCouplePhotoFile, setCardCouplePhotoFile] = useState<File | null>(null);
  const [envelopeMsg, setEnvelopeMsg] = useState('');
  const [initialsCoupleText, setInitialsCoupleText] = useState('');
  const [cardMessageforguestsText, setCardMessageforguestsText] = useState('');

  // 4. Main messages
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');

  // 5. Countdown
  const [titleTextMsg, setTitleTextMsg] = useState('');

  // 6. Calendar
  const [dateImg, setDateImg] = useState('');
  const [dateImgFile, setDateImgFile] = useState<File | null>(null);
  const [titleMsgText, setTitleMsgText] = useState('');

  // 7. Carousel
  const [carouselMsg, setCarouselMsg] = useState('');
  const [carouselImages, setCarouselImages] = useState<any[]>([]); // array of either url string or File object

  // 8. Event Details (Ceremonia / Celebración)
  const [ceremonyTitle, setCeremonyTitle] = useState('');
  const [ceremonyPlace, setCeremonyPlace] = useState('');
  const [ceremonyTime, setCeremonyTime] = useState('');
  const [ceremonyMaps, setCeremonyMaps] = useState('');

  const [celebrationTitle, setCelebrationTitle] = useState('');
  const [celebrationPlace, setCelebrationPlace] = useState('');
  const [celebrationTime, setCelebrationTime] = useState('');
  const [celebrationMaps, setCelebrationMaps] = useState('');

  // 9. RSVP
  const [successMessage, setSuccessMessage] = useState('');
  const [rejectedMessage, setRejectedMessage] = useState('');

  // 10. Dress Code
  const [dressCodeTextWomen, setDressCodeTextWomen] = useState('');
  const [dressCodeTextMen, setDressCodeTextMen] = useState('');

  // 11. Child restriction
  const [childrestrictionMessage, setChildrestrictionMessage] = useState('');

  // 12. Presents
  const [presentMessage, setPresentMessage] = useState('');

  useEffect(() => {
    // Basic auth check
    if (!token || user?.role !== 'client') {
      toast.error('Acceso no autorizado');
      navigate('/wedding/login');
      return;
    }

    if (eventId) {
      loadEventData();
    }
  }, [eventId, token]);

  const loadEventData = async () => {
    setIsLoading(true);
    try {
      if (token) {
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      const res = await eventsService.getById(eventId!);
      const eventData = res.data.data;
      setEvent(eventData);

      if (eventData.status === 'finalized') {
        toast.error('Evento Finalizado');
        navigate('/');
        return;
      }

      // Populate states
      // General
      setCoupleNames(eventData.wedding?.coupleNames || '');
      if (eventData.wedding?.weddingDate) {
        setWeddingDate(new Date(eventData.wedding.weddingDate).toISOString().split('T')[0]);
      }
      setWeddingTime(eventData.wedding?.weddingTime || '');

      // Components
      const banner = eventData.components?.banner || {};
      setMusicUrl(banner.musicUrl || '');

      const envelope = eventData.components?.envelope || {};
      setCardCouplePhoto(envelope.cardCouplePhoto || '');
      setEnvelopeMsg(envelope.envelopeMsg || '');
      setInitialsCoupleText(envelope.initialsCoupleText || '');
      setCardMessageforguestsText(envelope.cardMessageforguestsText || '');

      const message = eventData.components?.message || {};
      setText1(message.text1 || '');
      setText2(message.text2 || '');

      const countdown = eventData.components?.countdown || {};
      setTitleTextMsg(countdown.titleTextMsg || '');

      const calendar = eventData.components?.calendar || {};
      setDateImg(calendar.dateImg || '');
      setTitleMsgText(calendar.titleMsgText || '');

      const carousel = eventData.components?.carousel || {};
      setCarouselMsg(carousel.carouselMsg || '');
      setCarouselImages(carousel.images || []);

      const details = eventData.components?.eventDetails || {};
      setCeremonyTitle(details.ceremony?.title || '');
      setCeremonyPlace(details.ceremony?.place || '');
      setCeremonyTime(details.ceremony?.time || '');
      setCeremonyMaps(details.ceremonyMaps || '');

      setCelebrationTitle(details.celebration?.title || '');
      setCelebrationPlace(details.celebration?.place || '');
      setCelebrationTime(details.celebration?.time || '');
      setCelebrationMaps(details.celebrationMaps || '');

      const rsvp = eventData.components?.rsvp || {};
      setSuccessMessage(rsvp.successMessage || '');
      setRejectedMessage(rsvp.rejectedMessage || '');

      const dressCode = eventData.components?.dressCode || {};
      setDressCodeTextWomen(dressCode.dressCodeTextWomen || '');
      setDressCodeTextMen(dressCode.dressCodeTextMen || '');

      const childRestriction = eventData.components?.childRestriction || {};
      setChildrestrictionMessage(childRestriction.childrestrictionMessage || '');

      const presents = eventData.components?.presents || {};
      setPresentMessage(presents.presentMessage || '');

    } catch (error: any) {
      toast.error('Error al cargar detalles del evento');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setter: (f: File) => void) => {
    if (e.target.files && e.target.files[0]) {
      setter(e.target.files[0]);
    }
  };

  const handleCarouselImageChange = (index: number, file: File) => {
    const updated = [...carouselImages];
    updated[index] = file;
    setCarouselImages(updated);
  };

  const setCarouselImageCount = (count: number) => {
    const num = Math.max(0, count);
    const updated = Array.from({ length: num }, (_, i) => carouselImages[i] || '');
    setCarouselImages(updated);
  };

  const getPreviewUrl = (val: string | File) => {
    if (!val) return '';
    if (val instanceof File) {
      return URL.createObjectURL(val);
    }
    return val;
  };

  const handleSave = async () => {
    setIsSaving(true);
    const savingToast = toast.loading('Guardando cambios...');
    try {
      let finalMusicUrl = musicUrl;
      let finalCardCouplePhoto = cardCouplePhoto;
      let finalDateImg = dateImg;
      let finalCarouselImages = [...carouselImages];

      // 1. Upload files if any
      const formData = new FormData();
      let hasFiles = false;

      if (musicFile) {
        formData.append('musicUrl', musicFile);
        hasFiles = true;
      }
      if (cardCouplePhotoFile) {
        formData.append('cardCouplePhoto', cardCouplePhotoFile);
        hasFiles = true;
      }
      if (dateImgFile) {
        formData.append('dateImg', dateImgFile);
        hasFiles = true;
      }

      carouselImages.forEach((img, i) => {
        if (img instanceof File) {
          formData.append(`images_${i}`, img);
          hasFiles = true;
        }
      });

      if (hasFiles) {
        const uploadRes = await eventsService.uploadComponentFiles(eventId!, formData);
        if (uploadRes.data?.success) {
          const urlsMap = uploadRes.data?.data || {};
          
          if (urlsMap.musicUrl) finalMusicUrl = urlsMap.musicUrl;
          if (urlsMap.cardCouplePhoto) finalCardCouplePhoto = urlsMap.cardCouplePhoto;
          if (urlsMap.dateImg) finalDateImg = urlsMap.dateImg;

          finalCarouselImages = carouselImages.map((img, i) => {
            if (img instanceof File) {
              return urlsMap[`images_${i}`] || '';
            }
            return img;
          });
        } else {
          throw new Error('Error al subir los archivos de imagen o música');
        }
      }

      // 2. Perform component and general updates
      const updatePromises: Promise<any>[] = [];

      // A. General Wedding properties
      const weddingUpdate = {
        wedding: {
          coupleNames: coupleNames,
          weddingDate: weddingDate ? new Date(weddingDate).toISOString() : undefined,
          weddingTime: convertTo24Hour(weddingTime)
        }
      };
      updatePromises.push(eventsService.update(eventId!, weddingUpdate));

      // B. Banner Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'banner', {
        ...(event.components?.banner || {}),
        musicUrl: finalMusicUrl
      }));

      // C. Envelope Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'envelope', {
        ...(event.components?.envelope || {}),
        cardCouplePhoto: finalCardCouplePhoto,
        envelopeMsg,
        initialsCoupleText,
        cardMessageforguestsText
      }));

      // D. Message Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'message', {
        ...(event.components?.message || {}),
        text1,
        text2
      }));

      // E. Countdown Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'countdown', {
        ...(event.components?.countdown || {}),
        titleTextMsg
      }));

      // F. Calendar Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'calendar', {
        ...(event.components?.calendar || {}),
        dateImg: finalDateImg,
        titleMsgText
      }));

      // G. Carousel Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'carousel', {
        ...(event.components?.carousel || {}),
        carouselMsg,
        images: finalCarouselImages
      }));

      // H. EventDetails Component (Ceremonia / Celebración)
      updatePromises.push(eventsService.updateComponent(eventId!, 'eventDetails', {
        ...(event.components?.eventDetails || {}),
        ceremony: { title: ceremonyTitle, place: ceremonyPlace, time: ceremonyTime },
        celebration: { title: celebrationTitle, place: celebrationPlace, time: celebrationTime },
        ceremonyMaps,
        celebrationMaps
      }));

      // I. RSVP Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'rsvp', {
        ...(event.components?.rsvp || {}),
        successMessage,
        rejectedMessage
      }));

      // J. Dress Code Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'dressCode', {
        ...(event.components?.dressCode || {}),
        dressCodeTextWomen,
        dressCodeTextMen
      }));

      // K. Child Restriction Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'childRestriction', {
        ...(event.components?.childRestriction || {}),
        childrestrictionMessage
      }));

      // L. Presents Component
      updatePromises.push(eventsService.updateComponent(eventId!, 'presents', {
        ...(event.components?.presents || {}),
        presentMessage
      }));

      await Promise.all(updatePromises);

      toast.dismiss(savingToast);
      toast.success('¡Detalles de la boda guardados exitosamente!');
      
      // Clear file states and reload
      setMusicFile(null);
      setCardCouplePhotoFile(null);
      setDateImgFile(null);
      loadEventData();
    } catch (error: any) {
      toast.dismiss(savingToast);
      toast.error(error.message || 'Error al guardar los cambios');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-primary)' }}>
        <div style={{ width: 40, height: 40, border: '3px solid var(--border-glass)', borderTopColor: 'var(--color-purple)', borderRadius: '50%', animation: 'spin-slow 0.8s linear infinite' }} />
      </div>
    );
  }

  const renderSectionHeader = (key: string, title: string, icon: any, componentKey?: string) => {
    const isOpen = openSection === key;
    const isComponentActive = componentKey ? event?.activeComponents?.[componentKey] : true;
    
    return (
      <button
        type="button"
        onClick={() => toggleSection(key)}
        style={{
          width: '100%',
          padding: '1.25rem 1.5rem',
          background: isOpen ? 'rgba(138, 196, 224, 0.08)' : 'var(--bg-card2)',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem',
          transition: 'all 0.3s ease',
          textAlign: 'left',
          borderTopLeftRadius: 'var(--radius-lg)',
          borderTopRightRadius: 'var(--radius-lg)',
          borderBottomLeftRadius: isOpen ? '0' : 'var(--radius-lg)',
          borderBottomRightRadius: isOpen ? '0' : 'var(--radius-lg)'
        }}
      >
        <span style={{ fontSize: '1.3rem', color: isOpen ? 'var(--text-secondary)' : 'var(--text-muted)', flexShrink: 0 }}>
          {icon}
        </span>
        <span style={{ fontWeight: 700, fontSize: '1rem', color: isOpen ? 'var(--text-secondary)' : 'var(--text-primary)', flex: 1 }}>
          {title}
        </span>
        
        {componentKey && (
          <span style={{
            fontSize: '0.65rem',
            padding: '0.2rem 0.6rem',
            borderRadius: '50px',
            fontWeight: 600,
            letterSpacing: '0.05em',
            marginRight: '0.5rem',
            background: isComponentActive ? 'rgba(34, 197, 94, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            color: isComponentActive ? '#4ade80' : 'var(--text-muted)',
            border: `1px solid ${isComponentActive ? 'rgba(34, 197, 94, 0.3)' : 'var(--border-glass)'}`
          }}>
            {isComponentActive ? 'Activo' : 'No activo'}
          </span>
        )}

        {isOpen ? <ChevronUp size={18} color="var(--text-muted)" /> : <ChevronDown size={18} color="var(--text-muted)" />}
      </button>
    );
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)', color: 'var(--text-primary)', position: 'relative', display: 'flex', flexDirection: 'column' }}>
      {/* Background orbs */}
      <div style={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <div className="orb orb-purple" style={{ width: 600, height: 600, top: '-200px', left: '-200px', opacity: 0.15 }} />
        <div className="orb orb-blue" style={{ width: 450, height: 450, bottom: '-150px', right: '-100px', opacity: 0.12 }} />
      </div>

      {/* Sticky Header */}
      <header
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
          background: 'rgba(9, 7, 33, 0.75)',
          borderBottom: '1px solid var(--border-glass)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <button
            onClick={() => navigate(`/wedding/mi-boda/${eventId}`)}
            style={{
              background: 'rgba(138, 196, 224, 0.1)',
              border: '1px solid rgba(138, 196, 224, 0.2)',
              color: 'var(--text-secondary)',
              padding: '0.5rem',
              borderRadius: 8,
              cursor: 'pointer',
              display: 'flex'
            }}
            title="Volver al menú"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
              Detalles de la Boda
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.75rem', margin: 0 }}>
              Boda {coupleNames}
            </p>
          </div>
        </div>

        <motion.button
          onClick={handleSave}
          disabled={isSaving}
          className="btn-primary"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          style={{
            padding: '0.6rem 1.8rem',
            fontSize: '0.9rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'linear-gradient(to right, #3b82f6, #8b5cf6)',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)'
          }}
        >
          <Save size={16} />
          <span>{isSaving ? 'Guardando...' : 'Guardar Cambios'}</span>
        </motion.button>
      </header>

      {/* Main Form Area */}
      <main style={{ flex: 1, width: '100%', maxWidth: '900px', margin: '0 auto', padding: '2rem 1.5rem', zIndex: 1 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          
          {/* Section 1: General & Time */}
          <div style={{ 
            border: '1px solid var(--border-glass)', 
            borderRadius: 'var(--radius-lg)', 
            overflow: 'visible', 
            background: 'var(--bg-glass)',
            position: 'relative',
            zIndex: openSection === 'general' ? 10 : 1
          }}>
            {renderSectionHeader('general', 'Detalle Generales', <Calendar size={18} />)}
            <AnimatePresence>
              {openSection === 'general' && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }} 
                  animate={{ height: 'auto', opacity: 1 }} 
                  exit={{ height: 0, opacity: 0 }} 
                  transition={{ duration: 0.2 }}
                  style={{ overflow: 'visible' }}
                >
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem', overflow: 'visible' }}>
                    <div style={{ gridColumn: '1 / -1' }}>
                      <label className="input-label">Nombre de los Novios</label>
                      <input type="text" className="input-field" placeholder="Ej. Johanna y Andrés" value={coupleNames} onChange={e => setCoupleNames(e.target.value)} />
                    </div>
                    <div>
                      <label className="input-label">Fecha de la Boda</label>
                      <input type="date" className="input-field" value={weddingDate} onChange={e => setWeddingDate(e.target.value)} />
                    </div>
                    <div style={{ position: 'relative' }}>
                      <label className="input-label">Hora de la Boda</label>
                      <div style={{ position: 'relative' }}>
                        <input 
                          type="text" 
                          className="input-field" 
                          style={{ cursor: 'pointer' }}
                          readOnly 
                          value={weddingTime} 
                          onClick={() => setShowTimePicker(!showTimePicker)} 
                          placeholder="Seleccionar hora..."
                        />
                        <Clock 
                          size={18} 
                          color="var(--text-muted)" 
                          style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }} 
                        />
                      </div>

                      {showTimePicker && (
                        <>
                          <div 
                            style={{ position: 'fixed', inset: 0, zIndex: 140 }} 
                            onClick={() => setShowTimePicker(false)} 
                          />
                          <div style={{
                            position: 'absolute',
                            top: 'calc(100% + 6px)',
                            left: 0,
                            width: '260px',
                            backgroundColor: '#ffffff',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                            border: '1px solid rgba(0,0,0,0.15)',
                            display: 'flex',
                            height: '240px',
                            overflow: 'hidden',
                            zIndex: 150
                          }}>
                            {/* Hours Column */}
                            <div className="time-picker-column">
                              {Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')).map(hr => {
                                const isSelected = parseWeddingTime(weddingTime).hour === hr;
                                return (
                                  <button
                                    key={hr}
                                    type="button"
                                    onClick={() => setWeddingTime(`${hr}:${parseWeddingTime(weddingTime).minute} ${parseWeddingTime(weddingTime).meridiem}`)}
                                    className={`time-picker-option ${isSelected ? 'selected' : ''}`}
                                  >
                                    {hr}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Minutes Column */}
                            <div className="time-picker-column">
                              {Array.from({ length: 60 }, (_, i) => String(i).padStart(2, '0')).map(min => {
                                const isSelected = parseWeddingTime(weddingTime).minute === min;
                                return (
                                  <button
                                    key={min}
                                    type="button"
                                    onClick={() => setWeddingTime(`${parseWeddingTime(weddingTime).hour}:${min} ${parseWeddingTime(weddingTime).meridiem}`)}
                                    className={`time-picker-option ${isSelected ? 'selected' : ''}`}
                                  >
                                    {min}
                                  </button>
                                );
                              })}
                            </div>

                            {/* Meridiem Column */}
                            <div className="time-picker-column">
                              {['a. m.', 'p. m.'].map(mer => {
                                const isSelected = parseWeddingTime(weddingTime).meridiem === mer;
                                return (
                                  <button
                                    key={mer}
                                    type="button"
                                    onClick={() => setWeddingTime(`${parseWeddingTime(weddingTime).hour}:${parseWeddingTime(weddingTime).minute} ${mer}`)}
                                    className={`time-picker-option ${isSelected ? 'selected' : ''}`}
                                  >
                                    {mer}
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 2: Music */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('music', 'Música de Fondo', <Music size={18} />, 'banner')}
            <AnimatePresence>
              {openSection === 'music' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Pista de música (MP3)</label>
                      <input type="file" accept="audio/mp3,audio/*" className="input-field" onChange={e => handleFileChange(e, setMusicFile)} style={{ padding: '0.45rem 0.6rem' }} />
                      
                      {musicFile ? (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>
                          Nueva pista seleccionada: <strong>{musicFile.name}</strong> (se subirá al guardar)
                        </p>
                      ) : musicUrl ? (
                        <div style={{ marginTop: '0.75rem' }}>
                          <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Pista configurada actualmente:</p>
                          <audio src={musicUrl} controls style={{ width: '100%', height: '40px', marginTop: '0.4rem', borderRadius: '8px' }} />
                        </div>
                      ) : (
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>No hay pista de música cargada.</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 3: Envelope */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('envelope', 'Sobre de la Tarjeta (Portada)', <Heart size={18} />, 'envelope')}
            <AnimatePresence>
              {openSection === 'envelope' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Foto de la Pareja (Sobre)</label>
                      <input type="file" accept="image/*" className="input-field" onChange={e => handleFileChange(e, setCardCouplePhotoFile)} style={{ padding: '0.45rem 0.6rem' }} />
                    </div>

                    {/* Preview Couple Photo */}
                    {(cardCouplePhotoFile || cardCouplePhoto) && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                          Vista previa de la foto del sobre:
                        </p>
                        <img 
                          src={getPreviewUrl(cardCouplePhotoFile || cardCouplePhoto)} 
                          alt="Pareja" 
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-glass)' }} 
                        />
                      </div>
                    )}

                    <div>
                      <label className="input-label">Mensaje en el Sobre</label>
                      <input type="text" className="input-field" placeholder="Ej. ¡Nos casamos!" value={envelopeMsg} onChange={e => setEnvelopeMsg(e.target.value)} />
                    </div>

                    <div>
                      <label className="input-label">Mensaje para Invitados (En el sobre)</label>
                      <textarea className="input-field" rows={3} placeholder="Mensaje que verán los invitados al abrir el sobre..." value={cardMessageforguestsText} onChange={e => setCardMessageforguestsText(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 4: Main Message */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('message', 'Mensaje Principal de los Novios', <FileText size={18} />, 'message')}
            <AnimatePresence>
              {openSection === 'message' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Mensaje Principal — Parte 1</label>
                      <textarea className="input-field" rows={4} placeholder="Escribe el primer párrafo o frase del mensaje..." value={text1} onChange={e => setText1(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className="input-label">Mensaje Principal — Parte 2</label>
                      <textarea className="input-field" rows={4} placeholder="Escribe el segundo párrafo o cierre..." value={text2} onChange={e => setText2(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 5: Countdown */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('countdown', 'Conteo Regresivo', <Clock size={18} />, 'countdown')}
            <AnimatePresence>
              {openSection === 'countdown' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Título del Conteo Regresivo</label>
                      <input type="text" className="input-field" placeholder="Ej. Faltan pocos días..." value={titleTextMsg} onChange={e => setTitleTextMsg(e.target.value)} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 6: Calendar */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('calendar', 'Calendario del Evento', <Calendar size={18} />, 'calendar')}
            <AnimatePresence>
              {openSection === 'calendar' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.25rem' }}>
                      <div>
                        <label className="input-label">Mensaje del Calendario</label>
                        <input type="text" className="input-field" placeholder="Ej. ¡Agenda la fecha!" value={titleMsgText} onChange={e => setTitleMsgText(e.target.value)} />
                      </div>
                      <div>
                        <label className="input-label">Imagen Ilustrativa / Calendario</label>
                        <input type="file" accept="image/*" className="input-field" onChange={e => handleFileChange(e, setDateImgFile)} style={{ padding: '0.45rem 0.6rem' }} />
                      </div>
                    </div>

                    {(dateImgFile || dateImg) && (
                      <div style={{ marginTop: '0.5rem' }}>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>
                          Vista previa de la imagen de calendario:
                        </p>
                        <img 
                          src={getPreviewUrl(dateImgFile || dateImg)} 
                          alt="Calendario" 
                          style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', border: '1px solid var(--border-glass)' }} 
                        />
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 7: Carousel */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('carousel', 'Carrusel de Fotos', <Image size={18} />, 'carousel')}
            <AnimatePresence>
              {openSection === 'carousel' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Mensaje en el Carrusel</label>
                      <input type="text" className="input-field" placeholder="Ej. Compartimos nuestros mejores momentos" value={carouselMsg} onChange={e => setCarouselMsg(e.target.value)} />
                    </div>

                    <div>
                      <label className="input-label">Cantidad de imágenes</label>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                        <button type="button" onClick={() => setCarouselImageCount(carouselImages.length - 1)} className="guest-control-btn" title="Quitar imagen slot">
                          <Minus size={14} />
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={carouselImages.length}
                          onChange={e => setCarouselImageCount(parseInt(e.target.value) || 0)}
                          className="input-field"
                          style={{ width: '70px', textAlign: 'center', fontSize: '1rem', fontWeight: 700 }}
                        />
                        <button type="button" onClick={() => setCarouselImageCount(carouselImages.length + 1)} className="guest-control-btn" title="Agregar imagen slot">
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>

                    {carouselImages.length > 0 && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginTop: '0.5rem' }}>
                        {carouselImages.map((img, i) => (
                          <div key={i} style={{ background: 'rgba(0,0,0,0.15)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            <span style={{ fontSize: '0.75rem', color: 'var(--color-purple-light)', fontWeight: 600 }}>
                              Imagen {i + 1}
                            </span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="input-field" 
                              onChange={e => {
                                if (e.target.files && e.target.files[0]) {
                                  handleCarouselImageChange(i, e.target.files[0]);
                                }
                              }} 
                              style={{ padding: '0.35rem 0.5rem', fontSize: '0.75rem' }} 
                            />
                            
                            {img && (
                              <div style={{ textAlign: 'center', marginTop: '0.25rem' }}>
                                <img 
                                  src={getPreviewUrl(img)} 
                                  alt={`Carrusel ${i + 1}`} 
                                  style={{ width: '100%', height: '110px', objectFit: 'cover', borderRadius: '8px', border: '1px solid var(--border-glass)' }} 
                                />
                                {img instanceof File && (
                                  <span style={{ fontSize: '0.65rem', color: 'var(--text-secondary)', display: 'block', marginTop: '0.2rem', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                    Nueva: {img.name}
                                  </span>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 8: Event Details (Ceremony & Celebration) */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('details', 'Detalles de Ceremonia y Celebración', <MapPin size={18} />, 'eventDetails')}
            <AnimatePresence>
              {openSection === 'details' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    
                    {/* Ceremonia */}
                    <div style={{ background: 'var(--bg-card2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--color-purple-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        💒 Ceremonia
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                          <label className="input-label">Título</label>
                          <input type="text" className="input-field" placeholder="Ej. Ceremonia Religiosa" value={ceremonyTitle} onChange={e => setCeremonyTitle(e.target.value)} />
                        </div>
                        <div>
                          <label className="input-label">Lugar / Templo</label>
                          <input type="text" className="input-field" placeholder="Ej. Parroquia San José" value={ceremonyPlace} onChange={e => setCeremonyPlace(e.target.value)} />
                        </div>
                        <div>
                          <label className="input-label">Hora</label>
                          <input type="text" className="input-field" placeholder="Ej. 4:00 PM" value={ceremonyTime} onChange={e => setCeremonyTime(e.target.value)} />
                        </div>
                        <div>
                          <label className="input-label">Enlace de Ubicación (Google Maps)</label>
                          <input type="text" className="input-field" placeholder="https://maps.google.com/..." value={ceremonyMaps} onChange={e => setCeremonyMaps(e.target.value)} />
                        </div>
                      </div>
                    </div>

                    {/* Celebración */}
                    <div style={{ background: 'var(--bg-card2)', padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border-glass)' }}>
                      <h4 style={{ fontSize: '0.9rem', color: 'var(--color-purple-light)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        🥂 Celebración
                      </h4>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                        <div>
                          <label className="input-label">Título</label>
                          <input type="text" className="input-field" placeholder="Ej. Recepción y Fiesta" value={celebrationTitle} onChange={e => setCelebrationTitle(e.target.value)} />
                        </div>
                        <div>
                          <label className="input-label">Lugar / Salón</label>
                          <input type="text" className="input-field" placeholder="Ej. Salón de Eventos Bella Vista" value={celebrationPlace} onChange={e => setCelebrationPlace(e.target.value)} />
                        </div>
                        <div>
                          <label className="input-label">Hora</label>
                          <input type="text" className="input-field" placeholder="Ej. 6:30 PM" value={celebrationTime} onChange={e => setCelebrationTime(e.target.value)} />
                        </div>
                        <div>
                          <label className="input-label">Enlace de Ubicación (Google Maps)</label>
                          <input type="text" className="input-field" placeholder="https://maps.google.com/..." value={celebrationMaps} onChange={e => setCelebrationMaps(e.target.value)} />
                        </div>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 9: RSVP Messages */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('rsvp', 'RSVP (Respuestas de Confirmación)', <Check size={18} />, 'rsvp')}
            <AnimatePresence>
              {openSection === 'rsvp' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Mensaje para invitados que SÍ asistirán</label>
                      <textarea className="input-field" rows={3} placeholder="Ej. ¡Qué gran noticia! Estamos muy felices de que nos acompañes en este día especial." value={successMessage} onChange={e => setSuccessMessage(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className="input-label">Mensaje para invitados que NO asistirán</label>
                      <textarea className="input-field" rows={3} placeholder="Ej. Lamentamos que no puedas acompañarnos. Te extrañaremos en nuestro gran día." value={rejectedMessage} onChange={e => setRejectedMessage(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 10: Dress Code */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('dresscode', 'Código de Vestimenta', <Heart size={18} />, 'dressCode')}
            <AnimatePresence>
              {openSection === 'dresscode' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Código para Mujeres</label>
                      <textarea className="input-field" rows={3} placeholder="Ej. Vestido largo formal. Evitar el color blanco." value={dressCodeTextWomen} onChange={e => setDressCodeTextWomen(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                    <div>
                      <label className="input-label">Código para Hombres</label>
                      <textarea className="input-field" rows={3} placeholder="Ej. Traje formal oscuro con corbata." value={dressCodeTextMen} onChange={e => setDressCodeTextMen(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 11: Child Restriction */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('restriction', 'Restricción de Niños', <Baby size={18} />, 'childRestriction')}
            <AnimatePresence>
              {openSection === 'restriction' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Mensaje de restricción de niños</label>
                      <textarea className="input-field" rows={3} placeholder="Ej. Para que puedas disfrutar de la noche, hemos reservado este evento exclusivamente para adultos." value={childrestrictionMessage} onChange={e => setChildrestrictionMessage(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Section 12: Presents */}
          <div style={{ border: '1px solid var(--border-glass)', borderRadius: 'var(--radius-lg)', overflow: 'hidden', background: 'var(--bg-glass)' }}>
            {renderSectionHeader('presents', 'Regalos / Detalles de Bodas', <Gift size={18} />, 'presents')}
            <AnimatePresence>
              {openSection === 'presents' && (
                <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                  <div style={{ padding: '1.5rem', borderTop: '1px solid var(--border-glass)', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <div>
                      <label className="input-label">Mensaje sobre Regalos (Lluvia de sobres, cuenta bancaria, etc.)</label>
                      <textarea className="input-field" rows={3} placeholder="Ej. Tu presencia es nuestro mejor regalo. Si deseas hacernos un detalle, contaremos con lluvia de sobres o puedes realizar una transferencia a..." value={presentMessage} onChange={e => setPresentMessage(e.target.value)} style={{ resize: 'vertical' }} />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
        
        {/* Floating / Bottom Save Notice */}
        <div style={{
          marginTop: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          background: 'rgba(20, 44, 75, 0.4)',
          border: '1px solid var(--border-glass)',
          borderRadius: '16px',
          padding: '1rem 2rem'
        }}>
          <AlertCircle size={16} color="var(--text-secondary)" />
          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            No olvides guardar tus cambios después de editar los detalles.
          </span>
        </div>
      </main>

      <footer style={{ textAlign: 'center', padding: '2rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.8rem', borderTop: '1px solid rgba(255,255,255,0.05)', zIndex: 1, marginTop: 'auto' }}>
        &copy; {new Date().getFullYear()} Ideación 360. Todos los derechos reservados.
      </footer>

      <style>{`
        .guest-control-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--border-glass);
          color: var(--text-primary);
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .guest-control-btn:hover {
          background: rgba(255, 255, 255, 0.12);
          transform: scale(1.05);
        }
        .time-picker-column {
          flex: 1;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(0, 0, 0, 0.08);
          scrollbar-width: thin;
        }
        .time-picker-column::-webkit-scrollbar {
          width: 4px;
        }
        .time-picker-column::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 4px;
        }
        .time-picker-column:last-child {
          border-right: none;
        }
        .time-picker-option {
          padding: 0.6rem 0;
          text-align: center;
          background: transparent;
          border: none;
          color: #0f172a;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.15s ease;
          width: 100%;
        }
        .time-picker-option:hover {
          background: rgba(0, 0, 0, 0.05);
        }
        .time-picker-option.selected {
          background: #3b82f6;
          color: #ffffff;
          font-weight: 700;
        }
      `}</style>
    </div>
  );
};

export default ClientWeddingDetails;
