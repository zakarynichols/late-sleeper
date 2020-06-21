const canvas = document.querySelector('canvas');

const div = document.querySelector('html');

const context = canvas.getContext('2d');

const width = canvas.width = div.offsetWidth;
const height = canvas.height = div.offsetHeight + 300;

function Star(x, y, velX, velY, color, size) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
};

Star.prototype.draw = function () {
    context.beginPath();
    context.fillStyle = this.color;
    context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
    context.fill();
};

Star.prototype.update = function () {
    this.x += this.velX;
    // The below code will allow you to 
    // adjust the direction the stars move
    // on the y-axis.
    // this.y += this.velY;
};

Star.prototype.reset = function () {
    if (this.x >= width) {
        this.x = 0;
    }

    if (this.y >= height) {
        this.y = 0;
    }
};

function ShootingStar(sx, sy, sVelX, sVelY) {
    this.sx = sx;
    this.sy = sy;
    this.sVelX = sVelX;
    this.sVelY = sVelY;
};

ShootingStar.prototype.draw = function () {
    context.lineWidth = 3;
    context.lineCap = 'round';
    context.beginPath();
    context.moveTo(this.sx, this.sy);
    context.lineTo(this.sx + 150, this.sy + 15);
    context.strokeStyle = "white";
    context.stroke();
};

ShootingStar.prototype.update = function () {
    this.sx += this.sVelX;
    this.sy += this.sVelY;
};

const stars = [];
const shootingStars = [];

for (let i = 0; i < 300; i++) {
    const star = new Star(
        Math.random() * width,
        Math.random() * height,
        .2,
        .2,
        'white',
        Math.random() * 2
    );

    stars.push(star);
}

const shoot = setInterval(function () {
    const shootingStar = new ShootingStar(
        -100,
        Math.random() * height,
        70,
        7
    );

    shootingStars.push(shootingStar);
}, 3000);

function loop() {
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