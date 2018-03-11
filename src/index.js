import { canvas } from './vars.js'
import { initEnemies, main } from './game.js'

document.body.appendChild(canvas);
initEnemies();
main();
