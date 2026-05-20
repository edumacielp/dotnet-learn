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
          text: 'Versioning is the contract between you and everyone who depends on your code — teammates, consumers of your NuGet packages, downstream services, and your future self at 2am debugging a production incident. Done well, it makes every release predictable and auditable.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📜', title: 'Audit trail', description: 'Every change is traceable to a commit, a reason, and an author. Debugging becomes archaeology, not guesswork.', color: '#caf74f' },
            { icon: '🔄', title: 'Safe rollbacks', description: 'Tagged releases mean you can redeploy any previous version in seconds, not hours.', color: '#4f8ef7' },
            { icon: '🤝', title: 'Clear contracts', description: 'SemVer tells consumers exactly what to expect when they upgrade — no surprises.', color: '#a78bfa' },
            { icon: '🤖', title: 'Automation-friendly', description: 'Structured commits power auto-changelogs, auto-bumped versions, and release pipelines.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'git-fundamentals',
      title: 'Git Fundamentals Worth Knowing',
      content: [
        {
          type: 'text',
          text: 'Most developers use `git add`, `commit`, `push`, and `pull` daily — but the commands that really save you are the ones you reach for when something goes wrong or when you need to clean up before a PR.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Daily workflow',
          code: `# Stage specific files (not everything)
git add src/MyService.cs tests/MyServiceTests.cs

# Commit with intention
git commit -m "feat(orders): add retry logic for payment gateway"

# Push current branch
git push origin HEAD

# Pull with rebase (cleaner history than merge)
git pull --rebase origin main`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Fixing Mistakes',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Undo & amend commands',
          code: `# Amend the last commit (message or staged files)
git commit --amend --no-edit

# Undo last commit but keep changes staged
git reset --soft HEAD~1

# Undo last commit and unstage changes (keep files)
git reset HEAD~1

# Discard all local changes to a file
git checkout -- src/MyService.cs

# Stash work in progress
git stash push -m "wip: half-done refactor"
git stash pop

# Cherry-pick a single commit from another branch
git cherry-pick a3f2c1b`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Interactive Rebase — Clean History Before PRs',
        },
        {
          type: 'text',
          text: 'Before opening a PR, squash your "wip", "fix typo", and "oops" commits into a single meaningful commit. This keeps the main branch history readable.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Interactive rebase workflow',
          code: `# Rewrite last 4 commits interactively
git rebase -i HEAD~4

# In the editor that opens:
# pick a1b2c3 feat: add order service
# squash d4e5f6 wip: half done
# squash g7h8i9 fix typo
# squash j1k2l3 oops forgot null check

# Result: one clean commit with all changes combined`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Never rebase commits that have already been pushed to a shared branch. Rebase is for cleaning up your local work before it becomes shared history.',
        },
      ],
    },
    {
      id: 'branching-strategies',
      title: 'Branching Strategies',
      content: [
        {
          type: 'text',
          text: 'Your branching strategy defines how code flows from a developer\'s machine to production. There is no universally "right" answer — pick the one that fits your team size and release cadence.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🌊',
              title: 'GitFlow',
              description: 'main + develop + feature/* + release/* + hotfix/*. Great for versioned products with scheduled releases. More overhead for continuous delivery.',
              color: '#4f8ef7',
            },
            {
              icon: '🛣️',
              title: 'Trunk-Based Development',
              description: 'Everyone commits to main (or short-lived feature branches < 2 days). Requires feature flags. Ideal for CI/CD and high-velocity teams.',
              color: '#caf74f',
            },
            {
              icon: '🍴',
              title: 'GitHub Flow',
              description: 'main + feature branches + PRs. Simple and effective for most teams. Deploy from main after every merge.',
              color: '#a78bfa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'GitFlow in practice',
          code: `# Start a new feature
git checkout develop
git checkout -b feature/add-payment-gateway

# ... do work ...

# Merge back to develop (via PR)
git checkout develop
git merge --no-ff feature/add-payment-gateway

# Create release branch
git checkout -b release/1.3.0
# bump version, final fixes only

# Merge to main and tag
git checkout main
git merge --no-ff release/1.3.0
git tag -a v1.3.0 -m "Release 1.3.0"

# Merge back to develop
git checkout develop
git merge --no-ff release/1.3.0`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'For most .NET APIs and microservices, GitHub Flow (main + short-lived feature branches) hits the sweet spot of simplicity and safety. Use GitFlow only if you maintain multiple live versions simultaneously.',
        },
      ],
    },
    {
      id: 'semantic-versioning',
      title: 'Semantic Versioning (SemVer)',
      content: [
        {
          type: 'text',
          text: 'SemVer is the lingua franca of software versioning. A version number has three parts: MAJOR.MINOR.PATCH. Each part carries a specific meaning that tells consumers exactly what changed.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💥', title: 'MAJOR (x.0.0)', description: 'Breaking changes. API consumers must update their code. Resets MINOR and PATCH to 0.', color: '#f74f4f' },
            { icon: '✨', title: 'MINOR (0.x.0)', description: 'New features, backward-compatible. Existing consumers are unaffected. Resets PATCH to 0.', color: '#caf74f' },
            { icon: '🩹', title: 'PATCH (0.0.x)', description: 'Bug fixes, backward-compatible. Safe to upgrade without reading changelogs.', color: '#4f8ef7' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'SemVer examples',
          code: `# 1.2.3 → 1.2.4   Bug fix in payment processing
# 1.2.3 → 1.3.0   Added new /orders/export endpoint
# 1.2.3 → 2.0.0   Renamed DTO fields, changed auth scheme

# Pre-release versions (don't use in prod)
1.0.0-alpha.1
1.0.0-beta.2
1.0.0-rc.1

# Build metadata (ignored in precedence)
1.0.0+20240115.sha.5114f85`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Start at 0.x.x while your public API is still forming — anything before 1.0.0 is considered unstable and breaking changes are allowed without a MAJOR bump.',
        },
      ],
    },
    {
      id: 'conventional-commits',
      title: 'Conventional Commits',
      content: [
        {
          type: 'text',
          text: 'Conventional Commits is a specification that gives your commit messages a lightweight, machine-readable structure. The payoff: automated changelogs, automated version bumping, and a history that reads like documentation.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Conventional Commit format',
          code: `# Format:
# <type>(<optional scope>): <description>
# <blank line>
# <optional body>
# <optional footer>

# Examples:
feat(auth): add refresh token rotation
fix(orders): prevent duplicate charge on retry
docs(readme): add deployment instructions
chore(deps): upgrade EF Core to 9.0.1
refactor(payment): extract IPaymentGateway interface
test(orders): add integration tests for cancellation flow
perf(queries): add index on Orders.CreatedAt

# Breaking change (triggers MAJOR bump):
feat(api)!: rename UserId to AccountId in all DTOs

# Or with footer:
feat(api): rename UserId to AccountId

BREAKING CHANGE: All API consumers must update field references from UserId to AccountId.`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✨', title: 'feat', description: 'New feature for the user. Triggers a MINOR version bump in SemVer.', color: '#caf74f' },
            { icon: '🩹', title: 'fix', description: 'Bug fix for the user. Triggers a PATCH version bump.', color: '#4f8ef7' },
            { icon: '💥', title: 'feat! / BREAKING CHANGE', description: 'Introduces a breaking change. Triggers a MAJOR version bump regardless of type.', color: '#f74f4f' },
            { icon: '🔧', title: 'chore / refactor / test / docs', description: 'No version bump. Infrastructure, code quality, or documentation changes only.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use `commitlint` + `husky` to enforce Conventional Commits at the git hook level. This prevents malformed commits from ever entering your repo.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup commitlint + husky',
          code: `npm install --save-dev @commitlint/cli @commitlint/config-conventional husky

# Initialize husky
npx husky init

# Add commit-msg hook
echo "npx --no -- commitlint --edit \$1" > .husky/commit-msg

# Add commitlint config
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.mjs`,
        },
      ],
    },
    {
      id: 'dotnet-versioning',
      title: '.NET & NuGet Versioning',
      content: [
        {
          type: 'text',
          text: '.NET projects expose three different version numbers in your `.csproj`, each serving a different audience: the CLR, the file system, and the NuGet registry.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '🔢',
              title: 'AssemblyVersion',
              description: 'CLR binary compatibility version. Change ONLY on breaking API changes. Used by the runtime to load the correct assembly. Format: MAJOR.MINOR.0.0',
              color: '#f74f4f',
            },
            {
              icon: '📁',
              title: 'AssemblyFileVersion',
              description: 'File system version shown in Windows Explorer. Safe to bump on every build. Format: MAJOR.MINOR.PATCH.BUILD',
              color: '#f7a24f',
            },
            {
              icon: '📦',
              title: 'Version (PackageVersion)',
              description: 'The NuGet package version — what consumers see on NuGet.org and reference in their projects. Should follow SemVer strictly.',
              color: '#caf74f',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Versioning in .csproj',
          code: `<PropertyGroup>
  <!-- NuGet package version (SemVer) -->
  <Version>2.1.0</Version>

  <!-- CLR binary compatibility — change only on breaking changes -->
  <AssemblyVersion>2.0.0.0</AssemblyVersion>

  <!-- File version — safe to bump every build -->
  <AssemblyFileVersion>2.1.0.0</AssemblyFileVersion>

  <!-- Human-readable, can include git sha or build number -->
  <InformationalVersion>2.1.0+sha.a3f2c1b</InformationalVersion>
</PropertyGroup>`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Automated Versioning with GitVersion',
        },
        {
          type: 'text',
          text: 'GitVersion reads your git history and tag strategy to automatically calculate the correct SemVer version at build time — no manual `.csproj` edits needed.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'GitVersion setup',
          code: `# Install GitVersion tool
dotnet tool install --global GitVersion.Tool

# Show what version would be calculated
dotnet-gitversion /showvariable SemVer

# Use in GitHub Actions
- name: Determine version
  uses: gittools/actions/gitversion/execute@v1

- name: Build
  run: dotnet build -p:Version=\${{ env.GitVersion_SemVer }}`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Versioning in GitHub Actions (simple approach)',
        },
        {
          type: 'code',
          language: 'yaml',
          label: '.github/workflows/release.yml',
          code: `name: Release

on:
  push:
    tags:
      - 'v*.*.*'

jobs:
  publish:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Extract version from tag
        id: version
        run: echo "VERSION=\${GITHUB_REF_NAME#v}" >> $GITHUB_OUTPUT

      - name: Build & pack
        run: |
          dotnet build -c Release -p:Version=\${{ steps.version.outputs.VERSION }}
          dotnet pack -c Release -p:Version=\${{ steps.version.outputs.VERSION }} --no-build

      - name: Push to NuGet
        run: dotnet nuget push "**/*.nupkg" --api-key \${{ secrets.NUGET_API_KEY }} --source https://api.nuget.org/v3/index.json`,
        },
      ],
    },
    {
      id: 'git-tags-releases',
      title: 'Tags & GitHub Releases',
      content: [
        {
          type: 'text',
          text: 'Git tags are the anchor points in your version history. A tag on a commit means "this is version 1.3.0" — pinning a specific state of the codebase that can always be rebuilt identically.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Tagging a release',
          code: `# Create an annotated tag (preferred — includes message and tagger info)
git tag -a v1.3.0 -m "Release 1.3.0 — adds payment retry logic"

# Push the tag to remote
git push origin v1.3.0

# Push all local tags at once
git push origin --tags

# List all tags (sorted by version)
git tag --sort=-version:refname

# Delete a tag locally and remotely (if you made a mistake)
git tag -d v1.3.0
git push origin :refs/tags/v1.3.0`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Always use annotated tags (`-a`) for releases — they store the tagger, date, and message. Lightweight tags are just pointers and carry no metadata.',
        },
        {
          type: 'code',
          language: 'yaml',
          label: 'Auto-generate GitHub Release from tag',
          code: `name: Create Release

on:
  push:
    tags: ['v*.*.*']

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate changelog
        id: changelog
        uses: orhun/git-cliff-action@v3
        with:
          args: --latest --strip header

      - name: Create GitHub Release
        uses: softprops/action-gh-release@v2
        with:
          body: \${{ steps.changelog.outputs.content }}`,
        },
      ],
    },
    {
      id: 'changelog',
      title: 'Changelogs',
      content: [
        {
          type: 'text',
          text: 'A changelog is a curated, human-readable summary of what changed between versions. It is the first thing a developer reads when deciding whether to upgrade. Automate it — never write it by hand.',
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'If you followed Conventional Commits, tools like `git-cliff`, `release-please`, or `semantic-release` can generate your entire CHANGELOG.md automatically at release time.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'CHANGELOG.md structure',
          code: `# Changelog

## [2.1.0] - 2025-04-12

### Features
- **auth**: add refresh token rotation (#142)
- **orders**: add CSV export endpoint (#138)

### Bug Fixes
- **payment**: prevent duplicate charge on network retry (#144)
- **orders**: fix timezone offset in delivery estimates (#140)

## [2.0.0] - 2025-03-01

### ⚠ BREAKING CHANGES
- **api**: renamed \`UserId\` to \`AccountId\` in all DTOs

### Features
- **auth**: migrate to OAuth2 + PKCE`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'git-cliff setup',
          code: `# Install git-cliff
cargo install git-cliff
# or via npm
npm install --save-dev git-cliff

# Generate changelog for current version
git cliff --latest -o CHANGELOG.md

# Generate full changelog from the beginning
git cliff --unreleased -o CHANGELOG.md

# Prepend new version to existing changelog
git cliff --tag v2.1.0 --prepend CHANGELOG.md`,
        },
      ],
    },
  ],
};