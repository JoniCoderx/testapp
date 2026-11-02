import more, { toolPaths } from './fr-more.mjs';
// French ("tu") pages and site text. Self-contained: no guides, conversion or extra tool pages yet.
// Pages with the same `key` as an English page are linked to it with hreflang and the language switcher.
// Button names in steps and FAQs match the French interface strings in i18n/ui_fr.py.
const base = (NAME) => ({
  ui: {
    code: 'fr', hreflang: 'fr', ogLocale: 'fr_FR', prefix: '/fr', name: 'Français', short: 'FR',
    home: "Accueil", tools: "Outils", allTools: "Tous les outils", navAll: "Tous", popular: "Les plus utilisés", installApp: "Installer l'app", menu: "Menu",
    howItWorks: "Comment ça marche", faq: "Questions fréquentes", moreTools: "Plus d'outils gratuits",
    noscript: "Active JavaScript pour utiliser cet outil.", language: "Langue", homeAria: `Accueil de ${NAME}`,
    footerTagline: "Des outils audio gratuits qui fonctionnent dans ton navigateur",
    updated: "Mis à jour", minRead: "min de lecture", moreGuides: "Plus de guides", stepGuide: "Guide étape par étape",
    popularConv: "Conversions populaires", conversions: "Conversions",
    next: { 'audio-to-video': "En faire une vidéo", 'ringtone-maker': "En faire une sonnerie", 'audio-cutter': "Le couper" },
    support: "Soutenir MeloCut",
    fTools: "Outils", fHelp: "Aide et infos", fGuides: "Guides (en anglais)", fInstall: "Installer l'app",
    fAbout: "À propos et contact", fPrivacy: "Confidentialité", fTerms: "Conditions", inEnglish: "en anglais", newTag: "Nouveau",
    ogAlt: (h1) => `${h1} sur ${NAME}`, tag: "Gratuit · Privé · Aucun envoi de fichier",
    install: "Tu peux ajouter MeloCut à l'écran d'accueil de ton téléphone et l'ouvrir comme une app. Utilise un outil une fois avec une connexion, ensuite il continue de fonctionner sans internet.",
    installHow: "Comment l'installer (en anglais)",
    whyTitle: `Pourquoi utiliser ${NAME}`,
    why: [
      ['lock', "Tes fichiers restent chez toi", "Tout se passe dans ton navigateur. Rien n'est envoyé, donc personne d'autre ne voit tes fichiers."],
      ['bolt', "Pas d'attente", "Pas d'envoi ni de file d'attente pour le téléchargement. Une chanson prend en général quelques secondes. Les longues vidéos prennent un peu plus de temps."],
      ['phone', "Téléphone ou ordinateur", "Fonctionne sur Safari, Chrome, Edge et Firefox. Tu peux aussi l'installer sur ton écran d'accueil."],
      ['sparkle', "Gratuit et sans filigrane", "Sans compte et sans rien ajouté à ton audio. Utilise-le autant de fois que tu veux."],
    ],
  },
  tools: {
    'video-to-mp3': { title: "Vidéo en MP3", path: 'fr/video-en-mp3', blurb: "Extrais le son d'une vidéo MP4, MOV ou WebM." },
    'ringtone-maker': { title: "Créer une sonnerie", path: 'fr/creer-sonnerie', blurb: "Transforme un passage de chanson en sonnerie pour iPhone ou Android." },
    'audio-cutter': { title: "Couper un audio", path: 'fr/couper-audio', blurb: "Raccourcis une chanson ou supprime un passage au milieu." },
    'audio-converter': { title: "Convertisseur audio", path: 'fr/convertisseur-audio', blurb: "Passe de MP3 à WAV, M4A, OGG ou FLAC, et inversement." },
    'audio-joiner': { title: "Fusionner des audios", blurb: "Assemble plusieurs chansons ou extraits en un seul fichier." },
    'noise-remover': { title: "Supprimer le bruit avec l'IA", blurb: "Nettoie le bruit de fond des enregistrements de voix." },
    'slowed-reverb': { title: "Slowed + Reverb", blurb: "Crée une version ralentie d'une chanson, avec de la réverb." },
    'vocal-remover': { title: "Supprimer la voix", blurb: "Retire le chanteur pour obtenir une piste karaoké." },
    '8d-audio': { title: "Audio 8D", blurb: "Un son qui passe d'une oreille à l'autre. Mets un casque." },
    'bass-booster': { title: "Booster les basses", blurb: "Ajoute plus de basses à n'importe quelle chanson." },
    'volume-booster': { title: "Augmenter le volume", blurb: "Rends plus forts les enregistrements trop faibles." },
    'reverse-audio': { title: "Audio à l'envers", blurb: "Lis n'importe quel son à l'envers." },
    'speed-up-audio': { title: "Accélérer un audio", blurb: "Rends une chanson ou un message vocal plus rapide, sans changer la tonalité." },
    'slow-down-audio': { title: "Ralentir un audio", blurb: "Lis tout plus lentement, sans voix grave." },
    'pitch-changer': { title: "Changer la tonalité", blurb: "Change la tonalité d'une chanson sans changer la vitesse." },
    'nightcore-maker': { title: "Créateur de nightcore", blurb: "Plus rapide et plus aigu : le son nightcore classique." },
    'remove-silence': { title: "Supprimer les silences", blurb: "Coupe les longues pauses d'un enregistrement." },
    'fade-in-fade-out': { title: "Fondu d'entrée et de sortie", blurb: "Ajoute un début et une fin en douceur à n'importe quelle chanson." },
    'voice-changer': { title: "Modificateur de voix", path: 'fr/modificateur-de-voix', blurb: "Écureuil, voix grave, robot, monstre et d'autres voix." },
    'audio-to-video': { title: "MP3 en MP4", path: 'fr/mp3-en-mp4', blurb: "Transforme une chanson en MP4 pour TikTok et Reels." },
  },
  pages: [
    {
      key: 'home', path: 'fr',
      title: `Couper un MP3, créer une sonnerie, vidéo en MP3 gratuit | ${NAME}`,
      description: "Coupe des chansons, crée des sonneries pour iPhone et Android, ajoute des effets et convertis des vidéos en MP3. Gratuit, tes fichiers restent sur ton appareil.",
      h1: "Coupe des chansons, crée des sonneries et ajoute des effets, <em>dans ton navigateur</em>",
      lead: "Des outils audio gratuits pour ton téléphone ou ton ordinateur. Tes fichiers ne sont jamais envoyés. Choisis un outil pour commencer.",
      badges: ["20 outils gratuits", "Suppression du bruit par IA", "Aucun envoi de fichier", "Sans inscription"],
      home: true,
      body: (L) => `
  <div class="section prose">
    <h2>Des effets dans chaque outil</h2>
    <p>Chaque outil a un panneau <strong>Effets et filtres</strong>. Tu peux ajouter un fondu d'entrée et de sortie, régler le volume, la vitesse, la tonalité, les graves, les aigus et la réverb, ou activer l'audio 8D, la suppression du bruit par IA, la suppression de la voix et plus encore. Les préréglages comme <em>Slowed + Reverb</em>, <em>Nightcore</em> et <em>Basses boostées</em> configurent tout en une touche.</p>
    <p>Une deuxième forme d'onde montre l'effet de tes réglages pendant que tu bouges les curseurs, et <strong>Écouter avec effets</strong> lit le résultat avant que tu l'enregistres.</p>
  </div>
  ${L.WHY}
  ${L.INSTALL}
  <div class="section prose">
    <h2>Comment ça marche</h2>
    <p>La plupart des sites de conversion t'obligent à envoyer ton fichier, à attendre, puis à le retélécharger. ${NAME} utilise FFmpeg, le moteur audio de nombreux logiciels de bureau, directement dans ton navigateur. Tes chansons, messages vocaux et vidéos restent sur ton appareil du début à la fin. Pas de pop-up ni de faux boutons de téléchargement. Le site est gratuit parce qu'il affiche quelques publicités, toujours signalées comme telles.</p>
  </div>`,
      faq: [
        ["MeloCut est-il gratuit ?", "Oui. Tous les outils sont gratuits et financés par quelques publicités signalées. Pas besoin de s'inscrire et il n'y a pas de filigrane."],
        ["Mes fichiers sont-ils envoyés quelque part ?", "Non. Tout le traitement se fait dans ton navigateur, sur ton propre appareil."],
        ["Ça fonctionne sur iPhone et Android ?", "Oui. Ça fonctionne sur Safari, Chrome, Firefox et Edge, sur téléphone, tablette et ordinateur."],
        ["Quels types de fichiers puis-je ouvrir ?", "MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP et la plupart des formats audio et vidéo."],
        ["Puis-je installer MeloCut comme une app ?", "Oui. Ajoute-le à ton écran d'accueil depuis Safari ou Chrome. Il s'ouvre en plein écran, et les outils que tu as déjà utilisés continuent de fonctionner hors connexion."],
        ["MeloCut utilise-t-il l'IA ?", "L'outil de suppression du bruit utilise RNNoise, un petit réseau de neurones qui sépare la voix du bruit de fond. Il fonctionne sur ton appareil. Les autres effets relèvent du traitement audio classique."],
      ],
    },
    {
      key: 'cutter', path: 'fr/couper-audio', tool: 'cutter', crumb: 'Tools',
      title: `Couper un MP3 en ligne : couper audio et chansons | ${NAME}`,
      description: "Coupe un MP3 ou un autre audio en ligne. Garde ou supprime un passage, ajoute des fondus et enregistre en MP3, M4A, WAV, OGG ou FLAC. Gratuit et privé.",
      h1: "<em>Couper un audio</em> : coupe un MP3 ou une chanson",
      lead: "Coupe le début et la fin d'une chanson, ou supprime un passage au milieu. Ajoute des fondus et enregistre dans le format qu'il te faut.",
      badges: ["Garder ou supprimer un passage", "Fondu d'entrée et de sortie", "MP3, M4A, WAV, OGG, FLAC"],
      steps: [
        ["Ouvre ton audio", "Choisis un MP3, un WAV, un M4A ou n'importe quel fichier audio ou vidéo."],
        ["Sélectionne le passage", "Fais glisser les poignées sur la forme d'onde, ou tape les heures exactes de début et de fin."],
        ["Garde-le ou supprime-le", "Choisis Garder la sélection ou Supprimer la sélection, puis Couper et enregistrer, et Télécharger."],
      ],
      content: `
    <h2>Coupe exactement où tu veux</h2>
    <p>La forme d'onde montre où la musique est forte ou douce. Fais glisser les poignées au bon endroit et appuie sur Lire pour écouter avant d'enregistrer. Pour une coupe précise, tape les temps toi-même, par exemple <code>1:23.5</code>.</p>
    <h3>Supprimer un passage au milieu</h3>
    <p>Passe à <strong>Supprimer la sélection</strong> pour retirer une intro, une longue pause, une erreur ou une pub. Les deux parties restantes sont recollées automatiquement.</p>
    <h3>Évite de perdre encore en qualité</h3>
    <p>Choisis <strong>WAV</strong> ou <strong>FLAC</strong> si tu comptes retoucher le fichier : aucun des deux n'ajoute de perte liée à la compression. Le WAV est enregistré en 16 bits, la même qualité qu'un CD.</p>
    <h3>Idées pour tes extraits</h3>
    <ul>
      <li><strong>Sonnerie</strong> : coupe environ 30 secondes du refrain, ou utilise l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a>, qui la prépare pour iPhone ou Android.</li>
      <li><strong>Statuts, Reels et TikTok</strong> : garde seulement le meilleur passage de la chanson et ajoute un fondu à la fin.</li>
      <li><strong>Messages vocaux et cours</strong> : supprime le silence du début ou un passage inutile.</li>
      <li><strong>Le son d'une vidéo</strong> : ouvre directement la vidéo, ou extrais-en le son avec <a href="/fr/video-en-mp3/">vidéo en MP3</a>.</li>
    </ul>
    <h3>Sur mobile, sans rien installer</h3>
    <p>Ça fonctionne dans le navigateur d'Android et d'iPhone. Ton fichier est traité sur ton appareil et n'est jamais envoyé à un serveur, donc ça convient aussi aux enregistrements privés.</p>`,
      faq: [
        ["Comment couper un MP3 ?", "Ouvre le MP3, fais glisser les poignées jusqu'au passage voulu, choisis Garder la sélection et appuie sur Couper et enregistrer, puis Télécharger."],
        ["Puis-je supprimer un passage au milieu ?", "Oui. Sélectionne le passage dont tu ne veux pas et choisis Supprimer la sélection."],
        ["Couper fait-il baisser la qualité ?", "Choisis MP3 à 320 kbps pour un résultat très proche de l'original, ou WAV ou FLAC pour n'ajouter aucune perte liée à la compression."],
        ["Couper un audio ici est-il gratuit ?", "Oui. Pas besoin de t'inscrire, pas de filigrane et pas de limite de coupes."],
        ["Puis-je couper un audio sur mon téléphone ?", "Oui. Ça fonctionne dans le navigateur d'Android et d'iPhone, sans installer d'app."],
        ["Ça fonctionne hors connexion ?", "Oui, après avoir utilisé un outil une fois avec une connexion. Le moteur audio reste enregistré sur ton appareil."],
      ],
    },
    {
      key: 'video', path: 'fr/video-en-mp3', tool: 'video-to-mp3', crumb: 'Tools',
      title: `Convertir une vidéo en MP3 gratuitement en ligne | ${NAME}`,
      description: "Convertis des vidéos MP4, MOV, WebM et autres en MP3 dans ton navigateur. Jusqu'à 320 kbps, sans envoi de fichier ni inscription. Marche sur iPhone et Android.",
      h1: "Convertir une <em>vidéo en MP3</em>",
      lead: "Extrais le son de n'importe quelle vidéo et enregistre-le en MP3, M4A ou WAV. Tout se fait sur ton appareil, donc même les grosses vidéos vont vite.",
      badges: ["Jusqu'à 320 kbps", "MP4, MOV, WebM, MKV", "Aucun envoi de fichier"],
      steps: [
        ["Choisis ta vidéo", "Touche le cadre ci-dessus et choisis une vidéo, ou fais-la glisser."],
        ["Coupe-la si tu veux", "Garde tout l'audio, ou fais glisser sur la forme d'onde pour ne garder qu'un passage."],
        ["Convertis et télécharge", "Choisis MP3 et une qualité, appuie sur Convertir, puis sur Télécharger."],
      ],
      content: `
    <h2>Extraire le son d'une vidéo</h2>
    <p>Tu as filmé un concert, un cours ou un moment drôle et tu n'as besoin que du son ? Ouvre la vidéo ici et enregistre l'audio en MP3 pour l'écouter en voiture, dans une app de musique ou où tu veux.</p>
    <h3>Quelles vidéos fonctionnent ?</h3>
    <p>MP4, MOV (le format dans lequel filme l'iPhone), WebM, MKV, AVI et 3GP. Si ton navigateur peut ouvrir le fichier, ça fonctionne presque toujours.</p>
    <h3>Quelle qualité choisir ?</h3>
    <p>Prends <strong>320 kbps</strong> pour la musique. <strong>128 kbps</strong> suffit pour la voix et donne des fichiers bien plus petits. Choisis <strong>WAV</strong> si tu veux retoucher l'audio ensuite.</p>
    <h3>Grosses vidéos</h3>
    <p>Les limites de taille dépendent de ton appareil et de ton navigateur. Un ordinateur gère des fichiers bien plus gros qu'un téléphone, et MeloCut n'accepte pas les fichiers de plus de 1 Go. Pour les longues vidéos, coupe-les d'abord ou utilise un ordinateur.</p>`,
      faq: [
        ["Comment convertir un MP4 en MP3 ?", "Ouvre le MP4 ci-dessus, choisis MP3 et une qualité, appuie sur Convertir, puis sur Télécharger. Ça prend quelques secondes."],
        ["Puis-je convertir des vidéos d'iPhone ?", "Oui. Choisis la vidéo dans Photos ou Fichiers, elle se convertit comme n'importe quelle autre."],
        ["Y a-t-il une limite de taille ?", "Les limites de taille dépendent de ton appareil et de ton navigateur. Un ordinateur gère des fichiers bien plus gros qu'un téléphone, et MeloCut n'accepte pas les fichiers de plus de 1 Go. Pour les longues vidéos, coupe-les d'abord ou utilise un ordinateur."],
        ["Puis-je convertir des vidéos YouTube ?", "MeloCut travaille avec les fichiers de ton appareil. Il ne télécharge pas de vidéos depuis YouTube ni depuis d'autres sites."],
      ],
    },
    {
      key: 'ringtone', path: 'fr/creer-sonnerie', tool: 'ringtone', crumb: 'Tools',
      title: `Créer une sonnerie pour iPhone et Android gratuitement | ${NAME}`,
      description: "Crée une sonnerie avec n'importe quelle chanson. Choisis le meilleur passage, ajoute un fondu et enregistre en M4R (iPhone) ou MP3 (Android). Gratuit, sans app.",
      h1: "<em>Créer une sonnerie</em> pour iPhone et Android",
      lead: "Choisis ton passage préféré d'une chanson et enregistre-le comme sonnerie pour iPhone (M4R) ou Android (MP3).",
      badges: ["M4R pour iPhone", "MP3 pour Android", "Fondu d'entrée et de sortie"],
      steps: [
        ["Choisis une chanson", "Ouvre n'importe quelle chanson ou vidéo de ton appareil."],
        ["Choisis le passage qui te plaît", "Fais glisser sur la forme d'onde pour sélectionner jusqu'à 40 secondes. Appuie sur Lire pour vérifier."],
        ["Télécharge la sonnerie", "Choisis M4R pour iPhone ou MP3 pour Android, puis Créer la sonnerie et Télécharger."],
      ],
      content: `
    <h2>Mettre la sonnerie sur ton téléphone</h2>
    <h3>iPhone</h3>
    <p>Avec un ordinateur : télécharge le fichier <strong>M4R</strong>, branche ton iPhone et fais glisser le fichier dessus dans le Finder (Mac) ou iTunes (Windows). Elle apparaît ensuite dans <em>Réglages → Sons et vibrations → Sonnerie</em>. Sans ordinateur : ouvre le fichier dans <strong>GarageBand</strong> sur ton iPhone et utilise <em>Partager → Sonnerie</em>.</p>
    <h3>Android</h3>
    <p>Télécharge le <strong>MP3</strong>, va dans <em>Paramètres → Sons et vibration → Sonnerie</em> et choisis-le. Sur certains téléphones, il faut d'abord toucher « + » ou « Ajouter une sonnerie ».</p>
    <h3>Quelques conseils</h3>
    <p>Commence juste avant le refrain, garde la sonnerie entre 20 et 30 secondes et laisse les fondus pour qu'elle ne démarre ni ne s'arrête brusquement.</p>`,
      faq: [
        ["Combien de temps peut durer une sonnerie ?", "Moins de 30 secondes si tu la définis depuis l'app Fichiers de l'iPhone, et jusqu'à 40 secondes avec GarageBand ou un ordinateur. MeloCut sélectionne 29 secondes au départ et limite ta sélection à 40."],
        ["Qu'est-ce qu'un fichier M4R ?", "C'est le format de sonnerie de l'iPhone. À l'intérieur, c'est un fichier audio M4A (AAC) classique."],
        ["Puis-je créer une sonnerie à partir d'une vidéo ?", "Oui. Ouvre la vidéo et MeloCut utilise son son."],
        ["C'est gratuit ?", "Oui, entièrement gratuit, sans filigrane et sans inscription."],
      ],
    },
    {
      key: 'converter', path: 'fr/convertisseur-audio', tool: 'converter', crumb: 'Tools',
      title: `Convertisseur audio : MP3, WAV, M4A, OGG et FLAC | ${NAME}`,
      description: "Convertisseur audio en ligne gratuit : MP3, WAV, M4A, OGG, FLAC et OPUS. Change aussi la vitesse et le volume. Idéal pour les vocaux WhatsApp. Sans envoi.",
      h1: "<em>Convertisseur audio</em> pour MP3, WAV, M4A, OGG et FLAC",
      lead: "Convertis entre MP3, WAV, M4A, OGG et FLAC. Ouvre aussi les messages vocaux WhatsApp et Telegram (OPUS).",
      badges: ["MP3, WAV, M4A, OGG, FLAC", "Vitesse et volume", "Messages vocaux"],
      steps: [
        ["Ouvre un fichier", "N'importe quel fichier audio ou vidéo, y compris les messages vocaux .opus de WhatsApp."],
        ["Choisis le format", "Choisis le format et la qualité de sortie. Ajoute des effets si tu veux."],
        ["Convertis et télécharge", "Appuie sur Convertir, puis sur Télécharger."],
      ],
      content: `
    <h2>Convertis presque n'importe quel fichier audio</h2>
    <p>${NAME} ouvre les MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR et WMA, et enregistre dans le format qu'il faut pour ton téléphone, ta voiture ou ton app.</p>
    <p>Ouvre <strong>Effets et filtres</strong> si tu veux aussi ajouter des fondus, changer la vitesse ou la tonalité, augmenter les graves ou le volume, nettoyer le bruit ou ajouter de la réverb.</p>
    <h3>Messages vocaux WhatsApp et Telegram</h3>
    <p>Les messages vocaux sont enregistrés en fichiers <code>.opus</code> ou <code>.ogg</code> que beaucoup de lecteurs n'ouvrent pas. Convertis-les en MP3 et ils se liront partout.</p>
    <h3>Quel format choisir ?</h3>
    <p>Le MP3 fonctionne partout. Le M4A sonne un peu mieux pour la même taille. FLAC et WAV n'ajoutent aucune perte liée à la compression, mais prennent plus de place.</p>`,
      faq: [
        ["Puis-je convertir plusieurs fichiers à la fois ?", "Oui. Choisis ou dépose plusieurs fichiers ensemble, choisis le format et appuie sur Tout convertir. Tu peux télécharger chaque fichier ou tout télécharger d'un coup dans un ZIP."],
        ["Comment convertir un WAV en MP3 ?", "Ouvre le WAV, choisis MP3 et une qualité, appuie sur Convertir, puis sur Télécharger."],
        ["Comment convertir un message vocal WhatsApp en MP3 ?", "Enregistre le message vocal (.opus) sur ton appareil, ouvre-le ici, choisis MP3 et appuie sur Convertir."],
        ["Quel est le meilleur format audio ?", "Le MP3 se lit partout. Le M4A sonne un peu mieux pour la même taille. FLAC et WAV conservent la qualité mais sont plus lourds."],
        ["Puis-je faire une version slowed + reverb ?", "Oui. Touche le préréglage Slowed + Reverb dans Effets."],
      ],
    },
    {
      key: 'voice', path: 'fr/modificateur-de-voix', tool: 'voice-changer', crumb: 'Tools',
      title: `Modificateur de voix gratuit : écureuil, robot, grave | ${NAME}`,
      description: "Modifie ta voix gratuitement : écureuil, voix grave, monstre, robot, extraterrestre, téléphone et écho. Pour enregistrements, vocaux et vidéos. Sans envoi.",
      h1: "<em>Modificateur de voix</em> : écureuil, robot et voix grave",
      lead: "Transforme n'importe quel enregistrement, message vocal ou vidéo en écureuil, monstre, robot et plus encore. Écoute d'abord, puis enregistre.",
      badges: ["7 voix", "Écoute avant d'enregistrer", "Aucun envoi de fichier"],
      steps: [
        ["Ouvre un enregistrement", "Choisis un message vocal, un enregistrement ou une vidéo, ou touche Enregistrer avec le micro et dis quelque chose."],
        ["Choisis une voix", "Écureuil est déjà sélectionné. Touche Voix grave, Monstre, Robot, Extraterrestre, Téléphone ou Écho et appuie sur Écouter avec effets."],
        ["Enregistre-la", "Appuie sur Changer la voix, puis sur Télécharger. Partage-la ou utilise-la comme sonnerie."],
      ],
      content: `
    <h2>Les voix</h2>
    <ol class="guide-steps">
      <li><strong>Écureuil :</strong> aiguë et nasillarde, sans accélérer l'audio.</li>
      <li><strong>Voix grave :</strong> plus basse et plus pleine, comme dans une bande-annonce de film.</li>
      <li><strong>Monstre :</strong> très grave, avec un écho sombre.</li>
      <li><strong>Robot :</strong> une voix plate et métallique.</li>
      <li><strong>Extraterrestre :</strong> un peu plus aiguë, avec une vibration étrange.</li>
      <li><strong>Téléphone :</strong> fine et étroite, comme une vieille ligne ou un talkie-walkie.</li>
      <li><strong>Écho :</strong> comme si tu parlais dans une immense salle ou dans une grotte.</li>
    </ol>
    <p>Dans Effets, tu peux régler chacune : bouge la Tonalité pour une voix plus aiguë ou plus grave, ajoute de la Réverb pour plus d'espace, ou active Suppression du bruit par IA si l'enregistrement est bruyant.</p>
    <h2>Idées</h2>
    <p>Des blagues en message vocal, des sonneries drôles (ouvre le résultat dans l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a>), des voix pour TikTok ou masquer ta vraie voix dans une vidéo. Utilise uniquement des enregistrements que tu as le droit d'utiliser et ne t'en sers pas pour te faire passer pour quelqu'un d'autre.</p>`,
      faq: [
        ["Le modificateur de voix est-il gratuit ?", "Oui. Gratuit, sans inscription, sans filigrane, et ton enregistrement n'est jamais envoyé."],
        ["Puis-je changer la voix d'une vidéo ?", "Oui. Ouvre la vidéo et MeloCut utilise son son. Le résultat est un fichier audio (MP3, M4A, WAV, OGG ou FLAC)."],
        ["Puis-je m'enregistrer directement sur la page ?", "Oui. Touche Enregistrer avec le micro, parle, puis touche Arrêter. L'enregistrement s'ouvre tout de suite et reste sur ton appareil."],
        ["Comment faire une voix d'écureuil ?", "Ouvre ton enregistrement ici : Écureuil est déjà sélectionné. Appuie sur Écouter avec effets, puis sur Changer la voix et Télécharger."],
      ],
    },
    {
      key: 'a2v', path: 'fr/mp3-en-mp4', tool: 'audio-to-video', crumb: 'Tools',
      title: `Convertir MP3 en MP4 : chanson en vidéo pour TikTok | ${NAME}`,
      description: "Transforme une chanson ou un message vocal en vidéo MP4 verticale avec onde animée, titre et couverture. Depuis ton téléphone, gratuit et sans envoi de fichier.",
      h1: "<em>MP3 en MP4</em> : ta chanson en vidéo pour TikTok et Reels",
      lead: "Transforme n'importe quelle chanson ou enregistrement en vidéo verticale avec une onde sonore qui bouge, un titre et une image de couverture. Prête pour TikTok, Reels, Shorts et les statuts WhatsApp.",
      badges: ["Vertical 9:16", "Onde sonore animée", "Aucun envoi de fichier"],
      steps: [
        ["Ouvre une chanson", "Choisis un MP3, un message vocal ou n'importe quel audio. Les 30 premières secondes sont sélectionnées ; fais glisser pour choisir un autre passage, jusqu'à 60 secondes."],
        ["Ajoute un titre et un style", "Le titre reprend le nom du fichier ; change-le si tu veux. Choisis un style de fond ou ajoute une image de couverture."],
        ["Crée la vidéo", "Appuie sur Créer la vidéo, puis sur Télécharger. Publie le MP4 où tu veux."],
      ],
      content: `
    <h2>À quoi ressemble la vidéo</h2>
    <p>Un MP4 vertical de 720×1280 (9:16), avec ta couverture ou un emblème d'onde sonore, le titre, une onde blanche qui bouge avec l'audio et une barre de progression. Une petite mention melocut.com apparaît en bas.</p>
    <h2>Idées</h2>
    <ol class="guide-steps">
      <li><strong>Partager une chanson sur Instagram ou TikTok</strong> quand l'app ne te laisse pas publier seulement de l'audio.</li>
      <li><strong>Une vidéo slowed + reverb :</strong> ouvre Effets, touche Slowed + Reverb et la vidéo reprend la version ralentie. Nightcore et Audio 8D fonctionnent aussi.</li>
      <li><strong>Extraits de podcast ou messages vocaux :</strong> active Suppression du bruit par IA pour une voix nette et publie les 60 meilleures secondes.</li>
      <li><strong>Statut WhatsApp :</strong> une chanson avec ta propre photo en couverture.</li>
    </ol>
    <h2>Pourquoi jusqu'à 60 secondes ?</h2>
    <p>La vidéo est créée sur ton propre appareil, donc rien n'est envoyé. Créer une vidéo demande beaucoup plus de travail que l'audio, c'est pourquoi les extraits vont jusqu'à 60 secondes, ce que demandent les apps de vidéos courtes. Sur téléphone, c'est un peu plus long que sur ordinateur.</p>
    <p>Utilise uniquement de la musique que tu as le droit de partager. Des apps comme TikTok et Instagram peuvent couper le son des vidéos avec des chansons protégées.</p>`,
      faq: [
        ["Comment convertir un MP3 en MP4 ?", "Ouvre le MP3 ici, ajoute un titre et un style ou une image de couverture, et appuie sur Créer la vidéo. Tu obtiens un MP4 avec une onde sonore animée."],
        ["Puis-je mettre ma propre photo ?", "Oui. Choisis une image de couverture : elle apparaît au centre et, floutée, en arrière-plan."],
        ["Y a-t-il un filigrane ?", "Il y a une petite mention melocut.com en bas de la vidéo. C'est ce qui permet à l'outil de rester gratuit."],
        ["Ça fonctionne sur iPhone ?", "Oui, dans Safari. Créer la vidéo prend un moment car tout se fait sur ton appareil : sur ordinateur, à peu près la durée de l'extrait, et plus sur téléphone. Laisse la page ouverte jusqu'à la fin."],
      ],
    },
  ],
});
// The rest of the tools, conversions and guides live in fr-more.mjs.
export default (NAME) => {
  const d = base(NAME);
  for (const [slug, path] of Object.entries(toolPaths)) d.tools[slug] = { ...d.tools[slug], path };
  d.pages.push(...more(NAME));
  return d;
};
