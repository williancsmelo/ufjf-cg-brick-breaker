import * as T from 'three'

export const createSkybox = scene => {
  const directory = 'assets/space-skybox'
  const createMaterialArray = () => {
    const filenames = ['ft', 'bk', 'up', 'dn', 'rt', 'lf']
    return filenames.map(filename => {
      const texture = new T.TextureLoader().load(`${directory}/${filename}.png`)
      return new T.MeshBasicMaterial({ map: texture, side: T.BackSide })
    })
  }

  const skybox = new T.Mesh(
    new T.BoxGeometry(10000, 10000, 10000),
    createMaterialArray()
  )
  skybox.position.set(0, -75, 80)
  scene.add(skybox)
}
