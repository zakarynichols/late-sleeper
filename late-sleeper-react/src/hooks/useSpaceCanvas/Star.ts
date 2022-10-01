type Star = {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
  color: string;
  size: number;
};

export function newStar(params: Star) {
  return {
    draw: (context: CanvasRenderingContext2D) => {
      context.beginPath();
      context.fillStyle = params.color;
      context.arc(params.posX, params.posY, params.size, 0, 2 * Math.PI, false);
      context.fill();
    },
    update: () => {
      params.posX += params.velX;
      params.posY += params.velY;
    },

    /* Once a star is off-screen, reset it to zero to reuse the same stars. */
    reset: (width: number, height: number) => {
      if (params.posX >= width) {
        params.posX = 0;
      }

      if (params.posY >= height) {
        params.posY = 0;
      }
    },
  };
}
