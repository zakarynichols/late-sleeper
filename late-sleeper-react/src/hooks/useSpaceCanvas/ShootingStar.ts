export class ShootingStar {
  posX: number; // Point on the x-axis to draw the star
  posY: number; // Point on the y-axis to draw the star
  velX: number; // Speed of the star on the x-axis
  velY: number; // Speed of the star on the y-axis

  constructor(params: {
    posX: number;
    posY: number;
    velX: number;
    velY: number;
  }) {
    this.posX = params.posX;
    this.posY = params.posY;
    this.velX = params.velX;
    this.velY = params.velY;
  }

  // Called for each animation frame to create the star
  public draw(context: CanvasRenderingContext2D) {
    context.lineWidth = 3;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(this.posX, this.posY);
    context.lineTo(this.posX + 150, this.posY + 15);
    context.strokeStyle = "white";
    context.stroke();
  }

  // Move the star across the screen
  public update() {
    this.posX += this.velX;
    this.posY += this.velY;

    return this;
  }

  public reset(width: number, height: number) {
    if (this.posX - 100 >= width) {
      this.posX = 0;
    }

    if (this.posY >= height) {
      this.posY = 0;
    }
  }
}
