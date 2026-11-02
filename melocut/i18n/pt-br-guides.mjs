// Brazilian Portuguese guides. `key` links each one to its English guide; `forTool` shows it on that Portuguese tool page.
// Phone menu names follow the Brazilian Portuguese iOS and Samsung (One UI) interfaces.
export default (NAME) => [
  {
    key: 'g-iphone', forTool: 'ringtone', icon: 'bell', path: 'pt-br/guias/toque-iphone', crumb: 'Guides', plain: true,
    title: `Como colocar música de toque no iPhone, sem computador | ${NAME}`,
    description: 'Coloque qualquer música como toque no iPhone sem computador nem iTunes. O jeito do iOS 26 pelo app Arquivos e o GarageBand para iPhones mais antigos. Grátis.',
    h1: 'Como colocar uma música como toque no iPhone',
    lead: 'Sem computador, sem iTunes e sem app pago. No iOS 26 são quatro toques pelo app Arquivos, e nos iPhones mais antigos dá para fazer com o GarageBand.',
    content: `
    <div class="callout"><p>Primeiro crie o toque: escolha o melhor trecho da música. Leva uns 30 segundos.</p><a class="btn sm" href="/pt-br/criar-toque/">Abrir o criador de toques</a></div>
    <h2>Passo 1: crie o toque</h2>
    <ol class="guide-steps">
      <li>Abra o <a href="/pt-br/criar-toque/">criador de toques</a> no Safari e escolha sua música em Arquivos, Fotos ou nos downloads de música.</li>
      <li>Arraste sobre a onda para escolher o trecho que você quer. <strong>Deixe com menos de 30 segundos</strong>: no começo já vêm selecionados 29 segundos.</li>
      <li>Deixe o formato em <strong>M4R</strong> (MP3 também funciona), aperte <strong>Criar toque</strong> e depois <strong>Baixar</strong>. O arquivo fica no app <strong>Arquivos</strong>, em <strong>Downloads</strong>.</li>
    </ol>
    <h2>Passo 2: coloque como toque (iOS 26 ou mais novo)</h2>
    <ol class="guide-steps">
      <li>Abra o app <strong>Arquivos</strong> → <strong>Explorar</strong> → <strong>Downloads</strong> e toque no seu toque para abrir.</li>
      <li>Toque no botão <strong>Compartilhar</strong> (o quadrado com uma seta para cima).</li>
      <li>Toque em <strong>Usar como Toque</strong>. Se não aparecer, role a lista de ações até o fim ou toque em <strong>Mais</strong>.</li>
      <li>Os Ajustes abrem com o novo toque selecionado. Ele também fica em <strong>Ajustes → Sons e Tátil → Toque</strong>.</li>
    </ol>
    <p>Não sabe qual versão você tem? Vá em <strong>Ajustes → Geral → Sobre → Versão do iOS</strong>.</p>
    <h2>Passo 2 em iPhones mais antigos (GarageBand)</h2>
    <ol class="guide-steps">
      <li>Instale o <strong>GarageBand</strong> pela App Store (é grátis e da Apple) e abra. Comece com qualquer instrumento, por exemplo o gravador de áudio.</li>
      <li>Toque no botão da <strong>visualização de faixas</strong>, depois no ícone de <strong>loop</strong> no canto superior direito → <strong>Arquivos</strong> → procure nos itens do app Arquivos e escolha o seu toque.</li>
      <li>Arraste para a faixa e toque na seta <strong>⌄</strong> no canto superior esquerdo → <strong>Minhas Músicas</strong>.</li>
      <li>Pressione e segure a música → <strong>Compartilhar</strong> → <strong>Toque</strong> → <strong>Exportar</strong> e escolha usar como toque padrão.</li>
    </ol>
    <h2>"Usar como Toque" não aparece ou não funciona</h2>
    <ol class="guide-steps">
      <li><strong>O arquivo está longo demais.</strong> O app Arquivos só aceita sons com menos de 30 segundos. Abra de novo no criador de toques e escolha um trecho menor.</li>
      <li><strong>É uma música do Apple Music.</strong> As músicas de uma assinatura do Apple Music são protegidas e não podem ser usadas. Use um arquivo de música que seja seu, ou o som dos seus próprios vídeos.</li>
      <li><strong>O arquivo não terminou de baixar.</strong> Baixe de novo e espere a seta azul na barra de endereço do Safari terminar.</li>
      <li><strong>Ainda não deu?</strong> Feche o app Arquivos por completo e abra de novo, ou use o jeito do GarageBand.</li>
    </ol>
    <h2>Só para uma pessoa</h2>
    <p>Abra <strong>Contatos</strong>, escolha a pessoa, toque em <strong>Editar</strong> → <strong>Toque</strong> e escolha o novo som. Tem um Samsung? Veja <a href="/pt-br/guias/toque-samsung/">como colocar toque no Samsung</a>.</p>`,
    faq: [
      ['Dá para colocar toque no iPhone sem computador?', 'Sim. No iOS 26 ou mais novo, abra o arquivo no app Arquivos e toque em Compartilhar → Usar como Toque. Nas versões anteriores, use o GarageBand.'],
      ['Quanto tempo pode ter um toque de iPhone?', 'Menos de 30 segundos pelo app Arquivos. O GarageBand e o computador aceitam até 40 segundos.'],
      ['Preciso de um arquivo M4R?', 'Pelo app Arquivos não, MP3 também funciona. O M4R só é necessário se você copiar o toque pelo computador.'],
      ['Posso usar uma música do Apple Music?', 'Não. As músicas do Apple Music são protegidas, então o iPhone não aceita como toque. Músicas que você comprou ou tem como arquivo funcionam.'],
      ['É grátis?', `Sim. O criador de toques do ${NAME} é grátis e sem marca d'água, e o app Arquivos e o GarageBand também são grátis.`],
    ],
  },
  {
    key: 'g-samsung', icon: 'bell', path: 'pt-br/guias/toque-samsung', crumb: 'Guides', plain: true,
    title: `Como colocar música de toque no Samsung Galaxy | ${NAME}`,
    description: 'Coloque qualquer música como toque no Samsung Galaxy: crie o toque e depois Configurações → Sons e vibração → Toque → +. Também por contato e com dois chips.',
    h1: 'Como colocar uma música como toque no Samsung',
    lead: 'Qualquer Samsung Galaxy pode usar a sua própria música como toque. Primeiro crie o toque, depois são poucos toques nas Configurações.',
    content: `
    <div class="callout"><p>Primeiro crie o toque. Escolha o melhor trecho de uma música em uns 30 segundos.</p><a class="btn sm" href="/pt-br/criar-toque/">Abrir o criador de toques</a></div>
    <h2>Passo 1: crie o toque</h2>
    <ol class="guide-steps">
      <li>Abra o <a href="/pt-br/criar-toque/">criador de toques</a> no Chrome ou no Samsung Internet e escolha sua música.</li>
      <li>Arraste sobre a onda para escolher o trecho que você quer e escolha <strong>MP3</strong>.</li>
      <li>Aperte <strong>Criar toque</strong> e depois <strong>Baixar</strong>. Ele fica em <strong>Meus Arquivos → Downloads</strong>.</li>
    </ol>
    <h2>Passo 2: coloque como toque</h2>
    <ol class="guide-steps">
      <li>Abra <strong>Configurações</strong> → <strong>Sons e vibração</strong> → <strong>Toque</strong>.</li>
      <li>Se você tem dois chips, escolha <strong>SIM 1</strong> ou <strong>SIM 2</strong>.</li>
      <li>Toque no <strong>+</strong> no canto superior direito da lista.</li>
      <li>Encontre o seu arquivo (em <strong>Downloads</strong> ou em <strong>Áudio</strong>), toque nele e em <strong>Concluído</strong>.</li>
    </ol>
    <h2>Só para um contato</h2>
    <ol class="guide-steps">
      <li>Abra <strong>Contatos</strong> e toque na pessoa.</li>
      <li>Toque em <strong>Editar</strong> e depois em <strong>Ver mais</strong> embaixo.</li>
      <li>Toque em <strong>Toque</strong>, depois em <strong>+</strong>, escolha o arquivo e salve.</li>
    </ol>
    <h2>Como som de notificação</h2>
    <p>Vá em <strong>Configurações → Sons e vibração → Som de notificação</strong> e adicione o arquivo do mesmo jeito. Sons de notificação funcionam melhor curtos, de 1 a 3 segundos. Com o <a href="/pt-br/cortar-audio/">cortar áudio</a> dá para deixar um som bem curtinho.</p>
    <h2>A música não aparece na lista</h2>
    <ol class="guide-steps">
      <li>Confira se o download terminou: abra <strong>Meus Arquivos → Downloads</strong> e toque a música.</li>
      <li>Feche e abra de novo as Configurações, ou reinicie o celular, para ele procurar sons novos.</li>
      <li>Mova o arquivo para a pasta <strong>Ringtones</strong> em Meus Arquivos (Armazenamento interno → Ringtones). Os arquivos dessa pasta sempre aparecem.</li>
    </ol>`,
    faq: [
      ['Quanto tempo pode ter um toque no Samsung?', 'Não tem um limite fixo, mas de 20 a 30 segundos é suficiente. O toque se repete até você atender.'],
      ['Qual formato o Samsung usa?', 'MP3 funciona em todos os Samsung. M4A e OGG também funcionam.'],
      ['Posso ter um toque diferente para cada chip?', 'Sim. Em Toque, escolha SIM 1 ou SIM 2 e configure cada um separadamente.'],
    ],
  },
  {
    key: 'g-whatsapp', forTool: 'converter', icon: 'swap', path: 'pt-br/guias/audio-whatsapp-mp3', crumb: 'Guides', plain: true,
    title: `Como converter áudio do WhatsApp para MP3 | ${NAME}`,
    description: 'Salve um áudio do WhatsApp no iPhone ou Android e converta para MP3 para ouvir em qualquer lugar. Passo a passo, grátis, e o áudio não sai do seu celular.',
    h1: 'Como converter áudio do WhatsApp para MP3',
    lead: 'Os áudios do WhatsApp são arquivos .opus que a maioria dos players não abre. Veja como tirar o áudio da conversa e transformar em MP3.',
    content: `
    <h2>1. Tire o áudio do WhatsApp</h2>
    <h3>iPhone</h3>
    <ol class="guide-steps">
      <li>Abra a conversa e <strong>pressione e segure</strong> o áudio → <strong>Encaminhar</strong>.</li>
      <li>Toque no botão <strong>Compartilhar</strong> no canto inferior direito (não na seta de encaminhar para uma conversa).</li>
      <li>Escolha <strong>Salvar em Arquivos</strong> e salve, por exemplo em Downloads.</li>
    </ol>
    <h3>Android</h3>
    <ol class="guide-steps">
      <li>Pressione e segure o áudio e toque no ícone de <strong>Compartilhar</strong> em cima.</li>
      <li>Escolha <strong>Arquivos</strong>, <strong>Drive</strong> ou outro lugar para salvar.</li>
      <li>Ou encontre todos os seus áudios no app de arquivos, em <em>Android → media → com.whatsapp → WhatsApp → Media → WhatsApp Voice Notes</em>.</li>
    </ol>
    <h2>2. Converta para MP3</h2>
    <ol class="guide-steps">
      <li>Abra o <a href="/pt-br/conversor-de-audio/">conversor de áudio</a> e escolha o áudio.</li>
      <li>Escolha <strong>MP3</strong>, aperte <strong>Converter</strong> e depois <strong>Baixar</strong>. 128 kbps já basta para voz.</li>
    </ol>
    <h2>Deixe mais claro</h2>
    <p>Áudios gravados na rua costumam ter barulho. Abra o MP3 no <a href="/pt-br/remover-ruido/">removedor de ruído com IA</a> para tirar vento e trânsito e igualar o volume. Quer juntar vários áudios em um arquivo só? Use o <a href="/pt-br/juntar-audio/">juntar áudios</a>. Os áudios do Telegram (.ogg) funcionam do mesmo jeito.</p>`,
    faq: [
      ['Por que não consigo ouvir um áudio do WhatsApp no computador?', 'O WhatsApp salva os áudios como arquivos .opus, que muitos players não aceitam. Converter para MP3 resolve.'],
      ['Meu áudio é enviado para algum lugar?', 'Não. A conversão acontece no seu próprio celular ou computador, então o áudio nunca sai do seu aparelho.'],
      ['Dá para juntar vários áudios em um arquivo?', 'Sim. Converta e depois junte com a ferramenta de juntar áudios.'],
    ],
  },
  {
    key: 'g-slowed', forTool: 'slowed', icon: 'slow', path: 'pt-br/guias/slowed-reverb', crumb: 'Guides', plain: true,
    title: `Como fazer música slowed + reverb no celular | ${NAME}`,
    description: 'Faça a sua própria versão slowed + reverb de qualquer música no celular ou no computador: a velocidade, o tom e a reverb que soam bem, passo a passo. Grátis.',
    h1: 'Como fazer música slowed + reverb',
    lead: 'Aquele som lento e sonhador do TikTok e do YouTube se faz em um minuto, de graça, direto no navegador.',
    content: `
    <h2>Passo a passo</h2>
    <ol class="guide-steps">
      <li>Abra o <a href="/pt-br/slowed-reverb/">Slowed + Reverb</a> e escolha uma música do seu celular ou computador.</li>
      <li>Os ajustes clássicos já vêm prontos: velocidade <strong>0,85×</strong> com reverb. Aperte <strong>Ouvir com efeitos</strong>.</li>
      <li>Ajuste do seu jeito (veja os ajustes abaixo) e depois aperte <strong>Converter</strong> e <strong>Baixar</strong> o MP3.</li>
    </ol>
    <h2>Ajustes que soam bem</h2>
    <ol class="guide-steps">
      <li><strong>Velocidade de 0,80 a 0,90×.</strong> Mais lento que 0,80 começa a ficar embolado, e mais rápido que 0,90 quase não se nota.</li>
      <li><strong>Tom de 1 a 3 semitons mais baixo.</strong> Dá aquela voz grave e sonolenta. Deixe em 0 se o cantor ficar escuro demais.</li>
      <li><strong>Reverb de 35 a 55%.</strong> O suficiente para soar como uma sala grande, sem perder as palavras.</li>
      <li><strong>Um pouco mais de grave</strong> (+3 a +6 dB) deixa mais cheio nos fones.</li>
    </ol>
    <h2>Outras versões para testar</h2>
    <ol class="guide-steps">
      <li><strong>Acelerada ou nightcore:</strong> velocidade de 1,15 a 1,30× com o tom mais alto. Use o <a href="/pt-br/nightcore/">criador de nightcore</a>.</li>
      <li><strong>8D:</strong> o som gira em volta da sua cabeça nos fones. Use o <a href="/pt-br/audio-8d/">conversor de áudio 8D</a>.</li>
      <li><strong>Toque slowed:</strong> faça a sua versão lenta e depois abra no <a href="/pt-br/criar-toque/">criador de toques</a>.</li>
    </ol>
    <h2>Para postar</h2>
    <p>TikTok, Instagram e YouTube podem silenciar ou bloquear músicas que você não tem direito de usar, mesmo mais lentas. Para ouvir sozinho não tem problema; para postar, use música sua ou que você tem permissão de usar, ou coloque a música original pela biblioteca de músicas do app. Precisa de um vídeo em vez de áudio? <a href="/pt-br/musica-para-video/">Música para vídeo</a> transforma a sua versão lenta em um MP4 com uma onda sonora animada.</p>`,
    faq: [
      ['Qual é a velocidade do slowed + reverb?', 'Normalmente de 0,80 a 0,90 vez a velocidade original, com o tom de 1 a 3 semitons mais baixo.'],
      ['Dá para fazer no celular?', 'Sim. O Slowed + Reverb funciona no Safari e no Chrome, no iPhone e no Android, sem instalar nada.'],
      ['Tem marca d\'água?', 'Não. O MP3 é seu, sem marca d\'água e sem cadastro.'],
    ],
  },
];
