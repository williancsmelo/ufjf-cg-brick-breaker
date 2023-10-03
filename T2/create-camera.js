import * as T from "three";

import {
  SecondaryBox, 
  } from "../libs/util/util.js";

const getCameraSizes = () => {
  const w = window.innerWidth;
  const h = window.innerHeight;
  return {
    left: w / -2,
    right: w / 2,
    height: h / 2,
    bottom: h / -2,
  };
};
export const createCamera = (scene, renderer) => {
  const sizes = getCameraSizes();
  // const camera = new T.OrthographicCamera(
  //   sizes.left,
  //   sizes.right,
  //   sizes.top,
  //   sizes.bottom,
  //   1,
  //   1000
  // );


  let camPos  = new T.Vector3(3, 4, 8);
  let camUp   = new T.Vector3(0.0, 1.0, 0.0);
  let camLook = new T.Vector3(3, 4, 0.0);
  const camera = new T.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.copy(camPos);
   camera.up.copy( camUp );
   camera.lookAt(camLook);
  
   camera.position.set(0, -160, 190);
  scene.add(camera);

  window.addEventListener(
    "resize",
    function () {
      onCameraResize(camera);
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  return camera;
};

export function onCameraResize(camera) {
  const sizes = getCameraSizes();
  Object.entries(sizes).forEach(([key, value]) => (camera[key] = value));
  camera.updateProjectionMatrix();
}
