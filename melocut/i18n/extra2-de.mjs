// German versions of the second batch of converter pages (en-conv2.mjs). Each `key` matches the English page (build.mjs KEY_OF).
// Informal "du"; button and effect names match the German interface strings in i18n/ui_de.py.
// The troubleshooting question from en-conv2.mjs `extraFaq` is appended as the last FAQ entry of each page.

export default (NAME) => [
  {
    key: 'c-wma', convLabel: 'WMA zu MP3', path: 'de/wma-zu-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `WMA in MP3 umwandeln: online, gratis, ohne Upload | ${NAME}`,
    description: 'Wandle alte WMA-Dateien aus dem Windows Media Player in MP3 um, für jedes Handy, Auto und jede App. Bis 320 kbps. Kostenlos, privat, nichts wird hochgeladen.',
    h1: '<em>WMA zu MP3</em> Konverter',
    lead: 'Gib alten Windows-Media-Audio-Dateien ein zweites Leben als MP3, die auf iPhone, Android, Mac und im Auto laufen.',
    badges: ['Windows Media Audio', 'Bis 320 kbps', 'Ohne Upload'],
    steps: [
      ['Öffne die WMA', 'Wähle eine .wma-Datei von deinem Gerät oder zieh mehrere auf einmal hinein.'],
      ['Wähle eine Qualität', '192 kbps passt zu den meisten WMA-Rips. Nimm 320 kbps, wenn das Original eine hohe Qualität hatte.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Woher WMA-Dateien kommen</h2>
    <p>Jahrelang hat der Windows Media Player CDs standardmäßig als WMA gerippt. Wenn du einen alten Musikordner von einem PC mit Windows XP oder Windows 7 hast, ist vermutlich vieles davon WMA. Die Dateien klingen noch gut, aber iPhones, Macs, viele Autoradios und die meisten Musik-Apps spielen sie nicht ab.</p>
    <p>${NAME} liest die WMA in deinem Browser und speichert eine normale MP3. Die Datei bleibt die ganze Zeit auf deinem Gerät, so wird auch eine private Sammlung nirgendwohin hochgeladen.</p>
    <h3>Welche Qualität soll ich wählen?</h3>
    <p>Alte WMA-Rips wurden oft mit 128 oder 192 kbps erstellt. Eine höhere Bitrate kann keine Details hinzufügen, die nicht da sind, deshalb sind <strong>192 kbps</strong> eine vernünftige Wahl. Wurde die WMA mit hoher Bitrate oder als WMA Lossless gerippt, nimm <strong>320 kbps</strong>, um so viel zu behalten, wie MP3 erlaubt.</p>
    <h3>Ein ganzer Ordner voller WMA-Dateien</h3>
    <p>Wähle mehrere Dateien zusammen aus oder zieh sie hinein, tippe auf <strong>Alle konvertieren</strong> und lade sie einzeln oder als ein ZIP herunter. Am Computer ist das der schnellste Weg, eine alte Musiksammlung umzuziehen. Denk daran, dass Tags und Albumcover nicht in die neuen Dateien übernommen werden. Die Songtitel musst du danach also eventuell in deiner Musik-App korrigieren.</p>
    <h3>Geschützte WMA-Dateien</h3>
    <p>Manche WMA-Dateien aus alten Online-Shops oder Abo-Diensten haben einen Kopierschutz (DRM). Diese kann weder ${NAME} noch ein anderes Browser-Tool öffnen. Normale CD-Rips haben kein DRM und lassen sich problemlos umwandeln.</p>
    <p>Du willst nur einen Teil eines Songs, zum Beispiel als Klingelton? Wandle ihn zuerst um und öffne die MP3 dann in <a href="/de/klingelton-erstellen/">Klingelton erstellen</a> oder <a href="/de/audio-schneiden/">Audio schneiden</a>.</p>`,
    faq: [
      ['Wie wandle ich WMA in MP3 um?', 'Öffne die WMA-Datei oben, wähle MP3 und eine Qualität, tippe dann auf Konvertieren und auf Herunterladen.'],
      ['Kann ich WMA auf dem Mac oder iPhone umwandeln?', 'Ja. Die Umwandlung läuft im Browser, deshalb funktioniert sie auf Mac, iPhone und Android, obwohl diese WMA selbst nicht abspielen können.'],
      ['Warum lässt sich meine WMA-Datei nicht umwandeln?', 'Sie hat wahrscheinlich einen Kopierschutz (DRM). Geschützte WMA-Dateien können nicht umgewandelt werden. Ungeschützte Dateien wie deine eigenen CD-Rips funktionieren ganz normal.'],
      ['Verliert WMA zu MP3 an Qualität?', 'Beide Formate sind komprimiert, also ein wenig. Mit 192 oder 320 kbps hört man es kaum.'],
      ['Die umgewandelten MP3s haben keine Songtitel. Warum?', 'Tags und Albumcover werden aus Datenschutzgründen aus der neuen Datei entfernt. Trag die Titel in deiner Musik-App ein oder benenne die Dateien vor dem Umwandeln um.'],
    ],
  },
  {
    key: 'c-aiff', convLabel: 'AIFF zu MP3', path: 'de/aiff-zu-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `AIFF in MP3 umwandeln: online, gratis, privat | ${NAME}`,
    description: 'Wandle AIFF- und AIF-Dateien von Mac, GarageBand oder Logic in MP3 um. Die Dateien werden bis zu 10-mal kleiner. Bis 320 kbps. Gratis, nichts wird hochgeladen.',
    h1: '<em>AIFF zu MP3</em> Konverter',
    lead: 'Mach aus großen AIFF- und AIF-Dateien von deinem Mac, aus GarageBand oder Logic kleine MP3s, die sich leicht teilen lassen.',
    badges: ['AIFF und AIF', 'Bis 320 kbps', 'Ohne Upload'],
    steps: [
      ['Öffne die AIFF', 'Wähle eine .aiff- oder .aif-Datei oder zieh mehrere auf einmal hinein.'],
      ['Wähle 320 kbps', 'AIFF hat volle Qualität, also behalte so viel davon, wie MP3 kann.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Was ist eine AIFF-Datei?</h2>
    <p>AIFF ist Apples unkomprimiertes Audioformat, die Mac-Version von WAV. GarageBand und Logic können Songs als AIFF exportieren, ältere CD-Importe in iTunes waren oft AIFF, und viele Sample-Packs und Soundeffekte kommen als <code>.aif</code>-Dateien. Der Klang ist hervorragend, aber ein Song von drei Minuten belegt etwa 30 MB.</p>
    <p>Als MP3 mit 320 kbps ist derselbe Song etwa 7 MB groß und klingt fast identisch. Das ist klein genug, um ihn im Chat zu senden, auf eine Seite mit Größenlimit hochzuladen oder auf dem Handy zu behalten.</p>
    <h3>Einen eigenen Song teilen</h3>
    <p>Du hast einen Track in GarageBand fertig? Exportiere ihn als AIFF, öffne ihn hier und speichere eine MP3 für Freunde, Bandkollegen oder Social Media. Nimm unter Effekte die <strong>Auto-Lautstärke</strong>, wenn dein Mix viel leiser ist als Songs in Streaming-Apps. Willst du nur einen kurzen Teil teilen, zieh über die Wellenform, um diesen Abschnitt zu behalten, und füge ein Ausblenden hinzu.</p>
    <h3>Viele Samples umwandeln</h3>
    <p>Wähle mehrere AIFF-Dateien auf einmal und tippe auf <strong>Alle konvertieren</strong>. Du kannst jede MP3 einzeln oder alle als ein ZIP herunterladen. Behalte die AIFF-Originale, wenn du sie vielleicht noch einmal bearbeitest: Eine MP3 ist super zum Anhören, aber nicht zum Weitermischen.</p>
    <h3>Du brauchst ein anderes Format?</h3>
    <p>Zum Bearbeiten unter Windows bevorzugen viele Apps WAV. Wähle WAV im Menü Format oder lies den Unterschied bei <a href="/de/mp3-zu-wav/">MP3 zu WAV</a> nach. Willst du volle Qualität behalten und trotzdem Platz sparen, nimm FLAC: Es ist verlustfrei und etwa halb so groß. Wie das funktioniert, erklärt die Seite <a href="/de/wav-zu-flac/">WAV zu FLAC</a>.</p>`,
    faq: [
      ['Ist AIF dasselbe wie AIFF?', 'Ja. Beide Endungen werden für dasselbe Format verwendet, und beide lassen sich hier umwandeln.'],
      ['Verliert AIFF zu MP3 an Qualität?', 'Ein wenig, weil MP3 komprimiert ist. Mit 320 kbps hören die meisten keinen Unterschied.'],
      ['Kann ich AIFF unter Windows oder Android umwandeln?', 'Ja. Der Konverter läuft im Browser und funktioniert deshalb auf jedem Computer und Handy.'],
      ['Meine AIFF-Datei lässt sich nicht öffnen. Was kann ich tun?', 'Einige seltene AIFF-C-Varianten können fehlschlagen. Exportiere die Datei aus GarageBand, Logic oder Musik noch einmal als normales AIFF oder WAV und versuch es erneut.'],
    ],
  },
  {
    key: 'c-mkv', convLabel: 'MKV zu MP3', path: 'de/mkv-zu-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `MKV in MP3 umwandeln: Ton extrahieren, gratis | ${NAME}`,
    description: 'Extrahiere den Ton aus MKV-Videos und speichere ihn als MP3, M4A oder WAV. Bis 320 kbps, direkt im Browser. Gratis, ohne Anmeldung, nichts wird hochgeladen.',
    h1: '<em>MKV zu MP3</em> Konverter',
    lead: 'Hol den Ton aus einem MKV-Video und speichere ihn als MP3, die auf jedem Gerät läuft.',
    badges: ['MKV-Videos', 'Bis 320 kbps', 'Ohne Upload'],
    steps: [
      ['Öffne die MKV', 'Tippe oben auf das Feld und wähle das Video oder zieh es hinein.'],
      ['Kürze es, wenn du willst', 'Zieh über die Wellenform, um nur eine Szene oder einen Song zu behalten.'],
      ['Lade die MP3 herunter', 'Wähle eine Qualität, tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Was steckt in einer MKV-Datei?</h2>
    <p>MKV (Matroska) ist ein Container, der Video, mehrere Tonspuren und Untertitel in einer Datei enthalten kann. Bildschirmrekorder wie OBS, Videoeditoren und viele Download-Tools speichern MKV. Handys und manche Player öffnen es nicht, aber der Ton darin ist meist ganz normales AAC, Opus, Vorbis oder AC-3, das ${NAME} in eine MP3 umwandeln kann.</p>
    <h3>Videos mit mehr als einer Tonspur</h3>
    <p>Manche MKV-Dateien haben mehrere Tonspuren, zum Beispiel zwei Sprachen oder einen Kommentar neben dem Hauptton. ${NAME} nutzt die Haupttonspur, meist die erste. Brauchst du eine andere Spur, entferne die übrigen Spuren zuerst in einem Video-Tool wie MKVToolNix und öffne die Datei dann hier.</p>
    <h3>Gute Einsatzmöglichkeiten</h3>
    <ul>
      <li>Speichere die Musik aus einem Konzert oder einer Livestream-Aufnahme.</li>
      <li>Mach aus einem aufgezeichneten Vortrag oder Gaming-Kommentar eine MP3 im Podcast-Stil.</li>
      <li>Schneide einen Satz aus einem Clip und mach daraus einen <a href="/de/klingelton-erstellen/">Klingelton</a>.</li>
    </ul>
    <h3>Welches Format?</h3>
    <p><strong>MP3</strong> läuft überall: Nimm 320 kbps für Musik und 128 kbps für Sprache. <strong>M4A</strong> speichert AAC-Ton etwas effizienter, und <strong>WAV</strong> ist am besten, wenn du den Ton in einem anderen Programm bearbeitest. Aufnahme zu leise? Schalte vor dem Konvertieren unter Effekte die <strong>Auto-Lautstärke</strong> ein.</p>
    <h3>Große Dateien</h3>
    <p>MKV-Dateien von ganzen Filmen können riesig sein. ${NAME} nimmt Dateien bis 1 GB an, und Computer kommen mit großen Videos viel besser zurecht als Handys. Andere Videoformate haben eigene Seiten, etwa <a href="/de/avi-zu-mp3/">AVI zu MP3</a> und <a href="/mov-to-mp3/">MOV to MP3</a> (auf Englisch), oder du nimmst das allgemeine Tool <a href="/de/video-zu-mp3/">Video zu MP3</a>.</p>`,
    faq: [
      ['Wie wandle ich MKV in MP3 um?', 'Öffne die MKV oben, wähle MP3 und eine Qualität, tippe dann auf Konvertieren und auf Herunterladen.'],
      ['Welche Tonspur wird verwendet?', 'Die Haupttonspur des Videos, meist die erste. Andere Spuren werden ignoriert.'],
      ['Kann ich die Untertitel behalten?', 'Nein. Nur der Ton wird gespeichert. Untertitel und Video fallen weg.'],
      ['Die MP3 ist stumm oder in der falschen Sprache. Warum?', `${NAME} nutzt die Haupttonspur, meist die erste. Entferne die anderen Spuren mit einem Tool wie MKVToolNix oder prüfe, ob das Video beim Abspielen Ton hat.`],
    ],
  },
  {
    key: 'c-avi', convLabel: 'AVI zu MP3', path: 'de/avi-zu-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `AVI in MP3 umwandeln: online, gratis, ohne Upload | ${NAME}`,
    description: 'Hol den Ton aus alten AVI-Videos von Kameras und PCs und speichere ihn als MP3. Bis 320 kbps, direkt im Browser. Kostenlos und privat, nichts wird hochgeladen.',
    h1: '<em>AVI zu MP3</em> Konverter',
    lead: 'Rette den Ton aus alten AVI-Videos von Digitalkameras, Camcordern und Windows-PCs.',
    badges: ['Alte Kameravideos', 'Bis 320 kbps', 'Ohne Upload'],
    steps: [
      ['Öffne die AVI', 'Wähle die .avi-Datei von deinem Gerät.'],
      ['Wähle den Teil, den du brauchst', 'Zieh über die Wellenform oder behalte alles.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Alte AVI-Videos, neues Leben</h2>
    <p>AVI war lange das Standard-Videoformat unter Windows. Viele kompakte Digitalkameras aus den 2000ern haben ihre Clips ebenfalls als AVI gespeichert. Diese Dateien sind oft voller Geburtstagslieder, Schulaufführungen und Stimmen aus der Familie, aber moderne Handys und Fernseher weigern sich häufig, sie abzuspielen.</p>
    <p>${NAME} öffnet die AVI in deinem Browser, nimmt die Tonspur und speichert sie als MP3, die du behalten, teilen oder im Auto hören kannst. Das Video verlässt nie dein Gerät.</p>
    <h3>Alte Aufnahmen besser klingen lassen</h3>
    <p>Kameramikrofone aus dieser Zeit waren nicht besonders gut. Öffne vor dem Konvertieren die <strong>Effekte</strong>:</p>
    <ul>
      <li><strong>Auto-Lautstärke</strong> macht eine leise Aufnahme so laut wie bei Streaming-Apps, ohne Verzerrung.</li>
      <li><strong>KI-Rauschentfernung</strong> entfernt Wind, Brummen und Gemurmel hinter den Stimmen.</li>
      <li>Tippe auf <strong>Mit Effekten abspielen</strong>, um das Ergebnis vor dem Herunterladen zu hören.</li>
    </ul>
    <p>Ist eine Aufnahme immer noch zu leise, kannst du sie mit <a href="/de/lautstaerke-erhoehen/">Lautstärke erhöhen</a> weiter anheben.</p>
    <h3>Welche Qualität?</h3>
    <p>Der Ton in alten Kamera-AVIs ist oft mono und in niedriger Qualität aufgenommen, deshalb reichen meist <strong>128 kbps</strong>, und die Datei bleibt klein. Nimm 320 kbps für Musikvideos oder Clips, die von DVDs gerippt wurden.</p>
    <h3>Wenn sich die AVI nicht öffnen lässt</h3>
    <p>AVI kann viele verschiedene Codecs enthalten. Fast alle gängigen funktionieren, aber ein paar sehr alte oder ungewöhnliche können fehlschlagen. Spiel die Datei in diesem Fall in VLC ab: Hat sie dort auch keinen Ton, enthält die AVI vielleicht gar keine Tonspur. Für andere Videoformate siehe <a href="/de/3gp-zu-mp3/">3GP zu MP3</a> und <a href="/de/mkv-zu-mp3/">MKV zu MP3</a>.</p>`,
    faq: [
      ['Wie wandle ich AVI in MP3 um?', 'Öffne die AVI oben, wähle MP3 und eine Qualität, tippe auf Konvertieren und dann auf Herunterladen.'],
      ['Kann ich AVI auf dem Handy in MP3 umwandeln?', 'Ja, es funktioniert im Browser auf iPhone und Android. Sehr lange Videos gehen am Computer leichter.'],
      ['Wird das Video hochgeladen?', 'Nein. Alles passiert auf deinem Gerät, deine Familienvideos bleiben also privat.'],
      ['Die AVI läuft, aber die MP3 ist stumm. Warum?', 'Manche Kameras haben Videos ohne Ton gespeichert, oder die Tonspur ist beschädigt. Ist das Video auch in VLC stumm, gibt es nichts zu extrahieren.'],
    ],
  },
  {
    key: 'c-3gp', convLabel: '3GP zu MP3', path: 'de/3gp-zu-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `3GP in MP3 umwandeln: für alte Handyvideos | ${NAME}`,
    description: 'Wandle 3GP-Videos und Aufnahmen von alten Handys in MP3 um. Verbessere den Ton und speichere ihn direkt im Browser. Kostenlos, privat, nichts wird hochgeladen.',
    h1: '<em>3GP zu MP3</em> Konverter',
    lead: 'Rette den Ton aus 3GP-Videos und Sprachaufnahmen von alten Nokia-, Samsung- und anderen Tastenhandys.',
    badges: ['Alte Handyvideos', 'Rauschentfernung', 'Ohne Upload'],
    steps: [
      ['Öffne die 3GP', 'Wähle die .3gp-Datei von deinem Gerät oder deiner Speicherkarte.'],
      ['Verbessere den Ton', 'Schalte unter Effekte die Auto-Lautstärke oder die KI-Rauschentfernung ein, wenn du willst.'],
      ['Lade die MP3 herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Was ist eine 3GP-Datei?</h2>
    <p>3GP ist das Videoformat, das die meisten Handys vor den Smartphones genutzt haben. Nokia, Sony Ericsson, Samsung und viele andere Handys haben Kameravideos und manchmal auch Sprachaufnahmen als <code>.3gp</code> gespeichert. Heutige Musik-Apps, iPhones und Computer können sie oft nicht abspielen, obwohl die Dateien winzig sind.</p>
    <p>${NAME} liest die 3GP und speichert den Ton als normale MP3. Viele dieser Dateien nutzen AMR, einen Codec für Telefongespräche, den nur wenige Player unterstützen. Die MP3-Version läuft überall, und alles passiert auf deinem Gerät, es wird also nichts hochgeladen.</p>
    <h3>So bekommst du den besten Klang</h3>
    <p>Handymikrofone aus den 2000ern haben in niedriger Qualität aufgenommen, meist in Mono. Das Umwandeln kann keine Details hinzufügen, aber die Aufnahme viel angenehmer zum Anhören machen:</p>
    <ul>
      <li>Schalte die <strong>Auto-Lautstärke</strong> ein, um leise Stimmen anzuheben.</li>
      <li>Schalte die <strong>KI-Rauschentfernung</strong> gegen Wind und Hintergrundgeräusche ein.</li>
      <li>Nimm <strong>128 kbps</strong>. Höhere Einstellungen machen die Datei nur größer.</li>
    </ul>
    <h3>Ideen für alte Handyclips</h3>
    <p>Bewahre die Stimme deiner Großeltern auf, speichere ein Lied von einem Schulkonzert oder mach aus einem lustigen alten Clip einen <a href="/de/klingelton-erstellen/">Klingelton</a>. Du willst nur ein paar Sekunden? Zieh über die Wellenform, um sie auszuwählen, oder öffne die MP3 später in <a href="/de/audio-schneiden/">Audio schneiden</a>.</p>
    <h3>Die Dateien vom Handy holen</h3>
    <p>Alte Handys haben Videos meist auf einer Speicherkarte gespeichert. Steck die Karte in einen Kartenleser oder verbinde das Handy per USB-Kabel und kopier die 3GP-Dateien auf deinen Computer. Öffne sie dann hier. Videos von neueren Handys sind MP4 oder MOV: siehe <a href="/de/video-zu-mp3/">Video zu MP3</a>.</p>`,
    faq: [
      ['Wie wandle ich 3GP in MP3 um?', 'Öffne die 3GP oben, wähle MP3, tippe auf Konvertieren und dann auf Herunterladen.'],
      ['Warum klingt die MP3 immer noch etwas dumpf?', 'Alte Handys haben in niedriger Qualität aufgenommen. Das Umwandeln behält, was da ist, kann fehlende Details aber nicht wiederherstellen. Auto-Lautstärke und KI-Rauschentfernung helfen bei Stimmen sehr.'],
      ['Kann ich 3GP auf dem Handy umwandeln?', 'Ja. Es funktioniert im Browser auf iPhone und Android, ohne App-Installation.'],
      ['Meine 3GP ist eine Sprachaufnahme, kein Video. Geht das?', 'Ja. Reine Audio-3GP-Dateien werden genauso umgewandelt, und .amr-Sprachaufnahmen auch.'],
    ],
  },
  {
    key: 'c-mp3ogg', convLabel: 'MP3 zu OGG', path: 'de/mp3-zu-ogg', tool: 'converter', format: 'ogg', crumb: 'Converters',
    title: `MP3 in OGG umwandeln: online, gratis (Vorbis) | ${NAME}`,
    description: 'Wandle MP3 in OGG Vorbis um, für Game-Engines, Open-Source-Apps und Linux. Wähle die Qualität und kürze die Datei im Browser. Gratis, nichts wird hochgeladen.',
    h1: '<em>MP3 zu OGG</em> Konverter',
    lead: 'Mach aus MP3s OGG-Vorbis-Dateien für Spiele, Game-Engines und Open-Source-Software.',
    badges: ['OGG Vorbis', 'Für Spiele-Audio', 'Ohne Upload'],
    steps: [
      ['Öffne die MP3', 'Wähle eine MP3 oder zieh mehrere Dateien auf einmal hinein.'],
      ['OGG ist schon ausgewählt', 'Wähle eine Qualität. 192 kbps ist eine gute Standardwahl.'],
      ['Lade die OGG herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Warum MP3 in OGG umwandeln?</h2>
    <p>OGG Vorbis ist ein offenes, lizenzfreies Audioformat. Game-Engines wie Godot und Unity importieren es direkt, und viele Spiele nutzen es für Musik und Soundeffekte. Linux-Desktop-Apps und viele Open-Source-Programme bevorzugen ebenfalls OGG. Wenn ein Tool nach <code>.ogg</code> fragt, kommst du hier schnell an eine.</p>
    <h3>Welche Qualität soll ich wählen?</h3>
    <p>${NAME} nutzt den Vorbis-Qualitätsmodus, der die Bitrate an den Klang anpasst. Die gewählte Einstellung ist ein ungefähres Ziel:</p>
    <ul>
      <li><strong>192 kbps</strong>: eine gute Standardwahl für Spielmusik.</li>
      <li><strong>128 kbps</strong>: reicht für Sprachausgaben und die meisten Soundeffekte und ist kleiner.</li>
      <li><strong>320 kbps</strong>: lohnt sich nur, wenn die MP3 selbst 320 kbps hatte.</li>
    </ul>
    <p>MP3 und OGG sind beide komprimiert, deshalb geht bei jeder Umwandlung von einem ins andere ein klein wenig verloren. Hast du noch die originale WAV oder FLAC, wandle lieber diese um, dann wird das Ergebnis am saubersten.</p>
    <h3>Spiele-Audio in einem Rutsch vorbereiten</h3>
    <p>Zieh vor dem Konvertieren über die Wellenform, um Stille am Anfang oder Ende abzuschneiden, damit ein Musik-Loop genau auf dem Beat beginnt. Öffne die <strong>Effekte</strong>, um eine Blende hinzuzufügen, Tempo oder Tonhöhe zu ändern oder die Lautstärke mit der <strong>Auto-Lautstärke</strong> anzugleichen. Um einen langen Track in Stücke zu teilen, nimm <a href="/de/audio-aufteilen/">Audio aufteilen</a>.</p>
    <h3>Viele Dateien auf einmal</h3>
    <p>Wähle mehrere MP3s zusammen aus, tippe auf <strong>Alle konvertieren</strong> und lade sie als ein ZIP herunter. Praktisch für einen Ordner voller Soundeffekte.</p>
    <p>Du willst in die andere Richtung? Der Konverter <a href="/de/ogg-zu-mp3/">OGG zu MP3</a> macht aus OGG-Dateien wieder MP3s für Handys und Autos.</p>`,
    faq: [
      ['Ist die OGG Vorbis oder Opus?', 'Vorbis, die Variante, die Game-Engines und die meisten Apps von einer .ogg-Datei erwarten.'],
      ['Wird die OGG kleiner als die MP3?', 'Bei ähnlicher Qualitätseinstellung ist sie etwa gleich groß, oft ein wenig kleiner.'],
      ['Verliert MP3 zu OGG an Qualität?', 'Ein wenig, weil beide Formate komprimiert sind. Ab 192 kbps hört man es kaum.'],
      ['Kann ich einen nahtlosen Musik-Loop machen?', 'Zieh vor dem Konvertieren die Griffe auf der Wellenform, um Stille am Anfang und Ende abzuschneiden. Exakte Loop-Punkte legst du am besten in deiner Game-Engine fest.'],
    ],
  },
  {
    key: 'c-wavflac', convLabel: 'WAV zu FLAC', path: 'de/wav-zu-flac', tool: 'converter', format: 'flac', crumb: 'Converters',
    title: `WAV in FLAC umwandeln: verlustfrei und gratis | ${NAME}`,
    description: 'Wandle WAV online in FLAC um und mach Dateien etwa halb so groß, ganz ohne Qualitätsverlust. Kostenlos, privat und schnell. Dein Audio wird nie hochgeladen.',
    h1: '<em>WAV zu FLAC</em> Konverter',
    lead: 'Verkleinere große WAV-Dateien zu verlustfreiem FLAC. Gleicher Klang, etwa halb so viel Platz.',
    badges: ['Verlustfrei', 'Etwa halb so groß', 'Ohne Upload'],
    steps: [
      ['Öffne die WAV', 'Wähle eine WAV-Datei oder zieh mehrere auf einmal hinein.'],
      ['FLAC ist schon ausgewählt', 'Lass die Effekte aus, um eine exakte Kopie zu bekommen.'],
      ['Lade die FLAC herunter', 'Tippe auf Konvertieren und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Verlustfrei, aber kleiner</h2>
    <p>WAV speichert jedes Sample unkomprimiert, etwa 10 MB pro Minute bei Stereo in CD-Qualität. FLAC packt genau denselben Ton enger zusammen, ein bisschen wie eine ZIP-Datei für Klang. Die meiste Musik landet bei etwa der halben Größe, leise Aufnahmen oder Sprache manchmal noch kleiner. Wenn du die FLAC abspielst, klingt sie identisch wie die WAV.</p>
    <p>Für FLAC gibt es keine Qualitätseinstellung, weil nichts weggeworfen wird. Das Qualitätsmenü zählt nur bei MP3, M4A und OGG.</p>
    <h3>Wann FLAC sinnvoll ist</h3>
    <ul>
      <li><strong>Archivieren</strong> von Aufnahmen, CD-Rips oder eigenen Songs, ohne etwas zu verlieren.</li>
      <li><strong>Platz sparen</strong> auf einer Festplatte voller WAV-Dateien von einem Recorder oder aus Musiksoftware.</li>
      <li><strong>Hi-Fi-Player</strong> und Musikserver, die FLAC und seine Tags lesen.</li>
    </ul>
    <h3>Wann du etwas anderes nehmen solltest</h3>
    <p>iPhones spielen FLAC nicht in der Musik-App ab, und viele Autoradios überspringen es. Zum alltäglichen Hören auf dem Handy ist <a href="/de/wav-zu-mp3/">WAV zu MP3</a> mit 320 kbps viel kleiner und klingt sehr ähnlich. Du brauchst später wieder eine WAV? Der Konverter <a href="/de/flac-zu-wav/">FLAC zu WAV</a> gibt dir eine exakte 16-Bit-Kopie.</p>
    <h3>Einen ganzen Ordner umwandeln</h3>
    <p>Wähle mehrere WAV-Dateien zusammen aus, tippe auf <strong>Alle konvertieren</strong> und lade die FLAC-Dateien einzeln oder als ein ZIP herunter. Prüf bei ein paar der neuen Dateien, ob sie richtig abspielen, bevor du Originale löschst.</p>
    <h3>Effekte verändern das Audio</h3>
    <p>Für eine echte verlustfreie Kopie lass die <strong>Effekte</strong> aus und behalte die ganze Datei ausgewählt. Kürzt du die Datei, fügst eine Blende hinzu oder schaltest die Auto-Lautstärke ein, enthält die FLAC die veränderte Version, aber weiterhin ohne zusätzlichen Kompressionsverlust.</p>`,
    faq: [
      ['Verliert WAV zu FLAC an Qualität?', 'Nein. FLAC ist verlustfrei: Beim Dekodieren bekommst du genau denselben Ton zurück wie in der WAV.'],
      ['Wie viel kleiner ist FLAC als WAV?', 'Meist etwa halb so groß. Leise oder einfache Aufnahmen schrumpfen stärker, dichte, laute Musik etwas weniger.'],
      ['Kann ich FLAC wieder in WAV umwandeln?', 'Ja, mit dem Konverter FLAC zu WAV, ohne jeden Verlust.'],
      ['Hat meine FLAC Tags und Albumcover?', 'Nein. Metadaten werden aus Datenschutzgründen aus der neuen Datei entfernt. Trag Songtitel und Cover danach in deiner Musik-App ein.'],
    ],
  },
];
