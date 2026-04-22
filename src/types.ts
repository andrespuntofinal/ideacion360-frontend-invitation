// ─── API & Store Types ────────────────────────────────────────────────────────

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthUser {
  id: string;
  username: string;
  role: string;
  name: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (credentials: LoginCredentials) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
}

// ─── Event Types ─────────────────────────────────────────────────────────────

export interface EventContact {
  name?: string;
  email?: string;
  phone?: string;
  identification?: string;
}

export interface EventWedding {
  coupleNames?: string;
  weddingDate?: string;
  weddingTime?: string;
}

export interface ActiveComponents {
  banner: boolean;
  calendar: boolean;
  carousel: boolean;
  childRestriction: boolean;
  countdown: boolean;
  dressCode: boolean;
  envelope: boolean;
  eventDetails: boolean;
  message: boolean;
  presents: boolean;
  rsvp: boolean;
  timeline: boolean;
  guestManagement: boolean;
}

export interface ButtonStyle {
  backgroundColor?: string;
  color?: string;
  borderColor?: string;
  fontFamily?: string;
}

export interface TextareaStyle {
  backgroundColor?: string;
  colorText?: string;
  borderColor?: string;
  fontFamily?: string;
}

export interface EventComponents {
  banner?: Record<string, unknown>;
  calendar?: Record<string, unknown>;
  carousel?: Record<string, unknown>;
  childRestriction?: Record<string, unknown>;
  countdown?: Record<string, unknown>;
  dressCode?: Record<string, unknown>;
  envelope?: Record<string, unknown>;
  eventDetails?: Record<string, unknown>;
  message?: Record<string, unknown>;
  presents?: Record<string, unknown>;
  rsvp?: Record<string, unknown>;
  timeline?: Record<string, unknown>;
  guestManagement?: {
    totalGuests?: number;
    guests?: Array<{ name?: string; companions?: number; urlCard?: string }>;
  };
}

export interface WeddingEvent {
  _id: string;
  eventId: string;
  type: 'web' | 'video' | 'card';
  status: 'draft' | 'active' | 'inactive';
  contact?: EventContact;
  wedding?: EventWedding;
  activeComponents: ActiveComponents;
  components: EventComponents;
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  pages: number;
}

export interface EventsState {
  events: WeddingEvent[];
  currentEvent: WeddingEvent | null;
  isLoading: boolean;
  error: string | null;
  pagination: Pagination;
  fetchEvents: (params?: Record<string, unknown>) => Promise<void>;
  fetchEventById: (id: string) => Promise<WeddingEvent | null>;
  createEvent: (data: Partial<WeddingEvent>) => Promise<{ success: boolean; data?: WeddingEvent; message?: string }>;
  updateEvent: (id: string, data: Partial<WeddingEvent>) => Promise<{ success: boolean; data?: WeddingEvent; message?: string }>;
  deleteEvent: (id: string) => Promise<{ success: boolean; message?: string }>;
  updateComponent: (eventId: string, type: string, data: Record<string, unknown>) => Promise<{ success: boolean; data?: unknown; message?: string }>;
  uploadComponentFiles: (eventId: string, formData: FormData) => Promise<{ success: boolean; urlsMap?: Record<string, string>; message?: string }>;
  clearCurrentEvent: () => void;
}

// ─── Card Config Types ────────────────────────────────────────────────────────

export interface CardParamsGeneral {
  guestName: string;
  numberGuests: number;
}

export interface CardWeddingData {
  weddingDate: string;
  weddingTime: string;
  coupleNames: string;
}

export interface EnvelopeConfig {
  sealColor: string;
  envelopeColor: string;
  envelopeColorDeg: string;
  innerColor: string;
  cardCouplePhoto: string;
  textureUrl: string;
  envelopeMsg: string;
  envelopeMsgColor: string;
  envelopeFont: string;
  sealImage: string;
  confettiColors: string[];
  overlayColor: string;
  cardBackgroundColor: string;
  accentColor: string;
  textColor: string;
  textDarkColor: string;
  photoBackgroundColor: string;
  titleFont: string;
  initialsCoupleTextColor: string;
  initialsCoupleText: string;
  cardMessageforguestsText: string;
  backgroundImage: string;
}

export interface BannerConfig {
  videoDesktop: string;
  videoResponsive: string;
  titleFont: string;
  textColor: string;
  subtitleFont: string;
  subtextMsg: string;
  musicUrl: string;
}

export interface MessageConfig {
  text1: string;
  text2: string;
  groomParents: string;
  brideParents: string;
  font: string;
  colorText1: string;
  colorParents: string;
  backgroundImage: string;
  backgroundColor: string;
}

export interface CountdownConfig {
  titleTextFont: string;
  titleTextColor: string;
  titleTextMsg: string;
  boxShadowColor: string;
  borderColor: string;
  backgroundColor2: string;
  borderColorCircle: string;
  backgroundColorCircle: string;
  numberColorText1: string;
  numberColorText2: string;
  numberFontText: string;
  backgroundColorFrom: string;
  backgroundColorVia: string;
  backgroundColorTo: string;
  boderColor: string;
}

export interface CalendarConfig {
  dateImg: string;
  titleTextColor: string;
  titleTextFont: string;
  titleMsgText: string;
  monthColorText: string;
  monthFontText: string;
  dayweekColorText: string;
  dayweekFontText: string;
  dayColorText1: string;
  dayColorText2: string;
  daySelectedColor: string;
}

export interface CarouselConfig {
  carouselMsg: string;
  images: string[];
  autoPlayInterval: number;
  titleColor: string;
  titleFont: string;
  buttonCloseColor: string;
}

export interface DressCodeConfig {
  titletext: string;
  titleColor: string;
  titleFont: string;
  dressCodeTextWomen: string;
  dressCodeTextMen: string;
  dressCodeIconWomen: string;
  dressCodeIconMen: string;
  iconbackgroundColor: string;
  titleWomen: string;
  titleMen: string;
  title2Color: string;
  title2Font: string;
  text2Color: string;
  text2Font: string;
  backgroundColorFrom: string;
  backgroundColorVia: string;
  backgroundColorTo: string;
  boderColor: string;
  backgroundColorIconMoments: string;
  borderColorIconMoments: string;
}

export interface EventDetailsConfig {
  detailsTitle: string;
  detailsColor: string;
  detailsFont: string;
  detailIconColor: string;
  detailItemTitleColor: string;
  detailItemTitleFont: string;
  detailItemText1Color: string;
  detailItemText1Font: string;
  detailIcon2Color: string;
  detailsMapsTitle: string;
  backgroundColorFrom: string;
  backgroundColorVia: string;
  backgroundColorTo: string;
  boderColor: string;
  backgroundColorIconMoments: string;
  borderColorIconMoments: string;
  ceremony: { title: string; place: string; time: string };
  celebration: { title: string; place: string; time: string };
  ceremonyMaps: string;
  celebrationMaps: string;
}

export interface TimelineConfig {
  font: string;
  iconStep1: string; iconStep2: string; iconStep3: string; iconStep4: string; iconStep5: string;
  textStep1: string; textStep2: string; textStep3: string; textStep4: string; textStep5: string;
  timeStep1: string; timeStep2: string; timeStep3: string; timeStep4: string; timeStep5: string;
}

export interface PresentsConfig {
  presentTitle: string;
  presentMessage: string;
  titleColor: string;
  titleFont: string;
  iconColor: string;
  textColor: string;
  textFont: string;
  backgroundColorFrom: string;
  backgroundColorVia: string;
  backgroundColorTo: string;
  boderColor: string;
  backgroundColorIconMoments: string;
  borderColorIconMoments: string;
}

export interface ChildRestrictionConfig {
  childrestrictionTitle: string;
  childrestrictionMessage: string;
  titleColor: string;
  titleFont: string;
  iconColor: string;
  textColor: string;
  textFont: string;
  backgroundColorFrom: string;
  backgroundColorVia: string;
  backgroundColorTo: string;
  boderColor: string;
  backgroundColorIconMoments: string;
  borderColorIconMoments: string;
}

export interface RSVPConfig {
  buttonText: string;
  successMessage: string;
  rejectedMessage: string;
  buttonColor: string;
  buttonTextColor: string;
  buttonTextFont: string;
  title2TextColor: string;
  title2TextFont: string;
  title2TextMsg: string;
  title3TextColor: string;
  title3TextFont: string;
  title3TextMsg: string;
  buttonYesStyle?: ButtonStyle;
  buttonYes1Style?: ButtonStyle;
  buttonYes2Style?: ButtonStyle;
  buttonNotStyle?: ButtonStyle;
  buttonNot1Style?: ButtonStyle;
  buttonNot2Style?: ButtonStyle;
  buttonSendStyle?: ButtonStyle;
  buttonYesMsg: string;
  buttonNotMsg: string;
  msgTextColor: string;
  msgTextFont: string;
  msgTextMsg: string;
  textareaStyle?: TextareaStyle;
  buttonSendMsg: string;
  confirmationTitleTextColor: string;
  confirmationTitleTextFont: string;
  confirmationTitleTextMsg: string;
  confirmationCircleColor: string;
  confirmationTextFont: string;
  confirmationTextColor: string;
}

export interface CardConfig {
  paramsGeneral: CardParamsGeneral;
  weddingData: CardWeddingData;
  activeComponents: Omit<ActiveComponents, 'guestManagement'>;
  envelope: EnvelopeConfig;
  banner: BannerConfig;
  message: MessageConfig;
  countdown: CountdownConfig;
  calendar: CalendarConfig;
  carousel: CarouselConfig;
  dressCode: DressCodeConfig;
  eventDetails: EventDetailsConfig;
  timeline: TimelineConfig;
  presents: PresentsConfig;
  childRestriction: ChildRestrictionConfig;
  rsvp: RSVPConfig;
  webhookUrl: string;
}

export interface CardContextValue {
  config: CardConfig;
  activeComponents: Omit<ActiveComponents, 'guestManagement'>;
  loading: boolean;
  error: string | null;
}
