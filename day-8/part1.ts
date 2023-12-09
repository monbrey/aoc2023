import { readFile } from 'node:fs/promises';

const input = await readFile('day-8/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim())

const lr = lines.shift()!;
lines.shift();

const paths = new Map();

for (const l of lines) {
	const [a, bc] = l.split(' = ');
	const [b, c] = [...bc.matchAll(/([A-Z]{3})/g)].map(m => m[0]);

	paths.set(a, [b, c]);
}

let node = 'AAA', i = 0, steps = 0;
while (node != 'ZZZ') {
	if (i >= lr.length) i = 0;
	node = paths.get(node)[lr[i++] == 'L' ? 0 : 1];
	steps++;
}

console.log(steps);