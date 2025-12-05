import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const lines = file.split('\n')

const operations = lines.map((line) => {
  const operator = line[0] === 'L' ? -1 : 1
  const value = parseInt(line.slice(1))

  return { operator, value, original: line }
})

let zero = 0

operations.reduce((current, { operator, value, original }) => {
  let add = 0
  const fullCircle = Math.floor(value / 100)
  add += fullCircle

  const turn = value % 100
  const result = current + operator * turn

  if ((result > 100 || result < 0) && current !== 0) {
    add += 1
  }

  const left = result % 100

  const output = left < 0 ? left + 100 : left

  if (output === 0 && current !== 0) {
    add += 1
  }

  zero += add

  console.log(original, current, output, add, zero)

  return output
}, 50)

console.log(zero)
