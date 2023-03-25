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
  obstacles: [],
  score: 0,
  backAudio: new Audio("./img/music/finalFantasy.mp4"), // musica

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
    this.reset(); //instancias

    this.interval = setInterval(() => {
      // intervalo
      this.framesCounter++;
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
      }

      this.clear(); //borra todo el canvas

      this.drawAll(); //pinta todo el canvas

      this.generateObstacles();

      this.clearObstacles();
      this.sumScore();

      if (this.player.lifeTimeCount !== 0) {
        //contador tiempo player desde que choca con enemy, para que no muera de golpe
        this.player.lifeTimeCount--;
      }

      if (this.isCollision()) {
        if (this.player.lives == 0) {
          //si al colisionar tiene 0 vidas, llama GAMEOVER
          this.gameOver();
        } else {
          if (this.player.lifeTimeCount == 0) {
            //al chocar, el contador vuelve a 30, por lo que al player no pierde las 3 vidas a la vez(por el interval)
            this.player.lives--;
            this.player.lifeTimeCount = 40;
          }
        }
        if (this.enemy.lives == 0) {
        }
      }
    }, 1000 / this.FPS);

    this.clearBullets(); //quitar balas fuera de pantalla
  },

  reset() {
    //instancias
    this.background = new Background(this.ctx, this.width, this.height);

    this.player = new Player(this.ctx, this.width, this.height, this.keys);
    this.enemy = new Enemy(this.ctx, this.width, this.height);
    this.platform = new Platform(
      this.ctx,
      this.width,
      this.height,
      this.player.posX
    );

    this.backAudio.play();
  },

  drawAll() {
    this.background.draw();

    this.player.draw(this.framesCounter);
    if (!this.enemy.isDead) {
      this.enemy.draw(this.framesCounter);
    }

    this.platform.draw();

    this.obstacles.forEach(function (obs) {
      obs.draw();
    });
    this.printScore();

    this.player.bullets.map((bullet, index) => {
      // si hay colision bullet enemy, se borra la bala y se quita una vida al enemigo
      if (bullet.isCollisionBullet(this.enemy.posX, this.enemy.posY)) {
        this.player.bullets.splice(index, 1);
        this.enemy.lives--;
        console.log(this.enemy.lives);
        if (this.enemy.lives == 0) {
          this.enemy.isDead = true;
          this.win(); // pantalla WIN
        }
      }
    });
  },

  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  isCollision() {
    //colisión enemy y player
    return (
      this.player.posX - this.enemy.posX <= 50 &&
      this.enemy.posX - this.player.posX <= 50 &&
      this.player.posY >= this.enemy.posY
    );
  },

  clearBullets() {
    // se borra la bala que colisiona con el enemy
    this.player.bullets = this.player.bullets.map((bullet) => {
      if (this.isCollision) {
        let bulletCollision = this.player.bullets.indexOf(bullet);
        this.player.bullets.splice(bulletCollision, 1);
      }
    });
  },

  generateObstacles() {
    if (this.framesCounter % 800 === 0) {
      this.obstacles.push(
        new Obstacle(
          this.ctx,
          this.width,
          this.player.posY0,
          this.player.height
        )
      );
    }
  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(function (obs) {
      return obs.posX >= 150;
    });
  },
  gameOver() {
    this.ctx.drawImage(
      this.player.imageGameOver,
      this.width / 2 - 250,
      200,
      500,
      250
    );
    clearInterval(this.interval);
  },

  win() {
    this.ctx.drawImage(
      this.enemy.imagewin,
      this.width / 2 - 250,
      200,
      500,
      250
    );

    clearInterval(this.interval);
  },
  printScore() {
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`${this.score}`, 50, 40);
  },
  sumScore() {
    this.score += 0.01;
    // no consigo que muestre solo 2 decimales
  },
};
