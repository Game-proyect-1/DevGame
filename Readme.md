<h1>Frontend vs backend</h1>

<h2>Description</h2>

Inspired by the competition between backends and frontends, this is a classic 2d platformer, where agility and reflexes are required to eliminate the enemy while dodging obstacles. The player must finish off the enemy's lives without leaving the platform, the enemy's speed increases gradually, and the platforms must be jumped over as they do not allow the player to pass. Collisions with the enemy and platforms subtract one life, in case of falling off the platform, it automatically loses.

<h2>MVP (DOM - LONA)</h2>
Single player game.
Keyboard support.

<h2>Backlog</h2>

Refactor
Welcome screen with game instructions
Choice of player type
Multilevel
Save records.
Modify platform on impact of bullets.
Target for aiming when shooting
Elements that add life to the player
Mouse support

<h2>Data structure</h2>

const Game = {

- canvas: undefined,
- ctx: undefined,
- width: undefined,
- height: undefined,
- FPS: 60,
- framesCounter: 0,
- background: undefined,
- player: undefined,
- enemy: undefined,
- platform: undefined,
- obstacles: [],
- score: 0,
- backAudio: new Audio("./img/music/sountrack.mp3"),
- gameoverAudio: new Audio("./img/music/gameover.mp3"),
- winAudio: new Audio("./img/music/win.mp3"),
- hitAudio: new Audio("./img/music/choque.mp3"),
- hitEnemyAudio: new Audio("./img/music/choque2.mp3"),- 1.

keys: { },

init ( ) { },

setContext ( ) { },

setDimensions ( ) { },

start ( ) { },

reset ( ) { },

drawAll ( ) { },

clear ( ) { },

isCollision ( ) { },

clearBullets ( ) { },

generateObstacles ( ) { },

clearObstacles ( ) { },

gameOver ( ) { },

win ( ) { },

sumScore ( ) { },

printScore ( ) { },

isCollisionObstacles ( ) { },
}

  <h3>background.js</h3>
  
  class Background {
  
  constructor( ) {
    this.ctx = ctx;
    this.width = w;
    this.height = h;

    this.image = new Image();
    this.image.src = "./img/sprites juego/background/BACKGROUND 4.png";

    this.posX = 0;
    this.posY = 0;

}

draw ( ) { },
},

  <h3>player.js</h3>
  
  class Player {
  constructor(ctx, gameW, gameH, keys) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 120;
    this.height = 130;

    this.image = new Image();
    this.image.src =
      "./img/sprites juego/player/player quieto derecha.izquierda.png";
    this.image.frames = 8;
    this.image.framesIndex = 0;

    this.lives = 6;
    this.livesImage = new Image();
    this.livesImage.src = "./img/sprites juego/player/life.png";
    this.lifePosX = this.gameWidth - 100;
    this.lifePosY = 0;

    this.imageGameOver = new Image();
    this.imageGameOver.src = "./img/sprites juego/player/gameover.png";

    this.posX = this.gameWidth - this.width * 3;
    this.posY = this.gameHeight - this.height * 2.5;
    this.posY0 = this.posY;
    this.isMoving = false;

    this.isStopped = false;
    this.isLookingLeft = false;
    this.isLookingRigth = false;
    this.lifeTimeCount = 0;

    this.keys = keys;
    this.bullets = [];

    this.setListeners();
    this.velY = 1;
    this.velX = 8;
    this.gravity = 0.6;
    this.shootAudio = new Audio("./img/music/fire2.mp3");

}

draw ( ) { },

setListeners ( ) { },

shoot ( ) { },

clearBullets ( ) { },

moveRigth ( ) { },

moveLeft ( ) { },

jump ( ) { },

stop ( ) { },

animate ( ) { },

move( ) { },
}

  <h3>enemy.js</h3>
  
  class Enemy {
  constructor(ctx, gameW, gameH) {
    this.ctx = ctx;

    this.gameWidth = gameW;
    this.gameHeight = gameH;

    this.width = 130;
    this.height = 130;

    this.image = new Image();
    this.image.src = "./img/sprites juego/enemy/andar enemy.png";
    this.image.frames = 16;
    this.image.framesIndex = 0;

    this.imageLeft = new Image();
    this.imageLeft.src = "./img/sprites juego/enemy/enemywalkderecha.png";
    this.imageLeft.frames = 16;
    this.imageLeft.framesIndex = 0;

    this.lives = 50;

    this.imagewin = new Image();
    this.imagewin.src = "./img/sprites juego/background/win.png";

    this.posX = this.gameWidth - this.gameWidth + this.height;
    this.posY = this.gameHeight - this.height * 2.5;
    this.posY0 = this.posY;
    this.posX0 = this.posX;
    this.isMovingRight = true;
    this.isMovingLeft = false;
    this.isDead = false;

    this.velX = 2;
    this.aceleration = 0.002;

}

draw ( ) { },

animate ( ) { },

move ( ) { },
}

  <h3>platform.js</h3>
  
  class Platform {
  constructor(ctx) {
    this.ctx = ctx;
    this.width = window.innerWidth / 1.1;
    this.height = window.innerHeight / 9;
    this.posX = window.innerWidth / 2 - this.width / 2;
    this.posY = window.innerHeight / 1.4;

    this.image = new Image();
    this.image.src = "./img/sprites juego/Platform/платформа-png-5.png";

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

draw ( ) { },

 <h3> bullets.js </h3>
  
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
    this.posY = playerPosY + playerHeight * 0.5;

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
    this.image.src = "./img/sprites juego/fire.png";
    this.image.frames = 6;
    this.image.framesIndex = 0;

}

draw ( ) { },

move ( ) { },

animate ( ) { },

isCollisionBullets ( ) { },
}

  <h3> obstacle.js</h3>
  
  class Obstacle {
 
  constructor(ctx, gameWidth, playerPosY0, playerHeight) {
    this.ctx = ctx;
    this.width = 100;
    this.height = this.width * 1;

    this.posX = gameWidth - this.width - this.width;
    this.posY = playerPosY0 + playerHeight - this.height;

    this.velX = 1;
    this.image = new Image();
    this.image.src = "./img/sprites juego/obstaculos.png";
    this.image.frames = 4;
    this.image.framesIndex = 0;

}
draw ( ) { },

move ( ) { },

animate ( ) { },
}

Trello
[http://https://trello.com/b/yBrR0Su6/devgame]

Git Link Repo [http://https://github.com/Game-proyect-1/DevGame.git]
link Deploy (falta el link)

Diapositivas
Falta el link
