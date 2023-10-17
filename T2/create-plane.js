import * as T from 'three'

export const createPlane = scene => {
  const plane = new T.Mesh(
    new T.PlaneGeometry(100, 200),
    new T.MeshLambertMaterial({ color: 'blue' })
  )
  plane.receiveShadow = true
  scene.add(plane)

  return plane
}
