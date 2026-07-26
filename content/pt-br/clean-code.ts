import type { Topic, QuizQuestion } from '@/types';

export const cleanCodeQuizPtBr: QuizQuestion[] = [
  {
    id: 'clean1',
    question: 'Qual é a definição mais útil de código limpo?',
    options: ['Código sem comentários e com métodos muito curtos', 'Código fácil de entender, mudar e verificar', 'Código que usa os recursos mais novos em todo lugar', 'Código sem nenhuma duplicação em qualquer circunstância'],
    correct: 1,
    explanation: 'Código limpo otimiza para as pessoas que vão ler e alterar o código. É um equilíbrio entre clareza, correção, simplicidade e estrutura adequada.',
  },
  {
    id: 'clean2',
    question: 'O que o princípio KISS incentiva?',
    options: ['Manter toda classe o menor possível, mesmo escondendo o domínio', 'Manter a solução tão simples quanto o problema permite', 'Nunca usar abstrações', 'Sempre colocar código repetido em uma classe utilitária'],
    correct: 1,
    explanation: 'KISS significa escolher o design mais simples que resolve o problema real com clareza. Não significa evitar toda abstração nem comprimir o código.',
  },
  {
    id: 'clean3',
    question: 'Quando vale a pena remover duplicação?',
    options: ['Imediatamente, mesmo quando os trechos têm motivos diferentes para mudar', 'Quando o conhecimento ou comportamento duplicado é realmente o mesmo', 'Somente depois de um benchmark', 'Nunca; duplicação é sempre mais segura'],
    correct: 1,
    explanation: 'DRY busca uma única fonte de verdade para o mesmo conhecimento. Remover duplicação acidental cedo demais pode criar uma abstração enganosa.',
  },
  {
    id: 'clean4',
    question: 'Por que um record pode ser adequado para um DTO?',
    options: ['Ele valida todas as propriedades automaticamente', 'Ele expressa dados com igualdade por valor e cópia não destrutiva conveniente', 'Ele torna todos os dados globalmente imutáveis', 'Ele substitui a necessidade de comportamento de domínio'],
    correct: 1,
    explanation: 'Records comunicam dados com semântica de valor. Um record posicional também oferece igualdade e with, mas objetos internos ainda podem ser mutáveis e a validação continua sendo responsabilidade sua.',
  },
  {
    id: 'clean5',
    question: 'Qual é uma forma saudável de melhorar um método existente?',
    options: ['Reescrever o módulo inteiro antes de rodar os testes', 'Fazer uma pequena mudança que preserve o comportamento e verificá-la', 'Adicionar abstrações até o método não ter condicionais', 'Renomear tudo em um commit grande'],
    correct: 1,
    explanation: 'Refatorações pequenas com feedback rápido mantêm o comportamento visível e facilitam encontrar regressões. Testes são uma rede de segurança, não substitutos para julgamento.',
  },
];

export const cleanCodeTopicPtBr: Topic = {
  slug: 'clean-code',
  title: 'Código Limpo',
  description: 'Princípios práticos para escrever código .NET que as pessoas entendem, alteram e confiam.',
  icon: '🧹',
  status: 'available',
  color: '#72fc65',
  sections: [
    {
      id: 'what-clean-code-means',
      title: 'O que é Código Limpo',
      content: [
        { type: 'text', text: 'Código limpo comunica sua intenção com clareza e pode ser alterado com segurança. Não é código que segue um estilo rígido, usa o máximo de abstrações ou nunca tem duplicação. A pergunta prática é: outra pessoa consegue entender a decisão, verificar o comportamento e fazer uma mudança sem medo?' },
        { type: 'concept-grid', items: [
          { icon: '👀', title: 'Legível', description: 'Nomes e estrutura explicam o problema sem obrigar o leitor a reconstruí-lo.', color: '#4f8ef7' },
          { icon: '🎯', title: 'Focado', description: 'Cada unidade tem uma responsabilidade clara e poucos motivos para mudar.', color: '#00d4aa' },
          { icon: '🧪', title: 'Verificável', description: 'O comportamento importante pode ser validado por testes ou feedback rápido.', color: '#9034fa' },
          { icon: '🔧', title: 'Alterável', description: 'Detalhes podem evoluir sem forçar mudanças em partes sem relação.', color: '#f7a24f' },
        ] },
        { type: 'callout', variant: 'info', text: 'Código limpo é uma direção, não uma linha de chegada. Prefira o design mais claro que você consegue justificar hoje e melhore-o quando surgir conhecimento novo.' },
      ],
    },
    {
      id: 'names-and-functions',
      title: 'Nomes e Funções Focadas',
      content: [
        { type: 'text', text: 'Um bom nome responde a uma pergunta: o que é este valor, ação ou regra? Prefira o vocabulário do domínio a nomes genéricos como data, helper, manager ou doThing. Funções normalmente devem realizar um trabalho coerente e operar em um único nível de abstração.' },
        { type: 'code', language: 'csharp', label: 'Deixe os nomes carregarem a intenção', code: `// A condição fica escondida atrás de uma expressão do domínio.
if (order.IsReadyForDispatch())
{
    dispatcher.Dispatch(order);
}

public static bool IsReadyForDispatch(this Order order) =>
    order.IsPaid && order.Items.Count > 0 && !order.IsCancelled;` },
        { type: 'list', items: ['Evite nomes que mentem ou escondem unidades importantes, como timeout quando o valor está em milissegundos.', 'Mantenha funções pequenas o bastante para enxergar sua história, mas não divida apenas para diminuir a contagem de linhas.', 'Prefira guard clauses quando elas tornam o caminho principal mais fácil de acompanhar.', 'Se uma função precisa de um comentário longo para explicar seus passos, verifique primeiro se nomes e limites podem explicá-los.'] },
        { type: 'callout', variant: 'tip', text: 'Comentários são valiosos para explicar o porquê: regras de negócio, decisões surpreendentes ou limitações externas. Comentários que repetem o código viram dívida de manutenção.' },
      ],
    },
    {
      id: 'kiss-dry-yagni',
      title: 'KISS, DRY e YAGNI',
      content: [
        { type: 'text', text: 'Essas heurísticas protegem a base de código de complexidade desnecessária, mas nenhuma é uma lei absoluta. Use-as junto com contexto e testes.' },
        { type: 'concept-grid', items: [
          { icon: '🧩', title: 'KISS', description: 'Keep It Simple: escolha o design mais simples que resolve o problema real.', color: '#00d4aa' },
          { icon: '♻️', title: 'DRY', description: 'Don\'t Repeat Yourself. Compartilhe comportamento quando ele tiver o mesmo significado e motivo de mudança.', color: '#4f8ef7' },
          { icon: '🛑', title: 'YAGNI', description: 'You Aren\'t Gonna Need It: não construa flexibilidade especulativa antes de uma necessidade real.', color: '#f7a24f' },
        ] },
        { type: 'code', language: 'csharp', label: 'O simples vence o especulativo', code: `// Comece com o requisito que você tem.
public Task SendReceiptAsync(Order order)
    => emailSender.SendAsync(order.CustomerEmail, "Your receipt", BuildReceipt(order));

// Adicione estratégias ou pontos de extensão quando um segundo caso real
// tornar o design mais claro — não apenas porque ele pode existir no futuro.` },
        { type: 'callout', variant: 'warning', text: 'Dois trechos parecidos não são automaticamente a mesma abstração. Um pouco de duplicação costuma custar menos que um helper reutilizável com flags e responsabilidades sem relação.' },
      ],
    },
    {
      id: 'data-and-immutability',
      title: 'Dados, Records e Expressões with',
      content: [
        { type: 'text', text: 'Dados imutáveis tornam mudanças de estado visíveis: em vez de alterar silenciosamente um objeto compartilhado, crie o próximo valor. Records são úteis para expressar dados com semântica de valor, especialmente DTOs e mensagens. São uma ferramenta de clareza, não uma exigência para toda classe.' },
        { type: 'code', language: 'csharp', label: 'Dados com semântica de valor', code: `public record SearchOptions(string Term, int Page = 1, int PageSize = 20);

var firstPage = new SearchOptions("dotnet");
var secondPage = firstPage with { Page = 2 };

Console.WriteLine(firstPage.Page);  // 1
Console.WriteLine(secondPage.Page); // 2` },
        { type: 'concept-grid', items: [
          { icon: '⚖️', title: 'Semântica de valor', description: 'Records comparam valores, o que costuma combinar com DTOs e mensagens melhor que identidade de objeto.', color: '#9034fa' },
          { icon: '🧊', title: 'Mudanças visíveis', description: 'with cria outro record, deixando explícita a transição de um estado para o próximo.', color: '#00d4aa' },
          { icon: '⚠️', title: 'Conheça os limites', description: 'A cópia de um record é superficial. Objetos internos mutáveis e validação ainda exigem atenção.', color: '#f74f4f' },
        ] },
        { type: 'callout', variant: 'tip', text: 'Use uma classe quando identidade, ciclo de vida ou comportamento importarem. Use um record quando os dados forem melhor entendidos como um valor. Escolha pelo significado, não pela moda.' },
      ],
    },
    {
      id: 'boundaries-and-errors',
      title: 'Limites e Erros',
      content: [
        { type: 'text', text: 'Mantenha detalhes de infraestrutura nas bordas da aplicação. Regras de negócio não deveriam saber como funciona uma requisição HTTP, banco ou sistema de arquivos. Em cada limite, converta dados externos para uma forma que o domínio entenda e trate falhas no nível que pode tomar uma decisão útil.' },
        { type: 'code', language: 'csharp', label: 'Converta na borda', code: `public async Task<OrderSummary?> GetSummaryAsync(Guid id, CancellationToken cancellationToken)
{
    var order = await repository.FindAsync(id, cancellationToken);
    return order is null ? null : new OrderSummary(order.Id, order.Total);
}

// O chamador decide se null significa 404, resultado vazio ou outra resposta.
// O repositório não precisa conhecer HTTP.` },
        { type: 'list', items: ['Valide a entrada na borda e mantenha as regras centrais independentes do transporte.', 'Use exceções para falhas excepcionais, não para fluxos normais como “não encontrado” quando um resultado for mais claro.', 'Não capture uma exceção sem poder recuperar, adicionar contexto útil ou convertê-la em um erro significativo.', 'Passe CancellationToken para operações de I/O para que o trabalho possa parar quando a requisição terminar.'] },
        { type: 'callout', variant: 'danger', text: 'Um catch amplo que registra o erro e continua pode transformar uma falha visível em comportamento corrompido ou enganoso. Falhe deliberadamente e preserve o contexto original.' },
      ],
    },
    {
      id: 'tests-and-refactoring',
      title: 'Testes e Refatorações Pequenas',
      content: [
        { type: 'text', text: 'Testes são exemplos executáveis de comportamento. Um teste útil descreve um resultado importante e falha por um motivo importante. Eles também tornam a limpeza mais segura: mude uma coisa, rode o feedback rápido e mantenha o comportamento estável.' },
        { type: 'code', language: 'csharp', label: 'Um teste focado em comportamento', code: `[Fact]
public void ApplyDiscount_RejectsNegativePercent()
{
    var action = () => Discount.Create(-1);

    action.Should().Throw<ArgumentOutOfRangeException>();
}

// O teste nomeia a regra, não detalhes privados da implementação.` },
        { type: 'list', items: ['Refatore em passos pequenos: renomeie, extraia, simplifique ou mova um conceito por vez.', 'Rode os testes antes e depois de uma refatoração que preserva comportamento.', 'Use code review e feedback de produção para encontrar áreas confusas; não suponha que toda abstração é necessária desde o começo.', 'Apague código morto. O controle de versão guarda o histórico, enquanto branches sem uso aumentam o custo de leitura.'] },
        { type: 'callout', variant: 'info', text: 'Uma base de código limpa é mantida continuamente. O melhor momento para melhorar uma área confusa costuma ser quando você já está alterando essa área e tem o contexto necessário.' },
      ],
    },
    {
      id: 'practical-checklist',
      title: 'Checklist Prático',
      content: [
        { type: 'concept-grid', items: [
          { icon: '🔤', title: 'Consigo nomear bem?', description: 'Um leitor entenderia o significado no domínio sem abrir cinco arquivos?', color: '#4f8ef7' },
          { icon: '🧭', title: 'O caminho é óbvio?', description: 'É possível acompanhar o caso normal sem flags e efeitos colaterais escondidos?', color: '#00d4aa' },
          { icon: '🧱', title: 'O limite está certo?', description: 'I/O e detalhes do framework estão afastados das regras fáceis de testar?', color: '#9034fa' },
          { icon: '🧹', title: 'O que pode sumir?', description: 'Posso remover código especulativo, morto ou uma abstração cujo custo já não compensa?', color: '#f7a24f' },
        ] },
        { type: 'callout', variant: 'tip', text: 'Antes de fazer merge, pergunte: a intenção está clara? Os casos de borda estão tratados? A mudança foi testada? Adicionei complexidade que o requisito não justifica? Essas perguntas servem tanto para o primeiro método de um iniciante quanto para um serviço grande.' },
      ],
    },
  ],
};
