// German versions of the newer pages. Each `key` matches the English page (build.mjs KEY_OF).
// Informal "du"; button and effect names match the German interface strings in i18n/ui_de.py.
export const toolPaths = { 'audio-splitter': 'de/audio-aufteilen' };

export default (NAME) => [
  // ---------- Tools ----------
  {
    key: 'splitter', path: 'de/audio-aufteilen', tool: 'splitter', crumb: 'Tools',
    title: `MP3 aufteilen: Audio online in Teile teilen | ${NAME}`,
    description: 'Teile eine MP3, einen Podcast oder eine lange Aufnahme in gleiche Teile oder alle paar Minuten. Alle Teile als ein ZIP. Kostenlos, privat, ohne Upload.',
    h1: '<em>Audio aufteilen</em>: MP3 in Teile teilen',
    lead: 'Teile einen langen Song, Podcast, Vortrag oder ein Hörbuch in gleiche Teile oder alle paar Minuten in einen neuen Teil. Alle Teile bekommst du in einem ZIP.',
    badges: ['2 bis 10 Teile', 'Oder alle N Minuten', 'Ein ZIP'],
    steps: [
      ['Öffne deine Datei', 'Eine lange MP3, Aufnahme, ein Podcast oder ein Video.'],
      ['Wähle, wie geteilt wird', 'Wähle eine Anzahl gleicher Teile oder einen Teil alle 1 bis 30 Minuten.'],
      ['Aufteilen und herunterladen', 'Tippe auf Aufteilen und dann auf Alle herunterladen (ZIP).'],
    ],
    content: `
    <h2>Was man so aufteilt</h2>
    <ul>
      <li><strong>Lange Aufnahmen und Vorlesungen</strong> in Teile von 10 oder 15 Minuten, die sich leichter teilen und anhören lassen.</li>
      <li><strong>Podcasts und Hörbücher</strong> in Kapitel für Player, die sich in jeder Datei merken, wo du aufgehört hast.</li>
      <li><strong>Sprachnachrichten für WhatsApp oder E-Mail</strong>, wenn eine Datei zu groß ist, um sie am Stück zu senden.</li>
      <li><strong>Einen DJ-Mix oder ein Konzert</strong> in gleich lange Abschnitte.</li>
    </ul>
    <h3>Nur ein Teil der Datei?</h3>
    <p>Zieh zuerst die Griffe auf der Wellenform. Nur der ausgewählte Bereich wird aufgeteilt, so kannst du ein Intro oder die Stille am Ende weglassen.</p>
    <h3>Format und Effekte</h3>
    <p>Jeder Teil wird im gewählten Format gespeichert: MP3, M4A, WAV, OGG oder FLAC. Effekte gelten ebenfalls für jeden Teil: Schalte die <strong>Auto-Lautstärke</strong> ein, um die Lautstärke anzugleichen, oder füge ein kurzes Ein- und Ausblenden hinzu, damit die Teile nicht abrupt beginnen und enden.</p>
    <p>Du brauchst nur ein bestimmtes Stück? Nimm <a href="/de/audio-schneiden/">Audio schneiden</a>. Du willst Teile wieder zusammensetzen? Nimm <a href="/de/audio-zusammenfuegen/">Audio zusammenfügen</a>.</p>`,
    faq: [
      ['Wie teile ich eine MP3 in gleiche Teile?', 'Öffne die MP3, wähle zum Beispiel 4 gleiche Teile, tippe auf Aufteilen und lade das ZIP mit allen vier Teilen herunter.'],
      ['Kann ich eine Datei alle 10 Minuten teilen?', 'Ja. Wähle Alle 10 Min. Der letzte Teil bekommt, was übrig bleibt.'],
      ['Wird die Datei hochgeladen?', 'Nein. Sie wird in deinem Browser aufgeteilt.'],
      ['Wie öffne ich das ZIP auf dem Handy?', 'Auf dem iPhone tippst du in der Dateien-App auf das ZIP, dann wird es in einen Ordner entpackt. Auf Android öffnest du es in Dateien und tippst auf Extrahieren.'],
    ],
  },
  {
    key: 'normalize', path: 'de/audio-normalisieren', tool: 'converter', crumb: 'Tools', fx: { normalize: true }, suffix: ' (normalisiert)',
    note: 'Auto-Lautstärke ist eingeschaltet. Sie bringt die ganze Datei auf eine gleichmäßige Lautstärke wie bei Streaming-Diensten. Tippe auf Mit Effekten abspielen, um es anzuhören.',
    title: `Audio normalisieren: MP3-Lautstärke angleichen | ${NAME}`,
    description: 'Audio online normalisieren: Leise und laute Dateien gleich laut machen, wie Spotify und YouTube. MP3, WAV, Sprachnachrichten, Videos. Gratis, ohne Upload.',
    h1: '<em>Audio normalisieren</em> online',
    lead: 'Bring jede Aufnahme und jeden Song auf eine gleichmäßige Standard-Lautstärke, damit leise Dateien klar klingen und laute nicht dröhnen. Ein Limiter hält alles sauber.',
    badges: ['Streaming-Lautstärke', 'Ohne Übersteuern', 'Ohne Upload'],
    steps: [
      ['Öffne deine Datei', 'Einen Song, eine Sprachnachricht, einen Podcast, Vortrag oder ein Video.'],
      ['Hör rein', 'Auto-Lautstärke ist schon eingeschaltet. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Was Normalisieren macht</h2>
    <p>Die <strong>Auto-Lautstärke</strong> misst, wie laut die ganze Datei für Zuhörer klingt, nicht nur ihre lauteste Spitze, und bringt sie auf etwa den Pegel, den Streaming-Apps nutzen. Ein Limiter fängt dann die lautesten Stellen ab, damit nichts knackt. Leise Aufnahmen werden klar; Dateien, die schon laut waren, bleiben fast so, wie sie waren.</p>
    <h3>Mehrere Dateien gleich laut</h3>
    <p>Du machst eine Playlist oder einen Podcast aus mehreren Clips? Normalisiere jeden einzeln oder füge sie mit <a href="/de/audio-zusammenfuegen/">Audio zusammenfügen</a> zusammen und schalte dort <strong>Lautstärke angleichen</strong> ein.</p>
    <h3>Immer noch zu leise?</h3>
    <p>Zieh unter Effekte zusätzlich den Lautstärke-Regler hoch oder nimm <a href="/de/lautstaerke-erhoehen/">Lautstärke erhöhen</a>.</p>`,
    faq: [
      ['Was ist Audio-Normalisierung?', 'Eine Datei wird so angepasst, dass ihre Gesamtlautstärke einen Standardpegel erreicht. MeloCut nutzt Lautheits-Normalisierung, die sich danach richtet, wie laut es klingt, statt nur nach der höchsten Spitze.'],
      ['Verzerrt das Normalisieren mein Audio?', 'Nein. Ein Limiter hält die Spitzen unter Kontrolle, sodass das Ergebnis lauter wird, ohne zu übersteuern.'],
      ['Kann ich mehrere Dateien auf einmal normalisieren?', 'Normalisiere sie hier eine nach der anderen oder füge sie mit Audio zusammenfügen zusammen und schalte Lautstärke angleichen ein.'],
    ],
  },
  {
    key: 'mono', path: 'de/stereo-zu-mono', tool: 'converter', crumb: 'Tools', fx: { mono: true }, suffix: ' (Mono)',
    note: 'Mono ist eingeschaltet: Beide Kanäle werden zu einem gemischt. Tippe zum Prüfen auf Mit Effekten abspielen.',
    title: `Stereo zu Mono: Audio online in Mono umwandeln | ${NAME}`,
    description: 'Wandle Stereo-Audio online in Mono um: links und rechts zu einem Kanal mischen, für Lautsprecher, Anrufe, Podcasts oder kleinere Dateien. Gratis, ohne Upload.',
    h1: '<em>Stereo zu Mono</em> umwandeln',
    lead: 'Misch den linken und rechten Kanal zu einem, damit der Ton aus jedem Lautsprecher und in einem einzelnen Ohrhörer gleich klingt.',
    badges: ['Links + rechts gemischt', 'Kleinere WAV', 'Ohne Upload'],
    steps: [
      ['Öffne deine Datei', 'Einen beliebigen Song, eine Aufnahme oder ein Video.'],
      ['Hör rein', 'Mono ist schon eingeschaltet. Tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Wähle ein Format, tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Wann Mono besser ist</h2>
    <ul>
      <li><strong>Ein Ohrhörer oder ein Lautsprecher:</strong> Nichts, was nur auf der anderen Seite war, geht verloren.</li>
      <li><strong>Sprachaufnahmen und Podcasts:</strong> Eine Stimme, die nur in einem Ohr hängt, klingt seltsam; Mono setzt sie in die Mitte.</li>
      <li><strong>Kleinere Dateien:</strong> Eine Mono-WAV ist halb so groß wie eine Stereo-WAV.</li>
    </ul>
    <p>Beide Kanäle werden zusammengemischt, du behältst also alles, was auf einer der beiden Seiten war.</p>
    <h3>Stimme nur auf einer Seite?</h3>
    <p>Bei manchen Aufnahmen ist die Stimme nur auf dem linken oder rechten Kanal. Mono behebt das auch. Schalte zusätzlich die <strong>Auto-Lautstärke</strong> ein, falls es danach leise ist.</p>`,
    faq: [
      ['Verliert man bei Mono Qualität?', 'Das Stereobild links und rechts fällt weg, aber der ganze Ton von beiden Seiten bleibt erhalten. Bei Sprache hörst du keinen Unterschied.'],
      ['Wird die Datei kleiner?', 'Eine Mono-WAV oder -FLAC ist etwa halb so groß. Bei MP3 hängt die Größe vor allem von der gewählten Bitrate ab.'],
    ],
  },
  {
    key: 'reverb', path: 'de/hall-hinzufuegen', tool: 'converter', crumb: 'Tools', fx: { reverb: 40 }, suffix: ' (Hall)',
    note: 'Hall steht auf 40 %. Verschieb den Hall-Regler und tippe auf Mit Effekten abspielen, um es anzuhören.',
    title: `Hall hinzufügen: Audio online mit Reverb, gratis | ${NAME}`,
    description: 'Füge Gesang, Songs und Sprachnachrichten online Hall hinzu. Wähle, wie viel Raumklang du willst, hör erst rein und lade herunter. Gratis, privat, ohne Upload.',
    h1: '<em>Hall</em> zu Audio hinzufügen',
    lead: 'Gib einer trockenen Aufnahme Raum: vom kleinen Zimmer bis zur großen Halle. Stell die Stärke ein, hör rein und lade herunter.',
    badges: ['0 bis 100 %', 'Erst anhören', 'MP3 oder WAV'],
    steps: [
      ['Öffne deine Datei', 'Gesang, einen Song, eine Sprachnachricht oder ein Video.'],
      ['Stell die Stärke ein', '40 % sind eingestellt. Verschieb den Hall-Regler und tippe auf Mit Effekten abspielen.'],
      ['Herunterladen', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Wie viel Hall?</h2>
    <ul>
      <li><strong>10 bis 25 %:</strong> ein natürlicher Raum. Gut für trockenen Gesang von zu Hause und Voice-overs.</li>
      <li><strong>30 bis 50 %:</strong> ein großer, verträumter Klang wie in Slowed + Reverb-Edits.</li>
      <li><strong>Ab 60 %:</strong> eine Halle oder Höhle, als Effekt.</li>
    </ul>
    <h3>Beliebte Kombinationen</h3>
    <p>Für den klassischen Trend senkst du auch Tempo und Tonhöhe oder startest direkt mit <a href="/de/slowed-reverb/">Slowed + Reverb</a>. Für eine Stimme in einem großen Raum probier die Stimme <em>Echo</em> im <a href="/de/stimmenverzerrer/">Stimmenverzerrer</a>.</p>`,
    faq: [
      ['Was ist der Unterschied zwischen Hall und Echo?', 'Hall ist das weiche Nachklingen des Tons in einem Raum. Ein Echo ist eine deutlich hörbare Wiederholung. Der Hall von MeloCut erzeugt Raumklang; die Stimme Echo im Stimmenverzerrer geht eher in Richtung eines großen, hallenden Raums.'],
      ['Kann ich nur meinem Gesang Hall hinzufügen?', 'Der Hall wird auf die ganze Datei angewendet. Für Hall nur auf dem Gesang füge ihn einer reinen Gesangsaufnahme hinzu, bevor du sie mit der Musik mischst.'],
    ],
  },
  // ---------- Conversions ----------
  {
    key: 'c-compress', convLabel: 'MP3 komprimieren', path: 'de/mp3-komprimieren', tool: 'converter', format: 'mp3', quality: '64', crumb: 'Converters', suffix: ' (komprimiert)',
    title: `MP3 komprimieren: Audio-Dateigröße verkleinern | ${NAME}`,
    description: 'MP3- und Audiodateien online verkleinern: Bitrate senken, auf Mono stellen und kürzen. Kostenlos, privat und schnell. Deine Datei wird nie hochgeladen.',
    h1: '<em>MP3 komprimieren</em> und Audio verkleinern',
    lead: 'Mach eine MP3, Sprachnachricht oder Aufnahme viel kleiner, damit sie in E-Mail-, Chat- oder Upload-Limits passt. Wähle eine niedrigere Qualität und sieh dir die neue Größe an.',
    badges: ['64 bis 320 kbps', 'Mono-Option', 'Ohne Upload'],
    steps: [
      ['Öffne die Datei', 'Eine beliebige MP3-, WAV-, M4A- oder andere Audiodatei oder ein Video.'],
      ['Wähle eine kleinere Qualität', '64 kbps ist ausgewählt. Für Musik nimm 96 oder 128 kbps.'],
      ['Herunterladen', 'Tippe auf Konvertieren. Die neue Größe wird angezeigt, bevor du herunterlädst.'],
    ],
    content: `
    <h2>Wie viel kleiner?</h2>
    <p>Die Größe einer MP3 hängt fast nur von Bitrate und Länge ab:</p>
    <ul>
      <li><strong>320 kbps:</strong> etwa 2,4 MB pro Minute.</li>
      <li><strong>128 kbps:</strong> etwa 1 MB pro Minute.</li>
      <li><strong>96 kbps:</strong> etwa 0,7 MB pro Minute.</li>
      <li><strong>64 kbps:</strong> etwa 0,5 MB pro Minute. Reicht für Sprache, Podcasts und Sprachnachrichten.</li>
    </ul>
    <p>Ein Song mit 320 kbps wird bei 64 kbps also etwa fünfmal kleiner.</p>
    <h3>Noch kleiner</h3>
    <ul>
      <li>Schalte unter Effekte <strong>Mono</strong> ein. Bei Sprache hörst du keinen Unterschied.</li>
      <li>Zieh über die Wellenform, um nur den Teil zu behalten, den du brauchst.</li>
      <li>Schalte <strong>Stille entfernen</strong> ein, um lange Pausen aus Aufnahmen herauszuschneiden.</li>
    </ul>
    <h3>Und die Qualität?</h3>
    <p>Niedrigere Bitraten entfernen Details, die du vor allem bei Musik hörst: 64 kbps klingt bei Stimmen gut, für Songs nimm 96 bis 128 kbps. Komprimieren kann eine Datei nicht besser klingen lassen, behalte also dein Original, falls du es später noch brauchst.</p>`,
    faq: [
      ['Wie mache ich eine MP3 kleiner?', 'Öffne sie hier, lass 64 oder 96 kbps eingestellt, tippe auf Konvertieren und lade sie herunter. Mit Mono wird sie noch kleiner.'],
      ['Kann ich mehrere Dateien auf einmal komprimieren?', 'Ja. Wähle im Audio-Konverter mehrere Dateien gleichzeitig aus und lade sie als ein ZIP herunter.'],
      ['Wird meine Datei hochgeladen?', 'Nein. Sie wird in deinem Browser komprimiert.'],
    ],
  },
  {
    key: 'c-mp4wav', convLabel: 'MP4 zu WAV', path: 'de/mp4-zu-wav', tool: 'video-to-mp3', format: 'wav', crumb: 'Converters',
    title: `MP4 in WAV umwandeln: online und kostenlos | ${NAME}`,
    description: 'MP4-Videos online in WAV-Audio umwandeln, für Schnitt, Transkription oder Musiksoftware. 16-Bit-WAV, ohne Upload, ohne Anmeldung. Auf Handy und PC.',
    h1: '<em>MP4 zu WAV</em> Konverter',
    lead: 'Hol den Ton aus einer MP4 und speichere ihn als unkomprimierte WAV, bereit für deine Schnittsoftware.',
    badges: ['16-Bit-WAV', 'MP4, MOV, WebM', 'Ohne Upload'],
    steps: [
      ['Öffne die MP4', 'Wähle ein Video von deinem Gerät.'],
      ['WAV ist schon ausgewählt', 'Zieh zuerst über die Wellenform, wenn du nur einen Teil brauchst.'],
      ['Lade die WAV herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Warum WAV?</h2>
    <p>WAV speichert den Ton ohne zusätzliche Kompression, deshalb mögen Schnittprogramme, DAWs und Transkriptions-Tools dieses Format am liebsten. Der Ton in einer MP4 ist meist schon komprimiert; WAV behält ihn genau so, wie er ist, ohne weiteren Verlust.</p>
    <p>WAV-Dateien sind groß, etwa 10 MB pro Minute. Wenn du nur zuhören willst, bekommst du mit <a href="/de/mp4-zu-mp3/">MP4 zu MP3</a> eine viel kleinere Datei.</p>`,
    faq: [
      ['Funktioniert das mit iPhone-Videos?', 'Ja. MOV- und MP4-Videos vom iPhone funktionieren beide.'],
      ['Wird das Video hochgeladen?', 'Nein. Der Ton wird in deinem Browser herausgeholt.'],
    ],
  },
  {
    key: 'c-m4awav', convLabel: 'M4A zu WAV', path: 'de/m4a-zu-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `M4A in WAV umwandeln: online und kostenlos | ${NAME}`,
    description: 'M4A online in WAV umwandeln: iPhone-Sprachmemos und iTunes-Audio als 16-Bit-WAV für deine Schnittsoftware. Kostenlos, privat, nichts wird hochgeladen.',
    h1: '<em>M4A zu WAV</em> Konverter',
    lead: 'Wandle iPhone-Sprachmemos und andere M4A-Dateien in WAV um, für Schnitt, Transkription oder Musiksoftware.',
    badges: ['16-Bit-WAV', 'Sprachmemos', 'Ohne Upload'],
    steps: [
      ['Öffne die M4A', 'Auf dem iPhone teilst du das Sprachmemo zuerst in Dateien und wählst es dann hier aus.'],
      ['WAV ist schon ausgewählt', 'Kürze es oder füge Effekte hinzu, wenn du willst.'],
      ['Lade die WAV herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Wann du WAV brauchst</h2>
    <p>Manche Editoren, Sampler und Transkriptionsdienste nehmen nur WAV an. Nach dem Umwandeln hast du eine Datei, die alle öffnen. Die Aufnahme klingt dadurch nicht besser als die M4A, sie wird nur ohne weitere Kompression gespeichert.</p>
    <p>Rauschendes Sprachmemo? Schalte vor dem Umwandeln unter Effekte die <strong>KI-Rauschentfernung</strong> ein.</p>`,
    faq: [
      ['Kann ich geschützte iTunes-Songs umwandeln?', 'Nein. Songs mit Kopierschutz (DRM) können nicht umgewandelt werden.'],
      ['Wie groß wird die WAV?', 'Etwa 10 MB pro Minute in Stereo, halb so viel in Mono.'],
    ],
  },
  {
    key: 'c-flacwav', convLabel: 'FLAC zu WAV', path: 'de/flac-zu-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `FLAC in WAV umwandeln: verlustfrei und gratis | ${NAME}`,
    description: 'FLAC online ohne Qualitätsverlust in WAV umwandeln. Beide sind verlustfrei, der Klang bleibt also genau gleich. Kostenlos, privat und ohne Upload.',
    h1: '<em>FLAC zu WAV</em> Konverter',
    lead: 'Wandle verlustfreie FLAC-Musik in WAV um, für Software, Geräte und CD-Brenner, die kein FLAC öffnen.',
    badges: ['Verlustfrei', '16-Bit-WAV', 'Ohne Upload'],
    steps: [
      ['Öffne die FLAC', 'Wähle eine FLAC-Datei von deinem Gerät.'],
      ['WAV ist schon ausgewählt', 'Lass die Effekte aus, um eine exakte Kopie zu bekommen.'],
      ['Lade die WAV herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Gleicher Klang, anderer Container</h2>
    <p>FLAC und WAV sind beide verlustfrei, es geht also nichts verloren. FLAC ist komprimiert wie eine ZIP-Datei, WAV nicht, deshalb ist die WAV etwa doppelt so groß. ${NAME} speichert 16-Bit-WAV, die gleiche Qualität wie eine CD.</p>
    <p>Du brauchst die Datei lieber kleiner? <a href="/flac-to-mp3/">FLAC to MP3</a> (auf Englisch) mit 320 kbps klingt sehr ähnlich und ist nur ein Bruchteil so groß.</p>`,
    faq: [
      ['Verliert FLAC zu WAV an Qualität?', 'Bei normaler FLAC in CD-Qualität nicht. Hochauflösende 24-Bit-FLAC-Dateien werden als 16-Bit-WAV gespeichert.'],
      ['Warum ist die WAV größer?', 'WAV ist unkomprimiert und braucht deshalb etwa 10 MB pro Minute.'],
    ],
  },
];
