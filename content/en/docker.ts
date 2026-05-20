import type { Topic, QuizQuestion } from '@/types';

export const dockerQuiz: QuizQuestion[] = [
  {
    id: 'q1',
    question: 'What is the key difference between a Docker image and a container?',
    options: [
      'Images run in the cloud; containers run locally',
      'An image is a static blueprint; a container is a running instance of that image',
      'Containers are smaller in size than images',
      'Images require internet; containers work offline',
    ],
    correct: 1,
    explanation: 'An image is immutable — it\'s the blueprint stored on disk. A container is the live execution of that image, with its own writable layer and runtime state in memory.',
  },
  {
    id: 'q2',
    question: 'What does `docker run -p 8080:80 nginx` do?',
    options: [
      'Runs nginx and exposes port 8080 inside the container',
      'Maps container port 8080 to host port 80',
      'Maps host port 8080 to container port 80 — access nginx at localhost:8080',
      'Creates a container named 8080:80',
    ],
    correct: 2,
    explanation: 'The -p flag uses Host:Container syntax. So 8080:80 means traffic to localhost:8080 on your machine is forwarded to port 80 inside the container where nginx listens.',
  },
  {
    id: 'q3',
    question: 'What happens to data inside a container when it is deleted?',
    options: [
      'Data is automatically backed up to Docker Hub',
      'Data is merged back into the image',
      'All data inside the container is lost permanently',
      'Data is saved in a local cache for 30 days',
    ],
    correct: 2,
    explanation: 'Containers have a temporary writable layer. When deleted, all data in that layer is gone. Docker Volumes solve this by storing data outside the container lifecycle.',
  },
  {
    id: 'q4',
    question: 'Which tool should you use to run a database AND an API together in Docker?',
    options: [
      'Docker Multi-Container',
      'Docker Compose',
      'Docker Hub',
      'Docker Swarm',
    ],
    correct: 1,
    explanation: 'Docker Compose lets you define multiple services in a single YAML file. Each service runs from its own image and they communicate over an internal Docker network.',
  },
  {
    id: 'q5',
    question: 'A Docker tag like `myapp:1.2.0` is most similar to which Git concept?',
    options: [
      'A branch',
      'A merge request',
      'A release tag pointing to a specific commit',
      'A .gitignore file',
    ],
    correct: 2,
    explanation: 'Just like a Git tag points to a specific commit, a Docker tag points to a specific built image — a frozen snapshot of your app + runtime + OS.',
  },
];

export const dockerTopic: Topic = {
  slug: 'docker',
  title: 'Docker',
  description: 'Containers, images, volumes, and everything you need to ship .NET apps consistently.',
  icon: '🐳',
  status: 'available',
  color: '#00d4aa',
  sections: [
    {
      id: 'notes',
      title: 'Notes',
      content: [
        { type: 'text', text: 'This content was largely taken from the free course "Docker Full Course For .NET Developers" by Julio Casal. All credit goes to the original author.' },
      ],
    },
    {
      id: 'why-docker',
      title: 'Why Docker?',
      content: [
        { type: 'text', text: 'Shipping a .NET application used to mean dealing with environment drift — the classic "it works on my machine" problem. Docker solves this by packaging your app and its entire runtime into a single, portable unit called a container.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '🔁', title: 'Reproducible builds', description: 'Same runtime, same OS settings, every time — dev, staging, prod.', color: '#00d4aa' },
            { icon: '🚀', title: 'Faster onboarding', description: 'New devs clone the repo, run docker compose up, and they\'re live.', color: '#4f8ef7' },
            { icon: '📦', title: 'Portable artifact', description: 'One image runs anywhere Docker is installed, no manual setup.', color: '#a78bfa' },
            { icon: '🔗', title: 'CI/CD friendly', description: 'Build once, push to registry, deploy anywhere — pipelines love containers.', color: '#f7a24f' },
          ],
        },
      ],
    },
    {
      id: 'problems-bare-metal',
      title: 'Problems with Bare-Metal',
      content: [
        { type: 'text', text: 'A bare-metal deployment means installing your app directly on physical hardware with no virtualization. It sounds simple, but in practice it creates a long list of pain points:' },
        {
          type: 'list',
          items: [
            'OS / .NET runtime version mismatch between machines',
            'Missing files, certificates, or environment variables',
            'Dependency conflicts when apps share the same server',
            'Hardcoded paths that break in different environments',
            'Port conflicts between co-located services',
            'Environment drift — prod behaves differently than dev',
            'Slow provisioning and painful rollbacks',
          ],
        },
      ],
    },
    {
      id: 'vms-vs-containers',
      title: 'VMs vs Containers',
      content: [
        { type: 'text', text: 'Virtual Machines isolate apps at the OS level — each VM gets its own full kernel. That\'s powerful, but expensive. Containers share the host OS kernel and isolate only the application layer.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '🖥️', title: 'Virtual Machines', description: 'Full OS per app. High RAM/disk overhead. Slow startup. Great for full OS isolation or custom kernel needs.', color: '#f74f4f' },
            { icon: '📦', title: 'Containers', description: 'Shared OS kernel. Minimal overhead. Starts in seconds. Perfect for app packaging and runtime isolation.', color: '#00d4aa' },
          ],
        },
        { type: 'callout', variant: 'tip', text: 'Use containers for your apps. Use VMs when you need a completely different OS, custom kernel modules, or hardware-level isolation.' },
      ],
    },
    {
      id: 'images-vs-containers',
      title: 'Images vs Containers',
      content: [
        { type: 'text', text: 'This is the most fundamental concept in Docker. Understanding the difference between an image and a container unlocks everything else.' },
        { type: 'interactive', component: 'image-container-viz' },
        { type: 'heading', level: 3, text: 'Images — The Blueprint' },
        { type: 'text', text: 'An image is a static, immutable file containing everything needed to run an application: code, runtime, libraries, configuration. You build it once. It never changes. It can be shared via a registry like Docker Hub.' },
        { type: 'heading', level: 3, text: 'Containers — The Live Process' },
        { type: 'text', text: 'A container is the live execution of an image. Docker creates an isolated instance with its own writable layer, RAM allocation, and process space. You can run 10 identical containers from a single image simultaneously.' },
        { type: 'callout', variant: 'info', text: 'Think of it like baking: the recipe (image) is immutable, but you can bake as many cakes (containers) from it as you want. Each cake is independent — burning one doesn\'t ruin the recipe.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '1️⃣', title: 'Image → 1 Container', description: 'Each container executes exactly one image. You cannot mix two images into one container.', color: '#4f8ef7' },
            { icon: '♾️', title: '1 Image → N Containers', description: 'One image can spawn 10, 100, or 1000 identical containers running in parallel.', color: '#00d4aa' },
            { icon: '🔗', title: 'Layered by design', description: 'Images stack on each other (e.g., .NET on top of Linux), but the result is one unified image.', color: '#a78bfa' },
          ],
        },
      ],
    },
    {
      id: 'docker-architecture',
      title: 'Docker Architecture',
      content: [
        { type: 'text', text: 'Docker follows a client-server architecture. When you type a command in the terminal, here\'s what happens behind the scenes:' },
        {
          type: 'concept-grid',
          items: [
            { icon: '💻', title: 'Docker CLI', description: 'The command-line tool you type into. Sends instructions to the Docker Engine via REST API.', color: '#4f8ef7' },
            { icon: '⚙️', title: 'Docker Engine', description: 'Receives CLI requests, validates them, and coordinates the Daemon.', color: '#00d4aa' },
            { icon: '🛠️', title: 'Docker Daemon (dockerd)', description: 'The background service that actually builds images, runs containers, and manages storage and networking.', color: '#a78bfa' },
          ],
        },
        { type: 'callout', variant: 'info', text: 'On Windows, Docker typically runs Linux containers via WSL2 (Windows Subsystem for Linux). Docker Desktop abstracts this — you interact through the CLI or UI without thinking about WSL2 directly.' },
      ],
    },
    {
      id: 'docker-tags',
      title: 'Docker Tags',
      content: [
        { type: 'text', text: 'Docker tags work like version labels for your images — letting you track exactly which build you\'re running, just like Git tags track source code versions.' },
        {
          type: 'concept-grid',
          items: [
            { icon: '📌', title: 'Git commit', description: 'A specific snapshot of your source code', color: '#4f8ef7' },
            { icon: '🏷️', title: 'Docker image', description: 'A specific snapshot of your app + runtime + OS', color: '#00d4aa' },
            { icon: '🔖', title: 'Git tag (v1.2.0)', description: 'Points to a specific commit in history', color: '#a78bfa' },
            { icon: '🏷️', title: 'Docker tag (myapp:1.2.0)', description: 'Points to a specific built image', color: '#f7a24f' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Tagging examples',
          code: `# Build with a version tag
docker build -t myapi:1.2.0 .

# Tag as latest too
docker tag myapi:1.2.0 myapi:latest

# Push to Docker Hub
docker push myusername/myapi:1.2.0

# Pull a specific version
docker pull myusername/myapi:1.2.0`,
        },
        { type: 'callout', variant: 'warning', text: 'Avoid using :latest in production. Always pin to a specific version tag so you know exactly what\'s running and can roll back safely.' },
      ],
    },
    {
      id: 'port-mapping',
      title: 'Port Mapping',
      content: [
        { type: 'text', text: 'Containers are isolated — they have their own internal network. To reach a service inside a container from your browser or another service, you need to map a host port to a container port.' },
        { type: 'interactive', component: 'port-mapper' },
        { type: 'text', text: 'The -p flag uses the format Host:Container. Traffic flows from outside your machine → host port → container port → your app.' },
        {
          type: 'code',
          language: 'bash',
          label: 'Port mapping examples',
          code: `# Map host 8080 to container 80
docker run -p 8080:80 nginx

# Map host 5000 to container 8080 (.NET API)
docker run -p 5000:8080 myapi:latest

# Multiple port mappings
docker run -p 8080:80 -p 8443:443 myapp:latest

# Bind to specific host interface only
docker run -p 127.0.0.1:8080:80 nginx`,
        },
        { type: 'callout', variant: 'tip', text: 'Mental model: Host port = "street address" (what the outside world sees). Container port = "room number" (where your app actually lives inside).' },
      ],
    },
    {
      id: 'volumes',
      title: 'Docker Volumes',
      content: [
        { type: 'text', text: 'Containers are ephemeral — delete a container and everything in it disappears. For anything that needs to outlive a container (database data, uploaded files, logs), you use Volumes.' },
        { type: 'callout', variant: 'danger', text: 'Without a volume, deleting a container deletes ALL its data. For SQL Server in Docker, always attach a volume for your data files.' },
        { type: 'text', text: 'A volume is a special directory that lives outside the container\'s writable layer — managed by Docker on the host. New containers can mount the same volume and access existing data seamlessly.' },
        {
          type: 'code',
          language: 'bash',
          label: 'Volume examples',
          code: `# Create a named volume
docker volume create mydb-data

# Run SQL Server with a volume
docker run -e 'ACCEPT_EULA=Y' -e 'SA_PASSWORD=YourStr0ng!' \\
  -p 1433:1433 \\
  -v mydb-data:/var/opt/mssql \\
  mcr.microsoft.com/mssql/server:2022-latest

# List volumes
docker volume ls

# Inspect a volume (shows host path)
docker volume inspect mydb-data`,
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💾', title: 'Named volumes', description: 'Managed by Docker. Best for databases and shared state between containers.', color: '#00d4aa' },
            { icon: '📁', title: 'Bind mounts', description: 'Mount a specific host directory into the container. Great for dev hot-reload workflows.', color: '#4f8ef7' },
            { icon: '🗄️', title: 'tmpfs mounts', description: 'In-memory storage only. Fast but non-persistent. Good for sensitive temporary data.', color: '#a78bfa' },
          ],
        },
      ],
    },
    {
      id: 'docker-compose',
      title: 'Docker Compose',
      content: [
        { type: 'text', text: 'When your app has multiple services — a .NET API + SQL Server + Redis — Docker Compose lets you define them all in a single YAML file and start everything with one command.' },
        {
          type: 'code',
          language: 'yaml',
          label: 'docker-compose.yml — .NET API + SQL Server',
          code: `version: '3.9'

services:
  api:
    build: .
    ports:
      - "8080:8080"
    environment:
      - ConnectionStrings__Default=Server=db;Database=MyApp;User=sa;Password=YourStr0ng!
    depends_on:
      - db

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      - ACCEPT_EULA=Y
      - SA_PASSWORD=YourStr0ng!
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
          label: 'Compose commands',
          code: `# Start all services (detached mode)
docker compose up -d

# View logs for all services
docker compose logs -f

# Stop and remove containers
docker compose down

# Stop and remove containers + volumes (careful!)
docker compose down -v`,
        },
      ],
    },
    {
      id: 'dotnet-images',
      title: 'Creating .NET Docker Images',
      content: [
        { type: 'text', text: '.NET developers have two main paths for creating Docker images. Both are production-viable — the right choice depends on your workflow and how much control you need.' },
        { type: 'heading', level: 3, text: 'Option 1 — Dockerfile' },
        { type: 'text', text: 'A Dockerfile is a script that defines exactly how to build your image. You have full control over every layer, base image, and environment variable.' },
        {
          type: 'code',
          language: 'dockerfile',
          label: 'Dockerfile — Multistage .NET 9',
          code: `# Build stage — includes full SDK
FROM mcr.microsoft.com/dotnet/sdk:9.0 AS build
WORKDIR /app

COPY *.csproj .
RUN dotnet restore

COPY . .
RUN dotnet publish -c Release -o /out

# Runtime stage — smaller final image, no SDK
FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=build /out .

EXPOSE 8080
ENTRYPOINT ["dotnet", "MyApi.dll"]`,
        },
        { type: 'heading', level: 3, text: 'Option 2 — .NET SDK (dotnet publish)' },
        { type: 'text', text: 'Since .NET 7, the SDK can build Docker images directly without a Dockerfile. It uses Chiseled Ubuntu base images and sensible defaults that follow best practices out of the box.' },
        {
          type: 'code',
          language: 'bash',
          label: '.NET SDK image creation',
          code: `# Build and push directly to Docker Hub
dotnet publish --os linux --arch x64 \\
  /t:PublishContainer \\
  -p ContainerImageName=myusername/myapi \\
  -p ContainerImageTag=1.0.0

# Or publish to local Docker daemon
dotnet publish --os linux --arch x64 \\
  /t:PublishContainer`,
        },
        { type: 'callout', variant: 'tip', text: 'Use the SDK approach for quick internal builds. Use a Dockerfile when you need fine-grained control: custom base images, multi-architecture builds, or complex environment setup.' },
      ],
    },
  ],
};
