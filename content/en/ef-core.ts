import type { Topic, QuizQuestion } from '@/types';

export const efCoreQuiz: QuizQuestion[] = [
  {
    id: 'ef1',
    question: 'What does EF Core\'s Change Tracker do?',
    options: [
      'It tracks how long each SQL query takes to run',
      'It watches every entity you load from the database and detects what changed — so SaveChangesAsync knows exactly what SQL to generate',
      'It logs all database connections for debugging',
      'It manages database migrations automatically',
    ],
    correct: 1,
    explanation: 'The Change Tracker is EF Core\'s core mechanism. When you load an entity, EF snapshots its original values. On SaveChangesAsync, it compares current values to the snapshot and generates only the SQL that reflects what actually changed.',
  },
  {
    id: 'ef2',
    question: 'When should you use AsNoTracking()?',
    options: [
      'Always — it makes every query faster',
      'When you only need to read data and display it — no updates, no saves. It skips the Change Tracker overhead entirely.',
      'Only when querying large tables with more than 1000 rows',
      'When you want EF to skip validation on save',
    ],
    correct: 1,
    explanation: 'AsNoTracking() tells EF not to register the entities in the Change Tracker. This is faster and uses less memory for read-only queries — reports, API responses, dropdowns. If you need to update the entity later, don\'t use it.',
  },
  {
    id: 'ef3',
    question: 'Why do most .NET projects NOT need a custom IRepository<T> layer on top of EF Core?',
    options: [
      'Because EF Core doesn\'t support the repository pattern',
      'Because DbSet<T> is already a repository — it has Add, Find, Where, Remove. Adding IRepository is an abstraction over an abstraction with no benefit.',
      'Because repositories are only needed for SQL Server',
      'Because DbContext handles transactions automatically',
    ],
    correct: 1,
    explanation: 'DbSet<T> IS the repository and DbContext IS the unit of work. Wrapping them in IRepository<T> adds code, maintenance, and complexity without meaningful benefit in most cases. Add a repository layer only if you have a specific reason — like supporting multiple data sources.',
  },
  {
    id: 'ef4',
    question: 'What is the correct way to run multiple database operations as one atomic unit?',
    options: [
      'Call SaveChangesAsync after each individual operation',
      'Use multiple DbContexts, one per operation',
      'Group all operations and call SaveChangesAsync once — or use an explicit transaction for operations that span multiple SaveChangesAsync calls',
      'EF Core handles atomicity automatically without any configuration',
    ],
    correct: 2,
    explanation: 'A single SaveChangesAsync call wraps all pending changes in one database transaction automatically. For complex workflows that need multiple SaveChangesAsync calls to be atomic, use BeginTransactionAsync explicitly.',
  },
  {
    id: 'ef5',
    question: 'You need to run a complex report query with 5 joins and aggregations. What is the best tool?',
    options: [
      'EF Core with LINQ — always stay in the ORM',
      'ADO.NET with raw SQL for maximum control',
      'Dapper — write the SQL yourself, map results to C# objects with minimal overhead',
      'Stored procedures only — no ORMs for complex queries',
    ],
    correct: 2,
    explanation: 'Complex analytical queries are where Dapper shines. You write the exact SQL you want, Dapper maps the results. No LINQ translation surprises, no N+1 risks, full control — with far less boilerplate than raw ADO.NET.',
  },
];

export const efCoreTopic: Topic = {
  slug: 'ef-core',
  title: 'EF Core',
  description: 'How Entity Framework Core works, what the Change Tracker does, and when to use EF Core, Dapper, or raw SQL.',
  icon: '🗄️',
  status: 'available',
  color: '#a78bfa',
  sections: [
    {
      id: 'what-is-ef-core',
      title: 'What is EF Core?',
      content: [
        {
          type: 'text',
          text: 'EF Core is an ORM — Object-Relational Mapper. It lets you work with your database using C# classes and LINQ instead of writing SQL by hand. You define your data model in C#, and EF Core handles the translation to SQL.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🗺️', title: 'Maps C# ↔ SQL', description: 'Your C# class Order maps to the Orders table. Properties map to columns. EF Core handles the translation both ways.', color: '#a78bfa' },
            { icon: '🔄', title: 'Tracks changes', description: 'Load an entity, change a property, call SaveChangesAsync — EF generates the UPDATE automatically. No SQL needed.', color: '#4f8ef7' },
            { icon: '📋', title: 'Manages schema', description: 'Migrations keep your database schema in sync with your C# model. Version-controlled and repeatable.', color: '#00d4aa' },
            { icon: '🔍', title: 'LINQ queries', description: 'Write queries in C# using LINQ. EF translates them to efficient SQL at runtime.', color: '#f7a24f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Install EF Core',
          code: `# SQL Server
dotnet add package Microsoft.EntityFrameworkCore.SqlServer

# PostgreSQL
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL

# Migrations CLI
dotnet tool install --global dotnet-ef`,
        },
      ],
    },
    {
      id: 'dbcontext-dbset',
      title: 'DbContext & DbSet — The Foundation',
      content: [
        {
          type: 'text',
          text: 'DbContext is your gateway to the database. Each DbSet<T> inside it represents one table. This is all you need to start querying and saving data.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Your first DbContext',
          code: `// Entity — maps to the Orders table
public class Order
{
    public Guid Id { get; set; }
    public string CustomerName { get; set; } = string.Empty;
    public decimal Total { get; set; }
    public DateTime CreatedAt { get; set; }
    public List<OrderItem> Items { get; set; } = [];
}

// DbContext — gateway to the database
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
          label: 'Register in Program.cs + first migration',
          code: `// Program.cs
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Terminal — generate and apply the schema
dotnet ef migrations add InitialCreate
dotnet ef database update`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'AddDbContext registers the context as scoped — one instance per HTTP request, with its own Change Tracker and database connection. Never register it as a singleton: sharing a DbContext across requests causes concurrency bugs.',
        },
      ],
    },
    {
      id: 'change-tracker',
      title: 'The Change Tracker — EF Core\'s Heart',
      content: [
        {
          type: 'text',
          text: 'The Change Tracker is what makes EF Core feel like magic. Every entity you load gets registered and watched. When you call SaveChangesAsync, EF compares current values to the original snapshot and generates only the SQL that reflects what actually changed.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📸', title: 'Unchanged', description: 'Entity was loaded but nothing changed. No SQL generated on save.', color: '#4f8ef7' },
            { icon: '✏️', title: 'Modified', description: 'A property was changed. EF generates an UPDATE with only the changed columns.', color: '#f7a24f' },
            { icon: '➕', title: 'Added', description: 'Entity added via db.Orders.Add(). EF generates an INSERT on save.', color: '#00d4aa' },
            { icon: '🗑️', title: 'Deleted', description: 'Entity removed via db.Orders.Remove(). EF generates a DELETE on save.', color: '#f74f4f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Change Tracker in action',
          code: `// 1. Load — entity is now "Unchanged"
var order = await db.Orders.FindAsync(orderId);

// 2. Modify — entity becomes "Modified"
order.Total = 149.99m;
order.CustomerName = "Jane Doe";

// 3. Save — EF generates:
// UPDATE Orders SET Total=149.99, CustomerName='Jane Doe' WHERE Id=...
// Only the two changed columns — not the entire row
await db.SaveChangesAsync();`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'The Change Tracker is why you should keep DbContext short-lived. The longer it lives, the more entities it accumulates — and the more memory it uses. In web apps, one DbContext per request is the right default.',
        },
      ],
    },
    {
      id: 'linq-queries',
      title: 'Querying with LINQ',
      content: [
        {
          type: 'text',
          text: 'LINQ queries against DbSet are translated to SQL at runtime. They\'re not executed until you call a terminal operator like ToListAsync or FirstOrDefaultAsync — this is called deferred execution.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'The most useful LINQ operators',
          code: `// Filter rows — WHERE
var recent = await db.Orders
    .Where(o => o.CreatedAt > DateTime.UtcNow.AddDays(-7))
    .ToListAsync();

// Find one — returns null if not found
var order = await db.Orders
    .FirstOrDefaultAsync(o => o.Id == orderId);

// Find by primary key — fastest single-row lookup
var order = await db.Orders.FindAsync(orderId);

// Select only what you need — don't load full entities for read views
var names = await db.Orders
    .Select(o => new { o.Id, o.CustomerName, o.Total })
    .ToListAsync();

// Check existence — uses SELECT TOP 1, not COUNT(*)
var exists = await db.Orders
    .AnyAsync(o => o.CustomerId == customerId);

// Sort + paginate
var page = await db.Orders
    .OrderByDescending(o => o.CreatedAt)
    .Skip(pageIndex * pageSize)
    .Take(pageSize)
    .ToListAsync();

// Load related data
var withItems = await db.Orders
    .Include(o => o.Items)
    .ToListAsync();`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Always use the Async variants — ToListAsync, FirstOrDefaultAsync, AnyAsync. The synchronous versions block the thread and hurt scalability in web apps.',
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use Select() to project only the columns you need. Loading a full entity when you only display its name and ID wastes memory and slows queries. It\'s one of the highest-impact habits to build early.',
        },
      ],
    },
    {
      id: 'as-no-tracking',
      title: 'AsNoTracking — For Read-Only Queries',
      content: [
        {
          type: 'text',
          text: 'Every entity you load gets registered in the Change Tracker. For read-only data — lists, reports, API responses — you\'re paying that overhead for nothing. AsNoTracking skips it entirely.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📊',
              title: 'With tracking (default)',
              description: 'Entity is registered and watched. Use when you plan to modify and save the entity later.',
              color: '#f7a24f',
            },
            {
              icon: '⚡',
              title: 'AsNoTracking',
              description: 'Entity is not registered. Faster, less memory. Use for any query where you\'re only reading the data.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'AsNoTracking in practice',
          code: `// ✅ Read-only — skip the tracker
var orders = await db.Orders
    .AsNoTracking()
    .Where(o => o.Status == OrderStatus.Shipped)
    .Select(o => new OrderDto(o.Id, o.CustomerName, o.Total))
    .ToListAsync();

// ✅ Need to update — keep tracking on
var order = await db.Orders.FindAsync(orderId);
order.Status = OrderStatus.Cancelled;
await db.SaveChangesAsync();`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Simple rule: if the query feeds a GET endpoint or a read-only view — use AsNoTracking. If the result might be updated and saved — leave tracking on.',
        },
      ],
    },
    {
      id: 'unit-of-work',
      title: 'Unit of Work & Transactions',
      content: [
        {
          type: 'text',
          text: 'DbContext is the Unit of Work pattern — it batches all your changes and commits them in one go. A single SaveChangesAsync wraps everything in a database transaction automatically.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'One SaveChangesAsync = one transaction',
          code: `public async Task PlaceOrderAsync(CreateOrderRequest request)
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

    // All inserts committed together — or none at all
    await db.SaveChangesAsync();
}`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Explicit Transactions',
        },
        {
          type: 'text',
          text: 'When you need multiple SaveChangesAsync calls to be atomic — for example, when calling an external service in between — use an explicit transaction.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Explicit transaction',
          code: `await using var transaction = await db.Database.BeginTransactionAsync();
try
{
    db.Orders.Add(order);
    await db.SaveChangesAsync();              // first save

    await paymentGateway.ChargeAsync(order.Total); // external call

    order.Status = OrderStatus.Paid;
    await db.SaveChangesAsync();              // second save

    await transaction.CommitAsync();          // both saves committed together
}
catch
{
    await transaction.RollbackAsync();        // neither save survives
    throw;
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'For most operations, a single SaveChangesAsync is all you need — it\'s already transactional. Only reach for explicit transactions when you have multiple SaveChangesAsync calls that must succeed or fail together.',
        },
      ],
    },
    {
      id: 'no-repository',
      title: 'DbSet is Already a Repository',
      content: [
        {
          type: 'text',
          text: 'Many tutorials add a generic IRepository<T> wrapper on top of EF Core. In most projects, this is unnecessary overhead — and it adds real costs with no real benefit.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📦', title: 'DbSet<T>', description: 'Add, Find, Where, Remove, Any, Count — it\'s already a repository. Built-in, tested by Microsoft, zero extra code.', color: '#00d4aa' },
            { icon: '🔧', title: 'DbContext', description: 'SaveChangesAsync, transactions, multiple DbSets — it\'s already the Unit of Work. Built-in, zero extra code.', color: '#4f8ef7' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Inject DbContext directly — no wrapper needed',
          code: `// ✅ Simple and direct
public class OrderService(AppDbContext db)
{
    public async Task<Order?> GetByIdAsync(Guid id)
        => await db.Orders.FindAsync(id);

    public async Task<List<Order>> GetRecentAsync()
        => await db.Orders
            .AsNoTracking()
            .Where(o => o.CreatedAt > DateTime.UtcNow.AddDays(-30))
            .ToListAsync();

    public async Task CreateAsync(Order order)
    {
        db.Orders.Add(order);
        await db.SaveChangesAsync();
    }
}

// ❌ Unnecessary — IRepository<T> just delegates to DbSet anyway
// More files, more code, same result`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Add a repository layer only if you have a real reason: supporting multiple data sources, or a codebase so large that isolating data access provides clear organisational value. For most projects — inject DbContext and move on.',
        },
      ],
    },
    {
      id: 'ef-vs-dapper-vs-ado',
      title: 'EF Core vs Dapper vs ADO.NET',
      content: [
        {
          type: 'text',
          text: 'There is no universally best tool — each exists for a reason. The question is always: what does this specific task need?',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🏗️',
              title: 'EF Core',
              description: 'Most abstraction, most productivity. You write C#, EF writes SQL. Migrations, Change Tracking, LINQ. The right default for any new .NET project.',
              color: '#a78bfa',
            },
            {
              icon: '⚡',
              title: 'Dapper',
              description: 'Middle ground. You write the SQL, Dapper maps results to C# objects. Great for complex queries where LINQ gets awkward.',
              color: '#4f8ef7',
            },
            {
              icon: '🔩',
              title: 'ADO.NET',
              description: 'Least abstraction, most control. Raw SQL, manual mapping, explicit connection management. Use only when every millisecond matters.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Same query — three tools',
          code: `// EF Core — LINQ, no SQL written
var orders = await db.Orders
    .Where(o => o.CustomerId == customerId && o.Total > 100)
    .OrderByDescending(o => o.CreatedAt)
    .Take(10)
    .ToListAsync();

// Dapper — you write SQL, it maps the result
var orders = await connection.QueryAsync<Order>(@"
    SELECT TOP 10 * FROM Orders
    WHERE CustomerId = @customerId AND Total > 100
    ORDER BY CreatedAt DESC",
    new { customerId });

// ADO.NET — full control, full ceremony
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
            { icon: '🚀', title: 'Start here', description: 'EF Core — fast to set up, productive, easy to change. The right default for any new project.', color: '#a78bfa' },
            { icon: '📊', title: 'Add when needed', description: 'Dapper — use alongside EF Core for reports or queries that feel painful in LINQ. They work great together.', color: '#4f8ef7' },
            { icon: '🔬', title: 'Reserve for hot paths', description: 'ADO.NET — only after you\'ve profiled and proven EF Core or Dapper is actually the bottleneck.', color: '#f7a24f' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'EF Core and Dapper work great in the same project — use EF Core for your standard CRUD and Dapper for the one complex report query with 5 joins. You don\'t have to pick just one.',
        },
      ],
    },
  ],
};