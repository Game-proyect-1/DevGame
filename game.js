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
  backAudio: new Audio("./img/music/sountrack.mp3"),
  gameoverAudio: new Audio("./img/music/gameover.mp3"),
  winAudio: new Audio("./img/music/win.mp3"),
  hitAudio: new Audio("./img/music/choque.mp3"),
  hitEnemyAudio: new Audio("./img/music/choque2.mp3"),

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
    this.backAudio.preload = "auto";
    this.backAudio.play();
    this.backAudio.volume = 0.2;
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

      if (this.player.lives == 0) {
        //si al colisionar tiene 0 vidas, llama GAMEOVER
        this.gameOver();
      }

      if (this.player.lifeTimeCount !== 0) {
        //contador tiempo player desde que choca con enemy, para que no muera de golpe
        this.player.lifeTimeCount--;
      } else {
        if (this.isCollision()) {
          //al chocar, el contador vuelve a 30, por lo que al player no pierde las 3 vidas a la vez(por el interval)
          this.player.lives--;
          this.player.lifeTimeCount = 40;
          this.hitEnemyAudio.play();
        }
        if (this.isCollisionObstacles()) {
          let obs = this.isCollisionObstacles();
          //colision obstaculo player
          this.hitAudio.play();
          this.player.lives--;
          this.player.lifeTimeCount = 40;
          if (this.player.posX < obs.posX) {
            this.player.posX = this.player.posX - 200;
          } else {
            this.player.posX = this.player.posX + 200;
          }
          // this.player.posX = this.player.posX - 200;

          if (this.player.lives == 0) {
            this.gameOver();
          }
        }
      }

      //--------
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
    this.obstacles = [];
  },

  drawAll() {
    this.background.draw();

    this.player.draw(this.framesCounter);
    if (!this.enemy.isDead) {
      this.enemy.draw(this.framesCounter);
    }

    this.platform.draw();

    this.obstacles.forEach(function (obs) {
      obs.draw(this.framesCounter);
    });
    this.printScore();

    this.player.bullets.map((bullet, index) => {
      // si hay colision bullet enemy, se borra la bala y se quita una vida al enemigo
      if (bullet.isCollisionBullet(this.enemy.posX, this.enemy.posY)) {
        this.player.bullets.splice(index, 1);
        this.enemy.lives--;
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
      600,
      350
    );
    this.backAudio.pause();
    this.gameoverAudio.play();
    clearInterval(this.interval);
  },

  win() {
    this.ctx.drawImage(this.enemy.imagewin, this.width / 2 - 250, 30, 600, 400);
    this.backAudio.pause();
    this.winAudio.play();
    clearInterval(this.interval);
  },

  sumScore() {
    this.score += 0.01;
    // no consigo que muestre solo 2 decimales
  },

  printScore() {
    this.ctx.font = "30px Arial";
    this.ctx.fillText(`${this.score.toFixed(2)}`, 50, 40);
  },

  isCollisionObstacles() {
    let obstacle;
    this.obstacles.forEach((obs) => {
      if (
        this.player.posX <= obs.posX + obs.width / 2 && // colision derecha
        this.player.posY + this.player.height >= obs.posY &&
        this.player.posX + this.player.width / 2 >= obs.posX
      ) {
        obstacle = obs;
      }
    });
    return obstacle; // en un forEach no se puede usar un breack para que salga del break , por eso hay que poner el return por fuera. He cambiado la funcion inicial para que en lugar de true o false devuelva el objeto para poder tener su posicion arriba y hacer el choque hace atrás del player al colisionar.
  },
};
