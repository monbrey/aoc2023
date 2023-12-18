const start = performance.now();

import { readFileSync } from 'node:fs';

const log = process.argv.find(arg => arg === '--debug') ? console.log : () => null

const parse = () => {
	const filename = process.argv.find(arg => arg === '--sample') ? 'sample.txt' : 'input.txt';
	const input = readFileSync(`day-18/${filename}`, 'utf8');
	return input.trim().split('\r\n').map(_ => _.split(' '))
}

const drawTrench = (data: string[][]) => {
	// 2D array to store the trench coordinates
	const trench: string[][] = [['#']];
	// Current coordinate
	let x = 0, y = 0;
	for (const [direction, steps] of data) {
		switch (direction) {
			// Add new '#' to the right
			case 'R':
				for (let s = 0; s < Number(steps); s++) {
					// If the column is already there, just set it
					if (trench[y][x + 1]) trench[y][++x] = '#';
					// Otherwise push a new column onto every row
					else {
						for (let i = 0; i < trench.length; i++) {
							trench[i].push('.');
						}
						// Then set it
						trench[y][++x] = '#'
					}
				}
				break;
			// Add new '#' to the left
			case 'L':
				for (let s = 0; s < Number(steps); s++) {
					if (trench[y][x - 1]) trench[y][--x] = '#';
					else {
						for (let i = 0; i < trench.length; i++) {
							trench[i].unshift('.');
						}
						trench[y][0] = '#'
						x = 0;
					}
				}
				break;
			// Add new '#' above
			case 'U':
				for (let s = 0; s < Number(steps); s++) {
					if (trench[y - 1]?.[x]) trench[--y][x] = '#';
					else {
						// Add a new row on top
						trench.unshift(Array(trench[0].length).fill('.'));
						trench[0][x] = '#'
						y = 0;
					}
				}
				break;
			// Add new '#' below
			case 'D':
				for (let s = 0; s < Number(steps); s++) {
					if (trench[y + 1]?.[x]) trench[++y][x] = '#';
					else {
						trench.push(Array(trench[0].length).fill('.'));
						trench[++y][x] = '#'
					}
				}
				break;
		}
	}

	return trench;
}

// const mapTrench = (trench: string[][]) => {
// 	// Array of trench coordinates
// 	const polygon: [number, number][] = [];
// 	for (let x = 0; x < trench.length; x++) {
// 		for (let y = 0; y < trench[0].length; y++) {
// 			if (trench[x][y] === '#') {
// 				polygon.push([x,y]);
// 			}
// 		}
// 	}

// 	return polygon;
// }

// A basic flood fill
const excavateHole = (trench: string[][]) => {
	// Copy the trench to avoid mutation
	const hole = [...trench.map(_ => [..._])];
	for (let y = 0; y < trench.length; y++) {
		for (let x = 0; x < trench[0].length; x++) {
			if (trench[y][x] === '#' && trench[y][x + 1] === '#' && trench[y + 1][x] === '#' && trench[y + 1][x + 1] === '.') {
				// We found a top corner! It probably doesn't need this much checking
				const queue = [[y + 1, x + 1]];
				const checked = new Set();
				while (queue.length) {
					const [y2, x2] = queue.pop()!;
					checked.add(JSON.stringify([y2, x2]));
					if (trench[y2][x2] === '.') {
						hole[y2][x2] = '#';
						for (const adj of [[0, 1], [0, -1], [1, 0], [-1, 0]]) {
							const next = [y2 + adj[0], x2 + adj[1]];
							if (!checked.has(JSON.stringify(next)) && trench[next[0]]?.[next[1]]) {
								queue.push(next);
							}
						}
					}
				}
				return hole;
			}
		}
	}
	// This shouldnt be reached, its just here to make TS happy
	return hole;
}

const print = (data: any[][]) => data.map(_ => _.join('')).join('\n')

const data = parse();
const trench = drawTrench(data);
const hole = excavateHole(trench);

console.log(hole.reduce((a, v) => a += v.filter(v2 => v2 === '#').length, 0));

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);