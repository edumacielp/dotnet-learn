import type { Topic, QuizQuestion } from '@/types';

export const azureQuizPtBr: QuizQuestion[] = [
  {
    id: 'az1',
    question: 'Qual serviço Azure é a forma mais simples de fazer deploy de uma API .NET containerizada sem gerenciar infraestrutura?',
    options: [
      'Azure Virtual Machines',
      'Azure Kubernetes Service (AKS)',
      'Azure Container Apps',
      'Azure Service Fabric',
    ],
    correct: 2,
    explanation: 'Azure Container Apps é uma plataforma serverless de containers construída sobre Kubernetes. Você faz deploy de containers sem pensar em nodes, pods ou configuração de cluster. Escala para zero automaticamente e gerencia HTTPS, roteamento e revisões.',
  },
  {
    id: 'az2',
    question: 'Qual é a forma correta de armazenar uma connection string de banco de dados no Azure para um app .NET em produção?',
    options: [
      'No appsettings.json e commitado no git',
      'Como variável de ambiente em texto puro na config do App Service',
      'No Azure Key Vault, referenciado via Managed Identity',
      'Em um arquivo .env deployado junto com o app',
    ],
    correct: 2,
    explanation: 'Key Vault + Managed Identity é o padrão ouro. Seu app autentica no Key Vault usando sua identidade Azure (sem credenciais em código ou config), e recupera segredos em runtime. Nada sensível jamais toca o appsettings.json ou variáveis de ambiente digitadas manualmente.',
  },
  {
    id: 'az3',
    question: 'O que um Deployment Slot no Azure App Service permite que você faça?',
    options: [
      'Agendar deploys para horários específicos',
      'Executar um ambiente de staging e trocá-lo para produção com zero downtime',
      'Fazer deploy em múltiplas regiões simultaneamente',
      'Fazer rollback para uma imagem Docker anterior',
    ],
    correct: 1,
    explanation: 'Deployment Slots fornecem um ambiente de staging live (mesmo App Service Plan, sem custo extra no Standard+). Você faz deploy para o slot de staging, aquece, testa, então "troca" — o tráfego muda instantaneamente para a nova versão com zero downtime e rollback fácil.',
  },
  {
    id: 'az4',
    question: 'Qual recurso do Azure Monitor detecta automaticamente exceções, falhas de dependência e requisições lentas no seu app .NET?',
    options: [
      'Azure Advisor',
      'Application Insights',
      'Azure Monitor Metrics',
      'Apenas Log Analytics',
    ],
    correct: 1,
    explanation: 'O Application Insights fornece APM completo para .NET. O SDK auto-instrumenta requisições HTTP, chamadas de dependência, exceções e eventos customizados. Alimenta Live Metrics, análise de falhas e alertas inteligentes.',
  },
  {
    id: 'az5',
    question: 'Em um pipeline de deploy GitHub Actions para Azure, qual é a forma mais segura de autenticar no Azure?',
    options: [
      'Armazenar o subscription ID e tenant ID como secrets do GitHub',
      'Usar um Service Principal client secret armazenado nos secrets do GitHub',
      'Usar OpenID Connect (OIDC) com identidade federada — sem secrets armazenados em nenhum lugar',
      'Hardcodar credenciais no YAML do workflow',
    ],
    correct: 2,
    explanation: 'A identidade federada OIDC é a abordagem moderna. GitHub e Azure trocam tokens de curta duração usando uma relação de confiança — sem client secrets para rotacionar, sem credenciais para vazar. Use a action `azure/login` com `client-id`, `tenant-id` e `subscription-id` (nenhum deles é realmente secreto).',
  },
];

export const azureTopicPtBr: Topic = {
  slug: 'azure',
  title: 'Azure',
  description: 'Deploy, monitoramento e escalabilidade de aplicações .NET no Microsoft Azure do jeito certo.',
  icon: '☁️',
  status: 'available',
  color: '#0078d4',
  sections: [
    {
      id: 'azure-overview',
      title: 'Azure para Desenvolvedores .NET',
      content: [
        {
          type: 'text',
          text: 'Azure é a plataforma de nuvem da Microsoft, ele oferece suporte nativo e profundo ao ecossistema .NET. Essa integração garante SDKs idiomáticos, ferramentas que funcionam perfeitamente com o Visual Studio ou .NET CLI e serviços como App Service, Container Apps e Azure SQL, que são otimizados especificamente para os fluxos de trabalho que as equipes .NET já utilizam no dia a dia.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🚀', title: 'App Service', description: 'PaaS totalmente gerenciado para web apps e APIs. Deploy de um app .NET com git push ou GitHub Actions. Sem gerenciamento de servidor.', color: '#0078d4' },
            { icon: '📦', title: 'Container Apps', description: 'Containers serverless. Faça deploy de imagens Docker com auto-scaling, revisões zero-downtime e HTTPS integrado.', color: '#00d4aa' },
            { icon: '🗄️', title: 'Azure SQL', description: 'SQL Server gerenciado. T-SQL familiar, suporte a EF Core, backups automáticos e geo-redundância.', color: '#4f8ef7' },
            { icon: '🔑', title: 'Key Vault', description: 'Segredos centralizados, connection strings e certificados. Integre via Managed Identity — sem credenciais em código.', color: '#a78bfa' },
            { icon: '📊', title: 'Application Insights', description: 'APM completo: traces, exceções, dependências, eventos customizados, live metrics e alertas inteligentes para apps .NET.', color: '#f7a24f' },
            { icon: '🏗️', title: 'Azure Container Registry', description: 'Registry privado Docker. Armazene e gerencie suas imagens .NET de forma segura, integrado com AKS e Container Apps.', color: '#caf74f' },
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
          text: 'App Service é o caminho mais simples para colocar um web app ou API .NET no ar no Azure. Você dá a ele o código (via git, ZIP ou container) e ele cuida do runtime, escalabilidade e atualizações de OS.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Deploy via Azure CLI',
          code: `# Login no Azure
az login

# Criar um resource group
az group create --name meu-app-rg --location brazilsouth

# Criar App Service plan (B1 = básico, mais barato pago)
az appservice plan create \
  --name meu-app-plan \
  --resource-group meu-app-rg \
  --sku B1 \
  --is-linux

# Criar o web app (runtime: dotnet 9)
az webapp create \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --plan meu-app-plan \
  --runtime "DOTNETCORE:9.0"

# Deploy de um pacote ZIP
dotnet publish -c Release -o ./publish
cd publish && zip -r ../deploy.zip .
az webapp deployment source config-zip \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --src ../deploy.zip`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Variáveis de Ambiente & App Settings',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Configurando app settings',
          code: `# Definir app settings (variáveis de ambiente)
az webapp config appsettings set \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --settings \
    ASPNETCORE_ENVIRONMENT=Production \
    FeatureFlags__NovoCheckout=true

# .NET lê automaticamente via IConfiguration
# builder.Configuration["FeatureFlags:NovoCheckout"]

# Definir connection string (exibida como mascarada no portal)
az webapp config connection-string set \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --connection-string-type SQLAzure \
  --settings DefaultConnection="Server=..."`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Deployment Slots — Deploys com Zero Downtime',
        },
        {
          type: 'text',
          text: 'Deployment Slots fornecem um ambiente de staging live no mesmo App Service Plan. Faça deploy para staging, teste, depois troque — o tráfego de produção muda instantaneamente com zero downtime e rollback com um clique.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Usando deployment slots',
          code: `# Criar um slot de staging
az webapp deployment slot create \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --slot staging

# Deploy para staging
az webapp deployment source config-zip \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --slot staging \
  --src ./deploy.zip

# Trocar staging → produção (zero downtime)
az webapp deployment slot swap \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
  --slot staging \
  --target-slot production

# Rollback: trocar de volta imediatamente
az webapp deployment slot swap \
  --name minha-dotnet-api \
  --resource-group meu-app-rg \
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
          text: 'Container Apps é o ponto ideal entre App Service (fácil mas menos flexível) e AKS (poderoso mas complexo). Roda seus containers Docker em um cluster Kubernetes gerenciado — você nunca toca o cluster.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📉', title: 'Escala para zero', description: 'Sem tráfego? Sem instâncias rodando. Sem custo. Escala de volta automaticamente quando chegam requisições.', color: '#0078d4' },
            { icon: '🔄', title: 'Revisões', description: 'Cada deploy cria uma nova revisão. Divida tráfego entre revisões para deploys canary ou testes A/B.', color: '#00d4aa' },
            { icon: '🌐', title: 'HTTPS integrado', description: 'Terminação TLS automática e URL HTTPS pública pronta para usar. Sem gerenciamento de certificados.', color: '#4f8ef7' },
            { icon: '📨', title: 'DAPR pronto', description: 'Integração nativa com DAPR para chamadas serviço-a-serviço, pub/sub e gerenciamento de estado em microsserviços.', color: '#a78bfa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Deploy de container .NET no Container Apps',
          code: `# Criar ambiente Container Apps
az containerapp env create \
  --name meu-env \
  --resource-group meu-app-rg \
  --location brazilsouth

# Deploy do Azure Container Registry
az containerapp create \
  --name minha-api \
  --resource-group meu-app-rg \
  --environment meu-env \
  --image meuregistry.azurecr.io/minhaapi:1.2.0 \
  --target-port 8080 \
  --ingress external \
  --min-replicas 0 \
  --max-replicas 10 \
  --cpu 0.5 --memory 1.0Gi

# Atualizar para nova versão da imagem
az containerapp update \
  --name minha-api \
  --resource-group meu-app-rg \
  --image meuregistry.azurecr.io/minhaapi:1.3.0`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Use Container Apps para novos microsserviços. Use App Service quando quiser o deploy mais simples possível para uma única API .NET e não precisar de containers.',
        },
      ],
    },
    {
      id: 'key-vault',
      title: 'Azure Key Vault + Managed Identity',
      content: [
        {
          type: 'text',
          text: 'Nunca armazene segredos — connection strings, API keys, certificados — no appsettings.json ou em variáveis de ambiente digitadas manualmente. Azure Key Vault + Managed Identity é o padrão correto: seu app autentica no Key Vault usando sua identidade Azure, não uma senha.',
        },
        {
          type: 'callout',
          variant: 'danger',
          text: 'Se um segredo está no appsettings.json e foi commitado no git, ele está comprometido. Mesmo em um repositório privado. O Key Vault existe exatamente para que segredos nunca toquem seu código-fonte ou pipeline de deploy.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup Key Vault + Managed Identity',
          code: `# Criar Key Vault
az keyvault create \
  --name meu-app-kv \
  --resource-group meu-app-rg \
  --location brazilsouth

# Adicionar um segredo
az keyvault secret set \
  --vault-name meu-app-kv \
  --name "ConnectionStrings--Default" \
  --value "Server=meuservidor.database.windows.net;..."

# Habilitar Managed Identity no App Service
az webapp identity assign \
  --name minha-dotnet-api \
  --resource-group meu-app-rg

# Conceder acesso da identidade do app aos segredos do Key Vault
az keyvault set-policy \
  --name meu-app-kv \
  --object-id <identity-principal-id> \
  --secret-permissions get list`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Ler Key Vault no .NET (Program.cs)',
          code: `using Azure.Identity;

var builder = WebApplication.CreateBuilder(args);

// Adicionar Key Vault ao pipeline de configuração
// Usa Managed Identity no Azure, DefaultAzureCredential localmente
var keyVaultUri = new Uri(builder.Configuration["KeyVaultUri"]!);
builder.Configuration.AddAzureKeyVault(keyVaultUri, new DefaultAzureCredential());

// Segredos agora disponíveis via IConfiguration
// builder.Configuration["ConnectionStrings:Default"]
// Mesma API que appsettings.json — sem mudanças de código`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: '`DefaultAzureCredential` tenta múltiplos métodos de auth em ordem: Managed Identity → Visual Studio → Azure CLI → variáveis de ambiente. No Azure usa Managed Identity automaticamente. Localmente cai de volta para suas credenciais `az login` — sem mudanças de código entre ambientes.',
        },
      ],
    },
    {
      id: 'azure-sql',
      title: 'Azure SQL',
      content: [
        {
          type: 'text',
          text: 'Azure SQL é SQL Server gerenciado na nuvem. Para desenvolvedores .NET é a opção mais familiar — EF Core funciona exatamente da mesma forma, T-SQL é idêntico, e você tem backups automáticos, escalabilidade e alta disponibilidade sem gerenciar um servidor.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Criar Azure SQL via CLI',
          code: `# Criar servidor SQL
az sql server create \
  --name meu-sql-server \
  --resource-group meu-app-rg \
  --location brazilsouth \
  --admin-user sqladmin \
  --admin-password "SuaSenhaForte!"

# Criar banco de dados (serverless = pausa automática quando ocioso)
az sql db create \
  --name MeuAppDb \
  --server meu-sql-server \
  --resource-group meu-app-rg \
  --edition GeneralPurpose \
  --compute-model Serverless \
  --auto-pause-delay 60

# Permitir serviços Azure se conectarem
az sql server firewall-rule create \
  --name AllowAzureServices \
  --server meu-sql-server \
  --resource-group meu-app-rg \
  --start-ip-address 0.0.0.0 \
  --end-ip-address 0.0.0.0`,
        },
        {
          type: 'heading',
          level: 3,
          text: 'Migrations EF Core no CI/CD',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Auto-migrate no startup (Program.cs)',
          code: `// Aplicar migrations pendentes no startup do app
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    await db.Database.MigrateAsync();
}

// Ou rodar como passo separado no pipeline:
dotnet ef database update \
  --connection "Server=meuservidor.database.windows.net;..."`,
        },
      ],
    },
    {
      id: 'application-insights',
      title: 'Application Insights',
      content: [
        {
          type: 'text',
          text: 'Application Insights é sua janela para o que está acontecendo em produção. Ele auto-instrumenta requisições HTTP, chamadas de dependência (SQL, HTTP, serviços Azure), exceções e eventos customizados. Sem ele, você está voando às cegas.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Adicionar Application Insights ao .NET 9',
          code: `# Instalar pacote NuGet
dotnet add package Microsoft.ApplicationInsights.AspNetCore

# Program.cs — uma linha para habilitar
builder.Services.AddApplicationInsightsTelemetry();

# appsettings.json (connection string do portal Azure)
{
  "ApplicationInsights": {
    "ConnectionString": "InstrumentationKey=...;IngestionEndpoint=..."
  }
}`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Telemetria customizada',
          code: `// Injetar TelemetryClient para tracking customizado
public class ServicosPedidos(TelemetryClient telemetria)
{
    public async Task RealizarPedido(Pedido pedido)
    {
        // Rastrear evento customizado
        telemetria.TrackEvent("PedidoRealizado", new Dictionary<string, string>
        {
            ["PedidoId"] = pedido.Id.ToString(),
            ["ClienteId"] = pedido.ClienteId.ToString(),
            ["ValorTotal"] = pedido.Total.ToString()
        });

        // Rastrear métrica customizada
        telemetria.TrackMetric("ValorPedido", (double)pedido.Total);

        // Rastrear exceções automaticamente — ou manualmente:
        try { await ProcessarPagamento(pedido); }
        catch (Exception ex)
        {
            telemetria.TrackException(ex, new Dictionary<string, string>
            {
                ["PedidoId"] = pedido.Id.ToString()
            });
            throw;
        }
    }
}`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📈', title: 'Live Metrics', description: 'Visão em tempo real de requisições/seg, falhas e tempos de resposta. Abra durante um deploy.', color: '#0078d4' },
            { icon: '🔍', title: 'Transaction Search', description: 'Encontre uma requisição específica por usuário, correlation ID ou propriedade customizada. Trace end-to-end.', color: '#4f8ef7' },
            { icon: '💀', title: 'Failures', description: 'Exceções e requisições com falha agrupadas, com stack traces completos e cadeia de dependências.', color: '#f74f4f' },
            { icon: '🐌', title: 'Performance', description: 'Latência P50/P95/P99, operações mais lentas, gargalos de dependência. Drill into qualquer requisição lenta.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'github-actions-azure',
      title: 'CI/CD com GitHub Actions',
      content: [
        {
          type: 'text',
          text: 'Um pipeline de deploy de produção para Azure deve buildar, testar, fazer push de uma imagem Docker para o Azure Container Registry e fazer deploy — tudo disparado por uma tag git ou merge para main.',
        },
        {
          type: 'code',
          language: 'yaml',
          label: '.github/workflows/deploy.yml — pipeline Container Apps',
          code: `name: Build & Deploy para Azure

on:
  push:
    tags: ['v*.*.*']

permissions:
  id-token: write   # Necessário para OIDC
  contents: read

env:
  REGISTRY: meuregistry.azurecr.io
  IMAGE_NAME: minhaapi
  CONTAINER_APP: minha-api
  RESOURCE_GROUP: meu-app-rg

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Login no Azure (OIDC — sem secrets)
        uses: azure/login@v2
        with:
          client-id: \${{ vars.AZURE_CLIENT_ID }}
          tenant-id: \${{ vars.AZURE_TENANT_ID }}
          subscription-id: \${{ vars.AZURE_SUBSCRIPTION_ID }}

      - name: Login no Container Registry
        run: az acr login --name meuregistry

      - name: Extrair versão
        id: version
        run: echo "VERSION=\${GITHUB_REF_NAME#v}" >> \$GITHUB_OUTPUT

      - name: Build & push imagem Docker
        uses: docker/build-push-action@v5
        with:
          push: true
          tags: \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ steps.version.outputs.VERSION }}

      - name: Executar testes
        run: dotnet test --no-build

      - name: Deploy para Container Apps
        run: |
          az containerapp update \
            --name \${{ env.CONTAINER_APP }} \
            --resource-group \${{ env.RESOURCE_GROUP }} \
            --image \${{ env.REGISTRY }}/\${{ env.IMAGE_NAME }}:\${{ steps.version.outputs.VERSION }}`,
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Perceba que não há `secrets` neste workflow para credenciais Azure — apenas `vars`. É a identidade federada OIDC em ação. GitHub e Azure confiam um no outro via uma identidade configurada, então nenhum client secret precisa ser armazenado em lugar nenhum.',
        },
      ],
    },
    {
      id: 'cost-tips',
      title: 'Dicas de Gerenciamento de Custos',
      content: [
        {
          type: 'text',
          text: 'Azure cobra por segundo. Alguns hábitos mantêm sua conta previsível — especialmente importantes em ambientes de dev/test que não precisam rodar 24/7.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '😴', title: 'Escala para zero', description: 'Container Apps e Azure SQL Serverless escalam para zero quando ociosos. Perfeito para ambientes de dev e APIs com baixo tráfego.', color: '#00d4aa' },
            { icon: '🏷️', title: 'Taguear tudo', description: 'Aplique tags como `environment=dev` e `project=meuapp` em todos os recursos. Essencial para filtrar custos e relatórios.', color: '#caf74f' },
            { icon: '⚠️', title: 'Alertas de budget', description: 'Defina um orçamento mensal no Cost Management com alertas por e-mail em 80% e 100%. Leva 2 minutos, evita faturas surpresa.', color: '#f7a24f' },
            { icon: '🗑️', title: 'Deletar recursos ociosos', description: 'Delete resource groups de dev quando não estiver usando. Use scripts Azure CLI ou GitHub Actions para criá-los sob demanda.', color: '#f74f4f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Alerta de budget via CLI',
          code: `az consumption budget create \
  --budget-name "limite-mensal-dev" \
  --amount 50 \
  --time-grain Monthly \
  --resource-group meu-app-rg \
  --notifications '[{
    "enabled": true,
    "operator": "GreaterThan",
    "threshold": 80,
    "contactEmails": ["voce@empresa.com"],
    "thresholdType": "Actual"
  }]'`,
        },
      ],
    },
  ],
};