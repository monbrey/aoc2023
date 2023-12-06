import { readFile } from 'node:fs/promises';

const input = await readFile('day-6/input.txt', 'utf8');
const lines = input.trim().split('\n');

const times = lines[0].split(/:\s+/)[1].trim().split(/\s+/).map(Number);
const distances = lines[1].split(/:\s+/)[1].trim().split(/\s+/).map(Number);
const races = times.map((t, i) => ([t, distances[i]]));

for (const [i, r] of [...races.entries()]) {
	// find the min
	for (let i = 0; i < r[0]; i++) {
		if (i * (r[0] - i) > r[1]) {
			// min = i
			// max = time - min
			r.push(i, r[0] - i);
			break;
		}
	}
	// total ways = max - min + 1 for inclusive
	r.push(r[3] - r[2] + 1);
	races[i] = r
}

console.log(races.reduce((a, v) => a * v[4], 1));