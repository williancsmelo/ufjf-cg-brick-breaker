import * as T from "three";
import {
  initRenderer,
  onWindowResize,
  initDefaultBasicLight,
} from "../libs/util/util.js";
import { createCamera } from "./create-camera.js";
import { createPlane } from "./create-plane.js";
import { createBricks } from "./create-bricks.js";
import { createHitter } from "./create-hitter.js";
import {pauseGame, toggleFullscreen} from "./create-controls.js"

let gamePause = false;
const renderer = initRenderer();
const scene = new T.Scene();
initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
const camera = createCamera(scene, renderer);
const plane = createPlane(scene);
const bricks = createBricks(plane);
const hitter = createHitter(plane);


render();

/* GAME CONTROLS */

document.addEventListener('keydown', (event) => {
  if (event.key === ' ') gamePause = pauseGame(gamePause)
  else if(event.key === 'Enter') toggleFullscreen();
});


function render() {
  if(!gamePause){
    renderer.render(scene, camera); // Render scene
  }
  requestAnimationFrame(render);
}
