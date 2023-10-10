import * as T from "three";

export class Wall {
    broken = false;
    plane;
    colliding = false;
    normal;
    object;
    bb;
    collideDeath;
    state;

    /**
    *  Cria uma Wall.
    *  @param {T.Mesh} plane Plano que a parede será adicionada
    *  @param {Number} positionX Posição da parede no eixo x
    *  @param {Number} positionY Posição da parede no eixo y
    *  @param {T.Vector3} normal Vetor normal da parede
    *  @param {Boolean} collideDeath Define se deve matar a bola ao tocar na parede
    */
    constructor(plane, positionX, positionY, normal, collideDeath = false) {
      this.object = new T.Mesh(
          new T.BoxGeometry(100, 200),
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