// The MP3 tag editor page in es/pt-br/de/fr. `key` matches the English page (build.mjs KEY_OF 'mp3-tag-editor' -> 'tags').
// Button and field names match the interface strings in i18n/ui.py (ES, PT), i18n/ui_de.py and i18n/ui_fr.py.
export default (NAME) => ({
  es: {
    key: 'tags', path: 'es/editor-de-etiquetas-mp3', tool: 'tags', format: 'mp3', crumb: 'Tools',
    title: `Editor de etiquetas MP3: título, artista y carátula | ${NAME}`,
    description: 'Editor de etiquetas MP3 gratis: cambia el título, el artista, el álbum, el año y la carátula de una canción. Sin app y sin subir el archivo.',
    h1: '<em>Editor de etiquetas MP3</em>: título, artista y carátula',
    lead: 'Arregla una canción que aparece como "Artista desconocido", ponle el título correcto o añádele una carátula. En tu navegador, desde el móvil o el ordenador.',
    badges: ['Título, artista, álbum', 'Carátula', 'Sin recodificar el MP3'],
    steps: [
      ['Abre la canción', 'Elige un MP3 de tu móvil o tu ordenador.'],
      ['Escribe los datos', 'Rellena el título, el artista, el álbum o el año, y elige una imagen de portada si quieres.'],
      ['Guárdala', 'Pulsa Guardar etiquetas y luego Descargar.'],
    ],
    content: `
    <h2>Qué son las etiquetas de un MP3</h2>
    <p>Las etiquetas (también llamadas etiquetas ID3) son los datos guardados dentro de un MP3: el título de la canción, el artista, el álbum, el año y la imagen de portada. Las apps de música, los equipos del coche y los móviles muestran esto en lugar del nombre del archivo. Cuando faltan o están mal, ves "Artista desconocido", un cuadrado gris en vez de la carátula o canciones metidas en el álbum equivocado.</p>
    <h2>Cómo funciona el editor</h2>
    <ul>
      <li><strong>Solo cambia lo que escribes.</strong> Los campos vacíos mantienen lo que el archivo ya tiene, así que puedes cambiar el artista de un MP3 y dejar el resto igual.</li>
      <li><strong>Sin pérdida de calidad en los MP3.</strong> Si abres un MP3 y no lo cortas ni le añades efectos, el sonido se copia tal cual. Solo cambian las etiquetas.</li>
      <li><strong>Carátula:</strong> elige cualquier imagen. Se reduce a 600 píxeles como máximo y se guarda como JPEG dentro del MP3, el tamaño que esperan la mayoría de reproductores. Así de fácil es añadir carátula a un MP3.</li>
      <li><strong>Otros formatos:</strong> abre un M4A, WAV, FLAC o un video y obtienes un MP3 a 320 kbps con tus etiquetas.</li>
    </ul>
    <h3>Consejos</h3>
    <ul>
      <li>Usa el mismo nombre de álbum, escrito igual, en todas las canciones para que los reproductores las agrupen.</li>
      <li>Una imagen cuadrada queda mejor como carátula. Una foto ancha también sirve, pero los reproductores pueden recortarla.</li>
      <li>¿Quieres acortar también la canción? Arrastra sobre la forma de onda antes de guardar, o usa primero <a href="/es/cortar-audio/">cortar audio</a>.</li>
      <li>¿Vas a hacer un tono? Para eso las etiquetas no importan: usa el <a href="/es/creador-de-tonos/">creador de tonos</a>.</li>
    </ul>
    <h3>Privado desde el principio</h3>
    <p>Tu música nunca sale de tu dispositivo. ${NAME} lee y escribe el archivo dentro de tu navegador, así que no se sube nada y no hace falta registrarse.</p>`,
    faq: [
      ['¿Cómo cambio el artista de un MP3?', 'Abre el MP3 aquí, escribe el nuevo nombre en Artista, pulsa Guardar etiquetas y descarga el archivo. Las demás etiquetas se quedan como estaban.'],
      ['¿Cómo añado una carátula a un MP3?', 'Abre el MP3, toca Elegir imagen en Imagen de portada y elige una foto. Luego pulsa Guardar etiquetas y descárgalo.'],
      ['¿Editar las etiquetas baja la calidad del sonido?', 'No en un MP3 que no cortas ni cambias: el sonido se copia tal cual. Los demás formatos se convierten a MP3 a 320 kbps.'],
      ['¿Por qué mi móvil sigue mostrando el título antiguo?', 'Algunas apps de música tienen su propia biblioteca. Borra la copia antigua de la canción y añade el archivo nuevo, o reinicia la app para que vuelva a leer las etiquetas.'],
    ],
  },
  'pt-br': {
    key: 'tags', path: 'pt-br/editor-de-tags-mp3', tool: 'tags', format: 'mp3', crumb: 'Tools',
    title: `Editor de tags MP3 online: título, artista e capa | ${NAME}`,
    description: 'Editor de tags MP3 grátis: mude o título, o nome do artista, o álbum, o ano e a capa de uma música. Sem app e o arquivo não sai do seu aparelho.',
    h1: '<em>Editor de tags MP3</em>: título, artista e capa',
    lead: 'Arrume uma música que aparece como "Artista desconhecido", coloque o título certo ou adicione uma capa. Direto no navegador, no celular ou no computador.',
    badges: ['Título, artista, álbum', 'Capa do álbum', 'Sem recodificar o MP3'],
    steps: [
      ['Abra a música', 'Escolha um MP3 do seu celular ou computador.'],
      ['Digite os dados', 'Preencha o título, o artista, o álbum ou o ano e escolha uma imagem de capa, se quiser.'],
      ['Salve', 'Toque em Salvar tags e depois em Baixar.'],
    ],
    content: `
    <h2>O que são as tags de um MP3</h2>
    <p>As tags (também chamadas de tags ID3) são as informações guardadas dentro de um MP3: o título da música, o artista, o álbum, o ano e a imagem de capa. Apps de música, o som do carro e o celular mostram essas informações em vez do nome do arquivo. Quando elas faltam ou estão erradas, aparece "Artista desconhecido", um quadrado cinza no lugar da capa ou músicas no álbum errado.</p>
    <h2>Como o editor funciona</h2>
    <ul>
      <li><strong>Só muda o que você digita.</strong> Campos vazios mantêm o que o arquivo já tem, então dá para mudar só o nome do artista do MP3 e deixar o resto como está.</li>
      <li><strong>Sem perda de qualidade nos MP3.</strong> Quando você abre um MP3 e não corta nem adiciona efeitos, o som é copiado exatamente como está. Só as tags mudam.</li>
      <li><strong>Capa:</strong> escolha qualquer imagem. Ela é reduzida para no máximo 600 pixels e salva como JPEG dentro do MP3, o tamanho que a maioria dos players espera. É assim que você coloca capa no MP3.</li>
      <li><strong>Outros formatos:</strong> abra um M4A, WAV, FLAC ou um vídeo e você recebe um MP3 de 320 kbps com as suas tags.</li>
    </ul>
    <h3>Dicas</h3>
    <ul>
      <li>Use o mesmo nome de álbum, escrito do mesmo jeito, em todas as músicas para os players agruparem tudo.</li>
      <li>Uma imagem quadrada fica melhor como capa. Uma foto larga também funciona, mas os players podem cortar as bordas.</li>
      <li>Quer encurtar a música também? Arraste na forma de onda antes de salvar, ou use antes o <a href="/pt-br/cortar-audio/">cortar áudio</a>.</li>
      <li>Vai fazer um toque? Para isso as tags não importam: use o <a href="/pt-br/criar-toque/">criar toque</a>.</li>
    </ul>
    <h3>Privado de verdade</h3>
    <p>Suas músicas nunca saem do seu aparelho. O ${NAME} lê e grava o arquivo dentro do navegador, então nada é enviado e não precisa de cadastro.</p>`,
    faq: [
      ['Como mudar o nome do artista de um MP3?', 'Abra o MP3 aqui, digite o novo nome em Artista, toque em Salvar tags e baixe o arquivo. As outras tags continuam como estavam.'],
      ['Como colocar capa no MP3?', 'Abra o MP3, toque em Escolher imagem em Imagem de capa e escolha uma foto. Depois toque em Salvar tags e baixe.'],
      ['Editar as tags piora a qualidade do som?', 'Não em um MP3 que você não corta nem altera: o som é copiado como está. Outros formatos são convertidos em MP3 de 320 kbps.'],
      ['Por que meu celular ainda mostra o título antigo?', 'Alguns apps de música mantêm a própria biblioteca. Apague a cópia antiga da música e adicione o arquivo novo, ou reinicie o app para ele ler as tags de novo.'],
    ],
  },
  de: {
    key: 'tags', path: 'de/mp3-tags-bearbeiten', tool: 'tags', format: 'mp3', crumb: 'Tools',
    title: `MP3-Tags bearbeiten: Titel, Interpret & Cover, gratis | ${NAME}`,
    description: 'MP3-Tags online bearbeiten: Ändere Titel, Interpret, Album, Jahr und Cover eines Songs. Kostenlos, ohne App, die Datei bleibt auf deinem Gerät.',
    h1: '<em>MP3-Tags bearbeiten</em>: Titel, Interpret und Cover',
    lead: 'Korrigiere einen Song, der als "Unbekannter Interpret" angezeigt wird, gib ihm den richtigen Titel oder ein Albumcover. Direkt im Browser, auf Handy oder Computer.',
    badges: ['Titel, Interpret, Album', 'Cover', 'MP3 ohne Neukodierung'],
    steps: [
      ['Song öffnen', 'Wähle eine MP3 von deinem Handy oder Computer.'],
      ['Angaben eintragen', 'Fülle Titel, Interpret, Album oder Jahr aus und wähle bei Bedarf ein Coverbild.'],
      ['Speichern', 'Tippe auf Tags speichern und dann auf Herunterladen.'],
    ],
    content: `
    <h2>Was MP3-Tags sind</h2>
    <p>Tags (auch ID3-Tags genannt) sind die Angaben, die in einer MP3 gespeichert sind: Songtitel, Interpret, Album, Jahr und Coverbild. Musik-Apps, Autoradios und Handys zeigen diese Angaben statt des Dateinamens an. Fehlen sie oder sind sie falsch, siehst du "Unbekannter Interpret", ein graues Quadrat statt des Covers oder Songs im falschen Album.</p>
    <h2>So funktioniert der Editor</h2>
    <ul>
      <li><strong>Nur was du eintippst, ändert sich.</strong> Leere Felder behalten, was schon in der Datei steht. So kannst du nur den Interpreten korrigieren und den Rest lassen.</li>
      <li><strong>Kein Qualitätsverlust bei MP3s.</strong> Wenn du eine MP3 öffnest und sie weder schneidest noch Effekte hinzufügst, wird der Ton unverändert kopiert. Nur die Tags ändern sich.</li>
      <li><strong>Cover zu MP3 hinzufügen:</strong> Wähle ein beliebiges Bild. Es wird auf höchstens 600 Pixel verkleinert und als JPEG in der MP3 gespeichert, in der Größe, die die meisten Player erwarten.</li>
      <li><strong>Andere Formate:</strong> Öffnest du eine M4A, WAV, FLAC oder ein Video, bekommst du eine MP3 mit 320 kbps und deinen Tags.</li>
    </ul>
    <h3>Tipps</h3>
    <ul>
      <li>Verwende bei allen Songs denselben Albumnamen in genau derselben Schreibweise, damit Player sie zusammen anzeigen.</li>
      <li>Ein quadratisches Bild sieht als Cover am besten aus. Ein breites Foto geht auch, aber Player schneiden es eventuell zu.</li>
      <li>Willst du den Song auch kürzen? Ziehe vor dem Speichern über die Wellenform oder nutze vorher <a href="/de/audio-schneiden/">Audio schneiden</a>.</li>
      <li>Du willst einen Klingelton machen? Dafür sind Tags egal: Nutze <a href="/de/klingelton-erstellen/">Klingelton erstellen</a>.</li>
    </ul>
    <h3>Privat von Anfang an</h3>
    <p>Deine Musik verlässt nie dein Gerät. ${NAME} liest und schreibt die Datei in deinem Browser, es wird also nichts hochgeladen und du brauchst kein Konto.</p>`,
    faq: [
      ['Wie ändere ich den Interpreten einer MP3?', 'Öffne die MP3 hier, gib den neuen Namen bei Interpret ein, tippe auf Tags speichern und lade die Datei herunter. Die anderen Tags bleiben, wie sie waren.'],
      ['Wie füge ich ein Cover zu einer MP3 hinzu?', 'Öffne die MP3, tippe unter Coverbild auf Bild wählen und such ein Bild aus. Tippe dann auf Tags speichern und lade die Datei herunter.'],
      ['Verschlechtert das Bearbeiten der Tags die Tonqualität?', 'Nicht bei einer MP3, die du nicht schneidest oder veränderst: Der Ton wird unverändert kopiert. Andere Formate werden in eine MP3 mit 320 kbps umgewandelt.'],
      ['Warum zeigt mein Handy noch den alten Titel?', 'Manche Musik-Apps haben ihre eigene Mediathek. Entferne die alte Kopie des Songs und füge die neue Datei hinzu, oder starte die App neu, damit sie die Tags erneut liest.'],
    ],
  },
  fr: {
    key: 'tags', path: 'fr/editeur-tags-mp3', tool: 'tags', format: 'mp3', crumb: 'Tools',
    title: `Modifier les tags MP3 : titre, artiste et pochette | ${NAME}`,
    description: "Modifie les tags MP3 en ligne : titre, artiste, album, année et pochette d'une chanson. Gratuit, sans appli, le fichier reste sur ton appareil.",
    h1: "<em>Modifier les tags MP3</em> : titre, artiste et pochette",
    lead: "Corrige une chanson qui s'affiche comme « Artiste inconnu », donne-lui le bon titre ou ajoute une pochette. Directement dans ton navigateur, sur téléphone ou ordinateur.",
    badges: ["Titre, artiste, album", "Pochette", "MP3 sans réencodage"],
    steps: [
      ["Ouvre la chanson", "Choisis un MP3 sur ton téléphone ou ton ordinateur."],
      ["Saisis les infos", "Remplis le titre, l'artiste, l'album ou l'année, et choisis une image de couverture si tu veux."],
      ["Enregistre", "Appuie sur Enregistrer les tags, puis sur Télécharger."],
    ],
    content: `
    <h2>Ce que sont les tags MP3</h2>
    <p>Les tags (aussi appelés tags ID3) sont les infos enregistrées dans un MP3 : le titre de la chanson, l'artiste, l'album, l'année et l'image de pochette. Les applis de musique, les autoradios et les téléphones les affichent à la place du nom du fichier. Quand ils manquent ou sont faux, tu vois « Artiste inconnu », un carré gris à la place de la pochette ou des chansons rangées dans le mauvais album.</p>
    <h2>Comment fonctionne l'éditeur</h2>
    <ul>
      <li><strong>Seul ce que tu tapes change.</strong> Les champs vides gardent ce que le fichier contient déjà, donc tu peux corriger juste l'artiste et laisser le reste.</li>
      <li><strong>Aucune perte de qualité pour les MP3.</strong> Si tu ouvres un MP3 sans le couper ni ajouter d'effets, le son est copié tel quel. Seuls les tags changent.</li>
      <li><strong>Ajouter une pochette à un MP3 :</strong> choisis n'importe quelle image. Elle est réduite à 600 pixels maximum et enregistrée en JPEG dans le MP3, la taille attendue par la plupart des lecteurs.</li>
      <li><strong>Autres formats :</strong> ouvre un M4A, WAV, FLAC ou une vidéo et tu obtiens un MP3 en 320 kbps avec tes tags.</li>
    </ul>
    <h3>Astuces</h3>
    <ul>
      <li>Utilise le même nom d'album, écrit exactement pareil, sur chaque chanson pour que les lecteurs les regroupent.</li>
      <li>Une image carrée rend mieux en pochette. Une photo large fonctionne aussi, mais les lecteurs peuvent la recadrer.</li>
      <li>Tu veux aussi raccourcir la chanson ? Fais glisser sur la forme d'onde avant d'enregistrer, ou utilise d'abord l'outil pour <a href="/fr/couper-audio/">couper un audio</a>.</li>
      <li>Tu fais une sonnerie ? Les tags n'ont pas d'importance pour ça : utilise l'outil pour <a href="/fr/creer-sonnerie/">créer une sonnerie</a>.</li>
    </ul>
    <h3>Privé par conception</h3>
    <p>Ta musique ne quitte jamais ton appareil. ${NAME} lit et écrit le fichier dans ton navigateur, donc rien n'est envoyé et aucune inscription n'est nécessaire.</p>`,
    faq: [
      ["Comment changer le nom de l'artiste d'un MP3 ?", "Ouvre le MP3 ici, tape le nouveau nom dans Artiste, appuie sur Enregistrer les tags et télécharge le fichier. Les autres tags restent comme avant."],
      ["Comment ajouter une pochette à un MP3 ?", "Ouvre le MP3, touche Choisir une image sous Image de couverture et choisis une photo, puis appuie sur Enregistrer les tags et télécharge."],
      ["Modifier les tags baisse-t-il la qualité du son ?", "Pas pour un MP3 que tu ne coupes pas et ne modifies pas : le son est copié tel quel. Les autres formats sont convertis en MP3 de 320 kbps."],
      ["Pourquoi mon téléphone affiche encore l'ancien titre ?", "Certaines applis de musique gardent leur propre bibliothèque. Supprime l'ancienne copie de la chanson et ajoute le nouveau fichier, ou redémarre l'appli pour qu'elle relise les tags."],
    ],
  },
});
