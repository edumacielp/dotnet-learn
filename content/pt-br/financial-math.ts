import type { Topic, QuizQuestion } from '@/types';

export const financialMathQuizPtBr: QuizQuestion[] = [
  {
    id: 'fm1',
    question: 'Por que dinheiro deve ser sempre armazenado como `decimal`, nunca como `double` ou `float`?',
    options: [
      'decimal é mais rápido para calcular do que double',
      'double e float são ponto flutuante binário — não conseguem representar a maioria das frações base-10 exatamente, causando erros pequenos que se acumulam. decimal é base-10 e as representa exatamente.',
      'double tem um valor máximo menor que decimal',
      'Não há diferença real — é preferência de estilo',
    ],
    correct: 1,
    explanation: 'Computadores armazenam double/float em binário, e a maioria das frações decimais (como 0,1) não tem representação binária exata — assim como 1/3 não tem representação exata em base 10. decimal usa um formato interno base-10 feito exatamente para esse problema.',
  },
  {
    id: 'fm2',
    question: 'O que `Math.Round(2.5)` retorna em C#, e por que isso surpreende a maioria dos desenvolvedores?',
    options: [
      '3 — Math.Round sempre arredonda valores de meio para cima',
      '2 — o MidpointRounding padrão é ToEven ("arredondamento do banqueiro"), que arredonda para o dígito par mais próximo em vez de sempre arredondar para cima',
      'Lança uma exceção para valores ambíguos',
      '2,5 — Math.Round requer casas decimais explícitas para fazer algo',
    ],
    correct: 1,
    explanation: 'O modo de arredondamento padrão do C# é ToEven, não AwayFromZero. Math.Round(2.5) = 2, mas Math.Round(3.5) = 4. Isso reduz viés estatístico em grandes conjuntos de dados, mas raramente é o que desenvolvedores esperam vindo da intuição de "arredondar meio para cima".',
  },
  {
    id: 'fm3',
    question: 'Você divide uma fatura de R$100,00 em 3 parcelas iguais. Math.Round(100m/3, 2) dá R$33,33 — três dessas somam R$99,99, faltando um centavo. Qual é a solução padrão?',
    options: [
      'Arredondar sempre para cima para que o total seja ligeiramente maior',
      'Calcular as primeiras N-1 partes como valores arredondados normais, depois fazer a ÚLTIMA parte igual ao (Total menos a soma das outras) — garantindo que o total sempre reconcilie exatamente',
      'Usar sempre valores inteiros para evitar o problema',
      'Não há solução — perder um centavo em divisões é inevitável',
    ],
    correct: 1,
    explanation: 'Esse é o problema de alocação. A solução confiável: arredonde as primeiras N-1 partes normalmente, depois derive a última por subtração. O total sempre vai bater exatamente, pois a última parte absorve qualquer resto de arredondamento.',
  },
  {
    id: 'fm4',
    question: 'Por que é arriscado arredondar após cada etapa de um cálculo financeiro multi-passo (ex: aplicar desconto, arredondar, depois aplicar imposto)?',
    options: [
      'Não é arriscado — arredondar cedo é na verdade a melhor prática para performance',
      'Cada etapa de arredondamento descarta precisão que a próxima etapa precisa. Esses erros se acumulam e o total final pode diferir — às vezes em dinheiro real — de calcular tudo primeiro e arredondar uma vez.',
      'C# só permite arredondar uma vez por método',
      'Arredondar no meio do cálculo causa uma exceção em runtime',
    ],
    correct: 1,
    explanation: 'Essa é a regra de ouro: arredonde uma vez, no final. Arredondar etapas intermediárias significa que cada cálculo subsequente opera em dados já imprecisos, e esses pequenos erros se acumulam — especialmente notável em percentuais e cálculos de impostos em muitos itens.',
  },
  {
    id: 'fm5',
    question: 'No System Boundaries pattern, onde deve acontecer o arredondamento para exibição/saída JSON?',
    options: [
      'Dentro da entidade de domínio, assim que um valor é definido',
      'No banco de dados, via coluna computada',
      'Apenas no limite do sistema — ex: um JsonConverter customizado durante a serialização — nunca dentro da lógica de domínio ou negócio',
      'Não importa, contanto que aconteça em algum lugar antes do SaveChangesAsync',
    ],
    correct: 2,
    explanation: 'A camada de domínio (serviços, entidades, banco) deve armazenar e calcular com precisão decimal total — não tem conceito de "como um número parece". Arredondamento é uma preocupação de apresentação e pertence apenas ao limite: serialização JSON, formatação de UI ou geração de exportação.',
  },
];

export const financialMathTopicPtBr: Topic = {
  slug: 'financial-math',
  title: 'Matemática Financeira',
  description: 'decimal vs double, armadilhas do Math.Round, o problema de alocação e o System Boundaries pattern para código financeiro limpo.',
  icon: '🧮',
  status: 'available',
  color: '#22d3ee',
  sections: [
    {
      id: 'why-decimal',
      title: 'Por que decimal, Não double ou float',
      content: [
        {
          type: 'text',
          text: 'Computadores armazenam double e float em binário. A maioria das frações que você escreveria em decimal — como 0,1 — não tem representação binária exata, assim como 1/3 não tem representação exata em base 10. O resultado: erros minúsculos e invisíveis que se acumulam ao longo dos cálculos.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A armadilha clássica de ponto flutuante',
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
            { icon: '⚡', title: 'double / float', description: 'Ponto flutuante binário. Rápido, mas não consegue representar exatamente a maioria das frações base-10. Ótimo para gráficos, física, computação científica — nunca para dinheiro.', color: '#f74f4f' },
            { icon: '💰', title: 'decimal', description: 'Ponto flutuante base-10, 28-29 dígitos significativos. Representa exatamente as frações que o dinheiro usa. Ligeiramente mais lento, mas correção importa mais que velocidade aqui.', color: '#00d4aa' },
          ],
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Não existe argumento de "bom o suficiente" para usar double com dinheiro. O erro é pequeno por operação, mas se acumula em milhares de transações e eventualmente produzirá um total que não reconcilia — e isso é um problema real e auditável em software financeiro.',
        },
      ],
    },
    {
      id: 'math-round-midpoint',
      title: 'Math.Round & A Armadilha do Arredondamento do Banqueiro',
      content: [
        {
          type: 'text',
          text: 'Math.Round parece simples, mas seu comportamento padrão surpreende a maioria dos desenvolvedores — especialmente quem aprendeu "arredondar meio para cima" na escola.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'A surpresa',
          code: `Math.Round(2.5); // 2 — não 3!
Math.Round(3.5); // 4
Math.Round(0.125, 2); // 0.12 — não 0.13!

// O MidpointRounding padrão é ToEven ("arredondamento do banqueiro")
// Arredonda para o dígito PAR mais próximo, não sempre para cima`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🏦', title: 'ToEven (padrão)', description: 'Arredonda .5 para o número par mais próximo. Reduz viés estatístico em grandes volumes de números — útil em estatísticas agregadas, não intuitivo para transações individuais.', color: '#f7a24f' },
            { icon: '⬆️', title: 'AwayFromZero', description: 'Arredonda .5 para longe do zero — o comportamento "arredondar meio para cima" que a maioria espera. É quase sempre o que você quer para itens financeiros individuais.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Seja explícito — sempre',
          code: `// ✅ Explícito — previsível, corresponde às expectativas do usuário
var arredondado = Math.Round(valor, 2, MidpointRounding.AwayFromZero);

// ❌ Implícito — depende de um padrão que a maioria não conhece
var arredondado = Math.Round(valor, 2);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Nunca confie no MidpointRounding padrão em código financeiro. Sempre passe MidpointRounding.AwayFromZero explicitamente, mesmo quando corresponde ao padrão — documenta a intenção e te protege se o .NET mudar seu padrão (já tem padrões diferentes em algumas sobrecargas).',
        },
      ],
    },
    {
      id: 'allocation-problem',
      title: 'O Problema de Alocação — Dividindo Valores',
      content: [
        {
          type: 'text',
          text: 'Um dos bugs financeiros mais comuns: dividir um valor em partes iguais, arredondar cada parte e o total não corresponder mais ao original. Isso aparece em divisão de faturas, rateio de despesas e alocação de impostos.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ A abordagem ingênua perde um centavo',
          code: `decimal total = 100.00m;
int partes = 3;
decimal parcela = Math.Round(total / partes, 2, MidpointRounding.AwayFromZero);
// parcela = 33.33

decimal somaDasParcelas = parcela * partes;
// somaDasParcelas = 99.99 — faltando R$0.01!`,
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ Correção — última parcela absorve o resto',
          code: `decimal total = 100.00m;
int partes = 3;

var parcelas = new List<decimal>();
decimal totalAcumulado = 0m;

for (int i = 0; i < partes - 1; i++)
{
    var parcela = Math.Round(total / partes, 2, MidpointRounding.AwayFromZero);
    parcelas.Add(parcela);
    totalAcumulado += parcela;
}

// Última parcela = o que faz o total bater exatamente
parcelas.Add(total - totalAcumulado);

// parcelas = [33.33, 33.33, 33.34]
// Soma = 100.00 exatamente — sempre`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Esse padrão — arredondar os primeiros N-1 itens, derivar o último por subtração — garante que seu total sempre reconcile. É a abordagem padrão usada por processadores de pagamento e sistemas contábeis para dividir faturas, impostos e despesas compartilhadas.',
        },
      ],
    },
    {
      id: 'golden-rule',
      title: 'A Regra de Ouro — Não Arredonde Etapas Intermediárias',
      content: [
        {
          type: 'text',
          text: 'Toda vez que você arredonda, descarta precisão. Se o próximo passo do cálculo usa esse valor arredondado, o erro se acumula. Arredonde apenas uma vez — no final absoluto do cálculo, não no meio.',
        },
        {
          type: 'code',
          language: 'bash',
          label: '❌ Arredondando a cada etapa — erro se acumula',
          code: `decimal preco = 19.99m;
decimal desconto = 0.15m;  // 15% de desconto
decimal imposto = 0.0825m; // 8,25% de imposto

// Arredondando após CADA etapa
decimal comDesconto = Math.Round(preco * (1 - desconto), 2, MidpointRounding.AwayFromZero); // 16.99
decimal comImposto = Math.Round(comDesconto * (1 + imposto), 2, MidpointRounding.AwayFromZero); // 18.40`,
        },
        {
          type: 'code',
          language: 'bash',
          label: '✅ Calcule tudo, arredonde uma vez no final',
          code: `decimal preco = 19.99m;
decimal desconto = 0.15m;
decimal imposto = 0.0825m;

// Precisão total em cada etapa — arredonde apenas o resultado final
decimal precoFinal = preco * (1 - desconto) * (1 + imposto);
decimal arredondado = Math.Round(precoFinal, 2, MidpointRounding.AwayFromZero); // 18.39

// Diferente do resultado passo-a-passo acima por um centavo —
// e a versão passo-a-passo é a ERRADA`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Um centavo parece trivial em uma única transação. Multiplicado por milhares de faturas, torna-se um problema real de reconciliação — e potencialmente um problema de conformidade, já que autoridades fiscais esperam uma ordem de cálculo específica e defensável.',
        },
      ],
    },
    {
      id: 'system-boundaries',
      title: 'System Boundaries (Limites do Sistema) — Onde o Arredondamento Pertence',
      content: [
        {
          type: 'text',
          text: 'A regra de ouro tem uma consequência arquitetural: sua lógica de domínio nunca deve arredondar. Arredondamento é uma preocupação de apresentação, e pertence à borda do seu sistema — não dentro da lógica de negócio que calcula os números.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🎯',
              title: 'Core / Domínio',
              description: 'Serviços, entidades, banco de dados. Armazene e calcule com precisão decimal total. O domínio não sabe nem se importa como um número parece — só que a matemática é exata.',
              color: '#22d3ee',
            },
            {
              icon: '🌐',
              title: 'Limite / Borda',
              description: 'Serialização JSON, exibição na UI, exportações, chamadas de API externas. É aqui que a precisão bruta é traduzida para algo que um humano ou sistema externo espera — arredondado, formatado.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Um JsonConverter customizado — arredondamento acontece apenas na saída',
          code: `public class DecimalArredondadoConverter : JsonConverter<decimal>
{
    public override decimal Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
        => reader.GetDecimal(); // leitura mantém precisão total

    public override void Write(Utf8JsonWriter writer, decimal value, JsonSerializerOptions options)
    {
        var arredondado = Math.Round(value, 2, MidpointRounding.AwayFromZero);
        writer.WriteNumberValue(arredondado);
    }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Registre uma vez — aplica em toda resposta automaticamente',
          code: `// Program.cs
builder.Services.Configure<JsonOptions>(options =>
{
    options.JsonSerializerOptions.Converters.Add(new DecimalArredondadoConverter());
});

// Todo decimal em toda resposta de API agora é arredondado no limite.
// Seus serviços, entidades e banco nunca arredondam nada.`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Esse é o benefício arquitetural: a lógica de negócio permanece pura e testável, livre de preocupações de apresentação. Se uma equipe de frontend depois pedir 4 casas decimais em vez de 2, você muda um conversor — não cada cálculo em toda a codebase.',
        },
      ],
    },
    {
      id: 'percentages',
      title: 'Percentuais — Armadilhas Comuns',
      content: [
        {
          type: 'text',
          text: 'Bugs com percentuais são quase sempre um de dois erros: representar o percentual errado (10 vs 0,10), ou arredondar um valor derivado de percentual muito cedo em um cálculo de múltiplos passos.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Represente percentuais como uma taxa decimal, não número inteiro',
          code: `// ✅ Armazene a taxa como fração
decimal aliquotaImposto = 0.0825m; // 8,25%
decimal imposto = preco * aliquotaImposto;

// ❌ Misturar percentual inteiro com matemática de taxa é propenso a erros
decimal percentualImposto = 8.25m;
decimal imposto = preco * percentualImposto / 100m; // passo extra, risco extra de arredondamento`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Percentuais empilhados — ordem e precisão ambas importam',
          code: `// 15% de desconto, depois 8,25% de imposto sobre o preço com desconto
decimal preco = 100.00m;
decimal desconto = 0.15m;
decimal imposto = 0.0825m;

// Aplique como fatores multiplicativos — sem arredondamento até o final
decimal precoFinal = preco * (1 - desconto) * (1 + imposto);
decimal arredondado = Math.Round(precoFinal, 2, MidpointRounding.AwayFromZero);
// 92.0125 → 92.01

// Somar percentuais em vez de multiplicar fatores compostos é um bug comum:
decimal errado = preco * (1 - desconto + imposto); // NÃO é a mesma coisa — matemática errada`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Percentuais empilhados são multiplicativos, não aditivos. "15% de desconto, depois 8,25% de imposto" é `preco * 0,15 * 0,0825`, não `preco * (1 - 0,15 + 0,0825)`. A segunda forma dá um resultado com aparência plausível mas matematicamente errado.',
        },
      ],
    },
    {
      id: 'quick-reference',
      title: 'Referência Rápida — Toolkit de decimal & Math',
      content: [
        {
          type: 'text',
          text: 'Uma lista curta de coisas que vale saber depois de estar confortável com as regras centrais acima.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔢', title: 'Precisão do decimal', description: '28-29 dígitos significativos. Mais que suficiente para qualquer valor financeiro real — você jamais vai atingir esse limite na prática.', color: '#22d3ee' },
            { icon: '⬆️', title: 'Math.Ceiling / Math.Floor', description: 'Arredondar para cima ou baixo independente do ponto médio. Útil para fretes ("arredondar para o real inteiro mais próximo") ou unidades de estoque (não dá para enviar meia caixa).', color: '#4f8ef7' },
            { icon: '🚫', title: 'Sem conversão implícita double↔decimal', description: 'C# não converte implicitamente entre double e decimal — você deve converter explicitamente. Isso é uma feature de segurança: impede perda acidental de precisão.', color: '#f74f4f' },
            { icon: '🏷️', title: 'O sufixo `m`', description: 'Sempre use o sufixo `m` em literais decimais (0.1m, não 0.1). Sem ele, o C# trata o literal como double, e misturar tipos força uma conversão explícita.', color: '#a78bfa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplo com Ceiling — frete arredonda para cima ao real inteiro',
          code: `decimal frete = 4.23m;
decimal arredondadoParaCima = Math.Ceiling(frete); // 5.00 — nunca cobra a menos no frete

int caixasNecessarias = (int)Math.Ceiling(135m / 24m); // 6 caixas para 135 unidades com 24/caixa`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Resumo de todo o tópico em uma frase: calcule com decimal em precisão total em toda a camada de domínio, arredonde exatamente uma vez — explicitamente, com MidpointRounding.AwayFromZero — apenas no limite onde um humano ou sistema externo precisa ver o número.',
        },
      ],
    },
  ],
};