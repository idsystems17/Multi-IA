import { Lesson } from "./types";

export const academyLessons: Lesson[] = [
  {
    id: "lesson-1",
    title: "O Segredo da Orquestração: Por Que Uma IA Só Não Basta",
    category: "fundamentos",
    categoryLabel: "Fundamentos Multi-IA",
    duration: "10 min",
    difficulty: "Fácil",
    summary: "Seja bem-vindo à nova era da inteligência aplicada. Descubra como criar um funil de IAs gratuitas para automatizar tarefas 10x mais rápido que usando apenas o ChatGPT sozinho e evite o papo chato de robô.",
    iconName: "Compass",
    content: `Fala galera! Vamos começar jogando a régua lá no alto. Se você veio aqui achando que faturar com inteligência artificial é só abrir o ChatGPT, mandar ele "escrever um livro" e cadastrar na Kiwify ou Hotmart para ficar rico deitado na praia... pode tirar o cavalinho da chuva. Essa ilusão boba é o que a gente chama de "Monocultura de IA", e ela é a maior culpada de 99% das pessoas falharem chorando no mercado digital.

Por que isso acontece? É simples: as pessoas batem o olho num texto cru gerado por IA e sacam na hora que aquilo não tem sentimento, não tem alma. Fica parecendo um texto de repartição pública ou um manual de instruções chato demais. O segredo dos grandes produtores que botam faturamentos monstruosos no bolso está na **Orquestração de IAs Gratuitas**. Em vez de tentar usar um chatbot faz-tudo que acaba fazendo tudo meia-boca, a gente contrata um "time invisível" de alta performance, sem pagar um único centavo de assinatura:

1. **O Detetive Localizador (Google Gemini)**: Cara, o Gemini do Google está conectado diretamente na internet e em tempo real. Ele sabe o que as pessoas estão buscando, clicando e comprando *agora mesmo*. Ele é o seu rastreador de tendências. Use ele para encontrar as dores mais secretas, os medos e os sonhos do seu nicho. Não peça para ele escrever seu e-book de cabo a rabo, o forte dele é a pesquisa estratégica!

2. **O Arquiteto Organizador (ChatGPT)**: O queridinho da galera é excelente para agrupar e dar ordem às ideias. O ChatGPT é imbatível para criar o esqueleto dos seus infoprodutos: estruturar capítulos de A a Z de forma ultra organizada, criar tabelas lógicas, mapear tags de SEO e planejar títulos chamativos baseados em gatilhos mentais.

3. **O Redator Sensível e Humano (Anthropic Claude.ai)**: O Claude é, de longe, a IA que escreve de um jeito mais natural, empático e cativante no planeta. Ele corre léguas de termos batidos e cafonas de robôs (ele odeia palavras vazias como "mergulhar no ecossistema", "revolucionar mercados", "simplificando desafios" ou "além do mais"). O Claude escreve com pausas naturais, perguntas retóricas curtas e uma cadência autêntica que parece um e-mail escrito pelo seu amigo mais inteligente.

**Como funciona o passa-bastão da Orquestração na prática?**

• **Passo A**: O Gemini vasculha a atualidade internacional e te dá o raio-x exato e atualizado do que as pessoas do seu nicho estão sofrendo para resolver.
• **Passo B**: O ChatGPT recebe esse raio-x de dores brutos e transforma em um sumário impecável, dividido por capítulos curtos focados em soluções diretas e sem termos técnicos demais.
• **Passo C**: O Claude entra em campo pegando cada capítulo estruturado e redige o conteúdo com uma cadência envolvente, gerando empatia instantânea com o leitor.

Dessa forma, o seu cliente lê o material de ponta a ponta sem cansar e com aquela sensação reconfortante de que o autor te entende como ninguém. É assim que você vence a barreira do amadorismo e constrói infoprodutos que vendem de verdade!`,
    stepByStep: [
      {
        instruction: "Analise tendências do mercado de infoprodutos no Gemini",
        targetAI: "Google Gemini (Gratuito)",
        practicalPrompt: "Você é um analista de tendências de infoprodutos de alta performance das principais plataformas do mercado (como Kiwify, Hotmart, Eduzz etc). Com base nas buscas de hoje e em dados recentes da web internacional, quais são as 3 maiores dores específicas e secretas do público que procura renda extra em casa atualmente? Traga detalhes sobre o comportamento deles, quanto dinheiro eles têm para investir em uma solução imediata e quais produtos digitais específicos de até R$ 97,00 eles comprariam por impulso."
      },
      {
        instruction: "Gere a estrutura lógica do produto no ChatGPT",
        targetAI: "OpenAI ChatGPT (Gratuito)",
        practicalPrompt: "Com base nas 3 dores demograficamente mapeadas a seguir: [COLE AS DORES DO GEMINI AQUI], aja como um Designer de Conteúdo Instrucional Sênior. Elabore a estrutura de tópicos de um e-book prático e focado em solução direta intitulado 'Método Multi-IA'. A ementa precisa conter um método passo a passo de apenas 5 capítulos curtos, focando em resoluções rápidas e sem termos técnicos."
      },
      {
        instruction: "Redija o conteúdo humanizado no Claude.ai",
        targetAI: "Anthropic Claude (Gratuito)",
        practicalPrompt: "Você é um autor de livros de desenvolvimento pessoal de alta sensibilidade e copywriting estético. Escreva o Capítulo 1 do e-book 'Método Multi-IA' focado em quebrar a barreira do medo do iniciante. Regra Absoluta: Não use palavras clichê de robôs (exemplos: 'revolucionário', 'ecossistema', 'mergulhe de cabeça', 'simplificando'). Escreva com parágrafos de tamanhos variados, use perguntas retóricas curtas e histórias pragmáticas do cotidiano de quem trabalha em casa."
      }
    ]
  },
  {
    id: "lesson-2",
    title: "Canal Dark de Vídeos no YouTube/TikTok: Escala Máxima",
    category: "youtube_dark",
    categoryLabel: "Vídeos Dark Automatizados",
    duration: "15 min",
    difficulty: "Médio",
    summary: "Seja dono de uma audiência engajada que recebe os seus vídeos sem nunca expor o seu rosto. Domine do zero a esteira integrada de áudio, imagem e narrativa magnética.",
    iconName: "Youtube",
    content: `Fala galera! Você já se pegou hipnotizado assistindo a um vídeo no TikTok ou Shorts sobre curiosidades históricas raras, segredos bizarros ou teorias científicas assustadoras, com uma locução super imponente e imagens que parecem saídas direto de um cinema, sem que ninguém de verdade aparecesse? 

Pois é, você acabou de trombar com um **Canal Dark**. E pode acreditar: tem gente comum faturando rios de dinheiro com isso agora mesmo!

A melhor parte desse modelo é que o processo de criação, que antigamente exigia dias inteiros de gravação, estresse técnico e softwares de edição caros, pode ser feito de forma totalmente gratuita em cerca de 15 minutos se você souber amarrar as ferramentas na ordem certa. Mas atenção: o algoritmo não tem sentimentos. Para os seus vídeos de fato viralizarem nas redes sociais e reterem a atenção das pessoas, eles precisam seguir uma fórmula psicológica certeira:

• **O Gancho Implacável de 3 Segundos (The Hook)**: Esqueça introduções mornas ("Olá, bem-vindo..."). Você precisa quebrar o padrão mental de quem está apenas rolando o feed sem pensar. Títulos como: "A NASA descobriu um monumento desconhecido na floresta que foi banido das redes locais..." aguçam a curiosidade instantaneamente e grudam o olho do espectador até a próxima cena.
• **Visual Estilo Cinema (Leonardo.ai ou Bing/Copilot)**: Seus vídeos de curiosidades precisam de imagens fantásticas. Esqueça totalmente os bancos de imagens prontos e genéricos que todo mundo usa e gere imagens hiper-realistas com visual dramático e cinematográfico no Leonardo.ai ou DALL-E 3 do Copilot de forma gratuita. Isso confere o padrão estético dos grandes canais profissionais.
• **Locução Humana e com Alma (ElevenLabs)**: Ninguém suporta ouvir aquela voz de robô antiga do Google Tradutor que fala sem respirar e soa artificial ao extremo. Usamos IAs de voz avançadas que emitem tons ricos em sentimentos, respiração e pausas estratégicas de suspense para manter o mistério no ar.

**O Pulo do Gato da Monetização Prática:**
Não dependa apenas da monetização nativa que o YouTube e o TikTok pagam por visualizações coletadas, pois as regras costumam demorar meses para aprovar e pagam muito pouco de imediato. A grande jogada dos milionários é criar produtos em poucas horas (como os e-books de baixo custo das nossas lições) e fixar o link de vendas no primeiro comentário de cada post. Uma fração da sua audiência apaixonada comprará por impulso e seu saldo na Kiwify ou Hotmart vai apitar o dia inteiro com notificações de venda!`,
    stepByStep: [
      {
        instruction: "Use o Gemini para pesquisar curiosidades raras e secretas",
        targetAI: "Google Gemini (Gratuito)",
        practicalPrompt: "Pesquise 5 mistérios históricos reais ou segredos científicos pouco conhecidos e altamente intrigantes sobre civilizações antigas raras. Escreva detalhes específicos que não são encontrados em livros de história escolar tradicionalis. Preciso de fatos polêmicos ou bizarros que chamem atenção extrema no primeiro segundo de uma narrativa."
      },
      {
        instruction: "Crie o Roteiro com Gancho Psicológico de Retenção no ChatGPT",
        targetAI: "OpenAI ChatGPT (Gratuito)",
        practicalPrompt: "Com base nestes mistérios históricos mapeados pela pesquisa: [COLE OS DETALHES DO GEMINI], atue como um Roteirista de Vídeos Virais especializado em canais de curiosidades do TikTok. Crie um roteiro de vídeo de 60 segundos com um ganho visual implacável nas primeiras linhas. Estruture o roteiro dividindo as linhas de [LOCUÇÃO EMOCIONAL] (o que a voz dirá) e [CENÁRIO VISUAL PROMPT] (o comando em inglês ideal que devo copiar para gerar a imagem ilustrativa)."
      },
      {
        instruction: "Gere as Imagens Ilustrativas no Leonardo.ai",
        targetAI: "Leonardo.ai/Bing (Gratuito)",
        practicalPrompt: "Dramatic cinematic award-winning close-up photography of an ancient golden artifact hidden underneath Egyptian ruins, dust streams floating in precise light shafts, highly detailed, photorealistic, 4k, dark moody depth of field, 16:9 ratio."
      }
    ]
  },
  {
    id: "lesson-3",
    title: "Venda de E-books de R$ 19,90 a R$ 97,00 (O Funil Modular de Alta Conversão)",
    category: "ebooks",
    categoryLabel: "Infoprodutores de Alta Velocidade",
    duration: "18 min",
    difficulty: "Fácil",
    summary: "Aprenda a montar produtos digitais irresistíveis de impulso (Tripwires) com bônus extras e orquestrados por IAs gratuitas para faturar rápido sem precisar de reuniões longas.",
    iconName: "BookOpen",
    content: `Se você quer ver os seus primeiros reais caindo no saldo da sua conta bancária sem ter que complicar demais, a estratégia de infoprodutos de baixo custo (conhecida internacionalmente como "Tripwire Marketing") é a sua via expressa. 

Pense da seguinte forma: se você tentar vender de primeira um curso avançado ou mentoria por R$ 497,00 ou R$ 997,00, a barreira psicológica do cliente é gigante. Ele vai pensar, analisar, falar com a família, procrastinar e fechar a aba. Agora, e quando o seu produto custa entre R$ 19,90 e R$ 47,00 (ou até R$ 97,00 no máximo com vários bônus inclusos)? 

A tomada de decisão é baseada 100% no calor da emoção e no impulso racional. Ele passa o cartão ou faz o Pix porque sente que o valor percebido que ele está levando de volta é centenas de vezes maior do que o troco de cafezinho que ele está pagando. É a famosa venda irresistível!

Porém, você precisa entender uma coisa de uma vez por todas: as pessoas não são otárias. Se você entregar um e-book mequetrefe de 5 páginas, cheio de parágrafos repetitivos gerados na pressa por IA, elas vão pedir reembolso e queimar o seu nome no Reclame Aqui. O truque de ouro está nas 3 engrenagens da entrega imbatível:

1. **A Promessa de Impacto Emocional (ChatGPT)**: Ninguém compra um e-book intitulado genericamente "Como Ter Produtividade". As pessoas compram soluções de dores reais. Usamos o ChatGPT para desenhar títulos magnéticos como "Rotina Descomplicada para Mães que Trabalham em Casa: O Método Prático para Recuperar 2 Horas Livres no seu Dia sem Abandonar as Tarefas". Viu a diferença? Toca direto na ferida do cliente!

2. **Autoridade Embasa em Dados Reais (Google Gemini)**: Para blindar o seu produto contra qualquer acusação de ser "raso", colocamos o Gemini para coletar pesquisas médicas comprovadas, artigos de universidades conceituadas ou dados concretos de mercado. Isso confere autoridade automática para o seu livro digital.

3. **Textura de Escrita Humana Premium (Claude.ai)**: O Claude entra lapidando o texto com um ritmo gostoso de ler, usando metáforas bem amarradas, histórias do dia a dia e um vocabulário dinâmico que gera conexão e confiança no leitor — o que prepara ele perfeitamente para comprar os seus próximos produtos de upsell (como ofertas exclusivas direto na página de pagamento).`,
    stepByStep: [
      {
        instruction: "Crie títulos emocionais de altíssima conversão no ChatGPT",
        targetAI: "OpenAI ChatGPT (Gratuito)",
        practicalPrompt: "Aja como um Copywriter Premium especializado in infoprodutos milionários. Crie 10 variações inteligentes de títulos de e-books voltados ao nicho de produtividade corporativa diária para mães que trabalham em casa. Use gatilhos mentais fortes, elimine dores habituais e inclua uma promessa realista de economia de tempo ou dinheiro."
      },
      {
        instruction: "Colete referências acadêmicas comprovadas no Gemini",
        targetAI: "Google Gemini (Gratuito)",
        practicalPrompt: "Pesquise na internet referências médicas ou dados de pesquisas reais conduzidos por universidades renomadas que confirmem a importância da rotina matinal e do sono profundo na redução do cortisol e da fadiga mental. Preciso dos nomes dos estudos e dos cientistas para dar autoridade ao e-book."
      },
      {
        instruction: "Escreva o Prefácio e o Primeiro Capítulo com Redação Humanizada no Claude.ai",
        targetAI: "Anthropic Claude (Gratuito)",
        practicalPrompt: "Com base nessas pesquisas científicas reais [COLE AQUI A PESQUISA DO GEMINI] e no título preferido [INSIRA O TÍTULO], aja como um escritor profissional Best-Seller de não-ficção. Escreva a introdução do livro mantendo o leitor hipnotizado através de storytelling envolvente e humanizado. Use pontuações assertivas e remova completamente o vocabulário robótico clássico."
      }
    ]
  },
  {
    id: "lesson-4",
    title: "Prestação de Serviços High-Ticket no Fiverr e Workana",
    category: "freelance",
    categoryLabel: "Freelancer Profissional de Elite",
    duration: "12 min",
    difficulty: "Avançado",
    summary: "Feche ótimas propostas de prestação de serviços no mercado local ou internacional em dólar, entregando artigos de SEO e copy impecáveis em pouquíssimas horas.",
    iconName: "Briefcase",
    content: `Está precisando de dinheiro rápido no bolso nas próximas 48 horas de forma honesta e garantida, sem ter que investir um centavo e nem mesmo esperar o tempo de criar canais ou infoprodutos? O caminho mais inteligente do mundo é a prestação de serviços como freelancer. 

Plataformas como Workana, Fiverr, Upwork e 99Freelas estão abarrotadas de criadores de conteúdo e donos de empresas que precisam desesperadamente de artigos de SEO para blogs, roteiros para vídeos de vendas ou redação para redes sociais. 

Só que a maioria dos freelancers normais é preguiçosa: demora dias para responder, escreve mal, entrega conteúdos lotados de plagiarismo de robôs cru e cobra valores irrisórios por desespero. É nessa lacuna colossal que entra a sua nova postura de **Freelancer de Elite QA (Quality Assurance) Multi-IA**:

Ao dominar o fluxo de orquestração técnica, você consegue estruturar entregas sofisticadas de nível corporativo em menos de uma hora. Você não apenas acelera a sua velocidade em 10x, mas entrega um padrão profissional de agência sênior de publicidade!

A esteira de prestação rápida que você vai usar funciona assim:

• **Mapeamento de Semântica e Concorrência (Google Gemini)**: Antes de sequer esboçar os parágrafos, mandamos o Gemini avaliar o que as primeiras posições do Google estão fazendo e extraímos as palavras-chave secundárias e os tópicos técnicos mais relevantes do nicho do seu cliente. É a garantia de que as postagens e artigos trarão resultados palpáveis.
• **Estruturação de Hierarquia de Conteúdo (ChatGPT)**: O ChatGPT desenha o rascunho de cabeçalhos de forma perfeita, mapeando as subdivisões (H1, H2, H3), tags de indexação e estruturação de SEO que os motores de buscas dão preferência absoluta.
• **Redação de Alta Sensibilidade (Claude.ai)**: O Claude.ai entra em ação gerando toda a redação, unindo as palavras-chave ao esqueleto lógico com maestria de quem domina o tema de forma especialista, soando humano, interessante e sem marcas artificiais chatas.
• **A Proposta de fechamento Campeã (ChatGPT)**: Como o seu fluxo é ultraveloz, use o ChatGPT para estruturar propostas comerciais focando nas dores exatas e no ganho de tempo do cliente, explicando como você garante a qualidade técnica de ponta a ponta sem atrasos. É o passe ideal para cobrar valores de 3 a 5 vezes mais caros com facilidade!`,
    stepByStep: [
      {
        instruction: "Gere Proposta Comercial Campeã para conquistar clientes no Workana no ChatGPT",
        targetAI: "OpenAI ChatGPT (Gratuito)",
        practicalPrompt: "Escreva uma proposta de serviços de copywriting focada nas dores de um empreendedor digital do Workana. No texto, demonstre empatia profissional, explique que você utiliza um fluxo sênior de Orquestração Multi-IA (combinando insights atuais com polimento artístico manual) para entregar em 24h criativos, roteiros de alta escalabilidade ou artigos de SEO superiores. Termine convidando-o para uma breve chamada de definição de metas no chat do Workana."
      },
      {
        instruction: "Crie uma pauta avançada de semântica de SEO e busca no Gemini",
        targetAI: "Google Gemini (Gratuito)",
        practicalPrompt: "Aja como um Diretor de SEO Sênior. Forneça uma estrutura completa e semântica com as melhores práticas de SEO para posicionar organicamente um site na palavra-chave 'Tráfego Pago para Negócios Locais'. Traga a intenção de busca, a estrutura lógica ideal de cabeçalhos e palavras-chave secundárias que estão no topo das discussões hoje."
      }
    ]
  }
];
