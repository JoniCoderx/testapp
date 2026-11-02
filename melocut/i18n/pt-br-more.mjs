// More Brazilian Portuguese tool pages ("você"). Each `key` matches an English page in build.mjs KEY_OF,
// and the button names match the Portuguese interface strings in i18n/ui.py.
export default (NAME) => [
  {
    key: 'voice', path: 'pt-br/mudar-voz', tool: 'voice-changer', crumb: 'Tools',
    title: `Modificador de voz grátis: esquilo, robô e voz grossa | ${NAME}`,
    description: 'Mude sua voz grátis: esquilo, voz grave, monstro, robô, alienígena, telefone e eco. Funciona com gravações, áudios do WhatsApp e vídeos. Sem upload.',
    h1: '<em>Modificador de voz</em>: esquilo, robô e voz grossa',
    lead: 'Transforme qualquer gravação, áudio ou vídeo em um esquilo, um monstro, um robô e mais. Ouça primeiro e depois salve.',
    badges: ['7 vozes', 'Ouça antes de salvar', 'Sem upload'],
    steps: [
      ['Abra uma gravação', 'Escolha um áudio, uma gravação ou um vídeo. Ou grave primeiro no seu celular.'],
      ['Escolha uma voz', 'Esquilo já vem selecionado. Toque em Voz grave, Monstro, Robô, Alienígena, Telefone ou Eco e aperte Ouvir com efeitos.'],
      ['Salve', 'Aperte Mudar voz e depois Baixar. Compartilhe ou use como toque.'],
    ],
    content: `
    <h2>As vozes</h2>
    <ol class="guide-steps">
      <li><strong>Esquilo:</strong> aguda e fininha, sem acelerar o áudio.</li>
      <li><strong>Voz grave:</strong> mais grossa e cheia, como a de um trailer de filme.</li>
      <li><strong>Monstro:</strong> bem grave e com um eco sombrio.</li>
      <li><strong>Robô:</strong> uma voz reta e metálica.</li>
      <li><strong>Alienígena:</strong> um pouco mais aguda, com uma vibração estranha.</li>
      <li><strong>Telefone:</strong> fina e estreita, como uma ligação antiga ou um rádio comunicador.</li>
      <li><strong>Eco:</strong> como se você estivesse num salão enorme ou numa caverna.</li>
    </ol>
    <p>Em Efeitos dá para ajustar cada uma: mexa no Tom para uma voz mais aguda ou mais grave, coloque Reverb para mais espaço, ou ative Remover ruído com IA se a gravação tiver barulho.</p>
    <h2>Ideias</h2>
    <p>Pegadinhas em áudios do WhatsApp, toques engraçados (abra o resultado no <a href="/pt-br/criar-toque/">criador de toques</a>), narrações para o TikTok ou esconder sua voz real em um vídeo. Use só gravações que você tem permissão para usar e não use para se passar por outra pessoa.</p>`,
    faq: [
      ['O modificador de voz é grátis?', 'Sim. Grátis, sem cadastro, sem marca d\'água, e sua gravação nunca é enviada para nenhum servidor.'],
      ['Posso mudar a voz de um vídeo?', 'Sim. Abra o vídeo e o MeloCut usa o som dele. O resultado é um arquivo de áudio (MP3, M4A, WAV, OGG ou FLAC).'],
      ['Dá para gravar direto no site?', 'Ainda não. Grave com o gravador de voz do celular e depois abra o arquivo aqui.'],
      ['Como faço voz de esquilo?', 'Abra sua gravação aqui: Esquilo já vem selecionado. Aperte Ouvir com efeitos, depois Mudar voz e Baixar.'],
    ],
  },
  {
    key: 'a2v', path: 'pt-br/musica-para-video', tool: 'audio-to-video', crumb: 'Tools',
    title: `MP3 para MP4: música em vídeo para TikTok grátis | ${NAME}`,
    description: 'Transforme uma música, áudio ou gravação em um vídeo vertical MP4 com onda sonora animada, título e sua capa. Feito no celular, grátis e sem upload.',
    h1: '<em>Música para vídeo</em>: MP3 para MP4 para TikTok e Reels',
    lead: 'Transforme qualquer música ou gravação em um vídeo vertical com uma onda sonora que se mexe, um título e uma capa. Pronto para TikTok, Reels, Shorts e status do WhatsApp.',
    badges: ['Vertical 9:16', 'Onda sonora animada', 'Sem upload'],
    steps: [
      ['Abra uma música', 'Escolha um MP3, um áudio ou qualquer gravação. Os primeiros 30 segundos já vêm selecionados; arraste para escolher outro trecho, de até 60 segundos.'],
      ['Coloque título e estilo', 'O título vem do nome do arquivo; mude se quiser. Escolha um estilo de fundo ou adicione uma imagem de capa.'],
      ['Crie o vídeo', 'Aperte Criar vídeo e depois Baixar. Poste o MP4 onde quiser.'],
    ],
    content: `
    <h2>Como fica o vídeo</h2>
    <p>Um MP4 vertical de 720×1280 (9:16), com sua capa ou um emblema de onda sonora, o título, uma onda branca que se mexe com o áudio e uma barra de progresso. Embaixo aparece uma pequena marca melocut.com.</p>
    <h2>Ideias</h2>
    <ol class="guide-steps">
      <li><strong>Postar uma música no Instagram ou TikTok</strong> quando o app não deixa publicar só o áudio.</li>
      <li><strong>Um vídeo slowed + reverb:</strong> abra Efeitos, toque em Slowed + Reverb e o vídeo fica com a versão lenta. Nightcore e Áudio 8D também funcionam.</li>
      <li><strong>Cortes de podcast ou áudios:</strong> ative Remover ruído com IA para uma voz limpa e poste os melhores 60 segundos.</li>
      <li><strong>Status do WhatsApp:</strong> uma música com a sua própria foto como capa.</li>
    </ol>
    <h2>Por que só até 60 segundos?</h2>
    <p>O vídeo é criado no seu próprio aparelho, então nada é enviado. Criar vídeo dá muito mais trabalho que áudio, por isso os clipes vão até 60 segundos, que é o que os apps de vídeo curto pedem. No celular demora um pouco mais que no computador.</p>
    <p>Use só músicas que você tem direito de compartilhar. Apps como TikTok e Instagram podem silenciar vídeos com músicas protegidas.</p>`,
    faq: [
      ['Como converto MP3 para MP4?', 'Abra o MP3 aqui, coloque um título e um estilo ou uma capa, e aperte Criar vídeo. Você recebe um MP4 com uma onda sonora animada.'],
      ['Posso colocar minha própria foto?', 'Sim. Escolha uma imagem de capa: ela aparece no meio e, desfocada, no fundo.'],
      ['Tem marca d\'água?', 'Tem uma pequena marca melocut.com embaixo do vídeo. É assim que a ferramenta continua grátis.'],
      ['Funciona no iPhone?', 'Sim, no Safari. Criar o vídeo leva um tempo porque é feito no seu aparelho: no computador, mais ou menos a duração do clipe, e mais no celular. Deixe a página aberta até terminar.'],
    ],
  },
  {
    key: 'slowed', path: 'pt-br/slowed-reverb', tool: 'slowed-reverb', crumb: 'Tools',
    title: `Slowed + Reverb online: música lenta com reverb grátis | ${NAME}`,
    description: 'Faça a versão slowed + reverb de qualquer música. Ajuste velocidade, tom e reverb, ouça primeiro e baixe um MP3. Grátis e sem marca d\'água.',
    h1: 'Fazer música <em>slowed + reverb</em>',
    lead: 'Crie a versão lenta e com reverb de qualquer música. Os ajustes já vêm prontos e você pode mudar a velocidade, o tom e a reverb.',
    badges: ['Velocidade e tom', 'Reverb', 'Nightcore também'],
    steps: [
      ['Abra uma música', 'Escolha qualquer música do seu aparelho.'],
      ['Ajuste', 'A velocidade 0,85× e a reverb já vêm prontas. Mude e aperte Ouvir com efeitos.'],
      ['Baixe', 'Aperte Converter e salve como MP3.'],
    ],
    content: `
    <h2>Bons ajustes para começar</h2>
    <p>A maioria das versões slowed + reverb usa velocidade de <strong>0,80 a 0,90×</strong>, tom <strong>1 a 3 semitons mais baixo</strong> e reverb em torno de <strong>35 a 55%</strong>. Para uma versão acelerada, toque no ajuste rápido <em>Nightcore</em> ou use o <a href="/pt-br/nightcore/">criador de nightcore</a>.</p>
    <h3>Para soar melhor</h3>
    <ul>
      <li>Se a voz ficar grossa demais, suba o Tom em um semitom.</li>
      <li>Ative <strong>Volume automático</strong> para não ficar mais baixo que o original.</li>
      <li>Quer postar no TikTok ou no Reels? Transforme em vídeo com <a href="/pt-br/musica-para-video/">música para vídeo</a>: abra Efeitos e toque em Slowed + Reverb.</li>
    </ul>`,
    faq: [
      ['Como faço uma música slowed + reverb?', 'Abra a música aqui. O efeito já está pronto: aperte Ouvir com efeitos, mude o que quiser e depois Converter e Baixar.'],
      ['Posso fazer uma versão acelerada?', 'Sim. Toque no ajuste rápido Nightcore ou aumente a velocidade e o tom.'],
      ['É grátis?', 'Sim. Sem cadastro, sem marca d\'água, e a música não é enviada para nenhum servidor.'],
    ],
  },
  {
    key: 'karaoke', path: 'pt-br/remover-voz', tool: 'karaoke', crumb: 'Tools',
    title: `Remover voz de música: fazer karaokê grátis | ${NAME}`,
    description: 'Tire a voz das músicas para fazer faixas de karaokê e instrumentais. Grátis, privado e rápido. Nada é enviado.',
    h1: '<em>Remover a voz</em> de uma música para karaokê',
    lead: 'Tire o cantor de uma música estéreo para ter uma versão karaokê. Ele remove o que está no centro da mixagem, então não é separação por IA: o baixo e a bateria também ficam um pouco mais baixos.',
    badges: ['Karaokê', 'Músicas estéreo', 'Ouça antes de salvar'],
    steps: [
      ['Abra uma música', 'Escolha uma música estéreo do seu aparelho.'],
      ['Ouça primeiro', 'Remover voz já vem ativado. Aperte Ouvir com efeitos.'],
      ['Baixe', 'Aperte Converter e salve sua faixa de karaokê.'],
    ],
    content: `
    <h2>Como funciona</h2>
    <p>Na maioria das músicas de estúdio a voz principal fica no centro da mixagem estéreo, enquanto os instrumentos ficam espalhados à esquerda e à direita. O removedor de voz cancela o que está no centro e mantém o resto.</p>
    <h3>O que ele não consegue</h3>
    <p>O baixo e a bateria também costumam ficar no centro, então ficam mais baixos. A reverb da voz pode continuar ao fundo. Gravações ao vivo e arquivos mono não funcionam, e o ${NAME} avisa se um arquivo for mono. Aumentar os <strong>Graves</strong> em Efeitos traz de volta parte do grave.</p>`,
    faq: [
      ['Funciona com todas as músicas?', 'Funciona melhor com músicas de estúdio com a voz no centro. Gravações mono não podem ser separadas assim.'],
      ['Por que o baixo ficou mais baixo?', 'O baixo também costuma ficar no centro da mixagem. Aumente os Graves para recuperar.'],
    ],
  },
  {
    key: '8d', path: 'pt-br/audio-8d', tool: '8d', crumb: 'Tools',
    title: `Conversor de áudio 8D online: músicas 8D grátis | ${NAME}`,
    description: 'Transforme qualquer música em áudio 8D que gira em volta da sua cabeça. Ouça com fones e baixe um MP3. Grátis e sem upload.',
    h1: 'Conversor de <em>áudio 8D</em>',
    lead: 'Faça a música girar em volta da sua cabeça. Coloque os fones, ouça e baixe.',
    badges: ['Use fones', 'Reverb ajustável', 'MP3 ou WAV'],
    steps: [
      ['Abra uma música', 'Escolha qualquer música do seu aparelho.'],
      ['Coloque os fones', 'Aperte Ouvir com efeitos para ouvir o som girar.'],
      ['Baixe', 'Aperte Converter e salve sua versão 8D.'],
    ],
    content: `
    <h2>O que é áudio 8D?</h2>
    <p>O áudio 8D move o som devagar de um ouvido para o outro e coloca um pouco de reverb, então a música parece girar em volta de você. Você precisa de fones de ouvido para perceber.</p>
    <h3>Ideias</h3>
    <p>Combine com uma versão lenta (Slowed + Reverb) para um efeito ainda mais envolvente, ou transforme em vídeo com <a href="/pt-br/musica-para-video/">música para vídeo</a> para postar no TikTok.</p>`,
    faq: [
      ['Por que não ouço o efeito 8D?', 'Você precisa de fones de ouvido. Em uma caixa de som só, o efeito desaparece.'],
      ['É grátis?', 'Sim, totalmente grátis, sem cadastro e sem marca d\'água.'],
    ],
  },
  {
    key: 'bass', path: 'pt-br/aumentar-grave', tool: 'bass', crumb: 'Tools',
    title: `Aumentar grave de música e MP3 online grátis | ${NAME}`,
    description: 'Aumente o grave de qualquer música online. Escolha quanto, ouça primeiro e baixe. Um limitador evita distorção. Grátis e sem upload.',
    h1: '<em>Aumentar o grave</em> de uma música',
    lead: 'Deixe qualquer música com um grave mais profundo e com mais pegada. Escolha quanto, ouça e baixe.',
    badges: ['Até +15 dB', 'Sem distorção', 'Ouça antes de salvar'],
    steps: [
      ['Abra uma música', 'Escolha qualquer música ou vídeo.'],
      ['Escolha quanto', 'O controle de Graves começa em +10 dB. Mude e aperte Ouvir com efeitos.'],
      ['Baixe', 'Aperte Converter e salve.'],
    ],
    content: `
    <h2>Mais grave sem estourar</h2>
    <p>O ${NAME} aumenta as frequências baixas, em torno de 110 Hz, e depois equilibra o volume com um limitador, então o grave bate mais forte sem distorcer. Na caixinha do celular, de +6 a +10 dB costuma soar melhor.</p>
    <h3>Para o carro e o paredão</h3>
    <p>Com fones ou no som do carro dá para ir mais longe: +12 a +15 dB deixa o grave bem pesado. Ative <strong>Volume automático</strong> para a música não ficar baixa depois do reforço.</p>`,
    faq: [['Quanto devo aumentar o grave?', 'Comece com +8 a +10 dB. Acima de +12 dB fica bem pesado e combina mais com fones ou com o som do carro.']],
  },
  {
    key: 'nightcore', path: 'pt-br/nightcore', tool: 'converter', crumb: 'Tools', fx: { speed: 1.2, pitch: 3 }, suffix: ' (nightcore)',
    note: 'O nightcore já está pronto: velocidade 1,20× e 3 semitons mais agudo. Aperte Tocar com efeitos para ouvir.',
    title: `Nightcore online: deixar música acelerada grátis | ${NAME}`,
    description: 'Transforme qualquer música em nightcore ou versão acelerada: mais rápida e mais aguda. Ajuste velocidade e tom, ouça primeiro e baixe um MP3. Grátis.',
    h1: 'Criar <em>nightcore</em> e músicas aceleradas',
    lead: 'Faça a versão rápida, aguda e cheia de energia de qualquer música. Os ajustes já vêm prontos e você pode refinar.',
    badges: ['Velocidade e tom', 'Ouça antes de salvar', 'MP3 ou WAV'],
    steps: [
      ['Abra uma música', 'Escolha qualquer música do seu aparelho.'],
      ['Ajuste', '1,20× e +3 semitons já vêm prontos. Aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e salve como MP3.'],
    ],
    content: `
    <h2>O som nightcore</h2>
    <p>As versões nightcore tocam a música de <strong>15 a 30% mais rápido</strong> e sobem o tom em <strong>2 a 4 semitons</strong>, o que dá aquele som brilhante e animado. As versões aceleradas (sped up) do TikTok e do Instagram usam a mesma ideia, geralmente um pouco mais leve.</p>
    <h3>Bons ajustes para começar</h3>
    <ul>
      <li><strong>Nightcore clássico:</strong> 1,25× de velocidade e +4 semitons.</li>
      <li><strong>Sped up (estilo TikTok):</strong> 1,15× e +2 semitons.</li>
      <li><strong>Leve:</strong> 1,10× e +1 semitom, para baladas lentas.</li>
    </ul>
    <p>Coloque um pouco de <strong>Graves</strong> para não ficar fino, ou faça o contrário com <a href="/pt-br/slowed-reverb/">Slowed + Reverb</a>.</p>`,
    faq: [
      ['Qual a diferença entre nightcore e sped up?', 'Os dois são mais rápidos e agudos. O nightcore costuma ser mais extremo. Baixe a velocidade para uns 1,1× para uma versão acelerada mais leve.'],
      ['Posso manter o tom original?', 'Sim. Coloque o Tom em 0 e só a velocidade muda.'],
    ],
  },
  {
    key: 'denoise', path: 'pt-br/remover-ruido', tool: 'denoise', crumb: 'Tools',
    title: `Remover ruído de fundo de áudio com IA grátis | ${NAME}`,
    description: 'Tire o ruído de fundo de gravações de voz, áudios do WhatsApp e vídeos com IA. Funciona no seu aparelho, nada é enviado. Grátis.',
    h1: 'Remover ruído de fundo <em>com IA</em>',
    lead: 'Tire vento, trânsito, ventilador e chiado de gravações de voz. Uma pequena rede neural faz o trabalho no seu próprio aparelho.',
    badges: ['Rede neural (RNNoise)', 'Áudios e podcasts', 'Sem upload'],
    steps: [
      ['Abra sua gravação', 'Um áudio, uma entrevista, uma aula ou um vídeo.'],
      ['Ouça a versão limpa', 'Remover ruído com IA já vem ativado. Aperte Ouvir com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Como funciona a parte de IA</h2>
    <p>O ${NAME} usa o <strong>RNNoise</strong>, uma rede neural treinada para separar a voz do ruído de fundo. O modelo tem cerca de 300 KB e roda no seu navegador, então gravações particulares nunca saem do seu celular ou computador.</p>
    <p>No nosso próprio teste, com uma voz gravada ao lado de um ventilador ligado, o ruído nas pausas entre as palavras caiu cerca de 18 dB, o que soa mais ou menos três vezes mais baixo, enquanto a voz manteve o volume. O resultado depende da gravação, então aperte Ouvir com efeitos e confira.</p>
    <h3>Para o melhor resultado</h3>
    <p>Foi feito para voz: podcasts, entrevistas, áudios e ligações. Em música ele pode tirar instrumentos também, então para músicas use <strong>Reduzir chiado</strong>. Aqui também vêm ativados <strong>Volume automático</strong> e <strong>Remover silêncios</strong>, para um resultado mais limpo.</p>`,
    faq: [
      ['É IA de verdade?', 'Sim. Usa o RNNoise, uma rede neural para limpar a voz. O modelo é baixado na primeira vez e depois roda no seu aparelho.'],
      ['Funciona com música?', 'Foi feito para vozes. Em músicas pode tirar instrumentos, então para música use Reduzir chiado.'],
      ['Minha gravação é enviada?', 'Não. Tudo roda no seu navegador.'],
    ],
  },
  {
    key: 'joiner', path: 'pt-br/juntar-audio', tool: 'joiner', crumb: 'Tools',
    title: `Juntar áudios e músicas MP3 online grátis | ${NAME}`,
    description: 'Junte MP3, M4A, WAV e outros áudios em um só arquivo. Mude a ordem, ouça, coloque transição e iguale o volume. Grátis e privado.',
    h1: '<em>Juntar áudios</em> em um só arquivo',
    lead: 'Junte várias músicas, áudios ou trechos em um só arquivo. Ouça cada um, mude a ordem e coloque uma transição.',
    badges: ['2 ou mais arquivos', 'Transição', 'Volume igualado'],
    steps: [
      ['Adicione seus arquivos', 'Escolha dois ou mais arquivos de áudio ou vídeo. Dá para adicionar mais depois.'],
      ['Coloque em ordem', 'Toque em ▶ para ouvir, use as setas para reordenar e ajuste a transição ou desligue.'],
      ['Junte, ouça e baixe', 'Aperte Juntar arquivos, ouça o resultado e depois Baixar.'],
    ],
    content: `
    <h2>Mixagens, medleys e gravações longas</h2>
    <p>Monte uma seleção para uma festa, junte vários áudios do WhatsApp em uma mensagem só ou una de novo as partes de uma gravação. A <strong>Transição</strong> mistura cada faixa com a próxima, e <strong>Igualar volume</strong> evita que os arquivos baixos fiquem muito mais fracos que os altos.</p>
    <h3>Formatos diferentes, sem problema</h3>
    <p>Dá para misturar MP3, M4A, WAV, OGG, OPUS e vídeos de uma vez. O ${NAME} converte todos para o mesmo formato primeiro.</p>`,
    faq: [
      ['Quantos arquivos posso juntar?', 'Dois ou mais. Não tem um número fixo: quanto você consegue juntar depende do seu aparelho e do navegador.'],
      ['Posso juntar sem pausa entre eles?', 'Sim. Desligue a transição e eles tocam um logo depois do outro.'],
      ['Posso juntar vídeos?', 'Sim. O MeloCut pega o som de cada vídeo e junta o áudio.'],
    ],
  },
  {
    key: 'volume', path: 'pt-br/aumentar-volume', tool: 'volume', crumb: 'Tools',
    title: `Aumentar volume de áudio e MP3 online grátis | ${NAME}`,
    description: 'Deixe MP3, áudios do WhatsApp e vídeos baixos mais altos. O volume automático equilibra o som sem distorção. Grátis e sem upload.',
    h1: '<em>Aumentar o volume</em> de um áudio',
    lead: 'Deixe gravações baixas mais altas e com volume por igual, sem distorção.',
    badges: ['Até 300%', 'Volume automático', 'Sem distorção'],
    steps: [
      ['Abra seu arquivo', 'Uma música baixa, um áudio, uma aula ou um vídeo.'],
      ['Escolha quanto aumentar', 'Volume automático já vem ativado. Mude o controle de Volume e aperte Ouvir com efeitos.'],
      ['Baixe', 'Aperte Converter e salve.'],
    ],
    content: `
    <h2>Mais alto, mas limpo</h2>
    <p>O <strong>Volume automático</strong> mede o arquivo inteiro e deixa o volume parecido com o do Spotify e do YouTube, então gravações baixas ficam claras. Um limitador evita que os momentos mais altos estourem.</p>
    <h3>Para que serve?</h3>
    <p>Áudios do WhatsApp que quase não dá para ouvir, aulas gravadas de longe, vídeos com o som baixo ou músicas antigas que ficam fracas perto das novas.</p>`,
    faq: [['Aumentar o volume causa distorção?', 'Não. Um limitador controla os picos, então o resultado fica mais alto sem estourar.']],
  },
];
