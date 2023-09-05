import * as T from "three";
import {
  initRenderer,
  onWindowResize,
  initDefaultBasicLight,
} from "../libs/util/util.js";
import { createCamera } from "./create-camera.js";
import { createPlane } from "./create-plane.js";

const scene = new T.Scene();
initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
const camera = createCamera(scene);
const plane = createPlane(scene);

const renderer = initRenderer();
window.addEventListener(
  "resize",
  function () {
    onWindowResize(camera, renderer, window.innerHeight);
  },
  false
);
render();
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera); // Render scene
}
