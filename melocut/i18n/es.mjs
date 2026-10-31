// Spanish (neutral, "tú") pages and site text. Pages with the same `key` as an English page
// are linked to it with hreflang and the language switcher.
export default (NAME) => ({
  ui: {
    code: 'es', hreflang: 'es', ogLocale: 'es_ES', prefix: '/es', name: 'Español', short: 'ES',
    home: 'Inicio', tools: 'Herramientas', allTools: 'Todas las herramientas', navAll: 'Todas', popular: 'Las más usadas', installApp: 'Instalar app', menu: 'Menú',
    howItWorks: 'Cómo funciona', faq: 'Preguntas frecuentes', moreTools: 'Más herramientas gratis',
    noscript: 'Activa JavaScript para usar esta herramienta.', language: 'Idioma', homeAria: `Inicio de ${NAME}`,
    footerTagline: 'Herramientas de audio gratis que funcionan en tu navegador',
    fTools: 'Herramientas', fHelp: 'Ayuda e información', fGuides: 'Guías (en inglés)', fInstall: 'Instalar la app',
    fAbout: 'Acerca de y contacto', fPrivacy: 'Privacidad', fTerms: 'Términos', inEnglish: 'en inglés',
    ogAlt: (h1) => `${h1} en ${NAME}`, tag: 'Gratis · Privado · Sin subir archivos',
    install: 'Puedes añadir MeloCut a la pantalla de inicio de tu teléfono y abrirlo como una app. Usa una herramienta una vez con conexión y después seguirá funcionando sin internet.',
    installHow: 'Cómo instalarla (en inglés)',
    whyTitle: `Por qué usar ${NAME}`,
    why: [
      ['lock', 'Tus archivos se quedan contigo', 'Todo pasa en tu navegador. No se sube nada, así que nadie más ve tus archivos.'],
      ['bolt', 'Sin esperas', 'No hay subida ni cola de descarga. Una canción suele tardar unos segundos. Los videos largos tardan un poco más.'],
      ['phone', 'Teléfono o computadora', 'Funciona en Safari, Chrome, Edge y Firefox. También puedes instalarla en tu pantalla de inicio.'],
      ['sparkle', 'Gratis y sin marca de agua', 'Sin cuenta y sin nada añadido a tu audio. Úsala todas las veces que quieras.'],
    ],
  },
  tools: {
    'video-to-mp3': { title: 'Video a MP3', path: 'es/video-a-mp3', blurb: 'Saca el sonido de un video MP4, MOV o WebM.' },
    'ringtone-maker': { title: 'Creador de tonos', path: 'es/creador-de-tonos', blurb: 'Convierte parte de una canción en un tono para iPhone o Android.' },
    'audio-cutter': { title: 'Cortar audio', path: 'es/cortar-audio', blurb: 'Recorta una canción o quita un trozo del medio.' },
    'audio-converter': { title: 'Convertidor de audio', path: 'es/convertidor-de-audio', blurb: 'Cambia entre MP3, WAV, M4A, OGG y FLAC.' },
    'audio-joiner': { title: 'Unir audio', blurb: 'Junta varias canciones o clips en un solo archivo.' },
    'noise-remover': { title: 'Quitar ruido con IA', blurb: 'Limpia el ruido de fondo de las grabaciones de voz.' },
    'slowed-reverb': { title: 'Slowed + Reverb', blurb: 'Haz una versión lenta de una canción con reverb.' },
    'vocal-remover': { title: 'Quitar voz', blurb: 'Quita al cantante para tener una pista de karaoke.' },
    '8d-audio': { title: 'Audio 8D', blurb: 'Sonido que pasa de un oído al otro. Usa auriculares.' },
    'bass-booster': { title: 'Potenciador de graves', blurb: 'Añade más graves a cualquier canción.' },
    'volume-booster': { title: 'Subir volumen', blurb: 'Haz que las grabaciones bajas suenen más fuerte.' },
    'reverse-audio': { title: 'Audio al revés', blurb: 'Reproduce cualquier sonido al revés.' },
    'speed-up-audio': { title: 'Acelerar audio', blurb: 'Haz una canción o nota de voz más rápida, con el mismo tono.' },
    'slow-down-audio': { title: 'Ralentizar audio', blurb: 'Reproduce todo más lento sin voz grave.' },
    'pitch-changer': { title: 'Cambiar tono', blurb: 'Cambia la tonalidad de una canción sin cambiar la velocidad.' },
    'nightcore-maker': { title: 'Creador de nightcore', blurb: 'Más rápido y más agudo, el sonido nightcore clásico.' },
    'remove-silence': { title: 'Quitar silencios', blurb: 'Corta las pausas largas de una grabación.' },
    'fade-in-fade-out': { title: 'Fundido de entrada y salida', blurb: 'Añade un inicio y un final suaves a cualquier canción.' },
  },
  pages: [
    {
      key: 'home', path: 'es',
      title: `Cortar canciones, crear tonos y convertir a MP3 gratis | ${NAME}`,
      description: 'Corta canciones, crea tonos para iPhone y Android, añade efectos y convierte videos a MP3. Gratis, y tus archivos nunca salen de tu dispositivo.',
      h1: 'Corta canciones, crea tonos y añade efectos, <em>en tu navegador</em>',
      lead: 'Herramientas de audio gratis para tu teléfono o computadora. Tus archivos nunca se suben. Elige una herramienta para empezar.',
      badges: ['18 herramientas gratis', 'Quita ruido con IA', 'Sin subir archivos', 'Sin registro'],
      home: true,
      body: (L) => `
  <div class="section prose">
    <h2>Efectos en cada herramienta</h2>
    <p>Cada herramienta tiene un panel de <strong>Efectos y filtros</strong>. Puedes poner entrada y salida suaves, volumen, velocidad, tono, graves, agudos y reverb, o activar el audio 8D, quitar ruido con IA, quitar la voz y más. Los ajustes rápidos como <em>Slowed + Reverb</em>, <em>Nightcore</em> y <em>Bajos potentes</em> lo configuran todo con un toque.</p>
    <p>Una segunda onda muestra lo que hacen tus efectos mientras mueves los controles, y <strong>Escuchar con efectos</strong> reproduce el resultado antes de guardarlo.</p>
  </div>
  ${L.WHY}
  ${L.INSTALL}
  <div class="section prose">
    <h2>Cómo funciona</h2>
    <p>La mayoría de los sitios de conversión te obligan a subir tu archivo, esperar y volver a descargarlo. ${NAME} usa FFmpeg, el motor de audio de muchos programas de escritorio, directamente en tu navegador. Tus canciones, notas de voz y videos se quedan en tu dispositivo todo el tiempo. No hay ventanas emergentes ni botones de descarga falsos. El sitio es gratis porque muestra algunos anuncios, siempre marcados como tales.</p>
  </div>`,
      faq: [
        ['¿MeloCut es gratis?', 'Sí. Todas las herramientas son gratis y se mantienen con algunos anuncios marcados. No hace falta registrarse y no hay marca de agua.'],
        ['¿Se suben mis archivos a algún sitio?', 'No. Todo el procesamiento se hace en tu navegador, en tu propio dispositivo.'],
        ['¿Funciona en iPhone y Android?', 'Sí. Funciona en Safari, Chrome, Firefox y Edge, en teléfonos, tabletas y computadoras.'],
        ['¿Qué tipos de archivo puedo abrir?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP y la mayoría de los formatos de audio y video.'],
        ['¿Puedo instalar MeloCut como app?', 'Sí. Añádela a tu pantalla de inicio desde Safari o Chrome. Se abre a pantalla completa, y las herramientas que ya usaste siguen funcionando sin conexión.'],
        ['¿MeloCut usa IA?', 'La herramienta para quitar ruido usa RNNoise, una pequeña red neuronal que separa la voz del ruido de fondo. Funciona en tu dispositivo. Los demás efectos son procesamiento de audio estándar.'],
      ],
    },
    {
      key: 'cutter', path: 'es/cortar-audio', tool: 'cutter', crumb: 'Tools',
      title: `Cortar audio online: recortar MP3 y canciones gratis | ${NAME}`,
      description: 'Recorta MP3 y otros audios online. Conserva una parte o quita un trozo, añade fundidos y guarda en MP3, M4A, WAV, OGG o FLAC. Gratis y privado.',
      h1: '<em>Cortar audio</em>: recorta MP3 y canciones',
      lead: 'Recorta el inicio y el final de una canción, o quita una parte del medio. Añade fundidos y guarda en el formato que necesites.',
      badges: ['Conservar o quitar una parte', 'Entrada y salida suaves', 'MP3, M4A, WAV, OGG, FLAC'],
      steps: [
        ['Abre tu audio', 'Elige un MP3, WAV, M4A o cualquier archivo de audio o video.'],
        ['Selecciona la parte', 'Arrastra los controles sobre la onda, o escribe los tiempos exactos de inicio y fin.'],
        ['Consérvala o quítala', 'Elige Conservar selección o Quitar selección, y luego Cortar y guardar, y Descargar.'],
      ],
      content: `
    <h2>Corta justo donde quieres</h2>
    <p>La onda muestra dónde la música suena fuerte o suave. Arrastra los controles al punto exacto y pulsa Reproducir para escuchar antes de guardar. Para cortes precisos, escribe los tiempos tú mismo, por ejemplo <code>1:23.5</code>.</p>
    <h3>Quitar algo del medio</h3>
    <p>Cambia a <strong>Quitar selección</strong> para eliminar una intro, una pausa larga, un error o un anuncio. Las dos partes que quedan se unen automáticamente.</p>
    <h3>Evita perder más calidad</h3>
    <p>Elige <strong>WAV</strong> o <strong>FLAC</strong> si vas a editar el archivo otra vez: ninguno añade pérdida por compresión. El WAV se guarda en 16 bits, la misma calidad que un CD.</p>`,
      faq: [
        ['¿Cómo recorto un MP3?', 'Abre el MP3, arrastra los controles hasta la parte que quieres, elige Conservar selección y pulsa Cortar y guardar, y luego Descargar.'],
        ['¿Puedo quitar una parte del medio?', 'Sí. Selecciona la parte que no quieres y elige Quitar selección.'],
        ['¿Cortar baja la calidad?', 'Elige MP3 a 320 kbps para que quede muy parecido al original, o WAV o FLAC para no añadir pérdida por compresión.'],
        ['¿Funciona sin conexión?', 'Sí, después de usar una herramienta una vez con conexión. El motor de audio queda guardado en tu dispositivo.'],
      ],
    },
    {
      key: 'video', path: 'es/video-a-mp3', tool: 'video-to-mp3', crumb: 'Tools',
      title: `Convertir video a MP3 gratis y online | ${NAME}`,
      description: 'Convierte videos MP4, MOV, WebM y otros a MP3 en tu navegador. Hasta 320 kbps, sin subir archivos y sin registro. Funciona en iPhone y Android.',
      h1: 'Convertir <em>video a MP3</em>',
      lead: 'Saca el sonido de cualquier video y guárdalo como MP3, M4A o WAV. Funciona en tu dispositivo, así que hasta los videos grandes van rápido.',
      badges: ['Hasta 320 kbps', 'MP4, MOV, WebM, MKV', 'Sin subir archivos'],
      steps: [
        ['Elige tu video', 'Toca el recuadro de arriba y elige un video, o arrástralo.'],
        ['Recórtalo si quieres', 'Quédate con todo el audio, o arrastra sobre la onda para conservar solo una parte.'],
        ['Convierte y descarga', 'Elige MP3 y una calidad, pulsa Convertir y luego Descargar.'],
      ],
      content: `
    <h2>Saca el audio de un video</h2>
    <p>¿Grabaste un concierto, una clase o algo divertido y solo necesitas el sonido? Abre el video aquí y guarda el audio como MP3 para escucharlo en el carro, en una app de música o donde quieras.</p>
    <h3>¿Qué videos funcionan?</h3>
    <p>MP4, MOV (el formato en el que graba el iPhone), WebM, MKV, AVI y 3GP. Si tu navegador puede abrir el archivo, casi siempre funciona.</p>
    <h3>¿Qué calidad elijo?</h3>
    <p>Usa <strong>320 kbps</strong> para música. <strong>128 kbps</strong> basta para voz y genera archivos mucho más pequeños. Elige <strong>WAV</strong> si quieres editar el audio después.</p>
    <h3>Videos grandes</h3>
    <p>Los límites de tamaño dependen de tu dispositivo y navegador. Una computadora maneja archivos mucho más grandes que un teléfono, y MeloCut no acepta archivos de más de 1 GB. Para videos largos, recórtalos primero o usa una computadora.</p>`,
      faq: [
        ['¿Cómo convierto un MP4 a MP3?', 'Abre el MP4 arriba, elige MP3 y una calidad, pulsa Convertir y luego Descargar. Tarda unos segundos.'],
        ['¿Puedo convertir videos del iPhone?', 'Sí. Elige el video desde Fotos o Archivos y se convierte como cualquier otro.'],
        ['¿Hay un límite de tamaño?', 'Los límites de tamaño dependen de tu dispositivo y navegador. Una computadora maneja archivos mucho más grandes que un teléfono, y MeloCut no acepta archivos de más de 1 GB. Para videos largos, recórtalos primero o usa una computadora.'],
        ['¿Puedo convertir videos de YouTube?', 'MeloCut trabaja con archivos de tu dispositivo. No descarga videos de YouTube ni de otros sitios.'],
      ],
    },
    {
      key: 'ringtone', path: 'es/creador-de-tonos', tool: 'ringtone', crumb: 'Tools',
      title: `Crear tonos de llamada para iPhone y Android gratis | ${NAME}`,
      description: 'Crea un tono de llamada con cualquier canción. Elige la mejor parte, añade un fundido y guárdalo en M4R para iPhone o MP3 para Android. Gratis, sin app.',
      h1: '<em>Creador de tonos</em> para iPhone y Android',
      lead: 'Elige tu parte favorita de una canción y guárdala como tono para iPhone (M4R) o Android (MP3).',
      badges: ['M4R para iPhone', 'MP3 para Android', 'Entrada y salida suaves'],
      steps: [
        ['Elige una canción', 'Abre cualquier canción o video de tu dispositivo.'],
        ['Elige la parte que te gusta', 'Arrastra sobre la onda para seleccionar hasta 40 segundos. Pulsa Reproducir para comprobarla.'],
        ['Descarga el tono', 'Elige M4R para iPhone o MP3 para Android, y luego Crear tono y Descargar.'],
      ],
      content: `
    <h2>Poner el tono en tu teléfono</h2>
    <h3>iPhone</h3>
    <p>Con una computadora: descarga el archivo <strong>M4R</strong>, conecta tu iPhone y arrastra el archivo hasta él en Finder (Mac) o iTunes (Windows). Después aparece en <em>Configuración → Sonidos y vibración → Tono</em>. Sin computadora: abre el archivo en <strong>GarageBand</strong> en tu iPhone y usa <em>Compartir → Tono</em>.</p>
    <h3>Android</h3>
    <p>Descarga el <strong>MP3</strong>, ve a <em>Ajustes → Sonido → Tono del teléfono</em> y elígelo. En algunos teléfonos primero hay que tocar "+" o "Añadir tono".</p>
    <h3>Algunos consejos</h3>
    <p>Empieza justo antes del estribillo, deja el tono entre 20 y 30 segundos y mantén los fundidos para que no empiece ni termine de golpe.</p>`,
      faq: [
        ['¿Cuánto puede durar un tono?', 'Menos de 30 segundos si lo pones desde la app Archivos del iPhone, y hasta 40 segundos con GarageBand o un ordenador. MeloCut selecciona 29 segundos al empezar y limita tu selección a 40.'],
        ['¿Qué es un archivo M4R?', 'Es el formato de tono que usa el iPhone. Por dentro es un archivo de audio M4A (AAC) normal.'],
        ['¿Puedo hacer un tono a partir de un video?', 'Sí. Abre el video y MeloCut usa su sonido.'],
        ['¿Es gratis?', 'Sí, totalmente gratis, sin marca de agua y sin registro.'],
      ],
    },
    {
      key: 'converter', path: 'es/convertidor-de-audio', tool: 'converter', crumb: 'Tools',
      title: `Convertidor de audio: MP3, WAV, M4A, OGG y FLAC | ${NAME}`,
      description: 'Convierte audio online gratis: MP3, WAV, M4A, OGG, FLAC y OPUS. También cambia velocidad y volumen. Sirve para notas de voz de WhatsApp. Sin subir archivos.',
      h1: '<em>Convertidor de audio</em> para MP3, WAV, M4A, OGG y FLAC',
      lead: 'Convierte entre MP3, WAV, M4A, OGG y FLAC. También abre las notas de voz de WhatsApp y Telegram (OPUS).',
      badges: ['MP3, WAV, M4A, OGG, FLAC', 'Velocidad y volumen', 'Notas de voz'],
      steps: [
        ['Abre un archivo', 'Cualquier archivo de audio o video, incluidas las notas de voz .opus de WhatsApp.'],
        ['Elige el formato', 'Elige el formato y la calidad de salida. Añade efectos si quieres.'],
        ['Convierte y descarga', 'Pulsa Convertir y luego Descargar.'],
      ],
      content: `
    <h2>Convierte casi cualquier archivo de audio</h2>
    <p>${NAME} abre MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR y WMA, y guarda en el formato que necesita tu teléfono, tu carro o tu app.</p>
    <p>Abre <strong>Efectos y filtros</strong> si además quieres añadir fundidos, cambiar la velocidad o el tono, subir los graves o el volumen, limpiar el ruido o añadir reverb.</p>
    <h3>Notas de voz de WhatsApp y Telegram</h3>
    <p>Los mensajes de voz se guardan como archivos <code>.opus</code> u <code>.ogg</code> que muchos reproductores no abren. Conviértelos a MP3 y se escuchan en cualquier lado.</p>
    <h3>¿Qué formato elijo?</h3>
    <p>El MP3 funciona en todas partes. El M4A suena un poco mejor con el mismo tamaño. FLAC y WAV no añaden pérdida por compresión, pero ocupan más.</p>`,
      faq: [
        ['¿Cómo convierto un WAV a MP3?', 'Abre el WAV, elige MP3 y una calidad, y pulsa Convertir y luego Descargar.'],
        ['¿Cómo convierto una nota de voz de WhatsApp a MP3?', 'Guarda la nota de voz (.opus) en tu dispositivo, ábrela aquí, elige MP3 y pulsa Convertir.'],
        ['¿Cuál es el mejor formato de audio?', 'MP3 se reproduce en todas partes. M4A suena un poco mejor con el mismo tamaño. FLAC y WAV mantienen la calidad pero son más grandes.'],
        ['¿Puedo hacer una versión slowed + reverb?', 'Sí. Toca el ajuste Slowed + Reverb en Efectos.'],
      ],
    },
  ],
});
