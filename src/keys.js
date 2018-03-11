import { bullet, hero, canvas } from './vars.js';

// keyboard events
var keysDown = {};
document.addEventListener("keydown", function (e) {keysDown[e.keyCode] = true;}, false);
document.addEventListener("keyup", function (e) {delete keysDown[e.keyCode];}, false);

export function keysUpdate() {

  if(32 in keysDown && !bullet.visible) {
    bullet.visible = true;
    bullet.x = hero.x + 30;
    bullet.y = 450;
  }

  if (37 in keysDown && hero.x > 0)
    hero.x -= hero.speed;

  if (39 in keysDown && hero.x < (canvas.width - hero.w))
    hero.x += hero.speed;
}
