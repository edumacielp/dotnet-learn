import type { Topic, QuizQuestion } from '@/types';

export const versioningQuiz: QuizQuestion[] = [
  {
    id: 'v1',
    question: 'In Semantic Versioning (SemVer), what does a MAJOR version bump (e.g. 1.x.x → 2.0.0) signal?',
    options: [
      'A hotfix or patch was applied',
      'New features were added in a backward-compatible way',
      'Breaking changes were introduced — existing integrations may break',
      'The project was renamed',
    ],
    correct: 2,
    explanation: 'MAJOR bumps signal breaking changes. Consumers of your library or API must take action to upgrade. MINOR = new backward-compatible features. PATCH = backward-compatible bug fixes.',
  },
  {
    id: 'v2',
    question: 'What is the purpose of a Conventional Commit message like `feat(auth): add OAuth2 login`?',
    options: [
      'It is purely aesthetic — just a style preference',
      'It enables automated changelog generation, versioning, and release notes',
      'It is required by Git to push to a remote',
      'It replaces the need for pull request descriptions',
    ],
    correct: 1,
    explanation: 'Conventional Commits give commits a machine-readable structure. Tools like `release-please` or `semantic-release` parse them to auto-bump versions and generate changelogs — no manual version editing needed.',
  },
  {
    id: 'v3',
    question: 'In GitFlow, which branch should you NEVER commit directly to in production?',
    options: [
      'develop',
      'feature/*',
      'main (or master)',
      'hotfix/*',
    ],
    correct: 2,
    explanation: '`main` should only ever receive merges from `release/*` or `hotfix/*` branches — never direct commits. It always reflects the current production state and every merge should be tagged with a version.',
  },
  {
    id: 'v4',
    question: 'What does `git rebase -i HEAD~3` do?',
    options: [
      'Creates a new branch from 3 commits ago',
      'Reverts the last 3 commits entirely',
      'Opens an interactive editor to rewrite, squash, or reorder the last 3 commits',
      'Merges 3 branches into one',
    ],
    correct: 2,
    explanation: 'Interactive rebase lets you clean up local commit history before pushing — squash WIP commits into one clean commit, fix typos in messages, or reorder changes. Never rebase commits already pushed to a shared branch.',
  },
  {
    id: 'v5',
    question: 'Which .NET NuGet versioning attribute controls the PUBLIC package version visible on NuGet.org?',
    options: [
      'AssemblyVersion',
      'AssemblyFileVersion',
      'Version (PackageVersion)',
      'InformationalVersion',
    ],
    correct: 2,
    explanation: '`Version` (or `PackageVersion`) in your `.csproj` is what NuGet.org displays and what consumers reference. `AssemblyVersion` controls binary compatibility at the CLR level and should change only on breaking API changes.',
  },
];

export const versioningTopic: Topic = {
  slug: 'versioning',
  title: 'Versioning',
  description: 'Git workflows, Semantic Versioning, Conventional Commits, and .NET package versioning done right.',
  icon: '🔖',
  status: 'available',
  color: '#caf74f',
  sections: [
    {
      id: 'why-versioning',
      title: 'Why Versioning Matters',
      content: [
        {
          type: 'text',
          text: 'Versioning is the contract between your code and everyone who depends on it. When it is clear, releases are safer, rollbacks are easier, and upgrades are predictable.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📜', title: 'Traceability', description: 'Every release points back to a commit, a change, and a reason.', color: '#caf74f' },
            { icon: '🔄', title: 'Rollback safety', description: 'Tagged versions help restore previous states reliably.', color: '#4f8ef7' },
            { icon: '🤝', title: 'Clear expectations', description: 'SemVer tells consumers what type of change they are receiving.', color: '#a78bfa' },
            { icon: '🤖', title: 'Automation-ready', description: 'Structured versioning works well with CI/CD and release tooling.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'git-fundamentals',
      title: 'Keep Git History Clean',
      content: [
        {
          type: 'text',
          text: 'Good versioning starts with good Git habits: commit clearly, keep changes small, and clean up your local history before sharing it.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Daily Git workflow',
          code: `# Stage only the files you changed\ngit add src/MyService.cs tests/MyServiceTests.cs\n\n# Commit with a clear message\ngit commit -m "feat(orders): add retry logic"\n\n# Push your branch\ngit push origin HEAD\n\n# Rebase on main for a linear history\ngit pull --rebase origin main`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Use interactive rebase only on branches that have not yet been shared. Once a branch is pushed, prefer merges to avoid rewriting history.',
        },
      ],
    },
    {
      id: 'semantic-versioning',
      title: 'Semantic Versioning (SemVer)',
      content: [
        {
          type: 'text',
          text: 'SemVer uses MAJOR.MINOR.PATCH to communicate the impact of a release. It helps your users understand whether an update is safe or requires changes.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💥', title: 'MAJOR', description: 'Breaking changes. Existing consumers may need to update code.', color: '#f74f4f' },
            { icon: '✨', title: 'MINOR', description: 'Backward-compatible features. Safe to upgrade.', color: '#caf74f' },
            { icon: '🩹', title: 'PATCH', description: 'Backward-compatible fixes and improvements.', color: '#4f8ef7' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'SemVer examples',
          code: `# 1.2.3 → 1.2.4   Patch fix\n# 1.2.3 → 1.3.0   New feature\n# 1.2.3 → 2.0.0   Breaking change\n\n# Pre-release versions\n1.0.0-alpha.1\n1.0.0-beta.2`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Start at 0.x.x while your public API is still forming — before 1.0.0, breaking changes are expected. After 1.0.0, use SemVer to signal compatibility clearly.',
        },
      ],
    },
    {
      id: 'conventional-commits',
      title: 'Conventional Commits',
      content: [
        {
          type: 'text',
          text: 'Conventional Commits give commit messages a predictable structure, making changelog generation and version bumps easier to automate.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Commit message format',
          code: `# Format:\n# <type>(<scope>): <description>\n\nfeat(auth): add refresh token rotation\nfix(orders): prevent duplicate charge\nchore(deps): upgrade EF Core\n\n# Breaking change:\nfeat(api)!: rename UserId to AccountId\n\nBREAKING CHANGE: All API consumers must update field references from UserId to AccountId.`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✨', title: 'feat', description: 'New user-facing functionality.', color: '#caf74f' },
            { icon: '🩹', title: 'fix', description: 'Bug fix or correction.', color: '#4f8ef7' },
            { icon: '💥', title: 'feat! / BREAKING CHANGE', description: 'Incompatible change requiring a MAJOR bump.', color: '#f74f4f' },
            { icon: '🔧', title: 'chore/docs/test', description: 'Tooling, docs, or tests without a release impact.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Add commitlint and husky if you want to enforce structured commits at the repository level.',
        },
      ],
    },
    {
      id: 'dotnet-versioning',
      title: '.NET & NuGet Versioning',
      content: [
        {
          type: 'text',
          text: 'In .NET, the package version that matters to consumers is `Version` in the `.csproj`. The other fields are for CLR compatibility and build metadata.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔢', title: 'AssemblyVersion', description: 'CLR compatibility version. Change only on breaking API changes.', color: '#f74f4f' },
            { icon: '📁', title: 'AssemblyFileVersion', description: 'Build/file version shown in Explorer.', color: '#f7a24f' },
            { icon: '📦', title: 'Version (PackageVersion)', description: 'The NuGet package version consumers install.', color: '#caf74f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Versioning in .csproj',
          code: `<PropertyGroup>\n  <Version>2.1.0</Version>\n  <AssemblyVersion>2.0.0.0</AssemblyVersion>\n  <AssemblyFileVersion>2.1.0.0</AssemblyFileVersion>\n  <InformationalVersion>2.1.0+sha.a3f2c1b</InformationalVersion>\n</PropertyGroup>`,
        },
      ],
    },
  ],
};
