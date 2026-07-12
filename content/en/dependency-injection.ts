import type { Topic, QuizQuestion } from '@/types';

export const dependencyInjectionQuiz: QuizQuestion[] = [
  {
    id: 'di1',
    question: 'What problem does Dependency Injection solve in .NET?',
    options: [
      'It makes all classes faster automatically',
      'It moves object creation out of your business logic so code depends on abstractions, not concrete wiring',
      'It replaces interfaces entirely',
      'It removes the need for constructors',
    ],
    correct: 1,
    explanation: 'DI separates object creation from object use. Your classes ask for what they need, and the container supplies it. That keeps business code focused on behavior instead of construction details.',
  },
  {
    id: 'di2',
    question: 'Which lifetime should you usually use for EF Core DbContext in ASP.NET Core?',
    options: [
      'Singleton',
      'Transient',
      'Scoped',
      'Static',
    ],
    correct: 2,
    explanation: 'DbContext should normally be scoped because it represents one unit of work per request. It is not thread-safe and should not be shared across requests.',
  },
  {
    id: 'di3',
    question: 'What is the main risk of registering a service as Singleton when it depends on scoped services?',
    options: [
      'The singleton will be created too quickly',
      'It can capture a scoped service and end up using it after its request lifetime has ended',
      'Singletons cannot have constructors',
      'Scoped services become faster',
    ],
    correct: 1,
    explanation: 'A singleton lives for the whole application, while a scoped service lives for one request. Mixing them usually creates lifetime bugs and sometimes runtime errors. The long-lived service should not hold a shorter-lived dependency.',
  },
  {
    id: 'di4',
    question: 'What is constructor injection?',
    options: [
      'Passing dependencies through method parameters every time',
      'Creating dependencies with new inside the constructor',
      'Declaring dependencies in the constructor so the container can provide them',
      'Reading services from IServiceProvider inside every method',
    ],
    correct: 2,
    explanation: 'Constructor injection is the default and preferred approach in ASP.NET Core. It makes dependencies explicit, keeps classes easy to test, and works naturally with the built-in container.',
  },
  {
    id: 'di5',
    question: 'Why is resolving services from IServiceProvider inside business code usually a bad idea?',
    options: [
      'It is always slower than constructor injection',
      'It hides dependencies and turns your code into a service locator, which is harder to test and reason about',
      'IServiceProvider cannot be used in ASP.NET Core',
      'The container will ignore interfaces',
    ],
    correct: 1,
    explanation: 'Using IServiceProvider directly makes dependencies implicit. Constructor injection is better because the class declares exactly what it needs, and tests can replace those dependencies without spinning up the container.',
  },
];

export const dependencyInjectionTopic: Topic = {
  slug: 'dependency-injection',
  title: 'Dependency Injection',
  description: 'How the built-in .NET container works, how to choose lifetimes, and how to write clean ASP.NET Core code with constructor injection.',
  icon: '💉',
  status: 'available',
  color: '#9034fa',
  sections: [
    {
      id: 'what-di-is',
      title: 'What DI Is',
      content: [
        {
          type: 'text',
          text: 'Dependency Injection means your class receives what it needs from the outside instead of creating everything itself. In .NET, this is usually handled by the built-in container in ASP.NET Core.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🛠️', title: 'Without DI', description: 'Classes create their own dependencies with new. Code gets tightly coupled and harder to test.', color: '#f74f4f' },
            { icon: '📦', title: 'With DI', description: 'A container creates and supplies dependencies. Your code depends on abstractions and stays focused on behavior.', color: '#9034fa' },
            { icon: '🧪', title: 'Testability', description: 'Mocks and fakes can replace real services in unit tests without changing business code.', color: '#00d4aa' },
            { icon: '🧩', title: 'Composition root', description: 'Registration happens at the edge of the app, usually in Program.cs, not inside domain logic.', color: '#4f8ef7' },
          ],
        },
      ],
    },
    {
      id: 'registration',
      title: 'Registering Services',
      content: [
        {
          type: 'text',
          text: 'You tell the container how to build services during startup. The most common methods are AddTransient, AddScoped, and AddSingleton.',
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Program.cs registration',
          code: `builder.Services.AddTransient<IEmailSender, SmtpEmailSender>();
builder.Services.AddScoped<IOrderService, OrderService>();
builder.Services.AddSingleton<IClock, SystemClock>();

builder.Services.AddControllers();`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔁', title: 'Transient', description: 'A new instance every time it is requested. Good for lightweight, stateless services.', color: '#4f8ef7' },
            { icon: '📄', title: 'Scoped', description: 'One instance per request. Good for DbContext and request-specific state.', color: '#9034fa' },
            { icon: '♾️', title: 'Singleton', description: 'One instance for the entire app lifetime. Use only for stateless or carefully managed shared services.', color: '#f7a24f' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'If a service has no state, Transient is often fine. If it tracks request data or uses EF Core, Scoped is usually the right choice. Singleton should be deliberate, not the default.',
        },
      ],
    },
    {
      id: 'lifetimes',
      title: 'Service Lifetimes',
      content: [
        {
          type: 'text',
          text: 'Lifetimes are where most DI mistakes happen. The rule is simple: a long-lived service must not depend on a shorter-lived one.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🌐', title: 'Scoped in web apps', description: 'Each HTTP request gets its own scope. That is why request-based services fit naturally here.', color: '#9034fa' },
            { icon: '🧵', title: 'Transient usage', description: 'A fresh instance is created each time. Good when you want isolation and no shared state.', color: '#4f8ef7' },
            { icon: '🏠', title: 'Singleton caution', description: 'Avoid storing mutable state unless it is explicitly thread-safe and intended to be shared.', color: '#f74f4f' },
            { icon: '🚫', title: 'Lifetime mismatch', description: 'A singleton depending on scoped services is a common bug and should be avoided.', color: '#a78bfa' },
          ],
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'EF Core and request scope',
          code: `builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

builder.Services.AddScoped<IOrderService, OrderService>();`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'DbContext is not thread-safe and should not be reused across requests. In ASP.NET Core, AddDbContext registers it as scoped for a reason: one request, one context, one unit of work.',
        },
      ],
    },
    {
      id: 'constructor-injection',
      title: 'Constructor Injection',
      content: [
        {
          type: 'text',
          text: 'Constructor injection is the cleanest way to use DI. The class says what it needs, and the container provides it when the object is created.',
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Controller injection',
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
            { icon: '✅', title: 'Explicit dependencies', description: 'You can see what the class needs just by reading the constructor.', color: '#00d4aa' },
            { icon: '🧪', title: 'Easy tests', description: 'Tests can pass fakes or mocks directly without booting the app.', color: '#4f8ef7' },
            { icon: '🔍', title: 'Readable code', description: 'No hidden service lookups and no surprise runtime wiring inside methods.', color: '#9034fa' },
          ],
        },
        {
          type: 'callout',
          variant: 'danger',
          text: 'Avoid the service locator style. If a class keeps asking IServiceProvider for dependencies inside methods, the object is hiding what it really needs.',
        },
      ],
    },
    {
      id: 'background-and-options',
      title: 'Background Services and Options',
      content: [
        {
          type: 'text',
          text: 'Some services need special handling. Background workers do not have a request scope, and configuration is best consumed through the options pattern.',
        },
        {
          type: 'code',
          language: 'csharp',
          label: 'Scoped work inside a background service',
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
          text: 'Use IServiceScopeFactory when background code needs scoped services. Use IOptions<T> when a class needs configuration data. Both are standard DI patterns in ASP.NET Core.',
        },
      ],
    },
    {
      id: 'summary',
      title: 'Practical Rules',
      content: [
        {
          type: 'concept-grid',
          items: [
            { icon: '🧭', title: 'Prefer constructor injection', description: 'Make dependencies explicit and easy to test.', color: '#9034fa' },
            { icon: '🧱', title: 'Register at the edge', description: 'Keep wiring in Program.cs, not inside business logic.', color: '#4f8ef7' },
            { icon: '🧮', title: 'Choose lifetimes carefully', description: 'Transient for stateless, Scoped for request work, Singleton only when safe.', color: '#00d4aa' },
            { icon: '🚫', title: 'Do not use service locator', description: 'If a class asks for dependencies at runtime, it is harder to understand and test.', color: '#f74f4f' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The built-in .NET container is great for composition, lifetimes, and constructor injection. Keep it simple, keep registrations in one place, and let your classes depend on interfaces, not wiring details.',
        },
      ],
    },
  ],
};
