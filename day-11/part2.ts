import { readFile } from 'node:fs/promises';

const input = await readFile('day-11/input.txt', 'utf8');
const starmap = input.trim().split('\n').map(l => l.trim());

type Coord = [number, number];

const galaxyPos = new Map<number, Coord>();

// While mapping, keep track of empty lines, and record how much to increase coordinates by
let counter = 1, yinc = 0, xinc = 0;
for (let y = 0; y < starmap.length; y++) {
	if (starmap[y].split('').every(c => c === '.')) {
		// every empty row we find, the y pos increases by 999999 (1 replaced by 1m)
		yinc += 999999;
	} else {
		for (let x = 0; x < starmap[y].length; x++) {
			if (starmap.every(l => l[x] === '.')) {
				// every empty column we find, the x pos increases by 999999 (1 replaced by 1m)
				
				xinc += 999999;
			} else {
				if (starmap[y][x] === '#') galaxyPos.set(counter++, [y+yinc, x+xinc]);
			}
		}
		// reset the xinc
		xinc = 0;
	}
}

const distance = (a: Coord, b: Coord) => Math.abs((b[1] - a[1])) + Math.abs(((b[0] - a[0])));

const distances = new Map<number, Map<number, number>>();

console.log(galaxyPos);

for (let ai = 1; ai < galaxyPos.size + 1; ai++) {
	const a = galaxyPos.get(ai)!;
	for (let bi = 1; bi < galaxyPos.size + 1; bi++) {
		if (ai === bi || distances.get(ai)?.get(bi)) continue;
		const b = galaxyPos.get(bi)!;
		const d = distance(a, b);
		distances.set(ai, distances.get(ai)?.set(bi, d) ?? new Map([[bi, d]]));
	}
}

const dvals = [...distances.values()].flatMap(d => [...d.values()]);

// Divide by two because we actually doubled the work
console.log(dvals.reduce((a, v) => a + v, 0) / 2)

