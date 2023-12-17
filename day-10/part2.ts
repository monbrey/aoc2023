import { readFile } from 'node:fs/promises';

const input = await readFile('day-10/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim());

const grid = lines.map(l => l.split(''));
const route = [...grid.map(l => [...l].map(_ => '.'))];



type XY = `${number},${number}`;

const nodes = new Map<XY, [XY, XY]>();

let start: XY | undefined;
for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		switch (grid[y][x]) {
			case '|': nodes.set(`${y},${x}`, [`${y - 1},${x}`, `${y + 1},${x}`]); break;
			case '-': nodes.set(`${y},${x}`, [`${y},${x - 1}`, `${y},${x + 1}`]); break;
			case 'L': nodes.set(`${y},${x}`, [`${y - 1},${x}`, `${y},${x + 1}`]); break;
			case 'J': nodes.set(`${y},${x}`, [`${y - 1},${x}`, `${y},${x - 1}`]); break;
			case '7': nodes.set(`${y},${x}`, [`${y + 1},${x}`, `${y},${x - 1}`]); break;
			case 'F': nodes.set(`${y},${x}`, [`${y + 1},${x}`, `${y},${x + 1}`]); break;
			case 'S': start = `${y},${x}`; break;
		}
	}
}

if (!start) throw new Error('No start found');

const startNodes = [...nodes.entries()].filter(([_, [n1, n2]]) => n1 === start || n2 === start).map(([k, _]) => k);
nodes.set(start, startNodes as [XY, XY]);

const findNext = (current: XY, previous?: XY): XY => {
	return nodes.get(current)!.find(n => n !== previous && nodes.has(n))!;
}

const polygon: number[][] = [start.split(',').map(Number)];;

let prev = start;
let curr = findNext(start);
let distance = 1;

while (curr !== start) {
	polygon.push(curr.split(',').map(Number));
	let temp = curr;
	curr = findNext(curr, prev);
	prev = temp;
	distance += 1;
}

function inside(point: [number, number], polygon: number[][]) {
	// ray-casting algorithm based on
	// https://wrf.ecse.rpi.edu/Research/Short_Notes/pnpoly.html

	var x = point[0], y = point[1];

	var inside = false;
	for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
		var xi = polygon[i][0], yi = polygon[i][1];
		var xj = polygon[j][0], yj = polygon[j][1];

		var intersect = ((yi > y) != (yj > y))
			&& (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
		if (intersect) inside = !inside;
	}

	return inside;
};

console.log(distance / 2);
console.log(polygon.length);

let enclosed = 0;
for (let y = 0; y < grid.length; y++) {
	for (let x = 0; x < grid[y].length; x++) {
		// Check if point is on the polygon
		if(polygon.some(p => p[0] === y && p[1] === x)) continue;
		// If it isnt, check if its inside
		if(inside([y, x], polygon)) enclosed += 1;
	}
}

console.log(enclosed);