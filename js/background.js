class Background {
  constructor(ctx, w, h) {
    this.ctx = ctx;
    this.width = w;
    this.height = h;

    this.image = new Image();
    this.image.src = "./img/sprites juego/background/BACKGROUND 4.png";

    this.posX = 0;
    this.posY = 0;

    // this.velX = 2; // mejor menos?
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.posX,
      this.posY,
      this.width,
      this.height
    );
  }
}
