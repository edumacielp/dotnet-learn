import type { Topic, QuizQuestion } from '@/types';

export const versioningQuizPtBr: QuizQuestion[] = [
  {
    id: 'v1',
    question: 'No Versionamento Semântico (SemVer), o que um bump de versão MAJOR (ex: 1.x.x → 2.0.0) sinaliza?',
    options: [
      'Um hotfix ou patch foi aplicado',
      'Novas funcionalidades foram adicionadas de forma retrocompatível',
      'Mudanças incompatíveis foram introduzidas — integrações existentes podem quebrar',
      'O projeto foi renomeado',
    ],
    correct: 2,
    explanation: 'Bumps MAJOR sinalizam mudanças incompatíveis. Consumidores da sua biblioteca ou API precisam agir para atualizar. MINOR = novas funcionalidades retrocompatíveis. PATCH = correções de bugs retrocompatíveis.',
  },
  {
    id: 'v2',
    question: 'Qual é o propósito de uma mensagem Conventional Commit como `feat(auth): add OAuth2 login`?',
    options: [
      'É puramente estético — apenas uma preferência de estilo',
      'Permite geração automatizada de changelog, versionamento e release notes',
      'É exigido pelo Git para fazer push para um remoto',
      'Substitui a necessidade de descrições em pull requests',
    ],
    correct: 1,
    explanation: 'Conventional Commits dão aos commits uma estrutura legível por máquina. Ferramentas como `release-please` ou `semantic-release` os analisam para auto-bumpar versões e gerar changelogs — sem edição manual de versão.',
  },
  {
    id: 'v3',
    question: 'No GitFlow, em qual branch você NUNCA deve fazer commit direto em produção?',
    options: [
      'develop',
      'feature/*',
      'main (ou master)',
      'hotfix/*',
    ],
    correct: 2,
    explanation: '`main` deve apenas receber merges de branches `release/*` ou `hotfix/*` — nunca commits diretos. Ele sempre reflete o estado atual de produção e cada merge deve ser tagueado com uma versão.',
  },
  {
    id: 'v4',
    question: 'O que `git rebase -i HEAD~3` faz?',
    options: [
      'Cria uma nova branch a partir de 3 commits atrás',
      'Reverte os últimos 3 commits completamente',
      'Abre um editor interativo para reescrever, combinar ou reordenar os últimos 3 commits',
      'Mescla 3 branches em uma',
    ],
    correct: 2,
    explanation: 'O rebase interativo permite limpar o histórico local antes de fazer push — combinar commits WIP em um commit limpo, corrigir typos em mensagens ou reordenar mudanças. Nunca faça rebase de commits já enviados para uma branch compartilhada.',
  },
  {
    id: 'v5',
    question: 'Qual atributo de versionamento NuGet .NET controla a versão PÚBLICA do pacote visível no NuGet.org?',
    options: [
      'AssemblyVersion',
      'AssemblyFileVersion',
      'Version (PackageVersion)',
      'InformationalVersion',
    ],
    correct: 2,
    explanation: '`Version` (ou `PackageVersion`) no seu `.csproj` é o que o NuGet.org exibe e o que os consumidores referenciam. `AssemblyVersion` controla a compatibilidade binária no nível do CLR e deve mudar apenas em mudanças incompatíveis de API.',
  },
];

export const versioningTopicPtBr: Topic = {
  slug: 'versioning',
  title: 'Versionamento',
  description: 'Git workflows, Versionamento Semântico, Conventional Commits e versionamento de pacotes .NET do jeito certo.',
  icon: '🔖',
  status: 'available',
  color: '#caf74f',
  sections: [
    {
      id: 'why-versioning',
      title: 'Por que Versionamento Importa',
      content: [
        {
          type: 'text',
          text: 'Versionamento é o contrato entre seu código e quem depende dele. Quando está claro, releases são mais seguros, rollback é mais fácil e upgrades viram menos surpresa.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📜', title: 'Rastreabilidade', description: 'Cada release aponta para um commit e uma razão.', color: '#caf74f' },
            { icon: '🔄', title: 'Rollback seguro', description: 'Versões tagueadas permitem restaurar estados anteriores com confiança.', color: '#4f8ef7' },
            { icon: '🤝', title: 'Expectativa clara', description: 'SemVer diz ao consumidor o impacto da atualização.', color: '#a78bfa' },
            { icon: '🤖', title: 'Pronto para automação', description: 'Versionamento estruturado funciona melhor com CI/CD.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'git-fundamentals',
      title: 'Mantenha o histórico do Git limpo',
      content: [
        {
          type: 'text',
          text: 'Bom versionamento começa com bons hábitos de Git: commit claro, mudanças pequenas e histórico limpo antes de compartilhar.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Workflow diário',
          code: `# Adicione apenas os arquivos alterados\ngit add src/MeuServico.cs tests/MeuServicoTests.cs\n\n# Commit com mensagem clara\ngit commit -m "feat(pedidos): add lógica de retry"\n\n# Envie sua branch\ngit push origin HEAD\n\n# Rebase na main para histórico linear\ngit pull --rebase origin main`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Use rebase interativo apenas em branches que ainda não foram compartilhadas. Depois de publicadas, prefira merges para não reescrever histórico.',
        },
      ],
    },
    {
      id: 'semantic-versioning',
      title: 'Versionamento Semântico (SemVer)',
      content: [
        {
          type: 'text',
          text: 'SemVer usa MAJOR.MINOR.PATCH para comunicar o impacto de um release. Isso ajuda quem usa seu pacote a entender se a atualização é segura.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💥', title: 'MAJOR', description: 'Mudanças incompatíveis. Consumidores podem precisar ajustar código.', color: '#f74f4f' },
            { icon: '✨', title: 'MINOR', description: 'Novas funcionalidades retrocompatíveis.', color: '#caf74f' },
            { icon: '🩹', title: 'PATCH', description: 'Correções e melhorias retrocompatíveis.', color: '#4f8ef7' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplos de SemVer',
          code: `# 1.2.3 → 1.2.4   Correção\n# 1.2.3 → 1.3.0   Nova funcionalidade\n# 1.2.3 → 2.0.0   Mudança incompatível\n\n# Pré-release\n1.0.0-alpha.1\n1.0.0-beta.2`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Antes do 1.0.0, a API ainda pode mudar mais livremente. Depois do 1.0.0, use SemVer para sinalizar claramente compatibilidade.',
        },
      ],
    },
    {
      id: 'conventional-commits',
      title: 'Conventional Commits',
      content: [
        {
          type: 'text',
          text: 'Conventional Commits dão uma estrutura previsível às mensagens de commit, facilitando automação de changelogs e releases.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Formato de commit',
          code: `# Formato:\n# <tipo>(<escopo>): <descrição>\n\nfeat(auth): add rotação de refresh token\nfix(pedidos): prevenir cobrança duplicada\nchore(deps): atualizar EF Core\n\n# Mudança incompatível:\nfeat(api)!: renomear UserId para AccountId\n\nBREAKING CHANGE: Todos os consumidores da API devem atualizar referências de UserId para AccountId.`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✨', title: 'feat', description: 'Nova funcionalidade para o usuário.', color: '#caf74f' },
            { icon: '🩹', title: 'fix', description: 'Correção de bug.', color: '#4f8ef7' },
            { icon: '💥', title: 'feat! / BREAKING CHANGE', description: 'Mudança incompatível.', color: '#f74f4f' },
            { icon: '🔧', title: 'chore/docs/test', description: 'Infra, docs ou testes sem impacto de release.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use `commitlint` e `husky` para enforçar Conventional Commits no nível do git hook. Isso previne commits malformados de entrar no seu repositório.',
        },
      ],
    },
    {
      id: 'dotnet-versioning',
      title: 'Versionamento no .NET & NuGet',
      content: [
        {
          type: 'text',
          text: 'Em .NET, a versão que importa para consumidores é `Version` no `.csproj`. Os outros campos servem para compatibilidade do CLR e metadados de build.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔢', title: 'AssemblyVersion', description: 'Compatibilidade binária do CLR. Mude apenas em breaking changes.', color: '#f74f4f' },
            { icon: '📁', title: 'AssemblyFileVersion', description: 'Versão de arquivo mostrada no Explorer.', color: '#f7a24f' },
            { icon: '📦', title: 'Version (PackageVersion)', description: 'Versão do pacote NuGet que os consumidores instalam.', color: '#caf74f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Versionamento no .csproj',
          code: `<PropertyGroup>\n  <Version>2.1.0</Version>\n  <AssemblyVersion>2.0.0.0</AssemblyVersion>\n  <AssemblyFileVersion>2.1.0.0</AssemblyFileVersion>\n  <InformationalVersion>2.1.0+sha.a3f2c1b</InformationalVersion>\n</PropertyGroup>`,
        },
      ],
    },
  ],
};
