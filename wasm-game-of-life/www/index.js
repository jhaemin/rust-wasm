import { Universe, Cell } from 'wasm-game-of-life'
import { memory } from 'wasm-game-of-life/wasm_game_of_life_bg'

// wasm.greet('jhaemin')

// const pre = document.getElementById('game-of-life-canvas')

// const renderLoop = () => {
//   pre.textContent = universe.render()
//   universe.tick()

//   requestAnimationFrame(renderLoop)
// }

const CELL_SIZE = 5 // px
const GRID_COLOR = '#cccccc'
const DEAD_COLOR = '#ffffff'
const ALIVE_COLOR = '#000000'

const universe = Universe.new()
const width = universe.width()
const height = universe.height()

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('game-of-life-canvas')
canvas.height = (CELL_SIZE + 1) * height + 1
canvas.width = (CELL_SIZE + 1) * width + 1

const ctx = canvas.getContext('2d')

const drawGrid = () => {
  ctx.beginPath()
  ctx.strokeStyle = GRID_COLOR

  // Vertical lines
  for (let i = 0; i <= width; i += 1) {
    ctx.moveTo(i * (CELL_SIZE + 1) + 1, 0)
    ctx.lineTo(i * (CELL_SIZE + 1) + 1, (CELL_SIZE + 1) * height + 1)
  }

  // Horizontal lines
  for (let j = 0; j <= height; j += 1) {
    ctx.moveTo(0, j * (CELL_SIZE + 1) + 1)
    ctx.lineTo((CELL_SIZE + 1) * width + 1, j * (CELL_SIZE + 1) + 1)
  }

  ctx.stroke()
}

const getIndex = (row, column) => row * width + column

const drawCells = () => {
  const cellsPtr = universe.cells()
  // Get cells directly from the wasm memory
  const cells = new Uint8Array(memory.buffer, cellsPtr, width * height)

  ctx.beginPath()

  for (let row = 0; row < height; row += 1) {
    for (let col = 0; col < width; col += 1) {
      const idx = getIndex(row, col)

      ctx.fillStyle = cells[idx] === Cell.Dead ? DEAD_COLOR : ALIVE_COLOR
      ctx.fillRect(
        col * (CELL_SIZE + 1) + 1,
        row * (CELL_SIZE + 1) + 1,
        CELL_SIZE,
        CELL_SIZE
      )
    }
  }

  ctx.stroke()
}

const renderLoop = () => {
  universe.tick()

  drawGrid()
  drawCells()

  requestAnimationFrame(renderLoop)
}

requestAnimationFrame(renderLoop)
