import { readFile } from 'node:fs/promises';

const input = await readFile('day-9/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim()).map(l => l.split(/\s+/).map(Number));

let total = 0;
for (let [i, sequence] of lines.entries()) {
	let subtotal = 0;
	while (!sequence.every(v => v == 0)) {
		subtotal += sequence.at(-1) ?? 0;

		const diffs = [];
		for( let i = 1; i < sequence.length; i++) {
			diffs.push(sequence[i] - sequence[i - 1]);
		}
		sequence = diffs;
	}

	total += subtotal;
}

console.log(total);
