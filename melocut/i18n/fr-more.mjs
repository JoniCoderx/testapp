// More French pages: tools, conversions and guides. Each `key` matches the English page.
// French ("tu"). Button names in steps and FAQs match the French interface strings in i18n/ui_fr.py.
// Phone menu names follow the French iOS and Samsung (One UI) interfaces.
export const toolPaths = {
  'slowed-reverb': 'fr/slowed-reverb',
  'vocal-remover': 'fr/supprimer-la-voix',
  '8d-audio': 'fr/audio-8d',
  'bass-booster': 'fr/booster-les-basses',
  'nightcore-maker': 'fr/nightcore',
  'noise-remover': 'fr/supprimer-le-bruit',
  'audio-joiner': 'fr/fusionner-audio',
  'volume-booster': 'fr/augmenter-le-volume',
  'reverse-audio': 'fr/audio-a-l-envers',
  'speed-up-audio': 'fr/accelerer-audio',
  'slow-down-audio': 'fr/ralentir-audio',
  'pitch-changer': 'fr/changer-la-tonalite',
  'remove-silence': 'fr/supprimer-les-silences',
  'fade-in-fade-out': 'fr/fondu-entree-sortie',
};

export default (NAME) => [
  // ---------- Tool pages ----------
  {
    key: 'slowed', path: 'fr/slowed-reverb', tool: 'slowed-reverb', crumb: 'Tools',
    title: `Slowed + Reverb en ligne : ralentir une chanson | ${NAME}`,
    description: "Crée la version slowed + reverb de n'importe quelle chanson. Règle la vitesse, la tonalité et la réverb, écoute d'abord et télécharge un MP3. Gratuit.",
    h1: "Créer des chansons <em>slowed + reverb</em>",
    lead: "Crée la version ralentie et avec réverb de n'importe quelle chanson. Les réglages sont déjà prêts et tu peux changer la vitesse, la tonalité et la réverb.",
    badges: ["Vitesse et tonalité", "Réverb", "Nightcore aussi"],
    steps: [
      ["Ouvre une chanson", "Choisis n'importe quelle chanson de ton appareil."],
      ["Ajuste-la", "La vitesse 0,85× et la réverb sont déjà réglées. Change-les et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir et enregistre-la en MP3."],
    ],
    content: `
    <h2>De bons réglages pour commencer</h2>
    <p>La plupart des versions slowed + reverb utilisent une vitesse de <strong>0,80 à 0,90×</strong>, une tonalité <strong>1 à 3 demi-tons plus basse</strong> et une réverb d'environ <strong>35 à 55 %</strong>. Pour une version accélérée, touche le préréglage <em>Nightcore</em> ou utilise le <a href="/fr/nightcore/">créateur de nightcore</a>.</p>
    <h3>Pour un meilleur son</h3>
    <ul>
      <li>Si la voix est trop grave, monte la Tonalité d'un demi-ton.</li>
      <li>Active <strong>Volume automatique</strong> pour que le résultat ne soit pas plus faible que l'original.</li>
      <li>Tu la veux pour TikTok ou Reels ? Transforme-la en vidéo avec <a href="/fr/mp3-en-mp4/">MP3 en MP4</a> : ouvre Effets et touche Slowed + Reverb.</li>
    </ul>`,
    faq: [
      ["Comment faire une chanson slowed + reverb ?", "Ouvre la chanson ici. L'effet est déjà réglé : appuie sur Lire avec effets, change ce que tu veux, puis Convertir et Télécharger."],
      ["Puis-je faire une version accélérée ?", "Oui. Touche le préréglage Nightcore ou augmente la vitesse et la tonalité."],
      ["C'est gratuit ?", "Oui. Sans inscription, sans filigrane, et la chanson n'est envoyée sur aucun serveur."],
    ],
  },
  {
    key: 'karaoke', path: 'fr/supprimer-la-voix', tool: 'karaoke', crumb: 'Tools',
    title: `Supprimer la voix d'une chanson : karaoké gratuit | ${NAME}`,
    description: "Supprime la voix des chansons pour créer des pistes karaoké et des instrumentales. Gratuit, privé et rapide. Rien n'est envoyé sur un serveur.",
    h1: "<em>Supprimer la voix</em> d'une chanson pour le karaoké",
    lead: "Retire le chanteur d'une chanson stéréo pour obtenir une version karaoké. L'outil supprime ce qui est au centre du mixage, ce n'est donc pas une séparation par IA : la basse et la batterie baissent aussi un peu.",
    badges: ["Karaoké", "Chansons stéréo", "Écoute avant d'enregistrer"],
    steps: [
      ["Ouvre une chanson", "Choisis une chanson stéréo de ton appareil."],
      ["Écoute d'abord", "Supprimer la voix est déjà activé. Appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir et enregistre ta piste karaoké."],
    ],
    content: `
    <h2>Comment ça marche</h2>
    <p>Dans la plupart des chansons studio, la voix principale est au centre du mixage stéréo, alors que les instruments sont répartis à gauche et à droite. L'outil annule ce qui est au centre et garde le reste.</p>
    <h3>Ce qu'il ne peut pas faire</h3>
    <p>La basse et la batterie sont souvent aussi au centre, donc leur volume baisse. La réverb de la voix peut rester en fond. Les enregistrements live et les fichiers mono ne fonctionnent pas, et ${NAME} te prévient si un fichier est en mono. Monter les <strong>Graves</strong> dans Effets rend une partie de la basse.</p>`,
    faq: [
      ["Ça fonctionne avec toutes les chansons ?", "Ça fonctionne mieux avec les chansons studio où la voix est au centre. Les enregistrements mono ne peuvent pas être séparés de cette façon."],
      ["Pourquoi la basse est-elle plus faible ?", "La basse est souvent aussi au centre du mixage. Monte les Graves pour la récupérer."],
    ],
  },
  {
    key: '8d', path: 'fr/audio-8d', tool: '8d', crumb: 'Tools',
    title: `Convertisseur audio 8D en ligne : musique 8D gratuite | ${NAME}`,
    description: "Transforme n'importe quelle chanson en audio 8D qui tourne autour de ta tête. Écoute avec un casque et télécharge un MP3. Gratuit et sans envoi de fichier.",
    h1: "Convertisseur <em>audio 8D</em>",
    lead: "Fais tourner la musique autour de ta tête. Mets un casque, écoute et télécharge.",
    badges: ["Mets un casque", "Réverb réglable", "MP3 ou WAV"],
    steps: [
      ["Ouvre une chanson", "Choisis n'importe quelle chanson de ton appareil."],
      ["Mets un casque", "Appuie sur Lire avec effets pour entendre le son bouger."],
      ["Télécharge", "Appuie sur Convertir et enregistre ta version 8D."],
    ],
    content: `
    <h2>C'est quoi, l'audio 8D ?</h2>
    <p>L'audio 8D déplace lentement le son d'une oreille à l'autre et ajoute un peu de réverb, si bien que la musique semble tourner autour de toi. Il te faut un casque ou des écouteurs pour le remarquer.</p>
    <h3>Idées</h3>
    <p>Combine-le avec une version ralentie (Slowed + Reverb) pour un effet encore plus enveloppant, ou transforme-le en vidéo avec <a href="/fr/mp3-en-mp4/">MP3 en MP4</a> pour le partager sur TikTok.</p>`,
    faq: [
      ["Pourquoi je n'entends pas l'effet 8D ?", "Il te faut un casque ou des écouteurs. Sur une seule enceinte, l'effet disparaît."],
      ["C'est gratuit ?", "Oui, entièrement gratuit, sans inscription et sans filigrane."],
    ],
  },
  {
    key: 'bass', path: 'fr/booster-les-basses', tool: 'bass', crumb: 'Tools',
    title: `Bass booster : booster les basses d'un MP3 gratuit | ${NAME}`,
    description: "Booste les basses de n'importe quelle chanson en ligne. Choisis l'intensité, écoute d'abord et télécharge. Un limiteur évite la distorsion. Gratuit, sans envoi.",
    h1: "<em>Booster les basses</em>",
    lead: "Donne à n'importe quelle chanson des basses plus profondes et plus percutantes. Choisis l'intensité, écoute et télécharge.",
    badges: ["Jusqu'à +15 dB", "Sans distorsion", "Écoute avant d'enregistrer"],
    steps: [
      ["Ouvre une chanson", "Choisis n'importe quelle chanson ou vidéo."],
      ["Choisis l'intensité", "Le curseur Graves commence à +10 dB. Change-le et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir et enregistre."],
    ],
    content: `
    <h2>Plus de basses sans que ça grésille</h2>
    <p>${NAME} renforce les basses fréquences, autour de 110 Hz, puis égalise le volume avec un limiteur : la basse frappe plus fort sans distorsion. Sur les haut-parleurs d'un téléphone, entre +6 et +10 dB sonne généralement le mieux.</p>`,
    faq: [["De combien dois-je booster les basses ?", "Commence entre +8 et +10 dB. Au-delà de +12 dB, c'est très fort et ça passe mieux au casque ou sur l'autoradio."]],
  },
  {
    key: 'nightcore', path: 'fr/nightcore', tool: 'converter', crumb: 'Tools', fx: { speed: 1.2, pitch: 3 }, suffix: ' (nightcore)',
    note: "Le nightcore est déjà prêt : vitesse 1,20× et 3 demi-tons plus aigu. Appuie sur Lire avec effets pour l'écouter.",
    title: `Nightcore en ligne : accélérer une chanson gratuit | ${NAME}`,
    description: "Transforme n'importe quelle chanson en nightcore ou en version sped up : plus rapide et plus aiguë. Règle vitesse et tonalité, écoute et télécharge un MP3.",
    h1: "Créateur de <em>nightcore</em> et de chansons accélérées",
    lead: "Crée la version rapide, aiguë et pleine d'énergie de n'importe quelle chanson. Les réglages sont déjà prêts et tu peux les affiner.",
    badges: ["Vitesse et tonalité", "Écoute avant d'enregistrer", "MP3 ou WAV"],
    steps: [
      ["Ouvre une chanson", "Choisis n'importe quelle chanson de ton appareil."],
      ["Ajuste-la", "1,20× et +3 demi-tons sont déjà réglés. Appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir et enregistre-la en MP3."],
    ],
    content: `
    <h2>Le son nightcore</h2>
    <p>Les versions nightcore lisent la chanson <strong>15 à 30 % plus vite</strong> et montent la tonalité <strong>de 2 à 4 demi-tons</strong>, ce qui donne ce son brillant et plein d'énergie. Les versions accélérées (sped up) de TikTok et Instagram reposent sur la même idée, en général un peu plus douce.</p>
    <h3>De bons réglages pour commencer</h3>
    <ul>
      <li><strong>Nightcore classique :</strong> vitesse 1,25× et +4 demi-tons.</li>
      <li><strong>Sped up (style TikTok) :</strong> 1,15× et +2 demi-tons.</li>
      <li><strong>Doux :</strong> 1,10× et +1 demi-ton, pour les ballades lentes.</li>
    </ul>
    <p>Ajoute un peu de <strong>Graves</strong> pour que le son ne soit pas trop fin, ou fais l'inverse avec <a href="/fr/slowed-reverb/">Slowed + Reverb</a>.</p>`,
    faq: [
      ["Quelle différence entre nightcore et sped up ?", "Les deux sont plus rapides et plus aigus. Le nightcore est souvent plus extrême. Baisse la vitesse à environ 1,1× pour une version accélérée plus douce."],
      ["Puis-je garder la tonalité d'origine ?", "Oui. Mets la Tonalité à 0 et seule la vitesse changera."],
    ],
  },
  {
    key: 'denoise', path: 'fr/supprimer-le-bruit', tool: 'denoise', crumb: 'Tools',
    title: `Supprimer le bruit de fond d'un audio avec l'IA | ${NAME}`,
    description: "Supprime le bruit de fond des enregistrements de voix, messages vocaux et vidéos grâce à l'IA. Ça fonctionne sur ton appareil, rien n'est envoyé. Gratuit.",
    h1: "Supprimer le bruit de fond <em>avec l'IA</em>",
    lead: "Retire le vent, la circulation, les ventilateurs et les bourdonnements des enregistrements de voix. Un petit réseau de neurones fait le travail sur ton propre appareil.",
    badges: ["Réseau de neurones (RNNoise)", "Messages vocaux et podcasts", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre ton enregistrement", "Un message vocal, une interview, un cours ou une vidéo."],
      ["Écoute la version nettoyée", "Suppression du bruit par IA est déjà activée. Appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Comment fonctionne la partie IA</h2>
    <p>${NAME} utilise <strong>RNNoise</strong>, un réseau de neurones entraîné à distinguer la voix du bruit de fond. Le modèle pèse environ 300 Ko et fonctionne dans ton navigateur, donc tes enregistrements privés ne quittent jamais ton téléphone ou ton ordinateur.</p>
    <p>Dans notre propre test, avec une voix enregistrée à côté d'un ventilateur allumé, le bruit dans les pauses entre les mots a baissé d'environ 18 dB, ce qui sonne à peu près trois fois moins fort, tandis que la voix a gardé son volume. Le résultat dépend de l'enregistrement : appuie sur Lire avec effets et vérifie par toi-même.</p>
    <h3>Pour un meilleur résultat</h3>
    <p>C'est fait pour la voix : podcasts, interviews, messages vocaux et appels. Sur la musique, l'outil peut aussi supprimer des instruments, donc pour les chansons utilise plutôt <strong>Réduire le souffle</strong>. <strong>Volume automatique</strong> et <strong>Supprimer les silences</strong> sont aussi activés ici, pour un résultat plus propre.</p>`,
    faq: [
      ["C'est vraiment de l'IA ?", "Oui. L'outil utilise RNNoise, un réseau de neurones qui nettoie la voix. Le modèle se télécharge la première fois, puis fonctionne sur ton appareil."],
      ["Ça fonctionne avec la musique ?", "C'est pensé pour les voix. Sur les chansons, l'outil peut supprimer des instruments, donc pour la musique utilise Réduire le souffle."],
      ["Mon enregistrement est-il envoyé ?", "Non. Tout se passe dans ton navigateur."],
    ],
  },
  {
    key: 'joiner', path: 'fr/fusionner-audio', tool: 'joiner', crumb: 'Tools',
    title: `Fusionner des fichiers audio et MP3 en ligne gratuit | ${NAME}`,
    description: "Fusionne des MP3, M4A, WAV et autres audios en un seul fichier. Change l'ordre, écoute-les, ajoute un fondu enchaîné et égalise le volume. Gratuit et privé.",
    h1: "<em>Fusionner des audios</em> : assemble des chansons en un fichier",
    lead: "Assemble plusieurs chansons, messages vocaux ou extraits en un seul fichier. Écoute chacun d'eux, change l'ordre et ajoute un fondu enchaîné.",
    badges: ["2 fichiers ou plus", "Fondu enchaîné", "Volume égalisé"],
    steps: [
      ["Ajoute tes fichiers", "Choisis deux fichiers audio ou vidéo ou plus. Tu pourras en ajouter d'autres ensuite."],
      ["Mets-les dans l'ordre", "Touche ▶ pour écouter, utilise les flèches pour changer l'ordre et règle le fondu enchaîné ou désactive-le."],
      ["Fusionne, écoute et télécharge", "Appuie sur Fusionner les fichiers, écoute le résultat, puis Télécharger."],
    ],
    content: `
    <h2>Mixes, medleys et longs enregistrements</h2>
    <p>Crée un mix pour une soirée, regroupe plusieurs messages vocaux en un seul message ou recolle les parties d'un enregistrement. Le <strong>Fondu enchaîné</strong> fait se fondre chaque piste dans la suivante, et <strong>Égaliser le volume</strong> évite que les fichiers faibles sonnent beaucoup plus bas que les fichiers forts.</p>
    <h3>Des formats différents, aucun problème</h3>
    <p>Tu peux mélanger MP3, M4A, WAV, OGG, OPUS et vidéos en une seule fois. ${NAME} les convertit d'abord tous au même format.</p>`,
    faq: [
      ["Combien de fichiers puis-je fusionner ?", "Deux ou plus. Il n'y a pas de nombre fixe : ce que tu peux fusionner dépend de ton appareil et de ton navigateur."],
      ["Puis-je les fusionner sans pause entre eux ?", "Oui. Désactive le fondu enchaîné et ils s'enchaînent directement l'un après l'autre."],
      ["Puis-je fusionner des vidéos ?", "Oui. MeloCut prend le son de chaque vidéo et fusionne l'audio."],
    ],
  },
  {
    key: 'volume', path: 'fr/augmenter-le-volume', tool: 'volume', crumb: 'Tools',
    title: `Augmenter le volume d'un audio ou MP3 en ligne | ${NAME}`,
    description: "Rends plus forts les MP3, messages vocaux et vidéos trop faibles. Le volume automatique l'égalise sans distorsion. Gratuit et sans envoi de fichier.",
    h1: "<em>Augmenter le volume</em> d'un audio",
    lead: "Rends les enregistrements faibles plus forts et réguliers, sans distorsion.",
    badges: ["Jusqu'à 300 %", "Volume automatique", "Sans distorsion"],
    steps: [
      ["Ouvre ton fichier", "Une chanson trop faible, un message vocal, un cours ou une vidéo."],
      ["Choisis de combien augmenter", "Volume automatique est déjà activé. Change le curseur Volume et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir et enregistre."],
    ],
    content: `
    <h2>Plus fort, mais propre</h2>
    <p><strong>Volume automatique</strong> mesure tout le fichier et l'amène à un volume proche de celui de Spotify et YouTube, pour que les enregistrements faibles s'entendent clairement. Un limiteur empêche les passages les plus forts de grésiller.</p>
    <h3>À quoi ça sert ?</h3>
    <p>Des messages vocaux qu'on entend à peine, des cours enregistrés de loin, des vidéos au son très faible ou de vieilles chansons qui sonnent faiblardes à côté des nouvelles.</p>`,
    faq: [["Augmenter le volume provoque-t-il de la distorsion ?", "Non. Un limiteur contrôle les pics, donc le résultat est plus fort sans saturer."]],
  },
  {
    key: 'reverse', path: 'fr/audio-a-l-envers', tool: 'reverse', crumb: 'Tools',
    title: `Mettre un audio à l'envers en ligne gratuitement | ${NAME}`,
    description: "Mets n'importe quelle chanson, message vocal ou son à l'envers et écoute-le en sens inverse. Écoute d'abord et télécharge un MP3. Gratuit, rapide et sans envoi.",
    h1: "Mettre un <em>audio à l'envers</em>",
    lead: "Lis n'importe quel son, voix ou chanson à l'envers. Idéal pour les défis, les effets sonores et la chasse aux « messages cachés ».",
    badges: ["Rapide", "Tous les formats", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre un fichier", "N'importe quelle chanson, message vocal ou vidéo."],
      ["Écoute-le", "À l'envers est déjà activé. Appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir et enregistre."],
    ],
    content: `
    <h2>Idées</h2>
    <p>Enregistre-toi en train de dire quelque chose et mets-le à l'envers pour le défi de parler à l'envers, cherche des « messages cachés » dans des chansons ou crée des effets de cymbale inversée pour ta musique. Ajoute un peu de réverb pour le son classique de réverb inversée.</p>
    <h3>Enregistre-toi directement ici</h3>
    <p>Appuie sur <strong>Enregistrer avec le micro</strong>, dis ta phrase et arrête l'enregistrement : il s'ouvre, prêt à être mis à l'envers.</p>`,
    faq: [
      ["Puis-je mettre à l'envers seulement une partie de la chanson ?", "Oui. Fais glisser sur la forme d'onde pour choisir le passage, puis convertis."],
      ["C'est gratuit ?", "Oui. Sans inscription, sans filigrane, et l'audio n'est envoyé sur aucun serveur."],
    ],
  },
  {
    key: 'speedup', path: 'fr/accelerer-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 1.25 }, suffix: ' (plus rapide)',
    note: "La vitesse est à 1,25×. Bouge le curseur Vitesse, appuie sur Lire avec effets, puis sur Convertir.",
    title: `Accélérer un audio en ligne sans changer la tonalité | ${NAME}`,
    description: "Accélère une chanson, un podcast ou un message vocal sans voix d'écureuil. Choisis de 1,1× à 2×, écoute d'abord et télécharge un MP3. Gratuit et sans envoi.",
    h1: "<em>Accélérer</em> un audio",
    lead: "Rends plus rapide une chanson, un podcast, un cours ou un message vocal, tout en gardant la tonalité normale de la voix.",
    badges: ["Jusqu'à 2×", "Même tonalité", "Écoute avant d'enregistrer"],
    steps: [
      ["Ouvre ton fichier", "N'importe quelle chanson, message vocal, podcast ou vidéo."],
      ["Choisis la vitesse", "Elle est déjà réglée sur 1,25×. Bouge le curseur Vitesse et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Plus rapide, sans voix d'écureuil</h2>
    <p>Si tu lis simplement un audio plus vite, la tonalité monte aussi et les voix sonnent comme des dessins animés. ${NAME} étire le temps : il raccourcit l'audio et garde chaque voix et chaque note à sa tonalité normale.</p>
    <h3>Quelle vitesse choisir</h3>
    <p><strong>1,25×</strong> fait gagner un quart du temps et sonne naturel pour la voix. <strong>1,5×</strong> est populaire pour les cours et les longs messages vocaux. Au-delà de <strong>1,75×</strong>, la voix devient difficile à suivre. Pour la tendance des chansons accélérées avec une voix plus aiguë, utilise le <a href="/fr/nightcore/">créateur de nightcore</a>.</p>
    <h3>Encore plus court</h3>
    <p>Active aussi <strong>Supprimer les silences</strong> pour retirer les pauses, ou utilise l'outil <a href="/fr/supprimer-les-silences/">supprimer les silences</a> séparément.</p>`,
    faq: [
      ["La voix devient-elle plus aiguë ?", "Non. La tonalité reste la même. Seul le rythme change."],
      ["Comment accélérer un message vocal ?", "Ouvre-le ici, choisis la vitesse, appuie sur Convertir puis sur Télécharger. Le nouveau fichier est plus court et se lit partout."],
    ],
  },
  {
    key: 'slowdown', path: 'fr/ralentir-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 0.8 }, suffix: ' (plus lent)',
    note: "La vitesse est à 0,80×. Bouge le curseur Vitesse, appuie sur Lire avec effets, puis sur Convertir.",
    title: `Ralentir un audio en ligne sans changer la tonalité | ${NAME}`,
    description: "Ralentis des chansons, des voix ou des messages vocaux pour apprendre des paroles, travailler un instrument ou transcrire. Même tonalité, gratuit et privé.",
    h1: "<em>Ralentir</em> un audio",
    lead: "Lis une chanson ou un enregistrement plus lentement, sans voix grave et traînante. Idéal pour apprendre des chansons, danser et transcrire.",
    badges: ["Jusqu'à 0,5×", "Même tonalité", "Écoute avant d'enregistrer"],
    steps: [
      ["Ouvre ton fichier", "Une chanson, un cours, une interview ou un message vocal."],
      ["Choisis la vitesse", "Elle est déjà réglée sur 0,80×. Bouge le curseur Vitesse et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Plus lent, mais juste</h2>
    <p>${NAME} étire l'audio dans le temps et garde la tonalité : un solo de guitare ou un rap rapide devient facile à suivre et sonne toujours comme l'original.</p>
    <h3>Pour travailler un instrument</h3>
    <p>Commence à <strong>0,70×</strong>, apprends le passage, passe à 0,85× et enfin à la vitesse normale. Pour répéter un court extrait, sélectionne-le d'abord sur la forme d'onde et seul ce passage sera enregistré.</p>
    <h3>Tu veux le son slowed + reverb ?</h3>
    <p>Cette tendance baisse aussi la tonalité et ajoute de la réverb. <a href="/fr/slowed-reverb/">Slowed + Reverb</a> est déjà réglé pour ça.</p>`,
    faq: [
      ["Ralentir change-t-il la tonalité ?", "Non. Les notes restent dans la même tonalité. Seul le rythme change."],
      ["Jusqu'à quel point puis-je ralentir ?", "Jusqu'à la moitié de la vitesse (0,5×). En dessous de 0,6×, certaines chansons commencent à sonner un peu floues."],
    ],
  },
  {
    key: 'pitch', path: 'fr/changer-la-tonalite', tool: 'converter', crumb: 'Tools', fx: { pitch: -2 }, suffix: ' (nouvelle tonalité)',
    note: "La tonalité est 2 demi-tons plus basse. Bouge le curseur Tonalité, appuie sur Lire avec effets, puis sur Convertir.",
    title: `Changer la tonalité d'une chanson en ligne gratuit | ${NAME}`,
    description: "Change la tonalité de n'importe quelle chanson jusqu'à 12 demi-tons plus haut ou plus bas sans changer la vitesse. Idéal pour chanter et jouer. Gratuit.",
    h1: "<em>Changer la tonalité</em> d'une chanson",
    lead: "Monte ou baisse une chanson dans la tonalité qui convient à ta voix ou à ton instrument. Le tempo ne change pas.",
    badges: ["±12 demi-tons", "Même vitesse", "Écoute avant d'enregistrer"],
    steps: [
      ["Ouvre une chanson", "N'importe quelle chanson ou vidéo de ton appareil."],
      ["Change la tonalité", "Elle commence 2 demi-tons plus bas. Bouge le curseur Tonalité et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Chante dans la tonalité qui te va</h2>
    <p>Si une chanson est trop aiguë pour la chanter, baisse-la de <strong>2 ou 3 demi-tons</strong>. Si elle est trop grave, monte-la. Un demi-ton correspond à une touche de piano, et 12 demi-tons font une octave.</p>
    <h3>Pour jouer à la guitare ou au piano</h3>
    <p>Certaines chansons sont enregistrées un peu faux ou dans une tonalité peu pratique. Passe-la dans une tonalité que tu connais, ou utilise un capodastre et décale la chanson pour qu'elle corresponde.</p>
    <h3>Pour le karaoké</h3>
    <p>Combine-le avec <strong>Supprimer la voix</strong> dans Effets, ou commence avec l'outil pour <a href="/fr/supprimer-la-voix/">supprimer la voix</a>, pour avoir ta piste karaoké dans ta propre tonalité.</p>`,
    faq: [
      ["Changer la tonalité change-t-il la vitesse ?", "Non. La chanson garde son tempo et sa durée. Seule la tonalité change."],
      ["Combien de demi-tons pour changer de ton ?", "Chaque demi-ton est un pas. De do à ré, il y a 2 demi-tons, et 12 demi-tons font une octave."],
    ],
  },
  {
    key: 'silence', path: 'fr/supprimer-les-silences', tool: 'converter', crumb: 'Tools', fx: { silence: true }, suffix: ' (sans silences)',
    note: "Supprimer les silences est activé. Chaque pause de plus de 0,8 seconde est coupée. Appuie sur Lire avec effets pour vérifier.",
    title: `Supprimer les silences d'un audio automatiquement | ${NAME}`,
    description: "Coupe automatiquement les longues pauses des enregistrements de voix, podcasts, cours et messages vocaux. Gratuit, privé et sans envoi de fichier.",
    h1: "<em>Supprimer les silences</em> d'un audio",
    lead: "Coupe automatiquement les longues pauses et les silences de tes enregistrements, pour qu'ils soient plus courts et plus agréables à écouter.",
    badges: ["Automatique", "Voix et podcasts", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre ton enregistrement", "Un message vocal, un podcast, un cours ou une vidéo."],
      ["Vérifie le résultat", "Supprimer les silences est déjà activé. Appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Comment ça marche</h2>
    <p>${NAME} cherche les passages où le son reste très faible pendant plus d'environ <strong>0,8 seconde</strong> et les coupe. Les pauses normales entre les mots restent, donc la voix sonne toujours naturelle.</p>
    <h3>Fonctionne le mieux avec</h3>
    <p>Les enregistrements de voix, les cours, les interviews et les longs messages vocaux. Sur la musique, l'outil couperait aussi les intros et les fins douces, donc ce n'est généralement pas adapté aux chansons.</p>
    <h3>Il y a du bruit dans la pièce ?</h3>
    <p>S'il y a un ventilateur ou de la circulation en fond, les pauses ne sont pas vraiment silencieuses. Active aussi <strong>Suppression du bruit par IA</strong>, ou utilise l'outil pour <a href="/fr/supprimer-le-bruit/">supprimer le bruit avec l'IA</a>, où c'est déjà activé.</p>`,
    faq: [
      ["Ça coupe les pauses entre les mots ?", "Non. Seuls les silences de plus d'environ 0,8 seconde sont supprimés."],
      ["Pourquoi rien n'a été supprimé ?", "Les pauses contiennent sûrement du bruit de fond. Active Suppression du bruit par IA ou Réduire le souffle et réessaie."],
    ],
  },
  {
    key: 'fade', path: 'fr/fondu-entree-sortie', tool: 'cutter', crumb: 'Tools', fx: { fadeIn: 3, fadeOut: 3 }, suffix: ' (avec fondu)',
    note: "Un fondu d'entrée et de sortie de 3 secondes est appliqué. Choisis un passage si tu veux et appuie sur Lire avec effets.",
    title: `Ajouter un fondu d'entrée et de sortie à un MP3 | ${NAME}`,
    description: "Ajoute un fondu d'entrée et de sortie en douceur à n'importe quelle chanson ou enregistrement. Choisis la durée, coupe si besoin, écoute et télécharge.",
    h1: "Ajouter un <em>fondu</em> d'entrée et de sortie",
    lead: "Donne à une chanson ou à un extrait un début et une fin en douceur au lieu d'une coupure brutale. Choisis la durée du fondu et écoute avant d'enregistrer.",
    badges: ["De 0 à 10 secondes", "Coupe aussi", "MP3, WAV, FLAC"],
    steps: [
      ["Ouvre ton fichier", "N'importe quelle chanson, enregistrement ou vidéo."],
      ["Règle les fondus", "Chacun dure 3 secondes. Change-les dans Effets et appuie sur Lire avec effets."],
      ["Télécharge", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Quand un fondu est utile</h2>
    <p>Un fondu fait commencer et finir la musique en douceur. C'est utile pour les sonneries, la musique de fond des vidéos, un passage coupé d'une chanson plus longue ou une présentation qui se termine avant la musique.</p>
    <h3>Quelle durée choisir ?</h3>
    <p>Pour une sonnerie ou un court extrait, <strong>1 à 2 secondes</strong>. Pour une musique de fond ou la fin d'une chanson, <strong>3 à 6 secondes</strong>. ${NAME} ne laisse jamais un fondu occuper plus d'un quart de l'extrait, pour que les extraits courts restent audibles.</p>
    <h3>Un fondu à une seule extrémité</h3>
    <p>Mets l'autre curseur sur <em>désactivé</em>. Pour une sonnerie avec fondus, l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a> les applique déjà.</p>`,
    faq: [
      ["Puis-je mettre un fondu sur une partie de la chanson seulement ?", "Oui. Fais glisser sur la forme d'onde pour choisir le passage. Les fondus sont ajoutés au début et à la fin de ta sélection."],
      ["La qualité baisse-t-elle ?", "Choisis WAV ou FLAC pour ne rien perdre, ou MP3 à 320 kbps pour un résultat très proche de l'original."],
    ],
  },

  // ---------- Conversion pages ----------
  {
    key: 'c-mp4', convLabel: 'MP4 en MP3', path: 'fr/mp4-en-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir MP4 en MP3 gratuit, en ligne et sans envoi | ${NAME}`,
    description: "Convertis un MP4 en MP3 en ligne en quelques secondes. Jusqu'à 320 kbps, sans envoi de fichier, sans inscription ni filigrane. Marche sur iPhone, Android et PC.",
    h1: "Convertir <em>MP4 en MP3</em>",
    lead: "Ouvre un MP4 et enregistre son son en MP3. Tout se passe dans ton navigateur, donc la vidéo ne quitte jamais ton appareil.",
    badges: ["Jusqu'à 320 kbps", "Aucun envoi de fichier", "Gratuit"],
    steps: [
      ["Ouvre le MP4", "Touche le cadre ci-dessus et choisis ta vidéo."],
      ["Choisis la qualité", "320 kbps pour la musique, 128 kbps pour la voix."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Pourquoi convertir un MP4 en MP3 ?</h2>
    <p>Un MP4 contient l'image et le son. Si tu veux seulement écouter, un MP3 prend beaucoup moins de place et se lit sur n'importe quel téléphone, en voiture et dans toutes les apps de musique.</p>
    <h3>Quelle taille fait le MP3 ?</h3>
    <ul>
      <li><strong>320 kbps :</strong> environ 2,4 Mo par minute. Le mieux pour la musique.</li>
      <li><strong>192 kbps :</strong> environ 1,4 Mo par minute. Un bon compromis.</li>
      <li><strong>128 kbps :</strong> environ 1 Mo par minute. Suffisant pour la voix, les cours et les podcasts.</li>
    </ul>
    <h3>Tu n'as besoin que d'un passage ?</h3>
    <p>Fais glisser sur la forme d'onde pour ne garder que le passage voulu, par exemple une chanson d'une vidéo de concert. Tu le veux en sonnerie ? Utilise l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a>.</p>
    <h3>Autres vidéos</h3>
    <p>Ça fonctionne aussi avec les MOV de l'iPhone, les WebM, MKV et AVI. Va voir <a href="/fr/video-en-mp3/">vidéo en MP3</a>.</p>`,
    faq: [
      ["Le MP3 sonne-t-il comme la vidéo ?", "À 320 kbps, la différence est très difficile à remarquer."],
      ["Puis-je convertir un MP4 en MP3 sur mon téléphone ?", "Oui. Ça fonctionne dans le navigateur de l'iPhone et d'Android, sans installer d'app."],
      ["Ma vidéo est-elle envoyée sur un serveur ?", "Non. La conversion se fait sur ton appareil, donc la vidéo ne le quitte jamais."],
      ["Puis-je convertir des vidéos YouTube ?", "MeloCut travaille avec les fichiers de ton appareil. Il ne télécharge pas de vidéos depuis YouTube ni depuis d'autres sites."],
    ],
  },
  {
    key: 'c-wav', convLabel: 'WAV en MP3', path: 'fr/wav-en-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir WAV en MP3 en ligne gratuit, sans envoi | ${NAME}`,
    description: "Convertis un WAV en MP3 en ligne et rends tes fichiers jusqu'à 10 fois plus légers. Choisis de 128 à 320 kbps. Gratuit, privé et sans envoi de fichier.",
    h1: "Convertir <em>WAV en MP3</em>",
    lead: "Transforme de gros fichiers WAV en MP3 faciles à partager et à écouter partout.",
    badges: ["Jusqu'à 10× plus léger", "De 128 à 320 kbps", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre le WAV", "Choisis un fichier WAV sur ton appareil."],
      ["Choisis la qualité", "320 kbps est ce qui se rapproche le plus de l'original."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>WAV ou MP3 ?</h2>
    <p>Les WAV ne sont pas compressés, donc une chanson de trois minutes pèse environ 30 Mo. En MP3 à 320 kbps, c'est environ 7 Mo et le son est presque identique. C'est bien plus facile à envoyer, à mettre en ligne ou à garder sur ton téléphone.</p>
    <p>Garde aussi le WAV si tu comptes retoucher l'enregistrement plus tard.</p>
    <h3>Quelle taille fera le MP3 ?</h3>
    <p>Un WAV en qualité CD pèse environ 10 Mo par minute. Le MP3 dépend de la qualité choisie :</p>
    <ul>
      <li><strong>320 kbps :</strong> environ 2,4 Mo par minute. Le mieux pour la musique.</li>
      <li><strong>192 kbps :</strong> environ 1,4 Mo par minute.</li>
      <li><strong>128 kbps :</strong> environ 1 Mo par minute. Suffisant pour la voix.</li>
    </ul>
    <h3>Coupe pendant la conversion</h3>
    <p>Tu n'as besoin que d'un passage ? Fais glisser les poignées sur la forme d'onde et ajoute un fondu au début ou à la fin. Pour un enregistrement trop faible, active <strong>Volume automatique</strong> dans Effets.</p>`,
    faq: [
      ["Perd-on en qualité en passant de WAV à MP3 ?", "Un peu, car le MP3 est compressé. À 320 kbps, presque personne ne le remarque."],
      ["C'est gratuit ?", "Oui. Sans inscription et sans filigrane, et le fichier est converti dans ton navigateur, donc il n'est jamais envoyé."],
      ["Quelle qualité choisir ?", "320 kbps pour la musique, 192 kbps pour l'écoute au quotidien et 128 kbps pour les enregistrements de voix."],
    ],
  },
  {
    key: 'c-m4a', convLabel: 'M4A en MP3', path: 'fr/m4a-en-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir M4A en MP3 gratuit : mémos vocaux iPhone | ${NAME}`,
    description: "Convertis un M4A en MP3 en ligne : mémos vocaux de l'iPhone, audio iTunes et plus. Gratuit, privé et rapide. Sans envoi de fichier et sans inscription.",
    h1: "Convertir <em>M4A en MP3</em>",
    lead: "Convertis les mémos vocaux de l'iPhone et les autres fichiers M4A en MP3 pour les écouter sur n'importe quel appareil.",
    badges: ["Mémos vocaux", "Audio iTunes", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre le M4A", "Choisis le fichier. Sur iPhone, enregistre d'abord le mémo vocal dans Fichiers."],
      ["Choisis la qualité", "128 kbps suffit pour la voix, 320 kbps pour la musique."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>À propos des fichiers M4A</h2>
    <p>Le M4A est le format audio qu'Apple utilise pour les mémos vocaux et les achats iTunes. Il sonne bien, mais certains vieux lecteurs, autoradios et logiciels Windows ne l'ouvrent pas. Le MP3 fonctionne partout.</p>
    <h3>Sortir un mémo vocal de l'iPhone</h3>
    <p>Dans l'app Dictaphone, touche l'enregistrement, puis <strong>Partager → Enregistrer dans Fichiers</strong>, et ouvre-le ici.</p>
    <h3>Le mémo vocal a du bruit de fond ?</h3>
    <p>Active <strong>Suppression du bruit par IA</strong> dans Effets avant de convertir, ou utilise l'outil pour <a href="/fr/supprimer-le-bruit/">supprimer le bruit avec l'IA</a>.</p>`,
    faq: [
      ["Comment sortir un mémo vocal de mon iPhone ?", "Dans Dictaphone, touche l'enregistrement puis Partager → Enregistrer dans Fichiers. Ensuite, ouvre-le ici."],
      ["Puis-je convertir des chansons iTunes protégées ?", "Non. Les chansons avec une protection anticopie (DRM) ne peuvent pas être converties."],
    ],
  },
  {
    key: 'c-wa', convLabel: 'Audio WhatsApp en MP3', path: 'fr/audio-whatsapp-en-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir un audio WhatsApp en MP3 (OPUS en MP3) | ${NAME}`,
    description: "Convertis les messages vocaux WhatsApp et Telegram (.opus, .ogg) en MP3 pour les écouter partout. Gratuit et privé : tes messages ne sont jamais envoyés.",
    h1: "<em>Audio WhatsApp</em> en MP3",
    lead: "Convertis les messages vocaux WhatsApp et Telegram (.opus ou .ogg) en MP3. Tes messages restent sur ton téléphone.",
    badges: ["OPUS et OGG", "Privé", "Gratuit"],
    steps: [
      ["Enregistre le message vocal", "Dans WhatsApp, appuie longuement sur le message vocal → Transférer → Partager → Enregistrer dans Fichiers."],
      ["Ouvre-le ici", "Touche le cadre ci-dessus et choisis le fichier .opus."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Pourquoi les vocaux WhatsApp ne s'ouvrent-ils pas partout ?</h2>
    <p>WhatsApp enregistre les messages vocaux au format OPUS. C'est un bon format pour la voix, mais beaucoup de lecteurs, d'éditeurs et de vieux téléphones ne l'ouvrent pas. Un MP3 se lit partout et il est facile à envoyer ou à garder.</p>
    <h3>Vraiment privé</h3>
    <p>Les messages vocaux sont personnels, c'est pourquoi il est important que ${NAME} ne les envoie jamais. La conversion se fait sur ton propre téléphone ou ordinateur.</p>
    <h3>Plusieurs messages vocaux ?</h3>
    <p>Utilise <a href="/fr/fusionner-audio/">fusionner des audios</a> pour les regrouper en un seul MP3. Le <a href="/fr/guide/audio-whatsapp-en-mp3/">guide étape par étape</a> explique comment les sortir de WhatsApp sur iPhone et Android.</p>`,
    faq: [
      ["Où WhatsApp enregistre-t-il les messages vocaux sur Android ?", "En général dans Stockage interne → Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes."],
      ["Puis-je augmenter le volume d'un message vocal ?", "Oui. Monte le Volume ou active Volume automatique dans Effets avant de convertir."],
    ],
  },
  {
    key: 'c-mp3wav', convLabel: 'MP3 en WAV', path: 'fr/mp3-en-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Convertir MP3 en WAV en ligne gratuitement | ${NAME}`,
    description: "Convertis un MP3 en WAV en ligne pour le montage, les logiciels de DJ ou pour graver un CD. Gratuit, rapide et privé. Aucun fichier n'est envoyé.",
    h1: "Convertir <em>MP3 en WAV</em>",
    lead: "Convertis un MP3 en WAV pour les logiciels de montage, les apps de DJ ou pour graver un CD.",
    badges: ["WAV 16 bits", "Pour le montage", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre le MP3", "Choisis un MP3 sur ton appareil."],
      ["Le WAV est déjà choisi", "Ajoute des effets avant si tu veux."],
      ["Télécharge le WAV", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>Quand tu as besoin d'un WAV</h2>
    <p>Certains logiciels de montage, samplers et apps de gravure de CD n'acceptent que le WAV. En le convertissant, tu obtiens un fichier que tous acceptent.</p>
    <p>Point important : passer un MP3 en WAV ne récupère pas la qualité que le MP3 a déjà perdue. Le WAV sonne comme le MP3, il est seulement plus lourd et plus facile à retoucher.</p>`,
    faq: [
      ["Passer de MP3 à WAV améliore-t-il la qualité ?", "Non. Le WAV garde la qualité du MP3, dans un format plus facile à retoucher."],
      ["Pourquoi le WAV est-il tellement plus lourd ?", "Le WAV n'est pas compressé, il pèse donc environ 10 Mo par minute."],
    ],
  },
  {
    key: 'c-ogg', convLabel: 'OGG en MP3', path: 'fr/ogg-en-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir OGG en MP3 en ligne gratuit, sans envoi | ${NAME}`,
    description: "Convertis des fichiers OGG et OGA en MP3 pour les écouter sur iPhone, en voiture et dans toutes les apps de musique. Gratuit, rapide et sans envoi.",
    h1: "Convertir <em>OGG en MP3</em>",
    lead: "Transforme les fichiers OGG de jeux, de Telegram, de Discord ou d'apps Linux en MP3 qui se lisent partout.",
    badges: ["OGG Vorbis et Opus", "Jusqu'à 320 kbps", "Aucun envoi de fichier"],
    steps: [
      ["Ouvre le OGG", "Choisis un fichier .ogg ou .oga sur ton appareil."],
      ["Choisis la qualité", "192 kbps est un bon compromis. Prends 320 kbps pour la musique."],
      ["Télécharge le MP3", "Appuie sur Convertir, puis sur Télécharger."],
    ],
    content: `
    <h2>C'est quoi, un fichier OGG ?</h2>
    <p>Le OGG est un format audio ouvert. La plupart des OGG contiennent de la musique en <strong>Vorbis</strong>, et les messages vocaux d'apps comme Telegram et WhatsApp contiennent souvent de la voix en <strong>Opus</strong>. Les deux sonnent bien, mais l'iPhone, beaucoup d'autoradios et de vieux lecteurs ne les ouvrent pas.</p>
    <p>${NAME} lit les deux types et enregistre un MP3 standard. Si c'est un message vocal, va voir <a href="/fr/audio-whatsapp-en-mp3/">audio WhatsApp en MP3</a>.</p>
    <h3>Si le OGG ne s'ouvre pas</h3>
    <ul>
      <li>Vérifie que le téléchargement est terminé. Un OGG à moitié enregistré ne peut pas être lu.</li>
      <li>Les fichiers des apps de messagerie se terminent parfois par <strong>.opus</strong> ou <strong>.oga</strong>. Ils fonctionnent aussi.</li>
      <li>Sur iPhone, enregistre d'abord le fichier dans l'app Fichiers et choisis-le depuis là.</li>
    </ul>`,
    faq: [
      ["Pourquoi mon iPhone ne lit pas les fichiers OGG ?", "Apple ne prend en charge que certains OGG, dans peu d'apps. Les convertir en MP3 ou M4A permet de les écouter partout."],
      ["Perd-on en qualité en passant de OGG à MP3 ?", "Les deux sont compressés, donc un peu. À 256 ou 320 kbps, c'est très difficile à remarquer."],
    ],
  },

  // ---------- Guides ----------
  {
    key: 'g-iphone', forTool: 'ringtone', icon: 'bell', path: 'fr/guide/sonnerie-iphone', crumb: 'Guides', plain: true,
    title: `Mettre une chanson en sonnerie iPhone sans PC | ${NAME}`,
    description: "Mets n'importe quelle chanson en sonnerie sur ton iPhone sans ordinateur ni iTunes. Méthode iOS 26 avec l'app Fichiers, et GarageBand pour les anciens iPhone.",
    h1: "Comment mettre une chanson en sonnerie sur iPhone",
    lead: "Sans ordinateur, sans iTunes et sans app payante. Sur iOS 26, c'est quatre touches depuis l'app Fichiers, et sur les iPhone plus anciens, ça se fait avec GarageBand.",
    content: `
    <div class="callout"><p>Crée d'abord la sonnerie : choisis le meilleur passage de ta chanson. Ça prend environ 30 secondes.</p><a class="btn sm" href="/fr/creer-sonnerie/">Ouvrir l'outil de sonnerie</a></div>
    <h2>Étape 1 : crée la sonnerie</h2>
    <ol class="guide-steps">
      <li>Ouvre l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a> dans Safari et choisis ta chanson depuis Fichiers, Photos ou tes musiques téléchargées.</li>
      <li>Fais glisser sur la forme d'onde pour choisir le passage voulu. <strong>Elle doit durer moins de 30 secondes</strong> : au départ, 29 secondes sont déjà sélectionnées.</li>
      <li>Laisse le format sur <strong>M4R</strong> (le MP3 marche aussi), appuie sur <strong>Créer la sonnerie</strong>, puis sur <strong>Télécharger</strong>. Le fichier est enregistré dans l'app <strong>Fichiers</strong>, dans <strong>Téléchargements</strong>.</li>
    </ol>
    <h2>Étape 2 : définis-la comme sonnerie (iOS 26 ou plus récent)</h2>
    <ol class="guide-steps">
      <li>Ouvre l'app <strong>Fichiers</strong> → <strong>Parcourir</strong> → <strong>Téléchargements</strong> et touche ta sonnerie pour l'ouvrir.</li>
      <li>Touche le bouton <strong>Partager</strong> (le carré avec une flèche vers le haut).</li>
      <li>Touche <strong>Utiliser comme sonnerie</strong>. Si tu ne le vois pas, fais défiler jusqu'en bas de la liste des actions ou touche <strong>Plus</strong>.</li>
      <li>Réglages s'ouvre avec ta nouvelle sonnerie sélectionnée. Tu la retrouveras aussi dans <strong>Réglages → Sons et vibrations → Sonnerie</strong>.</li>
    </ol>
    <p>Tu ne connais pas ta version ? Va dans <strong>Réglages → Général → Informations → Version d'iOS</strong>.</p>
    <h2>Étape 2 sur les iPhone plus anciens (GarageBand)</h2>
    <ol class="guide-steps">
      <li>Installe <strong>GarageBand</strong> depuis l'App Store (gratuit, édité par Apple) et ouvre-le. Commence avec n'importe quel instrument, par exemple l'enregistreur audio.</li>
      <li>Touche le bouton de la <strong>vue Pistes</strong>, puis l'icône de <strong>boucle</strong> en haut à droite → <strong>Fichiers</strong> → parcours les fichiers de l'app Fichiers et choisis ta sonnerie.</li>
      <li>Fais-la glisser sur la piste, puis touche la flèche <strong>⌄</strong> en haut à gauche → <strong>Mes morceaux</strong>.</li>
      <li>Appuie longuement sur le morceau → <strong>Partager</strong> → <strong>Sonnerie</strong> → <strong>Exporter</strong> et choisis de l'utiliser comme sonnerie par défaut.</li>
    </ol>
    <h2>« Utiliser comme sonnerie » n'apparaît pas ou ne marche pas</h2>
    <ol class="guide-steps">
      <li><strong>Le fichier est trop long.</strong> L'app Fichiers n'accepte que les sons de moins de 30 secondes. Rouvre-le dans l'outil de sonnerie et choisis un passage plus court.</li>
      <li><strong>C'est une chanson Apple Music.</strong> Les chansons d'un abonnement Apple Music sont protégées et ne peuvent pas être utilisées. Utilise un fichier de chanson qui t'appartient, ou le son de tes propres vidéos.</li>
      <li><strong>Le téléchargement n'est pas terminé.</strong> Télécharge-le de nouveau et attends que la flèche bleue de la barre d'adresse de Safari ait fini.</li>
      <li><strong>Ça ne marche toujours pas ?</strong> Ferme complètement l'app Fichiers et rouvre-la, ou utilise la méthode GarageBand.</li>
    </ol>
    <h2>Pour une seule personne</h2>
    <p>Ouvre <strong>Contacts</strong>, choisis la personne, touche <strong>Modifier</strong> → <strong>Sonnerie</strong> et choisis ton nouveau son. Tu as un Samsung ? Va voir <a href="/fr/guide/sonnerie-samsung/">comment mettre une sonnerie sur Samsung</a>.</p>`,
    faq: [
      ["Puis-je mettre une sonnerie sur iPhone sans ordinateur ?", "Oui. Sur iOS 26 ou plus récent, ouvre le fichier dans l'app Fichiers et touche Partager → Utiliser comme sonnerie. Sur les versions plus anciennes, utilise GarageBand."],
      ["Combien de temps peut durer une sonnerie iPhone ?", "Moins de 30 secondes avec la méthode de l'app Fichiers. GarageBand et l'ordinateur permettent jusqu'à 40 secondes."],
      ["Ai-je besoin d'un fichier M4R ?", "Pas pour la méthode de l'app Fichiers, le MP3 marche aussi. Le M4R n'est nécessaire que si tu copies la sonnerie depuis un ordinateur."],
      ["Puis-je utiliser une chanson Apple Music ?", "Non. Les chansons Apple Music sont protégées, donc l'iPhone ne les accepte pas comme sonnerie. Les chansons que tu as achetées ou que tu as en fichier fonctionnent."],
      ["C'est gratuit ?", `Oui. L'outil de sonnerie de ${NAME} est gratuit et sans filigrane, et l'app Fichiers et GarageBand sont gratuites aussi.`],
    ],
  },
  {
    key: 'g-samsung', icon: 'bell', path: 'fr/guide/sonnerie-samsung', crumb: 'Guides', plain: true,
    title: `Mettre une chanson en sonnerie sur Samsung Galaxy | ${NAME}`,
    description: "Mets une chanson en sonnerie sur Samsung Galaxy : crée-la, puis Paramètres → Sons et vibration → Sonnerie → +. Aussi par contact et avec deux SIM.",
    h1: "Comment mettre une chanson en sonnerie sur Samsung",
    lead: "N'importe quel Samsung Galaxy peut utiliser ta propre chanson comme sonnerie. Crée d'abord la sonnerie, ensuite il suffit de quelques touches dans Paramètres.",
    content: `
    <div class="callout"><p>Crée d'abord la sonnerie. Choisis le meilleur passage d'une chanson en environ 30 secondes.</p><a class="btn sm" href="/fr/creer-sonnerie/">Ouvrir l'outil de sonnerie</a></div>
    <h2>Étape 1 : crée la sonnerie</h2>
    <ol class="guide-steps">
      <li>Ouvre l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a> dans Chrome ou Samsung Internet et choisis ta chanson.</li>
      <li>Fais glisser sur la forme d'onde pour choisir le passage voulu et choisis <strong>MP3</strong>.</li>
      <li>Appuie sur <strong>Créer la sonnerie</strong>, puis sur <strong>Télécharger</strong>. Elle est enregistrée dans <strong>Mes fichiers → Téléchargements</strong>.</li>
    </ol>
    <h2>Étape 2 : définis-la comme sonnerie</h2>
    <ol class="guide-steps">
      <li>Ouvre <strong>Paramètres</strong> → <strong>Sons et vibration</strong> → <strong>Sonnerie</strong>.</li>
      <li>Si tu as deux cartes SIM, choisis <strong>SIM 1</strong> ou <strong>SIM 2</strong>.</li>
      <li>Touche le <strong>+</strong> en haut à droite de la liste.</li>
      <li>Cherche ton fichier (dans <strong>Téléchargements</strong> ou dans <strong>Audio</strong>), touche-le et appuie sur <strong>Terminé</strong>.</li>
    </ol>
    <h2>Pour un seul contact</h2>
    <ol class="guide-steps">
      <li>Ouvre <strong>Contacts</strong> et touche la personne.</li>
      <li>Touche <strong>Modifier</strong>, puis <strong>Afficher plus</strong> en bas.</li>
      <li>Touche <strong>Sonnerie</strong>, puis <strong>+</strong>, choisis ton fichier et enregistre.</li>
    </ol>
    <h2>Comme son de notification</h2>
    <p>Va dans <strong>Paramètres → Sons et vibration → Son de notification</strong> et ajoute ton fichier de la même façon. Les sons de notification marchent mieux quand ils sont courts, de 1 à 3 secondes. Avec <a href="/fr/couper-audio/">couper un audio</a>, tu peux raccourcir un son à cette durée.</p>
    <h2>La chanson n'apparaît pas dans la liste</h2>
    <ol class="guide-steps">
      <li>Vérifie que le téléchargement est terminé : ouvre <strong>Mes fichiers → Téléchargements</strong> et lis-la.</li>
      <li>Ferme et rouvre Paramètres, ou redémarre le téléphone, pour qu'il recherche les nouveaux sons.</li>
      <li>Déplace le fichier dans le dossier <strong>Ringtones</strong> de Mes fichiers (Stockage interne → Ringtones). Les fichiers de ce dossier apparaissent toujours.</li>
    </ol>`,
    faq: [
      ["Combien de temps peut durer une sonnerie sur Samsung ?", "Il n'y a pas de limite stricte, mais 20 à 30 secondes suffisent. La sonnerie se répète jusqu'à ce que tu répondes."],
      ["Quel format utilisent les Samsung ?", "Le MP3 fonctionne sur tous les Samsung. Le M4A et le OGG marchent aussi."],
      ["Puis-je mettre une sonnerie différente pour chaque SIM ?", "Oui. Dans Sonnerie, choisis SIM 1 ou SIM 2 et règle chacune séparément."],
    ],
  },
  {
    key: 'g-whatsapp', forTool: 'converter', icon: 'swap', path: 'fr/guide/audio-whatsapp-en-mp3', crumb: 'Guides', plain: true,
    title: `Comment convertir un audio WhatsApp en MP3 | ${NAME}`,
    description: "Enregistre un message vocal WhatsApp depuis iPhone ou Android et convertis-le en MP3 pour l'écouter partout. Étape par étape, gratuit et privé.",
    h1: "Comment convertir un audio WhatsApp en MP3",
    lead: "Les messages vocaux WhatsApp sont des fichiers .opus que la plupart des lecteurs n'ouvrent pas. Voici comment les sortir de la discussion et les convertir en MP3.",
    content: `
    <h2>1. Sors le message vocal de WhatsApp</h2>
    <h3>iPhone</h3>
    <ol class="guide-steps">
      <li>Ouvre la discussion et <strong>appuie longuement</strong> sur le message vocal → <strong>Transférer</strong>.</li>
      <li>Touche le bouton <strong>Partager</strong> en bas à droite (pas la flèche pour transférer à une discussion).</li>
      <li>Choisis <strong>Enregistrer dans Fichiers</strong> et enregistre-le, par exemple dans Téléchargements.</li>
    </ol>
    <h3>Android</h3>
    <ol class="guide-steps">
      <li>Appuie longuement sur le message vocal et touche l'icône <strong>Partager</strong> en haut.</li>
      <li>Choisis <strong>Fichiers</strong>, <strong>Drive</strong> ou un autre endroit pour l'enregistrer.</li>
      <li>Ou retrouve tous tes messages vocaux dans l'app de fichiers, dans <em>Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes</em>.</li>
    </ol>
    <h2>2. Convertis-le en MP3</h2>
    <ol class="guide-steps">
      <li>Ouvre le <a href="/fr/convertisseur-audio/">convertisseur audio</a> et choisis le message vocal.</li>
      <li>Choisis <strong>MP3</strong>, appuie sur <strong>Convertir</strong>, puis sur <strong>Télécharger</strong>. 128 kbps suffit pour la voix.</li>
    </ol>
    <h2>Pour un meilleur son</h2>
    <p>Les messages vocaux enregistrés dans la rue ont souvent du bruit. Ouvre le MP3 dans l'outil pour <a href="/fr/supprimer-le-bruit/">supprimer le bruit avec l'IA</a> afin de retirer le vent et la circulation et d'égaliser le volume. Pour regrouper plusieurs messages vocaux en un seul fichier, utilise <a href="/fr/fusionner-audio/">fusionner des audios</a>. Les messages vocaux Telegram (.ogg) fonctionnent de la même façon.</p>`,
    faq: [
      ["Pourquoi je ne peux pas écouter un vocal WhatsApp sur mon ordinateur ?", "WhatsApp les enregistre en fichiers .opus, que beaucoup de lecteurs ne prennent pas en charge. Les convertir en MP3 règle le problème."],
      ["Mon message vocal est-il envoyé quelque part ?", "Non. La conversion se fait sur ton propre téléphone ou ordinateur, donc le message ne quitte jamais ton appareil."],
      ["Puis-je regrouper plusieurs messages vocaux dans un fichier ?", "Oui. Convertis-les, puis assemble-les avec l'outil pour fusionner des audios."],
    ],
  },
  {
    key: 'g-slowed', forTool: 'slowed', icon: 'slow', path: 'fr/guide/slowed-reverb', crumb: 'Guides', plain: true,
    title: `Comment faire du slowed + reverb sur téléphone | ${NAME}`,
    description: "Crée ta propre version slowed + reverb de n'importe quelle chanson sur téléphone ou ordinateur : vitesse, tonalité et réverb qui sonnent bien, étape par étape.",
    h1: "Comment faire des chansons slowed + reverb",
    lead: "Ce son lent et rêveur de TikTok et YouTube se fait en une minute, gratuitement, depuis ton navigateur.",
    content: `
    <h2>Étape par étape</h2>
    <ol class="guide-steps">
      <li>Ouvre <a href="/fr/slowed-reverb/">Slowed + Reverb</a> et choisis une chanson sur ton téléphone ou ton ordinateur.</li>
      <li>Les réglages classiques sont déjà en place : vitesse <strong>0,85×</strong> avec réverb. Appuie sur <strong>Lire avec effets</strong>.</li>
      <li>Ajuste à ton goût (voir les réglages ci-dessous), puis appuie sur <strong>Convertir</strong> et <strong>Télécharger</strong> ton MP3.</li>
    </ol>
    <h2>Des réglages qui sonnent bien</h2>
    <ol class="guide-steps">
      <li><strong>Vitesse de 0,80 à 0,90×.</strong> Plus lent que 0,80, ça commence à sonner flou, et plus rapide que 0,90, ça s'entend à peine.</li>
      <li><strong>Tonalité de 1 à 3 demi-tons plus basse.</strong> Ça donne cette voix grave et endormie. Laisse-la à 0 si le chanteur sonne trop sombre.</li>
      <li><strong>Réverb de 35 à 55 %.</strong> Juste assez pour sonner comme dans une grande salle, sans que les paroles se perdent.</li>
      <li><strong>Un peu plus de graves</strong> (+3 à +6 dB) rend le son plus plein au casque.</li>
    </ol>
    <h2>D'autres versions à essayer</h2>
    <ol class="guide-steps">
      <li><strong>Accélérée ou nightcore :</strong> vitesse de 1,15 à 1,30× avec une tonalité plus haute. Utilise le <a href="/fr/nightcore/">créateur de nightcore</a>.</li>
      <li><strong>8D :</strong> le son tourne autour de ta tête au casque. Utilise le <a href="/fr/audio-8d/">convertisseur audio 8D</a>.</li>
      <li><strong>Sonnerie slowed :</strong> crée ta version lente, puis ouvre-la dans l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a>.</li>
    </ol>
    <h2>Pour la publier</h2>
    <p>TikTok, Instagram et YouTube peuvent couper le son ou bloquer les chansons dont tu n'as pas les droits, même ralenties. Pour l'écouter toi-même, aucun problème ; pour la publier, utilise ta propre musique ou une musique que tu as le droit d'utiliser, ou ajoute la chanson originale depuis la bibliothèque musicale de l'app. Tu as besoin d'une vidéo plutôt que d'un audio ? <a href="/fr/mp3-en-mp4/">MP3 en MP4</a> transforme ta version lente en MP4 avec une onde sonore animée.</p>`,
    faq: [
      ["Quelle vitesse pour du slowed + reverb ?", "En général entre 0,80 et 0,90 fois la vitesse d'origine, avec une tonalité 1 à 3 demi-tons plus basse."],
      ["Puis-je le faire sur mon téléphone ?", "Oui. Slowed + Reverb fonctionne dans Safari et Chrome sur iPhone et Android, sans rien installer."],
      ["Y a-t-il un filigrane ?", "Non. Le MP3 est à toi, sans filigrane et sans inscription."],
    ],
  },
];
