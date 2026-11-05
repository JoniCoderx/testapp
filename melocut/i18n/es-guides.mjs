// Spanish guides. `key` links each one to its English guide; `forTool` shows it on that Spanish tool page.
// Phone menu names follow the Spanish iOS and Samsung (One UI) interfaces.
export default (NAME) => [
  {
    key: 'g-iphone', forTool: 'ringtone', icon: 'bell', path: 'es/guias/tono-iphone', crumb: 'Guides', plain: true,
    title: `Poner una canción de tono en iPhone sin computadora | ${NAME}`,
    description: 'Pon cualquier canción como tono de llamada en tu iPhone sin computadora ni iTunes. El método de iOS 26 con la app Archivos y GarageBand para iPhone más antiguos.',
    h1: 'Cómo poner una canción como tono en iPhone',
    lead: 'Sin computadora, sin iTunes y sin apps de pago. En iOS 26 son cuatro toques desde la app Archivos, y en iPhone más antiguos se hace con GarageBand.',
    content: `
    <div class="callout"><p>Primero crea el tono: elige la mejor parte de tu canción. Tarda unos 30 segundos.</p><a class="btn sm" href="/es/creador-de-tonos/">Abrir el creador de tonos</a></div>
    <h2>Paso 1: crea el tono</h2>
    <ol class="guide-steps">
      <li>Abre el <a href="/es/creador-de-tonos/">creador de tonos</a> en Safari y elige tu canción desde Archivos, Fotos o tus descargas de música.</li>
      <li>Arrastra sobre la onda para elegir la parte que quieres. <strong>Que dure menos de 30 segundos</strong>: al empezar ya se seleccionan 29 segundos.</li>
      <li>Deja el formato en <strong>M4R</strong> (MP3 también sirve), pulsa <strong>Crear tono</strong> y luego <strong>Descargar</strong>. El archivo se guarda en la app <strong>Archivos</strong>, en <strong>Descargas</strong>.</li>
    </ol>
    <h2>Paso 2: ponlo como tono (iOS 26 o posterior)</h2>
    <ol class="guide-steps">
      <li>Abre la app <strong>Archivos</strong> → <strong>Explorar</strong> → <strong>Descargas</strong> y toca tu tono para abrirlo.</li>
      <li>Toca el botón <strong>Compartir</strong> (el cuadrado con una flecha hacia arriba).</li>
      <li>Toca <strong>Usar como tono</strong>. Si no lo ves, desplázate hasta el final de la lista de acciones o toca <strong>Más</strong>.</li>
      <li>Se abre Configuración con tu nuevo tono seleccionado. También lo encontrarás en <strong>Configuración → Sonidos y vibración → Tono de llamada</strong>.</li>
    </ol>
    <p>¿No sabes qué versión tienes? Ve a <strong>Configuración → General → Información → Versión de iOS</strong>.</p>
    <h2>Paso 2 en iPhone más antiguos (GarageBand)</h2>
    <ol class="guide-steps">
      <li>Instala <strong>GarageBand</strong> desde la App Store (es gratis y de Apple) y ábrelo. Empieza con cualquier instrumento, por ejemplo la grabadora de audio.</li>
      <li>Toca el botón de la <strong>vista de pistas</strong>, luego el icono de <strong>bucle</strong> arriba a la derecha → <strong>Archivos</strong> → explora los archivos de la app Archivos y elige tu tono.</li>
      <li>Arrástralo a la pista y luego toca la flecha <strong>⌄</strong> arriba a la izquierda → <strong>Mis canciones</strong>.</li>
      <li>Mantén pulsada la canción → <strong>Compartir</strong> → <strong>Tono</strong> → <strong>Exportar</strong> y elige usarla como tono de llamada estándar.</li>
    </ol>
    <h2>No aparece "Usar como tono" o no funciona</h2>
    <ol class="guide-steps">
      <li><strong>El archivo es demasiado largo.</strong> La app Archivos solo acepta sonidos de menos de 30 segundos. Vuelve a abrirlo en el creador de tonos y elige una parte más corta.</li>
      <li><strong>Es una canción de Apple Music.</strong> Las canciones de una suscripción a Apple Music están protegidas y no se pueden usar. Usa un archivo de canción que tengas, o el sonido de tus propios videos.</li>
      <li><strong>El archivo no terminó de descargarse.</strong> Descárgalo otra vez y espera a que termine la flecha azul en la barra de direcciones de Safari.</li>
      <li><strong>¿Sigue sin funcionar?</strong> Cierra por completo la app Archivos y vuelve a abrirla, o usa el método de GarageBand.</li>
    </ol>
    <h2>Solo para una persona</h2>
    <p>Abre <strong>Contactos</strong>, elige a la persona, toca <strong>Editar</strong> → <strong>Tono</strong> y elige tu nuevo sonido. ¿Tienes un Samsung? Mira <a href="/es/guias/tono-samsung/">cómo poner un tono en Samsung</a>.</p>`,
    faq: [
      ['¿Puedo poner un tono en iPhone sin computadora?', 'Sí. En iOS 26 o posterior, abre el archivo en la app Archivos y toca Compartir → Usar como tono. En versiones anteriores, usa GarageBand.'],
      ['¿Cuánto puede durar un tono de iPhone?', 'Menos de 30 segundos con el método de la app Archivos. GarageBand y la computadora permiten hasta 40 segundos.'],
      ['¿Necesito un archivo M4R?', 'Para el método de la app Archivos no, el MP3 también sirve. El M4R solo hace falta si copias el tono desde una computadora.'],
      ['¿Puedo usar una canción de Apple Music?', 'No. Las canciones de Apple Music están protegidas, así que el iPhone no las acepta como tono. Las canciones que compraste o tienes como archivo sí funcionan.'],
      ['¿Es gratis?', `Sí. El creador de tonos de ${NAME} es gratis y sin marca de agua, y la app Archivos y GarageBand también son gratis.`],
    ],
  },
  {
    key: 'g-samsung', icon: 'bell', path: 'es/guias/tono-samsung', crumb: 'Guides', plain: true,
    title: `Cómo poner una canción de tono en Samsung Galaxy | ${NAME}`,
    description: 'Pon cualquier canción como tono en un Samsung Galaxy: crea el tono y luego Ajustes → Sonidos y vibración → Tono de llamada → +. También por contacto y con dos SIM.',
    h1: 'Cómo poner una canción como tono en Samsung',
    lead: 'Cualquier Samsung Galaxy puede usar tu propia canción como tono. Primero crea el tono y después son unos pocos toques en Ajustes.',
    content: `
    <div class="callout"><p>Primero crea el tono. Elige la mejor parte de una canción en unos 30 segundos.</p><a class="btn sm" href="/es/creador-de-tonos/">Abrir el creador de tonos</a></div>
    <h2>Paso 1: crea el tono</h2>
    <ol class="guide-steps">
      <li>Abre el <a href="/es/creador-de-tonos/">creador de tonos</a> en Chrome o Samsung Internet y elige tu canción.</li>
      <li>Arrastra sobre la onda para elegir la parte que quieres y elige <strong>MP3</strong>.</li>
      <li>Pulsa <strong>Crear tono</strong> y luego <strong>Descargar</strong>. Se guarda en <strong>Mis archivos → Descargas</strong>.</li>
    </ol>
    <h2>Paso 2: ponlo como tono de llamada</h2>
    <ol class="guide-steps">
      <li>Abre <strong>Ajustes</strong> → <strong>Sonidos y vibración</strong> → <strong>Tono de llamada</strong>.</li>
      <li>Si tienes dos tarjetas SIM, elige <strong>SIM 1</strong> o <strong>SIM 2</strong>.</li>
      <li>Toca el <strong>+</strong> arriba a la derecha de la lista.</li>
      <li>Busca tu archivo (en <strong>Descargas</strong> o en <strong>Audio</strong>), tócalo y pulsa <strong>Listo</strong>.</li>
    </ol>
    <h2>Solo para un contacto</h2>
    <ol class="guide-steps">
      <li>Abre <strong>Contactos</strong> y toca a la persona.</li>
      <li>Toca <strong>Editar</strong> y luego <strong>Ver más</strong> abajo.</li>
      <li>Toca <strong>Tono de llamada</strong>, luego <strong>+</strong>, elige tu archivo y guarda.</li>
    </ol>
    <h2>Como sonido de notificación</h2>
    <p>Ve a <strong>Ajustes → Sonidos y vibración → Sonido de notificación</strong> y añade tu archivo de la misma forma. Los sonidos de notificación funcionan mejor cortos, de 1 a 3 segundos. Con <a href="/es/cortar-audio/">cortar audio</a> puedes recortar un sonido así de corto.</p>
    <h2>La canción no aparece en la lista</h2>
    <ol class="guide-steps">
      <li>Comprueba que la descarga terminó: abre <strong>Mis archivos → Descargas</strong> y reprodúcela.</li>
      <li>Cierra y vuelve a abrir Ajustes, o reinicia el teléfono, para que busque sonidos nuevos.</li>
      <li>Mueve el archivo a la carpeta <strong>Ringtones</strong> en Mis archivos (Almacenamiento interno → Ringtones). Los archivos de esa carpeta siempre aparecen.</li>
    </ol>`,
    faq: [
      ['¿Cuánto puede durar un tono en Samsung?', 'No hay un límite estricto, pero de 20 a 30 segundos es suficiente. El tono se repite hasta que contestas.'],
      ['¿Qué formato usan los Samsung?', 'El MP3 funciona en todos los Samsung. M4A y OGG también sirven.'],
      ['¿Puedo poner un tono distinto para cada SIM?', 'Sí. En Tono de llamada, elige SIM 1 o SIM 2 y configura cada una por separado.'],
    ],
  },
  {
    key: 'g-whatsapp', forTool: 'converter', icon: 'swap', path: 'es/guias/audio-whatsapp-a-mp3', crumb: 'Guides', plain: true,
    title: `Cómo pasar un audio de WhatsApp a MP3 | ${NAME}`,
    description: 'Guarda una nota de voz de WhatsApp desde iPhone o Android y conviértela a MP3 para escucharla en cualquier lado. Paso a paso, gratis y sin que salga de tu teléfono.',
    h1: 'Cómo pasar un audio de WhatsApp a MP3',
    lead: 'Las notas de voz de WhatsApp son archivos .opus que la mayoría de los reproductores no abren. Así puedes sacarlas del chat y convertirlas en MP3.',
    content: `
    <h2>1. Saca la nota de voz de WhatsApp</h2>
    <h3>iPhone</h3>
    <ol class="guide-steps">
      <li>Abre el chat y <strong>mantén pulsada</strong> la nota de voz → <strong>Reenviar</strong>.</li>
      <li>Toca el botón <strong>Compartir</strong> abajo a la derecha (no la flecha para reenviar a un chat).</li>
      <li>Elige <strong>Guardar en Archivos</strong> y guárdala, por ejemplo en Descargas.</li>
    </ol>
    <h3>Android</h3>
    <ol class="guide-steps">
      <li>Mantén pulsada la nota de voz y toca el icono de <strong>Compartir</strong> arriba.</li>
      <li>Elige <strong>Archivos</strong>, <strong>Drive</strong> u otro lugar para guardarla.</li>
      <li>O encuentra todas tus notas de voz en la app de archivos, en <em>Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes</em>.</li>
    </ol>
    <h2>2. Conviértela a MP3</h2>
    <ol class="guide-steps">
      <li>Abre el <a href="/es/convertidor-de-audio/">convertidor de audio</a> y elige la nota de voz.</li>
      <li>Elige <strong>MP3</strong>, pulsa <strong>Convertir</strong> y luego <strong>Descargar</strong>. Con 128 kbps basta para la voz.</li>
    </ol>
    <h2>Que se oiga mejor</h2>
    <p>Las notas de voz grabadas en la calle suelen tener ruido. Abre el MP3 en <a href="/es/quitar-ruido/">quitar ruido con IA</a> para eliminar el viento y el tráfico e igualar el volumen. Si quieres juntar varias notas de voz en un solo archivo, usa <a href="/es/unir-audio/">unir audio</a>. Los mensajes de voz de Telegram (.ogg) funcionan igual.</p>`,
    faq: [
      ['¿Por qué no puedo escuchar una nota de voz de WhatsApp en la computadora?', 'WhatsApp las guarda como archivos .opus, que muchos reproductores no admiten. Al convertirlas a MP3 se arregla.'],
      ['¿Se sube mi nota de voz?', 'No. La conversión se hace en tu propio teléfono o computadora, así que el mensaje nunca sale de tu dispositivo.'],
      ['¿Puedo juntar varias notas de voz en un archivo?', 'Sí. Conviértelas y luego únelas con la herramienta para unir audio.'],
    ],
  },
  {
    key: 'g-slowed', forTool: 'slowed', icon: 'slow', path: 'es/guias/slowed-reverb', crumb: 'Guides', plain: true,
    title: `Cómo hacer canciones slowed + reverb en el celular | ${NAME}`,
    description: 'Haz tu propia versión slowed + reverb de cualquier canción en el celular o la computadora: la velocidad, el tono y la reverb que suenan bien, paso a paso. Gratis.',
    h1: 'Cómo hacer canciones slowed + reverb',
    lead: 'Ese sonido lento y soñador de TikTok y YouTube se hace en un minuto, gratis, desde tu navegador.',
    content: `
    <h2>Paso a paso</h2>
    <ol class="guide-steps">
      <li>Abre <a href="/es/slowed-reverb/">Slowed + Reverb</a> y elige una canción de tu celular o computadora.</li>
      <li>Los ajustes clásicos ya están puestos: velocidad <strong>0,85×</strong> con reverb. Pulsa <strong>Reproducir con efectos</strong>.</li>
      <li>Ajústalo a tu gusto (mira los ajustes de abajo) y luego pulsa <strong>Convertir</strong> y <strong>Descargar</strong> tu MP3.</li>
    </ol>
    <h2>Ajustes que suenan bien</h2>
    <ol class="guide-steps">
      <li><strong>Velocidad de 0,80 a 0,90×.</strong> Más lento que 0,80 empieza a sonar borroso, y más rápido que 0,90 casi no se nota.</li>
      <li><strong>Tono de 1 a 3 semitonos más bajo.</strong> Da esa voz grave y con sueño. Déjalo en 0 si el cantante suena demasiado oscuro.</li>
      <li><strong>Reverb del 35 al 55 %.</strong> Lo justo para sonar como una sala grande, sin que se pierdan las palabras.</li>
      <li><strong>Un poco más de graves</strong> (+3 a +6 dB) lo hace sonar más lleno con auriculares.</li>
    </ol>
    <h2>Otras versiones para probar</h2>
    <ol class="guide-steps">
      <li><strong>Acelerada o nightcore:</strong> velocidad de 1,15 a 1,30× con el tono más alto. Usa el <a href="/es/nightcore/">creador de nightcore</a>.</li>
      <li><strong>8D:</strong> el sonido gira alrededor de tu cabeza con auriculares. Usa el <a href="/es/audio-8d/">convertidor de audio 8D</a>.</li>
      <li><strong>Tono slowed:</strong> haz tu versión lenta y luego ábrela en el <a href="/es/creador-de-tonos/">creador de tonos</a>.</li>
    </ol>
    <h2>Para publicarla</h2>
    <p>TikTok, Instagram y YouTube pueden silenciar o bloquear canciones de las que no tienes los derechos, aunque estén más lentas. Para escucharla tú no hay problema; para publicarla, usa música tuya o que tengas permiso de usar, o añade la canción original desde la biblioteca de música de la app. ¿Necesitas un video en vez de audio? <a href="/es/cancion-a-video/">Canción a video</a> convierte tu versión lenta en un MP4 con una onda de sonido animada.</p>`,
    faq: [
      ['¿Qué velocidad tiene el slowed + reverb?', 'Normalmente entre 0,80 y 0,90 veces la velocidad original, con el tono de 1 a 3 semitonos más bajo.'],
      ['¿Lo puedo hacer en el celular?', 'Sí. Slowed + Reverb funciona en Safari y Chrome en iPhone y Android, sin instalar nada.'],
      ['¿Tiene marca de agua?', 'No. El MP3 es tuyo, sin marca de agua y sin registro.'],
    ],
  },
];
