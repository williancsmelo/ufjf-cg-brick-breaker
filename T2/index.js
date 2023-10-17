import * as T from 'three'
import { createCamera } from './create-camera.js'
import { createPlane } from './create-plane.js'
import { loadLevel, gameLevels } from './load-level.js'
import { createHitter } from './create-hitter.js'
import { createBall } from './create-ball.js'
import { createControls } from './create-controls.js'
import { createWalls } from './create-walls.js'
import { createLight } from './create-light.js'
import { createRenderer } from './create-renderer.js'

const renderer = createRenderer()
const scene = new T.Scene()
const plane = createPlane(scene)
createLight(scene, plane)
const camera = createCamera(plane, renderer)
const controls = createControls()
const ball = createBall(plane, controls)
const hitter = createHitter(plane, ball, controls.isStarted)
const walls = createWalls(plane)

let bricks = loadLevel(plane, 1)
let score = 0

render()

function render() {
  if (controls.restartGame) restartGame(plane)

  if (!controls.isPaused) {
    renderer.render(scene, camera) // Render scene
    hitter.updateHitter()
    hitter.checkCollisions(ball)
    // hitter.updateHitter()
    // hitter.checkCollisions(ball)
    walls.forEach(wall => {
      let collideDeath = wall.checkCollisions(ball)

      if (collideDeath) {
        wall.collideDeath = false
        controls.setIsStarted(false)
      }
    })
    !controls.isStarted
      ? ball.resetBall(hitter.hitter.position.x)
      : ball.updateBall(controls)
    checkColissionWithBrick()
  }
  requestAnimationFrame(render)
}

function deleteBrick(brick) {
  if (controls.isPaused) return

  brick.geometry.dispose()
  brick.material.dispose()
  brick.bb = new T.Box3()
  plane.remove(brick.bb)
  plane.remove(brick)
}

function checkColissionWithBrick() {
  bricks.some(bricksRow => {
    return bricksRow.some(brick => {
      if (!brick?.checkCollisions(ball) || brick.remainingHits < 0) return
      brick.remainingHits -= 1
      if (brick.remainingHits !== 0) return
      deleteBrick(brick)
      score += brick.pointsCalculator(controls)
      updateScore()
      checkGameFinished()
      return true
    })
  })
}

function restartGame(plane) {
  ball.resetBall()
  hitter.setPosition(0)

  bricks.flat().forEach(brick => brick && deleteBrick(brick))
  bricks.length = 0
  bricks = loadLevel(plane, controls.gameLevel)
  score = 0
  updateScore()

  controls.setIsPaused(false)
  controls.setIsStarted(false)
  controls.setRestartGame(false)
}

function updateScore() {
  document.querySelector('#score').innerHTML = 'Pontuação: ' + score
}

function checkGameFinished() {
  if (
    bricks
      .flat()
      .some(
        brick =>
          brick && brick.remainingHits > 0 && isFinite(brick.remainingHits)
      )
  )
    return
  ball.resetBall()
  setTimeout(() => {
    controls.setIsPaused(true)
    document.querySelector('#score').innerHTML =
      'Jogo finalizado | Pontuação: ' + score

    if (gameLevels[controls.gameLevel + 1])
      setTimeout(() => {
        controls.gameLevel += 1
        restartGame(plane)
      }, 2000)
  }, 20)
}
