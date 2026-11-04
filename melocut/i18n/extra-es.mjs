// Spanish versions of the newer pages. Each `key` matches the English page (build.mjs KEY_OF).
export const toolPaths = { 'audio-splitter': 'es/dividir-audio' };
export default (NAME) => [
  {
    key: 'splitter', path: 'es/dividir-audio', tool: 'splitter', crumb: 'Tools',
    title: `Dividir audio: divide un MP3 en partes online gratis | ${NAME}`,
    description: 'Divide un MP3, pódcast o grabación larga en partes iguales o en una parte cada pocos minutos. Descarga todas en un ZIP. Gratis, privado y sin subir nada.',
    h1: '<em>Dividir audio</em>: divide un MP3 en partes',
    lead: 'Corta una canción larga, un pódcast, una clase o un audiolibro en partes iguales, o en una parte nueva cada pocos minutos. Todas las partes llegan en un solo ZIP.',
    badges: ['De 2 a 10 partes', 'O cada N minutos', 'Un solo ZIP'],
    steps: [
      ['Abre tu archivo', 'Un MP3 largo, una grabación, un pódcast o un video.'],
      ['Elige cómo dividir', 'Elige un número de partes iguales, o una parte cada 1 a 30 minutos.'],
      ['Divide y descarga', 'Pulsa Dividir y luego Descargar todo (ZIP).'],
    ],
    content: `
    <h2>Qué se suele dividir</h2>
    <ul>
      <li><strong>Grabaciones largas y clases</strong> en partes de 10 o 15 minutos, más fáciles de compartir y de escuchar.</li>
      <li><strong>Pódcast y audiolibros</strong> en capítulos, para reproductores que recuerdan dónde te quedaste en cada archivo.</li>
      <li><strong>Notas de voz para WhatsApp o correo</strong> cuando un archivo es demasiado grande para enviarlo de una vez.</li>
      <li><strong>Una sesión de DJ o un concierto</strong> en secciones iguales.</li>
    </ul>
    <h3>¿Solo una parte del archivo?</h3>
    <p>Arrastra antes los controles sobre la onda. Solo se divide la parte seleccionada, así que puedes saltarte una intro o el silencio del final.</p>
    <h3>Formato y efectos</h3>
    <p>Cada parte se guarda en el formato que elijas: MP3, M4A, WAV, OGG o FLAC. Los efectos también se aplican a cada parte: activa <strong>Volumen automático</strong> para igualar el volumen, o añade una <strong>Entrada suave</strong> y una <strong>Salida suave</strong> cortas para que las partes no empiecen ni terminen de golpe.</p>
    <p>¿Necesitas un trozo concreto? Usa <a href="/es/cortar-audio/">Cortar audio</a>. ¿Quieres volver a juntar las partes? Usa <a href="/es/unir-audio/">Unir audio</a>.</p>`,
    faq: [
      ['¿Cómo divido un MP3 en partes iguales?', 'Abre el MP3, elige por ejemplo 4 partes iguales, pulsa Dividir y descarga el ZIP con las cuatro partes.'],
      ['¿Puedo dividir un archivo cada 10 minutos?', 'Sí. Elige Cada 10 min. La última parte se queda con lo que sobre.'],
      ['¿Se sube el archivo?', 'No. Se divide dentro de tu navegador.'],
      ['¿Cómo abro el ZIP en el celular?', 'En iPhone, toca el ZIP en la app Archivos y se descomprime en una carpeta. En Android, ábrelo en Archivos y toca Extraer.'],
    ],
  },
  {
    key: 'normalize', path: 'es/normalizar-audio', tool: 'converter', crumb: 'Tools', fx: { normalize: true }, suffix: ' (normalizado)',
    note: 'Volumen automático está activado. Lleva todo el archivo a un volumen parejo, como el de las apps de música. Pulsa Reproducir con efectos para oírlo.',
    title: `Normalizar audio online: iguala el volumen de un MP3 | ${NAME}`,
    description: 'Normaliza audio online: deja archivos bajos y altos con el mismo volumen, como Spotify y YouTube. MP3, WAV, notas de voz y videos. Gratis y sin subir nada.',
    h1: '<em>Normalizar audio</em> online',
    lead: 'Lleva cualquier grabación o canción a un volumen parejo y estándar, para que los archivos bajos se oigan claros y los altos no revienten. Un limitador lo mantiene limpio.',
    badges: ['Volumen de streaming', 'Sin saturación', 'Sin subir archivos'],
    steps: [
      ['Abre tu archivo', 'Una canción, nota de voz, pódcast, clase o video.'],
      ['Escucha', 'Volumen automático ya está activado. Pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Qué hace normalizar</h2>
    <p><strong>Volumen automático</strong> mide qué tan fuerte suena todo el archivo para quien lo escucha, no solo su pico más alto, y lo lleva más o menos al mismo nivel que usan las apps de música. Luego un limitador frena los momentos más fuertes para que nada cruja. Las grabaciones bajas quedan claras; los archivos que ya eran fuertes quedan casi como estaban.</p>
    <h3>Varios archivos con el mismo volumen</h3>
    <p>¿Armas una playlist o un pódcast con varios clips? Normaliza cada uno, o júntalos con <a href="/es/unir-audio/">Unir audio</a> y activa ahí <strong>Igualar volumen</strong>.</p>
    <h3>¿Sigue muy bajo?</h3>
    <p>Sube también el control de Volumen en Efectos, o usa <a href="/es/subir-volumen/">Subir volumen</a>.</p>`,
    faq: [
      ['¿Qué es normalizar un audio?', 'Ajustar un archivo para que su volumen general llegue a un nivel estándar. MeloCut normaliza por sonoridad, es decir, según qué tan fuerte suena y no solo según su pico más alto.'],
      ['¿Normalizar distorsiona el audio?', 'No. Un limitador mantiene los picos bajo control, así que el resultado suena más fuerte sin saturar.'],
      ['¿Puedo normalizar varios archivos a la vez?', 'Normalízalos uno por uno aquí, o júntalos con Unir audio y activa Igualar volumen.'],
    ],
  },
  {
    key: 'mono', path: 'es/estereo-a-mono', tool: 'converter', crumb: 'Tools', fx: { mono: true }, suffix: ' (mono)',
    note: 'Mono está activado: los dos canales se mezclan en uno. Pulsa Reproducir con efectos para comprobarlo.',
    title: `Convertir estéreo a mono: audio mono online gratis | ${NAME}`,
    description: 'Convierte audio estéreo a mono online: mezcla izquierda y derecha en un canal para parlantes, llamadas, pódcast o archivos más pequeños. Gratis y privado.',
    h1: 'Convertir <em>estéreo a mono</em>',
    lead: 'Mezcla los canales izquierdo y derecho en uno, para que el sonido sea igual en todos los parlantes y con un solo auricular.',
    badges: ['Izquierda + derecha', 'WAV más pequeño', 'Sin subir archivos'],
    steps: [
      ['Abre tu archivo', 'Cualquier canción, grabación o video.'],
      ['Escucha', 'Mono ya está activado. Pulsa Reproducir con efectos.'],
      ['Descarga', 'Elige un formato, pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Cuándo es mejor el mono</h2>
    <ul>
      <li><strong>Un solo auricular o un solo parlante:</strong> no se pierde nada de lo que sonaba solo del otro lado.</li>
      <li><strong>Grabaciones de voz y pódcast:</strong> una voz metida en un solo oído suena rara; el mono la pone en el centro.</li>
      <li><strong>Archivos más pequeños:</strong> un WAV mono ocupa la mitad que uno estéreo.</li>
    </ul>
    <p>Los dos canales se mezclan, así que conservas todo lo que había en cualquiera de los lados.</p>
    <h3>¿La voz suena de un solo lado?</h3>
    <p>Algunas grabaciones tienen la voz solo en el canal izquierdo o en el derecho. El mono también lo arregla. Activa además <strong>Volumen automático</strong> si queda bajo.</p>`,
    faq: [
      ['¿Pasar a mono hace perder calidad?', 'Quita la imagen estéreo de izquierda a derecha, pero conserva todo el sonido de ambos lados. En la voz no notarás diferencia.'],
      ['¿El archivo queda más pequeño?', 'Un WAV o FLAC mono ocupa más o menos la mitad. En MP3 el tamaño depende sobre todo del bitrate que elijas.'],
    ],
  },
  {
    key: 'reverb', path: 'es/anadir-reverb', tool: 'converter', crumb: 'Tools', fx: { reverb: 40 }, suffix: ' (reverb)',
    note: 'La reverb está en 40%. Mueve el control de Reverb y pulsa Reproducir con efectos para oírla.',
    title: `Añadir reverb a un audio online: eco y ambiente gratis | ${NAME}`,
    description: 'Añade reverb a voces, canciones y notas de voz online. Elige cuánto ambiente quieres, escúchalo primero y descárgalo. Gratis, privado y sin subir nada.',
    h1: 'Añadir <em>reverb</em> a un audio',
    lead: 'Dale espacio a una grabación seca: desde una sala pequeña hasta un gran salón. Ajusta la cantidad, escucha y descarga.',
    badges: ['De 0 a 100%', 'Escúchalo antes', 'MP3 o WAV'],
    steps: [
      ['Abre tu archivo', 'Una voz, canción, nota de voz o video.'],
      ['Ajusta la cantidad', 'Está en 40%. Mueve el control de Reverb y pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Cuánta reverb?</h2>
    <ul>
      <li><strong>10 a 25%:</strong> una sala natural. Va bien para voces grabadas en casa y locuciones.</li>
      <li><strong>30 a 50%:</strong> un sonido amplio y de ensueño, como en los edits slowed + reverb.</li>
      <li><strong>60% o más:</strong> un salón o una cueva, como efecto.</li>
    </ul>
    <h3>Combinaciones populares</h3>
    <p>Para la tendencia clásica, baja también la velocidad y el tono, o empieza en <a href="/es/slowed-reverb/">Slowed + Reverb</a>. Para una voz en un espacio enorme, prueba la voz <em>Eco</em> del <a href="/es/cambiador-de-voz/">Cambiador de voz</a>.</p>`,
    faq: [
      ['¿Qué diferencia hay entre reverb y eco?', 'La reverb es la cola suave del sonido en una sala. Un eco es una repetición clara. La reverb de MeloCut da sonido de sala; la voz Eco del Cambiador de voz se acerca más a un gran espacio con eco.'],
      ['¿Puedo añadir reverb solo a mi voz?', 'La reverb se aplica a todo el archivo. Para que solo la lleve la voz, añádela a una grabación de voz antes de mezclarla con la música.'],
    ],
  },
  {
    key: 'c-compress', convLabel: 'Comprimir MP3', path: 'es/comprimir-mp3', tool: 'converter', format: 'mp3', quality: '64', crumb: 'Converters', suffix: ' (comprimido)',
    title: `Comprimir MP3: reduce el tamaño del audio gratis | ${NAME}`,
    description: 'Haz MP3 y archivos de audio más pequeños online: baja el bitrate, pásalo a mono y recórtalo. Gratis, privado y rápido. Tu archivo nunca se sube.',
    h1: '<em>Comprimir MP3</em> y archivos de audio',
    lead: 'Haz mucho más pequeño un MP3, una nota de voz o una grabación para que entre en los límites del correo, del chat o de las subidas. Elige una calidad más baja y mira el nuevo tamaño.',
    badges: ['De 64 a 320 kbps', 'Opción mono', 'Sin subir archivos'],
    steps: [
      ['Abre el archivo', 'Cualquier MP3, WAV, M4A u otro archivo de audio, o un video.'],
      ['Elige una calidad menor', 'Viene elegido 64 kbps. Usa 96 o 128 kbps para música.'],
      ['Descarga', 'Pulsa Convertir. El nuevo tamaño aparece antes de descargar.'],
    ],
    content: `
    <h2>¿Cuánto más pequeño?</h2>
    <p>El tamaño de un MP3 depende casi solo de su bitrate y su duración:</p>
    <ul>
      <li><strong>320 kbps:</strong> unos 2,4 MB por minuto.</li>
      <li><strong>128 kbps:</strong> alrededor de 1 MB por minuto.</li>
      <li><strong>96 kbps:</strong> unos 0,7 MB por minuto.</li>
      <li><strong>64 kbps:</strong> unos 0,5 MB por minuto. Suficiente para voz, pódcast y notas de voz.</li>
    </ul>
    <p>Así, una canción a 320 kbps queda unas cinco veces más pequeña a 64 kbps.</p>
    <h3>Aún más pequeño</h3>
    <ul>
      <li>Activa <strong>Mono</strong> en Efectos. En la voz no notarás diferencia.</li>
      <li>Arrastra sobre la onda para quedarte solo con la parte que necesitas.</li>
      <li>Activa <strong>Quitar silencios</strong> para cortar las pausas largas de las grabaciones.</li>
    </ul>
    <h3>¿Y la calidad?</h3>
    <p>Los bitrates bajos quitan detalle que se nota sobre todo en la música: 64 kbps suena bien para voces; para canciones usa de 96 a 128 kbps. Comprimir no puede hacer que un archivo suene mejor, así que guarda el original si puedes necesitarlo después.</p>`,
    faq: [
      ['¿Cómo hago un MP3 más pequeño?', 'Ábrelo aquí, deja 64 o 96 kbps, pulsa Convertir y descárgalo. Si activas Mono queda todavía más pequeño.'],
      ['¿Puedo comprimir varios archivos a la vez?', 'Sí. Elige varios archivos juntos en el Convertidor de audio y descárgalos en un solo ZIP.'],
      ['¿Se sube mi archivo?', 'No. Se comprime dentro de tu navegador.'],
    ],
  },
  {
    key: 'c-mp4wav', convLabel: 'MP4 a WAV', path: 'es/mp4-a-wav', tool: 'video-to-mp3', format: 'wav', crumb: 'Converters',
    title: `Convertir MP4 a WAV gratis y online | ${NAME}`,
    description: 'Convierte video MP4 a audio WAV online para edición, transcripción o programas de música. WAV de 16 bits, sin subir archivos ni registro. En celular y PC.',
    h1: 'Convertir <em>MP4 a WAV</em>',
    lead: 'Saca el sonido de un MP4 y guárdalo como WAV sin comprimir, listo para tu programa de edición.',
    badges: ['WAV de 16 bits', 'MP4, MOV, WebM', 'Sin subir archivos'],
    steps: [
      ['Abre el MP4', 'Elige un video de tu dispositivo.'],
      ['WAV ya está elegido', 'Arrastra antes sobre la onda si solo necesitas una parte.'],
      ['Descarga el WAV', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Por qué WAV?</h2>
    <p>WAV guarda el sonido sin añadir compresión, por eso es el formato que prefieren los programas de edición, los DAW y las herramientas de transcripción. El sonido de un MP4 normalmente ya viene comprimido; WAV lo conserva tal cual, sin perder nada más.</p>
    <p>Los archivos WAV son grandes, unos 10 MB por minuto. Si solo quieres escuchar, <a href="/es/mp4-a-mp3/">MP4 a MP3</a> te da un archivo mucho más pequeño.</p>`,
    faq: [
      ['¿Funciona con videos del iPhone?', 'Sí. Funcionan tanto los videos MOV como los MP4 del iPhone.'],
      ['¿Se sube el video?', 'No. El sonido se extrae dentro de tu navegador.'],
    ],
  },
  {
    key: 'c-m4awav', convLabel: 'M4A a WAV', path: 'es/m4a-a-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Convertir M4A a WAV gratis y online | ${NAME}`,
    description: 'Convierte M4A a WAV online: notas de voz del iPhone y audio de iTunes a WAV de 16 bits para programas de edición. Gratis, privado y sin subir nada.',
    h1: 'Convertir <em>M4A a WAV</em>',
    lead: 'Convierte notas de voz del iPhone y otros archivos M4A en WAV para edición, transcripción o programas de música.',
    badges: ['WAV de 16 bits', 'Notas de voz', 'Sin subir archivos'],
    steps: [
      ['Abre el M4A', 'En iPhone, primero comparte la nota de voz a Archivos y luego elígela aquí.'],
      ['WAV ya está elegido', 'Recórtalo o añade efectos si quieres.'],
      ['Descarga el WAV', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Cuándo necesitas WAV</h2>
    <p>Algunos editores, samplers y servicios de transcripción solo aceptan WAV. Al convertir tienes un archivo que todos abren. No hará que la grabación suene mejor que el M4A; solo la guarda sin más compresión.</p>
    <p>¿Nota de voz con ruido? Activa <strong>Quitar ruido con IA</strong> en Efectos antes de convertir.</p>`,
    faq: [
      ['¿Puedo convertir canciones protegidas de iTunes?', 'No. Las canciones con protección anticopia (DRM) no se pueden convertir.'],
      ['¿Cuánto ocupará el WAV?', 'Unos 10 MB por minuto en estéreo, la mitad en mono.'],
    ],
  },
  {
    key: 'c-flacwav', convLabel: 'FLAC a WAV', path: 'es/flac-a-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Convertir FLAC a WAV gratis y sin pérdida | ${NAME}`,
    description: 'Convierte FLAC a WAV online sin perder calidad. Los dos son sin pérdida, así que el sonido queda exactamente igual. Gratis, privado y sin subir nada.',
    h1: 'Convertir <em>FLAC a WAV</em>',
    lead: 'Convierte música FLAC sin pérdida a WAV para programas, dispositivos y grabadoras de CD que no abren FLAC.',
    badges: ['Sin pérdida', 'WAV de 16 bits', 'Sin subir archivos'],
    steps: [
      ['Abre el FLAC', 'Elige un archivo FLAC de tu dispositivo.'],
      ['WAV ya está elegido', 'Deja los efectos apagados para una copia exacta.'],
      ['Descarga el WAV', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>El mismo sonido, otro contenedor</h2>
    <p>FLAC y WAV son formatos sin pérdida, así que no se descarta nada. FLAC está comprimido como un archivo ZIP y WAV no, por eso el WAV ocupa más o menos el doble. ${NAME} guarda WAV de 16 bits, la misma calidad que un CD.</p>
    <p>¿Lo necesitas más pequeño? <a href="/flac-to-mp3/">FLAC a MP3</a> (en inglés) a 320 kbps suena muy parecido y ocupa una fracción.</p>`,
    faq: [
      ['¿Pasar de FLAC a WAV pierde calidad?', 'No con un FLAC normal de calidad CD. Los FLAC de alta resolución de 24 bits se guardan como WAV de 16 bits.'],
      ['¿Por qué el WAV ocupa más?', 'WAV no está comprimido, así que ocupa unos 10 MB por minuto.'],
    ],
  },
];
