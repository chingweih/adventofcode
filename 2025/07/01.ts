import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')

let matrix = file.split('\n').map((l) => l.split(''))

enum Entity {
  Beam = 'S',
  Empty = '.',
  Splitter = '^',
  Path = '|',
}

function print(matrix: string[][]) {
  return matrix.map((r) => r.join('')).join('\n')
}

function findBeam(matrix: string[][]): [number, number] {
  const target = Entity.Beam
  const row = matrix.findIndex((l) => l.includes(target))
  const column = matrix[row]?.indexOf(target)

  if (row === -1 || column === -1 || column === undefined) {
    throw Error('Beam not found')
  }

  return [row, column]
}

function updateMatrix(matrix: string[][], [nr, nc]: [number, number]) {
  const output = [...matrix]
  const [pr, pc] = findBeam(output)
  output[pr]![pc] = '.'
  output[nr]![nc] = 'S'
  return output
}

function beam(matrix: string[][]) {
  const [row, column] = findBeam(matrix)

  const nextSpliter = matrix
    .slice(row)
    .findIndex((r) => r[column] === Entity.Splitter)

  if (nextSpliter === -1) {
    return { done: true, next: undefined } as const
  }

  return { done: false, next: [nextSpliter + row, column] } as const
}

let beams: [number, number][] = []

function fire(matrix: string[][]) {
  const { done, next } = beam(matrix)

  if (done) {
    return
  }

  const [nr, nc] = next

  if (beams.findIndex(([r, c]) => r === nr && c === nc) !== -1) {
    return
  }

  beams.push([nr, nc])

  fire(updateMatrix(matrix, [nr, nc + 1]))
  fire(updateMatrix(matrix, [nr, nc - 1]))

  return
}

fire(matrix)

console.log(beams.length)
