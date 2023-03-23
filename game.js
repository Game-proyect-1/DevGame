const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  FPS: 60,
  framesCounter: 0,
  background: undefined,
  player: undefined,
  enemy: undefined,
  platform: undefined,

  keys: {
    jump: 38,
    shoot: 32,
    rigth: 39,
    left: 37,
    down: 40,
    target: 90,
  },

  init() {
    this.setContext();
    this.setDimensions();
    this.start();
  },
  setContext() {
    this.canvas = document.querySelector("#myCanvas");
    this.ctx = this.canvas.getContext("2d");
  },
  setDimensions() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.setAttribute("width", this.width);
    this.canvas.setAttribute("height", this.height);
  },

  start() {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }

      this.clear();

      // this.updateLifeBar();

      this.drawAll();

      // this.generateObstacles();

      // this.clearObstacles();
      if (this.player.lifeTimeCount !== 0) {
        this.player.lifeTimeCount--;
      }

      if (this.isCollision()) {
        if (this.player.lives == 0) {
          this.gameOver();
        } else {
          if (this.player.lifeTimeCount == 0) {
            this.player.lives--;
            this.player.lifeTimeCount = 30;
          }
        }
      }
    }, 1000 / this.FPS);

    this.clearBullets();
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);

    this.player = new Player(this.ctx, this.width, this.height, this.keys);
    this.enemy = new Enemy(this.ctx, this.width, this.height);

    // this.lifeBar = new Lifebar(this.ctx, this.width, this.height);

    // this.platform = new Platform(
    //   this.ctx,
    //   this.gameWidth,
    //   this.playerPosY0,
    //   this.playerHeight0
    // );
  },

  drawAll() {
    this.background.draw();

    this.player.draw(this.framesCounter);
    if (!this.enemy.isDead) {
      this.enemy.draw(this.framesCounter);
    }

    //  this.lifeBar.draw()

    // this.platform.draw();

    this.player.bullets.map((bullet, index) => {
      // si hay colision bullet enemy, se borra la bala y se quita una vida al enemigo
      if (bullet.isCollisionBullet(this.enemy.posX, this.enemy.posY)) {
        this.player.bullets.splice(index, 1);
        this.enemy.lives--;
        if (this.enemy.lives == 0) {
          this.enemy.isDead = true;
        }
      }
    });
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  isCollision() {
    return (
      this.player.posX - this.enemy.posX <= 50 &&
      this.enemy.posX - this.player.posX <= 50 &&
      this.player.posY >= this.enemy.posY
    );
  },

  clearBullets() {
    this.player.bullets = this.player.bullets.map((bullet) => {
      if (this.isCollision) {
        let bulletCollision = this.player.bullets.indexOf(bullet);
        this.player.bullets.splice(bulletCollision, 1);
      }
    });
  },
  gameOver() {
    // .clearInterval
    this.ctx.drawImage(
      this.player.imageGameOver,
      this.width / 2 - 250,
      200,
      500,
      250
    );
    clearInterval(this.interval);
  },
};

// generar obstaculos
// borrar obstaculos
// colisión ,
// contador vida player, sino hay colision y el enemigo sale del ancho de la
//destructionEnemy
// podemos meter función , colisión lineas extra arriba por ejemplo
// game over (  clearInterval(this.intervalId) )
