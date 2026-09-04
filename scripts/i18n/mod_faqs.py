# -*- coding: utf-8 -*-
"""
Module: Complete FAQ translations for wheel, picker, age, birthday, countdown, nameMeaning, and nameDetail across en, pt, id, ar.
"""

FAQS_DATA = {
    'en': {
        'title': 'Frequently Asked Questions',
        'description': 'Everything you need to know about how this tool works.',
        'answersCount': '8 Answers',
        'quickNav': 'Quick Navigation — Common Questions',
        'wheel': [
            {
                'q': 'Is the wheel spinner truly random and mathematically fair?',
                'a': 'Yes. The wheel uses cryptographically secure browser randomness to generate the initial spin velocity and duration. Each slice has an equal geometric angle and mathematical probability of winning.'
            },
            {
                'q': 'Can AI automatically generate custom options for the wheel?',
                'a': 'Yes! ToolNest features an AI preset generator powered by Google Gemini. Simply describe your dilemma (like "dinner ideas" or "party games"), and the AI will generate balanced options in seconds.'
            },
            {
                'q': 'Can I use this as a Wheel of Names alternative or prize wheel online?',
                'a': 'Absolutely. ToolNest serves as a clean, ad-free Wheel of Names alternative and interactive prize wheel for classrooms, online giveaways, team standups, and game nights.'
            },
            {
                'q': 'How do I set up a yes or no wheel or dinner decider?',
                'a': 'You can quickly set up a yes or no wheel by entering two options: "Yes" and "No". For a dinner decider, use our preset or paste your favorite local restaurants.'
            },
            {
                'q': 'How does the wheel physics deceleration simulation work?',
                'a': 'The wheel runs a custom canvas physics engine using quadratic bezier drag deceleration curves rendered at 60 FPS, mimicking the natural friction of a mechanical carnival wheel.'
            },
            {
                'q': 'Can I share my custom decision wheel configuration with a link?',
                'a': 'Yes! Your options are encoded directly into the URL parameters in real time. Tapping "Share Wheel" copies a unique link that friends or coworkers can open to spin the exact same choices.'
            },
            {
                'q': 'How many options can I put on the wheel generator?',
                'a': 'You can configure between 2 and 12 options. Setting a 12-item maximum ensures high slice readability, sharp canvas rendering, and distinct color contrast on mobile screens.'
            },
            {
                'q': 'Can I remove the winning choice after each spin?',
                'a': 'Yes. When the victory celebration modal pops up, you can click "Remove Winner". The chosen slice is removed and the wheel instantly recalculates remaining angles.'
            }
        ],
        'picker': [
            {
                'q': 'Is this random name picker truly fair and cryptographically unbiased?',
                'a': 'Unlike standard randomizers relying on Math.random, ToolNest utilizes the browser Cryptographic API (crypto.getRandomValues) combined with unbiased Fisher-Yates shuffling to ensure verifiable statistical fairness.'
            },
            {
                'q': 'How do I use this tool as a random team picker or group generator?',
                'a': 'To split names into random teams, first tap "Shuffle List" to completely randomize the roster order, then distribute names sequentially into your desired squad sizes.'
            },
            {
                'q': 'Can I draw multiple unique giveaway winners at the same time?',
                'a': 'Yes! Use the winner stepper to draw between 1 and 10 winners simultaneously. The selection algorithm guarantees no duplicate winners when replacement is disabled.'
            },
            {
                'q': 'What is the difference between crypto.getRandomValues and Math.random?',
                'a': 'Math.random uses a pseudo-random number generator (PRNG) with predictable internal seed states. crypto.getRandomValues taps into OS hardware entropy, making it suitable for audited contests.'
            },
            {
                'q': 'Can I automatically eliminate winners after each raffle draw round?',
                'a': 'Yes. Toggle the "Remove winners after pick" switch above the button. Whenever a winner is drawn, their entry is excised from the list, allowing seamless multi-round raffles.'
            },
            {
                'q': 'Does ToolNest store or upload my student or giveaway roster?',
                'a': 'No. Your list never leaves your local browser memory. Text parsing, duplicate cleaning, and winner selection run 100% locally with zero server transmissions.'
            },
            {
                'q': 'What types of lists can I paste into the list randomizer?',
                'a': 'You can paste any list separated by line breaks, commas, or semicolons. The parser automatically trims excess whitespace and filters out empty lines.'
            },
            {
                'q': 'Can I filter duplicate names before drawing winners?',
                'a': 'Yes! The tool automatically scans your list for repeated entries and displays a duplicate warning banner with a one-click "Remove Duplicates" action.'
            }
        ],
        'age': [
            {
                'q': 'How old am I today in years, months, and days?',
                'a': 'Your exact age is the precise count of completed calendar years, remaining whole months, and remaining days since your date of birth, calculated using UTC date boundaries.'
            },
            {
                'q': 'How does an age calculator by date of birth calculate my age?',
                'a': 'To calculate your age accurately, the algorithm tallies completed calendar years, evaluates remaining months by checking actual calendar days per month, and adds remaining days.'
            },
            {
                'q': 'When is my half birthday and does this tool include a half birthday calculator?',
                'a': 'Yes! ToolNest functions as an automatic half birthday calculator. Your half birthday occurs exactly six calendar months after your birth date (or approximately 182.5 days).'
            },
            {
                'q': 'Why does my age in days/months differ between online calculators?',
                'a': 'Many basic calculators divide total elapsed days by 365 or 30.4375, introducing noticeable rounding errors. ToolNest uses exact Gregorian calendar month-lengths and leap years.'
            },
            {
                'q': 'Can I calculate how old I was on a specific past date?',
                'a': 'Yes! Expand the "Calculate age at a specific date" panel beneath the birth date inputs. Choose any historical date to determine your exact age on that milestone day.'
            },
            {
                'q': 'How are leap years and February 29th birthdays handled?',
                'a': 'For individuals born on February 29th, the algorithm accurately attributes 29 days in leap years. During non-leap years, common law observes the anniversary on March 1st.'
            },
            {
                'q': 'Does ToolNest store or transmit my birth date to a server?',
                'a': 'No. ToolNest operates with zero servers, zero analytics databases, and zero tracking cookies. Every single calculation runs locally in your browser memory.'
            },
            {
                'q': 'How accurate is the live seconds and heartbeat tracker?',
                'a': 'The live seconds ticker increments in real time using the high-precision browser clock. Estimated heartbeats (resting average 70 BPM) and breaths (16/min) provide engaging statistical projections.'
            }
        ],
        'birthday': [
            {
                'q': 'What day of the week was I born on and how is it verified?',
                'a': 'Your birth weekday is determined by calculating the elapsed days under the Gregorian calendar from an established epoch reference, correctly accounting for every historical leap year.'
            },
            {
                'q': 'How do I find my zodiac sign by birthday and what does its element mean?',
                'a': 'Your Western zodiac sun sign is established by the apparent position of the Sun across twelve 30-degree celestial sectors. Each sign corresponds to one of four classical elements: Fire, Earth, Air, or Water.'
            },
            {
                'q': 'What does my birthstone by month and birth flower symbolize?',
                'a': 'Birthstones are historically attributed gemstones standardized in 1912 by the National Association of Jewelers, and birth flowers date back to Roman floriography traditions symbolizing personal virtues.'
            },
            {
                'q': 'What is a golden birthday meaning and when does it happen?',
                'a': 'A golden birthday (also known as a lucky or champagne birthday) occurs when you turn the exact age matching your day of birth—such as turning 25 on the 25th of the month.'
            },
            {
                'q': 'What is my numerology life path number and how is it calculated?',
                'a': 'Your life path number is derived by reducing each component of your birth date (month, day, and year) to single digits (or master numbers 11, 22, 33), revealing your core archetypal personality.'
            },
            {
                'q': 'When is my half birthday and why do people celebrate it?',
                'a': 'Your half birthday occurs exactly six calendar months after your birth date. Many celebrate it for children with holiday-adjacent birthdays or as an enjoyable midpoint celebration.'
            },
            {
                'q': 'How are generational cohorts like Gen Z and Millennials determined?',
                'a': 'Generational cohorts are mapped based on demographic frameworks established by the Pew Research Center, linking birth year spans to formative historical and technological milestones.'
            },
            {
                'q': 'Can I download and share my birthday facts card?',
                'a': 'Yes! ToolNest generates a high-resolution PNG sticker card directly in your browser without sending any images or personal dates to an external server. You can save or share it instantly.'
            }
        ],
        'countdown': [
            {
                'q': 'Is this countdown timer online free and account-free?',
                'a': 'Yes, 100% free with no account creation, email sign-ups, or passwords required. You can build, customize, and share unlimited live countdown timers instantly.'
            },
            {
                'q': 'Can I use this as a days until calculator or live New Year countdown?',
                'a': 'Absolutely! You can choose our one-click presets for New Year, Christmas, summer solstice, or enter any custom target date to calculate exact days, hours, and minutes remaining.'
            },
            {
                'q': 'Where is my countdown timer stored and how does the share link work?',
                'a': 'Your timer data (title, ISO timestamp, and emoji) is encoded directly into the shareable link using URL-safe Base64URL encoding. There are zero database records or server lookups.'
            },
            {
                'q': 'How do I share a countdown link across WhatsApp, Instagram, or Discord?',
                'a': 'Click "Copy Link" or use our dedicated share buttons. On mobile devices, tap "Share Sticker" to generate a downloadable high-resolution PNG card perfect for stories and chats.'
            },
            {
                'q': 'How does the countdown handle friends in different time zones?',
                'a': 'Dates are serialized in universal ISO-8601 UTC format. When recipients open your link, their browser calculates the exact remaining time according to their local clock, keeping the countdown in perfect sync.'
            },
            {
                'q': 'What happens when the countdown clock reaches zero?',
                'a': 'The live clock automatically transitions into a celebratory mode with victory animations, confetti visuals, and an elapsed time counter showing how long ago the milestone occurred.'
            },
            {
                'q': 'Can I set an exact target hour and minute for my event countdown?',
                'a': 'Yes! The datetime picker supports exact precision down to the minute, allowing you to track project deadlines, flight departures, and product launches with complete accuracy.'
            },
            {
                'q': 'Can I embed or view the timer full screen for livestreams?',
                'a': 'Yes! The shareable event viewer at /countdown/view provides a clean, responsive interface optimized for desktop presentation, OBS overlays, and browser window capture.'
            }
        ],
        'nameMeaning': [
            {
                'q': 'What does my name mean and how is its origin determined?',
                'a': 'A name meaning reflects its etymological root word in ancient languages such as Hebrew, Latin, Greek, Old Norse, Celtic, or Arabic. ToolNest matches your query against historical linguistic dictionaries.'
            },
            {
                'q': 'Can I look up any unique or rare name with the name origin finder?',
                'a': 'Yes! In addition to our curated 200+ database of traditional and modern names, ToolNest features an AI-assisted analysis engine powered by Google Gemini to analyze any rare or international name.'
            },
            {
                'q': 'Can I find names that mean specific virtues like light, love, or strength?',
                'a': 'Yes! Many classical and modern names embody specific virtues. For example, names meaning light include Lucia, Elena, and Aaron; names meaning strength include Ethan and Audrey; and names meaning love include Amara and David.'
            },
            {
                'q': 'How accurate are the AI name meanings and personality insights?',
                'a': 'Curated name dossiers are verified against historical lexical records and government birth statistics. AI-generated interpretations draw from global cultural motifs and phonetic rhythm analysis.'
            },
            {
                'q': 'How does the search determine static vs. AI results?',
                'a': 'When you submit a name, ToolNest instantly checks if it exists in our curated directory. If matched, you are routed directly to the full static dossier. Otherwise, our AI engine generates instant insights on the page.'
            },
            {
                'q': 'Is my name search private and completely free?',
                'a': 'Yes, 100% free with zero tracking cookies and zero user account requirements. Searches execute on-demand, and your recent search history is preserved solely in your local browser storage.'
            },
            {
                'q': 'What linguistic traditions are included in the name database?',
                'a': 'Our curated database encompasses Latin, Germanic, Greek, Hebrew, Celtic, Old Norse, Slavic, Sanskrit, Japanese, and Yoruba traditions, showcasing global naming customs.'
            },
            {
                'q': 'Can I view most popular names filtered by letter or gender?',
                'a': 'Yes! Visit our full Names Directory at /names/ to explore all 200+ profiles filtered alphabetically from A to Z, by gender (boy, girl, unisex), cultural origin, and popularity tiers.'
            }
        ],
        'nameDetail': {
            'q1': 'What does the name {name} mean?',
            'a1': 'The name {name} is of {origin} origin and traditionally signifies "{meaning}".',
            'q2': 'How popular is the name {name} today?',
            'a2': '{name} currently holds a {popularity} popularity rating among contemporary baby names worldwide.',
            'q3': 'Want deeper insights? Unlock AI analysis of any name',
            'a3': 'You can click the "Unlock AI Insights" button on this page to generate rich, personalized interpretations—including personality traits, psychological archetypes, style classification, and unique historical fun facts powered by Google Gemini.'
        }
    },
    'pt': {
        'title': 'Perguntas Frequentes',
        'description': 'Tudo o que você precisa saber sobre o funcionamento desta ferramenta.',
        'answersCount': '8 Respostas',
        'quickNav': 'Navegação Rápida — Perguntas Frequentes',
        'wheel': [
            {
                'q': 'A roleta de decisões é realmente aleatória e matematicamente justa?',
                'a': 'Sim. A roleta utiliza a API de criptografia do navegador para gerar a velocidade inicial do giro e a duração. Cada fatia possui ângulo geométrico idêntico e probabilidade matemática igual de ser sorteada.'
            },
            {
                'q': 'A inteligência artificial pode sugerir opções personalizadas para a roleta?',
                'a': 'Sim! O ToolNest conta com um gerador inteligente com Google Gemini. Basta descrever seu dilema (como "onde jantar" ou "brincadeiras para festa") e a IA cria opções equilibradas em instantes.'
            },
            {
                'q': 'Posso usar esta roleta como alternativa ao Wheel of Names ou para sorteios?',
                'a': 'Com certeza. O ToolNest é uma alternativa leve, moderna e sem anúncios intrusivos ao Wheel of Names, perfeita para salas de aula, sorteios online, dinâmicas de equipe e noites de jogos.'
            },
            {
                'q': 'Como criar uma roleta de Sim ou Não ou escolher o que comer?',
                'a': 'Basta inserir duas opções simples: "Sim" e "Não". Para decidir o jantar, você pode carregar nosso modelo pronto de restaurantes ou digitar seus pratos favoritos.'
            },
            {
                'q': 'Como funciona a física de desaceleração da roleta?',
                'a': 'A roleta roda um motor gráfico próprio em Canvas a 60 FPS com curvas de amortecimento Bezier, simulando a inércia e o atrito real de uma roleta mecânica de parque de diversões.'
            },
            {
                'q': 'Posso compartilhar minha roleta personalizada através de um link?',
                'a': 'Sim! Suas opções são salvas diretamente nos parâmetros do link em tempo real. Ao clicar em "Compartilhar Roleta", você gera um link para seus amigos abrirem exatamente a mesma configuração.'
            },
            {
                'q': 'Quantas opções posso colocar na roleta?',
                'a': 'Você pode adicionar de 2 a 12 opções. O limite de 12 itens garante máxima legibilidade do texto, renderização nítida e contraste de cores perfeito em telas de celulares.'
            },
            {
                'q': 'Posso eliminar a opção vencedora após cada giro?',
                'a': 'Sim. Quando o aviso de vitória surgir na tela, basta clicar em "Remover Vencedor". A fatia sorteada é retirada e a roleta recalcula os ângulos restantes na hora.'
            }
        ],
        'picker': [
            {
                'q': 'Este sorteador de nomes é realmente justo e livre de viés?',
                'a': 'Diferente de sorteadores comuns que usam Math.random previsível, o ToolNest utiliza a API Cryptographic do navegador (crypto.getRandomValues) e o algoritmo Fisher-Yates para garantir imparcialidade matemática comprovada.'
            },
            {
                'q': 'Como uso este sorteador para dividir grupos e equipes?',
                'a': 'Para sortear times, clique primeiro em "Embaralhar Lista" para randomizar a ordem dos nomes e depois distribua os participantes sequencialmente nos grupos desejados.'
            },
            {
                'q': 'Posso sortear vários ganhadores de uma só vez para um sorteio?',
                'a': 'Sim! Ajuste o seletor de ganhadores para sortear de 1 a 10 nomes simultaneamente. O algoritmo garante que nenhum nome seja repetido quando a repetição estiver desmarcada.'
            },
            {
                'q': 'Qual a diferença entre crypto.getRandomValues e Math.random?',
                'a': 'O Math.random utiliza geradores pseudoaleatórios com sementes previsíveis. O crypto.getRandomValues utiliza a entropia do sistema operacional do seu dispositivo, sendo ideal para concursos e sorteios auditáveis.'
            },
            {
                'q': 'Posso eliminar os ganhadores sorteados a cada rodada?',
                'a': 'Sim. Ative a chave "Remover ganhadores após o sorteio". A cada rodada, o nome premiado é retirado da lista principal automaticamente, permitindo várias rodadas sem duplicidade.'
            },
            {
                'q': 'O ToolNest salva ou envia minha lista de nomes para algum servidor?',
                'a': 'Não. Sua lista nunca sai da memória do seu navegador. Toda a leitura, remoção de duplicados e o sorteio acontecem 100% no seu dispositivo com total sigilo.'
            },
            {
                'q': 'Que formato de lista posso colar no sorteador?',
                'a': 'Você pode colar listas com nomes separados por quebra de linha, vírgulas ou ponto e vírgula. O sistema limpa espaços extras e linhas vazias automaticamente.'
            },
            {
                'q': 'É possível filtrar nomes repetidos antes de realizar o sorteio?',
                'a': 'Sim! A ferramenta analisa a lista instantaneamente, exibe um alerta caso encontre nomes repetidos e oferece um botão para "Remover Duplicados" com apenas um clique.'
            }
        ],
        'age': [
            {
                'q': 'Quantos anos, meses e dias eu tenho hoje exatamente?',
                'a': 'Sua idade exata corresponde ao número de anos civis completos, meses restantes e dias exatos desde o seu nascimento, calculados com base em datas UTC para evitar distorções de fuso horário.'
            },
            {
                'q': 'Como a calculadora de idade calcula o tempo de vida com precisão?',
                'a': 'Para garantir exatidão, o algoritmo computa os anos completos, avalia a quantidade exata de dias em cada mês individual do calendário e soma os dias restantes sem arredondamentos.'
            },
            {
                'q': 'Quando comemoro meu meio aniversário e a ferramenta calcula isso?',
                'a': 'Sim! O ToolNest inclui uma calculadora automática de meio aniversário. Ele ocorre exatamente seis meses após o seu aniversário (ou cerca de 182,5 dias).'
            },
            {
                'q': 'Por que minha idade em dias ou meses varia entre calculadoras online?',
                'a': 'Muitas calculadoras simples dividem o total de dias por 365 ou 30,4375 gerando erros. O ToolNest calcula mês a mês com base no calendário gregoriano real e anos bissextos.'
            },
            {
                'q': 'Posso calcular a idade que eu tinha em uma data específica do passado?',
                'a': 'Sim! Abra a opção "Calcular idade em uma data específica" logo abaixo dos campos de data. Escolha qualquer data histórica para saber sua idade exata naquele momento.'
            },
            {
                'q': 'Como são calculados os anos bissextos e quem nasceu em 29 de fevereiro?',
                'a': 'Para quem nasceu em 29 de fevereiro, o sistema computa o dia 29 nos anos bissextos e, em anos comuns, adota o padrão legal convencional comemorado em 1º de março.'
            },
            {
                'q': 'O ToolNest armazena ou envia minha data de nascimento para servidores?',
                'a': 'Não. O ToolNest funciona sem servidores de banco de dados, sem cadastros e sem cookies de rastreamento. Cada cálculo é executado localmente na memória do seu navegador.'
            },
            {
                'q': 'Qual a precisão do contador de segundos e batimentos cardíacos?',
                'a': 'O contador de segundos atualiza em tempo real com o relógio de alta precisão do navegador. As estimativas de batimentos (média de 70 BPM) e respirações (16/min) oferecem projeções estatísticas fascinantes.'
            }
        ],
        'birthday': [
            {
                'q': 'Em qual dia da semana eu nasci e como isso é verificado?',
                'a': 'O dia da semana do seu nascimento é determinado pelo cômputo exato de dias transcorridos pelo calendário gregoriano a partir de uma data de referência, considerando todos os anos bissextos.'
            },
            {
                'q': 'Como descubro meu signo do zodíaco e o que significa seu elemento?',
                'a': 'Seu signo solar ocidental é definido pela posição aparente do Sol entre as doze constelações de 30 graus. Cada signo é associado a um elemento clássico: Fogo, Terra, Ar ou Água.'
            },
            {
                'q': 'O que simbolizam a minha pedra do mês e a minha flor de nascimento?',
                'a': 'As pedras de nascimento foram padronizadas em 1912 pela Associação Nacional de Joalheiros, e as flores de nascimento seguem tradições históricas que atribuem virtudes e significados afetivos a cada mês.'
            },
            {
                'q': 'O que significa o aniversário de ouro e quando ele acontece?',
                'a': 'O aniversário de ouro (ou aniversário de champanhe) ocorre quando você completa a idade exata correspondente ao dia do seu nascimento — por exemplo, fazer 25 anos no dia 25 do mês.'
            },
            {
                'q': 'O que é o número do caminho de vida na numerologia e como calculá-lo?',
                'a': 'O caminho de vida é obtido somando e reduzindo os dígitos do dia, mês e ano de nascimento a um único algarismo (ou números mestres 11, 22, 33), revelando traços da sua personalidade arquetípica.'
            },
            {
                'q': 'Quando é o meu meio aniversário e por que as pessoas comemoram?',
                'a': 'Seu meio aniversário ocorre seis meses exatos após o seu aniversário. É uma data muito comemorada para crianças ou por quem faz aniversário perto de datas festivas de fim de ano.'
            },
            {
                'q': 'Como são definidas as gerações como Geração Z e Millennials?',
                'a': 'As faixas geracionais são mapeadas com base nos parâmetros demográficos consagrados pelo Pew Research Center, relacionando os anos de nascimento a marcos históricos e tecnológicos.'
            },
            {
                'q': 'Posso baixar e compartilhar o cartão com os fatos do meu aniversário?',
                'a': 'Sim! O ToolNest gera um cartão adesivo em alta resolução (PNG) direto no navegador sem enviar nenhuma imagem a servidores externos. Você pode salvar ou compartilhar na hora.'
            }
        ],
        'countdown': [
            {
                'q': 'Este cronômetro de contagem regressiva é gratuito e sem cadastro?',
                'a': 'Sim, 100% gratuito, sem exigir cadastro, e-mail ou senhas. Você pode criar, personalizar e compartilhar quantas contagens regressivas desejar em segundos.'
            },
            {
                'q': 'Posso usar como calculadora de quantos dias faltam para o Ano Novo ou férias?',
                'a': 'Com certeza! Você pode utilizar nossos modelos prontos para Ano Novo, Natal, férias ou inserir qualquer data futura para acompanhar dias, horas e minutos restantes.'
            },
            {
                'q': 'Onde fica salva a minha contagem regressiva e como funciona o link?',
                'a': 'Os dados do seu evento (título, data e emoji) são gravados diretamente no próprio link usando codificação URL Base64URL segura, sem depender de banco de dados central.'
            },
            {
                'q': 'Como compartilho o link da contagem no WhatsApp, Instagram ou Discord?',
                'a': 'Basta clicar em "Copiar Link" ou usar os botões de compartilhamento direto. No celular, você também pode baixar um cartão adesivo em imagem PNG pronto para stories e status.'
            },
            {
                'q': 'Como a contagem lida com amigos que estão em fusos horários diferentes?',
                'a': 'As datas são padronizadas no padrão universal UTC (ISO-8601). Quando alguém abre o link em outro país, o navegador ajusta o fuso automaticamente, garantindo sincronia perfeita.'
            },
            {
                'q': 'O que acontece quando o relógio da contagem chega a zero?',
                'a': 'O cronômetro entra instantaneamente em modo de comemoração com animações festivas, confetes digitais e passa a mostrar há quanto tempo o marco histórico foi atingido.'
            },
            {
                'q': 'Posso definir a hora e o minuto exatos para o evento?',
                'a': 'Sim! O seletor de data e hora permite definir o horário exato até os minutos, ideal para lançamentos de produtos, horários de voos, provas e festas de aniversário.'
            },
            {
                'q': 'Posso exibir o cronômetro em tela cheia para transmissões ao vivo?',
                'a': 'Sim! A página de visualização em /countdown/view oferece uma interface limpa e elegante, perfeita para janelas de transmissão no OBS, telões e apresentações.'
            }
        ],
        'nameMeaning': [
            {
                'q': 'O que significa meu nome e como a origem dele é determinada?',
                'a': 'O significado de um nome reflete sua raiz etimológica em idiomas ancestrais como hebraico, latim, grego, nórdico antigo, celta ou árabe, comparado a dicionários onomásticos históricos.'
            },
            {
                'q': 'Posso consultar nomes raros ou internacionais no localizador de origens?',
                'a': 'Sim! Além do nosso catálogo com mais de 200 nomes consagrados, o ToolNest conta com inteligência artificial via Google Gemini para analisar qualquer nome raro ou personalizado.'
            },
            {
                'q': 'É possível encontrar nomes que significam virtudes como luz, amor ou força?',
                'a': 'Sim! Muitos nomes clássicos trazem virtudes: nomes que significam luz incluem Lúcia, Helena e Aaron; nomes associados a força incluem Gabriel e Valéria; e nomes que remetem a amor incluem Amara e Davi.'
            },
            {
                'q': 'Qual o nível de precisão dos significados e traços de personalidade da IA?',
                'a': 'Os nomes do catálogo fixo são verificados com base em registros históricos e etimológicos. As interpretações da IA combinam simbolismos culturais globais e cadência fonética.'
            },
            {
                'q': 'Como a busca decide entre exibir o dossiê fixo ou gerar com IA?',
                'a': 'Ao digitar um nome, o sistema verifica se ele já existe em nosso diretório curado. Em caso positivo, direciona para o dossiê completo. Caso contrário, a IA gera a análise na própria página.'
            },
            {
                'q': 'Minha pesquisa de nomes é privada e 100% gratuita?',
                'a': 'Sim, totalmente gratuita, sem cookies invasivos e sem necessidade de criar conta. As buscas acontecem sob demanda e seu histórico recente fica apenas no seu navegador.'
            },
            {
                'q': 'Quais tradições linguísticas estão contempladas no acervo de nomes?',
                'a': 'Nosso banco de dados reúne origens do latim, germânico, grego, hebraico, celta, nórdico, eslavo, sânscrito, iorubá e japonês, refletindo a rica diversidade cultural dos nomes.'
            },
            {
                'q': 'Posso ver os nomes mais populares filtrados por letra ou gênero?',
                'a': 'Sim! Acesse nosso Diretório de Nomes em /names/ para navegar por mais de 200 perfis ordenados de A a Z, filtrando por gênero (menino, menina, unissex) e popularidade.'
            }
        ],
        'nameDetail': {
            'q1': 'Qual é o significado do nome {name}?',
            'a1': 'O nome {name} possui origem no idioma {origin} e tradicionalmente simboliza "{meaning}".',
            'q2': 'Qual é a popularidade do nome {name} nos dias de hoje?',
            'a2': 'O nome {name} apresenta atualmente um nível de popularidade {popularity} entre os nomes de bebês no Brasil e no mundo.',
            'q3': 'Quer saber mais? Descubra análises de IA para qualquer nome',
            'a3': 'Você pode clicar no botão "Liberar Análise com IA" nesta página para gerar interpretações personalizadas — incluindo traços de personalidade, estilo e curiosidades históricas com Google Gemini.'
        }
    },
    'id': {
        'title': 'Pertanyaan yang Sering Diajukan',
        'description': 'Semua yang perlu kamu ketahui tentang cara kerja alat ini.',
        'answersCount': '8 Jawaban',
        'quickNav': 'Navigasi Cepat — Pertanyaan Umum',
        'wheel': [
            {
                'q': 'Apakah putaran roda ini benar-benar acak dan adil secara matematis?',
                'a': 'Ya. Roda menggunakan API kriptografi bawaan peramban untuk menentukan kecepatan awal dan durasi putaran. Setiap juring memiliki sudut dan peluang menang yang sama besar.'
            },
            {
                'q': 'Bisakah AI membuatkan pilihan khusus untuk roda secara otomatis?',
                'a': 'Bisa! ToolNest dilengkapi generator AI berbasis Google Gemini. Cukup ceritakan dilemamu (seperti "menu makan siang" atau "ide game seru"), dan AI akan menyusun opsi pilihan dalam sekejap.'
            },
            {
                'q': 'Bisakah ini digunakan sebagai alternatif Wheel of Names atau roda hadiah?',
                'a': 'Tentu saja. ToolNest adalah alternatif Wheel of Names yang bersih, modern, dan bebas iklan mengganggu untuk guru di kelas, undian giveaway online, atau rapat tim.'
            },
            {
                'q': 'Bagaimana cara membuat roda Ya atau Tidak atau penentu makan malam?',
                'a': 'Cukup masukkan dua pilihan: "Ya" dan "Tidak". Untuk memilih makan malam, kamu bisa memilih template siap pakai kami atau mengetik restoran favoritmu.'
            },
            {
                'q': 'Bagaimana cara kerja simulasi fisika perlambatan roda?',
                'a': 'Roda dijalankan dengan mesin grafis Canvas 60 FPS menggunakan kurva gesekan Bezier kuadratik, meniru putaran dan deselerasi alami roda karnaval mekanis.'
            },
            {
                'q': 'Bisakah saya membagikan setelan roda keputusan saya lewat tautan?',
                'a': 'Ya! Semua pilihan tersimpan langsung di parameter URL secara real-time. Klik "Bagikan Roda" untuk menyalin tautan sehingga temanmu dapat memutar pilihan yang sama persis.'
            },
            {
                'q': 'Berapa banyak pilihan yang bisa dimasukkan ke dalam roda?',
                'a': 'Kamu dapat memasukkan antara 2 hingga 12 opsi. Batas 12 pilihan menjaga teks tetap mudah dibaca dan warna tetap tajam di layar ponsel.'
            },
            {
                'q': 'Bisakah saya menghapus opsi yang menang setelah diputar?',
                'a': 'Bisa. Saat jendela perayaan kemenangan muncul, klik "Hapus Pemenang". Opsi yang terpilih akan langsung dihapus dan roda mengatur ulang sudut bagian lainnya.'
            }
        ],
        'picker': [
            {
                'q': 'Apakah pengacak nama ini benar-benar adil dan tanpa rekayasa?',
                'a': 'Berbeda dari pengacak standar yang memakai Math.random terduga, ToolNest memanfaatkan API Kriptografi peramban (crypto.getRandomValues) dipadu algoritma Fisher-Yates untuk keadilan statistik mutlak.'
            },
            {
                'q': 'Bagaimana cara menggunakan alat ini untuk membagi kelompok atau tim?',
                'a': 'Untuk membagi tim, klik "Acak Daftar" terlebih dahulu untuk mengacak urutan nama secara total, lalu bagi nama-nama tersebut sesuai jumlah regu yang diinginkan.'
            },
            {
                'q': 'Bisakah saya mengundi beberapa pemenang giveaway sekaligus?',
                'a': 'Bisa! Atur jumlah pemenang antara 1 hingga 10 nama sekaligus. Algoritma memastikan tidak ada nama pemenang ganda jika opsi pengulangan dimatikan.'
            },
            {
                'q': 'Apa perbedaan antara crypto.getRandomValues dan Math.random?',
                'a': 'Math.random menggunakan generator angka semu (PRNG) dengan pola internal yang bisa diprediksi. crypto.getRandomValues mengakses entropi sistem operasi perangkatmu, sangat aman untuk undian resmi.'
            },
            {
                'q': 'Bisakah nama pemenang langsung dihapus setelah diundi?',
                'a': 'Bisa. Aktifkan opsi "Hapus pemenang setelah terpilih". Setiap kali nama terpilih keluar, namanya langsung dihapus dari daftar sehingga undian beberapa babak berjalan praktis.'
            },
            {
                'q': 'Apakah ToolNest menyimpan atau mengunggah daftar nama saya ke server?',
                'a': 'Tidak. Daftar namamu tidak pernah keluar dari memori peramban. Semua pemilahan teks, penghapusan duplikat, dan pengundian berjalan 100% lokal di perangkatmu.'
            },
            {
                'q': 'Format daftar apa saja yang bisa ditempelkan ke pengacak ini?',
                'a': 'Kamu bisa menempelkan daftar nama yang dipisahkan baris baru, koma, atau titik koma. Sistem otomatis merapikan spasi dan mengabaikan baris kosong.'
            },
            {
                'q': 'Bisakah saya menyaring nama yang ganda sebelum mengundi?',
                'a': 'Bisa! Alat ini otomatis mendeteksi nama ganda dan menampilkan tombol praktis "Hapus Duplikat" dalam sekali klik.'
            }
        ],
        'age': [
            {
                'q': 'Berapa usia saya hari ini dalam tahun, bulan, dan hari secara tepat?',
                'a': 'Usia tepatmu dihitung berdasarkan tahun kalender penuh, sisa bulan kalender, dan sisa hari sejak tanggal lahirmu menggunakan acuan waktu UTC tanpa distorsi zona waktu.'
            },
            {
                'q': 'Bagaimana kalkulator tanggal lahir ini menghitung usia saya dengan tepat?',
                'a': 'Algoritma menghitung tahun yang telah genap, mencocokkan jumlah hari aktual pada setiap bulan kalender masehi, dan menjumlahkan sisa hari tanpa pembulatan kasar.'
            },
            {
                'q': 'Kapan setengah ulang tahun saya dan apakah alat ini menghitungnya?',
                'a': 'Ya! ToolNest secara otomatis menghitung setengah ulang tahun (half birthday) kamu, yaitu tepat 6 bulan setelah tanggal lahirmu (atau sekitar 182,5 hari).'
            },
            {
                'q': 'Mengapa hitungan hari atau bulan bisa berbeda antar kalkulator online?',
                'a': 'Banyak kalkulator sederhana membagi total hari dengan 365 atau 30,4375 sehingga menimbulkan selisih. ToolNest menghitung hari riil pada kalender Gregorian dan tahun kabisat.'
            },
            {
                'q': 'Bisakah saya menghitung usia saya pada tanggal tertentu di masa lalu?',
                'a': 'Bisa! Buka opsi "Hitung usia pada tanggal tertentu" di bawah kolom tanggal lahir. Pilih tanggal bersejarah mana pun untuk mengetahui usiamu saat itu.'
            },
            {
                'q': 'Bagaimana perhitungan untuk tahun kabisat dan yang lahir pada 29 Februari?',
                'a': 'Bagi yang lahir pada 29 Februari, sistem mencatat 29 hari pada tahun kabisat, sedangkan pada tahun biasa dihitung genap pada 1 Maret sesuai konvensi hukum umum.'
            },
            {
                'q': 'Apakah ToolNest menyimpan data tanggal lahir saya ke server?',
                'a': 'Tidak. ToolNest berjalan tanpa server database, tanpa login, dan tanpa cookie pelacak. Seluruh kalkulasi diproses lokal di memori perambanmu.'
            },
            {
                'q': 'Seberapa akurat penghitung detik langsung dan detak jantung?',
                'a': 'Penghitung detik berjalan langsung sesuai jam presisi perambanmu. Estimasi detak jantung (rata-rata 70 BPM) dan tarikan napas (16/menit) menyajikan statistik hidup yang memukau.'
            }
        ],
        'birthday': [
            {
                'q': 'Pada hari apa dalam seminggu saya lahir dan bagaimana cara memastikannya?',
                'a': 'Hari kelahiranmu ditentukan melalui perhitungan hari kalender Gregorian dari titik acuan standar dengan memperhitungkan seluruh tahun kabisat secara matematis.'
            },
            {
                'q': 'Bagaimana cara mengetahui zodiak saya dan apa arti elemennya?',
                'a': 'Zodiak matahari barat ditentukan oleh posisi Matahari melintasi 12 rasi 30 derajat. Setiap zodiak mewakili salah satu dari empat elemen: Api, Tanah, Udara, atau Air.'
            },
            {
                'q': 'Apa makna batu kelahiran bulanan dan bunga kelahiran saya?',
                'a': 'Batu kelahiran distandardisasi sejak 1912 oleh National Association of Jewelers, dan bunga kelahiran berakar dari tradisi Romawi kuno yang melambangkan kebajikan dan harapan baik.'
            },
            {
                'q': 'Apa itu ulang tahun emas (golden birthday) dan kapan terjadinya?',
                'a': 'Ulang tahun emas terjadi ketika usiamu sama persis dengan tanggal lahirmu—misalnya menginjak usia 25 tahun pada tanggal 25 bulan tersebut.'
            },
            {
                'q': 'Apa itu angka jalur hidup dalam numerologi dan bagaimana cara menghitungnya?',
                'a': 'Angka jalur hidup dihitung dengan menjumlahkan seluruh angka hari, bulan, dan tahun lahir hingga menghasilkan satu digit (atau angka master 11, 22, 33) yang mencerminkan kepribadianmu.'
            },
            {
                'q': 'Kapan setengah ulang tahun saya dan mengapa orang merayakannya?',
                'a': 'Setengah ulang tahun jatuh tepat 6 bulan setelah tanggal ulang tahunmu. Ini populer dirayakan untuk anak-anak atau bagi mereka yang tanggal lahirnya berdekatan dengan libur akhir tahun.'
            },
            {
                'q': 'Bagaimana generasi seperti Gen Z dan Milenial ditentukan?',
                'a': 'Rentang generasi dipetakan berdasarkan kerangka demografi Pew Research Center, yang mengaitkan tahun kelahiran dengan perkembangan sejarah dan teknologi penting.'
            },
            {
                'q': 'Bisakah saya mengunduh dan membagikan kartu fakta hari lahir saya?',
                'a': 'Bisa! ToolNest membuat kartu stiker resolusi tinggi (PNG) langsung di perambanmu tanpa mengirim data ke server. Kamu bisa menyimpan atau membagikannya seketika.'
            }
        ],
        'countdown': [
            {
                'q': 'Apakah penghitung waktu mundur ini gratis dan tanpa perlu akun?',
                'a': 'Ya, 100% gratis tanpa perlu daftar akun, email, atau kata sandi. Kamu bisa membuat dan membagikan hitung mundur acara apa pun tanpa batas.'
            },
            {
                'q': 'Bisakah ini dipakai untuk menghitung sisa hari menuju Tahun Baru atau liburan?',
                'a': 'Tentu saja! Kamu bisa memakai template cepat untuk Tahun Baru, Natal, liburan, atau menentukan tanggal target khusus untuk memantau sisa hari, jam, dan menit.'
            },
            {
                'q': 'Di mana data hitung mundur disimpan dan bagaimana cara kerja tautannya?',
                'a': 'Data acaramu (judul, waktu ISO, dan emoji) tersimpan langsung di dalam tautan lewat pengkodean Base64URL yang aman, tanpa perlu server basis data.'
            },
            {
                'q': 'Bagaimana cara membagikan tautan hitung mundur ke WhatsApp atau media sosial?',
                'a': 'Cukup klik "Salin Tautan" atau tombol bagikan langsung. Di ponsel, kamu juga bisa membuat stiker gambar PNG berkualitas tinggi untuk status dan story.'
            },
            {
                'q': 'Bagaimana jika teman saya berada di zona waktu yang berbeda?',
                'a': 'Waktu disimpan dalam format universal UTC (ISO-8601). Saat temanmu membuka tautan, peramban mereka otomatis menyesuaikan ke zona waktu lokal secara sinkron.'
            },
            {
                'q': 'Apa yang terjadi saat hitungan waktu mundur mencapai nol?',
                'a': 'Tampilan jam otomatis berubah ke mode perayaan dengan animasi pesta, konfeti ceria, dan menampilkan hitungan berapa lama waktu telah berlalu sejak momen tersebut.'
            },
            {
                'q': 'Bisakah saya mengatur jam dan menit yang tepat untuk acara saya?',
                'a': 'Bisa! Pemilih waktu mendukung ketepatan hingga hitungan menit, sangat pas untuk jadwal penerbangan, ujian, peluncuran karya, maupun pesta kejutan.'
            },
            {
                'q': 'Bisakah saya menampilkan jam ini dalam layar penuh untuk livestream?',
                'a': 'Bisa! Halaman penampil di /countdown/view memiliki tampilan bersih dan responsif, sangat cocok untuk tangkapan layar OBS, proyektor, dan tayangan langsung.'
            }
        ],
        'nameMeaning': [
            {
                'q': 'Apa arti nama saya dan bagaimana asal-usulnya ditentukan?',
                'a': 'Arti nama mencerminkan akar etimologi dari bahasa kuno seperti Ibrani, Latin, Yunani, Nordik Kuno, Keltik, atau Arab yang dicocokkan dengan kamus onomastik sejarah.'
            },
            {
                'q': 'Bisakah saya mencari nama unik atau langka dengan alat ini?',
                'a': 'Bisa! Selain 200+ koleksi nama pilihan kami, ToolNest memiliki fitur analisis AI dengan Google Gemini untuk menelusuri nama langka dan internasional apa pun.'
            },
            {
                'q': 'Bisakah saya mencari nama yang bermakna kebajikan seperti cahaya atau kekuatan?',
                'a': 'Bisa! Banyak nama indah melambangkan kebaikan: nama bermakna cahaya seperti Lucia dan Aaron; nama bermakna kekuatan seperti Ethan dan Audrey; serta nama bermakna cinta seperti Amara dan David.'
            },
            {
                'q': 'Seberapa akurat arti nama dan ulasan kepribadian dari AI?',
                'a': 'Koleksi nama utama diverifikasi dari catatan sejarah dan sensus resmi. Analisis AI menyatukan simbolisme budaya dunia serta irama fonetik untuk inspirasi kreatif.'
            },
            {
                'q': 'Bagaimana sistem menentukan hasil dari database atau analisis AI?',
                'a': 'Saat kamu memasukkan nama, ToolNest memeriksa apakah nama tersebut ada di direktori utama. Jika ada, kamu diarahkan ke profil lengkap. Jika belum, AI akan menganalisisnya langsung di halaman ini.'
            },
            {
                'q': 'Apakah pencarian nama ini aman dan sepenuhnya gratis?',
                'a': 'Ya, 100% gratis tanpa cookie pelacak dan tanpa perlu daftar akun. Riwayat pencarianmu hanya tersimpan di peramban lokal perangkatmu.'
            },
            {
                'q': 'Tradisi bahasa apa saja yang tercakup dalam database nama ini?',
                'a': 'Database kami mencakup tradisi Latin, Jermanik, Yunani, Ibrani, Keltik, Nordik, Slavia, Sanskerta, Jepang, hingga Yoruba dari berbagai belahan dunia.'
            },
            {
                'q': 'Bisakah saya melihat nama populer yang disaring berdasarkan abjad atau gender?',
                'a': 'Bisa! Kunjungi Direktori Nama lengkap kami di /names/ untuk menjelajahi 200+ profil nama yang diurutkan dari A sampai Z dan disaring menurut gender dan popularitas.'
            }
        ],
        'nameDetail': {
            'q1': 'Apa arti dari nama {name}?',
            'a1': 'Nama {name} berakar dari bahasa {origin} dan secara tradisional memiliki arti "{meaning}".',
            'q2': 'Seberapa populer nama {name} saat ini?',
            'a2': 'Nama {name} saat ini memiliki tingkat kepopuleran {popularity} di antara nama-nama bayi di berbagai penjuru dunia.',
            'q3': 'Ingin wawasan lebih mendalam? Buka analisis AI untuk nama apa saja',
            'a3': 'Kamu bisa menekan tombol "Buka Analisis AI" di halaman ini untuk menghasilkan interpretasi kaya dan personal—termasuk sifat kepribadian, gaya nama, dan fakta sejarah menarik berbasis Google Gemini.'
        }
    },
    'ar': {
        'title': 'الأسئلة الشائعة',
        'description': 'كل ما تحتاج معرفته حول كيفية عمل هذه الأداة بدقة وسهولة.',
        'answersCount': '8 إجابات',
        'quickNav': 'التنقل السريع — الأسئلة الشائعة',
        'wheel': [
            {
                'q': 'هل عجلة القرارات عادلة وعشوائية تماماً من الناحية الرياضية؟',
                'a': 'نعم. تعتمد العجلة على واجهة التشفير المدمجة بالمتصفح لتوليد سرعة الدوران والمدة الزمنية بدقة. كل خيار يحظى بزاوية هندسية متساوية واحتمال فوز رياضي عادل تماماً.'
            },
            {
                'q': 'هل يمكن للذكاء الاصطناعي اقتراح خيارات مخصصة للعجلة تلقائياً؟',
                'a': 'نعم! تحتوي ToolNest على مولد خيارات ذكي مدعوم بتقنية Google Gemini. ما عليك سوى وصف حيرتك (مثل "خيارات العشاء" أو "ألعاب الحفلات") وسيقترح الذكاء الاصطناعي خيارات متنوعة خلال ثوانٍ.'
            },
            {
                'q': 'هل يمكن استخدام هذه العجلة كبديل لموقع Wheel of Names أو للسحوبات؟',
                'a': 'بالتأكيد. تعد ToolNest بديلاً عصرياً ونظيفاً وخالياً من الإعلانات المزعجة، وهي مثالية للمعلمين في الفصول الدراسية، والسحوبات والمسابقات، واختيار الأدوار بين الأصدقاء.'
            },
            {
                'q': 'كيف أقوم بإعداد عجلة نعم أو لا أو اتخاذ قرار لوجبة الغداء؟',
                'a': 'يمكنك إعداد عجلة سريعة بكتابة خيارين فقط: "نعم" و"لا". ولتحديد وجبة الطعام، يمكنك استخدام النموذج الجاهز لدينا أو إدخال مطاعمك وأطباقك المفضلة.'
            },
            {
                'q': 'كيف تعمل فيزياء تباطؤ دوران العجلة؟',
                'a': 'تعمل العجلة بمحرك رسومي خاص عبر Canvas بمعدل 60 إطاراً في الثانية مع منحنيات احتكاك Bezier الرياضية لمحاكاة القصور الذاتي وحركة العجلات الحقيقية بدقة.'
            },
            {
                'q': 'هل يمكنني مشاركة عجلتي المخصصة مع أصدقائي عبر رابط مباشر؟',
                'a': 'نعم! يتم حفظ خياراتك مباشرة في رابط الصفحة. بالضغط على "مشاركة العجلة" ستحصل على رابط فريد يمكن لأي شخص فتحه لتدوير نفس الخيارات تماماً.'
            },
            {
                'q': 'كم عدد الخيارات التي يمكنني إضافتها إلى العجلة؟',
                'a': 'يمكنك إضافة ما بين 2 إلى 12 خياراً. يضمن هذا الحد وضوح قراءة النصوص على شاشات الهواتف وتناسق الألوان وجمال العرض.'
            },
            {
                'q': 'هل يمكنني استبعاد الخيار الفائز بعد كل جولة دوران؟',
                'a': 'نعم. عندما تظهر نافذة إعلان الفائز، يمكنك النقر على "إزالة الفائز". سيتم حذف الخيار تلقائياً وتوزيع الزوايا المتبقية على الفور.'
            }
        ],
        'picker': [
            {
                'q': 'هل قرعة الأسماء عادلة حقاً وغير متحيزة برمجياً؟',
                'a': 'على عكس الأدوات التقليدية التي تعتمد على دالة Math.random القابلة للتنبؤ، تستخدم ToolNest واجهة التشفير الرسمية في المتصفح مع خوارزمية Fisher-Yates لضمان عدالة تامة.'
            },
            {
                'q': 'كيف أستخدم هذه الأداة لتقسيم الأسماء إلى مجموعات أو فرق عمل؟',
                'a': 'لتقسيم الفرق، اضغط أولاً على "خلط القائمة" لترتيب الأسماء عشوائياً، ثم وزع الأسماء بالتسلسل على المجموعات أو الفرق المطلوبة.'
            },
            {
                'q': 'هل يمكنني سحب عدة فائزين في المسابقة أو السحب دفعة واحدة؟',
                'a': 'نعم! حدد عدد الفائزين المطلوب بين 1 و10 فائزين في نفس اللحظة. تضمن الخوارزمية عدم تكرار أي اسم فائز عند تعطيل خيار التكرار.'
            },
            {
                'q': 'ما الفرق بين crypto.getRandomValues و Math.random؟',
                'a': 'تستخدم Math.random خوارزميات توليد رقمية بنمط داخلي متكرر. بينما تستمد crypto.getRandomValues العشوائية من عتاد نظام التشغيل الفعلي، وهي المعتمدة في السحوبات النزيهة.'
            },
            {
                'q': 'هل يمكن استبعاد الفائزين تلقائياً بعد كل جولة سحب؟',
                'a': 'نعم. فعّل خيار "إزالة الفائزين بعد الاختيار". سيتم حذف اسم الفائز من القائمة مباشرة، مما يتيح لك إجراء عدة جولات متتالية بسلاسة.'
            },
            {
                'q': 'هل يقوم ToolNest بحفظ أو رفع قوائم الأسماء إلى أي خوادم خارجية؟',
                'a': 'لا على الإطلاق. لا تغادر قائمتك ذاكرة متصفحك أبداً؛ فجميع عمليات التنظيف والخلط واختيار الفائزين تتم محلياً 100% على جهازك وبخصوصية تامة.'
            },
            {
                'q': 'ما هي صيغ القوائم التي يمكنني لصقها في أداة القرعة؟',
                'a': 'يمكنك لصق الأسماء مفصولة بسطور جديدة أو بفواصل عادية أو منقوطة. يتعرف النظام على الأسماء تلقائياً ويتجاهل المسافات الزائدة والأسطر الفارغة.'
            },
            {
                'q': 'هل يمكن تصفية الأسماء المكررة قبل إجراء القرعة؟',
                'a': 'نعم! تفحص الأداة القائمة وتظهر شريط تنبيه فوري عند وجود تكرار مع زر "إزالة المكررات" لتنظيف القائمة بضغطة واحدة.'
            }
        ],
        'age': [
            {
                'q': 'كم يبلغ عمري الدقيق اليوم بالسنوات والشهور والأيام؟',
                'a': 'عمرك الدقيق هو إجمالي السنوات التقويمية المكتملة، والشهور الكاملة المتبقية، والأيام الدقيقة منذ ميلادك، محسوبة بتوقيت UTC لتفادي فروق المناطق الزمنية.'
            },
            {
                'q': 'كيف تحسب حاسبة العمر تاريخ ميلادي بدقة متناهية؟',
                'a': 'تحسب الخوارزمية السنوات المكتملة، وتراجع عدد الأيام الفعلي لكل شهر في التقويم الميلادي، وتجمع الأيام المتبقية دون أي تقريب حسابي عشوائي.'
            },
            {
                'q': 'متى يوافق نصف عيد ميلادي وهل تتضمن الأداة حاسبة له؟',
                'a': 'نعم! تتضمن ToolNest حاسبة تلقائية لنصف عيد الميلاد، والتي توافق تماماً بعد 6 أشهر تقويمية من تاريخ ميلادك (أو حوالي 182.5 يوماً).'
            },
            {
                'q': 'لماذا يختلف حساب العمر بالأيام والشهور بين المواقع المختلفة؟',
                'a': 'تقوم حاسبات كثيرة بقسمة الأيام على 365 أو 30.4375 مما يسبب أخطاء واضحة. بينما تعتمد ToolNest على الحساب الدقيق لأيام كل شهر والسنوات الكبيسة الحقيقية.'
            },
            {
                'q': 'هل يمكنني معرفة عمري في تاريخ محدد من الماضي؟',
                'a': 'نعم! افتح خيار "حساب العمر في تاريخ محدد" أسفل حقول الإدخال، واختر أي تاريخ في الماضي لمعرفة عمرك الدقيق في ذلك اليوم التاريخي.'
            },
            {
                'q': 'كيف يتم التعامل مع السنوات الكبيسة ومواليد 29 فبراير؟',
                'a': 'بالنسبة لمواليد 29 فبراير، يحسب النظام اليوم كاملاً في السنوات الكبيسة، وفي السنوات العادية يعتمد العرف القانوني الشائع للاحتفال في 1 مارس.'
            },
            {
                'q': 'هل تقوم الأداة بحفظ أو إرسال تاريخ ميلادي إلى خوادم الإنترنت؟',
                'a': 'لا أبداً. تعمل ToolNest بدون خوادم أو قواعد بيانات أو ملفات تتبع. جميع العمليات الحسابية تتم محلياً في ذاكرة متصفحك للحفاظ على خصوصيتك المطلقة.'
            },
            {
                'q': 'ما مدى دقة عداد الثواني الحي وإحصائيات نبضات القلب؟',
                'a': 'يعمل عداد الثواني مباشرة بالاعتماد على ساعة المتصفح عالية الدقة. وتقديرات النبضات (بمتوسط 70 نبضة/دقيقة) والأنفاس (16/دقيقة) تقدم لمحة إحصائية شيقة عن مسيرة حياتك.'
            }
        ],
        'birthday': [
            {
                'q': 'في أي يوم من أيام الأسبوع وُلدت وكيف يتم التحقق من ذلك؟',
                'a': 'يتم تحديد يوم ميلادك بحساب الأيام المنقضية بدقة وفق التقويم الميلادي بدءاً من نقطة زمنية مرجعية مع احتساب كافة السنوات الكبيسة في التاريخ.'
            },
            {
                'q': 'كيف أعرف برجي الفلكي وماذا يعني عنصره الأساسي؟',
                'a': 'يُحدد برجك الشمسي الغربي وفق موقع الشمس الظاهري عبر 12 قطاعاً فلكياً. وينتمي كل برج إلى أحد العناصر الكلاسيكية الأربعة: النار، أو التراب، أو الهواء، أو الماء.'
            },
            {
                'q': 'ماذا ترمز حجر شهر ميلادي وزهرة ميلادي؟',
                'a': 'أحجار الميلاد هي أحجار كريمة تم توحيد دلالاتها عام 1912، بينما تعود زهور الميلاد لتقاليد تاريخية ترمز لفضائل المحبة والوفاء والسمات الشخصية.'
            },
            {
                'q': 'ما هو عيد الميلاد الذهبي ومتى يحين موعده؟',
                'a': 'عيد الميلاد الذهبي هو المناسبة التي يوافق فيها عمرك نفس يوم ميلادك في الشهر — كأن تبلغ من العمر 25 عاماً في اليوم الخامس والعشرين من الشهر.'
            },
            {
                'q': 'ما هو رقم مسار الحياة في علم الأرقام وكيف يُحسب؟',
                'a': 'يُحسب مسار الحياة بجمع أرقام اليوم والشهر وسنة الميلاد واختزالها لرقم مفرد (أو الأرقام الأساسية 11 و22 و33) ليكشف ملامح نمط شخصيتك وتطلعاتها.'
            },
            {
                'q': 'متى يوافق نصف عيد ميلادي ولماذا يحتفل به الكثيرون؟',
                'a': 'يوافق نصف عيد ميلادك بعد 6 أشهر بالضبط من تاريخ ميلادك، ويحتفل به الكثيرون كوقفة مبهجة في منتصف العام أو لمن تتزامن أعياد ميلادهم مع عطلات رسمية.'
            },
            {
                'q': 'كيف يتم تصنيف الأجيال مثل الجيل زد والجيل الألفي؟',
                'a': 'تُحدد الأجيال وفق تصنيفات مركز بيو للأبحاث، والتي تربط فترات سنوات الميلاد بالتحولات التاريخية والتقنية الكبرى التي شكلت وعي تلك الأجيال.'
            },
            {
                'q': 'هل يمكنني تنزيل ومشاركة بطاقة حقائق عيد ميلادي؟',
                'a': 'نعم! تُنشئ ToolNest بطاقة ملصق عالية الدقة (PNG) مباشرة داخل متصفحك دون إرسال بياناتك لأي مكان. يمكنك حفظها ومشاركتها فوراً.'
            }
        ],
        'countdown': [
            {
                'q': 'هل عداد الوقت التنازلي مجاني تماماً وبدون تسجيل حساب؟',
                'a': 'نعم، مجاني 100% وبدون الحاجة لإنشاء حساب أو إدخال بريد إلكتروني أو كلمات مرور. يمكنك إنشاء ومشاركة عدد لا محدود من العدادات بسهولة.'
            },
            {
                'q': 'هل يمكن استخدام الأداة لمعرفة الأيام المتبقية لرأس السنة أو الإجازة؟',
                'a': 'بالتأكيد! يمكنك اختيار أحد النماذج الجاهزة مثل رأس السنة أو الإجازة الصيفية، أو إدخال أي موعد تريده لمتابعة الأيام والساعات والدقائق المتبقية.'
            },
            {
                'q': 'أين يتم حفظ بيانات العداد التنازلي وكيف يعمل الرابط؟',
                'a': 'تُحفظ بيانات حدثك (العنوان، التوقيت، والرمز التعبيري) مباشرة داخل الرابط باستخدام تشفير Base64URL آمن، دون الحاجة لأي خوادم أو قواعد بيانات.'
            },
            {
                'q': 'كيف أشارك رابط العداد عبر واتساب أو شبكات التواصل؟',
                'a': 'اضغط على "نسخ الرابط" أو استخدم أزرار المشاركة المباشرة. وعلى الهواتف، يمكنك تنزيل بطاقة مصورة عالية الدقة لمشاركتها في الحالات والقصص.'
            },
            {
                'q': 'كيف يتعامل العداد مع أصدقائي في مناطق زمنية ودول مختلفة؟',
                'a': 'تُسجل التواريخ بتوقيت UTC العالمي القياسي. وعندما يفتح أصدقاؤك الرابط في أي بلد، يضبط متصفحهم الوقت وفق ساعتهم المحلية بدقة وتزامن تام.'
            },
            {
                'q': 'ماذا يحدث عندما يصل عداد الوقت إلى الصفر؟',
                'a': 'تتحول شاشة العداد تلقائياً إلى وضع الاحتفال مع مؤثرات مبهجة وقصاصات ملونة، ويبدأ العداد في عرض المدة المنقضية منذ حلول الحدث.'
            },
            {
                'q': 'هل يمكنني ضبط ساعة ودقيقة محددة لموعد الحدث؟',
                'a': 'نعم! يدعم منتقي الوقت والتاريخ تحديد التوقيت الدقيق بالساعات والدقائق، وهو مناسب جداً لمواعيد الرحلات والامتحانات وإطلاق المنتجات والفعاليات.'
            },
            {
                'q': 'هل يمكنني عرض العداد في وضع ملء الشاشة للبث المباشر؟',
                'a': 'نعم! توفر صفحة العرض المباشرة في /countdown/view واجهة أنيقة وبسيطة تتناسب تماماً مع شاشات العرض الكبيرة وتطبيقات البث المباشر مثل OBS.'
            }
        ],
        'nameMeaning': [
            {
                'q': 'ما معنى اسمي وكيف يتم تحديد أصله اللغوي وتاريخه؟',
                'a': 'يعبر معنى الاسم عن جذوره في اللغات القديمة كالعبرية واللاتينية واليونانية والعربية وغيرها، وتطابق ToolNest اسمك مع المعاجم اللغوية الموثقة.'
            },
            {
                'q': 'هل يمكنني البحث عن أسماء نادرة أو أجنبية عبر كاشف المعاني؟',
                'a': 'نعم! بالإضافة إلى دليلنا المعتمد الذي يضم أكثر من 200 اسم شهير، تمتلك ToolNest محرك ذكاء اصطناعي عبر Google Gemini لتحليل أي اسم نادر أو عالمي.'
            },
            {
                'q': 'هل يمكنني العثور على أسماء تدل على فضائل معينة كالنور أو القوة؟',
                'a': 'نعم! الكثير من الأسماء ترمز لفضائل رفيعة: فالأسماء التي تدل على النور تشمل إيلينا وآرون؛ والأسماء الدالة على القوة تشمل إيثان وجبريل؛ والدالة على المحبة تشمل أمارة وداود.'
            },
            {
                'q': 'ما مدى دقة معاني الأسماء وتحليلات الشخصية بالذكاء الاصطناعي؟',
                'a': 'الأسماء الأساسية موثقة ومعتمدة وفق سجلات اللغة والتاريخ. بينما يعتمد تحليل الذكاء الاصطناعي على الرمزية الثقافية وتناغم الحروف لإلهام الآباء والكتاب.'
            },
            {
                'q': 'كيف يحدد النظام ما إذا كان الاسم موجوداً أو يحتاج للذكاء الاصطناعي؟',
                'a': 'عند إدخال الاسم، تفحص الأداة تلقائياً ما إذا كان مسجلاً بدليلنا الدائم؛ فإن وُجد توجهك فوراً للملف الكامل، وإلا يتولى الذكاء الاصطناعي تحليله فوراً في نفس الصفحة.'
            },
            {
                'q': 'هل عملية البحث عن الأسماء آمنة وخاصة ومجانية تماماً؟',
                'a': 'نعم، مجانية 100% وبدون ملفات تتبع أو اشتراكات. تتم عمليات البحث عند الطلب ويبقى سجلك محفوظاً في متصفح جهازك فقط.'
            },
            {
                'q': 'ما هي الأصول اللغوية المتوفرة في قاعدة بيانات الأسماء؟',
                'a': 'تضم قاعدة بياناتنا أصولاً لغوية وثقافية متنوعة تشمل اللاتينية، والجرمانية، واليونانية، والعبرية، والعربية، والسنسكريتية، واليابانية، والأفريقية.'
            },
            {
                'q': 'هل يمكنني تصفح أكثر الأسماء شعبية حسب الحرف الأبجدي أو النوع؟',
                'a': 'نعم! تفضل بزيارة دليل الأسماء الشامل عبر /names/ لاستعراض أكثر من 200 اسم مرتبة أبجدياً ومصنفة بحسب النوع (أولاد، بنات، محايد) ومستوى الانتشار.'
            }
        ],
        'nameDetail': {
            'q1': 'ما هو معنى اسم {name}؟',
            'a1': 'اسم {name} يعود إلى الأصل اللغوي {origin} ويدل في معانيه التقليدية على "{meaning}".',
            'q2': 'ما مدى انتشار وشعبية اسم {name} اليوم؟',
            'a2': 'يحظى اسم {name} حالياً بمستوى انتشار {popularity} بين أسماء المواليد المعاصرة حول العالم.',
            'q3': 'هل تود معرفة تفاصيل أعمق؟ استكشف تحليل الذكاء الاصطناعي لأي اسم',
            'a3': 'يمكنك النقر على زر "فتح تحليلات الذكاء الاصطناعي" في هذه الصفحة لإنشاء تحليل غني وشخصي يتضمن سمات الشخصية، وتصنيف الأسلوب، ومعلومات تاريخية مميزة عبر Google Gemini.'
        }
    }
}
