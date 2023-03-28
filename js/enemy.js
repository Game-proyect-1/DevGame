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

    this.imageLeft = new Image();
    this.imageLeft.src = "./img/sprites juego/enemy/enemywalkderecha.png";
    this.imageLeft.frames = 16;
    this.imageLeft.framesIndex = 0;

    this.lives = 150;

    this.imagewin = new Image();
    this.imagewin.src = "./img/sprites juego/background/win.png";

    this.posX = this.gameWidth - this.gameWidth + this.height;
    this.posY = window.innerHeight / 1.35 - window.innerHeight / 9;
    this.posY0 = this.posY;
    this.posX0 = this.posX;
    this.isMovingRight = true;
    this.isMovingLeft = false;
    this.isDead = false;

    this.velX = 2;
    this.aceleration = 0.002;
  }

  draw(framesCounter) {
    if (this.isMovingRight)
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
    if (this.isMovingLeft)
      this.ctx.drawImage(
        this.imageLeft,
        (this.imageLeft.width / this.imageLeft.frames) *
          this.imageLeft.framesIndex,
        0,
        this.imageLeft.width / this.imageLeft.frames,
        this.imageLeft.height,
        this.posX,
        this.posY,
        this.width,
        this.height
      );

    this.animate(framesCounter);

    this.move();
  }
  animate(framesCounter) {
    if (framesCounter % 5 == 0 && this.isMovingRight) {
      this.image.framesIndex++;
    }
    if (framesCounter % 5 == 0 && this.isMovingLeft) {
      this.imageLeft.framesIndex++;
    }
    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
    if (this.imageLeft.framesIndex >= this.imageLeft.frames) {
      this.imageLeft.framesIndex = 0;
    }
  }
  move() {
    this.velX += this.aceleration;
    if (
      this.isMovingRight &&
      this.posX + this.width >= window.innerWidth / 1.1
    ) {
      this.posX = this.posX - this.velX;
      this.isMovingLeft = true;
      this.isMovingRight = false;
    } else {
      if (
        this.isMovingLeft &&
        this.posX + this.width <= window.innerWidth / 2 - window.innerWidth / 3
      ) {
        this.posX = this.posX + this.velX;
        this.isMovingRight = true;
        this.isMovingLeft = false;
      } else {
        if (this.isMovingRight) {
          this.posX = this.posX + this.velX;
        } else {
          this.posX = this.posX - this.velX;
        }
      }
    }
  }
}
