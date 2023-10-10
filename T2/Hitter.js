import * as T from 'three'
import { setDefaultMaterial } from '../libs/util/util.js';
import { CSG } from '../libs/other/CSGMesh.js' 

export class Hitter2 {
  static platform
  plane
  width
  stop = false
  colliding = false

  constructor(
    plane,
    width = 100,
    height = 5,
    color = 0x00ff00,
    positionY = -350
  ) {

    this.plane = plane;
    this.width = width;
    this.platform = this._createPiece()

    this.plane.add(this.platform)
    this.platform.position.set(0, -289 , -1)
    this.platform.rotateX(1.5708)
    console.log(this.plane.position);
    console.log(this.platform.position);
  }

  _createPiece() {
    let auxMat = new T.Matrix4();
    
    // Base objects
    let cylinderMesh = new T.Mesh( new T.CylinderGeometry(10, 10, 70, 32));
    let cubeMesh = new T.Mesh(new T.BoxGeometry(0,1, 0.1, 0.1));

    // CSG holders
    let csgObject, cubeCSG, cylinderCSG

    // Hitter - Cylinder SUBTRACT Cube
    cylinderCSG = CSG.fromMesh(cylinderMesh);
    cubeCSG = CSG.fromMesh(cubeMesh);
    csgObject = cylinderCSG.subtract(cubeCSG); // Execute subtraction

    let hitter = CSG.toMesh(csgObject, auxMat);
    cylinderMesh.material = new T.MeshPhongMaterial({color: 'lightgreen'});
    
    return cylinderMesh;
  }

  updateObject(mesh) {
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
  }
}

export default class Hitter {
  static platform
  plane
  width
  stop = false
  colliding = false

  pieces = [
    { object: null, bb: null, normal: new T.Vector3(0, 1, 0) }, // --_--
    {
      object: null,
      bb: null,
      normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0)
    }, // ---_-
    {
      object: null,
      bb: null,
      normal: new T.Vector3(-Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0)
    }, // -_---
    {
      object: null,
      bb: null,
      normal: new T.Vector3(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0)
    }, // ----_
    {
      object: null,
      bb: null,
      normal: new T.Vector3(-Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0)
    } // _----
  ]

  constructor(
    plane,
    width = 100,
    height = 5,
    color = 0x00ff00,
    positionY = -350
  ) {
    const eachPieceWidth = width / 5
    const initialPos = [
      0,
      eachPieceWidth,
      -eachPieceWidth,
      2 * eachPieceWidth,
      -2 * eachPieceWidth
    ]
    this.plane = plane
    this.width = width
    this.events()

    this.pieces.forEach((piece, index) => {
      let object = this._createPiece(eachPieceWidth, height, piece.color)

      piece.object = object
      piece.bb = this._createCollisionBox(object, 'yellow')
    })

    this.platform = this._createPiece(width, height)
    this.platform.position.set(0, positionY, 0)
    this.plane.add(this.platform)
    console.log(this.platform.position)

    // Adiciona e posiciona na cena
    this.pieces.forEach((piece, index) => {
      this.platform.add(piece.object)
      piece.object.position.x = initialPos[index]
    })
  }

  setPosition(newPosition) {
    this.platform.position.x = newPosition
  }

  updateHitter() {
    this.pieces.forEach(piece => {
      piece.bb = this._createCollisionBox(piece.object)
    })
  }

  checkCollisions(ball) {
    const collision = this.pieces.find(piece => piece.bb.intersectsBox(ball.bb))
    if (!collision) {
      this.colliding = false
      return
    }
    if (this.colliding) return
    this.colliding = true
    ball.collide(collision.normal)
    if (ball.movementVector.y < 0) ball.movementVector.y = 0.25;
    ball.movementVector.normalize();
  }

  angleToVector(angleInDegree) {
    var anguloEmRadianos = angleInDegree * (Math.PI / 180)
    var x = Math.cos(anguloEmRadianos)
    var y = Math.sin(anguloEmRadianos)
    var z = 0

    return new T.Vector3(x, y, z)
  }

  _createCollisionBox(object) {
    const bbPlat = new T.Box3().setFromObject(object)

    return bbPlat
  }

  _createPiece(eachPieceWidth, height = 100) {
    const platformGeometry = new T.BoxGeometry(eachPieceWidth, height, 1)
    const platformMaterial = setDefaultMaterial('green')
    const platform = new T.Mesh(platformGeometry, platformMaterial)

    return platform
  }

  events() {
    const onMouseMove = event => {
      const screenWidth = this.plane.geometry.parameters.width / 2
      const totalWidth = window.innerWidth / 2
      const newPosition = event.clientX - totalWidth
      if (Math.abs(newPosition) < screenWidth - this.width / 2) {
        this.setPosition(newPosition)
        //if (!isStarted) ball.setPosition(newPosition)
      }
    }

    window.addEventListener('mousemove', onMouseMove)
  }
}

function createBBHelper(bb, color, piece) {
  // Create a bounding box helper
  let helper = new T.Box3Helper(bb, color)
  piece.add(helper)

  return helper
}
