import * as T from "three";

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
  const camera = new T.OrthographicCamera(
    sizes.left,
    sizes.right,
    sizes.top,
    sizes.bottom,
    1,
    1000
  );
  camera.position.set(0, 0, 10);
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
