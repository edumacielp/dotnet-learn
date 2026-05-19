'use client';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
  currentLang: string;
}

export default function LanguageSwitcher({ currentLang }: Props) {
  const pathname = usePathname();
  const router = useRouter();

  const switchTo = (newLang: string) => {
    const newPath = pathname.replace(`/${currentLang}`, `/${newLang}`);
    router.push(newPath);
  };

  return (
    <div className="flex items-center gap-[2px] p-[3px] rounded-lg" style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}>
      {(['en', 'pt-br'] as const).map((lang) => (
        <button
          key={lang}
          onClick={() => switchTo(lang)}
          className="rounded-md text-xs font-medium cursor-pointer"
          style={{
            padding: '4px 10px',
            border: 'none',
            fontFamily: 'IBM Plex Mono, monospace',
            letterSpacing: '0.02em',
            background: currentLang === lang ? 'var(--accent-primary)' : 'transparent',
            color: currentLang === lang ? '#000' : 'var(--text-muted)',
            transition: 'all 0.2s ease',
          }}
        >
          {lang === 'en' ? 'EN' : 'PT'}
        </button>
      ))}
    </div>
  );
}
