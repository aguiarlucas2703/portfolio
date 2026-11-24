"use client";

import { useEffect, useRef } from "react";

const WIDTH = 36;
const HEIGHT = 42;
const WALK_DURATION = 4600;
const STRIDE = [-4, -2, 0, 4, 2, 0];

type Point = readonly [x: number, y: number];

function drawLegoshi(context: CanvasRenderingContext2D, stride: number) {
  const shape = (color: string, start: Point, ...points: Point[]) => {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(...start);
    for (const point of points) context.lineTo(...point);
    context.closePath();
    context.fill();
  };

  const ink = "#20202a";
  const fur = "#9396a3";
  const shade = "#626979";
  const lightFur = "#c3c1c5";
  const shirt = "#e9e2d3";
  const vest = "#48576a";

  context.clearRect(0, 0, WIDTH, HEIGHT);

  // Tail and the leg farthest from the viewer.
  shape(shade, [15, 26], [11, 26], [8, 29], [4, 30], [2, 29], [3, 33],
    [8, 34], [13, 32], [17, 29]);
  shape("#465260", [17, 27], [22, 27], [21 - stride, 38], [16 - stride, 38]);
  shape(ink, [16 - stride, 37], [21 - stride, 37], [23 - stride, 39],
    [23 - stride, 40], [15 - stride, 40]);

  // Vest, striped pants and near arm.
  shape("#728093", [13, 27], [21, 27], [19 + stride, 38], [13 + stride, 38], [15, 32]);
  shape("#9a9faf", [15, 30], [16, 30], [15 + stride, 38], [14 + stride, 38]);
  shape("#333441", [13 + stride, 37], [18 + stride, 37], [21 + stride, 39],
    [21 + stride, 41], [12 + stride, 41]);
  shape(vest, [14, 19], [20, 18], [23, 21], [22, 28], [13, 28], [12, 23]);
  shape(shirt, [16, 18], [22, 19], [21, 24]);
  shape("#333441", [20, 20], [22, 20], [22, 25], [21, 26]);
  shape(shirt, [14, 21], [17, 22], [17 - stride / 2, 29], [13 - stride / 2, 28]);
  shape(fur, [13 - stride / 2, 27], [17 - stride / 2, 27], [16 - stride / 2, 31],
    [13 - stride / 2, 30]);

  // Ears, long muzzle and the light fur under the jaw.
  shape(shade, [20, 10], [21, 3], [24, 5], [26, 11]);
  shape(fur, [12, 12], [11, 2], [14, 3], [18, 9], [22, 8], [26, 11],
    [27, 14], [33, 16], [33, 19], [29, 21], [24, 21], [21, 24], [15, 22], [11, 17]);
  shape("#a57d7c", [12, 4], [14, 6], [15, 9], [13, 10]);
  shape(shade, [11, 15], [15, 17], [17, 21], [22, 21], [21, 24], [15, 22], [11, 17]);
  shape(lightFur, [20, 16], [23, 17], [32, 17], [32, 19], [29, 21],
    [23, 21], [20, 19]);
  shape(ink, [30, 15], [33, 16], [34, 17], [33, 18], [30, 17]);
  shape("#ede4d2", [22, 12], [26, 13], [25, 15], [22, 14]);
  context.fillStyle = ink;
  context.fillRect(24, 13, 1, 2);
  context.fillRect(27, 19, 4, 1);
}

export function LegoshiWalk() {
  const spriteRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = spriteRef.current;
    const track = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !track || !context) return;

    drawLegoshi(context, 0);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let animation = 0;
    let observer: IntersectionObserver | undefined;

    const startWalk = () => {
      if (reduceMotion.matches) return;
      let startedAt: number | undefined;
      let previousStride: number | undefined;

      const walk = (now: number) => {
        startedAt ??= now;
        const elapsed = now - startedAt;
        const progress = Math.min(elapsed / WALK_DURATION, 1);
        const stride = progress === 1 ? 0 : STRIDE[Math.floor(elapsed / 95) % STRIDE.length];
        if (stride !== previousStride) {
          drawLegoshi(context, stride);
          previousStride = stride;
        }
        canvas.style.setProperty("--walk-progress", String(progress));
        if (progress < 1) animation = requestAnimationFrame(walk);
      };

      animation = requestAnimationFrame(walk);
    };

    const stopForReducedMotion = () => {
      if (!reduceMotion.matches) return;
      cancelAnimationFrame(animation);
      canvas.style.removeProperty("--walk-progress");
      drawLegoshi(context, 0);
    };

    if (typeof IntersectionObserver === "undefined") {
      startWalk();
    } else {
      observer = new IntersectionObserver(([entry]) => {
        if (entry.intersectionRatio < 0.5) return;
        observer?.disconnect();
        startWalk();
      }, { threshold: 0.5 });
      observer.observe(track);
    }

    reduceMotion.addEventListener("change", stopForReducedMotion);
    return () => {
      observer?.disconnect();
      cancelAnimationFrame(animation);
      reduceMotion.removeEventListener("change", stopForReducedMotion);
    };
  }, []);

  return (
    <div className="legoshi-trail section-shell" aria-hidden="true">
      <div className="legoshi-track">
        <canvas ref={spriteRef} className="legoshi-sprite" width={WIDTH} height={HEIGHT} />
      </div>
    </div>
  );
}
