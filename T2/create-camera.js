import * as T from "three";

export const createCamera = (scene, renderer) => {
  const camera = new T.PerspectiveCamera(80, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 130)
  camera.up.set(0, 1 ,0)
  scene.add(camera);

  window.addEventListener(
    "resize",
    function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    },
    false
  );

  return camera;
};

