import * as T from 'three'

export class Wall {
  static width = 5
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
    const sizes = {
      width: 100,
      height: 200
    }
    if (positionX) {
      sizes.width = Wall.width
      sizes.height += Wall.width
      positionX += (Wall.width / 2) * Math.sign(positionX)
    } else {
      sizes.height = Wall.width
      sizes.width += Wall.width
      positionY += (Wall.width / 2) * Math.sign(positionX)
    }
    this.object = new T.Mesh(
      new T.BoxGeometry(sizes.width, sizes.height, 3),
      new T.MeshBasicMaterial({ color: 'brown' })
    )
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
