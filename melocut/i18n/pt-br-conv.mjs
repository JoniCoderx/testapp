// Brazilian Portuguese conversion pages. `key` links each one to its English page; `convLabel` is the short chip/footer label.
export default (NAME) => [
  {
    key: 'c-mp4', convLabel: 'MP4 para MP3', path: 'pt-br/mp4-para-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Converter MP4 para MP3 grátis, online e sem upload | ${NAME}`,
    description: 'Converta MP4 para MP3 online em poucos segundos. Até 320 kbps, sem upload, sem cadastro e sem marca d\'água. Funciona no iPhone, Android e PC.',
    h1: 'Converter <em>MP4 para MP3</em>',
    lead: 'Abra um MP4 e salve o som dele como MP3. Funciona no seu navegador, então o vídeo nunca sai do seu aparelho.',
    badges: ['Até 320 kbps', 'Sem upload', 'Grátis'],
    steps: [
      ['Abra o MP4', 'Toque no quadro acima e escolha o seu vídeo.'],
      ['Escolha a qualidade', '320 kbps para música, 128 kbps para voz.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Por que converter MP4 para MP3?</h2>
    <p>Um MP4 tem vídeo e som. Se você só quer ouvir, um MP3 ocupa muito menos e toca em qualquer celular, no som do carro e em todos os apps de música.</p>
    <h3>Quanto ocupa o MP3?</h3>
    <ul>
      <li><strong>320 kbps:</strong> uns 2,4 MB por minuto. O melhor para música.</li>
      <li><strong>192 kbps:</strong> uns 1,4 MB por minuto. Um bom meio-termo.</li>
      <li><strong>128 kbps:</strong> cerca de 1 MB por minuto. Suficiente para voz, aulas e podcasts.</li>
    </ul>
    <h3>Só precisa de um trecho?</h3>
    <p>Arraste sobre a onda para ficar só com a parte que você quer, por exemplo uma música de um vídeo de show. Quer usar como toque? Use o <a href="/pt-br/criar-toque/">criador de toques</a>.</p>
    <h3>Outros vídeos</h3>
    <p>Também funciona com MOV do iPhone, WebM, MKV e AVI. Veja <a href="/pt-br/video-para-mp3/">vídeo para MP3</a>.</p>`,
    faq: [
      ['O MP3 fica com o mesmo som do vídeo?', 'A 320 kbps a diferença é muito difícil de perceber.'],
      ['Dá para converter MP4 para MP3 no celular?', 'Sim. Funciona no navegador do iPhone e do Android, sem instalar nenhum app.'],
      ['Meu vídeo é enviado para algum servidor?', 'Não. A conversão acontece no seu aparelho, então o vídeo nunca sai dele.'],
      ['Posso converter vídeos do YouTube?', 'O MeloCut trabalha com arquivos do seu aparelho. Ele não baixa vídeos do YouTube nem de outros sites.'],
    ],
  },
  {
    key: 'c-wav', convLabel: 'WAV para MP3', path: 'pt-br/wav-para-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Converter WAV para MP3 online grátis, sem upload | ${NAME}`,
    description: 'Converta WAV para MP3 online e deixe seus arquivos até 10 vezes menores. Escolha de 128 a 320 kbps. Grátis, privado e sem upload.',
    h1: 'Converter <em>WAV para MP3</em>',
    lead: 'Transforme arquivos WAV grandes em MP3 fáceis de compartilhar e de ouvir em qualquer lugar.',
    badges: ['Até 10× menor', 'De 128 a 320 kbps', 'Sem upload'],
    steps: [
      ['Abra o WAV', 'Escolha um arquivo WAV do seu aparelho.'],
      ['Escolha a qualidade', '320 kbps é o mais próximo do original.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>WAV ou MP3?</h2>
    <p>Os arquivos WAV não são comprimidos, então uma música de três minutos ocupa uns 30 MB. Em MP3 a 320 kbps são uns 7 MB e soa quase igual. Assim fica muito mais fácil mandar, subir ou guardar no celular.</p>
    <p>Guarde também o WAV se for editar a gravação depois.</p>
    <h3>Quanto vai ocupar o MP3?</h3>
    <p>Um WAV com qualidade de CD ocupa uns 10 MB por minuto. O MP3 depende da qualidade que você escolher:</p>
    <ul>
      <li><strong>320 kbps:</strong> uns 2,4 MB por minuto. O melhor para música.</li>
      <li><strong>192 kbps:</strong> uns 1,4 MB por minuto.</li>
      <li><strong>128 kbps:</strong> cerca de 1 MB por minuto. Suficiente para voz.</li>
    </ul>
    <h3>Corte enquanto converte</h3>
    <p>Só precisa de uma parte? Arraste os controles sobre a onda e coloque um fade no começo ou no fim. Para uma gravação baixa, ative <strong>Volume automático</strong> em Efeitos.</p>`,
    faq: [
      ['Perde qualidade ao converter WAV para MP3?', 'Um pouco, porque o MP3 é comprimido. A 320 kbps quase ninguém percebe.'],
      ['É grátis?', 'Sim. Sem cadastro e sem marca d\'água, e o arquivo é convertido no seu navegador, então nunca é enviado.'],
      ['Qual qualidade eu escolho?', '320 kbps para música, 192 kbps para ouvir no dia a dia e 128 kbps para gravações de voz.'],
    ],
  },
  {
    key: 'c-m4a', convLabel: 'M4A para MP3', path: 'pt-br/m4a-para-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Converter M4A para MP3 grátis: gravações do iPhone | ${NAME}`,
    description: 'Converta M4A para MP3 online: gravações do iPhone, áudio do iTunes e mais. Grátis, privado e rápido. Sem upload e sem cadastro.',
    h1: 'Converter <em>M4A para MP3</em>',
    lead: 'Converta as gravações do app Gravador do iPhone e outros arquivos M4A para MP3 e ouça em qualquer aparelho.',
    badges: ['Gravações de voz', 'Áudio do iTunes', 'Sem upload'],
    steps: [
      ['Abra o M4A', 'Escolha o arquivo. No iPhone, salve a gravação no app Arquivos primeiro.'],
      ['Escolha a qualidade', '128 kbps basta para voz, 320 kbps para música.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Sobre os arquivos M4A</h2>
    <p>M4A é o formato de áudio que a Apple usa nas gravações de voz e nos downloads do iTunes. Ele soa bem, mas alguns players antigos, carros e programas do Windows não abrem. O MP3 funciona em todo lugar.</p>
    <h3>Tirar uma gravação do iPhone</h3>
    <p>No app Gravador, toque na gravação, depois em <strong>Compartilhar → Salvar em Arquivos</strong>, e abra aqui.</p>
    <h3>A gravação tem barulho de fundo?</h3>
    <p>Ative <strong>Remover ruído com IA</strong> em Efeitos antes de converter, ou use o <a href="/pt-br/remover-ruido/">removedor de ruído com IA</a>.</p>`,
    faq: [
      ['Como tiro uma gravação do meu iPhone?', 'No app Gravador, toque na gravação e depois em Compartilhar → Salvar em Arquivos. Depois abra aqui.'],
      ['Posso converter músicas protegidas do iTunes?', 'Não. Músicas com proteção contra cópia (DRM) não podem ser convertidas.'],
    ],
  },
  {
    key: 'c-wa', convLabel: 'Áudio do WhatsApp para MP3', path: 'pt-br/audio-whatsapp-para-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Converter áudio do WhatsApp para MP3 (OPUS) grátis | ${NAME}`,
    description: 'Converta áudios do WhatsApp e do Telegram (.opus, .ogg) para MP3 e ouça em qualquer lugar. Grátis e privado: suas mensagens nunca são enviadas.',
    h1: '<em>Áudio do WhatsApp</em> para MP3',
    lead: 'Converta áudios do WhatsApp e do Telegram (.opus ou .ogg) para MP3. Suas mensagens ficam no seu celular.',
    badges: ['OPUS e OGG', 'Privado', 'Grátis'],
    steps: [
      ['Salve o áudio', 'No WhatsApp, pressione e segure o áudio → Encaminhar → Compartilhar → Salvar em Arquivos.'],
      ['Abra aqui', 'Toque no quadro acima e escolha o arquivo .opus.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Por que os áudios do WhatsApp não abrem em todo lugar?</h2>
    <p>O WhatsApp salva as mensagens de voz no formato OPUS. Ele é ótimo para voz, mas muitos players, editores e celulares antigos não abrem. Um MP3 toca em qualquer lugar e é fácil de mandar ou guardar.</p>
    <h3>Privado de verdade</h3>
    <p>Áudios são pessoais, por isso importa que o ${NAME} nunca envia nada. A conversão acontece no seu próprio celular ou computador.</p>
    <h3>Vários áudios?</h3>
    <p>Use o <a href="/pt-br/juntar-audio/">juntar áudios</a> para colocar todos em um MP3 só. O <a href="/pt-br/guias/audio-whatsapp-mp3/">guia passo a passo</a> mostra como tirar os áudios do WhatsApp no iPhone e no Android.</p>`,
    faq: [
      ['Onde o WhatsApp salva os áudios no Android?', 'Normalmente em Armazenamento interno → Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes.'],
      ['Dá para aumentar o volume de um áudio?', 'Sim. Aumente o Volume ou ative Volume automático em Efeitos antes de converter.'],
    ],
  },
  {
    key: 'c-mp3wav', convLabel: 'MP3 para WAV', path: 'pt-br/mp3-para-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Converter MP3 para WAV online grátis | ${NAME}`,
    description: 'Converta MP3 para WAV online para editar, para programas de DJ ou para gravar CD. Grátis, rápido e privado. Nada é enviado.',
    h1: 'Converter <em>MP3 para WAV</em>',
    lead: 'Converta MP3 para WAV para programas de edição, apps de DJ ou para gravar CD.',
    badges: ['WAV de 16 bits', 'Para editar', 'Sem upload'],
    steps: [
      ['Abra o MP3', 'Escolha um MP3 do seu aparelho.'],
      ['O WAV já vem escolhido', 'Coloque efeitos antes, se quiser.'],
      ['Baixe o WAV', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Quando você precisa de um WAV</h2>
    <p>Alguns programas de edição, samplers e apps de gravar CD só aceitam WAV. Convertendo, você tem um arquivo que todos aceitam.</p>
    <p>Uma coisa importante: passar um MP3 para WAV não recupera a qualidade que o MP3 já perdeu. O WAV soa igual ao MP3, só que ocupa mais e é mais fácil de editar.</p>`,
    faq: [
      ['Converter MP3 para WAV melhora a qualidade?', 'Não. Mantém a qualidade que o MP3 tem, em um formato mais fácil de editar.'],
      ['Por que o WAV fica tão maior?', 'O WAV não é comprimido, então ocupa uns 10 MB por minuto.'],
    ],
  },
  {
    key: 'c-ogg', convLabel: 'OGG para MP3', path: 'pt-br/ogg-para-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Converter OGG para MP3 online grátis, sem upload | ${NAME}`,
    description: 'Converta arquivos OGG e OGA para MP3 e ouça no iPhone, no carro e em qualquer app de música. Grátis, rápido e sem upload.',
    h1: 'Converter <em>OGG para MP3</em>',
    lead: 'Transforme arquivos OGG de jogos, Telegram, Discord ou apps de Linux em MP3 que tocam em qualquer lugar.',
    badges: ['OGG Vorbis e Opus', 'Até 320 kbps', 'Sem upload'],
    steps: [
      ['Abra o OGG', 'Escolha um arquivo .ogg ou .oga do seu aparelho.'],
      ['Escolha a qualidade', '192 kbps é um bom meio-termo. Use 320 kbps para música.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>O que é um arquivo OGG?</h2>
    <p>OGG é um formato de áudio aberto. A maioria dos OGG tem música em <strong>Vorbis</strong>, e as mensagens de voz de apps como Telegram e WhatsApp costumam ter voz em <strong>Opus</strong>. Os dois soam bem, mas o iPhone, muitos sons de carro e players antigos não abrem.</p>
    <p>O ${NAME} lê os dois tipos e salva um MP3 padrão. Se for um áudio de conversa, veja <a href="/pt-br/audio-whatsapp-para-mp3/">áudio do WhatsApp para MP3</a>.</p>
    <h3>Se o OGG não abrir</h3>
    <ul>
      <li>Confira se terminou de baixar. Um OGG salvo pela metade não pode ser lido.</li>
      <li>Arquivos de apps de conversa às vezes terminam em <strong>.opus</strong> ou <strong>.oga</strong>. Também funcionam.</li>
      <li>No iPhone, salve o arquivo no app Arquivos primeiro e escolha de lá.</li>
    </ul>`,
    faq: [
      ['Por que meu iPhone não toca arquivos OGG?', 'A Apple só aceita alguns OGG em poucos apps. Convertendo para MP3 ou M4A, eles tocam em todo lugar.'],
      ['Perde qualidade ao converter OGG para MP3?', 'Os dois são comprimidos, então um pouco. A 256 ou 320 kbps é muito difícil perceber.'],
    ],
  },
];
