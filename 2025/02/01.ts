import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const rangeStrings = file.split(',')

const ranges = rangeStrings.map((str) => ({
  start: parseInt(str.split('-')[0] ?? ''),
  end: parseInt(str.split('-')[1] ?? ''),
}))

// This might be stupid, but it should work...

const allNumbers = ranges
  .map(({ start, end }) => {
    return Array.from({ length: end - start + 1 }, (_e, i) => i + start)
  })
  .flat()

let repeats = 0

allNumbers.forEach((n) => {
  const number = n.toString()
  const length = number.length

  if (length % 2 !== 0) {
    return
  }

  if (number.slice(0, length / 2) === number.slice(length / 2)) {
    repeats += n
  }

  return
})

console.log(repeats)
