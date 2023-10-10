import * as T from "three";
import { Wall } from "./Wall.js";

export const createWalls = (plane) => {
    return [
        {x: -100, vector: [1, 0, 0]},
        {x: 100, vector: [-1, 0, 0]},
        {y: 200, vector: [0, -1, 0]},
        {y: -200, vector: [0, 1, 0], kill: true},
    ].map((wall) => new Wall(plane, wall.x || 0, wall.y || 0, new T.Vector3(...wall.vector), wall.kill || false))
};