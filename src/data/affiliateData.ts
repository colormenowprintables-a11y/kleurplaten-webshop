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
  category: 'paper' | 'markers' | 'pencils' | 'crafts' | 'kits' | 'ink' | 'laminating' | 'storage' | 'lighting';
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
  // 📄 PAPIER
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

  // 🎨 STIFTEN & MARKERS
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
    id: 'crayola-supertips-50',
    title: {
      en: 'Crayola SuperTips Washable Markers (Set of 100)',
      nl: 'Crayola SuperTips Uitwasbare Viltstiften (Set van 100)',
      de: 'Crayola SuperTips Auswaschbare Filzstifte (100er Set)',
      fr: 'Feutres Lavables Crayola SuperTips (Set de 100)',
    },
    description: {
      en: 'Versatile markers with durable tips for thin lines and broad shading. 100% washable from clothes and skin.',
      nl: 'Veelzijdige viltstiften voor fijne lijntjes én grote vlakken. 100% uitwasbaar uit kleding en van de huid.',
      de: 'Vielseitige Filzstifte für feine Linien und große Flächen. 100% auswaschbar aus Kleidung.',
      fr: 'Feutres polyvalents pour lignes fines et grands aplats. 100% lavables sur les vêtements.',
    },
    category: 'markers',
    badge: {
      en: '🖍️ Great for Kids & Adults',
      nl: '🖍️ Populair voor Jong & Oud',
      de: '🖍️ Beliebt bei allen',
      fr: '🖍️ Populaire pour tous',
    },
    urlEn: 'https://amzn.to/4e9mjzK',
    urlNl: 'https://amzn.to/447riLc',
    icon: '🖍️',
    imageUrl: '/affiliates/crayola-supertips-50.jpg',
  },
  {
    id: 'guangna-acrylic-markers',
    title: {
      en: 'Guangna Acrylic Paint Markers (Brush Tip)',
      nl: 'Guangna Acryl Stiften met Soepele Penseelpunt',
      de: 'Guangna Acrylfarbstifte mit Pinselspitze',
      fr: 'Marqueurs Peinture Acrylique Guangna',
    },
    description: {
      en: 'Opaque water-based acrylic pens for dark paper, wood, rocks, ceramic, and canvas craft projects.',
      nl: 'Dekkende acrylmarkers voor donker papier, hout, stenen, keramiek en textiel.',
      de: 'Deckende Acrylfarbstifte für dunkles Papier, Holz, Steine und Leinwand.',
      fr: 'Marqueurs opaques pour papier foncé, bois, galets et toile.',
    },
    category: 'markers',
    badge: {
      en: '✨ Opaque Coverage',
      nl: '✨ Dekkende Kleuren',
      de: '✨ Stark Deckend',
      fr: '✨ Couvrance Parfaite',
    },
    urlEn: 'https://amzn.to/43K3FbE',
    urlNl: 'https://amzn.to/4oJ0wCH',
    icon: '🖌️',
    imageUrl: '/affiliates/guangna-acrylic-markers.jpg',
  },

  // ✏️ KLEURPOTLODEN
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
    id: 'faber-castell-castle-60',
    title: {
      en: 'Faber-Castell Classic Color Pencils (Set of 60)',
      nl: 'Faber-Castell Classic Kleurpotloden (Set van 60)',
      de: 'Faber-Castell Classic Buntstifte (60er Set)',
      fr: 'Crayons Faber-Castell Classic (Set de 60)',
    },
    description: {
      en: 'Hexagonal break-resistant lead pencils with rich vibrant colors in a durable tin box.',
      nl: 'Zeshoekige breekvaste potloden met heldere afgifte in een stevige blikken bewaardoos.',
      de: 'Bruchfeste Buntstifte mit hoher Farbbrillanz im Metalletui.',
      fr: 'Crayons incassables aux couleurs vives en boîte métal.',
    },
    category: 'pencils',
    badge: {
      en: '🎨 Family Favorite',
      nl: '🎨 Gezinsfavoriet',
      de: '🎨 Familienfavorit',
      fr: '🎨 Favori Famille',
    },
    urlEn: 'https://amzn.to/4a1D4ud',
    urlNl: 'https://amzn.to/4glizMN',
    icon: '✏️',
    imageUrl: '/affiliates/faber-castell-castle-60.jpg',
  },

  // 🧶 DEKENS, KUSSENSLOPEN, T-SHIRTS, TASJES & MOKKEN
  {
    id: 'diy-color-blanket',
    title: {
      en: 'DIY Color-Your-Own Soft Washable Blanket',
      nl: 'DIY Inkleurbare Wasbare Zachte Deken (Mandala / Bloemen)',
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
  {
    id: 'diy-color-blanket-kids',
    title: {
      en: 'Kids Color-In Blanket (Animals & Monsters)',
      nl: 'Kinderen Inkleurbare Deken (Dieren & Monsters)',
      de: 'Kinder Maldecke (Tiere & Monster)',
      fr: 'Plaid Enfant à Colorier (Animaux)',
    },
    description: {
      en: 'Fun washable fleece blanket with cute animals for kids to color and snuggle with.',
      nl: 'Zachte wasbare dekens met vrolijke diertjes om zelf in te kleuren met textielstiften.',
      de: 'Auswaschbare Decke mit Tier-Motiven für Kinder zum Ausmalen.',
      fr: 'Plaid lavable aux motifs rigolos à colorier.',
    },
    category: 'crafts',
    badge: {
      en: '🧸 Kids Favorite',
      nl: '🧸 Kinderfavoriet',
      de: '🧸 Kinder-Hit',
      fr: '🧸 Coup de Cœur Enfant',
    },
    urlEn: 'https://amzn.to/4e8p7gv',
    urlNl: 'https://amzn.to/4xA5l5h',
    icon: '🧸',
    imageUrl: '/affiliates/diy-color-blanket.jpg',
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
    id: 'diy-ceramic-mugs-kit',
    title: {
      en: 'DIY Color-Your-Own Ceramic Mugs Painting Kit',
      nl: 'Geiserailie DIY Inkleurbare Keramische Mokken Verfset',
      de: 'DIY Tassen Bemalen Set für Kinder & Erwachsene',
      fr: 'Kit de Peinture sur Mugs en Céramique',
    },
    description: {
      en: 'Create your own custom colorful coffee mugs with porcelain paint pens and durable ceramic cups.',
      nl: 'Maak je eigen unieke vrolijke koffiemokken met porseleinstiften en echte keramische mokken.',
      de: 'Gestalten Sie Ihre eigenen Tassen mit Porzellanstiften.',
      fr: 'Créez vos propres mugs personnalisés avec feutres céramique.',
    },
    category: 'crafts',
    badge: {
      en: '☕ DIY Coffee Mugs',
      nl: '☕ Inkleurbare Mokken',
      de: '☕ Tassen Selbst Bemalen',
      fr: '☕ Mugs Créatifs',
    },
    urlEn: 'https://www.amazon.com/s?k=DIY+ceramic+mug+coloring+kit&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=DIY+keramische+mokken+verfset&tag=colormenownl-21',
    icon: '☕',
    imageUrl: '/affiliates/diy-color-blanket.jpg',
  },
  {
    id: 'howaf-canvas-totes-12',
    title: {
      en: 'HOWAF 12-Pack DIY Canvas Hawaiian Tote Bags',
      nl: 'HOWAF 12-Pack DIY Katoenen Inkleurbare Tassen',
      de: 'HOWAF 12er Set Baumwolltaschen zum Bemalen',
      fr: 'HOWAF 12 Sacs Cabas en Coton à Colorier',
    },
    description: {
      en: 'Set of 12 durable canvas tote bags with fun outlines perfect for birthday parties and crafts.',
      nl: 'Set van 12 stevige katoenen tassen met opdruk, ideaal voor kinderfeestjes en knutselmiddagen.',
      de: '12er Pack Baumwolltaschen ideal für Kindergeburtstage.',
      fr: 'Set de 12 sacs en coton idéaux pour les fêtes et bricolages.',
    },
    category: 'crafts',
    badge: {
      en: '🛍️ Party Pack',
      nl: '🛍️ Feestpakket Tassen',
      de: '🛍️ Party-Set',
      fr: '🛍️ Kit Fête',
    },
    urlEn: 'https://www.amazon.com/s?k=HOWAF+canvas+tote+bags+coloring&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=HOWAF+katoenen+tassen+inkleuren&tag=colormenownl-21',
    icon: '🛍️',
    imageUrl: '/affiliates/eatsleepdoodle-butterfly-bag.jpg',
  },

  // 🎁 KITS & TEKENKOFFERS
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
    category: 'kits',
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

  // 🖨️ PRINTER INKT & TONERS
  {
    id: 'canon-pg545-cl561-ink',
    title: {
      en: 'Canon PG-545 / CL-561 Ink Cartridges',
      nl: 'Canon PG-545 & CL-561 Original Inktpatronen',
      de: 'Canon PG-545 / CL-561 Druckerpatronen',
      fr: 'Cartouches d’Encre Canon PG-545 / CL-561',
    },
    description: {
      en: 'High-yield black and color ink cartridges for sharp text and crisp line art coloring pages.',
      nl: 'Originele hoge-capaciteit zwarte en kleur inkt voor haarscherpe afdrukken van al je kleurplaten.',
      de: 'Original Druckerpatronen für gestochen scharfe Ausmalbilder.',
      fr: 'Encre originale pour des lignes parfaites sur vos coloriages.',
    },
    category: 'ink',
    badge: {
      en: '🖨️ Top Ink for Printers',
      nl: '🖨️ Populaire Printer Inkt',
      de: '🖨️ Meistverkaufte Tinte',
      fr: '🖨️ Encre Populaire',
    },
    urlEn: 'https://www.amazon.com/s?k=Canon+PG-545+CL-561+ink&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=Canon+PG-545+CL-561+inkt&tag=colormenownl-21',
    icon: '🖨️',
    imageUrl: '/affiliates/xerox-paper-160g.jpg',
  },
  {
    id: 'hp-305-black-color-ink',
    title: {
      en: 'HP 305 XL Black & Tri-Color Ink Cartridges',
      nl: 'HP 305 XL Zwart & Driekleuren Inktpatronen',
      de: 'HP 305 XL Schwarz & Farbe Druckerpatronen',
      fr: 'Cartouches HP 305 XL Noir et Couleur',
    },
    description: {
      en: 'High capacity ink cartridges for HP DeskJet and ENVY printers. Perfect for printing hundreds of pages.',
      nl: 'XL inktpatronen voor HP DeskJet & ENVY. Print moeiteloos honderden kleurplaten haarscherp af.',
      de: 'XL Patronen für HP Drucker. Druckt hunderte Seiten problemlos.',
      fr: 'Cartouches XL pour imprimer des centaines de coloriages.',
    },
    category: 'ink',
    badge: {
      en: '⚡ XL High Capacity',
      nl: '⚡ XL Extra Capaciteit',
      de: '⚡ XL Hohe Reichweite',
      fr: '⚡ XL Grande Capacité',
    },
    urlEn: 'https://www.amazon.com/s?k=HP+305+XL+ink+cartridges&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=HP+305+XL+inktpatronen&tag=colormenownl-21',
    icon: '🖨️',
    imageUrl: '/affiliates/xerox-paper-160g.jpg',
  },

  // 🔥 LAMINEERAPPARATEN
  {
    id: 'hp-onelam-270-laminator',
    title: {
      en: 'HP OneLam 270 A4 Thermal Laminator & Pouches',
      nl: 'HP OneLam 270 A4 Lamineerapparaat + Lamineerhoezen',
      de: 'HP OneLam 270 A4 Laminiergerät Set',
      fr: 'Plastifieuse A4 HP OneLam 270 avec Poches',
    },
    description: {
      en: 'Protect and reuse your favorite coloring pages! Laminate sheets for dry-erase marker practice.',
      nl: 'Bescherm en hergebruik je mooiste kleurplaten! Lamineer platen zodat kinderen ze keer op keer kunnen inkleuren met whiteboardstiften.',
      de: 'Laminieren Sie Malvorlagen zum immer wieder Ausmalen mit Abwischstiften.',
      fr: 'Plastifiez vos coloriages pour les réutiliser à l’infini avec feutres effaçables.',
    },
    category: 'laminating',
    badge: {
      en: '🔥 Reusable Pages',
      nl: '🔥 Hergebruik Je Kleurplaten',
      de: '🔥 Wiederverwendbar',
      fr: '🔥 Reutilisable',
    },
    urlEn: 'https://www.amazon.com/s?k=A4+thermal+laminator+machine&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=HP+OneLam+270+lamineerapparaat&tag=colormenownl-21',
    icon: '🔥',
    imageUrl: '/affiliates/xerox-paper-160g.jpg',
  },

  // 📚 OPBERGEN & BEWAREN
  {
    id: 'a4-display-binder-folder',
    title: {
      en: 'A4 Display Binder Book with Clear Pockets (60 Pockets)',
      nl: 'A4 Showalbum & Opbergmap met Insteekhoezen (60 Hoezen)',
      de: 'A4 Sichtbuch mit Klarsichthüllen (60 Hüllen)',
      fr: 'Porte-Vues A4 60 Poches Transparentes',
    },
    description: {
      en: 'Organize, preserve, and show off your completed masterpiece coloring pages in a beautiful portfolio binder.',
      nl: 'Bewaar en presenteer je mooiste ingekleurde kunstwerken netjes in een transparante portfolio map.',
      de: 'Bewahren Sie Ihre fertigen Kunstwerke sauber in einer Sammelmappe auf.',
      fr: 'Conservez et présentez vos plus beaux coloriages dans un porte-vues.',
    },
    category: 'storage',
    badge: {
      en: '📚 Preserve Artwork',
      nl: '📚 Mooi Bewaren',
      de: '📚 Kunstwerke Aufbewahren',
      fr: '📚 Gardez vos Œuvres',
    },
    urlEn: 'https://www.amazon.com/s?k=A4+display+book+binder+60+pockets&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=A4+showalbum+insteekhoezen+60&tag=colormenownl-21',
    icon: '📚',
    imageUrl: '/affiliates/kinspory-art-set-150.jpg',
  },

  // 💡 VERLICHTING & LICHTBAK
  {
    id: 'a4-led-light-pad',
    title: {
      en: 'A4 Ultra-Thin LED Light Pad Tracing Board',
      nl: 'A4 Ultra-Dunne LED Lichtbak / Lightpad voor Overtekenen',
      de: 'A4 LED Leuchttisch zum Tracen und Zeichnen',
      fr: 'Tablette Lumineuse LED A4 pour Décalquer',
    },
    description: {
      en: 'Dimmable USB light table to easily trace lines, practice drawing, and copy coloring page outlines.',
      nl: 'Dimbaar LED lichtpaneel om eenvoudig kleurplaat-lijnen over te trekken en te leren tekenen.',
      de: 'Dimmbares LED Leuchtpad zum einfachen Abpausen und Zeichnen.',
      fr: 'Tablette lumineuse réglable pour décalquer facilement les dessins.',
    },
    category: 'lighting',
    badge: {
      en: '💡 Trace & Draw',
      nl: '💡 Leren Overtekenen',
      de: '💡 Zeichnen Lernen',
      fr: '💡 Idéal pour Décalquer',
    },
    urlEn: 'https://www.amazon.com/s?k=A4+LED+light+pad+tracing&tag=colormenowpri-20',
    urlNl: 'https://www.amazon.nl/s?k=A4+LED+lichtbak+overtekenen&tag=colormenownl-21',
    icon: '💡',
    imageUrl: '/affiliates/ohuhu-honolulu-markers.jpg',
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
