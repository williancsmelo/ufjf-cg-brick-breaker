import * as T from 'three'

export class Wall {
  broken = false
  plane
  colliding = false
  normal
  object
  bb
  collideDeath
  state

  /**
   *  Cria uma Wall.
   *  @param {T.Mesh} plane Plano que a parede será adicionada
   *  @param {Number} positionX Posição da parede no eixo x
   *  @param {Number} positionY Posição da parede no eixo y
   *  @param {T.Vector3} normal Vetor normal da parede
   *  @param {Boolean} collideDeath Define se deve matar a bola ao tocar na parede
   */
  constructor(plane, positionX, positionY, normal, collideDeath = false) {
    this.object = new T.Mesh(
      new T.BoxGeometry(100, 200, 3),
      new T.MeshBasicMaterial({ color: 'black' })
    )
    this.object.material.transparent = true
    this.object.material.opacity = 0
    this.object.position.set(positionX, positionY, 1)
    this._createCollisionBox()
    this.plane = plane
    this.collideDeath = collideDeath
    this.normal = normal
    plane.add(this.object)
  }

  _createCollisionBox() {
    this.bb = new T.Box3().setFromObject(this.object)
  }

  checkCollisions(ball) {
    const collision = this.bb.intersectsBox(ball.bb)
    if (!collision) {
      this.colliding = false
      return
    }

    if (this.collideDeath) return true
    if (this.colliding) return

    this.colliding = true
    ball.collide(this.normal)
  }
}
