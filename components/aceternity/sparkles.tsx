"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SparklesCoreProps {
  id?: string;
  className?: string;
  background?: string;
  minSize?: number;
  maxSize?: number;
  particleCount?: number;
  particleColor?: string;
}

export const SparklesCore = ({
  id = "sparkles",
  className,
  background = "transparent",
  minSize = 0.4,
  maxSize = 1,
  particleCount = 30,
  particleColor = "#c9982e",
}: SparklesCoreProps) => {
  const particles = React.useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => ({
      id: `${id}-particle-${i}`,
      size: Math.random() * (maxSize - minSize) + minSize,
      x: Math.random() * 100,
      y: Math.random() * 100,
      animationDelay: Math.random() * 2,
    }));
  }, [id, maxSize, minSize, particleCount]);

  return (
    <div
      className={cn("absolute inset-0 overflow-hidden", className)}
      style={{ background }}
    >
      {particles.map((particle) => (
        <span
          key={particle.id}
          className="absolute animate-sparkle rounded-full"
          style={{
            width: particle.size * 4,
            height: particle.size * 4,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            backgroundColor: particleColor,
            animationDelay: `${particle.animationDelay}s`,
          }}
        />
      ))}
    </div>
  );
};

export const Sparkles = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <span className={cn("relative inline-block", className)}>
      <SparklesCore
        id="grade-sparkles"
        className="absolute -inset-4"
        particleColor="#c9982e"
        particleCount={15}
        minSize={0.3}
        maxSize={0.8}
      />
      <span className="relative z-10">{children}</span>
    </span>
  );
};
