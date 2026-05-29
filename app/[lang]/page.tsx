import Link from 'next/link';
import { ALL_TOPICS } from '@/lib/content';
import { getTranslation } from '@/lib/i18n';
import TopicCard from '@/components/content/TopicCard';

interface Props {
  params: Promise<{ lang: string }>;
}

export default async function HomePage({ params }: Props) {
  const { lang } = await params;
  const validLangs = ['en', 'pt-br'];
  const activeLang = validLangs.includes(lang) ? lang : 'en';
  const t = getTranslation(activeLang);

  return (
    <div
      className="grid-bg"
      style={{ minHeight: 'calc(100vh - 56px)', position: 'relative' }}
    >
      {/* Ambient glow blobs */}
      <div style={{
        position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)',
        width: '600px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(0,212,170,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', top: '200px', right: '5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(ellipse, rgba(79,142,247,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{
        maxWidth: '960px', margin: '0 auto', padding: '5rem 1.5rem 4rem', position: 'relative',
      }}>
        {/* Hero */}
        <div style={{ marginBottom: '4rem' }}>
          {/* Version badge */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            background: 'var(--bg-card)', border: '1px solid var(--border)',
            borderRadius: '20px', padding: '4px 14px',
            marginBottom: '2rem',
          }}>
            <span style={{
              width: '6px', height: '6px', borderRadius: '50%',
              background: 'var(--accent-primary)',
              display: 'inline-block',
              boxShadow: '0 0 6px var(--accent-primary)',
            }} />
            <span style={{
              fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.72rem',
              color: 'var(--text-muted)', letterSpacing: '0.04em',
            }}>
              {activeLang === 'pt-br' ? 'em construção · contribua no GitHub' : 'work in progress · share!'}
            </span>
          </div>

          <h1 style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.03em',
            marginBottom: '1.25rem',
          }}>
            <span style={{ color: 'var(--text-primary)' }}>
              {activeLang === 'pt-br' ? 'Aprenda ' : 'Learn '}
            </span>
            <span style={{
              background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
              .NET
            </span>
            <br />
            <span style={{ color: 'var(--text-primary)' }}>
              {activeLang === 'pt-br' ? 'como profissional' : 'like a professional'}
            </span>
          </h1>

          <p style={{
            fontSize: '1.05rem',
            color: 'var(--text-secondary)',
            maxWidth: '580px',
            lineHeight: 1.75,
            fontFamily: 'Outfit, sans-serif',
            marginBottom: '2rem',
          }}>
            {t.home.subtitle}
          </p>

          {/* Stats strip */}
          <div style={{
            display: 'flex', gap: '2rem', flexWrap: 'wrap',
          }}>
            {[
              { label: activeLang === 'pt-br' ? 'tópicos' : 'topics', value: ALL_TOPICS.length.toString() },
              { label: activeLang === 'pt-br' ? 'disponível agora' : 'available now', value: ALL_TOPICS.filter((t) => t.status === 'available').length.toString() },
              { label: activeLang === 'pt-br' ? 'idiomas' : 'languages', value: '2' },
              { label: activeLang === 'pt-br' ? 'quizzes interativos' : 'interactive quizzes', value: '✓' },
            ].map((stat) => (
              <div key={stat.label}>
                <span style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '1.25rem', fontWeight: 700,
                  color: 'var(--accent-primary)',
                  display: 'block',
                }}>
                  {stat.value}
                </span>
                <span style={{
                  fontSize: '0.775rem', color: 'var(--text-muted)',
                  fontFamily: 'Outfit, sans-serif',
                }}>
                  {stat.label}
                </span>
              </div>
            ))}
          </div>

          {/* LinkedIn highlight */}
          <div style={{
            marginTop: '3rem', padding: '1.8rem', borderRadius: '28px',
            border: '1px solid rgba(79, 142, 247, 0.18)',
            background: 'linear-gradient(180deg, rgba(4, 4, 10, 0.95), rgba(10, 12, 28, 0.95))',
            boxShadow: '0 25px 75px rgba(0, 0, 0, 0.2)',
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ minWidth: 0 }}>
                <span style={{
                  display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
                  fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem',
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: 'var(--accent-secondary)',
                }}>
                  {t.home.linkedin.label}
                </span>
                <h2 style={{
                  marginTop: '0.85rem', fontSize: '1.6rem', lineHeight: 1.15,
                  fontWeight: 700, color: 'var(--text-primary)',
                  maxWidth: '680px',
                }}>
                  {t.home.linkedin.title}
                </h2>
                <p style={{
                  marginTop: '1rem', maxWidth: '680px',
                  color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.75,
                }}>
                  {t.home.linkedin.description}
                </p>
              </div>
              <a
                href="https://www.linkedin.com/posts/edumacielp_ol%C3%A1-linkedin-durante-minha-carreira-como-ugcPost-7464730256097124352-cg5X/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEDP0eQB7DZLHstGqgINSKU8U4UhZHQ1hAY"
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                  padding: '0.95rem 1.4rem', borderRadius: '999px',
                  background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
                  color: '#070a13', fontWeight: 700, textDecoration: 'none',
                  boxShadow: '0 18px 40px rgba(0, 212, 170, 0.15)',
                  whiteSpace: 'nowrap',
                }}
              >
                {t.home.linkedin.cta}
              </a>
            </div>

            <div style={{
              marginTop: '1.75rem', padding: '1.25rem 1.3rem', borderRadius: '22px',
              background: 'rgba(5, 8, 18, 0.95)', border: '1px solid var(--border)',
            }}>
              <p style={{
                color: 'var(--text-secondary)', fontSize: '0.98rem', lineHeight: 1.8,
              }}>
                {t.home.linkedin.quote}
              </p>
              <div style={{
                marginTop: '1rem', display: 'flex', alignItems: 'center', gap: '0.65rem',
                color: 'var(--text-muted)', fontSize: '0.85rem',
              }}>
                <span style={{
                  width: '10px', height: '10px', borderRadius: '999px',
                  background: 'linear-gradient(180deg, #0a66c2, #00d4aa)',
                  boxShadow: '0 0 12px rgba(0, 212, 170, 0.25)',
                  display: 'inline-block',
                }} />
                <span>LinkedIn · May 2026</span>
              </div>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '2.5rem',
        }}>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem',
            color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            {activeLang === 'pt-br' ? 'tópicos' : 'topics'}
          </span>
          <div style={{ flex: 1, height: '1px', background: 'var(--border)' }} />
        </div>

        {/* Topic grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1rem',
        }}>
          {ALL_TOPICS.map((topic) => {
            const info = topic[activeLang as 'en' | 'pt-br'] ?? topic.en;
            const isAvailable = topic.status === 'available';

            return isAvailable ? (
              <Link
                key={topic.slug}
                href={`/${activeLang}/topic/${topic.slug}`}
                style={{ textDecoration: 'none' }}
              >
                <TopicCard
                  icon={topic.icon}
                  title={info.title}
                  description={info.description}
                  color={topic.color}
                  status={topic.status}
                  ctaLabel={t.home.explore}
                />
              </Link>
            ) : (
              <TopicCard
                key={topic.slug}
                icon={topic.icon}
                title={info.title}
                description={info.description}
                color={topic.color}
                status={topic.status}
                ctaLabel={t.home.comingSoon}
              />
            );
          })}
        </div>

        {/* Footer note */}
        <div style={{
          marginTop: '5rem', paddingTop: '2rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{
            fontSize: '0.8rem', color: 'var(--text-muted)',
            fontFamily: 'Outfit, sans-serif',
          }}>
            {activeLang === 'pt-br'
              ? 'Feito por um dev .NET, para devs .NET! Compartilhe no LinkedIn e contribua no GitHub ✦'
              : 'Built by a .NET dev, for .NET devs! Share it on LinkedIn and contribute on GitHub ✦'}
          </p>
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem',
            color: 'var(--accent-primary)',
          }}>
            dotnet<span style={{ color: 'var(--text-muted)' }}>.learn</span>
          </span>
        </div>
      </div>
    </div>
  );
}
