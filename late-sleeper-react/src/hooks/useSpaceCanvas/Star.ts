export class Star {
  posX: number;
  posY: number;
  velX: number;
  velY: number;
  color: string;
  size: number;

  constructor(
    x: number,
    y: number,
    velX: number,
    velY: number,
    color: string,
    size: number
  ) {
    this.posX = x;
    this.posY = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  public draw(context: CanvasRenderingContext2D): void {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.posX, this.posY, this.size, 0, 2 * Math.PI, false);
    context.fill();
  }

  public update(): void {
    this.posX += this.velX;
    this.posY += this.velY;
  }

  /* Once a star is off-screen, reset it to zero to reuse the same stars. */
  public reset(width: number, height: number): void {
    if (this.posX >= width) {
      this.posX = 0;
    }

    if (this.posY >= height) {
      this.posY = 0;
    }
  }
}
