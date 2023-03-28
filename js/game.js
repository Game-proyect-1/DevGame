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
  time: 0,
  min: 0,
  hour: 0,
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
    this.reset();

    this.interval = setInterval(() => {
      this.framesCounter++;
      if (this.framesCounter > 5000) {
        this.framesCounter = 0;
        this.stime++;
      }

      this.clear();

      this.drawAll();

      this.generateObstacles(this.framesCounter);

      this.clearObstacles();
      this.sumTime();
      this.printScore();
      this.checkEnemyStatus();
      this.checkPlayerStatus();
      this.addSecond();
      this.printTime();

      if (this.player.lives == 0) {
        this.gameOver();
      }

      if (this.player.lifeTimeCount !== 0) {
        this.player.lifeTimeCount--;
      } else {
        if (this.isCollision()) {
          this.player.lives--;
          this.player.lifeTimeCount = 40;
          this.hitEnemyAudio.play();
        }
        if (this.isCollisionObstacles()) {
          let obs = this.isCollisionObstacles();

          this.hitAudio.play();
          this.player.lives--;
          this.player.lifeTimeCount = 40;
          if (this.player.posX < obs.posX) {
            this.player.posX = this.player.posX - 120;
          } else {
            this.player.posX = this.player.posX + 120;
          }

          if (this.player.lives == 0) {
            this.gameOver();
          }
        }
      }

      //--------
    }, 1000 / this.FPS);

    this.clearBullets();
  },

  reset() {
    this.background = new Background(this.ctx, this.width, this.height);

    this.player = new Player(this.ctx, this.width, this.height, this.keys);
    this.enemy = new Enemy(this.ctx, this.width, this.height);
    this.platform = new Platform(this.ctx);
    this.obstacles = [];
  },

  drawAll() {
    this.background.draw();

    this.player.draw(this.framesCounter);
    if (!this.enemy.isDead) {
      this.enemy.draw(this.framesCounter);
    }

    this.platform.draw();
    let framesCounterObstacles = this.framesCounter;
    this.obstacles.forEach(function (obs) {
      obs.draw(framesCounterObstacles);
    });
    this.printTime();

    this.player.bullets.map((bullet, index) => {
      if (bullet.isCollisionBullet(this.enemy.posX, this.enemy.posY)) {
        this.player.bullets.splice(index, 1);
        this.enemy.lives--;
        if (this.enemy.lives == 0) {
          this.enemy.isDead = true;
          this.win();
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

  generateObstacles(framesCounter) {
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

  //Funciones para el enemy
  checkEnemyStatus() {
    //Función para que el enemy muera al colisionar y vuelva a aparecer
    if (this.isCollision()) {
      this.player.lives--;
      this.score -= 10;

      //Para que pinte otro una vez pasado a undefined
      this.enemy = new Enemy(this.ctx, this.width, this.height);
    }

    if (this.enemy.posY + this.enemy.height >= window.innerHeight) {
      //Para que pinte otro una vez pasado a undefined
      this.enemy = new Enemy(this.ctx, this.width, this.height);
    } else {
      this.score++;
    }
  },

  checkPlayerStatus() {
    if (this.player.lives <= 0) {
      this.gameOver();
    }

    if (this.isCollisionBullet()) {
      console.log("BUM");
    }
  },

  // Si quito la función drawText, no funciona gameOver()
  drawText() {
    this.ctx.font = "100px arial";
    this.ctx.fillStyle = "white";
    this.ctx.fillText(
      `Final Score: ${Math.floor(this.time) + this.score}`,
      window.innerWidth / 2 - window.innerWidth / 6,
      window.innerHeight * 0.14,
    );
  },

  clearObstacles() {
    this.obstacles = this.obstacles.filter(function (obs) {
      return obs.posX >= 150;
    });
  },

  gameOver() {
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight * 0.2);
    this.ctx.drawImage(
      this.player.imageGameOver,
      window.innerWidth / 2.8,
      260,
      600,
      350
    );
    this.printRetryBtn();
    this.backAudio.pause();
    this.gameoverAudio.play();
    clearInterval(this.interval);
    this.drawText();
 
  },

  win() {
    this.score += 250;
    this.ctx.drawImage(
      this.enemy.imagewin,
      this.width / 2 - 250,
      100,
      600,
      400
    );
    this.backAudio.pause();
    this.winAudio.play();
    this.ctx.fillStyle = "black";
    this.ctx.fillRect(0, 0, window.innerWidth, window.innerHeight * 0.2);
    this.drawText();
    const btn = document.createElement("button");
    document.body.appendChild(btn);
    btn.innerHTML = "Jugar otra vez";
    btn.setAttribute("id", "go");
    btn.setAttribute("class", "winner");
    document.getElementById("go").onclick = () => {
      location.reload();
    };
    clearInterval(this.interval);
  },

  sumTime() {
    this.time += 0.01;
  },
  // no consigo que muestre solo 2 decimales
  sumScore() {
    this.score += 0.01;
  },

  //U
  printTime() {
    this.ctx.font = "60px Montserrat";
    if (this.time >= 60) {
      this.min++;
      this.time = 0;
    }
    if (this.min === 60) {
      this.hour++;
      this.min = 0;
    }
    let duration = `${Number(this.hour)}:${Number(this.min)}:${Number(Math.floor(this.time))}`;
    this.ctx.fillText(`⏱ ${duration}`, 75, window.innerHeight*0.9);
  },

  addSecond() {
    this.time++;
    if (this.time === 60) {
      this.time = 0;
      this.min++;
    }
  },

  isCollisionObstacles() {
    let obstacle;
    this.obstacles.forEach((obs) => {
      if (
        this.player.posX <= obs.posX + obs.width / 2 &&
        this.player.posY + this.player.height >= obs.posY &&
        this.player.posX + this.player.width / 2 >= obs.posX
      ) {
        obstacle = obs;
      }
    });
    return obstacle;
  },

  isCollisionBullet(posX, posY) {
    return (
      this.posX - posX <= 50 && posX - this.posX <= 50 && this.posY >= posY // es la posicion del enemy menos la posicion de la bala, si restadas dan menos, es que se han chocado
    );
  },

  printRetryBtn() {
    const btn = document.createElement("button");
    document.body.appendChild(btn);
    btn.innerHTML = "Volver a intentar";
    btn.setAttribute("id", "go");
    btn.setAttribute("class", "gameover");
    document.getElementById("go").onclick = () => {
      location.reload();
    };
  },

  printScore() {
    this.ctx.font = "60px Montserrat";
    this.ctx.fillStyle = "black";
    // this.ctx.fillText(`SCORE:`, window.innerWidth/2 - 60, window.innerHeight*0.9 -100);
    this.ctx.fillText(`SCORE: ${this.score}`, window.innerWidth/2 - 200, window.innerHeight*0.9);

  }
}
