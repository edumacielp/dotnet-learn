import type { Topic, QuizQuestion } from "@/types";

export const agenticQuizPtBr: QuizQuestion[] = [
  {
    id: "ag1",
    question: "Qual é a principal diferença entre um chatbot tradicional e um agente de IA?",
    options: [
      "Agentes geram respostas mais rápido",
      "Agentes podem tomar ações, usar ferramentas e executar tarefas multi-etapas autonomamente — não apenas responder a um prompt",
      "Agentes só funcionam com Python",
      "Agentes requerem internet enquanto chatbots funcionam offline",
    ],
    correct: 1,
    explanation: "Um chatbot responde a um prompt. Um agente age: pode ler arquivos, rodar comandos, chamar APIs e executar workflows.",
  },
  {
    id: "ag2",
    question: "O que o MCP (Model Context Protocol) faz?",
    options: [
      "É um novo runtime .NET para rodar modelos de IA",
      "É um padrão que permite agentes se conectar a ferramentas externas de forma estruturada",
      "Substitui APIs REST por endpoints gerados por IA",
      "É um padrão da Microsoft para formatação de prompts",
    ],
    correct: 1,
    explanation: "MCP é um padrão aberto (da Anthropic) que define como modelos de IA se conectam a ferramentas externas. Pense como USB-C para IA: interface universal, muitas ferramentas compatíveis.",
  },
  {
    id: "ag3",
    question: "O que torna um agente mais eficaz para tarefas complexas?",
    options: [
      "Colar todo código e dizer conserte isso",
      "Dar ao agente contexto: o que o código faz, qual é o objetivo, que restrições existem",
      "Deixar gerar tudo e aceitar todas as mudanças",
      "Usar apenas para tarefas simples de um arquivo",
    ],
    correct: 1,
    explanation: "Agentes performam melhor com contexto claro. Especifique objetivo, restrições e critérios de aceitação. Instruções vagas produzem resultados vagos.",
  },
  {
    id: "ag4",
    question: "O que é Semantic Kernel?",
    options: [
      "Um novo provider EF Core para bancos vetoriais",
      "Um SDK da Microsoft para construir apps com IA em .NET usando LLMs como componente de primeira classe",
      "Um pacote NuGet para rodar apenas modelos de IA locais",
      "Uma extensão Visual Studio para completar código",
    ],
    correct: 1,
    explanation: "Semantic Kernel é o SDK da Microsoft para integrar LLMs em apps .NET. Oferece plugins, armazenamento de memória e orquestração de workflows.",
  },
  {
    id: "ag5",
    question: "Por que revisar código de IA antes de mergear?",
    options: [
      "Modelos de IA nunca cometem erros — mergear imediatamente",
      "Usar IA apenas para comentários e documentação",
      "Código de IA deve ser tratado como qualquer outro: revisar, testar e entender antes de mergear",
      "Rodar em staging por 30 dias antes de mergear",
    ],
    correct: 2,
    explanation: "Código de IA pode estar sutilmente errado ou perder edge cases. Sua suite de testes é sua rede de segurança. Revise como faria com PR de dev júnior.",
  },
];

export const agenticTopicPtBr: Topic = {
  slug: "agentic-engineering",
  title: "Agentic Engineering",
  description: "Utilize agentes de IA para automatizar seu fluxo de trabalho e construir aplicações .NET mais inteligentes.",
  icon: "🤖",
  status: "available",
  color: "#a78bfa",
  sections: [
    {
      id: "what-is-agentic",
      title: "O que é Agentic Engineering?",
      content: [
        {
          type: "text",
          text: "Agentic Engineering é usar agentes de IA para executar tarefas em seu nome — dar ao agente contexto e ferramentas para executar workflows multi-etapas. Um agente pode ler sua codebase, entender, fazer mudanças, rodar testes e até abrir um PR.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "💬", title: "Chatbot", description: "Você pergunta, ele responde uma vez. Você faz o resto manualmente.", color: "#f74f4f" },
            { icon: "🤖", title: "Agente", description: "Você dá um objetivo. Ele planeja, executa, se corrige e entrega resultado.", color: "#a78bfa" },
          ],
        },
        {
          type: "text",
          text: "O gargalo em software raramente é o pensamento — é executar trabalho bem entendido. Agentes cuidam da execução. Você cuida do julgamento.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "🔍", title: "Ler e entender", description: "Explorar codebases, explicar padrões, rastrear bugs em múltiplos arquivos.", color: "#a78bfa" },
            { icon: "✏️", title: "Escrever e refatorar", description: "Gerar código, extrair interfaces, renomear consistentemente, aplicar padrões.", color: "#4f8ef7" },
            { icon: "🧪", title: "Testar e validar", description: "Gerar testes, rodá-los, interpretar falhas, corrigir código.", color: "#00d4aa" },
            { icon: "📋", title: "Documentar", description: "Escrever docs XML, READMEs e descrições de PR a partir do contexto do código.", color: "#f7a24f" },
          ],
        },
      ],
    },
    {
      id: "tools-landscape",
      title: "Ferramentas de IA para Desenvolvedores",
      content: [
        {
          type: "text",
          text: "Diferentes ferramentas são melhores para tarefas diferentes. Escolha uma que se encaixe no seu fluxo e vá fundo nela.",
        },
        {
          type: "concept-grid",
          items: [
            {
              icon: "⚡",
              title: "Claude Code",
              description: "Ferramenta agente da Anthropic. Roda no seu terminal com acesso completo à codebase. Use Skills do Claude para contexto.",
              color: "#a78bfa",
            },
            {
              icon: "🐙",
              title: "GitHub Copilot",
              description: "Par programador integrado ao IDE. Ótimo para sugestões inline e explicar código selecionado.",
              color: "#4f8ef7",
            },
            {
              icon: "🖱️",
              title: "Cursor",
              description: "Fork do VS Code com integração profunda de IA. Modo Composer descreve mudanças em linguagem natural.",
              color: "#00d4aa",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "Comece com uma ferramenta. Claude Code e Cursor oferecem workflows de maior retorno para devs .NET.",
        },
      ],
    },
    {
      id: "mcp",
      title: "Protocolo de Contexto de Modelos (MCP)",
      content: [
        {
          type: "text",
          text: "MCP (Model Context Protocol) é um padrão aberto que define como modelos se conectam a ferramentas externas e expõem Skills descobríveis. Use MCP para publicar ações bem documentadas que agentes possam invocar de forma segura e previsível.",
        },
        {
          type: "callout",
          variant: "info",
          text: "Exponha funcionalidades como Skills (por exemplo, Skills do Claude) para que agentes possam descobrir e chamar ferramentas com entradas, saídas e limites de segurança claros.",
        },
      ],
    },
    {
      id: "high-value-workflows",
      title: "Workflows de Alto Impacto",
      content: [
        {
          type: "text",
          text: "Tarefas onde agentes fornecem mais valor: tediosas, mecânicas e bem definidas.",
        },
        {
          type: "heading",
          level: 3,
          text: "Geração de Testes",
        },
        {
          type: "text",
          text: "Dê ao agente uma classe de serviço: Gere uma suite completa de testes xUnit. O agente escreve. Você roda. 3x velocidade de cobertura.",
        },
        {
          type: "heading",
          level: 3,
          text: "Onboarding em Codebase",
        },
        {
          type: "text",
          text: "Novo em um projeto? Pergunte ao agente: Explique como um novo pedido flui neste sistema desde HTTP até banco de dados. 10 minutos supera 2 horas de leitura.",
        },
        {
          type: "heading",
          level: 3,
          text: "Refatoração",
        },
        {
          type: "text",
          text: "Peça ao agente para refatorar, extrair responsabilidades ou modernizar padrões. Forneça restrições: Mantenha assinaturas públicas iguais.",
        },
        {
          type: "heading",
          level: 3,
          text: "Documentação",
        },
        {
          type: "text",
          text: "Gere docs XML, seções README ou ADRs a partir do seu código. O agente entende contexto e escreve documentação significativa.",
        },
        {
          type: "callout",
          variant: "tip",
          text: "Prompts fortes são específicos: objetivo, restrições e critérios de pronto. Refatore isso é fraco. Refatore OrderService.cs usando Result<T>, mantenha API pública inalterada, rode testes é forte.",
        },
      ],
    },
    {
      id: "safe-practices",
      title: "Práticas Seguras e Eficazes",
      content: [
        {
          type: "heading",
          level: 3,
          text: "Sempre Revise Antes de Mergear",
        },
        {
          type: "text",
          text: "Código de IA pode estar sutilmente errado: perder um edge case, usar APIs depreciadas ou ter problemas de segurança. Sua suite de testes é sua rede de segurança. Code review é a segunda linha de defesa.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "✅", title: "Faça: verifique com testes", description: "Rode suite completa em cada mudança de IA.", color: "#00d4aa" },
            { icon: "✅", title: "Faça: revise o diff", description: "Leia cada mudança. Entenda antes de mergear.", color: "#00d4aa" },
            { icon: "❌", title: "Não faça: confie cegamente", description: "Agentes são confiantes mesmo quando errados.", color: "#f74f4f" },
            { icon: "❌", title: "Não faça: exponha segredos", description: "Nunca cole API keys ou senhas em prompts.", color: "#f74f4f" },
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Engenharia de Prompt Básica",
        },
        {
          type: "list",
          items: [
            "Contexto: O que o código faz? Que restrições existem?",
            "Objetivo: Qual resultado específico quer?",
            "Restrições: O que não deve mudar? Quais padrões seguir?",
          ],
        },
      ],
    },
    {
      id: 'mcp',
      title: 'MCP — Como Agentes Se Conectam ao Mundo',
      content: [
        {
          type: 'text',
          text: 'MCP (Model Context Protocol) é o padrão aberto que define como modelos de IA se conectam a ferramentas e fontes de dados externas. Em vez de cada ferramenta de IA construir integrações customizadas, o MCP fornece uma interface universal — como USB-C para IA.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🗄️', title: 'MCP de Banco de Dados', description: 'Deixe o agente consultar seu SQL Server ou Postgres diretamente. Pergunte "quais são as 10 queries mais lentas?" e obtenha uma resposta real.', color: '#4f8ef7' },
            { icon: '📁', title: 'MCP de Sistema de Arquivos', description: 'Ler, escrever e navegar arquivos. O agente pode abrir qualquer arquivo do seu projeto, não apenas o que está na janela de contexto.', color: '#00d4aa' },
            { icon: '🌿', title: 'MCP do Git', description: 'Ler commits, diffs e blame. O agente pode entender o que mudou e por quê, não apenas o estado atual do código.', color: '#a78bfa' },
            { icon: '🌐', title: 'MCP de Browser', description: 'Navegar páginas, raspar docs, preencher formulários. Útil para agentes que precisam interagir com ferramentas web ou documentação.', color: '#f7a24f' },
          ],
        },
        {
          type: 'code',
          language: 'json',
          label: 'claude_desktop_config.json — Adicionando servidores MCP ao Claude',
          code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/caminho/para/seu/projeto"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "seu-token"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/meudb"]
    }
  }
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Servidores MCP rodam como processos locais. O modelo de IA envia requisições estruturadas; o servidor as executa e retorna resultados. Seus dados ficam locais — nada é enviado para a nuvem a menos que o servidor faça isso explicitamente.',
        },
      ],
    },
    {
      id: "semantic-kernel",
      title: "Construindo Apps com IA using Semantic Kernel",
      content: [
        {
          type: "text",
          text: "Semantic Kernel é o SDK da Microsoft para construir apps com IA em .NET. Use LLMs como componente de primeira classe com plugins e orquestração.",
        },
        {
          type: "heading",
          level: 3,
          text: "Criar um Plugin (Ferramenta)",
        },
        {
          type: "text",
          text: "Plugins são classes C# com métodos que o agente pode chamar. Descreva cada método claramente — descrições dizem ao agente quando usar a ferramenta.",
        },
        {
          type: "callout",
          variant: "info",
          text: "Escreva atributos [Description] como documentação para um novo colega. Qualidade das descrições afeta diretamente como o agente usa suas ferramentas.",
        },
      ],
    },
    {
      id: "microsoftext-ai",
      title: "Microsoft.Extensions.AI",
      content: [
        {
          type: "text",
          text: "Microsoft.Extensions.AI é um conjunto de abstrações que padroniza como apps .NET interagem com serviços de IA. Escreva seu app uma vez, troque backends (OpenAI, Azure, Anthropic) sem mudar código.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "🔄", title: "Agnóstico", description: "IChatClient funciona com OpenAI, Azure, Anthropic, Ollama e mais.", color: "#a78bfa" },
            { icon: "🧩", title: "Middleware", description: "Adicione logging, cache, retry, rate-limit como middleware.", color: "#4f8ef7" },
            { icon: "🧪", title: "Testável", description: "Faça mock de IChatClient em testes sem chamar API real.", color: "#00d4aa" },
          ],
        },
      ],
    },
    {
      id: "anthropic-sdk",
      title: "Usando o SDK .NET da Anthropic",
      content: [
        {
          type: "text",
          text: "Para acesso direto ao Claude a partir de .NET, use o SDK da Anthropic. Melhor quando precisa controle fino sobre parâmetros ou construir seu próprio loop de agente.",
        },
        {
          type: "callout",
          variant: "tip",
          text: "Use Semantic Kernel para um framework agente completo. Use SDK da Anthropic diretamente para abstração mínima e controle total.",
        },
      ],
    },
  ],
};

