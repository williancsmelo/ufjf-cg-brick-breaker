const plataformDistanceFromBottom = 15 // Distancia da plataforma até a borda de baixo da tela
const hitterHeight = 3 // Tamanho do plataforma rebatedora (Hitter)

export const totalAxleY = window.innerHeight / 2

export const hitter = {
  height: hitterHeight,
  width: 30,
  color: 0x00ff00,
  positionY: -124
}

export const ball = {
  radius: 3,
  initialPositionY: plataformDistanceFromBottom + hitterHeight + 3 - 100,
  initialPositionX: 0,
  initialSpeed: 1,
  maxSpeed: 2
}

export const powerUp = {
  bricksQuantity: 10
}
