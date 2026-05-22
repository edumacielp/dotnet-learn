import type { Topic, QuizQuestion } from '@/types';

export const agenticQuiz: QuizQuestion[] = [
  {
    id: 'ag1',
    question: 'What is the key difference between a traditional AI chatbot and an AI agent?',
    options: [
      'Agents are faster at generating text responses',
      'Agents can take actions, use tools, and operate autonomously across multi-step tasks — not just respond to a single prompt',
      'Agents only work with Python, not .NET',
      'Agents require internet access while chatbots work offline',
    ],
    correct: 1,
    explanation: 'A chatbot responds. An agent acts. Agents have access to tools (file system, terminal, APIs, databases) and can plan and execute multi-step workflows autonomously — like running tests after refactoring code, or opening a PR after making changes.',
  },
  {
    id: 'ag2',
    question: 'What does MCP (Model Context Protocol) do?',
    options: [
      'It is a new .NET runtime for running AI models locally',
      'It is a standard protocol that lets AI models connect to external tools and data sources in a structured way',
      'It replaces REST APIs with AI-generated endpoints',
      'It is a Microsoft standard for prompt formatting',
    ],
    correct: 1,
    explanation: 'MCP is an open standard (by Anthropic) that defines how AI models connect to external tools — file systems, databases, APIs, git, browsers. Think of it as USB-C for AI: one standard interface, many compatible tools.',
  },
  {
    id: 'ag3',
    question: 'Which of these is the most effective way to use Claude Code or GitHub Copilot for a complex refactoring task?',
    options: [
      'Paste all your code and say "refactor this"',
      'Give the agent full context: what the code does, what the goal is, what constraints apply, and what "done" looks like',
      'Let it generate everything and accept all changes without reviewing',
      'Only use it for new files — never for existing code',
    ],
    correct: 1,
    explanation: 'Agents perform best with clear context. Specify the goal, the constraints (e.g. "don\'t change the public API"), and the acceptance criteria. Vague instructions produce vague results — agents aren\'t mind readers.',
  },
  {
    id: 'ag4',
    question: 'What is Semantic Kernel in the .NET ecosystem?',
    options: [
      'A new EF Core provider for vector databases',
      'A Microsoft SDK for building AI-powered applications and agents in .NET using LLMs as a first-class component',
      'A NuGet package for running local AI models only',
      'A Visual Studio extension for code completion',
    ],
    correct: 1,
    explanation: 'Semantic Kernel is Microsoft\'s open-source SDK for integrating LLMs into .NET apps. It provides abstractions for AI services, memory (vector stores), plugins (tools the agent can call), and orchestration of multi-step AI workflows.',
  },
  {
    id: 'ag5',
    question: 'Which practice makes AI-generated code safer to merge into a production codebase?',
    options: [
      'Always merge immediately — AI models don\'t make mistakes',
      'Only use AI for comments and documentation',
      'Treat AI output like any other code: review it, run tests against it, and understand what it does before merging',
      'Run it only in staging for 30 days before merging',
    ],
    correct: 2,
    explanation: 'AI-generated code can be subtly wrong, insecure, or miss edge cases. Your existing test suite is your safety net. Code review AI output the same way you\'d review a junior developer\'s PR — with curiosity, not blind trust.',
  },
];

export const agenticTopic: Topic = {
  slug: 'agentic-engineering',
  title: 'Agentic Engineering',
  description: 'Leverage AI agents to automate and enhance your .NET development workflow.',
  icon: '🤖',
  status: 'available',
  color: '#a78bfa',
  sections: [
    {
      id: 'what-is-agentic',
      title: 'What is Agentic Engineering?',
      content: [
        {
          type: 'text',
          text: 'Agentic engineering is the practice of working alongside AI agents — not just using AI to autocomplete a line of code, but giving AI the context, tools, and authority to execute multi-step tasks on your behalf. Think: "refactor this service, run the tests, fix the failures, and open a PR."',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💬', title: 'Chatbot (old model)', description: 'You ask. It responds. One turn. You copy-paste the output and do the rest manually.', color: '#f74f4f' },
            { icon: '🤖', title: 'Agent (new model)', description: 'You give a goal. It plans, uses tools, executes steps, self-corrects, and delivers a result.', color: '#a78bfa' },
          ],
        },
        {
          type: 'text',
          text: 'The shift matters because the bottleneck in software development is rarely thinking — it\'s the mechanical execution of well-understood work. Agents handle execution. You handle judgment.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔍', title: 'Read & understand code', description: 'Navigate large codebases, explain unfamiliar patterns, trace bugs across multiple files.', color: '#a78bfa' },
            { icon: '✏️', title: 'Write & refactor', description: 'Generate boilerplate, extract interfaces, rename consistently across the codebase, apply patterns.', color: '#4f8ef7' },
            { icon: '🧪', title: 'Test & validate', description: 'Generate unit tests, run them, interpret failures, fix the code, repeat.', color: '#00d4aa' },
            { icon: '📋', title: 'Document & review', description: 'Write XML docs, README files, ADRs, changelogs, and PR descriptions from code context.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'tools-landscape',
      title: 'The Tools You Should Know',
      content: [
        {
          type: 'text',
          text: 'The agentic tooling landscape moves fast. Here are the tools that matter most for .NET developers right now — what they do and when to reach for each one.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '⚡',
              title: 'Claude Code',
              description: 'Anthropic\'s agentic coding tool. Runs in your terminal with full access to your codebase, git, and shell. Best for large refactors, multi-file tasks, and agentic workflows.',
              color: '#a78bfa',
            },
            {
              icon: '🐙',
              title: 'GitHub Copilot',
              description: 'IDE-integrated AI pair programmer. Excellent for inline completions, explaining selected code, generating tests for the current file, and asking questions about your repo.',
              color: '#4f8ef7',
            },
            {
              icon: '🖱️',
              title: 'Cursor',
              description: 'VS Code fork with deep AI integration. Composer mode lets you describe multi-file changes in natural language. Strong for greenfield features and large-scale edits.',
              color: '#00d4aa',
            },
            {
              icon: '🔌',
              title: 'MCP Servers',
              description: 'Plugins that give AI agents structured access to external tools: databases, APIs, git, browsers, file systems. The standard interface between agents and the world.',
              color: '#f7a24f',
            },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Don\'t try to use all tools at once. Pick one agentic tool and go deep. Claude Code or Cursor are the highest-leverage starting points for .NET developers who want true agentic workflows.',
        },
      ],
    },
    {
      id: 'mcp',
      title: 'MCP — How Agents Connect to the World',
      content: [
        {
          type: 'text',
          text: 'MCP (Model Context Protocol) is the open standard that defines how AI models connect to external tools and data sources. Instead of every AI tool building custom integrations, MCP provides one universal interface — like USB-C for AI.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🗄️', title: 'Database MCP', description: 'Let the agent query your SQL Server or Postgres directly. Ask "what are the top 10 slowest queries?" and get a real answer.', color: '#4f8ef7' },
            { icon: '📁', title: 'Filesystem MCP', description: 'Read, write, and navigate files. The agent can open any file in your project, not just what\'s in the context window.', color: '#00d4aa' },
            { icon: '🌿', title: 'Git MCP', description: 'Read commits, diffs, and blame. The agent can understand what changed and why, not just the current state of the code.', color: '#a78bfa' },
            { icon: '🌐', title: 'Browser MCP', description: 'Navigate web pages, scrape docs, fill forms. Useful for agents that need to interact with web-based tools or documentation.', color: '#f7a24f' },
          ],
        },
        {
          type: 'code',
          language: 'json',
          label: 'claude_desktop_config.json — Adding MCP servers to Claude',
          code: `{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/your/project"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_PERSONAL_ACCESS_TOKEN": "your-token"
      }
    },
    "postgres": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-postgres", "postgresql://localhost/mydb"]
    }
  }
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'MCP servers run as local processes. The AI model sends structured requests; the server executes them and returns results. Your data stays local — nothing is sent to the cloud unless the server explicitly does so.',
        },
      ],
    },
    {
      id: 'dotnet-workflows',
      title: 'High-Value Workflows for .NET Developers',
      content: [
        {
          type: 'text',
          text: 'Not all AI usage is equal. These are the workflows where agents provide the highest return on investment for .NET developers — tasks that are tedious, mechanical, and well-defined.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Test Generation',
        },
        {
          type: 'text',
          text: 'Give the agent a service class and ask it to generate a full suite of xUnit tests — happy path, edge cases, and error cases. Then run them. Fix what fails. This alone can 3x your test coverage speed.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Prompt pattern for test generation',
          code: `# In Claude Code / Cursor:

"Generate a complete xUnit test suite for OrderService.cs.
Use NSubstitute for mocking. Cover:
- Happy path for each public method
- Null argument validation (ArgumentNullException)
- Business rule violations (e.g. cancelling an already-shipped order)
- Repository failure scenarios

The existing tests in OrderServiceTests.cs show the naming and 
arrangement style — follow the same pattern."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Codebase Onboarding',
        },
        {
          type: 'text',
          text: 'Starting on a new project or returning to old code? Give the agent access to the full codebase and ask it to explain the architecture, data flow, and key design decisions. 10 minutes with an agent beats 2 hours of reading.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Onboarding prompts',
          code: `"Explain how a new order flows through this system from the 
HTTP request to the database write. Include which services are 
involved, what validations happen, and where business logic lives."

"What are the main architectural patterns used in this codebase? 
Are there any patterns that seem inconsistent or outdated?"

"Where is authentication and authorization handled? 
Trace the flow from the JWT token to the final permission check."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Refactoring & Modernization',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Refactoring prompt patterns',
          code: `"Refactor PaymentService.cs to use the Result<T, Error> pattern
instead of throwing exceptions for expected business failures.
Keep the public method signatures identical — this is a 
pure internal refactor. Run the existing tests when done."

"Find all places where we're doing synchronous I/O in async 
methods (e.g. .Result or .Wait()) and fix them. Start with 
the Infrastructure layer."

"This service has 3 responsibilities. Extract them into 
separate classes following SRP. Create an interface for each."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Documentation Generation',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Documentation prompts',
          code: `"Add XML documentation comments to all public methods in 
IOrderRepository.cs. Document the parameters, return values,
and any exceptions that callers should handle."

"Write a README section explaining how to run this project locally.
Include: prerequisites, environment setup, database migrations,
and how to run the tests."

"Generate an Architecture Decision Record (ADR) for our choice
to use Outbox Pattern for reliable event publishing. 
Include context, decision, consequences, and alternatives considered."`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The best prompts are specific about goal, context, and constraints. "Refactor this" is weak. "Refactor OrderService.cs to use Result<T> instead of exceptions, keeping the public API unchanged" is strong.',
        },
      ],
    },
    {
      id: 'semantic-kernel',
      title: 'Building Agents in .NET with Semantic Kernel',
      content: [
        {
          type: 'text',
          text: 'Semantic Kernel is Microsoft\'s open-source SDK for building AI-powered applications in .NET. It lets you use LLMs as a first-class component — with plugins (tools the agent can call), memory (vector stores), and orchestration built in.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Install Semantic Kernel',
          code: `dotnet add package Microsoft.SemanticKernel
dotnet add package Microsoft.SemanticKernel.Connectors.OpenAI`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Basic Semantic Kernel setup',
          code: `using Microsoft.SemanticKernel;
using Microsoft.SemanticKernel.ChatCompletion;

var builder = Kernel.CreateBuilder();

// Add Azure OpenAI or OpenAI
builder.AddAzureOpenAIChatCompletion(
    deploymentName: "gpt-4o",
    endpoint: builder.Configuration["AzureOpenAI:Endpoint"]!,
    apiKey: builder.Configuration["AzureOpenAI:ApiKey"]!
);

// Register custom plugins (tools the agent can call)
builder.Plugins.AddFromType<OrderPlugin>();
builder.Plugins.AddFromType<InventoryPlugin>();

var kernel = builder.Build();

// Ask the agent to complete a task using available tools
var result = await kernel.InvokePromptAsync(
    "Check inventory for product SKU-123 and create a restock order if below 10 units."
);

Console.WriteLine(result);`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Creating a Plugin (Tool)',
        },
        {
          type: 'text',
          text: 'Plugins are C# classes with methods the agent can call. Decorate them with `[KernelFunction]` and describe them clearly — the description is what the agent reads to decide when to use the tool.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Semantic Kernel plugin example',
          code: `public class OrderPlugin(IOrderRepository orders)
{
    [KernelFunction("get_order")]
    [Description("Retrieves an order by ID. Returns order details including status, items, and total.")]
    public async Task<OrderDto?> GetOrderAsync(
        [Description("The unique order identifier")] Guid orderId)
    {
        var order = await orders.GetByIdAsync(orderId);
        return order is null ? null : new OrderDto(order);
    }

    [KernelFunction("cancel_order")]
    [Description("Cancels an order if it hasn't been shipped yet. Returns true if successful.")]
    public async Task<bool> CancelOrderAsync(
        [Description("The order ID to cancel")] Guid orderId,
        [Description("Reason for cancellation")] string reason)
    {
        return await orders.CancelAsync(orderId, reason);
    }
}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'The quality of your `[Description]` attributes directly affects how well the agent uses your tools. Write them like documentation for a new teammate — clear, specific, and honest about what the function does and when to use it.',
        },
      ],
    },
    {
      id: 'anthropic-sdk',
      title: 'Using the Anthropic SDK in .NET',
      content: [
        {
          type: 'text',
          text: 'For direct access to Claude\'s API from a .NET application, Anthropic provides a first-party SDK. It\'s the right choice when you need fine-grained control over model parameters, streaming, or when you want to build your own agent loop without a higher-level framework.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Install the Anthropic .NET SDK',
          code: `dotnet add package Anthropic.SDK`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Basic message + tool use with Anthropic SDK',
          code: `using Anthropic.SDK;
using Anthropic.SDK.Messaging;

var client = new AnthropicClient(apiKey: Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")!);

var messages = new List<Message>
{
    new Message(RoleType.User, "Summarize the failing tests in the attached build log."),
};

var response = await client.Messages.GetClaudeMessageAsync(
    new MessageParameters
    {
        Model = AnthropicModels.Claude37Sonnet,
        MaxTokens = 1024,
        Messages = messages,
        System = new List<SystemMessage>
        {
            new SystemMessage("You are a senior .NET engineer reviewing CI build results. Be concise and actionable.")
        }
    }
);

Console.WriteLine(response.Content[0].Text);`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use Semantic Kernel when you want a batteries-included agent framework with memory, planners, and plugin orchestration. Use the Anthropic SDK directly when you want minimal abstraction and full control over the model interaction.',
        },
      ],
    },
    {
      id: 'microsoft-extensions-ai',
      title: 'Microsoft.Extensions.AI',
      content: [
        {
          type: 'text',
          text: '`Microsoft.Extensions.AI` (MEAI) is a new set of core abstractions in the .NET ecosystem that standardizes how apps interact with AI services — similar to how `Microsoft.Extensions.Logging` abstracts logging providers. Write your app once, swap the AI backend without changing code.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Install MEAI packages',
          code: `# Core abstractions
dotnet add package Microsoft.Extensions.AI

# Provider implementations
dotnet add package Microsoft.Extensions.AI.OpenAI       # OpenAI + Azure OpenAI
dotnet add package Microsoft.Extensions.AI.Anthropic    # Claude`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'MEAI — provider-agnostic chat',
          code: `using Microsoft.Extensions.AI;

// Register via DI — swap provider by changing this line
builder.Services.AddChatClient(
    new OpenAIClient(config["OpenAI:ApiKey"]!)
        .AsChatClient(modelId: "gpt-4o")
);

// Use it anywhere via IChatClient — no provider lock-in
public class SupportService(IChatClient ai)
{
    public async Task<string> ClassifyTicketAsync(string ticketText)
    {
        var response = await ai.CompleteAsync(
            $"Classify this support ticket into one category " +
            $"(Billing, Technical, Account, Other):\n\n{ticketText}"
        );
        return response.Message.Text ?? "Other";
    }
}`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔄', title: 'Provider-agnostic', description: 'IChatClient works with OpenAI, Azure OpenAI, Anthropic, Ollama, and more. Switch backends with one config change.', color: '#a78bfa' },
            { icon: '🧩', title: 'Middleware pipeline', description: 'Add logging, caching, retry, and rate-limiting as middleware — the same pattern as ASP.NET Core middleware.', color: '#4f8ef7' },
            { icon: '🧪', title: 'Testable', description: 'Inject IChatClient like any other dependency. Mock it in unit tests without hitting the actual API.', color: '#00d4aa' },
          ],
        },
      ],
    },
    {
      id: 'safe-ai-practices',
      title: 'Safe & Effective AI Practices',
      content: [
        {
          type: 'text',
          text: 'Using agents effectively is a skill. These principles separate developers who get 10x value from AI from those who get frustrated and give up.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Always Review Before Merging',
        },
        {
          type: 'text',
          text: 'AI-generated code can be subtly wrong — correct-looking code that misses an edge case, uses a deprecated API, or introduces a security issue. Your test suite is your first line of defense. Code review is the second. Never disable either for AI-generated code.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '✅', title: 'Do: verify with tests', description: 'Run your full test suite on every AI-generated change. If you don\'t have tests for the area being changed, write them first.', color: '#00d4aa' },
            { icon: '✅', title: 'Do: review the diff', description: 'Read the changes like you\'d read any PR. Understand what the agent did and why before merging.', color: '#00d4aa' },
            { icon: '❌', title: 'Don\'t: trust blindly', description: 'Agents are confident even when wrong. "It looks right" is not sufficient — run it, test it, understand it.', color: '#f74f4f' },
            { icon: '❌', title: 'Don\'t: give unnecessary access', description: 'Grant agents only the permissions they need for the task. Don\'t give production database write access for a task that only needs to read.', color: '#f74f4f' },
          ],
        },
        {
          type: 'heading',
          level: 3,
          text: 'Keep Secrets Out of Prompts',
        },
        {
          type: 'callout',
          variant: 'danger',
          text: 'Never paste API keys, connection strings, passwords, or personal data into a prompt. Use placeholders like `<CONNECTION_STRING>` and populate them in code. Most AI providers store prompt history.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Prompt Engineering for Developers',
        },
        {
          type: 'text',
          text: 'Better prompts produce better results. The three things that matter most:',
        },
        {
          type: 'list',
          items: [
            'Context — what is the code doing, what is the surrounding system, what constraints exist',
            'Goal — what specific outcome do you want, expressed as a concrete deliverable',
            'Constraints — what must not change, what patterns to follow, what technologies are off-limits',
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Weak vs strong prompt',
          code: `# ❌ Weak — vague, no context, no constraints
"Improve this code"

# ✅ Strong — context, goal, constraints, style reference
"This is an ASP.NET Core 9 minimal API endpoint that handles 
order creation (see OrderEndpoints.cs). 

Goal: Add idempotency support using an Idempotency-Key header.
If the same key is seen twice within 24h, return the cached response.

Constraints:
- Use IDistributedCache (already registered in DI)
- Do not change the response shape
- Follow the existing pattern in PaymentEndpoints.cs for error handling
- Write a unit test for the duplicate key scenario"`,
        },
      ],
    },
    {
      id: 'agentic-cicd',
      title: 'Agents in Your CI/CD Pipeline',
      content: [
        {
          type: 'text',
          text: 'Beyond the IDE, AI agents can add value directly in your CI/CD pipeline — automating tasks that currently require human attention.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📝', title: 'PR descriptions', description: 'Auto-generate pull request descriptions from the diff. Summarize what changed, why, and what to review carefully.', color: '#a78bfa' },
            { icon: '🔍', title: 'AI code review', description: 'Run a lightweight AI review on every PR to catch common issues — security anti-patterns, missing null checks, inconsistent error handling.', color: '#4f8ef7' },
            { icon: '🔖', title: 'Changelog generation', description: 'Use git-cliff or an AI step to generate human-readable changelogs from commit history at release time.', color: '#caf74f' },
            { icon: '🧪', title: 'Flaky test analysis', description: 'When tests fail in CI, send the failure log to an AI step that summarizes root cause and suggests fixes.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'yaml',
          label: 'GitHub Actions — AI PR description step',
          code: `name: AI PR Summary

on:
  pull_request:
    types: [opened]

jobs:
  summarize:
    runs-on: ubuntu-latest
    permissions:
      pull-requests: write

    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Generate PR description
        env:
          ANTHROPIC_API_KEY: \${{ secrets.ANTHROPIC_API_KEY }}
          GH_TOKEN: \${{ secrets.GITHUB_TOKEN }}
        run: |
          DIFF=\$(git diff origin/main...HEAD --stat)
          DESCRIPTION=\$(curl -s https://api.anthropic.com/v1/messages \\
            -H "x-api-key: \$ANTHROPIC_API_KEY" \\
            -H "anthropic-version: 2023-06-01" \\
            -H "content-type: application/json" \\
            -d '{
              "model": "claude-sonnet-4-5",
              "max_tokens": 500,
              "messages": [{
                "role": "user",
                "content": "Write a concise PR description for these changes:\\n'"$DIFF"'"
              }]
            }' | jq -r '.content[0].text')

          gh pr edit \${{ github.event.pull_request.number }} \\
            --body "\$DESCRIPTION"`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'AI pipeline steps add latency and API cost to every run. Be selective — use them on PR open (not every push) and set reasonable token limits. Monitor cost in your Azure or Anthropic dashboard.',
        },
      ],
    },
  ],
};