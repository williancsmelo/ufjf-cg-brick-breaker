import * as T from 'three'
import { ball, totalAxleY } from './config/constants.js'

export class Ball {
  static height = 8
  broken = false
  baseSpeed = 2
  movementVector = new T.Vector3(0, 1, 0)
  object = new T.Mesh(
    new T.SphereGeometry(6, 32, 16),
    new T.MeshBasicMaterial({ color: 'red' })
  )
  bb = new T.Box3().setFromObject(this.object)

  constructor(plane, width = 100, height = 5) {
    this.object.position.y = ball.initialPositionY
    this.object.position.x = ball.initialPositionX
    plane.add(this.object)
  }

  resetBall(positionX = 0) {
    this.movementVector = new T.Vector3(0, 1, 0).normalize()
    this.setPosition(positionX)
  }

  updateBall(controls) {
    this.object.position.x += this.movementVector.x * this.baseSpeed
    this.object.position.y += this.movementVector.y * this.baseSpeed

    this.bb = new T.Box3().setFromObject(this.object)

    if (this.object.position.y * -1 > totalAxleY) {
      controls.setIsStarted(false)
    }
  }

  setPosition(x = ball.initialPositionX, y = ball.initialPositionY) {
    this.object.position.x = x
    this.object.position.y = y
  }

  collide(normalVector) {
    this.movementVector = this.movementVector.sub(
      normalVector
        .clone()
        .multiplyScalar(2 * this.movementVector.clone().dot(normalVector))
    )
    if (this.movementVector.y < 0) this.movementVector.y = 0.25
    this.movementVector.normalize()
  }
}

// function createBBHelper(bb, color, plataform) {
//     let helper = new T.Box3Helper( bb, color );
//     plataform.add( helper );

//     return helper;
//   }
