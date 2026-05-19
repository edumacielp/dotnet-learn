'use client';

export default function TopicCard({
  icon, title, description, color, status, ctaLabel,
}: {
  icon: string; title: string; description: string;
  color: string; status: 'available' | 'coming-soon'; ctaLabel: string;
}) {
  const isAvailable = status === 'available';

  return (
    <div
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        padding: '1.5rem',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: isAvailable ? 'pointer' : 'default',
        opacity: isAvailable ? 1 : 0.55,
        transition: 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        if (!isAvailable) return;
        const el = e.currentTarget;
        el.style.borderColor = `${color}50`;
        el.style.transform = 'translateY(-2px)';
        el.style.boxShadow = `0 8px 24px ${color}15`;
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        el.style.borderColor = 'var(--border)';
        el.style.transform = 'translateY(0)';
        el.style.boxShadow = 'none';
      }}
    >
      {/* Top accent line */}
      {isAvailable && (
        <div style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: '2px',
          background: `linear-gradient(90deg, ${color}, transparent)`,
          borderRadius: '12px 12px 0 0',
        }} />
      )}

      {/* Icon + status */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: '1rem',
      }}>
        <div style={{
          width: '44px', height: '44px', borderRadius: '10px',
          background: `${color}15`,
          border: `1px solid ${color}30`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.4rem',
        }}>
          {icon}
        </div>
        <span style={{
          fontFamily: 'IBM Plex Mono, monospace',
          fontSize: '0.65rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          color: isAvailable ? color : 'var(--text-muted)',
          background: isAvailable ? `${color}12` : 'var(--bg-surface)',
          border: `1px solid ${isAvailable ? color + '30' : 'var(--border)'}`,
          borderRadius: '4px',
          padding: '3px 8px',
        }}>
          {isAvailable ? '● live' : '○ soon'}
        </span>
      </div>

      {/* Title */}
      <h3 style={{
        fontFamily: 'IBM Plex Mono, monospace',
        fontSize: '1rem', fontWeight: 700,
        color: 'var(--text-primary)',
        margin: '0 0 0.5rem',
      }}>
        {title}
      </h3>

      {/* Description */}
      <p style={{
        fontSize: '0.825rem', color: 'var(--text-secondary)',
        fontFamily: 'Outfit, sans-serif', lineHeight: 1.65,
        margin: 0, flex: 1,
      }}>
        {description}
      </p>

      {/* CTA */}
      {isAvailable && (
        <div style={{
          marginTop: '1.25rem', paddingTop: '1rem',
          borderTop: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: '6px',
        }}>
          <span style={{
            fontFamily: 'IBM Plex Mono, monospace',
            fontSize: '0.775rem', color,
            fontWeight: 600,
          }}>
            {ctaLabel} →
          </span>
        </div>
      )}
    </div>
  );
}
