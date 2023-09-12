import * as T from "three";
import { initRenderer, initDefaultBasicLight } from "../libs/util/util.js";
import { createCamera } from "./create-camera.js";
import { createPlane } from "./create-plane.js";
import { createBricks } from "./create-bricks.js";
import { createHitter } from "./create-hitter.js";
import { createControls } from "./create-controls.js";
import { isFullscreen } from "./utils.js";

const renderer = initRenderer();
const scene = new T.Scene();
initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
const camera = createCamera(scene, renderer);
const plane = createPlane(scene);
const bricks = createBricks(plane);
const hitter = createHitter(plane);

const state = {
  fullScreen: isFullscreen(),
};
createControls(state);

render();
function render() {
  if (!state.pause) {
    renderer.render(scene, camera); // Render scene
  }
  requestAnimationFrame(render);
}
