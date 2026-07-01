import type { Topic, QuizQuestion } from '@/types';

export async function getTopicContent(slug: string, lang: string): Promise<Topic | null> {
  try {
    const langDir = lang === 'pt-br' ? 'pt-br' : 'en';
 
    if (slug === 'auth') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/auth`)
        : await import(`@/content/en/auth`)) as any;
      return langDir === 'pt-br' ? mod.authTopicPtBr : mod.authTopic;
    }

    if (slug === 'versioning') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/versioning`)
        : await import(`@/content/en/versioning`)) as any;
      return langDir === 'pt-br' ? mod.versioningTopicPtBr : mod.versioningTopic;
    }
    
    if (slug === 'azure') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/azure`)
        : await import(`@/content/en/azure`)) as any;
      return langDir === 'pt-br' ? mod.azureTopicPtBr : mod.azureTopic;
    }

    if (slug === 'docker') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/docker`)
        : await import(`@/content/en/docker`)) as any;
      return langDir === 'pt-br' ? mod.dockerTopicPtBr : mod.dockerTopic;
    }
 
    if (slug === 'ef-core') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/ef-core`)
        : await import(`@/content/en/ef-core`)) as any;
      return langDir === 'pt-br' ? mod.efCoreTopicPtBr : mod.efCoreTopic;
    }

    if (slug === 'memory') {
      const mod = langDir === 'pt-br'
        ? await import(`@/content/pt-br/memory`)
        : await import(`@/content/en/memory`) as any;
      return langDir === 'pt-br' ? mod.memoryTopicPtBr : mod.memoryTopic;
    }
 
    if (slug === 'messaging') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/messaging`)
        : await import(`@/content/en/messaging`)) as any;
      return langDir === 'pt-br' ? mod.messagingTopicPtBr : mod.messagingTopic;
    }
 
    if (slug === 'agentic-engineering') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/agentic-engineering`)
        : await import(`@/content/en/agentic-engineering`)) as any;
      return langDir === 'pt-br' ? mod.agenticTopicPtBr : mod.agenticTopic;
    }
    
    if (slug === 'financial-math') {
      const mod = langDir === 'pt-br'
        ? await import(`@/content/pt-br/financial-math`)
        : await import(`@/content/en/financial-math`) as any;
      return langDir === 'pt-br' ? mod.financialMathTopicPtBr : mod.financialMathTopic;
    }

    return null;
  } catch {
    return null;
  }
}

export async function getTopicQuiz(slug: string, lang: string): Promise<QuizQuestion[]> {
  try {
    const langDir = lang === 'pt-br' ? 'pt-br' : 'en';
 
    if (slug === 'auth') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/auth`)
        : await import(`@/content/en/auth`)) as any;
      return langDir === 'pt-br' ? mod.authQuizPtBr : mod.authQuiz;
    }

    if (slug === 'versioning') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/versioning`)
        : await import(`@/content/en/versioning`)) as any;
      return langDir === 'pt-br' ? mod.versioningQuizPtBr : mod.versioningQuiz;
    }

    if (slug === 'azure') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/azure`)
        : await import(`@/content/en/azure`)) as any;
      return langDir === 'pt-br' ? mod.azureQuizPtBr : mod.azureQuiz;
    }

    if (slug === 'docker') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/docker`)
        : await import(`@/content/en/docker`)) as any;
      return langDir === 'pt-br' ? mod.dockerQuizPtBr : mod.dockerQuiz;
    }
 
    if (slug === 'ef-core') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/ef-core`)
        : await import(`@/content/en/ef-core`)) as any;
      return langDir === 'pt-br' ? mod.efCoreQuizPtBr : mod.efCoreQuiz;
    }
 
    if (slug === 'memory') {
      const mod = langDir === 'pt-br'
        ? await import(`@/content/pt-br/memory`)
        : await import(`@/content/en/memory`) as any;
      return langDir === 'pt-br' ? mod.memoryQuizPtBr : mod.memoryQuiz;
    }

    if (slug === 'messaging') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/messaging`)
        : await import(`@/content/en/messaging`)) as any;
      return langDir === 'pt-br' ? mod.messagingQuizPtBr : mod.messagingQuiz;
    }
 
    if (slug === 'agentic-engineering') {
      const mod = (langDir === 'pt-br'
        ? await import(`@/content/pt-br/agentic-engineering`)
        : await import(`@/content/en/agentic-engineering`)) as any;
      return langDir === 'pt-br' ? mod.agenticQuizPtBr : mod.agenticQuiz;
    }

    if (slug === 'financial-math') {
      const mod = langDir === 'pt-br'
        ? await import(`@/content/pt-br/financial-math`)
        : await import(`@/content/en/financial-math`) as any;
      return langDir === 'pt-br' ? mod.financialMathQuizPtBr : mod.financialMathQuiz;
    }

    return [];
  } catch {
    return [];
  }
}

export const ALL_TOPICS = [
  {
    slug: 'auth',
    icon: '🔐',
    color: '#f7c948',
    status: 'available' as const,
    en: { title: 'Auth', description: 'JWT, cookies, token revocation, and protecting your .NET API from the most common auth attacks.' },
    'pt-br': { title: 'Auth', description: 'JWT, cookies, revogação de tokens e como proteger sua API .NET dos ataques de autenticação mais comuns.' },
  },
  {
    slug: 'versioning',
    icon: '🔖',
    color: '#ecf74f',
    status: 'available' as const,
    en: { title: 'Versioning', description: 'Git workflows, Semantic Versioning, Conventional Commits, and .NET package versioning done right.' },
    'pt-br': { title: 'Versionamento', description: 'Git workflows, SemVer, Conventional Commits e versionamento de pacotes .NET do jeito certo.' },
  },
  {
    slug: 'azure',
    icon: '☁️',
    color: '#0078d4',
    status: 'available' as const,
    en: { title: 'Azure', description: 'Deploying, monitoring, and scaling .NET applications on Microsoft Azure.' },
    'pt-br': { title: 'Azure', description: 'Deploy, monitoramento e escalabilidade de aplicações .NET no Microsoft Azure.' },
  },
  {
    slug: 'docker',
    icon: '🐳',
    color: '#00d4aa',
    status: 'available' as const,
    en: { title: 'Docker', description: 'Containers, images, volumes and everything to ship .NET apps consistently.' },
    'pt-br': { title: 'Docker', description: 'Containers, imagens, volumes e tudo para entregar apps .NET com consistência.' },
  },
  {
    slug: 'ef-core',
    icon: '🗄️',
    color: '#a78bfa',
    status: 'available' as const,
    en: { title: 'EF Core', description: 'How Entity Framework Core works, what the Change Tracker does, and when to use EF Core, Dapper, or raw SQL.' },
    'pt-br': { title: 'EF Core', description: 'Como o Entity Framework Core funciona, o que o Change Tracker faz e quando usar EF Core, Dapper ou SQL puro.' },
  }, 
  {
    slug: 'memory',
    icon: '🧠',
    color: '#ff6cff',
    status: 'available' as const,
    en: {
      title: 'Memory & References',
      description: 'RAM - Stack vs Heap, value vs reference types, mutation bugs, closures, the GC, and why projections matter.',
    },
    'pt-br': {
      title: 'Memória & Referências',
      description: 'RAM - Stack vs Heap, tipos de valor vs referência, bugs de mutação, closures, o GC e por que projeções importam.',
    },
  },
  {
    slug: 'messaging',
    icon: '📨',
    color: '#4ff74f',
    status: 'available' as const,
    en: { title: 'Messaging', description: 'Queues, events, and the Saga Pattern — how .NET services talk without depending on each other.' },
    'pt-br': { title: 'Mensageria', description: 'Filas, eventos e o Padrão Saga — como serviços .NET se comunicam sem depender uns dos outros.' },
  },
  {
    slug: 'agentic-engineering',
    icon: '🤖',
    color: '#fa3a3a',
    status: 'available' as const,
    en: { title: 'Agentic Engineering', description: 'Leverage AI agents to automate and enhance your .NET development workflow.' },
    'pt-br': { title: 'Agentic Engineering', description: 'Utilize agentes de IA para automatizar e aprimorar seu fluxo de trabalho de desenvolvimento .NET.' },
  },
  {
    slug: 'financial-math',
    icon: '🧮',
    color: '#22d3ee',
    status: 'available' as const,
    en: {
      title: 'Financial Math',
      description: 'decimal vs double, Math.Round gotchas, the allocation problem, and the System Boundaries pattern for clean financial code.',
    },
    'pt-br': {
      title: 'Matemática Financeira',
      description: 'decimal vs double, armadilhas do Math.Round, o problema de alocação e o System Boundaries pattern para código financeiro limpo.',
    },
  },
  {
    slug: 'dependency-injection',
    icon: '💉',
    color: '#9034fa',
    status: 'coming-soon' as const,
    en: { title: 'Dependency Injection', description: 'Master .NET\'s built-in DI container, lifetimes, and service registration patterns.' },
    'pt-br': { title: 'Injeção de Dependências', description: 'Domine o container DI do .NET, tempos de vida e padrões de registro de serviços.' },
  },
  {
    slug: 'clean-code',
    icon: '🧹',
    color: '#f74f4f',
    status: 'coming-soon' as const,
    en: { title: 'Clean Code', description: 'Principles, patterns, and practices for maintainable .NET codebases.' },
    'pt-br': { title: 'Código Limpo', description: 'Princípios, padrões e práticas para bases de código .NET sustentáveis.' },
  },
];
