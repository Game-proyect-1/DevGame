class Platform {
  constructor(ctx) {
    this.ctx = ctx;
    this.posX = window.innerWidth * 1.1 - window.innerWidth;
    this.posY = window.innerHeight / 1;
    this.width = window.innerWidth / 1.3;
    this.height = window.innerHeight / 9;

    this.image = new Image();
    this.image.src = "./img/sprites juego/Platform/платформа-png-5.png";
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
