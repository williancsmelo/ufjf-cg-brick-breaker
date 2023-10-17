import * as T from 'three'
import { createCamera } from './create-camera.js'
import { initDefaultBasicLight, createGroundPlaneXZ } from '../libs/util/util.js'
import { createRenderer } from './create-renderer.js'
import { Hitter } from './Hitter.js'

const renderer = createRenderer();
const scene = new T.Scene();
initDefaultBasicLight(scene) // Create a basic light to illuminate the scene
const plane = createPlane(300, 300);
plane.position.y = -100;
scene.add(plane);
const camera = createCamera(scene, renderer)
const hitter = new Hitter(scene, 'green', -112, true);
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

function createPlane(width = 100, height = 200, color = 'rgb(200, 200, 200)')  {
    const plane = new T.Mesh(
      new T.PlaneGeometry(width, height),
      new T.MeshLambertMaterial({ color: color })
    )
  
    plane.receiveShadow = true;
    plane.rotateX(-1.5708);
  
    return plane
}
  