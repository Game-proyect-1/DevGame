class Platform {
  constructor(ctx) {
    this.ctx = ctx;
    this.posX = window.innerWidth * 1.1 - window.innerWidth;
    this.posY = window.innerHeight / 1.4;
    this.width = window.innerWidth/1.3;
    this.height = window.innerHeight / 9;
    this.posX = window.innerWidth / 2 - this.width / 2;
    this.posY = window.innerHeight / 1.4;

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

const leftGap = (window.innerWidth*1.1) - window.innerWidth;
const rightGap = (window.innerWidth*1.1) - window.innerWidth + window.innerWidth/1.3;
