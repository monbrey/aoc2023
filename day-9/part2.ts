import { readFile } from 'node:fs/promises';

const input = await readFile('day-9/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim()).map(l => l.split(/\s+/).map(Number));

let total = 0;
for (let sequence of lines) {
	let ends = [];
	while (!sequence.every(v => v == 0)) {
		ends.push(sequence.at(0) ?? 0);

		const diffs = [];
		for(let i = 1; i < sequence.length; i++) {
			diffs.push(sequence[i] - sequence[i - 1]);
		}
		sequence = diffs;
	}

	let next = 0;
	for(let i = 1; i <= ends.length; i++) {
		next = ends.at(-i)! - next;
	}
	total += next;
}

console.log(total);
