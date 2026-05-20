import type { Topic, QuizQuestion } from '@/types';

export async function getTopicContent(slug: string, lang: string): Promise<Topic | null> {
  try {
    const langDir = lang === 'pt-br' ? 'pt-br' : 'en';
 
    if (slug === 'versioning') {
      if (langDir === 'pt-br') {
        const mod = await import(`@/content/pt-br/versioning`);
        return mod.versioningTopicPtBr;
      } else {
        const mod = await import(`@/content/en/versioning`);
        return mod.versioningTopic;
      }
    }
    
    if (slug === 'azure') {
      if (langDir === 'pt-br') {
        const mod = await import(`@/content/pt-br/azure`);
        return mod.azureTopicPtBr;
      } else {
        const mod = await import(`@/content/en/azure`);
        return mod.azureTopic;
      }
    }

    if (slug === 'docker') {
      if (langDir === 'pt-br') {
        const mod = await import(`@/content/pt-br/docker`);
        return mod.dockerTopicPtBr;
      } else {
        const mod = await import(`@/content/en/docker`);
        return mod.dockerTopic;
      }
    }

    return null;
  } catch {
    return null;
  }
}

export async function getTopicQuiz(slug: string, lang: string): Promise<QuizQuestion[]> {
  try {
    const langDir = lang === 'pt-br' ? 'pt-br' : 'en';

    if (slug === 'versioning') {
      if (langDir === 'pt-br') {
        const mod = await import(`@/content/pt-br/versioning`);
        return mod.versioningQuizPtBr;
      } else {
        const mod = await import(`@/content/en/versioning`);
        return mod.versioningQuiz;
      }
    }

    if (slug === 'azure') {
      if (langDir === 'pt-br') {
        const mod = await import(`@/content/pt-br/azure`);
        return mod.azureQuizPtBr;
      } else {
        const mod = await import(`@/content/en/azure`);
        return mod.azureQuiz;
      }
    }

    if (slug === 'docker') {
      if (langDir === 'pt-br') {
        const mod = await import(`@/content/pt-br/docker`);
        return mod.dockerQuizPtBr;
      } else {
        const mod = await import(`@/content/en/docker`);
        return mod.dockerQuiz;
      }
    }

    return [];
  } catch {
    return [];
  }
}

export const ALL_TOPICS = [
  {
    slug: 'versioning',
    icon: '🔖',
    color: '#caf74f',
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
    slug: 'terraform',
    icon: '🏗️',
    color: '#f7a24f',
    status: 'coming-soon' as const,
    en: { title: 'Terraform', description: 'Infrastructure as Code for provisioning Azure resources in .NET projects.' },
    'pt-br': { title: 'Terraform', description: 'Infraestrutura como código para provisionar recursos Azure em projetos .NET.' },
  },
  {
    slug: 'dependency-injection',
    icon: '💉',
    color: '#4f8ef7',
    status: 'coming-soon' as const,
    en: { title: 'Dependency Injection', description: 'Master .NET\'s built-in DI container, lifetimes, and service registration patterns.' },
    'pt-br': { title: 'Injeção de Dependências', description: 'Domine o container DI do .NET, tempos de vida e padrões de registro de serviços.' },
  },
  {
    slug: 'claude-code',
    icon: '✨',
    color: '#a78bfa',
    status: 'coming-soon' as const,
    en: { title: 'Claude Code', description: 'Harness the power of AI to generate, refactor, and optimize your .NET code.' },
    'pt-br': { title: 'Claude Code', description: 'Aproveite o poder da IA para gerar, refatorar e otimizar seu código .NET.' },
  },
];
