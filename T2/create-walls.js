import * as T from "three";
import { Wall } from "./Wall.js";

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