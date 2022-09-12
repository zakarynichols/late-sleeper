const canvas = document.querySelector("canvas");

if (canvas === null) throw new Error("cannot find canvas element");

const htmlEl = document.querySelector("html");

if (htmlEl === null) throw new Error("cannot find html element");

const context = canvas.getContext("2d");

const width = (canvas.width = htmlEl.offsetWidth);
const height = (canvas.height = htmlEl.offsetHeight + 100);

class Star {
  x: number;
  y: number;
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
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
  }

  draw(): void {
    if (context === null) throw new Error("missing 2d context");

    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    context.fill();
  }

  update(): void {
    this.x += this.velX;
    this.y += this.velY;
  }

  reset(): void {
    if (this.x >= width) {
      this.x = 0;
    }

    if (this.y >= height) {
      this.y = 0;
    }
  }
}

class ShootingStar {
  x: number;
  y: number;
  velX: number;
  velY: number;

  constructor(x: number, y: number, velX: number, velY: number) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
  }

  draw(): void {
    if (context === null) throw new Error("missing 2d context");

    context.lineWidth = 3;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(this.x, this.y);
    context.lineTo(this.x + 150, this.y + 15);
    context.strokeStyle = "white";
    context.stroke();
  }

  update(): void {
    this.x += this.velX;
    this.y += this.velY;
  }
}

const stars: Star[] = [];
const shootingStars: ShootingStar[] = [];

function paint(): void {
  for (let i = 0; i < 300; i++) {
    const star: Star = new Star(
      Math.random() * width,
      Math.random() * height,
      0.3,
      0.0,
      "white",
      Math.random() * 2
    );

    stars.push(star);
  }
}

paint();

function shoot(): void {
  setInterval(() => {
    const shootingStar = new ShootingStar(-100, Math.random() * height, 70, 7);
    shootingStars.push(shootingStar);

    /* For performance sake, remove the previous shooting star from the array */
    while (shootingStars.length > 1) {
      shootingStars.shift();
    }
  }, 2000);
}

shoot();

function loop(): void {
  if (context === null) throw new Error("missing 2d context");

  context.clearRect(0, 0, width, height);
  for (let i = 0; i < stars.length; i++) {
    stars[i].draw();
    stars[i].update();
    stars[i].reset();
  }

  for (let i = 0; i < shootingStars.length; i++) {
    shootingStars[i].draw();
    shootingStars[i].update();
  }

  requestAnimationFrame(loop);
}

loop();
