import * as T from 'three'
import { ball, totalAxleY } from './config/constants.js'

export class Ball {
  movementVector = new T.Vector3(0, 1, 0)
  object
  bb = new T.Box3()
  colliding = false
  speed = ball.initialSpeed
  #accelerationInterval = null

  constructor(plane, controls) {
    this.object = new T.Mesh(
      new T.SphereGeometry(ball.radius, 32, 32),
      new T.MeshPhongMaterial({
        color: 'red'
      })
    )
    this.object.position.y = ball.initialPositionY
    this.object.position.x = ball.initialPositionX
    this.updateHitBox()
    this.object.castShadow = true
    this.#accelerationInterval = setInterval(() => {
      if (controls.isPaused || !controls.isStarted) return
      if (this.speed >= ball.maxSpeed) return
      this.speed += ball.initialSpeed / 15
    }, 1000)
    plane.add(this.object)
  }

  resetBall(positionX = 0) {
    this.movementVector = new T.Vector3(0, 1, 0)
    this.setPosition(positionX)
    this.speed = ball.initialSpeed
    return this
  }

  updateHitBox() {
    this.bb.setFromObject(this.object)
  }

  updateBall(controls) {
    this.object.position.x += this.movementVector.x * this.speed
    this.object.position.y += this.movementVector.y * this.speed
    this.updateHitBox()
    if (this.object.position.y * -1 > totalAxleY) {
      controls.setIsStarted(false)
    }
  }

  setPosition(x = ball.initialPositionX, y = ball.initialPositionY) {
    this.object.position.x = x
    this.object.position.y = y
    this.updateHitBox()
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
    clearInterval(this.#accelerationInterval)
    this.object.geometry.dispose()
    this.object.material.dispose()
    this.bb = null
    plane.remove(this.bb)
    plane.remove(this.object)
  }
}

// function createBBHelper(bb, color, plataform) {
//     let helper = new T.Box3Helper( bb, color );
//     plataform.add( helper );

//     return helper;
//   }
