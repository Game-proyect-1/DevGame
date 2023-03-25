// class Platform {
//   constructor(ctx, gameWidth, playerPosY0, playerHeight) {
//     this.ctx = ctx;
//     this.posX = 75;
//     this.posY = 905;
//     this.width = 1700;
//     this.height = 60;
//   }
//   draw() {
//     this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
//   }
// }

// // Un extends de platform, para disminuir el tamaño de la plataforma.

// class HalfPlatform extends Platform {
//   constructor(ctx, gameWidth, playerPosY0, playerHeight) {
//     this.ctx = ctx;
//     this.posX = 50;
//     this.posY = 705;
//     this.width = 900;
//     this.height = 30;
//   }
//   draw() {
//     this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
//   }
// }
class Platform {
  constructor(ctx, width, height, gameW, gameH) {
    this.ctx = ctx;
    this.width = 1300;
    this.height = 100;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.image = new Image();
    this.image.src = "./img/sprites juego/Platform/платформа-png-5.png";
    this.posX = gameW / 8;
    this.posY = 528;
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
