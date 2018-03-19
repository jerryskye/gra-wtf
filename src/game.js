import * as vars from './vars.js';
import { keysUpdate } from './keys.js';

function hittest(a, b) {
  return ((a.x < (b.x + b.w)) &&
    ((a.x + a.w) > b.x) &&
    (a.y < (b.y + b.h)) &&
    ((a.y + a.h) > b.y));
}

export function initEnemies() {
  var k = 0;
  for(var i = 0; i < 4; i++)
    for(var j = 0; j < 8; j++)
      vars.enemies[k++] = {visible: true, image: vars.enemyImage, x: j * 64, y: (i + 1) * 50, w: 64, h: 50};
}

function initEnemyBullet(k) {
  while(true) {
    var enemy = Math.floor(Math.random() * vars.enemies.length);
    if(vars.enemies[enemy].visible) {
      vars.enemiesBullet[k] = {
        visible: true,
        image: vars.bulletImage,
        x: vars.enemies[enemy].x + 30,
        y: vars.enemies[enemy].y + 25,
        w: 16,
        h: 16,
        speed: 4
      };
      break;
    }
  }
}

export function initEnemiesBullet() {
  for(var k = 0; k < vars.enemyBullets; k++)
    initEnemyBullet(k);
  console.log(vars.enemiesBullet);
}

function drawScore() {
  vars.context.fillStyle = "rgb(250, 250, 250)";
  vars.context.font = "24px Helvetica";
  vars.context.textAlign = "left";
  vars.context.textBaseline = "top";
  vars.context.fillText("Score: " + vars.score, 5, 5);
  vars.context.fillText("Life: " + vars.life, 650, 5);
}

function drawEnemyBullets() {
  for(var i = 0; i < vars.enemiesBullet.length; i++) {
    vars.context.drawImage(vars.enemiesBullet[i].image, vars.enemiesBullet[i].x, vars.enemiesBullet[i].y);
    vars.enemiesBullet[i].y += vars.enemiesBullet[i].speed;
    if(vars.enemiesBullet[i].y > vars.canvas.height)
      initEnemyBullet(i);
    if(hittest(vars.enemiesBullet[i], vars.hero)) {
      initEnemyBullet(i);
      vars.life--;
    }
    if(vars.life === 0)
      vars.gameOver = 1;
  }
}

function areVisibleEnemies() {
  for(var i = 0; i < vars.enemies.length; i++)
    if(vars.enemies[i].visible)
      return true;
  return false;
}

function moveEnemies() {
  var dropdown = false;
  for(var i = 0; i < vars.enemies.length; i++) {
    if(vars.enemies[i].visible) {
      vars.enemies[i].x += vars.enemy_speed;
      if(vars.enemies[i].x > (vars.canvas.width - vars.hero.w) || vars.enemies[i].x < 0)
        dropdown = true;

      if(hittest(vars.enemies[i],vars.bullet)) {
        vars.enemies[i].visible = false;
        vars.bullet.visible = false;
        vars.bullet.x = vars.hero.x + 30;
        vars.bullet.y = 450;
        vars.score += 10;
      }
    }
  }
  if(dropdown) {
    vars.enemy_speed = -vars.enemy_speed;
    for(var i = 0; i < vars.enemies.length; i++)
      vars.enemies[i].y += 10;
  }
}

function drawBullet() {
  if(vars.bullet.visible) {
    vars.context.drawImage(vars.bullet.image, vars.bullet.x, vars.bullet.y);
    vars.bullet.y -= vars.bullet.speed;
    if(vars.bullet.y < 0)
      vars.bullet.visible = false;
  }
}

function render() {
  vars.context.drawImage(vars.bgImage, 0, 0);
  if(vars.gameOver === 0) {
    vars.context.drawImage(vars.hero.image, vars.hero.x, vars.hero.y);
    drawBullet();
    drawScore();
    for(var i = 0; i < vars.enemies.length; i++)
      if(vars.enemies[i].visible)
        vars.context.drawImage(vars.enemies[i].image, vars.enemies[i].x, vars.enemies[i].y);
    if(areVisibleEnemies())
      drawEnemyBullets();
    else {
      vars.context.fillStyle = "rgb(0, 0, 0)";
      vars.context.font = "48px Helvetica";
      vars.context.fillText("Winner", 290, 200);
    }
  }
  else {
    vars.context.fillStyle = "rgb(0, 0, 0)";
    vars.context.font = "48px Helvetica";
    vars.context.fillText("Game Over", 290, 200);
  }
}

export function main() {
  keysUpdate();
  moveEnemies();
  render();
  requestAnimationFrame(main);
}
