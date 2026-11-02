// More Spanish tool pages (neutral Spanish, "tú"). Each `key` matches an English page in build.mjs KEY_OF,
// and the button names match the Spanish interface strings in i18n/ui.py.
export default (NAME) => [
  {
    key: 'voice', path: 'es/cambiador-de-voz', tool: 'voice-changer', crumb: 'Tools',
    title: `Cambiador de voz gratis: ardilla, robot y voz grave | ${NAME}`,
    description: 'Cambia tu voz gratis: ardilla, voz grave, monstruo, robot, alienígena, teléfono y eco. Funciona con grabaciones, notas de voz y videos. Sin subir archivos.',
    h1: '<em>Cambiador de voz</em>: ardilla, robot y voz grave',
    lead: 'Convierte cualquier grabación, nota de voz o video en una ardilla, un monstruo, un robot y más. Escúchalo primero y luego guárdalo.',
    badges: ['7 voces', 'Escucha antes de guardar', 'Sin subir archivos'],
    steps: [
      ['Abre una grabación', 'Elige una nota de voz, una grabación o un video. También puedes grabar primero con tu celular.'],
      ['Elige una voz', 'Ardilla ya está seleccionada. Toca Voz grave, Monstruo, Robot, Alienígena, Teléfono o Eco y pulsa Escuchar con efectos.'],
      ['Guárdala', 'Pulsa Cambiar voz y luego Descargar. Compártela o úsala como tono.'],
    ],
    content: `
    <h2>Las voces</h2>
    <ol class="guide-steps">
      <li><strong>Ardilla:</strong> aguda y chillona, sin acelerar el audio.</li>
      <li><strong>Voz grave:</strong> más baja y llena, como la de un tráiler de película.</li>
      <li><strong>Monstruo:</strong> muy grave y con un eco oscuro.</li>
      <li><strong>Robot:</strong> una voz plana y metálica.</li>
      <li><strong>Alienígena:</strong> un poco más aguda y con una vibración extraña.</li>
      <li><strong>Teléfono:</strong> fina y estrecha, como una línea vieja o un walkie-talkie.</li>
      <li><strong>Eco:</strong> como si hablaras en una sala enorme o en una cueva.</li>
    </ol>
    <p>En Efectos puedes ajustar cada una: mueve el Tono para una voz más aguda o más grave, añade Reverb para más espacio, o activa Quitar ruido con IA si la grabación tiene ruido.</p>
    <h2>Ideas</h2>
    <p>Bromas en notas de voz, tonos graciosos (abre el resultado en el <a href="/es/creador-de-tonos/">creador de tonos</a>), voces para TikTok o esconder tu voz real en un video. Usa solo grabaciones que tengas permiso para usar y no lo uses para hacerte pasar por otra persona.</p>`,
    faq: [
      ['¿El cambiador de voz es gratis?', 'Sí. Gratis, sin registro, sin marca de agua y tu grabación nunca se sube.'],
      ['¿Puedo cambiar la voz de un video?', 'Sí. Abre el video y MeloCut usa su sonido. El resultado es un archivo de audio (MP3, M4A, WAV, OGG o FLAC).'],
      ['¿Puedo grabar directamente en la página?', 'Todavía no. Graba con la grabadora de voz de tu celular y luego abre el archivo aquí.'],
      ['¿Cómo hago voz de ardilla?', 'Abre tu grabación aquí: Ardilla ya está seleccionada. Pulsa Escuchar con efectos, luego Cambiar voz y Descargar.'],
    ],
  },
  {
    key: 'a2v', path: 'es/cancion-a-video', tool: 'audio-to-video', crumb: 'Tools',
    title: `Convertir MP3 a MP4: canción a video para TikTok gratis | ${NAME}`,
    description: 'Convierte una canción o nota de voz en un video MP4 vertical con onda animada, título y portada. Desde el celular, gratis y sin subir archivos.',
    h1: '<em>Canción a video</em>: MP3 a MP4 para TikTok y Reels',
    lead: 'Convierte cualquier canción o grabación en un video vertical con una onda de sonido que se mueve, un título y una portada. Listo para TikTok, Reels, Shorts y estados de WhatsApp.',
    badges: ['Vertical 9:16', 'Onda de sonido animada', 'Sin subir archivos'],
    steps: [
      ['Abre una canción', 'Elige un MP3, una nota de voz o cualquier audio. Se seleccionan los primeros 30 segundos; arrastra para elegir otra parte, hasta 60 segundos.'],
      ['Añade título y estilo', 'El título sale del nombre del archivo; cámbialo si quieres. Elige un estilo de fondo o añade una imagen de portada.'],
      ['Crea el video', 'Pulsa Crear video y luego Descargar. Sube el MP4 donde quieras.'],
    ],
    content: `
    <h2>Cómo queda el video</h2>
    <p>Un MP4 vertical de 720×1280 (9:16), con tu portada o un emblema de onda de sonido, el título, una onda blanca que se mueve con el audio y una barra de progreso. Abajo aparece una pequeña marca de melocut.com.</p>
    <h2>Ideas</h2>
    <ol class="guide-steps">
      <li><strong>Compartir una canción en Instagram o TikTok</strong> cuando la app no te deja publicar solo audio.</li>
      <li><strong>Un video slowed + reverb:</strong> abre Efectos, toca Slowed + Reverb y el video lleva la versión lenta. También funcionan Nightcore y Audio 8D.</li>
      <li><strong>Clips de pódcast o notas de voz:</strong> activa Quitar ruido con IA para una voz limpia y publica los mejores 60 segundos.</li>
      <li><strong>Estado de WhatsApp:</strong> una canción con tu propia foto como portada.</li>
    </ol>
    <h2>¿Por qué hasta 60 segundos?</h2>
    <p>El video se crea en tu propio dispositivo, así que no se sube nada. Crear video cuesta mucho más trabajo que el audio, por eso los clips llegan hasta 60 segundos, que es lo que piden las apps de videos cortos. En el celular tarda un poco más que en la computadora.</p>
    <p>Usa solo música que tengas derecho a compartir. Apps como TikTok e Instagram pueden silenciar videos con canciones protegidas.</p>`,
    faq: [
      ['¿Cómo convierto un MP3 a MP4?', 'Abre el MP3 aquí, añade un título y un estilo o una portada, y pulsa Crear video. Obtienes un MP4 con una onda de sonido animada.'],
      ['¿Puedo poner mi propia foto?', 'Sí. Elige una imagen de portada: aparece en el centro y, desenfocada, como fondo.'],
      ['¿Tiene marca de agua?', 'Hay una pequeña marca de melocut.com abajo del video. Así la herramienta sigue siendo gratis.'],
      ['¿Funciona en iPhone?', 'Sí, en Safari. Crear el video tarda un rato porque se hace en tu dispositivo: en una computadora, más o menos lo que dura el clip, y más en el celular. Deja la página abierta hasta que termine.'],
    ],
  },
  {
    key: 'slowed', path: 'es/slowed-reverb', tool: 'slowed-reverb', crumb: 'Tools',
    title: `Slowed + Reverb online: canciones lentas con reverb | ${NAME}`,
    description: 'Haz la versión slowed + reverb de cualquier canción. Ajusta velocidad, tono y reverb, escucha primero y descarga un MP3. Gratis y sin marca de agua.',
    h1: 'Hacer canciones <em>slowed + reverb</em>',
    lead: 'Crea la versión lenta y con reverb de cualquier canción. Los ajustes ya están listos y puedes cambiar la velocidad, el tono y la reverb.',
    badges: ['Velocidad y tono', 'Reverb', 'También nightcore'],
    steps: [
      ['Abre una canción', 'Elige cualquier canción de tu dispositivo.'],
      ['Ajústala', 'Ya están puestas la velocidad 0,85× y la reverb. Cámbialas y pulsa Escuchar con efectos.'],
      ['Descarga', 'Pulsa Convertir y guárdala como MP3.'],
    ],
    content: `
    <h2>Buenos ajustes para empezar</h2>
    <p>La mayoría de las versiones slowed + reverb usan una velocidad de <strong>0,80 a 0,90×</strong>, el tono <strong>1 a 3 semitonos más bajo</strong> y una reverb de alrededor de <strong>35 a 55 %</strong>. Para una versión acelerada, toca el ajuste rápido <em>Nightcore</em> o usa el <a href="/es/nightcore/">creador de nightcore</a>.</p>
    <h3>Para que suene mejor</h3>
    <ul>
      <li>Si la voz suena demasiado grave, sube el Tono un semitono.</li>
      <li>Activa <strong>Volumen automático</strong> para que no quede más bajo que el original.</li>
      <li>¿Lo quieres para TikTok o Reels? Hazlo video con <a href="/es/cancion-a-video/">canción a video</a>: abre Efectos y toca Slowed + Reverb.</li>
    </ul>`,
    faq: [
      ['¿Cómo hago una canción slowed + reverb?', 'Abre la canción aquí. El efecto ya está puesto: pulsa Escuchar con efectos, cambia lo que quieras y luego Convertir y Descargar.'],
      ['¿Puedo hacer una versión acelerada?', 'Sí. Toca el ajuste rápido Nightcore o sube la velocidad y el tono.'],
      ['¿Es gratis?', 'Sí. Sin registro, sin marca de agua y la canción no se sube a ningún servidor.'],
    ],
  },
  {
    key: 'karaoke', path: 'es/quitar-voz', tool: 'karaoke', crumb: 'Tools',
    title: `Quitar la voz de una canción: hacer karaoke gratis | ${NAME}`,
    description: 'Quita la voz de las canciones para hacer pistas de karaoke e instrumentales. Gratis, privado y rápido. No se sube nada.',
    h1: '<em>Quitar la voz</em> de una canción para karaoke',
    lead: 'Quita al cantante de una canción estéreo para tener una versión karaoke. Elimina lo que está en el centro de la mezcla, así que no es separación por IA: el bajo y la batería también bajan un poco.',
    badges: ['Karaoke', 'Canciones estéreo', 'Escucha antes de guardar'],
    steps: [
      ['Abre una canción', 'Elige una canción estéreo de tu dispositivo.'],
      ['Escúchala primero', 'Quitar voz ya está activado. Pulsa Escuchar con efectos.'],
      ['Descarga', 'Pulsa Convertir y guarda tu pista de karaoke.'],
    ],
    content: `
    <h2>Cómo funciona</h2>
    <p>En la mayoría de las canciones de estudio la voz principal está en el centro de la mezcla estéreo, mientras que los instrumentos están repartidos a la izquierda y a la derecha. El quitavoz cancela lo que está en el centro y deja el resto.</p>
    <h3>Lo que no puede hacer</h3>
    <p>El bajo y la batería suelen estar también en el centro, así que bajan de volumen. La reverb de la voz puede quedar de fondo. Las grabaciones en vivo y los archivos mono no funcionan, y ${NAME} te avisa si un archivo es mono. Subir los <strong>Graves</strong> en Efectos devuelve parte de los bajos.</p>`,
    faq: [
      ['¿Funciona con todas las canciones?', 'Funciona mejor con canciones de estudio con la voz en el centro. Las grabaciones mono no se pueden separar así.'],
      ['¿Por qué el bajo suena más bajo?', 'El bajo suele estar también en el centro de la mezcla. Sube los Graves para recuperarlo.'],
    ],
  },
  {
    key: '8d', path: 'es/audio-8d', tool: '8d', crumb: 'Tools',
    title: `Convertidor de audio 8D online: canciones 8D gratis | ${NAME}`,
    description: 'Convierte cualquier canción en audio 8D que gira alrededor de tu cabeza. Escucha con auriculares y descarga un MP3. Gratis y sin subir archivos.',
    h1: 'Convertidor de <em>audio 8D</em>',
    lead: 'Haz que la música se mueva alrededor de tu cabeza. Ponte auriculares, escucha y descarga.',
    badges: ['Usa auriculares', 'Reverb ajustable', 'MP3 o WAV'],
    steps: [
      ['Abre una canción', 'Elige cualquier canción de tu dispositivo.'],
      ['Ponte auriculares', 'Pulsa Escuchar con efectos para oír cómo se mueve.'],
      ['Descarga', 'Pulsa Convertir y guarda tu versión 8D.'],
    ],
    content: `
    <h2>¿Qué es el audio 8D?</h2>
    <p>El audio 8D mueve el sonido despacio de un oído al otro y añade un poco de reverb, así que la música parece girar a tu alrededor. Necesitas auriculares o audífonos para notarlo.</p>
    <h3>Ideas</h3>
    <p>Combínalo con una versión lenta (Slowed + Reverb) para un efecto más envolvente, o conviértelo en video con <a href="/es/cancion-a-video/">canción a video</a> para compartirlo en TikTok.</p>`,
    faq: [
      ['¿Por qué no oigo el efecto 8D?', 'Necesitas auriculares o audífonos. En un solo altavoz el efecto desaparece.'],
      ['¿Es gratis?', 'Sí, totalmente gratis, sin registro y sin marca de agua.'],
    ],
  },
  {
    key: 'bass', path: 'es/potenciador-de-graves', tool: 'bass', crumb: 'Tools',
    title: `Potenciador de graves: subir el bajo de un MP3 gratis | ${NAME}`,
    description: 'Sube los graves de cualquier canción online. Elige cuánto, escucha primero y descarga. Un limitador evita que se distorsione. Gratis y sin subir archivos.',
    h1: '<em>Potenciador de graves</em>',
    lead: 'Dale a cualquier canción un bajo más profundo y con más pegada. Elige cuánto, escucha y descarga.',
    badges: ['Hasta +15 dB', 'Sin distorsión', 'Escucha antes de guardar'],
    steps: [
      ['Abre una canción', 'Elige cualquier canción o video.'],
      ['Elige cuánto', 'El control de Graves empieza en +10 dB. Cámbialo y pulsa Escuchar con efectos.'],
      ['Descarga', 'Pulsa Convertir y guarda.'],
    ],
    content: `
    <h2>Más graves sin que cruja</h2>
    <p>${NAME} sube las frecuencias bajas, alrededor de 110 Hz, y luego iguala el volumen con un limitador, así que el bajo golpea más fuerte sin distorsionar. En los altavoces del celular, entre +6 y +10 dB suele sonar mejor.</p>`,
    faq: [['¿Cuántos graves debo subir?', 'Empieza con +8 a +10 dB. Más de +12 dB es muy fuerte y va mejor con auriculares o con el equipo del carro.']],
  },
  {
    key: 'nightcore', path: 'es/nightcore', tool: 'converter', crumb: 'Tools', fx: { speed: 1.2, pitch: 3 }, suffix: ' (nightcore)',
    note: 'Nightcore ya está listo: velocidad 1,20× y 3 semitonos más agudo. Pulsa Reproducir con efectos para escucharlo.',
    title: `Nightcore online: hacer canciones aceleradas gratis | ${NAME}`,
    description: 'Convierte cualquier canción en nightcore o versión acelerada: más rápida y más aguda. Ajusta velocidad y tono, escucha primero y descarga un MP3. Gratis.',
    h1: 'Creador de <em>nightcore</em> y canciones aceleradas',
    lead: 'Haz la versión rápida, aguda y con energía de cualquier canción. Los ajustes ya están listos y puedes afinarlos.',
    badges: ['Velocidad y tono', 'Escucha antes de guardar', 'MP3 o WAV'],
    steps: [
      ['Abre una canción', 'Elige cualquier canción de tu dispositivo.'],
      ['Ajústala', 'Ya están puestos 1,20× y +3 semitonos. Pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y guárdala como MP3.'],
    ],
    content: `
    <h2>El sonido nightcore</h2>
    <p>Las versiones nightcore reproducen la canción entre un <strong>15 y un 30 % más rápido</strong> y suben el tono <strong>de 2 a 4 semitonos</strong>, lo que da ese sonido brillante y con energía. Las versiones aceleradas (sped up) de TikTok e Instagram usan la misma idea, normalmente un poco más suave.</p>
    <h3>Buenos ajustes para empezar</h3>
    <ul>
      <li><strong>Nightcore clásico:</strong> 1,25× de velocidad y +4 semitonos.</li>
      <li><strong>Sped up (estilo TikTok):</strong> 1,15× y +2 semitonos.</li>
      <li><strong>Suave:</strong> 1,10× y +1 semitono, para baladas lentas.</li>
    </ul>
    <p>Añade un poco de <strong>Graves</strong> para que no suene delgado, o haz lo contrario con <a href="/es/slowed-reverb/">Slowed + Reverb</a>.</p>`,
    faq: [
      ['¿Cuál es la diferencia entre nightcore y sped up?', 'Los dos son más rápidos y agudos. El nightcore suele ser más extremo. Baja la velocidad a unos 1,1× para una versión acelerada más suave.'],
      ['¿Puedo mantener el tono original?', 'Sí. Pon el Tono en 0 y solo cambiará la velocidad.'],
    ],
  },
  {
    key: 'denoise', path: 'es/quitar-ruido', tool: 'denoise', crumb: 'Tools',
    title: `Quitar ruido de fondo de un audio con IA gratis | ${NAME}`,
    description: 'Quita el ruido de fondo de grabaciones de voz, notas de voz y videos con IA. Funciona en tu dispositivo, no se sube nada. Gratis.',
    h1: 'Quitar ruido de fondo <em>con IA</em>',
    lead: 'Quita viento, tráfico, ventiladores y zumbidos de las grabaciones de voz. Una pequeña red neuronal hace el trabajo en tu propio dispositivo.',
    badges: ['Red neuronal (RNNoise)', 'Notas de voz y pódcast', 'Sin subir archivos'],
    steps: [
      ['Abre tu grabación', 'Una nota de voz, una entrevista, una clase o un video.'],
      ['Escucha la versión limpia', 'Quitar ruido con IA ya está activado. Pulsa Escuchar con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Cómo funciona la parte de IA</h2>
    <p>${NAME} usa <strong>RNNoise</strong>, una red neuronal entrenada para distinguir la voz del ruido de fondo. El modelo pesa unos 300 KB y funciona en tu navegador, así que las grabaciones privadas nunca salen de tu celular o tu computadora.</p>
    <p>En nuestra propia prueba, con una voz grabada junto a un ventilador encendido, el ruido en las pausas entre palabras bajó unos 18 dB, que suena más o menos tres veces más bajo, mientras la voz mantuvo su volumen. El resultado depende de la grabación, así que pulsa Escuchar con efectos y compruébalo tú mismo.</p>
    <h3>Para el mejor resultado</h3>
    <p>Está hecho para voz: pódcast, entrevistas, notas de voz y llamadas. En música puede quitar también instrumentos, así que para canciones usa <strong>Reducir siseo</strong>. Aquí también están activados <strong>Volumen automático</strong> y <strong>Quitar silencios</strong>, para un resultado más limpio.</p>`,
    faq: [
      ['¿Es IA de verdad?', 'Sí. Usa RNNoise, una red neuronal para limpiar la voz. El modelo se descarga la primera vez y luego funciona en tu dispositivo.'],
      ['¿Funciona con música?', 'Está pensado para voces. En canciones puede quitar instrumentos, así que para música usa Reducir siseo.'],
      ['¿Se sube mi grabación?', 'No. Todo funciona en tu navegador.'],
    ],
  },
  {
    key: 'joiner', path: 'es/unir-audio', tool: 'joiner', crumb: 'Tools',
    title: `Unir audios y canciones MP3 online gratis | ${NAME}`,
    description: 'Une MP3, M4A, WAV y otros audios en un solo archivo. Cambia el orden, escúchalos, añade una transición e iguala el volumen. Gratis y privado.',
    h1: '<em>Unir audio</em>: junta canciones en un solo archivo',
    lead: 'Junta varias canciones, notas de voz o clips en un solo archivo. Escucha cada uno, cambia el orden y añade una transición.',
    badges: ['2 o más archivos', 'Transición', 'Volumen igualado'],
    steps: [
      ['Añade tus archivos', 'Elige dos o más archivos de audio o video. Puedes añadir más después.'],
      ['Ponlos en orden', 'Toca ▶ para escuchar, usa las flechas para reordenar y ajusta la transición o desactívala.'],
      ['Une, escucha y descarga', 'Pulsa Unir archivos, escucha el resultado y luego Descargar.'],
    ],
    content: `
    <h2>Mezclas, popurrís y grabaciones largas</h2>
    <p>Haz una mezcla para una fiesta, junta varias notas de voz en un solo mensaje o vuelve a unir las partes de una grabación. La <strong>Transición</strong> funde cada pista con la siguiente, e <strong>Igualar volumen</strong> evita que los archivos bajos suenen mucho más flojos que los fuertes.</p>
    <h3>Formatos distintos, sin problema</h3>
    <p>Puedes mezclar MP3, M4A, WAV, OGG, OPUS y videos de una vez. ${NAME} los convierte todos al mismo formato primero.</p>`,
    faq: [
      ['¿Cuántos archivos puedo unir?', 'Dos o más. No hay un número fijo: cuánto puedes unir depende de tu dispositivo y tu navegador.'],
      ['¿Puedo unirlos sin pausa entre ellos?', 'Sí. Desactiva la transición y suenan uno justo detrás del otro.'],
      ['¿Puedo unir videos?', 'Sí. MeloCut toma el sonido de cada video y une el audio.'],
    ],
  },
  {
    key: 'volume', path: 'es/subir-volumen', tool: 'volume', crumb: 'Tools',
    title: `Subir el volumen de un audio o MP3 online gratis | ${NAME}`,
    description: 'Haz que los MP3, notas de voz y videos bajos suenen más fuerte. El volumen automático lo iguala sin distorsión. Gratis y sin subir archivos.',
    h1: '<em>Subir volumen</em> de un audio',
    lead: 'Haz que las grabaciones bajas suenen más fuerte y con un volumen parejo, sin distorsión.',
    badges: ['Hasta 300 %', 'Volumen automático', 'Sin distorsión'],
    steps: [
      ['Abre tu archivo', 'Una canción baja, una nota de voz, una clase o un video.'],
      ['Elige cuánto subir', 'Volumen automático ya está activado. Cambia el control de Volumen y pulsa Escuchar con efectos.'],
      ['Descarga', 'Pulsa Convertir y guarda.'],
    ],
    content: `
    <h2>Más fuerte, pero limpio</h2>
    <p><strong>Volumen automático</strong> mide todo el archivo y lo lleva a un volumen parecido al que usan Spotify y YouTube, así que las grabaciones bajas se oyen claras. Un limitador evita que los momentos más fuertes crujan.</p>
    <h3>¿Para qué sirve?</h3>
    <p>Notas de voz que casi no se oyen, clases grabadas desde lejos, videos con el sonido muy bajo o canciones viejas que suenan flojas al lado de las nuevas.</p>`,
    faq: [['¿Subir el volumen causa distorsión?', 'No. Un limitador controla los picos, así que el resultado suena más fuerte sin saturarse.']],
  },
];
