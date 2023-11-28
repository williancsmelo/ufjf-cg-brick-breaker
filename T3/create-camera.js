import * as T from 'three'
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js'

export const createCamera = (scene, renderer) => {
  const camera = new T.PerspectiveCamera(
    80,
    window.innerWidth / window.innerHeight,
    0.1,
    30000
  )
  const controls = new OrbitControls(camera, renderer.domElement)
  controls.maxDistance = 6000
  controls.enabled = false
  controls.enableZoom = false
  camera.position.set(0, -75, 80)
  controls.target.set(0, -27, -20)
  camera.up.set(0, 1, 0)
  scene.add(camera)

  window.addEventListener(
    'resize',
    function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    },
    false
  )

  return { camera, controls }
}
