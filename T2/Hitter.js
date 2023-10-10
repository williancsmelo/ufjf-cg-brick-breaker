import * as T from 'three'
import { setDefaultMaterial } from '../libs/util/util.js';
import { CSG } from '../libs/other/CSGMesh.js' 

export class Hitter {
  static hitter
  plane
  stop = false
  colliding = false
  bb

  constructor(
    plane,
    color = "red",
    positionY = -124
  ) {

    this.plane = plane;
    this.hitter = this._createPiece(color)
    this.events()

    this.plane.add(this.hitter)
    this.hitter.position.set(0, -124 , -1);
  }

  _createPiece(color) {
    let auxMat = new T.Matrix4();
    
    // Base objects
    let cylinderMesh = new T.Mesh( new T.CylinderGeometry(40, 40, 10, 32));
    cylinderMesh.rotateX(1.5708) // 90 graus
    this.updateObject(cylinderMesh)
    let cubeMesh = new T.Mesh(new T.BoxGeometry(90, 73, 100));

    // CSG holders
    let csgObject, cubeCSG, cylinderCSG

    // Hitter - Cylinder SUBTRACT Cube
    cylinderCSG = CSG.fromMesh(cylinderMesh);
    cubeCSG = CSG.fromMesh(cubeMesh);
    csgObject = cylinderCSG.subtract(cubeCSG); // Execute subtraction

    let hitter = CSG.toMesh(csgObject, auxMat);
    hitter.material = new T.MeshPhongMaterial({color: color});
    
    return hitter;
  }

  setPosition(newPosition) {
    this.hitter.position.x = newPosition;
  }

  events() {
    const onMouseMove = event => {
      const screenWidth = this.plane.geometry.parameters.width / 2
      const totalWidth = window.innerWidth / 2
      const newPosition = event.clientX - totalWidth
      //if (Math.abs(newPosition) < screenWidth - this.width / 2) {
        this.setPosition(newPosition)
        //if (!isStarted) ball.setPosition(newPosition)
      //}
    }

    window.addEventListener('mousemove', onMouseMove)
  }

  updateObject(mesh) {
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
  }

  checkCollisions(ball) {
    const collision = this.bb.intersectsBox(ball.bb);
    if (!collision) {
      this.colliding = false
      return
    }
    if (this.colliding) return
    this.colliding = true
    ball.collide(new T.Vector3(0, 1, 0))
    if (ball.movementVector.y < 0) ball.movementVector.y = 0.25;
    ball.movementVector.normalize();
  }

  updateHitter() {
    this.bb = this._createCollisionBox(this.hitter)
  }

  _createCollisionBox(object) {
    const bbPlat = new T.Box3().setFromObject(object)

    return bbPlat
  }
}
