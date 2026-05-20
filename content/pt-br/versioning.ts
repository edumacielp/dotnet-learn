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
          text: 'Versionamento é o contrato entre você e todos que dependem do seu código — colegas de equipe, consumidores dos seus pacotes NuGet, serviços downstream e você mesmo às 2h da manhã debugando um incidente em produção. Feito corretamente, torna cada release previsível e auditável.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📜', title: 'Trilha de auditoria', description: 'Toda mudança é rastreável a um commit, um motivo e um autor. Debugging vira arqueologia, não adivinhação.', color: '#caf74f' },
            { icon: '🔄', title: 'Rollbacks seguros', description: 'Releases tagueadas significam que você pode redeployar qualquer versão anterior em segundos, não horas.', color: '#4f8ef7' },
            { icon: '🤝', title: 'Contratos claros', description: 'SemVer diz aos consumidores exatamente o que esperar ao atualizar — sem surpresas.', color: '#a78bfa' },
            { icon: '🤖', title: 'Amigável à automação', description: 'Commits estruturados alimentam changelogs automáticos, versões auto-bumpeadas e pipelines de release.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'git-fundamentals',
      title: 'Fundamentos de Git que Vale Saber',
      content: [
        {
          type: 'text',
          text: 'A maioria dos devs usa `git add`, `commit`, `push` e `pull` diariamente — mas os comandos que realmente te salvam são os que você usa quando algo dá errado ou quando precisa limpar antes de um PR.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Workflow diário',
          code: `# Staged arquivos específicos (não tudo)
git add src/MeuServico.cs tests/MeuServicoTests.cs

# Commit com intenção
git commit -m "feat(pedidos): add lógica de retry para gateway de pagamento"

# Push da branch atual
git push origin HEAD

# Pull com rebase (histórico mais limpo que merge)
git pull --rebase origin main`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Corrigindo Erros',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Comandos de desfazer e corrigir',
          code: `# Corrigir o último commit (mensagem ou arquivos staged)
git commit --amend --no-edit

# Desfazer último commit mas manter mudanças staged
git reset --soft HEAD~1

# Desfazer último commit e destagear mudanças (manter arquivos)
git reset HEAD~1

# Descartar todas as mudanças locais de um arquivo
git checkout -- src/MeuServico.cs

# Guardar trabalho em andamento
git stash push -m "wip: refactor pela metade"
git stash pop

# Cherry-pick um único commit de outra branch
git cherry-pick a3f2c1b`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Rebase Interativo — Histórico Limpo Antes dos PRs',
        },
        {
          type: 'text',
          text: 'Antes de abrir um PR, combine seus commits "wip", "fix typo" e "oops" em um único commit significativo. Isso mantém o histórico da branch principal legível.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Workflow de rebase interativo',
          code: `# Reescrever os últimos 4 commits interativamente
git rebase -i HEAD~4

# No editor que abre:
# pick a1b2c3 feat: add serviço de pedidos
# squash d4e5f6 wip: metade feito
# squash g7h8i9 corrige typo
# squash j1k2l3 esqueci null check

# Resultado: um commit limpo com todas as mudanças`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Nunca faça rebase de commits que já foram enviados para uma branch compartilhada. Rebase é para limpar seu trabalho local antes que ele vire histórico compartilhado.',
        },
      ],
    },
    {
      id: 'branching-strategies',
      title: 'Estratégias de Branching',
      content: [
        {
          type: 'text',
          text: 'Sua estratégia de branching define como o código flui da máquina do dev até a produção. Não existe uma resposta universalmente "correta" — escolha a que se adapta ao tamanho da sua equipe e cadência de releases.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🌊',
              title: 'GitFlow',
              description: 'main + develop + feature/* + release/* + hotfix/*. Ótimo para produtos versionados com releases programadas. Mais overhead para entrega contínua.',
              color: '#4f8ef7',
            },
            {
              icon: '🛣️',
              title: 'Trunk-Based Development',
              description: 'Todos commitam para main (ou branches de feature < 2 dias). Requer feature flags. Ideal para CI/CD e equipes de alta velocidade.',
              color: '#caf74f',
            },
            {
              icon: '🍴',
              title: 'GitHub Flow',
              description: 'main + branches de feature + PRs. Simples e eficaz para a maioria das equipes. Deploy a partir da main após cada merge.',
              color: '#a78bfa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'GitFlow na prática',
          code: `# Iniciar uma nova feature
git checkout develop
git checkout -b feature/add-gateway-pagamento

# ... trabalhar ...

# Merge de volta para develop (via PR)
git checkout develop
git merge --no-ff feature/add-gateway-pagamento

# Criar branch de release
git checkout -b release/1.3.0
# bump de versão, apenas correções finais

# Merge para main e tag
git checkout main
git merge --no-ff release/1.3.0
git tag -a v1.3.0 -m "Release 1.3.0"

# Merge de volta para develop
git checkout develop
git merge --no-ff release/1.3.0`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Para a maioria das APIs .NET e microserviços, GitHub Flow (main + branches de feature de curta duração) é o ponto ideal entre simplicidade e segurança. Use GitFlow apenas se você mantém múltiplas versões live simultaneamente.',
        },
      ],
    },
    {
      id: 'semantic-versioning',
      title: 'Versionamento Semântico (SemVer)',
      content: [
        {
          type: 'text',
          text: 'SemVer é a língua franca do versionamento de software. Um número de versão tem três partes: MAJOR.MINOR.PATCH. Cada parte carrega um significado específico que diz aos consumidores exatamente o que mudou.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💥', title: 'MAJOR (x.0.0)', description: 'Mudanças incompatíveis. Consumidores da API devem atualizar o código. Reseta MINOR e PATCH para 0.', color: '#f74f4f' },
            { icon: '✨', title: 'MINOR (0.x.0)', description: 'Novas funcionalidades, retrocompatíveis. Consumidores existentes não são afetados. Reseta PATCH para 0.', color: '#caf74f' },
            { icon: '🩹', title: 'PATCH (0.0.x)', description: 'Correções de bugs, retrocompatíveis. Seguro para atualizar sem ler changelogs.', color: '#4f8ef7' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplos de SemVer',
          code: `# 1.2.3 → 1.2.4   Correção de bug no processamento de pagamento
# 1.2.3 → 1.3.0   Adicionado novo endpoint /pedidos/exportar
# 1.2.3 → 2.0.0   Campos de DTO renomeados, esquema de auth alterado

# Versões de pré-release (não use em prod)
1.0.0-alpha.1
1.0.0-beta.2
1.0.0-rc.1

# Metadados de build (ignorados na precedência)
1.0.0+20240115.sha.5114f85`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Comece com 0.x.x enquanto sua API pública ainda está se formando — qualquer coisa antes de 1.0.0 é considerada instável e mudanças incompatíveis são permitidas sem um bump MAJOR.',
        },
      ],
    },
    {
      id: 'conventional-commits',
      title: 'Conventional Commits',
      content: [
        {
          type: 'text',
          text: 'Conventional Commits é uma especificação que dá às suas mensagens de commit uma estrutura leve e legível por máquina. O retorno: changelogs automáticos, bump de versão automático e um histórico que lê como documentação.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Formato Conventional Commit',
          code: `# Formato:
# <tipo>(<escopo opcional>): <descrição>
# <linha em branco>
# <corpo opcional>
# <rodapé opcional>

# Exemplos:
feat(auth): add rotação de refresh token
fix(pedidos): prevenir cobrança duplicada no retry
docs(readme): adicionar instruções de deploy
chore(deps): atualizar EF Core para 9.0.1
refactor(pagamento): extrair interface IPaymentGateway
test(pedidos): adicionar testes de integração para cancelamento

# Mudança incompatível (dispara bump MAJOR):
feat(api)!: renomear UserId para AccountId em todos os DTOs

# Ou com rodapé:
feat(api): renomear UserId para AccountId

BREAKING CHANGE: Todos os consumidores da API devem atualizar referências de UserId para AccountId.`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✨', title: 'feat', description: 'Nova funcionalidade para o usuário. Dispara bump de versão MINOR no SemVer.', color: '#caf74f' },
            { icon: '🩹', title: 'fix', description: 'Correção de bug para o usuário. Dispara bump de versão PATCH.', color: '#4f8ef7' },
            { icon: '💥', title: 'feat! / BREAKING CHANGE', description: 'Introduz uma mudança incompatível. Dispara bump MAJOR independente do tipo.', color: '#f74f4f' },
            { icon: '🔧', title: 'chore / refactor / test / docs', description: 'Sem bump de versão. Apenas mudanças de infraestrutura, qualidade de código ou documentação.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use `commitlint` + `husky` para enforçar Conventional Commits no nível do git hook. Isso previne commits malformados de entrar no seu repositório.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup commitlint + husky',
          code: `npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# Inicializar husky
npx husky init

# Adicionar hook commit-msg
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg

# Adicionar configuração commitlint
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.mjs`,
        },
      ],
    },
    {
      id: 'dotnet-versioning',
      title: 'Versionamento no .NET & NuGet',
      content: [
        {
          type: 'text',
          text: 'Projetos .NET expõem três números de versão diferentes no seu `.csproj`, cada um servindo um público diferente: o CLR, o sistema de arquivos e o registro do NuGet.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🔢',
              title: 'AssemblyVersion',
              description: 'Versão de compatibilidade binária do CLR. Mude APENAS em mudanças incompatíveis de API. Formato: MAJOR.MINOR.0.0',
              color: '#f74f4f',
            },
            {
              icon: '📁',
              title: 'AssemblyFileVersion',
              description: 'Versão do sistema de arquivos mostrada no Windows Explorer. Seguro para bumpar em cada build. Formato: MAJOR.MINOR.PATCH.BUILD',
              color: '#f7a24f',
            },
            {
              icon: '📦',
              title: 'Version (PackageVersion)',
              description: 'A versão do pacote NuGet — o que os consumidores veem no NuGet.org e referenciam nos projetos. Deve seguir SemVer estritamente.',
              color: '#caf74f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Versionamento no .csproj',
          code: `<PropertyGroup>
  <!-- Versão do pacote NuGet (SemVer) -->
  <Version>2.1.0</Version>

  <!-- Compatibilidade binária do CLR — mude apenas em mudanças incompatíveis -->
  <AssemblyVersion>2.0.0.0</AssemblyVersion>

  <!-- Versão do arquivo — seguro para bumpar em cada build -->
  <AssemblyFileVersion>2.1.0.0</AssemblyFileVersion>

  <!-- Legível por humanos, pode incluir git sha ou número de build -->
  <InformationalVersion>2.1.0+sha.a3f2c1b</InformationalVersion>
</PropertyGroup>`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Versionamento Automatizado com GitVersion',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup GitVersion',
          code: `# Instalar ferramenta GitVersion
dotnet tool install --global GitVersion.Tool

# Mostrar qual versão seria calculada
dotnet-gitversion /showvariable SemVer

# Usar no GitHub Actions
- name: Determinar versão
  uses: gittools/actions/gitversion/execute@v1

- name: Build
  run: dotnet build -p:Version=\${{ env.GitVersion_SemVer }}`,
        },
      ],
    },
    {
      id: 'git-tags-releases',
      title: 'Tags & Releases do GitHub',
      content: [
        {
          type: 'text',
          text: 'Tags Git são os pontos de ancoragem no histórico de versões. Uma tag em um commit significa "esta é a versão 1.3.0" — fixando um estado específico do código que sempre pode ser reconstruído identicamente.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Tagueando uma release',
          code: `# Criar uma tag anotada (preferida — inclui mensagem e info do autor)
git tag -a v1.3.0 -m "Release 1.3.0 — adiciona lógica de retry de pagamento"

# Push da tag para o remoto
git push origin v1.3.0

# Push de todas as tags locais de uma vez
git push origin --tags

# Listar todas as tags (ordenadas por versão)
git tag --sort=-version:refname

# Deletar uma tag local e remotamente (se errou)
git tag -d v1.3.0
git push origin :refs/tags/v1.3.0`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Sempre use tags anotadas (`-a`) para releases — elas armazenam o autor, data e mensagem. Tags leves são apenas ponteiros e não carregam metadados.',
        },
      ],
    },
    {
      id: 'changelog',
      title: 'Changelogs',
      content: [
        {
          type: 'text',
          text: 'Um changelog é um resumo curado e legível por humanos do que mudou entre versões. É a primeira coisa que um dev lê ao decidir se faz upgrade. Automatize — nunca escreva manualmente.',
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Se você seguiu Conventional Commits, ferramentas como `git-cliff`, `release-please` ou `semantic-release` podem gerar todo o seu CHANGELOG.md automaticamente na hora do release.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Estrutura do CHANGELOG.md',
          code: `# Changelog

## [2.1.0] - 2025-04-12

### Funcionalidades
- **auth**: adiciona rotação de refresh token (#142)
- **pedidos**: adiciona endpoint de exportação CSV (#138)

### Correções de Bug
- **pagamento**: previne cobrança duplicada no retry de rede (#144)
- **pedidos**: corrige offset de fuso horário em estimativas de entrega (#140)

## [2.0.0] - 2025-03-01

### ⚠ MUDANÇAS INCOMPATÍVEIS
- **api**: renomeado \`UserId\` para \`AccountId\` em todos os DTOs

### Funcionalidades
- **auth**: migração para OAuth2 + PKCE`,
        },
      ],
    },
  ],
};