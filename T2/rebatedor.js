import * as T from 'three'
import { createCamera } from './create-camera.js'
import { createPlane } from './create-plane.js'
import { createLight } from './create-light.js'
import { createRenderer } from './create-renderer.js'
import { Hitter } from './Hitter.js'

const renderer = createRenderer()
const scene = new T.Scene()
const plane = createPlane(scene, 1000, 1000, 'rgb(125, 125, 125)')
createLight(scene, plane)
const camera = createCamera(plane, renderer)
const hitter = new Hitter(plane, 'green', -112, true);
import { InfoBox } from "../libs/util/util.js";


import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
let orbit = new OrbitControls( camera, renderer.domElement );

let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render()

function render() {

    renderer.render(scene, camera) // Render scene
    hitter.updateHitter()

    requestAnimationFrame(render)
}
