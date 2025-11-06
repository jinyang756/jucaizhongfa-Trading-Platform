import * as React from "react";

import { cn } from "../../lib/utils";

const AccountOverview = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-lg border bg-gradient-to-br from-gray-800 to-gray-900 p-6 text-card-foreground shadow-lg",
      className
    )}
    {...props}
  />
));
AccountOverview.displayName = "AccountOverview";

const AccountOverviewHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5", className)}
    {...props}
  />
));
AccountOverviewHeader.displayName = "AccountOverviewHeader";

const AccountOverviewTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-xl font-bold leading-none tracking-tight text-white",
      className
    )}
    {...props}
  />
));
AccountOverviewTitle.displayName = "AccountOverviewTitle";

const AccountOverviewDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-gray-400", className)}
    {...props}
  />
));
AccountOverviewDescription.displayName = "AccountOverviewDescription";

const AccountOverviewContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("pt-4", className)} {...props} />
));
AccountOverviewContent.displayName = "AccountOverviewContent";

export { AccountOverview, AccountOverviewHeader, AccountOverviewTitle, AccountOverviewDescription, AccountOverviewContent };