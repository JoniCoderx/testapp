// Spanish conversion pages. `key` links each one to its English page; `convLabel` is the short chip/footer label.
export default (NAME) => [
  {
    key: 'c-mp4', convLabel: 'MP4 a MP3', path: 'es/mp4-a-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir MP4 a MP3 gratis, online y sin subir archivos | ${NAME}`,
    description: 'Convierte MP4 a MP3 online en unos segundos. Hasta 320 kbps, sin subir archivos, sin registro y sin marca de agua. Funciona en iPhone, Android y PC.',
    h1: 'Convertir <em>MP4 a MP3</em>',
    lead: 'Abre un MP4 y guarda su sonido como MP3. Funciona en tu navegador, así que el video nunca sale de tu dispositivo.',
    badges: ['Hasta 320 kbps', 'Sin subir archivos', 'Gratis'],
    steps: [
      ['Abre el MP4', 'Toca el recuadro de arriba y elige tu video.'],
      ['Elige la calidad', '320 kbps para música, 128 kbps para voz.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Por qué convertir MP4 a MP3?</h2>
    <p>Un MP4 lleva video y sonido. Si solo quieres escuchar, un MP3 ocupa mucho menos y se reproduce en cualquier celular, en el carro y en todas las apps de música.</p>
    <h3>¿Cuánto ocupa el MP3?</h3>
    <ul>
      <li><strong>320 kbps:</strong> unos 2,4 MB por minuto. Lo mejor para música.</li>
      <li><strong>192 kbps:</strong> unos 1,4 MB por minuto. Un buen punto medio.</li>
      <li><strong>128 kbps:</strong> alrededor de 1 MB por minuto. Suficiente para voz, clases y pódcast.</li>
    </ul>
    <h3>¿Solo necesitas una parte?</h3>
    <p>Arrastra sobre la onda para quedarte solo con la parte que quieres, por ejemplo una canción de un video de concierto. ¿Lo quieres como tono? Usa el <a href="/es/creador-de-tonos/">creador de tonos</a>.</p>
    <h3>Otros videos</h3>
    <p>También funciona con MOV del iPhone, WebM, MKV y AVI. Mira <a href="/es/video-a-mp3/">video a MP3</a>.</p>`,
    faq: [
      ['¿El MP3 suena igual que el video?', 'A 320 kbps la diferencia es muy difícil de notar.'],
      ['¿Puedo convertir MP4 a MP3 en el celular?', 'Sí. Funciona en el navegador de iPhone y Android, sin instalar ninguna app.'],
      ['¿Se sube mi video a algún servidor?', 'No. La conversión se hace en tu dispositivo, así que el video nunca sale de él.'],
      ['¿Puedo convertir videos de YouTube?', 'MeloCut trabaja con archivos de tu dispositivo. No descarga videos de YouTube ni de otros sitios.'],
    ],
  },
  {
    key: 'c-wav', convLabel: 'WAV a MP3', path: 'es/wav-a-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir WAV a MP3 online gratis, sin subir archivos | ${NAME}`,
    description: 'Convierte WAV a MP3 online y haz tus archivos hasta 10 veces más pequeños. Elige de 128 a 320 kbps. Gratis, privado y sin subir nada.',
    h1: 'Convertir <em>WAV a MP3</em>',
    lead: 'Convierte archivos WAV grandes en MP3 fáciles de compartir y de escuchar en cualquier lado.',
    badges: ['Hasta 10× más pequeño', 'De 128 a 320 kbps', 'Sin subir archivos'],
    steps: [
      ['Abre el WAV', 'Elige un archivo WAV de tu dispositivo.'],
      ['Elige la calidad', '320 kbps es lo más cercano al original.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿WAV o MP3?</h2>
    <p>Los WAV no están comprimidos, así que una canción de tres minutos ocupa unos 30 MB. En MP3 a 320 kbps son unos 7 MB y suena casi igual. Así es mucho más fácil enviarlo, subirlo o guardarlo en el celular.</p>
    <p>Guarda también el WAV si vas a editar la grabación más adelante.</p>
    <h3>¿Cuánto ocupará el MP3?</h3>
    <p>Un WAV con calidad de CD ocupa unos 10 MB por minuto. El MP3 depende de la calidad que elijas:</p>
    <ul>
      <li><strong>320 kbps:</strong> unos 2,4 MB por minuto. Lo mejor para música.</li>
      <li><strong>192 kbps:</strong> unos 1,4 MB por minuto.</li>
      <li><strong>128 kbps:</strong> alrededor de 1 MB por minuto. Suficiente para voz.</li>
    </ul>
    <h3>Recorta mientras conviertes</h3>
    <p>¿Solo necesitas una parte? Arrastra los controles sobre la onda y añade un fundido al principio o al final. Para una grabación baja, activa <strong>Volumen automático</strong> en Efectos.</p>`,
    faq: [
      ['¿Se pierde calidad al pasar de WAV a MP3?', 'Un poco, porque el MP3 está comprimido. A 320 kbps casi nadie lo nota.'],
      ['¿Es gratis?', 'Sí. Sin registro y sin marca de agua, y el archivo se convierte en tu navegador, así que nunca se sube.'],
      ['¿Qué calidad elijo?', '320 kbps para música, 192 kbps para escuchar a diario y 128 kbps para grabaciones de voz.'],
    ],
  },
  {
    key: 'c-m4a', convLabel: 'M4A a MP3', path: 'es/m4a-a-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir M4A a MP3 gratis: notas de voz del iPhone | ${NAME}`,
    description: 'Convierte M4A a MP3 online: notas de voz del iPhone, audio de iTunes y más. Gratis, privado y rápido. Sin subir archivos y sin registro.',
    h1: 'Convertir <em>M4A a MP3</em>',
    lead: 'Convierte las notas de voz del iPhone y otros archivos M4A a MP3 para escucharlos en cualquier dispositivo.',
    badges: ['Notas de voz', 'Audio de iTunes', 'Sin subir archivos'],
    steps: [
      ['Abre el M4A', 'Elige el archivo. En iPhone, primero guarda la nota de voz en Archivos.'],
      ['Elige la calidad', '128 kbps basta para voz, 320 kbps para música.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Sobre los archivos M4A</h2>
    <p>M4A es el formato de audio que usa Apple para las notas de voz y las descargas de iTunes. Suena bien, pero algunos reproductores viejos, autos y programas de Windows no lo abren. El MP3 funciona en todas partes.</p>
    <h3>Sacar una nota de voz del iPhone</h3>
    <p>En la app Notas de voz, toca la grabación, luego <strong>Compartir → Guardar en Archivos</strong>, y ábrela aquí.</p>
    <h3>¿La nota de voz tiene ruido de fondo?</h3>
    <p>Activa <strong>Quitar ruido con IA</strong> en Efectos antes de convertir, o usa <a href="/es/quitar-ruido/">quitar ruido con IA</a>.</p>`,
    faq: [
      ['¿Cómo saco una nota de voz de mi iPhone?', 'En Notas de voz, toca la grabación y luego Compartir → Guardar en Archivos. Después ábrela aquí.'],
      ['¿Puedo convertir canciones protegidas de iTunes?', 'No. Las canciones con protección anticopia (DRM) no se pueden convertir.'],
    ],
  },
  {
    key: 'c-wa', convLabel: 'Audio de WhatsApp a MP3', path: 'es/audio-whatsapp-a-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir audio de WhatsApp a MP3 (OPUS a MP3) gratis | ${NAME}`,
    description: 'Convierte notas de voz de WhatsApp y Telegram (.opus, .ogg) a MP3 para escucharlas en cualquier lado. Gratis y privado: tus mensajes nunca se suben.',
    h1: '<em>Audio de WhatsApp</em> a MP3',
    lead: 'Convierte notas de voz de WhatsApp y Telegram (.opus u .ogg) a MP3. Tus mensajes se quedan en tu teléfono.',
    badges: ['OPUS y OGG', 'Privado', 'Gratis'],
    steps: [
      ['Guarda la nota de voz', 'En WhatsApp, mantén pulsada la nota de voz → Reenviar → Compartir → Guardar en Archivos.'],
      ['Ábrela aquí', 'Toca el recuadro de arriba y elige el archivo .opus.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Por qué las notas de voz de WhatsApp no se abren en todos lados?</h2>
    <p>WhatsApp guarda los mensajes de voz en formato OPUS. Es bueno para la voz, pero muchos reproductores, editores y teléfonos viejos no lo abren. Un MP3 se escucha en cualquier lado y es fácil de enviar o guardar.</p>
    <h3>Privado de verdad</h3>
    <p>Las notas de voz son personales, por eso importa que ${NAME} nunca las sube. La conversión se hace en tu propio teléfono o computadora.</p>
    <h3>¿Varias notas de voz?</h3>
    <p>Usa <a href="/es/unir-audio/">unir audio</a> para juntarlas en un solo MP3. La <a href="/es/guias/audio-whatsapp-a-mp3/">guía paso a paso</a> explica cómo sacarlas de WhatsApp en iPhone y Android.</p>`,
    faq: [
      ['¿Dónde guarda WhatsApp las notas de voz en Android?', 'Normalmente en Almacenamiento interno → Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes.'],
      ['¿Puedo subir el volumen de una nota de voz?', 'Sí. Sube el Volumen o activa Volumen automático en Efectos antes de convertir.'],
    ],
  },
  {
    key: 'c-mp3wav', convLabel: 'MP3 a WAV', path: 'es/mp3-a-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Convertir MP3 a WAV online gratis | ${NAME}`,
    description: 'Convierte MP3 a WAV online para editar, para programas de DJ o para grabar un CD. Gratis, rápido y privado. No se sube nada.',
    h1: 'Convertir <em>MP3 a WAV</em>',
    lead: 'Convierte MP3 a WAV para programas de edición, apps de DJ o para grabar CD.',
    badges: ['WAV de 16 bits', 'Para editar', 'Sin subir archivos'],
    steps: [
      ['Abre el MP3', 'Elige un MP3 de tu dispositivo.'],
      ['WAV ya está elegido', 'Añade efectos antes si quieres.'],
      ['Descarga el WAV', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Cuándo necesitas un WAV</h2>
    <p>Algunos programas de edición, samplers y apps para grabar CD solo aceptan WAV. Al convertirlo obtienes un archivo que todos aceptan.</p>
    <p>Algo importante: pasar un MP3 a WAV no recupera la calidad que el MP3 ya perdió. El WAV suena igual que el MP3, solo que ocupa más y es más fácil de editar.</p>`,
    faq: [
      ['¿Pasar de MP3 a WAV mejora la calidad?', 'No. Mantiene la calidad que tiene el MP3, en un formato más fácil de editar.'],
      ['¿Por qué el WAV ocupa tanto más?', 'El WAV no está comprimido, así que ocupa unos 10 MB por minuto.'],
    ],
  },
  {
    key: 'c-ogg', convLabel: 'OGG a MP3', path: 'es/ogg-a-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir OGG a MP3 online gratis, sin subir archivos | ${NAME}`,
    description: 'Convierte archivos OGG y OGA a MP3 para escucharlos en iPhone, en el carro y en cualquier app de música. Gratis, rápido y sin subir nada.',
    h1: 'Convertir <em>OGG a MP3</em>',
    lead: 'Convierte archivos OGG de juegos, Telegram, Discord o apps de Linux en MP3 que se escuchan en todos lados.',
    badges: ['OGG Vorbis y Opus', 'Hasta 320 kbps', 'Sin subir archivos'],
    steps: [
      ['Abre el OGG', 'Elige un archivo .ogg u .oga de tu dispositivo.'],
      ['Elige la calidad', '192 kbps es un buen punto medio. Usa 320 kbps para música.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Qué es un archivo OGG?</h2>
    <p>OGG es un formato de audio abierto. La mayoría de los OGG llevan música en <strong>Vorbis</strong>, y los mensajes de voz de apps como Telegram y WhatsApp suelen llevar voz en <strong>Opus</strong>. Los dos suenan bien, pero el iPhone, muchos equipos de auto y reproductores viejos no los abren.</p>
    <p>${NAME} lee los dos tipos y guarda un MP3 estándar. Si es una nota de voz, mira <a href="/es/audio-whatsapp-a-mp3/">audio de WhatsApp a MP3</a>.</p>
    <h3>Si el OGG no se abre</h3>
    <ul>
      <li>Comprueba que terminó de descargarse. Un OGG a medio guardar no se puede leer.</li>
      <li>Los archivos de apps de chat a veces terminan en <strong>.opus</strong> u <strong>.oga</strong>. También funcionan.</li>
      <li>En iPhone, guarda primero el archivo en la app Archivos y elígelo desde ahí.</li>
    </ul>`,
    faq: [
      ['¿Por qué mi iPhone no reproduce archivos OGG?', 'Apple solo admite algunos OGG en pocas apps. Convertirlos a MP3 o M4A hace que se escuchen en todos lados.'],
      ['¿Se pierde calidad al pasar de OGG a MP3?', 'Los dos están comprimidos, así que un poco. A 256 o 320 kbps es muy difícil notarlo.'],
    ],
  },
];
