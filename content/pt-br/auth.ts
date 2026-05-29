import type { Topic, QuizQuestion } from '@/types';

export const authQuizPtBr: QuizQuestion[] = [
  {
    id: 'auth1',
    question: 'Por que armazenar um JWT no localStorage é arriscado?',
    options: [
      'localStorage é lento demais para operações com tokens',
      'JavaScript pode ler o localStorage — um ataque XSS pode roubar o token e fazer requisições como o usuário',
      'localStorage só funciona no Chrome',
      'JWTs são grandes demais para o localStorage',
    ],
    correct: 1,
    explanation: 'Qualquer JavaScript na página pode ler o localStorage — incluindo scripts maliciosos injetados via XSS. Um cookie HttpOnly resolve isso: o browser o envia automaticamente, mas nenhum JavaScript pode lê-lo.',
  },
  {
    id: 'auth2',
    question: 'Um JWT é válido por 20 minutos. O usuário faz logout após 2 minutos. Qual é o problema?',
    options: [
      'Nenhum — o token expira em 20 minutos de qualquer forma',
      'O token ainda é criptograficamente válido por mais 18 minutos e pode ser reutilizado por qualquer um que o tenha',
      'O servidor invalida automaticamente o token no logout',
      'Tokens JWT são deletados do browser no logout',
    ],
    correct: 1,
    explanation: 'JWTs são stateless — uma vez emitidos, o servidor não pode "des-assinar" eles. Se alguém copiar o token antes do logout, ele continua funcionando até expirar. Revogação por JTI (uma lista de IDs bloqueados) resolve isso: no logout, o ID único do token é adicionado a uma lista verificada em cada requisição.',
  },
  {
    "id": "auth3",
    "question": "O que é um ataque CSRF, e por que é um problema em grande parte resolvido em apps modernos?",
    "options": [
      "Um atacante intercepta o tráfego de rede para roubar credenciais",
      "Um site malicioso engana seu browser para enviar requisições autenticadas — mas SameSite=Lax bloqueia isso automaticamente para navegações cross-site",
      "Um atacante força bruta o hash da sua senha",
      "Um script injetado na sua página para roubar tokens"
    ],
    "correct": 1,
    "explanation": "CSRF funciona porque browsers anexam cookies automaticamente às requisições. SameSite=Lax (o padrão dos browsers desde 2020) impede cookies de serem enviados em requisições POST, PUT e DELETE cross-site — cobrindo praticamente todos os vetores de CSRF sem nenhum código extra."
  },
  {
    "id": "auth4",
    "question": "Quando SameSite=Lax NÃO protege contra CSRF, e o que fazer?",
    "options": [
      "Nunca protege — você sempre precisa de um nonce manual",
      "Quando seu frontend e API estão em domínios completamente diferentes (ex: app.com → api.outroDominio.com), exigindo SameSite=None — nesse caso, adicione uma verificação de header customizado",
      "SameSite=Lax só funciona no Chrome",
      "Quando se usa HTTPS — troque para SameSite=Strict"
    ],
    "correct": 1,
    "explanation": "SameSite=Lax cobre requisições same-site (incluindo subdomínios que compartilham o mesmo domínio registrável). Se seu frontend e API são realmente cross-domain e você precisa usar SameSite=None, cookies cross-site voltam — e você precisa de uma defesa manual como um header customizado (ex: X-Requested-With)."
  },
  {
    id: 'auth5',
    question: 'Por que o refresh de token deve acontecer proativamente (antes de expirar) e não reativamente (após um 401)?',
    options: [
      'O refresh proativo é exigido pela especificação JWT',
      'O refresh reativo causa uma requisição falha para o usuário — uma interrupção breve mas perceptível. O refresh proativo é invisível.',
      'Tokens não podem ser renovados após uma resposta 401',
      'O servidor deleta tokens expirados imediatamente',
    ],
    correct: 1,
    explanation: 'Se você esperar por um 401, a requisição do usuário falha primeiro, depois você renova, depois tenta novamente — um solavanco visível. O refresh proativo (ex: quando restam 5 minutos) mantém a experiência contínua. O usuário nunca vê um erro de auth.',
  },
];

export const authTopicPtBr: Topic = {
  slug: 'auth',
  title: 'Auth',
  description: 'JWT, cookies, revogação de tokens e como proteger sua API .NET dos ataques de autenticação mais comuns.',
  icon: '🔐',
  status: 'available',
  color: '#f7c948',
  sections: [
    {
      id: 'the-analogy',
      title: 'O Panorama — Analogia da Balada',
      content: [
        {
          type: 'text',
          text: 'Antes de qualquer código, aqui está todo o fluxo de auth em uma única analogia. Tudo mais neste tópico é apenas a implementação disso.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🪪', title: 'Seu ID (R.G)', description: 'O que você apresenta na porta para provar quem é. Usado em todas as requisições.', color: '#f7c948' },
            { icon: '🎫', title: 'Pulseira (JWT)', description: 'Emitida após verificar seu RG. Carimbada com seu nome, hora de expiração, número de série e selo à prova de adulteração.', color: '#f7c948' },
            { icon: '📨', title: 'Envelope lacrado (cookie HttpOnly)', description: 'A pulseira viaja dentro de um envelope lacrado que o browser gerencia. JavaScript não pode abri-lo. Ele é anexado a toda requisição automaticamente.', color: '#4f8ef7' },
            { icon: '🚫', title: 'Blacklist de números de série (revogação JTI)', description: 'Se você fizer logout ou sua conta for comprometida, o número de série da sua pulseira vai para uma lista. Mesmo uma pulseira válida é rejeitada.', color: '#f74f4f' },
            { icon: '🔄', title: 'Balcão de renovação (refresh de token)', description: 'Antes da pulseira expirar, você ganha uma nova. Número de série antigo é bloqueado, novo emitido. Sem necessidade de novo login.', color: '#00d4aa' },
            { icon: '👮', title: 'Problema de CSRF', description: 'Para ações inseguras, a equipe só permitirá autorização de pessoas conhecidas. Um agente malicioso não pode acionar uma solicitação.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Cada peça desse sistema existe para fechar um ataque específico. Remova qualquer peça e você tem uma brecha. Este tópico percorre cada uma delas.',
        },
      ],
    },
    {
      id: 'jwt',
      title: 'JWT — A Pulseira',
      content: [
        {
          type: 'text',
          text: 'Um JWT (JSON Web Token) é uma credencial auto-contida. Ele carrega claims (quem você é, suas roles, seu tenant) e uma assinatura criptográfica. O servidor pode verificá-lo sem consultar o banco — apenas matemática.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📋', title: 'Header', description: 'O algoritmo usado para assinar (ex: HS256). Codificado, não criptografado — qualquer um pode ler.', color: '#f7c948' },
            { icon: '📦', title: 'Payload (claims)', description: 'Seu ID, email, roles, expiração e o JTI (ID único do token). Codificado, não criptografado — não coloque segredos aqui.', color: '#f7c948' },
            { icon: '🔏', title: 'Assinatura', description: 'HMAC-SHA256 do header + payload, assinado com a chave secreta do servidor. Se alguém adulterar o token, a assinatura falha.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Emitindo um JWT no .NET',
          code: `var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
    new Claim(JwtRegisteredClaimNames.Email, user.Email),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // ID único do token
    new Claim("tenant_id", user.TenantId.ToString()),
};

var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!));
var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

var token = new JwtSecurityToken(
    issuer: config["Jwt:Issuer"],
    audience: config["Jwt:Audience"],
    claims: claims,
    expires: DateTime.UtcNow.AddMinutes(20),
    signingCredentials: creds
);

return new JwtSecurityTokenHandler().WriteToken(token);`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Mantenha a expiração do JWT curta — 15 a 30 minutos. Quanto mais tempo ele vive, mais tempo um token roubado é perigoso. Use refresh tokens para sessões de longa duração e transparentes.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'Cookies HttpOnly — O Envelope Lacrado',
      content: [
        {
          type: 'text',
          text: 'Você tem duas opções para armazenar um JWT no browser: localStorage ou um cookie HttpOnly. Uma delas é segura.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '❌',
              title: 'localStorage',
              description: 'JavaScript pode lê-lo. Qualquer vulnerabilidade XSS — sua ou em um script de terceiro que você carrega — pode roubar o token. Evite para auth.',
              color: '#f74f4f',
            },
            {
              icon: '✅',
              title: 'Cookie HttpOnly',
              description: 'JavaScript não pode lê-lo. O browser o envia automaticamente. Um ataque XSS não pode roubar o que não consegue ler.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Definindo o JWT como cookie HttpOnly no .NET',
          code: `// No login bem-sucedido — defina o JWT em um cookie, não no corpo da resposta
Response.Cookies.Append("auth-token", jwtString, new CookieOptions
{
    HttpOnly = true,     // JS não consegue ler
    Secure = true,       // apenas HTTPS
    SameSite = SameSiteMode.None, // necessário se frontend e API são em domínios diferentes
    Expires = DateTimeOffset.UtcNow.AddMinutes(20),
});`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Ler JWT do cookie no ASP.NET Core',
          code: `// Diga ao middleware JWT onde encontrar o token
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            // Ler token do cookie em vez do header Authorization
            OnMessageReceived = ctx =>
            {
                ctx.Token = ctx.Request.Cookies["auth-token"];
                return Task.CompletedTask;
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Secret"]!)),
            ValidateIssuer = true,
            ValidIssuer = config["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = config["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero, // sem período de graça — expirado significa expirado
        };
    });`,
        },
      ],
    },
    {
      id: 'revocation',
      title: 'Revogação JTI — The Blacklist (Lista Negra)',
      content: [
        {
          type: 'text',
          text: 'JWTs são stateless. Uma vez emitidos, o servidor não pode des-assinar eles. Se um usuário fizer logout ou tiver a conta comprometida, o token continua funcionando até expirar. A solução: uma Blacklist de IDs de tokens (JTIs) verificada em cada requisição.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Tabela de revogação + verificação com cache',
          code: `// No logout — adicione o JTI do token ao armazém de revogação
public async Task RevogarTokenAsync(string jti, DateTime expiresAt)
{
    // Salvar no banco (persistente)
    db.TokensRevogados.Add(new TokenRevogado { Jti = jti, ExpiresAt = expiresAt });
    await db.SaveChangesAsync();

    // Aquecer o cache imediatamente
    await cache.SetStringAsync(
        key: \$"revogado:{jti}",
        value: "1",
        options: new DistributedCacheEntryOptions
        {
            AbsoluteExpiration = expiresAt // auto-evict quando o token teria expirado mesmo
        }
    );
}

// Em cada requisição — verificado no evento OnTokenValidated
public async Task<bool> EstaRevogadoAsync(string jti, DateTime expiresAt)
{
    // Verificar cache primeiro (caminho rápido — in-memory, ~0ms)
    if (await cache.GetStringAsync(\$"revogado:{jti}") is not null)
        return true;

    // Cache miss — verificar banco (caminho lento — uma query indexada, ~1-3ms)
    var revogado = await db.TokensRevogados.AnyAsync(t => t.Jti == jti);

    if (revogado)
        await cache.SetStringAsync(\$"revogado:{jti}", "1",
            new DistributedCacheEntryOptions { AbsoluteExpiration = expiresAt });

    return revogado;
}`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'O cache significa que 99% das requisições nunca chegam ao banco. Apenas a primeira requisição com um token recém-revogado paga o custo de DB. Depois disso, o cache cuida até o token ter expirado — então ambas as entradas são removidas automaticamente.',
        },
      ],
    },
    {
      id: 'refresh',
      title: 'Refresh de Token — O Balcão de Renovação',
      content: [
        {
          type: 'text',
          text: 'JWTs de curta duração (20 minutos) fariam os usuários serem deslogados constantemente. O refresh resolve isso: o frontend troca um token ainda válido por um novo, silenciosamente, antes do usuário perceber qualquer coisa.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Endpoint de refresh',
          code: `app.MapPost("/api/auth/refresh", async (HttpContext ctx, ...) =>
{
    // O middleware já validou o token — se chegamos aqui, é válido
    var jti = ctx.User.FindFirstValue(JwtRegisteredClaimNames.Jti)!;
    var userId = ctx.User.FindFirstValue(JwtRegisteredClaimNames.Sub)!;
    var expiresAt = /* parse exp claim */;

    // Revogar o token antigo imediatamente
    await tokenService.RevogarTokenAsync(jti, expiresAt);

    // Emitir um novo token
    var user = await userService.GetByIdAsync(Guid.Parse(userId));
    var novoJwt = tokenService.CriarToken(user);

    // Definir o novo token como cookie
    ctx.Response.Cookies.Append("auth-token", novoJwt, /* mesmas opções */);

    return Results.Ok();
})
.RequireAuthorization(); // token ainda deve ser válido para renovar`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Renove proativamente — quando restarem ~5 minutos no token, não após um 401. Um 401 significa que a requisição do usuário já falhou. O refresh proativo é invisível para o usuário.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Lógica de refresh no frontend (TypeScript)',
          code: `// Decodificar o JWT para ler a expiração (payload é base64, não criptografado)
function getTokenExpiry(jwt: string): number {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return payload.exp * 1000; // converter para ms
}

// Chamar isso no carregamento do app e após cada refresh
function agendarRefresh(jwt: string) {
    const expiresAt = getTokenExpiry(jwt);
    const refreshAt = expiresAt - 5 * 60 * 1000; // 5 minutos antes de expirar
    const delay = refreshAt - Date.now();

    setTimeout(async () => {
        await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
        // Novo cookie é definido pelo servidor — agendar o próximo refresh
    }, delay);
}`,
        },
      ],
    },
    {
      "id": "csrf",
      "title": "CSRF — Deixe o SameSite Trabalhar por Você",
      "content": [
        {
          "type": "text",
          "text": "CSRF (Cross-Site Request Forgery - Falsificação de Requisição entre Sites) funciona porque browsers anexam cookies automaticamente a toda requisição correspondente — inclusive as disparadas por um site malicioso de terceiros. No passado, isso exigia defesas manuais como tokens nonce. Em apps modernos, o browser cuida disso por você."
        },
        {
          "type": "concept-grid",
          "items": [
            {
              "icon": "💣",
              "title": "O ataque (clássico)",
              "description": "Você está logado no seu banco. Uma página maliciosa dispara um POST para a API do banco — seu browser anexa o cookie. Se o banco aceitar, isso é CSRF.",
              "color": "#f74f4f"
            },
            {
              "icon": "🛡️",
              "title": "SameSite=Lax (defesa moderna)",
              "description": "O padrão dos browsers desde 2020. Cookies NÃO são enviados em requisições POST, PUT, DELETE ou PATCH cross-site. A requisição do site malicioso vai sem cookie — rejeitada automaticamente. Zero código necessário.",
              "color": "#00d4aa"
            }
          ]
        },
        {
          "type": "code",
          "language": "bash",
          "label": "SameSite=Lax — o padrão que protege você",
          "code": "// SameSite=Lax é o padrão do browser, mas defina explicitamente para ser claro\nResponse.Cookies.Append(\"auth-token\", jwtString, new CookieOptions\n{\n    HttpOnly = true,\n    Secure = true,\n    SameSite = SameSiteMode.Lax, // bloqueia requisições unsafe cross-site automaticamente\n    Domain = \".myapp.com\", // defina o domínio correto\n    Expires = DateTimeOffset.UtcNow.AddMinutes(20),\n});\n\n// Só isso. Sem nonce, sem filter, sem código no frontend."
        },
        {
          "type": "callout",
          "variant": "warning",
          "text": "SameSite=Lax só funciona quando seu frontend e API compartilham o mesmo domínio registrável (ex: app.meuapp.com e api.meuapp.com — ambos são meuapp.com). Se estiverem em domínios completamente diferentes e você precisar usar SameSite=None, cookies cross-site voltam e você precisa de uma defesa manual — uma verificação de header customizado (ex: exigir X-Requested-With: fetch em toda requisição unsafe)."
        },
        {
          "type": "concept-grid",
          "items": [
            {
              "icon": "✅",
              "title": "SameSite=Lax (mesmo domínio)",
              "description": "app.meusite.com → api.meusite.com. Cookies bloqueados em POSTs cross-site. CSRF resolvido automaticamente. Use sempre que possível.",
              "color": "#00d4aa"
            },
            {
              "icon": "⚠️",
              "title": "SameSite=None (cross domain)",
              "description": "app.com → api.outroDominio.com. Cookies viajam para todo lugar. Adicione requisito de header customizado: o atacante pode disparar a requisição, mas não pode definir headers customizados cross-origin.",
              "color": "#f7a24f"
            }
          ]
        }
      ]
    },
    {
      id: 'attack-summary',
      title: 'Ameaças e Defesas em um Só Lugar',
      content: [
        {
          type: 'text',
          text: 'Cada peça deste sistema de auth existe para fechar uma brecha específica. Aqui está o panorama completo:',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💉', title: 'XSS rouba o token', description: 'Defesa: cookie HttpOnly. JavaScript não consegue lê-lo, então XSS não consegue roubá-lo.', color: '#f74f4f' },
            { icon: '🌐', title: 'CSRF engana o browser', description: 'Defesa: SameSite=Lax. O browser não envia cookies em requisições POST cross-site — a requisição do atacante chega sem cookie e é rejeitada.', color: '#f7a24f' },
            { icon: '♻️', title: 'Reutilização de token após logout', description: 'Defesa: Blacklist de JTI. O logout adiciona o ID do token à lista — token rejeitado mesmo se ainda válido.', color: '#a78bfa' },
            { icon: '🖊️', title: 'Adulteração de token', description: 'Defesa: Assinatura criptográfica (HMAC-SHA256). Qualquer modificação quebra a assinatura — rejeitado imediatamente.', color: '#4f8ef7' },
            { icon: '⌛', title: 'Token roubado de longa duração', description: 'Defesa: Expiração curta (20 min) + refresh. Um token roubado é inútil após 20 minutos.', color: '#00d4aa' },
            { icon: '👥', title: 'Usuário vê dados de outro', description: 'Defesa: Claim TenantId aplicado automaticamente em toda query. Nunca confie no contexto de tenant fornecido pelo cliente.', color: '#f7c948' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'O overhead de auth é mínimo. Verificação de assinatura JWT é pura matemática CPU (~0,1ms). Verificação de revogação por cache é in-memory (~0ms). Uma query de negócio típica custa 5–50ms. Auth é ruído — não um gargalo.',
        },
      ],
    },
    {
      id: 'dotnet-setup',
      title: 'Conectando Tudo no .NET',
      content: [
        {
          type: 'text',
          text: 'Aqui está a configuração completa no Program.cs — tudo conectado na ordem certa.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setup completo de auth — Program.cs',
          code: `// 1. Adicionar autenticação JWT
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Ler token do cookie
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx =>
            {
                ctx.Token = ctx.Request.Cookies["auth-token"];
                return Task.CompletedTask;
            },

            // Verificar revogação em cada token validado
            OnTokenValidated = async ctx =>
            {
                var jti = ctx.Principal!.FindFirstValue(JwtRegisteredClaimNames.Jti)!;
                var exp = ctx.Principal.FindFirstValue(JwtRegisteredClaimNames.Exp)!;
                var expiresAt = DateTimeOffset.FromUnixTimeSeconds(long.Parse(exp)).UtcDateTime;

                var revocationService = ctx.HttpContext.RequestServices
                    .GetRequiredService<ITokenRevocationService>();

                if (await revocationService.IsRevokedAsync(jti, expiresAt))
                    ctx.Fail("Token foi revogado");
            }
        };

        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidateIssuer = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"],
            ValidateAudience = true,
            ValidAudience = builder.Configuration["Jwt:Audience"],
            ValidateLifetime = true,
            ClockSkew = TimeSpan.Zero,
        };
    });

// 2. Adicionar cache distribuído (in-memory para dev, Redis para prod)
builder.Services.AddDistributedMemoryCache();

// 3. Registrar seus serviços
builder.Services.AddScoped<ITokenRevocationService, TokenRevocationService>();

var app = builder.Build();

// 4. A ordem do middleware importa
app.UseAuthentication(); // faz parse e valida o token
app.UseAuthorization();  // aplica os atributos [Authorize]

app.Run();`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'A ordem do middleware não é opcional. `UseAuthentication` deve vir antes de `UseAuthorization`. Se estiverem na ordem errada, seus endpoints [Authorize] retornarão 401 mesmo com um token válido.',
        },
      ],
    },
  ],
};