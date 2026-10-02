/* Páginas territoriales de los 14 municipios de Risaralda.
   Apía y Pereira viven en data.ts; aquí están los otros doce.

   Fuentes:
   - Población: DANE, proyecciones 2025 (actualización post COVID-19).
   - Fundación, altitud, superficie, distancia a Pereira, fiestas y economía: artículos de Wikipedia en
     español de cada municipio (que citan a las alcaldías). Solo se incluye lo que figura allí.
   - Fotos de portada y banderas: Wikimedia Commons, con autor y licencia en `credit`.
     Son provisionales hasta contar con fotografía propia de la campaña.

   BORRADOR: propuestas, frases del candidato y textos de sección deben pasar la revisión de marca y
   legal antes de publicarse (manual 7.2). */

import { DATA, type Credit, type EscuchaCopy, type MunicipioPageData, type MunicipioStat } from "@/lib/data";
import type { IconName } from "@/components/Icon";

const commons = (file: string, author: string, license: string, prefix = "Foto"): Credit => ({
  text: `${prefix}: ${author} · ${license} · Wikimedia Commons`,
  url: `https://commons.wikimedia.org/wiki/File:${file}`,
});

const flag = (slug: string, file: string, author: string, license: string) => ({
  image: `/municipios/${slug}-bandera.png`,
  note: "",
  colors: [],
  credit: commons(file, author, license, "Imagen"),
});

const poblacion = (n: string): MunicipioStat => ({ icon: "users", label: "Población", value: `${n} habitantes (DANE 2025)` });
const distancia = (km: number): MunicipioStat => ({ icon: "mapPin", label: "Distancia a Pereira", value: `${km} km` });
const altitud = (m: string): MunicipioStat => ({ icon: "mountain", label: "Altitud", value: `${m} m.s.n.m.` });
const superficie = (km2: string): MunicipioStat => ({ icon: "leaf", label: "Superficie", value: `${km2} km²` });
const fundacion = (f: string): MunicipioStat => ({ icon: "calendar", label: "Fundación", value: f });
const especialidad = (e: string, icon: IconName = "coffee"): MunicipioStat => ({ icon, label: "Especialidad", value: e });

interface Draft {
  slug: string;
  name: string;
  hero: MunicipioPageData["hero"];
  nickname: string;
  headlineHl: string;
  intro: string;
  quote: string;
  municipio: MunicipioPageData["municipio"];
  propuestas: MunicipioPageData["propuestas"];
  eventos: MunicipioPageData["eventos"];
  gastronomia?: MunicipioPageData["gastronomia"];
  propuestasTitle: string;
  propuestasSub: string;
  escucha: Pick<EscuchaCopy, "tags" | "sectorPlaceholder" | "ideaPlaceholder">;
}

/* Cocina paisa y cafetera común al departamento; cada municipio puede sobrescribirla. */
const GASTRO_BASE: MunicipioPageData["gastronomia"] = [
  { icon: "utensils", title: "Platos Fuertes", items: ["Sancocho de gallina", "Bandeja paisa", "Frijoles con garra"] },
  { icon: "wheat", title: "Mecato y Snacks", items: ["Chorizo con arepa", "Empanadas con ají", "Arepa de chócolo"] },
  { icon: "coffee", title: "Postres y Café", items: ["Café de origen", "Mazamorra con panela", "Dulces caseros"] },
];

function pagina(d: Draft): MunicipioPageData {
  return {
    slug: d.slug,
    name: d.name,
    hero: d.hero,
    nickname: d.nickname,
    eyebrow: `Municipio de ${d.name} · Risaralda`,
    headline1: `${d.name},`,
    headlineHl: d.headlineHl,
    intro: d.intro,
    quote: d.quote,
    municipio: d.municipio,
    propuestas: d.propuestas,
    galeria: [],
    eventos: d.eventos,
    gastronomia: d.gastronomia ?? GASTRO_BASE,
    semillas: [],
    copy: {
      propuestas: { eyebrow: `Propuestas para ${d.name}`, title: d.propuestasTitle, sub: d.propuestasSub },
      galeria: { eyebrow: "Galería", title: `Así es ${d.name}`, sub: `Los lugares y la gente de ${d.name}.` },
      eventos: {
        eyebrow: "Agenda Cultural",
        title: "Fiestas y tradiciones<br/>que nos reúnen",
        sub: `Las celebraciones con las que ${d.name} vive su identidad y recibe a sus visitantes.`,
      },
      gastronomia: {
        eyebrow: `Sabor de ${d.name}`,
        title: "Cocina paisa<br/>y cafetera",
        sub: "Los sabores de la tradición risaraldense que acompañan cada fiesta y cada visita.",
      },
      escucha: {
        eyebrow: "Escucha Ciudadana",
        title: `${d.name} propone, Pablo escucha`,
        sub: `Este municipio lo conocen quienes lo habitan. Deja tu idea para el desarrollo de ${d.name}.`,
        sectorLabel: "Vereda, barrio o sector",
        ...d.escucha,
      },
    },
  };
}

export const DOSQUEBRADAS = pagina({
  slug: "dosquebradas",
  name: "Dosquebradas",
  hero: {
    image: "/municipios/dosquebradas.jpg",
    alt: "Paisaje rural de montaña en Dosquebradas, Risaralda",
    pos: "center 60%",
    icon: "sparkles",
    credit: commons("Una_Montaña_de_Colores-Pereira-Dosquebradas.jpg", "Jamolinao", "CC BY-SA 3.0"),
  },
  nickname: "Cuna de artistas de la región",
  headlineHl: "industria y cultura",
  intro: "Vecina inseparable de Pereira y parte del Paisaje Cultural Cafetero, Dosquebradas combina industria, comercio y una vida cultural que la convierte en cuna de artistas de la región.",
  quote: "Dosquebradas trabaja, produce y crea. Mi compromiso es que ese esfuerzo tenga vías, empleo y seguridad a la altura de una ciudad que no para.",
  municipio: {
    intro: [
      "Dosquebradas hace parte del <strong>Paisaje Cultural Cafetero</strong>, declarado por la UNESCO en 2011. Sus veredas de ladera combinan café, plátano y guadua con una zona urbana industrial y comercial.",
      "Es reconocida como <strong>cuna de artistas</strong>: teatro, danza, pintura, escritura y un creciente desarrollo del cine y el audiovisual.",
    ],
    stats: [distancia(2), superficie("70,8"), poblacion("226.152"), fundacion("1844"), especialidad("Industria, comercio y cultura", "sparkles")],
    flag: flag("dosquebradas", "Flag_of_Dosquebradas_(Risaralda).svg", "Milenioscuro", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "road", title: "Movilidad metropolitana", desc: "Corredores viales y transporte integrado con Pereira para que ir a trabajar o estudiar no cueste horas cada día." },
    { icon: "handshake", title: "Empleo industrial y emprendimiento", desc: "Apoyo a la industria y al comercio local, con formación técnica conectada con las empresas del municipio." },
    { icon: "sparkles", title: "Dosquebradas creativa", desc: "Respaldo a los procesos de cine, teatro y danza que ya existen, con escenarios y circulación para sus artistas." },
    { icon: "shield", title: "Seguridad y espacio público", desc: "Prevención del delito, iluminación y recuperación de parques como el Lago de la Pradera para la vida en familia." },
  ],
  eventos: [
    { month: "Noviembre · Diciembre", title: "Fiestas del Progreso", desc: "Conmemoran el aniversario de vida político-administrativa del municipio. El 6 de diciembre se celebra con parada militar y desfiles por las principales avenidas." },
    { month: "Octubre", title: "FESTICINE", desc: "Festival Internacional de Cine de Dosquebradas, organizado por la Fundación Charlot desde 2006 en homenaje al cine y a la memoria de Charles Chaplin." },
  ],
  propuestasTitle: "Una ciudad que produce<br/>merece moverse mejor",
  propuestasSub: "Un plan para que la industria, el comercio y la cultura de Dosquebradas se traduzcan en empleo, movilidad y seguridad.",
  escucha: {
    tags: ["Movilidad", "Empleo", "Seguridad", "Cultura", "Otro"],
    sectorPlaceholder: "Ej. La Pradera, Frailes, Alto del Oso…",
    ideaPlaceholder: "¿Qué necesita Dosquebradas para seguir creciendo?",
  },
});

export const SANTA_ROSA = pagina({
  slug: "santa-rosa-de-cabal",
  name: "Santa Rosa de Cabal",
  hero: {
    image: "/municipios/santa-rosa-de-cabal.jpg",
    alt: "Cascada de los Termales de Santa Rosa de Cabal",
    pos: "center 40%",
    icon: "leaf",
    credit: commons("Imagen_de_los_Termales_de_Santa_Rosa_de_Cabal.jpg", "Colombia Turiscol", "CC0"),
  },
  nickname: "La Ciudad de las Araucarias",
  headlineHl: "termales y tradición",
  intro: "Aguas termales, chorizo santarrosano y la arquitectura de balcones de la colonización antioqueña. Santa Rosa de Cabal es uno de los grandes destinos turísticos del Eje Cafetero.",
  quote: "Santa Rosa ya enamora a quien la visita. Mi compromiso es que el turismo y el café dejen más ingresos en las familias santarrosanas.",
  municipio: {
    intro: [
      "Fundada el 13 de octubre de 1844 por el colono Fermín López y sus hijos, Santa Rosa de Cabal tuvo un papel relevante en la <strong>colonización antioqueña</strong>.",
      "Su economía gira alrededor del <strong>café</strong> y del <strong>turismo</strong>: balnearios de aguas termales, la Basílica Menor, el Parque de las Araucarias y el famoso chorizo santarrosano.",
    ],
    stats: [distancia(15), altitud("1.715"), { icon: "thermometer", label: "Temperatura", value: "Promedio 19 °C" }, poblacion("80.012"), fundacion("13 de octubre de 1844"), especialidad("Termales, café y chorizo")],
    flag: flag("santa-rosa-de-cabal", "Flag_of_Santa_Rosa_de_Cabal_(Risaralda).svg", "BrCaLeTo", "dominio público"),
  },
  propuestas: [
    { icon: "leaf", title: "Turismo termal sostenible", desc: "Vías de acceso seguras a los termales y reglas claras para crecer sin deteriorar los ríos y bosques que los hacen posibles." },
    { icon: "utensils", title: "Chorizo santarrosano con marca", desc: "Apoyo a productores locales para certificar, empacar y vender el chorizo santarrosano en mercados nacionales." },
    { icon: "coffee", title: "Café que llega a la mesa del turista", desc: "Rutas de finca y experiencias cafeteras que conecten a los caficultores con los visitantes." },
    { icon: "users", title: "Oportunidades para la juventud", desc: "Formación en bilingüismo, guianza y servicios turísticos para que los jóvenes encuentren empleo en su municipio." },
  ],
  eventos: [
    { month: "Octubre", title: "Fiestas de las Araucarias", desc: "Las fiestas conmemorativas de la fundación del municipio, celebradas alrededor del Parque de las Araucarias frente a la Basílica." },
    { month: "Diciembre", title: "Concurso Nacional de Villancicos", desc: "Creado mediante Ordenanza Departamental, reúne cada diciembre a coros y agrupaciones de todo el país." },
    { month: "Cada año", title: "Cabal Fest", desc: "Festival de música alternativa que se realiza cada año en el municipio." },
  ],
  gastronomia: [
    { icon: "utensils", title: "Platos Fuertes", items: ["Sancocho de gallina", "Bandeja paisa", "Frijoles con garra"] },
    { icon: "wheat", title: "Mecato y Snacks", items: ["Chorizo santarrosano", "Arepa de chócolo", "Empanadas con ají"] },
    { icon: "coffee", title: "Postres y Café", items: ["Café de origen", "Mazamorra con panela", "Dulces caseros"] },
  ],
  propuestasTitle: "Termales, café y chorizo<br/>que generan empleo",
  propuestasSub: "Un plan para que el turismo de Santa Rosa de Cabal crezca con calidad y deje oportunidades en su gente.",
  escucha: {
    tags: ["Turismo", "Café", "Juventud", "Medio ambiente", "Otro"],
    sectorPlaceholder: "Ej. Centro, vereda El Español…",
    ideaPlaceholder: "¿Qué necesita Santa Rosa de Cabal para crecer?",
  },
});

export const LA_VIRGINIA = pagina({
  slug: "la-virginia",
  name: "La Virginia",
  hero: {
    image: "/municipios/la-virginia.jpg",
    alt: "Río Cauca al atardecer cerca de La Virginia",
    icon: "wind",
    credit: commons("Rio_Cauca_at_dusk_near_La_Virginia.JPG", "CONOCER (Wikivoyage)", "dominio público"),
  },
  nickname: "El Puerto Dulce de Colombia",
  headlineHl: "puerto del río Cauca",
  intro: "A orillas del río Cauca, La Virginia vive del comercio, la agricultura y el río. Tierra del Caballero Gaucho y municipio con vocación turística alrededor de su parador náutico.",
  quote: "La Virginia tiene un río que es riqueza. Mi compromiso es cuidarlo y convertirlo en empleo, turismo y seguridad para sus familias.",
  municipio: {
    intro: [
      "Sus primeros habitantes fueron las comunidades <strong>ansermas y apías</strong>; más tarde llegaron familias negras y mulatas que formaron el caserío de Nigricia, luego Sopinga, La Bodega y finalmente La Virginia.",
      "Es conocida como <strong>El Puerto Dulce de Colombia</strong> por su parador náutico. Aquí vivió hasta su muerte el cantante <strong>Luis Ángel Ramírez, el Caballero Gaucho</strong>.",
    ],
    stats: [distancia(30), altitud("899"), superficie("33"), poblacion("28.555"), fundacion("Noviembre de 1888"), especialidad("Comercio, frutas y río Cauca", "wind")],
    flag: flag("la-virginia", "Flag_of_La_Virginia_(Risaralda).svg", "BrCaLeTo", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "wind", title: "Río Cauca como motor turístico", desc: "Fortalecer el parador náutico y los recorridos por el río con operadores locales formados y seguros." },
    { icon: "wheat", title: "Agro y pesca con valor agregado", desc: "Apoyo a productores de frutas, plátano y cacao, y a los pescadores, para vender mejor y con menos intermediarios." },
    { icon: "shield", title: "Seguridad y convivencia", desc: "Prevención del delito y oferta deportiva y cultural para la juventud en barrios y corregimientos." },
    { icon: "road", title: "Movilidad para quienes trabajan en Pereira", desc: "Transporte seguro y ciclorrutas para una población que se mueve en bicicleta y moto." },
  ],
  eventos: [],
  gastronomia: [
    { icon: "utensils", title: "Platos Fuertes", items: ["Pescado de río", "Sancocho de gallina", "Frijoles con garra"] },
    { icon: "wheat", title: "Mecato y Snacks", items: ["Patacón", "Empanadas con ají", "Arepa de chócolo"] },
    { icon: "coffee", title: "Postres y Café", items: ["Jugos de frutas del valle", "Café de origen", "Dulces caseros"] },
  ],
  propuestasTitle: "Un río que genera<br/>turismo y empleo",
  propuestasSub: "Un plan para que el río Cauca, el comercio y el agro de La Virginia se conviertan en oportunidades para su gente.",
  escucha: {
    tags: ["Río Cauca", "Seguridad", "Empleo", "Movilidad", "Otro"],
    sectorPlaceholder: "Ej. Centro, Caimalito…",
    ideaPlaceholder: "¿Qué necesita La Virginia para crecer?",
  },
});

export const MARSELLA = pagina({
  slug: "marsella",
  name: "Marsella",
  hero: {
    image: "/municipios/marsella.jpg",
    alt: "Iglesia María Inmaculada de Marsella",
    pos: "center 35%",
    icon: "coffee",
    credit: commons("Iglesia_Maria_Inmaculada,_Marsella.jpg", "Darthvader2", "CC BY-SA 4.0"),
  },
  nickname: "Paisaje Cultural Cafetero",
  headlineHl: "tradición cafetera",
  intro: "Fundada en 1860 como Villa Rica de Segovia, Marsella conserva su casa de la cultura, su iglesia María Inmaculada y un jardín botánico en el corazón del Paisaje Cultural Cafetero.",
  quote: "Marsella guarda la historia del café en cada calle. Mi compromiso es que esa historia se convierta en futuro para sus caficultores y sus jóvenes.",
  municipio: {
    intro: [
      "Fundada el 18 de julio de 1860 por <strong>Pedro Pineda y María Gregoria Muñoz</strong>, se llamó Villa Rica de Segovia y luego Segovia; se denomina Marsella desde el 8 de abril de 1915.",
      "Forma parte del <strong>Paisaje Cultural Cafetero</strong>, Patrimonio de la Humanidad. Su casa de la cultura, la iglesia María Inmaculada y el jardín botánico son sus sitios emblemáticos.",
    ],
    stats: [distancia(30), altitud("1.575"), superficie("149"), poblacion("17.240"), fundacion("18 de julio de 1860"), especialidad("Café y patrimonio")],
    flag: flag("marsella", "Flag_of_Marsella_(Risaralda).svg", "Milenioscuro", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "coffee", title: "Café de Marsella con identidad", desc: "Apoyo técnico y comercial a los caficultores para vender café de calidad con origen reconocido." },
    { icon: "sparkles", title: "Patrimonio que atrae visitantes", desc: "Mantenimiento de la casa de la cultura, el templo y el jardín botánico como ruta turística del municipio." },
    { icon: "road", title: "Vías terciarias para sacar la cosecha", desc: "Mantenimiento de caminos veredales con las juntas de acción comunal." },
    { icon: "book", title: "Educación rural y conectividad", desc: "Internet en las escuelas veredales y formación técnica para que los jóvenes no tengan que irse." },
  ],
  eventos: [
    { month: "Julio", title: "Fiestas Aniversarias", desc: "Se celebran del 18 al 20 de julio en conmemoración de la fundación del municipio." },
    { month: "Noviembre", title: "Fiestas del Amor y la Amistad", desc: "Una de las celebraciones más destacadas del calendario marsellés." },
  ],
  propuestasTitle: "Historia cafetera<br/>con futuro",
  propuestasSub: "Un plan para que el café, el patrimonio y la juventud de Marsella tengan las oportunidades que merecen.",
  escucha: {
    tags: ["Café", "Turismo", "Vías", "Educación", "Otro"],
    sectorPlaceholder: "Ej. Centro, vereda…",
    ideaPlaceholder: "¿Qué necesita Marsella para crecer?",
  },
});

export const BELEN_DE_UMBRIA = pagina({
  slug: "belen-de-umbria",
  name: "Belén de Umbría",
  hero: {
    image: "/municipios/belen-de-umbria.jpg",
    alt: "Iglesia de Belén de Umbría",
    pos: "center 30%",
    icon: "bird",
    credit: commons("Iglesia_Belen_Umbria_Risalada.JPG", "Camiloo.97", "CC BY-SA 3.0"),
  },
  nickname: "Tradición paisa y cafetera",
  headlineHl: "café, aves y panela",
  intro: "Café tecnificado, trapiches de panela, cítricos y avistamiento de aves. Belén de Umbría es un municipio de tradición paisa y cafetera que recibe al visitante con amabilidad.",
  quote: "Belén de Umbría produce café, panela y frutas de calidad. Mi compromiso es que sus campesinos vendan mejor y que el turismo llegue a sus veredas.",
  municipio: {
    intro: [
      "En tiempos de la conquista habitaban estas tierras los <strong>Umbrá</strong> y otros pueblos. Hoy es un municipio de tradición paisa y cafetera, con el café como su principal fuente de empleo.",
      "Uno de sus íconos es el <strong>Carpati</strong>, vehículo del transporte rural que se volvió símbolo de su cultura. También produce cítricos, plátano y frutas de clima frío.",
    ],
    stats: [distancia(75), altitud("1.525"), superficie("182,4"), poblacion("25.339"), fundacion("10 de agosto de 1890"), especialidad("Café, panela y cítricos")],
    flag: flag("belen-de-umbria", "Flag_of_Belén_de_Umbría_(Risaralda).svg", "BrCaLeTo", "dominio público"),
  },
  propuestas: [
    { icon: "wheat", title: "Comercialización campesina", desc: "Centros de acopio y acuerdos de compra para que café, cítricos y frutas lleguen al mercado sin tantos intermediarios." },
    { icon: "bird", title: "Aviturismo y naturaleza", desc: "Senderos y formación de guías locales para el avistamiento de aves y las cascadas del municipio." },
    { icon: "road", title: "Vías para el Carpati", desc: "Mantenimiento de las vías terciarias por las que sale la cosecha y se mueve el transporte rural." },
    { icon: "coffee", title: "Trapiches y panela con valor agregado", desc: "Apoyo a los trapiches para mejorar procesos, empaques y turismo agrícola alrededor de la panela." },
  ],
  eventos: [
    { month: "Noviembre", title: "Fiestas Aniversarias de la Paisanidad", desc: "Nacieron de las fiestas patronales del Misericordioso en épocas de cosecha cafetera y hoy honran el fuerte ancestro paisa del municipio." },
    { month: "Cada año", title: "Festival Nacional de la Canción Campesina", desc: "Encuentro musical que acompaña las festividades del municipio." },
  ],
  propuestasTitle: "Del campo al mercado<br/>con precio justo",
  propuestasSub: "Un plan para que el café, la panela y la naturaleza de Belén de Umbría generen ingresos en sus veredas.",
  escucha: {
    tags: ["Café", "Aviturismo", "Vías", "Panela", "Otro"],
    sectorPlaceholder: "Ej. Centro, La Isla, Remolinos…",
    ideaPlaceholder: "¿Qué necesita Belén de Umbría para crecer?",
  },
});

export const SANTUARIO = pagina({
  slug: "santuario",
  name: "Santuario",
  hero: {
    image: "/municipios/santuario.jpg",
    alt: "Calle Real de Santuario con sus balcones",
    icon: "mountain",
    credit: commons("Santuario_(Risaralda).jpg", "JuanMunduy", "CC BY-SA 3.0"),
  },
  nickname: "Puerta del Parque Nacional Natural Tatamá",
  headlineHl: "naturaleza y Calle Real",
  intro: "Balcones de colores en su Calle Real, café en sus laderas y el Parque Nacional Natural Tatamá como vecino. Santuario es naturaleza y tradición paisa.",
  quote: "Santuario tiene la puerta a uno de los tesoros naturales de Colombia. Mi compromiso es que ese tesoro se cuide y genere empleo en el municipio.",
  municipio: {
    intro: [
      "Fundado el 20 de julio de 1886 bajo la tutela de Anserma, se erigió como municipio en <strong>1907</strong>.",
      "Centra su economía en el <strong>café</strong>, la agricultura, la ganadería y la explotación forestal. Es acceso al <strong>Parque Nacional Natural Tatamá</strong>.",
    ],
    stats: [distancia(64), altitud("1.565"), poblacion("12.868"), fundacion("20 de julio de 1886"), especialidad("Café y naturaleza")],
    flag: flag("santuario", "Flag_of_Santuario,_Risaralda.svg", "Johannes Rössel", "dominio público"),
  },
  propuestas: [
    { icon: "mountain", title: "Ecoturismo responsable en el Tatamá", desc: "Guías locales certificados, senderos ordenados y posadas rurales que protejan el parque y generen ingresos." },
    { icon: "coffee", title: "Café de montaña con valor agregado", desc: "Apoyo a los caficultores para mejorar calidad, secado y venta directa." },
    { icon: "sparkles", title: "Calle Real y patrimonio", desc: "Mantenimiento de la arquitectura tradicional como atractivo para quienes visitan el municipio." },
    { icon: "road", title: "Vías y conectividad rural", desc: "Caminos veredales transitables e internet en escuelas y centros poblados." },
  ],
  eventos: [
    { month: "Julio", title: "Fiestas de la Virgen del Carmen", desc: "Celebración religiosa y popular que hace parte de las fiestas del municipio." },
    { month: "Diciembre", title: "Fiestas de la Virgen Inmaculada", desc: "Fiestas parroquiales en honor a la patrona del templo principal." },
    { month: "Cada año", title: "Feria Agropecuaria y Fiesta del Ancestro Paisa", desc: "Encuentros que celebran la vocación campesina y la herencia paisa de Santuario." },
  ],
  propuestasTitle: "Naturaleza protegida<br/>que genera empleo",
  propuestasSub: "Un plan para que el Tatamá, el café y el patrimonio de Santuario sean oportunidades para quienes viven aquí.",
  escucha: {
    tags: ["Ecoturismo", "Café", "Vías", "Patrimonio", "Otro"],
    sectorPlaceholder: "Ej. Centro, vereda La Cumbre…",
    ideaPlaceholder: "¿Qué necesita Santuario para crecer cuidando su naturaleza?",
  },
});

export const LA_CELIA = pagina({
  slug: "la-celia",
  name: "La Celia",
  hero: {
    image: "/municipios/la-celia.jpg",
    alt: "Panorama del casco urbano de La Celia",
    icon: "leaf",
    credit: commons("La_Celia_DSC00325.JPG", "Asshello", "dominio público"),
  },
  nickname: "Bella flor del Risaralda",
  headlineHl: "café, plátano y aguacate",
  intro: "Un pueblo de montaña que lleva el nombre de una comerciante y líder llamada Celia. Café y plátano sostienen su economía, y el aguacate empieza a abrir nuevas oportunidades.",
  quote: "La Celia es pequeña en tamaño y grande en trabajo. Mi compromiso es que el campo celianés tenga vías, crédito y mercado.",
  municipio: {
    intro: [
      "La colonización comenzó en 1893 con Manuel Marín y Martín Ortiz. En 1915 la aldea de Barcelona se convirtió en <strong>La Celia</strong>, nombre elegido en homenaje a una conocida comerciante y líder.",
      "Fue distrito de Santuario hasta ser declarado municipio el <strong>30 de noviembre de 1959</strong>. El café y el plátano representan más del 90 % de su producción agraria.",
    ],
    stats: [distancia(74), altitud("1.380"), superficie("102"), poblacion("7.669"), fundacion("25 de noviembre de 1915"), especialidad("Café, plátano y aguacate")],
    flag: flag("la-celia", "Flag_of_La_Celia_(Risaralda).svg", "BrCaLeTo", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "wheat", title: "Aguacate con futuro exportador", desc: "Asistencia técnica y certificaciones para que el aguacate celianés llegue a mejores mercados." },
    { icon: "coffee", title: "Café y plátano con precio justo", desc: "Acopio y comercialización asociativa para los productores que sostienen la economía del municipio." },
    { icon: "road", title: "Vías para sacar la cosecha", desc: "Mantenimiento de la vía de acceso y de los caminos veredales con las juntas de acción comunal." },
    { icon: "heart", title: "Salud cerca de casa", desc: "Telemedicina y brigadas de salud para que las veredas no dependan de largos viajes." },
  ],
  eventos: [
    { month: "Noviembre", title: "Fiestas de Aniversario", desc: "Se celebran en la última semana de noviembre y reúnen al municipio alrededor de su historia." },
  ],
  propuestasTitle: "Un campo que produce<br/>merece mercado",
  propuestasSub: "Un plan para que el café, el plátano y el aguacate de La Celia se traduzcan en bienestar para sus familias.",
  escucha: {
    tags: ["Agro", "Vías", "Salud", "Juventud", "Otro"],
    sectorPlaceholder: "Ej. Centro, vereda…",
    ideaPlaceholder: "¿Qué necesita La Celia para crecer?",
  },
});

export const MISTRATO = pagina({
  slug: "mistrato",
  name: "Mistrató",
  hero: {
    image: "/municipios/mistrato.jpg",
    alt: "Iglesia de San Antonio del Chamí, Mistrató",
    icon: "mountain",
    credit: commons("Iglesia_de_San_Antonio_del_Chamí.JPG", "Arboleda9106", "CC BY-SA 3.0"),
  },
  nickname: "Progreso, Paz, Cultura",
  headlineHl: "montaña y diversidad",
  intro: "Uno de los municipios más extensos de Risaralda, en la cordillera Occidental. Su lema, «Progreso, Paz, Cultura», resume lo que su gente espera del futuro.",
  quote: "Mistrató es grande en territorio y en diversidad. Mi compromiso es que el Estado llegue a cada vereda y a cada comunidad con respeto.",
  municipio: {
    intro: [
      "Fundado el <strong>18 de marzo de 1925</strong>, Mistrató tiene 755 km² de montaña y es uno de los municipios más extensos del departamento.",
      "Su lema, <strong>«Progreso, Paz, Cultura»</strong>, recoge la identidad de un territorio diverso.",
    ],
    stats: [distancia(86), altitud("1.518"), superficie("755"), poblacion("17.587"), fundacion("18 de marzo de 1925")],
    flag: flag("mistrato", "Flag_of_Mistrató_(Risaralda).svg", "BrCaLeTo", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "road", title: "Vías que acorten distancias", desc: "Mantenimiento de las vías rurales en un territorio extenso, para que la cosecha y los servicios lleguen." },
    { icon: "users", title: "Diálogo con las comunidades", desc: "Planeación concertada con las comunidades del territorio, con respeto por su autonomía y cultura." },
    { icon: "heart", title: "Salud y educación en lo rural", desc: "Brigadas de salud, telemedicina y escuelas conectadas en las zonas más alejadas." },
    { icon: "wheat", title: "Agro y seguridad alimentaria", desc: "Apoyo a la producción campesina para mejorar ingresos y abastecimiento local." },
  ],
  eventos: [],
  propuestasTitle: "Un territorio extenso<br/>que merece presencia",
  propuestasSub: "Un plan para que las vías, la salud y la educación lleguen a cada rincón de Mistrató.",
  escucha: {
    tags: ["Vías", "Salud", "Educación", "Agro", "Otro"],
    sectorPlaceholder: "Ej. Centro, San Antonio del Chamí…",
    ideaPlaceholder: "¿Qué necesita Mistrató para crecer?",
  },
});

export const PUEBLO_RICO = pagina({
  slug: "pueblo-rico",
  name: "Pueblo Rico",
  hero: {
    image: "/municipios/pueblo-rico.jpg",
    alt: "Plaza principal de Pueblo Rico",
    icon: "bird",
    credit: commons("Pueblo_Rico_Rda.jpg", "Fabio.morales", "CC BY-SA 4.0"),
  },
  nickname: "Donde convergen tres culturas",
  headlineHl: "selva, agua y diversidad",
  intro: "El municipio más extenso de Risaralda, donde conviven comunidades afro, indígenas y mestizas. Parque Nacional Natural Tatamá, ríos y avistamiento de aves.",
  quote: "Pueblo Rico es la diversidad de Risaralda. Mi compromiso es que sus tres culturas tengan las mismas oportunidades.",
  municipio: {
    intro: [
      "En el corregimiento de <strong>Santa Cecilia</strong> convergen las culturas afro, indígena y mestiza. Existen además resguardos indígenas en su territorio.",
      "Su economía gira alrededor de la <strong>caña panelera</strong>, el plátano, el banano y la ganadería. Ofrece turismo de aventura, ecológico y etnoturismo.",
    ],
    stats: [distancia(93), altitud("1.560"), superficie("1.020"), poblacion("16.792"), fundacion("6 de diciembre de 1886"), especialidad("Panela, plátano y ecoturismo", "wheat")],
    flag: flag("pueblo-rico", "Flag_of_Pueblo_Rico_(Risaralda).svg", "Milenioscuro", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "bird", title: "Ecoturismo y etnoturismo", desc: "Formación de guías locales para el Tatamá, el río Negro y el avistamiento de aves, con participación de las comunidades." },
    { icon: "users", title: "Tres culturas, un solo plan", desc: "Programas concertados con comunidades afro, indígenas y campesinas, respetando su autonomía." },
    { icon: "road", title: "Vías que integran el territorio", desc: "Mantenimiento de la conexión vial y de los caminos rurales que integran Santa Cecilia y las veredas." },
    { icon: "heart", title: "Salud y agua potable", desc: "Acueductos rurales y atención en salud para los centros poblados más alejados." },
  ],
  eventos: [],
  gastronomia: [
    { icon: "utensils", title: "Platos Fuertes", items: ["Sancocho de gallina", "Pescado de río", "Frijoles con garra"] },
    { icon: "wheat", title: "Mecato y Snacks", items: ["Patacón", "Empanadas con ají", "Arepa de chócolo"] },
    { icon: "coffee", title: "Postres y Bebidas", items: ["Aguapanela", "Dulces de panela", "Café de origen"] },
  ],
  propuestasTitle: "Diversidad que se<br/>convierte en futuro",
  propuestasSub: "Un plan para que la naturaleza y las culturas de Pueblo Rico generen bienestar para todas sus comunidades.",
  escucha: {
    tags: ["Ecoturismo", "Vías", "Salud", "Comunidades", "Otro"],
    sectorPlaceholder: "Ej. Centro, Santa Cecilia, Villa Claret…",
    ideaPlaceholder: "¿Qué necesita Pueblo Rico para crecer?",
  },
});

export const QUINCHIA = pagina({
  slug: "quinchia",
  name: "Quinchía",
  hero: {
    image: "/municipios/quinchia.jpg",
    alt: "Cerro Batero en Quinchía",
    icon: "mountain",
    credit: commons("Cerro_Batero_Quinchía.jpg", "Luisdiazcalle", "CC BY-SA 4.0"),
  },
  nickname: "La Villa de los Cerros",
  headlineHl: "café, mora y cerros",
  intro: "Cerros de historia indígena, café de excelente calidad y uno de los mayores productores de mora de la región. Quinchía mira al futuro desde la cordillera Occidental.",
  quote: "Quinchía produce café, mora y oro, y su gente sabe trabajar. Mi compromiso es que esa riqueza se quede en sus familias y se cuide su tierra.",
  municipio: {
    intro: [
      "Los indígenas la llamaban <strong>Guacuma</strong>. Su nombre actual viene de los «quinchos», las fortalezas de guadua de los Tapascos que impresionaron a los conquistadores.",
      "Su economía es <strong>agrícola y minera</strong>: café de excelente calidad, plátano, yuca, caña panelera, mora y espárragos, además de la producción de oro.",
    ],
    stats: [distancia(110), superficie("149,8"), poblacion("27.980"), fundacion("29 de noviembre de 1888"), especialidad("Café, mora y minería")],
    flag: flag("quinchia", "Flag_of_Quinchía_(Risaralda).svg", "BrCaLeTo", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "wheat", title: "Mora y café con mercado asegurado", desc: "Centros de acopio y acuerdos comerciales para que los productores vendan con mejor precio." },
    { icon: "leaf", title: "Minería responsable y agua limpia", desc: "Acompañamiento a la formalización minera y protección de las fuentes de agua del municipio." },
    { icon: "mountain", title: "Turismo en los cerros", desc: "Senderos y miradores en el Cerro Batero y otros cerros, con guías formados en el municipio." },
    { icon: "road", title: "Vías hacia Pereira y la región", desc: "Mantenimiento de la conexión vial para reducir costos y tiempos de viaje." },
  ],
  eventos: [],
  gastronomia: [
    { icon: "utensils", title: "Platos Fuertes", items: ["Sancocho de gallina", "Bandeja paisa", "Frijoles con garra"] },
    { icon: "wheat", title: "Mecato y Snacks", items: ["Chorizo con arepa", "Empanadas con ají", "Arepa de chócolo"] },
    { icon: "coffee", title: "Postres y Bebidas", items: ["Jugo y dulce de mora", "Café de origen", "Aguapanela"] },
  ],
  propuestasTitle: "La riqueza de los cerros<br/>para su gente",
  propuestasSub: "Un plan para que el café, la mora y el oro de Quinchía se traduzcan en bienestar, cuidando el agua y la tierra.",
  escucha: {
    tags: ["Agro", "Minería", "Vías", "Turismo", "Otro"],
    sectorPlaceholder: "Ej. Centro, vereda…",
    ideaPlaceholder: "¿Qué necesita Quinchía para crecer?",
  },
});

export const GUATICA = pagina({
  slug: "guatica",
  name: "Guática",
  hero: {
    image: "/municipios/guatica.jpg",
    alt: "Guática vista desde la vía Anserma – Riosucio",
    icon: "coffee",
    credit: commons("Guática_visto_desde_la_Via_Anserma_-_Riosucio_-_panoramio.jpg", "rothware", "CC BY-SA 3.0"),
  },
  nickname: "Hospitalidad en la montaña",
  headlineHl: "cafés de especialidad",
  intro: "A 1.820 metros de altura, Guática ofrece aventura, cafés de especialidad y paisajes desde su cabecera. Una tierra de gente hospitalaria y de grupos artísticos reconocidos.",
  quote: "Guática tiene café de especialidad y gente que recibe con los brazos abiertos. Mi compromiso es que el mundo lo sepa y que eso deje ingresos en el municipio.",
  municipio: {
    intro: [
      "Su nombre recuerda al <strong>cacique Guática</strong>, de la familia de los Anserma. Fue declarado municipio el <strong>22 de abril de 1921</strong>.",
      "Tiene potencial para el turismo de aventura y los <strong>cafés de especialidad</strong>, y grupos artísticos reconocidos a nivel departamental y nacional.",
    ],
    stats: [distancia(94), altitud("1.820"), superficie("100,67"), poblacion("12.451"), { icon: "calendar", label: "Municipio desde", value: "22 de abril de 1921" }, especialidad("Cafés de especialidad")],
    flag: flag("guatica", "Flag_of_Guática_(Risaralda).svg", "BrCaLeTo", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "coffee", title: "Cafés de especialidad con marca", desc: "Acompañamiento en calidad, tostión y venta directa para los productores de cafés especiales." },
    { icon: "mountain", title: "Turismo de aventura", desc: "Rutas, miradores y operadores locales formados para recibir visitantes con seguridad." },
    { icon: "sparkles", title: "Cultura que se escucha", desc: "Apoyo a las bandas, orquestas y grupos de danza del municipio para que circulen en la región." },
    { icon: "road", title: "Vías y conectividad", desc: "Mantenimiento de vías terciarias e internet en las veredas." },
  ],
  eventos: [],
  propuestasTitle: "Café de especialidad<br/>y hospitalidad",
  propuestasSub: "Un plan para que el café, el paisaje y la cultura de Guática generen oportunidades para su gente.",
  escucha: {
    tags: ["Café", "Turismo", "Cultura", "Vías", "Otro"],
    sectorPlaceholder: "Ej. Centro, San Clemente…",
    ideaPlaceholder: "¿Qué necesita Guática para crecer?",
  },
});

export const BALBOA = pagina({
  slug: "balboa",
  name: "Balboa",
  hero: {
    image: "/municipios/balboa.jpg",
    alt: "Vista panorámica de Balboa, Risaralda",
    pos: "center 60%",
    icon: "mountain",
    credit: commons("Balboa_risaralda_-_panoramio.jpg", "harrigonsa", "CC BY-SA 3.0"),
  },
  nickname: "Labor y Paz",
  headlineHl: "mirador del Risaralda",
  intro: "Balboa mira desde lo alto el valle del río Risaralda. Agricultura, ganadería, un jardín botánico y el parque natural Alto del Rey hacen parte de su vida.",
  quote: "Balboa es un mirador de todo el valle. Mi compromiso es que desde aquí también se vea el progreso llegar a sus veredas.",
  municipio: {
    intro: [
      "Fue fundado por <strong>colonos antioqueños</strong> a comienzos del siglo XX. Su lema es <strong>«Labor y Paz»</strong>.",
      "Sus actividades más significativas son la <strong>agricultura y la ganadería</strong>. Entre sus sitios de interés están la vista panorámica del valle del Risaralda, el Jardín Botánico y el parque natural Alto del Rey.",
    ],
    stats: [distancia(52), altitud("1.550"), superficie("120,5"), poblacion("6.525"), fundacion("1908"), especialidad("Agricultura y ganadería", "wheat")],
    flag: flag("balboa", "Flag_of_Balboa_(Risaralda).svg", "BrCaLeTo", "CC BY-SA 3.0"),
  },
  propuestas: [
    { icon: "wheat", title: "Agro y ganadería con mejores precios", desc: "Asistencia técnica y comercialización asociativa para los productores del municipio." },
    { icon: "mountain", title: "Turismo de miradores y naturaleza", desc: "Senderos en el Alto del Rey y miradores sobre el valle del Risaralda, con guías locales." },
    { icon: "road", title: "Vías rurales transitables", desc: "Mantenimiento de las vías que conectan las veredas con la cabecera y con la región." },
    { icon: "book", title: "Educación y conectividad", desc: "Escuelas conectadas y formación técnica para los jóvenes del municipio." },
  ],
  eventos: [
    { month: "Abril", title: "Fiestas Aniversarias", desc: "Se celebran la última semana de abril." },
    { month: "Julio", title: "Fiestas del Campesino", desc: "Del 15 al 30 de julio, en honor a la vocación agrícola del municipio." },
    { month: "Marzo · Abril", title: "Semana Santa", desc: "Celebraciones religiosas que reúnen a las familias balboenses." },
  ],
  propuestasTitle: "Del mirador del valle<br/>al progreso de sus veredas",
  propuestasSub: "Un plan para que el campo, el paisaje y la juventud de Balboa tengan oportunidades reales.",
  escucha: {
    tags: ["Agro", "Turismo", "Vías", "Educación", "Otro"],
    sectorPlaceholder: "Ej. Centro, vereda…",
    ideaPlaceholder: "¿Qué necesita Balboa para crecer?",
  },
});

/* En el orden de DATA.municipios (portada). */
export const MUNICIPIO_PAGES: MunicipioPageData[] = [
  DATA.pereira,
  DOSQUEBRADAS,
  SANTA_ROSA,
  LA_VIRGINIA,
  MARSELLA,
  BELEN_DE_UMBRIA,
  DATA.apia,
  SANTUARIO,
  LA_CELIA,
  MISTRATO,
  PUEBLO_RICO,
  QUINCHIA,
  GUATICA,
  BALBOA,
];

export const getMunicipioPage = (slug: string) => MUNICIPIO_PAGES.find((m) => m.slug === slug);

export const getMunicipioPageByName = (name: string) => MUNICIPIO_PAGES.find((m) => m.name === name);
