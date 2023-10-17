import * as T from 'three'
import { createCamera } from './create-camera.js'
import { createPlane } from './create-plane.js'
import { createHitter } from './create-hitter.js'
import { createBall } from './create-ball.js'
import { createControls } from './create-controls.js'
import { createLight } from './create-light.js'
import { createRenderer } from './create-renderer.js'

const renderer = createRenderer()
const scene = new T.Scene()
const plane = createPlane(scene)
createLight(scene, plane)
const camera = createCamera(plane, renderer)
const controls = createControls()
const ball = createBall(plane)
const hitter = createHitter(plane, ball, controls.isStarted)

render()

function render() {

  if (!controls.isPaused) {
    renderer.render(scene, camera) // Render scene
    hitter.updateHitter()

  }

  requestAnimationFrame(render)
}
