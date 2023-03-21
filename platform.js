class Platform {
  constructor(ctx) {
    this.ctx = ctx;
    this.posX = (window.innerWidth*1.1) - window.innerWidth;
    this.posY = window.innerHeight/1.2;
    this.width = window.innerWidth/1.3;
    this.height = window.innerHeight/9;
  }
 draw() {
   this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
 }
}

// Un extends de platform, para disminuir el tamaño de la plataforma.

class HalfPlatform extends Platform {
 constructor(ctx, gameWidth, playerPosY0, playerHeight) {
   this.ctx = ctx;
   this.posX = 50;
   this.posY = 705;
   this.width = 900;
   this.height = 30;
 }
 draw() {
   this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
 }
}
