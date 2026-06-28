/**
 * StatusBadge — a small pill badge for conveying status.
 *
 * Variants:  success | warning | error | info | pending | offline
 *
 * Usage:
 *   <StatusBadge variant="success" label="Completed" />
 *   <StatusBadge variant="pending" label="Transcribing…" dot />
 */

const VARIANTS = {
  success: {
    pill: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
    dot:  'bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.6)]',
  },
  warning: {
    pill: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
    dot:  'bg-amber-400 shadow-[0_0_6px_rgba(251,191,36,0.6)]',
  },
  error: {
    pill: 'bg-red-500/10 border-red-500/20 text-red-400',
    dot:  'bg-red-400 shadow-[0_0_6px_rgba(248,113,113,0.6)]',
  },
  info: {
    pill: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-400',
    dot:  'bg-cyan-400 shadow-[0_0_6px_rgba(34,211,238,0.6)]',
  },
  pending: {
    pill: 'bg-slate-700/50 border-slate-600/30 text-slate-400',
    dot:  'bg-slate-400',
  },
  offline: {
    pill: 'bg-slate-800/50 border-slate-700/30 text-slate-500',
    dot:  'bg-slate-600',
  },
};

export default function StatusBadge({
  variant = 'info',
  label,
  dot = false,
  size = 'sm',     // 'xs' | 'sm' | 'md'
  className = '',
}) {
  const styles = VARIANTS[variant] ?? VARIANTS.info;

  const sizeClasses = {
    xs: 'text-xs px-2 py-0.5',
    sm: 'text-xs px-2.5 py-1',
    md: 'text-sm px-3 py-1.5',
  };

  const dotSize = size === 'md' ? 'w-2 h-2' : 'w-1.5 h-1.5';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-medium
        ${styles.pill} ${sizeClasses[size]} ${className}`}
    >
      {dot && (
        <span
          className={`${dotSize} rounded-full flex-shrink-0 animate-pulse ${styles.dot}`}
        />
      )}
      {label}
    </span>
  );
}
