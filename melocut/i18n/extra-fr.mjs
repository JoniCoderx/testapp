// French versions of the newer pages. Each `key` matches the English page (build.mjs KEY_OF).
// French ("tu"); button and effect names match the French interface strings in i18n/ui_fr.py.
export const toolPaths = { 'audio-splitter': 'fr/diviser-audio' };

export default (NAME) => [
  // ---------- Tools ----------
  {
    key: 'splitter', path: 'fr/diviser-audio', tool: 'splitter', crumb: 'Tools',
    title: `Diviser un MP3 en plusieurs parties en ligne | ${NAME}`,
    description: "Divise un MP3, un podcast ou un long enregistrement en parties égales ou toutes les X minutes. Tout en un seul ZIP. Gratuit, privé, sans envoi de fichier.",
    h1: "<em>Diviser un audio</em> : couper un MP3 en parties",
    lead: "Découpe une longue chanson, un podcast, un cours ou un livre audio en parties égales, ou en une nouvelle partie toutes les quelques minutes. Toutes les parties arrivent dans un seul ZIP.",
    badges: ["2 à 10 parties", "Ou toutes les N minutes", "Un seul ZIP"],
    steps: [
      ["Ouvre ton fichier", "Un long MP3, un enregistrement, un podcast ou une vidéo."],
      ["Choisis comment diviser", "Choisis un nombre de parties égales, ou une partie toutes les 1 à 30 minutes."],
      ["Divise et télécharge", "Appuie sur Diviser, puis sur Tout télécharger (ZIP)."],
    ],
    content: `
    <h2>Ce qu'on divise le plus souvent</h2>
    <ul>
      <li><strong>Les longs enregistrements et les cours</strong>, en parties de 10 ou 15 minutes plus faciles à partager et à écouter.</li>
      <li><strong>Les podcasts et les livres audio</strong>, en chapitres pour les lecteurs qui retiennent où tu t'es arrêté dans chaque fichier.</li>
      <li><strong>Les messages vocaux pour WhatsApp ou l'e-mail</strong>, quand un fichier est trop lourd pour être envoyé d'un seul coup.</li>
      <li><strong>Un mix DJ ou un concert</strong>, en sections égales.</li>
    </ul>
    <h3>Seulement une partie du fichier ?</h3>
    <p>Fais d'abord glisser les poignées sur la forme d'onde. Seule la partie sélectionnée est divisée, tu peux donc sauter une intro ou le silence à la fin.</p>
    <h3>Format et effets</h3>
    <p>Chaque partie est enregistrée dans le format choisi : MP3, M4A, WAV, OGG ou FLAC. Les effets s'appliquent aussi à chaque partie : active le <strong>Volume automatique</strong> pour égaliser le volume, ou ajoute un court fondu d'entrée et de sortie pour que les parties ne commencent et ne finissent pas brusquement.</p>
    <p>Tu as besoin d'un seul passage précis ? Utilise <a href="/fr/couper-audio/">Couper un audio</a>. Tu veux réassembler des parties ? Utilise <a href="/fr/fusionner-audio/">Fusionner des audios</a>.</p>`,
    faq: [
      ["Comment diviser un MP3 en parties égales ?", "Ouvre le MP3, choisis par exemple 4 parties égales, appuie sur Diviser et télécharge le ZIP avec les quatre parties."],
      ["Puis-je diviser un fichier toutes les 10 minutes ?", "Oui. Choisis Toutes les 10 min. La dernière partie reçoit ce qui reste."],
      ["Le fichier est-il envoyé en ligne ?", "Non. Il est divisé dans ton navigateur."],
      ["Comment ouvrir le ZIP sur mon téléphone ?", "Sur iPhone, touche le ZIP dans l'app Fichiers et il se décompresse dans un dossier. Sur Android, ouvre-le dans Fichiers et touche Extraire."],
    ],
  },
  {
    key: 'normalize', path: 'fr/normaliser-audio', tool: 'converter', crumb: 'Tools', fx: { normalize: true }, suffix: ' (normalisé)',
    note: "Le Volume automatique est activé. Il amène tout le fichier à un volume régulier, comme sur les plateformes de streaming. Appuie sur Lire avec effets pour l'écouter.",
    title: `Normaliser un audio en ligne : égaliser le volume | ${NAME}`,
    description: "Normalise un audio en ligne : les fichiers faibles et forts au même volume, comme Spotify et YouTube. MP3, WAV, messages vocaux, vidéos. Gratuit, sans envoi.",
    h1: "<em>Normaliser un audio</em> en ligne",
    lead: "Amène n'importe quel enregistrement ou chanson à un volume standard et régulier : les fichiers faibles deviennent clairs et les fichiers forts ne t'explosent plus les oreilles. Un limiteur garde le son propre.",
    badges: ["Volume des plateformes", "Sans saturation", "Sans envoi"],
    steps: [
      ["Ouvre ton fichier", "Une chanson, un message vocal, un podcast, un cours ou une vidéo."],
      ["Écoute", "Le Volume automatique est déjà activé. Appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Ce que fait la normalisation</h2>
    <p>Le <strong>Volume automatique</strong> mesure le volume perçu de tout le fichier par l'auditeur, pas seulement son pic le plus fort, et l'amène à peu près au niveau qu'utilisent les applis de streaming. Un limiteur rattrape ensuite les moments les plus forts pour que rien ne grésille. Les enregistrements faibles deviennent clairs ; les fichiers déjà forts restent presque comme avant.</p>
    <h3>Plusieurs fichiers au même volume</h3>
    <p>Tu prépares une playlist ou un podcast avec plusieurs extraits ? Normalise-les un par un, ou assemble-les avec <a href="/fr/fusionner-audio/">Fusionner des audios</a> et active <strong>Égaliser le volume</strong>.</p>
    <h3>Toujours trop faible ?</h3>
    <p>Monte aussi le curseur Volume dans Effets, ou utilise <a href="/fr/augmenter-le-volume/">Augmenter le volume</a>.</p>`,
    faq: [
      ["Qu'est-ce que la normalisation audio ?", "C'est l'ajustement d'un fichier pour que son volume global atteigne un niveau standard. MeloCut utilise la normalisation du volume perçu, qui se base sur ce que tu entends plutôt que sur le seul pic le plus élevé."],
      ["La normalisation va-t-elle déformer mon audio ?", "Non. Un limiteur contrôle les pics, donc le résultat est plus fort sans saturer."],
      ["Puis-je normaliser plusieurs fichiers à la fois ?", "Normalise-les un par un ici, ou assemble-les avec Fusionner des audios et active Égaliser le volume."],
    ],
  },
  {
    key: 'mono', path: 'fr/stereo-en-mono', tool: 'converter', crumb: 'Tools', fx: { mono: true }, suffix: ' (mono)',
    note: "Mono est activé : les deux canaux sont mélangés en un seul. Appuie sur Lire avec effets pour vérifier.",
    title: `Stéréo en mono : convertir un audio en mono | ${NAME}`,
    description: "Convertis un audio stéréo en mono en ligne : mélange gauche et droite en un canal pour enceintes, appels, podcasts ou fichiers plus légers. Gratuit, sans envoi.",
    h1: "Convertir <em>stéréo en mono</em>",
    lead: "Mélange les canaux gauche et droit en un seul, pour que le son soit le même sur chaque enceinte et dans un seul écouteur.",
    badges: ["Gauche + droite mélangés", "WAV plus léger", "Sans envoi"],
    steps: [
      ["Ouvre ton fichier", "N'importe quelle chanson, enregistrement ou vidéo."],
      ["Écoute", "Mono est déjà activé. Appuie sur Lire avec effets."],
      ["Télécharge", "Choisis un format, appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Quand le mono est préférable</h2>
    <ul>
      <li><strong>Un seul écouteur ou une seule enceinte :</strong> rien de ce qui n'était que de l'autre côté ne se perd.</li>
      <li><strong>Enregistrements de voix et podcasts :</strong> une voix coincée dans une seule oreille sonne bizarre ; le mono la place au centre.</li>
      <li><strong>Fichiers plus légers :</strong> un WAV mono fait la moitié de la taille d'un WAV stéréo.</li>
    </ul>
    <p>Les deux canaux sont mélangés, tu gardes donc tout ce qui se trouvait d'un côté ou de l'autre.</p>
    <h3>La voix d'un seul côté ?</h3>
    <p>Certains enregistrements n'ont la voix que sur le canal gauche ou droit. Le mono règle ça aussi. Active également le <strong>Volume automatique</strong> si le résultat est trop faible.</p>`,
    faq: [
      ["Passer en mono fait-il perdre de la qualité ?", "Ça supprime l'image stéréo gauche-droite, mais garde tout le son des deux côtés. Pour la voix, tu n'entendras aucune différence."],
      ["Le fichier sera-t-il plus léger ?", "Un WAV ou un FLAC mono fait environ la moitié de la taille. Pour un MP3, la taille dépend surtout du débit que tu choisis."],
    ],
  },
  {
    key: 'reverb', path: 'fr/ajouter-reverb', tool: 'converter', crumb: 'Tools', fx: { reverb: 40 }, suffix: ' (réverb)',
    note: "La Réverb est réglée à 40 %. Bouge le curseur Réverb et appuie sur Lire avec effets pour l'écouter.",
    title: `Ajouter de la réverb à un audio en ligne, gratuit | ${NAME}`,
    description: "Ajoute de la réverb à des voix, des chansons et des messages vocaux en ligne. Choisis l'effet de salle, écoute et télécharge. Gratuit, privé, sans envoi.",
    h1: "Ajouter de la <em>réverb</em> à un audio",
    lead: "Donne de l'espace à un enregistrement trop sec : d'une petite pièce à une grande salle. Règle l'intensité, écoute et télécharge.",
    badges: ["De 0 à 100 %", "Écoute d'abord", "MP3 ou WAV"],
    steps: [
      ["Ouvre ton fichier", "Une voix, une chanson, un message vocal ou une vidéo."],
      ["Règle l'intensité", "40 % est réglé. Bouge le curseur Réverb et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Combien de réverb ?</h2>
    <ul>
      <li><strong>10 à 25 % :</strong> une pièce naturelle. Idéal pour les voix enregistrées à la maison et les voix off trop sèches.</li>
      <li><strong>30 à 50 % :</strong> un son ample et planant, comme dans les edits slowed + reverb.</li>
      <li><strong>60 % et plus :</strong> une grande salle ou une grotte, pour un effet.</li>
    </ul>
    <h3>Combinaisons populaires</h3>
    <p>Pour la tendance classique, baisse aussi la vitesse et la tonalité, ou commence avec <a href="/fr/slowed-reverb/">Slowed + Reverb</a>. Pour une voix dans un grand espace, essaie la voix <em>Écho</em> du <a href="/fr/modificateur-de-voix/">Modificateur de voix</a>.</p>`,
    faq: [
      ["Quelle est la différence entre réverb et écho ?", "La réverb, c'est la traîne douce du son dans une pièce. Un écho est une répétition bien distincte. La réverb de MeloCut donne un effet de salle ; la voix Écho du Modificateur de voix tend plutôt vers un grand espace qui résonne."],
      ["Puis-je ajouter de la réverb seulement à ma voix ?", "La réverb s'applique à tout le fichier. Pour un résultat sur la voix seule, ajoute-la à un enregistrement de voix avant de le mélanger avec la musique."],
    ],
  },
  // ---------- Conversions ----------
  {
    key: 'c-compress', convLabel: 'Compresser un MP3', path: 'fr/compresser-mp3', tool: 'converter', format: 'mp3', quality: '64', crumb: 'Converters', suffix: ' (compressé)',
    title: `Compresser un MP3 : réduire la taille d'un audio | ${NAME}`,
    description: "Réduis la taille de fichiers MP3 et audio en ligne : baisse le débit, passe en mono et coupe. Gratuit, privé et rapide. Ton fichier n'est jamais envoyé.",
    h1: "<em>Compresser un MP3</em> et des fichiers audio",
    lead: "Rends un MP3, un message vocal ou un enregistrement beaucoup plus léger pour qu'il passe les limites d'e-mail, de chat ou d'envoi. Choisis une qualité plus basse et vois la nouvelle taille.",
    badges: ["De 64 à 320 kbps", "Option mono", "Sans envoi"],
    steps: [
      ["Ouvre le fichier", "N'importe quel MP3, WAV, M4A ou autre fichier audio, ou une vidéo."],
      ["Choisis une qualité plus basse", "64 kbps est sélectionné. Prends 96 ou 128 kbps pour la musique."],
      ["Télécharge", "Appuie sur Convertir. La nouvelle taille s'affiche avant le téléchargement."],
    ],
    content: `
    <h2>Combien plus léger ?</h2>
    <p>La taille d'un MP3 dépend presque uniquement de son débit et de sa durée :</p>
    <ul>
      <li><strong>320 kbps :</strong> environ 2,4 Mo par minute.</li>
      <li><strong>128 kbps :</strong> environ 1 Mo par minute.</li>
      <li><strong>96 kbps :</strong> environ 0,7 Mo par minute.</li>
      <li><strong>64 kbps :</strong> environ 0,5 Mo par minute. Suffisant pour la voix, les podcasts et les messages vocaux.</li>
    </ul>
    <p>Une chanson à 320 kbps devient donc environ cinq fois plus légère à 64 kbps.</p>
    <h3>Encore plus léger</h3>
    <ul>
      <li>Active <strong>Mono</strong> dans Effets. Pour la voix, tu n'entendras pas la différence.</li>
      <li>Fais glisser sur la forme d'onde pour ne garder que la partie utile.</li>
      <li>Active <strong>Supprimer les silences</strong> pour couper les longues pauses des enregistrements.</li>
    </ul>
    <h3>Et la qualité ?</h3>
    <p>Les débits plus bas suppriment des détails qu'on entend surtout dans la musique : 64 kbps convient bien aux voix, utilise 96 à 128 kbps pour les chansons. Compresser ne peut pas améliorer le son d'un fichier, alors garde l'original si tu risques d'en avoir besoin plus tard.</p>`,
    faq: [
      ["Comment réduire la taille d'un MP3 ?", "Ouvre-le ici, garde 64 ou 96 kbps, appuie sur Convertir et télécharge. Activer Mono le rend encore plus léger."],
      ["Puis-je compresser plusieurs fichiers à la fois ?", "Oui. Choisis plusieurs fichiers ensemble dans le Convertisseur audio et télécharge-les dans un seul ZIP."],
      ["Mon fichier est-il envoyé en ligne ?", "Non. Il est compressé dans ton navigateur."],
    ],
  },
  {
    key: 'c-mp4wav', convLabel: 'MP4 en WAV', path: 'fr/mp4-en-wav', tool: 'video-to-mp3', format: 'wav', crumb: 'Converters',
    title: `Convertir MP4 en WAV en ligne et gratuitement | ${NAME}`,
    description: "Convertis une vidéo MP4 en audio WAV en ligne pour le montage, la transcription ou les logiciels de musique. WAV 16 bits, sans envoi ni compte. Mobile et PC.",
    h1: "Convertisseur <em>MP4 en WAV</em>",
    lead: "Extrais le son d'un MP4 et enregistre-le en WAV non compressé, prêt pour ton logiciel de montage.",
    badges: ["WAV 16 bits", "MP4, MOV, WebM", "Sans envoi"],
    steps: [
      ["Ouvre le MP4", "Choisis une vidéo sur ton appareil."],
      ["WAV est déjà sélectionné", "Fais d'abord glisser sur la forme d'onde si tu n'as besoin que d'une partie."],
      ["Télécharge le WAV", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Pourquoi le WAV ?</h2>
    <p>Le WAV garde le son sans ajouter de compression : c'est le format que préfèrent les logiciels de montage, les DAW et les outils de transcription. Le son d'un MP4 est généralement déjà compressé ; le WAV le garde exactement tel quel, sans rien perdre de plus.</p>
    <p>Les fichiers WAV sont lourds, environ 10 Mo par minute. Si tu veux juste écouter, <a href="/fr/mp4-en-mp3/">MP4 en MP3</a> donne un fichier beaucoup plus léger.</p>`,
    faq: [
      ["Ça marche avec les vidéos d'iPhone ?", "Oui. Les vidéos MOV et MP4 de l'iPhone fonctionnent toutes les deux."],
      ["La vidéo est-elle envoyée en ligne ?", "Non. Le son est extrait dans ton navigateur."],
    ],
  },
  {
    key: 'c-m4awav', convLabel: 'M4A en WAV', path: 'fr/m4a-en-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Convertir M4A en WAV en ligne et gratuitement | ${NAME}`,
    description: "Convertis un M4A en WAV en ligne : mémos vocaux d'iPhone et audio iTunes en WAV 16 bits pour ton logiciel de montage. Gratuit, privé, rien n'est envoyé.",
    h1: "Convertisseur <em>M4A en WAV</em>",
    lead: "Transforme les mémos vocaux d'iPhone et les autres fichiers M4A en WAV pour le montage, la transcription ou les logiciels de musique.",
    badges: ["WAV 16 bits", "Mémos vocaux", "Sans envoi"],
    steps: [
      ["Ouvre le M4A", "Sur iPhone, partage d'abord le mémo vocal vers Fichiers, puis choisis-le ici."],
      ["WAV est déjà sélectionné", "Coupe-le ou ajoute des effets si tu veux."],
      ["Télécharge le WAV", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Quand tu as besoin du WAV</h2>
    <p>Certains éditeurs, samplers et services de transcription n'acceptent que le WAV. La conversion te donne un fichier qu'ils ouvrent tous. L'enregistrement ne sonnera pas mieux que le M4A, il est simplement stocké sans compression supplémentaire.</p>
    <p>Mémo vocal avec du bruit ? Active la <strong>Suppression du bruit par IA</strong> dans Effets avant de convertir.</p>`,
    faq: [
      ["Puis-je convertir des chansons iTunes protégées ?", "Non. Les chansons protégées contre la copie (DRM) ne peuvent pas être converties."],
      ["Quelle sera la taille du WAV ?", "Environ 10 Mo par minute en stéréo, moitié moins en mono."],
    ],
  },
  {
    key: 'c-flacwav', convLabel: 'FLAC en WAV', path: 'fr/flac-en-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Convertir FLAC en WAV sans perte, gratuitement | ${NAME}`,
    description: "Convertis un FLAC en WAV en ligne sans perte de qualité. Les deux sont sans perte, le son reste donc exactement le même. Gratuit, privé et rien n'est envoyé.",
    h1: "Convertisseur <em>FLAC en WAV</em>",
    lead: "Convertis ta musique FLAC sans perte en WAV pour les logiciels, appareils et graveurs de CD qui n'ouvrent pas le FLAC.",
    badges: ["Sans perte", "WAV 16 bits", "Sans envoi"],
    steps: [
      ["Ouvre le FLAC", "Choisis un fichier FLAC sur ton appareil."],
      ["WAV est déjà sélectionné", "Laisse les effets désactivés pour une copie exacte."],
      ["Télécharge le WAV", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Même son, autre conteneur</h2>
    <p>Le FLAC et le WAV sont tous les deux sans perte, donc rien n'est supprimé. Le FLAC est compressé comme un fichier ZIP, le WAV non, c'est pourquoi le WAV est environ deux fois plus lourd. ${NAME} enregistre en WAV 16 bits, la même qualité qu'un CD.</p>
    <p>Tu préfères un fichier plus léger ? <a href="/flac-to-mp3/">FLAC to MP3</a> (en anglais) à 320 kbps sonne presque pareil et ne pèse qu'une fraction de la taille.</p>`,
    faq: [
      ["Convertir un FLAC en WAV fait-il perdre de la qualité ?", "Non pour un FLAC normal en qualité CD. Les FLAC haute résolution en 24 bits sont enregistrés en WAV 16 bits."],
      ["Pourquoi le WAV est-il plus lourd ?", "Le WAV n'est pas compressé, il utilise donc environ 10 Mo par minute."],
    ],
  },
];
