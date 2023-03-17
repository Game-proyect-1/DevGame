class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 150;
    this.height = 150;

    this.image = new Image();
    this.image.src = "./img/sprites/2/Idle.png";
    this.image.frames = 4;
    this.image.framesIndex = 0;

    this.posX = this.gameWidth - this.width * 1.5;
    this.posY = this.gameHeight - this.height * 1.5; //pegado al suelo
    this.posY0 = this.posY;
    this.isMovingRight = false;
    this.isMovingLeft = false;

    this.keys = keys;

    this.bullets = [];

    this.setListeners();
    this.velY = 2;
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

    this.bullets.forEach(function (bullet) {
      bullet.draw();
    });

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
        case this.keys.space:
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
    // Add new Bullet to the bullets array
    this.bullets.push(
      new Bullets(
        this.ctx,
        this.posX,
        this.posY,
        this.posY0,
        this.width,
        this.height
      )
    );
  }
  clearBullets() {
    // Clear bullets (.filter 👀)
    this.bullets = this.bullets.filter((bullet) => {
      return bullet.posX <= this.gameWidth;
    });
  }

  moveRigth() {
    // refactorizar en una sola función
    this.isMovingRight = true;
    this.image.src = "./img/sprites/2/Walk.png";
    this.image.frames = 6;

    //this.posX += 80;
  }

  moveLeft() {
    this.isMovingLeft = true;
    this.image.src = "./img/sprites/2/Walk.png";
    this.image.frames = 6;
    //this.posX -= 80;
  }

  jump() {
    this.posY -= 80;
    this.velY -= 8;
  }

  stop() {
    this.isMovingRight = false;
    this.isMovingLeft = false;
    this.image.src = "./img/sprites/2/Idle.png";
    this.image.frames = 4;
  }
  target() {}

  //   clearBullets() {
  //     // Clear bullets (.filter 👀)
  //     this.bullets = this.bullets.filter((bullet) => {
  //       return bullet.posX <= this.gameWidth;
  //     });
  //   }

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
      //revisar el width /2.5. Por que??
      this.posX -= this.velX;
    }
  }

  // aqui no tendría que llamar a move???
}
// generar ataque
// recibir daño, sumar vida, ¿agacharse?

// cuando se de a la Z no se mueva sino que apunte.
