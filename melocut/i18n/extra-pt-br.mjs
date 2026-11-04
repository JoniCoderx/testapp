// Brazilian Portuguese versions of the newer pages. Each `key` matches the English page (build.mjs KEY_OF).
export const toolPaths = { 'audio-splitter': 'pt-br/dividir-audio' };
export default (NAME) => [
  {
    key: 'splitter', path: 'pt-br/dividir-audio', tool: 'splitter', crumb: 'Tools',
    title: `Dividir áudio: dividir MP3 em partes online grátis | ${NAME}`,
    description: 'Divida um MP3, podcast ou gravação longa em partes iguais ou em uma parte a cada poucos minutos. Baixe tudo em um ZIP. Grátis, privado e sem upload.',
    h1: '<em>Dividir áudio</em>: divida um MP3 em partes',
    lead: 'Corte uma música longa, um podcast, uma aula ou um audiolivro em partes iguais, ou em uma parte nova a cada poucos minutos. Todas as partes vêm em um só ZIP.',
    badges: ['De 2 a 10 partes', 'Ou a cada N minutos', 'Um só ZIP'],
    steps: [
      ['Abra seu arquivo', 'Um MP3 longo, uma gravação, um podcast ou um vídeo.'],
      ['Escolha como dividir', 'Escolha um número de partes iguais, ou uma parte a cada 1 a 30 minutos.'],
      ['Divida e baixe', 'Aperte Dividir e depois Baixar tudo (ZIP).'],
    ],
    content: `
    <h2>O que as pessoas dividem</h2>
    <ul>
      <li><strong>Gravações longas e aulas</strong> em partes de 10 ou 15 minutos, mais fáceis de compartilhar e de ouvir.</li>
      <li><strong>Podcasts e audiolivros</strong> em capítulos, para players que lembram onde você parou em cada arquivo.</li>
      <li><strong>Áudios para WhatsApp ou e-mail</strong> quando o arquivo é grande demais para mandar de uma vez.</li>
      <li><strong>Um set de DJ ou um show</strong> em partes iguais.</li>
    </ul>
    <h3>Só um trecho do arquivo?</h3>
    <p>Arraste antes os marcadores na onda. Só o trecho selecionado é dividido, então dá para pular uma introdução ou o silêncio do final.</p>
    <h3>Formato e efeitos</h3>
    <p>Cada parte é salva no formato que você escolher: MP3, M4A, WAV, OGG ou FLAC. Os efeitos também valem para cada parte: ative <strong>Volume automático</strong> para igualar o volume, ou coloque uma <strong>Entrada suave</strong> e uma <strong>Saída suave</strong> curtas para as partes não começarem nem terminarem de repente.</p>
    <p>Precisa de um trecho específico? Use <a href="/pt-br/cortar-audio/">Cortar áudio</a>. Quer juntar as partes de novo? Use <a href="/pt-br/juntar-audio/">Juntar áudios</a>.</p>`,
    faq: [
      ['Como divido um MP3 em partes iguais?', 'Abra o MP3, escolha por exemplo 4 partes iguais, aperte Dividir e baixe o ZIP com as quatro partes.'],
      ['Posso dividir um arquivo a cada 10 minutos?', 'Sim. Escolha A cada 10 min. A última parte fica com o que sobrar.'],
      ['O arquivo é enviado para algum servidor?', 'Não. Ele é dividido dentro do seu navegador.'],
      ['Como abro o ZIP no celular?', 'No iPhone, toque no ZIP no app Arquivos e ele vira uma pasta. No Android, abra no app de arquivos e toque em Extrair.'],
    ],
  },
  {
    key: 'normalize', path: 'pt-br/normalizar-audio', tool: 'converter', crumb: 'Tools', fx: { normalize: true }, suffix: ' (normalizado)',
    note: 'O Volume automático está ativado. Ele deixa o arquivo inteiro com um volume uniforme, como nos apps de música. Aperte Tocar com efeitos para ouvir.',
    title: `Normalizar áudio online: igualar o volume do MP3 | ${NAME}`,
    description: 'Normalize áudio online: deixe arquivos baixos e altos com o mesmo volume, como o Spotify e o YouTube fazem. MP3, WAV, áudios e vídeos. Grátis e sem upload.',
    h1: '<em>Normalizar áudio</em> online',
    lead: 'Deixe qualquer gravação ou música com um volume uniforme e padrão, para os arquivos baixos ficarem claros e os altos não estourarem. Um limitador mantém o som limpo.',
    badges: ['Volume de streaming', 'Sem distorção', 'Sem upload'],
    steps: [
      ['Abra seu arquivo', 'Uma música, áudio, podcast, aula ou vídeo.'],
      ['Ouça', 'O Volume automático já vem ativado. Aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>O que a normalização faz</h2>
    <p>O <strong>Volume automático</strong> mede o quanto o arquivo inteiro soa alto para quem ouve, não só o pico mais alto, e o leva mais ou menos ao mesmo nível que os apps de música usam. Depois um limitador segura os momentos mais altos para nada chiar. Gravações baixas ficam claras; arquivos que já eram altos ficam quase como estavam.</p>
    <h3>Vários arquivos com o mesmo volume</h3>
    <p>Montando uma playlist ou um podcast com vários trechos? Normalize cada um, ou junte todos com <a href="/pt-br/juntar-audio/">Juntar áudios</a> e ative lá <strong>Igualar volume</strong>.</p>
    <h3>Ainda está baixo?</h3>
    <p>Aumente também o controle de Volume em Efeitos, ou use <a href="/pt-br/aumentar-volume/">Aumentar volume</a>.</p>`,
    faq: [
      ['O que é normalizar um áudio?', 'Ajustar um arquivo para o volume geral chegar a um nível padrão. O MeloCut normaliza pela sonoridade, ou seja, pelo quanto o som parece alto, e não só pelo pico mais alto.'],
      ['Normalizar distorce o áudio?', 'Não. Um limitador mantém os picos sob controle, então o resultado fica mais alto sem distorcer.'],
      ['Posso normalizar vários arquivos de uma vez?', 'Normalize um por um aqui, ou junte todos com Juntar áudios e ative Igualar volume.'],
    ],
  },
  {
    key: 'mono', path: 'pt-br/estereo-para-mono', tool: 'converter', crumb: 'Tools', fx: { mono: true }, suffix: ' (mono)',
    note: 'Mono está ativado: os dois canais são mixados em um. Aperte Tocar com efeitos para conferir.',
    title: `Converter estéreo para mono online grátis | ${NAME}`,
    description: 'Converta áudio estéreo para mono online: mixe esquerda e direita em um canal para caixas de som, chamadas, podcasts ou arquivos menores. Grátis e sem upload.',
    h1: 'Converter <em>estéreo para mono</em>',
    lead: 'Mixe os canais esquerdo e direito em um só, para o som ficar igual em todas as caixas e em um fone só.',
    badges: ['Esquerda + direita', 'WAV menor', 'Sem upload'],
    steps: [
      ['Abra seu arquivo', 'Qualquer música, gravação ou vídeo.'],
      ['Ouça', 'Mono já vem ativado. Aperte Tocar com efeitos.'],
      ['Baixe', 'Escolha um formato, aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Quando o mono é melhor</h2>
    <ul>
      <li><strong>Um fone só ou uma caixa de som só:</strong> nada do que tocava só do outro lado se perde.</li>
      <li><strong>Gravações de voz e podcasts:</strong> uma voz presa em um ouvido soa estranha; o mono coloca a voz no centro.</li>
      <li><strong>Arquivos menores:</strong> um WAV mono tem metade do tamanho de um estéreo.</li>
    </ul>
    <p>Os dois canais são mixados juntos, então você mantém tudo o que estava em qualquer um dos lados.</p>
    <h3>Voz só de um lado?</h3>
    <p>Algumas gravações têm a voz só no canal esquerdo ou no direito. O mono resolve isso também. Ative também o <strong>Volume automático</strong> se ficar baixo.</p>`,
    faq: [
      ['Converter para mono perde qualidade?', 'Tira a imagem estéreo de esquerda e direita, mas mantém todo o som dos dois lados. Na voz você não vai notar diferença.'],
      ['O arquivo fica menor?', 'Um WAV ou FLAC mono fica com mais ou menos metade do tamanho. No MP3 o tamanho depende principalmente do bitrate que você escolher.'],
    ],
  },
  {
    key: 'reverb', path: 'pt-br/adicionar-reverb', tool: 'converter', crumb: 'Tools', fx: { reverb: 40 }, suffix: ' (reverb)',
    note: 'O reverb está em 40%. Mexa no controle de Reverb e aperte Tocar com efeitos para ouvir.',
    title: `Adicionar reverb ao áudio online: eco e ambiência | ${NAME}`,
    description: 'Adicione reverb a vozes, músicas e áudios online. Escolha quanta ambiência você quer, ouça antes e baixe. Grátis, privado e nada é enviado para servidores.',
    h1: 'Adicionar <em>reverb</em> ao áudio',
    lead: 'Dê espaço a uma gravação seca: de uma sala pequena a um grande salão. Ajuste a quantidade, ouça e baixe.',
    badges: ['De 0 a 100%', 'Ouça antes', 'MP3 ou WAV'],
    steps: [
      ['Abra seu arquivo', 'Uma voz, música, áudio ou vídeo.'],
      ['Ajuste a quantidade', 'Está em 40%. Mexa no controle de Reverb e aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Quanto reverb?</h2>
    <ul>
      <li><strong>10 a 25%:</strong> uma sala natural. Bom para vozes gravadas em casa e locuções.</li>
      <li><strong>30 a 50%:</strong> um som amplo e sonhador, como nos edits slowed + reverb.</li>
      <li><strong>60% ou mais:</strong> um salão ou uma caverna, como efeito.</li>
    </ul>
    <h3>Combinações populares</h3>
    <p>Para a trend clássica, baixe também a velocidade e o tom, ou comece pelo <a href="/pt-br/slowed-reverb/">Slowed + Reverb</a>. Para uma voz em um espaço enorme, experimente a voz <em>Eco</em> no <a href="/pt-br/mudar-voz/">Modificador de voz</a>.</p>`,
    faq: [
      ['Qual a diferença entre reverb e eco?', 'O reverb é a cauda suave do som em uma sala. O eco é uma repetição nítida. O reverb do MeloCut dá som de sala; a voz Eco do Modificador de voz puxa mais para um grande espaço com eco.'],
      ['Posso colocar reverb só na minha voz?', 'O reverb é aplicado no arquivo inteiro. Para ter reverb só na voz, coloque em uma gravação só de voz antes de mixar com a música.'],
    ],
  },
  {
    key: 'c-compress', convLabel: 'Comprimir MP3', path: 'pt-br/comprimir-mp3', tool: 'converter', format: 'mp3', quality: '64', crumb: 'Converters', suffix: ' (comprimido)',
    title: `Comprimir MP3: reduzir o tamanho do áudio grátis | ${NAME}`,
    description: 'Deixe MP3 e arquivos de áudio menores online: baixe o bitrate, passe para mono e corte. Grátis, privado e rápido. Seu arquivo nunca é enviado.',
    h1: '<em>Comprimir MP3</em> e arquivos de áudio',
    lead: 'Deixe um MP3, um áudio de voz ou uma gravação bem menor para caber no limite do e-mail, do chat ou do upload. Escolha uma qualidade menor e veja o novo tamanho.',
    badges: ['De 64 a 320 kbps', 'Opção mono', 'Sem upload'],
    steps: [
      ['Abra o arquivo', 'Qualquer MP3, WAV, M4A ou outro arquivo de áudio, ou um vídeo.'],
      ['Escolha uma qualidade menor', '64 kbps já vem selecionado. Use 96 ou 128 kbps para música.'],
      ['Baixe', 'Aperte Converter. O novo tamanho aparece antes de baixar.'],
    ],
    content: `
    <h2>Quanto menor?</h2>
    <p>O tamanho de um MP3 depende quase só do bitrate e da duração:</p>
    <ul>
      <li><strong>320 kbps:</strong> cerca de 2,4 MB por minuto.</li>
      <li><strong>128 kbps:</strong> cerca de 1 MB por minuto.</li>
      <li><strong>96 kbps:</strong> cerca de 0,7 MB por minuto.</li>
      <li><strong>64 kbps:</strong> cerca de 0,5 MB por minuto. Suficiente para voz, podcasts e áudios.</li>
    </ul>
    <p>Ou seja, uma música em 320 kbps fica umas cinco vezes menor em 64 kbps.</p>
    <h3>Ainda menor</h3>
    <ul>
      <li>Ative <strong>Mono</strong> em Efeitos. Na voz você não vai notar diferença.</li>
      <li>Arraste na onda para ficar só com o trecho que você precisa.</li>
      <li>Ative <strong>Remover silêncios</strong> para cortar as pausas longas das gravações.</li>
    </ul>
    <h3>E a qualidade?</h3>
    <p>Bitrates baixos tiram detalhes que você percebe principalmente em música: 64 kbps soa bem para vozes; para músicas use de 96 a 128 kbps. Comprimir não deixa o arquivo soar melhor, então guarde o original se puder precisar dele depois.</p>`,
    faq: [
      ['Como deixo um MP3 menor?', 'Abra aqui, deixe 64 ou 96 kbps, aperte Converter e baixe. Ativando Mono ele fica menor ainda.'],
      ['Posso comprimir vários arquivos de uma vez?', 'Sim. Escolha vários arquivos juntos no Conversor de áudio e baixe todos em um ZIP.'],
      ['Meu arquivo é enviado para algum servidor?', 'Não. Ele é comprimido dentro do seu navegador.'],
    ],
  },
  {
    key: 'c-mp4wav', convLabel: 'MP4 para WAV', path: 'pt-br/mp4-para-wav', tool: 'video-to-mp3', format: 'wav', crumb: 'Converters',
    title: `Converter MP4 para WAV grátis e online | ${NAME}`,
    description: 'Converta vídeo MP4 para áudio WAV online para edição, transcrição ou programas de música. WAV de 16 bits, sem upload e sem cadastro. No celular e no PC.',
    h1: 'Converter <em>MP4 para WAV</em>',
    lead: 'Tire o som de um MP4 e salve como WAV sem compressão, pronto para o seu programa de edição.',
    badges: ['WAV de 16 bits', 'MP4, MOV, WebM', 'Sem upload'],
    steps: [
      ['Abra o MP4', 'Escolha um vídeo do seu aparelho.'],
      ['O WAV já vem selecionado', 'Arraste antes na onda se só precisar de um trecho.'],
      ['Baixe o WAV', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Por que WAV?</h2>
    <p>O WAV guarda o som sem acrescentar compressão, por isso é o formato preferido de programas de edição, DAWs e ferramentas de transcrição. O som de um MP4 normalmente já vem comprimido; o WAV mantém exatamente como está, sem perder mais nada.</p>
    <p>Arquivos WAV são grandes, cerca de 10 MB por minuto. Se você só quer ouvir, <a href="/pt-br/mp4-para-mp3/">MP4 para MP3</a> gera um arquivo bem menor.</p>`,
    faq: [
      ['Funciona com vídeos do iPhone?', 'Sim. Vídeos MOV e MP4 do iPhone funcionam.'],
      ['O vídeo é enviado para algum servidor?', 'Não. O som é extraído dentro do seu navegador.'],
    ],
  },
  {
    key: 'c-m4awav', convLabel: 'M4A para WAV', path: 'pt-br/m4a-para-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Converter M4A para WAV grátis e online | ${NAME}`,
    description: 'Converta M4A para WAV online: gravações de voz do iPhone e áudio do iTunes para WAV de 16 bits para programas de edição. Grátis, privado e sem upload.',
    h1: 'Converter <em>M4A para WAV</em>',
    lead: 'Transforme gravações do app Gravador do iPhone e outros arquivos M4A em WAV para edição, transcrição ou programas de música.',
    badges: ['WAV de 16 bits', 'Gravações de voz', 'Sem upload'],
    steps: [
      ['Abra o M4A', 'No iPhone, primeiro compartilhe a gravação para o app Arquivos e depois escolha aqui.'],
      ['O WAV já vem selecionado', 'Corte ou coloque efeitos se quiser.'],
      ['Baixe o WAV', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Quando você precisa de WAV</h2>
    <p>Alguns editores, samplers e serviços de transcrição só aceitam WAV. Convertendo, você tem um arquivo que todos abrem. A gravação não vai soar melhor que o M4A; ela só fica salva sem mais compressão.</p>
    <p>Gravação com barulho? Ative <strong>Remover ruído com IA</strong> em Efeitos antes de converter.</p>`,
    faq: [
      ['Posso converter músicas protegidas do iTunes?', 'Não. Músicas com proteção contra cópia (DRM) não podem ser convertidas.'],
      ['Qual vai ser o tamanho do WAV?', 'Cerca de 10 MB por minuto em estéreo, metade disso em mono.'],
    ],
  },
  {
    key: 'c-flacwav', convLabel: 'FLAC para WAV', path: 'pt-br/flac-para-wav', tool: 'converter', format: 'wav', crumb: 'Converters',
    title: `Converter FLAC para WAV grátis e sem perdas | ${NAME}`,
    description: 'Converta FLAC para WAV online sem perder qualidade. Os dois são sem perdas, então o som fica exatamente igual. Grátis, privado e nada é enviado.',
    h1: 'Converter <em>FLAC para WAV</em>',
    lead: 'Converta música FLAC sem perdas para WAV para programas, aparelhos e gravadores de CD que não abrem FLAC.',
    badges: ['Sem perdas', 'WAV de 16 bits', 'Sem upload'],
    steps: [
      ['Abra o FLAC', 'Escolha um arquivo FLAC do seu aparelho.'],
      ['O WAV já vem selecionado', 'Deixe os efeitos desligados para uma cópia exata.'],
      ['Baixe o WAV', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Mesmo som, outro formato</h2>
    <p>FLAC e WAV são sem perdas, então nada é descartado. O FLAC é compactado como um arquivo ZIP e o WAV não, por isso o WAV fica com cerca do dobro do tamanho. O ${NAME} salva WAV de 16 bits, a mesma qualidade de um CD.</p>
    <p>Precisa de um arquivo menor? <a href="/flac-to-mp3/">FLAC para MP3</a> (em inglês) em 320 kbps soa muito parecido e ocupa uma fração do tamanho.</p>`,
    faq: [
      ['Converter FLAC para WAV perde qualidade?', 'Não, para um FLAC normal com qualidade de CD. Arquivos FLAC de alta resolução de 24 bits são salvos como WAV de 16 bits.'],
      ['Por que o WAV fica maior?', 'O WAV não tem compressão, então ocupa cerca de 10 MB por minuto.'],
    ],
  },
];
