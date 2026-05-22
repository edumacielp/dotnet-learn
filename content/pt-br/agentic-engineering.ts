import type { Topic, QuizQuestion } from '@/types';

export const agenticQuizPtBr: QuizQuestion[] = [
  {
    id: 'ag1',
    question: 'Qual é a principal diferença entre um chatbot de IA tradicional e um agente de IA?',
    options: [
      'Agentes são mais rápidos em gerar respostas de texto',
      'Agentes podem tomar ações, usar ferramentas e operar autonomamente em tarefas multi-etapas — não apenas responder a um único prompt',
      'Agentes só funcionam com Python, não com .NET',
      'Agentes requerem internet enquanto chatbots funcionam offline',
    ],
    correct: 1,
    explanation: 'Um chatbot responde. Um agente age. Agentes têm acesso a ferramentas (sistema de arquivos, terminal, APIs, bancos de dados) e podem planejar e executar workflows multi-etapas de forma autônoma — como rodar testes após refatorar código, ou abrir um PR após fazer mudanças.',
  },
  {
    id: 'ag2',
    question: 'O que o MCP (Model Context Protocol) faz?',
    options: [
      'É um novo runtime .NET para rodar modelos de IA localmente',
      'É um protocolo padrão que permite que modelos de IA se conectem a ferramentas e fontes de dados externas de forma estruturada',
      'Substitui APIs REST por endpoints gerados por IA',
      'É um padrão da Microsoft para formatação de prompts',
    ],
    correct: 1,
    explanation: 'MCP é um padrão aberto (da Anthropic) que define como modelos de IA se conectam a ferramentas externas — sistemas de arquivos, bancos de dados, APIs, git, browsers. Pense nele como USB-C para IA: uma interface padrão, muitas ferramentas compatíveis.',
  },
  {
    id: 'ag3',
    question: 'Qual é a forma mais eficaz de usar Claude Code ou GitHub Copilot para uma tarefa complexa de refatoração?',
    options: [
      'Colar todo o código e dizer "refatore isso"',
      'Dar ao agente contexto completo: o que o código faz, qual é o objetivo, quais restrições se aplicam e como é o "pronto"',
      'Deixar gerar tudo e aceitar todas as mudanças sem revisar',
      'Usar apenas para novos arquivos — nunca para código existente',
    ],
    correct: 1,
    explanation: 'Agentes performam melhor com contexto claro. Especifique o objetivo, as restrições (ex: "não mude a API pública") e os critérios de aceitação. Instruções vagas produzem resultados vagos — agentes não leem mentes.',
  },
  {
    id: 'ag4',
    question: 'O que é o Semantic Kernel no ecossistema .NET?',
    options: [
      'Um novo provider EF Core para bancos de dados vetoriais',
      'Um SDK da Microsoft para construir aplicações e agentes com IA em .NET usando LLMs como componente de primeira classe',
      'Um pacote NuGet para rodar apenas modelos de IA locais',
      'Uma extensão do Visual Studio para completar código',
    ],
    correct: 1,
    explanation: 'Semantic Kernel é o SDK open-source da Microsoft para integrar LLMs em apps .NET. Oferece abstrações para serviços de IA, memória (armazenamentos vetoriais), plugins (ferramentas que o agente pode chamar) e orquestração de workflows multi-etapas.',
  },
  {
    id: 'ag5',
    question: 'Qual prática torna o código gerado por IA mais seguro para mergear em uma codebase de produção?',
    options: [
      'Sempre mergear imediatamente — modelos de IA não cometem erros',
      'Usar IA apenas para comentários e documentação',
      'Tratar o output de IA como qualquer outro código: revisar, rodar testes e entender o que faz antes de mergear',
      'Rodar apenas em staging por 30 dias antes de mergear',
    ],
    correct: 2,
    explanation: 'Código gerado por IA pode estar sutilmente errado, inseguro ou perder edge cases. Sua suite de testes é sua rede de segurança. Revise o output de IA da mesma forma que revisaria o PR de um dev júnior — com curiosidade, não com confiança cega.',
  },
];

export const agenticTopicPtBr: Topic = {
  slug: 'agentic-engineering',
  title: 'Agentic Engineering',
  description: 'Utilize agentes de IA para automatizar e aprimorar seu fluxo de trabalho de desenvolvimento .NET.',
  icon: '🤖',
  status: 'available',
  color: '#a78bfa',
  sections: [
    {
      id: 'what-is-agentic',
      title: 'O que é Agentic Engineering?',
      content: [
        {
          type: 'text',
          text: 'Agentic Engineering é a prática de trabalhar ao lado de agentes de IA — não apenas usar IA para autocompletar uma linha de código, mas dar ao agente contexto, ferramentas e autoridade para executar tarefas multi-etapas em seu nome. Pense: "refatore este serviço, rode os testes, corrija as falhas e abra um PR."',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💬', title: 'Chatbot (modelo antigo)', description: 'Você pergunta. Ele responde. Uma rodada. Você copia e cola o output e faz o resto manualmente.', color: '#f74f4f' },
            { icon: '🤖', title: 'Agente (modelo novo)', description: 'Você dá um objetivo. Ele planeja, usa ferramentas, executa etapas, se autocorrige e entrega um resultado.', color: '#a78bfa' },
          ],
        },
        {
          type: 'text',
          text: 'A mudança importa porque o gargalo no desenvolvimento de software raramente é o pensamento — é a execução mecânica de trabalho bem entendido. Agentes cuidam da execução. Você cuida do julgamento.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔍', title: 'Ler e entender código', description: 'Navegar em codebases grandes, explicar padrões desconhecidos, rastrear bugs em múltiplos arquivos.', color: '#a78bfa' },
            { icon: '✏️', title: 'Escrever e refatorar', description: 'Gerar boilerplate, extrair interfaces, renomear de forma consistente, aplicar padrões.', color: '#4f8ef7' },
            { icon: '🧪', title: 'Testar e validar', description: 'Gerar testes unitários, rodá-los, interpretar falhas, corrigir o código, repetir.', color: '#00d4aa' },
            { icon: '📋', title: 'Documentar e revisar', description: 'Escrever docs XML, READMEs, ADRs, changelogs e descrições de PR a partir do contexto do código.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'tools-landscape',
      title: 'As Ferramentas que Você Deve Conhecer',
      content: [
        {
          type: 'text',
          text: 'O cenário de ferramentas agentes evolui rapidamente. Aqui estão as ferramentas que mais importam para desenvolvedores .NET agora — o que fazem e quando usar cada uma.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '⚡',
              title: 'Claude Code',
              description: 'Ferramenta agente de código da Anthropic. Roda no seu terminal com acesso completo à sua codebase, git e shell. Melhor para refatorações grandes, tarefas multi-arquivo e workflows agentes.',
              color: '#a78bfa',
            },
            {
              icon: '🐙',
              title: 'GitHub Copilot',
              description: 'Programador par com IA integrado ao IDE. Excelente para completações inline, explicar código selecionado, gerar testes para o arquivo atual e fazer perguntas sobre o repositório.',
              color: '#4f8ef7',
            },
            {
              icon: '🖱️',
              title: 'Cursor',
              description: 'Fork do VS Code com integração profunda de IA. O modo Composer permite descrever mudanças multi-arquivo em linguagem natural. Forte para features greenfield e edições em grande escala.',
              color: '#00d4aa',
            },
            {
              icon: '🔌',
              title: 'MCP Servers',
              description: 'Plugins que dão aos agentes de IA acesso estruturado a ferramentas externas: bancos de dados, APIs, git, browsers, sistemas de arquivos. A interface padrão entre agentes e o mundo.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Não tente usar todas as ferramentas de uma vez. Escolha uma ferramenta agente e vá fundo. Claude Code ou Cursor são os pontos de partida de maior retorno para desenvolvedores .NET que querem workflows verdadeiramente agentes.',
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
      id: 'dotnet-workflows',
      title: 'Workflows de Alto Valor para Devs .NET',
      content: [
        {
          type: 'text',
          text: 'Nem todo uso de IA é igual. Estes são os workflows onde agentes fornecem o maior retorno para desenvolvedores .NET — tarefas tediosas, mecânicas e bem definidas.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Geração de Testes',
        },
        {
          type: 'text',
          text: 'Dê ao agente uma classe de serviço e peça para gerar uma suite completa de testes xUnit — caminho feliz, edge cases e casos de erro. Depois rode-os. Corrija o que falhar. Isso sozinho pode triplicar a velocidade de cobertura de testes.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Padrão de prompt para geração de testes',
          code: `# No Claude Code / Cursor:

"Gere uma suite completa de testes xUnit para OrderService.cs.
Use NSubstitute para mocks. Cubra:
- Caminho feliz para cada método público
- Validação de argumento nulo (ArgumentNullException)
- Violações de regra de negócio (ex: cancelar pedido já enviado)
- Cenários de falha do repositório

Os testes existentes em OrderServiceTests.cs mostram o estilo
de nomenclatura e arranjo — siga o mesmo padrão."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Onboarding em Codebase',
        },
        {
          type: 'text',
          text: 'Começando em um novo projeto ou voltando a código antigo? Dê ao agente acesso à codebase completa e peça para explicar a arquitetura, fluxo de dados e decisões de design. 10 minutos com um agente supera 2 horas de leitura.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Prompts de onboarding',
          code: `"Explique como um novo pedido flui por este sistema desde a
requisição HTTP até a escrita no banco. Inclua quais serviços
estão envolvidos, quais validações acontecem e onde fica a
lógica de negócio."

"Quais são os principais padrões arquiteturais usados nesta
codebase? Há padrões inconsistentes ou desatualizados?"

"Onde autenticação e autorização são tratadas?
Trace o fluxo do token JWT até a verificação final de permissão."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Refatoração e Modernização',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Padrões de prompt para refatoração',
          code: `"Refatore PaymentService.cs para usar o padrão Result<T, Error>
em vez de lançar exceções para falhas de negócio esperadas.
Mantenha as assinaturas dos métodos públicos idênticas —
esta é uma refatoração puramente interna. Rode os testes existentes."

"Encontre todos os lugares onde fazemos I/O síncrono em métodos
async (ex: .Result ou .Wait()) e corrija-os. Comece pela
camada de Infraestrutura."

"Este serviço tem 3 responsabilidades. Extraia-as em classes
separadas seguindo o SRP. Crie uma interface para cada uma."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Geração de Documentação',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Prompts de documentação',
          code: `"Adicione comentários de documentação XML a todos os métodos
públicos em IOrderRepository.cs. Documente os parâmetros,
valores de retorno e exceções que os chamadores devem tratar."

"Escreva uma seção de README explicando como rodar este projeto
localmente. Inclua: pré-requisitos, setup do ambiente,
migrations do banco e como rodar os testes."

"Gere um Architecture Decision Record (ADR) para nossa escolha
de usar o Outbox Pattern para publicação confiável de eventos.
Inclua contexto, decisão, consequências e alternativas consideradas."`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Os melhores prompts são específicos sobre objetivo, contexto e restrições. "Refatore isso" é fraco. "Refatore OrderService.cs para usar Result<T> em vez de exceções, mantendo a API pública inalterada" é forte.',
        },
      ],
    },
    {
      id: 'semantic-kernel',
      title: 'Construindo Agentes em .NET com Semantic Kernel',
      content: [
        {
          type: 'text',
          text: 'Semantic Kernel é o SDK open-source da Microsoft para construir aplicações com IA em .NET. Permite usar LLMs como componente de primeira classe — com plugins (ferramentas que o agente pode chamar), memória (armazenamentos vetoriais) e orquestração integrados.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Instalar Semantic Kernel',
          code: `dotnet add package Microsoft.SemanticKernel
dotnet add package Microsoft.SemanticKernel.Connectors.OpenAI`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup básico do Semantic Kernel',
          code: `using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

var builder = Kernel.CreateBuilder();

// Adicionar Azure OpenAI ou OpenAI
builder.AddAzureOpenAIChatCompletion(
    deploymentName: "gpt-4o",
    endpoint: builder.Configuration["AzureOpenAI:Endpoint"]!,
    apiKey: builder.Configuration["AzureOpenAI:ApiKey"]!
);

// Registrar plugins customizados (ferramentas que o agente pode chamar)
builder.Plugins.AddFromType<OrderPlugin>();
builder.Plugins.AddFromType<InventoryPlugin>();

var kernel = builder.Build();

// Pedir ao agente para completar uma tarefa usando ferramentas disponíveis
var result = await kernel.InvokePromptAsync(
    "Verifique o estoque do produto SKU-123 e crie um pedido de reposição se abaixo de 10 unidades."
);

Console.WriteLine(result);`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Criando um Plugin (Ferramenta)',
        },
        {
          type: 'text',
          text: 'Plugins são classes C# com métodos que o agente pode chamar. Decore-os com `[KernelFunction]` e descreva-os claramente — a descrição é o que o agente lê para decidir quando usar a ferramenta.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplo de plugin Semantic Kernel',
          code: `public class OrderPlugin(IOrderRepository orders)
{
    [KernelFunction("get_order")]
    [Description("Recupera um pedido pelo ID. Retorna detalhes incluindo status, itens e total.")]
    public async Task<OrderDto?> GetOrderAsync(
        [Description("O identificador único do pedido")] Guid orderId)
    {
        var order = await orders.GetByIdAsync(orderId);
        return order is null ? null : new OrderDto(order);
    }

    [KernelFunction("cancel_order")]
    [Description("Cancela um pedido se ainda não foi enviado. Retorna true se bem-sucedido.")]
    public async Task<bool> CancelOrderAsync(
        [Description("O ID do pedido a cancelar")] Guid orderId,
        [Description("Motivo do cancelamento")] string reason)
    {
        return await orders.CancelAsync(orderId, reason);
    }
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'A qualidade dos seus atributos `[Description]` afeta diretamente quão bem o agente usa suas ferramentas. Escreva-os como documentação para um novo colega — claro, específico e honesto sobre o que a função faz e quando usá-la.',
        },
      ],
    },
    {
      id: 'anthropic-sdk',
      title: 'Usando o SDK da Anthropic no .NET',
      content: [
        {
          type: 'text',
          text: 'Para acesso direto à API do Claude a partir de uma aplicação .NET, a Anthropic fornece um SDK oficial. É a escolha certa quando você precisa de controle refinado sobre parâmetros do modelo, streaming, ou quando quer construir seu próprio loop de agente sem um framework de alto nível.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Instalar o SDK .NET da Anthropic',
          code: `dotnet add package Anthropic.SDK`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Mensagem básica com o SDK da Anthropic',
          code: `using Anthropic.SDK;
using Anthropic.SDK.Messaging;

var client = new AnthropicClient(apiKey: Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")!);

var messages = new List<Message>
{
    new Message(RoleType.User, "Resuma os testes com falha no log de build anexado."),
};

var response = await client.Messages.GetClaudeMessageAsync(
    new MessageParameters
    {
        Model = AnthropicModels.Claude37Sonnet,
        MaxTokens = 1024,
        Messages = messages,
        System = new List<SystemMessage>
        {
            new SystemMessage("Você é um engenheiro .NET sênior revisando resultados de CI. Seja conciso e acionável.")
        }
    }
);

Console.WriteLine(response.Content[0].Text);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use Semantic Kernel quando quiser um framework agente completo com memória, planners e orquestração de plugins. Use o SDK da Anthropic diretamente quando quiser abstração mínima e controle total sobre a interação com o modelo.',
        },
      ],
    },
    {
      id: 'microsoft-extensions-ai',
      title: 'Microsoft.Extensions.AI',
      content: [
        {
          type: 'text',
          text: '`Microsoft.Extensions.AI` (MEAI) é um novo conjunto de abstrações centrais no ecossistema .NET que padroniza como apps interagem com serviços de IA — similar a como `Microsoft.Extensions.Logging` abstrai providers de log. Escreva seu app uma vez, troque o backend de IA sem mudar código.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Instalar pacotes MEAI',
          code: `# Abstrações centrais
dotnet add package Microsoft.Extensions.AI

# Implementações de providers
dotnet add package Microsoft.Extensions.AI.OpenAI       # OpenAI + Azure OpenAI
dotnet add package Microsoft.Extensions.AI.Anthropic    # Claude`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'MEAI — chat agnóstico de provider',
          code: `using Microsoft.Extensions.AI;

// Registrar via DI — troque o provider mudando apenas esta linha
builder.Services.AddChatClient(
    new OpenAIClient(config["OpenAI:ApiKey"]!)
        .AsChatClient(modelId: "gpt-4o")
);

// Use em qualquer lugar via IChatClient — sem lock-in de provider
public class ServicoSuporte(IChatClient ai)
{
    public async Task<string> ClassificarTicketAsync(string textoTicket)
    {
        var response = await ai.CompleteAsync(
            $"Classifique este ticket de suporte em uma categoria " +
            $"(Cobrança, Técnico, Conta, Outro):\n\n{textoTicket}"
        );
        return response.Message.Text ?? "Outro";
    }
}`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔄', title: 'Agnóstico de provider', description: 'IChatClient funciona com OpenAI, Azure OpenAI, Anthropic, Ollama e mais. Troque backends com uma mudança de config.', color: '#a78bfa' },
            { icon: '🧩', title: 'Pipeline de middleware', description: 'Adicione logging, cache, retry e rate-limiting como middleware — o mesmo padrão do middleware ASP.NET Core.', color: '#4f8ef7' },
            { icon: '🧪', title: 'Testável', description: 'Injete IChatClient como qualquer outra dependência. Faça mock em testes unitários sem chamar a API real.', color: '#00d4aa' },
          ],
        },
      ],
    },
    {
      id: 'safe-ai-practices',
      title: 'Práticas Seguras e Eficazes com IA',
      content: [
        {
          type: 'text',
          text: 'Usar agentes de forma eficaz é uma habilidade. Esses princípios separam devs que extraem 10x de valor da IA dos que ficam frustrados e desistem.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Sempre Revise Antes de Mergear',
        },
        {
          type: 'text',
          text: 'Código gerado por IA pode estar sutilmente errado — código com aparência correta que perde um edge case, usa uma API depreciada ou introduz uma falha de segurança. Sua suite de testes é sua primeira linha de defesa. Code review é a segunda. Nunca desabilite nenhum dos dois para código gerado por IA.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✅', title: 'Faça: verifique com testes', description: 'Rode sua suite completa de testes em cada mudança gerada por IA. Se não há testes para a área alterada, escreva-os primeiro.', color: '#00d4aa' },
            { icon: '✅', title: 'Faça: revise o diff', description: 'Leia as mudanças como leria qualquer PR. Entenda o que o agente fez e por quê antes de mergear.', color: '#00d4aa' },
            { icon: '❌', title: 'Não faça: confie cegamente', description: 'Agentes são confiantes mesmo quando erram. "Parece certo" não é suficiente — rode, teste, entenda.', color: '#f74f4f' },
            { icon: '❌', title: 'Não faça: dê acesso desnecessário', description: 'Conceda aos agentes apenas as permissões necessárias para a tarefa. Não dê acesso de escrita ao banco de produção para uma tarefa que só precisa ler.', color: '#f74f4f' },
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Mantenha Segredos Fora dos Prompts',
        },
        {
          type: 'callout',
          variant: 'danger',
          text: 'Nunca cole API keys, connection strings, senhas ou dados pessoais em um prompt. Use placeholders como `<CONNECTION_STRING>` e popule-os no código. A maioria dos providers de IA armazena histórico de prompts.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Engenharia de Prompt para Desenvolvedores',
        },
        {
          type: 'text',
          text: 'Prompts melhores produzem resultados melhores. As três coisas que mais importam:',
        },
        {
          type: 'list',
          items: [
            'Contexto — o que o código faz, qual é o sistema ao redor, quais restrições existem',
            'Objetivo — qual resultado específico você quer, expresso como um entregável concreto',
            'Restrições — o que não deve mudar, quais padrões seguir, quais tecnologias estão fora dos limites',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Prompt fraco vs prompt forte',
          code: `# ❌ Fraco — vago, sem contexto, sem restrições
"Melhore este código"

# ✅ Forte — contexto, objetivo, restrições, referência de estilo
"Este é um endpoint de minimal API ASP.NET Core 9 que lida com
criação de pedidos (veja OrderEndpoints.cs).

Objetivo: Adicionar suporte a idempotência usando um header Idempotency-Key.
Se a mesma chave aparecer duas vezes em 24h, retorne a resposta em cache.

Restrições:
- Use IDistributedCache (já registrado no DI)
- Não mude o formato da resposta
- Siga o padrão existente em PaymentEndpoints.cs para tratamento de erros
- Escreva um teste unitário para o cenário de chave duplicada"`,
        },
      ],
    },
    {
      id: 'agentic-cicd',
      title: 'Agentes no seu Pipeline de CI/CD',
      content: [
        {
          type: 'text',
          text: 'Além do IDE, agentes de IA podem agregar valor diretamente no seu pipeline de CI/CD — automatizando tarefas que atualmente exigem atenção humana.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📝', title: 'Descrições de PR', description: 'Gere automaticamente descrições de pull request a partir do diff. Resuma o que mudou, por quê e o que revisar com cuidado.', color: '#a78bfa' },
            { icon: '🔍', title: 'Code review com IA', description: 'Rode uma revisão leve com IA em cada PR para detectar problemas comuns — anti-padrões de segurança, null checks faltando, tratamento de erros inconsistente.', color: '#4f8ef7' },
            { icon: '🔖', title: 'Geração de changelog', description: 'Use git-cliff ou um passo com IA para gerar changelogs legíveis a partir do histórico de commits no momento do release.', color: '#caf74f' },
            { icon: '🧪', title: 'Análise de testes instáveis', description: 'Quando testes falham no CI, envie o log de falha para um passo de IA que resume a causa raiz e sugere correções.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'yaml',
          label: 'GitHub Actions — passo de descrição de PR com IA',
          code: `name: Resumo de PR com IA

on:
  pull_request:
    types: [opened]

jobs:
  summarize:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Gerar descrição do PR
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |
          DIFF=\$(git diff origin/main...HEAD --stat)
          DESCRIPTION=\$(curl -s https://api.anthropic.com/v1/messages \\
            -H "x-api-key: \$ANTHROPIC_API_KEY" \\
            -H "anthropic-version: 2023-06-01" \\
            -H "content-type: application/json" \\
            -d '{
              "model": "claude-sonnet-4-5",
              "max_tokens": 500,
              "messages": [{
                "role": "user",
                "content": "Escreva uma descrição concisa de PR para estas mudanças:\\n'"$DIFF"'"
              }]
            }' | jq -r '.content[0].text')

          gh pr edit \${{ github.event.pull_request.number }} \\
            --body "\$DESCRIPTION"`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Passos de IA no pipeline adicionam latência e custo de API a cada execução. Seja seletivo — use-os no abrir de PRs (não em cada push) e defina limites razoáveis de tokens. Monitore o custo no seu dashboard do Azure ou Anthropic.',
        },
      ],
    },
  ],
};