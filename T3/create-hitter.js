import { Hitter } from "./Hitter.js";
import { hitter } from "./config/constants.js";

export function createHitter(plane, camera, listener) {
  const brick = new Hitter(plane, camera, listener, hitter.color, hitter.positionY);
  return brick;
}
