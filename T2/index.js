import * as T from 'three'
import { createCamera } from './create-camera.js'
import { createPlane } from './create-plane.js'
import { createBricks } from './create-bricks.js'
import { createHitter } from './create-hitter.js'
import { createBall } from './create-ball.js'
import { createControls } from './create-controls.js'
import { isFullscreen } from './utils.js'
import { createWalls } from './create-walls.js'
import { createLight } from './create-light.js'
import { createRenderer } from './create-renderer.js'

const renderer = createRenderer()
const scene = new T.Scene()
const plane = createPlane(scene)
createLight(scene, plane)
const camera = createCamera(plane, renderer)
const controls = createControls(isFullscreen())
let bricks = createBricks(plane, controls.gameLevel)
const ball = createBall(plane)
const hitter = createHitter(plane, ball, controls.isStarted)
const walls = createWalls(plane)

let breakedBricks = [] // Vetor para armazenar bricks quebradas - Exemplo: [{rowIndex: 2, columnIndex: 2}, ..., {rowIndex: 1, columnIndex: 0}]

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
  finishGame()
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
  loop1: for(let columnIndex = 0; columnIndex < bricks.length; columnIndex++){
    const bricksRow = bricks[columnIndex];
    for(let rowIndex = 0; rowIndex < bricksRow.length; rowIndex++){
      const brick = bricksRow[rowIndex];
      if (brick.checkCollisions(ball)) {
        deleteBrick(brick)
        breakedBricks.push({ rowIndex, columnIndex }) // Guarda a brick quebrada no vetor
        updateScore(plane)
        break loop1;
      }
    }


  }
}

function restartGame(plane) {
  ball.resetBall()
  hitter.setPosition(0)

  bricks.forEach(brickRow => {
    brickRow.forEach(brick => {
      deleteBrick(brick)
    })
  })
  bricks = createBricks(controls.gameLevel, plane)
  breakedBricks = []
  updateScore(plane)

  controls.setIsPaused(false)
  controls.setIsStarted(false)
  controls.setRestartGame(false)
}

function updateScore() {
  let score = breakedBricks.length
  document.querySelector('#score').innerHTML = 'Pontuação: ' + score
}

function finishGame() {
  if (
    breakedBricks.length === bricks.length * bricks[0].length &&
    !controls.isPaused
  ) {
    ball.resetBall()
    setTimeout(() => {
      controls.setIsPaused(true)
      document.querySelector('#score').innerHTML = 'Jogo finalizado'
    }, 20)
  }
}
