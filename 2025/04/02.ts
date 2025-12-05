import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
let matrix = file.split('\n').map((line) => line.split(''))

const PAPER_ROLL = '@'

let removed = 0

while (true) {
  let sessionRemoved = 0

  const newMatrix = matrix.map((row, y) => {
    return row.map((item, x) => {
      if (item !== PAPER_ROLL) return item

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
        sessionRemoved++
        return '.'
      }

      return item
    })
  })

  removed += sessionRemoved
  matrix = newMatrix

  if (sessionRemoved === 0) {
    break
  }
}

console.log(removed)
