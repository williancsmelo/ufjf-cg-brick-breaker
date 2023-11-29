import * as T from 'three'

export class Brick extends T.Mesh {
  broken = false
  remainingHits = 1
  bb = new T.Box3()
  points = 100
  pointsCalculator = controls => this.points
  plane
  static height = 6

  /**
   *  Cria uma Brick.
   *  @param {T.Mesh} plane Plano que o tijolo será adicionado
   *  @param {String} color Cor do tijolo
   *  @param {Number} width Tamanho do tijolo
   *  @param {Number} x Posição do tijolo no eixo X
   *  @param {Number} y Posição do tijolo no eixo Y
   */
  constructor(plane, width, x, y, color, points) {
    const boxGeometry = new T.BoxGeometry(width, Brick.height, 6)
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
    this.points = points
  }

  /**
   *  Altera cor da parede
   *  @param {string} colorRGB  Cor no formato RGB
   */
  changeColor(colorRGB) {
    this.material.color = new T.Color(`rgb${colorRGB}`)
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
