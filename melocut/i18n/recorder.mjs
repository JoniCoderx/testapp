// The online voice recorder page in the four other languages. Button names match i18n/ui*.py.
const base = { key: 'recorder', tool: 'converter', format: 'mp3', quality: '128', recPrimary: true, crumb: 'Tools', suffix: '' };
export default (NAME) => ({
  es: { ...base, path: 'es/grabadora-de-voz',
    title: `Grabadora de voz online: graba y guarda en MP3 gratis | ${NAME}`,
    description: 'Graba tu voz online con el micrófono y guárdala en MP3, WAV o M4A. Recórtala, añade efectos y sin registro. La grabación nunca sale de tu dispositivo.',
    h1: '<em>Grabadora de voz</em> online',
    lead: 'Graba tu voz con el micrófono del celular o la computadora, escúchala, recórtala y guárdala en MP3. No se sube nada.',
    badges: ['Graba con un toque', 'MP3, WAV, M4A', 'Se queda en tu dispositivo'],
    steps: [
      ['Toca Grabar con el micrófono', 'Permite el micrófono cuando el navegador lo pida. Habla, canta o toca, y luego toca Detener.'],
      ['Escucha y recorta', 'La grabación se abre al instante. Arrastra sobre la onda para quedarte solo con la parte que quieres.'],
      ['Guárdala', 'Elige MP3 y una calidad, pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Graba, recorta y guarda en un solo lugar</h2>
    <p>La mayoría de las grabadoras online suben tu voz a un servidor. ${NAME} graba y procesa todo dentro de tu navegador, así que nunca sale de tu celular o tu computadora. Al detener, la grabación se abre en el editor: escúchala, corta el silencio del principio y guárdala.</p>
    <h3>Que suene mejor</h3>
    <ul>
      <li><strong>¿Ruido de fondo?</strong> Abre Efectos y activa <strong>Quitar ruido con IA</strong>.</li>
      <li><strong>¿Se oye bajo?</strong> Activa <strong>Volumen automático</strong>.</li>
      <li><strong>¿Pausas largas?</strong> Activa <strong>Quitar silencios</strong>.</li>
      <li><strong>¿Quieres una voz graciosa?</strong> Graba en el <a href="/es/cambiador-de-voz/">cambiador de voz</a>.</li>
    </ul>
    <h3>¿Qué formato elijo?</h3>
    <p><strong>MP3 a 128 kbps</strong> basta para la voz y ocupa poco, alrededor de 1 MB por minuto. Elige <strong>WAV</strong> si vas a editar la grabación en otro programa.</p>
    <h3>Funciona en</h3>
    <p>Chrome, Edge, Firefox y Safari en Android, iPhone, Windows y Mac. Grabar necesita tu permiso para usar el micrófono; puedes quitarlo en los ajustes del sitio de tu navegador. Cada grabación se detiene sola a los 10 minutos.</p>`,
    faq: [
      ['¿Esta grabadora de voz es gratis?', 'Sí. Sin registro, sin marca de agua y sin límite de grabaciones.'],
      ['¿Se sube mi grabación?', 'No. Se graba y se guarda dentro de tu navegador y nunca se envía a un servidor.'],
      ['¿Cuánto puedo grabar?', 'Hasta 10 minutos por grabación. Graba otra vez para más y junta las partes con unir audio.'],
      ['¿Por qué no pasa nada al tocar Grabar?', 'Tu navegador necesita permiso para usar el micrófono. Permítelo en el aviso o en los ajustes del sitio, junto a la barra de direcciones. En algunos navegadores dentro de apps (TikTok, Instagram) el micrófono está bloqueado: abre la página en Safari o Chrome.'],
    ],
  },
  'pt-br': { ...base, path: 'pt-br/gravador-de-voz',
    title: `Gravador de voz online: grave áudio e salve MP3 grátis | ${NAME}`,
    description: 'Grave sua voz online com o microfone e salve em MP3, WAV ou M4A. Corte, coloque efeitos e sem cadastro. A gravação nunca sai do seu aparelho.',
    h1: '<em>Gravador de voz</em> online',
    lead: 'Grave sua voz com o microfone do celular ou do computador, ouça, corte e salve em MP3. Nada é enviado.',
    badges: ['Grave com um toque', 'MP3, WAV, M4A', 'Fica no seu aparelho'],
    steps: [
      ['Toque em Gravar com o microfone', 'Permita o microfone quando o navegador pedir. Fale, cante ou toque, e depois toque em Parar.'],
      ['Ouça e corte', 'A gravação abre na hora. Arraste sobre a onda para ficar só com a parte que você quer.'],
      ['Salve', 'Escolha MP3 e uma qualidade, aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Grave, corte e salve num lugar só</h2>
    <p>A maioria dos gravadores online envia a sua voz para um servidor. O ${NAME} grava e processa tudo dentro do seu navegador, então ela nunca sai do seu celular ou computador. Quando você para, a gravação abre no editor: ouça, corte o silêncio do começo e salve.</p>
    <h3>Para soar melhor</h3>
    <ul>
      <li><strong>Barulho de fundo?</strong> Abra Efeitos e ative <strong>Remover ruído com IA</strong>.</li>
      <li><strong>Ficou baixo?</strong> Ative <strong>Volume automático</strong>.</li>
      <li><strong>Pausas longas?</strong> Ative <strong>Remover silêncios</strong>.</li>
      <li><strong>Quer uma voz engraçada?</strong> Grave no <a href="/pt-br/mudar-voz/">modificador de voz</a>.</li>
    </ul>
    <h3>Qual formato escolher?</h3>
    <p><strong>MP3 a 128 kbps</strong> basta para voz e ocupa pouco, cerca de 1 MB por minuto. Escolha <strong>WAV</strong> se for editar a gravação em outro programa.</p>
    <h3>Funciona em</h3>
    <p>Chrome, Edge, Firefox e Safari no Android, iPhone, Windows e Mac. Gravar precisa da sua permissão para usar o microfone; dá para tirar nas configurações do site no navegador. Cada gravação para sozinha aos 10 minutos.</p>`,
    faq: [
      ['Esse gravador de voz é grátis?', 'Sim. Sem cadastro, sem marca d\'água e sem limite de gravações.'],
      ['Minha gravação é enviada?', 'Não. Ela é gravada e salva dentro do seu navegador e nunca vai para um servidor.'],
      ['Quanto tempo posso gravar?', 'Até 10 minutos por gravação. Grave de novo para mais e junte as partes com o juntar áudios.'],
      ['Por que nada acontece quando toco em Gravar?', 'O navegador precisa de permissão para usar o microfone. Permita no aviso ou nas configurações do site, ao lado da barra de endereço. Em alguns navegadores dentro de apps (TikTok, Instagram) o microfone fica bloqueado: abra a página no Safari ou no Chrome.'],
    ],
  },
  de: { ...base, path: 'de/diktiergeraet',
    title: `Online Diktiergerät: Stimme aufnehmen, MP3 gratis | ${NAME}`,
    description: 'Nimm deine Stimme online mit dem Mikrofon auf und speichere sie als MP3, WAV oder M4A. Schneiden, Effekte, ohne Anmeldung. Die Aufnahme bleibt auf deinem Gerät.',
    h1: 'Online <em>Diktiergerät</em>',
    lead: 'Nimm deine Stimme mit dem Mikrofon von Handy oder Computer auf, hör sie an, schneide sie zu und speichere sie als MP3. Nichts wird hochgeladen.',
    badges: ['Aufnahme mit einem Tipp', 'MP3, WAV, M4A', 'Bleibt auf deinem Gerät'],
    steps: [
      ['Tippe auf Mit dem Mikrofon aufnehmen', 'Erlaube das Mikrofon, wenn dein Browser fragt. Sprich, sing oder spiel und tippe dann auf Stopp.'],
      ['Anhören und schneiden', 'Die Aufnahme öffnet sich sofort. Zieh über die Wellenform, um nur den gewünschten Teil zu behalten.'],
      ['Speichern', 'Wähle MP3 und eine Qualität, tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Aufnehmen, schneiden und speichern an einem Ort</h2>
    <p>Die meisten Online-Recorder laden deine Stimme auf einen Server. ${NAME} nimmt alles in deinem Browser auf und verarbeitet es dort, sie verlässt dein Handy oder deinen Computer also nie. Nach dem Stopp öffnet sich die Aufnahme im Editor: anhören, die Stille am Anfang wegschneiden und speichern.</p>
    <h3>Besserer Klang</h3>
    <ul>
      <li><strong>Hintergrundgeräusche?</strong> Öffne die Effekte und schalte <strong>KI-Rauschentfernung</strong> ein.</li>
      <li><strong>Zu leise?</strong> Schalte <strong>Auto-Lautstärke</strong> ein.</li>
      <li><strong>Lange Pausen?</strong> Schalte <strong>Stille entfernen</strong> ein.</li>
      <li><strong>Lust auf eine lustige Stimme?</strong> Nimm im <a href="/de/stimmenverzerrer/">Stimmenverzerrer</a> auf.</li>
    </ul>
    <h3>Welches Format?</h3>
    <p><strong>MP3 mit 128 kbps</strong> reicht für Sprache und bleibt klein, etwa 1 MB pro Minute. Wähle <strong>WAV</strong>, wenn du die Aufnahme in einem anderen Programm bearbeiten willst.</p>
    <h3>Funktioniert mit</h3>
    <p>Chrome, Edge, Firefox und Safari auf Android, iPhone, Windows und Mac. Für die Aufnahme braucht der Browser deine Erlaubnis für das Mikrofon; du kannst sie in den Website-Einstellungen wieder entziehen. Jede Aufnahme stoppt nach 10 Minuten automatisch.</p>`,
    faq: [
      ['Ist das Diktiergerät kostenlos?', 'Ja. Ohne Anmeldung, ohne Wasserzeichen und ohne Limit bei den Aufnahmen.'],
      ['Wird meine Aufnahme hochgeladen?', 'Nein. Sie wird in deinem Browser aufgenommen und gespeichert und nie an einen Server geschickt.'],
      ['Wie lange kann ich aufnehmen?', 'Bis zu 10 Minuten pro Aufnahme. Nimm für mehr erneut auf und füge die Teile mit Audio zusammenfügen zusammen.'],
      ['Warum passiert nichts, wenn ich auf Aufnehmen tippe?', 'Dein Browser braucht die Erlaubnis für das Mikrofon. Erlaube es in der Abfrage oder in den Website-Einstellungen neben der Adressleiste. In manchen In-App-Browsern (TikTok, Instagram) ist das Mikrofon gesperrt: öffne die Seite in Safari oder Chrome.'],
    ],
  },
  fr: { ...base, path: 'fr/dictaphone-en-ligne',
    title: `Dictaphone en ligne : enregistre ta voix en MP3 gratuit | ${NAME}`,
    description: 'Enregistre ta voix en ligne avec ton micro et sauvegarde-la en MP3, WAV ou M4A. Coupe, ajoute des effets, sans inscription. Rien ne quitte ton appareil.',
    h1: '<em>Dictaphone</em> en ligne',
    lead: 'Enregistre ta voix avec le micro de ton téléphone ou de ton ordinateur, réécoute-la, coupe-la et sauvegarde-la en MP3. Rien n\'est envoyé.',
    badges: ['Enregistrement en un geste', 'MP3, WAV, M4A', 'Reste sur ton appareil'],
    steps: [
      ['Touche Enregistrer avec le micro', 'Autorise le micro quand ton navigateur le demande. Parle, chante ou joue, puis touche Arrêter.'],
      ['Écoute et coupe', 'L\'enregistrement s\'ouvre tout de suite. Fais glisser sur l\'onde pour ne garder que la partie voulue.'],
      ['Sauvegarde', 'Choisis MP3 et une qualité, touche Convertir puis Télécharger.'],
    ],
    content: `
    <h2>Enregistrer, couper et sauvegarder au même endroit</h2>
    <p>La plupart des enregistreurs en ligne envoient ta voix sur un serveur. ${NAME} enregistre et traite tout dans ton navigateur, elle ne quitte donc jamais ton téléphone ou ton ordinateur. Quand tu t'arrêtes, l'enregistrement s'ouvre dans l'éditeur : réécoute, coupe le silence du début et sauvegarde.</p>
    <h3>Pour un meilleur son</h3>
    <ul>
      <li><strong>Bruit de fond ?</strong> Ouvre les effets et active <strong>Suppression du bruit par IA</strong>.</li>
      <li><strong>Trop faible ?</strong> Active <strong>Volume automatique</strong>.</li>
      <li><strong>De longues pauses ?</strong> Active <strong>Supprimer les silences</strong>.</li>
      <li><strong>Envie d'une voix drôle ?</strong> Enregistre-toi dans le <a href="/fr/modificateur-de-voix/">modificateur de voix</a>.</li>
    </ul>
    <h3>Quel format ?</h3>
    <p><strong>Le MP3 à 128 kbps</strong> suffit pour la voix et reste léger, environ 1 Mo par minute. Choisis <strong>WAV</strong> si tu vas retravailler l'enregistrement dans un autre logiciel.</p>
    <h3>Fonctionne sur</h3>
    <p>Chrome, Edge, Firefox et Safari, sur Android, iPhone, Windows et Mac. L'enregistrement a besoin de ton autorisation pour utiliser le micro ; tu peux la retirer dans les paramètres du site de ton navigateur. Chaque enregistrement s'arrête tout seul au bout de 10 minutes.</p>`,
    faq: [
      ['Ce dictaphone est-il gratuit ?', 'Oui. Sans inscription, sans filigrane et sans limite d\'enregistrements.'],
      ['Mon enregistrement est-il envoyé ?', 'Non. Il est enregistré et sauvegardé dans ton navigateur et n\'est jamais envoyé à un serveur.'],
      ['Combien de temps puis-je enregistrer ?', 'Jusqu\'à 10 minutes par enregistrement. Enregistre à nouveau pour plus, puis assemble les parties avec Fusionner des audios.'],
      ['Pourquoi rien ne se passe quand je touche Enregistrer ?', 'Ton navigateur a besoin de l\'autorisation pour le micro. Autorise-le dans la fenêtre ou dans les paramètres du site, à côté de la barre d\'adresse. Dans certains navigateurs intégrés aux applis (TikTok, Instagram), le micro est bloqué : ouvre la page dans Safari ou Chrome.'],
    ],
  },
});
