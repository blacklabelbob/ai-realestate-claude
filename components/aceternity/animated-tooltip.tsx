"use client";

import Image from "next/image";
import React, { useState } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from "framer-motion";

export const AnimatedTooltip = ({
  items,
}: {
  items: {
    id: number;
    name: string;
    designation: string;
    image: string;
  }[];
}) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const springConfig = { stiffness: 100, damping: 5 };
  const x = useMotionValue(0);
  const rotate = useSpring(
    useTransform(x, [-100, 100], [-45, 45]),
    springConfig
  );
  const translateX = useSpring(
    useTransform(x, [-100, 100], [-50, 50]),
    springConfig
  );

  const handleMouseMove = (event: React.MouseEvent) => {
    const halfWidth = (event.target as HTMLElement).offsetWidth / 2;
    x.set(event.nativeEvent.offsetX - halfWidth);
  };

  return (
    <div className="flex flex-row -space-x-3">
      {items.map((item) => (
        <div
          className="relative group"
          key={item.name}
          onMouseEnter={() => setHoveredIndex(item.id)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence mode="popLayout">
            {hoveredIndex === item.id && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.6 }}
                animate={{
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 260,
                    damping: 10,
                  },
                }}
                exit={{ opacity: 0, y: 20, scale: 0.6 }}
                style={{
                  translateX: translateX,
                  rotate: rotate,
                  whiteSpace: "nowrap",
                }}
                className="absolute -top-16 -left-1/2 translate-x-1/2 flex text-xs flex-col items-center justify-center rounded-md bg-card z-50 shadow-xl px-4 py-2 border border-border"
              >
                <div className="absolute inset-x-10 z-30 w-[20%] -bottom-px bg-gradient-to-r from-transparent via-forest to-transparent h-px " />
                <div className="absolute left-10 w-[40%] z-30 -bottom-px bg-gradient-to-r from-transparent via-gold to-transparent h-px " />
                <div className="font-bold text-foreground relative z-30 text-sm">
                  {item.name}
                </div>
                <div className="text-muted-foreground text-xs">{item.designation}</div>
              </motion.div>
            )}
          </AnimatePresence>
          <Image
            onMouseMove={handleMouseMove}
            height={40}
            width={40}
            src={item.image}
            alt={item.name}
            className="object-cover !m-0 !p-0 object-top rounded-full h-10 w-10 border-2 border-card group-hover:scale-105 group-hover:z-30 relative transition duration-500"
          />
        </div>
      ))}
    </div>
  );
};
