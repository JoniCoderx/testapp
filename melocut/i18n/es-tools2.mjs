// More Spanish tool pages. `key` matches the English page in build.mjs KEY_OF.
export default (NAME) => [
  {
    key: 'reverse', path: 'es/audio-al-reves', tool: 'reverse', crumb: 'Tools',
    title: `Poner un audio al revés online gratis | ${NAME}`,
    description: 'Pon cualquier canción, nota de voz o sonido al revés y escúchalo hacia atrás. Escucha primero y descarga un MP3. Gratis, rápido y sin subir archivos.',
    h1: 'Poner un <em>audio al revés</em>',
    lead: 'Reproduce cualquier sonido, voz o canción al revés. Ideal para retos, efectos de sonido y buscar "mensajes ocultos".',
    badges: ['Rápido', 'Cualquier formato', 'Sin subir archivos'],
    steps: [
      ['Abre un archivo', 'Cualquier canción, nota de voz o video.'],
      ['Escúchalo', 'Al revés ya está activado. Pulsa Escuchar con efectos.'],
      ['Descarga', 'Pulsa Convertir y guarda.'],
    ],
    content: `
    <h2>Ideas</h2>
    <p>Grábate diciendo algo y ponlo al revés para el reto de hablar al revés, busca "mensajes ocultos" en canciones o crea efectos de platillo invertido para tu música. Añade un poco de reverb para el clásico sonido de reverb al revés.</p>
    <h3>Graba aquí mismo</h3>
    <p>Pulsa <strong>Grabar con el micrófono</strong>, di tu frase y detén la grabación: se abre lista para ponerla al revés.</p>`,
    faq: [
      ['¿Puedo poner al revés solo una parte de la canción?', 'Sí. Arrastra sobre la onda para elegir la parte y luego convierte.'],
      ['¿Es gratis?', 'Sí. Sin registro, sin marca de agua y el audio no se sube a ningún servidor.'],
    ],
  },
  {
    key: 'speedup', path: 'es/acelerar-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 1.25 }, suffix: ' (más rápido)',
    note: 'La velocidad está en 1,25×. Mueve el control de Velocidad, pulsa Reproducir con efectos y luego Convertir.',
    title: `Acelerar un audio online sin cambiar el tono | ${NAME}`,
    description: 'Acelera una canción, un pódcast o una nota de voz sin la voz de ardilla. Elige de 1,1× a 2×, escucha primero y descarga un MP3. Gratis y sin subir nada.',
    h1: '<em>Acelerar</em> un audio',
    lead: 'Haz más rápida una canción, un pódcast, una clase o una nota de voz, y que la voz mantenga su tono normal.',
    badges: ['Hasta 2×', 'Mismo tono', 'Escucha antes de guardar'],
    steps: [
      ['Abre tu archivo', 'Cualquier canción, nota de voz, pódcast o video.'],
      ['Elige la velocidad', 'Ya está puesta en 1,25×. Mueve el control de Velocidad y pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Más rápido, sin voz de ardilla</h2>
    <p>Si solo reproduces un audio más rápido, el tono también sube y las voces suenan como dibujos animados. ${NAME} estira el tiempo: acorta el audio y mantiene cada voz y cada nota en su tono normal.</p>
    <h3>Qué velocidad elegir</h3>
    <p><strong>1,25×</strong> ahorra una cuarta parte del tiempo y suena natural para la voz. <strong>1,5×</strong> es popular para clases y notas de voz largas. Por encima de <strong>1,75×</strong> la voz cuesta seguirla. Para la tendencia de canciones aceleradas con la voz más aguda, usa el <a href="/es/nightcore/">creador de nightcore</a>.</p>
    <h3>Todavía más corto</h3>
    <p>Activa también <strong>Quitar silencios</strong> para eliminar las pausas, o usa <a href="/es/quitar-silencios/">quitar silencios</a> por separado.</p>`,
    faq: [
      ['¿La voz suena más aguda?', 'No. El tono se mantiene. Solo cambia el ritmo.'],
      ['¿Cómo acelero una nota de voz?', 'Ábrela aquí, elige la velocidad, pulsa Convertir y Descargar. El archivo nuevo es más corto y se escucha en cualquier lado.'],
    ],
  },
  {
    key: 'slowdown', path: 'es/ralentizar-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 0.8 }, suffix: ' (más lento)',
    note: 'La velocidad está en 0,80×. Mueve el control de Velocidad, pulsa Reproducir con efectos y luego Convertir.',
    title: `Ralentizar un audio online sin cambiar el tono | ${NAME}`,
    description: 'Haz más lentas canciones, voces o notas de voz para aprender letras, practicar un instrumento o transcribir. Mismo tono, gratis y privado.',
    h1: '<em>Ralentizar</em> un audio',
    lead: 'Reproduce una canción o grabación más lenta sin la voz grave y arrastrada. Ideal para aprender canciones, bailar y transcribir.',
    badges: ['Hasta 0,5×', 'Mismo tono', 'Escucha antes de guardar'],
    steps: [
      ['Abre tu archivo', 'Una canción, una clase, una entrevista o una nota de voz.'],
      ['Elige la velocidad', 'Ya está puesta en 0,80×. Mueve el control de Velocidad y pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Más lento, pero afinado</h2>
    <p>${NAME} estira el audio en el tiempo y mantiene el tono, así que un solo de guitarra o un rap rápido se vuelve fácil de seguir y sigue sonando como el original.</p>
    <h3>Para practicar un instrumento</h3>
    <p>Empieza en <strong>0,70×</strong>, apréndete la parte, sube a 0,85× y por último a la velocidad normal. Para repetir un fragmento corto, selecciónalo antes en la onda y solo se guardará esa parte.</p>
    <h3>¿Quieres el sonido slowed + reverb?</h3>
    <p>Esa tendencia también baja el tono y añade reverb. <a href="/es/slowed-reverb/">Slowed + Reverb</a> ya lo tiene preparado.</p>`,
    faq: [
      ['¿Ralentizar cambia el tono?', 'No. Las notas se quedan en la misma tonalidad. Solo cambia el ritmo.'],
      ['¿Cuánto lo puedo ralentizar?', 'Hasta la mitad de velocidad (0,5×). Por debajo de 0,6× algunas canciones empiezan a sonar algo borrosas.'],
    ],
  },
  {
    key: 'pitch', path: 'es/cambiar-tono', tool: 'converter', crumb: 'Tools', fx: { pitch: -2 }, suffix: ' (nuevo tono)',
    note: 'El tono está 2 semitonos más bajo. Mueve el control de Tono, pulsa Reproducir con efectos y luego Convertir.',
    title: `Cambiar el tono de una canción online gratis | ${NAME}`,
    description: 'Cambia la tonalidad de cualquier canción hasta 12 semitonos arriba o abajo sin cambiar la velocidad. Ideal para cantar y tocar. Gratis y sin subir nada.',
    h1: '<em>Cambiar el tono</em> de una canción',
    lead: 'Sube o baja una canción a la tonalidad que le va a tu voz o a tu instrumento. El ritmo no cambia.',
    badges: ['±12 semitonos', 'Misma velocidad', 'Escucha antes de guardar'],
    steps: [
      ['Abre una canción', 'Cualquier canción o video de tu dispositivo.'],
      ['Cambia el tono', 'Empieza 2 semitonos más bajo. Mueve el control de Tono y pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Canta en el tono que te queda</h2>
    <p>Si una canción es demasiado aguda para cantarla, bájala <strong>2 o 3 semitonos</strong>. Si es demasiado grave, súbela. Un semitono es una tecla del piano, y 12 semitonos son una octava.</p>
    <h3>Para tocar con guitarra o piano</h3>
    <p>A veces las canciones están grabadas un poco desafinadas o en una tonalidad incómoda. Pásala a una tonalidad que conozcas, o usa la cejilla y mueve la canción para que coincida.</p>
    <h3>Para karaoke</h3>
    <p>Combínalo con <strong>Quitar voz</strong> en Efectos, o empieza en <a href="/es/quitar-voz/">quitar la voz</a>, para tener tu pista de karaoke en tu propio tono.</p>`,
    faq: [
      ['¿Cambiar el tono cambia la velocidad?', 'No. La canción mantiene su ritmo y su duración. Solo cambia la tonalidad.'],
      ['¿Cuántos semitonos es un cambio de tono?', 'Cada semitono es un paso. De Do a Re son 2 semitonos, y 12 semitonos son una octava.'],
    ],
  },
  {
    key: 'silence', path: 'es/quitar-silencios', tool: 'converter', crumb: 'Tools', fx: { silence: true }, suffix: ' (sin silencios)',
    note: 'Quitar silencios está activado. Corta cada pausa de más de 0,8 segundos. Pulsa Reproducir con efectos para comprobarlo.',
    title: `Quitar silencios de un audio automáticamente gratis | ${NAME}`,
    description: 'Corta automáticamente las pausas largas de grabaciones de voz, pódcast, clases y notas de voz. Gratis, privado y sin subir nada.',
    h1: '<em>Quitar silencios</em> de un audio',
    lead: 'Corta automáticamente las pausas largas y los silencios de tus grabaciones, para que queden más cortas y fáciles de escuchar.',
    badges: ['Automático', 'Voz y pódcast', 'Sin subir archivos'],
    steps: [
      ['Abre tu grabación', 'Una nota de voz, un pódcast, una clase o un video.'],
      ['Comprueba el resultado', 'Quitar silencios ya está activado. Pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Cómo funciona</h2>
    <p>${NAME} busca tramos en los que el sonido se queda muy bajo durante más de unos <strong>0,8 segundos</strong> y los corta. Las pausas normales entre palabras se quedan, así que la voz sigue sonando natural.</p>
    <h3>Funciona mejor con</h3>
    <p>Grabaciones de voz, clases, entrevistas y notas de voz largas. En música también cortaría las introducciones y finales suaves, así que normalmente no conviene para canciones.</p>
    <h3>¿Hay ruido en la sala?</h3>
    <p>Si hay un ventilador o tráfico de fondo, las pausas no están realmente en silencio. Activa también <strong>Quitar ruido con IA</strong>, o usa <a href="/es/quitar-ruido/">quitar ruido con IA</a>, que ya tiene esto activado.</p>`,
    faq: [
      ['¿Corta las pausas entre palabras?', 'No. Solo quita los silencios de más de unos 0,8 segundos.'],
      ['¿Por qué no se quitó nada?', 'Seguramente las pausas tienen ruido de fondo. Activa Quitar ruido con IA o Reducir siseo y prueba otra vez.'],
    ],
  },
  {
    key: 'fade', path: 'es/fundido-entrada-salida', tool: 'cutter', crumb: 'Tools', fx: { fadeIn: 3, fadeOut: 3 }, suffix: ' (con fundido)',
    note: 'Hay un fundido de entrada y de salida de 3 segundos. Elige una parte si quieres y pulsa Reproducir con efectos.',
    title: `Añadir fundido de entrada y salida a un MP3 gratis | ${NAME}`,
    description: 'Añade un fundido de entrada y de salida suave a cualquier canción o grabación. Elige la duración, recorta si quieres, escucha y descarga. Gratis y sin subir nada.',
    h1: 'Añadir <em>fundido</em> de entrada y salida',
    lead: 'Dale a una canción o clip un inicio y un final suaves en vez de un corte brusco. Elige la duración del fundido y escucha antes de guardar.',
    badges: ['De 0 a 10 segundos', 'También recorta', 'MP3, WAV, FLAC'],
    steps: [
      ['Abre tu archivo', 'Cualquier canción, grabación o video.'],
      ['Ajusta los fundidos', 'Hay 3 segundos en cada uno. Cámbialos en Efectos y pulsa Reproducir con efectos.'],
      ['Descarga', 'Pulsa Convertir y luego Descargar.'],
    ],
    content: `
    <h2>Cuándo ayuda un fundido</h2>
    <p>Un fundido hace que la música empiece y termine con suavidad. Sirve para tonos de llamada, música de fondo en videos, una parte recortada de una canción más larga o una presentación que termina antes que la música.</p>
    <h3>¿Cuánto debe durar?</h3>
    <p>Para un tono o un clip corto, <strong>de 1 a 2 segundos</strong>. Para música de fondo o el final de una canción, <strong>de 3 a 6 segundos</strong>. ${NAME} nunca deja que un fundido ocupe más de una cuarta parte del clip, así los clips cortos se siguen oyendo.</p>
    <h3>Fundido solo en un extremo</h3>
    <p>Pon el otro control en <em>no</em>. Para un tono con fundidos, el <a href="/es/creador-de-tonos/">creador de tonos</a> ya los tiene puestos.</p>`,
    faq: [
      ['¿Puedo poner fundido solo a una parte de la canción?', 'Sí. Arrastra sobre la onda para elegir la parte. Los fundidos se añaden al inicio y al final de tu selección.'],
      ['¿Baja la calidad?', 'Elige WAV o FLAC para no perder nada, o MP3 a 320 kbps para que quede muy parecido al original.'],
    ],
  },
];
