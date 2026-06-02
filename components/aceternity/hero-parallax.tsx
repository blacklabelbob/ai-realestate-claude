"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export type ParallaxProduct = {
  title: string;
  gradient: string;
  /** Optional real screenshot of the report section shown in the card. */
  image?: string;
};

export const HeroParallax = ({ products }: { products: ParallaxProduct[] }) => {
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
  product: ParallaxProduct;
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
      className="group/product h-72 w-[25rem] relative flex-shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900 shadow-2xl ring-1 ring-black/40"
    >
      {/* Gradient fallback (shows behind/while the image loads) */}
      <div className={`absolute inset-0 ${product.gradient}`} />

      {product.image && (
        <Image
          src={product.image}
          alt={`${product.title} — sample report section`}
          fill
          sizes="400px"
          className="object-cover object-top transition-transform duration-500 group-hover/product:scale-[1.04]"
        />
      )}

      {/* Bottom legibility scrim + label */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/85 via-black/35 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 px-4 pb-3.5">
        <span className="text-sm font-semibold tracking-tight text-white drop-shadow">
          {product.title}
        </span>
        <span className="rounded-full border border-gold/40 bg-black/40 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-gold backdrop-blur-sm">
          Live report
        </span>
      </div>
    </motion.div>
  );
};
