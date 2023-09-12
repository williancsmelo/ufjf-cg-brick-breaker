import * as T from "three";

export default class Hitter {
  static platform;
  width;
  stop = false;

  pieces = [
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) },
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) },
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) },
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) },
    { object: null, bb: null, normal: new T.Vector3(Math.cos(Math.PI / 3), Math.sin(Math.PI / 3), 0) }
  ];

  constructor(plane, width = 100, height = 5, color = 0x00ff00) {
    const eachPieceWidth = width / 5;
    const initialPos = [0, eachPieceWidth, -eachPieceWidth, 2 * eachPieceWidth, -2 * eachPieceWidth];
    this.plane = plane;
    this.width = width;


    this.pieces.forEach((piece, index) => {
      let object = this._createPiece(eachPieceWidth, height, piece.color);

      piece.object = object;
      piece.bb = this._createCollisionBox(object, "yellow");
    });

    // Adiciona e posiciona na cena
    this.pieces.forEach((piece, index) => {
      if(index === 0) {
        plane.add(piece.object)
        piece.object.position.y = -300;
      }
      else {
        this.pieces[0].object.add(piece.object);
        piece.object.position.x = initialPos[index];
      }
    })

    this.platform = this.pieces[0].object;

    // Posicione a plataforma
    this.platform.position.set(0, -300, 0);
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
    let collision = this.pieces[1].bb.intersectsBox(ball.bb);
    if(collision) {
      console.log("colidiu");
      //const currentAngle = vectorA.angleTo(vectorB);
      const dot = ball.movementVector.dot(this.pieces[1].normal);
      //console.log(this.stop);

      if(this.stop == false) {
        ball.movementVector = ball.movementVector.multiplyScalar(2 * dot).negate();
        console.log(ball.movementVector);
        this.stop = true;
      }

      //console.log()
    }
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

}

function createBBHelper(bb, color, piece) {
  // Create a bounding box helper
  let helper = new T.Box3Helper( bb, color );
  piece.add( helper );
  
  return helper;
}

