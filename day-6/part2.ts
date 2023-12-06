import { readFile } from 'node:fs/promises';

const input = await readFile('day-6/input.txt', 'utf8');
const lines = input.trim().split('\n');

const time = Number(lines[0].split(/:\s+/)[1].trim().replace(/\s+/g, ''));
const dist = Number(lines[1].split(/:\s+/)[1].trim().replace(/\s+/g, ''));

console.log(time, dist);
// find the min
for (let i = 0; i < time; i++) {
	if (i * (time - i) > dist) {
		// min = i
		// max = time - min
		// total ways = max - min + 1 for inclusive
		console.log('ways', time - i - i + 1)
		break;
	}
}

// console.log(races);
// console.log(races.reduce((a,v) => a*v[4], 1));