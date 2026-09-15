export interface AffiliateProduct {
  id: string;
  title: {
    en: string;
    nl: string;
    de: string;
    fr: string;
  };
  description: {
    en: string;
    nl: string;
    de: string;
    fr: string;
  };
  category: 'paper' | 'markers' | 'pencils' | 'crafts' | 'kits';
  badge: {
    en: string;
    nl: string;
    de: string;
    fr: string;
  };
  urlEn: string;
  urlNl: string;
  icon: string;
  imageUrl?: string;
}

export const AFFILIATE_PRODUCTS: AffiliateProduct[] = [
  {
    id: 'xerox-paper-160g',
    title: {
      en: 'Xerox Premium Heavyweight A4 Paper (160 GSM)',
      nl: 'Xerox Premium Zwaar A4 Papier (160 Gram)',
      de: 'Xerox Premium Schweres A4 Papier (160 g/m²)',
      fr: 'Papier A4 Épais Xerox Premium (160 g/m²)',
    },
    description: {
      en: 'High-density 160g paper prevents marker bleed-through and holds heavy coloring pencil layers perfectly.',
      nl: 'Extra stevig 160 gram papier voorkomt doordrukken van viltstiften en geeft het beste resultaat bij kleurpotloden.',
      de: 'Extra dickes 160g Papier verhindert Durchbluten von Filzstiften und sorgt für perfekte Farbabgabe.',
      fr: 'Papier 160g extra fort qui évite les saignements de feutres et offre un rendu couleur exceptionnel.',
    },
    category: 'paper',
    badge: {
      en: '📄 Best Paper for Printing',
      nl: '📄 Beste Papier voor Printen',
      de: '📄 Bestes Papier zum Drucken',
      fr: '📄 Meilleur Papier à Imprimer',
    },
    urlEn: 'https://amzn.to/4e77qxQ',
    urlNl: 'https://amzn.to/4gjYFSq',
    icon: '📄',
    imageUrl: '/affiliates/xerox-paper-160g.jpg',
  },
  {
    id: 'ohuhu-honolulu-markers',
    title: {
      en: 'Ohuhu Honolulu Dual Tip Brush Alcohol Markers',
      nl: 'Ohuhu Honolulu Dubbelzijdige Penseel Alcohol Stiften',
      de: 'Ohuhu Honolulu Alkohol-Pinselmarker Set',
      fr: 'Feutres à Alcool Pinceau Ohuhu Honolulu',
    },
    description: {
      en: 'Smooth blending brush markers for seamless shading and vibrant professional coloring.',
      nl: 'Professionele alcoholstiften met zachte penseelpunt voor naadloos overvloeien en schaduweffecten.',
      de: 'Professionelle Alkoholmarker mit weicher Pinseltspitze für nahtlose Übergänge und Schattierungen.',
      fr: 'Marqueurs professionnels à pointe pinceau pour des dégradés fluides et des couleurs éclatantes.',
    },
    category: 'markers',
    badge: {
      en: '🎨 Pro Choice',
      nl: '🎨 Keuze van Kleurders',
      de: '🎨 Profi Wahl',
      fr: '🎨 Choix des Pro',
    },
    urlEn: 'https://amzn.to/4fLte3m',
    urlNl: 'https://amzn.to/3SGs7rV',
    icon: '🎨',
    imageUrl: '/affiliates/ohuhu-honolulu-markers.jpg',
  },
  {
    id: 'faber-castell-polychromos',
    title: {
      en: 'Faber-Castell Polychromos Artist Pencils',
      nl: 'Faber-Castell Polychromos Kunstenaars Potloden',
      de: 'Faber-Castell Polychromos Künstlerfarbstifte',
      fr: 'Crayons de Couleur Faber-Castell Polychromos',
    },
    description: {
      en: 'Oil-based break-resistant pencils with intense pigment and lightfast buttery smoothness.',
      nl: 'Lichtechte kunstenaarspotloden op oliebasis met ongeëvenaarde kleurkracht en breekvaste kern.',
      de: 'Lichtbeständige Künstlerstifte auf Ölbasis mit hervorragender Farbbrillanz.',
      fr: 'Crayons professionnels à base d’huile pour des mélanges denses et résistants à la lumière.',
    },
    category: 'pencils',
    badge: {
      en: '✏️ Premium Quality',
      nl: '✏️ Premium Kwaliteit',
      de: '✏️ Premium Qualität',
      fr: '✏️ Qualité Supérieure',
    },
    urlEn: 'https://amzn.to/3Qh106a',
    urlNl: 'https://amzn.to/3SGs1k3',
    icon: '✏️',
    imageUrl: '/affiliates/faber-castell-polychromos.jpg',
  },
  {
    id: 'crayola-supertips-50',
    title: {
      en: 'Crayola Super Tips Washable Markers (50 Pack)',
      nl: 'Crayola Super Tips Afwasbare Viltstiften (50 Stuks)',
      de: 'Crayola Super Tips Waschbare Filzstifte (50er Set)',
      fr: 'Feutres Lavables Crayola Super Tips (Set de 50)',
    },
    description: {
      en: 'Versatile conical tips draw fine lines and fill large areas easily. 100% washable from skin and clothes.',
      nl: 'Veelzijdige stiften voor fijne lijnen en grote vlakken. 100% uitwasbaar uit kleding en van de huid.',
      de: 'Vielseitige Stifte für feine Linien und große Flächen. Leicht auswaschbar.',
      fr: 'Pointes coniques pour lignes fines et grands remplissages. Feutres ultra lavables.',
    },
    category: 'markers',
    badge: {
      en: '🌈 Kids Favorite',
      nl: '🌈 Favoriet bij Kinderen',
      de: '🌈 Kinder-Liebling',
      fr: '🌈 Favori des Enfants',
    },
    urlEn: 'https://amzn.to/4e9mjzK',
    urlNl: 'https://amzn.to/447riLc',
    icon: '🌈',
    imageUrl: '/affiliates/crayola-supertips-50.jpg',
  },
  {
    id: 'faber-castell-castle-60',
    title: {
      en: 'Faber-Castell Castle Colored Pencils (60 Pack)',
      nl: 'Faber-Castell Kasteel Kleurpotloden (60 Stuks)',
      de: 'Faber-Castell Schloss Buntstifte (60er Set)',
      fr: 'Crayons de Couleur Faber-Castell Castle (60)',
    },
    description: {
      en: 'Ergonomic hexagonal colored pencils with break-resistant SV bonding for school and hobbies.',
      nl: 'Ergonomische zeshoekige potloden met breekbestendige SV-binding. Ideaal voor thuis en school.',
      de: 'Ergonomische Sechskant-Buntstifte mit bruchgeschützter SV-Verleimung.',
      fr: 'Crayons hexagonaux ergonomiques avec mine solide incassable.',
    },
    category: 'pencils',
    badge: {
      en: '⭐ Best Value',
      nl: '⭐ Beste Prijs-Kwaliteit',
      de: '⭐ Preis-Leistungssieger',
      fr: '⭐ Meilleur Rapport Qualité/Prix',
    },
    urlEn: 'https://amzn.to/4a1D4ud',
    urlNl: 'https://amzn.to/4glizMN',
    icon: '⭐',
    imageUrl: '/affiliates/faber-castell-castle-60.jpg',
  },
  {
    id: 'guangna-acrylic-markers',
    title: {
      en: 'Guangna Waterproof Acrylic Paint Markers',
      nl: 'Guangna Waterdichte Acryl Stiften',
      de: 'Guangna Wasserfeste Acrylmarker',
      fr: 'Marqueurs Peinture Acrylique Guangna',
    },
    description: {
      en: 'Quick-drying acrylic paint pens that color on paper, wood, rocks, glass, and fabric.',
      nl: 'Sneldrogende acryl-verfstiften geschikt voor papier, steen, hout, glas en textiel.',
      de: 'Schnelltrocknende Acrylfarbstifte für Papier, Steine, Holz und Textilien.',
      fr: 'Feutres peinture acrylique à séchage rapide pour papier, bois, roches et tissu.',
    },
    category: 'markers',
    badge: {
      en: '🖌️ Multi-Surface',
      nl: '🖌️ Voor Alle Ondergronden',
      de: '🖌️ Für Alle Oberflächen',
      fr: '🖌️ Multi-Surfaces',
    },
    urlEn: 'https://amzn.to/43K3FbE',
    urlNl: 'https://amzn.to/4oJ0wCH',
    icon: '🖌️',
    imageUrl: '/affiliates/guangna-acrylic-markers.jpg',
  },
  {
    id: 'tempera-paint-sticks-30',
    title: {
      en: 'Solid Tempera Paint Sticks (30 Pack)',
      nl: 'Vaste Plakkaatverf Sticks (30 Stuks)',
      de: 'Feste Temperafarbe Malstifte (30er Set)',
      fr: 'Bâtons de Peinture Gouache Solide (30)',
    },
    description: {
      en: 'Mess-free quick-drying paint sticks. Feels like drawing with oil pastels, dries in 90 seconds.',
      nl: 'Smeerboel-vrij schilderen zonder water! Droogt binnen 90 seconden op papier en karton.',
      de: 'Malen ohne Kleckern und ohne Wasser! Trocknet in unter 90 Sekunden.',
      fr: 'Peinture propre sans eau ni pinceaux! Sèche en 90 secondes sur papier.',
    },
    category: 'crafts',
    badge: {
      en: '🖍️ Mess-Free Painting',
      nl: '🖍️ Schoon Schilderen',
      de: '🖍️ Sauberes Malen',
      fr: '🖍️ Peinture Propre',
    },
    urlEn: 'https://amzn.to/4xHhd5A',
    urlNl: 'https://amzn.to/3QP5jFV',
    icon: '🖍️',
    imageUrl: '/affiliates/tempera-paint-sticks-30.jpg',
  },
  {
    id: 'kinspory-art-set-150',
    title: {
      en: 'Kinspory Professional Deluxe Art Set in Case',
      nl: 'Kinspory Luxe 150-Delige Teken- & Schilder koffer',
      de: 'Kinspory Malset im Aluminium Koffer (150-teilig)',
      fr: 'Coffret d’Art Complet Kinspory (150 pièces)',
    },
    description: {
      en: 'Complete 150+ piece art suitcase with watercolors, colored pencils, markers, oil pastels, and brushes.',
      nl: 'Complete 150-delige kunstenaarskoffer met aquarel, kleurpotloden, viltstiften en oliepastels.',
      de: 'Kompakter Koffer mit Aquarellfarben, Buntstiften, Filzstiften und Ölkreiden.',
      fr: 'Mallette complète comprenant crayons, feutres, pastels et aquarelles.',
    },
    category: 'kits',
    badge: {
      en: '🎁 Ultimate Gift Box',
      nl: '🎁 Luxe Cadeaukoffer',
      de: '🎁 Großes Geschenk-Set',
      fr: '🎁 Coffret Cadeau Idéal',
    },
    urlEn: 'https://amzn.to/44fWsjB',
    urlNl: 'https://amzn.to/4vl3nEh',
    icon: '🎁',
    imageUrl: '/affiliates/kinspory-art-set-150.jpg',
  },
  {
    id: 'splat-dino-tshirt-kit',
    title: {
      en: 'Splat Planet Dinosaur Washable Color T-Shirt Set',
      nl: 'Splat Planet Inkleurbaar Dinosaurussen T-Shirt + Stiften',
      de: 'Splat Planet Dinosaurier Ausmal-T-Shirt Set',
      fr: 'T-Shirt Dinosaure à Colorier Splat Planet',
    },
    description: {
      en: 'Includes 100% cotton dinosaur shirt and magic washable markers. Color, wear, wash, and color again!',
      nl: 'Inclusief katoenen T-shirt en magische uitwasbare stiften. Inkleuren, dragen, wassen en opnieuw kleuren!',
      de: 'Inklusive Baumwoll-Shirt und magischen auswaschbaren Stiften. Ausmalen, waschen, neu malen!',
      fr: 'Comprend un t-shirt en coton et 10 feutres magiques lavables. Coloriez, lavez et recommencez!',
    },
    category: 'crafts',
    badge: {
      en: '👕 Color & Wash Out',
      nl: '👕 Inkleuren & Wassen',
      de: '👕 Ausmalen & Waschen',
      fr: '👕 Colorier & Laver',
    },
    urlEn: 'https://amzn.to/4uOdS1R',
    urlNl: 'https://amzn.to/4gqGwCq',
    icon: '👕',
    imageUrl: '/affiliates/splat-dino-tshirt-kit.jpg',
  },
  {
    id: 'eatsleepdoodle-butterfly-bag',
    title: {
      en: 'Eatsleepdoodle Butterfly Crossbody Bag & Markers',
      nl: 'Eatsleepdoodle Vlinder Schoudertas Inkleurset',
      de: 'Eatsleepdoodle Schmetterling Tasche zum Ausmalen',
      fr: 'Sac Bandoulière Papillon à Colorier Eatsleepdoodle',
    },
    description: {
      en: 'Fun canvas crossbody bag with educational butterfly designs and washable fabric markers.',
      nl: 'Leuke katoenen tas met vlinderillustraties en uitwasbare textielstiften.',
      de: 'Schöne Baumwolltasche mit Schmetterlingsmotiven und auswaschbaren Textilstiften.',
      fr: 'Sac en coton avec feutres lavables pour créer son propre sac personnalisé.',
    },
    category: 'crafts',
    badge: {
      en: '👜 Color Your Bag',
      nl: '👜 Kleur Je Eigen Tas',
      de: '👜 Tasche Selbst Bemalen',
      fr: '👜 Personalisez Votre Sac',
    },
    urlEn: 'https://amzn.to/4xC090G',
    urlNl: 'https://amzn.to/3S7lZsK',
    icon: '👜',
    imageUrl: '/affiliates/eatsleepdoodle-butterfly-bag.jpg',
  },
  {
    id: 'eatsleepdoodle-pillowcase',
    title: {
      en: 'Eatsleepdoodle Color-Your-Own Cotton Pillowcase',
      nl: 'Eatsleepdoodle Inkleurbare Katoenen Kussensloop',
      de: 'Eatsleepdoodle Baumwoll Kissenbezug zum Ausmalen',
      fr: 'Taie d’Oreiller en Coton à Colorier',
    },
    description: {
      en: '100% cotton pillowcase with nature illustrations and 10 wash-out fabric markers.',
      nl: '100% katoenen kussensloop met natuurdieren en 10 uitwasbare textielstiften.',
      de: '100% Baumwoll Kissenbezug mit Naturmotiven und 10 auswaschbaren Stiften.',
      fr: 'Taie 100% coton avec illustrations et 10 feutres lavables inclus.',
    },
    category: 'crafts',
    badge: {
      en: '🛏️ Bedtime Craft',
      nl: '🛏️ Creatief Voor het Slapen',
      de: '🛏️ Kreativer Kissenbezug',
      fr: '🛏️ Activité Créative',
    },
    urlEn: 'https://amzn.to/3Qxg3Zx',
    urlNl: 'https://amzn.to/4xCTOBU',
    icon: '🛏️',
    imageUrl: '/affiliates/eatsleepdoodle-pillowcase.jpg',
  },
  {
    id: 'diy-color-blanket',
    title: {
      en: 'DIY Color-Your-Own Soft Washable Blanket',
      nl: 'DIY Inkleurbare Wasbare Zachte Deken',
      de: 'DIY Kuscheldecke zum Selbst Ausmalen',
      fr: 'Plaid Doux à Colorier Soi-Même',
    },
    description: {
      en: 'Cozy fleece blanket with printed outlines to color using included fabric markers.',
      nl: 'Heerlijk zachte fleece deken met kleurplaat-opdruk en textielstiften.',
      de: 'Kuschelige Fleece-Decke mit ausmalbaren Konturen und Textilstiften.',
      fr: 'Plaid polaire doux met motifs à colorier et feutres textiles inclus.',
    },
    category: 'crafts',
    badge: {
      en: '🛋️ Cozy Craft',
      nl: '🛋️ Gezellige Inkleurdeken',
      de: '🛋️ Gemütliches Ausmalen',
      fr: '🛋️ Plaid Créatif',
    },
    urlEn: 'https://amzn.to/49YQjM8',
    urlNl: 'https://amzn.to/4vcv0zj',
    icon: '🛋️',
    imageUrl: '/affiliates/diy-color-blanket.jpg',
  },
];

export function getRotatingAffiliateProduct(index = 0): AffiliateProduct {
  if (!AFFILIATE_PRODUCTS.length) return AFFILIATE_PRODUCTS[0];
  const now = new Date();
  const start = new Date(now.getFullYear(), 0, 0);
  const diff = now.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const selectedIndex = (dayOfYear + Math.abs(index)) % AFFILIATE_PRODUCTS.length;
  return AFFILIATE_PRODUCTS[selectedIndex];
}
