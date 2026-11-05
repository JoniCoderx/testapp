// More Brazilian Portuguese tool pages. `key` matches the English page in build.mjs KEY_OF.
export default (NAME) => [
  {
    key: 'reverse', path: 'pt-br/audio-ao-contrario', tool: 'reverse', crumb: 'Tools',
    title: `Colocar áudio ao contrário online grátis | ${NAME}`,
    description: 'Coloque qualquer música, áudio ou som ao contrário e ouça de trás para frente. Ouça primeiro e baixe um MP3. Grátis, rápido e sem upload.',
    h1: 'Colocar <em>áudio ao contrário</em>',
    lead: 'Toque qualquer som, voz ou música de trás para frente. Ótimo para desafios, efeitos sonoros e procurar "mensagens escondidas".',
    badges: ['Rápido', 'Qualquer formato', 'Sem upload'],
    steps: [
      ['Abra um arquivo', 'Qualquer música, áudio ou vídeo.'],
      ['Ouça', 'Ao contrário já vem ativado. Aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e salve.'],
    ],
    content: `
    <h2>Ideias</h2>
    <p>Grave você falando alguma coisa e coloque ao contrário para o desafio de falar de trás para frente, procure "mensagens escondidas" em músicas ou crie efeitos de prato invertido para as suas músicas. Coloque um pouco de reverb para o clássico som de reverb ao contrário.</p>
    <h3>Grave aqui mesmo</h3>
    <p>Aperte <strong>Gravar com o microfone</strong>, fale a sua frase e pare a gravação: ela abre pronta para ficar ao contrário.</p>`,
    faq: [
      ['Posso colocar só um trecho da música ao contrário?', 'Sim. Arraste sobre a onda para escolher o trecho e depois converta.'],
      ['É grátis?', 'Sim. Sem cadastro, sem marca d\'água e o áudio não é enviado para nenhum servidor.'],
    ],
  },
  {
    key: 'speedup', path: 'pt-br/acelerar-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 1.25 }, suffix: ' (mais rápido)',
    note: 'A velocidade está em 1,25×. Mexa no controle de Velocidade, aperte Tocar com efeitos e depois Converter.',
    title: `Acelerar áudio online sem mudar o tom | ${NAME}`,
    description: 'Acelere uma música, um podcast ou um áudio do WhatsApp sem a voz de esquilo. Escolha de 1,1× a 2×, ouça primeiro e baixe um MP3. Grátis e sem upload.',
    h1: '<em>Acelerar</em> um áudio',
    lead: 'Deixe uma música, um podcast, uma aula ou um áudio mais rápido, com a voz no tom normal.',
    badges: ['Até 2×', 'Mesmo tom', 'Ouça antes de salvar'],
    steps: [
      ['Abra seu arquivo', 'Qualquer música, áudio, podcast ou vídeo.'],
      ['Escolha a velocidade', '1,25× já vem pronto. Mexa no controle de Velocidade e aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Mais rápido, sem voz de esquilo</h2>
    <p>Quando você só toca um áudio mais rápido, o tom também sobe e as vozes ficam de desenho animado. O ${NAME} estica o tempo: encurta o áudio e mantém cada voz e cada nota no tom normal.</p>
    <h3>Qual velocidade escolher</h3>
    <p><strong>1,25×</strong> economiza um quarto do tempo e ainda soa natural para voz. <strong>1,5×</strong> é popular para aulas e áudios longos. Acima de <strong>1,75×</strong> fica difícil acompanhar a fala. Para a trend de música acelerada com a voz mais aguda, use o <a href="/pt-br/nightcore/">criador de nightcore</a>.</p>
    <h3>Ainda mais curto</h3>
    <p>Ative também <strong>Remover silêncios</strong> para tirar as pausas, ou use o <a href="/pt-br/remover-silencios/">remover silêncios</a> separado.</p>`,
    faq: [
      ['A voz fica mais aguda?', 'Não. O tom continua o mesmo. Só o ritmo muda.'],
      ['Como acelero um áudio do WhatsApp?', 'Abra aqui, escolha a velocidade, aperte Converter e Baixar. O arquivo novo fica mais curto e toca em qualquer lugar.'],
    ],
  },
  {
    key: 'slowdown', path: 'pt-br/desacelerar-audio', tool: 'converter', crumb: 'Tools', fx: { speed: 0.8 }, suffix: ' (mais lento)',
    note: 'A velocidade está em 0,80×. Mexa no controle de Velocidade, aperte Tocar com efeitos e depois Converter.',
    title: `Desacelerar áudio online sem mudar o tom | ${NAME}`,
    description: 'Deixe músicas, falas ou áudios mais lentos para aprender letras, treinar um instrumento ou transcrever. Mesmo tom, grátis e privado.',
    h1: '<em>Desacelerar</em> um áudio',
    lead: 'Toque uma música ou gravação mais devagar sem a voz grossa e arrastada. Ótimo para aprender músicas, dançar e transcrever.',
    badges: ['Até 0,5×', 'Mesmo tom', 'Ouça antes de salvar'],
    steps: [
      ['Abra seu arquivo', 'Uma música, uma aula, uma entrevista ou um áudio.'],
      ['Escolha a velocidade', '0,80× já vem pronto. Mexa no controle de Velocidade e aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Mais devagar, mas afinado</h2>
    <p>O ${NAME} estica o áudio no tempo e mantém o tom, então um solo de guitarra ou um rap rápido fica fácil de acompanhar e continua soando como o original.</p>
    <h3>Para treinar um instrumento</h3>
    <p>Comece em <strong>0,70×</strong>, aprenda a parte, suba para 0,85× e por fim para a velocidade normal. Para repetir um trecho curto, selecione antes na onda e só essa parte será salva.</p>
    <h3>Quer o som slowed + reverb?</h3>
    <p>Essa trend também abaixa o tom e coloca reverb. O <a href="/pt-br/slowed-reverb/">Slowed + Reverb</a> já vem com isso pronto.</p>`,
    faq: [
      ['Desacelerar muda o tom?', 'Não. As notas continuam no mesmo tom. Só o ritmo muda.'],
      ['Até quanto dá para desacelerar?', 'Até a metade da velocidade (0,5×). Abaixo de 0,6× algumas músicas começam a ficar um pouco borradas.'],
    ],
  },
  {
    key: 'pitch', path: 'pt-br/mudar-tom', tool: 'converter', crumb: 'Tools', fx: { pitch: -2 }, suffix: ' (novo tom)',
    note: 'O tom está 2 semitons mais baixo. Mexa no controle de Tom, aperte Tocar com efeitos e depois Converter.',
    title: `Mudar o tom de uma música online grátis | ${NAME}`,
    description: 'Mude o tom de qualquer música até 12 semitons para cima ou para baixo sem mudar a velocidade. Ótimo para cantar e tocar junto. Grátis e sem upload.',
    h1: '<em>Mudar o tom</em> de uma música',
    lead: 'Suba ou desça uma música para o tom que combina com a sua voz ou o seu instrumento. O ritmo não muda.',
    badges: ['±12 semitons', 'Mesma velocidade', 'Ouça antes de salvar'],
    steps: [
      ['Abra uma música', 'Qualquer música ou vídeo do seu aparelho.'],
      ['Mude o tom', 'Começa 2 semitons mais baixo. Mexa no controle de Tom e aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Cante no tom que fica bom para você</h2>
    <p>Se uma música é aguda demais para cantar, abaixe <strong>2 ou 3 semitons</strong>. Se é grave demais, suba. Um semitom é uma tecla do piano, e 12 semitons formam uma oitava.</p>
    <h3>Para tocar no violão ou no teclado</h3>
    <p>Às vezes as músicas são gravadas um pouco fora do tom ou num tom difícil. Passe para um tom que você conhece, ou use o capotraste e mova a música para combinar.</p>
    <h3>Para karaokê</h3>
    <p>Combine com <strong>Remover voz</strong> em Efeitos, ou comece no <a href="/pt-br/remover-voz/">remover voz</a>, para ter a sua faixa de karaokê no seu tom.</p>`,
    faq: [
      ['Mudar o tom muda a velocidade?', 'Não. A música mantém o ritmo e a duração. Só o tom muda.'],
      ['Quantos semitons tem uma mudança de tom?', 'Cada semitom é um passo. De Dó a Ré são 2 semitons, e 12 semitons são uma oitava.'],
    ],
  },
  {
    key: 'silence', path: 'pt-br/remover-silencios', tool: 'converter', crumb: 'Tools', fx: { silence: true }, suffix: ' (sem silêncios)',
    note: 'Remover silêncios está ativado. Ele corta cada pausa de mais de 0,8 segundo. Aperte Tocar com efeitos para conferir.',
    title: `Remover silêncios de um áudio automaticamente grátis | ${NAME}`,
    description: 'Corte automaticamente as pausas longas de gravações de voz, podcasts, aulas e áudios do WhatsApp. Grátis, privado e sem upload.',
    h1: '<em>Remover silêncios</em> de um áudio',
    lead: 'Corte automaticamente as pausas longas e os silêncios das suas gravações, para elas ficarem mais curtas e fáceis de ouvir.',
    badges: ['Automático', 'Voz e podcasts', 'Sem upload'],
    steps: [
      ['Abra sua gravação', 'Um áudio, um podcast, uma aula ou um vídeo.'],
      ['Confira o resultado', 'Remover silêncios já vem ativado. Aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Como funciona</h2>
    <p>O ${NAME} procura trechos em que o som fica bem baixo por mais de uns <strong>0,8 segundo</strong> e corta. As pausas normais entre as palavras ficam, então a fala continua natural.</p>
    <h3>Funciona melhor com</h3>
    <p>Gravações de voz, aulas, entrevistas e áudios longos. Em música ele também cortaria introduções e finais suaves, então normalmente não é o que você quer para músicas.</p>
    <h3>Tem barulho no ambiente?</h3>
    <p>Se tem ventilador ou trânsito no fundo, as pausas não ficam realmente em silêncio. Ative também <strong>Remover ruído com IA</strong>, ou use o <a href="/pt-br/remover-ruido/">removedor de ruído com IA</a>, que já vem com isso ligado.</p>`,
    faq: [
      ['Ele corta as pausas entre as palavras?', 'Não. Só tira os silêncios de mais de uns 0,8 segundo.'],
      ['Por que nada foi removido?', 'Provavelmente as pausas têm ruído de fundo. Ative Remover ruído com IA ou Reduzir chiado e tente de novo.'],
    ],
  },
  {
    key: 'fade', path: 'pt-br/fade-in-fade-out', tool: 'cutter', crumb: 'Tools', fx: { fadeIn: 3, fadeOut: 3 }, suffix: ' (com fade)',
    note: 'Um fade in e um fade out de 3 segundos já estão prontos. Escolha um trecho se quiser e aperte Tocar com efeitos.',
    title: `Colocar fade in e fade out em MP3 online grátis | ${NAME}`,
    description: 'Coloque um fade in e um fade out suaves em qualquer música ou gravação. Escolha a duração, corte se quiser, ouça e baixe. Grátis e sem upload.',
    h1: 'Colocar <em>fade in</em> e <em>fade out</em>',
    lead: 'Dê a uma música ou trecho um começo e um fim suaves em vez de um corte seco. Escolha a duração do fade e ouça antes de salvar.',
    badges: ['De 0 a 10 segundos', 'Corta também', 'MP3, WAV, FLAC'],
    steps: [
      ['Abra seu arquivo', 'Qualquer música, gravação ou vídeo.'],
      ['Ajuste os fades', '3 segundos em cada um já vêm prontos. Mude em Efeitos e aperte Tocar com efeitos.'],
      ['Baixe', 'Aperte Converter e depois Baixar.'],
    ],
    content: `
    <h2>Quando um fade ajuda</h2>
    <p>Um fade faz a música começar e terminar com suavidade. Serve para toques de celular, música de fundo em vídeos, um trecho cortado de uma música mais longa ou uma apresentação que acaba antes da música.</p>
    <h3>Quanto tempo deve ter?</h3>
    <p>Para um toque ou um trecho curto, <strong>de 1 a 2 segundos</strong>. Para música de fundo ou o fim de uma música, <strong>de 3 a 6 segundos</strong>. O ${NAME} nunca deixa um fade passar de um quarto do trecho, assim trechos curtos continuam audíveis.</p>
    <h3>Fade só em uma ponta</h3>
    <p>Coloque o outro controle em <em>não</em>. Para um toque com fades, o <a href="/pt-br/criar-toque/">criador de toques</a> já vem com eles prontos.</p>`,
    faq: [
      ['Posso colocar fade só em um trecho da música?', 'Sim. Arraste sobre a onda para escolher o trecho. Os fades entram no começo e no fim da sua seleção.'],
      ['A qualidade cai?', 'Escolha WAV ou FLAC para não perder nada, ou MP3 a 320 kbps para ficar bem parecido com o original.'],
    ],
  },
];
