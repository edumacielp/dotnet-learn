import type { Topic, QuizQuestion } from '@/types';

export const memoryQuizPtBr: QuizQuestion[] = [
  {
    id: 'mem1',
    question: 'Em C#, qual é a diferença entre um tipo de valor e um tipo de referência?',
    options: [
      'Tipos de valor são mais rápidos de declarar; tipos de referência são mais rápidos de ler',
      'Tipos de valor armazenam o dado diretamente (copiado na atribuição); tipos de referência armazenam um endereço de memória apontando para o dado (compartilhado na atribuição)',
      'Tipos de valor vivem para sempre; tipos de referência são deletados após cada chamada de método',
      'Não há diferença significativa no .NET moderno',
    ],
    correct: 1,
    explanation: 'int x = 5 → o valor 5 é armazenado diretamente. Quando você faz var y = x, y tem sua própria cópia. Para tipos de referência (classes, records), var b = a significa que tanto a quanto b apontam para o mesmo objeto na memória. Mutar através de b também muta o que a enxerga.',
  },
  {
    id: 'mem2',
    question: 'O que `var copia = original` faz quando `original` é uma instância de classe?',
    options: [
      'Cria um clone profundo de todas as propriedades',
      'Cria um novo objeto com os mesmos valores',
      'Faz copia apontar para o mesmo objeto — não é uma cópia de jeito nenhum',
      'Copia apenas as propriedades primitivas, não os objetos aninhados',
    ],
    correct: 2,
    explanation: 'Essa é a armadilha mais comum em C#. `var copia = original` copia a referência (o endereço), não o objeto. Ambas as variáveis agora apontam para a mesma memória. Mutar uma muta a outra — e é exatamente assim que o bug de closure no Hangfire acontece.',
  },
  {
    id: 'mem3',
    question: 'O que a expressão `record with { }` do C# faz?',
    options: [
      'Atualiza o record in-place com novos valores',
      'Cria uma cópia completamente nova do record com as propriedades especificadas alteradas — o original fica intocado',
      'Marca o record como somente leitura em runtime',
      'Converte o record para um dicionário',
    ],
    correct: 1,
    explanation: 'A expressão `with` realiza uma cópia não-destrutiva — ela aloca um novo objeto com todos os valores originais, mas sobrescreve os que você especifica. Essa é a forma idiomática de "atualizar" records imutáveis em C# sem mutação.',
  },
  {
    id: 'mem4',
    question: 'Por que carregar uma entidade EF Core completa (em vez de projetar com Select) desperdiça memória?',
    options: [
      'Entidades EF Core usam um formato de memória especial menos eficiente',
      'A entidade completa aloca todas as colunas no heap — mesmo as que você nunca usa. Select() aloca apenas o que você realmente precisa.',
      'Entidades EF Core são armazenadas na stack, que é limitada',
      'Entidades completas impedem o GC de rodar',
    ],
    correct: 1,
    explanation: 'Quando você carrega uma entidade Customer com 20 colunas para exibir apenas Nome e Email, as outras 18 colunas ainda são alocadas no heap e rastreadas pelo Change Tracker. Select() projeta apenas o necessário — menos alocação, menos pressão no GC, queries mais rápidas.',
  },
  {
    id: 'mem5',
    question: 'O que dispara o Garbage Collector para recuperar memória?',
    options: [
      'O GC roda em um timer fixo a cada 30 segundos',
      'O GC roda automaticamente quando a pressão de memória aumenta — você não o controla, mas pode ajudá-lo liberando referências cedo',
      'Você deve chamar GC.Collect() manualmente ao final de cada método',
      'O GC só roda quando o app está ocioso',
    ],
    correct: 1,
    explanation: 'O GC do .NET é automático e geracional. Ele roda quando necessário, promovendo objetos sobreviventes por Gen0 → Gen1 → Gen2. Você o ajuda não segurando referências por mais tempo que o necessário, descartando recursos explicitamente e evitando alocações grandes desnecessárias.',
  },
];

export const memoryTopicPtBr: Topic = {
  slug: 'memory',
  title: 'Memória & Referências',
  description: 'RAM - Stack vs Heap, tipos de valor vs referência, bugs de mutação, o GC e por que projeções importam para memória.',
  icon: '🧠',
  status: 'available',
  color: '#00d4aa',
  sections: [
    {
      id: 'stack-vs-heap',
      title: 'Stack vs Heap',
      content: [
        {
          type: 'text',
          text: 'Toda variável no seu programa vive em algum lugar na memória. No .NET, existem dois lugares: a Stack e o Heap. Entender a diferença explica a maioria dos comportamentos confusos que você vai encontrar em C#.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📚',
              title: 'Stack',
              description: 'Rápida, ordenada e automática. Cada chamada de método ganha um stack frame. Quando o método retorna, tudo nele some instantaneamente. Armazena variáveis locais e parâmetros de método.',
              color: '#4f8ef7',
            },
            {
              icon: '🗃️',
              title: 'Heap',
              description: 'Maior, desordenado e gerenciado pelo GC. Objetos que sobrevivem além de uma única chamada de método vivem aqui. Classes, arrays, strings — qualquer coisa com tamanho dinâmico ou vida compartilhada.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Stack vs Heap na prática',
          code: `void ProcessarPedido()
{
    // Stack — int, bool, struct: armazenados diretamente no stack frame
    int quantidade = 5;
    bool estaPago = true;

    // Heap — instância de classe: a referência vive na stack,
    //        o objeto Order em si vive no Heap
    var pedido = new Order { Id = Guid.NewGuid(), Total = 99.99m };

} // ← método retorna: stack frame some instantaneamente
  //   pedido no Heap: GC limpa depois que não há mais referências`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Quando um método termina, seu stack frame é removido instantaneamente — sem GC. O Heap precisa do Garbage Collector porque objetos lá podem ser referenciados de vários lugares e não têm um único "fim de vida" claro.',
        },
      ],
    },
    {
      id: 'value-vs-reference',
      title: 'Tipos de Valor vs Tipos de Referência',
      content: [
        {
          type: 'text',
          text: 'Esse é o conceito mais importante de memória em C#. Ele determina o que acontece quando você atribui, passa ou compara variáveis.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📋',
              title: 'Tipos de valor',
              description: 'int, double, bool, DateTime, struct, enum. Atribuição COPIA o valor. Cada variável tem seus próprios dados independentes.',
              color: '#4f8ef7',
            },
            {
              icon: '🔗',
              title: 'Tipos de referência',
              description: 'class, record, string, array, List<T>. Atribuição copia a REFERÊNCIA (o endereço). Ambas as variáveis apontam para o mesmo objeto.',
              color: '#f74f4f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A diferença na atribuição',
          code: `// TIPO DE VALOR — atribuição faz uma cópia independente
int a = 10;
int b = a;  // b tem sua própria cópia de 10
b = 99;
Console.WriteLine(a); // 10 — a não foi tocado

// TIPO DE REFERÊNCIA — atribuição copia o endereço, não o objeto
var pedido1 = new Order { Total = 100 };
var pedido2 = pedido1;  // pedido2 aponta para o MESMO objeto
pedido2.Total = 999;
Console.WriteLine(pedido1.Total); // 999 — pedido1 foi mutado também!`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: '`var copia = original` NÃO cria uma cópia quando original é uma classe ou record. Cria uma segunda variável apontando para o mesmo objeto. Essa é a raiz dos bugs de mutação mais comuns em C#.',
        },
      ],
    },
    {
      id: 'shared-references-bug',
      title: 'Referências Compartilhadas & Bugs de Mutação',
      content: [
        {
          type: 'text',
          text: 'Referências compartilhadas ficam perigosas quando combinadas com loops e execução atrasada. Aqui está um bug real que mostra exatamente como isso acontece — o tipo de bug difícil de ver porque o código parece correto à primeira vista.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ O bug — referência compartilhada mutada dentro de um loop',
          code: `// invoiceIds = ["INV-123", "INV-456"]
var invoiceIdArray = webhookModel.msg.order_number.Split('|');

var modeloAtualizado = webhookModel; // ← NÃO é uma cópia — mesmo objeto na memória

foreach (var invoiceId in invoiceIdArray)
{
    // Muta o MESMO objeto em cada iteração
    modeloAtualizado.msg.order_number = invoiceId.Trim();

    // Enfileira um job em background — mas o job captura a REFERÊNCIA
    // não o valor atual de order_number
    backgroundJobs.Enqueue(() => PostarNoLegado(modeloAtualizado));
}

// O que realmente acontece:
// Iteração 1: order_number definido como "INV-123", job enfileirado com referência
// Iteração 2: order_number definido como "INV-456", MESMO objeto mutado
// Ambos os jobs veem "INV-456" — INV-123 é silenciosamente perdido`,
        },
        {
          type: 'text',
          text: 'Três coisas se combinam para criar esse bug: tipos de referência compartilham memória, a variável é declarada fora do loop então há apenas um objeto, e o job em background captura a referência — não um snapshot do valor.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ A correção — criar um novo objeto por iteração com record `with`',
          code: `var invoiceIdArray = webhookModel.msg.order_number.Split('|');

foreach (var invoiceId in invoiceIdArray)
{
    // "with" cria um objeto COMPLETAMENTE NOVO a cada iteração
    // O webhookModel original nunca é tocado
    var modeloAtualizado = webhookModel with
    {
        msg = webhookModel.msg with { order_number = invoiceId.Trim() }
    };

    // Agora cada job captura seu próprio objeto independente
    backgroundJobs.Enqueue(() => PostarNoLegado(modeloAtualizado));
}

// Iteração 1: novo objeto com order_number = "INV-123" ✓
// Iteração 2: novo objeto com order_number = "INV-456" ✓
// Ambos os jobs recebem o ID correto`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'A expressão `with` é a solução idiomática em C# para "quero atualizar um record sem mutá-lo". Ela aloca um novo objeto com todos os valores originais, sobrescrevendo apenas os que você especifica. O original fica intocado.',
        },
      ],
    },
    {
      id: 'closures',
      title: 'Closures & Variáveis Capturadas',
      content: [
        {
          type: 'text',
          text: 'Uma closure é o que acontece quando uma lambda captura uma variável do escopo externo. O detalhe chave: ela captura a variável em si — não o valor naquele momento. É o que torna o bug do loop acima perigoso além dos tipos de referência.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Closure captura a variável, não o valor',
          code: `// Bug clássico de closure em loop
var acoes = new List<Action>();

for (int i = 0; i < 3; i++)
{
    acoes.Add(() => Console.WriteLine(i)); // captura 'i' em si
}

acoes.ForEach(a => a()); // imprime: 3, 3, 3 — não 0, 1, 2!
// Quando as lambdas rodam, o loop terminou e i = 3

// Correção: capture uma cópia local dentro do loop
for (int i = 0; i < 3; i++)
{
    var capturado = i; // nova variável por iteração
    acoes.Add(() => Console.WriteLine(capturado));
}
acoes.ForEach(a => a()); // imprime: 0, 1, 2 ✓`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Mesmo problema com foreach + tipos de referência',
          code: `// foreach não ajuda se o objeto em si é mutado
var modelos = new List<WebhookModel>();

foreach (var id in ids)
{
    modelo.OrderId = id;           // mutando o objeto compartilhado
    modelos.Add(modelo);           // adicionando a mesma referência toda vez
}
// modelos contém o mesmo objeto N vezes, todos com o último id

// Correção: crie uma nova instância por iteração
foreach (var id in ids)
{
    var snapshot = modelo with { OrderId = id }; // novo objeto cada vez
    modelos.Add(snapshot);
}`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Sempre que você passar uma lambda para um job em background, evento ou operação async — pense no que ela captura. Se captura uma variável que será mutada depois, você tem um bug esperando para acontecer. Crie um snapshot local primeiro.',
        },
      ],
    },
    {
      id: 'garbage-collector',
      title: 'O Garbage Collector',
      content: [
        {
          type: 'text',
          text: 'O GC é o gerenciador automático de memória do .NET. Ele encontra objetos no Heap que nada mais referencia e recupera essa memória. Você não o chama — ele roda automaticamente. Mas você pode ajudá-lo ou prejudicá-lo com seu código.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🐣', title: 'Gen 0', description: 'Objetos novos e de vida curta. Coletado frequentemente e rapidamente. A maioria dos objetos deve morrer aqui — dados de requisições HTTP, variáveis temporárias.', color: '#00d4aa' },
            { icon: '🐤', title: 'Gen 1', description: 'Sobreviveu uma coleta Gen 0. Um buffer entre objetos de vida curta e longa.', color: '#f7a24f' },
            { icon: '🦅', title: 'Gen 2', description: 'Objetos de vida longa — dados estáticos, caches, DbContext se você o segura por muito tempo. Coletado raramente mas com custo alto. Evite promoções desnecessárias aqui.', color: '#f74f4f' },
          ],
        },
        {
          type: 'text',
          text: 'O GC é geracional porque a maioria dos objetos morre jovem. Uma coleta rápida de Gen 0 é barata. Promover objetos para Gen 2 é caro. Seu objetivo: deixar os objetos morrerem em Gen 0.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'IDisposable — libere recursos não-gerenciados explicitamente',
          code: `// ❌ Vazamento de recurso — conexão sem garantia de fechar
var conexao = new SqlConnection(connectionString);
conexao.Open();
// ... se uma exceção acontecer aqui, conexão nunca fecha

// ✅ using — Dispose() chamado mesmo se exceção for lançada
using var conexao = new SqlConnection(connectionString);
conexao.Open();
// conexao.Dispose() chamado automaticamente ao final do escopo

// ✅ using para streams, handles de arquivo, respostas HttpClient
using var stream = File.OpenRead("dados.json");
using var response = await httpClient.GetAsync(url);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'O GC cuida da memória gerenciada automaticamente. IDisposable cuida de todo o resto — conexões de banco, handles de arquivo, streams de rede. Sempre envolva objetos IDisposable em `using`. O GC não vai fechar sua conexão de banco por você.',
        },
      ],
    },
    {
      id: 'projections',
      title: 'Projeções — Carregue Só o Necessário',
      content: [
        {
          type: 'text',
          text: 'Cada coluna que você carrega do banco é alocada no Heap. Cada entidade rastreada custa memória no Change Tracker. Carregar entidades completas quando você precisa de apenas alguns campos é uma das fontes mais comuns de pressão desnecessária de memória em apps .NET.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ Carregando mais que o necessário',
          code: `// Customer tem 20 colunas. Você só exibe Nome e Email.
// Todas as 20 colunas são alocadas. Todas são rastreadas. Todas desperdiçam memória.
var clientes = await db.Customers
    .Where(c => c.IsActive)
    .ToListAsync(); // aloca objetos Customer completos

foreach (var c in clientes)
    Console.WriteLine(\$"{c.Name} — {c.Email}"); // usou apenas 2 dos 20 campos`,
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ Projete apenas o necessário',
          code: `// Apenas Nome e Email são alocados. Nada rastreado. Rápido.
var clientes = await db.Customers
    .Where(c => c.IsActive)
    .Select(c => new { c.Name, c.Email })  // SQL: SELECT Name, Email FROM Customers
    .ToListAsync();

// Ou projete para um DTO dedicado
var clientes = await db.Customers
    .Where(c => c.IsActive)
    .Select(c => new CustomerSummaryDto(c.Id, c.Name, c.Email))
    .ToListAsync();`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📦', title: 'Entidade completa', description: 'Todas as colunas carregadas e alocadas no Heap. Change Tracker registra cada objeto. Use quando você vai atualizar e salvar a entidade.', color: '#f74f4f' },
            { icon: '✂️', title: 'Projeção (Select)', description: 'Apenas colunas solicitadas carregadas. Sem overhead do Change Tracker. Use para qualquer query somente leitura — listas, respostas de API, relatórios.', color: '#00d4aa' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Combine AsNoTracking() com Select() para máxima eficiência em queries somente leitura. AsNoTracking() pula o Change Tracker. Select() reduz o que é alocado. Juntos são significativamente mais rápidos que carregar entidades completas.',
        },
      ],
    },
    {
      id: 'immutability',
      title: 'Imutabilidade — Evite o Problema por Completo',
      content: [
        {
          type: 'text',
          text: 'A forma mais segura de evitar bugs de referência compartilhada é tornar objetos que não podem ser mutados após a criação. Records C# com propriedades init-only te dão isso de graça.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Records imutáveis',
          code: `// record com propriedades init-only — não pode ser mutado após criação
public record PedidoCriado(
    Guid PedidoId,
    string NomeCliente,
    decimal Total,
    DateTimeOffset CriadoEm
);

var evt = new PedidoCriado(Guid.NewGuid(), "Jane", 149.99m, DateTimeOffset.UtcNow);

// evt.Total = 0; ← erro de compilação — propriedade init-only
// Não pode mutar, não pode compartilhar incorretamente, seguro para passar em qualquer lugar

// Para "atualizar" — crie uma nova instância
var corrigido = evt with { Total = 199.99m }; // novo objeto, original intocado`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Strings são imutáveis — operações retornam novas instâncias',
          code: `// String é tipo de referência, mas imutável
var nome = "hello";
var maiusculo = nome.ToUpper(); // retorna uma NOVA string "HELLO"

Console.WriteLine(nome);      // "hello" — original intocado
Console.WriteLine(maiusculo); // "HELLO" — novo objeto

// Por isso concatenação em loop é cara:
var resultado = "";
for (int i = 0; i < 1000; i++)
    resultado += i; // cria 1000 novos objetos string no Heap!

// Use StringBuilder para loops
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);
var resultado = sb.ToString(); // uma alocação no final`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Prefira records a classes para dados que fluem pelo seu sistema — eventos, DTOs, objetos de comando. Records são imutáveis por padrão, suportam expressões `with` e têm igualdade baseada em valor. Classes fazem sentido para objetos stateful com comportamento.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Boas Práticas de Memória',
      content: [
        {
          type: 'text',
          text: 'Você não precisa pensar em memória em cada linha. Mas esses hábitos previnem os problemas mais comuns antes que eles aconteçam.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📌', title: 'Não segure referências', description: 'Libere objetos assim que terminar — nule coleções grandes, use DbContexts de vida curta, evite estado estático para dados transientes.', color: '#00d4aa' },
            { icon: '✂️', title: 'Projete, não carregue', description: 'Use Select() para queries somente leitura. Nunca carregue entidades completas para exibir dois campos.', color: '#4f8ef7' },
            { icon: '🏗️', title: 'Use records para dados', description: 'DTOs, eventos, comandos — torne-os records. Imutabilidade previne categorias inteiras de bugs de mutação.', color: '#a78bfa' },
            { icon: '🔄', title: 'Descarte recursos', description: 'Envolva todo IDisposable em `using`. Conexões de banco, streams, respostas HTTP — o GC não vai fechá-los.', color: '#f7a24f' },
            { icon: '👁️', title: 'Snapshot antes de capturar', description: 'Antes de passar uma variável para uma lambda ou job em background, capture um snapshot local dentro do escopo do loop.', color: '#f74f4f' },
            { icon: '🏎️', title: 'Meça antes de otimizar', description: 'Não adivinhe problemas de memória. Use dotnet-counters ou um profiler para encontrar pressão real antes de reescrever código.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'O padrão completo — loop seguro com jobs em background',
          code: `// Tudo junto: records imutáveis, snapshot local, sem mutação
foreach (var invoiceId in invoiceIds)
{
    // ✅ Novo objeto por iteração — sem referência compartilhada
    var snapshot = webhookModel with
    {
        msg = webhookModel.msg with { order_number = invoiceId.Trim() }
    };

    // ✅ Lambda captura snapshot — seu próprio objeto, imutável
    backgroundJobs.Enqueue(() => ProcessarNota(snapshot));
}

// Cada job tem seus próprios dados. Sem mutação. Sem bug de closure. Sem notas perdidas.`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Quando você encontrar um bug envolvendo dados desatualizados, mutações inesperadas ou jobs em background processando valores errados — comece perguntando: "É um tipo de referência? Há uma variável compartilhada fora do loop? Uma lambda está capturando algo que é mutado depois?" Essas três perguntas vão encontrar o bug.',
        },
      ],
    },
  ],
};