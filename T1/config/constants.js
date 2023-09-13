

const plataformDistanceFromBottom = 30; // Distancia da plataforma até a borda de baixo da tela
const hitterHeight = 5; // Tamanho do plataforma rebatedora (Hitter)

export const totalAxleY = (window.innerHeight / 2)

export const hitter = {
    height: hitterHeight,
    width: 100,
    color: 0x00ff00,
    positionY: plataformDistanceFromBottom - totalAxleY
}

export const ball = {
    initialPositionX: 0,
    initialPositionY: (plataformDistanceFromBottom + hitterHeight) + 5 - totalAxleY,
}