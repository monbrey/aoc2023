import { readFile } from 'node:fs/promises';

const input = await readFile('day-14/input.txt', 'utf8');
const grid = input.trim().split('\r\n').map(l => l.split(''));

const north = [...Array(grid.length)].map(l => [...Array(grid[0].length)].map(_=>'.'));

for (let y = 0; y < grid[0].length; y++) {
	let free = 0;
	for (let x = 0; x < grid.length; x++) {
		if(grid[x][y] === 'O') {
			north[free][y] = 'O';
			free++;
		} else if (grid[x][y] === '#') {
			north[x][y] = '#';
			free = x+1;
		}
	}
}

const weight = north.reduce((a,v,x) => a += v.filter(_=>_==='O').length * (north.length - x), 0)

console.log(weight);