import * as T from "three";
import { CSG } from "../libs/other/CSGMesh.js";

export class Hitter {
  static hitter;
  plane;
  stop = false;
  colliding = false;
  notMove = false;
  bb;
  raycaster;
  planeRay;
  camera;

  constructor(plane, camera, color = "red", positionY = -124, notMove = false) {
    this.camera = camera
    this.raycaster = new T.Raycaster();
    this.plane = plane;
    this.hitter = this._createPiece(color);
    this.notMove = notMove;

    this.events();

    this.plane.add(this.hitter);
    this.hitter.position.set(0, -112, 0);

    /* Create Plane to Raycaster*/
    let planeRay, planeGeometry, planeMaterial;
    planeGeometry = new T.PlaneGeometry(plane.geometry.parameters.width,plane.geometry.parameters.height,1,1);
    planeMaterial = new T.MeshLambertMaterial();
    planeMaterial.side = T.DoubleSide;
    planeMaterial.transparent = true;
    planeMaterial.opacity = 0;
    planeRay = new T.Mesh(planeGeometry, planeMaterial);
    this.planeRay = planeRay
    plane.add(planeRay);
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
    hitter.material = new T.MeshLambertMaterial({ color: color });

    return hitter;
  }

  setPosition(newPosition) {
    this.hitter.position.x = newPosition;
  }

  events() {
    if (this.notMove) return;
    window.addEventListener("mousemove", this.onMouseMove.bind(this));
  }

  onMouseMove(event) {
    let pointer = new T.Vector2();
    pointer.x =  (event.clientX / window.innerWidth) * 2 - 1;
    this.raycaster.setFromCamera(pointer, this.camera);
    let intersects = this.raycaster.intersectObject(this.planeRay);
    if (intersects.length > 0) 
    {
     const intersect = intersects[0]
       let point = intersect.point; 
       const screenWidth = this.plane.geometry.parameters.width / 2;
       const newPosition = point.x;
       if (
         Math.abs(newPosition) <
         screenWidth - Math.abs(this.bb.max.x - this.bb.min.x) / 2
       ) {
         this.setPosition(newPosition);
       }
    }
  };
 

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
