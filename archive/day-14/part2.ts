import { readFile } from 'node:fs/promises';

const input = await readFile('day-14/input.txt', 'utf8');
const grid = input.trim().split('\r\n').map(l => l.split(''));

const generateEmpty = () => [...Array(grid.length)].map(l => [...Array(grid[0].length)].map(_ => '.'));

const north = (grid: string[][]) => {
	const titled = generateEmpty();

	for (let y = 0; y < grid[0].length; y++) {
		let free = 0;
		for (let x = 0; x < grid.length; x++) {
			if (grid[x][y] === 'O') {
				titled[free][y] = 'O';
				free++;
			} else if (grid[x][y] === '#') {
				titled[x][y] = '#';
				free = x + 1;
			}
		}
	}

	return titled;
}

const east = (grid: string[][]) => {
	const tilted = generateEmpty();

	for (let x = 0; x < grid.length; x++) {
		let free = grid.length - 1;
		for (let y = grid[0].length - 1; y >= 0; y--) {
			if (grid[x][y] === 'O') {
				tilted[x][free] = 'O';
				free--;
			} else if (grid[x][y] === '#') {
				tilted[x][y] = '#';
				free = y - 1;
			}
		}
	}

	return tilted;
}

const south = (grid: string[][]) => {
	const tilted = generateEmpty();

	for (let y = grid[0].length - 1; y >= 0; y--) {
		let free = grid[0].length - 1;
		for (let x = grid.length - 1; x >= 0; x--) {
			if (grid[x][y] === 'O') {
				tilted[free][y] = 'O';
				free--;
			} else if (grid[x][y] === '#') {
				tilted[x][y] = '#';
				free = x - 1;
			}
		}
	}

	return tilted;
}

const west = (grid: string[][]) => {
	const tilted = generateEmpty();

	for (let x = grid.length - 1; x >= 0; x--) {
		let free = 0;
		for (let y = 0; y < grid[0].length; y++) {
			if (grid[x][y] === 'O') {
				tilted[x][free] = 'O';
				free++;
			} else if (grid[x][y] === '#') {
				tilted[x][y] = '#';
				free = y + 1;
			}
		}
	}

	return tilted;
}

const cycle = (grid: string[][]) => {
	let cycled = grid;
	const past = [];
	let index = -1;
	for (let i = 0; i < Infinity; i++) {
		cycled = east(south(west(north(cycled))));
		const c = cycled.map(_ => _.join('')).join('')
		index = past.findIndex(p => p === c);
		if (index !== -1) {
			return { cycled, stop: i, index }
		}
		past.push(c);
	}

	return { cycled, stop: -1, index }
}

let { cycled, stop, index } = cycle(grid);

const remaining = (1000000000-stop-1)%(stop-index);

for(let i = 0; i < remaining; i++) {
	cycled = east(south(west(north(cycled))));
}

const weight = cycled.reduce((a, v, x) => a += v.filter(_ => _ === 'O').length * (cycled.length - x), 0)
console.log(weight);