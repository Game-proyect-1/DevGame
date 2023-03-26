class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH; //medidas canvas

    this.width = 120; //medidas player
    this.height = 130;

    this.image = new Image(); //imagen  player
    this.image.src =
      "./img/sprites juego/player/player quieto derecha.izquierda.png";
    this.image.frames = 8;
    this.image.framesIndex = 0;

    this.lives = 6; //imagen vidas
    this.livesImage = new Image();
    this.livesImage.src = "./img/sprites juego/player/life.png";
    this.lifePosX = this.gameWidth - 100;
    this.lifePosY = 0;

    //imagen Game Over PREGUNTAR PORQUE AQUI FUNCIONA Y EN GAME.JS NO
    this.imageGameOver = new Image();
    this.imageGameOver.src = "./img/sprites juego/player/gameover.png";

    this.posX = this.gameWidth - this.width * 1.5; //dentro del game donde posicionar al player
    this.posY = this.gameHeight - this.height * 2.5; //pegado al suelo
    this.posY0 = this.posY;
    this.isMoving = false;

    this.isStopped = false; //inicializo booleanos
    this.isLookingLeft = false;
    this.isLookingRigth = false;
    this.lifeTimeCount = 0;

    this.keys = keys;
    this.bullets = [];

    this.setListeners();
    this.velY = 1;
    this.velX = 8;
    this.gravity = 0.6;
    this.shootAudio = new Audio("./img/music/fire2.mp3"); // musica
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
    let lookRigth = this.isLookingRigth;
    //Pintar balas
    this.bullets.forEach(function (bullet) {
      bullet.draw(3);
    });
    //Pintar vidas
    let lifePosX = this.lifePosX;
    for (let index = 0; index < this.lives; index++) {
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
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.keyCode) {
        case this.keys.rigth:
          this.stop(true);
          break;
        case this.keys.left:
          this.stop(false);
          break;
        case this.keys.shoot:
          this.shootAudio.pause();
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
      this.height,
      this.isLookingLeft,
      this.isLookingRigth
    );
    this.bullets.push(bullet); //cuando pulso disparar, agrego una bala al array para que dentro de interval se pinte

    // this.backAudio.pause();
    this.shootAudio.play();
    this.shootAudio.volume = 0.5;
  }
  clearBullets() {
    this.bullets = this.bullets.filter((bullet) => {
      return bullet.posX >= 0;
    });
  }

  moveRigth() {
    // } //por si queremos que de derecha pueda volver al inicio
    this.isStopped = false;
    this.isMoving = true;
    this.isLookingRigth = true;
    this.isLookingLeft = false;
    this.image.src = "./img/sprites juego/player/andarPlayer.png";
    this.image.frames = 15;

    //this.posX += 80;
  }

  moveLeft() {
    // } //por si queremos que de la izquierda pueda volver a la derecha del todo
    this.isStopped = false;
    this.isMoving = true;
    this.isLookingLeft = true;
    this.isLookingRigth = false;
    this.image.src =
      "./img/sprites juego/player/andar player derecha-izquierda.png";
    this.image.frames = 15;
  }

  jump() {
    this.posY -= 80;
    this.velY -= 8;
  }

  stop(isLookingRigth) {
    if (isLookingRigth) {
      this.image.src = "./img/sprites juego/player/quietp.png";
      this.image.frames = 8;
    } else {
      this.image.src =
        "./img/sprites juego/player/player quieto derecha.izquierda.png";
      this.image.frames = 8;
    }
    this.isMoving = false;
    this.isStopped = true;
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

    if (this.isMoving) {
      if (this.isLookingRigth && this.width + this.posX <= this.gameWidth) {
        this.posX += this.velX;
      }

      if (this.isLookingLeft && this.posX + this.width / 2.5 > 0) {
        //revisar el width /2.5.
        this.posX -= this.velX;
      }
    }
  }
}
