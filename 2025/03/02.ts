import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const banks = file
  .split('\n')
  .map((bank) => bank.split('').map((b) => parseInt(b)))

function findMax(numbers: number[]) {
  const max = Math.max(...numbers)
  const index = numbers.findIndex((v) => v === max)
  return { max, index }
}

const NUM_BATTERIES = 12

const on = banks.map((bank) => {
  const batteryCount = bank.length
  let joltage = 0
  Array.from({ length: NUM_BATTERIES }, (_e, i) => i).reduce(
    (startIndex, i) => {
      const { max, index } = findMax(
        bank.slice(startIndex, batteryCount - (12 - i) + 1),
      )

      joltage += max * 10 ** (12 - i - 1)
      return index + 1 + startIndex
    },
    0,
  )
  return joltage
})

const sum = on.reduce((c, v) => c + v, 0)

console.log(sum)
