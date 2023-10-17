import * as T from "three";
import { CSG } from "../libs/other/CSGMesh.js";

export class Hitter {
  static hitter;
  plane;
  stop = false;
  colliding = false;
  notMove = false;
  bb;

  constructor(plane, color = "red", positionY = -124, notMove = false) {
    this.plane = plane;
    this.hitter = this._createPiece(color);
    this.notMove = notMove;

    this.events();

    this.plane.add(this.hitter);
    this.hitter.position.set(0, -112, 0);
  }

  _createPiece(color) {
    let auxMat = new T.Matrix4();

    // Base objects
    let cylinderMesh = new T.Mesh(new T.CylinderGeometry(30, 30, 10, 64));
    cylinderMesh.rotateX(1.5708); // 90 graus
    this.updateObject(cylinderMesh);
    let cubeMesh = new T.Mesh(new T.BoxGeometry(60, 60, 100));
    cubeMesh.position.y = -3;
    this.updateObject(cubeMesh);

    // CSG holders
    let csgObject, cubeCSG, cylinderCSG;

    // Hitter - Cylinder SUBTRACT Cube
    cylinderCSG = CSG.fromMesh(cylinderMesh);
    cubeCSG = CSG.fromMesh(cubeMesh);
    csgObject = cylinderCSG.subtract(cubeCSG); // Execute subtraction

    let hitter = CSG.toMesh(csgObject, auxMat);
    hitter.material = new T.MeshPhongMaterial({ color: color });

    return hitter;
  }

  setPosition(newPosition) {
    this.hitter.position.x = newPosition;
  }

  events() {
    if(this.notMove) return;

    const onMouseMove = (event) => {
      const screenWidth = this.plane.geometry.parameters.width / 2;
      const totalWidth = window.innerWidth / 2;
      const newPosition = event.clientX - totalWidth;
      if (
        Math.abs(newPosition) <
        screenWidth - Math.abs(this.bb.max.x - this.bb.min.x) / 2
      ) {
        this.setPosition(newPosition);
        //if (!isStarted) ball.setPosition(newPosition)
      }
    };

    window.addEventListener("mousemove", onMouseMove);
  }

  updateObject(mesh) {
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
  }

  checkCollisions(ball) {
    const collision = this.bb.intersectsBox(ball.bb);
    if (!collision) {
      this.colliding = false;
      return;
    }
    if (this.colliding) return;
    this.colliding = true;

    let normalVector = this.calcNormalVector(ball, this.hitter);

    ball.collide(normalVector);
    if (ball.movementVector.y < 0) ball.movementVector.y = 0.25;
    ball.movementVector.normalize();
  }

  calcNormalVector(ball, hitter) {
    let ballPosition = ball.object.position;
    let hitterPosition = new T.Vector3();

    hitterPosition.copy(hitter.position);
    hitterPosition.y = -137;

    let normalVector = new T.Vector3();
    normalVector.subVectors(ballPosition, hitterPosition);

    return normalVector.normalize();
  }

  updateHitter() {
    this.bb = this._createCollisionBox(this.hitter);
  }

  _createCollisionBox(object) {
    const bbPlat = new T.Box3().setFromObject(object);

    return bbPlat;
  }
}
