import type { Topic, QuizQuestion } from '@/types';

export const azureQuiz: QuizQuestion[] = [
  {
    id: 'az1',
    question: 'Which Azure service is the simplest way to deploy a containerized .NET API without managing infrastructure?',
    options: [
      'Azure Virtual Machines',
      'Azure Kubernetes Service (AKS)',
      'Azure Container Apps',
      'Azure Service Fabric',
    ],
    correct: 2,
    explanation: 'Azure Container Apps is a serverless container platform built on top of Kubernetes. You deploy containers without thinking about nodes, pods, or cluster config. It auto-scales to zero and handles HTTPS, routing, and revisions out of the box.',
  },
  {
    id: 'az2',
    question: 'What is the correct way to store a database connection string in Azure for a production .NET app?',
    options: [
      'In appsettings.json and committed to git',
      'As a plain text environment variable in the App Service config',
      'In Azure Key Vault, referenced via a Managed Identity',
      'In a .env file deployed alongside the app',
    ],
    correct: 2,
    explanation: 'Key Vault + Managed Identity is the gold standard. Your app authenticates to Key Vault using its Azure identity (no credentials in code or config), and retrieves secrets at runtime. Nothing sensitive ever touches appsettings.json or environment variables you manually type.',
  },
  {
    id: 'az3',
    question: 'What does a Deployment Slot in Azure App Service let you do?',
    options: [
      'Schedule deployments for specific times',
      'Run a staging environment and swap it to production with zero downtime',
      'Deploy to multiple regions simultaneously',
      'Roll back to a previous Docker image',
    ],
    correct: 1,
    explanation: 'Deployment Slots give you a live staging environment (same App Service Plan, no extra cost on Standard+). You deploy to the staging slot, warm it up, test it, then "swap" — traffic switches instantly to the new version with zero downtime and easy rollback.',
  },
  {
    id: 'az4',
    question: 'Which Azure Monitor feature automatically detects exceptions, dependency failures, and slow requests in your .NET app?',
    options: [
      'Azure Advisor',
      'Application Insights',
      'Azure Monitor Metrics',
      'Log Analytics only',
    ],
    correct: 1,
    explanation: 'Application Insights provides full APM (Application Performance Monitoring) for .NET. The SDK auto-instruments HTTP requests, dependency calls, exceptions, and custom events. It feeds into Live Metrics, failure analysis, and smart alerts.',
  },
  {
    id: 'az5',
    question: 'In an Azure GitHub Actions deployment pipeline, what is the most secure way to authenticate to Azure?',
    options: [
      'Store the subscription ID and tenant ID as GitHub secrets',
      'Use a Service Principal client secret stored in GitHub secrets',
      'Use OpenID Connect (OIDC) with a federated identity — no secrets stored anywhere',
      'Hard-code credentials in the workflow YAML',
    ],
    correct: 2,
    explanation: 'OIDC federated identity is the modern approach. GitHub and Azure exchange short-lived tokens using a trust relationship — no client secrets to rotate, no credentials to leak. Use the `azure/login` action with `client-id`, `tenant-id`, and `subscription-id` (none of which are actually secret).',
  },
];

export const azureTopic: Topic = {
  slug: 'azure',
  title: 'Azure',
  description: 'Deploying, monitoring, and scaling .NET applications on Microsoft Azure the right way.',
  icon: '☁️',
  status: 'available',
  color: '#0078d4',
  sections: [
    {
      id: 'azure-overview',
      title: 'Azure for .NET Developers',
      content: [
        {
          type: 'text',
          text: 'Azure is Microsoft\'s cloud platform — and it\'s built with .NET as a first-class citizen. The SDKs are idiomatic, the tooling integrates with Visual Studio and the .NET CLI, and services like App Service, Container Apps, and Azure SQL are designed around the workflows .NET teams already use.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🚀', title: 'App Service', description: 'Fully managed PaaS for web apps and APIs. Deploy a .NET app with git push or GitHub Actions. No server management.', color: '#0078d4' },
            { icon: '📦', title: 'Container Apps', description: 'Serverless containers. Deploy Docker images with auto-scaling, zero-downtime revisions, and built-in HTTPS.', color: '#00d4aa' },
            { icon: '🗄️', title: 'Azure SQL', description: 'Managed SQL Server. Familiar T-SQL, EF Core support, automatic backups, and geo-redundancy.', color: '#4f8ef7' },
            { icon: '🔑', title: 'Key Vault', description: 'Centralized secrets, connection strings, and certificates. Integrate via Managed Identity — no credentials in code.', color: '#a78bfa' },
            { icon: '📊', title: 'Application Insights', description: 'Full APM: traces, exceptions, dependencies, custom events, live metrics, and smart alerts for .NET apps.', color: '#f7a24f' },
            { icon: '🏗️', title: 'Azure Container Registry', description: 'Private Docker registry. Store and manage your .NET container images securely, integrated with AKS and Container Apps.', color: '#caf74f' },
          ],
        },
      ],
    },
    {
      id: 'app-service',
      title: 'Azure App Service',
      content: [
        {
          type: 'text',
          text: 'App Service is the simplest path to getting a .NET web app or API live on Azure. You give it code (via git, ZIP, or container) and it handles the runtime, scaling, and OS updates.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Deploy via Azure CLI',
          code: `# Login to Azure
az login

# Create a resource group
az group create --name my-app-rg --location eastus

# Create App Service plan (B1 = basic, cheapest paid tier)
az appservice plan create \
  --name my-app-plan \
  --resource-group my-app-rg \
  --sku B1 \
  --is-linux

# Create the web app (runtime: dotnet 9)
az webapp create \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --plan my-app-plan \
  --runtime "DOTNETCORE:9.0"

# Deploy a ZIP package
dotnet publish -c Release -o ./publish
cd publish && zip -r ../deploy.zip .
az webapp deployment source config-zip \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --src ../deploy.zip`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Environment Variables & App Settings',
        },
        {
          type: 'text',
          text: 'App Service injects configuration as environment variables, which .NET reads through its standard configuration pipeline. Set them in the portal or via CLI — they override appsettings.json values.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setting app configuration',
          code: `# Set app settings (environment variables)
az webapp config appsettings set \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --settings \
    ASPNETCORE_ENVIRONMENT=Production \
    FeatureFlags__NewCheckout=true

# .NET reads these automatically via IConfiguration
# builder.Configuration["FeatureFlags:NewCheckout"]

# Set a connection string (shown as masked in portal)
az webapp config connection-string set \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --connection-string-type SQLAzure \
  --settings DefaultConnection="Server=..."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Deployment Slots — Zero-Downtime Deployments',
        },
        {
          type: 'text',
          text: 'Deployment Slots give you a live staging environment on the same App Service Plan. Deploy to staging, test it, then swap — production traffic switches instantly with zero downtime and one-click rollback.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Using deployment slots',
          code: `# Create a staging slot
az webapp deployment slot create \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --slot staging

# Deploy to staging
az webapp deployment source config-zip \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --slot staging \
  --src ./deploy.zip

# Swap staging → production (zero downtime)
az webapp deployment slot swap \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --slot staging \
  --target-slot production

# Rollback: swap back immediately
az webapp deployment slot swap \
  --name my-dotnet-api \
  --resource-group my-app-rg \
  --slot staging \
  --target-slot production`,
        },
      ],
    },
    {
      id: 'container-apps',
      title: 'Azure Container Apps',
      content: [
        {
          type: 'text',
          text: 'Container Apps is the sweet spot between App Service (easy but less flexible) and AKS (powerful but complex). It runs your Docker containers on a managed Kubernetes cluster — you never touch the cluster itself.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📉', title: 'Scale to zero', description: 'No traffic? No running instances. No cost. Scales back up automatically when requests arrive.', color: '#0078d4' },
            { icon: '🔄', title: 'Revisions', description: 'Every deployment creates a new revision. Split traffic between revisions for canary deployments or A/B tests.', color: '#00d4aa' },
            { icon: '🌐', title: 'Built-in HTTPS', description: 'Automatic TLS termination and a public HTTPS URL out of the box. No cert management needed.', color: '#4f8ef7' },
            { icon: '📨', title: 'DAPR ready', description: 'Native DAPR integration for service-to-service calls, pub/sub, and state management in microservice architectures.', color: '#a78bfa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Deploy a .NET container to Container Apps',
          code: `# Create Container Apps environment
az containerapp env create \
  --name my-env \
  --resource-group my-app-rg \
  --location eastus

# Deploy from Azure Container Registry
az containerapp create \
  --name my-api \
  --resource-group my-app-rg \
  --environment my-env \
  --image myregistry.azurecr.io/myapi:1.2.0 \
  --target-port 8080 \
  --ingress external \
  --min-replicas 0 \
  --max-replicas 10 \
  --cpu 0.5 --memory 1.0Gi

# Update to a new image version
az containerapp update \
  --name my-api \
  --resource-group my-app-rg \
  --image myregistry.azurecr.io/myapi:1.3.0`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use Container Apps for new microservices. Use App Service when you want the simplest possible deployment for a single .NET API and don\'t need containers.',
        },
      ],
    },
    {
      id: 'key-vault',
      title: 'Azure Key Vault + Managed Identity',
      content: [
        {
          type: 'text',
          text: 'Never store secrets — connection strings, API keys, certificates — in appsettings.json or environment variables you type by hand. Azure Key Vault + Managed Identity is the right pattern: your app authenticates to Key Vault using its Azure identity, not a password.',
        },
        {
          type: 'callout',
          variant: 'danger',
          text: 'If a secret is in appsettings.json and committed to git, it\'s compromised. Even in a private repo. Key Vault exists precisely so secrets never touch your source code or deployment pipeline.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup Key Vault + Managed Identity',
          code: `# Create Key Vault
az keyvault create \
  --name my-app-kv \
  --resource-group my-app-rg \
  --location eastus

# Add a secret
az keyvault secret set \
  --vault-name my-app-kv \
  --name "ConnectionStrings--Default" \
  --value "Server=myserver.database.windows.net;..."

# Enable system-assigned Managed Identity on App Service
az webapp identity assign \
  --name my-dotnet-api \
  --resource-group my-app-rg

# Grant the app identity access to Key Vault secrets
az keyvault set-policy \
  --name my-app-kv \
  --object-id <identity-principal-id> \
  --secret-permissions get list`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Read Key Vault in .NET (Program.cs)',
          code: `using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

// Add Key Vault to the configuration pipeline
// Uses Managed Identity in Azure, DefaultAzureCredential locally
var keyVaultUri = new Uri(builder.Configuration["KeyVaultUri"]!);
builder.Configuration.AddAzureKeyVault(keyVaultUri, new DefaultAzureCredential());

// Secrets are now available via IConfiguration
// builder.Configuration["ConnectionStrings:Default"]
// Same API as appsettings.json — no code changes needed`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: '`DefaultAzureCredential` tries multiple auth methods in order: Managed Identity → Visual Studio → Azure CLI → environment variables. In Azure it uses Managed Identity automatically. Locally it falls back to your `az login` credentials — no code changes between environments.',
        },
      ],
    },
    {
      id: 'azure-sql',
      title: 'Azure SQL',
      content: [
        {
          type: 'text',
          text: 'Azure SQL is managed SQL Server in the cloud. For .NET developers it\'s the most familiar option — EF Core works exactly the same, T-SQL is identical, and you get automatic backups, scaling, and high availability without managing a server.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Create Azure SQL via CLI',
          code: `# Create SQL server
az sql server create \
  --name my-sql-server \
  --resource-group my-app-rg \
  --location eastus \
  --admin-user sqladmin \
  --admin-password "YourStr0ngPass!"

# Create a database (serverless = auto-pause when idle)
az sql db create \
  --name MyAppDb \
  --server my-sql-server \
  --resource-group my-app-rg \
  --edition GeneralPurpose \
  --compute-model Serverless \
  --auto-pause-delay 60

# Allow Azure services to connect
az sql server firewall-rule create \
  --name AllowAzureServices \
  --server my-sql-server \
  --resource-group my-app-rg \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'EF Core Migrations in CI/CD',
        },
        {
          type: 'text',
          text: 'Running EF Core migrations in a deployment pipeline requires the migration to be applied before or during startup — never skipped. The safest pattern is to apply migrations at startup using code.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Auto-migrate at startup (Program.cs)',
          code: `// Apply pending migrations at app startup
// Safe for most apps — use with care on high-availability multi-instance deployments
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

// Or run as a separate step in your pipeline:
dotnet ef database update \
  --connection "Server=myserver.database.windows.net;..."`,
        },
      ],
    },
    {
      id: 'application-insights',
      title: 'Application Insights',
      content: [
        {
          type: 'text',
          text: 'Application Insights is your window into what\'s happening in production. It auto-instruments HTTP requests, dependency calls (SQL, HTTP, Azure services), exceptions, and custom events. Without it, you\'re flying blind.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Add Application Insights to .NET 9',
          code: `# Install NuGet package
dotnet add package Microsoft.ApplicationInsights.AspNetCore

# Program.cs — one line to enable
builder.Services.AddApplicationInsightsTelemetry();

# appsettings.json (connection string from Azure portal)
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=...;IngestionEndpoint=..."
  }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Custom telemetry events',
          code: `// Inject TelemetryClient for custom tracking
public class OrderService(TelemetryClient telemetry)
{
    public async Task PlaceOrder(Order order)
    {
        // Track custom event
        telemetry.TrackEvent("OrderPlaced", new Dictionary<string, string>
        {
            ["OrderId"] = order.Id.ToString(),
            ["CustomerId"] = order.CustomerId.ToString(),
            ["TotalAmount"] = order.Total.ToString()
        });

        // Track custom metric
        telemetry.TrackMetric("OrderTotal", (double)order.Total);

        // Track exceptions automatically — or manually:
        try { await ProcessPayment(order); }
        catch (Exception ex)
        {
            telemetry.TrackException(ex, new Dictionary<string, string>
            {
                ["OrderId"] = order.Id.ToString()
            });
            throw;
        }
    }
}`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📈', title: 'Live Metrics', description: 'Real-time view of requests/sec, failures, and response times as they happen. Open it during a deployment.', color: '#0078d4' },
            { icon: '🔍', title: 'Transaction Search', description: 'Find a specific request by user, correlation ID, or custom property. End-to-end trace across all dependencies.', color: '#4f8ef7' },
            { icon: '💀', title: 'Failures', description: 'Grouped exceptions and failed requests with full stack traces, call hierarchy, and dependency chain.', color: '#f74f4f' },
            { icon: '🐌', title: 'Performance', description: 'P50/P95/P99 latency, slowest operations, dependency bottlenecks. Drill into any slow request.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'github-actions-azure',
      title: 'CI/CD with GitHub Actions',
      content: [
        {
          type: 'text',
          text: 'A production deployment pipeline for Azure should build, test, push a Docker image to Azure Container Registry, and deploy — all triggered by a git tag or a merge to main. Here\'s a battle-tested workflow.',
        },
        {
          type: 'code',
          language: 'yaml',
          label: '.github/workflows/deploy.yml — Container Apps pipeline',
          code: `name: Build & Deploy to Azure

on:
  push:
    tags: ['v*.*.*']

permissions:
  id-token: write   # Required for OIDC
  contents: read

env:
  REGISTRY: myregistry.azurecr.io
  IMAGE_NAME: myapi
  CONTAINER_APP: my-api
  RESOURCE_GROUP: my-app-rg

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login to Azure (OIDC — no secrets)
        uses: azure/login@v2
        with:
          client-id: \${{ vars.AZURE_CLIENT_ID }}
          tenant-id: \${{ vars.AZURE_TENANT_ID }}
          subscription-id: \${{ vars.AZURE_SUBSCRIPTION_ID }}

      - name: Login to Container Registry
        run: az acr login --name myregistry

      - name: Extract version
        id: version
        run: echo "VERSION=\${GITHUB_REF_NAME#v}" >> \$GITHUB_OUTPUT

      - name: Build & push Docker image
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ steps.version.outputs.VERSION }}

      - name: Run tests
        run: dotnet test --no-build

      - name: Deploy to Container Apps
        run: |
          az containerapp update \
            --name \${{ env.CONTAINER_APP }} \
            --resource-group \${{ env.RESOURCE_GROUP }} \
            --image \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ steps.version.outputs.VERSION }}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Notice there are no `secrets` in this workflow for Azure credentials — only `vars`. That\'s OIDC federated identity at work. GitHub and Azure trust each other via a configured identity, so no client secrets need to be stored anywhere.',
        },
        {
          type: 'heading',
          level: 3,
          text: 'Setting up OIDC (one-time)',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Configure OIDC federated identity',
          code: `# Create a service principal (app registration)
az ad app create --display-name "github-actions-myapp"
# Note the appId from output

# Create federated credential for the GitHub repo + main branch
az ad app federated-credential create \
  --id <appId> \
  --parameters '{
    "name": "github-main",
    "issuer": "https://token.actions.githubusercontent.com",
    "subject": "repo:myorg/myrepo:ref:refs/heads/main",
    "audiences": ["api://AzureADTokenExchange"]
  }'

# Assign Contributor role on the resource group
az role assignment create \
  --assignee <appId> \
  --role Contributor \
  --scope /subscriptions/<subscriptionId>/resourceGroups/my-app-rg

# Add to GitHub repo as Variables (not secrets):
# AZURE_CLIENT_ID = <appId>
# AZURE_TENANT_ID = <tenantId>
# AZURE_SUBSCRIPTION_ID = <subscriptionId>`,
        },
      ],
    },
    {
      id: 'cost-tips',
      title: 'Cost Management Tips',
      content: [
        {
          type: 'text',
          text: 'Azure bills by the second. A few habits keep your bill predictable — especially important in dev/test environments that don\'t need to run 24/7.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '😴', title: 'Scale to zero', description: 'Container Apps and Azure SQL Serverless both scale to zero when idle. Perfect for dev environments and low-traffic APIs.', color: '#00d4aa' },
            { icon: '🏷️', title: 'Tag everything', description: 'Apply tags like `environment=dev` and `project=myapp` to all resources. Essential for cost filtering and chargeback reports.', color: '#caf74f' },
            { icon: '⚠️', title: 'Budget alerts', description: 'Set a monthly budget in Cost Management with email alerts at 80% and 100%. Takes 2 minutes, saves you from surprise bills.', color: '#f7a24f' },
            { icon: '🗑️', title: 'Delete idle resources', description: 'Delete dev resource groups when not in use. Use Azure CLI scripts or GitHub Actions to spin them up on demand.', color: '#f74f4f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Budget alert via CLI',
          code: `az consumption budget create \
  --budget-name "monthly-dev-limit" \
  --amount 50 \
  --time-grain Monthly \
  --resource-group my-app-rg \
  --notifications '[{
    "enabled": true,
    "operator": "GreaterThan",
    "threshold": 80,
    "contactEmails": ["you@company.com"],
    "thresholdType": "Actual"
  }]'`,
        },
      ],
    },
  ],
};