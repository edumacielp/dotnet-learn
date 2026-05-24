import type { Topic, QuizQuestion } from '@/types';

export const messagingQuiz: QuizQuestion[] = [
  {
    id: 'msg1',
    question: 'Why use messaging instead of direct HTTP calls between services?',
    options: [
      'Because HTTP is too slow for any use case',
      'So services don\'t need to be running at the same time — the sender sends and moves on, the receiver processes when it\'s ready',
      'Because REST APIs can\'t send data between services',
      'Messaging is only useful for mobile apps',
    ],
    correct: 1,
    explanation: 'With HTTP, both services must be up and responding at the same time. With messaging, the sender drops a message on a queue and continues. The receiver picks it up whenever it\'s ready — even if it was offline for a moment.',
  },
  {
    id: 'msg2',
    question: 'What is the difference between a Queue and a Topic?',
    options: [
      'A Queue is for databases; a Topic is for APIs',
      'A Queue delivers each message to one consumer; a Topic delivers each message to all subscribers',
      'Topics are faster than Queues',
      'There is no practical difference',
    ],
    correct: 1,
    explanation: 'Queue = one message, one consumer (e.g. a job to be processed once). Topic/Exchange = one message, many consumers (e.g. "order placed" → billing, inventory, and email all receive it independently).',
  },
  {
    id: 'msg3',
    question: 'In MassTransit, what does a Consumer do?',
    options: [
      'It publishes messages to a queue',
      'It handles incoming messages — you define what happens when a specific message type arrives',
      'It manages database connections for messaging',
      'It monitors the health of message brokers',
    ],
    correct: 1,
    explanation: 'A Consumer is a class that implements `IConsumer<TMessage>`. When a message of that type arrives in the queue, MassTransit calls your `Consume` method. It\'s the handler for incoming messages.',
  },
  {
    id: 'msg4',
    question: 'What problem does the Saga Pattern solve?',
    options: [
      'How to send messages faster',
      'How to coordinate a business process that spans multiple services, where each step depends on the previous one completing successfully',
      'How to compress large messages',
      'How to authenticate message consumers',
    ],
    correct: 1,
    explanation: 'A Saga manages a long-running process across services — like placing an order (reserve stock → charge payment → ship). It tracks the state and knows what to do next, including how to compensate (undo) if a step fails.',
  },
  {
    id: 'msg5',
    question: 'What is a compensating transaction in the Saga Pattern?',
    options: [
      'A transaction that runs twice for reliability',
      'An action that undoes a previous step when something later in the process fails',
      'A backup copy of a message that failed to deliver',
      'A database rollback command',
    ],
    correct: 1,
    explanation: 'If step 3 of a saga fails, you can\'t use a database rollback across services. Instead, you run compensating transactions — actions that logically undo the earlier steps. For example: if payment fails after stock was reserved, release the reserved stock.',
  },
];

export const messagingTopic: Topic = {
  slug: 'messaging',
  title: 'Messaging',
  description: 'Queues, events, and the Saga Pattern — how .NET services talk without depending on each other.',
  icon: '📨',
  status: 'available',
  color: '#f7a24f',
  sections: [
    {
      id: 'why-messaging',
      title: 'Why Messaging?',
      content: [
        {
          type: 'text',
          text: 'When Service A calls Service B directly over HTTP, they\'re coupled: B must be running, healthy, and fast — or A fails too. Messaging breaks that dependency. A drops a message on a queue and moves on. B processes it whenever it\'s ready.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔌', title: 'Decoupling', description: 'Services don\'t need to know about each other. The sender doesn\'t care who handles the message.', color: '#f7a24f' },
            { icon: '💪', title: 'Resilience', description: 'If a service goes down, messages wait in the queue. Nothing is lost. When it comes back, it picks up where it left off.', color: '#00d4aa' },
            { icon: '📈', title: 'Scale independently', description: 'Getting too many orders? Add more instances of the Order Consumer. The queue balances the load automatically.', color: '#4f8ef7' },
            { icon: '🔁', title: 'Retry built-in', description: 'If processing fails, the message can go back to the queue and be retried automatically — no extra code needed.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Messaging is not a replacement for HTTP. Use HTTP for queries that need an immediate response. Use messaging for work that can be processed asynchronously — sending emails, processing payments, generating reports.',
        },
      ],
    },
    {
      id: 'core-concepts',
      title: 'Core Concepts',
      content: [
        {
          type: 'text',
          text: 'Before jumping into code, these three concepts cover everything else you\'ll see in messaging systems.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📬',
              title: 'Queue',
              description: 'A line of messages waiting to be processed. Each message is delivered to exactly one consumer. Use for tasks: "process this payment", "send this email".',
              color: '#f7a24f',
            },
            {
              icon: '📢',
              title: 'Topic / Exchange',
              description: 'A broadcast channel. One message is delivered to all subscribers. Use for events: "order placed" → billing, inventory, and notifications all receive it.',
              color: '#4f8ef7',
            },
            {
              icon: '✉️',
              title: 'Message',
              description: 'A plain C# class — your data. Keep messages small, flat, and versioning-friendly. Never put domain objects or EF entities directly in messages.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A simple message — just a record',
          code: `// Messages are simple data classes — no logic, no dependencies
public record OrderPlaced(
    Guid OrderId,
    Guid CustomerId,
    decimal Total,
    DateTimeOffset PlacedAt
);

// Command — tells a service to do something (one consumer)
public record SendConfirmationEmail(
    Guid OrderId,
    string CustomerEmail
);

// Event — announces something happened (many consumers can react)
public record PaymentFailed(
    Guid OrderId,
    string Reason
);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Name commands as verbs ("SendEmail", "ProcessPayment"). Name events as past tense ("EmailSent", "PaymentFailed"). This makes the intent of each message immediately clear.',
        },
      ],
    },
    {
      id: 'brokers',
      title: 'Message Brokers',
      content: [
        {
          type: 'text',
          text: 'A broker is the infrastructure that holds your queues and delivers messages. You don\'t build this — you pick one and connect to it.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🐰',
              title: 'RabbitMQ',
              description: 'Open source, runs anywhere, great for development and self-hosted setups. Run it locally with Docker in seconds.',
              color: '#f7a24f',
            },
            {
              icon: '☁️',
              title: 'Azure Service Bus',
              description: 'Managed broker on Azure. Dead-letter queues, sessions, and enterprise features built in. Best choice if you\'re already on Azure.',
              color: '#0078d4',
            },
            {
              icon: '⚡',
              title: 'Amazon SQS / SNS',
              description: 'AWS equivalent. SQS = queue, SNS = topic. Simple and reliable for AWS-hosted .NET apps.',
              color: '#f79f4f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Run RabbitMQ locally with Docker',
          code: `# Start RabbitMQ with the management UI
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

# Management UI: http://localhost:15672
# Default login: guest / guest`,
        },
      ],
    },
    {
      id: 'masstransit',
      title: 'MassTransit — Messaging in .NET',
      content: [
        {
          type: 'text',
          text: 'MassTransit is the standard .NET library for messaging. It works with RabbitMQ, Azure Service Bus, and others — write your code once and swap the broker by changing config. It handles routing, retries, and serialization so you don\'t have to.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Install MassTransit',
          code: `# For RabbitMQ
dotnet add package MassTransit.RabbitMQ

# For Azure Service Bus
dotnet add package MassTransit.Azure.ServiceBus.Core`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup in Program.cs',
          code: `builder.Services.AddMassTransit(x =>
{
    // Register all consumers in this assembly
    x.AddConsumers(Assembly.GetExecutingAssembly());

    x.UsingRabbitMq((ctx, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        // Auto-configure queues for all registered consumers
        cfg.ConfigureEndpoints(ctx);
    });
});`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Publishing a Message',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Publish from a service or endpoint',
          code: `public class OrderService(IPublishEndpoint publish)
{
    public async Task PlaceOrderAsync(CreateOrderRequest request)
    {
        // ... save order to database ...

        // Publish the event — all subscribers will receive it
        await publish.Publish(new OrderPlaced(
            OrderId: order.Id,
            CustomerId: request.CustomerId,
            Total: order.Total,
            PlacedAt: DateTimeOffset.UtcNow
        ));
    }
}`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Consuming a Message',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A consumer — handles one message type',
          code: `public class OrderPlacedConsumer(IEmailService email) 
    : IConsumer<OrderPlaced>
{
    public async Task Consume(ConsumeContext<OrderPlaced> context)
    {
        var order = context.Message;

        await email.SendConfirmationAsync(
            orderId: order.OrderId,
            customerId: order.CustomerId
        );
    }
}

// Another service can have its own consumer for the same event:
public class InventoryConsumer : IConsumer<OrderPlaced>
{
    public async Task Consume(ConsumeContext<OrderPlaced> context)
    {
        // Reserve stock for this order
    }
}`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'MassTransit automatically creates queues and bindings when the app starts. You don\'t need to configure anything in RabbitMQ manually. Just define your consumers and it handles the rest.',
        },
      ],
    },
    {
      id: 'retries-errors',
      title: 'Retries & Error Handling',
      content: [
        {
          type: 'text',
          text: 'Things go wrong — databases time out, APIs are briefly unavailable. Messaging systems have built-in support for this: retry the message, and if it keeps failing, move it somewhere safe for inspection.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Configure retries in MassTransit',
          code: `x.UsingRabbitMq((ctx, cfg) =>
{
    // Retry up to 3 times with exponential backoff
    cfg.UseMessageRetry(r =>
        r.Exponential(3, 
            minInterval: TimeSpan.FromSeconds(1),
            maxInterval: TimeSpan.FromSeconds(30),
            intervalDelta: TimeSpan.FromSeconds(5))
    );

    cfg.ConfigureEndpoints(ctx);
});`,
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🔁',
              title: 'Retry',
              description: 'The message is tried again after a delay. Good for transient failures like network timeouts.',
              color: '#00d4aa',
            },
            {
              icon: '☠️',
              title: 'Dead Letter Queue',
              description: 'After all retries are exhausted, the message moves to a special "dead letter" queue. You can inspect it, fix the bug, and requeue it.',
              color: '#f74f4f',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Always make your consumers idempotent — if the same message is processed twice (due to a retry), the result should be the same. Check if the work was already done before doing it again.',
        },
      ],
    },
    {
      id: 'saga-pattern',
      title: 'The Saga Pattern',
      content: [
        {
          type: 'text',
          text: 'Some business processes span multiple services and multiple steps. Placing an order, for example: reserve stock → charge payment → trigger shipping. If payment fails, you need to release the reserved stock. A Saga manages this entire flow.',
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'A Saga is just a class that tracks the current state of a long-running process and defines what to do when each event arrives. Think of it as a state machine for your business workflow.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '1️⃣', title: 'Order Placed', description: 'Saga starts. State = "AwaitingStock". Sends a ReserveStock command to Inventory service.', color: '#4f8ef7' },
            { icon: '2️⃣', title: 'Stock Reserved', description: 'Saga receives event. State = "AwaitingPayment". Sends a ChargePayment command to Payment service.', color: '#f7a24f' },
            { icon: '3️⃣', title: 'Payment Succeeded', description: 'Saga receives event. State = "Completed". Publishes OrderConfirmed. Done.', color: '#00d4aa' },
            { icon: '💥', title: 'Payment Failed', description: 'Saga receives event. Sends ReleaseStock to undo step 1. State = "Cancelled". Publishes OrderFailed.', color: '#f74f4f' },
          ],
        },
      ],
    },
    {
      id: 'saga-code',
      title: 'Saga in Code with MassTransit',
      content: [
        {
          type: 'text',
          text: 'MassTransit includes a saga implementation called State Machine Saga. You define the states, the events that trigger transitions, and what to do at each step.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Saga state — what gets persisted',
          code: `// This is saved to a database between events
public class OrderSagaState : SagaStateMachineInstance
{
    public Guid CorrelationId { get; set; } // ties all messages together
    public string CurrentState { get; set; } = string.Empty;
    public Guid CustomerId { get; set; }
    public decimal Total { get; set; }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Saga state machine',
          code: `public class OrderSaga : MassTransitStateMachine<OrderSagaState>
{
    public State AwaitingStock { get; private set; } = null!;
    public State AwaitingPayment { get; private set; } = null!;
    public State Completed { get; private set; } = null!;
    public State Cancelled { get; private set; } = null!;

    public Event<OrderPlaced> OrderPlaced { get; private set; } = null!;
    public Event<StockReserved> StockReserved { get; private set; } = null!;
    public Event<PaymentSucceeded> PaymentSucceeded { get; private set; } = null!;
    public Event<PaymentFailed> PaymentFailed { get; private set; } = null!;

    public OrderSaga()
    {
        InstanceState(x => x.CurrentState);

        // Correlate all messages by OrderId
        Event(() => OrderPlaced, x => x.CorrelateById(m => m.Message.OrderId));
        Event(() => StockReserved, x => x.CorrelateById(m => m.Message.OrderId));
        Event(() => PaymentSucceeded, x => x.CorrelateById(m => m.Message.OrderId));
        Event(() => PaymentFailed, x => x.CorrelateById(m => m.Message.OrderId));

        Initially(
            When(OrderPlaced)
                .Then(ctx =>
                {
                    ctx.Saga.CustomerId = ctx.Message.CustomerId;
                    ctx.Saga.Total = ctx.Message.Total;
                })
                .Publish(ctx => new ReserveStock(ctx.Message.OrderId))
                .TransitionTo(AwaitingStock)
        );

        During(AwaitingStock,
            When(StockReserved)
                .Publish(ctx => new ChargePayment(ctx.Saga.CorrelationId, ctx.Saga.Total))
                .TransitionTo(AwaitingPayment)
        );

        During(AwaitingPayment,
            When(PaymentSucceeded)
                .Publish(ctx => new OrderConfirmed(ctx.Saga.CorrelationId))
                .TransitionTo(Completed)
                .Finalize(),

            When(PaymentFailed)
                .Publish(ctx => new ReleaseStock(ctx.Saga.CorrelationId))
                .Publish(ctx => new OrderFailed(ctx.Saga.CorrelationId, "Payment declined"))
                .TransitionTo(Cancelled)
                .Finalize()
        );
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Register the saga with EF Core persistence',
          code: `// Install saga persistence
dotnet add package MassTransit.EntityFrameworkCore

// In Program.cs
builder.Services.AddMassTransit(x =>
{
    // Register the saga with EF Core for state persistence
    x.AddSagaStateMachine<OrderSaga, OrderSagaState>()
        .EntityFrameworkRepository(r =>
        {
            r.ConcurrencyMode = ConcurrencyMode.Optimistic;
            r.AddDbContext<DbContext, AppDbContext>();
        });

    x.UsingRabbitMq((ctx, cfg) =>
    {
        cfg.ConfigureEndpoints(ctx);
    });
});`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The `CorrelationId` is the key that ties all messages in a saga together. It should be your business ID — like the OrderId. Every message published during the process must carry it so MassTransit can route events to the correct saga instance.',
        },
      ],
    },
    {
      id: 'when-to-use',
      title: 'When to Use What',
      content: [
        {
          type: 'text',
          text: 'Not every problem needs a saga. Start simple and add complexity only when the problem demands it.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📬',
              title: 'Simple queue',
              description: 'One task, one consumer, no coordination needed. Send email, resize image, generate PDF. This covers 80% of messaging use cases.',
              color: '#00d4aa',
            },
            {
              icon: '📢',
              title: 'Publish / Subscribe',
              description: 'One event, multiple independent reactions. "Order placed" → billing, inventory, and notifications all act independently. No coordination between them.',
              color: '#4f8ef7',
            },
            {
              icon: '🗺️',
              title: 'Saga',
              description: 'Multi-step process where steps depend on each other, failures need to be compensated, and the whole flow must be tracked. Use when you have a business workflow that spans services.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Sagas add real complexity. Before reaching for one, ask: can I handle this with a simpler event flow? Many workflows that seem to need a saga can actually be solved with independent pub/sub consumers.',
        },
      ],
    },
  ],
};