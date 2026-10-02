/* Datos de campaña — Pablo Giordanelli, Gobernación de Risaralda 2027-2030 */
window.DATA = {
  candidate: {
    name: "Pablo Giordanelli",
    role: "Candidato a Gobernador · Risaralda",
    period: "2027 — 2030",
    hashtag: "#RisaraldaNosUne",
  },

  nav: [
    { label: "Propuestas", href: "#propuestas" },
    { label: "Municipios", href: "#municipios" },
    { label: "Pablo", href: "#sobre" },
    { label: "Contacto", href: "#unete" },
  ],

  ribbon: [
    { num: "14", lbl: "Municipios de Risaralda" },
    { num: "1.0M+", lbl: "Risaraldenses a servir" },
    { num: "6", lbl: "Ejes de gobierno" },
    { num: "100%", lbl: "Compromiso con la región" },
  ],

  // Ejes temáticos / propuestas
  ejes: [
    {
      icon: "leaf",
      title: "Medio Ambiente y Sostenibilidad",
      desc: "Protección de nuestras cuencas hídricas, bosques y biodiversidad. Risaralda líder en economía verde y turismo ecológico responsable.",
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
    },
    {
      icon: "shield",
      title: "Seguridad y Convivencia",
      desc: "Estrategias de prevención del delito, apoyo a la Policía y Ejército, y programas de reintegración para una Risaralda más segura.",
    },
  ],

  // 14 municipios de Risaralda
  municipios: [
    { name: "Pereira", mono: "Pe", info: "Capital · ~500k hab." },
    { name: "Dosquebradas", mono: "Do", info: "~205k hab." },
    { name: "Santa Rosa de Cabal", mono: "SR", info: "~74k hab." },
    { name: "La Virginia", mono: "LV", info: "~45k hab." },
    { name: "Marsella", mono: "Ma", info: "~23k hab." },
    { name: "Belén de Umbría", mono: "BU", info: "~28k hab." },
    { name: "Apía", mono: "Ap", info: "~17k hab.", special: true },
    { name: "Santuario", mono: "Sa", info: "~15k hab." },
    { name: "La Celia", mono: "LC", info: "~8k hab." },
    { name: "Mistrató", mono: "Mi", info: "~18k hab." },
    { name: "Pueblo Rico", mono: "PR", info: "~14k hab." },
    { name: "Quinchía", mono: "Qu", info: "~32k hab." },
    { name: "Guática", mono: "Gu", info: "~18k hab." },
    { name: "Balboa", mono: "Ba", info: "~6k hab." },
  ],

  cifras: [
    { v: "14", k: "Municipios" },
    { v: "~1M", k: "Habitantes" },
    { v: "4.140", k: "km²" },
    { v: "Eje", k: "Cafetero" },
  ],

  // Sobre Pablo
  timeline: [
    { tt: "Trayectoria", tp: "Diputado de la Asamblea Departamental de Risaralda, trabajando por legislación que beneficie a todos los municipios." },
    { tt: "Compromiso Regional", tp: "Promotor de #RisaraldaNosUne, impulsando la identidad y unión del departamento en cada rincón." },
    { tt: "Cercanía con el Pueblo", tp: "Ha recorrido los 14 municipios, escuchando directamente a comunidades campesinas, jóvenes, empresarios y líderes sociales." },
    { tt: "Visión de Futuro", tp: "Candidato a Gobernador con una propuesta integral que prioriza educación, salud, infraestructura y medio ambiente." },
  ],

  municipiosSelect: ["Pereira","Dosquebradas","Santa Rosa de Cabal","La Virginia","Marsella","Belén de Umbría","Apía","Santuario","La Celia","Mistrató","Pueblo Rico","Quinchía","Guática","Balboa"],

  // ====== APÍA ======
  apia: {
    nickname: "El Corazón del Viento",
    eyebrow: "Municipio de Apía · Risaralda",
    headline1: "Apía,",
    headlineHl: "El Corazón del Viento",
    intro: "Entre las faldas del Cerro Tatamá y el aroma del café de altura, Apía respira naturaleza. Un destino de montaña, aves y tradición cafetera que merece un futuro a la altura de su belleza.",
    quote: "Apía no es solo un punto en el mapa: es identidad, es viento, es café. Mi compromiso es que el mundo venga a conocerla — y que sus habitantes vivan de ello.",

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
      { ph: "Cerro Tatamá", span: "span 7", rows: "span 2" },
      { ph: "Parque principal de Apía", span: "span 5", rows: "span 1" },
      { ph: "Café de altura", span: "span 5", rows: "span 1" },
      { ph: "Avistamiento de aves", span: "span 4", rows: "span 1" },
      { ph: "Senderos de montaña", span: "span 4", rows: "span 1" },
      { ph: "Cultura cafetera", span: "span 4", rows: "span 1" },
    ],

    semillas: [
      { name: "Marisol Grajales", muni: "Vereda La María", txt: "Necesitamos que los guías de la zona seamos certificados. Hay mucho turista de aves pero se va a dormir a Pereira.", tag: "Aviturismo" },
      { name: "Don Eliécer Ramírez", muni: "Caficultor", txt: "Que el café de Apía tenga su propia marca. Vendemos barato lo que vale oro.", tag: "Café de Altura" },
    ],
  },
};
