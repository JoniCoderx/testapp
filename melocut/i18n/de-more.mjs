// More German pages: tools, conversions and guides. Each `key` matches the English page.
// Informal "du"; button names match the German interface strings in i18n/ui_de.py.
// Phone menu names follow the German iOS and Samsung (One UI) interfaces.
export const toolPaths = {
  'slowed-reverb': 'de/slowed-reverb',
  'vocal-remover': 'de/gesang-entfernen',
  '8d-audio': 'de/8d-audio',
  'bass-booster': 'de/bass-booster',
  'nightcore-maker': 'de/nightcore',
  'noise-remover': 'de/rauschen-entfernen',
  'audio-joiner': 'de/audio-zusammenfuegen',
  'volume-booster': 'de/lautstaerke-erhoehen',
  'reverse-audio': 'de/audio-rueckwaerts',
  'speed-up-audio': 'de/audio-beschleunigen',
  'slow-down-audio': 'de/audio-verlangsamen',
  'pitch-changer': 'de/tonhoehe-aendern',
  'remove-silence': 'de/stille-entfernen',
  'fade-in-fade-out': 'de/ein-ausblenden',
};

export default (NAME) => [
  // ---------- Tools ----------
  {
    key: 'slowed', path: 'de/slowed-reverb', tool: 'slowed-reverb', crumb: 'Tools',
    title: `Slowed + Reverb online: Songs langsam mit Hall | ${NAME}`,
    description: 'Mach aus jedem Song eine Slowed + Reverb-Version. Stell Tempo, Tonhöhe und Hall ein, hör vorher rein und lade eine MP3 herunter. Kostenlos, ohne Wasserzeichen.',
    h1: '<em>Slowed + Reverb</em> Songs erstellen',
    lead: 'Erstelle die langsame Version mit Hall von jedem Song. Die Einstellungen sind schon fertig, und du kannst Tempo, Tonhöhe und Hall ändern.',
    badges: ['Tempo und Tonhöhe', 'Hall', 'Auch Nightcore'],
    steps: [
      ['Öffne einen Song', 'Wähle einen beliebigen Song von deinem Gerät.'],
      ['Pass ihn an', 'Tempo 0,85× und Hall sind schon eingestellt. Ändere sie und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere ihn als MP3.'],
    ],
    content: `
    <h2>Gute Einstellungen für den Anfang</h2>
    <p>Die meisten Slowed + Reverb-Versionen nutzen ein Tempo von <strong>0,80 bis 0,90×</strong>, eine <strong>1 bis 3 Halbtöne tiefere</strong> Tonhöhe und rund <strong>35 bis 55 %</strong> Hall. Für eine schnellere Version tippst du auf die Schnelleinstellung <em>Nightcore</em> oder nutzt den <a href="/de/nightcore/">Nightcore Maker</a>.</p>
    <h3>Damit es besser klingt</h3>
    <ul>
      <li>Klingt die Stimme zu tief, stell die Tonhöhe einen Halbton höher.</li>
      <li>Schalte die <strong>Auto-Lautstärke</strong> ein, damit der Song nicht leiser ist als das Original.</li>
      <li>Du willst ihn für TikTok oder Reels? Mach mit <a href="/de/mp3-zu-mp4/">Song zu Video</a> ein Video daraus: Öffne Effekte und tippe auf Slowed + Reverb.</li>
    </ul>`,
    faq: [
      ['Wie mache ich einen Song slowed + reverb?', 'Öffne den Song hier. Der Effekt ist schon eingestellt: Tippe auf Mit Effekten abspielen, ändere, was du willst, und dann auf Konvertieren und Herunterladen.'],
      ['Kann ich auch eine schnellere Version machen?', 'Ja. Tippe auf die Schnelleinstellung Nightcore oder erhöhe Tempo und Tonhöhe.'],
      ['Ist das kostenlos?', 'Ja. Ohne Anmeldung, ohne Wasserzeichen, und der Song wird auf keinen Server hochgeladen.'],
    ],
  },
  {
    key: 'karaoke', path: 'de/gesang-entfernen', tool: 'karaoke', crumb: 'Tools',
    title: `Gesang entfernen: Karaoke-Version gratis erstellen | ${NAME}`,
    description: 'Entferne den Gesang aus Songs und mach daraus Karaoke-Tracks und Instrumentals. Kostenlos, privat und schnell. Nichts wird hochgeladen.',
    h1: '<em>Gesang entfernen</em> für Karaoke',
    lead: 'Entferne den Sänger aus einem Stereo-Song und bekomm eine Karaoke-Version. Das Tool löscht, was in der Mitte des Mixes liegt, es ist also keine KI-Trennung: Bass und Schlagzeug werden auch etwas leiser.',
    badges: ['Karaoke', 'Stereo-Songs', 'Vor dem Speichern anhören'],
    steps: [
      ['Öffne einen Song', 'Wähle einen Stereo-Song von deinem Gerät.'],
      ['Hör erst rein', 'Gesang entfernen ist schon eingeschaltet. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere deinen Karaoke-Track.'],
    ],
    content: `
    <h2>So funktioniert es</h2>
    <p>Bei den meisten Studio-Songs liegt der Leadgesang in der Mitte des Stereo-Mixes, während die Instrumente links und rechts verteilt sind. Gesang entfernen löscht, was in der Mitte liegt, und lässt den Rest stehen.</p>
    <h3>Was es nicht kann</h3>
    <p>Bass und Schlagzeug liegen oft auch in der Mitte und werden deshalb leiser. Der Hall der Stimme kann im Hintergrund bleiben. Live-Aufnahmen und Mono-Dateien funktionieren nicht, und ${NAME} sagt dir Bescheid, wenn eine Datei mono ist. Wenn du unter Effekte den <strong>Bass</strong> anhebst, kommt ein Teil der tiefen Töne zurück.</p>`,
    faq: [
      ['Funktioniert das mit jedem Song?', 'Am besten klappt es bei Studio-Songs mit dem Gesang in der Mitte. Mono-Aufnahmen lassen sich so nicht trennen.'],
      ['Warum ist der Bass leiser?', 'Der Bass liegt meist auch in der Mitte des Mixes. Heb den Bass-Regler an, um ihn zurückzuholen.'],
    ],
  },
  {
    key: '8d', path: 'de/8d-audio', tool: '8d', crumb: 'Tools',
    title: `8D-Audio Konverter online: Songs in 8D umwandeln | ${NAME}`,
    description: 'Wandle jeden Song in 8D-Audio um, das um deinen Kopf kreist. Mit Kopfhörern anhören und als MP3 herunterladen. Kostenlos und ganz ohne Upload.',
    h1: '<em>8D-Audio</em> Konverter',
    lead: 'Lass die Musik um deinen Kopf kreisen. Setz Kopfhörer auf, hör rein und lade sie herunter.',
    badges: ['Mit Kopfhörern', 'Hall einstellbar', 'MP3 oder WAV'],
    steps: [
      ['Öffne einen Song', 'Wähle einen beliebigen Song von deinem Gerät.'],
      ['Setz Kopfhörer auf', 'Tippe auf Mit Effekten abspielen, um zu hören, wie sich der Klang bewegt.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere deine 8D-Version.'],
    ],
    content: `
    <h2>Was ist 8D-Audio?</h2>
    <p>8D-Audio lässt den Klang langsam von einem Ohr zum anderen wandern und fügt etwas Hall hinzu, sodass die Musik um dich herum zu kreisen scheint. Du brauchst Kopfhörer oder Earbuds, um es zu merken.</p>
    <h3>Ideen</h3>
    <p>Kombinier es mit einer langsamen Version (Slowed + Reverb) für einen noch intensiveren Effekt, oder mach mit <a href="/de/mp3-zu-mp4/">Song zu Video</a> ein Video daraus, um es auf TikTok zu teilen.</p>`,
    faq: [
      ['Warum höre ich den 8D-Effekt nicht?', 'Du brauchst Kopfhörer oder Earbuds. Über einen einzelnen Lautsprecher verschwindet der Effekt.'],
      ['Ist das kostenlos?', 'Ja, komplett kostenlos, ohne Anmeldung und ohne Wasserzeichen.'],
    ],
  },
  {
    key: 'bass', path: 'de/bass-booster', tool: 'bass', crumb: 'Tools',
    title: `Bass Booster online: Bass in MP3 verstärken, gratis | ${NAME}`,
    description: 'Verstärke den Bass jedes Songs online. Wähle wie stark, hör vorher rein und lade herunter. Ein Limiter verhindert Verzerrung. Kostenlos und ohne Upload.',
    h1: '<em>Bass Booster</em>',
    lead: 'Gib jedem Song einen tieferen Bass mit mehr Wumms. Wähle, wie stark, hör rein und lade herunter.',
    badges: ['Bis +15 dB', 'Ohne Verzerrung', 'Vor dem Speichern anhören'],
    steps: [
      ['Öffne einen Song', 'Wähle einen beliebigen Song oder ein Video.'],
      ['Wähle, wie stark', 'Der Bass-Regler startet bei +10 dB. Ändere ihn und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere.'],
    ],
    content: `
    <h2>Mehr Bass, ohne dass es kratzt</h2>
    <p>${NAME} hebt die tiefen Frequenzen um etwa 110 Hz an und gleicht die Lautstärke danach mit einem Limiter aus. So drückt der Bass stärker, ohne zu verzerren. Auf Handylautsprechern klingen +6 bis +10 dB meist am besten.</p>`,
    faq: [['Wie stark sollte ich den Bass anheben?', 'Fang mit +8 bis +10 dB an. Mehr als +12 dB ist sehr stark und passt besser zu Kopfhörern oder der Anlage im Auto.']],
  },
  {
    key: 'nightcore', path: 'de/nightcore', tool: 'converter', crumb: 'Tools', fx: { speed: 1.2, pitch: 3 }, suffix: ' (Nightcore)',
    note: 'Nightcore ist schon eingestellt: Tempo 1,20× und 3 Halbtöne höher. Tippe auf Mit Effekten abspielen, um es anzuhören.',
    title: `Nightcore Maker online: Songs schneller machen | ${NAME}`,
    description: 'Mach aus jedem Song Nightcore oder eine Sped-up-Version: schneller und höher. Stell Tempo und Tonhöhe ein, hör rein und lade eine MP3 herunter. Kostenlos.',
    h1: '<em>Nightcore</em> Maker für Sped-up-Songs',
    lead: 'Mach die schnelle, hohe und energiegeladene Version von jedem Song. Die Einstellungen sind schon fertig, und du kannst sie feinjustieren.',
    badges: ['Tempo und Tonhöhe', 'Vor dem Speichern anhören', 'MP3 oder WAV'],
    steps: [
      ['Öffne einen Song', 'Wähle einen beliebigen Song von deinem Gerät.'],
      ['Pass ihn an', '1,20× und +3 Halbtöne sind schon eingestellt. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere ihn als MP3.'],
    ],
    content: `
    <h2>Der Nightcore-Sound</h2>
    <p>Nightcore-Versionen spielen den Song <strong>15 bis 30 % schneller</strong> ab und heben die Tonhöhe um <strong>2 bis 4 Halbtöne</strong> an. Das ergibt diesen hellen, energiegeladenen Klang. Die Sped-up-Versionen auf TikTok und Instagram nutzen dieselbe Idee, meist etwas sanfter.</p>
    <h3>Gute Einstellungen für den Anfang</h3>
    <ul>
      <li><strong>Klassisches Nightcore:</strong> Tempo 1,25× und +4 Halbtöne.</li>
      <li><strong>Sped up (TikTok-Stil):</strong> 1,15× und +2 Halbtöne.</li>
      <li><strong>Sanft:</strong> 1,10× und +1 Halbton, für langsame Balladen.</li>
    </ul>
    <p>Gib etwas <strong>Bass</strong> dazu, damit es nicht dünn klingt, oder mach das Gegenteil mit <a href="/de/slowed-reverb/">Slowed + Reverb</a>.</p>`,
    faq: [
      ['Was ist der Unterschied zwischen Nightcore und Sped up?', 'Beides ist schneller und höher. Nightcore ist meist extremer. Senk das Tempo auf etwa 1,1× für eine sanftere Sped-up-Version.'],
      ['Kann ich die originale Tonhöhe behalten?', 'Ja. Stell die Tonhöhe auf 0, dann ändert sich nur das Tempo.'],
    ],
  },
  {
    key: 'denoise', path: 'de/rauschen-entfernen', tool: 'denoise', crumb: 'Tools',
    title: `Hintergrundgeräusche entfernen mit KI, kostenlos | ${NAME}`,
    description: 'Entferne Hintergrundgeräusche aus Sprachaufnahmen, Sprachnachrichten und Videos mit KI. Läuft auf deinem Gerät, nichts wird hochgeladen. Kostenlos.',
    h1: 'Rauschen entfernen <em>mit KI</em>',
    lead: 'Entferne Wind, Verkehr, Ventilatoren und Brummen aus Sprachaufnahmen. Ein kleines neuronales Netz erledigt das direkt auf deinem Gerät.',
    badges: ['Neuronales Netz (RNNoise)', 'Sprachnachrichten und Podcasts', 'Ohne Upload'],
    steps: [
      ['Öffne deine Aufnahme', 'Eine Sprachnachricht, ein Interview, eine Vorlesung oder ein Video.'],
      ['Hör dir die saubere Version an', 'Die KI-Rauschentfernung ist schon eingeschaltet. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>So funktioniert der KI-Teil</h2>
    <p>${NAME} nutzt <strong>RNNoise</strong>, ein neuronales Netz, das darauf trainiert ist, Stimme und Hintergrundgeräusche zu unterscheiden. Das Modell ist etwa 300 KB groß und läuft in deinem Browser, private Aufnahmen verlassen also nie dein Handy oder deinen Computer.</p>
    <p>In unserem eigenen Test mit einer Stimme, die neben einem laufenden Ventilator aufgenommen wurde, sank das Rauschen in den Pausen zwischen den Wörtern um etwa 18 dB. Das klingt ungefähr dreimal leiser, während die Stimme ihre Lautstärke behielt. Das Ergebnis hängt von der Aufnahme ab, also tippe auf Mit Effekten abspielen und prüf es selbst.</p>
    <h3>Für das beste Ergebnis</h3>
    <p>Das Tool ist für Sprache gemacht: Podcasts, Interviews, Sprachnachrichten und Anrufe. Bei Musik kann es auch Instrumente entfernen, nimm für Songs deshalb <strong>Rauschen mindern</strong>. Hier sind außerdem <strong>Auto-Lautstärke</strong> und <strong>Stille entfernen</strong> eingeschaltet, für ein saubereres Ergebnis.</p>`,
    faq: [
      ['Ist das wirklich KI?', 'Ja. Es nutzt RNNoise, ein neuronales Netz zum Säubern von Stimmen. Das Modell wird beim ersten Mal geladen und läuft dann auf deinem Gerät.'],
      ['Funktioniert das mit Musik?', 'Es ist für Stimmen gedacht. Bei Songs kann es Instrumente entfernen, nimm für Musik deshalb Rauschen mindern.'],
      ['Wird meine Aufnahme hochgeladen?', 'Nein. Alles läuft in deinem Browser.'],
    ],
  },
  {
    key: 'joiner', path: 'de/audio-zusammenfuegen', tool: 'joiner', crumb: 'Tools',
    title: `Audio zusammenfügen: MP3 online verbinden, gratis | ${NAME}`,
    description: 'Füge MP3, M4A, WAV und andere Audiodateien zu einer Datei zusammen. Reihenfolge ändern, anhören, Überblendung setzen, Lautstärke angleichen. Gratis und privat.',
    h1: '<em>Audio zusammenfügen</em>: Songs zu einer Datei verbinden',
    lead: 'Füge mehrere Songs, Sprachnachrichten oder Clips zu einer Datei zusammen. Hör dir jeden an, ändere die Reihenfolge und setz eine Überblendung.',
    badges: ['2 oder mehr Dateien', 'Überblendung', 'Angeglichene Lautstärke'],
    steps: [
      ['Füge deine Dateien hinzu', 'Wähle zwei oder mehr Audio- oder Videodateien. Du kannst später weitere hinzufügen.'],
      ['Bring sie in Reihenfolge', 'Tippe auf ▶ zum Anhören, ordne sie mit den Pfeilen neu und stell die Überblendung ein oder schalte sie aus.'],
      ['Zusammenfügen, anhören, herunterladen', 'Tippe auf Dateien zusammenfügen, hör dir das Ergebnis an und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Mixe, Medleys und lange Aufnahmen</h2>
    <p>Stell einen Mix für eine Party zusammen, füge mehrere Sprachnachrichten zu einer Nachricht zusammen oder setz die Teile einer Aufnahme wieder zusammen. Die <strong>Überblendung</strong> lässt jeden Track in den nächsten übergehen, und <strong>Lautstärke angleichen</strong> sorgt dafür, dass leise Dateien nicht viel schwächer klingen als laute.</p>
    <h3>Verschiedene Formate, kein Problem</h3>
    <p>Du kannst MP3, M4A, WAV, OGG, OPUS und Videos auf einmal mischen. ${NAME} bringt zuerst alle ins gleiche Format.</p>`,
    faq: [
      ['Wie viele Dateien kann ich zusammenfügen?', 'Zwei oder mehr. Es gibt keine feste Zahl: Wie viel du zusammenfügen kannst, hängt von deinem Gerät und Browser ab.'],
      ['Kann ich sie ohne Pause zusammenfügen?', 'Ja. Schalte die Überblendung aus, dann folgen sie direkt aufeinander.'],
      ['Kann ich Videos zusammenfügen?', 'Ja. MeloCut nimmt den Ton jedes Videos und fügt das Audio zusammen.'],
    ],
  },
  {
    key: 'volume', path: 'de/lautstaerke-erhoehen', tool: 'volume', crumb: 'Tools',
    title: `Lautstärke erhöhen: MP3 und Audio lauter machen | ${NAME}`,
    description: 'Mach leise MP3s, Sprachnachrichten und Videos lauter. Die Auto-Lautstärke gleicht alles ohne Verzerrung an. Kostenlos und ohne Upload, direkt im Browser.',
    h1: '<em>Lautstärke erhöhen</em> bei Audiodateien',
    lead: 'Mach leise Aufnahmen lauter und gleichmäßig laut, ohne Verzerrung.',
    badges: ['Bis 300 %', 'Auto-Lautstärke', 'Ohne Verzerrung'],
    steps: [
      ['Öffne deine Datei', 'Ein leiser Song, eine Sprachnachricht, eine Vorlesung oder ein Video.'],
      ['Wähle, wie viel lauter', 'Die Auto-Lautstärke ist schon eingeschaltet. Ändere den Lautstärke-Regler und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere.'],
    ],
    content: `
    <h2>Lauter, aber sauber</h2>
    <p>Die <strong>Auto-Lautstärke</strong> misst die ganze Datei und bringt sie auf eine ähnliche Lautstärke wie bei Spotify und YouTube, sodass leise Aufnahmen klar zu hören sind. Ein Limiter verhindert, dass die lautesten Stellen kratzen.</p>
    <h3>Wofür ist das gut?</h3>
    <p>Sprachnachrichten, die man kaum hört, Vorlesungen, die von weit hinten aufgenommen wurden, Videos mit sehr leisem Ton oder alte Songs, die neben neuen schwach klingen.</p>`,
    faq: [['Verursacht mehr Lautstärke Verzerrung?', 'Nein. Ein Limiter hält die Spitzen im Zaum, das Ergebnis klingt also lauter, ohne zu übersteuern.']],
  },
  {
    key: 'reverse', path: 'de/audio-rueckwaerts', tool: 'reverse', crumb: 'Tools',
    title: `Audio rückwärts abspielen: online und kostenlos | ${NAME}`,
    description: 'Spiel jeden Song, jede Sprachnachricht oder jeden Sound rückwärts ab. Erst anhören, dann als MP3 herunterladen. Kostenlos, schnell und ohne Upload.',
    h1: '<em>Audio rückwärts</em> abspielen',
    lead: 'Spiel jeden Sound, jede Stimme oder jeden Song rückwärts ab. Ideal für Challenges, Soundeffekte und die Suche nach „versteckten Botschaften“.',
    badges: ['Schnell', 'Jedes Format', 'Ohne Upload'],
    steps: [
      ['Öffne eine Datei', 'Jeder Song, jede Sprachnachricht oder jedes Video.'],
      ['Hör es dir an', 'Rückwärts ist schon eingeschaltet. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und speichere.'],
    ],
    content: `
    <h2>Ideen</h2>
    <p>Nimm dich auf, wie du etwas sagst, und dreh es um für die Rückwärts-Sprechen-Challenge, such nach „versteckten Botschaften“ in Songs oder erstelle umgekehrte Becken-Effekte für deine Musik. Gib etwas Hall dazu für den klassischen Reverse-Reverb-Sound.</p>
    <h3>Direkt hier aufnehmen</h3>
    <p>Tippe auf <strong>Mit dem Mikrofon aufnehmen</strong>, sprich deinen Satz und stopp die Aufnahme: Sie öffnet sich sofort, bereit zum Umdrehen.</p>`,
    faq: [
      ['Kann ich nur einen Teil des Songs umdrehen?', 'Ja. Zieh über die Wellenform, um den Teil zu wählen, und konvertiere dann.'],
      ['Ist das kostenlos?', 'Ja. Ohne Anmeldung, ohne Wasserzeichen, und das Audio wird auf keinen Server hochgeladen.'],
    ],
  },
  {
    key: 'speedup', path: 'de/audio-beschleunigen', tool: 'converter', crumb: 'Tools', fx: { speed: 1.25 }, suffix: ' (schneller)',
    note: 'Das Tempo steht auf 1,25×. Verschieb den Tempo-Regler, tippe auf Mit Effekten abspielen und dann auf Konvertieren.',
    title: `Audio beschleunigen, ohne die Tonhöhe zu ändern | ${NAME}`,
    description: 'Mach Songs, Podcasts oder Sprachnachrichten schneller, ohne Micky-Maus-Stimme. Wähle 1,1× bis 2×, hör rein und lade eine MP3 herunter. Gratis, ohne Upload.',
    h1: '<em>Audio beschleunigen</em>',
    lead: 'Mach einen Song, einen Podcast, eine Vorlesung oder eine Sprachnachricht schneller, und die Stimme behält ihre normale Tonhöhe.',
    badges: ['Bis 2×', 'Gleiche Tonhöhe', 'Vor dem Speichern anhören'],
    steps: [
      ['Öffne deine Datei', 'Jeder Song, jede Sprachnachricht, jeder Podcast oder jedes Video.'],
      ['Wähle das Tempo', 'Es steht schon auf 1,25×. Verschieb den Tempo-Regler und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Schneller, ohne Micky-Maus-Stimme</h2>
    <p>Spielst du ein Audio einfach schneller ab, steigt auch die Tonhöhe, und Stimmen klingen wie Zeichentrickfiguren. ${NAME} staucht stattdessen die Zeit: Das Audio wird kürzer, und jede Stimme und jede Note bleibt auf ihrer normalen Tonhöhe.</p>
    <h3>Welches Tempo wählen?</h3>
    <p><strong>1,25×</strong> spart ein Viertel der Zeit und klingt bei Sprache natürlich. <strong>1,5×</strong> ist beliebt für Vorlesungen und lange Sprachnachrichten. Über <strong>1,75×</strong> wird es schwer, der Stimme zu folgen. Für den Trend mit schnelleren Songs und höherer Stimme nimm den <a href="/de/nightcore/">Nightcore Maker</a>.</p>
    <h3>Noch kürzer</h3>
    <p>Schalte zusätzlich <strong>Stille entfernen</strong> ein, um die Pausen zu streichen, oder nutze <a href="/de/stille-entfernen/">Stille entfernen</a> separat.</p>`,
    faq: [
      ['Klingt die Stimme höher?', 'Nein. Die Tonhöhe bleibt gleich. Nur das Tempo ändert sich.'],
      ['Wie beschleunige ich eine Sprachnachricht?', 'Öffne sie hier, wähle das Tempo und tippe auf Konvertieren und Herunterladen. Die neue Datei ist kürzer und läuft überall.'],
    ],
  },
  {
    key: 'slowdown', path: 'de/audio-verlangsamen', tool: 'converter', crumb: 'Tools', fx: { speed: 0.8 }, suffix: ' (langsamer)',
    note: 'Das Tempo steht auf 0,80×. Verschieb den Tempo-Regler, tippe auf Mit Effekten abspielen und dann auf Konvertieren.',
    title: `Audio verlangsamen, ohne die Tonhöhe zu ändern | ${NAME}`,
    description: 'Mach Songs, Stimmen oder Sprachnachrichten langsamer, um Texte zu lernen, ein Instrument zu üben oder zu transkribieren. Gleiche Tonhöhe, gratis und privat.',
    h1: '<em>Audio verlangsamen</em>',
    lead: 'Spiel einen Song oder eine Aufnahme langsamer ab, ohne tiefe, schleppende Stimme. Ideal zum Songs lernen, Tanzen und Transkribieren.',
    badges: ['Bis 0,5×', 'Gleiche Tonhöhe', 'Vor dem Speichern anhören'],
    steps: [
      ['Öffne deine Datei', 'Ein Song, eine Vorlesung, ein Interview oder eine Sprachnachricht.'],
      ['Wähle das Tempo', 'Es steht schon auf 0,80×. Verschieb den Tempo-Regler und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Langsamer, aber im Ton</h2>
    <p>${NAME} dehnt das Audio zeitlich und behält die Tonhöhe bei. So wird ein Gitarrensolo oder ein schneller Rap leicht nachvollziehbar und klingt trotzdem wie das Original.</p>
    <h3>Zum Üben mit einem Instrument</h3>
    <p>Fang bei <strong>0,70×</strong> an, lern den Teil, geh dann auf 0,85× und zum Schluss auf normales Tempo. Willst du einen kurzen Abschnitt wiederholen, wähle ihn vorher auf der Wellenform aus, dann wird nur dieser Teil gespeichert.</p>
    <h3>Du willst den Slowed + Reverb-Sound?</h3>
    <p>Dieser Trend senkt zusätzlich die Tonhöhe und fügt Hall hinzu. <a href="/de/slowed-reverb/">Slowed + Reverb</a> hat das schon fertig eingestellt.</p>`,
    faq: [
      ['Ändert das Verlangsamen die Tonhöhe?', 'Nein. Die Noten bleiben in derselben Tonart. Nur das Tempo ändert sich.'],
      ['Wie stark kann ich verlangsamen?', 'Bis auf halbe Geschwindigkeit (0,5×). Unter 0,6× klingen manche Songs etwas verwaschen.'],
    ],
  },
  {
    key: 'pitch', path: 'de/tonhoehe-aendern', tool: 'converter', crumb: 'Tools', fx: { pitch: -2 }, suffix: ' (neue Tonhöhe)',
    note: 'Die Tonhöhe ist 2 Halbtöne tiefer. Verschieb den Tonhöhe-Regler, tippe auf Mit Effekten abspielen und dann auf Konvertieren.',
    title: `Tonhöhe ändern: Tonart eines Songs online anpassen | ${NAME}`,
    description: 'Ändere die Tonart jedes Songs um bis zu 12 Halbtöne nach oben oder unten, ohne das Tempo zu ändern. Ideal zum Singen und Spielen. Kostenlos und ohne Upload.',
    h1: '<em>Tonhöhe ändern</em> bei einem Song',
    lead: 'Transponiere einen Song nach oben oder unten in die Tonart, die zu deiner Stimme oder deinem Instrument passt. Das Tempo bleibt gleich.',
    badges: ['±12 Halbtöne', 'Gleiches Tempo', 'Vor dem Speichern anhören'],
    steps: [
      ['Öffne einen Song', 'Jeder Song oder jedes Video von deinem Gerät.'],
      ['Ändere die Tonhöhe', 'Es geht mit 2 Halbtönen tiefer los. Verschieb den Tonhöhe-Regler und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Sing in der Tonart, die dir liegt</h2>
    <p>Ist ein Song zu hoch zum Singen, stell ihn <strong>2 oder 3 Halbtöne</strong> tiefer. Ist er zu tief, stell ihn höher. Ein Halbton ist eine Taste auf dem Klavier, und 12 Halbtöne sind eine Oktave.</p>
    <h3>Zum Mitspielen auf Gitarre oder Klavier</h3>
    <p>Manchmal sind Songs leicht verstimmt aufgenommen oder in einer unbequemen Tonart. Transponiere ihn in eine Tonart, die du kennst, oder nutze einen Kapodaster und verschieb den Song passend dazu.</p>
    <h3>Für Karaoke</h3>
    <p>Kombinier es mit <strong>Gesang entfernen</strong> unter Effekte, oder fang bei <a href="/de/gesang-entfernen/">Gesang entfernen</a> an, und du hast deinen Karaoke-Track in deiner eigenen Tonart.</p>`,
    faq: [
      ['Ändert sich beim Ändern der Tonhöhe das Tempo?', 'Nein. Der Song behält sein Tempo und seine Länge. Nur die Tonart ändert sich.'],
      ['Wie viele Halbtöne hat eine Tonartänderung?', 'Jeder Halbton ist ein Schritt. Von C nach D sind es 2 Halbtöne, und 12 Halbtöne sind eine Oktave.'],
    ],
  },
  {
    key: 'silence', path: 'de/stille-entfernen', tool: 'converter', crumb: 'Tools', fx: { silence: true }, suffix: ' (ohne Stille)',
    note: 'Stille entfernen ist eingeschaltet. Jede Pause über 0,8 Sekunden wird herausgeschnitten. Tippe zum Prüfen auf Mit Effekten abspielen.',
    title: `Stille aus Audio automatisch entfernen, kostenlos | ${NAME}`,
    description: 'Schneide lange Pausen automatisch aus Sprachaufnahmen, Podcasts, Vorlesungen und Sprachnachrichten heraus. Kostenlos, privat und ganz ohne Upload.',
    h1: '<em>Stille entfernen</em> aus Audio',
    lead: 'Schneide lange Pausen und Stille automatisch aus deinen Aufnahmen heraus, damit sie kürzer und angenehmer zu hören sind.',
    badges: ['Automatisch', 'Sprache und Podcasts', 'Ohne Upload'],
    steps: [
      ['Öffne deine Aufnahme', 'Eine Sprachnachricht, ein Podcast, eine Vorlesung oder ein Video.'],
      ['Prüf das Ergebnis', 'Stille entfernen ist schon eingeschaltet. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>So funktioniert es</h2>
    <p>${NAME} sucht Stellen, an denen der Ton länger als etwa <strong>0,8 Sekunden</strong> sehr leise bleibt, und schneidet sie heraus. Normale Pausen zwischen Wörtern bleiben, die Stimme klingt also weiter natürlich.</p>
    <h3>Klappt am besten bei</h3>
    <p>Sprachaufnahmen, Vorlesungen, Interviews und langen Sprachnachrichten. Bei Musik würde es auch leise Intros und Outros wegschneiden, für Songs ist es deshalb meist nicht geeignet.</p>
    <h3>Gibt es Geräusche im Raum?</h3>
    <p>Läuft im Hintergrund ein Ventilator oder Verkehr, sind die Pausen nicht wirklich still. Schalte zusätzlich die <strong>KI-Rauschentfernung</strong> ein, oder nutze <a href="/de/rauschen-entfernen/">Rauschen entfernen mit KI</a>, wo das schon eingeschaltet ist.</p>`,
    faq: [
      ['Werden die Pausen zwischen Wörtern geschnitten?', 'Nein. Es entfernt nur Stille, die länger als etwa 0,8 Sekunden ist.'],
      ['Warum wurde nichts entfernt?', 'Wahrscheinlich sind in den Pausen Hintergrundgeräusche. Schalte die KI-Rauschentfernung oder Rauschen mindern ein und versuch es noch mal.'],
    ],
  },
  {
    key: 'fade', path: 'de/ein-ausblenden', tool: 'cutter', crumb: 'Tools', fx: { fadeIn: 3, fadeOut: 3 }, suffix: ' (mit Blende)',
    note: 'Es gibt ein Ein- und Ausblenden von je 3 Sekunden. Wähle einen Teil, wenn du willst, und tippe auf Mit Effekten abspielen.',
    title: `MP3 ein- und ausblenden: Fade-in und Fade-out gratis | ${NAME}`,
    description: 'Füge jedem Song oder jeder Aufnahme ein sanftes Ein- und Ausblenden hinzu. Wähle die Dauer, schneide bei Bedarf, hör rein und lade herunter. Gratis.',
    h1: 'Audio <em>ein- und ausblenden</em>',
    lead: 'Gib einem Song oder Clip einen sanften Anfang und ein sanftes Ende statt eines harten Schnitts. Wähle die Länge der Blende und hör vor dem Speichern rein.',
    badges: ['0 bis 10 Sekunden', 'Auch zuschneiden', 'MP3, WAV, FLAC'],
    steps: [
      ['Öffne deine Datei', 'Jeder Song, jede Aufnahme oder jedes Video.'],
      ['Stell die Blenden ein', 'Beide stehen auf 3 Sekunden. Ändere sie unter Effekte und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Wann eine Blende hilft</h2>
    <p>Mit einer Blende beginnt und endet die Musik sanft. Das passt für Klingeltöne, Hintergrundmusik in Videos, einen herausgeschnittenen Teil eines längeren Songs oder eine Präsentation, die vor der Musik endet.</p>
    <h3>Wie lang sollte sie sein?</h3>
    <p>Für einen Klingelton oder einen kurzen Clip <strong>1 bis 2 Sekunden</strong>. Für Hintergrundmusik oder das Ende eines Songs <strong>3 bis 6 Sekunden</strong>. ${NAME} lässt eine Blende nie mehr als ein Viertel des Clips einnehmen, damit kurze Clips noch hörbar bleiben.</p>
    <h3>Blende nur an einem Ende</h3>
    <p>Stell den anderen Regler auf <em>aus</em>. Für einen Klingelton mit Blenden hat <a href="/de/klingelton-erstellen/">Klingelton erstellen</a> sie schon eingestellt.</p>`,
    faq: [
      ['Kann ich nur einen Teil des Songs ein- und ausblenden?', 'Ja. Zieh über die Wellenform, um den Teil zu wählen. Die Blenden kommen an den Anfang und das Ende deiner Auswahl.'],
      ['Leidet die Qualität?', 'Wähle WAV oder FLAC, um nichts zu verlieren, oder MP3 mit 320 kbps, damit es dem Original sehr nahe kommt.'],
    ],
  },

  // ---------- Conversions ----------
  {
    key: 'c-mp4', convLabel: 'MP4 zu MP3', path: 'de/mp4-zu-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `MP4 in MP3 umwandeln: kostenlos und ohne Upload | ${NAME}`,
    description: 'Wandle MP4 online in Sekunden in MP3 um. Bis 320 kbps, ohne Upload, ohne Anmeldung und ohne Wasserzeichen. Funktioniert auf iPhone, Android und PC.',
    h1: '<em>MP4 in MP3</em> umwandeln',
    lead: 'Öffne ein MP4 und speichere den Ton als MP3. Läuft in deinem Browser, das Video verlässt also nie dein Gerät.',
    badges: ['Bis 320 kbps', 'Ohne Upload', 'Kostenlos'],
    steps: [
      ['Öffne das MP4', 'Tippe auf das Feld oben und wähle dein Video.'],
      ['Wähle die Qualität', '320 kbps für Musik, 128 kbps für Sprache.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf MP3 herunterladen.'],
    ],
    content: `
    <h2>Warum MP4 in MP3 umwandeln?</h2>
    <p>Ein MP4 enthält Bild und Ton. Wenn du nur zuhören willst, ist eine MP3 viel kleiner und läuft auf jedem Handy, im Auto und in allen Musik-Apps.</p>
    <h3>Wie groß wird die MP3?</h3>
    <ul>
      <li><strong>320 kbps:</strong> etwa 2,4 MB pro Minute. Am besten für Musik.</li>
      <li><strong>192 kbps:</strong> etwa 1,4 MB pro Minute. Ein guter Mittelweg.</li>
      <li><strong>128 kbps:</strong> rund 1 MB pro Minute. Reicht für Sprache, Vorlesungen und Podcasts.</li>
    </ul>
    <h3>Du brauchst nur einen Teil?</h3>
    <p>Zieh über die Wellenform, um nur den Teil zu behalten, den du willst, zum Beispiel einen Song aus einem Konzertvideo. Du willst einen Klingelton? Nimm <a href="/de/klingelton-erstellen/">Klingelton erstellen</a>.</p>
    <h3>Andere Videos</h3>
    <p>Klappt auch mit MOV vom iPhone, WebM, MKV und AVI. Schau bei <a href="/de/video-zu-mp3/">Video zu MP3</a>.</p>`,
    faq: [
      ['Klingt die MP3 genauso wie das Video?', 'Bei 320 kbps ist der Unterschied kaum zu hören.'],
      ['Kann ich MP4 am Handy in MP3 umwandeln?', 'Ja. Es funktioniert im Browser auf iPhone und Android, ohne App-Installation.'],
      ['Wird mein Video auf einen Server hochgeladen?', 'Nein. Die Umwandlung passiert auf deinem Gerät, das Video verlässt es also nie.'],
      ['Kann ich YouTube-Videos umwandeln?', 'MeloCut arbeitet mit Dateien auf deinem Gerät. Es lädt keine Videos von YouTube oder anderen Seiten herunter.'],
    ],
  },
  {
    key: 'c-wav', convLabel: 'WAV zu MP3', path: 'de/wav-zu-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WAV in MP3 umwandeln: online, gratis, ohne Upload | ${NAME}`,
    description: 'Wandle WAV online in MP3 um und mach deine Dateien bis zu 10-mal kleiner. Wähle 128 bis 320 kbps. Kostenlos, privat und ohne Upload, direkt im Browser.',
    h1: '<em>WAV in MP3</em> umwandeln',
    lead: 'Mach aus großen WAV-Dateien MP3s, die sich leicht teilen und überall abspielen lassen.',
    badges: ['Bis 10× kleiner', '128 bis 320 kbps', 'Ohne Upload'],
    steps: [
      ['Öffne die WAV', 'Wähle eine WAV-Datei von deinem Gerät.'],
      ['Wähle die Qualität', '320 kbps kommt dem Original am nächsten.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf MP3 herunterladen.'],
    ],
    content: `
    <h2>WAV oder MP3?</h2>
    <p>WAV-Dateien sind unkomprimiert, ein Song von drei Minuten braucht also etwa 30 MB. Als MP3 mit 320 kbps sind es rund 7 MB, und es klingt fast gleich. So lässt es sich viel leichter verschicken, hochladen oder auf dem Handy speichern.</p>
    <p>Behalte die WAV auch, wenn du die Aufnahme später noch bearbeiten willst.</p>
    <h3>Wie groß wird die MP3?</h3>
    <p>Eine WAV in CD-Qualität braucht etwa 10 MB pro Minute. Die MP3 hängt von der gewählten Qualität ab:</p>
    <ul>
      <li><strong>320 kbps:</strong> etwa 2,4 MB pro Minute. Am besten für Musik.</li>
      <li><strong>192 kbps:</strong> etwa 1,4 MB pro Minute.</li>
      <li><strong>128 kbps:</strong> rund 1 MB pro Minute. Reicht für Sprache.</li>
    </ul>
    <h3>Beim Umwandeln zuschneiden</h3>
    <p>Du brauchst nur einen Teil? Zieh die Regler auf der Wellenform und füge am Anfang oder Ende eine Blende hinzu. Bei einer leisen Aufnahme schaltest du unter Effekte die <strong>Auto-Lautstärke</strong> ein.</p>`,
    faq: [
      ['Verliere ich Qualität, wenn ich WAV in MP3 umwandle?', 'Etwas, weil MP3 komprimiert ist. Bei 320 kbps merkt das kaum jemand.'],
      ['Ist das kostenlos?', 'Ja. Ohne Anmeldung und ohne Wasserzeichen, und die Datei wird in deinem Browser umgewandelt, also nie hochgeladen.'],
      ['Welche Qualität soll ich wählen?', '320 kbps für Musik, 192 kbps zum alltäglichen Hören und 128 kbps für Sprachaufnahmen.'],
    ],
  },
  {
    key: 'c-m4a', convLabel: 'M4A zu MP3', path: 'de/m4a-zu-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `M4A in MP3 umwandeln: iPhone-Sprachmemos, gratis | ${NAME}`,
    description: 'Wandle M4A online in MP3 um: Sprachmemos vom iPhone, Audio aus iTunes und mehr. Kostenlos, privat und schnell. Ohne Upload und ohne Anmeldung.',
    h1: '<em>M4A in MP3</em> umwandeln',
    lead: 'Wandle Sprachmemos vom iPhone und andere M4A-Dateien in MP3 um, damit sie auf jedem Gerät laufen.',
    badges: ['Sprachmemos', 'Audio aus iTunes', 'Ohne Upload'],
    steps: [
      ['Öffne die M4A', 'Wähle die Datei. Auf dem iPhone sicherst du das Sprachmemo zuerst in Dateien.'],
      ['Wähle die Qualität', '128 kbps reicht für Sprache, 320 kbps für Musik.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf MP3 herunterladen.'],
    ],
    content: `
    <h2>Über M4A-Dateien</h2>
    <p>M4A ist das Audioformat, das Apple für Sprachmemos und iTunes-Downloads nutzt. Es klingt gut, aber manche alten Player, Autos und Windows-Programme öffnen es nicht. MP3 funktioniert überall.</p>
    <h3>Ein Sprachmemo vom iPhone holen</h3>
    <p>Tippe in der App Sprachmemos auf die Aufnahme, dann auf <strong>Teilen → In Dateien sichern</strong>, und öffne sie hier.</p>
    <h3>Rauscht das Sprachmemo im Hintergrund?</h3>
    <p>Schalte vor dem Umwandeln unter Effekte die <strong>KI-Rauschentfernung</strong> ein, oder nutze <a href="/de/rauschen-entfernen/">Rauschen entfernen mit KI</a>.</p>`,
    faq: [
      ['Wie bekomme ich ein Sprachmemo von meinem iPhone?', 'Tippe in Sprachmemos auf die Aufnahme und dann auf Teilen → In Dateien sichern. Danach öffnest du sie hier.'],
      ['Kann ich geschützte Songs aus iTunes umwandeln?', 'Nein. Songs mit Kopierschutz (DRM) lassen sich nicht umwandeln.'],
    ],
  },
  {
    key: 'c-wa', convLabel: 'WhatsApp-Audio zu MP3', path: 'de/whatsapp-audio-zu-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WhatsApp-Audio in MP3 umwandeln (OPUS zu MP3) | ${NAME}`,
    description: 'Wandle Sprachnachrichten von WhatsApp und Telegram (.opus, .ogg) in MP3 um, damit sie überall laufen. Kostenlos und privat: Nichts wird hochgeladen.',
    h1: '<em>WhatsApp-Audio</em> in MP3 umwandeln',
    lead: 'Wandle Sprachnachrichten von WhatsApp und Telegram (.opus oder .ogg) in MP3 um. Deine Nachrichten bleiben auf deinem Handy.',
    badges: ['OPUS und OGG', 'Privat', 'Kostenlos'],
    steps: [
      ['Sichere die Sprachnachricht', 'Halte die Sprachnachricht in WhatsApp gedrückt → Weiterleiten → Teilen → In Dateien sichern.'],
      ['Öffne sie hier', 'Tippe auf das Feld oben und wähle die .opus-Datei.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf MP3 herunterladen.'],
    ],
    content: `
    <h2>Warum lassen sich WhatsApp-Sprachnachrichten nicht überall öffnen?</h2>
    <p>WhatsApp speichert Sprachnachrichten im Format OPUS. Das ist gut für Sprache, aber viele Player, Editoren und ältere Handys öffnen es nicht. Eine MP3 läuft überall und lässt sich leicht verschicken oder speichern.</p>
    <h3>Wirklich privat</h3>
    <p>Sprachnachrichten sind persönlich, deshalb ist es wichtig, dass ${NAME} sie nie hochlädt. Die Umwandlung passiert auf deinem eigenen Handy oder Computer.</p>
    <h3>Mehrere Sprachnachrichten?</h3>
    <p>Nutze <a href="/de/audio-zusammenfuegen/">Audio zusammenfügen</a>, um sie zu einer MP3 zu verbinden. Die <a href="/de/anleitung/whatsapp-audio-zu-mp3/">Schritt-für-Schritt-Anleitung</a> erklärt, wie du sie auf iPhone und Android aus WhatsApp holst.</p>`,
    faq: [
      ['Wo speichert WhatsApp Sprachnachrichten auf Android?', 'Normalerweise unter Interner Speicher → Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes.'],
      ['Kann ich eine Sprachnachricht lauter machen?', 'Ja. Erhöhe vor dem Umwandeln unter Effekte die Lautstärke oder schalte die Auto-Lautstärke ein.'],
    ],
  },
  {
    key: 'c-mp3wav', convLabel: 'MP3 zu WAV', path: 'de/mp3-zu-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `MP3 in WAV umwandeln: online und kostenlos | ${NAME}`,
    description: 'Wandle MP3 online in WAV um, zum Bearbeiten, für DJ-Programme oder zum Brennen einer CD. Kostenlos, schnell und privat. Nichts wird hochgeladen.',
    h1: '<em>MP3 in WAV</em> umwandeln',
    lead: 'Wandle MP3 in WAV um, für Schnittprogramme, DJ-Apps oder zum Brennen von CDs.',
    badges: ['WAV mit 16 Bit', 'Zum Bearbeiten', 'Ohne Upload'],
    steps: [
      ['Öffne die MP3', 'Wähle eine MP3 von deinem Gerät.'],
      ['WAV ist schon ausgewählt', 'Füge vorher Effekte hinzu, wenn du willst.'],
      ['Lade die WAV herunter', 'Tippe auf Konvertieren und dann auf WAV herunterladen.'],
    ],
    content: `
    <h2>Wann du eine WAV brauchst</h2>
    <p>Manche Schnittprogramme, Sampler und Brenn-Apps akzeptieren nur WAV. Durch die Umwandlung bekommst du eine Datei, die alle annehmen.</p>
    <p>Wichtig: Eine MP3 in WAV umzuwandeln holt die Qualität nicht zurück, die die MP3 schon verloren hat. Die WAV klingt genauso wie die MP3, ist nur größer und leichter zu bearbeiten.</p>`,
    faq: [
      ['Verbessert die Umwandlung von MP3 in WAV die Qualität?', 'Nein. Sie behält die Qualität der MP3, in einem Format, das sich leichter bearbeiten lässt.'],
      ['Warum ist die WAV so viel größer?', 'WAV ist unkomprimiert und braucht deshalb etwa 10 MB pro Minute.'],
    ],
  },
  {
    key: 'c-ogg', convLabel: 'OGG zu MP3', path: 'de/ogg-zu-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `OGG in MP3 umwandeln: online, gratis, ohne Upload | ${NAME}`,
    description: 'Wandle OGG- und OGA-Dateien in MP3 um, damit sie auf dem iPhone, im Auto und in jeder Musik-App laufen. Kostenlos, schnell und ganz ohne Upload.',
    h1: '<em>OGG in MP3</em> umwandeln',
    lead: 'Mach aus OGG-Dateien von Spielen, Telegram, Discord oder Linux-Apps MP3s, die überall laufen.',
    badges: ['OGG Vorbis und Opus', 'Bis 320 kbps', 'Ohne Upload'],
    steps: [
      ['Öffne die OGG', 'Wähle eine .ogg- oder .oga-Datei von deinem Gerät.'],
      ['Wähle die Qualität', '192 kbps ist ein guter Mittelweg. Nimm 320 kbps für Musik.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf MP3 herunterladen.'],
    ],
    content: `
    <h2>Was ist eine OGG-Datei?</h2>
    <p>OGG ist ein offenes Audioformat. Die meisten OGG-Dateien enthalten Musik in <strong>Vorbis</strong>, und Sprachnachrichten aus Apps wie Telegram und WhatsApp enthalten meist Sprache in <strong>Opus</strong>. Beide klingen gut, aber das iPhone, viele Autoradios und ältere Player öffnen sie nicht.</p>
    <p>${NAME} liest beide Varianten und speichert eine normale MP3. Ist es eine Sprachnachricht, schau bei <a href="/de/whatsapp-audio-zu-mp3/">WhatsApp-Audio zu MP3</a>.</p>
    <h3>Wenn sich die OGG nicht öffnen lässt</h3>
    <ul>
      <li>Prüf, ob der Download fertig ist. Eine halb gespeicherte OGG lässt sich nicht lesen.</li>
      <li>Dateien aus Chat-Apps enden manchmal auf <strong>.opus</strong> oder <strong>.oga</strong>. Die funktionieren auch.</li>
      <li>Auf dem iPhone sicherst du die Datei zuerst in der App Dateien und wählst sie dort aus.</li>
    </ul>`,
    faq: [
      ['Warum spielt mein iPhone keine OGG-Dateien ab?', 'Apple unterstützt manche OGG-Dateien nur in wenigen Apps. Als MP3 oder M4A laufen sie überall.'],
      ['Verliere ich Qualität, wenn ich OGG in MP3 umwandle?', 'Beide sind komprimiert, also etwas. Bei 256 oder 320 kbps ist es kaum zu hören.'],
    ],
  },

  // ---------- Guides ----------
  {
    key: 'g-iphone', forTool: 'ringtone', icon: 'bell', path: 'de/anleitung/klingelton-iphone', crumb: 'Guides', plain: true,
    title: `Song als Klingelton auf dem iPhone, ohne Computer | ${NAME}`,
    description: 'Stell jeden Song als Klingelton auf deinem iPhone ein, ohne Computer und ohne iTunes. Unter iOS 26 mit der App Dateien, auf älteren iPhones mit GarageBand.',
    h1: 'So machst du einen Song zum iPhone-Klingelton',
    lead: 'Ohne Computer, ohne iTunes und ohne kostenpflichtige Apps. Unter iOS 26 sind es vier Tipps in der App Dateien, auf älteren iPhones klappt es mit GarageBand.',
    content: `
    <div class="callout"><p>Erstelle zuerst den Klingelton: Wähle den besten Teil deines Songs. Das dauert etwa 30 Sekunden.</p><a class="btn sm" href="/de/klingelton-erstellen/">Klingelton erstellen öffnen</a></div>
    <h2>Schritt 1: Erstelle den Klingelton</h2>
    <ol class="guide-steps">
      <li>Öffne <a href="/de/klingelton-erstellen/">Klingelton erstellen</a> in Safari und wähle deinen Song aus Dateien, Fotos oder deinen Musik-Downloads.</li>
      <li>Zieh über die Wellenform, um den gewünschten Teil zu wählen. <strong>Bleib unter 30 Sekunden</strong>: Am Anfang sind schon 29 Sekunden ausgewählt.</li>
      <li>Lass das Format auf <strong>M4R</strong> (MP3 geht auch), tippe auf <strong>Klingelton erstellen</strong> und dann auf <strong>Herunterladen</strong>. Die Datei landet in der App <strong>Dateien</strong> unter <strong>Downloads</strong>.</li>
    </ol>
    <h2>Schritt 2: Als Klingelton einstellen (iOS 26 oder neuer)</h2>
    <ol class="guide-steps">
      <li>Öffne die App <strong>Dateien</strong> → <strong>Durchsuchen</strong> → <strong>Downloads</strong> und tippe auf deinen Klingelton, um ihn zu öffnen.</li>
      <li>Tippe auf die Taste <strong>Teilen</strong> (das Quadrat mit dem Pfeil nach oben).</li>
      <li>Tippe auf <strong>Als Klingelton verwenden</strong>. Siehst du die Option nicht, scroll ans Ende der Aktionsliste oder tippe auf <strong>Mehr</strong>.</li>
      <li>Die Einstellungen öffnen sich mit deinem neuen Klingelton ausgewählt. Du findest ihn auch unter <strong>Einstellungen → Töne &amp; Haptik → Klingelton</strong>.</li>
    </ol>
    <p>Du weißt nicht, welche Version du hast? Geh zu <strong>Einstellungen → Allgemein → Info → iOS-Version</strong>.</p>
    <h2>Schritt 2 auf älteren iPhones (GarageBand)</h2>
    <ol class="guide-steps">
      <li>Installiere <strong>GarageBand</strong> aus dem App Store (kostenlos und von Apple) und öffne es. Starte mit einem beliebigen Instrument, zum Beispiel dem Audio-Recorder.</li>
      <li>Tippe auf die Taste für die <strong>Spurenansicht</strong>, dann oben rechts auf das <strong>Loop</strong>-Symbol → <strong>Dateien</strong> → durchsuche die Objekte aus der App Dateien und wähle deinen Klingelton.</li>
      <li>Zieh ihn auf die Spur und tippe dann oben links auf den Pfeil <strong>⌄</strong> → <strong>Meine Songs</strong>.</li>
      <li>Halte den Song gedrückt → <strong>Teilen</strong> → <strong>Klingelton</strong> → <strong>Exportieren</strong> und wähle, ihn als Standardklingelton zu verwenden.</li>
    </ol>
    <h2>„Als Klingelton verwenden“ fehlt oder funktioniert nicht</h2>
    <ol class="guide-steps">
      <li><strong>Die Datei ist zu lang.</strong> Die App Dateien nimmt nur Töne unter 30 Sekunden an. Öffne sie wieder in Klingelton erstellen und wähle einen kürzeren Teil.</li>
      <li><strong>Es ist ein Song aus Apple Music.</strong> Songs aus einem Apple Music-Abo sind geschützt und lassen sich nicht verwenden. Nimm eine Songdatei, die dir gehört, oder den Ton aus deinen eigenen Videos.</li>
      <li><strong>Der Download ist nicht fertig.</strong> Lade die Datei noch mal herunter und warte, bis der blaue Pfeil in der Adressleiste von Safari fertig ist.</li>
      <li><strong>Klappt es immer noch nicht?</strong> Schließ die App Dateien komplett und öffne sie neu, oder nimm die GarageBand-Methode.</li>
    </ol>
    <h2>Nur für eine Person</h2>
    <p>Öffne <strong>Kontakte</strong>, wähle die Person, tippe auf <strong>Bearbeiten</strong> → <strong>Klingelton</strong> und wähle deinen neuen Ton. Du hast ein Samsung? Schau dir an, <a href="/de/anleitung/klingelton-samsung/">wie du auf dem Samsung einen Klingelton einstellst</a>.</p>`,
    faq: [
      ['Kann ich ohne Computer einen Klingelton aufs iPhone bringen?', 'Ja. Unter iOS 26 oder neuer öffnest du die Datei in der App Dateien und tippst auf Teilen → Als Klingelton verwenden. Bei älteren Versionen nimmst du GarageBand.'],
      ['Wie lang darf ein iPhone-Klingelton sein?', 'Unter 30 Sekunden mit der Methode über die App Dateien. GarageBand und der Computer erlauben bis zu 40 Sekunden.'],
      ['Brauche ich eine M4R-Datei?', 'Für die Methode über die App Dateien nicht, MP3 geht auch. M4R brauchst du nur, wenn du den Klingelton vom Computer kopierst.'],
      ['Kann ich einen Song aus Apple Music nehmen?', 'Nein. Songs aus Apple Music sind geschützt, deshalb nimmt das iPhone sie nicht als Klingelton an. Gekaufte Songs oder Songs, die du als Datei hast, funktionieren.'],
      ['Ist das kostenlos?', `Ja. Klingelton erstellen von ${NAME} ist kostenlos und ohne Wasserzeichen, und auch die App Dateien und GarageBand sind gratis.`],
    ],
  },
  {
    key: 'g-samsung', icon: 'bell', path: 'de/anleitung/klingelton-samsung', crumb: 'Guides', plain: true,
    title: `Song als Klingelton auf dem Samsung Galaxy einstellen | ${NAME}`,
    description: 'Mach jeden Song zum Klingelton auf dem Samsung Galaxy: erst erstellen, dann Einstellungen → Töne und Vibration → Klingelton → +. Auch pro Kontakt.',
    h1: 'So machst du einen Song zum Samsung-Klingelton',
    lead: 'Jedes Samsung Galaxy kann deinen eigenen Song als Klingelton nutzen. Erstelle zuerst den Klingelton, danach sind es nur ein paar Tipps in den Einstellungen.',
    content: `
    <div class="callout"><p>Erstelle zuerst den Klingelton. Wähle in etwa 30 Sekunden den besten Teil eines Songs.</p><a class="btn sm" href="/de/klingelton-erstellen/">Klingelton erstellen öffnen</a></div>
    <h2>Schritt 1: Erstelle den Klingelton</h2>
    <ol class="guide-steps">
      <li>Öffne <a href="/de/klingelton-erstellen/">Klingelton erstellen</a> in Chrome oder Samsung Internet und wähle deinen Song.</li>
      <li>Zieh über die Wellenform, um den gewünschten Teil zu wählen, und wähle <strong>MP3</strong>.</li>
      <li>Tippe auf <strong>Klingelton erstellen</strong> und dann auf <strong>Herunterladen</strong>. Die Datei landet unter <strong>Eigene Dateien → Downloads</strong>.</li>
    </ol>
    <h2>Schritt 2: Als Klingelton einstellen</h2>
    <ol class="guide-steps">
      <li>Öffne <strong>Einstellungen</strong> → <strong>Töne und Vibration</strong> → <strong>Klingelton</strong>.</li>
      <li>Hast du zwei SIM-Karten, wähle <strong>SIM 1</strong> oder <strong>SIM 2</strong>.</li>
      <li>Tippe oben rechts in der Liste auf <strong>+</strong>.</li>
      <li>Such deine Datei (unter <strong>Downloads</strong> oder <strong>Audio</strong>), tippe sie an und dann auf <strong>Fertig</strong>.</li>
    </ol>
    <h2>Nur für einen Kontakt</h2>
    <ol class="guide-steps">
      <li>Öffne <strong>Kontakte</strong> und tippe auf die Person.</li>
      <li>Tippe auf <strong>Bearbeiten</strong> und dann unten auf <strong>Mehr anzeigen</strong>.</li>
      <li>Tippe auf <strong>Klingelton</strong>, dann auf <strong>+</strong>, wähle deine Datei und speichere.</li>
    </ol>
    <h2>Als Benachrichtigungston</h2>
    <p>Geh zu <strong>Einstellungen → Töne und Vibration → Benachrichtigungston</strong> und füge deine Datei genauso hinzu. Benachrichtigungstöne funktionieren am besten kurz, 1 bis 3 Sekunden. Mit <a href="/de/audio-schneiden/">Audio schneiden</a> kürzt du einen Ton so weit.</p>
    <h2>Der Song taucht nicht in der Liste auf</h2>
    <ol class="guide-steps">
      <li>Prüf, ob der Download fertig ist: Öffne <strong>Eigene Dateien → Downloads</strong> und spiel ihn ab.</li>
      <li>Schließ die Einstellungen und öffne sie neu, oder starte das Handy neu, damit es nach neuen Tönen sucht.</li>
      <li>Verschieb die Datei in Eigene Dateien in den Ordner <strong>Ringtones</strong> (Interner Speicher → Ringtones). Dateien in diesem Ordner erscheinen immer.</li>
    </ol>`,
    faq: [
      ['Wie lang darf ein Klingelton auf dem Samsung sein?', 'Es gibt kein festes Limit, aber 20 bis 30 Sekunden reichen. Der Klingelton wiederholt sich, bis du abnimmst.'],
      ['Welches Format nutzen Samsung-Handys?', 'MP3 funktioniert auf allen Samsung-Handys. M4A und OGG gehen auch.'],
      ['Kann ich für jede SIM einen anderen Klingelton einstellen?', 'Ja. Wähle unter Klingelton SIM 1 oder SIM 2 und stell jede separat ein.'],
    ],
  },
  {
    key: 'g-whatsapp', forTool: 'converter', icon: 'swap', path: 'de/anleitung/whatsapp-audio-zu-mp3', crumb: 'Guides', plain: true,
    title: `WhatsApp-Sprachnachricht in MP3 umwandeln | ${NAME}`,
    description: 'Sichere eine WhatsApp-Sprachnachricht auf iPhone oder Android und wandle sie in MP3 um, damit sie überall läuft. Schritt für Schritt, gratis und ohne Upload.',
    h1: 'So wandelst du WhatsApp-Audio in MP3 um',
    lead: 'WhatsApp-Sprachnachrichten sind .opus-Dateien, die die meisten Player nicht öffnen. So holst du sie aus dem Chat und machst MP3s daraus.',
    content: `
    <h2>1. Hol die Sprachnachricht aus WhatsApp</h2>
    <h3>iPhone</h3>
    <ol class="guide-steps">
      <li>Öffne den Chat und <strong>halte die Sprachnachricht gedrückt</strong> → <strong>Weiterleiten</strong>.</li>
      <li>Tippe unten rechts auf die Taste <strong>Teilen</strong> (nicht auf den Pfeil zum Weiterleiten in einen Chat).</li>
      <li>Wähle <strong>In Dateien sichern</strong> und speichere sie, zum Beispiel unter Downloads.</li>
    </ol>
    <h3>Android</h3>
    <ol class="guide-steps">
      <li>Halte die Sprachnachricht gedrückt und tippe oben auf das Symbol <strong>Teilen</strong>.</li>
      <li>Wähle <strong>Dateien</strong>, <strong>Drive</strong> oder einen anderen Ort zum Speichern.</li>
      <li>Oder finde alle deine Sprachnachrichten in der Dateien-App unter <em>Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes</em>.</li>
    </ol>
    <h2>2. Wandle sie in MP3 um</h2>
    <ol class="guide-steps">
      <li>Öffne den <a href="/de/audio-konverter/">Audio-Konverter</a> und wähle die Sprachnachricht.</li>
      <li>Wähle <strong>MP3</strong>, tippe auf <strong>Konvertieren</strong> und dann auf <strong>MP3 herunterladen</strong>. Für Sprache reichen 128 kbps.</li>
    </ol>
    <h2>Besser verständlich machen</h2>
    <p>Sprachnachrichten von unterwegs rauschen oft. Öffne die MP3 in <a href="/de/rauschen-entfernen/">Rauschen entfernen mit KI</a>, um Wind und Verkehr zu entfernen und die Lautstärke anzugleichen. Willst du mehrere Sprachnachrichten zu einer Datei verbinden, nutze <a href="/de/audio-zusammenfuegen/">Audio zusammenfügen</a>. Sprachnachrichten aus Telegram (.ogg) funktionieren genauso.</p>`,
    faq: [
      ['Warum kann ich eine WhatsApp-Sprachnachricht am Computer nicht abspielen?', 'WhatsApp speichert sie als .opus-Dateien, die viele Player nicht unterstützen. Die Umwandlung in MP3 löst das.'],
      ['Wird meine Sprachnachricht hochgeladen?', 'Nein. Die Umwandlung passiert auf deinem eigenen Handy oder Computer, die Nachricht verlässt also nie dein Gerät.'],
      ['Kann ich mehrere Sprachnachrichten zu einer Datei verbinden?', 'Ja. Wandle sie um und füge sie dann mit dem Tool Audio zusammenfügen zusammen.'],
    ],
  },
  {
    key: 'g-slowed', forTool: 'slowed', icon: 'slow', path: 'de/anleitung/slowed-reverb', crumb: 'Guides', plain: true,
    title: `Slowed + Reverb Songs am Handy erstellen: Anleitung | ${NAME}`,
    description: 'Mach deine eigene Slowed + Reverb-Version von jedem Song am Handy oder Computer: Tempo, Tonhöhe und Hall, die gut klingen, Schritt für Schritt. Kostenlos.',
    h1: 'So erstellst du Slowed + Reverb Songs',
    lead: 'Dieser langsame, verträumte Sound von TikTok und YouTube ist in einer Minute gemacht, kostenlos und direkt im Browser.',
    content: `
    <h2>Schritt für Schritt</h2>
    <ol class="guide-steps">
      <li>Öffne <a href="/de/slowed-reverb/">Slowed + Reverb</a> und wähle einen Song von deinem Handy oder Computer.</li>
      <li>Die klassischen Einstellungen sind schon gesetzt: Tempo <strong>0,85×</strong> mit Hall. Tippe auf <strong>Mit Effekten abspielen</strong>.</li>
      <li>Pass es nach deinem Geschmack an (siehe Einstellungen unten), tippe dann auf <strong>Konvertieren</strong> und lade deine MP3 mit <strong>MP3 herunterladen</strong> herunter.</li>
    </ol>
    <h2>Einstellungen, die gut klingen</h2>
    <ol class="guide-steps">
      <li><strong>Tempo 0,80 bis 0,90×.</strong> Langsamer als 0,80 klingt es verwaschen, schneller als 0,90 merkt man kaum etwas.</li>
      <li><strong>Tonhöhe 1 bis 3 Halbtöne tiefer.</strong> Das gibt diese tiefe, verschlafene Stimme. Lass sie auf 0, wenn der Sänger zu dunkel klingt.</li>
      <li><strong>Hall 35 bis 55 %.</strong> Genug, um nach einem großen Raum zu klingen, ohne dass die Wörter untergehen.</li>
      <li><strong>Etwas mehr Bass</strong> (+3 bis +6 dB) lässt es mit Kopfhörern voller klingen.</li>
    </ol>
    <h2>Andere Versionen zum Ausprobieren</h2>
    <ol class="guide-steps">
      <li><strong>Sped up oder Nightcore:</strong> Tempo 1,15 bis 1,30× mit höherer Tonhöhe. Nimm den <a href="/de/nightcore/">Nightcore Maker</a>.</li>
      <li><strong>8D:</strong> Der Klang kreist mit Kopfhörern um deinen Kopf. Nimm den <a href="/de/8d-audio/">8D-Audio Konverter</a>.</li>
      <li><strong>Slowed-Klingelton:</strong> Mach deine langsame Version und öffne sie dann in <a href="/de/klingelton-erstellen/">Klingelton erstellen</a>.</li>
    </ol>
    <h2>Zum Veröffentlichen</h2>
    <p>TikTok, Instagram und YouTube können Songs stummschalten oder sperren, an denen du keine Rechte hast, auch wenn sie langsamer sind. Zum selbst Anhören ist das kein Problem; zum Posten nimm eigene Musik oder Musik, die du nutzen darfst, oder füg den Originalsong aus der Musikbibliothek der App hinzu. Du brauchst ein Video statt Audio? <a href="/de/mp3-zu-mp4/">Song zu Video</a> macht aus deiner langsamen Version ein MP4 mit animierter Wellenform.</p>`,
    faq: [
      ['Welches Tempo hat Slowed + Reverb?', 'Meist zwischen 0,80- und 0,90-fachem Originaltempo, mit 1 bis 3 Halbtönen tieferer Tonhöhe.'],
      ['Kann ich das am Handy machen?', 'Ja. Slowed + Reverb funktioniert in Safari und Chrome auf iPhone und Android, ohne Installation.'],
      ['Gibt es ein Wasserzeichen?', 'Nein. Die MP3 gehört dir, ohne Wasserzeichen und ohne Anmeldung.'],
    ],
  },
];
