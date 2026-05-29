import type { Topic, QuizQuestion } from '@/types';

export const authQuiz: QuizQuestion[] = [
  {
    id: 'auth1',
    question: 'Why is storing a JWT in localStorage risky?',
    options: [
      'localStorage is too slow for token operations',
      'JavaScript can read localStorage — an XSS attack could steal the token and make requests as the user',
      'localStorage only works on Chrome',
      'JWTs are too large for localStorage',
    ],
    correct: 1,
    explanation: 'Any JavaScript on the page can read localStorage — including malicious scripts injected via XSS. An HttpOnly cookie solves this: the browser sends it automatically, but no JavaScript can ever read it.',
  },
  {
    id: 'auth2',
    question: 'A JWT is valid for 20 minutes. A user logs out after 2 minutes. What is the problem?',
    options: [
      'Nothing — the token expires in 20 minutes anyway',
      'The token is still cryptographically valid for 18 more minutes and could be reused by anyone who has it',
      'The server automatically invalidates the token on logout',
      'JWT tokens are deleted from the browser on logout',
    ],
    correct: 1,
    explanation: 'JWTs are stateless — once issued, the server cannot "un-sign" them. If someone copies the token before logout, it keeps working until expiry. JTI revocation (a blacklist of token IDs) solves this: on logout, the token\'s unique ID is added to a blocklist checked on every request.',
  },
  {
    "id": "auth3",
    "question": "What is a CSRF attack, and why is it mostly a solved problem in modern apps?",
    "options": [
      "An attacker intercepts network traffic to steal credentials",
      "A malicious site tricks your browser into sending authenticated requests — but SameSite=Lax blocks this automatically for cross-site navigations",
      "An attacker brute-forces your password hash",
      "A script injected into your page to steal tokens"
    ],
    "correct": 1,
    "explanation": "CSRF works because browsers auto-attach cookies to requests. SameSite=Lax (the browser default since 2020) stops cookies from being sent on cross-site POST, PUT, and DELETE requests — which covers virtually all CSRF attack vectors without any extra code."
  },
  {
    "id": "auth4",
    "question": "When does SameSite=Lax NOT protect you from CSRF, and what should you do instead?",
    "options": [
      "It never protects you — you always need a manual nonce",
      "When your frontend and API are on completely different domains (e.g. app.com → api.otherdomain.com), requiring SameSite=None — in that case, add a custom header check",
      "SameSite=Lax only works on Chrome",
      "When using HTTPS — switch to SameSite=Strict"
    ],
    "correct": 1,
    "explanation": "SameSite=Lax covers same-site requests (including subdomains sharing the same registrable domain). If your frontend and API are truly cross-domain and you must use SameSite=None, cross-site cookies are back — and you need a manual defense like a custom header (e.g. X-Requested-With)."
  },
  {
    id: 'auth5',
    question: 'Why should token refresh happen proactively (before the token expires) rather than reactively (after a 401)?',
    options: [
      'Proactive refresh is required by the JWT specification',
      'Reactive refresh causes a failed request to the user — a brief but noticeable interruption. Proactive refresh is invisible.',
      'Tokens cannot be refreshed after a 401 response',
      'The server deletes expired tokens immediately',
    ],
    correct: 1,
    explanation: 'If you wait for a 401, the user\'s request fails first, then you refresh, then you retry — a visible hiccup. Proactive refresh (e.g. when 5 minutes remain) keeps the experience seamless. The user never sees an auth error.',
  },
];

export const authTopic: Topic = {
  slug: 'auth',
  title: 'Auth',
  description: 'JWT, cookies, token revocation, and how to protect your .NET API from the most common auth attacks.',
  icon: '🔐',
  status: 'available',
  color: '#f7c948',
  sections: [
    {
      id: 'the-analogy',
      title: 'The Big Picture — A Nightclub Analogy',
      content: [
        {
          type: 'text',
          text: 'Before any code, here is the entire auth workflow as a single analogy. Everything else in this topic is just the implementation of this.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '🪪', title: 'Your ID', description: 'What you present at the door to prove who you are. Used in every request.', color: '#f7c948' },
            { icon: '🎫', title: 'Wristband (JWT)', description: 'Issued after your ID is verified. Stamped with your name, an expiry time, a serial number, and a tamper-proof seal.', color: '#f7c948' },
            { icon: '📨', title: 'Sealed envelope (HttpOnly cookie)', description: 'The wristband travels inside a sealed envelope the browser manages. JavaScript can\'t open it. It\'s attached to every request automatically.', color: '#4f8ef7' },
            { icon: '🚫', title: 'Serial number blacklist (JTI revocation)', description: 'If you log out or your account is compromised, your wristband\'s serial number is added to a list. Even a valid-looking wristband gets rejected.', color: '#f74f4f' },
            { icon: '🔄', title: 'Renewal desk (token refresh)', description: 'Before your wristband expires, you get a new one. Old serial number is blacklisted, new one issued. No re-login needed.', color: '#00d4aa' },
            { icon: '👮', title: 'CSRF issue', description: 'For unsafe actions, staff will only allow authorization from those they know. A malicious actor cannot trigger a request.', color: '#a78bfa' },
          ],
        },
        {
          type: 'callout',
          variant: 'info',
          text: 'Every piece of this system exists to close one specific attack. Remove any piece and you have a gap. This topic walks through each one.',
        },
      ],
    },
    {
      id: 'jwt',
      title: 'JWT — The Wristband',
      content: [
        {
          type: 'text',
          text: 'A JWT (JSON Web Token) is a self-contained credential. It carries claims (who you are, your roles, your tenant) and a cryptographic signature. The server can verify it without a database lookup — just math.',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '📋', title: 'Header', description: 'The algorithm used to sign it (e.g. HS256). Encoded, not encrypted — anyone can read it.', color: '#f7c948' },
            { icon: '📦', title: 'Payload (claims)', description: 'Your user ID, email, roles, expiry, and the JTI (unique token ID). Encoded, not encrypted — don\'t put secrets here.', color: '#f7c948' },
            { icon: '🔏', title: 'Signature', description: 'HMAC-SHA256 of the header + payload, signed with your server\'s secret key. If anyone tampers with the token, the signature fails.', color: '#00d4aa' },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Issuing a JWT in .NET',
          code: `var claims = new[]
{
    new Claim(JwtRegisteredClaimNames.Sub, user.Id.ToString()),
    new Claim(JwtRegisteredClaimNames.Email, user.Email),
    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()), // unique token ID
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
          text: 'Keep JWT expiry short — 15 to 30 minutes. The longer it lives, the longer a stolen token is dangerous. Use refresh tokens for seamless long-lived sessions.',
        },
      ],
    },
    {
      id: 'cookies',
      title: 'HttpOnly Cookies — The Sealed Envelope',
      content: [
        {
          type: 'text',
          text: 'You have two choices for where to store a JWT in the browser: localStorage or an HttpOnly cookie. One of these is safe.',
        },
        {
          type: 'concept-grid',
          items: [
            {
              icon: '❌',
              title: 'localStorage',
              description: 'JavaScript can read it. Any XSS vulnerability — yours, or in a third-party script you load — can steal the token. Avoid for auth.',
              color: '#f74f4f',
            },
            {
              icon: '✅',
              title: 'HttpOnly cookie',
              description: 'JavaScript cannot read it. The browser sends it automatically. An XSS attack cannot steal what it cannot read.',
              color: '#00d4aa',
            },
          ],
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Setting the JWT as an HttpOnly cookie in .NET',
          code: `// On login success — set the JWT in a cookie, not in the response body
Response.Cookies.Append("auth-token", jwtString, new CookieOptions
{
    HttpOnly = true,     // JS cannot read this
    Secure = true,       // HTTPS only
    SameSite = SameSiteMode.None, // required if frontend and API are on different domains
    Expires = DateTimeOffset.UtcNow.AddMinutes(20),
});`,
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Read JWT from cookie in ASP.NET Core',
          code: `// Tell the JWT middleware where to find the token
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.Events = new JwtBearerEvents
        {
            // Read token from cookie instead of Authorization header
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
            ClockSkew = TimeSpan.Zero, // no grace period — expired means expired
        };
    });`,
        },
      ],
    },
    {
      id: 'revocation',
      title: 'JTI Revocation — The Blacklist',
      content: [
        {
          type: 'text',
          text: 'JWTs are stateless. Once issued, the server cannot un-sign them. If a user logs out or their account is compromised, their token keeps working until expiry. The fix: a blacklist of token IDs (JTIs) checked on every request.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Revocation table + cache check',
          code: `// On logout — add the token's JTI to the revocation store
public async Task RevokeTokenAsync(string jti, DateTime expiresAt)
{
    // Store in DB (persistent)
    db.RevokedTokens.Add(new RevokedToken { Jti = jti, ExpiresAt = expiresAt });
    await db.SaveChangesAsync();

    // Warm the cache immediately
    await cache.SetStringAsync(
        key: \$"revoked:{jti}",
        value: "1",
        options: new DistributedCacheEntryOptions
        {
            AbsoluteExpiration = expiresAt // auto-evict when token would have expired anyway
        }
    );
}

// On every request — checked in OnTokenValidated event
public async Task<bool> IsRevokedAsync(string jti, DateTime expiresAt)
{
    // Check cache first (fast path — in-memory, ~0ms)
    if (await cache.GetStringAsync(\$"revoked:{jti}") is not null)
        return true;

    // Cache miss — check DB (slow path — one indexed query, ~1-3ms)
    var revoked = await db.RevokedTokens.AnyAsync(t => t.Jti == jti);

    if (revoked)
        await cache.SetStringAsync(\$"revoked:{jti}", "1",
            new DistributedCacheEntryOptions { AbsoluteExpiration = expiresAt });

    return revoked;
}`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'The cache means 99% of requests never hit the database. Only the first request with a newly revoked token pays the DB cost. After that, the cache handles it until the token would have expired anyway — then both entries auto-evict.',
        },
      ],
    },
    {
      id: 'refresh',
      title: 'Token Refresh — The Renewal Desk',
      content: [
        {
          type: 'text',
          text: 'Short-lived JWTs (20 minutes) mean users would be logged out constantly. Refresh solves this: the frontend exchanges a still-valid token for a new one, silently, before the user notices anything.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Refresh endpoint',
          code: `app.MapPost("/api/auth/refresh", async (HttpContext ctx, ...) =>
{
    // Middleware already validated the token — if we get here, it's valid
    var jti = ctx.User.FindFirstValue(JwtRegisteredClaimNames.Jti)!;
    var userId = ctx.User.FindFirstValue(JwtRegisteredClaimNames.Sub)!;
    var expiresAt = /* parse exp claim */;

    // Revoke the old token immediately
    await tokenService.RevokeTokenAsync(jti, expiresAt);

    // Issue a new token
    var user = await userService.GetByIdAsync(Guid.Parse(userId));
    var newJwt = tokenService.CreateToken(user);

    // Set the new token as a cookie
    ctx.Response.Cookies.Append("auth-token", newJwt, /* same options */);

    return Results.Ok();
})
.RequireAuthorization(); // token must still be valid to refresh`,
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Refresh proactively — when ~5 minutes remain on the token, not after a 401. A 401 means the user\'s request already failed. Proactive refresh is invisible to the user.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Frontend refresh logic (TypeScript)',
          code: `// Decode the JWT to read the expiry (payload is base64, not encrypted)
function getTokenExpiry(jwt: string): number {
    const payload = JSON.parse(atob(jwt.split('.')[1]));
    return payload.exp * 1000; // convert to ms
}

// Call this on app load and after each refresh
function scheduleRefresh(jwt: string) {
    const expiresAt = getTokenExpiry(jwt);
    const refreshAt = expiresAt - 5 * 60 * 1000; // 5 minutes before expiry
    const delay = refreshAt - Date.now();

    setTimeout(async () => {
        await fetch('/api/auth/refresh', { method: 'POST', credentials: 'include' });
        // New cookie is set by the server — schedule the next refresh
    }, delay);
}`,
        },
      ],
    },
    {
      "id": "csrf",
      "title": "CSRF — Let SameSite Do the Work",
      "content": [
        {
          "type": "text",
          "text": "CSRF (Cross-Site Request Forgery) works because browsers attach cookies to every matching request automatically — including ones triggered by a malicious third-party site. In the past, this required manual defenses like nonce tokens. In modern apps, the browser handles it for you."
        },
        {
          "type": "concept-grid",
          "items": [
            {
              "icon": "💣",
              "title": "The attack (classic)",
              "description": "You're logged into your bank. A malicious page fires a POST to your bank's API — your browser attaches the cookie. If the bank accepts it, that's CSRF.",
              "color": "#f74f4f"
            },
            {
              "icon": "🛡️",
              "title": "SameSite=Lax (modern defense)",
              "description": "The browser default since 2020. Cookies are NOT sent on cross-site POST, PUT, DELETE, or PATCH requests. The malicious site's request goes cookieless — rejected automatically. Zero code needed.",
              "color": "#00d4aa"
            }
          ]
        },
        {
          "type": "code",
          "language": "bash",
          "label": "SameSite=Lax — the default that protects you",
          "code": "// SameSite=Lax is the browser default, but set it explicitly to be clear\nResponse.Cookies.Append(\"auth-token\", jwtString, new CookieOptions\n{\n    HttpOnly = true,\n    Secure = true,\n    SameSite = SameSiteMode.Lax, // blocks cross-site unsafe requests automatically\n    Domain = \".myapp.com\", // set the correct domain\n    Expires = DateTimeOffset.UtcNow.AddMinutes(20),\n});\n\n// That's it. No nonce, no filter, no frontend code needed."
        },
        {
          "type": "callout",
          "variant": "warning",
          "text": "SameSite=Lax only works when your frontend and API share the same registrable domain (e.g. app.myapp.com and api.myapp.com — both are myapp.com). If they're on completely different domains and you must use SameSite=None, cookies travel cross-site again and you need a manual defense — a simple custom header check (e.g. require X-Requested-With: fetch on every unsafe request)."
        },
        {
          "type": "concept-grid",
          "items": [
            {
              "icon": "✅",
              "title": "SameSite=Lax (same domain)",
              "description": "app.mysite.com → api.mysite.com. Cookies blocked on cross-site POSTs. CSRF solved automatically. Use this whenever possible.",
              "color": "#00d4aa"
            },
            {
              "icon": "⚠️",
              "title": "SameSite=None (cross domain)",
              "description": "app.com → api.otherdomain.com. Cookies travel everywhere. Add a custom header requirement: the attacker can trigger a request but can't set custom headers cross-origin.",
              "color": "#f7a24f"
            }
          ]
        }
      ]
    },
    {
      id: 'attack-summary',
      title: 'Threats & Defenses at a Glance',
      content: [
        {
          type: 'text',
          text: 'Each piece of this auth system exists to close one specific gap. Here\'s the full picture:',
        },
        {
          type: 'concept-grid',
          items: [
            { icon: '💉', title: 'XSS steals token', description: 'Defense: HttpOnly cookie. JavaScript cannot read it, so XSS cannot steal it.', color: '#f74f4f' },
            { icon: '🌐', title: 'CSRF tricks the browser', description: 'Defense: SameSite=Lax. The browser doesn\'t send cookies on cross-site POST requests — the attacker\'s request arrives cookieless and is rejected.', color: '#f7a24f' },
            { icon: '♻️', title: 'Token reuse after logout', description: 'Defense: JTI revocation blacklist. Logout adds the token ID to the blocklist — token rejected even if still valid.', color: '#a78bfa' },
            { icon: '🖊️', title: 'Token tampering', description: 'Defense: Cryptographic signature (HMAC-SHA256). Any modification breaks the signature — rejected immediately.', color: '#4f8ef7' },
            { icon: '⌛', title: 'Long-lived stolen token', description: 'Defense: Short expiry (20 min) + refresh. A stolen token is useless after 20 minutes.', color: '#00d4aa' },
            { icon: '👥', title: 'User sees another\'s data', description: 'Defense: TenantId claim auto-applied on every query. Never trust client-supplied tenant context.', color: '#f7c948' },
          ],
        },
        {
          type: 'callout',
          variant: 'tip',
          text: 'Auth overhead is minimal. JWT signature verification is pure CPU math (~0.1ms). Cache-hit revocation check is in-memory (~0ms). A typical business query costs 5–50ms. Auth is noise — not a bottleneck.',
        },
      ],
    },
    {
      id: 'dotnet-setup',
      title: 'Putting It Together in .NET',
      content: [
        {
          type: 'text',
          text: 'Here\'s the full wiring in Program.cs — everything connected in the right order.',
        },
        {
          type: 'code',
          language: 'bash',
          label: 'Complete auth setup — Program.cs',
          code: `// 1. Add JWT authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        // Read token from cookie
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = ctx =>
            {
                ctx.Token = ctx.Request.Cookies["auth-token"];
                return Task.CompletedTask;
            },

            // Check revocation on every validated token
            OnTokenValidated = async ctx =>
            {
                var jti = ctx.Principal!.FindFirstValue(JwtRegisteredClaimNames.Jti)!;
                var exp = ctx.Principal.FindFirstValue(JwtRegisteredClaimNames.Exp)!;
                var expiresAt = DateTimeOffset.FromUnixTimeSeconds(long.Parse(exp)).UtcDateTime;

                var revocationService = ctx.HttpContext.RequestServices
                    .GetRequiredService<ITokenRevocationService>();

                if (await revocationService.IsRevokedAsync(jti, expiresAt))
                    ctx.Fail("Token has been revoked");
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

// 2. Add distributed cache (in-memory for dev, Redis for prod)
builder.Services.AddDistributedMemoryCache();

// 3. Register your services
builder.Services.AddScoped<ITokenRevocationService, TokenRevocationService>();

var app = builder.Build();

// 4. Middleware order matters
app.UseAuthentication(); // parse and validate the token
app.UseAuthorization();  // enforce [Authorize] attributes

app.Run();`,
        },
        {
          type: 'callout',
          variant: 'warning',
          text: 'Middleware order is not optional. `UseAuthentication` must come before `UseAuthorization`. If you put them in the wrong order, your [Authorize] endpoints will return 401 even with a valid token.',
        },
      ],
    },
  ],
};