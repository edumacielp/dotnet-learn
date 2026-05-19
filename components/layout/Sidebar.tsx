'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import type { Topic } from '@/types';

interface Props {
  sections: Topic['sections'];
  lang: string;
  topicSlug: string;
  tocLabel: string;
}

export default function Sidebar({ sections, lang, topicSlug, tocLabel }: Props) {
  const pathname = usePathname();

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <aside style={{
      position: 'sticky',
      top: '56px',
      height: 'calc(100vh - 56px)',
      width: '240px',
      flexShrink: 0,
      borderRight: '1px solid var(--border)',
      padding: '1.5rem 0',
      overflowY: 'auto',
      background: 'var(--bg-surface)',
    }}>
      {/* Back link */}
      <div style={{ padding: '0 1rem 1rem' }}>
        <Link
          href={`/${lang}`}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.8rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontFamily: 'IBM Plex Mono, monospace',
            marginBottom: '1.5rem',
          }}
        >
          ← {lang === 'pt-br' ? 'Tópicos' : 'All topics'}
        </Link>

        <p style={{
          fontSize: '0.7rem',
          fontFamily: 'IBM Plex Mono, monospace',
          color: 'var(--text-muted)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: '0.75rem',
        }}>
          {tocLabel}
        </p>
      </div>

      <nav>
        {sections.map((section) => (
          <button
            key={section.id}
            onClick={() => scrollTo(section.id)}
            style={{
              display: 'block',
              width: '100%',
              textAlign: 'left',
              padding: '0.4rem 1rem',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.825rem',
              color: 'var(--text-secondary)',
              fontFamily: 'Outfit, sans-serif',
              transition: 'color 0.15s ease',
              borderLeft: '2px solid transparent',
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLButtonElement).style.color = 'var(--text-primary)';
              (e.target as HTMLButtonElement).style.borderLeftColor = 'var(--accent-primary)';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLButtonElement).style.color = 'var(--text-secondary)';
              (e.target as HTMLButtonElement).style.borderLeftColor = 'transparent';
            }}
          >
            {section.title}
          </button>
        ))}
        <button
          onClick={() => scrollTo('quiz')}
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'left',
            padding: '0.4rem 1rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.825rem',
            color: 'var(--accent-primary)',
            fontFamily: 'Outfit, sans-serif',
            transition: 'color 0.15s ease',
            borderLeft: '2px solid transparent',
            marginTop: '0.5rem',
          }}
        >
          {lang === 'pt-br' ? '✦ Quiz' : '✦ Quiz'}
        </button>
      </nav>
    </aside>
  );
}
