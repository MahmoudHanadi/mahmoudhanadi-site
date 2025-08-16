import { forwardRef } from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'outlined';
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const baseClasses = 'bg-white rounded-xl';
    
    const variantClasses = {
      default: 'border border-neutral-border shadow-sm',
      elevated: 'border border-neutral-border shadow-brand',
      outlined: 'border-2 border-neutral-border shadow-none',
    };

    const classes = `${baseClasses} ${variantClasses[variant]} ${className}`.trim();

    return (
      <div
        ref={ref}
        className={classes}
        {...props}
      />
    );
  }
);
Card.displayName = 'Card';

export { Card };
