class Bullets {
  constructor(
    ctx,
    playerPosX,
    playerPosY,
    playerPosY0,
    playerWidth,
    playerHeight,
    isMovingLeft,
    isMovingRight
  ) {
    this.ctx = ctx;

    this.posX = playerPosX;
    this.posY = playerPosY + playerHeight * 0.5; //mitad del player

    this.playerPosY0 = playerPosY0;
    this.playerHeight = playerHeight;

    this.radius = 10;

    this.velX = 8;
    this.velY = 4;

    this.gravity = 0.02;
    this.width = 50;
    this.height = 50;

    this.isMovingRight = isMovingRight;
    this.isMovingLeft = isMovingLeft;

    this.image = new Image();
    this.image.src = "./img/sprites/2/fire.png";
    this.image.frames = 6;
    this.image.framesIndex = 0;
  }

  draw(framesCounter) { //cada vez que en game llamo a draw, pinta, animate con frames y se mueve
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

  move() {
    
    if (this.isMovingRight) {
      this.posX += this.velX;
    } else {
      this.posX -= this.velX;
    }

    this.posY -= this.velY;
    this.velY += this.gravity;

    if (this.posY < this.playerPosY0) {
      this.gravity -= 0.02;
    } else {
    }
  }

  animate(framesCounter) {
    if (framesCounter % 1 == 0) {
      this.image.framesIndex++;
    }

    if (this.image.framesIndex >= this.image.frames) {
      this.image.framesIndex = 0;
    }
  }

  isCollisionBullet(posX, posY) {
    return (
      this.posX - posX <= 50 && posX - this.posX <= 50 && this.posY >= posY // es la posicion del enemy menos la posicion de la bala, si restadas dan menos, es que se han chocado
    );
  }
}
