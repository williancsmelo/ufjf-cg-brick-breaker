import * as T from "three";
export const createCamera = (scene) => {
  const aspect = innerWidth / innerHeight;
  const baseSize = window.innerHeight;
  const camera = new T.OrthographicCamera(
    (-baseSize * aspect) / 2,
    (baseSize * aspect) / 2,
    baseSize / 2,
    -baseSize / 2,
    1,
    1000
  );
  camera.position.set(0, 0, 10);
  scene.add(camera);
  return camera;
};
