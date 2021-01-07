var canvas = document.querySelector('canvas');
var div = document.querySelector('html');
var context = canvas.getContext('2d');
var width = canvas.width = div.offsetWidth;
var height = canvas.height = div.offsetHeight + 100;
var Star = /** @class */ (function () {
    function Star(x, y, velX, velY, color, size) {
        this.x = x;
        this.y = y;
        this.velX = velX;
        this.velY = velY;
        this.color = color;
        this.size = size;
    }
    ;
    Star.prototype.draw = function () {
        context.beginPath();
        context.fillStyle = this.color;
        context.arc(this.x, this.y, this.size, 0, 2 * Math.PI, false);
        context.fill();
    };
    ;
    Star.prototype.update = function () {
        this.x += this.velX;
        this.y += this.velY;
    };
    ;
    Star.prototype.reset = function () {
        if (this.x >= width) {
            this.x = 0;
        }
        ;
        if (this.y >= height) {
            this.y = 0;
        }
        ;
    };
    ;
    return Star;
}());
;
var ShootingStar = /** @class */ (function () {
    function ShootingStar(sx, sy, sVelX, sVelY) {
        this.sx = sx;
        this.sy = sy;
        this.sVelX = sVelX;
        this.sVelY = sVelY;
    }
    ;
    ShootingStar.prototype.draw = function () {
        context.lineWidth = 3;
        context.lineCap = 'round';
        context.beginPath();
        context.moveTo(this.sx, this.sy);
        context.lineTo(this.sx + 150, this.sy + 15);
        context.strokeStyle = "white";
        context.stroke();
    };
    ;
    ShootingStar.prototype.update = function () {
        this.sx += this.sVelX;
        this.sy += this.sVelY;
    };
    ;
    return ShootingStar;
}());
;
var stars = [];
var shootingStars = [];
var paint = function () {
    for (var i = 0; i < 300; i++) {
        var star = new Star(Math.random() * width, Math.random() * height, .3, .0, 'white', Math.random() * 2);
        stars.push(star);
    }
    ;
};
paint();
var shoot = function () {
    setInterval(function () {
        var shootingStar = new ShootingStar(-100, Math.random() * height, 70, 7);
        shootingStars.push(shootingStar);
        while (shootingStars.length > 1) {
            shootingStars.shift();
        }
        ;
    }, 2000);
};
shoot();
var loop = function () {
    context.clearRect(0, 0, width, height);
    for (var i = 0; i < stars.length; i++) {
        stars[i].draw();
        stars[i].update();
        stars[i].reset();
    }
    ;
    for (var i = 0; i < shootingStars.length; i++) {
        shootingStars[i].draw();
        shootingStars[i].update();
    }
    ;
    requestAnimationFrame(loop);
};
loop();
