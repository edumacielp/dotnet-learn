'use client';
import Link from 'next/link';
import { GitPullRequest } from 'lucide-react';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

interface Props {
  lang: string;
}

export default function Header({ lang }: Props) {
  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      borderBottom: '1px solid var(--border)',
      background: 'rgba(4, 4, 10, 0.85)',
      backdropFilter: 'blur(12px)',
    }}>
      <div style={{
        maxWidth: '100%',
        padding: '0 1.5rem',
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <Link href={`/${lang}`} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'linear-gradient(135deg, var(--accent-primary), var(--accent-secondary))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '14px',
          }}>
            ⚡
          </div>
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.875rem',
            fontWeight: 600,
            color: 'var(--text-primary)',
            letterSpacing: '0.02em',
          }}>
            dotnet<span style={{ color: 'var(--accent-primary)' }}>.learn</span>
          </span>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <a
            href="https://github.com/edumacielp/dotnet-learn"
            target="_blank"
            rel="noreferrer noopener"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.9rem',
              color: 'var(--text-muted)',
              textDecoration: 'none',
              padding: '0.25rem 0.55rem',
              borderRadius: '999px',
              border: '1px solid transparent',
              transition: 'border-color 0.2s ease, color 0.2s ease',
            }}
            onMouseEnter={(event) => {
              (event.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
              (event.currentTarget as HTMLAnchorElement).style.color = 'var(--text-primary)';
            }}
            onMouseLeave={(event) => {
              (event.currentTarget as HTMLAnchorElement).style.borderColor = 'transparent';
              (event.currentTarget as HTMLAnchorElement).style.color = 'var(--text-muted)';
            }}
          >
            <GitPullRequest size={16} />
            {lang === 'pt-br' ? 'contribua' : 'contribute'}
          </a>
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
