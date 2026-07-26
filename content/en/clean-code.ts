import type { Topic, QuizQuestion } from '@/types';

export const cleanCodeQuiz: QuizQuestion[] = [
  {
    id: 'clean1',
    question: 'What is the most useful definition of clean code?',
    options: [
      'Code with no comments and very short methods',
      'Code that is easy to understand, change, and verify',
      'Code that uses the newest language features everywhere',
      'Code that has no duplication under any circumstances',
    ],
    correct: 1,
    explanation: 'Clean code optimizes for the people who will read and change it. It is a balance of clarity, correctness, simplicity, and appropriate structure.',
  },
  {
    id: 'clean2',
    question: 'What does KISS encourage?',
    options: [
      'Keep every class as small as possible, even when that hides the domain',
      'Keep the solution as simple as the problem allows',
      'Never use abstractions',
      'Always put repeated code in a utility class',
    ],
    correct: 1,
    explanation: 'KISS means choosing the simplest design that clearly solves the real problem. It does not mean avoiding every abstraction or compressing code.',
  },
  {
    id: 'clean3',
    question: 'When is duplication worth removing?',
    options: [
      'Immediately, even if the duplicated code has different reasons to change',
      'When the duplicated knowledge or behavior is genuinely the same',
      'Only after a performance benchmark',
      'Never; duplication is always safer',
    ],
    correct: 1,
    explanation: 'DRY is about one source of truth for the same knowledge. Removing accidental duplication too early can create a misleading abstraction and tighter coupling.',
  },
  {
    id: 'clean4',
    question: 'Why can a record be a good fit for a DTO?',
    options: [
      'It automatically validates every property',
      'It expresses data with value-based equality and convenient non-destructive copying',
      'It makes all data globally immutable',
      'It replaces the need for domain behavior',
    ],
    correct: 1,
    explanation: 'Records communicate value-like data. A positional record also gives useful equality and with expressions, but nested objects can still be mutable and validation is still your responsibility.',
  },
  {
    id: 'clean5',
    question: 'What is a healthy way to improve an existing method?',
    options: [
      'Rewrite the whole module before running tests',
      'Make a small behavior-preserving change, then verify it',
      'Add abstractions until the method has no conditionals',
      'Rename everything in one large commit',
    ],
    correct: 1,
    explanation: 'Small refactorings with fast feedback keep the behavior visible and make regressions easier to locate. Tests are a safety net, not a substitute for judgment.',
  },
];

export const cleanCodeTopic: Topic = {
  slug: 'clean-code',
  title: 'Clean Code',
  description: 'Practical principles for writing .NET code that people can understand, change, and trust.',
  icon: '🧹',
  status: 'available',
  color: '#72fc65',
  sections: [
    {
      id: 'what-clean-code-means',
      title: 'What Clean Code Means',
      content: [
        {
          type: 'text',
          text: 'Clean code is code that communicates its intent clearly and is safe to change. It is not code that follows a rigid style, uses the most abstractions, or never contains duplication. The standard is practical: can another developer understand the decision, verify the behavior, and modify it without fear?',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '👀', title: 'Readable', description: 'Names and structure explain the problem without making readers reconstruct it.', color: '#4f8ef7' },
            { icon: '🎯', title: 'Focused', description: 'Each unit has a clear responsibility and a small number of reasons to change.', color: '#00d4aa' },
            { icon: '🧪', title: 'Verifiable', description: 'Important behavior can be checked with tests or a small, repeatable feedback loop.', color: '#9034fa' },
            { icon: '🔧', title: 'Changeable', description: 'Details can evolve without forcing unrelated parts of the system to change.', color: '#f7a24f' },
          ],
        },
        { type: 'callout', variant: 'info', text: 'Clean code is a direction, not a finish line. Prefer the clearest design you can justify today, then improve it when new knowledge appears.' },
      ],
    },
    {
      id: 'names-and-functions',
      title: 'Names and Focused Functions',
      content: [
        { type: 'text', text: 'A good name answers a question: what is this value, action, or rule? Prefer domain vocabulary over generic names such as data, helper, manager, or doThing. Functions should usually perform one coherent job and sit at one level of abstraction.' },
        {
          type: 'code', language: 'csharp', label: 'Let names carry the intent', code: `// The condition is hidden behind a domain phrase.
if (order.IsReadyForDispatch())
{
    dispatcher.Dispatch(order);
}

public static bool IsReadyForDispatch(this Order order) =>
    order.IsPaid && order.Items.Count > 0 && !order.IsCancelled;`,
        },
        { type: 'list', items: ['Avoid names that lie or hide important units, such as timeout when the value is milliseconds.', 'Keep functions short enough to see their whole story, but do not split code merely to reduce line count.', 'Prefer guard clauses when they make the happy path easier to see.', 'If a function needs a long comment to explain its steps, first ask whether its names and boundaries can explain them instead.'] },
        { type: 'callout', variant: 'tip', text: 'Comments are valuable for why: business constraints, surprising trade-offs, or external limitations. Comments that restate the code are maintenance debt.' },
      ],
    },
    {
      id: 'kiss-dry-yagni',
      title: 'KISS, DRY, and YAGNI',
      content: [
        { type: 'text', text: 'These heuristics protect a codebase from unnecessary complexity, but none of them is an absolute law. Use them together with context and tests.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '🧩', title: 'KISS', description: 'Keep It Simple: choose the simplest design that solves the actual problem.', color: '#00d4aa' },
            { icon: '♻️', title: 'DRY', description: 'Don\'t Repeat Yourself. Share behavior only when it has the same meaning and change reason.', color: '#4f8ef7' },
            { icon: '🛑', title: 'YAGNI', description: 'You Aren\'t Gonna Need It: do not build speculative flexibility before a real requirement exists.', color: '#f7a24f' },
          ],
        },
        { type: 'code', language: 'csharp', label: 'Simple beats speculative', code: `// Start with the requirement you have.
public Task SendReceiptAsync(Order order)
    => emailSender.SendAsync(order.CustomerEmail, "Your receipt", BuildReceipt(order));

// Add a strategy, template engine, or plugin point when a real second case
// makes the design easier to understand—not just because it might exist later.`, },
        { type: 'callout', variant: 'warning', text: 'Two similar snippets are not automatically the same abstraction. A little duplication is often cheaper than one “reusable” helper with flags, generic parameters, and unrelated responsibilities.' },
      ],
    },
    {
      id: 'data-and-immutability',
      title: 'Data, Records, and with Expressions',
      content: [
        { type: 'text', text: 'Immutable data makes state changes visible: instead of quietly changing an object shared by several callers, create the next value. C# records are a useful way to express value-like data, especially DTOs and messages. They are a tool for clarity, not a requirement for every class.' },
        { type: 'code', language: 'csharp', label: 'Value-like data with a record', code: `public record SearchOptions(string Term, int Page = 1, int PageSize = 20);

var firstPage = new SearchOptions("dotnet");
var secondPage = firstPage with { Page = 2 };

Console.WriteLine(firstPage.Page);  // 1
Console.WriteLine(secondPage.Page); // 2`, },
        { type: 'concept-grid', items: [
          { icon: '⚖️', title: 'Value semantics', description: 'Records compare values, which often matches DTOs and messages better than object identity.', color: '#9034fa' },
          { icon: '🧊', title: 'Visible changes', description: 'with creates a new record, making the transition from one state to the next explicit.', color: '#00d4aa' },
          { icon: '⚠️', title: 'Know the limits', description: 'Record copying is shallow. Mutable nested objects and missing validation still need your attention.', color: '#f74f4f' },
        ] },
        { type: 'callout', variant: 'tip', text: 'Use a class when identity, lifecycle, or behavior matters. Use a record when the data is best understood as a value. Choose based on meaning, not fashion.' },
      ],
    },
    {
      id: 'boundaries-and-errors',
      title: 'Boundaries and Errors',
      content: [
        { type: 'text', text: 'Keep infrastructure details at the edges of the application. Business rules should not need to know how an HTTP request, database, or file system works. At each boundary, translate external data into a form your domain understands and handle failures at the level that can make a useful decision.' },
        { type: 'code', language: 'csharp', label: 'Translate at the boundary', code: `public async Task<OrderSummary?> GetSummaryAsync(Guid id, CancellationToken cancellationToken)
{
    var order = await repository.FindAsync(id, cancellationToken);
    return order is null ? null : new OrderSummary(order.Id, order.Total);
}

// The caller decides whether null means 404, an empty result, or another response.
// The repository does not need to know about HTTP.`, },
        { type: 'list', items: ['Validate input at the boundary, then keep core rules independent of transport details.', 'Use exceptions for exceptional failures, not normal branching such as “not found” when a result type is clearer.', 'Do not catch an exception unless you can recover, add useful context, or translate it to a meaningful application error.', 'Pass CancellationToken through I/O operations so work can stop when the request is gone.'] },
        { type: 'callout', variant: 'danger', text: 'A broad catch that logs and continues can turn a visible failure into corrupted or misleading behavior. Fail deliberately and preserve the original context.' },
      ],
    },
    {
      id: 'tests-and-refactoring',
      title: 'Tests and Small Refactorings',
      content: [
        { type: 'text', text: 'Tests are executable examples of behavior. A useful test describes a meaningful outcome and fails for a meaningful reason. They also make clean-up safer: change one thing, run the fast feedback loop, and keep the behavior stable.' },
        { type: 'code', language: 'csharp', label: 'A behavior-focused test', code: `[Fact]
public void ApplyDiscount_RejectsNegativePercent()
{
    var action = () => Discount.Create(-1);

    action.Should().Throw<ArgumentOutOfRangeException>();
}

// The test names the rule, not the private implementation details.`, },
        { type: 'list', items: ['Refactor in small steps: rename, extract, simplify, or move one concept at a time.', 'Run tests before and after a behavior-preserving refactoring.', 'Use code review and production feedback to find confusing areas; do not guess that every abstraction is needed upfront.', 'Delete dead code. Version control remembers history, while unused branches increase the reading cost.'] },
        { type: 'callout', variant: 'info', text: 'A clean codebase is maintained continuously. The best time to improve a confusing area is usually when you are already changing it and have the relevant context.' },
      ],
    },
    {
      id: 'practical-checklist',
      title: 'A Practical Checklist',
      content: [
        { type: 'concept-grid', items: [
          { icon: '🔤', title: 'Can I name it clearly?', description: 'Would a reader understand the domain meaning without opening five other files?', color: '#4f8ef7' },
          { icon: '🧭', title: 'Is the path obvious?', description: 'Can I follow the normal case without jumping through flags and hidden side effects?', color: '#00d4aa' },
          { icon: '🧱', title: 'Is the boundary right?', description: 'Are I/O and framework details kept away from rules that should be easy to test?', color: '#9034fa' },
          { icon: '🧹', title: 'What can disappear?', description: 'Can I remove speculative code, dead code, or an abstraction that no longer earns its cost?', color: '#f7a24f' },
        ] },
        { type: 'callout', variant: 'tip', text: 'Before merging, ask: Is the intent clear? Are edge cases handled? Is the change tested? Did I add complexity that the requirement does not justify? These questions scale from a beginner’s first method to a large service.' },
      ],
    },
  ],
};
