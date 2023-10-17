import * as T from "three";
import { initDefaultBasicLight } from "../libs/util/util.js";
export const createLight = (scene, plane) => {
  initDefaultBasicLight(scene);
  const light = new T.PointLight(0xffffff, 1, 400, 1);
  light.position.set(20, 100, 120);
  light.castShadow = true;
  plane.add(light);
};
