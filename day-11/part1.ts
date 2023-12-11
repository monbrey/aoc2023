import { readFile } from 'node:fs/promises';

const input = await readFile('day-11/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim());

type Coord = [number, number];
type Distance = [number, number, number];

const vexpand = (grid: string[]) => grid.flatMap(l => l.split('').every(c => c === '.') ? [l, l] : l);
const hexpand = (grid: string[]) => {
	for (let i = 0; i < grid[0].length; i++) {
		if (grid.every(l => l[i] === '.')) {
			grid = grid.map(l => `${l.slice(0, i)}.${l.slice(i)}`);
			i++;
		}
	}
	return grid;
}

const starmap = hexpand(vexpand(lines));

const galaxyPos = new Map<number, Coord>();
let counter = 1;
for (let y = 0; y < starmap.length; y++) {
	for (let x = 0; x < starmap[y].length; x++) {
		if (starmap[y][x] === '#') galaxyPos.set(counter++, [y, x]);
	}
}

const distance = (a: Coord, b: Coord) => Math.abs((b[1] - a[1])) + Math.abs(((b[0] - a[0])));

const distances = new Map<number, Map<number, number>>();

for (let ai = 1; ai <= galaxyPos.size; ai++) {
	const a = galaxyPos.get(ai)!;
	for (let bi = 1; bi <= galaxyPos.size; bi++) {
		if (ai === bi || distances.get(ai)?.get(bi)) continue;
		const b = galaxyPos.get(bi)!;
		const d = distance(a, b);
		distances.set(ai, distances.get(ai)?.set(bi, d) ?? new Map([[bi, d]]));
	}
}

const dvals = [...distances.values()].flatMap(d => [...d.values()]);

// Divide by two because we actually doubled the work
console.log(dvals.reduce((a, v) => a + v, 0)/2)

