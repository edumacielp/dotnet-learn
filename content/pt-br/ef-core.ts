import type { Topic, QuizQuestion } from '@/types';

export const efCoreQuizPtBr: QuizQuestion[] = [
  {
    id: 'ef1',
    question: 'O que o Change Tracker do EF Core faz?',
    options: [
      'Ele rastreia quanto tempo cada query SQL leva para executar',
      'Ele observa cada entidade que você carrega do banco e detecta o que mudou — para que o SaveChangesAsync saiba exatamente qual SQL gerar',
      'Ele registra todas as conexões de banco para debug',
      'Ele gerencia as migrations do banco automaticamente',
    ],
    correct: 1,
    explanation: 'O Change Tracker é o mecanismo central do EF Core. Quando você carrega uma entidade, o EF tira um snapshot dos valores originais. No SaveChangesAsync, ele compara os valores atuais com o snapshot e gera apenas o SQL que reflete o que realmente mudou.',
  },
  {
    id: 'ef2',
    question: 'Quando você deve usar AsNoTracking()?',
    options: [
      'Sempre — torna toda query mais rápida',
      'Quando você só precisa ler dados e exibi-los — sem atualizações, sem saves. Pula todo o overhead do Change Tracker.',
      'Somente ao consultar tabelas grandes com mais de 1000 linhas',
      'Quando você quer que o EF pule a validação no save',
    ],
    correct: 1,
    explanation: 'AsNoTracking() diz ao EF para não registrar as entidades no Change Tracker. Isso é mais rápido e usa menos memória para queries somente leitura — relatórios, respostas de API, dropdowns. Se você precisar atualizar a entidade depois, não use.',
  },
  {
    id: 'ef3',
    question: 'Por que a maioria dos projetos .NET NÃO precisa de uma camada IRepository<T> customizada sobre o EF Core?',
    options: [
      'Porque o EF Core não suporta o padrão repository',
      'Porque DbSet<T> já é um repository — tem Add, Find, Where, Remove. Adicionar IRepository é uma abstração sobre outra abstração sem benefício.',
      'Porque repositories são necessários apenas para SQL Server',
      'Porque DbContext gerencia transações automaticamente',
    ],
    correct: 1,
    explanation: 'DbSet<T> JÁ É o repository e DbContext JÁ É o Unit of Work. Envolvê-los em IRepository<T> adiciona código, manutenção e complexidade sem benefício real na maioria dos casos. Adicione uma camada de repository apenas se tiver uma razão específica — como suportar múltiplas fontes de dados.',
  },
  {
    id: 'ef4',
    question: 'Qual é a forma correta de executar múltiplas operações de banco como uma unidade atômica?',
    options: [
      'Chamar SaveChangesAsync após cada operação individual',
      'Usar múltiplos DbContexts, um por operação',
      'Agrupar todas as operações e chamar SaveChangesAsync uma vez — ou usar uma transação explícita para operações que abrangem múltiplos SaveChangesAsync',
      'O EF Core gerencia atomicidade automaticamente sem configuração',
    ],
    correct: 2,
    explanation: 'Uma única chamada de SaveChangesAsync envolve todas as mudanças pendentes em uma transação de banco automaticamente. Para workflows complexos que precisam de múltiplos SaveChangesAsync atômicos, use BeginTransactionAsync explicitamente.',
  },
  {
    id: 'ef5',
    question: 'Você precisa executar uma query de relatório complexa com 5 joins e agregações. Qual é a melhor ferramenta?',
    options: [
      'EF Core com LINQ — sempre fique no ORM',
      'ADO.NET com SQL puro para máximo controle',
      'Dapper — você escreve o SQL, ele mapeia os resultados para objetos C# com overhead mínimo',
      'Somente stored procedures — sem ORMs para queries complexas',
    ],
    correct: 2,
    explanation: 'Queries analíticas complexas são onde o Dapper brilha. Você escreve o SQL exato que quer, o Dapper mapeia os resultados. Sem surpresas de tradução LINQ, sem riscos de N+1, controle total — com muito menos cerimônia que ADO.NET puro.',
  },
];

export const efCoreTopicPtBr: Topic = {
  slug: 'ef-core',
  title: 'EF Core',
  description: 'Como o Entity Framework Core funciona, o que o Change Tracker faz e quando usar EF Core, Dapper ou SQL puro.',
  icon: '🗄️',
  status: 'available',
  color: '#a78bfa',
  sections: [
    {
      id: 'what-is-ef-core',
      title: 'O que é EF Core?',
      content: [
        {
          type: 'text',
          text: 'EF Core é um ORM — Object-Relational Mapper. Ele permite trabalhar com seu banco de dados usando classes C# e LINQ em vez de escrever SQL na mão. Você define seu modelo de dados em C# e o EF Core cuida da tradução para SQL.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🗺️', title: 'Mapeia C# ↔ SQL', description: 'Sua classe C# Order mapeia para a tabela Orders. Propriedades mapeiam para colunas. O EF Core cuida da tradução nos dois sentidos.', color: '#a78bfa' },
            { icon: '🔄', title: 'Rastreia mudanças', description: 'Carregue uma entidade, mude uma propriedade, chame SaveChangesAsync — o EF gera o UPDATE automaticamente. Sem SQL manual.', color: '#4f8ef7' },
            { icon: '📋', title: 'Gerencia schema', description: 'Migrations mantêm o schema do banco em sincronia com seu modelo C#. Com controle de versão e repetível.', color: '#00d4aa' },
            { icon: '🔍', title: 'Queries LINQ', description: 'Escreva queries em C# usando LINQ. O EF as traduz para SQL eficiente em tempo de execução.', color: '#f7a24f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Instalar EF Core',
          code: `# SQL Server
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# PostgreSQL
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# CLI de migrations
dotnet tool install --global dotnet-ef`,
        },
      ],
    },
    {
      id: 'dbcontext-dbset',
      title: 'DbContext & DbSet — A Base',
      content: [
        {
          type: 'text',
          text: 'DbContext é sua porta de entrada para o banco de dados. Cada DbSet<T> dentro dele representa uma tabela. Isso é tudo que você precisa para começar a consultar e salvar dados.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Seu primeiro DbContext',
          code: `// Entidade — mapeia para a tabela Orders
public class Order
{
    public Guid Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItem> Items { get; set; } = [];
}

// DbContext — porta de entrada para o banco
public class AppDbContext(DbContextOptions<AppDbContext> options)
    : DbContext(options)
{
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Registrar no Program.cs + primeira migration',
          code: `// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Terminal — gerar e aplicar o schema
dotnet ef migrations add CriacaoInicial
dotnet ef database update`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'AddDbContext registra o contexto como scoped — uma instância por requisição HTTP, com seu próprio Change Tracker e conexão de banco. Nunca registre como singleton: compartilhar um DbContext entre requisições causa bugs de concorrência.',
        },
      ],
    },
    {
      id: 'change-tracker',
      title: 'O Change Tracker — O Coração do EF Core',
      content: [
        {
          type: 'text',
          text: 'O Change Tracker é o que faz o EF Core parecer mágico. Toda entidade que você carrega fica registrada e monitorada. Quando você chama SaveChangesAsync, o EF compara os valores atuais com o snapshot original e gera apenas o SQL que reflete o que realmente mudou.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📸', title: 'Unchanged', description: 'Entidade foi carregada mas nada mudou. Nenhum SQL gerado no save.', color: '#4f8ef7' },
            { icon: '✏️', title: 'Modified', description: 'Uma propriedade foi alterada. O EF gera um UPDATE com apenas as colunas alteradas.', color: '#f7a24f' },
            { icon: '➕', title: 'Added', description: 'Entidade adicionada via db.Orders.Add(). O EF gera um INSERT no save.', color: '#00d4aa' },
            { icon: '🗑️', title: 'Deleted', description: 'Entidade removida via db.Orders.Remove(). O EF gera um DELETE no save.', color: '#f74f4f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Change Tracker em ação',
          code: `// 1. Carregar — entidade agora está "Unchanged"
var order = await db.Orders.FindAsync(orderId);

// 2. Modificar — entidade torna-se "Modified"
order.Total = 149.99m;
order.CustomerName = "Jane Doe";

// 3. Salvar — EF gera:
// UPDATE Orders SET Total=149.99, CustomerName='Jane Doe' WHERE Id=...
// Apenas as duas colunas alteradas — não a linha inteira
await db.SaveChangesAsync();`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'O Change Tracker é o motivo pelo qual você deve manter o DbContext de vida curta. Quanto mais tempo ele vive, mais entidades acumula — e mais memória usa. Em web apps, um DbContext por requisição é o padrão correto.',
        },
      ],
    },
    {
      id: 'linq-queries',
      title: 'Consultando com LINQ',
      content: [
        {
          type: 'text',
          text: 'Queries LINQ contra DbSet são traduzidas para SQL em tempo de execução. Elas não são executadas até você chamar um operador terminal como ToListAsync ou FirstOrDefaultAsync — isso se chama execução diferida.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Os operadores LINQ mais úteis',
          code: `// Filtrar — WHERE
var recentes = await db.Orders
    .Where(o => o.CreatedAt > DateTime.UtcNow.AddDays(-7))
    .ToListAsync();

// Encontrar um — retorna null se não encontrado
var order = await db.Orders
    .FirstOrDefaultAsync(o => o.Id == orderId);

// Buscar por chave primária — lookup de linha mais rápido
var order = await db.Orders.FindAsync(orderId);

// Selecionar apenas o necessário — não carregue entidades completas para views
var resumos = await db.Orders
    .Select(o => new { o.Id, o.CustomerName, o.Total })
    .ToListAsync();

// Verificar existência — usa SELECT TOP 1, não COUNT(*)
var existe = await db.Orders
    .AnyAsync(o => o.CustomerId == customerId);

// Ordenar + paginar
var pagina = await db.Orders
    .OrderByDescending(o => o.CreatedAt)
    .Skip(indicePagina * tamanhoPagina)
    .Take(tamanhoPagina)
    .ToListAsync();

// Carregar dados relacionados
var comItens = await db.Orders
    .Include(o => o.Items)
    .ToListAsync();`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Sempre use as variantes Async — ToListAsync, FirstOrDefaultAsync, AnyAsync. As versões síncronas bloqueiam a thread e prejudicam a escalabilidade em web apps.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use Select() para projetar apenas as colunas necessárias. Carregar uma entidade completa quando você só exibe nome e ID desperdiça memória e deixa as queries lentas. É um dos hábitos de maior impacto para desenvolver cedo.',
        },
      ],
    },
    {
      id: 'as-no-tracking',
      title: 'AsNoTracking — Para Queries Somente Leitura',
      content: [
        {
          type: 'text',
          text: 'Toda entidade que você carrega fica registrada no Change Tracker. Para dados somente leitura — listas, relatórios, respostas de API — você está pagando esse overhead à toa. AsNoTracking pula tudo isso.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📊',
              title: 'Com tracking (padrão)',
              description: 'Entidade é registrada e monitorada. Use quando você planeja modificar e salvar a entidade depois.',
              color: '#f7a24f',
            },
            {
              icon: '⚡',
              title: 'AsNoTracking',
              description: 'Entidade não é registrada. Mais rápido, menos memória. Use para qualquer query onde você só está lendo os dados.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'AsNoTracking na prática',
          code: `// ✅ Somente leitura — pule o tracker
var orders = await db.Orders
    .AsNoTracking()
    .Where(o => o.Status == OrderStatus.Shipped)
    .Select(o => new OrderDto(o.Id, o.CustomerName, o.Total))
    .ToListAsync();

// ✅ Precisa atualizar — mantenha o tracking
var order = await db.Orders.FindAsync(orderId);
order.Status = OrderStatus.Cancelled;
await db.SaveChangesAsync();`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Regra simples: se a query alimenta um endpoint GET ou uma view somente leitura — use AsNoTracking. Se o resultado pode ser atualizado e salvo — deixe o tracking ligado.',
        },
      ],
    },
    {
      id: 'unit-of-work',
      title: 'Unit of Work & Transações',
      content: [
        {
          type: 'text',
          text: 'DbContext é o padrão Unit of Work — ele agrupa todas as suas mudanças e as comita de uma vez. Uma única chamada SaveChangesAsync envolve tudo em uma transação de banco automaticamente.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Um SaveChangesAsync = uma transação',
          code: `public async Task RealizarPedidoAsync(CriarPedidoRequest request)
{
    var order = new Order
    {
        Id = Guid.NewGuid(),
        CustomerName = request.CustomerName,
        Total = request.Items.Sum(i => i.Price * i.Quantity),
        CreatedAt = DateTime.UtcNow,
    };

    db.Orders.Add(order);

    foreach (var item in request.Items)
        db.OrderItems.Add(new OrderItem { OrderId = order.Id, ...item });

    // Todos os inserts comitados juntos — ou nenhum deles
    await db.SaveChangesAsync();
}`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Transações Explícitas',
        },
        {
          type: 'text',
          text: 'Quando você precisa que múltiplos SaveChangesAsync sejam atômicos — por exemplo, ao chamar um serviço externo no meio — use uma transação explícita.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Transação explícita',
          code: `await using var transaction = await db.Database.BeginTransactionAsync();
try
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();                    // primeiro save

    await gatewayPagamento.CobrarAsync(order.Total); // chamada externa

    order.Status = OrderStatus.Paid;
    await db.SaveChangesAsync();                    // segundo save

    await transaction.CommitAsync();                // ambos os saves comitados juntos
}
catch
{
    await transaction.RollbackAsync();              // nenhum save sobrevive
    throw;
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Para a maioria das operações, um único SaveChangesAsync é tudo que você precisa — ele já é transacional. Só use transações explícitas quando você tiver múltiplos SaveChangesAsync que precisam ser atômicos.',
        },
      ],
    },
    {
      id: 'no-repository',
      title: 'DbSet Já é um Repository',
      content: [
        {
          type: 'text',
          text: 'Muitos tutoriais adicionam uma camada genérica IRepository<T> em cima do EF Core. Na maioria dos projetos, isso é overhead desnecessário — e adiciona custo real sem benefício real.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📦', title: 'DbSet<T>', description: 'Add, Find, Where, Remove, Any, Count — já é um repository. Embutido, testado pela Microsoft, zero código extra.', color: '#00d4aa' },
            { icon: '🔧', title: 'DbContext', description: 'SaveChangesAsync, transações, múltiplos DbSets — já é o Unit of Work. Embutido, zero código extra.', color: '#4f8ef7' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Injete DbContext diretamente — sem wrapper',
          code: `// ✅ Simples e direto
public class ServicoPedidos(AppDbContext db)
{
    public async Task<Order?> GetByIdAsync(Guid id)
        => await db.Orders.FindAsync(id);

    public async Task<List<Order>> GetRecentesAsync()
        => await db.Orders
            .AsNoTracking()
            .Where(o => o.CreatedAt > DateTime.UtcNow.AddDays(-30))
            .ToListAsync();

    public async Task CriarAsync(Order order)
    {
        db.Orders.Add(order);
        await db.SaveChangesAsync();
    }
}

// ❌ Desnecessário — IRepository<T> só delega para DbSet mesmo
// Mais arquivos, mais código, mesmo resultado`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Adicione uma camada de repository apenas se tiver uma razão real: suportar múltiplas fontes de dados, ou uma codebase tão grande que isolar o acesso a dados tem valor organizacional claro. Para a maioria dos projetos — injete DbContext e siga em frente.',
        },
      ],
    },
    {
      id: 'ef-vs-dapper-vs-ado',
      title: 'EF Core vs Dapper vs ADO.NET',
      content: [
        {
          type: 'text',
          text: 'Não existe ferramenta universalmente melhor — cada uma existe por uma razão. A pergunta é sempre: o que essa tarefa específica precisa?',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🏗️',
              title: 'EF Core',
              description: 'Mais abstração, mais produtividade. Você escreve C#, o EF escreve SQL. Migrations, Change Tracking, LINQ. O padrão certo para qualquer novo projeto .NET.',
              color: '#a78bfa',
            },
            {
              icon: '⚡',
              title: 'Dapper',
              description: 'Meio-termo. Você escreve o SQL, o Dapper mapeia os resultados para objetos C#. Ótimo para queries complexas onde LINQ fica awkward.',
              color: '#4f8ef7',
            },
            {
              icon: '🔩',
              title: 'ADO.NET',
              description: 'Menos abstração, mais controle. SQL puro, mapeamento manual, gerenciamento explícito de conexão. Use apenas quando cada milissegundo importa.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A mesma query — três ferramentas',
          code: `// EF Core — LINQ, sem SQL escrito
var orders = await db.Orders
    .Where(o => o.CustomerId == customerId && o.Total > 100)
    .OrderByDescending(o => o.CreatedAt)
    .Take(10)
    .ToListAsync();

// Dapper — você escreve SQL, ele mapeia o resultado
var orders = await connection.QueryAsync<Order>(@"
    SELECT TOP 10 * FROM Orders
    WHERE CustomerId = @customerId AND Total > 100
    ORDER BY CreatedAt DESC",
    new { customerId });

// ADO.NET — controle total, cerimônia total
using var cmd = new SqlCommand("SELECT TOP 10 ...", connection);
cmd.Parameters.AddWithValue("@customerId", customerId);
using var reader = await cmd.ExecuteReaderAsync();
var orders = new List<Order>();
while (await reader.ReadAsync())
    orders.Add(new Order { Id = reader.GetGuid(0), ... });`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🚀', title: 'Comece aqui', description: 'EF Core — rápido de configurar, produtivo, fácil de mudar. O padrão certo para qualquer novo projeto.', color: '#a78bfa' },
            { icon: '📊', title: 'Adicione quando precisar', description: 'Dapper — use junto com EF Core para relatórios ou queries que ficam dolorosas em LINQ. Funcionam muito bem juntos.', color: '#4f8ef7' },
            { icon: '🔬', title: 'Reserve para caminhos críticos', description: 'ADO.NET — apenas depois de perfilar e provar que EF Core ou Dapper é realmente o gargalo.', color: '#f7a24f' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'EF Core e Dapper funcionam muito bem no mesmo projeto — use EF Core para seu CRUD padrão e Dapper para aquela query de relatório complexa com 5 joins. Você não precisa escolher apenas um.',
        },
      ],
    },
  ],
};