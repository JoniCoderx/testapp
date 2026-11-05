// Brazilian Portuguese versions of more format pages (en-conv2.mjs). Each `key` matches the English page (build.mjs KEY_OF).
export default (NAME) => [
  {
    key: 'c-wma', convLabel: 'WMA para MP3', path: 'pt-br/wma-para-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Converter WMA para MP3 online grátis, sem upload | ${NAME}`,
    description: 'Converta arquivos WMA antigos do Windows Media Player para MP3 e ouça em qualquer celular, carro ou app. Até 320 kbps. Grátis, privado e sem upload.',
    h1: 'Converter <em>WMA para MP3</em>',
    lead: 'Dê uma segunda vida aos seus arquivos antigos do Windows Media Audio como MP3 que tocam no iPhone, no Android, no Mac e no carro.',
    badges: ['Windows Media Audio', 'Até 320 kbps', 'Sem upload'],
    steps: [
      ['Abra o WMA', 'Escolha um arquivo .wma do seu aparelho, ou solte vários de uma vez.'],
      ['Escolha a qualidade', '192 kbps serve para a maioria dos WMA copiados de CD. Use 320 kbps se o original tinha alta qualidade.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>De onde vêm os arquivos WMA</h2>
    <p>Durante anos, o Windows Media Player copiava CDs para WMA por padrão. Se você tem uma pasta de músicas antiga de um PC com Windows XP ou Windows 7, boa parte provavelmente é WMA. Os arquivos ainda soam bem, mas iPhones, Macs, muitos sons de carro e a maioria dos apps de música não tocam esse formato.</p>
    <p>O ${NAME} lê o WMA no seu navegador e salva um MP3 padrão. O arquivo fica no seu aparelho o tempo todo, então nem uma coleção particular é enviada para lugar nenhum.</p>
    <h3>Qual qualidade escolher?</h3>
    <p>Os WMA antigos costumavam ser copiados em 128 ou 192 kbps. Converter para um bitrate maior não acrescenta detalhes que não existem, então <strong>192 kbps</strong> é uma boa escolha. Se o WMA foi copiado em bitrate alto ou como WMA Lossless, escolha <strong>320 kbps</strong> para manter o máximo que o MP3 permite.</p>
    <h3>Uma pasta inteira de WMA</h3>
    <p>Escolha ou solte vários arquivos juntos, aperte <strong>Converter todos</strong> e baixe um por um ou tudo em um só ZIP. No computador, esse é o jeito mais rápido de passar uma biblioteca antiga. Lembre que as tags e as capas não são copiadas para os arquivos novos, então talvez você queira corrigir os nomes das músicas no seu app de música depois.</p>
    <h3>Arquivos WMA protegidos</h3>
    <p>Alguns WMA comprados em lojas online antigas ou em serviços de assinatura têm proteção contra cópia (DRM). Nem o ${NAME} nem nenhuma outra ferramenta de navegador consegue abri-los. Cópias normais de CD não têm DRM e convertem sem problema.</p>
    <p>Quer só um trecho de uma música, por exemplo como toque? Converta primeiro e depois abra o MP3 no <a href="/pt-br/criar-toque/">criador de toques</a> ou em <a href="/pt-br/cortar-audio/">Cortar áudio</a>.</p>`,
    faq: [
      ['Como converto WMA para MP3?', 'Abra o arquivo WMA acima, escolha MP3 e uma qualidade, e aperte Converter e depois Baixar.'],
      ['Posso converter WMA no Mac ou no iPhone?', 'Sim. A conversão acontece no navegador, então funciona no Mac, no iPhone e no Android, mesmo que eles não toquem WMA sozinhos.'],
      ['Por que meu arquivo WMA não converte?', 'Provavelmente ele tem proteção contra cópia (DRM). Arquivos WMA protegidos não podem ser convertidos. Arquivos sem proteção, como suas próprias cópias de CD, funcionam normalmente.'],
      ['Converter WMA para MP3 perde qualidade?', 'Os dois formatos são comprimidos, então perde um pouco. Em 192 ou 320 kbps é muito difícil perceber.'],
      ['Os MP3 convertidos estão sem nome de música. Por quê?', 'As tags e as capas são removidas do arquivo final por privacidade. Coloque os nomes no seu app de música, ou renomeie os arquivos antes de converter.'],
    ],
  },
  {
    key: 'c-aiff', convLabel: 'AIFF para MP3', path: 'pt-br/aiff-para-mp3', tool: 'converter', format: 'mp3', crumb: 'Converters',
    title: `Converter AIFF para MP3 online, grátis e privado | ${NAME}`,
    description: 'Converta arquivos AIFF e AIF do Mac, GarageBand ou Logic para MP3. Eles ficam até 10 vezes menores. Escolha até 320 kbps. Grátis e nada é enviado.',
    h1: 'Converter <em>AIFF para MP3</em>',
    lead: 'Transforme os arquivos AIFF e AIF pesados do seu Mac, GarageBand ou Logic em MP3 pequenos e fáceis de compartilhar.',
    badges: ['AIFF e AIF', 'Até 320 kbps', 'Sem upload'],
    steps: [
      ['Abra o AIFF', 'Escolha um arquivo .aiff ou .aif, ou solte vários de uma vez.'],
      ['Escolha 320 kbps', 'O AIFF tem qualidade total, então mantenha o máximo que o MP3 consegue.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>O que é um arquivo AIFF?</h2>
    <p>AIFF é o formato de áudio sem compressão da Apple, a versão Mac do WAV. O GarageBand e o Logic exportam músicas em AIFF, as importações de CD das versões antigas do iTunes muitas vezes eram AIFF, e muitos pacotes de samples e efeitos sonoros vêm como arquivos <code>.aif</code>. O som é excelente, mas uma música de três minutos ocupa cerca de 30 MB.</p>
    <p>Como MP3 em 320 kbps, a mesma música fica com uns 7 MB e soa quase idêntica. É pequena o bastante para mandar em um chat, enviar para um site com limite de tamanho ou guardar no celular.</p>
    <h3>Compartilhar uma música que você fez</h3>
    <p>Terminou uma faixa no GarageBand? Exporte como AIFF, abra aqui e salve um MP3 para os amigos, a banda ou as redes sociais. Use <strong>Volume automático</strong> em Efeitos se a sua mixagem estiver bem mais baixa que as músicas dos apps de streaming. Se quiser compartilhar só um trecho, arraste na onda para ficar com essa parte e coloque uma saída suave.</p>
    <h3>Converter muitos samples</h3>
    <p>Escolha vários arquivos AIFF de uma vez e aperte <strong>Converter todos</strong>. Você pode baixar cada MP3 separado ou todos em um só ZIP. Guarde os AIFF originais se talvez for editá-los de novo: o MP3 é ótimo para ouvir, mas não para continuar mixando.</p>
    <h3>Precisa de outro formato?</h3>
    <p>Para editar no Windows, muitos apps preferem WAV. Escolha WAV no menu Formato, ou veja a diferença em <a href="/pt-br/mp3-para-wav/">MP3 para WAV</a>. Se quiser manter a qualidade total mas economizar espaço, escolha FLAC: é sem perdas e tem mais ou menos metade do tamanho. A página <a href="/pt-br/wav-para-flac/">WAV para FLAC</a> explica como funciona.</p>`,
    faq: [
      ['AIF é a mesma coisa que AIFF?', 'Sim. As duas extensões são usadas para o mesmo formato, e as duas convertem aqui.'],
      ['Converter AIFF para MP3 perde qualidade?', 'Um pouco, porque o MP3 é comprimido. Em 320 kbps a maioria das pessoas não percebe a diferença.'],
      ['Posso converter AIFF no Windows ou no Android?', 'Sim. O conversor funciona no navegador, então serve em qualquer computador ou celular.'],
      ['Meu arquivo AIFF não abre. O que eu faço?', 'Algumas variantes raras de AIFF-C podem falhar. Exporte o arquivo de novo do GarageBand, do Logic ou do Música como AIFF padrão ou WAV e tente outra vez.'],
    ],
  },
  {
    key: 'c-mkv', convLabel: 'MKV para MP3', path: 'pt-br/mkv-para-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Converter MKV para MP3: extrair o áudio grátis | ${NAME}`,
    description: 'Extraia o áudio de vídeos MKV e salve como MP3, M4A ou WAV. Até 320 kbps, direto no navegador. Grátis, sem cadastro e o vídeo nunca é enviado.',
    h1: 'Converter <em>MKV para MP3</em>',
    lead: 'Tire o som de um vídeo MKV e salve como um MP3 que toca em qualquer aparelho.',
    badges: ['Vídeos MKV', 'Até 320 kbps', 'Sem upload'],
    steps: [
      ['Abra o MKV', 'Toque na caixa acima e escolha o vídeo, ou arraste ele para cá.'],
      ['Corte se quiser', 'Arraste na onda para ficar só com uma cena ou música.'],
      ['Baixe o MP3', 'Escolha uma qualidade, aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>O que tem dentro de um arquivo MKV?</h2>
    <p>MKV (Matroska) é um contêiner que pode guardar vídeo, várias faixas de áudio e legendas em um só arquivo. Gravadores de tela como o OBS, editores de vídeo e muitas ferramentas de download salvam em MKV. Celulares e alguns players não abrem esse formato, mas o áudio dentro dele normalmente é som AAC, Opus, Vorbis ou AC-3 comum que o ${NAME} consegue transformar em MP3.</p>
    <h3>Vídeos com mais de uma faixa de áudio</h3>
    <p>Alguns MKV trazem várias faixas de áudio, por exemplo dois idiomas, ou um comentário junto com o som principal. O ${NAME} usa a faixa de áudio principal, normalmente a primeira. Se você precisa de outra faixa, remova as demais antes em uma ferramenta de vídeo como o MKVToolNix e depois abra o arquivo aqui.</p>
    <h3>Bons usos</h3>
    <ul>
      <li>Salvar a música de um show ou da gravação de uma live.</li>
      <li>Transformar uma palestra gravada ou um comentário de gameplay em um MP3 estilo podcast.</li>
      <li>Cortar uma fala de um clipe e fazer dela um <a href="/pt-br/criar-toque/">toque de celular</a>.</li>
    </ul>
    <h3>Qual formato?</h3>
    <p><strong>MP3</strong> toca em qualquer lugar: escolha 320 kbps para música e 128 kbps para voz. <strong>M4A</strong> guarda o som AAC de um jeito um pouco mais eficiente, e <strong>WAV</strong> é o melhor se você for editar o áudio em outro programa. A gravação está baixa demais? Ative <strong>Volume automático</strong> em Efeitos antes de converter.</p>
    <h3>Arquivos grandes</h3>
    <p>Arquivos MKV de filmes inteiros podem ser enormes. O ${NAME} aceita arquivos de até 1 GB, e computadores lidam com vídeos grandes muito melhor que celulares. Outros tipos de vídeo têm páginas próprias, como <a href="/pt-br/avi-para-mp3/">AVI para MP3</a> e <a href="/mov-to-mp3/">MOV para MP3</a> (em inglês), ou use a ferramenta geral <a href="/pt-br/video-para-mp3/">Vídeo para MP3</a>.</p>`,
    faq: [
      ['Como converto MKV para MP3?', 'Abra o MKV acima, escolha MP3 e uma qualidade, e aperte Converter e depois Baixar.'],
      ['Qual faixa de áudio é usada?', 'A faixa de áudio principal do vídeo, normalmente a primeira. As outras faixas são ignoradas.'],
      ['Posso manter as legendas?', 'Não. Só o som é salvo. As legendas e o vídeo ficam de fora.'],
      ['O MP3 está mudo ou no idioma errado. Por quê?', `O ${NAME} usa a faixa de áudio principal, normalmente a primeira. Remova as outras faixas com uma ferramenta como o MKVToolNix, ou confira se o vídeo tem som quando você o reproduz.`],
    ],
  },
  {
    key: 'c-avi', convLabel: 'AVI para MP3', path: 'pt-br/avi-para-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Converter AVI para MP3 online, grátis, sem upload | ${NAME}`,
    description: 'Extraia o som de vídeos AVI antigos de câmeras e PCs e salve como MP3. Até 320 kbps, direto no navegador. Grátis e privado, nada é enviado.',
    h1: 'Converter <em>AVI para MP3</em>',
    lead: 'Resgate o som de vídeos AVI antigos de câmeras digitais, filmadoras e PCs com Windows.',
    badges: ['Vídeos de câmeras antigas', 'Até 320 kbps', 'Sem upload'],
    steps: [
      ['Abra o AVI', 'Escolha o arquivo .avi do seu aparelho.'],
      ['Selecione o trecho que precisa', 'Arraste na onda, ou mantenha o arquivo inteiro.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Vídeos AVI antigos, vida nova</h2>
    <p>O AVI foi por muito tempo o formato de vídeo padrão no Windows. Muitas câmeras digitais compactas dos anos 2000 também salvavam os clipes em AVI. Esses arquivos costumam estar cheios de parabéns, apresentações da escola e vozes da família, mas celulares e TVs modernos muitas vezes se recusam a tocá-los.</p>
    <p>O ${NAME} abre o AVI no seu navegador, pega a faixa de áudio e salva como um MP3 que você pode guardar, compartilhar ou tocar no carro. O vídeo nunca sai do seu aparelho.</p>
    <h3>Deixe as gravações antigas com som melhor</h3>
    <p>Os microfones das câmeras daquela época não eram grande coisa. Antes de converter, abra <strong>Efeitos</strong>:</p>
    <ul>
      <li><strong>Volume automático</strong> deixa uma gravação baixa tão alta quanto nos apps de streaming, sem distorção.</li>
      <li><strong>Remover ruído com IA</strong> tira vento, zumbido e conversas de fundo atrás das vozes.</li>
      <li>Aperte <strong>Tocar com efeitos</strong> para ouvir o resultado antes de baixar.</li>
    </ul>
    <p>Se a gravação continuar baixa demais, o <a href="/pt-br/aumentar-volume/">Aumentar volume</a> deixa você subir ainda mais.</p>
    <h3>Qual qualidade?</h3>
    <p>O som dos AVI de câmeras antigas costuma ser mono e gravado em baixa qualidade, então <strong>128 kbps</strong> normalmente basta e mantém o arquivo pequeno. Escolha 320 kbps para videoclipes ou clipes copiados de DVD.</p>
    <h3>Se o AVI não abrir</h3>
    <p>Um AVI pode conter muitos codecs diferentes. Quase todos os comuns funcionam, mas alguns muito antigos ou incomuns podem falhar. Se isso acontecer, tente tocar o arquivo no VLC: se lá também não tiver som, talvez o AVI não tenha nenhuma faixa de áudio. Para outros tipos de vídeo, veja <a href="/pt-br/3gp-para-mp3/">3GP para MP3</a> e <a href="/pt-br/mkv-para-mp3/">MKV para MP3</a>.</p>`,
    faq: [
      ['Como converto AVI para MP3?', 'Abra o AVI acima, escolha MP3 e uma qualidade, aperte Converter e depois Baixar.'],
      ['Posso converter AVI para MP3 no celular?', 'Sim, funciona no navegador do iPhone e do Android. Vídeos muito longos são mais fáceis no computador.'],
      ['O vídeo é enviado para algum servidor?', 'Não. Tudo acontece no seu aparelho, então seus vídeos de família continuam privados.'],
      ['O AVI toca, mas o MP3 está mudo. Por quê?', 'Algumas câmeras salvavam o vídeo sem som, ou a faixa de áudio está danificada. Se no VLC ele também toca sem som, não há nada para extrair.'],
    ],
  },
  {
    key: 'c-3gp', convLabel: '3GP para MP3', path: 'pt-br/3gp-para-mp3', tool: 'video-to-mp3', format: 'mp3', crumb: 'Converters',
    title: `Converter 3GP para MP3: vídeos de celular antigo | ${NAME}`,
    description: 'Converta vídeos 3GP e gravações de celulares antigos para MP3. Limpe o som e salve direto no navegador. Grátis, privado e nada é enviado.',
    h1: 'Converter <em>3GP para MP3</em>',
    lead: 'Salve o som de vídeos 3GP e gravações de voz feitas em celulares antigos da Nokia, da Samsung e outros aparelhos simples.',
    badges: ['Vídeos de celular antigo', 'Remoção de ruído', 'Sem upload'],
    steps: [
      ['Abra o 3GP', 'Escolha o arquivo .3gp do seu aparelho ou do cartão de memória.'],
      ['Limpe o som', 'Ative Volume automático ou Remover ruído com IA em Efeitos se quiser.'],
      ['Baixe o MP3', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>O que é um arquivo 3GP?</h2>
    <p>3GP é o formato de vídeo que a maioria dos celulares usava antes dos smartphones. Nokia, Sony Ericsson, Samsung e muitos outros aparelhos salvavam os vídeos da câmera, e às vezes as gravações de voz, como <code>.3gp</code>. Hoje, apps de música, iPhones e computadores muitas vezes não tocam esses arquivos, mesmo eles sendo minúsculos.</p>
    <p>O ${NAME} lê o 3GP e salva o som como um MP3 comum. Muitos desses arquivos usam AMR, um codec feito para ligações telefônicas que poucos players aceitam. A versão em MP3 toca em qualquer lugar, e tudo acontece no seu aparelho, então nada é enviado.</p>
    <h3>Como ter o melhor som</h3>
    <p>Os microfones dos celulares dos anos 2000 gravavam em baixa qualidade, normalmente em mono. Converter não acrescenta detalhes, mas pode deixar a gravação bem mais fácil de ouvir:</p>
    <ul>
      <li>Ative <strong>Volume automático</strong> para aumentar vozes baixas.</li>
      <li>Ative <strong>Remover ruído com IA</strong> para vento e barulho de fundo.</li>
      <li>Use <strong>128 kbps</strong>. Configurações mais altas só deixam o arquivo maior.</li>
    </ul>
    <h3>Ideias para clipes de celular antigo</h3>
    <p>Guarde a voz de um avô ou avó, salve uma música de uma apresentação da escola ou transforme um clipe antigo engraçado em <a href="/pt-br/criar-toque/">toque de celular</a>. Quer só alguns segundos? Arraste na onda para selecioná-los, ou abra o MP3 depois em <a href="/pt-br/cortar-audio/">Cortar áudio</a>.</p>
    <h3>Como tirar os arquivos do celular</h3>
    <p>Celulares antigos normalmente guardavam os vídeos em um cartão de memória. Coloque o cartão em um leitor de cartões, ou conecte o aparelho com um cabo USB, e copie os arquivos 3GP para o computador. Depois abra aqui. Vídeos de celulares mais novos são MP4 ou MOV: veja <a href="/pt-br/video-para-mp3/">Vídeo para MP3</a>.</p>`,
    faq: [
      ['Como converto 3GP para MP3?', 'Abra o 3GP acima, escolha MP3, aperte Converter e depois Baixar.'],
      ['Por que o MP3 ainda soa um pouco abafado?', 'Celulares antigos gravavam em baixa qualidade. Converter mantém o que existe, mas não recupera detalhes que faltam. Volume automático e Remover ruído com IA ajudam muito com vozes.'],
      ['Posso converter 3GP no celular?', 'Sim. Funciona no navegador do iPhone e do Android, sem instalar nenhum app.'],
      ['Meu 3GP é uma gravação de voz, não um vídeo. Funciona?', 'Sim. Arquivos 3GP só de áudio convertem do mesmo jeito, e gravações de voz .amr também.'],
    ],
  },
  {
    key: 'c-mp3ogg', convLabel: 'MP3 para OGG', path: 'pt-br/mp3-para-ogg', tool: 'converter', format: 'ogg', crumb: 'Converters',
    title: `Converter MP3 para OGG online grátis (Vorbis) | ${NAME}`,
    description: 'Converta MP3 para OGG Vorbis para engines de jogos, apps de código aberto e Linux. Escolha a qualidade e corte o arquivo no navegador. Grátis e sem upload.',
    h1: 'Converter <em>MP3 para OGG</em>',
    lead: 'Transforme MP3 em arquivos OGG Vorbis para jogos, engines de jogos e software de código aberto.',
    badges: ['OGG Vorbis', 'Para áudio de jogos', 'Sem upload'],
    steps: [
      ['Abra o MP3', 'Escolha um MP3, ou solte vários arquivos de uma vez.'],
      ['O OGG já vem selecionado', 'Escolha uma qualidade. 192 kbps é um bom padrão.'],
      ['Baixe o OGG', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Por que converter MP3 para OGG?</h2>
    <p>OGG Vorbis é um formato de áudio aberto e livre de royalties. Engines de jogos como Godot e Unity importam o formato diretamente, e muitos jogos usam OGG para música e efeitos sonoros. Apps de desktop do Linux e muito software de código aberto também preferem OGG. Se uma ferramenta pede um <code>.ogg</code>, este é o jeito rápido de conseguir um.</p>
    <h3>Qual qualidade escolher?</h3>
    <p>O ${NAME} usa o modo de qualidade do Vorbis, que adapta o bitrate ao som. A opção que você escolhe é uma meta aproximada:</p>
    <ul>
      <li><strong>192 kbps</strong>: um bom padrão para música de jogos.</li>
      <li><strong>128 kbps</strong>: mais que suficiente para falas e a maioria dos efeitos sonoros, e menor.</li>
      <li><strong>320 kbps</strong>: só vale a pena se o próprio MP3 era de 320 kbps.</li>
    </ul>
    <p>MP3 e OGG são formatos comprimidos, então converter de um para o outro perde um pouquinho a cada vez. Se você ainda tem o WAV ou FLAC original, converta esse para ter o resultado mais limpo.</p>
    <h3>Prepare o áudio do jogo de uma vez</h3>
    <p>Antes de converter, arraste na onda para cortar o silêncio do começo ou do fim, assim um loop de música começa certinho no tempo. Abra <strong>Efeitos</strong> para colocar um fade, mudar a velocidade ou o tom, ou igualar o volume com <strong>Volume automático</strong>. Para cortar uma faixa longa em partes, use <a href="/pt-br/dividir-audio/">Dividir áudio</a>.</p>
    <h3>Muitos arquivos de uma vez</h3>
    <p>Escolha vários MP3 juntos, aperte <strong>Converter todos</strong> e baixe tudo em um só ZIP. Prático para uma pasta de efeitos sonoros.</p>
    <p>Precisa fazer o caminho inverso? O conversor <a href="/pt-br/ogg-para-mp3/">OGG para MP3</a> transforma arquivos OGG de volta em MP3 para celulares e carros.</p>`,
    faq: [
      ['O OGG é Vorbis ou Opus?', 'Vorbis, o tipo que as engines de jogos e a maioria dos apps esperam de um arquivo .ogg.'],
      ['O OGG vai ficar menor que o MP3?', 'Com uma qualidade parecida ele fica mais ou menos do mesmo tamanho, muitas vezes um pouco menor.'],
      ['Converter MP3 para OGG perde qualidade?', 'Um pouco, porque os dois formatos são comprimidos. Em 192 kbps ou mais é muito difícil perceber.'],
      ['Posso fazer um loop de música sem emendas?', 'Arraste os marcadores na onda para cortar o silêncio do começo e do fim antes de converter. Os pontos exatos do loop são melhor definidos na sua engine de jogo.'],
    ],
  },
  {
    key: 'c-wavflac', convLabel: 'WAV para FLAC', path: 'pt-br/wav-para-flac', tool: 'converter', format: 'flac', crumb: 'Converters',
    title: `Converter WAV para FLAC: sem perdas, grátis online | ${NAME}`,
    description: 'Converta WAV para FLAC online e deixe os arquivos com cerca de metade do tamanho sem perder qualidade. Grátis, privado e rápido. Seu áudio nunca é enviado.',
    h1: 'Converter <em>WAV para FLAC</em>',
    lead: 'Reduza arquivos WAV grandes para FLAC sem perdas. O mesmo som, mais ou menos metade do espaço.',
    badges: ['Sem perdas', 'Cerca de metade do tamanho', 'Sem upload'],
    steps: [
      ['Abra o WAV', 'Escolha um arquivo WAV, ou solte vários de uma vez.'],
      ['O FLAC já vem selecionado', 'Deixe os efeitos desligados para uma cópia exata.'],
      ['Baixe o FLAC', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Sem perdas, mas menor</h2>
    <p>O WAV guarda cada amostra sem compressão, cerca de 10 MB por minuto em estéreo com qualidade de CD. O FLAC compacta exatamente o mesmo áudio de forma mais eficiente, mais ou menos como um arquivo ZIP para o som. A maioria das músicas fica com cerca de metade do tamanho, às vezes menos em gravações calmas ou de voz. Quando você toca o FLAC, o som é idêntico ao do WAV.</p>
    <p>Não existe ajuste de qualidade para FLAC porque nada é descartado. O menu de qualidade só importa para MP3, M4A e OGG.</p>
    <h3>Quando o FLAC vale a pena</h3>
    <ul>
      <li><strong>Arquivar</strong> gravações, cópias de CD ou suas próprias músicas sem perder nada.</li>
      <li><strong>Economizar espaço</strong> em um disco cheio de arquivos WAV de um gravador ou programa de música.</li>
      <li><strong>Players hi-fi</strong> e servidores de música que leem FLAC e suas tags.</li>
    </ul>
    <h3>Quando escolher outra coisa</h3>
    <p>O iPhone não toca FLAC no app Música, e muitos sons de carro pulam esse formato. Para ouvir no dia a dia no celular, <a href="/pt-br/wav-para-mp3/">WAV para MP3</a> em 320 kbps fica bem menor e soa muito parecido. Vai precisar de um WAV de volta depois? O conversor <a href="/pt-br/flac-para-wav/">FLAC para WAV</a> gera uma cópia exata de 16 bits.</p>
    <h3>Converter uma pasta inteira</h3>
    <p>Escolha vários arquivos WAV juntos, aperte <strong>Converter todos</strong> e baixe os FLAC um por um ou em um só ZIP. Confira se alguns dos arquivos novos tocam direitinho antes de apagar qualquer original.</p>
    <h3>Os efeitos mudam o áudio</h3>
    <p>Para uma cópia realmente sem perdas, deixe os <strong>Efeitos</strong> desligados e mantenha o arquivo inteiro selecionado. Se você cortar o arquivo, colocar um fade ou ativar o Volume automático, o FLAC vai guardar a versão alterada, ainda sem nenhuma perda de compressão a mais.</p>`,
    faq: [
      ['Converter WAV para FLAC perde qualidade?', 'Não. O FLAC é sem perdas: ao decodificar, você recupera exatamente o mesmo áudio do WAV.'],
      ['Quanto o FLAC é menor que o WAV?', 'Normalmente cerca de metade do tamanho. Gravações calmas ou simples diminuem mais; músicas densas e altas, um pouco menos.'],
      ['Posso converter FLAC de volta para WAV?', 'Sim, com o conversor FLAC para WAV, sem nenhuma perda.'],
      ['Meu FLAC vai ter tags e capa?', 'Não. Os metadados são removidos do arquivo final por privacidade, então coloque os nomes das músicas e a capa no seu app de música depois.'],
    ],
  },
];
