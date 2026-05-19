'use client';
import { useState } from 'react';
import type { I18nContent } from '@/types';

interface Container {
  id: number;
  status: 'starting' | 'running' | 'stopped';
  port: number;
}

interface Props {
  t: I18nContent['interactive']['imageContainer'];
}

export default function ImageContainerViz({ t }: Props) {
  const [containers, setContainers] = useState<Container[]>([]);
  const [nextId, setNextId] = useState(1);

  const spawnContainer = () => {
    if (containers.filter(c => c.status !== 'stopped').length >= 5) return;
    const newContainer: Container = {
      id: nextId,
      status: 'starting',
      port: 8080 + nextId,
    };
    setContainers(prev => [...prev, newContainer]);
    setNextId(prev => prev + 1);

    setTimeout(() => {
      setContainers(prev =>
        prev.map(c => c.id === newContainer.id ? { ...c, status: 'running' } : c)
      );
    }, 600);
  };

  const stopContainer = (id: number) => {
    setContainers(prev =>
      prev.map(c => c.id === id ? { ...c, status: 'stopped' } : c)
    );
    setTimeout(() => {
      setContainers(prev => prev.filter(c => c.id !== id));
    }, 400);
  };

  const activeCount = containers.filter(c => c.status !== 'stopped').length;

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
        background: 'rgba(79, 142, 247, 0.04)',
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
      }}>
        <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.8rem', color: 'var(--accent-secondary)' }}>
          {t.title}
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>— {t.subtitle}</span>
      </div>

      <div style={{ padding: '1.5rem', display: 'flex', gap: '2rem', flexWrap: 'wrap', alignItems: 'flex-start' }}>
        {/* Image block */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={spawnContainer}
            disabled={activeCount >= 5}
            title="Click to spawn a container"
            style={{
              width: '120px',
              height: '120px',
              borderRadius: '12px',
              border: '2px solid var(--accent-secondary)',
              background: 'rgba(79, 142, 247, 0.08)',
              cursor: activeCount >= 5 ? 'not-allowed' : 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.2s ease',
              opacity: activeCount >= 5 ? 0.5 : 1,
            }}
            onMouseEnter={(e) => {
              if (activeCount < 5) {
                (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 142, 247, 0.16)';
                (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1.03)';
              }
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(79, 142, 247, 0.08)';
              (e.currentTarget as HTMLButtonElement).style.transform = 'scale(1)';
            }}
          >
            <span style={{ fontSize: '2.5rem' }}>📋</span>
            <span style={{
              fontFamily: 'IBM Plex Mono, monospace',
              fontSize: '0.65rem',
              color: 'var(--accent-secondary)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}>
              IMAGE
            </span>
          </button>
          <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontFamily: 'Outfit, sans-serif', textAlign: 'center' }}>
            myapi:1.0.0<br />
            <span style={{ fontSize: '0.7rem', color: 'var(--accent-secondary)' }}>click to spawn ↗</span>
          </span>
        </div>

        {/* Arrow */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          height: '120px',
          color: 'var(--text-muted)',
          fontSize: '1.5rem',
        }}>
          →
        </div>

        {/* Containers */}
        <div style={{ flex: 1, minWidth: '200px' }}>
          <p style={{
            fontSize: '0.7rem',
            fontFamily: 'IBM Plex Mono, monospace',
            color: 'var(--text-muted)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            marginBottom: '0.75rem',
          }}>
            containers ({activeCount}/5)
          </p>

          {containers.length === 0 ? (
            <div style={{
              border: '1px dashed var(--border)',
              borderRadius: '8px',
              padding: '1.25rem',
              textAlign: 'center',
              color: 'var(--text-muted)',
              fontSize: '0.8rem',
              fontFamily: 'Outfit, sans-serif',
            }}>
              No containers running.<br />Click the image to spawn one.
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {containers.map((c) => (
                <div
                  key={c.id}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    background: 'var(--bg-surface)',
                    borderRadius: '8px',
                    padding: '0.5rem 0.75rem',
                    border: `1px solid ${c.status === 'running' ? 'rgba(0,212,170,0.3)' : c.status === 'starting' ? 'rgba(247,162,79,0.3)' : 'var(--border)'}`,
                    animation: 'slideIn 0.3s ease',
                    opacity: c.status === 'stopped' ? 0 : 1,
                    transition: 'opacity 0.3s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{
                      width: '7px',
                      height: '7px',
                      borderRadius: '50%',
                      background: c.status === 'running' ? '#00d4aa' : c.status === 'starting' ? '#f7a24f' : '#f74f4f',
                      display: 'inline-block',
                      flexShrink: 0,
                    }} />
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.75rem', color: 'var(--text-primary)' }}>
                      container_{c.id}
                    </span>
                    <span style={{ fontFamily: 'IBM Plex Mono, monospace', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
                      :{c.port}
                    </span>
                  </div>
                  <button
                    onClick={() => stopContainer(c.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--text-muted)',
                      fontSize: '0.75rem',
                      fontFamily: 'IBM Plex Mono, monospace',
                      padding: '2px 6px',
                      borderRadius: '4px',
                    }}
                    onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.color = '#f74f4f')}
                    onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.color = 'var(--text-muted)')}
                  >
                    stop
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-8px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
}
