import type { Topic, QuizQuestion } from '@/types';

export const financialMathQuiz: QuizQuestion[] = [
  {
    id: 'fm1',
    question: 'Why should money always be stored as `decimal`, never `double` or `float`?',
    options: [
      'decimal is faster to compute than double',
      'double and float are binary floating point — they can\'t represent most base-10 fractions exactly, causing tiny errors that compound over many calculations. decimal is base-10 and represents them exactly.',
      'double has a smaller maximum value than decimal',
      'There is no real difference — it\'s a style preference',
    ],
    correct: 1,
    explanation: 'Computers store double/float in binary, and most decimal fractions (like 0.1) have no exact binary representation — the same way 1/3 has no exact representation in base 10. decimal uses a base-10 internal format built for exactly this problem.',
  },
  {
    id: 'fm2',
    question: 'What does `Math.Round(2.5)` return in C#, and why does this surprise most developers?',
    options: [
      '3 — Math.Round always rounds half values up',
      '2 — the default MidpointRounding is ToEven ("banker\'s rounding"), which rounds to the nearest even digit instead of always rounding up',
      'It throws an exception for ambiguous values',
      '2.5 — Math.Round requires explicit decimal places to do anything',
    ],
    correct: 1,
    explanation: 'C#\'s default rounding mode is ToEven, not AwayFromZero. Math.Round(2.5) = 2, but Math.Round(3.5) = 4. This reduces statistical bias across large datasets, but it\'s rarely what developers expect coming from "round half up" intuition.',
  },
  {
    id: 'fm3',
    question: 'You split a $100.00 invoice into 3 equal payments. Math.Round(100m/3, 2) gives $33.33 — three of those total $99.99, one cent short. What\'s the standard fix?',
    options: [
      'Round up instead of down so the total is always slightly over',
      'Calculate the first N-1 shares as normal rounded amounts, then make the LAST share equal to (Total minus the sum of the others) — guaranteeing the total always reconciles exactly',
      'Always use whole dollar amounts to avoid the problem entirely',
      'There is no fix — losing a cent on splits is unavoidable',
    ],
    correct: 1,
    explanation: 'This is the allocation problem. The reliable fix: round the first N-1 shares normally, then derive the last one by subtraction. The total will always match exactly, because the last share absorbs whatever rounding remainder exists.',
  },
  {
    id: 'fm4',
    question: 'Why is it risky to round the result after each step of a multi-step financial calculation (e.g., apply discount, then round, then apply tax)?',
    options: [
      'It isn\'t risky — rounding early is actually best practice for performance',
      'Each rounding step discards precision the next step needs. These tiny errors compound, and the final total can differ — sometimes by real money — from computing everything first and rounding once.',
      'C# only allows rounding once per method',
      'Rounding mid-calculation causes a runtime exception',
    ],
    correct: 1,
    explanation: 'This is the golden rule: round once, at the very end. Rounding intermediate steps means each subsequent calculation operates on already-imprecise data, and those small errors snowball — especially noticeable on percentages and tax calculations across many line items.',
  },
  {
    id: 'fm5',
    question: 'In the System Boundaries pattern, where should rounding for display/JSON output happen?',
    options: [
      'Inside the domain entity, as soon as a value is set',
      'In the database, via a computed column',
      'Only at the system boundary — e.g. a custom JSON converter during serialization — never inside domain or business logic',
      'It doesn\'t matter, as long as it happens somewhere before SaveChangesAsync',
    ],
    correct: 2,
    explanation: 'The domain layer (services, entities, database) should store and compute with full decimal precision — it has no concept of "how a number looks." Rounding is a presentation concern and belongs only at the boundary: JSON serialization, UI formatting, or export generation.',
  },
];

export const financialMathTopic: Topic = {
  slug: 'financial-math',
  title: 'Financial Math',
  description: 'decimal vs double, Math.Round gotchas, the allocation problem, and the System Boundaries pattern for clean financial code.',
  icon: '🧮',
  status: 'available',
  color: '#22d3ee',
  sections: [
    {
      id: 'why-decimal',
      title: 'Why decimal, Not double or float',
      content: [
        {
          type: 'text',
          text: 'Computers store double and float in binary. Most fractions you\'d write in decimal — like 0.1 — have no exact binary representation, the same way 1/3 has no exact representation in base 10. The result: tiny, invisible errors that compound across calculations.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'The classic floating-point trap',
          code: `double a = 0.1;
double b = 0.2;
Console.WriteLine(a + b == 0.3); // false!
Console.WriteLine(a + b);        // 0.30000000000000004

decimal c = 0.1m;
decimal d = 0.2m;
Console.WriteLine(c + d == 0.3m); // true
Console.WriteLine(c + d);         // 0.3`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '⚡', title: 'double / float', description: 'Binary floating point. Fast, but cannot exactly represent most base-10 fractions. Fine for graphics, physics, scientific computing — never for money.', color: '#f74f4f' },
            { icon: '💰', title: 'decimal', description: 'Base-10 floating point, 28-29 significant digits. Exactly represents the fractions money uses. Slightly slower, but correctness matters more than speed here.', color: '#00d4aa' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'There is no "good enough" argument for using double with money. The error is small per operation, but it compounds across thousands of transactions and will eventually produce a total that doesn\'t reconcile — and that\'s a real, auditable problem in financial software.',
        },
      ],
    },
    {
      id: 'math-round-midpoint',
      title: 'Math.Round & The Banker\'s Rounding Trap',
      content: [
        {
          type: 'text',
          text: 'Math.Round looks simple, but its default behavior surprises most developers — especially anyone who learned "round half up" in school.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'The surprise',
          code: `Math.Round(2.5); // 2 — not 3!
Math.Round(3.5); // 4
Math.Round(0.125, 2); // 0.12 — not 0.13!

// Default MidpointRounding is ToEven ("banker's rounding")
// It rounds to the nearest EVEN digit, not always up`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🏦', title: 'ToEven (default)', description: 'Rounds .5 to the nearest even number. Reduces statistical bias when rounding huge volumes of numbers — useful in aggregate statistics, not intuitive for individual transactions.', color: '#f7a24f' },
            { icon: '⬆️', title: 'AwayFromZero', description: 'Rounds .5 away from zero — the "round half up" behavior most people expect. This is almost always what you want for individual financial line items.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Be explicit — always',
          code: `// ✅ Explicit — predictable, matches user expectations
var rounded = Math.Round(value, 2, MidpointRounding.AwayFromZero);

// ❌ Implicit — relies on a default most people don't know about
var rounded = Math.Round(value, 2);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Never rely on the default MidpointRounding in financial code. Always pass MidpointRounding.AwayFromZero explicitly, even when it matches the default — it documents intent and protects you if .NET ever changes its default (it has different defaults across some overloads already).',
        },
      ],
    },
    {
      id: 'allocation-problem',
      title: 'The Allocation Problem — Splitting Amounts',
      content: [
        {
          type: 'text',
          text: 'One of the most common financial bugs: split an amount into equal parts, round each part, and the total no longer matches the original. This shows up in invoice splitting, expense sharing, and tax allocation.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ The naive approach loses a cent',
          code: `decimal total = 100.00m;
int parts = 3;
decimal share = Math.Round(total / parts, 2, MidpointRounding.AwayFromZero);
// share = 33.33

decimal sumOfParts = share * parts;
// sumOfParts = 99.99 — missing $0.01!`,
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ Fix — last share absorbs the remainder',
          code: `decimal total = 100.00m;
int parts = 3;

var shares = new List<decimal>();
decimal runningTotal = 0m;

for (int i = 0; i < parts - 1; i++)
{
    var share = Math.Round(total / parts, 2, MidpointRounding.AwayFromZero);
    shares.Add(share);
    runningTotal += share;
}

// Last share = whatever makes the total exact
shares.Add(total - runningTotal);

// shares = [33.33, 33.33, 33.34]
// Sum = 100.00 exactly — always`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'This pattern — round the first N-1 items, derive the last by subtraction — guarantees your total always reconciles. It\'s the standard approach used by payment processors and accounting systems for splitting invoices, taxes, and shared expenses.',
        },
      ],
    },
    {
      id: 'golden-rule',
      title: 'The Golden Rule — Don\'t Round Intermediate Steps',
      content: [
        {
          type: 'text',
          text: 'Every time you round, you throw away precision. If the next step in your calculation uses that rounded value, the error compounds. Round only once — at the very end of the calculation, not in the middle of it.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ Rounding at each step — error compounds',
          code: `decimal price = 19.99m;
decimal discountRate = 0.15m; // 15% off
decimal taxRate = 0.0825m;    // 8.25% tax

// Rounding after EVERY step
decimal discounted = Math.Round(price * (1 - discountRate), 2, MidpointRounding.AwayFromZero); // 16.99
decimal withTax = Math.Round(discounted * (1 + taxRate), 2, MidpointRounding.AwayFromZero);     // 18.40`,
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ Compute fully, round once at the end',
          code: `decimal price = 19.99m;
decimal discountRate = 0.15m;
decimal taxRate = 0.0825m;

// Full precision through every step — round only the final result
decimal finalPrice = price * (1 - discountRate) * (1 + taxRate);
decimal rounded = Math.Round(finalPrice, 2, MidpointRounding.AwayFromZero); // 18.39

// Different from the step-by-step result above by one cent —
// and the step-by-step version is the WRONG one`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'One cent feels trivial on a single transaction. Multiply that error across thousands of invoices and it becomes a real reconciliation problem — and potentially a compliance issue, since tax authorities expect a specific, defensible calculation order.',
        },
      ],
    },
    {
      id: 'system-boundaries',
      title: 'System Boundaries — Where Rounding Belongs',
      content: [
        {
          type: 'text',
          text: 'The golden rule has an architectural consequence: your domain logic should never round at all. Rounding is a presentation concern, and it belongs at the edge of your system — not inside the business logic that computes the numbers.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🎯',
              title: 'Core / Domain',
              description: 'Services, entities, database. Store and compute with full decimal precision. The domain doesn\'t know or care how a number looks — only that the math is exact.',
              color: '#22d3ee',
            },
            {
              icon: '🌐',
              title: 'Boundary / Edge',
              description: 'JSON serialization, UI display, exports, external API calls. This is where raw precision gets translated into something a human or external system expects — rounded, formatted.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A custom JsonConverter — rounding happens only on the way out',
          code: `public class RoundedDecimalConverter : JsonConverter<decimal>
{
    public override decimal Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        => reader.GetDecimal(); // reading stays full-precision

    public override void Write(Utf8JsonWriter writer, decimal value, JsonSerializerOptions options)
    {
        var rounded = Math.Round(value, 2, MidpointRounding.AwayFromZero);
        writer.WriteNumberValue(rounded);
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Register it once — applies everywhere automatically',
          code: `// Program.cs
builder.Services.Configure<JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new RoundedDecimalConverter());
});

// Every decimal in every API response is now rounded at the boundary.
// Your services, entities, and database never round anything.`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'This is the architectural payoff: business logic stays pure and testable, free of presentation concerns. If a frontend team later asks for 4 decimal places instead of 2, you change one converter — not every calculation across your codebase.',
        },
      ],
    },
    {
      id: 'percentages',
      title: 'Percentages — Common Pitfalls',
      content: [
        {
          type: 'text',
          text: 'Percentage bugs are almost always one of two mistakes: representing the percent wrong (10 vs 0.10), or rounding a percentage-derived value too early in a multi-step calculation.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Represent percentages as a decimal rate, not a whole number',
          code: `// ✅ Store the rate as a fraction
decimal taxRate = 0.0825m; // 8.25%
decimal tax = price * taxRate;

// ❌ Mixing whole-number percent with rate math is error-prone
decimal taxPercent = 8.25m;
decimal tax = price * taxPercent / 100m; // extra step, extra rounding risk`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Stacked percentages — order and precision both matter',
          code: `// 15% discount, then 8.25% tax on the discounted price
decimal price = 100.00m;
decimal discountRate = 0.15m;
decimal taxRate = 0.0825m;

// Apply as multiplicative factors — no rounding until the end
decimal finalPrice = price * (1 - discountRate) * (1 + taxRate);
decimal rounded = Math.Round(finalPrice, 2, MidpointRounding.AwayFromZero);
// 92.0125 → 92.01

// Adding percentages instead of multiplying compounding factors
// is a common bug:
decimal wrong = price * (1 - discountRate + taxRate); // NOT the same — wrong math`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Stacked percentages are multiplicative, not additive. "15% off, then 8.25% tax" is `price * 0.15 * 0.0825`, not `price * (1 - 0.15 + 0.0825)`. The second form gives a plausible-looking but mathematically wrong result.',
        },
      ],
    },
    {
      id: 'quick-reference',
      title: 'Quick Reference — decimal & Math Toolkit',
      content: [
        {
          type: 'text',
          text: 'A short list of things worth knowing once you\'re comfortable with the core rules above.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔢', title: 'decimal precision', description: '28-29 significant digits. More than enough for any real financial value — you will never hit this limit in practice.', color: '#22d3ee' },
            { icon: '⬆️', title: 'Math.Ceiling / Math.Floor', description: 'Round up or down regardless of midpoint. Useful for shipping costs ("round up to nearest dollar") or inventory units (can\'t ship half a box).', color: '#4f8ef7' },
            { icon: '🚫', title: 'No implicit double↔decimal', description: 'C# won\'t implicitly convert between double and decimal — you must cast explicitly. This is a safety feature, not an inconvenience: it stops accidental precision loss.', color: '#f74f4f' },
            { icon: '🏷️', title: 'The `m` suffix', description: 'Always suffix decimal literals with `m` (0.1m, not 0.1). Without it, C# treats the literal as double, and mixing types forces an explicit cast.', color: '#a78bfa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Ceiling example — shipping rounds up to the nearest dollar',
          code: `decimal shippingCost = 4.23m;
decimal roundedUp = Math.Ceiling(shippingCost); // 5.00 — never undercharge shipping

int unitsNeeded = (int)Math.Ceiling(135m / 24m); // 6 boxes needed for 135 units at 24/box`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Summary of the whole topic in one sentence: compute with decimal at full precision everywhere in your domain, round exactly once — explicitly, with MidpointRounding.AwayFromZero — only at the boundary where a human or external system needs to see the number.',
        },
      ],
    },
  ],
};