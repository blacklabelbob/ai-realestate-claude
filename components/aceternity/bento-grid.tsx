"use client";

import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { type LucideIcon } from "lucide-react";

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2 max-w-4xl mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  title,
  description,
  icon: Icon,
  tags,
  isFullWidth,
}: {
  className?: string;
  title: string;
  description: string;
  icon?: LucideIcon;
  tags?: string[];
  isFullWidth?: boolean;
}) => {
  return (
    <div
      className={cn(
        "row-span-1 rounded-xl group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none p-4 dark:bg-card bg-white border border-transparent justify-between flex flex-col space-y-4",
        isFullWidth && "md:col-span-2",
        className
      )}
    >
      <div className="group-hover/bento:translate-x-2 transition duration-200">
        {Icon && (
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-forest/10 mb-3">
            <Icon className="h-5 w-5 text-forest" />
          </div>
        )}
        <div className="font-semibold text-foreground mb-2">{title}</div>
        <div className="text-sm text-muted-foreground">{description}</div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {tags.map((tag) => (
              <Badge key={tag} variant="success" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
