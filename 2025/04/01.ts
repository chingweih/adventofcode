import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const matrix = file.split('\n').map((line) => line.split(''))

const PAPER_ROLL = '@'

const accessible = matrix.map((row, y) => {
  return row.map((item, x) => {
    if (item !== PAPER_ROLL) return 0

    const adjacents = [
      matrix[y - 1]?.[x - 1],
      matrix[y - 1]?.[x],
      matrix[y - 1]?.[x + 1],
      matrix[y]?.[x - 1],
      '.',
      matrix[y]?.[x + 1],
      matrix[y + 1]?.[x - 1],
      matrix[y + 1]?.[x],
      matrix[y + 1]?.[x + 1],
    ].filter((a) => a === PAPER_ROLL)

    const occupied = adjacents.length

    if (occupied < 4) {
      return 1
    }

    return 0
  })
}) as number[][]

const total = accessible.flat().reduce((c, v) => c + v, 0)

console.log(total)
