import * as T from "three";

export class Wall {
  broken = false;
  plane;
  colliding = false;
  normal;
  object;
  bb;
  collideDeath;
  
  constructor(plane, positionX, positionY, normal, collideDeath = false, ) {
    this.object = new T.Mesh(
        new T.BoxGeometry(window.innerHeight / 2, window.innerHeight),
        new T.MeshBasicMaterial({ color: 'black' })
      )

    
    plane.add(this.object);
    this.object.position.set(positionX, positionY, 0);
    this._createCollisionBox();
    this.bb = new T.Box3().setFromObject(this.object)
    this.plane = plane;
    this.collideDeath = collideDeath;
    this.normal = normal;
  }

  _createCollisionBox() {
    this.bb = new T.Box3().setFromObject(this.object);
  }

  checkCollisions(ball) {
    const collision = this.bb.intersectsBox(ball.bb)
    if (!collision) {
      this.colliding = false
      return
    }

    if(this.collideDeath) return true;

    if (this.colliding) return;
    
    this.colliding = true
    ball.collide(this.normal)
  }
}

export const createWalls = (plane) => {
    const leftWall = new Wall(plane, -window.innerHeight / 2, 0, new T.Vector3(1, 0, 0))
    const rightWall = new Wall(plane, window.innerHeight / 2, 0, new T.Vector3(1, 0, 0))
    const topWall = new Wall(plane, 0, window.innerHeight / 2, new T.Vector3(0, -1, 0));
    const bottomWall = new Wall(plane, 0,  - window.innerHeight, new T.Vector3(0, 1, 0),  true);


    // window.addEventListener("resize", function () {
    //     const newBaseSize = this.window.innerHeight;
    //     plane.scale.x = newBaseSize / baseSize;
    //     plane.scale.y = newBaseSize / baseSize;
    // });
  
  
    return [leftWall, rightWall, topWall, bottomWall];
  };