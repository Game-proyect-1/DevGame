class Obstacle {
  // porque los obstaculos tardan tanto en empezar a generarse
  constructor(ctx, gameWidth, playerPosY0, playerHeight) {
    this.ctx = ctx;
    this.width = 100;
    this.height = this.width * 1;

    this.posX = gameWidth - this.width;
    this.posY = playerPosY0 + playerHeight - this.height;

    this.velX = 1;
    this.image = new Image();
    this.image.src = "./img/sprites juego/obstaculos.png";
    this.image.frames = 4;
    this.image.framesIndex = 0;
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
    this.move();
    this.animate();
  }

  move() {
    // Change this.posX (Move horizontally)
    this.posX -= this.velX;
  }
  animate(framesCounter) {
    if (framesCounter % 5 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }
}
