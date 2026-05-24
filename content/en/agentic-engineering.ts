import type { Topic, QuizQuestion } from "@/types";

export const agenticQuiz: QuizQuestion[] = [
  {
    id: "ag1",
    question: "What is the key difference between a traditional chatbot and an AI agent?",
    options: [
      "Agents are faster at generating text",
      "Agents can take actions, use tools, and execute multi-step tasks autonomously — not just respond to a prompt",
      "Agents only work with Python",
      "Agents require internet while chatbots work offline",
    ],
    correct: 1,
    explanation: "A chatbot responds to a single prompt. An agent acts: it can read files, run commands, call APIs, and execute workflows.",
  },
  {
    id: "ag2",
    question: "What does MCP (Model Context Protocol) do?",
    options: [
      "It is a new .NET runtime for running AI models locally",
      "It is a standard that lets AI agents connect to external tools in a structured way",
      "It replaces REST APIs with AI-generated endpoints",
      "It is a Microsoft standard for prompt formatting",
    ],
    correct: 1,
    explanation: "MCP is an open standard (by Anthropic) that defines how AI models connect to external tools. Think of it as USB-C for AI: one universal interface, many compatible tools.",
  },
  {
    id: "ag3",
    question: "What makes an AI agent more effective for complex tasks?",
    options: [
      "Paste all your code and say fix this",
      "Give the agent context: what the code does, what the goal is, what constraints apply",
      "Let it generate everything and accept all changes",
      "Only use it for simple one-file tasks",
    ],
    correct: 1,
    explanation: "Agents perform best with clear context. Specify the goal, constraints, and acceptance criteria. Vague instructions produce vague results.",
  },
  {
    id: "ag4",
    question: "What is Semantic Kernel?",
    options: [
      "A new EF Core provider for vector databases",
      "A Microsoft SDK for building AI-powered applications in .NET with LLMs as a first-class component",
      "A NuGet package for running local AI models only",
      "A Visual Studio extension for code completion",
    ],
    correct: 1,
    explanation: "Semantic Kernel is Microsoft''s SDK for integrating LLMs into .NET apps. It provides plugins, memory storage, and workflow orchestration.",
  },
  {
    id: "ag5",
    question: "Why should you review AI-generated code before merging?",
    options: [
      "AI models never make mistakes — merge immediately",
      "Only use AI for comments and documentation",
      "AI code should be treated like any other code: reviewed, tested, and understood before merging",
      "Run it in staging for 30 days before merging",
    ],
    correct: 2,
    explanation: "AI-generated code can be subtly wrong or miss edge cases. Your test suite is your safety net. Review like you would a junior developer''s PR.",
  },
];

export const agenticTopic: Topic = {
  slug: "agentic-engineering",
  title: "Agentic Engineering",
  description: "Leverage AI agents to automate your development workflow and build smarter .NET applications.",
  icon: "🤖",
  status: "available",
  color: "#a78bfa",
  sections: [
    {
      id: "what-is-agentic",
      title: "What is Agentic Engineering?",
      content: [
        {
          type: "text",
          text: "Agentic Engineering is using AI agents to execute tasks on your behalf — giving AI the context and tools to handle multi-step workflows. An agent can read your codebase, understand it, make changes, run tests, and even open a PR.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "💬", title: "Chatbot", description: "You ask a question, it gives one response. You do the rest manually.", color: "#f74f4f" },
            { icon: "🤖", title: "Agent", description: "You give a goal. It plans, executes steps, self-corrects, and delivers a result.", color: "#a78bfa" },
          ],
        },
        {
          type: "text",
          text: "The bottleneck in software is rarely thinking — it is executing well-understood work. Agents handle execution. You handle judgment.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "🔍", title: "Read & understand", description: "Explore codebases, explain patterns, trace bugs across files.", color: "#a78bfa" },
            { icon: "✏️", title: "Write & refactor", description: "Generate code, extract interfaces, rename consistently, apply patterns.", color: "#4f8ef7" },
            { icon: "🧪", title: "Test & validate", description: "Generate tests, run them, interpret failures, fix code.", color: "#00d4aa" },
            { icon: "📋", title: "Document", description: "Write XML docs, READMEs, and PR descriptions from code context.", color: "#f7a24f" },
          ],
        },
      ],
    },
    {
      id: "tools-landscape",
      title: "AI Tools for Developers",
      content: [
        {
          type: "text",
          text: "Different tools excel at different tasks. Pick one that fits your workflow and go deep.",
        },
        {
          type: "concept-grid",
          items: [
            {
              icon: "⚡",
              title: "Claude Code",
              description: "Agentic tool from Anthropic. Runs in your terminal with full access to your codebase. Use Claude Skills for context.",
              color: "#a78bfa",
            },
            {
              icon: "🐙",
              title: "GitHub Copilot",
              description: "IDE-integrated AI pair programmer. Great for inline suggestions and explaining selected code.",
              color: "#4f8ef7",
            },
            {
              icon: "🖱️",
              title: "Cursor",
              description: "VS Code fork with deep AI integration. Composer mode describes multi-file changes in natural language.",
              color: "#00d4aa",
            },
          ],
        },
        {
          type: "callout",
          variant: "tip",
          text: "Start with one tool. Claude Code and Cursor offer the highest-leverage workflows for .NET developers.",
        },
      ],
    },
    {
      id: "mcp",
      title: "Model Context Protocol (MCP)",
      content: [
        {
          type: "text",
          text: "MCP (Model Context Protocol) is an open standard that defines how models connect to external tools and expose discoverable skills. Use MCP to publish well-documented actions (skills) that agents can call safely and predictably.",
        },
        {
          type: "callout",
          variant: "info",
          text: "Expose functionality as Skills (for example, Claude Skills) so agents can discover and invoke tools with clear inputs, outputs, and safety boundaries.",
        },
      ],
    },
    {
      id: "high-value-workflows",
      title: "High-Impact Workflows",
      content: [
        {
          type: "text",
          text: "These are tasks where agents provide the most value: tedious, mechanical, and well-defined.",
        },
        {
          type: "heading",
          level: 3,
          text: "Test Generation",
        },
        {
          type: "text",
          text: "Give the agent a service class: Generate a complete xUnit test suite covering happy path, null validation, and error cases. The agent writes tests. You run them. 3x coverage speed.",
        },
        {
          type: "heading",
          level: 3,
          text: "Codebase Onboarding",
        },
        {
          type: "text",
          text: "New to a project? Ask the agent: Explain how a new order flows through this system from HTTP request to database write. 10 minutes beats 2 hours of reading.",
        },
        {
          type: "heading",
          level: 3,
          text: "Refactoring",
        },
        {
          type: "text",
          text: "Ask the agent to refactor consistently, extract responsibilities, or modernize patterns. Provide constraints: Keep public signatures unchanged.",
        },
        {
          type: "heading",
          level: 3,
          text: "Documentation",
        },
        {
          type: "text",
          text: "Generate XML docs, README sections, or ADRs from your code. The agent understands context and writes meaningful documentation.",
        },
        {
          type: "callout",
          variant: "tip",
          text: "Strong prompts are specific: goal, constraints, and done criteria. Refactor this is weak. Refactor OrderService.cs using Result<T>, keeping public API unchanged, run tests when done is strong.",
        },
      ],
    },
    {
      id: "safe-practices",
      title: "Safe & Effective Practices",
      content: [
        {
          type: "heading",
          level: 3,
          text: "Always Review Before Merging",
        },
        {
          type: "text",
          text: "AI-generated code can be subtly wrong: miss an edge case, use deprecated APIs, or have security issues. Your test suite is your safety net. Code review is the second line of defense.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "✅", title: "Do: verify with tests", description: "Run your full test suite on every AI change.", color: "#00d4aa" },
            { icon: "✅", title: "Do: review the diff", description: "Read every change. Understand before merging.", color: "#00d4aa" },
            { icon: "❌", title: "Do not: trust blindly", description: "Agents are confident even when wrong.", color: "#f74f4f" },
            { icon: "❌", title: "Do not: expose secrets", description: "Never paste API keys or passwords in prompts.", color: "#f74f4f" },
          ],
        },
        {
          type: "heading",
          level: 3,
          text: "Prompt Engineering Basics",
        },
        {
          type: "list",
          items: [
            "Context: What is the code doing? What constraints exist?",
            "Goal: What specific outcome do you want?",
            "Constraints: What must not change? What patterns to follow?",
          ],
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
      id: "semantic-kernel",
      title: "Building AI-Powered Apps with Semantic Kernel",
      content: [
        {
          type: "text",
          text: "Semantic Kernel is Microsoft''s SDK for building AI-powered applications in .NET. Use LLMs as a first-class component with plugins and workflow orchestration.",
        },
        {
          type: "heading",
          level: 3,
          text: "Create a Plugin (Tool)",
        },
        {
          type: "text",
          text: "Plugins are C# classes with methods the agent can call. Describe each method clearly — descriptions tell the agent when to use the tool.",
        },
        {
          type: "callout",
          variant: "info",
          text: "Write [Description] attributes like documentation for a new teammate. Quality of descriptions directly affects how well the agent uses your tools.",
        },
      ],
    },
    {
      id: "microsoftext-ai",
      title: "Microsoft.Extensions.AI",
      content: [
        {
          type: "text",
          text: "Microsoft.Extensions.AI is a set of abstractions that standardizes how .NET apps interact with AI services. Write your app once, swap backends (OpenAI, Azure, Anthropic) without changing code.",
        },
        {
          type: "concept-grid",
          items: [
            { icon: "🔄", title: "Provider-agnostic", description: "IChatClient works with OpenAI, Azure, Anthropic, Ollama, and more.", color: "#a78bfa" },
            { icon: "🧩", title: "Middleware pipeline", description: "Add logging, caching, retry, rate-limiting as middleware.", color: "#4f8ef7" },
            { icon: "🧪", title: "Testable", description: "Mock IChatClient in tests without hitting the actual API.", color: "#00d4aa" },
          ],
        },
      ],
    },
    {
      id: "anthropic-sdk",
      title: "Using the Anthropic .NET SDK",
      content: [
        {
          type: "text",
          text: "For direct Claude API access from .NET, use the Anthropic SDK. Best when you need fine-grained control over model parameters or building your own agent loop.",
        },
        {
          type: "callout",
          variant: "tip",
          text: "Use Semantic Kernel for a batteries-included agent framework. Use Anthropic SDK directly for minimal abstraction and full control.",
        },
      ],
    },
  ],
};

