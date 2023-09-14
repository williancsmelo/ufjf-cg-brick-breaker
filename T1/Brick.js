import * as T from 'three'
import { setDefaultMaterial } from '../libs/util/util.js'

const getColor = row =>
  ({
    1: 'gray',
    2: 'red',
    3: 'yellow',
    4: 'blue',
    5: 'pink',
    6: 'palegreen'
  }[row] || 'white')

export class Brick extends T.Mesh {
  broken = false
  bb = new T.Box3()
  plane
  static height = 8
  constructor(plane, row, width, x, y) {
    const boxGeometry = new T.BoxGeometry(width, Brick.height, 1)
    super(boxGeometry, setDefaultMaterial(getColor(row)))
    this.position.set(x, y, 0)
    this.add(
      new T.LineSegments(
        new T.EdgesGeometry(boxGeometry),
        new T.LineBasicMaterial({ color: 'black', linewidth: 2 })
      )
    )
    plane.add(this)
    this._createCollisionBox()
    this.plane = plane
  }

  _createCollisionBox() {
    this.bb.copy(new T.Box3().setFromObject(this))
  }

  checkCollisions(ball) {
    const collision = this.bb.intersectsBox(ball.bb)
    if (!collision) return false
    let normalVector = new T.Vector3()
    if (ball.bb.max.x > this.bb.max.x || ball.bb.min.x < this.bb.min.x)
      normalVector = new T.Vector3(1, 0, 0)
    else if (ball.bb.max.y > this.bb.max.y || ball.bb.min.y < this.bb.min.y)
      normalVector = new T.Vector3(0, 1, 0)
    ball.collide(normalVector)
    return true
  }
}
