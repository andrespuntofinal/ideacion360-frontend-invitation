export interface AppConfig {

  paramsGeneral: {
    weddingDate: string;
    coupleNames: string;
    guestName: string;
    numberGuests: number;
   
  },
 
  envelope: {
    sealColor: string;
    envelopeColor: string;
    envelopeColorDeg: string;
    innerColor: string;
    cardCouplePhoto: string;
    textureUrl?: string;
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
    
  };
  banner: {
    videoDesktop: string;
    videoResponsive: string;
    titleFont: string;
    textColor: string;
    subtitleFont: string;
    subtextMsg: string;
    musicUrl: string;
    
  };
  message: {
    text1: string;
    text2: string;
    groomParents: string;
    brideParents: string;
    font: string;
    colorText1: string;
    colorParents: string;
    backgroundImage: string;
    backgroundcolor: string;

  };
  countdown: {
    titleTextFont: string,
    titleTextColor: string,
    titleTextMsg: string,
    boxShadowColor: string,
    borderColor: string,
    backgroundColor2: string,
    borderColorCircle: string,
    backgroundColorCircle: string,
    numberColorText1: string,
    numberColorText2: string,
    numberFontText: string,
    backgroundColorFrom:string,
    backgroundColorVia:string,
    backgroundColorTo:string,
    boderColor:string,
  };
  calendar: {
    dateImg: string;
    titleTextColor: string;
    titleTextFont: string;
    titleMsgText: string;
    monthColorText: string,
    monthFontText: string,
    dayweekColorText: string,
    dayweekFontText: string,
    dayColorText1: string,
    dayColorText2: string,
    daySelectedColor: string,
    
  };
  carousel: {
    carouselMsg: string;
    images: string[];
    autoPlayInterval: number;
    titleColor: string,
    titleFont: string,
    buttonCloseColor: string,

  };
  dressCode: {
    titleFont: string;
    titleColor: string;
    titletext: string;
    dressCodeTextWomen: string;
    dressCodeTextMen: string;
    dressCodeIconWomen: string;
    dressCodeIconMen: string;
    iconbackgroundColor: string;
    titleWomen: string,
    titleMen: string,
    title2Color: string,
    title2Font: string,
    text2Color: string,
    text2Font: string,
    backgroundColorFrom: string,
    backgroundColorVia: string,
    backgroundColorTo: string,
    boderColor: string,
    backgroundColorIconMoments: string,
    borderColorIconMoments: string,
    
  };
  eventDetails: {
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
    backgroundColorFrom: string,
    backgroundColorVia: string,
    backgroundColorTo: string,
    boderColor: string,
    backgroundColorIconMoments: string,
    borderColorIconMoments: string,
    ceremony: {
      title: string;
      place: string;
      time: string;
    };
    celebration: {
      title: string;
      place: string;
      time: string;
    };
    ceremonyMaps: string;
    celebrationMaps: string;

  };
  timeline: {
    font: string;
    iconStep1: string;
    iconStep2: string;
    iconStep3: string;
    iconStep4: string;
    iconStep5: string;
    textStep1: string;
    textStep2: string;
    textStep3: string;
    textStep4: string;
    textStep5: string;
    timeStep1: string;
    timeStep2: string;
    timeStep3: string;
    timeStep4: string;
    timeStep5: string;
  };
  presents: {
    presentTitle: string;
    presentMessage: string;
    titleColor: string;
    titleFont: string;
    iconColor: string;
    textColor: string,
    textFont: string,
    backgroundColorFrom: string,
    backgroundColorVia: string,
    backgroundColorTo: string,
    boderColor: string,
    backgroundColorIconMoments: string,
    borderColorIconMoments: string,
  };
    childRestriction: {
    childrestrictionTitle: string;
    childrestrictionMessage: string;
    titleColor:string,
    titleFont: string,
    iconColor: string,
    textColor: string,
    textFont: string,
    backgroundColorFrom: string,
    backgroundColorVia: string,
    backgroundColorTo: string,
    boderColor: string,
    backgroundColorIconMoments: string,
    borderColorIconMoments: string,
  };
  rsvp: {
    buttonText: string;
    successMessage: string;
    rejectedMessage: string;
    buttonColor: string;
    buttonTextColor: string;
    buttonTextFont: string;
    title2TextColor: string;
    title2TextFont: string;
    title2TextMsg: string;
    title3TextColor: string,
    title3TextFont: string,
    title3TextMsg: string,
    buttonYes1Style: {
    backgroundColor: string,
    color: string,
    borderColor: string,
    fontFamily: string,
    },
    buttonYes2Style: {
    backgroundColor: string,
    color: string,
    borderColor: string,
    fontFamily: string,
    },
    buttonNot1Style: {
    backgroundColor: string,
    color: string,
    borderColor: string,
    fontFamily: string,
    },
    buttonNot2Style: {
    backgroundColor: string,
    color: string,
    borderColor: string,
    fontFamily: string,
    },
    buttonSendStyle: {
    backgroundColor: string,
    color: string,
    borderColor: string,
    fontFamily: string,
    },
    buttonYesMsg: string,
    buttonNotMsg: string,
    msgTextColor: string,
    msgTextFont: string,
    msgTextMsg: string,
    textareaStyle: {
    backgroundColor: string,
    colorText: string,
    borderColor: string,
    fontFamily: string,
    },
    buttonSendMsg: string,
    confirmationTitleTextColor: string,
    confirmationTitleTextFont: string,
    confirmationTitleTextMsg: string,
    confirmationCircleColor: string,
    confirmationTextFont: string,
    confirmationTextColor: string,
  };
  webhookUrl: string;

}

export const APP_CONFIG: AppConfig = {

  paramsGeneral: {
    weddingDate: "2026-09-19T17:00:00",
    coupleNames: "Juan & Laura",
    guestName: "Andrés & Johanna",
    numberGuests: 4,
   
  },
  
  envelope: {
    sealColor: "#9b958d", // amber-700
    envelopeColor: "#19284c", // amber-100
    envelopeColorDeg: "#5c678d",
    innerColor: "#ffffff",
    cardCouplePhoto: "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776093978/Boda-JuanYLaura/FOTO43_-_Juan_David_Jaramillo_Osorio_uucwp9.jpg",
    textureUrl: "https://us.123rf.com/450wm/tomo00/tomo001502/tomo00150200192/36801568-papel-tapiz-de-fondo-de-material-marca-de-coraz%C3%B3n-modelo-del-coraz%C3%B3n-amor-d%C3%ADa-de-san-valent%C3%ADn-s.jpg?ver=6",
    envelopeMsg: "Nuestra historia sigue creciendo y queremos que seas parte de este capítulo tan importante",
    envelopeMsgColor: "#F7F9FA",
    envelopeFont: "'Cormorant Garamond', serif",
    sealImage: "https://res.cloudinary.com/dtfr6ngda/image/upload/v1773802450/sello-removebg-preview_vaqap3.png",
    confettiColors: ["#b45309", "#fef3c7", "#ffffff"],
    overlayColor: "rgba(255, 255, 255, 0.4)",
    cardBackgroundColor: "#fdfbf7",
    accentColor: "#d4af37",
    textColor: "#57534e", // stone-600
    textDarkColor: "#44403c", // stone-700
    photoBackgroundColor: "#ffffff",
    titleFont: "'Playfair Display', serif",
    initialsCoupleTextColor: "#F7F9FA",
    initialsCoupleText:"J&L",
    cardMessageforguestsText:"Nos honra invitar a:",
    backgroundImage: "https://res.cloudinary.com/dtfr6ngda/image/upload/v1773861644/texturamain_eg3hpd.png",
    
  },
  banner: {
    videoDesktop: "https://res.cloudinary.com/dtfr6ngda/video/upload/v1776098622/Boda-JuanYLaura/video-desktop_nn99oo.webm",
    videoResponsive: "https://res.cloudinary.com/dtfr6ngda/video/upload/v1773852980/video-responsive_mii2mt.webm",
    titleFont: "'Playfair Display', serif",
    subtitleFont: "'Playfair Display', serif",
    textColor: "#F7F9FA",
    subtextMsg: "Nuestra Boda",
    musicUrl: "https://res.cloudinary.com/dtfr6ngda/video/upload/v1776108444/Boda-JuanYLaura/pista-canci%C3%B3n_kox17r.mp3",
    
  },
  message: {
    text1: "Más valen dos que uno, porque obtienen más fruto de su esfuerzo. La cuerda de tres hilos no se rompe fácilmente.",
    text2: "Con el corazón lleno de amor, te invitamos a compartir con nosotros la alegría de unir nuestras vidas en matrimonio. Queremos que seas parte de este momento tan especial donde el amor será el lazo que nos unirá para siempre.",
    groomParents: "Eclesiastés 4, 9-12",
    brideParents: "",
    font: "'Cormorant Garamond', serif",
    colorText1: "#19284c",
    colorParents: "#735309",
    backgroundImage:"https://res.cloudinary.com/dtfr6ngda/image/upload/v1773861644/texturamain_eg3hpd.png",
    backgroundcolor: "#F7F9FA",
   
  },
  countdown: {
    titleTextFont: "'Montserrat', sans-serif",
    titleTextColor: "#F7F9FA",
    titleTextMsg: "La espera casi termina",
    boxShadowColor: "#d79972",
    borderColor: "#f8f7fa",
    backgroundColor2: "#A5ADB8",
    borderColorCircle: "#D7B272",
    backgroundColorCircle: "#E8E2D9",
    numberColorText1: "#735309",
    numberColorText2: "#27272B",
    numberFontText: "'Montserrat', sans-serif",
    backgroundColorFrom:"#19284c",
    backgroundColorVia:"#5c678d",
    backgroundColorTo:"#19284c",
    boderColor:"#A5ADB8",


   
  },
  calendar: {
    dateImg: "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776115271/Boda-JuanYLaura/foto-calendar_vr1glp.jpg",
    titleTextColor: "#735309",
    titleTextFont: "'Montserrat', sans-serif",
    titleMsgText: "El día del “SÍ” ",
    monthColorText: "#27272B",
    monthFontText: "'Montserrat', sans-serif",
    dayweekColorText: "#735309",
    dayweekFontText: "'Montserrat', sans-serif",
    dayColorText1: "#A5ADB8",
    dayColorText2: "#F7F9FA",
    daySelectedColor: "#19284c",
    
  },
  carousel: {
    carouselMsg: "Instantes que nos definen",
    images: [
      "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776198486/Boda-JuanYLaura/carrusel1_pnno6y.jpg",
      "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776200181/Boda-JuanYLaura/carrusel2_wceact.jpg",
      "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776198487/Boda-JuanYLaura/carrusel3_angtcs.jpg",
      "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776198486/Boda-JuanYLaura/carrusel4_krgbax.jpg",
      "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776198486/Boda-JuanYLaura/carrusel5_qeplmx.jpg",
      "https://res.cloudinary.com/dtfr6ngda/image/upload/v1776799445/Boda-JuanYLaura/FOTO23V2_-_Juan_David_Jaramillo_Osorio_i35zfh.jpg",
    ],
    autoPlayInterval: 6000,
    titleColor:"#735309",
    titleFont:"'Montserrat', sans-serif",
    buttonCloseColor:"#F7F9FA",
 
  },
  dressCode: {
    titletext: "Código de Vestimenta",
    titleColor: "#735309",
    titleFont: "'Montserrat', sans-serif",
    dressCodeTextWomen: "Formal - Color blanco reservado para la novia",
    dressCodeTextMen: "Formal - Color azul reservado para el novio",
    dressCodeIconWomen: "https://res.cloudinary.com/dtfr6ngda/image/upload/v1773940159/womenico_vnki8h.png",
    dressCodeIconMen: "https://res.cloudinary.com/dtfr6ngda/image/upload/v1773939750/menicon_m1huiv.png",
    iconbackgroundColor: "#735309",
    titleWomen: "Mujeres",
    titleMen: "Hombres",
    title2Color: "#D7B272",
    title2Font: "'Montserrat', sans-serif",
    text2Color: "#F7F9FA",
    text2Font: "'Montserrat', sans-serif",
    backgroundColorFrom:"#19284c",
    backgroundColorVia:"#5c678d",
    backgroundColorTo:"#19284c",
    boderColor:"#A5ADB8",
    backgroundColorIconMoments:"#e8dcd9",
    borderColorIconMoments:"#D7B272",
  },
  eventDetails: {
    detailsTitle: "Detalles del Evento",
    detailsColor: "#735309",
    detailsFont: "'Montserrat', sans-serif",
    detailIconColor: "#735309",
    detailItemTitleColor: "#D7B272",
    detailItemTitleFont: "'Montserrat', sans-serif",
    detailItemText1Color: "#F7F9FA",
    detailItemText1Font: "'Montserrat', sans-serif",
    detailIcon2Color: "#d79f72",
    detailsMapsTitle: "Cómo llegar",
    backgroundColorFrom:"#19284c",
    backgroundColorVia:"#5c678d",
    backgroundColorTo:"#19284c",
    boderColor:"#A5ADB8",
    backgroundColorIconMoments:"#e8dcd9",
    borderColorIconMoments:"#D7B272",
    ceremony: {
      title: "Ceremonia",
      place: "Parroquia San Juan Evangelista",
      time: "6:00 PM",
    },
    celebration: {
      title: "Celebración",
      place: "Eventos Sinaí",
      time: "7:00 PM",
    },
    ceremonyMaps: "https://maps.app.goo.gl/Ni2qgRDWrR534BDT7",
    celebrationMaps: "https://maps.app.goo.gl/BETiTWBgGTA44Q6v8",
  
  },
  timeline: {
    font: "'Cormorant Garamond', serif",
    iconStep1: "Church",
    iconStep2: "Camera",
    iconStep3: "Wine",
    iconStep4: "Utensils",
    iconStep5: "Music",
    textStep1: "Ceremonia",
    textStep2: "Recepción",
    textStep3: "Brindis",
    textStep4: "Cena",
    textStep5: "Cierre",
    timeStep1: "4:00 pm",
    timeStep2: "6:00 pm",
    timeStep3: "6:30 pm",
    timeStep4: "7:00 pm",
    timeStep5: "8:00 pm",
  },
  presents: {
    presentTitle: "Lluvia de sobres",
    presentMessage: "Tu presencia es nuestro mayor regalo. Si deseas un detalle adicional, te invitamos a formar parte de nuestra “lluvia de sobres”",
    titleColor:"#735309",
    titleFont:"'Montserrat', sans-serif",
    iconColor:"#735309",
    textColor:"#f8faf7",
    textFont:"'Montserrat', sans-serif",
    backgroundColorFrom:"#19284c",
    backgroundColorVia:"#5c678d",
    backgroundColorTo:"#19284c",
    boderColor:"#A5ADB8",
    backgroundColorIconMoments:"#e8dcd9",
    borderColorIconMoments:"#D7B272",
  },
   childRestriction: {
    childrestrictionTitle: "Recomendaciones",
    childrestrictionMessage: "Queremos que disfruten al máximo, por eso en nuestra boda hemos optado por una celebración íntima solo para adultos. Agradecemos de corazón su comprensión y apoyo en esta decisión.",
    titleColor:"#735309",
    titleFont:"'Montserrat', sans-serif",
    iconColor:"#735309",
    textColor:"#F7F9FA",
    textFont:"'Montserrat', sans-serif",
    backgroundColorFrom:"#19284c",
    backgroundColorVia:"#5c678d",
    backgroundColorTo:"#19284c",
    boderColor:"#A5ADB8",
    backgroundColorIconMoments:"#e8dcd9",
    borderColorIconMoments:"#D7B272",
  },
  rsvp: {
    buttonText: "Confirmar tu asistencia",
    successMessage: "¡Genial! Tu presencia hará nuestra fiesta aún más especial.",
    rejectedMessage: "Gracias por notificarnos. Lamentamos tu ausencia, pero apreciamos mucho tu cariño y buenos deseos.",
    buttonColor: "#19284c",
    buttonTextColor:"#F7F9FA",
    buttonTextFont:"'Montserrat', sans-serif",
    title2TextColor:"#D7B272",
    title2TextFont:"'Montserrat', sans-serif",
    title2TextMsg:"Confirmar asistencia",
    title3TextColor:"#27272B",
    title3TextFont:"'Montserrat', sans-serif",
    title3TextMsg:"¿Asistirás al evento?",
    buttonYes1Style: {
    backgroundColor: "#19284c",
    color: '#A5ADB8',
    borderColor: '#A5ADB8',
    fontFamily:"'Montserrat', sans-serif",
    },
    buttonYes2Style: {
    backgroundColor: "#E8E2D9",
    color: '#A5ADB8',
    borderColor: "#D7B272",
    fontFamily:"'Montserrat', sans-serif",
    },
    buttonNot1Style: {
    backgroundColor: "#E8E2D9",
    color: "#A5ADB8",
    borderColor: "#D7B272",
    fontFamily:"'Montserrat', sans-serif",
    },
    buttonNot2Style: {
    backgroundColor: "#19284c",
    color: "#A5ADB8",
    borderColor: "#A5ADB8",
    fontFamily:"'Montserrat', sans-serif",
    },
    buttonSendStyle: {
    backgroundColor: "#19284c",
    color: "#A5ADB8",
    borderColor: "#A5ADB8",
    fontFamily:"'Montserrat', sans-serif",
    },
    buttonYesMsg:"Si asistiré",
    buttonNotMsg:"No podré asistir",
    msgTextColor:"#27272B",
    msgTextFont:"'Montserrat', sans-serif",
    msgTextMsg:"Mensaje para los novios",

    textareaStyle: {
    backgroundColor: "#F7F9FA",
    colorText: "#19284c",
    borderColor: "#A5ADB8",
    fontFamily: "'Montserrat', sans-serif"
    },
    buttonSendMsg:"Confirmar Asistencia",
    confirmationTitleTextColor:"#19284c",
    confirmationTitleTextFont:"'Montserrat', sans-serif",
    confirmationTitleTextMsg:"",
    confirmationCircleColor:"#D7B272",
    confirmationTextFont:"'Montserrat', sans-serif",
    confirmationTextColor:"#27272B",

  },
    
  webhookUrl:"http://localhost:5678/webhook-test/4626d0ef-daae-4826-a7c2-ed5316a446fe",
};

// Update guestName and numberGuests from URL parameters if they exist
if (typeof window !== "undefined") {
  const urlParams = new URLSearchParams(window.location.search);
  const guestNameParam = urlParams.get("guestName");
  const numberGuestsParam = urlParams.get("numberGuests");

  if (guestNameParam) {
    APP_CONFIG.paramsGeneral.guestName = guestNameParam;
  }

  if (numberGuestsParam) {
    const parsedNumber = parseInt(numberGuestsParam, 10);
    if (!isNaN(parsedNumber)) {
      APP_CONFIG.paramsGeneral.numberGuests = parsedNumber;
    }
  }
}
