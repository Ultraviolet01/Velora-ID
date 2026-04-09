import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-primary/10 text-primary",
        secondary: "border-transparent bg-secondary text-secondary-foreground",
        destructive: "border-transparent bg-destructive/10 text-destructive",
        success: "border-transparent bg-green-500/10 text-green-500",
        warning: "border-transparent bg-yellow-500/10 text-yellow-500",
        outline: "text-foreground border-border",
        verified: "border-green-500/20 bg-green-500/10 text-green-400",
        pending: "border-yellow-500/20 bg-yellow-500/10 text-yellow-400",
        failed: "border-red-500/20 bg-red-500/10 text-red-400",
        platinum: "border-purple-400/20 bg-purple-500/10 text-purple-400",
        gold: "border-yellow-400/20 bg-yellow-500/10 text-yellow-400",
        silver: "border-gray-400/20 bg-gray-500/10 text-gray-400",
        bronze: "border-orange-400/20 bg-orange-500/10 text-orange-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
