'use client';
import { useState } from 'react';
import type { I18nContent } from '@/types';

interface Props {
  t: I18nContent['interactive']['portMapper'];
}

export default function PortMapper({ t }: Props) {
  const [hostPort, setHostPort] = useState('8080');
  const [containerPort, setContainerPort] = useState('80');
  const [running, setRunning] = useState(false);
  const [showFlow, setShowFlow] = useState(false);

  const handleRun = () => {
    setRunning(true);
    setShowFlow(false);
    setTimeout(() => setShowFlow(true), 400);
  };

  const reset = () => {
    setRunning(false);
    setShowFlow(false);
  };

  return (
    <div style={{
      margin: '1.5rem 0',
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '12px',
      overflow: 'hidden',
    }}>
      {/* Header */}
      <div style={{
        padding: '0.875rem 1.25rem',
        borderBottom: '1px solid var(--border)',
        background: 'rgba(0, 212, 170, 0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{
          width: '8px', height: '8px', borderRadius: '50%',
          background: running ? '#00d4aa' : 'var(--text-muted)',
          display: 'inline-block',
          boxShadow: running ? '0 0 8px var(--accent-primary)' : 'none',
          transition: 'all 0.3s ease',
        }} />
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem', color: 'var(--accent-primary)' }}>
          {t.title}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginLeft: '4px' }}>
          — {t.subtitle}
        </span>
      </div>

      {/* Controls */}
      <div style={{ padding: '1.25rem' }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          marginBottom: '1.25rem',
        }}>
          {/* Command preview */}
          <div style={{
            flex: 1,
            minWidth: '280px',
            background: 'var(--bg-surface)',
            borderRadius: '8px',
            border: '1px solid var(--border)',
            padding: '0.75rem 1rem',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.82rem',
            color: 'var(--text-primary)',
            display: 'flex',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '4px',
          }}>
            <span style={{ color: 'var(--accent-secondary)' }}>docker run</span>
            <span style={{ color: 'var(--text-muted)' }}>-p</span>
            <span style={{ color: '#f7a24f' }}>{hostPort || '?'}</span>
            <span style={{ color: 'var(--text-muted)' }}>:</span>
            <span style={{ color: '#a78bfa' }}>{containerPort || '?'}</span>
            <span style={{ color: 'var(--text-secondary)' }}>nginx</span>
          </div>
        </div>

        {/* Port inputs */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1.25rem',
        }}>
          {/* Host port */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.7rem',
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#f7a24f',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              🖥️ {t.host}
            </label>
            <input
              type="number"
              value={hostPort}
              onChange={(e) => { setHostPort(e.target.value); reset(); }}
              min="1"
              max="65535"
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid #f7a24f40',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                color: '#f7a24f',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '1.1rem',
                fontWeight: 600,
                outline: 'none',
              }}
            />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'Outfit, sans-serif' }}>
              localhost:{hostPort || '?'}
            </p>
          </div>

          {/* Arrow */}
          <div style={{
            textAlign: 'center',
            paddingTop: '1.2rem',
            fontSize: '1.2rem',
            color: 'var(--text-muted)',
          }}>→</div>

          {/* Container port */}
          <div>
            <label style={{
              display: 'block',
              fontSize: '0.7rem',
              fontFamily: 'IBM Plex Mono, monospace',
              color: '#a78bfa',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '6px',
            }}>
              📦 {t.container}
            </label>
            <input
              type="number"
              value={containerPort}
              onChange={(e) => { setContainerPort(e.target.value); reset(); }}
              min="1"
              max="65535"
              style={{
                width: '100%',
                background: 'var(--bg-surface)',
                border: '1px solid #a78bfa40',
                borderRadius: '8px',
                padding: '0.5rem 0.75rem',
                color: '#a78bfa',
                fontFamily: 'IBM Plex Mono, monospace',
                fontSize: '1.1rem',
                fontWeight: 600,
                outline: 'none',
              }}
            />
            <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '4px', fontFamily: 'Outfit, sans-serif' }}>
              app listens on :{containerPort || '?'}
            </p>
          </div>
        </div>

        {/* Run button */}
        <button
          onClick={handleRun}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'var(--accent-primary)',
            color: '#000',
            border: 'none',
            borderRadius: '8px',
            padding: '0.6rem 1.25rem',
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.82rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'opacity 0.2s ease',
            marginBottom: '1.25rem',
          }}
        >
          ▶ {t.run}
        </button>

        {/* Traffic flow visualization */}
        {showFlow && (
          <div style={{
            background: 'var(--bg-surface)',
            borderRadius: '10px',
            padding: '1rem 1.25rem',
            border: '1px solid var(--border)',
            animation: 'fadeIn 0.4s ease',
          }}>
            <p style={{
              fontSize: '0.7rem',
              fontFamily: 'IBM Plex Mono, monospace',
              color: 'var(--accent-primary)',
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              marginBottom: '0.75rem',
            }}>
              {t.result}
            </p>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              flexWrap: 'wrap',
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.8rem',
            }}>
              {[
                { label: `Browser`, value: `localhost:${hostPort}`, color: '#e2e8f4' },
                { label: '→', value: null, color: 'var(--text-muted)' },
                { label: `Host`, value: `:${hostPort}`, color: '#f7a24f' },
                { label: '→', value: null, color: 'var(--text-muted)' },
                { label: `Container`, value: `:${containerPort}`, color: '#a78bfa' },
                { label: '→', value: null, color: 'var(--text-muted)' },
                { label: `App`, value: '✓ running', color: '#00d4aa' },
              ].map((item, i) => (
                item.value ? (
                  <span key={i}>
                    <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem' }}>{item.label} </span>
                    <span style={{
                      color: item.color,
                      background: `${item.color}15`,
                      border: `1px solid ${item.color}30`,
                      borderRadius: '4px',
                      padding: '1px 6px',
                    }}>
                      {item.value}
                    </span>
                  </span>
                ) : (
                  <span key={i} style={{ color: item.color }}>{item.label}</span>
                )
              ))}
            </div>
            <p style={{
              marginTop: '0.75rem',
              fontSize: '0.8rem',
              color: 'var(--text-secondary)',
              fontFamily: 'Outfit, sans-serif',
            }}>
              Open <code style={{ color: 'var(--accent-primary)', background: 'var(--bg-card)', padding: '1px 5px', borderRadius: '3px' }}>
                localhost:{hostPort}
              </code> in your browser → nginx responds from port {containerPort} inside the container.
            </p>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
