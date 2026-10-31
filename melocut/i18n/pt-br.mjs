// Brazilian Portuguese ("você") pages and site text. Pages with the same `key` as an English page
// are linked to it with hreflang and the language switcher.
export default (NAME) => ({
  ui: {
    code: 'pt-BR', hreflang: 'pt-BR', ogLocale: 'pt_BR', prefix: '/pt-br', name: 'Português', short: 'PT',
    home: 'Início', tools: 'Ferramentas', allTools: 'Todas as ferramentas', navAll: 'Todas', popular: 'As mais usadas', installApp: 'Instalar app', menu: 'Menu',
    howItWorks: 'Como funciona', faq: 'Perguntas frequentes', moreTools: 'Mais ferramentas grátis',
    noscript: 'Ative o JavaScript para usar esta ferramenta.', language: 'Idioma', homeAria: `Início do ${NAME}`,
    footerTagline: 'Ferramentas de áudio grátis que funcionam no seu navegador',
    fTools: 'Ferramentas', fHelp: 'Ajuda e informações', fGuides: 'Guias (em inglês)', fInstall: 'Instalar o app',
    fAbout: 'Sobre e contato', fPrivacy: 'Privacidade', fTerms: 'Termos', inEnglish: 'em inglês', newTag: 'Novo',
    ogAlt: (h1) => `${h1} no ${NAME}`, tag: 'Grátis · Privado · Sem upload',
    install: 'Você pode adicionar o MeloCut à tela inicial do celular e abrir como um app. Use uma ferramenta uma vez com internet e depois ela continua funcionando offline.',
    installHow: 'Como instalar (em inglês)',
    whyTitle: `Por que usar o ${NAME}`,
    why: [
      ['lock', 'Seus arquivos ficam com você', 'Tudo acontece no seu navegador. Nada é enviado, então ninguém mais vê seus arquivos.'],
      ['bolt', 'Sem espera', 'Não há upload nem fila de download. Uma música costuma levar poucos segundos. Vídeos longos levam um pouco mais.'],
      ['phone', 'Celular ou computador', 'Funciona no Safari, Chrome, Edge e Firefox. Você também pode instalar na tela inicial.'],
      ['sparkle', 'Grátis e sem marca d\'água', 'Sem conta e sem nada adicionado ao seu áudio. Use quantas vezes quiser.'],
    ],
  },
  tools: {
    'video-to-mp3': { title: 'Vídeo para MP3', path: 'pt-br/video-para-mp3', blurb: 'Tire o som de um vídeo MP4, MOV ou WebM.' },
    'ringtone-maker': { title: 'Criar toque', path: 'pt-br/criar-toque', blurb: 'Transforme um trecho de música em toque para iPhone ou Android.' },
    'audio-cutter': { title: 'Cortar áudio', path: 'pt-br/cortar-audio', blurb: 'Corte uma música ou tire um trecho do meio.' },
    'audio-converter': { title: 'Conversor de áudio', path: 'pt-br/conversor-de-audio', blurb: 'Converta entre MP3, WAV, M4A, OGG e FLAC.' },
    'audio-joiner': { title: 'Juntar áudios', blurb: 'Junte várias músicas ou áudios em um só arquivo.' },
    'noise-remover': { title: 'Remover ruído com IA', blurb: 'Limpe o ruído de fundo de gravações de voz.' },
    'slowed-reverb': { title: 'Slowed + Reverb', blurb: 'Faça uma versão lenta de uma música com reverb.' },
    'vocal-remover': { title: 'Remover voz', blurb: 'Tire o cantor para ter uma faixa de karaokê.' },
    '8d-audio': { title: 'Áudio 8D', blurb: 'Som que passa de um ouvido para o outro. Use fones.' },
    'bass-booster': { title: 'Aumentar grave', blurb: 'Coloque mais grave em qualquer música.' },
    'volume-booster': { title: 'Aumentar volume', blurb: 'Deixe gravações baixas mais altas.' },
    'reverse-audio': { title: 'Áudio ao contrário', blurb: 'Toque qualquer som ao contrário.' },
    'speed-up-audio': { title: 'Acelerar áudio', blurb: 'Deixe uma música ou áudio mais rápido, com o mesmo tom.' },
    'slow-down-audio': { title: 'Desacelerar áudio', blurb: 'Toque tudo mais devagar sem voz grossa.' },
    'pitch-changer': { title: 'Mudar o tom', blurb: 'Mude o tom de uma música sem mudar a velocidade.' },
    'nightcore-maker': { title: 'Criar nightcore', blurb: 'Mais rápido e mais agudo, o som nightcore clássico.' },
    'remove-silence': { title: 'Remover silêncios', blurb: 'Corte as pausas longas de uma gravação.' },
    'fade-in-fade-out': { title: 'Fade in e fade out', blurb: 'Coloque um começo e um fim suaves em qualquer música.' },
  },
  pages: [
    {
      key: 'home', path: 'pt-br',
      title: `Cortar música, criar toque e converter para MP3 grátis | ${NAME}`,
      description: 'Corte músicas, crie toques para iPhone e Android, adicione efeitos e converta vídeos para MP3. Grátis, e seus arquivos nunca saem do seu aparelho.',
      h1: 'Corte músicas, crie toques e adicione efeitos, <em>no seu navegador</em>',
      lead: 'Ferramentas de áudio grátis para celular e computador. Seus arquivos nunca são enviados. Escolha uma ferramenta para começar.',
      badges: ['18 ferramentas grátis', 'Remove ruído com IA', 'Sem upload', 'Sem cadastro'],
      home: true,
      body: (L) => `
  <div class="section prose">
    <h2>Efeitos em todas as ferramentas</h2>
    <p>Cada ferramenta tem um painel de <strong>Efeitos e filtros</strong>. Você pode colocar entrada e saída suaves, volume, velocidade, tom, graves, agudos e reverb, ou ativar áudio 8D, remover ruído com IA, remover voz e mais. Os ajustes prontos como <em>Slowed + Reverb</em>, <em>Nightcore</em> e <em>Grave turbinado</em> configuram tudo com um toque.</p>
    <p>Uma segunda onda mostra o que seus efeitos fazem enquanto você mexe nos controles, e <strong>Ouvir com efeitos</strong> toca o resultado antes de salvar.</p>
  </div>
  ${L.WHY}
  ${L.INSTALL}
  <div class="section prose">
    <h2>Como funciona</h2>
    <p>A maioria dos sites de conversão faz você enviar o arquivo, esperar e baixar de novo. O ${NAME} usa o FFmpeg, o motor de áudio de muitos programas de computador, direto no seu navegador. Suas músicas, áudios e vídeos ficam no seu aparelho o tempo todo. Não há pop-ups nem botões de download falsos. O site é grátis porque mostra alguns anúncios, sempre identificados.</p>
  </div>`,
      faq: [
        ['O MeloCut é grátis?', 'Sim. Todas as ferramentas são grátis e mantidas por alguns anúncios identificados. Não precisa de cadastro e não há marca d\'água.'],
        ['Meus arquivos são enviados para algum lugar?', 'Não. Todo o processamento acontece no seu navegador, no seu próprio aparelho.'],
        ['Funciona no iPhone e no Android?', 'Sim. Funciona no Safari, Chrome, Firefox e Edge, em celulares, tablets e computadores.'],
        ['Quais tipos de arquivo posso abrir?', 'MP3, MP4, MOV, M4A, WAV, OGG, OPUS, FLAC, WebM, AAC, AMR, 3GP e a maioria dos formatos de áudio e vídeo.'],
        ['Posso instalar o MeloCut como app?', 'Sim. Adicione à tela inicial pelo Safari ou Chrome. Ele abre em tela cheia, e as ferramentas que você já usou continuam funcionando offline.'],
        ['O MeloCut usa IA?', 'A ferramenta de remover ruído usa o RNNoise, uma pequena rede neural que separa a voz do ruído de fundo. Ela roda no seu aparelho. Os outros efeitos são processamento de áudio comum.'],
      ],
    },
    {
      key: 'cutter', path: 'pt-br/cortar-audio', tool: 'cutter', crumb: 'Tools',
      title: `Cortar áudio online: cortar MP3 e músicas grátis | ${NAME}`,
      description: 'Corte MP3 e outros áudios online. Mantenha um trecho ou remova uma parte, adicione fades e salve em MP3, M4A, WAV, OGG ou FLAC. Grátis e privado.',
      h1: '<em>Cortar áudio</em>: corte MP3 e músicas',
      lead: 'Corte o começo e o fim de uma música, ou tire um trecho do meio. Adicione fades e salve no formato que você precisa.',
      badges: ['Manter ou remover um trecho', 'Entrada e saída suaves', 'MP3, M4A, WAV, OGG, FLAC'],
      steps: [
        ['Abra seu áudio', 'Escolha um MP3, WAV, M4A ou qualquer arquivo de áudio ou vídeo.'],
        ['Selecione o trecho', 'Arraste os marcadores na onda, ou digite os tempos exatos de início e fim.'],
        ['Mantenha ou remova', 'Escolha Manter seleção ou Remover seleção, depois Cortar e salvar, e Baixar.'],
      ],
      content: `
    <h2>Corte exatamente onde quiser</h2>
    <p>A onda mostra onde a música fica alta ou baixa. Arraste os marcadores até o ponto certo e toque em Tocar para ouvir antes de salvar. Para cortes precisos, digite os tempos, por exemplo <code>1:23.5</code>.</p>
    <h3>Tirar algo do meio</h3>
    <p>Mude para <strong>Remover seleção</strong> para tirar uma introdução, uma pausa longa, um erro ou um anúncio. As duas partes que sobram são juntadas automaticamente.</p>
    <h3>Evite perder mais qualidade</h3>
    <p>Escolha <strong>WAV</strong> ou <strong>FLAC</strong> se for editar o arquivo de novo: nenhum dos dois adiciona perda por compressão. O WAV é salvo em 16 bits, a mesma qualidade de um CD.</p>`,
      faq: [
        ['Como corto um MP3?', 'Abra o MP3, arraste os marcadores até o trecho que você quer, escolha Manter seleção e toque em Cortar e salvar e depois em Baixar.'],
        ['Posso tirar um trecho do meio?', 'Sim. Selecione o trecho que você não quer e escolha Remover seleção.'],
        ['Cortar diminui a qualidade?', 'Escolha MP3 em 320 kbps para ficar bem parecido com o original, ou WAV ou FLAC para não adicionar perda por compressão.'],
        ['Funciona offline?', 'Sim, depois de usar uma ferramenta uma vez com internet. O motor de áudio fica salvo no seu aparelho.'],
      ],
    },
    {
      key: 'video', path: 'pt-br/video-para-mp3', tool: 'video-to-mp3', crumb: 'Tools',
      title: `Converter vídeo para MP3 grátis e online | ${NAME}`,
      description: 'Converta vídeos MP4, MOV, WebM e outros para MP3 no seu navegador. Até 320 kbps, sem upload e sem cadastro. Funciona no iPhone e no Android.',
      h1: 'Converter <em>vídeo para MP3</em>',
      lead: 'Tire o som de qualquer vídeo e salve como MP3, M4A ou WAV. Funciona no seu aparelho, então até vídeos grandes são rápidos.',
      badges: ['Até 320 kbps', 'MP4, MOV, WebM, MKV', 'Sem upload'],
      steps: [
        ['Escolha seu vídeo', 'Toque na caixa acima e escolha um vídeo, ou arraste para ela.'],
        ['Corte se quiser', 'Fique com todo o áudio, ou arraste na onda para manter só um trecho.'],
        ['Converta e baixe', 'Escolha MP3 e uma qualidade, toque em Converter e depois em Baixar.'],
      ],
      content: `
    <h2>Tire o áudio de um vídeo</h2>
    <p>Gravou um show, uma aula ou algo engraçado e só precisa do som? Abra o vídeo aqui e salve o áudio como MP3 para ouvir no carro, num app de música ou onde quiser.</p>
    <h3>Quais vídeos funcionam?</h3>
    <p>MP4, MOV (o formato em que o iPhone grava), WebM, MKV, AVI e 3GP. Se o seu navegador consegue abrir o arquivo, quase sempre funciona.</p>
    <h3>Qual qualidade escolher?</h3>
    <p>Use <strong>320 kbps</strong> para música. <strong>128 kbps</strong> é suficiente para voz e gera arquivos bem menores. Escolha <strong>WAV</strong> se quiser editar o áudio depois.</p>
    <h3>Vídeos grandes</h3>
    <p>Os limites de tamanho dependem do seu aparelho e navegador. O computador aguenta arquivos bem maiores que o celular, e o MeloCut não aceita arquivos com mais de 1 GB. Para vídeos longos, corte primeiro ou use um computador.</p>`,
      faq: [
        ['Como converto MP4 para MP3?', 'Abra o MP4 acima, escolha MP3 e uma qualidade, toque em Converter e depois em Baixar. Leva poucos segundos.'],
        ['Posso converter vídeos do iPhone?', 'Sim. Escolha o vídeo em Fotos ou Arquivos e ele é convertido como qualquer outro.'],
        ['Existe limite de tamanho?', 'Os limites de tamanho dependem do seu aparelho e navegador. O computador aguenta arquivos bem maiores que o celular, e o MeloCut não aceita arquivos com mais de 1 GB. Para vídeos longos, corte primeiro ou use um computador.'],
        ['Posso converter vídeos do YouTube?', 'O MeloCut trabalha com arquivos do seu aparelho. Ele não baixa vídeos do YouTube nem de outros sites.'],
      ],
    },
    {
      key: 'ringtone', path: 'pt-br/criar-toque', tool: 'ringtone', crumb: 'Tools',
      title: `Criar toque de celular para iPhone e Android grátis | ${NAME}`,
      description: 'Crie um toque de celular com qualquer música. Escolha a melhor parte, adicione um fade e salve em M4R para iPhone ou MP3 para Android. Grátis, sem app.',
      h1: '<em>Criar toque</em> para iPhone e Android',
      lead: 'Escolha o trecho favorito de uma música e salve como toque para iPhone (M4R) ou Android (MP3).',
      badges: ['M4R para iPhone', 'MP3 para Android', 'Entrada e saída suaves'],
      steps: [
        ['Escolha uma música', 'Abra qualquer música ou vídeo do seu aparelho.'],
        ['Escolha o trecho que você gosta', 'Arraste na onda para selecionar até 40 segundos. Toque em Tocar para conferir.'],
        ['Baixe o toque', 'Escolha M4R para iPhone ou MP3 para Android, depois Criar toque e Baixar.'],
      ],
      content: `
    <h2>Colocar o toque no celular</h2>
    <h3>iPhone</h3>
    <p>Com computador: baixe o arquivo <strong>M4R</strong>, conecte o iPhone e arraste o arquivo para ele no Finder (Mac) ou no iTunes (Windows). Depois ele aparece em <em>Ajustes → Sons e Tátil → Toque</em>. Sem computador: abra o arquivo no <strong>GarageBand</strong> no iPhone e use <em>Compartilhar → Toque</em>.</p>
    <h3>Android</h3>
    <p>Baixe o <strong>MP3</strong>, vá em <em>Configurações → Som → Toque do telefone</em> e escolha o arquivo. Em alguns celulares é preciso tocar em "+" ou "Adicionar toque" antes.</p>
    <h3>Algumas dicas</h3>
    <p>Comece logo antes do refrão, deixe o toque entre 20 e 30 segundos e mantenha os fades para ele não começar nem terminar de repente.</p>`,
      faq: [
        ['Quanto tempo um toque pode ter?', 'Menos de 30 segundos se você definir pelo app Arquivos do iPhone, e até 40 segundos com o GarageBand ou um computador. O MeloCut seleciona 29 segundos no início e limita sua seleção a 40.'],
        ['O que é um arquivo M4R?', 'É o formato de toque que o iPhone usa. Por dentro é um arquivo de áudio M4A (AAC) normal.'],
        ['Posso fazer um toque a partir de um vídeo?', 'Sim. Abra o vídeo e o MeloCut usa o som dele.'],
        ['É grátis?', 'Sim, totalmente grátis, sem marca d\'água e sem cadastro.'],
      ],
    },
    {
      key: 'converter', path: 'pt-br/conversor-de-audio', tool: 'converter', crumb: 'Tools',
      title: `Conversor de áudio: MP3, WAV, M4A, OGG e FLAC | ${NAME}`,
      description: 'Converta áudio online grátis: MP3, WAV, M4A, OGG, FLAC e OPUS. Também muda velocidade e volume. Funciona com áudios do WhatsApp. Sem upload.',
      h1: '<em>Conversor de áudio</em> para MP3, WAV, M4A, OGG e FLAC',
      lead: 'Converta entre MP3, WAV, M4A, OGG e FLAC. Ele também abre áudios do WhatsApp e do Telegram (OPUS).',
      badges: ['MP3, WAV, M4A, OGG, FLAC', 'Velocidade e volume', 'Áudios do WhatsApp'],
      steps: [
        ['Abra um arquivo', 'Qualquer arquivo de áudio ou vídeo, inclusive áudios .opus do WhatsApp.'],
        ['Escolha o formato', 'Escolha o formato e a qualidade de saída. Adicione efeitos se quiser.'],
        ['Converta e baixe', 'Toque em Converter e depois em Baixar.'],
      ],
      content: `
    <h2>Converta quase qualquer arquivo de áudio</h2>
    <p>O ${NAME} abre MP3, WAV, M4A, AAC, OGG, OPUS, FLAC, AMR e WMA, e salva no formato que seu celular, seu carro ou seu app precisa.</p>
    <p>Abra <strong>Efeitos e filtros</strong> se também quiser adicionar fades, mudar a velocidade ou o tom, aumentar o grave ou o volume, limpar ruído ou colocar reverb.</p>
    <h3>Áudios do WhatsApp e do Telegram</h3>
    <p>As mensagens de voz são salvas como arquivos <code>.opus</code> ou <code>.ogg</code> que muitos players não abrem. Converta para MP3 e elas tocam em qualquer lugar.</p>
    <h3>Qual formato escolher?</h3>
    <p>O MP3 toca em todo lugar. O M4A soa um pouco melhor com o mesmo tamanho. FLAC e WAV não adicionam perda por compressão, mas ocupam mais espaço.</p>`,
      faq: [
        ['Como converto WAV para MP3?', 'Abra o WAV, escolha MP3 e uma qualidade, e toque em Converter e depois em Baixar.'],
        ['Como converto um áudio do WhatsApp para MP3?', 'Salve o áudio (.opus) no seu aparelho, abra aqui, escolha MP3 e toque em Converter.'],
        ['Qual é o melhor formato de áudio?', 'MP3 toca em todo lugar. M4A soa um pouco melhor com o mesmo tamanho. FLAC e WAV mantêm a qualidade, mas são maiores.'],
        ['Posso fazer uma versão slowed + reverb?', 'Sim. Toque no ajuste Slowed + Reverb em Efeitos.'],
      ],
    },
  ],
});
