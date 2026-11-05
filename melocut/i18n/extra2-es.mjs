// Spanish versions of more format pages (en-conv2.mjs). Each `key` matches the English page (build.mjs KEY_OF).
export default (NAME) => [
  {
    key: 'c-wma', convLabel: 'WMA a MP3', path: 'es/wma-a-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir WMA a MP3 online gratis y sin subir | ${NAME}`,
    description: 'Convierte archivos WMA antiguos de Windows Media Player a MP3 para oírlos en cualquier celular, auto o app. Hasta 320 kbps. Gratis, privado y sin subir nada.',
    h1: 'Convertir <em>WMA a MP3</em>',
    lead: 'Dale una segunda vida a tus viejos archivos de Windows Media Audio como MP3 que suenan en iPhone, Android, Mac y en el auto.',
    badges: ['Windows Media Audio', 'Hasta 320 kbps', 'Sin subir archivos'],
    steps: [
      ['Abre el WMA', 'Elige un archivo .wma de tu dispositivo, o suelta varios a la vez.'],
      ['Elige una calidad', '192 kbps va bien para la mayoría de los WMA ripeados. Usa 320 kbps si el original era de alta calidad.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>De dónde salen los archivos WMA</h2>
    <p>Durante años, Windows Media Player copiaba los CD a WMA por defecto. Si tienes una carpeta de música vieja de un PC con Windows XP o Windows 7, seguramente buena parte es WMA. Los archivos siguen sonando bien, pero los iPhone, los Mac, muchos estéreos de auto y la mayoría de las apps de música no los reproducen.</p>
    <p>${NAME} lee el WMA en tu navegador y guarda un MP3 estándar. El archivo se queda en tu dispositivo todo el tiempo, así que ni siquiera una colección privada se sube a ningún sitio.</p>
    <h3>¿Qué calidad elijo?</h3>
    <p>Los WMA antiguos solían copiarse a 128 o 192 kbps. Pasarlos a un bitrate más alto no añade detalle que no existe, así que <strong>192 kbps</strong> es una buena elección. Si el WMA se copió a un bitrate alto o como WMA Lossless, elige <strong>320 kbps</strong> para conservar todo lo que permite el MP3.</p>
    <h3>Una carpeta entera de WMA</h3>
    <p>Elige o suelta varios archivos juntos, pulsa <strong>Convertir todos</strong> y descárgalos uno por uno o en un solo ZIP. En una computadora es la forma más rápida de pasar una biblioteca antigua. Ten en cuenta que las etiquetas y las portadas no se copian a los archivos nuevos, así que quizá quieras corregir los nombres de las canciones en tu app de música después.</p>
    <h3>Archivos WMA protegidos</h3>
    <p>Algunos WMA comprados en tiendas online antiguas o en servicios de suscripción tienen protección anticopia (DRM). Ni ${NAME} ni ninguna otra herramienta del navegador puede abrirlos. Las copias normales de CD no tienen DRM y se convierten sin problema.</p>
    <p>¿Solo quieres una parte de una canción, por ejemplo como tono? Conviértela primero y luego abre el MP3 en el <a href="/es/creador-de-tonos/">Creador de tonos</a> o en <a href="/es/cortar-audio/">Cortar audio</a>.</p>`,
    faq: [
      ['¿Cómo convierto WMA a MP3?', 'Abre el archivo WMA arriba, elige MP3 y una calidad, y pulsa Convertir y luego Descargar.'],
      ['¿Puedo convertir WMA en un Mac o iPhone?', 'Sí. La conversión se hace en el navegador, así que funciona en Mac, iPhone y Android aunque no puedan reproducir WMA por sí solos.'],
      ['¿Por qué no se convierte mi archivo WMA?', 'Probablemente tiene protección anticopia (DRM). Los WMA protegidos no se pueden convertir. Los archivos sin protección, como tus propias copias de CD, funcionan normalmente.'],
      ['¿Pasar de WMA a MP3 pierde calidad?', 'Los dos formatos están comprimidos, así que un poco. A 192 o 320 kbps es muy difícil notarlo.'],
      ['Los MP3 convertidos no tienen nombre de canción. ¿Por qué?', 'Las etiquetas y las portadas se quitan del archivo final por privacidad. Añade los nombres en tu app de música, o cambia el nombre de los archivos antes de convertir.'],
    ],
  },
  {
    key: 'c-aiff', convLabel: 'AIFF a MP3', path: 'es/aiff-a-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Convertir AIFF a MP3 online, gratis y privado | ${NAME}`,
    description: 'Convierte archivos AIFF y AIF de Mac, GarageBand o Logic a MP3. Quedan hasta 10 veces más pequeños. Elige hasta 320 kbps. Gratis y sin subir nada.',
    h1: 'Convertir <em>AIFF a MP3</em>',
    lead: 'Convierte los pesados archivos AIFF y AIF de tu Mac, GarageBand o Logic en MP3 pequeños y fáciles de compartir.',
    badges: ['AIFF y AIF', 'Hasta 320 kbps', 'Sin subir archivos'],
    steps: [
      ['Abre el AIFF', 'Elige un archivo .aiff o .aif, o suelta varios a la vez.'],
      ['Elige 320 kbps', 'El AIFF tiene calidad completa, así que conserva todo lo que el MP3 permita.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Qué es un archivo AIFF?</h2>
    <p>AIFF es el formato de audio sin comprimir de Apple, la versión Mac del WAV. GarageBand y Logic pueden exportar canciones a AIFF, las importaciones de CD de las versiones antiguas de iTunes solían ser AIFF, y muchos paquetes de samples y efectos de sonido vienen como archivos <code>.aif</code>. El sonido es excelente, pero una canción de tres minutos ocupa unos 30 MB.</p>
    <p>Como MP3 a 320 kbps, la misma canción ocupa unos 7 MB y suena casi idéntica. Es lo bastante pequeña para mandarla por chat, subirla a un sitio con límite de tamaño o guardarla en el celular.</p>
    <h3>Compartir una canción que hiciste</h3>
    <p>¿Terminaste un tema en GarageBand? Expórtalo como AIFF, ábrelo aquí y guarda un MP3 para tus amigos, tu banda o las redes sociales. Usa <strong>Volumen automático</strong> en Efectos si tu mezcla suena mucho más baja que las canciones de las apps de streaming. Si solo quieres compartir un trozo, arrastra sobre la onda para quedarte con esa sección y añade una salida suave.</p>
    <h3>Convertir muchos samples</h3>
    <p>Elige varios archivos AIFF a la vez y pulsa <strong>Convertir todos</strong>. Puedes descargar cada MP3 por separado o todos en un solo ZIP. Guarda los AIFF originales si quizá vuelvas a editarlos: un MP3 es ideal para escuchar, pero no para seguir mezclando.</p>
    <h3>¿Necesitas otro formato?</h3>
    <p>Para editar en Windows, muchas apps prefieren WAV. Elige WAV en el menú Formato, o lee la diferencia en <a href="/es/mp3-a-wav/">MP3 a WAV</a>. Si quieres mantener la calidad completa pero ahorrar espacio, elige FLAC: es sin pérdida y ocupa más o menos la mitad. La página <a href="/es/wav-a-flac/">WAV a FLAC</a> explica cómo funciona.</p>`,
    faq: [
      ['¿AIF es lo mismo que AIFF?', 'Sí. Las dos extensiones se usan para el mismo formato, y las dos se convierten aquí.'],
      ['¿Pasar de AIFF a MP3 pierde calidad?', 'Un poco, porque el MP3 está comprimido. A 320 kbps la mayoría de la gente no nota la diferencia.'],
      ['¿Puedo convertir AIFF en Windows o Android?', 'Sí. El convertidor funciona en el navegador, así que sirve en cualquier computadora o celular.'],
      ['Mi archivo AIFF no se abre. ¿Qué hago?', 'Algunas variantes poco comunes de AIFF-C pueden fallar. Exporta el archivo de nuevo desde GarageBand, Logic o Música como AIFF estándar o WAV, y vuelve a intentarlo.'],
    ],
  },
  {
    key: 'c-mkv', convLabel: 'MKV a MP3', path: 'es/mkv-a-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir MKV a MP3: extraer el audio gratis | ${NAME}`,
    description: 'Extrae el audio de videos MKV y guárdalo como MP3, M4A o WAV. Hasta 320 kbps, en tu navegador. Gratis, sin registro y el video nunca se sube.',
    h1: 'Convertir <em>MKV a MP3</em>',
    lead: 'Saca el sonido de un video MKV y guárdalo como un MP3 que suena en cualquier dispositivo.',
    badges: ['Videos MKV', 'Hasta 320 kbps', 'Sin subir archivos'],
    steps: [
      ['Abre el MKV', 'Toca el recuadro de arriba y elige el video, o arrástralo.'],
      ['Recórtalo si quieres', 'Arrastra sobre la onda para quedarte solo con una escena o canción.'],
      ['Descarga el MP3', 'Elige una calidad, pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Qué hay dentro de un archivo MKV?</h2>
    <p>MKV (Matroska) es un contenedor que puede guardar video, varias pistas de audio y subtítulos en un solo archivo. Grabadores de pantalla como OBS, editores de video y muchas herramientas de descarga guardan en MKV. Los celulares y algunos reproductores no lo abren, pero el audio de dentro suele ser sonido AAC, Opus, Vorbis o AC-3 normal que ${NAME} puede convertir en MP3.</p>
    <h3>Videos con más de una pista de audio</h3>
    <p>Algunos MKV traen varias pistas de audio, por ejemplo dos idiomas, o un comentario junto al sonido principal. ${NAME} usa la pista de audio principal, normalmente la primera. Si necesitas otra pista, quita primero las demás con una herramienta de video como MKVToolNix y luego abre el archivo aquí.</p>
    <h3>Buenos usos</h3>
    <ul>
      <li>Guardar la música de un concierto o de la grabación de un directo.</li>
      <li>Convertir una charla grabada o un comentario de partida en un MP3 tipo pódcast.</li>
      <li>Cortar una frase de un clip y hacerla <a href="/es/creador-de-tonos/">tono de llamada</a>.</li>
    </ul>
    <h3>¿Qué formato?</h3>
    <p><strong>MP3</strong> suena en todas partes: elige 320 kbps para música y 128 kbps para voz. <strong>M4A</strong> guarda el sonido AAC de forma algo más eficiente, y <strong>WAV</strong> es lo mejor si vas a editar el audio en otro programa. ¿La grabación suena muy baja? Activa <strong>Volumen automático</strong> en Efectos antes de convertir.</p>
    <h3>Archivos grandes</h3>
    <p>Los MKV de películas enteras pueden ser enormes. ${NAME} acepta archivos de hasta 1 GB, y las computadoras manejan videos grandes mucho mejor que los celulares. Otros tipos de video tienen su propia página, como <a href="/es/avi-a-mp3/">AVI a MP3</a> y <a href="/mov-to-mp3/">MOV a MP3</a> (en inglés), o usa la herramienta general <a href="/es/video-a-mp3/">Video a MP3</a>.</p>`,
    faq: [
      ['¿Cómo convierto MKV a MP3?', 'Abre el MKV arriba, elige MP3 y una calidad, y pulsa Convertir y luego Descargar.'],
      ['¿Qué pista de audio se usa?', 'La pista de audio principal del video, normalmente la primera. Las demás pistas se ignoran.'],
      ['¿Puedo conservar los subtítulos?', 'No. Solo se guarda el sonido. Los subtítulos y el video se descartan.'],
      ['El MP3 no tiene sonido o está en otro idioma. ¿Por qué?', `${NAME} usa la pista de audio principal, normalmente la primera. Quita las demás pistas con una herramienta como MKVToolNix, o comprueba que el video tenga sonido al reproducirlo.`],
    ],
  },
  {
    key: 'c-avi', convLabel: 'AVI a MP3', path: 'es/avi-a-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir AVI a MP3 online, gratis y sin subir | ${NAME}`,
    description: 'Extrae el sonido de videos AVI antiguos de cámaras y PC y guárdalo como MP3. Hasta 320 kbps, en tu navegador. Gratis y privado, no se sube nada.',
    h1: 'Convertir <em>AVI a MP3</em>',
    lead: 'Rescata el sonido de videos AVI antiguos de cámaras digitales, videocámaras y PC con Windows.',
    badges: ['Videos de cámaras antiguas', 'Hasta 320 kbps', 'Sin subir archivos'],
    steps: [
      ['Abre el AVI', 'Elige el archivo .avi de tu dispositivo.'],
      ['Selecciona la parte que necesitas', 'Arrastra sobre la onda, o déjalo completo.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Videos AVI antiguos, nueva vida</h2>
    <p>AVI fue durante mucho tiempo el formato de video estándar en Windows. Muchas cámaras digitales compactas de los años 2000 también guardaban sus clips en AVI. Esos archivos suelen estar llenos de canciones de cumpleaños, obras del colegio y voces de la familia, pero los celulares y televisores modernos muchas veces no los reproducen.</p>
    <p>${NAME} abre el AVI en tu navegador, toma la pista de audio y la guarda como un MP3 que puedes conservar, compartir o poner en el auto. El video nunca sale de tu dispositivo.</p>
    <h3>Haz que las grabaciones antiguas suenen mejor</h3>
    <p>Los micrófonos de las cámaras de esa época no eran muy buenos. Antes de convertir, abre <strong>Efectos</strong>:</p>
    <ul>
      <li><strong>Volumen automático</strong> deja una grabación baja tan fuerte como en las apps de streaming, sin distorsión.</li>
      <li><strong>Quitar ruido con IA</strong> elimina el viento, el zumbido y las conversaciones de fondo detrás de las voces.</li>
      <li>Pulsa <strong>Reproducir con efectos</strong> para oír el resultado antes de descargar.</li>
    </ul>
    <p>Si la grabación sigue sonando muy baja, <a href="/es/subir-volumen/">Subir volumen</a> te deja subirla todavía más.</p>
    <h3>¿Qué calidad?</h3>
    <p>El sonido de los AVI de cámaras antiguas suele ser mono y de baja calidad, así que <strong>128 kbps</strong> normalmente basta y mantiene el archivo pequeño. Elige 320 kbps para videos musicales o clips copiados de DVD.</p>
    <h3>Si el AVI no se abre</h3>
    <p>Un AVI puede contener muchos códecs distintos. Casi todos los comunes funcionan, pero algunos muy antiguos o poco habituales pueden fallar. Si pasa eso, prueba a reproducir el archivo en VLC: si ahí tampoco tiene sonido, puede que el AVI no tenga ninguna pista de audio. Para otros tipos de video, mira <a href="/es/3gp-a-mp3/">3GP a MP3</a> y <a href="/es/mkv-a-mp3/">MKV a MP3</a>.</p>`,
    faq: [
      ['¿Cómo convierto AVI a MP3?', 'Abre el AVI arriba, elige MP3 y una calidad, pulsa Convertir y luego Descargar.'],
      ['¿Puedo convertir AVI a MP3 en el celular?', 'Sí, funciona en el navegador en iPhone y Android. Los videos muy largos son más fáciles en una computadora.'],
      ['¿Se sube el video?', 'No. Todo pasa en tu dispositivo, así que tus videos familiares siguen siendo privados.'],
      ['El AVI se reproduce pero el MP3 no tiene sonido. ¿Por qué?', 'Algunas cámaras guardaban el video sin sonido, o la pista de audio está dañada. Si en VLC también se reproduce sin sonido, no hay nada que extraer.'],
    ],
  },
  {
    key: 'c-3gp', convLabel: '3GP a MP3', path: 'es/3gp-a-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Convertir 3GP a MP3: videos de celulares viejos | ${NAME}`,
    description: 'Convierte videos 3GP y grabaciones de celulares antiguos a MP3. Limpia el sonido y guárdalo en tu navegador. Gratis, privado y sin subir nada.',
    h1: 'Convertir <em>3GP a MP3</em>',
    lead: 'Guarda el sonido de videos 3GP y grabaciones de voz hechas con celulares antiguos de Nokia, Samsung y otros teléfonos básicos.',
    badges: ['Videos de celulares viejos', 'Quitar ruido', 'Sin subir archivos'],
    steps: [
      ['Abre el 3GP', 'Elige el archivo .3gp de tu dispositivo o tarjeta de memoria.'],
      ['Límpialo', 'Activa Volumen automático o Quitar ruido con IA en Efectos si quieres.'],
      ['Descarga el MP3', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Qué es un archivo 3GP?</h2>
    <p>3GP es el formato de video que usaban la mayoría de los celulares antes de los smartphones. Nokia, Sony Ericsson, Samsung y muchos otros teléfonos guardaban los videos de la cámara, y a veces las grabaciones de voz, como <code>.3gp</code>. Hoy las apps de música, los iPhone y las computadoras muchas veces no los reproducen, aunque los archivos son pequeñísimos.</p>
    <p>${NAME} lee el 3GP y guarda el sonido como un MP3 normal. Muchos de estos archivos usan AMR, un códec pensado para llamadas telefónicas que pocos reproductores admiten. La versión MP3 suena en cualquier parte, y todo pasa en tu dispositivo, así que no se sube nada.</p>
    <h3>Cómo conseguir el mejor sonido</h3>
    <p>Los micrófonos de los celulares de los años 2000 grababan con baja calidad, normalmente en mono. Convertir no puede añadir detalle, pero sí hacer que la grabación sea mucho más fácil de escuchar:</p>
    <ul>
      <li>Activa <strong>Volumen automático</strong> para subir las voces bajas.</li>
      <li>Activa <strong>Quitar ruido con IA</strong> para el viento y el ruido de fondo.</li>
      <li>Usa <strong>128 kbps</strong>. Los ajustes más altos solo hacen el archivo más grande.</li>
    </ul>
    <h3>Ideas para clips de celulares viejos</h3>
    <p>Conserva la voz de un abuelo, guarda una canción de un concierto del colegio o convierte un clip antiguo divertido en <a href="/es/creador-de-tonos/">tono de llamada</a>. ¿Solo quieres unos segundos? Arrastra sobre la onda para seleccionarlos, o abre el MP3 más tarde en <a href="/es/cortar-audio/">Cortar audio</a>.</p>
    <h3>Cómo sacar los archivos del celular</h3>
    <p>Los celulares antiguos solían guardar los videos en una tarjeta de memoria. Pon la tarjeta en un lector de tarjetas, o conecta el teléfono con un cable USB, y copia los archivos 3GP a tu computadora. Luego ábrelos aquí. Los videos de celulares más nuevos son MP4 o MOV: mira <a href="/es/video-a-mp3/">Video a MP3</a>.</p>`,
    faq: [
      ['¿Cómo convierto 3GP a MP3?', 'Abre el 3GP arriba, elige MP3, pulsa Convertir y luego Descargar.'],
      ['¿Por qué el MP3 todavía suena un poco apagado?', 'Los celulares antiguos grababan con baja calidad. Convertir conserva lo que hay, pero no puede recuperar el detalle que falta. Volumen automático y Quitar ruido con IA ayudan mucho con las voces.'],
      ['¿Puedo convertir 3GP en el celular?', 'Sí. Funciona en el navegador en iPhone y Android, sin instalar ninguna app.'],
      ['Mi 3GP es una grabación de voz, no un video. ¿Funciona?', 'Sí. Los archivos 3GP solo de audio se convierten igual, y también las grabaciones de voz .amr.'],
    ],
  },
  {
    key: 'c-mp3ogg', convLabel: 'MP3 a OGG', path: 'es/mp3-a-ogg', tool: 'converter', format: 'ogg', crumb: 'Converters',
    title: `Convertir MP3 a OGG online gratis (Vorbis) | ${NAME}`,
    description: 'Convierte MP3 a OGG Vorbis para motores de juegos, apps de código abierto y Linux. Elige la calidad y recórtalo en tu navegador. Gratis y sin subir nada.',
    h1: 'Convertir <em>MP3 a OGG</em>',
    lead: 'Convierte MP3 en archivos OGG Vorbis para juegos, motores de juegos y software de código abierto.',
    badges: ['OGG Vorbis', 'Para audio de juegos', 'Sin subir archivos'],
    steps: [
      ['Abre el MP3', 'Elige un MP3, o suelta varios archivos a la vez.'],
      ['OGG ya está elegido', 'Elige una calidad. 192 kbps es un buen punto de partida.'],
      ['Descarga el OGG', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>¿Por qué convertir MP3 a OGG?</h2>
    <p>OGG Vorbis es un formato de audio abierto y libre de regalías. Motores de juegos como Godot y Unity lo importan directamente, y muchos juegos lo usan para la música y los efectos de sonido. Las apps de escritorio de Linux y mucho software de código abierto también prefieren OGG. Si una herramienta te pide un <code>.ogg</code>, esta es la forma rápida de conseguirlo.</p>
    <h3>¿Qué calidad elijo?</h3>
    <p>${NAME} usa el modo de calidad de Vorbis, que adapta el bitrate al sonido. El ajuste que eliges es un objetivo aproximado:</p>
    <ul>
      <li><strong>192 kbps</strong>: un buen punto de partida para música de juegos.</li>
      <li><strong>128 kbps</strong>: de sobra para diálogos y la mayoría de los efectos de sonido, y más pequeño.</li>
      <li><strong>320 kbps</strong>: solo vale la pena si el propio MP3 era de 320 kbps.</li>
    </ul>
    <p>Tanto el MP3 como el OGG son formatos comprimidos, así que al convertir de uno a otro se pierde un poquito cada vez. Si todavía tienes el WAV o FLAC original, convierte ese para obtener el resultado más limpio.</p>
    <h3>Prepara el audio del juego de una vez</h3>
    <p>Antes de convertir, arrastra sobre la onda para cortar el silencio del principio o del final, así un loop de música empieza justo en el tiempo. Abre <strong>Efectos</strong> para añadir un fundido, cambiar la velocidad o el tono, o igualar el volumen con <strong>Volumen automático</strong>. Para cortar una pista larga en trozos, usa <a href="/es/dividir-audio/">Dividir audio</a>.</p>
    <h3>Muchos archivos a la vez</h3>
    <p>Elige varios MP3 juntos, pulsa <strong>Convertir todos</strong> y descárgalos en un solo ZIP. Muy práctico para una carpeta de efectos de sonido.</p>
    <p>¿Necesitas lo contrario? El convertidor <a href="/es/ogg-a-mp3/">OGG a MP3</a> vuelve a pasar los archivos OGG a MP3 para celulares y autos.</p>`,
    faq: [
      ['¿El OGG es Vorbis u Opus?', 'Vorbis, el tipo que los motores de juegos y la mayoría de las apps esperan de un archivo .ogg.'],
      ['¿El OGG ocupará menos que el MP3?', 'Con un ajuste de calidad parecido ocupa más o menos lo mismo, a menudo un poco menos.'],
      ['¿Pasar de MP3 a OGG pierde calidad?', 'Un poco, porque los dos formatos están comprimidos. A 192 kbps o más es muy difícil notarlo.'],
      ['¿Puedo hacer un loop de música sin cortes?', 'Arrastra los controles sobre la onda para cortar el silencio del principio y del final antes de convertir. Los puntos exactos del loop se ajustan mejor en tu motor de juegos.'],
    ],
  },
  {
    key: 'c-wavflac', convLabel: 'WAV a FLAC', path: 'es/wav-a-flac', tool: 'converter', format: 'flac', crumb: 'Converters',
    title: `Convertir WAV a FLAC: sin pérdida, gratis online | ${NAME}`,
    description: 'Convierte WAV a FLAC online y deja los archivos en la mitad de tamaño sin perder calidad. Gratis, privado y rápido. Tu audio nunca se sube.',
    h1: 'Convertir <em>WAV a FLAC</em>',
    lead: 'Reduce los archivos WAV pesados a FLAC sin pérdida. El mismo sonido, más o menos la mitad de espacio.',
    badges: ['Sin pérdida', 'Más o menos la mitad', 'Sin subir archivos'],
    steps: [
      ['Abre el WAV', 'Elige un archivo WAV, o suelta varios a la vez.'],
      ['FLAC ya está elegido', 'Deja los efectos apagados para una copia exacta.'],
      ['Descarga el FLAC', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Sin pérdida, pero más pequeño</h2>
    <p>WAV guarda cada muestra sin comprimir, unos 10 MB por minuto en estéreo con calidad de CD. FLAC empaqueta exactamente el mismo audio de forma más compacta, algo así como un archivo ZIP para el sonido. La mayoría de la música queda en más o menos la mitad del tamaño, a veces menos en grabaciones tranquilas o de voz. Al reproducir el FLAC, el sonido es idéntico al del WAV.</p>
    <p>FLAC no tiene ajuste de calidad porque no se descarta nada. El menú de calidad solo importa para MP3, M4A y OGG.</p>
    <h3>Cuándo conviene FLAC</h3>
    <ul>
      <li><strong>Archivar</strong> grabaciones, copias de CD o tus propias canciones sin perder nada.</li>
      <li><strong>Ahorrar espacio</strong> en un disco lleno de archivos WAV de una grabadora o de un programa de música.</li>
      <li><strong>Reproductores hi-fi</strong> y servidores de música que leen FLAC y sus etiquetas.</li>
    </ul>
    <h3>Cuándo elegir otra cosa</h3>
    <p>Los iPhone no reproducen FLAC en la app Música, y muchos estéreos de auto se lo saltan. Para escuchar a diario en el celular, <a href="/es/wav-a-mp3/">WAV a MP3</a> a 320 kbps es mucho más pequeño y suena muy parecido. ¿Necesitarás un WAV más adelante? El convertidor <a href="/es/flac-a-wav/">FLAC a WAV</a> te da una copia exacta de 16 bits.</p>
    <h3>Convertir una carpeta entera</h3>
    <p>Elige varios archivos WAV juntos, pulsa <strong>Convertir todos</strong> y descarga los FLAC uno por uno o en un solo ZIP. Comprueba que un par de los archivos nuevos se reproducen bien antes de borrar ningún original.</p>
    <h3>Los efectos cambian el audio</h3>
    <p>Para una copia sin pérdida de verdad, deja los <strong>Efectos</strong> apagados y mantén seleccionado todo el archivo. Si recortas el archivo, añades un fundido o activas Volumen automático, el FLAC guardará la versión modificada, igualmente sin ninguna pérdida por compresión añadida.</p>`,
    faq: [
      ['¿Pasar de WAV a FLAC pierde calidad?', 'No. FLAC es sin pérdida: al decodificarlo recuperas exactamente el mismo audio que el WAV.'],
      ['¿Cuánto ocupa un FLAC comparado con un WAV?', 'Normalmente más o menos la mitad. Las grabaciones tranquilas o simples se reducen más; la música densa y fuerte, algo menos.'],
      ['¿Puedo volver a convertir FLAC a WAV?', 'Sí, con el convertidor FLAC a WAV, sin ninguna pérdida.'],
      ['¿Mi FLAC tendrá etiquetas y portada?', 'No. Los metadatos se quitan del archivo final por privacidad, así que añade los nombres de las canciones y la portada en tu app de música después.'],
    ],
  },
];
