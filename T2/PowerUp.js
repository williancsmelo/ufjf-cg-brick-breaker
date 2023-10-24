import * as T from 'three'
import { ball, totalAxleY } from './config/constants.js'

class PowerUp1 {
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

  constructor(plane, controls) {
    this.object.position.y = ball.initialPositionY
    this.object.position.x = ball.initialPositionX
    this.object.castShadow = true
    plane.add(this.object)
    setInterval(() => {
      if (controls.isPaused || !controls.isStarted) return
      if (this.baseSpeed >= ball.maxSpeed) return
      this.baseSpeed += this.baseSpeed / 15
      document.getElementById('speed').innerHTML =
        'Velocidade da bola: ' + this.baseSpeed.toFixed(2)
    }, 1000)
  }

  resetBall(positionX = 0) {
    this.movementVector = new T.Vector3(0, 1, 0)
    this.setPosition(positionX)
    this.baseSpeed = ball.initialSpeed
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

export class PowerUp {
    isActive = true;
    plane;
    mesh;
    
    constructor(plane, posX, posY) {
        this.plane = plane
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        canvas.width = 110 ;
        canvas.height = 50;

        context.fillStyle = 'yellow'; // Cor do texto
        context.font = '16px Arial';
        context.fillText('POWER UP', 10, 30); // Especifique a posição do texto

        const texture = new T.CanvasTexture(canvas);

        const geometry = new T.BoxGeometry(20, 5, 1);
        const material = new T.MeshBasicMaterial({ map: texture });
        this.mesh = new T.Mesh(geometry, material);
        console.log(posX)
        this.mesh.position.set(posX, posY, 10); // Posição inicial do power-up

        plane.add(this.mesh);
    }

    update() {
        if (this.isActive) {
          this.mesh.position.y -= 0.5; // Faça o power-up cair.
    
          // TODO: Adicione lógica para verificar colisões com a plataforma ou outras interações.
    
          // Se o power-up cair para fora da tela, desative-o.
          if (this.mesh.position.y < -100) {
            this.isActive = false;
            this.plane.remove(this.mesh);
          }
        }
      }
  }