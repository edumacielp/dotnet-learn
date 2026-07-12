import type { Topic, QuizQuestion } from '@/types';

export const dependencyInjectionQuizPtBr: QuizQuestion[] = [
  {
    id: 'di1',
    question: 'Qual problema a Injeção de Dependência resolve no .NET?',
    options: [
      'Ela faz todas as classes ficarem automaticamente mais rápidas',
      'Ela tira a criação de objetos de dentro da lógica de negócio, para o código depender de abstrações e não de wiring concreto',
      'Ela substitui interfaces completamente',
      'Ela remove a necessidade de construtores',
    ],
    correct: 1,
    explanation: 'DI separa a criação do uso. Suas classes pedem o que precisam, e o container fornece. Isso mantém o código de negócio focado em comportamento, não em detalhes de construção.',
  },
  {
    id: 'di2',
    question: 'Qual lifetime você normalmente deve usar para DbContext no ASP.NET Core?',
    options: [
      'Singleton',
      'Transient',
      'Scoped',
      'Static',
    ],
    correct: 2,
    explanation: 'DbContext normalmente deve ser Scoped porque representa uma unidade de trabalho por request. Ele não é thread-safe e não deve ser compartilhado entre requisições.',
  },
  {
    id: 'di3',
    question: 'Qual é o principal risco de registrar um serviço como Singleton quando ele depende de serviços Scoped?',
    options: [
      'O singleton será criado rápido demais',
      'Ele pode capturar um serviço scoped e continuar usando depois que o request terminou',
      'Singletons não podem ter construtor',
      'Serviços scoped ficam mais rápidos',
    ],
    correct: 1,
    explanation: 'Um singleton vive durante toda a aplicação, enquanto um scoped vive apenas um request. Misturar os dois costuma criar bugs de lifetime e, em alguns casos, erros em runtime. O serviço de longa vida não deve segurar uma dependência de curta vida.',
  },
  {
    id: 'di4',
    question: 'O que é constructor injection?',
    options: [
      'Passar dependências em cada chamada de método',
      'Criar dependências com new dentro do construtor',
      'Declarar dependências no construtor para o container fornecer',
      'Ler serviços de IServiceProvider dentro de cada método',
    ],
    correct: 2,
    explanation: 'Constructor injection é a abordagem padrão e preferida no ASP.NET Core. Ela deixa as dependências explícitas, facilita testes e combina naturalmente com o container nativo.',
  },
  {
    id: 'di5',
    question: 'Por que resolver serviços com IServiceProvider dentro do código de negócio normalmente é uma má ideia?',
    options: [
      'Sempre é mais lento que constructor injection',
      'Isso esconde dependências e transforma o código em service locator, deixando testes e entendimento mais difíceis',
      'IServiceProvider não pode ser usado no ASP.NET Core',
      'O container ignora interfaces',
    ],
    correct: 1,
    explanation: 'Usar IServiceProvider diretamente torna as dependências implícitas. Constructor injection é melhor porque a classe declara exatamente o que precisa, e os testes podem substituir essas dependências sem subir o container.',
  },
];

export const dependencyInjectionTopicPtBr: Topic = {
  slug: 'dependency-injection',
  title: 'Dependency Injection',
  description: 'Como o container nativo do .NET funciona, como escolher lifetimes e como escrever ASP.NET Core limpo com constructor injection.',
  icon: '💉',
  status: 'available',
  color: '#9034fa',
  sections: [
    {
      id: 'what-di-is',
      title: 'O que DI é',
      content: [
        {
          type: 'text',
          text: 'Dependency Injection significa que sua classe recebe o que precisa de fora, em vez de criar tudo sozinha. No .NET, isso normalmente é feito pelo container nativo do ASP.NET Core.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🛠️', title: 'Sem DI', description: 'As classes criam suas próprias dependências com new. O código fica acoplado e difícil de testar.', color: '#f74f4f' },
            { icon: '📦', title: 'Com DI', description: 'Um container cria e entrega dependências. O código depende de abstrações e fica focado no comportamento.', color: '#9034fa' },
            { icon: '🧪', title: 'Testabilidade', description: 'Mocks e fakes substituem serviços reais em testes sem mudar o código de negócio.', color: '#00d4aa' },
            { icon: '🧩', title: 'Composition root', description: 'O registro acontece na borda da aplicação, normalmente em Program.cs, não na lógica de domínio.', color: '#4f8ef7' },
          ],
        },
      ],
    },
    {
      id: 'registration',
      title: 'Registrando Serviços',
      content: [
        {
          type: 'text',
          text: 'Você informa ao container como montar os serviços durante o startup. Os métodos mais comuns são AddTransient, AddScoped e AddSingleton.',
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Registro no Program.cs',
          code: `builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<IClock, SystemClock>();

builder.Services.AddControllers();`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔁', title: 'Transient', description: 'Uma nova instância a cada solicitação. Bom para serviços leves e sem estado.', color: '#4f8ef7' },
            { icon: '📄', title: 'Scoped', description: 'Uma instância por request. Bom para DbContext e estado do request.', color: '#9034fa' },
            { icon: '♾️', title: 'Singleton', description: 'Uma instância para toda a vida da aplicação. Use só quando for seguro compartilhar.', color: '#f7a24f' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Se o serviço não tem estado, Transient costuma ser suficiente. Se ele usa dados do request ou EF Core, Scoped geralmente é o certo. Singleton deve ser uma escolha consciente, não o padrão.',
        },
      ],
    },
    {
      id: 'lifetimes',
      title: 'Lifetimes dos Serviços',
      content: [
        {
          type: 'text',
          text: 'A maioria dos erros de DI acontece aqui. A regra é simples: um serviço de longa vida não deve depender de um serviço de vida mais curta.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🌐', title: 'Scoped em web apps', description: 'Cada request HTTP ganha seu próprio scope. Por isso serviços ligados a request combinam com esse lifetime.', color: '#9034fa' },
            { icon: '🧵', title: 'Uso de Transient', description: 'Uma instância nova é criada toda vez. Bom quando você quer isolamento e nenhum estado compartilhado.', color: '#4f8ef7' },
            { icon: '🏠', title: 'Cuidado com Singleton', description: 'Evite guardar estado mutável, a menos que ele seja thread-safe e realmente compartilhado de propósito.', color: '#f74f4f' },
            { icon: '🚫', title: 'Mismatch de lifetime', description: 'Um singleton depender de scoped é um bug comum e deve ser evitado.', color: '#a78bfa' },
          ],
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'EF Core e escopo de request',
          code: `builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IOrderService, OrderService>();`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'DbContext não é thread-safe e não deve ser reutilizado entre requests. No ASP.NET Core, AddDbContext registra ele como scoped por um motivo: um request, um contexto, uma unidade de trabalho.',
        },
      ],
    },
    {
      id: 'constructor-injection',
      title: 'Constructor Injection',
      content: [
        {
          type: 'text',
          text: 'Constructor injection é a forma mais limpa de usar DI. A classe declara o que precisa, e o container fornece quando o objeto é criado.',
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Injeção em controller',
          code: `public class OrdersController : ControllerBase
{
    private readonly IOrderService _orders;
    private readonly ILogger<OrdersController> _logger;

    public OrdersController(IOrderService orders, ILogger<OrdersController> logger)
    {
        _orders = orders;
        _logger = logger;
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> Get(Guid id)
    {
        var order = await _orders.GetAsync(id);
        return order is null ? NotFound() : Ok(order);
    }
}`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✅', title: 'Dependências explícitas', description: 'Você vê o que a classe precisa só lendo o construtor.', color: '#00d4aa' },
            { icon: '🧪', title: 'Testes fáceis', description: 'Tests podem passar fakes ou mocks sem subir a aplicação inteira.', color: '#4f8ef7' },
            { icon: '🔍', title: 'Código legível', description: 'Sem lookups escondidos de serviço e sem wiring surpresa dentro de métodos.', color: '#9034fa' },
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          text: 'Evite o estilo service locator. Se a classe fica pedindo dependências em tempo de execução via IServiceProvider, ela está escondendo o que realmente precisa.',
        },
      ],
    },
    {
      id: 'background-and-options',
      title: 'Background Services e Options',
      content: [
        {
          type: 'text',
          text: 'Alguns cenários precisam de tratamento especial. Workers em background não têm scope de request, e configuração costuma ser melhor consumida via options pattern.',
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Trabalho scoped em background service',
          code: `public class CleanupWorker(IServiceScopeFactory scopeFactory) : BackgroundService
{
    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        using var scope = scopeFactory.CreateScope();
        var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();

        await db.CleanupOldRecordsAsync(stoppingToken);
    }
}`,
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Options pattern',
          code: `builder.Services.Configure<SmtpOptions>(
    builder.Configuration.GetSection("Smtp"));

public class EmailSender(IOptions<SmtpOptions> options)
{
    private readonly SmtpOptions _options = options.Value;
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Use IServiceScopeFactory quando código em background precisar de serviços scoped. Use IOptions<T> quando a classe precisar de configuração. Ambos são padrões normais de DI no ASP.NET Core.',
        },
      ],
    },
    {
      id: 'summary',
      title: 'Regras Práticas',
      content: [
        {
          type: 'concept-grid',
          items: [
            { icon: '🧭', title: 'Prefira constructor injection', description: 'Deixe as dependências explícitas e fáceis de testar.', color: '#9034fa' },
            { icon: '🧱', title: 'Registre na borda', description: 'Mantenha o wiring no Program.cs, não na lógica de negócio.', color: '#4f8ef7' },
            { icon: '🧮', title: 'Escolha lifetime com cuidado', description: 'Transient para sem estado, Scoped para request, Singleton só quando for seguro.', color: '#00d4aa' },
            { icon: '🚫', title: 'Não use service locator', description: 'Se a classe busca dependências em runtime, ela fica mais difícil de entender e testar.', color: '#f74f4f' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'O container nativo do .NET é ótimo para composição, lifetimes e constructor injection. Mantenha simples, concentre os registros em um lugar e faça as classes dependerem de interfaces, não de detalhes de wiring.',
        },
      ],
    },
  ],
};
