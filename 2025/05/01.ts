import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const [freshRanges, availableList] = file.split('\n\n')

if (!freshRanges || !availableList) {
  throw new Error('Just doing it for the type-safety')
}

const fresh = freshRanges
  .split('\n')
  .map((rangeString) => {
    const [start, end] = rangeString.split('-')

    if (!start || !end) {
      return undefined
    }

    return { start: parseInt(start), end: parseInt(end) }
  })
  .filter((o) => o !== undefined)

const avaliable = availableList.split('\n').map((a) => parseInt(a))

const isFresh = avaliable.map((id) => {
  const found = fresh.find((range) => id >= range.start && id <= range.end)

  if (found) {
    return 1
  }

  return 0
}) as number[]

const freshCount = isFresh.reduce((c, v) => c + v, 0)
console.log(freshCount)
