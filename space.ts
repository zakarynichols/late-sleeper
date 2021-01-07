const canvas = <HTMLCanvasElement>document.querySelector('canvas');

const div = <HTMLHtmlElement>document.querySelector('html');

const context = canvas.getContext('2d');

const width: number = canvas.width = div.offsetWidth;
const height: number = canvas.height = div.offsetHeight + 100;

class Star {
    x: number;
    y: number;
    velX: number;
    velY: number;
    color: string;
    size: number;

    constructor(x: number, y: number, velX: number, velY: number, color: string, size: number) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    };

    draw(): void {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fill();
    };

    update(): void {
        this.x += this.velX;
        this.y += this.velY;
    };

    reset(): void {
        if (this.x >= width) {
            this.x = 0;
        };

        if (this.y >= height) {
            this.y = 0;
        };
    };
};
class ShootingStar {
    sx: number;
    sy: number;
    sVelX: number;
    sVelY: number;

    constructor(sx: number, sy: number, sVelX: number, sVelY: number) {
        this.sx = sx;
        this.sy = sy;
        this.sVelX = sVelX;
        this.sVelY = sVelY;
    };

    draw(): void {
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this.sx, this.sy);
        context.lineTo(this.sx + 150, this.sy + 15);
        context.strokeStyle = "white";
        context.stroke();
    };

    update(): void {
        this.sx += this.sVelX;
        this.sy += this.sVelY;
    };
};



const stars: Star[] = [];
const shootingStars: ShootingStar[] = [];

const paint = (): void => {
    for (let i = 0; i < 300; i++) {
        const star: Star = new Star(
            Math.random() * width,
            Math.random() * height,
            .3,
            .0,
            'white',
            Math.random() * 2
        );

        stars.push(star);
    };
};

paint();

const shoot = (): void => {
    setInterval(() => {
        const shootingStar: ShootingStar = new ShootingStar(
            -100,
            Math.random() * height,
            70,
            7
        );
        shootingStars.push(shootingStar);
        while (shootingStars.length > 1) {
            shootingStars.shift();
        };
    }, 2000);
};

shoot();

const loop = (): void => {
    context.clearRect(0, 0, width, height);
    for (let i = 0; i < stars.length; i++) {
        stars[i].draw();
        stars[i].update();
        stars[i].reset();
    };

    for (let i = 0; i < shootingStars.length; i++) {
        shootingStars[i].draw();
        shootingStars[i].update();
    };

    requestAnimationFrame(loop);
};

loop();