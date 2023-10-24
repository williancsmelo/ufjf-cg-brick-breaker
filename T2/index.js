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
import { PowerUp } from './PowerUp.js'

const renderer = createRenderer()
const scene = new T.Scene()
const plane = createPlane(scene)
createLight(scene, plane)
const camera = createCamera(plane, renderer)
const controls = createControls()
const ball = createBall(plane, controls)
const hitter = createHitter(plane, ball, controls.isStarted)
const walls = createWalls(plane)


let powerUp = null
let powerUpCount = 0;

let bricks = loadLevel(plane, 1)
let score = 0

render()

function render() {
  if (controls.restartGame) {

    let newLevel = controls.gameLevel;
    if(controls.finishGame) newLevel = 2; 
    restartGame(plane, newLevel)
  }

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
    if(powerUp) powerUp.update();
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
  loop: for(let columnIndex = 0; columnIndex < bricks.length; columnIndex++){
    const bricksRow = bricks[columnIndex]; // Seleciona todas as linhas de bricks

    for(let rowIndex = 0; rowIndex < bricksRow.length; rowIndex++){ 
      const brick = bricksRow[rowIndex]; // Seleciona todas as brick da linha
       
      // Se a brick colidiu com a bola, destrua ou mude sua cor
      if (brick?.checkCollisions(ball)) {
        brick.remainingHits -= 1

        // Se ainda falta hit, altera cor da brick
        if (brick.remainingHits !== 0) { 
          brick.changeColor("(79,79,79)");
          return
        }

        // Deleta brick e atualiza placar
        updateScore()
        checkPowerUp(brick.position.x, brick.position.y);
        deleteBrick(brick)
        score += brick.pointsCalculator(controls)
        checkGameFinished()
        break loop;
      }
    }
  }
}

function checkPowerUp(x, y){
  if(powerUpCount >= 2){
    powerUp = new PowerUp(plane, x, y);
    powerUpCount = 0;
  }
}

function restartGame(plane, newLevel) {
  ball.resetBall()
  hitter.setPosition(0)

  const finishClearBricks = new Promise((resolve, reject) => {
    bricks.flat().forEach((brick, index, array) => {
      if(brick) deleteBrick(brick)

      if (index === array.length -1) resolve();
    })
  });

   finishClearBricks.then(() => {
    bricks.length = 0
    bricks = loadLevel(plane, controls.gameLevel)
    score = 0
    updateScore()

    controls.setIsPaused(false)
    controls.setIsStarted(false)
    controls.setFinishGame(false)
    controls.setGameLevel(newLevel ?? 1)
    controls.setRestartGame(false)
  });

}

function updateScore() {
  document.querySelector('#score').innerHTML = `Level ${controls.gameLevel} - Pontuação: ${score}`
  powerUpCount++;
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
      `Level finalizado | Pontuação: ` + score

    if (gameLevels[controls.gameLevel + 1])
      setTimeout(() => {
        controls.setGameLevel(controls.gameLevel + 1)
        restartGame(plane)
      }, 2000)
  }, 20)
}
