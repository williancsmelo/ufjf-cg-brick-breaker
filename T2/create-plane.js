import * as T from 'three'
import { setDefaultMaterial } from '../libs/util/util.js'

export const createPlane = scene => {
  const baseSize = window.innerHeight
  const plane = new T.Mesh(
    new T.PlaneGeometry(baseSize / 2, baseSize),
    setDefaultMaterial('blue')
  )
  plane.position.z = -1
  scene.add(plane)

  const eventListeners = {}
  plane.addEventListener = (event, callback) => {
    eventListeners[event] ??= []
    eventListeners[event].push(callback)
  }
  window.addEventListener('resize', function () {
    const newBaseSize = this.window.innerHeight
    plane.scale.y = plane.scale.x = newBaseSize / baseSize
  })

  return plane
}
