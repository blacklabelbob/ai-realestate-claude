"use client";

import confetti from "canvas-confetti";

interface ConfettiOptions {
  particleCount?: number;
  spread?: number;
  startVelocity?: number;
  decay?: number;
  scalar?: number;
  origin?: { x: number; y: number };
  colors?: string[];
}

export function fireConfetti(options?: ConfettiOptions) {
  const defaults: ConfettiOptions = {
    particleCount: 100,
    spread: 70,
    startVelocity: 30,
    decay: 0.95,
    scalar: 0.9,
    origin: { x: 0.5, y: 0.5 },
    colors: ["#2d8a4e", "#c9982e", "#1a2332", "#f8f6f1"],
  };

  const mergedOptions = { ...defaults, ...options };
  confetti(mergedOptions);
}

export function fireSuccessConfetti() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
    colors: ["#2d8a4e", "#c9982e", "#5a9a6e"],
  };

  function fire(particleRatio: number, opts: confetti.Options) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  });
  fire(0.2, {
    spread: 60,
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  });
}
