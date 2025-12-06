import fs from 'node:fs/promises'

const file = await fs.readFile('input.txt', 'utf-8')
const lines = file.split('\n')

const matrix = lines.map((line) => line.trim().split(/ +/))

type Operator = '*' | '+'
const operators = matrix.pop()! as Operator[]

const values = matrix.map((row) => row.map(Number))

function transpose<T>(matrix: T[][]) {
  const width = matrix[0]?.length!
  const height = matrix.length

  return Array.from({ length: width }, (_e, w) =>
    Array.from({ length: height }, (_e, h) => matrix[h]?.[w]!),
  )
}

function operate(items: number[], operator?: Operator) {
  return items.reduce(
    (prev, next) => eval(`${prev} ${operator} ${next}`),
    operator === '*' ? 1 : 0,
  )
}

function sum(items: number[]) {
  return items.reduce((c, v) => c + v, 0)
}

const columns = transpose(values)

const results = columns.map((items, index) => operate(items, operators[index]))

console.log({ columns, operators, results })
console.log(sum(results))
