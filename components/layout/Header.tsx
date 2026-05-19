'use client';
import Link from 'next/link';
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
          <Link href={`/${lang}`} style={{
            fontFamily: 'Outfit, sans-serif',
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            textDecoration: 'none',
          }}>
            {lang === 'pt-br' ? 'Tópicos' : 'Topics'}
          </Link>
          <div style={{ width: '1px', height: '16px', background: 'var(--border)' }} />
          <LanguageSwitcher currentLang={lang} />
        </div>
      </div>
    </header>
  );
}
