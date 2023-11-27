import { Ball } from './Ball.js'

export const createBall = (plane, controls) => {
  const ball = new Ball(plane, controls)

  return ball
}
