// this.posX = window.innerWidth * 1.1 - window.innerWidth;
//     this.posY = window.innerHeight / 1.4;
//     this.width = window.innerWidth / 1.2;
//     this.height = window.innerHeight / 9;

class Enemy {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 130;
    this.height = 130;

    this.image = new Image();
    this.image.src = "./img/sprites juego/enemy/andar enemy.png";
    this.image.frames = 16;
    this.image.framesIndex = 0;

    this.lives = 50;

    this.imagewin = new Image();
    this.imagewin.src = "./img/sprites juego/background/win.png";

    this.posX = window.innerWidth * 1.1 - window.innerWidth;
    this.posY = (window.innerHeight / 1.4) - (window.innerHeight / 9);
    this.posY0 = this.posY;
    this.posX0 = this.posX;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isDead = false;

    this.velX = 2;
    this.velY = 0;
    this.aceleration = 0.002;
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      (this.image.width / this.image.frames) * this.image.framesIndex,
      0,
      this.image.width / this.image.frames,
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    );

    this.animate(framesCounter);

    this.move();
  }
  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }
  move() {
    this.velX += this.aceleration;
    this.posX += this.velX;
    if (this.posX + this.width >= this.gameWidth) {
      this.posX = this.posX0;
    }
    if (this.posX + this.width >= rightGap) {
      this.posY += (this.velY+1)*10;
    }
  }
}
