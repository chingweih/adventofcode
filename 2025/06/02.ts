import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const lines = file.split('\n')

const operatorLine = lines.pop()
const operatorIndecies = operatorLine
  ?.split('')
  .reduce((list, current, index) => {
    if (['*', '+'].includes(current)) {
      return [...list, index]
    }

    return list
  }, [] as number[])!
const operators = operatorLine?.split(/ +/) as Operator[]

function mergeIndecies<T>(items: T[], indecies: number[]) {
  return indecies.reduce((list, current, index, indecies) => {
    return [
      ...list,
      items.slice(
        current,
        !!indecies[index + 1] ? indecies[index + 1]! - 1 : undefined,
      ),
    ]
  }, [] as T[][])
}

function transpose<T>(matrix: T[][]) {
  const width = matrix[0]?.length!
  const height = matrix.length

  return Array.from({ length: width }, (_e, w) =>
    Array.from({ length: height }, (_e, h) => matrix[h]?.[w]!),
  )
}

type Operator = '*' | '+'

function operate(items: number[], operator?: Operator) {
  return items.reduce(
    (prev, next) => eval(`${prev} ${operator} ${next}`),
    operator === '*' ? 1 : 0,
  )
}

function sum(items: number[]) {
  return items.reduce((c, v) => c + v, 0)
}

function concatToNumber(numbers: string[]) {
  return numbers
    .reverse()
    .filter((n) => n !== '0')
    .reduce((p, n, index) => p + Number(n) * 10 ** index, 0)
}

const columns = transpose(
  lines.map((line) =>
    mergeIndecies(line.split(''), operatorIndecies).map((l) =>
      l.map((v) => (v === ' ' ? '0' : v)),
    ),
  ),
).map((numbers) => transpose(numbers).map(concatToNumber))

const results = columns.map((items, index) => operate(items, operators[index]))

console.dir({ columns, operators, results }, { depth: Infinity })
console.log(sum(results))
