import type { Topic, QuizQuestion } from '@/types';

export const dockerQuizPtBr: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'Qual é a principal diferença entre uma imagem Docker e um container?',
    options: [
      'Imagens rodam na nuvem; containers rodam localmente',
      'Uma imagem é um blueprint estático; um container é uma instância em execução dessa imagem',
      'Containers são menores em tamanho do que imagens',
      'Imagens precisam de internet; containers funcionam offline',
    ],
    correct: 1,
    explanation: 'Uma imagem é imutável — é o blueprint armazenado em disco. Um container é a execução viva dessa imagem, com sua própria camada gravável e estado em memória.',
  },
  {
    id: 'q2',
    question: 'O que o comando `docker run -p 8080:80 nginx` faz?',
    options: [
      'Executa o nginx e expõe a porta 8080 dentro do container',
      'Mapeia a porta 8080 do container para a porta 80 do host',
      'Mapeia a porta 8080 do host para a porta 80 do container — acesse o nginx em localhost:8080',
      'Cria um container chamado 8080:80',
    ],
    correct: 2,
    explanation: 'A flag -p usa a sintaxe Host:Container. Então 8080:80 significa que o tráfego para localhost:8080 na sua máquina é encaminhado para a porta 80 dentro do container onde o nginx escuta.',
  },
  {
    id: 'q3',
    question: 'O que acontece com os dados dentro de um container quando ele é deletado?',
    options: [
      'Os dados são automaticamente salvos no Docker Hub',
      'Os dados são mesclados de volta na imagem',
      'Todos os dados dentro do container são perdidos permanentemente',
      'Os dados ficam em cache local por 30 dias',
    ],
    correct: 2,
    explanation: 'Containers têm uma camada gravável temporária. Quando deletados, todos os dados dessa camada somem. Docker Volumes resolvem isso armazenando dados fora do ciclo de vida do container.',
  },
  {
    id: 'q4',
    question: 'Qual ferramenta você deve usar para rodar um banco de dados E uma API juntos no Docker?',
    options: [
      'Docker Multi-Container',
      'Docker Compose',
      'Docker Hub',
      'Docker Swarm',
    ],
    correct: 1,
    explanation: 'O Docker Compose permite definir vários serviços em um único arquivo YAML. Cada serviço roda a partir de sua própria imagem e eles se comunicam por uma rede interna do Docker.',
  },
  {
    id: 'q5',
    question: 'Uma tag Docker como `myapp:1.2.0` é mais similar a qual conceito do Git?',
    options: [
      'Uma branch',
      'Um merge request',
      'Uma release tag apontando para um commit específico',
      'Um arquivo .gitignore',
    ],
    correct: 2,
    explanation: 'Assim como uma tag Git aponta para um commit específico, uma tag Docker aponta para uma imagem específica — um snapshot congelado do seu app + runtime + OS.',
  },
];

export const dockerTopicPtBr: Topic = {
  slug: 'docker',
  title: 'Docker',
  description: 'Containers, imagens, volumes e tudo que você precisa para entregar apps .NET de forma consistente.',
  icon: '🐳',
  status: 'available',
  color: '#00d4aa',
  sections: [
    {
      id: 'why-docker',
      title: 'Por que Docker?',
      content: [
        { type: 'text', text: 'Entregar uma aplicação .NET costumava significar lidar com drift de ambiente — o clássico problema "funciona na minha máquina". O Docker resolve isso empacotando seu app e todo o seu runtime em uma unidade portátil chamada container.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔁', title: 'Builds reproduzíveis', description: 'Mesmo runtime, mesmas configurações de OS, sempre — dev, staging, produção.', color: '#00d4aa' },
            { icon: '🚀', title: 'Onboarding mais rápido', description: 'Novos devs clonam o repositório, rodam docker compose up, e já estão prontos.', color: '#4f8ef7' },
            { icon: '📦', title: 'Artefato portátil', description: 'Uma imagem roda em qualquer lugar com Docker instalado, sem configuração manual.', color: '#a78bfa' },
            { icon: '🔗', title: 'Amigável ao CI/CD', description: 'Build uma vez, push para registry, deploy em qualquer lugar — pipelines adoram containers.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'problems-bare-metal',
      title: 'Problemas com Bare-Metal',
      content: [
        { type: 'text', text: 'Um deploy bare-metal significa instalar seu app diretamente no hardware físico sem virtualização. Parece simples, mas na prática cria uma longa lista de problemas:' },
        {
          type: 'list',
          items: [
            'Incompatibilidade de versão do OS / runtime .NET entre máquinas',
            'Arquivos, certificados ou variáveis de ambiente ausentes',
            'Conflitos de dependências quando apps compartilham o mesmo servidor',
            'Caminhos hardcoded que quebram em ambientes diferentes',
            'Conflitos de porta entre serviços co-localizados',
            'Drift de ambiente — produção se comporta diferente do dev',
            'Provisionamento lento e rollbacks dolorosos',
          ],
        },
      ],
    },
    {
      id: 'vms-vs-containers',
      title: 'VMs vs Containers',
      content: [
        { type: 'text', text: 'Máquinas Virtuais isolam apps no nível do OS — cada VM tem seu próprio kernel completo. É poderoso, mas caro. Containers compartilham o kernel do OS host e isolam apenas a camada da aplicação.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '🖥️', title: 'Máquinas Virtuais', description: 'OS completo por app. Alto overhead de RAM/disco. Startup lento. Ótimo para isolamento total de OS.', color: '#f74f4f' },
            { icon: '📦', title: 'Containers', description: 'Kernel de OS compartilhado. Overhead mínimo. Inicia em segundos. Perfeito para empacotamento de apps.', color: '#00d4aa' },
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Use containers para seus apps. Use VMs quando precisar de um OS completamente diferente, módulos de kernel personalizados, ou isolamento em nível de hardware.' },
      ],
    },
    {
      id: 'images-vs-containers',
      title: 'Imagens vs Containers',
      content: [
        { type: 'text', text: 'Este é o conceito mais fundamental do Docker. Entender a diferença entre uma imagem e um container desbloqueia tudo o mais.' },
        { type: 'interactive', component: 'image-container-viz' },
        { type: 'heading', level: 3, text: 'Imagens — O Blueprint' },
        { type: 'text', text: 'Uma imagem é um arquivo estático e imutável contendo tudo necessário para executar uma aplicação: código, runtime, bibliotecas, configuração. Você a builda uma vez. Ela nunca muda. Pode ser compartilhada via um registry como o Docker Hub.' },
        { type: 'heading', level: 3, text: 'Containers — O Processo Vivo' },
        { type: 'text', text: 'Um container é a execução viva de uma imagem. O Docker cria uma instância isolada com sua própria camada gravável, alocação de RAM e espaço de processo. Você pode rodar 10 containers idênticos de uma única imagem simultaneamente.' },
        { type: 'callout', variant: 'info', text: 'Pense como assar um bolo: a receita (imagem) é imutável, mas você pode assar quantos bolos (containers) quiser a partir dela. Cada bolo é independente — queimar um não estraga a receita.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '1️⃣', title: 'Imagem → 1 Container', description: 'Cada container executa exatamente uma imagem. Você não pode misturar duas imagens em um container.', color: '#4f8ef7' },
            { icon: '♾️', title: '1 Imagem → N Containers', description: 'Uma imagem pode criar 10, 100 ou 1000 containers idênticos rodando em paralelo.', color: '#00d4aa' },
            { icon: '🔗', title: 'Design em camadas', description: 'Imagens se empilham (ex: .NET em cima do Linux), mas o resultado final é uma única imagem unificada.', color: '#a78bfa' },
          ],
        },
      ],
    },
    {
      id: 'docker-architecture',
      title: 'Arquitetura Docker',
      content: [
        { type: 'text', text: 'O Docker segue uma arquitetura cliente-servidor. Quando você digita um comando no terminal, veja o que acontece por baixo dos panos:' },
        {
          type: 'concept-grid',
          items: [
            { icon: '💻', title: 'Docker CLI', description: 'A ferramenta de linha de comando que você digita. Envia instruções ao Docker Engine via REST API.', color: '#4f8ef7' },
            { icon: '⚙️', title: 'Docker Engine', description: 'Recebe as requisições da CLI, valida-as e coordena o Daemon.', color: '#00d4aa' },
            { icon: '🛠️', title: 'Docker Daemon (dockerd)', description: 'O serviço em background que constrói imagens, roda containers e gerencia storage e rede.', color: '#a78bfa' },
          ],
        },
        { type: 'callout', variant: 'info', text: 'No Windows, o Docker normalmente roda containers Linux via WSL2 (Windows Subsystem for Linux). O Docker Desktop abstrai tudo isso — você interage pela CLI ou UI sem pensar no WSL2 diretamente.' },
      ],
    },
    {
      id: 'docker-tags',
      title: 'Docker Tags',
      content: [
        { type: 'text', text: 'Docker tags funcionam como rótulos de versão para suas imagens — permitindo rastrear exatamente qual build está rodando, assim como tags Git rastreiam versões de código-fonte.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '📌', title: 'Git commit', description: 'Um snapshot específico do seu código-fonte', color: '#4f8ef7' },
            { icon: '🏷️', title: 'Imagem Docker', description: 'Um snapshot específico do seu app + runtime + OS', color: '#00d4aa' },
            { icon: '🔖', title: 'Git tag (v1.2.0)', description: 'Aponta para um commit específico no histórico', color: '#a78bfa' },
            { icon: '🏷️', title: 'Docker tag (myapp:1.2.0)', description: 'Aponta para uma imagem específica já buildada', color: '#f7a24f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplos de tags',
          code: `# Build com tag de versão
docker build -t myapi:1.2.0 .

# Taguear como latest também
docker tag myapi:1.2.0 myapi:latest

# Push para o Docker Hub
docker push meuusuario/myapi:1.2.0

# Pull de uma versão específica
docker pull meuusuario/myapi:1.2.0`,
        },
        { type: 'callout', variant: 'warning', text: 'Evite usar :latest em produção. Sempre fixe em uma tag de versão específica para saber exatamente o que está rodando e poder fazer rollback com segurança.' },
      ],
    },
    {
      id: 'port-mapping',
      title: 'Mapeamento de Portas',
      content: [
        { type: 'text', text: 'Containers são isolados — eles têm sua própria rede interna. Para alcançar um serviço dentro de um container pelo browser ou outro serviço, você precisa mapear uma porta do host para uma porta do container.' },
        { type: 'interactive', component: 'port-mapper' },
        { type: 'text', text: 'A flag -p usa o formato Host:Container. O tráfego flui de fora da sua máquina → porta do host → porta do container → seu app.' },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplos de mapeamento de portas',
          code: `# Mapeia host 8080 para container 80
docker run -p 8080:80 nginx

# Mapeia host 5000 para container 8080 (API .NET)
docker run -p 5000:8080 myapi:latest

# Múltiplos mapeamentos de porta
docker run -p 8080:80 -p 8443:443 myapp:latest

# Vincular a uma interface específica do host
docker run -p 127.0.0.1:8080:80 nginx`,
        },
        { type: 'callout', variant: 'tip', text: 'Modelo mental: Porta do Host = "endereço da rua" (o que o mundo externo vê). Porta do Container = "número do quarto" (onde seu app realmente vive lá dentro).' },
      ],
    },
    {
      id: 'volumes',
      title: 'Docker Volumes',
      content: [
        { type: 'text', text: 'Containers são efêmeros — delete um container e tudo dentro dele desaparece. Para qualquer coisa que precise sobreviver a um container (dados do banco, arquivos enviados, logs), você usa Volumes.' },
        { type: 'callout', variant: 'danger', text: 'Sem um volume, deletar um container deleta TODOS os seus dados. Para SQL Server no Docker, sempre anexe um volume para seus arquivos de dados.' },
        { type: 'text', text: 'Um volume é um diretório especial que vive fora da camada gravável do container — gerenciado pelo Docker no host. Novos containers podem montar o mesmo volume e acessar os dados existentes perfeitamente.' },
        {
          type: 'code',
          language: 'bash',
          label: 'Exemplos de volume',
          code: `# Criar um volume nomeado
docker volume create mydb-data

# Rodar SQL Server com um volume
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=SuaSenhaForte!' \\
  -p 1433:1433 \\
  -v mydb-data:/var/opt/mssql \\
  mcr.microsoft.com/mssql/server:2022-latest

# Listar volumes
docker volume ls

# Inspecionar um volume (mostra o caminho no host)
docker volume inspect mydb-data`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💾', title: 'Named volumes', description: 'Gerenciados pelo Docker. Melhor para bancos de dados e estado compartilhado entre containers.', color: '#00d4aa' },
            { icon: '📁', title: 'Bind mounts', description: 'Monta um diretório específico do host no container. Ótimo para hot-reload em desenvolvimento.', color: '#4f8ef7' },
            { icon: '🗄️', title: 'tmpfs mounts', description: 'Storage apenas em memória. Rápido mas não persistente. Bom para dados temporários sensíveis.', color: '#a78bfa' },
          ],
        },
      ],
    },
    {
      id: 'docker-compose',
      title: 'Docker Compose',
      content: [
        { type: 'text', text: 'Quando seu app tem múltiplos serviços — uma API .NET + SQL Server + Redis — o Docker Compose permite definir todos eles em um único arquivo YAML e iniciar tudo com um único comando.' },
        {
          type: 'code',
          language: 'yaml',
          label: 'docker-compose.yml — API .NET + SQL Server',
          code: `version: '3.9'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ConnectionStrings__Default=Server=db;Database=MeuApp;User=sa;Password=SuaSenhaForte!
    depends_on:
      - db

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=SuaSenhaForte!
    ports:
      - "1433:1433"
    volumes:
      - sqldata:/var/opt/mssql

volumes:
  sqldata:`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Comandos do Compose',
          code: `# Iniciar todos os serviços (modo detached)
docker compose up -d

# Ver logs de todos os serviços
docker compose logs -f

# Parar e remover containers
docker compose down

# Parar e remover containers + volumes (cuidado!)
docker compose down -v`,
        },
      ],
    },
    {
      id: 'dotnet-images',
      title: 'Criando Imagens Docker .NET',
      content: [
        { type: 'text', text: 'Desenvolvedores .NET têm dois caminhos principais para criar imagens Docker. Ambos são viáveis para produção — a escolha certa depende do seu workflow e do nível de controle que você precisa.' },
        { type: 'heading', level: 3, text: 'Opção 1 — Dockerfile' },
        { type: 'text', text: 'Um Dockerfile é um script que define exatamente como construir sua imagem. Você tem controle total sobre cada camada, imagem base e variável de ambiente.' },
        {
          type: 'code',
          language: 'dockerfile',
          label: 'Dockerfile — Multistage .NET 9',
          code: `# Estágio de build — inclui o SDK completo
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY *.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /out

# Estágio de runtime — imagem final menor, sem SDK
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "MinhaApi.dll"]`,
        },
        { type: 'heading', level: 3, text: 'Opção 2 — .NET SDK (dotnet publish)' },
        { type: 'text', text: 'Desde o .NET 7, o SDK consegue construir imagens Docker diretamente sem um Dockerfile. Ele usa imagens base Chiseled Ubuntu e padrões sensatos que seguem as melhores práticas.' },
        {
          type: 'code',
          language: 'bash',
          label: 'Criação de imagem pelo .NET SDK',
          code: `# Build e push direto para o Docker Hub
dotnet publish --os linux --arch x64 \\
  /t:PublishContainer \\
  -p ContainerImageName=meuusuario/minhaapi \\
  -p ContainerImageTag=1.0.0

# Ou publicar no Docker daemon local
dotnet publish --os linux --arch x64 \\
  /t:PublishContainer`,
        },
        { type: 'callout', variant: 'tip', text: 'Use a abordagem SDK para builds internos rápidos. Use um Dockerfile quando precisar de controle refinado: imagens base customizadas, builds multi-arquitetura ou setup complexo de ambiente.' },
      ],
    },
  ],
};
