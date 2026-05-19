'use client';
import { useState } from 'react';

interface Props {
  code: string;
  language: string;
  label?: string;
}

const languageColors: Record<string, string> = {
  bash: '#00d4aa',
  yaml: '#f7a24f',
  dockerfile: '#4f8ef7',
  csharp: '#a78bfa',
  json: '#f7a24f',
};

export default function CodeBlock({ code, language, label }: Props) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const color = languageColors[language] ?? 'var(--text-muted)';

  return (
    <div style={{
      margin: '1.25rem 0',
      borderRadius: '10px',
      border: '1px solid var(--border)',
      overflow: 'hidden',
      background: 'var(--bg-card)',
    }}>
      {/* Header bar */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.5rem 1rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(255,255,255,0.02)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.7rem',
            color,
            padding: '2px 6px',
            borderRadius: '4px',
            background: `${color}18`,
            border: `1px solid ${color}30`,
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}>
            {language}
          </span>
          {label && (
            <span style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              fontFamily: 'Outfit, sans-serif',
            }}>
              {label}
            </span>
          )}
        </div>
        <button
          onClick={copy}
          style={{
            background: 'none',
            border: '1px solid var(--border)',
            borderRadius: '5px',
            padding: '3px 8px',
            cursor: 'pointer',
            fontSize: '0.7rem',
            fontFamily: 'IBM Plex Mono, monospace',
            color: copied ? 'var(--accent-primary)' : 'var(--text-muted)',
            transition: 'all 0.15s ease',
          }}
        >
          {copied ? '✓ copied' : 'copy'}
        </button>
      </div>

      {/* Code content */}
      <pre style={{
        margin: 0,
        padding: '1rem 1.25rem',
        overflowX: 'auto',
        fontSize: '0.82rem',
        lineHeight: 1.7,
        fontFamily: 'IBM Plex Mono, monospace',
        color: 'var(--text-primary)',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  );
}
