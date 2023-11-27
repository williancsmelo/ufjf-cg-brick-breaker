import * as T from 'three'
import { ball, totalAxleY } from './config/constants.js'

export class Ball {
  baseSpeed = ball.initialSpeed
  movementVector = new T.Vector3(0, 1, 0)
  object = new T.Mesh(
    new T.SphereGeometry(ball.radius, 32, 32),
    new T.MeshPhongMaterial({
      color: 'red'
    })
  )
  bb = new T.Box3().setFromObject(this.object)
  colliding = false

  constructor(plane) {
    this.object.position.y = ball.initialPositionY
    this.object.position.x = ball.initialPositionX
    this.object.castShadow = true
    plane.add(this.object)
  }

  resetBall(positionX = 0) {
    this.movementVector = new T.Vector3(0, 1, 0)
    this.setPosition(positionX)
    //this.baseSpeed = ball.initialSpeed
    return this
  }

  updateBall(controls, baseSpeed) {
    this.object.position.x += this.movementVector.x * baseSpeed
    this.object.position.y += this.movementVector.y * baseSpeed

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

  delete(plane) {
    this.object.geometry.dispose()
    this.object.material.dispose()
    this.bb = new T.Box3()
    plane.remove(this.bb)
    plane.remove(this.object)
    //clearInterval(this.accelerationInterval)
  }
}

// function createBBHelper(bb, color, plataform) {
//     let helper = new T.Box3Helper( bb, color );
//     plataform.add( helper );

//     return helper;
//   }
