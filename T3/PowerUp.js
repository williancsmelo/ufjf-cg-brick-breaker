import * as T from 'three'
import { ball, totalAxleY } from './config/constants.js'

export class PowerUp {
  plane
  mesh
  bb
  sound

  constructor(plane, posX, posY, listener) {
    this.plane = plane
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 110
    canvas.height = 50

    context.fillStyle = 'yellow' // Cor do texto
    context.font = '16px Arial'
    context.fillText('POWER UP', 10, 30) // Especifique a posição do texto

    const texture = new T.CanvasTexture(canvas)

    const geometry = new T.BoxGeometry(20, 5, 1)
    const material = new T.MeshBasicMaterial({ map: texture })
    this.mesh = new T.Mesh(geometry, material)
    this.mesh.position.set(posX, posY, 0) // Posição inicial do power-up

    this.sound = new T.Audio(listener);
    const audioLoader = new T.AudioLoader();
    audioLoader.load("./assets/bloco3.mp3", (buffer) => {
        this.sound.setBuffer(buffer);
        this.sound.setLoop(false);
        this.sound.setVolume(0.5);
    });

    plane.add(this.mesh)
  }

  update(controls) {
    if (controls.powerUpActive) {
      this.mesh.position.y -= 0.5

      if (this.mesh.position.y < -100) {
        this.deletePowerUp(controls)
      }
    }
  }

  _createCollisionBox(object) {
    const bb = new T.Box3().setFromObject(object)

    return bb
  }

  checkCollisions(hitter) {
    this.bb = this._createCollisionBox(this.mesh)

    const collision = this.bb.intersectsBox(hitter.bb)

    if (!collision) return

    this.plane.remove(this.mesh)
    this.sound.play();

    return collision
  }

  deletePowerUp(controls) {
    this.plane.remove(this.mesh)
    controls.setPowerUpActive(false)
  }
}
