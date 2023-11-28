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
import {
  powerUp as powerUpConfig,
  ball as ballConfig,
  liveQuantity
} from './config/constants.js'
import { createSkybox } from './create-skybox.js'

const renderer = createRenderer()
const scene = new T.Scene()
createSkybox(scene)
const plane = createPlane(scene)
createLight(scene, plane)
const { camera, controls: orbitControls } = createCamera(plane, renderer)

const listener = new T.AudioListener()
camera.add(listener)
const controls = createControls(orbitControls)
const hitter = createHitter(plane, camera, listener, controls)
const walls = createWalls(plane)
let balls = [createBall(plane, controls)]
let ballSpeed = ballConfig.initialSpeed

let powerUp = null
let powerUpCount = 0

let bricks = loadLevel(plane, 1)
let score = 0
let remainingLives = liveQuantity;

let [soundNormalBrick, soundReforcedBrick] = setSoundBrick(listener)

render()

setInterval(() => {
  if (controls.isPaused || !controls.isStarted) return
  if (ballSpeed >= ballConfig.maxSpeed) return
  ballSpeed += ballConfig.initialSpeed / 15
  document.getElementById('speed').innerHTML =
    'Velocidade da bola: ' + ballSpeed.toFixed(2)
}, 1000)

function render() {
  orbitControls.update()
  requestAnimationFrame(render)

  if(remainingLives <= 0){
    remainingLives = liveQuantity;
    controls.setRestartGame(true)
  }

  if (controls.restartGame) {
    // reiniciar jogo ao pressionar R
    restartGame(plane, controls.gameLevel)
  }

  if (controls.isPaused) return
  renderer.render(scene, camera) // Render scene

  if (controls.restartGame) restartGame(plane, controls.gameLevel)
  if (controls.isPaused) return

  hitter.updateHitter()

  if (controls.isStarted) {
    balls = balls.filter(ball => {
      hitter.checkCollisions(ball)
      const isDead = walls.some(wall => wall.checkCollisions(ball))
      if (isDead) ball.delete(plane)
      else {
        ball.updateBall(controls, ballSpeed)
        checkColissionWithBrick(ball)
      }
      return !isDead
    })

    if (balls.length === 0) {
      balls = [createBall(plane, controls).resetBall()]
      controls.setIsStarted(false)
      remainingLives--;
    }
    if(balls.length === 1 && !isFinite(powerUpCount)) powerUpCount = 0
  } else {
    balls[0].resetBall(hitter.hitter.position.x)
  }

  if (powerUp) {
    powerUp.update(controls)
    let verifyCollision = powerUp.checkCollisions(hitter)

    if (verifyCollision && balls.length === 1) {
      let newBall = createBall(plane, controls)
      newBall.object.position.copy(balls[0].object.position)
      balls.push(newBall)
      powerUpCount = -Infinity
    }
  }
}

function deleteBrick(brick) {
  if (controls.isPaused) return

  brick.geometry.dispose()
  brick.material.dispose()
  brick.bb = new T.Box3()
  plane.remove(brick.bb)
  plane.remove(brick)
}

function checkColissionWithBrick(ball) {
  loop: for (let columnIndex = 0; columnIndex < bricks.length; columnIndex++) {
    const bricksRow = bricks[columnIndex] // Seleciona todas as linhas de bricks

    for (let rowIndex = 0; rowIndex < bricksRow.length; rowIndex++) {
      const brick = bricksRow[rowIndex] // Seleciona todas as brick da linha

      // Se a brick colidiu com a bola, destrua ou mude sua cor
      if (brick?.checkCollisions(ball)) {
        brick.remainingHits -= 1

        // Se ainda falta hit, altera cor da brick
        if (brick.remainingHits !== 0) {
          if (isFinite(brick.remainingHits)) {
            soundReforcedBrick.stop()
            soundReforcedBrick.play()
            brick.material.map = null
            brick.material.needsUpdate = true
          }
          return
        }

        // Deleta brick e atualiza placar
        score += brick.pointsCalculator(controls)
        soundNormalBrick.stop()
        soundNormalBrick.play()
        updateScore()
        checkPowerUp(brick.position.x, brick.position.y)
        deleteBrick(brick)
        checkGameFinished()
        break loop
      }
    }
  }
}

function checkPowerUp(x, y) {
  if (powerUpCount >= powerUpConfig.bricksQuantity) {
    powerUp = new PowerUp(plane, x, y, listener)
    controls.setPowerUpActive(true)
    powerUpCount = 0
  }
}

function restartGame(plane, newLevel) {
  controls.setIsStarted(false)
  if (powerUp) powerUp.deletePowerUp(controls)
  balls.forEach(ball => ball.delete(plane))
  balls = [createBall(plane, controls).resetBall()]
  powerUpCount = 0
  hitter.setPosition(0)
  bricks.flat().forEach(brick => brick && deleteBrick(brick))

  const loadingEl = document.querySelector('#loading')
  if (loadingEl) loadingEl.classList.add('active')
  controls.setIsPaused(true)
  controls.setRestartGame(false)

  setTimeout(() => {
    bricks = loadLevel(plane, newLevel ?? 1)
    score = 0
    updateScore()
    controls.setIsPaused(false)
    controls.setIsStarted(false)
    controls.setFinishGame(false)
    controls.setGameLevel(newLevel ?? 1)
    ballSpeed = ballConfig.initialSpeed
    document.getElementById('speed').innerHTML =
      'Velocidade da bola: ' + ballSpeed.toFixed(2)

    loadingEl.classList.remove('active')
    controls.setIsPaused(false)
  }, 1500)
}

function updateScore() {
  document.querySelector(
    '#score'
  ).innerHTML = `Level ${controls.gameLevel} - Pontuação: ${score}`

  if (!controls.powerUpActive) powerUpCount++ // Se não tiver nenhum powerup ativo, aumenta a contagem
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
  balls.forEach(ball => ball.resetBall())
  setTimeout(() => {
    controls.setIsPaused(true)
    document.querySelector('#score').innerHTML =
      `Level finalizado | Pontuação: ` + score

    if (gameLevels[controls.gameLevel + 1])
      setTimeout(() => {
        const newLevel = controls.gameLevel + 1
        controls.setGameLevel(newLevel)
        restartGame(plane, newLevel)
      }, 2000)
  }, 20)
}

function setSoundBrick(listener) {
  const soundNormalBrick = new T.Audio(listener)
  const soundReforcedBrick = new T.Audio(listener)
  const audioLoaderNormalBrick = new T.AudioLoader()
  const audioLoaderReforcedBrick = new T.AudioLoader()

  audioLoaderNormalBrick.load('./assets/bloco1.mp3', buffer => {
    soundNormalBrick.setBuffer(buffer)
    soundNormalBrick.setLoop(false)
    soundNormalBrick.setVolume(0.5)
  })

  audioLoaderReforcedBrick.load('./assets/bloco2.mp3', buffer => {
    soundReforcedBrick.setBuffer(buffer)
    soundReforcedBrick.setLoop(false)
    soundReforcedBrick.setVolume(0.5)
  })

  return [soundNormalBrick, soundReforcedBrick]
}
