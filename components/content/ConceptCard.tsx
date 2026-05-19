"use client";

interface Props {
  icon: string;
  title: string;
  description: string;
  color?: string;
}

export default function ConceptCard({ icon, title, description, color = 'var(--accent-primary)' }: Props) {
  return (
    <div style={{
      background: 'var(--bg-card)',
      border: '1px solid var(--border)',
      borderRadius: '10px',
      padding: '1.125rem',
      transition: 'border-color 0.2s ease, transform 0.2s ease',
      cursor: 'default',
    }}
    onMouseEnter={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = `${color}60`;
      el.style.transform = 'translateY(-1px)';
    }}
    onMouseLeave={(e) => {
      const el = e.currentTarget;
      el.style.borderColor = 'var(--border)';
      el.style.transform = 'translateY(0)';
    }}
    >
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        marginBottom: '0.5rem',
      }}>
        <span style={{ fontSize: '1.25rem' }}>{icon}</span>
        <h4 style={{
          fontSize: '0.875rem',
          fontWeight: 600,
          color: 'var(--text-primary)',
          fontFamily: 'IBM Plex Mono, monospace',
          margin: 0,
        }}>
          {title}
        </h4>
      </div>
      <p style={{
        fontSize: '0.825rem',
        color: 'var(--text-secondary)',
        lineHeight: 1.65,
        margin: 0,
        fontFamily: 'Outfit, sans-serif',
      }}>
        {description}
      </p>
    </div>
  );
}
