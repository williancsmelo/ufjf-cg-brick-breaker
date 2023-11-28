import { Hitter } from "./Hitter.js";
import { hitter } from "./config/constants.js";

export function createHitter(plane, camera) {
  const brick = new Hitter(plane, camera, hitter.color, hitter.positionY);
  return brick;
}
