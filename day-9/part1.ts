import { readFile } from 'node:fs/promises';

const input = await readFile('day-9/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim()).map(l => l.split(/\s+/).map(Number));

let total = 0;
const subtotals = [];
for (let [i, sequence] of lines.entries()) {
	let subtotal = 0;
	while (!sequence.every(v => v == 0)) {
		subtotal += sequence.at(-1) ?? 0;

		sequence = sequence.reduce<number[]>((acc, val, i, source) => {
			if (!source[i + 1]) return acc;
			return [...acc, source[i + 1] - val]
		}, [])
	}

	total += subtotal;
	subtotals.push(subtotal);
}

console.log(total);
