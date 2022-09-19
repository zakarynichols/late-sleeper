export type ShootingStar = {
  posX: number; // Point on the x-axis to draw the star
  posY: number; // Point on the y-axis to draw the star
  velX: number; // Speed of the star on the x-axis
  velY: number; // Speed of the star on the y-axis
};

export function newShootingStar(params: ShootingStar) {
  return {
    // Called for each animation frame to create the star
    draw: (context: CanvasRenderingContext2D) => {
      context.lineWidth = 3;
      context.lineCap = "round";
      context.beginPath();
      context.moveTo(params.posX, params.posY);
      context.lineTo(params.posX + 150, params.posY + 15);
      context.strokeStyle = "white";
      context.stroke();
    },
    update: () => {
      params.posX += params.velX;
      params.posY += params.velY;
    },
    reset: (width: number, height: number) => {
      if (
        params.posX - 100 >= width && // Start off screen
        params.posY >= height * 2.5 // If star position is 2.5 times off screen
      ) {
        params.posX = -100;
        params.posY = Math.random() * height;
      }
    },
  };
}
