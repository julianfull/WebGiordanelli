/* Datos de campaña — Pablo Giordanelli, Gobernación de Risaralda 2028-2031
   Migrado desde el prototipo (assets/data.js) a TypeScript tipado. */

import type { IconName } from "@/components/Icon";

/* Fuera de campaña: oculta todo lo relacionado con propuestas (sección, menú, botones y textos),
   los ejes de gobierno y el título "Candidato a Gobernador". Cambiar a true para volver a mostrarlo. */
export const SHOW_PROPUESTAS = false;

/* Perfiles oficiales: los usan el pie de página y la sección "Redes". */
export const SOCIAL = [
  { icon: "facebook", label: "Facebook", handle: "GiordanelliPablo", href: "https://www.facebook.com/GiordanelliPablo/" },
  { icon: "instagram", label: "Instagram", handle: "@pgiordanelli1", href: "https://www.instagram.com/pgiordanelli1/" },
  { icon: "x", label: "X", handle: "@pgiordanelli", href: "https://x.com/pgiordanelli" },
] as const;

export interface Candidate {
  name: string;
  role: string;
  period: string;
  hashtag: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface RibbonItem {
  num: string;
  lbl: string;
}

export interface Eje {
  icon: IconName;
  title: string;
  desc: string;
  /** Imagen (en /public) que se abre sobrepuesta al hacer clic en la tarjeta. */
  image?: string;
}

export interface Municipio {
  name: string;
  mono: string;
  info: string;
  special?: boolean;
}

export interface Cifra {
  v: string;
  k: string;
}

export interface TimelineItem {
  tt: string;
  tp: string;
}

export interface ApiaPropuesta {
  icon: IconName;
  title: string;
  desc: string;
}

export interface GaleriaItem {
  ph: string;
  span: string;
  rows: string;
  /** Ruta a la imagen real (en /public). Sin esto, se muestra el placeholder. */
  img?: string;
  /** object-position del recorte (útil para fotos verticales). Default: center. */
  pos?: string;
}

export interface Semilla {
  name: string;
  muni: string;
  txt: string;
  tag: string;
}

export interface MunicipioStat {
  icon: IconName;
  label: string;
  value: string;
}

export interface FlagColor {
  name: string;
  hex: string;
  meaning: string;
}

/** Atribución de una imagen con licencia libre (p. ej. Wikimedia Commons). */
export interface Credit {
  text: string;
  url: string;
}

export interface MunicipioInfo {
  intro: string[];
  stats: MunicipioStat[];
  flag: {
    /** Sin imagen, se dibujan franjas horizontales con los colores. */
    image?: string;
    note: string;
    /** Solo colores con significado verificado en fuente oficial; vacío si no se ha verificado. */
    colors: FlagColor[];
    credit?: Credit;
  };
}

export interface SectionCopy {
  eyebrow: string;
  /** Permite <br/> embebido. */
  title: string;
  sub: string;
}

export interface EscuchaCopy extends SectionCopy {
  tags: string[];
  sectorLabel: string;
  sectorPlaceholder: string;
  ideaPlaceholder: string;
}

export interface ApiaEvento {
  month: string;
  title: string;
  desc: string;
}

export interface GastroCategoria {
  icon: IconName;
  title: string;
  items: string[];
}

/** Datos de una página de municipio (/apia, /pereira…). */
export interface MunicipioPageData {
  /** Ruta de la página: /{slug} */
  slug: string;
  name: string;
  hero: {
    image: string;
    alt: string;
    /** object-position del recorte. Default: center. */
    pos?: string;
    icon: IconName;
    /** Obligatorio para fotos de terceros con licencia CC BY / CC BY-SA. */
    credit?: Credit;
  };
  nickname: string;
  eyebrow: string;
  headline1: string;
  headlineHl: string;
  intro: string;
  quote: string;
  municipio: MunicipioInfo;
  propuestas: ApiaPropuesta[];
  galeria: GaleriaItem[];
  eventos: ApiaEvento[];
  gastronomia: GastroCategoria[];
  semillas: Semilla[];
  copy: {
    propuestas: SectionCopy;
    galeria: SectionCopy;
    eventos: SectionCopy;
    gastronomia: SectionCopy;
    escucha: EscuchaCopy;
  };
}

export type ApiaData = MunicipioPageData;

export interface CampaignData {
  candidate: Candidate;
  nav: NavLink[];
  ribbon: RibbonItem[];
  ejes: Eje[];
  municipios: Municipio[];
  cifras: Cifra[];
  timeline: TimelineItem[];
  municipiosSelect: string[];
  apia: MunicipioPageData;
  pereira: MunicipioPageData;
}

export const DATA: CampaignData = {
  candidate: {
    name: "Pablo Giordanelli",
    role: "Candidato a Gobernador · Risaralda",
    period: "2028 — 2031",
    hashtag: "#RisaraldaNosUne",
  },

  nav: [
    ...(SHOW_PROPUESTAS ? [{ label: "Propuestas", href: "#propuestas" }] : []),
    { label: "Municipios", href: "#municipios" },
    { label: "Pablo", href: "#sobre" },
    { label: "Redes", href: "#redes" },
    { label: "Contacto", href: "#unete" },
  ],

  ribbon: [
    { num: "14", lbl: "Municipios de Risaralda" },
    { num: "974.639", lbl: "Risaraldenses a servir (DANE 2025)" },
    ...(SHOW_PROPUESTAS ? [{ num: "6", lbl: "Ejes de gobierno" }] : []),
    { num: "100%", lbl: "Compromiso con la región" },
  ],

  ejes: [
    {
      icon: "leaf",
      title: "Bienestar Animal y Medio Ambiente",
      desc: "Protección animal, centros de bienestar, biodiversidad y cuencas hídricas. Risaralda líder en ecología y respeto a la vida.",
    },
    {
      icon: "book",
      title: "Educación de Calidad",
      desc: "Mejoramiento de infraestructura educativa, conectividad rural y formación técnica y superior para jóvenes de todos los municipios.",
    },
    {
      icon: "heart",
      title: "Salud para Todos",
      desc: "Fortalecimiento de hospitales municipales, telemedicina en zonas rurales y programas de salud mental para comunidades vulnerables.",
    },
    {
      icon: "wheat",
      title: "Agro y Caficultura",
      desc: "Apoyo tecnológico al caficultor, diversificación agrícola, acceso a mercados justos y financiamiento para pequeños productores.",
    },
    {
      icon: "road",
      title: "Infraestructura y Conectividad",
      desc: "Vías en buen estado que conecten todos los municipios, internet de alta velocidad y transporte interurbano eficiente y seguro.",
      image: "/RisaraldaTic.png",
    },
    {
      icon: "shield",
      title: "Seguridad y Convivencia",
      desc: "Estrategias de prevención del delito, apoyo a la Policía y Ejército, y programas de reintegración para una Risaralda más segura.",
    },
  ],

  /* Población: proyecciones DANE 2025, base Censo 2018, actualización post COVID-19
     (DCD-area-proypoblacion-Mun-2020-2035-ActPostCOVID-19.xlsx). Los 14 suman 974.639. */
  municipios: [
    { name: "Pereira", mono: "Pe", info: "Capital · ~483k hab." },     // 482.824
    { name: "Dosquebradas", mono: "Do", info: "~226k hab." },          // 226.152
    { name: "Santa Rosa de Cabal", mono: "SR", info: "~80k hab." },    // 80.012
    { name: "La Virginia", mono: "LV", info: "~29k hab." },            // 28.555
    { name: "Marsella", mono: "Ma", info: "~17k hab." },               // 17.240
    { name: "Belén de Umbría", mono: "BU", info: "~25k hab." },        // 25.339
    { name: "Apía", mono: "Ap", info: "~13k hab.", special: true },    // 12.645
    { name: "Santuario", mono: "Sa", info: "~13k hab." },              // 12.868
    { name: "La Celia", mono: "LC", info: "~8k hab." },                // 7.669
    { name: "Mistrató", mono: "Mi", info: "~18k hab." },               // 17.587
    { name: "Pueblo Rico", mono: "PR", info: "~17k hab." },            // 16.792
    { name: "Quinchía", mono: "Qu", info: "~28k hab." },               // 27.980
    { name: "Guática", mono: "Gu", info: "~12k hab." },                // 12.451
    { name: "Balboa", mono: "Ba", info: "~7k hab." },                  // 6.525
  ],

  cifras: [
    { v: "14", k: "Municipios" },
    { v: "974.639", k: "Habitantes (DANE 2025)" },
    { v: "4.140", k: "km²" },
    { v: "Eje", k: "Cafetero" },
  ],

  timeline: [
    { tt: "Trayectoria", tp: "Diputado de la Asamblea Departamental de Risaralda, trabajando por legislación que beneficie a todos los municipios." },
    { tt: "Compromiso Regional", tp: "Promotor de #RisaraldaNosUne, impulsando la identidad y unión del departamento en cada rincón." },
    { tt: "Cercanía con el Pueblo", tp: "Ha recorrido los 14 municipios, escuchando directamente a comunidades campesinas, jóvenes, empresarios y líderes sociales." },
    { tt: "Visión de Futuro", tp: SHOW_PROPUESTAS ? "Candidato a Gobernador con una propuesta integral que prioriza educación, salud, infraestructura y medio ambiente." : "Una visión integral para Risaralda que prioriza educación, salud, infraestructura y medio ambiente." },
  ],

  municipiosSelect: ["Pereira", "Dosquebradas", "Santa Rosa de Cabal", "La Virginia", "Marsella", "Belén de Umbría", "Apía", "Santuario", "La Celia", "Mistrató", "Pueblo Rico", "Quinchía", "Guática", "Balboa"],

  apia: {
    slug: "apia",
    name: "Apía",
    hero: { image: "/apiaBackground.png", alt: "Apía, Risaralda", pos: "center 30%", icon: "wind" },
    nickname: "El Corazón del Viento",
    eyebrow: "Municipio de Apía · Risaralda",
    headline1: "Apía,",
    headlineHl: "El Corazón del Viento",
    intro: "Entre las faldas del Cerro Tatamá y el aroma del café de altura, Apía respira naturaleza. Un destino de montaña, aves y tradición cafetera que merece un futuro a la altura de su belleza.",
    quote: "Apía no es solo un punto en el mapa: es identidad, es viento, es café. Mi compromiso es que el mundo venga a conocerla — y que sus habitantes vivan de ello.",

    municipio: {
      intro: [
        'Apía es un municipio ubicado en la vertiente oriental de la Cordillera Occidental de los Andes. Es conocida como el <strong>"Corazón del Viento"</strong> y hace parte del <strong>Paisaje Cultural Cafetero</strong>.',
        "Pablo Giordanelli ha recorrido sus calles, probado su famoso <em>migao</em> en Agrotatamá, y trabajado por el desarrollo de sus habitantes.",
      ],
      stats: [
        { icon: "mapPin", label: "Ubicación", value: "Cordillera Occidental, Risaralda" },
        { icon: "mountain", label: "Altitud", value: "1.630 m.s.n.m." },
        { icon: "thermometer", label: "Temperatura", value: "Promedio 19 °C" },
        { icon: "users", label: "Población", value: "12.645 habitantes (DANE 2025)" },
        { icon: "calendar", label: "Fundación", value: "15 de agosto de 1883" },
        { icon: "coffee", label: "Especialidad", value: "Café de origen · Migao" },
      ],
      flag: {
        image: "/apiaFlag.png",
        note: "Obra del maestro Gerardo Naranjo · 1952",
        colors: [
          { name: "Azul", hex: "#4a90d9", meaning: "cielos y ríos del municipio" },
          { name: "Rojo", hex: "#c0392b", meaning: "valor y sacrificio del pueblo" },
          { name: "Verde", hex: "#27a844", meaning: "naturaleza y esperanza" },
        ],
      },
    },

    propuestas: [
      {
        icon: "bird",
        title: "Apía, capital del avistamiento de aves",
        desc: "Senderos certificados hacia el PNN Tatamá, formación de guías locales y un festival anual de aviturismo que ponga a Apía en la ruta internacional del birdwatching.",
      },
      {
        icon: "mountain",
        title: "Turismo de montaña sostenible",
        desc: "Red de miradores, ciclorrutas y posadas rurales con sello ecológico. Naturaleza protegida que genera empleo sin sacrificar el páramo ni las cuencas.",
      },
      {
        icon: "coffee",
        title: "Ruta del Café de Altura",
        desc: "Experiencias cafeteras de finca a taza, marca de origen \"Café de Apía\" y apoyo directo a los caficultores para vender mejor y exportar con identidad propia.",
      },
      {
        icon: "sparkles",
        title: "Apía cultural y viva",
        desc: "Recuperación del parque principal y la arquitectura típica, agenda cultural permanente y conectividad para que el turismo llegue y la juventud se quede.",
      },
    ],

    galeria: [
      { ph: "Parque principal de Apía", span: "span 4", rows: "span 3", img: "/parqueApia.jpg", pos: "center 30%" },
      { ph: "Apía entre montañas", span: "span 8", rows: "span 2", img: "/apiaPanoramica.jpg" },
      { ph: "Yipao · Jeeps Willys", span: "span 4", rows: "span 1", img: "/apiaYipao.jpg" },
      { ph: "Bandas y desfiles", span: "span 4", rows: "span 1", img: "/apiaBanda.jpg" },
      { ph: "El casco urbano desde el aire", span: "span 4", rows: "span 3", img: "/apiaAerea.jpg" },
      { ph: "Cerro Tatamá", span: "span 4", rows: "span 2", img: "/tatama.jpeg" },
      { ph: "Arquitectura cafetera", span: "span 4", rows: "span 2", img: "/apiaBalcones.jpg" },
      { ph: "Monumento al arriero", span: "span 4", rows: "span 1", img: "/apiaArriero.jpg" },
      { ph: "Avistamiento de aves", span: "span 4", rows: "span 1", img: "/avistamientoAves.png" },
      { ph: "Apía en 360°", span: "span 6", rows: "span 2", img: "/apiaAerea360.jpg" },
      { ph: "La iglesia y el parque, corazón de Apía", span: "span 6", rows: "span 2", img: "/apiaParqueIglesia.jpg" },
    ],

    eventos: [
      {
        month: "Agosto",
        title: "Fiestas Aniversarias",
        desc: "La fiesta principal del municipio (fundado en 1883). Dos semanas de desfiles culturales, muestras artesanales, mercados campesinos, conciertos y eventos deportivos regionales.",
      },
      {
        month: "Marzo · Abril",
        title: "Semana Santa",
        desc: "Una de las conmemoraciones más solemnes del departamento. Sus procesiones, cargadas de arte religioso tradicional, convocan una asistencia masiva que dinamiza el turismo religioso del municipio.",
      },
      {
        month: "Julio",
        title: "Fiesta de la Virgen del Carmen",
        desc: "Tradición comunitaria liderada por el gremio transportador: desfiles de Jeeps Willys decorados, caravanas vehiculares y procesiones nocturnas con alta participación local.",
      },
      {
        month: "Agosto",
        title: "La Calle del Café",
        desc: "Feria especializada en el marco de las fiestas aniversarias: la vitrina donde caficultores y campesinos ofertan sus marcas de café de especialidad. El sábado previo se vuelve epicentro de conocimiento con concursos de catación, barismo y charlas académicas de grandes exponentes del sector.",
      },
    ],

    gastronomia: [
      {
        icon: "utensils",
        title: "Platos Fuertes",
        items: ["Sancocho risaraldense cocido en leña", "Frijoles con garra", "Bandeja paisa montañera"],
      },
      {
        icon: "wheat",
        title: "Mecato y Snacks",
        items: ["Chorizo tradicional", "Chicharrón con arepa de maíz pelao", "Empanadas con ají casero"],
      },
      {
        icon: "coffee",
        title: "Postres",
        items: ["Dulces artesanales de café", "Bocadillos de guayaba locales"],
      },
    ],

    semillas: [
      { name: "Marisol Grajales", muni: "Vereda La María", txt: "Necesitamos que los guías de la zona seamos certificados. Hay mucho turista de aves pero se va a dormir a Pereira.", tag: "Aviturismo" },
      { name: "Don Eliécer Ramírez", muni: "Caficultor", txt: "Que el café de Apía tenga su propia marca. Vendemos barato lo que vale oro.", tag: "Café de Altura" },
    ],

    copy: {
      propuestas: {
        eyebrow: "Propuestas para Apía",
        title: "Naturaleza que genera<br/>futuro y empleo",
        sub: "Un plan que convierte la riqueza natural de Apía —su viento, su montaña y su café— en oportunidades reales para quienes viven aquí.",
      },
      galeria: {
        eyebrow: "Galería",
        title: "El paisaje que defendemos",
        sub: "El Cerro Tatamá, el parque principal, la arquitectura cafetera, las aves y las fiestas que hacen único a Apía.",
      },
      eventos: {
        eyebrow: "Agenda Cultural",
        title: "Eventos y tradiciones<br/>que laten todo el año",
        sub: "Apía vive su identidad en el calendario: fe, café y fiesta que convocan a todo el departamento y dinamizan el turismo del municipio.",
      },
      gastronomia: {
        eyebrow: "Sabor de Apía",
        title: "Gastronomía típica<br/>de montaña",
        sub: "Cocina de leña, café y tradición paisa. Los sabores que acompañan cada fiesta y cada visita al Corazón del Viento.",
      },
      escucha: {
        eyebrow: "Escucha Ciudadana",
        title: "Apía propone, Pablo escucha",
        sub: "Esta tierra la conocen quienes la habitan. Deja tu idea para el desarrollo de Apía.",
        tags: ["Aviturismo", "Café de Altura", "Turismo de montaña", "Cultura", "Otro"],
        sectorLabel: "Vereda o sector",
        sectorPlaceholder: "Ej. Vereda La María, Centro…",
        ideaPlaceholder: "¿Qué necesita Apía para crecer cuidando su naturaleza?",
      },
    },
  },

  pereira: {
    slug: "pereira",
    name: "Pereira",
    hero: { image: "/pereira-hero.jpg", alt: "Plaza de Bolívar de Pereira · Bolívar Desnudo", pos: "center 35%", icon: "heart" },
    nickname: "Querendona, Trasnochadora y Morena",
    eyebrow: "Municipio de Pereira · Risaralda",
    headline1: "Pereira,",
    headlineHl: "Capital del Eje",
    intro: "Motor económico, comercial y cultural de Risaralda. Una ciudad pujante e innovadora que lidera la transformación del departamento.",
    quote: "Pereira es el corazón dinámico de nuestro departamento. Mi compromiso es garantizar seguridad, movilidad fluida y oportunidades para cada pereirano.",

    municipio: {
      intro: [
        "Ubicada en el centro del Eje Cafetero, Pereira es el <strong>principal polo urbano y empresarial</strong> de la región, destacada por su civismo y capacidad de desarrollo.",
        "Conocida como la ciudad <strong>\"Querendona, Trasnochadora y Morena\"</strong>, es la capital de Risaralda y punto de encuentro de todo el departamento.",
      ],
      stats: [
        { icon: "mapPin", label: "Ubicación", value: "Valle del Río Otún, Risaralda" },
        { icon: "mountain", label: "Altitud", value: "1.411 m.s.n.m." },
        { icon: "thermometer", label: "Temperatura", value: "Promedio 21 °C" },
        { icon: "users", label: "Población", value: "482.824 habitantes (DANE 2025)" },
        { icon: "calendar", label: "Fundación", value: "30 de agosto de 1863" },
        { icon: "handshake", label: "Especialidad", value: "Comercio, servicios y negocios" },
      ],
      /* Descripción oficial: pereira.gov.co y concejopereira.gov.co ("Nuestros símbolos" / "Escudo y Bandera"). */
      flag: {
        image: "/pereiraFlag.png",
        credit: {
          text: "Imagen: Guilherme Paula · dominio público · Wikimedia Commons",
          url: "https://commons.wikimedia.org/wiki/File:Flag_of_Pereira.svg",
        },
        note: "«Que con la sangre roja de los hijos de Pereira, se yergue la Libertad en la riqueza de su suelo»",
        colors: [
          { name: "Amarillo subido", hex: "#FFD700", meaning: "triángulo central: la riqueza de su suelo" },
          { name: "Rojo escarlata", hex: "#FF0000", meaning: "triángulos laterales: la sangre de los hijos de Pereira" },
          { name: "Gorro frigio", hex: "#E00000", meaning: "en el centro del amarillo: la libertad" },
        ],
      },
    },

    propuestas: [
      {
        icon: "road",
        title: "Infraestructura e Integración Vial",
        desc: "Modernización de los corredores viales clave para agilizar la movilidad metropolitana y conectar los barrios con el centro.",
      },
      {
        icon: "sparkles",
        title: "Emprendimiento e Innovación",
        desc: "Creación de incentivos para startups tecnológicas, mipymes y fortalecimiento del sector comercial e industrial.",
      },
      {
        icon: "users",
        title: "Inclusión y Bienestar Social",
        desc: "Programas integrales de apoyo a familias, jóvenes y adultos mayores con mayor cobertura en salud y educación.",
      },
      {
        icon: "leaf",
        title: "Sostenibilidad y Espacio Público",
        desc: "Recuperación de parques, corredores verdes y proyectos de renovación urbana amigables con el medio ambiente.",
      },
    ],

    /* Sin fotos aún: la galería no se muestra hasta que se agreguen. */
    galeria: [],

    eventos: [
      {
        month: "Agosto",
        title: "Fiestas de la Cosecha",
        desc: "La gran celebración del aniversario de Pereira (fundada el 30 de agosto de 1863): desfiles, conciertos, muestras culturales y encuentros que convocan a todo el Eje Cafetero.",
      },
      {
        month: "Marzo · Abril",
        title: "Semana Santa",
        desc: "Procesiones y celebraciones religiosas que recorren el centro de la ciudad y reúnen a familias de Pereira y de los municipios vecinos.",
      },
      {
        month: "Diciembre",
        title: "Temporada Navideña",
        desc: "Alumbrados, novenas y actividades en los parques que llenan de vida el espacio público y dinamizan el comercio de la ciudad.",
      },
    ],

    gastronomia: [
      {
        icon: "utensils",
        title: "Platos Fuertes",
        items: ["Sancocho de gallina", "Bandeja paisa", "Frijoles con garra"],
      },
      {
        icon: "wheat",
        title: "Mecato y Snacks",
        items: ["Chorizo con arepa", "Empanadas con ají", "Arepa de chócolo"],
      },
      {
        icon: "coffee",
        title: "Postres y Café",
        items: ["Café de origen del Eje Cafetero", "Mazamorra con bocadillo", "Obleas"],
      },
    ],

    /* El muro arranca vacío: solo ideas reales de ciudadanos. */
    semillas: [],

    copy: {
      propuestas: {
        eyebrow: "Propuestas para Pereira",
        title: "Innovación y desarrollo<br/>para la Capital del Eje",
        sub: "Un plan estratégico orientado a consolidar a Pereira como el polo económico, tecnológico y social más importante de Risaralda.",
      },
      galeria: {
        eyebrow: "Galería",
        title: "La ciudad que queremos",
        sub: "Los lugares, la gente y las tradiciones que hacen única a Pereira.",
      },
      eventos: {
        eyebrow: "Agenda Cultural",
        title: "Eventos y tradiciones<br/>que laten todo el año",
        sub: "Pereira vive su identidad en el calendario: fiesta, fe y cultura que convocan a todo el departamento.",
      },
      gastronomia: {
        eyebrow: "Sabor de Pereira",
        title: "Gastronomía típica<br/>del Eje Cafetero",
        sub: "Cocina paisa, café de origen y tradición cafetera. Los sabores que acompañan cada fiesta en la Capital del Eje.",
      },
      escucha: {
        eyebrow: "Escucha Ciudadana",
        title: "Pereira propone, Pablo escucha",
        sub: "Esta ciudad la conocen quienes la habitan. Deja tu idea para el desarrollo de Pereira.",
        tags: ["Movilidad", "Seguridad", "Emprendimiento", "Espacio público", "Otro"],
        sectorLabel: "Barrio o comuna",
        sectorPlaceholder: "Ej. Cuba, Centro, Boston…",
        ideaPlaceholder: "¿Qué necesita Pereira para seguir creciendo?",
      },
    },
  },
};
