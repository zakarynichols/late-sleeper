import { useEffect, useRef } from "react";
import { newShootingStar } from "./ShootingStar";
import { newStar } from "./Star";

/* Imperatively setup the dynamic 2D space background */
export function useSpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Make sure a ref has been attached to a DOM element.
    // In the future might allow a ref to be passed if one
    // already is attached to a canvas element.
    if (canvasRef.current === null) return;

    const context = canvasRef.current.getContext("2d");

    if (context === null) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Start main animation loop
    animate({
      context,
      windowWidth: width,
      windowHeight: height,
      stars: createStars({ width, height }),
      shootingStar: shootingStar({
        windowHeight: height,
        intervalMs: 2300,
      }),
    });
  }, []);

  return { canvasRef };
}

function createStars(params: { width: number; height: number }) {
  let stars: ReturnType<typeof newStar>[] = [];
  for (let i = 0; i < 300; i++) {
    const star = newStar({
      posX: Math.random() * params.width,
      posY: Math.random() * params.height,
      velX: 0.3,
      velY: 0.0,
      color: "white",
      size: Math.random() * 2,
    });
    stars = stars.concat(star);
  }

  return stars;
}

function shootingStar(params: { windowHeight: number; intervalMs: number }) {
  const shootingStar = newShootingStar({
    posX: Math.random() * -100, // To come in from off screen, set the x-axis negative.
    posY: Math.random() * params.windowHeight, // Randomly come in from the y-axis.
    velX: 60, // Speed on x-axis.
    velY: 7, // Speed on y-axis. Drops fast when set too high
  });

  return shootingStar;
}

/* The function to call when it's time to update the animation for the next repaint. */
function animate(params: {
  context: CanvasRenderingContext2D;
  windowWidth: number;
  windowHeight: number;
  stars: ReturnType<typeof newStar>[];
  shootingStar: ReturnType<typeof newShootingStar>;
}): void {
  const { context, windowWidth, windowHeight, stars, shootingStar } = params;
  if (context === null) throw new Error("missing 2d context");

  context.clearRect(0, 0, windowWidth, windowHeight);

  stars.forEach((star) => {
    star.draw(context);
    star.update();
    star.reset(windowWidth, windowHeight);
  });

  shootingStar.draw(context);
  shootingStar.update();
  shootingStar.reset(windowWidth, windowHeight);

  /**
   * Start the animation. Returns an id for each frame.
   */
  const _frameId = requestAnimationFrame(() => {
    animate({
      context,
      windowWidth,
      windowHeight,
      stars,
      shootingStar,
    });

    // *Might* return a cancel callback if they don't want an animated background.
    // cancelAnimationFrame(frameId);
  });
}
