class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 130;
    this.height = 130;

    this.image = new Image();
    this.image.src =
      "./img/sprites juego/player/player quieto derecha.izquierda.png";
    this.image.frames = 8;
    this.image.framesIndex = 0;

    this.lives = 3;
    this.livesImage = new Image();
    this.livesImage.src = "./img/sprites juego/player/life.png";
    this.lifePosX = this.gameWidth - 100;
    this.lifePosY = 0;

    //imagen Game Over PREGUNTAR PORQUE AQUI FUNCIONA Y EN GAME.JS NO
    this.imageGameOver = new Image();
    this.imageGameOver.src = "./img/sprites juego/player/gameover.png";

    this.posX = this.gameWidth - this.width * 1.5;
    this.posY = this.gameHeight - this.height * 1.5; //pegado al suelo
    this.posY0 = this.posY;
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.lifeTimeCount = 0;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
    this.velY = 1;
    this.velX = 8;
    this.gravity = 0.6;
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

    //Pintar balas
    this.bullets.forEach(function (bullet) {
      bullet.draw();
    });
    let lifePosX = this.lifePosX;
    for (let index = 0; index < this.lives; index++) {
      //Pintar vidas
      this.ctx.drawImage(this.livesImage, lifePosX, this.lifePosY, 80, 80);
      lifePosX -= 60;
    }

    this.clearBullets();
  }
  setListeners() {
    document.addEventListener("keydown", (e) => {
      switch (e.keyCode) {
        case this.keys.jump:
          if (this.posY >= this.posY0) {
            this.jump();
          }
          break;
        case this.keys.shoot:
          this.shoot();
          break;
        case this.keys.rigth:
          this.moveRigth();
          break;
        case this.keys.left:
          this.moveLeft();
          break;
        case this.keys.target:
          this.target();
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case this.keys.rigth:
          this.stop();
          break;
        case this.keys.left:
          this.stop();
          break;
      }
    });
  }

  shoot() {
    let bullet = new Bullets(
      this.ctx,
      this.posX,
      this.posY,
      this.posY0,
      this.width,
      this.height
    );
    this.bullets.push(bullet);
    console.log(bullet);
    bullet.draw();
  }
  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => {
      return bullet.posX >= 0;
    });
  }

  moveRigth() {
    // refactorizar en una sola función??
    // if (this.posX + this.width >= this.gameWidth) {
    //   this.posX = 0;
    // } //por si queremos que de derecha pueda volver al inicio
    this.isMovingRight = true;
    this.image.src = "./img/sprites juego/player/andarPlayer.png";
    this.image.frames = 15;

    //this.posX += 80;
  }

  moveLeft() {
    // if ((this.posX = this.gameWidth - this.gameWidth)) {
    //   this.posX = this.gameWidth;
    // } //por si queremos que de la izquierda pueda volver a la derecha del todo, PERO AHORA NO FUNCIONA
    this.isMovingLeft = true;
    this.image.src =
      "./img/sprites juego/player/andar player derecha-izquierda.png";
    this.image.frames = 15;
  }

  jump() {
    this.posY -= 80;
    this.velY -= 8;
  }

  stop() {
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.image.src =
      "./img/sprites juego/player/player quieto derecha.izquierda.png";
    this.image.frames = 8;
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
    if (this.posY < this.posY0) {
      // Está saltando
      this.posY += this.velY;
      this.velY += this.gravity; //velocidad caida y frenado paulatino
    } else {
      this.posY = this.posY0;
      this.velY = 1;
    }
    if (this.isMovingRight && this.width + this.posX <= this.gameWidth) {
      this.posX += this.velX;
    }
    if (this.isMovingLeft && this.posX + this.width / 2.5 > 0) {
      //revisar el width /2.5.
      this.posX -= this.velX;
    }
  }
  
}
