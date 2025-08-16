import { forwardRef } from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'outline';
}

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseClasses = 'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium';
    
    const variantClasses = {
      default: 'bg-accent text-neutral-text',
      outline: 'border border-accent text-accent bg-accent-light',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

    return (
      <span
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);
Badge.displayName = 'Badge';

export { Badge };