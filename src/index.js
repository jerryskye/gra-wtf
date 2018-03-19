import { canvas } from './vars.js'
import { initEnemies, initEnemiesBullet, main } from './game.js'

document.body.appendChild(canvas);
initEnemies();
initEnemiesBullet();
main();
