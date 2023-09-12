import * as T from "three";

export default class Hitter {
  static platform;

  constructor(plane, width = 100, height = 5, color = 0x00ff00) {
    const platformGeometry = new T.BoxGeometry(width, height, 1);
    const platformMaterial = new T.MeshBasicMaterial({ color });
    const platform = new T.Mesh(platformGeometry, platformMaterial);
    plane.add(platform);

    this.platform = platform;

    // Posicione a plataforma
    platform.position.set(0, -300, 0);
  }

  setPosition(newPosition) {
    this.platform.position.x = newPosition;
  }
}
