import * as T from 'three'
import { setDefaultMaterial } from '../libs/util/util.js'

export const createPlane = scene => {
  const plane = new T.Mesh(
    new T.PlaneGeometry(100, 200),
    setDefaultMaterial('blue')
  )
  scene.add(plane)

  return plane
}
