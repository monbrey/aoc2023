import { readFile } from 'node:fs/promises';

const input = await readFile('day-10/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim());

const grid = lines.map(l => l.split(''));

type XY = `${number},${number}`;

const nodes = new Map<XY, [XY, XY]>();

let start: XY | undefined;
// A left node will be considered west, or north unless nw
// A right node will be considered east, or south
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

let prev;
let curr = findNext(start);
let distance = 1;

while(curr !== start) {
	let temp = curr;
	curr = findNext(curr, prev);
	prev = temp;
	distance += 1;
}

console.log(distance/2);