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

const merged = fresh
  .sort((a, b) => a.start - b.start)
  .reduce(
    (combined, next) => {
      const prev = combined.pop()

      // Handle the first item
      if (!prev) {
        return [next]
      }

      // Previous and next has overlaps
      if (prev.end >= next.start) {
        return [
          ...combined,
          {
            start: prev.start,
            end: Math.max(prev.end, next.end),
          },
        ]
      }

      return [...combined, prev, next]
    },
    [] as { start: number; end: number }[],
  )

console.log(merged.reduce((c, v) => c + v.end - v.start + 1, 0))
