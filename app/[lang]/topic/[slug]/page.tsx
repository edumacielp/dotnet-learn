import { notFound } from 'next/navigation';
import { getTopicContent, getTopicQuiz } from '@/lib/content';
import { getTranslation } from '@/lib/i18n';
import Sidebar from '@/components/layout/Sidebar';
import ContentRenderer from '@/components/content/ContentRenderer';
import QuizSection from '@/components/interactive/QuizSection';

interface Props {
  params: Promise<{ lang: string; slug: string }>;
}

export default async function TopicPage({ params }: Props) {
  const { lang, slug } = await params;
  const validLangs = ['en', 'pt-br'];
  const activeLang = validLangs.includes(lang) ? lang : 'en';

  const [topic, quiz] = await Promise.all([
    getTopicContent(slug, activeLang),
    getTopicQuiz(slug, activeLang),
  ]);

  if (!topic) notFound();

  const t = getTranslation(activeLang);

  return (
    <div className="topic-root" style={{ minHeight: 'calc(100vh - 56px)' }}>
      <style>{`
        .topic-root { display: block; }
        .topic-sidebar { display: none; }
        .topic-main { display: block; }
        .topic-hero { padding: 1.5rem 1rem 1rem; }
        .topic-content { padding: 0 1rem 2.5rem; }
        .right-col { display: none; }

        @media (min-width: 880px) {
          .topic-root { display: flex; }
          .topic-sidebar { display: block; width: 240px; flex-shrink: 0; }
          .topic-main { flex: 1; min-width: 0; overflow-x: hidden; }
          .topic-hero { padding: 2.5rem 2.5rem 2rem; }
          .topic-content { padding: 0 2.5rem 4rem; }
          .right-col { display: block; width: 200px; flex-shrink: 0; }
        }
      `}</style>
      {/* Sidebar */}
      <div className="topic-sidebar">
        <Sidebar
          sections={topic.sections}
          lang={activeLang}
          topicSlug={slug}
          tocLabel={t.topic.tableOfContents}
        />
      </div>

      {/* Main content */}
      <div className="topic-main" style={{ flex: 1, minWidth: 0, overflowX: 'hidden' }}>
        {/* Topic hero */}
        <div className="topic-hero" style={{
          borderBottom: '1px solid var(--border)',
          background: 'var(--bg-surface)',
          position: 'relative',
          overflow: 'hidden',
        }}>
          {/* Background glow */}
          <div style={{
            position: 'absolute', top: '-60px', right: '-60px',
            width: '300px', height: '300px',
            background: `radial-gradient(ellipse, ${topic.color}10 0%, transparent 70%)`,
            pointerEvents: 'none',
          }} />

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', position: 'relative' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '12px', flexShrink: 0,
              background: `${topic.color}15`,
              border: `1px solid ${topic.color}35`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.6rem',
            }}>
              {topic.icon}
            </div>
            <div>
              {/* Breadcrumb */}
              <div style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '0.72rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.04em',
                marginBottom: '0.4rem',
              }}>
                dotnet.learn
                <span style={{ color: 'var(--border)', margin: '0 6px' }}>/</span>
                <span style={{ color: topic.color }}>{topic.title.toLowerCase()}</span>
              </div>

              <h1 style={{
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                fontWeight: 700,
                color: 'var(--text-primary)',
                margin: '0 0 0.5rem',
                letterSpacing: '-0.02em',
              }}>
                {topic.title}
              </h1>

              <p style={{
                fontSize: '0.9rem', color: 'var(--text-secondary)',
                fontFamily: 'Outfit, sans-serif', lineHeight: 1.6,
                margin: 0, maxWidth: '520px',
              }}>
                {topic.description}
              </p>

              {/* Meta row */}
              <div style={{
                display: 'flex', gap: '1rem', flexWrap: 'wrap',
                marginTop: '1rem',
              }}>
                {[
                  { label: activeLang === 'pt-br' ? 'seções' : 'sections', value: topic.sections.length.toString() },
                  { label: activeLang === 'pt-br' ? 'quiz' : 'quiz', value: `${quiz.length} ${activeLang === 'pt-br' ? 'questões' : 'questions'}` },
                  { label: activeLang === 'pt-br' ? 'interativo' : 'interactive', value: '2' },
                ].map((m) => (
                  <div
                    key={m.label}
                    style={{
                      fontFamily: 'IBM Plex Mono, monospace',
                      fontSize: '0.72rem',
                      color: 'var(--text-muted)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: '6px',
                      padding: '3px 10px',
                      display: 'flex', alignItems: 'center', gap: '5px',
                    }}
                  >
                    <span style={{ color: topic.color }}>{m.value}</span>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sections content */}
        <div className="topic-content">
          {topic.sections.map((section) => (
            <section
              key={section.id}
              id={section.id}
              style={{
                paddingTop: '3rem',
                scrollMarginTop: '80px',
              }}
            >
              {/* Section heading */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '12px',
                marginBottom: '1.25rem',
              }}>
                <div style={{
                  width: '4px', height: '24px', borderRadius: '2px',
                  background: `linear-gradient(to bottom, ${topic.color}, transparent)`,
                  flexShrink: 0,
                }} />
                <h2 style={{
                  fontFamily: 'IBM Plex Mono, monospace',
                  fontSize: '1.2rem', fontWeight: 700,
                  color: 'var(--text-primary)',
                  margin: 0,
                  letterSpacing: '-0.01em',
                }}>
                  {section.title}
                </h2>
              </div>

              <ContentRenderer blocks={section.content} t={t} />

              {/* Section divider */}
              <div style={{
                marginTop: '2.5rem',
                height: '1px',
                background: 'linear-gradient(90deg, var(--border), transparent)',
              }} />
            </section>
          ))}

          {/* Quiz */}
          {quiz.length > 0 && (
            <div style={{ paddingTop: '3rem', scrollMarginTop: '80px' }}>
              <QuizSection questions={quiz} t={t.topic} />
            </div>
          )}
        </div>
      </div>

      {/* Right column — On this page (desktop) */}
      <div className="right-col" />
    </div>
  );
}
