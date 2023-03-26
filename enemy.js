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

    this.posX = this.gameWidth - this.gameWidth + this.height;
    this.posY = this.gameHeight - this.height * 2.5; //pegado al suelo
    this.posY0 = this.posY;
    this.posX0 = this.posX;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.isDead = false;

    this.velX = 2;
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
  }
}
