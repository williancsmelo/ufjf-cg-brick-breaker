import * as T from 'three'
import { createCamera } from './create-camera.js'
import { createPlane } from './create-plane.js'
import { createLight } from './create-light.js'
import { createRenderer } from './create-renderer.js'
import { Hitter } from './Hitter.js'

const renderer = createRenderer()
const scene = new T.Scene()
const plane = createPlane(scene, 1000, 1000, 'rgb(125, 125, 125)')
plane.rotateX(-1.5708)

const camera = createCamera(scene, renderer)
const hitter = new Hitter(plane, 'green', -112, true);
hitter.hitter.position.z += 10
hitter.hitter.rotateX(1.5708)

createLight(scene, hitter.hitter, camera)
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

    // directionalLight.position.copy(camera.position);
    // directionalLight.target.position.copy(hitter.hitter.position)

    requestAnimationFrame(render)
}
