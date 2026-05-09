"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export const HeroParallax = ({
  products,
}: {
  products: {
    title: string;
    gradient: string;
  }[];
}) => {
  const firstRow = products.slice(0, 3);
  const secondRow = products.slice(3, 6);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const translateX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 400]),
    springConfig
  );
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -400]),
    springConfig
  );
  const rotateX = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [15, 0]),
    springConfig
  );
  const opacity = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [0.2, 1]),
    springConfig
  );
  const rotateZ = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [20, 0]),
    springConfig
  );
  const translateY = useSpring(
    useTransform(scrollYProgress, [0, 0.2], [-500, 100]),
    springConfig
  );

  return (
    <div
      ref={ref}
      className="h-[180vh] py-20 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]"
    >
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className=""
      >
        <motion.div className="flex flex-row-reverse space-x-reverse space-x-8 mb-8">
          {firstRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateX}
              key={product.title}
            />
          ))}
        </motion.div>
        <motion.div className="flex flex-row mb-8 space-x-8">
          {secondRow.map((product) => (
            <ProductCard
              product={product}
              translate={translateXReverse}
              key={product.title}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export const ProductCard = ({
  product,
  translate,
}: {
  product: {
    title: string;
    gradient: string;
  };
  translate: ReturnType<typeof useSpring>;
}) => {
  return (
    <motion.div
      style={{
        x: translate,
      }}
      whileHover={{
        y: -20,
      }}
      key={product.title}
      className="group/product h-72 w-[25rem] relative flex-shrink-0 rounded-xl overflow-hidden"
    >
      <div
        className={`absolute inset-0 ${product.gradient} flex items-center justify-center`}
      >
        <span className="text-white/80 font-semibold text-lg text-center px-4">
          {product.title}
        </span>
      </div>
      <div className="absolute inset-0 h-full w-full opacity-0 group-hover/product:opacity-80 bg-black/40 pointer-events-none"></div>
    </motion.div>
  );
};
