import * as T from "three";

export default class Hitter {
  static platform;
  plane
  width;
  stop = false;

  pieces = [
    { object: null, bb: null, normal: new T.Vector3(0, 1, 0) }, // --_--
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) }, // ---_-
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) }, // -_---
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0) }, // ----_
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 6), Math.sin(Math.PI / 6), 0) } // _----
  ];

  constructor(plane, width = 100, height = 5, color = 0x00ff00, positionY = -350) {
    const eachPieceWidth = width / 5;
    const initialPos = [0, eachPieceWidth, -eachPieceWidth, 2 * eachPieceWidth, -2 * eachPieceWidth];
    this.plane = plane;
    this.width = width;
    this.events();


    this.pieces.forEach((piece, index) => {
      let object = this._createPiece(eachPieceWidth, height, piece.color);

      piece.object = object;
      piece.bb = this._createCollisionBox(object, "yellow");
    });

    this.platform = this._createPiece(width, height);
    this.platform.position.set(0, positionY, 0);
    this.plane.add(this.platform);

    // Adiciona e posiciona na cena
    this.pieces.forEach((piece, index) => {
      this.platform.add(piece.object);
      piece.object.position.x = initialPos[index];
    })
  }

  setPosition(newPosition) {
    this.platform.position.x = newPosition;
  }

  updateHitter() {
    this.pieces.forEach(piece => {
      piece.bb = this._createCollisionBox(piece.object)
    })
  }

  checkCollisions(ball) {
    const collision = this.pieces.find(piece => {
      return piece.bb.intersectsBox(ball.bb)
    })
    if (!collision) return
    const angle = ball.movementVector.angleTo(collision.normal);
    let angleInDegree = angle * (180 / Math.PI)
    if (ball.movementVector.x > 0) angleInDegree -= 90
    ball.movementVector = this.angleToVector(angleInDegree);
    if (ball.movementVector.y < 0) ball.movementVector.y = 0.08
    ball.movementVector.normalize()
  }

  angleToVector(angleInDegree) {
    var anguloEmRadianos = angleInDegree * (Math.PI / 180);
    var x = Math.cos(anguloEmRadianos);
    var y = Math.sin(anguloEmRadianos);
    var z = 0;

    return new T.Vector3(x, y, z);
  }

  _createCollisionBox(object, color = "red") {
    const bbPlat = new T.Box3().setFromObject(object);

    return bbPlat;
  }


  _createPiece(eachPieceWidth, height = 100, color = "green") {
    const platformGeometry = new T.BoxGeometry(eachPieceWidth, height, 1);
    const platformMaterial = new T.MeshBasicMaterial({ color });
    const platform = new T.Mesh(platformGeometry, platformMaterial);

    return platform;
  }

  events() {
    const onMouseMove = (event) => {
      const screenWidth = this.plane.geometry.parameters.width / 2
      const totalWidth = window.innerWidth / 2;
      const newPosition = event.clientX - totalWidth
      if (Math.abs(newPosition) < (screenWidth - (this.width / 2))) {
        this.setPosition(newPosition)
        //if (!isStarted) ball.setPosition(newPosition)
      }
    };

    window.addEventListener("mousemove", onMouseMove);
  }

}

function createBBHelper(bb, color, piece) {
  // Create a bounding box helper
  let helper = new T.Box3Helper(bb, color);
  piece.add(helper);

  return helper;
}
