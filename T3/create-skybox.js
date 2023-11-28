import * as T from 'three'
export const createSkybox = scene => {
  const loader = new T.CubeTextureLoader().setPath('assets/space-skybox/')
  loader.load(
    ['px', 'nx', 'py', 'ny', 'pz', 'nz'].map(side => `${side}.png`),
    cubeTexture => {
      const geometry = new T.SphereGeometry(1, 60, 60)
      const material = new T.MeshBasicMaterial({
        envMap: cubeTexture
      })
      const mesh = new T.Mesh(geometry, material)
      scene.add(mesh)
      scene.background = cubeTexture
    }
  )
}
