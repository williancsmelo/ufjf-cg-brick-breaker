import * as T from "three";
import { setDefaultMaterial } from "../libs/util/util.js";


export class Ball {
	static height = 8;
	broken = false;
	baseSpeed = 0.3;
	bb;
	
	movementVector;
  object;
  
  constructor(plane, width = 100, height = 5, color = "red") {
    const geometry = new T.SphereGeometry( 6, 32, 16 );
    const material = new T.MeshBasicMaterial( { color: 0xffff00 } );
    this.object = new T.Mesh(geometry, material);
		this.bb = new T.Box3().setFromObject(this.object);

    this.object.position.y = -200;
		
		this.movementVector = new T.Vector3(1, -1, 0);
    this.object = this.object;
    
    plane.add(this.object);
  }

  updateBall() {
    this.object.position.x += this.movementVector.x * this.baseSpeed;
    this.object.position.y += this.movementVector.y * this.baseSpeed;

		this.bb = new T.Box3().setFromObject(this.object);
  }
}

// function createBBHelper(bb, color, plataform) {
//     let helper = new T.Box3Helper( bb, color );
//     plataform.add( helper );
    
//     return helper;
//   }