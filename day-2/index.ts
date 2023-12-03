import { readFile } from 'node:fs/promises';

const input = await readFile('day-2/input.txt', 'utf8');
const lines = input.split('\n').map(l => l.split(': ')).map(l => l[1].split('; '));

let power_sum = 0;
for(const [i, line] of lines.entries()) {
	const red = Math.max(...line.map(l => /(\d+) red/.exec(l)?.[1] ?? 0).map(Number));
	const blue = Math.max(...line.map(l => /(\d+) blue/.exec(l)?.[1] ?? 0).map(Number));
	const green = Math.max(...line.map(l => /(\d+) green/.exec(l)?.[1] ?? 0).map(Number));

	const power = red * blue * green;
	power_sum += power;
}

console.log(power_sum);