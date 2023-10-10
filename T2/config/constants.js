

const plataformDistanceFromBottom = 15; // Distancia da plataforma até a borda de baixo da tela
const hitterHeight = 3; // Tamanho do plataforma rebatedora (Hitter)

export const totalAxleY = (window.innerHeight / 2)

export const hitter = {
    height: hitterHeight,
    width: 30,
    color: 0x00ff00,
    positionY: plataformDistanceFromBottom - 100
}

export const ball = {
    radius: 3,
    initialPositionY: plataformDistanceFromBottom + hitterHeight + 2 - 100,
    initialPositionX: 0,
}

export const specialBrickColor = "gray"
