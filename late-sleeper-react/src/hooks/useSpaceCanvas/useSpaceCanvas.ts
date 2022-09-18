import { useEffect, useRef } from "react";
import { ShootingStar } from "./ShootingStar";
import { Star } from "./Star";

/* Imperatively setup the dynamic 2D space background */
export function useSpaceCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Make sure a ref has been attached to a DOM element
    if (canvasRef.current === null) return;

    const context = canvasRef.current.getContext("2d");

    if (context === null) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    const stars = createStars({ width, height });

    const shootingStars = shootingStar({
      windowHeight: height,
      intervalMs: 2300,
    });

    // Start main animation loop
    animate({
      context,
      windowWidth: width,
      windowHeight: height,
      stars,
      shootingStars,
    });
  }, []);

  return { canvasRef };
}

/* Paints the base stars */
function createStars(params: { width: number; height: number }): Star[] {
  const stars: Star[] = [];

  for (let i = 0; i < 300; i++) {
    const star = new Star(
      Math.random() * params.width,
      Math.random() * params.height,
      0.3,
      0.0,
      "white",
      Math.random() * 2
    );
    stars.push(star);
  }

  return stars;
}

/* Paints and shoots a shooting star on an interval */
function shootingStar(params: { windowHeight: number; intervalMs: number }) {
  const shootingStars: ShootingStar[] = [];

  const shootingStar = new ShootingStar({
    posX: Math.random() * -100, // To come in from off screen, set the x-axis negative.
    posY: Math.random() * params.windowHeight, // Randomly come in from the y-axis.
    velX: 60, // Speed on x-axis.
    velY: 7, // Speed on y-axis. Drops fast when set too high
  });
  shootingStars.push(shootingStar);

  return shootingStars;
}

/* The function to call when it's time to update the animation for the next repaint. */
function animate(params: {
  context: CanvasRenderingContext2D;
  windowWidth: number;
  windowHeight: number;
  stars: Star[];
  shootingStars: ShootingStar[];
}): void {
  const { context, windowWidth, windowHeight, stars, shootingStars } = params;
  if (context === null) throw new Error("missing 2d context");

  context.clearRect(0, 0, windowWidth, windowHeight);

  for (let i = 0; i < stars.length; i++) {
    stars[i].draw(context);
    stars[i].update();
    stars[i].reset(windowWidth, windowHeight);
  }

  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].draw(context);
    shootingStars[i].update();
    shootingStars[i].reset(windowWidth, windowHeight);
  }

  /**
   * The first frame fires and subsequent frames get cleaned up.
   * Easiest way to observe this behavior is in the Performance
   * chrome tools tab and profile the app.
   */
  const frameId = requestAnimationFrame(() => {
    animate({
      context,
      windowWidth,
      windowHeight,
      stars,
      shootingStars,
    });

    // *Might* return a cancel callback if they don't want an animated background.
    // cancelAnimationFrame(frameId);
  });
}
