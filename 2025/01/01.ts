import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const lines = file.split('\n')

const operations = lines.map((line) => {
  const operator = line[0] === 'L' ? -1 : 1
  const value = parseInt(line.slice(1))

  return { operator, value }
})

let zero = 0

operations.reduce((current, { operator, value }) => {
  const result = current + operator * value

  if (result % 100 === 0) {
    zero++
  }

  return result
}, 50)

console.log(zero)
