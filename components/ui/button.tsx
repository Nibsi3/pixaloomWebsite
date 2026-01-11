import Link from 'next/link';
import { cn } from '@/components/utils';

type CommonProps = {
  className?: string;
  variant?: 'primary' | 'secondary' | 'ghost' | 'cta';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

const base =
  'inline-flex items-center justify-center gap-2 rounded-full border font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-500/60 focus-visible:ring-offset-0 disabled:opacity-60 disabled:pointer-events-none';

const variants: Record<NonNullable<CommonProps['variant']>, string> = {
  primary:
    'border-accent-600 bg-accent-600 text-white hover:border-accent-500 hover:bg-accent-500',
  secondary:
    'border-bg-700 bg-bg-800 text-fg-100 hover:border-fg-300/30 hover:bg-bg-700',
  ghost:
    'border-transparent bg-transparent text-fg-200 hover:border-bg-700 hover:bg-bg-800/60',
  cta: 'shiny-cta',
};

const sizes: Record<NonNullable<CommonProps['size']>, string> = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-2.5 text-sm',
  lg: 'px-5 py-3 text-base',
};

export function Button(
  props: CommonProps &
    (
      | { href: string; onClick?: never; type?: never }
      | { href?: never; onClick?: () => void; type?: 'button' | 'submit' }
    ) & { children: React.ReactNode }
) {
  const { className, variant = 'secondary', size = 'md', children, disabled } = props;

  const cls = cn(variant === 'cta' ? variants.cta : base, variant === 'cta' ? undefined : variants[variant], variant === 'cta' ? undefined : sizes[size], className);

  if ('href' in props && props.href) {
    if (disabled) {
      return (
        <span className={cls} aria-disabled="true">
          {variant === 'cta' ? <span>{children}</span> : children}
        </span>
      );
    }
    return (
      <Link className={cls} href={props.href}>
        {variant === 'cta' ? <span>{children}</span> : children}
      </Link>
    );
  }

  return (
    <button
      className={cls}
      onClick={props.onClick}
      type={props.type ?? 'button'}
      disabled={disabled}
    >
      {variant === 'cta' ? <span>{children}</span> : children}
    </button>
  );
}
