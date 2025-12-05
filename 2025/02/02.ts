import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const rangeStrings = file.split(',')

const ranges = rangeStrings.map((str) => ({
  start: parseInt(str.split('-')[0] ?? ''),
  end: parseInt(str.split('-')[1] ?? ''),
}))

function getAllNumbersInRange({ start, end }: { start: number; end: number }) {
  return Array.from({ length: end - start + 1 }, (_e, i) => i + start)
}

const allNumbers = ranges.map(getAllNumbersInRange).flat()

let repeats = 0

function sliceStringToEvenParts({
  string,
  interval,
}: {
  string: string
  interval: number
}) {
  const sets = string.length / interval
  return Array.from({ length: sets }).map((_e, i) =>
    string.slice(i * interval, (i + 1) * interval),
  )
}

allNumbers.forEach((n) => {
  const number = n.toString()
  const length = number.length
  const intervals = getAllNumbersInRange({ start: 1, end: length }).filter(
    (len) => length % len === 0 && length !== len,
  )

  intervals.some((interval) => {
    const parts = sliceStringToEvenParts({ string: number, interval })

    if (parts.every((part, _index, array) => part === array[0])) {
      repeats += n
      return true
    }

    return false
  })
})

console.log(repeats)
