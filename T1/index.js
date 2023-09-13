import * as T from "three";
import { initRenderer, initDefaultBasicLight } from "../libs/util/util.js";
import { createCamera } from "./create-camera.js";
import { createPlane } from "./create-plane.js";
import { createBricks } from "./create-bricks.js";
import { createHitter } from "./create-hitter.js";
import { createBall } from "./create-ball.js";
import { createControls } from "./create-controls.js";
import { isFullscreen } from "./utils.js";

const renderer = initRenderer();
const scene = new T.Scene();
initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
const camera = createCamera(scene, renderer);
const plane = createPlane(scene);
const bricks = createBricks(plane);
const ball = createBall(plane);
const controls = createControls(isFullscreen());
const hitter = createHitter(plane, ball, controls.isStarted);

render();

function render() {
  if (controls.restartGame) restartGame();

  if (!controls.isPaused) {
    renderer.render(scene, camera); // Render scene
    hitter.updateHitter();
    hitter.checkCollisions(ball);
    !controls.isStarted ? ball.setPosition(hitter.platform.position.x) : ball.updateBall();
  }

  requestAnimationFrame(render);
}

function restartGame() {
  controls.setIsPaused(false)
  controls.setIsStarted(false);
  controls.setRestartGame(false);
  ball.setPosition(0);
  hitter.setPosition(0);
}

