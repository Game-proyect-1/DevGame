class Obstacle {
  // porque los obstaculos tardan tanto en empezar a generarse
  constructor(ctx, gameWidth, playerPosY0, playerHeight) {
    this.ctx = ctx;
    this.width = 50;
    this.height = this.width * 2;

    this.posX = gameWidth - this.width;
    this.posY = playerPosY0 + playerHeight - this.height;

    this.velX = 1;
    this.image = new Image();
    this.image.src = "./img/sprites juego/obstaculos.png";
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
    this.move();
  }

  move() {
    // Change this.posX (Move horizontally)
    this.posX -= this.velX;
  }
}
