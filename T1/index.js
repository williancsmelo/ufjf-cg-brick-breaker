import * as T from "three";
import { initRenderer, initDefaultBasicLight } from "../libs/util/util.js";
import { createCamera } from "./create-camera.js";
import { createPlane } from "./create-plane.js";
import { createBricks } from "./create-bricks.js";
import { createHitter } from "./create-hitter.js";
import { createBall } from "./create-ball.js";
import { createControls } from "./create-controls.js";
import { isFullscreen } from "./utils.js";


const renderer = initRenderer();
const scene = new T.Scene();
initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
const camera = createCamera(scene, renderer);
const plane = createPlane(scene);
let bricks = createBricks(plane);
const ball = createBall(plane);
const controls = createControls(isFullscreen());
const hitter = createHitter(plane, ball, controls.isStarted);
let breakedBricks = [] // Vetor para armazenar bricks quebradas - Exemplo: [{rowIndex: 2, columnIndex: 2}, ..., {rowIndex: 1, columnIndex: 0}]
render();

function render() {
  if (controls.restartGame) restartGame(plane);

  if (!controls.isPaused) {
    renderer.render(scene, camera); // Render scene
    hitter.updateHitter();
    hitter.checkCollisions(ball);
    !controls.isStarted ? ball.setPosition(hitter.platform.position.x) : ball.updateBall();
    checkColissionWithBrick(ball);
  }

  requestAnimationFrame(render);
}

function deleteBrick(brick) {
  brick.geometry.dispose();
  brick.material.dispose();
  brick.bb = new T.Box3();
  plane.remove(brick.bb);
  plane.remove(brick);
}

function checkColissionWithBrick() {
  let stop;
  bricks.forEach((brickRow, columnIndex) => {

    stop = false
    brickRow.forEach((brick, rowIndex) => {
      if (!stop && brick.checkCollisions(ball)) {
        deleteBrick(brick)
        stop = true;
        breakedBricks.push({ rowIndex, columnIndex }) // Guarda a brick quebrada no vetor
        updateScore();
      }
    })
  })
}

function restartGame(plane) {
  controls.setIsPaused(false)
  controls.setIsStarted(false);
  controls.setRestartGame(false);
  ball.resetBall();
  hitter.setPosition(0);

  bricks.forEach((brickRow) => {
    brickRow.forEach(brick => {
      deleteBrick(brick)
    })
  })

  bricks = createBricks(plane);
  breakedBricks = [];
  updateScore();
}

function updateScore() {
  let score = breakedBricks.length;
  document.querySelector("#score").innerHTML = "Pontuação: " + score
}

