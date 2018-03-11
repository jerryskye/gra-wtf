import * as vars from './vars.js';
import { keysUpdate } from './keys.js';

export function initEnemies() {
  var k = 0;
  for(var i = 0; i < 4; i++)
    for(var j = 0; j < 8; j++)
      vars.enemies[k++] = {visible: true, image: vars.enemyImage, x: j * 64, y: (i + 1) * 50, w: 64, h: 50};
}

export function moveEnemies() {
  var dropdown = false;
  for(var i = 0; i < vars.enemies.length; i++) {
    if(vars.enemies[i].visible) {
      vars.enemies[i].x += vars.enemy_speed;
      if(vars.enemies[i].x > (vars.canvas.width - vars.hero.w) || vars.enemies[i].x < 0)
        dropdown = true;
    }
  }
  if(dropdown) {
    vars.enemy_speed = -vars.enemy_speed;
    for(var i = 0; i < vars.enemies.length; i++)
      vars.enemies[i].y += 10;
  }
}

export function drawBullet() {
  if(vars.bullet.visible) {
    vars.context.drawImage(vars.bullet.image, vars.bullet.x, vars.bullet.y);
    vars.bullet.y -= vars.bullet.speed;
    if(vars.bullet.y < 0)
      vars.bullet.visible = false;
  }
}

export function render() {
  vars.context.drawImage(vars.bgImage, 0, 0);
  if(vars.gameOver === 0) {
    vars.context.drawImage(vars.hero.image, vars.hero.x, vars.hero.y);
    for(var i = 0; i < vars.enemies.length; i++)
      if(vars.enemies[i].visible)
        vars.context.drawImage(vars.enemies[i].image, vars.enemies[i].x, vars.enemies[i].y);
    drawBullet();
  }
}

export function main() {
  keysUpdate();
  moveEnemies();
  render();
  requestAnimationFrame(main);
}
