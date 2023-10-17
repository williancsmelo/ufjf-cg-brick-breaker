import * as T from 'three'
export const createLight = (scene, plane) => {
  const ambientLight = new T.HemisphereLight('white', 'darkslategrey', 0.5)
  scene.add(ambientLight)

  const directionalLight = new T.DirectionalLight('white', 1)
  directionalLight.target = new T.Object3D()

  directionalLight.position.set(0, 100, 50)
  directionalLight.target.position.set(-50, -100, -50)

  directionalLight.castShadow = true
  directionalLight.shadow.camera.top = 100
  directionalLight.shadow.camera.bottom = -100
  directionalLight.shadow.camera.left = -100
  directionalLight.shadow.camera.right = 100
  directionalLight.shadow.mapSize.width = Infinity
  directionalLight.shadow.mapSize.height = Infinity

  plane.add(directionalLight)
  plane.add(directionalLight.target)
}
