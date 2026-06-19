import type { Topic, QuizQuestion } from '@/types';

export const memoryQuiz: QuizQuestion[] = [
  {
    id: 'mem1',
    question: 'In C#, what is the difference between a value type and a reference type?',
    options: [
      'Value types are faster to declare; reference types are faster to read',
      'Value types store the actual data (copied on assignment); reference types store a memory address pointing to the data (shared on assignment)',
      'Value types live forever; reference types are deleted after each method call',
      'There is no meaningful difference in modern .NET',
    ],
    correct: 1,
    explanation: 'int x = 5 → the value 5 is stored directly. When you do var y = x, y gets its own copy. For reference types (classes, records), var b = a means both a and b point to the same object in memory. Mutating through b also mutates what a sees.',
  },
  {
    id: 'mem2',
    question: 'What does `var copy = original` do when `original` is a class instance?',
    options: [
      'Creates a deep clone of all properties',
      'Creates a new object with the same values',
      'Makes copy point to the same object — not a copy at all',
      'Copies only the primitive properties, not nested objects',
    ],
    correct: 2,
    explanation: 'This is the most common C# trap. `var copy = original` copies the reference (the address), not the object. Both variables now point to the same memory. Mutating one mutates the other — which is exactly how the Hangfire closure bug happens.',
  },
  {
    id: 'mem3',
    question: 'What does C#\'s `record with { }` expression do?',
    options: [
      'Updates the record in-place with new values',
      'Creates a brand new copy of the record with specified properties changed — the original is untouched',
      'Marks the record as read-only at runtime',
      'Converts the record to a dictionary',
    ],
    correct: 1,
    explanation: 'The `with` expression performs a non-destructive copy — it allocates a new object with all the original values, but overrides the ones you specify. This is the idiomatic way to "update" immutable records in C# without mutation.',
  },
  {
    id: 'mem4',
    question: 'Why does loading a full EF Core entity (instead of projecting with Select) waste memory?',
    options: [
      'EF Core entities use a special memory format that is less efficient',
      'The full entity allocates every column on the heap — even ones you never use. Select() allocates only what you actually need.',
      'EF Core entities are stored on the stack, which is limited',
      'Full entities prevent the GC from running',
    ],
    correct: 1,
    explanation: 'When you load a Customer entity with 20 columns to display only their Name and Email, the other 18 columns are still allocated on the heap and tracked by the Change Tracker. Select() projects only what you need — less allocation, less GC pressure, faster queries.',
  },
  {
    id: 'mem5',
    question: 'What triggers the Garbage Collector to reclaim memory?',
    options: [
      'The GC runs on a fixed timer every 30 seconds',
      'The GC runs automatically when memory pressure builds up — you don\'t control it, but you help it by releasing references early',
      'You must call GC.Collect() manually at the end of each method',
      'The GC only runs when the app is idle',
    ],
    correct: 1,
    explanation: 'The .NET GC is automatic and generational. It runs when needed, promoting surviving objects through Gen0 → Gen1 → Gen2. You help it by not holding references longer than needed, disposing resources explicitly, and avoiding unnecessary large allocations.',
  },
];

export const memoryTopic: Topic = {
  slug: 'memory',
  title: 'Memory & References',
  description: 'RAM - Stack vs Heap, value vs reference types, mutation bugs, the GC, and why projections matter for memory.',
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
          text: 'Every variable in your program lives somewhere in memory. In .NET, there are two places: the Stack and the Heap. Understanding the difference explains most of the confusing behaviors you\'ll encounter in C#.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📚',
              title: 'Stack',
              description: 'Fast, ordered, and automatic. Each method call gets a stack frame. When the method returns, everything in it is instantly gone. Stores local variables and method parameters.',
              color: '#4f8ef7',
            },
            {
              icon: '🗃️',
              title: 'Heap',
              description: 'Larger, unordered, and managed by the GC. Objects that outlive a single method call live here. Classes, arrays, strings — anything with dynamic size or shared lifetime.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Stack vs Heap in practice',
          code: `void ProcessOrder()
{
    // Stack — int, bool, struct: stored directly in the stack frame
    int quantity = 5;
    bool isPaid = true;

    // Heap — class instance: the reference lives on the stack,
    //        the actual Order object lives on the heap
    var order = new Order { Id = Guid.NewGuid(), Total = 99.99m };

} // ← method returns: stack frame gone instantly
  //   order on heap: GC cleans it up later when no references remain`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'When a method ends, its stack frame is popped instantly — no GC needed. The Heap requires the Garbage Collector because objects there can be referenced from many places and don\'t have a single clear "end of life".',
        },
      ],
    },
    {
      id: 'value-vs-reference',
      title: 'Value Types vs Reference Types',
      content: [
        {
          type: 'text',
          text: 'This is the single most important concept in C# memory. It determines what happens when you assign, pass, or compare variables.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📋',
              title: 'Value types',
              description: 'int, double, bool, DateTime, struct, enum. Assignment COPIES the value. Each variable has its own independent data.',
              color: '#4f8ef7',
            },
            {
              icon: '🔗',
              title: 'Reference types',
              description: 'class, record, string, array, List<T>. Assignment copies the REFERENCE (the address). Both variables point to the same object.',
              color: '#f74f4f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'The assignment difference',
          code: `// VALUE TYPE — assignment makes an independent copy
int a = 10;
int b = a;  // b gets its own copy of 10
b = 99;
Console.WriteLine(a); // 10 — a is untouched

// REFERENCE TYPE — assignment copies the address, not the object
var order1 = new Order { Total = 100 };
var order2 = order1;  // order2 points to the SAME object
order2.Total = 999;
Console.WriteLine(order1.Total); // 999 — order1 was mutated too!`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: '`var copy = original` does NOT create a copy when original is a class or record. It creates a second variable pointing to the same object. This is the root cause of the most common mutation bugs in C#.',
        },
      ],
    },
    {
      id: 'shared-references-bug',
      title: 'Shared References & Mutation Bugs',
      content: [
        {
          type: 'text',
          text: 'Shared references become dangerous when combined with loops and delayed execution. Here\'s a real-world bug that shows exactly how this plays out — the kind of bug that\'s hard to spot because the code looks correct at first glance.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ The bug — shared reference mutated inside a loop',
          code: `// invoiceIds = ["INV-123", "INV-456"]
var invoiceIdArray = webhookModel.msg.order_number.Split('|');

var updatedModel = webhookModel; // ← NOT a copy — same object in memory

foreach (var invoiceId in invoiceIdArray)
{
    // Mutates the SAME object on every iteration
    updatedModel.msg.order_number = invoiceId.Trim();

    // Enqueues a background job — but the job captures the REFERENCE
    // not the current value of order_number
    backgroundJobs.Enqueue(() => PostToLegacy(updatedModel));
}

// What actually happens:
// Iteration 1: order_number set to "INV-123", job enqueued with reference
// Iteration 2: order_number set to "INV-456", SAME object mutated
// Both jobs now see "INV-456" — INV-123 is silently lost`,
        },
        {
          type: 'text',
          text: 'Three things combine to create this bug: reference types share memory, the variable is declared outside the loop so there is only one object, and the background job captures the reference — not a snapshot of the value.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ The fix — create a new object per iteration with record `with`',
          code: `var invoiceIdArray = webhookModel.msg.order_number.Split('|');

foreach (var invoiceId in invoiceIdArray)
{
    // "with" creates a BRAND NEW object each iteration
    // The original webhookModel is never touched
    var updatedModel = webhookModel with
    {
        msg = webhookModel.msg with { order_number = invoiceId.Trim() }
    };

    // Now each job captures its own independent object
    backgroundJobs.Enqueue(() => PostToLegacy(updatedModel));
}

// Iteration 1: new object with order_number = "INV-123" ✓
// Iteration 2: new object with order_number = "INV-456" ✓
// Both jobs get the correct invoice ID`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The `with` expression is the idiomatic C# solution for "I want to update a record without mutating it." It allocates a new object with all the original values, overriding only the ones you specify. The original is untouched.',
        },
      ],
    },
    {
      id: 'closures',
      title: 'Closures & Captured Variables',
      content: [
        {
          type: 'text',
          text: 'A closure is what happens when a lambda captures a variable from its outer scope. The key detail: it captures the variable itself — not its value at that moment. This is what makes the loop bug above dangerous even beyond reference types.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Closure captures the variable, not the value',
          code: `// Classic closure bug in a loop
var actions = new List<Action>();

for (int i = 0; i < 3; i++)
{
    actions.Add(() => Console.WriteLine(i)); // captures 'i' itself
}

actions.ForEach(a => a()); // prints: 3, 3, 3 — not 0, 1, 2!
// By the time the lambdas run, the loop finished and i = 3

// Fix: capture a local copy inside the loop
for (int i = 0; i < 3; i++)
{
    var captured = i; // new variable per iteration
    actions.Add(() => Console.WriteLine(captured));
}
actions.ForEach(a => a()); // prints: 0, 1, 2 ✓`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Same issue with foreach + reference types',
          code: `// foreach doesn't help if the object itself is mutated
var models = new List<WebhookModel>();

foreach (var id in ids)
{
    model.OrderId = id;           // mutating the shared object
    models.Add(model);            // adding the same reference every time
}
// models contains the same object N times, all with the last id

// Fix: create a new instance per iteration
foreach (var id in ids)
{
    var snapshot = model with { OrderId = id }; // new object each time
    models.Add(snapshot);
}`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Any time you pass a lambda to a background job, event, or async operation — think about what it captures. If it captures a variable that will be mutated later, you have a bug waiting to happen. Create a local snapshot first.',
        },
      ],
    },
    {
      id: 'garbage-collector',
      title: 'The Garbage Collector',
      content: [
        {
          type: 'text',
          text: 'The GC is .NET\'s automatic memory manager. It finds objects on the heap that nothing references anymore and reclaims that memory. You don\'t call it — it runs automatically. But you can help or hurt it with your code.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🐣', title: 'Gen 0', description: 'New, short-lived objects. Collected frequently and fast. Most objects should die here — HTTP request data, temporary variables.', color: '#00d4aa' },
            { icon: '🐤', title: 'Gen 1', description: 'Survived one Gen 0 collection. A buffer between short and long-lived objects.', color: '#f7a24f' },
            { icon: '🦅', title: 'Gen 2', description: 'Long-lived objects — static data, caches, DbContext if you hold it too long. Collected rarely but expensively. Avoid unnecessary promotion here.', color: '#f74f4f' },
          ],
        },
        {
          type: 'text',
          text: 'The GC is generational because most objects die young. A short Gen 0 collection is cheap. Promoting objects to Gen 2 is expensive. Your goal: let objects die in Gen 0.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'IDisposable — release unmanaged resources explicitly',
          code: `// ❌ Resource leak — connection not guaranteed to close
var connection = new SqlConnection(connectionString);
connection.Open();
// ... if an exception happens here, connection never closes

// ✅ using statement — Dispose() called even if exception thrown
using var connection = new SqlConnection(connectionString);
connection.Open();
// connection.Dispose() called automatically at end of scope

// ✅ using for streams, file handles, HttpClient responses
using var stream = File.OpenRead("data.json");
using var response = await httpClient.GetAsync(url);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The GC handles managed memory automatically. IDisposable handles everything else — database connections, file handles, network streams. Always wrap IDisposable objects in `using`. The GC won\'t close your database connection for you.',
        },
      ],
    },
    {
      id: 'projections',
      title: 'Projections — Load Only What You Need',
      content: [
        {
          type: 'text',
          text: 'Every column you load from the database is allocated on the heap. Every tracked entity costs memory in the Change Tracker. Loading full entities when you only need a few fields is one of the most common sources of unnecessary memory pressure in .NET apps.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ Loading more than needed',
          code: `// Customer has 20 columns. You only display Name and Email.
// All 20 columns are allocated. All are tracked. All waste memory.
var customers = await db.Customers
    .Where(c => c.IsActive)
    .ToListAsync(); // allocates full Customer objects

foreach (var c in customers)
    Console.WriteLine(\$"{c.Name} — {c.Email}"); // only used 2 of 20 fields`,
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ Project only what you need',
          code: `// Only Name and Email are allocated. Nothing tracked. Fast.
var customers = await db.Customers
    .Where(c => c.IsActive)
    .Select(c => new { c.Name, c.Email })  // SQL: SELECT Name, Email FROM Customers
    .ToListAsync();

// Or project to a dedicated DTO
var customers = await db.Customers
    .Where(c => c.IsActive)
    .Select(c => new CustomerSummaryDto(c.Id, c.Name, c.Email))
    .ToListAsync();`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📦', title: 'Full entity', description: 'All columns loaded and heap-allocated. Change Tracker registers each object. Use when you\'ll update and save the entity.', color: '#f74f4f' },
            { icon: '✂️', title: 'Projection (Select)', description: 'Only requested columns loaded. No Change Tracker overhead. Use for any read-only query — lists, API responses, reports.', color: '#00d4aa' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Combine AsNoTracking() with Select() for maximum efficiency on read-only queries. AsNoTracking() skips the Change Tracker. Select() reduces what gets allocated. Together they\'re significantly faster than loading full entities.',
        },
      ],
    },
    {
      id: 'immutability',
      title: 'Immutability — Avoid the Problem Entirely',
      content: [
        {
          type: 'text',
          text: 'The safest way to avoid shared reference bugs is to make objects that can\'t be mutated after creation. C# records with init-only properties give you this for free.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Immutable records',
          code: `// record with init-only properties — cannot be mutated after creation
public record OrderCreated(
    Guid OrderId,
    string CustomerName,
    decimal Total,
    DateTimeOffset CreatedAt
);

var evt = new OrderCreated(Guid.NewGuid(), "Jane", 149.99m, DateTimeOffset.UtcNow);

// evt.Total = 0; ← compile error — init-only property
// Cannot mutate, cannot share incorrectly, safe to pass anywhere

// To "update" — create a new instance
var corrected = evt with { Total = 199.99m }; // new object, original unchanged`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Strings are immutable — operations return new instances',
          code: `// String is a reference type, but immutable
var name = "hello";
var upper = name.ToUpper(); // returns a NEW string "HELLO"

Console.WriteLine(name);  // "hello" — original untouched
Console.WriteLine(upper); // "HELLO" — new object

// This is why string concatenation in a loop is expensive:
var result = "";
for (int i = 0; i < 1000; i++)
    result += i; // creates 1000 new string objects on the heap!

// Use StringBuilder for loops
var sb = new StringBuilder();
for (int i = 0; i < 1000; i++)
    sb.Append(i);
var result = sb.ToString(); // one allocation at the end`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Prefer records over classes for data that flows through your system — events, DTOs, command objects. Records are immutable by default, support `with` expressions, and have value-based equality. Classes make sense for stateful objects with behavior.',
        },
      ],
    },
    {
      id: 'best-practices',
      title: 'Memory Best Practices',
      content: [
        {
          type: 'text',
          text: 'You don\'t need to think about memory on every line. But these habits prevent the most common problems before they happen.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📌', title: 'Don\'t hold references', description: 'Release objects as soon as you\'re done — null large collections, use short-lived DbContexts, avoid static state for transient data.', color: '#00d4aa' },
            { icon: '✂️', title: 'Project, don\'t load', description: 'Use Select() for read-only queries. Never load full entities to display two fields.', color: '#4f8ef7' },
            { icon: '🏗️', title: 'Use records for data', description: 'DTOs, events, commands — make them records. Immutability prevents whole categories of mutation bugs.', color: '#a78bfa' },
            { icon: '🔄', title: 'Dispose resources', description: 'Wrap every IDisposable in `using`. Database connections, streams, HTTP responses — the GC won\'t close them.', color: '#f7a24f' },
            { icon: '👁️', title: 'Snapshot before capturing', description: 'Before passing a variable to a lambda or background job, capture a local snapshot inside the loop scope.', color: '#f74f4f' },
            { icon: '🏎️', title: 'Measure before optimizing', description: 'Don\'t guess at memory problems. Use dotnet-counters or a profiler to find actual pressure before rewriting code.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'The complete pattern — safe loop with background jobs',
          code: `// Everything together: immutable records, local snapshot, no mutation
foreach (var invoiceId in invoiceIds)
{
    // ✅ New object per iteration — no shared reference
    var snapshot = webhookModel with
    {
        msg = webhookModel.msg with { order_number = invoiceId.Trim() }
    };

    // ✅ Lambda captures snapshot — its own object, immutable
    backgroundJobs.Enqueue(() => ProcessInvoice(snapshot));
}

// Each job gets its own data. No mutation. No closure bug. No lost invoices.`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'When you hit a bug involving stale data, unexpected mutations, or background jobs processing the wrong values — start by asking: "Is this a reference type? Is there a shared variable outside the loop? Is a lambda capturing something that gets mutated later?" These three questions will find the bug.',
        },
      ],
    },
  ],
};