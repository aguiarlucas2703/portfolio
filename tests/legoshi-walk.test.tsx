import { render } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { LegoshiWalk } from "../app/components/LegoshiWalk";

function renderWalk() {
  const context = {
    beginPath: vi.fn(),
    clearRect: vi.fn(),
    closePath: vi.fn(),
    fill: vi.fn(),
    fillRect: vi.fn(),
    lineTo: vi.fn(),
    moveTo: vi.fn(),
  };
  vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(
    context as unknown as CanvasRenderingContext2D,
  );

  let time = 0;
  let frameId = 0;
  const frames = new Map<number, FrameRequestCallback>();
  vi.spyOn(performance, "now").mockImplementation(() => time);
  vi.spyOn(document, "hidden", "get").mockReturnValue(false);
  vi.stubGlobal("requestAnimationFrame", (callback: FrameRequestCallback) => {
    frames.set(++frameId, callback);
    return frameId;
  });
  vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));

  let updateVisibility: (intersectionRatio: number) => void = () => {};
  vi.stubGlobal("IntersectionObserver", class {
    constructor(callback: (entries: { intersectionRatio: number }[]) => void) {
      updateVisibility = (intersectionRatio) => {
        callback([{ intersectionRatio }]);
      };
    }

    observe() {}
    disconnect() {}
  });
  const motion = Object.assign(new EventTarget(), { matches: false });
  vi.stubGlobal("matchMedia", () => motion);

  const { container } = render(<LegoshiWalk />);
  const sprite = container.querySelector("canvas")!;

  return {
    advance(milliseconds: number) {
      const end = time + milliseconds;
      while (time < end) {
        time = Math.min(time + 25, end);
        const pending = [...frames.values()];
        frames.clear();
        for (const callback of pending) callback(time);
      }
    },
    facing: () => sprite.dataset.facing,
    hasPendingFrame: () => frames.size > 0,
    position: () => Number(sprite.style.getPropertyValue("--walk-progress")),
    reduceMotion() {
      motion.matches = true;
      motion.dispatchEvent(new Event("change"));
    },
    scroll: () => window.dispatchEvent(new Event("scroll")),
    setVisible: (visible: boolean) => updateVisibility(visible ? 1 : 0),
  };
}

afterEach(() => {
  vi.mocked(HTMLCanvasElement.prototype.getContext).mockReturnValue(null);
  vi.restoreAllMocks();
  vi.unstubAllGlobals();
});

describe("Legoshi's walk", () => {
  it("turns and waves after two seconds without scrolling, then waits for the next scroll", () => {
    const walk = renderWalk();
    walk.setVisible(true);
    walk.advance(1750);
    walk.scroll();
    walk.advance(1900);
    expect(walk.facing()).toBe("right");

    walk.advance(125);
    expect(walk.facing()).toBe("front");
    expect(walk.hasPendingFrame()).toBe(true);
    const pausedPosition = walk.position();

    walk.advance(2000);
    expect(walk.hasPendingFrame()).toBe(false);
    expect(walk.facing()).toBe("front");
    expect(walk.position()).toBe(pausedPosition);

    walk.scroll();
    walk.advance(25);
    expect(walk.facing()).toBe("right");
    expect(walk.position()).toBe(pausedPosition);
    walk.advance(125);
    expect(walk.position()).toBeGreaterThan(pausedPosition);
  });

  it("pauses at the end of the track and walks back when scrolling continues", () => {
    const walk = renderWalk();
    walk.setVisible(true);

    for (let interval = 0; interval < 16; interval++) {
      walk.scroll();
      walk.advance(300);
    }
    expect(walk.position()).toBe(1);
    expect(walk.facing()).toBe("right");

    walk.scroll();
    walk.advance(350);
    expect(walk.position()).toBe(1);

    walk.scroll();
    walk.advance(300);
    expect(walk.facing()).toBe("left");
    expect(walk.position()).toBeLessThan(1);
  });

  it("pauses offscreen and stays still when reduced motion is requested", () => {
    const walk = renderWalk();
    walk.setVisible(true);
    walk.advance(600);
    const position = walk.position();

    walk.setVisible(false);
    walk.scroll();
    walk.advance(3000);
    expect(walk.position()).toBe(position);
    expect(walk.hasPendingFrame()).toBe(false);

    walk.setVisible(true);
    walk.reduceMotion();
    walk.scroll();
    walk.advance(3000);
    expect(walk.position()).toBe(position);
    expect(walk.hasPendingFrame()).toBe(false);
  });
});
