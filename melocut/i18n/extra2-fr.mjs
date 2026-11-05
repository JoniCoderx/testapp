// French versions of the second batch of converter pages (en-conv2.mjs). Each `key` matches the English page (build.mjs KEY_OF).
// French ("tu"); button and effect names match the French interface strings in i18n/ui_fr.py.
// The troubleshooting question from en-conv2.mjs `extraFaq` is appended as the last FAQ entry of each page.

export default (NAME) => [
  {
    key: 'c-wma', convLabel: 'WMA en MP3', path: 'fr/wma-en-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir WMA en MP3 en ligne, gratuit, sans envoi | ${NAME}`,
    description: "Convertis tes vieux fichiers WMA de Windows Media Player en MP3 pour tout téléphone, voiture ou appli. Jusqu'à 320 kbps. Gratuit, privé, sans envoi.",
    h1: "Convertisseur <em>WMA en MP3</em>",
    lead: "Donne une seconde vie à tes vieux fichiers Windows Media Audio en MP3 lisibles sur iPhone, Android, Mac et en voiture.",
    badges: ["Windows Media Audio", "Jusqu'à 320 kbps", "Sans envoi"],
    steps: [
      ["Ouvre le WMA", "Choisis un fichier .wma sur ton appareil, ou dépose-en plusieurs à la fois."],
      ["Choisis une qualité", "192 kbps convient à la plupart des rips WMA. Prends 320 kbps si l'original était de haute qualité."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>D'où viennent les fichiers WMA</h2>
    <p>Pendant des années, Windows Media Player a extrait les CD en WMA par défaut. Si tu as un vieux dossier de musique venant d'un PC sous Windows XP ou Windows 7, une bonne partie est sûrement en WMA. Les fichiers sonnent encore bien, mais les iPhone, les Mac, beaucoup d'autoradios et la plupart des applis de musique ne les lisent pas.</p>
    <p>${NAME} lit le WMA dans ton navigateur et enregistre un MP3 standard. Le fichier reste sur ton appareil du début à la fin, donc même une collection privée n'est jamais envoyée nulle part.</p>
    <h3>Quelle qualité choisir ?</h3>
    <p>Les vieux rips WMA étaient souvent faits en 128 ou 192 kbps. Convertir vers un débit plus élevé ne peut pas ajouter des détails qui n'existent pas, donc <strong>192 kbps</strong> est un choix raisonnable. Si le WMA a été extrait à haut débit ou en WMA Lossless, choisis <strong>320 kbps</strong> pour garder autant que le MP3 le permet.</p>
    <h3>Tout un dossier de fichiers WMA</h3>
    <p>Choisis ou dépose plusieurs fichiers ensemble, appuie sur <strong>Tout convertir</strong>, puis télécharge-les un par un ou dans un seul ZIP. Sur ordinateur, c'est le moyen le plus rapide de transférer une vieille bibliothèque. Garde en tête que les tags et les pochettes ne sont pas copiés dans les nouveaux fichiers : tu devras peut-être corriger les titres dans ton appli de musique ensuite.</p>
    <h3>Les fichiers WMA protégés</h3>
    <p>Certains fichiers WMA achetés sur d'anciennes boutiques en ligne ou via des services d'abonnement sont protégés contre la copie (DRM). Ni ${NAME} ni aucun autre outil dans le navigateur ne peut les ouvrir. Les rips de CD normaux n'ont pas de DRM et se convertissent sans problème.</p>
    <p>Tu veux seulement une partie d'une chanson, par exemple comme sonnerie ? Convertis-la d'abord, puis ouvre le MP3 dans <a href="/fr/creer-sonnerie/">Créer une sonnerie</a> ou <a href="/fr/couper-audio/">Couper un audio</a>.</p>`,
    faq: [
      ["Comment convertir un WMA en MP3 ?", "Ouvre le fichier WMA ci-dessus, choisis MP3 et une qualité, puis appuie sur Convertir et sur Télécharger."],
      ["Puis-je convertir un WMA sur Mac ou iPhone ?", "Oui. La conversion se fait dans le navigateur, elle fonctionne donc sur Mac, iPhone et Android, même s'ils ne lisent pas le WMA eux-mêmes."],
      ["Pourquoi mon fichier WMA ne se convertit pas ?", "Il est probablement protégé contre la copie (DRM). Les fichiers WMA protégés ne peuvent pas être convertis. Les fichiers non protégés, comme tes propres rips de CD, fonctionnent normalement."],
      ["Convertir un WMA en MP3 fait-il perdre de la qualité ?", "Les deux formats sont compressés, donc un peu. En 192 ou 320 kbps, c'est très difficile à entendre."],
      ["Les MP3 convertis n'ont pas de titre. Pourquoi ?", "Les tags et les pochettes sont retirés du fichier final pour protéger ta vie privée. Ajoute les titres dans ton appli de musique, ou renomme les fichiers avant de convertir."],
    ],
  },
  {
    key: 'c-aiff', convLabel: 'AIFF en MP3', path: 'fr/aiff-en-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir AIFF en MP3 en ligne, gratuit et privé | ${NAME}`,
    description: "Convertis des fichiers AIFF et AIF de Mac, GarageBand ou Logic en MP3. Jusqu'à 10 fois plus légers. Jusqu'à 320 kbps. Gratuit, rien n'est envoyé en ligne.",
    h1: "Convertisseur <em>AIFF en MP3</em>",
    lead: "Transforme les gros fichiers AIFF et AIF de ton Mac, de GarageBand ou de Logic en petits MP3 faciles à partager.",
    badges: ["AIFF et AIF", "Jusqu'à 320 kbps", "Sans envoi"],
    steps: [
      ["Ouvre l'AIFF", "Choisis un fichier .aiff ou .aif, ou dépose-en plusieurs à la fois."],
      ["Choisis 320 kbps", "L'AIFF est en pleine qualité, alors gardes-en autant que le MP3 le permet."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Qu'est-ce qu'un fichier AIFF ?</h2>
    <p>L'AIFF est le format audio non compressé d'Apple, l'équivalent Mac du WAV. GarageBand et Logic peuvent exporter des morceaux en AIFF, les anciens imports de CD dans iTunes étaient souvent en AIFF, et beaucoup de packs de samples et d'effets sonores sont fournis en fichiers <code>.aif</code>. Le son est excellent, mais une chanson de trois minutes pèse environ 30 Mo.</p>
    <p>En MP3 à 320 kbps, la même chanson fait environ 7 Mo et sonne presque pareil. C'est assez léger pour l'envoyer dans une discussion, la mettre en ligne sur un site avec une limite de taille ou la garder sur ton téléphone.</p>
    <h3>Partager un morceau que tu as créé</h3>
    <p>Tu as terminé un morceau dans GarageBand ? Exporte-le en AIFF, ouvre-le ici et enregistre un MP3 pour tes amis, ton groupe ou les réseaux sociaux. Utilise le <strong>Volume automatique</strong> dans Effets si ton mix est beaucoup plus faible que les chansons des applis de streaming. Si tu ne veux partager qu'un court passage, fais glisser sur la forme d'onde pour garder cette partie et ajoute un fondu de sortie.</p>
    <h3>Convertir beaucoup de samples</h3>
    <p>Choisis plusieurs fichiers AIFF à la fois et appuie sur <strong>Tout convertir</strong>. Tu peux télécharger chaque MP3 séparément ou tous ensemble dans un seul ZIP. Garde les fichiers AIFF d'origine si tu risques de les retoucher : un MP3 est parfait pour l'écoute, mais pas pour continuer à mixer.</p>
    <h3>Besoin d'un autre format ?</h3>
    <p>Pour le montage sous Windows, beaucoup d'applis préfèrent le WAV. Choisis WAV dans le menu Format, ou découvre la différence sur la page <a href="/fr/mp3-en-wav/">MP3 en WAV</a>. Si tu veux garder la pleine qualité tout en gagnant de la place, choisis FLAC : il est sans perte et environ deux fois plus léger. La page <a href="/fr/wav-en-flac/">WAV en FLAC</a> explique comment ça marche.</p>`,
    faq: [
      ["AIF, c'est la même chose qu'AIFF ?", "Oui. Les deux extensions désignent le même format, et les deux se convertissent ici."],
      ["Convertir un AIFF en MP3 fait-il perdre de la qualité ?", "Un peu, car le MP3 est compressé. En 320 kbps, la plupart des gens n'entendent pas la différence."],
      ["Puis-je convertir un AIFF sous Windows ou Android ?", "Oui. Le convertisseur fonctionne dans le navigateur, donc sur n'importe quel ordinateur ou téléphone."],
      ["Mon fichier AIFF ne s'ouvre pas. Que faire ?", "Certaines variantes rares d'AIFF-C peuvent échouer. Exporte à nouveau le fichier depuis GarageBand, Logic ou Musique en AIFF standard ou en WAV, puis réessaie."],
    ],
  },
  {
    key: 'c-mkv', convLabel: 'MKV en MP3', path: 'fr/mkv-en-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir MKV en MP3 : extraire l'audio, gratuit | ${NAME}`,
    description: "Extrais l'audio de vidéos MKV et enregistre-le en MP3, M4A ou WAV. Jusqu'à 320 kbps, dans ton navigateur. Gratuit, sans compte, la vidéo n'est jamais envoyée.",
    h1: "Convertisseur <em>MKV en MP3</em>",
    lead: "Extrais le son d'une vidéo MKV et enregistre-le en MP3 lisible sur n'importe quel appareil.",
    badges: ["Vidéos MKV", "Jusqu'à 320 kbps", "Sans envoi"],
    steps: [
      ["Ouvre le MKV", "Touche la zone ci-dessus et choisis la vidéo, ou fais-la glisser."],
      ["Coupe-le si tu veux", "Fais glisser sur la forme d'onde pour ne garder qu'une scène ou une chanson."],
      ["Télécharge le MP3", "Choisis une qualité, appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Que contient un fichier MKV ?</h2>
    <p>Le MKV (Matroska) est un conteneur qui peut réunir la vidéo, plusieurs pistes audio et des sous-titres dans un seul fichier. Les enregistreurs d'écran comme OBS, les logiciels de montage et beaucoup d'outils de téléchargement enregistrent en MKV. Les téléphones et certains lecteurs ne l'ouvrent pas, mais le son à l'intérieur est généralement de l'AAC, de l'Opus, du Vorbis ou de l'AC-3 tout à fait ordinaire, que ${NAME} peut transformer en MP3.</p>
    <h3>Les vidéos avec plusieurs pistes audio</h3>
    <p>Certains fichiers MKV contiennent plusieurs pistes audio, par exemple deux langues, ou un commentaire à côté du son principal. ${NAME} utilise la piste audio principale, généralement la première. Si tu as besoin d'une autre piste, supprime d'abord les autres pistes dans un outil vidéo comme MKVToolNix, puis ouvre le fichier ici.</p>
    <h3>Bonnes utilisations</h3>
    <ul>
      <li>Garder la musique d'un concert ou d'un enregistrement de live.</li>
      <li>Transformer une conférence enregistrée ou un commentaire de jeu en MP3 façon podcast.</li>
      <li>Couper une réplique dans un extrait pour en faire une <a href="/fr/creer-sonnerie/">sonnerie</a>.</li>
    </ul>
    <h3>Quel format ?</h3>
    <p>Le <strong>MP3</strong> se lit partout : choisis 320 kbps pour la musique et 128 kbps pour la voix. Le <strong>M4A</strong> conserve le son AAC un peu plus efficacement, et le <strong>WAV</strong> est idéal si tu vas retravailler l'audio dans un autre logiciel. Enregistrement trop faible ? Active le <strong>Volume automatique</strong> dans Effets avant de convertir.</p>
    <h3>Les gros fichiers</h3>
    <p>Les fichiers MKV de films entiers peuvent être énormes. ${NAME} accepte les fichiers jusqu'à 1 Go, et les ordinateurs gèrent les grosses vidéos bien mieux que les téléphones. Les autres types de vidéo ont leur propre page, comme <a href="/fr/avi-en-mp3/">AVI en MP3</a> et <a href="/mov-to-mp3/">MOV to MP3</a> (en anglais), ou utilise l'outil général <a href="/fr/video-en-mp3/">Vidéo en MP3</a>.</p>`,
    faq: [
      ["Comment convertir un MKV en MP3 ?", "Ouvre le MKV ci-dessus, choisis MP3 et une qualité, puis appuie sur Convertir et sur Télécharger."],
      ["Quelle piste audio est utilisée ?", "La piste audio principale de la vidéo, généralement la première. Les autres pistes sont ignorées."],
      ["Puis-je garder les sous-titres ?", "Non. Seul le son est enregistré. Les sous-titres et la vidéo sont laissés de côté."],
      ["Le MP3 est muet ou dans la mauvaise langue. Pourquoi ?", `${NAME} utilise la piste audio principale, généralement la première. Supprime les autres pistes avec un outil comme MKVToolNix, ou vérifie que la vidéo a bien du son quand tu la lis.`],
    ],
  },
  {
    key: 'c-avi', convLabel: 'AVI en MP3', path: 'fr/avi-en-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir AVI en MP3 en ligne, gratuit, sans envoi | ${NAME}`,
    description: "Extrais le son de vieilles vidéos AVI d'appareils photo et de PC et enregistre-le en MP3. Jusqu'à 320 kbps, dans ton navigateur. Gratuit, privé, sans envoi.",
    h1: "Convertisseur <em>AVI en MP3</em>",
    lead: "Sauve le son de vieilles vidéos AVI d'appareils photo numériques, de caméscopes et de PC sous Windows.",
    badges: ["Vieilles vidéos d'appareil photo", "Jusqu'à 320 kbps", "Sans envoi"],
    steps: [
      ["Ouvre l'AVI", "Choisis le fichier .avi sur ton appareil."],
      ["Sélectionne la partie utile", "Fais glisser sur la forme d'onde, ou garde tout."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Vieilles vidéos AVI, nouvelle vie</h2>
    <p>L'AVI a longtemps été le format vidéo standard sous Windows. Beaucoup d'appareils photo numériques compacts des années 2000 enregistraient aussi leurs clips en AVI. Ces fichiers sont souvent pleins de chansons d'anniversaire, de spectacles d'école et de voix de la famille, mais les téléphones et les téléviseurs modernes refusent souvent de les lire.</p>
    <p>${NAME} ouvre l'AVI dans ton navigateur, récupère la piste audio et l'enregistre en MP3 que tu peux garder, partager ou écouter en voiture. La vidéo ne quitte jamais ton appareil.</p>
    <h3>Améliorer le son des vieux enregistrements</h3>
    <p>Les micros des appareils photo de l'époque n'étaient pas terribles. Avant de convertir, ouvre <strong>Effets</strong> :</p>
    <ul>
      <li>Le <strong>Volume automatique</strong> rend un enregistrement faible aussi fort que sur les applis de streaming, sans distorsion.</li>
      <li>La <strong>Suppression du bruit par IA</strong> enlève le vent, le bourdonnement et les bavardages derrière les voix.</li>
      <li>Appuie sur <strong>Lire avec effets</strong> pour écouter le résultat avant de télécharger.</li>
    </ul>
    <p>Si un enregistrement reste trop faible, <a href="/fr/augmenter-le-volume/">Augmenter le volume</a> te permet de le pousser encore plus.</p>
    <h3>Quelle qualité ?</h3>
    <p>Le son des AVI de vieux appareils photo est souvent en mono et enregistré en basse qualité, donc <strong>128 kbps</strong> suffit généralement et garde le fichier léger. Choisis 320 kbps pour les clips musicaux ou les extraits tirés de DVD.</p>
    <h3>Si l'AVI ne s'ouvre pas</h3>
    <p>Un AVI peut contenir de nombreux codecs différents. Presque tous les codecs courants fonctionnent, mais quelques-uns très anciens ou inhabituels peuvent échouer. Dans ce cas, essaie de lire le fichier dans VLC : s'il n'a pas de son là non plus, l'AVI ne contient peut-être aucune piste audio. Pour les autres types de vidéo, consulte <a href="/fr/3gp-en-mp3/">3GP en MP3</a> et <a href="/fr/mkv-en-mp3/">MKV en MP3</a>.</p>`,
    faq: [
      ["Comment convertir un AVI en MP3 ?", "Ouvre l'AVI ci-dessus, choisis MP3 et une qualité, appuie sur Convertir puis sur Télécharger."],
      ["Puis-je convertir un AVI en MP3 sur mon téléphone ?", "Oui, ça fonctionne dans le navigateur sur iPhone et Android. Les vidéos très longues passent plus facilement sur un ordinateur."],
      ["La vidéo est-elle envoyée en ligne ?", "Non. Tout se passe sur ton appareil, tes vidéos de famille restent donc privées."],
      ["L'AVI se lit mais le MP3 est muet. Pourquoi ?", "Certains appareils photo enregistraient la vidéo sans son, ou la piste audio est endommagée. Si VLC la lit aussi sans son, il n'y a rien à extraire."],
    ],
  },
  {
    key: 'c-3gp', convLabel: '3GP en MP3', path: 'fr/3gp-en-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir 3GP en MP3 : vidéos de vieux téléphones | ${NAME}`,
    description: "Convertis en MP3 les vidéos 3GP et les enregistrements de vieux téléphones. Améliore le son dans ton navigateur. Gratuit, privé, rien n'est envoyé.",
    h1: "Convertisseur <em>3GP en MP3</em>",
    lead: "Garde le son des vidéos 3GP et des enregistrements vocaux faits sur de vieux Nokia, Samsung et autres téléphones à touches.",
    badges: ["Vidéos de vieux téléphones", "Suppression du bruit", "Sans envoi"],
    steps: [
      ["Ouvre le 3GP", "Choisis le fichier .3gp sur ton appareil ou ta carte mémoire."],
      ["Nettoie le son", "Active le Volume automatique ou la Suppression du bruit par IA dans Effets si tu veux."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Qu'est-ce qu'un fichier 3GP ?</h2>
    <p>Le 3GP est le format vidéo qu'utilisaient la plupart des téléphones portables avant l'arrivée des smartphones. Nokia, Sony Ericsson, Samsung et beaucoup d'autres enregistraient les vidéos de l'appareil photo, et parfois les enregistrements vocaux, en <code>.3gp</code>. Les applis de musique, les iPhone et les ordinateurs d'aujourd'hui ne savent souvent pas les lire, même si les fichiers sont minuscules.</p>
    <p>${NAME} lit le 3GP et enregistre le son en MP3 normal. Beaucoup de ces fichiers utilisent l'AMR, un codec conçu pour les appels téléphoniques, que peu de lecteurs prennent en charge. La version MP3 se lit partout, et tout se passe sur ton appareil, rien n'est donc envoyé en ligne.</p>
    <h3>Obtenir le meilleur son</h3>
    <p>Les micros des téléphones des années 2000 enregistraient en basse qualité, généralement en mono. La conversion ne peut pas ajouter de détails, mais elle peut rendre l'enregistrement bien plus agréable à écouter :</p>
    <ul>
      <li>Active le <strong>Volume automatique</strong> pour remonter les voix faibles.</li>
      <li>Active la <strong>Suppression du bruit par IA</strong> contre le vent et le bruit de fond.</li>
      <li>Utilise <strong>128 kbps</strong>. Les réglages plus élevés ne font qu'alourdir le fichier.</li>
    </ul>
    <h3>Des idées pour les vieux clips de téléphone</h3>
    <p>Garde la voix d'un grand-parent, sauve une chanson d'un concert d'école, ou fais d'un vieux clip drôle une <a href="/fr/creer-sonnerie/">sonnerie</a>. Tu ne veux que quelques secondes ? Fais glisser sur la forme d'onde pour les sélectionner, ou ouvre le MP3 plus tard dans <a href="/fr/couper-audio/">Couper un audio</a>.</p>
    <h3>Récupérer les fichiers du téléphone</h3>
    <p>Les vieux téléphones stockaient généralement les vidéos sur une carte mémoire. Mets la carte dans un lecteur de cartes, ou branche le téléphone avec un câble USB, et copie les fichiers 3GP sur ton ordinateur. Ouvre-les ensuite ici. Les vidéos des téléphones plus récents sont en MP4 ou MOV : consulte <a href="/fr/video-en-mp3/">Vidéo en MP3</a>.</p>`,
    faq: [
      ["Comment convertir un 3GP en MP3 ?", "Ouvre le 3GP ci-dessus, choisis MP3, appuie sur Convertir puis sur Télécharger."],
      ["Pourquoi le MP3 sonne-t-il encore un peu étouffé ?", "Les vieux téléphones enregistraient en basse qualité. La conversion garde ce qui existe mais ne peut pas restaurer les détails manquants. Le Volume automatique et la Suppression du bruit par IA aident beaucoup pour les voix."],
      ["Puis-je convertir un 3GP sur mon téléphone ?", "Oui. Ça fonctionne dans le navigateur sur iPhone et Android, sans appli à installer."],
      ["Mon 3GP est un enregistrement vocal, pas une vidéo. Ça marche ?", "Oui. Les fichiers 3GP audio uniquement se convertissent de la même façon, tout comme les enregistrements vocaux .amr."],
    ],
  },
  {
    key: 'c-mp3ogg', convLabel: 'MP3 en OGG', path: 'fr/mp3-en-ogg', tool: 'converter', format: 'ogg', crumb: 'Converters',
    title: `Convertir MP3 en OGG en ligne, gratuit (Vorbis) | ${NAME}`,
    description: "Convertis un MP3 en OGG Vorbis pour les moteurs de jeu, les applis open source et Linux. Choisis la qualité et coupe le fichier. Gratuit, sans envoi.",
    h1: "Convertisseur <em>MP3 en OGG</em>",
    lead: "Transforme tes MP3 en fichiers OGG Vorbis pour les jeux, les moteurs de jeu et les logiciels open source.",
    badges: ["OGG Vorbis", "Pour l'audio de jeu", "Sans envoi"],
    steps: [
      ["Ouvre le MP3", "Choisis un MP3, ou dépose plusieurs fichiers à la fois."],
      ["OGG est déjà sélectionné", "Choisis une qualité. 192 kbps est un bon choix par défaut."],
      ["Télécharge l'OGG", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Pourquoi convertir un MP3 en OGG ?</h2>
    <p>L'OGG Vorbis est un format audio ouvert et libre de redevances. Les moteurs de jeu comme Godot et Unity l'importent directement, et beaucoup de jeux l'utilisent pour la musique et les effets sonores. Les applis de bureau Linux et de nombreux logiciels open source préfèrent aussi l'OGG. Si un outil te demande un <code>.ogg</code>, c'est le moyen rapide d'en obtenir un.</p>
    <h3>Quelle qualité choisir ?</h3>
    <p>${NAME} utilise le mode qualité de Vorbis, qui adapte le débit au son. Le réglage que tu choisis est une cible approximative :</p>
    <ul>
      <li><strong>192 kbps</strong> : un bon choix par défaut pour la musique de jeu.</li>
      <li><strong>128 kbps</strong> : largement suffisant pour les dialogues et la plupart des effets sonores, et plus léger.</li>
      <li><strong>320 kbps</strong> : utile seulement si le MP3 lui-même était en 320 kbps.</li>
    </ul>
    <p>Le MP3 et l'OGG sont tous les deux compressés, donc passer de l'un à l'autre fait perdre un tout petit peu à chaque fois. Si tu as encore le WAV ou le FLAC d'origine, convertis plutôt celui-là pour un résultat plus propre.</p>
    <h3>Préparer l'audio de jeu d'un coup</h3>
    <p>Avant de convertir, fais glisser sur la forme d'onde pour couper le silence au début ou à la fin, afin qu'une boucle musicale démarre pile sur le temps. Ouvre <strong>Effets</strong> pour ajouter un fondu, changer la vitesse ou la tonalité, ou égaliser le volume avec le <strong>Volume automatique</strong>. Pour découper un long morceau en plusieurs parties, utilise <a href="/fr/diviser-audio/">Diviser un audio</a>.</p>
    <h3>Beaucoup de fichiers à la fois</h3>
    <p>Choisis plusieurs MP3 ensemble, appuie sur <strong>Tout convertir</strong> et télécharge-les dans un seul ZIP. Pratique pour un dossier d'effets sonores.</p>
    <p>Tu veux faire l'inverse ? Le convertisseur <a href="/fr/ogg-en-mp3/">OGG en MP3</a> retransforme les fichiers OGG en MP3 pour les téléphones et les voitures.</p>`,
    faq: [
      ["L'OGG est-il en Vorbis ou en Opus ?", "En Vorbis, le type qu'attendent les moteurs de jeu et la plupart des applis pour un fichier .ogg."],
      ["L'OGG sera-t-il plus léger que le MP3 ?", "À un réglage de qualité similaire, il fait à peu près la même taille, souvent un peu moins."],
      ["Convertir un MP3 en OGG fait-il perdre de la qualité ?", "Légèrement, car les deux formats sont compressés. À partir de 192 kbps, c'est très difficile à entendre."],
      ["Puis-je créer une boucle musicale sans coupure ?", "Fais glisser les poignées sur la forme d'onde pour couper le silence au début et à la fin avant de convertir. Les points de boucle exacts se règlent plutôt dans ton moteur de jeu."],
    ],
  },
  {
    key: 'c-wavflac', convLabel: 'WAV en FLAC', path: 'fr/wav-en-flac', tool: 'converter', format: 'flac', crumb: 'Converters',
    title: `Convertir WAV en FLAC sans perte, gratuitement | ${NAME}`,
    description: "Convertis un WAV en FLAC en ligne et réduis tes fichiers de moitié environ, sans aucune perte de qualité. Gratuit, privé, rapide. Rien n'est envoyé.",
    h1: "Convertisseur <em>WAV en FLAC</em>",
    lead: "Réduis les gros fichiers WAV en FLAC sans perte. Même son, environ deux fois moins de place.",
    badges: ["Sans perte", "Environ deux fois plus léger", "Sans envoi"],
    steps: [
      ["Ouvre le WAV", "Choisis un fichier WAV, ou dépose-en plusieurs à la fois."],
      ["FLAC est déjà sélectionné", "Laisse les effets désactivés pour une copie exacte."],
      ["Télécharge le FLAC", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Sans perte, mais plus léger</h2>
    <p>Le WAV stocke chaque échantillon sans compression, environ 10 Mo par minute en stéréo qualité CD. Le FLAC range exactement le même audio de façon plus compacte, un peu comme un fichier ZIP pour le son. La plupart des morceaux finissent à environ la moitié de la taille, parfois moins pour les enregistrements calmes ou la voix. Quand tu lis le FLAC, le son est identique à celui du WAV.</p>
    <p>Il n'y a pas de réglage de qualité pour le FLAC, car rien n'est supprimé. Le menu Qualité ne compte que pour le MP3, le M4A et l'OGG.</p>
    <h3>Quand le FLAC est utile</h3>
    <ul>
      <li><strong>Archiver</strong> des enregistrements, des rips de CD ou tes propres morceaux sans rien perdre.</li>
      <li><strong>Gagner de la place</strong> sur un disque rempli de fichiers WAV issus d'un enregistreur ou d'un logiciel de musique.</li>
      <li><strong>Les lecteurs hi-fi</strong> et les serveurs de musique qui lisent le FLAC et ses tags.</li>
    </ul>
    <h3>Quand choisir autre chose</h3>
    <p>Les iPhone ne lisent pas le FLAC dans l'appli Musique, et beaucoup d'autoradios l'ignorent. Pour l'écoute quotidienne sur téléphone, <a href="/fr/wav-en-mp3/">WAV en MP3</a> à 320 kbps est bien plus léger et sonne presque pareil. Besoin d'un WAV plus tard ? Le convertisseur <a href="/fr/flac-en-wav/">FLAC en WAV</a> te donne une copie exacte en 16 bits.</p>
    <h3>Convertir tout un dossier</h3>
    <p>Choisis plusieurs fichiers WAV ensemble, appuie sur <strong>Tout convertir</strong>, puis télécharge les fichiers FLAC un par un ou dans un seul ZIP. Vérifie que quelques-uns des nouveaux fichiers se lisent correctement avant de supprimer des originaux.</p>
    <h3>Les effets modifient l'audio</h3>
    <p>Pour une vraie copie sans perte, laisse <strong>Effets</strong> désactivé et garde tout le fichier sélectionné. Si tu coupes le fichier, ajoutes un fondu ou actives le Volume automatique, le FLAC contiendra la version modifiée, toujours sans perte de compression en plus.</p>`,
    faq: [
      ["Convertir un WAV en FLAC fait-il perdre de la qualité ?", "Non. Le FLAC est sans perte : une fois décodé, tu retrouves exactement le même audio que dans le WAV."],
      ["Le FLAC est-il beaucoup plus léger que le WAV ?", "En général, environ deux fois plus léger. Les enregistrements calmes ou simples rétrécissent davantage, la musique dense et forte un peu moins."],
      ["Puis-je reconvertir un FLAC en WAV ?", "Oui, avec le convertisseur FLAC en WAV, sans aucune perte."],
      ["Mon FLAC aura-t-il des tags et une pochette ?", "Non. Les métadonnées sont retirées du fichier final pour protéger ta vie privée, ajoute donc les titres et les pochettes dans ton appli de musique ensuite."],
    ],
  },
];
