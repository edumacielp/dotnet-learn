import type { Topic, QuizQuestion } from '@/types';

export const messagingQuizPtBr: QuizQuestion[] = [
  {
    id: 'msg1',
    question: 'Por que usar mensageria em vez de chamadas HTTP diretas entre serviços?',
    options: [
      'Porque HTTP é lento demais para qualquer caso de uso',
      'Para que os serviços não precisem estar rodando ao mesmo tempo — o remetente envia e segue em frente, o receptor processa quando estiver pronto',
      'Porque APIs REST não conseguem enviar dados entre serviços',
      'Mensageria só é útil para apps mobile',
    ],
    correct: 1,
    explanation: 'Com HTTP, ambos os serviços precisam estar up e respondendo ao mesmo tempo. Com mensageria, o remetente coloca uma mensagem numa fila e continua. O receptor a pega quando estiver pronto — mesmo que tenha ficado offline por um momento.',
  },
  {
    id: 'msg2',
    question: 'Qual é a diferença entre uma Queue e um Topic?',
    options: [
      'Queue é para bancos de dados; Topic é para APIs',
      'Uma Queue entrega cada mensagem a um consumidor; um Topic entrega cada mensagem a todos os assinantes',
      'Topics são mais rápidos que Queues',
      'Não há diferença prática',
    ],
    correct: 1,
    explanation: 'Queue = uma mensagem, um consumidor (ex: uma tarefa a ser processada uma vez). Topic/Exchange = uma mensagem, muitos consumidores (ex: "pedido realizado" → cobrança, estoque e email recebem de forma independente).',
  },
  {
    id: 'msg3',
    question: 'No MassTransit, o que um Consumer faz?',
    options: [
      'Ele publica mensagens em uma fila',
      'Ele lida com mensagens recebidas — você define o que acontece quando um tipo específico de mensagem chega',
      'Ele gerencia conexões de banco para mensageria',
      'Ele monitora a saúde dos brokers de mensagem',
    ],
    correct: 1,
    explanation: 'Um Consumer é uma classe que implementa `IConsumer<TMensagem>`. Quando uma mensagem daquele tipo chega na fila, o MassTransit chama seu método `Consume`. É o handler para mensagens recebidas.',
  },
  {
    id: 'msg4',
    question: 'Que problema o Padrão Saga resolve?',
    options: [
      'Como enviar mensagens mais rápido',
      'Como coordenar um processo de negócio que abrange múltiplos serviços, onde cada etapa depende da anterior ser concluída com sucesso',
      'Como comprimir mensagens grandes',
      'Como autenticar consumidores de mensagem',
    ],
    correct: 1,
    explanation: 'Uma Saga gerencia um processo de longa duração entre serviços — como fazer um pedido (reservar estoque → cobrar pagamento → enviar). Ela rastreia o estado e sabe o que fazer em seguida, incluindo como compensar (desfazer) se uma etapa falhar.',
  },
  {
    id: 'msg5',
    question: 'O que é uma transação compensatória no Padrão Saga?',
    options: [
      'Uma transação que roda duas vezes para garantir confiabilidade',
      'Uma ação que desfaz uma etapa anterior quando algo posterior no processo falha',
      'Uma cópia de backup de uma mensagem que falhou na entrega',
      'Um comando de rollback de banco de dados',
    ],
    correct: 1,
    explanation: 'Se a etapa 3 de uma saga falha, você não pode usar rollback de banco entre serviços. Em vez disso, você executa transações compensatórias — ações que desfazem logicamente as etapas anteriores. Por exemplo: se o pagamento falha após o estoque ser reservado, libere o estoque reservado.',
  },
];

export const messagingTopicPtBr: Topic = {
  slug: 'messaging',
  title: 'Mensageria',
  description: 'Filas, eventos e o Padrão Saga — como serviços .NET se comunicam sem depender uns dos outros.',
  icon: '📨',
  status: 'available',
  color: '#f7a24f',
  sections: [
    {
      id: 'why-messaging',
      title: 'Por que Mensageria?',
      content: [
        {
          type: 'text',
          text: 'Quando o Serviço A chama o Serviço B diretamente via HTTP, eles estão acoplados: B precisa estar rodando, saudável e rápido — ou A falha também. Mensageria quebra essa dependência. A coloca uma mensagem numa fila e segue em frente. B a processa quando estiver pronto.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔌', title: 'Desacoplamento', description: 'Serviços não precisam saber um sobre o outro. O remetente não se importa com quem vai processar a mensagem.', color: '#f7a24f' },
            { icon: '💪', title: 'Resiliência', description: 'Se um serviço cai, as mensagens esperam na fila. Nada é perdido. Quando ele volta, retoma de onde parou.', color: '#00d4aa' },
            { icon: '📈', title: 'Escala independente', description: 'Muitos pedidos chegando? Adicione mais instâncias do Consumer de Pedidos. A fila distribui a carga automaticamente.', color: '#4f8ef7' },
            { icon: '🔁', title: 'Retry embutido', description: 'Se o processamento falha, a mensagem pode voltar para a fila e ser tentada novamente — sem código extra.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Mensageria não substitui HTTP. Use HTTP para consultas que precisam de resposta imediata. Use mensageria para trabalho que pode ser processado de forma assíncrona — enviar emails, processar pagamentos, gerar relatórios.',
        },
      ],
    },
    {
      id: 'core-concepts',
      title: 'Conceitos Fundamentais',
      content: [
        {
          type: 'text',
          text: 'Antes de partir para o código, estes três conceitos cobrem tudo que você verá em sistemas de mensageria.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📬',
              title: 'Queue (Fila)',
              description: 'Uma fila de mensagens esperando ser processadas. Cada mensagem é entregue a exatamente um consumidor. Use para tarefas: "processe esse pagamento", "envie esse email".',
              color: '#f7a24f',
            },
            {
              icon: '📢',
              title: 'Topic / Exchange',
              description: 'Um canal de broadcast. Uma mensagem é entregue a todos os assinantes. Use para eventos: "pedido realizado" → cobrança, estoque e notificações recebem.',
              color: '#4f8ef7',
            },
            {
              icon: '✉️',
              title: 'Mensagem',
              description: 'Uma classe C# simples — seus dados. Mantenha mensagens pequenas, planas e amigáveis ao versionamento. Nunca coloque entidades do EF diretamente em mensagens.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Uma mensagem simples — apenas um record',
          code: `// Mensagens são classes de dados simples — sem lógica, sem dependências
public record PedidoRealizado(
    Guid PedidoId,
    Guid ClienteId,
    decimal Total,
    DateTimeOffset RealizadoEm
);

// Comando — manda um serviço fazer algo (um consumidor)
public record EnviarEmailConfirmacao(
    Guid PedidoId,
    string EmailCliente
);

// Evento — anuncia que algo aconteceu (vários consumidores podem reagir)
public record PagamentoFalhou(
    Guid PedidoId,
    string Motivo
);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Nomeie comandos como verbos ("EnviarEmail", "ProcessarPagamento"). Nomeie eventos no passado ("EmailEnviado", "PagamentoFalhou"). Isso torna a intenção de cada mensagem imediatamente clara.',
        },
      ],
    },
    {
      id: 'brokers',
      title: 'Brokers de Mensagem',
      content: [
        {
          type: 'text',
          text: 'Um broker é a infraestrutura que mantém suas filas e entrega as mensagens. Você não constrói isso — você escolhe um e se conecta a ele.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🐰',
              title: 'RabbitMQ',
              description: 'Open source, roda em qualquer lugar, ótimo para desenvolvimento e setups self-hosted. Rode localmente com Docker em segundos.',
              color: '#f7a24f',
            },
            {
              icon: '☁️',
              title: 'Azure Service Bus',
              description: 'Broker gerenciado no Azure. Dead-letter queues, sessões e recursos enterprise embutidos. Melhor escolha se você já está no Azure.',
              color: '#0078d4',
            },
            {
              icon: '⚡',
              title: 'Amazon SQS / SNS',
              description: 'Equivalente AWS. SQS = fila, SNS = topic. Simples e confiável para apps .NET hospedados na AWS.',
              color: '#f79f4f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Rodar RabbitMQ localmente com Docker',
          code: `# Iniciar RabbitMQ com a UI de gerenciamento
docker run -d --name rabbitmq \
  -p 5672:5672 \
  -p 15672:15672 \
  rabbitmq:3-management

# UI de gerenciamento: http://localhost:15672
# Login padrão: guest / guest`,
        },
      ],
    },
    {
      id: 'masstransit',
      title: 'MassTransit — Mensageria no .NET',
      content: [
        {
          type: 'text',
          text: 'MassTransit é a biblioteca .NET padrão para mensageria. Funciona com RabbitMQ, Azure Service Bus e outros — escreva seu código uma vez e troque o broker mudando a config. Ele cuida de roteamento, retries e serialização.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Instalar MassTransit',
          code: `# Para RabbitMQ
dotnet add package MassTransit.RabbitMQ

# Para Azure Service Bus
dotnet add package MassTransit.Azure.ServiceBus.Core`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup no Program.cs',
          code: `builder.Services.AddMassTransit(x =>
{
    // Registrar todos os consumers deste assembly
    x.AddConsumers(Assembly.GetExecutingAssembly());

    x.UsingRabbitMq((ctx, cfg) =>
    {
        cfg.Host("localhost", "/", h =>
        {
            h.Username("guest");
            h.Password("guest");
        });

        // Configura filas automaticamente para todos os consumers registrados
        cfg.ConfigureEndpoints(ctx);
    });
});`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Publicando uma Mensagem',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Publicar a partir de um serviço ou endpoint',
          code: `public class ServicoPedidos(IPublishEndpoint publish)
{
    public async Task RealizarPedidoAsync(CriarPedidoRequest request)
    {
        // ... salvar pedido no banco ...

        // Publicar o evento — todos os assinantes receberão
        await publish.Publish(new PedidoRealizado(
            PedidoId: pedido.Id,
            ClienteId: request.ClienteId,
            Total: pedido.Total,
            RealizadoEm: DateTimeOffset.UtcNow
        ));
    }
}`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Consumindo uma Mensagem',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Um consumer — lida com um tipo de mensagem',
          code: `public class PedidoRealizadoConsumer(IEmailService email) 
    : IConsumer<PedidoRealizado>
{
    public async Task Consume(ConsumeContext<PedidoRealizado> context)
    {
        var pedido = context.Message;

        await email.EnviarConfirmacaoAsync(
            pedidoId: pedido.PedidoId,
            clienteId: pedido.ClienteId
        );
    }
}

// Outro serviço pode ter seu próprio consumer para o mesmo evento:
public class EstoqueConsumer : IConsumer<PedidoRealizado>
{
    public async Task Consume(ConsumeContext<PedidoRealizado> context)
    {
        // Reservar estoque para este pedido
    }
}`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'O MassTransit cria filas e bindings automaticamente quando o app inicia. Você não precisa configurar nada no RabbitMQ manualmente. Só defina seus consumers e ele cuida do resto.',
        },
      ],
    },
    {
      id: 'retries-errors',
      title: 'Retries e Tratamento de Erros',
      content: [
        {
          type: 'text',
          text: 'Coisas dão errado — bancos ficam lentos, APIs ficam brevemente indisponíveis. Sistemas de mensageria têm suporte embutido para isso: tente a mensagem novamente e, se continuar falhando, mova-a para um lugar seguro para inspeção.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Configurar retries no MassTransit',
          code: `x.UsingRabbitMq((ctx, cfg) =>
{
    // Tenta até 3 vezes com backoff exponencial
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
              description: 'A mensagem é tentada novamente após um delay. Bom para falhas transitórias como timeouts de rede.',
              color: '#00d4aa',
            },
            {
              icon: '☠️',
              title: 'Dead Letter Queue',
              description: 'Após todos os retries serem esgotados, a mensagem vai para uma fila especial de "dead letter". Você pode inspecioná-la, corrigir o bug e re-enfileirá-la.',
              color: '#f74f4f',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Sempre torne seus consumers idempotentes — se a mesma mensagem for processada duas vezes (por causa de um retry), o resultado deve ser o mesmo. Verifique se o trabalho já foi feito antes de fazê-lo novamente.',
        },
      ],
    },
    {
      id: 'saga-pattern',
      title: 'O Padrão Saga',
      content: [
        {
          type: 'text',
          text: 'Alguns processos de negócio abrangem múltiplos serviços e múltiplas etapas. Realizar um pedido, por exemplo: reservar estoque → cobrar pagamento → acionar envio. Se o pagamento falhar, você precisa liberar o estoque reservado. Uma Saga gerencia todo esse fluxo.',
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Uma Saga é apenas uma classe que rastreia o estado atual de um processo de longa duração e define o que fazer quando cada evento chega. Pense nela como uma máquina de estados para seu fluxo de negócio.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '1️⃣', title: 'Pedido Realizado', description: 'Saga inicia. Estado = "AguardandoEstoque". Envia comando ReservarEstoque para o serviço de Inventário.', color: '#4f8ef7' },
            { icon: '2️⃣', title: 'Estoque Reservado', description: 'Saga recebe evento. Estado = "AguardandoPagamento". Envia comando CobrarPagamento para o serviço de Pagamento.', color: '#f7a24f' },
            { icon: '3️⃣', title: 'Pagamento Aprovado', description: 'Saga recebe evento. Estado = "Concluído". Publica PedidoConfirmado. Fim.', color: '#00d4aa' },
            { icon: '💥', title: 'Pagamento Falhou', description: 'Saga recebe evento. Envia LiberarEstoque para desfazer etapa 1. Estado = "Cancelado". Publica PedidoFalhou.', color: '#f74f4f' },
          ],
        },
      ],
    },
    {
      id: 'saga-code',
      title: 'Saga em Código com MassTransit',
      content: [
        {
          type: 'text',
          text: 'MassTransit inclui uma implementação de saga chamada State Machine Saga. Você define os estados, os eventos que disparam transições e o que fazer em cada etapa.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Estado da Saga — o que é persistido',
          code: `// Isso é salvo no banco entre eventos
public class PedidoSagaState : SagaStateMachineInstance
{
    public Guid CorrelationId { get; set; } // liga todas as mensagens
    public string CurrentState { get; set; } = string.Empty;
    public Guid ClienteId { get; set; }
    public decimal Total { get; set; }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'State machine da Saga',
          code: `public class PedidoSaga : MassTransitStateMachine<PedidoSagaState>
{
    public State AguardandoEstoque { get; private set; } = null!;
    public State AguardandoPagamento { get; private set; } = null!;
    public State Concluido { get; private set; } = null!;
    public State Cancelado { get; private set; } = null!;

    public Event<PedidoRealizado> PedidoRealizado { get; private set; } = null!;
    public Event<EstoqueReservado> EstoqueReservado { get; private set; } = null!;
    public Event<PagamentoAprovado> PagamentoAprovado { get; private set; } = null!;
    public Event<PagamentoFalhou> PagamentoFalhou { get; private set; } = null!;

    public PedidoSaga()
    {
        InstanceState(x => x.CurrentState);

        // Correlacionar todas as mensagens pelo PedidoId
        Event(() => PedidoRealizado, x => x.CorrelateById(m => m.Message.PedidoId));
        Event(() => EstoqueReservado, x => x.CorrelateById(m => m.Message.PedidoId));
        Event(() => PagamentoAprovado, x => x.CorrelateById(m => m.Message.PedidoId));
        Event(() => PagamentoFalhou, x => x.CorrelateById(m => m.Message.PedidoId));

        Initially(
            When(PedidoRealizado)
                .Then(ctx =>
                {
                    ctx.Saga.ClienteId = ctx.Message.ClienteId;
                    ctx.Saga.Total = ctx.Message.Total;
                })
                .Publish(ctx => new ReservarEstoque(ctx.Message.PedidoId))
                .TransitionTo(AguardandoEstoque)
        );

        During(AguardandoEstoque,
            When(EstoqueReservado)
                .Publish(ctx => new CobrarPagamento(ctx.Saga.CorrelationId, ctx.Saga.Total))
                .TransitionTo(AguardandoPagamento)
        );

        During(AguardandoPagamento,
            When(PagamentoAprovado)
                .Publish(ctx => new PedidoConfirmado(ctx.Saga.CorrelationId))
                .TransitionTo(Concluido)
                .Finalize(),

            When(PagamentoFalhou)
                .Publish(ctx => new LiberarEstoque(ctx.Saga.CorrelationId))
                .Publish(ctx => new PedidoFalhou(ctx.Saga.CorrelationId, "Pagamento recusado"))
                .TransitionTo(Cancelado)
                .Finalize()
        );
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Registrar a Saga com persistência EF Core',
          code: `// Instalar persistência de saga
dotnet add package MassTransit.EntityFrameworkCore

// No Program.cs
builder.Services.AddMassTransit(x =>
{
    // Registrar a saga com EF Core para persistência de estado
    x.AddSagaStateMachine<PedidoSaga, PedidoSagaState>()
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
          text: 'O `CorrelationId` é a chave que liga todas as mensagens de uma saga. Deve ser seu ID de negócio — como o PedidoId. Toda mensagem publicada durante o processo deve carregá-lo para que o MassTransit roteie os eventos para a instância correta da saga.',
        },
      ],
    },
    {
      id: 'when-to-use',
      title: 'Quando Usar o Quê',
      content: [
        {
          type: 'text',
          text: 'Nem todo problema precisa de uma saga. Comece simples e adicione complexidade apenas quando o problema exigir.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '📬',
              title: 'Fila simples',
              description: 'Uma tarefa, um consumidor, sem coordenação necessária. Enviar email, redimensionar imagem, gerar PDF. Isso cobre 80% dos casos de uso de mensageria.',
              color: '#00d4aa',
            },
            {
              icon: '📢',
              title: 'Publish / Subscribe',
              description: 'Um evento, múltiplas reações independentes. "Pedido realizado" → cobrança, estoque e notificações agem de forma independente. Sem coordenação entre eles.',
              color: '#4f8ef7',
            },
            {
              icon: '🗺️',
              title: 'Saga',
              description: 'Processo multi-etapas onde as etapas dependem umas das outras, falhas precisam ser compensadas e todo o fluxo deve ser rastreado. Use quando você tem um workflow de negócio que abrange serviços.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Sagas adicionam complexidade real. Antes de chegar a uma, pergunte: consigo lidar com isso com um fluxo de eventos mais simples? Muitos workflows que parecem precisar de uma saga podem ser resolvidos com consumers pub/sub independentes.',
        },
      ],
    },
  ],
};