interface Props {
  variant: 'info' | 'warning' | 'tip' | 'danger';
  text: string;
}

const styles = {
  info: { icon: 'ℹ', bg: 'rgba(79, 142, 247, 0.08)', border: 'rgba(79, 142, 247, 0.3)', color: '#4f8ef7', label: 'Note' },
  warning: { icon: '⚠', bg: 'rgba(247, 162, 79, 0.08)', border: 'rgba(247, 162, 79, 0.3)', color: '#f7a24f', label: 'Warning' },
  tip: { icon: '💡', bg: 'rgba(0, 212, 170, 0.08)', border: 'rgba(0, 212, 170, 0.3)', color: '#00d4aa', label: 'Tip' },
  danger: { icon: '🔥', bg: 'rgba(247, 79, 79, 0.08)', border: 'rgba(247, 79, 79, 0.3)', color: '#f74f4f', label: 'Important' },
};

export default function Callout({ variant, text }: Props) {
  const s = styles[variant];
  return (
    <div style={{
      margin: '1.25rem 0',
      padding: '0.875rem 1rem',
      borderRadius: '8px',
      borderLeft: `3px solid ${s.border}`,
      background: s.bg,
      display: 'flex',
      gap: '10px',
      alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '1rem', flexShrink: 0, marginTop: '1px' }}>{s.icon}</span>
      <div>
        <span style={{
          display: 'block',
          fontSize: '0.7rem',
          fontFamily: 'IBM Plex Mono, monospace',
          color: s.color,
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          marginBottom: '4px',
          fontWeight: 600,
        }}>
          {s.label}
        </span>
        <p style={{
          margin: 0,
          fontSize: '0.875rem',
          color: 'var(--text-secondary)',
          lineHeight: 1.7,
          fontFamily: 'Outfit, sans-serif',
        }}>
          {text}
        </p>
      </div>
    </div>
  );
}
