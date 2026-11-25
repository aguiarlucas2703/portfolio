"use client";

import { useEffect, useRef } from "react";

const WIDTH = 36;
const HEIGHT = 42;
const WALK_DURATION = 4600;
const TURN_PAUSE = 650;
const IDLE_AFTER = 2000;
const WAVE_FRAME_DURATION = 105;
const STRIDE = [-4, -2, 0, 4, 2, 0];
const WAVE = [0, 1, 2, 1, 0, 1, 2, 1, 0];

type Point = readonly [x: number, y: number];
type Facing = "left" | "right" | "front";

function paintShapes(context: CanvasRenderingContext2D) {
  return (color: string, start: Point, ...points: Point[]) => {
    context.fillStyle = color;
    context.beginPath();
    context.moveTo(...start);
    for (const point of points) context.lineTo(...point);
    context.closePath();
    context.fill();
  };
}

const ink = "#20202a";
const fur = "#9396a3";
const shade = "#626979";
const lightFur = "#c3c1c5";
const shirt = "#e9e2d3";
const vest = "#48576a";

function drawLegoshiProfile(context: CanvasRenderingContext2D, stride: number) {
  const shape = paintShapes(context);

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

function drawLegoshiFront(context: CanvasRenderingContext2D, wave: number) {
  const shape = paintShapes(context);

  shape(shade, [13, 26], [9, 27], [5, 30], [2, 30], [4, 33], [9, 33], [14, 30]);
  shape("#728093", [12, 27], [24, 27], [25, 38], [20, 38], [18, 32], [16, 38], [11, 38]);
  context.fillStyle = "#9a9faf";
  context.fillRect(13, 30, 1, 7);
  context.fillRect(22, 30, 1, 7);
  context.fillStyle = "#333441";
  context.fillRect(10, 38, 7, 3);
  context.fillRect(19, 38, 7, 3);

  shape(shirt, [12, 19], [25, 19], [27, 24], [25, 27], [11, 27], [9, 24]);
  shape(vest, [13, 20], [18, 25], [24, 20], [24, 29], [12, 29]);
  shape(ink, [17, 21], [19, 21], [20, 24], [18, 26], [16, 24]);
  shape(fur, [9, 24], [12, 25], [12, 30], [9, 31], [8, 29]);

  if (wave < 0) {
    shape(fur, [25, 24], [27, 24], [28, 29], [27, 31], [24, 30]);
  } else {
    const pawX = 29 + wave * 2;
    const pawY = wave === 1 ? 12 : 13;
    shape(shirt, [24, 21], [28, 22], [29, 20], [32, 21], [30, 26], [26, 26]);
    shape(fur, [28, 21], [pawX - 2, pawY + 4], [pawX + 2, pawY + 3], [32, 22]);
    shape(lightFur, [pawX - 3, pawY + 3], [pawX - 2, pawY + 1],
      [pawX - 1, pawY + 1], [pawX - 1, pawY], [pawX + 2, pawY], [pawX + 2, pawY + 5],
      [pawX - 1, pawY + 6]);
  }

  // The face keeps the gray fur, tall ears and pale muzzle of the profile.
  shape(shade, [10, 12], [10, 3], [13, 5], [16, 9], [20, 9], [24, 4], [26, 3],
    [26, 12], [28, 16], [26, 20], [21, 23], [15, 23], [10, 20], [8, 16]);
  shape(fur, [11, 12], [11, 4], [16, 10], [20, 10], [25, 4], [25, 12], [27, 16],
    [24, 20], [21, 22], [15, 22], [12, 20], [9, 16]);
  shape("#a57d7c", [12, 6], [14, 10], [12, 11]);
  shape("#a57d7c", [24, 6], [24, 11], [22, 10]);
  shape(lightFur, [11, 16], [15, 17], [18, 15], [21, 17], [25, 16],
    [24, 20], [21, 22], [15, 22], [12, 20]);
  context.fillStyle = shirt;
  context.fillRect(12, 13, 4, 2);
  context.fillRect(20, 13, 4, 2);
  context.fillStyle = ink;
  context.fillRect(14, 13, 1, 2);
  context.fillRect(21, 13, 1, 2);
  shape(ink, [16, 16], [20, 16], [19, 18], [17, 18]);
  context.fillRect(17, 20, 3, 1);
}

export function LegoshiWalk() {
  const spriteRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = spriteRef.current;
    const track = canvas?.parentElement;
    const context = canvas?.getContext("2d");
    if (!canvas || !track || !context) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    let animation: number | undefined;
    let lastFrameAt: number | undefined;
    let lastScrollAt = 0;
    let waveStartedAt: number | undefined;
    let position = 0;
    let direction: 1 | -1 = 1;
    let turnPause = 0;
    let strideTime = 0;
    let previousPose: number | undefined;

    const paint = (facing: Facing, pose: number) => {
      if (canvas.dataset.facing === facing && previousPose === pose) return;
      canvas.dataset.facing = facing;
      previousPose = pose;
      context.clearRect(0, 0, WIDTH, HEIGHT);
      if (facing === "front") drawLegoshiFront(context, pose);
      else drawLegoshiProfile(context, pose);
    };

    const animate = (now: number) => {
      animation = undefined;
      const elapsed = lastFrameAt === undefined ? 0 : Math.min(now - lastFrameAt, 64);
      lastFrameAt = now;

      if (now - lastScrollAt >= IDLE_AFTER) {
        waveStartedAt ??= now;
        const frame = Math.floor((now - waveStartedAt) / WAVE_FRAME_DURATION);
        if (frame >= WAVE.length) {
          paint("front", -1);
          lastFrameAt = undefined;
          return;
        }
        paint("front", WAVE[frame]);
      } else if (turnPause > 0) {
        turnPause = Math.max(0, turnPause - elapsed);
        if (turnPause === 0) direction = direction === 1 ? -1 : 1;
        paint(direction === 1 ? "right" : "left", 0);
      } else {
        position = Math.max(0, Math.min(1, position + direction * elapsed / WALK_DURATION));
        canvas.style.setProperty("--walk-progress", String(position));
        if ((direction === 1 && position === 1) || (direction === -1 && position === 0)) {
          turnPause = TURN_PAUSE;
          strideTime = 0;
        }
        strideTime += elapsed;
        const stride = turnPause ? 0 : STRIDE[Math.floor(strideTime / 95) % STRIDE.length];
        paint(direction === 1 ? "right" : "left", stride);
      }

      animation = requestAnimationFrame(animate);
    };

    const canAnimate = () => visible && !document.hidden && !reduceMotion.matches;

    const onScroll = () => {
      if (!canAnimate()) return;
      lastScrollAt = performance.now();
      waveStartedAt = undefined;
      if (animation === undefined) animation = requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animation !== undefined) cancelAnimationFrame(animation);
      animation = undefined;
      lastFrameAt = undefined;
    };

    const syncAnimation = () => {
      if (canAnimate()) {
        onScroll();
        return;
      }
      stopAnimation();
      if (reduceMotion.matches) paint("right", 0);
    };

    paint("right", 0);
    const observer = typeof IntersectionObserver === "undefined"
      ? undefined
      : new IntersectionObserver(([entry]) => {
        visible = entry.intersectionRatio >= 0.5;
        syncAnimation();
      }, { threshold: 0.5 });
    observer?.observe(track);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("visibilitychange", syncAnimation);
    reduceMotion.addEventListener("change", syncAnimation);
    return () => {
      observer?.disconnect();
      stopAnimation();
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("visibilitychange", syncAnimation);
      reduceMotion.removeEventListener("change", syncAnimation);
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
