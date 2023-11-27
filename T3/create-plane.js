import * as T from 'three'

export const createPlane = (
  scene,
  width = 100,
  height = 200,
  color = 'blue'
) => {
  const plane = new T.Mesh(
    new T.PlaneGeometry(width, height),
    new T.MeshLambertMaterial({ color })
  )
  plane.receiveShadow = true
  scene.add(plane)

  return plane
}
