export type SceneTemplate = 'rings' | 'pearls' | 'crystal' | 'garden';

// Modifikoni vetëm këtë skedar për të personalizuar ftesën.
// Të gjitha pjesët e tjera (skena 3D, seksionet, ndarja, QR) lexojnë nga këtu.

export type TimelineIcon =
  | 'arrival'
  | 'wait'
  | 'ceremony'
  | 'toast'
  | 'lunch'
  | 'terrace'
  | 'cake'
  | 'dance'
  | 'farewell';

export const config = {
  bride: 'Kristjana',
  groom: 'Houssine',

  // ISO 8601 me zonë kohore — e shtunë, 19 shtator 2026, ceremonia në orën 11:30 CEST.
  dateISO: '2026-09-19T11:30:00+02:00',
  // Koha e mbarimit, përdorur për eventin e kalendarit (.ics).
  endISO: '2026-09-20T00:00:00+02:00',
  dateLabel: 'E shtunë, 19 shtator 2026',
  dateLabelShort: '19 · 09 · 2026',
  timeLabel: 'Ora 11:30',

  venue: {
    name: 'Castel Toblino',
    short: 'Castel Toblino · Liqeni i Toblinos',
    address: 'Località Castel Toblino 1, 38076 Madruzzo (TN), Itali',
    region: 'Trentino · Lugina e Liqeneve',
    lat: 46.054756,
    lng: 10.965168
  },

  // Vargu opsional poshtë emrave; lëreni '' për ta fshehur.
  heroTagline: '',

  // Hyrja e shkurtër, romantike që hap faqen.
  story: {
    eyebrow: 'Historia jonë',
    title: 'Nga një «po» i pëshpëritur te një «po» mbi liqen',
    paragraphs: [
      'U gjetëm rastësisht dhe e kemi zgjedhur njëri-tjetrin çdo ditë që atëherë. Mes udhëtimeve, të qeshurave dhe ritualeve të vogla të përditshme, kuptuam se jeta së bashku kishte zërin e shtëpisë.',
      'Më 19 shtator 2026 duam ta festojmë me ju — njerëzit që, në mënyra të ndryshme, na kanë bërë atë që jemi sot. Ju presim në Castel Toblino, të varur mes ujit, gurit dhe dritës së shtatorit.'
    ],
    image: '/gallery/timeline-couple-watercolor.png',
    imageFallback: '/gallery/timeline-couple-watercolor.png'
  },

  // Tregimi i vendit — Castel Toblino: kala e shek. XII, ridizenjuar në Rilindje
  // nga Kardinali Bernardo Clesio, mbi një gadishull të liqenit të Toblinos.
  venueShowcase: {
    eyebrow: 'Vendi',
    title: 'Një kështjellë mbi ujë',
    paragraphs: [
      'Castel Toblino qëndron që nga shekulli XII mbi një gadishull të vogël të liqenit me të njëjtin emër, në zemër të Luginës së Liqeneve. Dikur banesë e princ-peshkopëve të Trentos, u shndërrua në vitet \'500 nga Kardinali Bernardo Clesio në një rezidencë të rafinuar të Rilindjes.',
      'Kulla e tij cilindrike njëzet metra e gjatë pasqyrohet ende sot mbi ujë, e rrethuar nga kallamishtet, ullinjtë dhe legjendat e dashurisë. Do të jetë korniza e «po»-së sonë.'
    ],
    image: '/gallery/castle-aerial.png',
    facts: [
      { label: 'Viti', value: 'Shek. XII' },
      { label: 'Lartësia', value: '245 m mbi det' },
      { label: 'Nga Trento', value: '20 minuta' }
    ]
  },

  // Programi i ditës. Çdo zë ka orarin, titullin, përshkrimin dhe ikonën.
  // `icon` paraqitet si SVG inline (shih components/TimelineIcon.tsx).
  // `image` (opsionale) zëvendëson ikonën me një ilustrim — vendosni një PNG
  // në /public/timeline/ dhe referojeni këtu.
  schedule: [
    {
      time: '10:00',
      title: 'Mbërritja dhe pritja',
      text: 'Ju presim në Castel Toblino me qetësi, një buzëqeshje dhe kënaqësinë e përqafimeve të para.',
      icon: 'arrival' as TimelineIcon,
      image: ''
    },
    {
      time: '10:30',
      title: 'Pritja e ceremonisë',
      text: 'Një kohë e lehtë: panoramë mbi liqen, ndonjë foto e bisedë, përpara momentit të «po»-së.',
      icon: 'wait' as TimelineIcon,
      image: ''
    },
    {
      time: '11:30',
      title: 'Ceremonia',
      text: 'Do t\'i themi «po» njëri-tjetrit në kornizën e kështjellës, të rrethuar nga ata që na duan.',
      icon: 'ceremony' as TimelineIcon,
      image: ''
    },
    {
      time: '12:00',
      title: 'Aperitivi',
      text: 'Pas ceremonisë, aperitiv dhe dolli së bashku, për të festuar fillimin e ditës.',
      icon: 'toast' as TimelineIcon,
      image: ''
    },
    {
      time: '14:00',
      title: 'Drekë në restorant',
      text: 'Drekë miqësore në restorant, deri në orën 17:30, mes tavolinave të gjata, të qeshurave dhe kujtimeve për t\'i marrë me vete.',
      icon: 'lunch' as TimelineIcon,
      image: ''
    },
    {
      time: '17:30',
      title: 'Festa rinis në tarracën e liqenit',
      text: 'Pas drekës kthehemi te liqeni: drita më të buta, ajër më i freskët, biseda që zgjaten ndërsa përgatitemi për mbrëmjen.',
      icon: 'terrace' as TimelineIcon,
      image: ''
    },
    {
      time: '18:00',
      title: 'Prerja e tortës',
      text: 'Moment i ëmbël në tarracë — torta, gotat e ngritura dhe një dolli që bashkon ata që kanë qëndruar afër gjatë gjithë ditës.',
      icon: 'cake' as TimelineIcon,
      image: ''
    },
    {
      time: '18:30 – 00:00',
      title: 'Nga vallja e parë te pista',
      text: 'Një valle vetëm e jona, pastaj muzika merr komandën: DJ set, të qeshura dhe disa hapa që nuk kishin pse të ishin perfektë — por do të jenë tonët.',
      icon: 'dance' as TimelineIcon,
      image: ''
    },
    {
      time: '00:00',
      title: 'Mbyllja e mbrëmjes',
      text: 'Dollitë e fundit, përqafimet e fundit dhe falënderimet e sinqerta: do ta mbyllim ditën së bashku, me kujtimin e të jetuarit deri në fund.',
      icon: 'farewell' as TimelineIcon,
      image: ''
    }
  ],

  stayInfo: {
    title: 'Akomodimi i përfshirë',
    paragraphs: [
      'Ftesa përfshin dy netë: natën para martesës dhe atë të dasmës. Akomodimi do të organizohet kryesisht në Trento; Castel Toblino arrihet rreth njëzet minutash me makinë.',
      'Transferimet me makinë do të organizohen më pranë datës së dasmës, kur të kemi numrin përfundimtar të të ftuarve. Do t\'ju dërgojmë të gjitha detajet e tjera praktike (struktura, oraret, kontaktet) të paktën një muaj para dasmës.',
      'Nëse mundeni, ardhni një ditë më parë: kështu shmangni nxitimin e mëngjesit të dasmës dhe e shijoni ditën me më shumë qetësi.'
    ]
  },

  // Udhëtimi & akomodimi — logjistika për të ftuarit.
  travel: {
    eyebrow: 'Si të arrini',
    title: 'Si të na gjeni',
    routes: [
      { from: 'Trento', detail: '20 min me makinë · SS45bis në drejtim Sarche' },
      { from: 'Verona', detail: '1h 30 me makinë · A22, dalja Trento Sud' },
      { from: 'Milano', detail: '2h 45 me makinë · A4 + A22' },
      { from: 'Aeroporti i Veronës (VRN)', detail: 'rreth 1h 30 me makinë' }
    ],
    parking: 'Parkim falas pranë kështjellës, përgjatë SS45bis.',
    note: 'Ju këshillojmë të arrini deri në orën 11:00 për të shijuar liqenin para ceremonisë.'
  },

  // Kodi i veshjes — i zgjeruar.
  dressCode: {
    eyebrow: 'Kodi i veshjes',
    title: 'Elegancë natyrale, mbi liqen',
    paragraphs: [
      'Ju imagjinojmë me veshje ceremoniale, komodë dhe të ndritshëm: për burrat një kostum klasik (gri, blu, ngjyrë rëre ose i zi), për gratë një fustan elegant pasditeje — i gjatë, midi ose një jumpsuit i rafinuar.',
      'Jemi në shtator, mbi një kështjellë të varur mbi ujë: në orët e para drita është e ngrohtë, mbrëmjen ajri freskohet. Mbani pranë një shall, një xhaketë të lehtë ose një stollë.',
      'Këpucët? Elegantë por komodë: shtroje guri, ndonjë shkallë dhe një tarracë mbi liqen — pa taka shumë të holla, ju falënderojnë këmbët dhe pista e vallëzimit.'
    ],
    palette: [
      { name: 'Pluhur trëndafili', hex: '#e8b4bc' },
      { name: 'Ar i ngrohtë', hex: '#c9a96a' },
      { name: 'Fildishtë', hex: '#fdf6ec' },
      { name: 'Sherbelë', hex: '#9bb39a' },
      { name: 'Natë', hex: '#1a1414' }
    ],
    avoid: 'Ju lutemi shmangni të bardhën — le t\'ia lëmë nuses.'
  },

  // RSVP — konfirmimi i pranisë.
  rsvp: {
    eyebrow: 'Konfirmim',
    title: 'Do të jeni me ne?',
    deadlineISO: '2026-07-19',
    deadlineLabel: 'Deri më 19 korrik 2026',
    intro: 'Ju lutemi konfirmoni praninë tuaj Deri më 19 korrik 2026. Çdo detaj është i rëndësishëm për ne.',
    email: '',
    whatsapp: '',
    note: 'Na njoftoni nëse do të keni me vete fëmijë ose nevoja të veçanta ushqimore.'
  },

  // Pyetje të shpeshta.
  faq: [
    {
      q: 'A mund të sjell një shoqërues?',
      a: 'Si rregull i përgjithshëm, partneri ose shoqëruesi është tashmë i parashikuar në ftesën tuaj. Nëse dëshironi të sillni dikë më shumë, na telefononi ose na shkruani: do ta organizojmë së bashku.'
    },
    {
      q: 'A janë të mirëpritur fëmijët?',
      a: 'Po, me gjithë zemër. Na e tregoni në konfirmim që të organizojmë drekën në mënyrën më të mirë.'
    },
    {
      q: 'Çfarë të bëj ditën pas dasmës?',
      a: 'Ju sugjerojmë një shëtitje rreth liqenit ose një vizitë te Liqenet e Lamarit. Bisedojmë me kënaqësi për këtë.'
    },
    {
      q: 'A mund të bëj fotografi gjatë ditës?',
      a: 'Sigurisht, sa foto të doni. Ju kërkojmë vetëm të mos pengoni punën e fotografit — kështu ai mund të bëjë punën e tij dhe ne do të kemi të gjitha kujtimet.'
    },
    {
      q: 'Kam alergji ose nevoja të veçanta ushqimore.',
      a: 'Na e shkruani në konfirmim: do ta përcjellim te restoranti që të kujdesemi për ju në mënyrën më të mirë.'
    }
  ],

  // Foto lokale në /public/gallery.
  gallery: [
    '/gallery/castle-aerial.png',
    '/gallery/castle-reflection.jpg',
    '/gallery/castle-courtyard.png',
    '/gallery/castle-drone-detail.png',
    '/gallery/castle-drone-lakewide.png',
    '/gallery/castle-dock.jpg',
    '/gallery/castle-east.jpg',
    '/gallery/castle-landscape.jpg',
    '/gallery/lake-view.jpg'
  ],

  storyArt: '/gallery/timeline-couple-watercolor.png',

  // Foto e sfondit pas skenës 3D.
  backgroundImage: '/gallery/castle-aerial.png',

  // Stili 3D i heros.
  sceneTemplate: 'rings' as SceneTemplate,

  // Vendosni një skedar muzike te /public/music.mp3.
  // Luajtësi është i memec si parazgjedhje — të ftuarit prekin për ta aktivizuar.
  musicSrc: '/music.mp3',

  // Përdoret nga seksioni i ndarjes + metadata OG.
  shareUrl: 'https://wedding-invite-sq.vercel.app',

  // Hashtag për fotot e të ftuarve (opsionale).
  hashtag: '#KristjanaEHoussine2026'
} as const;

export type AppConfig = typeof config;
