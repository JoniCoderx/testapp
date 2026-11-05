import more, { toolPaths } from './de-more.mjs';
// German ("du") pages and site text. Self-contained: no imports.
// Pages with the same `key` as an English page are linked to it with hreflang and the language switcher.
// Button names match the German interface strings in i18n/ui_de.py.
const base = (NAME) => ({
  ui: {
    code: 'de', hreflang: 'de', ogLocale: 'de_DE', prefix: '/de', name: 'Deutsch', short: 'DE',
    home: 'Startseite', tools: 'Tools', allTools: 'Alle Tools', navAll: 'Alle', popular: 'Am beliebtesten', installApp: 'App installieren', menu: 'Menü',
    howItWorks: 'So funktioniert es', faq: 'Häufige Fragen', moreTools: 'Weitere kostenlose Tools',
    noscript: 'Aktiviere JavaScript, um dieses Tool zu nutzen.', language: 'Sprache', homeAria: `${NAME} Startseite`,
    footerTagline: 'Kostenlose Audio-Tools, die in deinem Browser laufen',
    updated: 'Aktualisiert', minRead: 'Min. Lesezeit', moreGuides: 'Weitere Anleitungen', stepGuide: 'Schritt-für-Schritt-Anleitung',
    popularConv: 'Beliebte Umwandlungen', conversions: 'Umwandlungen',
    next: { 'audio-to-video': 'Video daraus machen', 'ringtone-maker': 'Als Klingelton', 'audio-cutter': 'Zuschneiden' },
    support: 'MeloCut unterstützen',
    fTools: 'Tools', fHelp: 'Hilfe und Infos', fGuides: 'Anleitungen (auf Englisch)', fInstall: 'App installieren',
    fAbout: 'Über uns und Kontakt', fPrivacy: 'Datenschutz', fTerms: 'Nutzungsbedingungen', inEnglish: 'auf Englisch', newTag: 'Neu',
    ogAlt: (h1) => `${h1} bei ${NAME}`, tag: 'Kostenlos · Privat · Ohne Upload',
    install: 'Du kannst MeloCut zum Startbildschirm deines Handys hinzufügen und wie eine App öffnen. Nutze ein Tool einmal mit Internet, danach funktioniert es auch offline.',
    installHow: 'So installierst du sie (auf Englisch)',
    whyTitle: `Warum ${NAME}`,
    why: [
      ['lock', 'Völlig privat', 'Alles passiert in deinem Browser. Nichts wird hochgeladen, also sieht niemand sonst deine Dateien.'],
      ['bolt', 'Kein Warten', 'Kein Upload und keine Download-Warteschlange. Ein Song dauert meist nur ein paar Sekunden. Lange Videos brauchen etwas länger.'],
      ['phone', 'Handy oder PC', 'Funktioniert in Safari, Chrome, Edge und Firefox. Du kannst es auch auf deinem Startbildschirm installieren.'],
      ['sparkle', 'Kostenlos', 'Kein Konto und nichts wird deinem Audio hinzugefügt. Nutze es, so oft du willst.'],
    ],
  },
  tools: {
    'video-to-mp3': { title: 'Video zu MP3', path: 'de/video-zu-mp3', blurb: 'Hol den Ton aus einem MP4-, MOV- oder WebM-Video.' },
    'ringtone-maker': { title: 'Klingelton erstellen', path: 'de/klingelton-erstellen', blurb: 'Mach aus einem Teil eines Songs einen Klingelton für iPhone oder Android.' },
    'audio-cutter': { title: 'Audio schneiden', path: 'de/audio-schneiden', blurb: 'Kürze einen Song oder schneide ein Stück aus der Mitte heraus.' },
    'audio-converter': { title: 'Audio-Konverter', path: 'de/audio-konverter', blurb: 'Wandle zwischen MP3, WAV, M4A, OGG und FLAC um.' },
    'audio-joiner': { title: 'Audio zusammenfügen', blurb: 'Füge mehrere Songs oder Clips zu einer Datei zusammen.' },
    'noise-remover': { title: 'KI-Rauschentfernung', blurb: 'Entferne Hintergrundgeräusche aus Sprachaufnahmen.' },
    'slowed-reverb': { title: 'Slowed + Reverb', blurb: 'Mach eine langsame Version eines Songs mit Hall.' },
    'vocal-remover': { title: 'Gesang entfernen', blurb: 'Entferne den Gesang für einen Karaoke-Track.' },
    '8d-audio': { title: '8D-Audio', blurb: 'Klang, der von einem Ohr zum anderen wandert. Mit Kopfhörern.' },
    'bass-booster': { title: 'Bass Booster', blurb: 'Gib jedem Song mehr Bass.' },
    'volume-booster': { title: 'Lautstärke erhöhen', blurb: 'Mach leise Aufnahmen lauter.' },
    'reverse-audio': { title: 'Audio rückwärts', blurb: 'Spiel jeden Sound rückwärts ab.' },
    'speed-up-audio': { title: 'Audio beschleunigen', blurb: 'Mach einen Song oder eine Sprachnachricht schneller, bei gleicher Tonhöhe.' },
    'slow-down-audio': { title: 'Audio verlangsamen', blurb: 'Spiel alles langsamer ab, ohne tiefe Stimme.' },
    'pitch-changer': { title: 'Tonhöhe ändern', blurb: 'Ändere die Tonart eines Songs, ohne das Tempo zu ändern.' },
    'nightcore-maker': { title: 'Nightcore Maker', blurb: 'Schneller und höher, der klassische Nightcore-Sound.' },
    'remove-silence': { title: 'Stille entfernen', blurb: 'Schneide lange Pausen aus einer Aufnahme heraus.' },
    'fade-in-fade-out': { title: 'Ein- und Ausblenden', blurb: 'Gib jedem Song einen sanften Anfang und ein sanftes Ende.' },
    'voice-changer': { title: 'Stimmenverzerrer', path: 'de/stimmenverzerrer', blurb: 'Chipmunk, tiefe Stimme, Roboter, Monster und mehr.' },
    'audio-splitter': { title: 'Audio aufteilen', blurb: 'Teile einen Song oder eine Aufnahme in gleiche Teile.' },
    'voice-recorder': { title: 'Diktiergerät', blurb: 'Nimm deine Stimme auf und speichere sie als MP3.' },
    'audio-to-video': { title: 'Song zu Video', path: 'de/mp3-zu-mp4', blurb: 'Mach aus einem Song ein MP4 für TikTok und Reels.' },
  },
  pages: [
    {
      key: 'home', path: 'de',
      title: `MP3 schneiden, Klingeltöne erstellen & Audio umwandeln | ${NAME}`,
      description: 'Schneide Songs, erstelle Klingeltöne für iPhone und Android, füge Effekte hinzu und wandle Videos in MP3 um. Kostenlos, deine Dateien bleiben auf deinem Gerät.',
      h1: 'Songs schneiden, Klingeltöne erstellen und Effekte hinzufügen, <em>im Browser</em>',
      lead: 'Kostenlose Audio-Tools für Handy und Computer. Deine Dateien werden nie hochgeladen. Wähle ein Tool, um loszulegen.',
      badges: ['22 kostenlose Tools', 'KI-Rauschentfernung', 'Ohne Upload', 'Ohne Anmeldung'],
      home: true,
      body: (L) => `
  <div class="section prose">
    <h2>Effekte in jedem Tool</h2>
    <p>Jedes Tool hat ein Feld <strong>Effekte und Filter</strong>. Du kannst sanftes Ein- und Ausblenden, Lautstärke, Tempo, Tonhöhe, Bass, Höhen und Hall einstellen oder 8D-Audio, KI-Rauschentfernung, Gesang entfernen und mehr einschalten. Schnelleinstellungen wie <em>Slowed + Reverb</em>, <em>Nightcore</em> und <em>Bass Boost</em> stellen alles mit einem Tippen ein.</p>
    <p>Eine zweite Wellenform zeigt, was deine Effekte bewirken, während du die Regler bewegst, und <strong>Mit Effekten abspielen</strong> spielt das Ergebnis ab, bevor du es speicherst.</p>
  </div>
  ${L.WHY}
  ${L.INSTALL}
  <div class="section prose">
    <h2>So funktioniert es</h2>
    <p>Bei den meisten Konverter-Seiten musst du deine Datei hochladen, warten und sie wieder herunterladen. ${NAME} nutzt FFmpeg, die Audio-Engine vieler Desktop-Programme, direkt in deinem Browser. Deine Songs, Sprachnachrichten und Videos bleiben die ganze Zeit auf deinem Gerät. Es gibt keine Pop-ups und keine falschen Download-Buttons. Die Seite ist kostenlos, weil sie ein paar Anzeigen zeigt, die immer als solche gekennzeichnet sind.</p>
  </div>`,
      faq: [
        ['Ist MeloCut kostenlos?', 'Ja. Alle Tools sind kostenlos und werden durch ein paar gekennzeichnete Anzeigen finanziert. Du musst dich nicht anmelden und es gibt kein Wasserzeichen.'],
        ['Werden meine Dateien irgendwo hochgeladen?', 'Nein. Die gesamte Verarbeitung passiert in deinem Browser, auf deinem eigenen Gerät.'],
        ['Funktioniert es auf iPhone und Android?', 'Ja. Es funktioniert in Safari, Chrome, Firefox und Edge, auf Handys, Tablets und Computern.'],
        ['Welche Dateitypen kann ich öffnen?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP und die meisten anderen Audio- und Videoformate.'],
        ['Kann ich MeloCut als App installieren?', 'Ja. Füge es in Safari oder Chrome zum Startbildschirm hinzu. Es öffnet sich im Vollbild, und Tools, die du schon benutzt hast, funktionieren auch offline.'],
        ['Nutzt MeloCut KI?', 'Die Rauschentfernung nutzt RNNoise, ein kleines neuronales Netz, das Stimmen von Hintergrundgeräuschen trennt. Es läuft auf deinem Gerät. Die anderen Effekte sind normale Audiobearbeitung.'],
      ],
    },
    {
      key: 'cutter', path: 'de/audio-schneiden', tool: 'cutter', crumb: 'Tools',
      title: `MP3 schneiden online: Audio & Songs kostenlos kürzen | ${NAME}`,
      description: 'MP3 und andere Audiodateien online schneiden. Behalte einen Teil oder entferne ein Stück, blende ein und aus und speichere als MP3, M4A, WAV, OGG oder FLAC.',
      h1: '<em>Audio schneiden</em>: MP3 und Songs kürzen',
      lead: 'Schneide Anfang und Ende eines Songs ab oder entferne einen Teil aus der Mitte. Füge Ein- und Ausblendungen hinzu und speichere im Format, das du brauchst.',
      badges: ['Teil behalten oder entfernen', 'Sanft ein- und ausblenden', 'MP3, M4A, WAV, OGG, FLAC'],
      steps: [
        ['Öffne dein Audio', 'Wähle eine MP3-, WAV-, M4A- oder eine andere Audio- oder Videodatei.'],
        ['Wähle den Teil aus', 'Zieh die Regler über die Wellenform oder gib die genauen Start- und Endzeiten ein.'],
        ['Behalten oder entfernen', 'Wähle Auswahl behalten oder Auswahl entfernen, dann Schneiden und speichern und Herunterladen.'],
      ],
      content: `
    <h2>Schneide genau dort, wo du willst</h2>
    <p>Die Wellenform zeigt, wo die Musik laut oder leise ist. Zieh die Regler genau an die richtige Stelle und tippe auf Original abspielen, um vor dem Speichern reinzuhören. Für exakte Schnitte gibst du die Zeiten selbst ein, zum Beispiel <code>1:23.5</code>.</p>
    <h3>Etwas aus der Mitte entfernen</h3>
    <p>Wechsle zu <strong>Auswahl entfernen</strong>, um ein Intro, eine lange Pause, einen Versprecher oder eine Werbung zu löschen. Die beiden übrigen Teile werden automatisch zusammengefügt.</p>
    <h3>Keine weitere Qualität verlieren</h3>
    <p>Wähle <strong>WAV</strong> oder <strong>FLAC</strong>, wenn du die Datei noch weiter bearbeiten willst: Beide fügen keinen Kompressionsverlust hinzu. WAV wird mit 16 Bit gespeichert, in derselben Qualität wie eine CD.</p>
    <h3>Ideen für deine Schnitte</h3>
    <ul>
      <li><strong>Klingelton</strong>: Schneide etwa 30 Sekunden aus dem Refrain aus oder nutze <a href="/de/klingelton-erstellen/">Klingelton erstellen</a>, das ihn direkt für iPhone oder Android fertig macht.</li>
      <li><strong>Status, Reels und TikTok</strong>: Behalte nur den besten Teil des Songs und blende am Ende aus.</li>
      <li><strong>Sprachnachrichten und Vorlesungen</strong>: Entferne die Stille am Anfang oder ein überflüssiges Stück.</li>
      <li><strong>Ton aus einem Video</strong>: Öffne das Video direkt oder hol dir den Ton mit <a href="/de/video-zu-mp3/">Video zu MP3</a>.</li>
    </ul>
    <h3>Auf dem Handy, ohne etwas zu installieren</h3>
    <p>Funktioniert im Browser auf Android und iPhone. Deine Datei wird auf deinem Gerät verarbeitet und nie auf einen Server hochgeladen, also auch für private Aufnahmen geeignet.</p>`,
      faq: [
        ['Wie schneide ich eine MP3?', 'Öffne die MP3, zieh die Regler auf den gewünschten Teil, wähle Auswahl behalten und tippe auf Schneiden und speichern, dann auf Herunterladen.'],
        ['Kann ich einen Teil aus der Mitte entfernen?', 'Ja. Wähle den Teil aus, den du nicht willst, und dann Auswahl entfernen.'],
        ['Verschlechtert Schneiden die Qualität?', 'Wähle MP3 mit 320 kbps, damit es dem Original sehr nahe kommt, oder WAV oder FLAC, um keinen Kompressionsverlust hinzuzufügen.'],
        ['Ist Audio schneiden hier kostenlos?', 'Ja. Keine Anmeldung, kein Wasserzeichen und keine Begrenzung der Schnitte.'],
        ['Kann ich Audio auf dem Handy schneiden?', 'Ja. Es funktioniert im Browser auf Android und iPhone, ohne App-Installation.'],
        ['Funktioniert es offline?', 'Ja, nachdem du ein Tool einmal mit Internet genutzt hast. Die Audio-Engine bleibt dann auf deinem Gerät gespeichert.'],
      ],
    },
    {
      key: 'video', path: 'de/video-zu-mp3', tool: 'video-to-mp3', crumb: 'Tools',
      title: `Video in MP3 umwandeln: kostenlos und online | ${NAME}`,
      description: 'Wandle MP4, MOV, WebM und andere Videos im Browser in MP3 um. Bis 320 kbps, ohne Upload und ohne Anmeldung. Funktioniert auf iPhone und Android.',
      h1: '<em>Video in MP3</em> umwandeln',
      lead: 'Hol den Ton aus jedem Video und speichere ihn als MP3, M4A oder WAV. Alles läuft auf deinem Gerät, deshalb geht es auch bei großen Videos schnell.',
      badges: ['Bis 320 kbps', 'MP4, MOV, WebM, MKV', 'Ohne Upload'],
      steps: [
        ['Wähle dein Video', 'Tippe oben auf das Feld und wähle ein Video oder zieh es hinein.'],
        ['Kürze es, wenn du willst', 'Behalte den ganzen Ton oder zieh über die Wellenform, um nur einen Teil zu behalten.'],
        ['Konvertieren und herunterladen', 'Wähle MP3 und eine Qualität, tippe auf Konvertieren und dann auf Herunterladen.'],
      ],
      content: `
    <h2>Den Ton aus einem Video holen</h2>
    <p>Du hast ein Konzert, eine Vorlesung oder etwas Lustiges gefilmt und brauchst nur den Ton? Öffne das Video hier und speichere den Ton als MP3, um ihn im Auto, in einer Musik-App oder sonst wo zu hören.</p>
    <h3>Welche Videos funktionieren?</h3>
    <p>MP4, MOV (das Format, in dem das iPhone filmt), WebM, MKV, AVI und 3GP. Wenn dein Browser die Datei öffnen kann, klappt es fast immer.</p>
    <h3>Welche Qualität soll ich wählen?</h3>
    <p>Nimm <strong>320 kbps</strong> für Musik. <strong>128 kbps</strong> reicht für Sprache und ergibt viel kleinere Dateien. Wähle <strong>WAV</strong>, wenn du den Ton später bearbeiten willst.</p>
    <h3>Große Videos</h3>
    <p>Die Größengrenzen hängen von deinem Gerät und Browser ab. Ein Computer schafft viel größere Dateien als ein Handy, und MeloCut nimmt keine Dateien über 1 GB an. Kürze lange Videos zuerst oder nimm einen Computer.</p>`,
      faq: [
        ['Wie wandle ich eine MP4 in MP3 um?', 'Öffne die MP4 oben, wähle MP3 und eine Qualität, tippe auf Konvertieren und dann auf Herunterladen. Das dauert ein paar Sekunden.'],
        ['Kann ich iPhone-Videos umwandeln?', 'Ja. Wähle das Video aus Fotos oder Dateien, es wird wie jedes andere umgewandelt.'],
        ['Gibt es eine Größenbeschränkung?', 'Die Größengrenzen hängen von deinem Gerät und Browser ab. Ein Computer schafft viel größere Dateien als ein Handy, und MeloCut nimmt keine Dateien über 1 GB an. Kürze lange Videos zuerst oder nimm einen Computer.'],
        ['Kann ich YouTube-Videos umwandeln?', 'MeloCut arbeitet mit Dateien auf deinem Gerät. Es lädt keine Videos von YouTube oder anderen Seiten herunter.'],
      ],
    },
    {
      key: 'ringtone', path: 'de/klingelton-erstellen', tool: 'ringtone', crumb: 'Tools',
      title: `Klingelton erstellen für iPhone und Android, gratis | ${NAME}`,
      description: 'Erstelle einen Klingelton aus jedem Song. Wähle den besten Teil, blende ein und aus und speichere als M4R fürs iPhone oder MP3 für Android. Kostenlos, ohne App.',
      h1: '<em>Klingelton erstellen</em> für iPhone und Android',
      lead: 'Wähle deinen Lieblingsteil eines Songs und speichere ihn als Klingelton fürs iPhone (M4R) oder für Android (MP3).',
      badges: ['M4R fürs iPhone', 'MP3 für Android', 'Sanft ein- und ausblenden'],
      steps: [
        ['Wähle einen Song', 'Öffne einen beliebigen Song oder ein Video von deinem Gerät.'],
        ['Wähle deinen Lieblingsteil', 'Zieh über die Wellenform, um bis zu 40 Sekunden auszuwählen. Tippe zum Prüfen auf Original abspielen.'],
        ['Lade den Klingelton herunter', 'Wähle M4R fürs iPhone oder MP3 für Android, dann Klingelton erstellen und Herunterladen.'],
      ],
      content: `
    <h2>Den Klingelton aufs Handy bringen</h2>
    <h3>iPhone</h3>
    <p>Mit Computer: Lade die <strong>M4R</strong>-Datei herunter, schließ dein iPhone an und zieh die Datei im Finder (Mac) oder in iTunes (Windows) darauf. Danach erscheint sie unter <em>Einstellungen → Töne &amp; Haptik → Klingelton</em>. Ohne Computer: Öffne die Datei in <strong>GarageBand</strong> auf deinem iPhone und nutze <em>Teilen → Klingelton</em>.</p>
    <h3>Android</h3>
    <p>Lade die <strong>MP3</strong> herunter, geh zu <em>Einstellungen → Töne und Vibration → Klingelton</em> und wähle sie aus. Auf manchen Handys musst du zuerst auf „+“ oder „Klingelton hinzufügen“ tippen.</p>
    <h3>Ein paar Tipps</h3>
    <p>Starte kurz vor dem Refrain, halte den Klingelton zwischen 20 und 30 Sekunden und lass die Blenden drin, damit er nicht abrupt beginnt oder endet.</p>`,
      faq: [
        ['Wie lang darf ein Klingelton sein?', 'Unter 30 Sekunden, wenn du ihn über die App Dateien auf dem iPhone einstellst, und bis zu 40 Sekunden mit GarageBand oder einem Computer. MeloCut wählt am Anfang 29 Sekunden aus und begrenzt deine Auswahl auf 40.'],
        ['Was ist eine M4R-Datei?', 'Das Klingelton-Format des iPhone. Im Inneren ist es eine ganz normale M4A-Audiodatei (AAC).'],
        ['Kann ich einen Klingelton aus einem Video machen?', 'Ja. Öffne das Video, und MeloCut nutzt dessen Ton.'],
        ['Ist das kostenlos?', 'Ja, komplett kostenlos, ohne Wasserzeichen und ohne Anmeldung.'],
      ],
    },
    {
      key: 'converter', path: 'de/audio-konverter', tool: 'converter', crumb: 'Tools',
      title: `Audio Konverter: MP3, WAV, M4A, OGG und FLAC | ${NAME}`,
      description: 'Audio online kostenlos umwandeln: MP3, WAV, M4A, OGG, FLAC und OPUS. Ändere auch Tempo und Lautstärke. Ideal für WhatsApp-Sprachnachrichten. Ohne Upload.',
      h1: '<em>Audio-Konverter</em> für MP3, WAV, M4A, OGG und FLAC',
      lead: 'Wandle zwischen MP3, WAV, M4A, OGG und FLAC um. Öffnet auch Sprachnachrichten von WhatsApp und Telegram (OPUS).',
      badges: ['MP3, WAV, M4A, OGG, FLAC', 'Tempo und Lautstärke', 'Sprachnachrichten'],
      steps: [
        ['Öffne eine Datei', 'Jede Audio- oder Videodatei, auch .opus-Sprachnachrichten von WhatsApp.'],
        ['Wähle das Format', 'Wähle Ausgabeformat und Qualität. Füge Effekte hinzu, wenn du willst.'],
        ['Konvertieren und herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
      ],
      content: `
    <h2>Wandle fast jede Audiodatei um</h2>
    <p>${NAME} öffnet MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR und WMA und speichert im Format, das dein Handy, dein Auto oder deine App braucht.</p>
    <p>Öffne <strong>Effekte und Filter</strong>, wenn du zusätzlich ein- und ausblenden, Tempo oder Tonhöhe ändern, Bass oder Lautstärke anheben, Rauschen entfernen oder Hall hinzufügen willst.</p>
    <h3>Sprachnachrichten von WhatsApp und Telegram</h3>
    <p>Sprachnachrichten werden als <code>.opus</code>- oder <code>.ogg</code>-Dateien gespeichert, die viele Player nicht öffnen. Wandle sie in MP3 um, dann laufen sie überall.</p>
    <h3>Welches Format soll ich wählen?</h3>
    <p>MP3 funktioniert überall. M4A klingt bei gleicher Größe etwas besser. FLAC und WAV fügen keinen Kompressionsverlust hinzu, brauchen aber mehr Platz.</p>`,
      faq: [
        ['Kann ich mehrere Dateien auf einmal umwandeln?', 'Ja. Wähle mehrere Dateien aus oder leg sie zusammen ab, wähle das Format und tippe auf Alle konvertieren. Du kannst jede einzeln oder alle zusammen als ZIP herunterladen.'],
        ['Wie wandle ich eine WAV in MP3 um?', 'Öffne die WAV, wähle MP3 und eine Qualität und tippe auf Konvertieren und dann auf Herunterladen.'],
        ['Wie wandle ich eine WhatsApp-Sprachnachricht in MP3 um?', 'Speichere die Sprachnachricht (.opus) auf deinem Gerät, öffne sie hier, wähle MP3 und tippe auf Konvertieren.'],
        ['Was ist das beste Audioformat?', 'MP3 läuft überall. M4A klingt bei gleicher Größe etwas besser. FLAC und WAV behalten die Qualität, sind aber größer.'],
        ['Kann ich eine Slowed + Reverb-Version machen?', 'Ja. Tippe unter Effekte auf die Schnelleinstellung Slowed + Reverb.'],
      ],
    },
    {
      key: 'voice', path: 'de/stimmenverzerrer', tool: 'voice-changer', crumb: 'Tools',
      title: `Stimmenverzerrer kostenlos: Chipmunk, Roboter & mehr | ${NAME}`,
      description: 'Verändere deine Stimme kostenlos: Chipmunk, tiefe Stimme, Monster, Roboter, Alien, Telefon und Echo. Für Aufnahmen, Sprachnachrichten und Videos. Ohne Upload.',
      h1: '<em>Stimmenverzerrer</em>: Chipmunk, Roboter und tiefe Stimme',
      lead: 'Mach aus jeder Aufnahme, Sprachnachricht oder jedem Video einen Chipmunk, ein Monster, einen Roboter und mehr. Erst anhören, dann speichern.',
      badges: ['7 Stimmen', 'Vor dem Speichern anhören', 'Ohne Upload'],
      steps: [
        ['Öffne eine Aufnahme', 'Wähle eine Sprachnachricht, eine Aufnahme oder ein Video, oder tippe auf Mit dem Mikrofon aufnehmen und sprich etwas.'],
        ['Wähle eine Stimme', 'Chipmunk ist schon ausgewählt. Tippe auf Tiefe Stimme, Monster, Roboter, Alien, Telefon oder Echo und dann auf Mit Effekten abspielen.'],
        ['Speichere sie', 'Tippe auf Stimme ändern und dann auf Herunterladen. Teile sie oder nutze sie als Klingelton.'],
      ],
      content: `
    <h2>Die Stimmen</h2>
    <ol class="guide-steps">
      <li><strong>Chipmunk:</strong> hoch und quietschig, ohne das Audio zu beschleunigen.</li>
      <li><strong>Tiefe Stimme:</strong> tiefer und voller, wie in einem Kinotrailer.</li>
      <li><strong>Monster:</strong> sehr tief und mit einem düsteren Echo.</li>
      <li><strong>Roboter:</strong> eine flache, metallische Stimme.</li>
      <li><strong>Alien:</strong> etwas höher und mit einem seltsamen Vibrieren.</li>
      <li><strong>Telefon:</strong> dünn und eng, wie eine alte Leitung oder ein Walkie-Talkie.</li>
      <li><strong>Echo:</strong> als würdest du in einem riesigen Saal oder einer Höhle sprechen.</li>
    </ol>
    <p>Unter Effekte kannst du jede Stimme anpassen: Verschieb die Tonhöhe für eine höhere oder tiefere Stimme, füge Hall für mehr Raum hinzu oder schalte die KI-Rauschentfernung ein, wenn die Aufnahme rauscht.</p>
    <h2>Ideen</h2>
    <p>Streiche per Sprachnachricht, lustige Klingeltöne (öffne das Ergebnis in <a href="/de/klingelton-erstellen/">Klingelton erstellen</a>), Stimmen für TikTok oder deine echte Stimme in einem Video verstecken. Nutze nur Aufnahmen, für die du die Erlaubnis hast, und gib dich damit nicht als jemand anderes aus.</p>`,
      faq: [
        ['Ist der Stimmenverzerrer kostenlos?', 'Ja. Kostenlos, ohne Anmeldung, ohne Wasserzeichen, und deine Aufnahme wird nie hochgeladen.'],
        ['Kann ich die Stimme in einem Video ändern?', 'Ja. Öffne das Video, und MeloCut nutzt dessen Ton. Das Ergebnis ist eine Audiodatei (MP3, M4A, WAV, OGG oder FLAC).'],
        ['Kann ich direkt auf der Seite aufnehmen?', 'Ja. Tippe auf Mit dem Mikrofon aufnehmen, sprich und tippe dann auf Stopp. Die Aufnahme öffnet sich sofort und bleibt auf deinem Gerät.'],
        ['Wie mache ich eine Chipmunk-Stimme?', 'Öffne deine Aufnahme hier: Chipmunk ist schon ausgewählt. Tippe auf Mit Effekten abspielen, dann auf Stimme ändern und Herunterladen.'],
      ],
    },
    {
      key: 'a2v', path: 'de/mp3-zu-mp4', tool: 'audio-to-video', crumb: 'Tools',
      title: `MP3 in MP4 umwandeln: Song zu Video für TikTok | ${NAME}`,
      description: 'Mach aus einem Song oder einer Sprachnachricht ein Hochformat-MP4 mit animierter Wellenform, Titel und Cover. Direkt am Handy, kostenlos und ohne Upload.',
      h1: '<em>Song zu Video</em>: MP3 in MP4 für TikTok und Reels',
      lead: 'Mach aus jedem Song oder jeder Aufnahme ein Hochformat-Video mit bewegter Wellenform, Titel und Cover. Fertig für TikTok, Reels, Shorts und den WhatsApp-Status.',
      badges: ['Hochformat 9:16', 'Animierte Wellenform', 'Ohne Upload'],
      steps: [
        ['Öffne einen Song', 'Wähle eine MP3, eine Sprachnachricht oder eine andere Audiodatei. Die ersten 30 Sekunden sind ausgewählt; zieh, um einen anderen Teil zu wählen, bis zu 60 Sekunden.'],
        ['Titel und Stil hinzufügen', 'Der Titel kommt aus dem Dateinamen; ändere ihn, wenn du willst. Wähle einen Hintergrundstil oder füge ein Coverbild hinzu.'],
        ['Erstelle das Video', 'Tippe auf Video erstellen und dann auf Herunterladen. Lade das MP4 hoch, wo du willst.'],
      ],
      content: `
    <h2>So sieht das Video aus</h2>
    <p>Ein MP4 im Hochformat mit 720×1280 (9:16), mit deinem Cover oder einem Wellenform-Emblem, dem Titel, einer weißen Wellenform, die sich mit dem Ton bewegt, und einem Fortschrittsbalken. Unten steht ein kleiner Hinweis auf melocut.com.</p>
    <h2>Ideen</h2>
    <ol class="guide-steps">
      <li><strong>Einen Song auf Instagram oder TikTok teilen</strong>, wenn die App kein reines Audio erlaubt.</li>
      <li><strong>Ein Slowed + Reverb-Video:</strong> Öffne Effekte, tippe auf Slowed + Reverb, und das Video bekommt die langsame Version. Nightcore und 8D-Audio funktionieren auch.</li>
      <li><strong>Podcast-Clips oder Sprachnachrichten:</strong> Schalte die KI-Rauschentfernung für eine klare Stimme ein und poste die besten 60 Sekunden.</li>
      <li><strong>WhatsApp-Status:</strong> ein Song mit deinem eigenen Foto als Cover.</li>
    </ol>
    <h2>Warum bis zu 60 Sekunden?</h2>
    <p>Das Video entsteht auf deinem eigenen Gerät, es wird also nichts hochgeladen. Ein Video zu erstellen ist viel aufwendiger als Audio, deshalb gehen die Clips bis 60 Sekunden, so viel, wie Kurzvideo-Apps verlangen. Auf dem Handy dauert es etwas länger als am Computer.</p>
    <p>Nutze nur Musik, die du teilen darfst. Apps wie TikTok und Instagram können Videos mit geschützten Songs stummschalten.</p>`,
      faq: [
        ['Wie wandle ich eine MP3 in MP4 um?', 'Öffne die MP3 hier, füge einen Titel und einen Stil oder ein Cover hinzu und tippe auf Video erstellen. Du bekommst ein MP4 mit animierter Wellenform.'],
        ['Kann ich mein eigenes Foto nehmen?', 'Ja. Wähle ein Coverbild: Es erscheint in der Mitte und unscharf als Hintergrund.'],
        ['Hat es ein Wasserzeichen?', 'Unten im Video steht ein kleiner Hinweis auf melocut.com. So bleibt das Tool kostenlos.'],
        ['Funktioniert es auf dem iPhone?', 'Ja, in Safari. Das Erstellen dauert eine Weile, weil es auf deinem Gerät passiert: am Computer etwa so lange wie der Clip, auf dem Handy länger. Lass die Seite offen, bis es fertig ist.'],
      ],
    },
  ],
});
// The rest of the tools, conversions and guides live in de-more.mjs.
export default (NAME) => {
  const d = base(NAME);
  for (const [slug, path] of Object.entries(toolPaths)) d.tools[slug] = { ...d.tools[slug], path };
  d.pages.push(...more(NAME));
  return d;
};
