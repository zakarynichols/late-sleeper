const canvas = document.querySelector('canvas');

const div = document.querySelector('html');

const context = canvas.getContext('2d');

const width = canvas.width = div.offsetWidth;
const height = canvas.height = div.offsetHeight + 300;

class Star {
    constructor(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    };
    draw() {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fill();
    };
    update() {
        this.x += this.velX;
        this.y += this.velY;
    };
    reset() {
        if (this.x >= width) {
            this.x = 0;
        };

        if (this.y >= height) {
            this.y = 0;
        };
    };
};




class ShootingStar {
    constructor(sx, sy, sVelX, sVelY) {
        this.sx = sx;
        this.sy = sy;
        this.sVelX = sVelX;
        this.sVelY = sVelY;
    };
    draw() {
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this.sx, this.sy);
        context.lineTo(this.sx + 150, this.sy + 15);
        context.strokeStyle = "white";
        context.stroke();
    };
    update() {
        this.sx += this.sVelX;
        this.sy += this.sVelY;
    };
};



const stars = [];
const shootingStars = [];

const paint = () => {
    for (let i = 0; i < 300; i++) {
        const star = new Star(
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

const shoot = () => {
    setInterval(() => {
        const shootingStar = new ShootingStar(
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

const loop = () => {
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