import * as T from 'three'
import { ball, totalAxleY } from './config/constants.js'
import { setDefaultMaterial } from '../libs/util/util.js'

export class Ball {
  baseSpeed = 2
  movementVector = new T.Vector3(0, 1, 0)
  object = new T.Mesh(
    new T.SphereGeometry(6, 32, 32),
    setDefaultMaterial('red')
  )
  bb = new T.Box3().setFromObject(this.object)
  colliding = false

  constructor(plane) {
    this.object.position.y = ball.initialPositionY
    this.object.position.x = ball.initialPositionX
    plane.add(this.object)
  }

  resetBall(positionX = 0) {
    this.movementVector = new T.Vector3(0, 1, 0)
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
    if (this.colliding) return
    this.colliding = true
    this.movementVector = this.movementVector.sub(
      normalVector
        .clone()
        .multiplyScalar(2 * this.movementVector.clone().dot(normalVector))
    )
    //if (this.movementVector.y < 0) this.movementVector.y = 0.25
    this.movementVector.normalize()
    this.colliding = false
  }
}

// function createBBHelper(bb, color, plataform) {
//     let helper = new T.Box3Helper( bb, color );
//     plataform.add( helper );

//     return helper;
//   }
