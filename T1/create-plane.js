import * as T from "three";
export const createPlane = (scene) => {
  const baseSize = window.innerHeight;
  const planeGeometry = new T.PlaneGeometry(baseSize / 2, baseSize);
  const planeMaterial = new T.MeshBasicMaterial({ color: "blue" });
  const plane = new T.Mesh(planeGeometry, planeMaterial);
  plane.position.z = -1;
  scene.add(plane);
  return plane;
};
