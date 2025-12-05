import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const banks = file
  .split('\n')
  .map((bank) => bank.split('').map((b) => parseInt(b)))

const on = banks.map((bank) => {
  const firstDigit = Math.max(...bank.slice(0, -1))
  const firstIndex = bank.findIndex((v) => v === firstDigit)

  const secondDigit = Math.max(...bank.slice(firstIndex + 1))

  return firstDigit * 10 + secondDigit
})

const sum = on.reduce((c, v) => c + v, 0)

console.log(sum)
