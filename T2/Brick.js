import * as T from 'three'

export class Brick extends T.Mesh {
  broken = false
  bb = new T.Box3()
  plane
  type
  static height = 6

  /**
   *  Cria uma Brick.
   *  @param {T.Mesh} plane Plano que o tijolo será adicionado
   *  @param {String} color Cor do tijolo
   *  @param {Number} width Tamanho do tijolo
   *  @param {Number} x Posição do tijolo no eixo X
   *  @param {Number} y Posição do tijolo no eixo Y
   *  @param {Number} type Tipo do tijolo:
   *   1. 'normal' : Será quebrado com 1 toque
   *   2. 'special' : Será quebrado com 2 toques
   */
  constructor(plane, color, width, x, y, type = 'normal') {
    const boxGeometry = new T.BoxGeometry(width, Brick.height, 10)
    super(
      boxGeometry,
      new T.MeshLambertMaterial({
        color
      })
    )
    this.castShadow = true
    this.position.set(x, y, 1)
    this.add(
      new T.LineSegments(
        new T.EdgesGeometry(boxGeometry),
        new T.LineBasicMaterial({ color: 'black', linewidth: 2 })
      )
    )
    plane.add(this)
    this._createCollisionBox()
    this.plane = plane
    this.type = type
  }

  /**
   *  Cria a caixa de colisão do tijolo
   */
  _createCollisionBox() {
    this.bb.copy(new T.Box3().setFromObject(this))
  }

  /**
   *  Checa se a parede está colidindo com a bola.
   *  @param {Ball} ball Bola do jogo
   *  @return {Boolean} Retorna se a parede está colidindo com a bola
   */
  checkCollisions(ball) {
    const collision = this.bb.intersectsBox(ball.bb)
    if (!collision) return false

    let normalVector = new T.Vector3(0, 0, 0)
    let left,
      right,
      bottom,
      top = false

    const ballCenter = ball.bb.getCenter(new T.Vector3())
    if (ballCenter.x > this.bb.max.x) {
      right = true
      normalVector = new T.Vector3(1, 0, 0)
    }
    if (ballCenter.x < this.bb.min.x) {
      normalVector = new T.Vector3(-1, 0, 0)
      left = true
    }
    if (ballCenter.y > this.bb.max.y) {
      top = true
      normalVector = new T.Vector3(0, 1, 0)
    }
    if (ballCenter.y < this.bb.min.y) {
      bottom = true
      normalVector = new T.Vector3(0, -1, 0)
    }

    if (bottom && (right || left)) normalVector = new T.Vector3(0, -1, 0)
    if (top && (right || left)) normalVector = new T.Vector3(0, 1, 0)

    normalVector.normalize()
    ball.collide(normalVector)
    return true
  }
}
