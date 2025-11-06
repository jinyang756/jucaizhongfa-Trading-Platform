import * as React from 'react';

import { cn } from '../../lib/utils';

const TradeCard = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'rounded-xl border bg-card text-card-foreground shadow-lg transition-all hover:shadow-xl hover:-translate-y-0.5',
        className,
      )}
      {...props}
    />
  ),
);
TradeCard.displayName = 'TradeCard';

const TradeCardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  ),
);
TradeCardHeader.displayName = 'TradeCardHeader';

const TradeCardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-2xl font-semibold leading-none tracking-tight', className)}
    {...props}
  />
));
TradeCardTitle.displayName = 'TradeCardTitle';

const TradeCardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
TradeCardDescription.displayName = 'TradeCardDescription';

const TradeCardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  ),
);
TradeCardContent.displayName = 'TradeCardContent';

const TradeCardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
  ({ className, ...props }, ref) => (
    <div ref={ref} className={cn('flex items-center p-6 pt-0', className)} {...props} />
  ),
);
TradeCardFooter.displayName = 'TradeCardFooter';

export {
  TradeCard,
  TradeCardHeader,
  TradeCardFooter,
  TradeCardTitle,
  TradeCardDescription,
  TradeCardContent,
};
