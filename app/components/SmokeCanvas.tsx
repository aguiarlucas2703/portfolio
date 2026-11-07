"use client";

import { useEffect, useRef } from "react";

const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));

const hash2 = (x: number, y: number) => {
  let hash = Math.imul(x, 374761393) ^ Math.imul(y, 668265263);
  hash = Math.imul(hash ^ (hash >>> 13), 1274126177);
  return ((hash ^ (hash >>> 16)) >>> 0) / 4294967295;
};

const valueNoise = (x: number, y: number) => {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);

  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
};

export function SmokeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.parentElement;
    if (!canvas || !hero) return;

    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const compact = window.matchMedia("(max-width: 700px)").matches;
    const scale = compact ? 0.42 : 0.55;
    const particleLimit = compact ? 700 : 1200;

    let width = 0;
    let height = 0;
    let particleCount = 0;
    let x = new Float32Array(0);
    let y = new Float32Array(0);
    let previousX = new Float32Array(0);
    let previousY = new Float32Array(0);
    let life = new Float32Array(0);
    let amber = new Uint8Array(0);

    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseX = -9999;
    let lastMouseY = -9999;
    let mouseVelocityX = 0;
    let mouseVelocityY = 0;
    let interaction = 0;
    let time = 0;
    let lastFrame = performance.now();
    let animationFrame = 0;
    let visible = true;

    const radius = compact ? 82 : 120;

    const spawn = (index: number, anywhere: boolean) => {
      if (anywhere || Math.random() < 0.3) {
        x[index] = Math.random() * width;
        y[index] = Math.random() * height;
      } else {
        x[index] =
          width * 0.5 +
          (Math.random() + Math.random() + Math.random() - 1.5) *
            width *
            0.36;
        y[index] = height + 8;
      }

      previousX[index] = x[index];
      previousY[index] = y[index];
      life[index] = 220 + Math.random() * 380;
      amber[index] = Math.random() < 0.14 ? 1 : 0;
    };

    const resize = () => {
      width = Math.max(1, Math.ceil(hero.clientWidth * scale));
      height = Math.max(1, Math.ceil(hero.clientHeight * scale));
      canvas.width = width;
      canvas.height = height;

      context.fillStyle = "#080807";
      context.fillRect(0, 0, width, height);

      particleCount = Math.round(
        clamp((width * height) / 620, 320, particleLimit),
      );
      x = new Float32Array(particleCount);
      y = new Float32Array(particleCount);
      previousX = new Float32Array(particleCount);
      previousY = new Float32Array(particleCount);
      life = new Float32Array(particleCount);
      amber = new Uint8Array(particleCount);

      for (let index = 0; index < particleCount; index += 1) {
        spawn(index, true);
      }
    };

    const drawStep = (delta: number, fade: number) => {
      time += delta * 0.016;
      context.globalCompositeOperation = "source-over";
      context.fillStyle = `rgba(8,8,7,${fade})`;
      context.fillRect(0, 0, width, height);
      context.globalCompositeOperation = "lighter";
      context.lineCap = "round";
      context.lineWidth = compact ? 0.9 : 1.2;

      const pointerSpeed = Math.hypot(mouseVelocityX, mouseVelocityY);
      if (interaction > 0.02 && pointerSpeed > 0.6) {
        for (let amount = 0; amount < 8; amount += 1) {
          const index = (Math.random() * particleCount) | 0;
          x[index] = mouseX + (Math.random() - 0.5) * 18;
          y[index] = mouseY + (Math.random() - 0.5) * 18;
          previousX[index] = x[index];
          previousY[index] = y[index];
          amber[index] = Math.random() < 0.58 ? 1 : 0;
          life[index] = 110 + Math.random() * 170;
        }
      }

      for (let index = 0; index < particleCount; index += 1) {
        let currentX = x[index];
        let currentY = y[index];
        const angle =
          valueNoise(
            currentX * 0.0042 + time * 0.35,
            currentY * 0.0042 - time * 0.2,
          ) *
            12.5 +
          valueNoise(
            currentX * 0.011 - time * 0.5,
            currentY * 0.011 + time * 0.3,
          ) *
            3;

        let velocityX = Math.cos(angle) * 0.85;
        let velocityY = Math.sin(angle) * 0.85 - 0.42;
        let proximity = 0;

        if (interaction > 0.02) {
          const distanceX = currentX - mouseX;
          const distanceY = currentY - mouseY;
          const distanceSquared =
            distanceX * distanceX + distanceY * distanceY;

          if (distanceSquared < radius * radius) {
            const distance = Math.sqrt(distanceSquared) + 0.001;
            const force =
              (1 - distance / radius) ** 2 * interaction;
            velocityX +=
              mouseVelocityX * force * 0.45 -
              (distanceY / distance) * force * 2.2;
            velocityY +=
              mouseVelocityY * force * 0.45 +
              (distanceX / distance) * force * 2.2;
            proximity = force;
          }
        }

        currentX += velocityX * delta;
        currentY += velocityY * delta;

        const alpha =
          (amber[index] ? 0.2 : 0.13) *
          (1 + proximity * 1.5) *
          clamp(life[index] / 60);
        context.strokeStyle = amber[index]
          ? `rgba(224,160,74,${alpha})`
          : `rgba(233,226,211,${alpha})`;
        context.beginPath();
        context.moveTo(previousX[index], previousY[index]);
        context.lineTo(currentX, currentY);
        context.stroke();

        previousX[index] = currentX;
        previousY[index] = currentY;
        x[index] = currentX;
        y[index] = currentY;
        life[index] -= delta;

        if (
          life[index] <= 0 ||
          currentX < -20 ||
          currentX > width + 20 ||
          currentY < -20 ||
          currentY > height + 20
        ) {
          spawn(index, false);
        }
      }

      mouseVelocityX *= 0.9;
      mouseVelocityY *= 0.9;
      interaction *= 0.985;
    };

    const animate = (now: number) => {
      animationFrame = requestAnimationFrame(animate);
      const delta = Math.min(2.2, (now - lastFrame) / 16.67);
      lastFrame = now;
      if (visible && !document.hidden) drawStep(delta, 0.05);
    };

    const onPointerMove = (event: PointerEvent) => {
      const bounds = hero.getBoundingClientRect();
      const nextX = (event.clientX - bounds.left) * scale;
      const nextY = (event.clientY - bounds.top) * scale;

      if (lastMouseX > -9000) {
        mouseVelocityX =
          mouseVelocityX * 0.5 + (nextX - lastMouseX) * 0.9;
        mouseVelocityY =
          mouseVelocityY * 0.5 + (nextY - lastMouseY) * 0.9;
      }

      mouseX = nextX;
      mouseY = nextY;
      lastMouseX = nextX;
      lastMouseY = nextY;
      interaction = 1;
    };

    const onPointerLeave = () => {
      lastMouseX = -9999;
      lastMouseY = -9999;
    };

    resize();

    if (reducedMotion) {
      for (let step = 0; step < 280; step += 1) drawStep(1, 0.03);
      return;
    }

    const observer =
      typeof IntersectionObserver === "undefined"
        ? null
        : new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting;
          });

    observer?.observe(hero);
    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("resize", resize);
    animationFrame = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer?.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="hero-smoke"
      aria-hidden="true"
      data-testid="hero-smoke"
    />
  );
}
