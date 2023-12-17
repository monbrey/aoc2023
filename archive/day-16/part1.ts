import { readFile } from 'node:fs/promises';

const raw = await readFile('day-16/sample.txt', 'utf8');
const input = raw.trim().split('\r\n').map(_ => _.split(''));

const Direction: { [key: string]: [number, number] } = {
	Up: [-1, 0],
	Down: [1, 0],
	Left: [0, -1],
	Right: [0, 1]
}

const energised = new Map<string, string[]>();
const key = ([y, x]: [number, number]) => `${y},${x}`;

const steps: [[number,number], string][] = [];

const follow = (tile: [number, number], dir: string) => {
	const [y, x] = tile;

	// Check we're on the grid
	if (y < 0 || y === input.length || x < 0 || x === input[y].length) return;

	// Check if we've already followed this path (kill circulars)
	const state = energised.get(key(tile));
	if (state?.includes(dir)) return;

	// Update the state
	energised.set(key(tile), [...state ?? [], dir]);

	switch (input[y][x]) {
		case '.': {
			const [yinc, xinc] = Direction[dir];
			steps.push([[y + yinc, x + xinc], dir]);
			return;
		}
		case '/': {
			switch (dir) {
				case 'Up': {
					const [yinc, xinc] = Direction['Right'];
					steps.push([[y + yinc, x + xinc], 'Right']);
					return;
				}
				case 'Down': {
					const [yinc, xinc] = Direction['Left'];
					steps.push([[y + yinc, x + xinc], 'Left']);
					return;
				}
				case 'Left': {
					const [yinc, xinc] = Direction['Down'];
					steps.push([[y + yinc, x + xinc], 'Down']);
					return;
				}
				case 'Right': {
					const [yinc, xinc] = Direction['Up'];
					steps.push([[y + yinc, x + xinc], 'Up']);
					return;
				}
			}
			break;
		}
		case '\\': {
			switch (dir) {
				case 'Up': {
					const [yinc, xinc] = Direction['Left'];
					steps.push([[y + yinc, x + xinc], 'Left']);
					return;
				}
				case 'Down': {
					const [yinc, xinc] = Direction['Right'];
					steps.push([[y + yinc, x + xinc], 'Right']);
					return;
				}
				case 'Left': {
					const [yinc, xinc] = Direction['Up'];
					steps.push([[y + yinc, x + xinc], 'Up']);
					return;
				}
				case 'Right': {
					const [yinc, xinc] = Direction['Down'];
					steps.push([[y + yinc, x + xinc], 'Down']);
					return;
				}
			}
		}
		case '|': {
			switch (dir) {
				case 'Left':
				case 'Right': {
					const [yinc1, xinc1] = Direction['Up'];
					const [yinc2, xinc2] = Direction['Down'];
					steps.push([[y + yinc1, x + xinc1], 'Up'], [[y + yinc2, x + xinc2], 'Down']);
					return;
				}
				default: {
					const [yinc, xinc] = Direction[dir];
					steps.push([[y + yinc, x + xinc], dir]);
					return;
				}
			}
		}
		case '-': {
			switch (dir) {
				case 'Up':
				case 'Down': {
					const [yinc1, xinc1] = Direction['Left'];
					const [yinc2, xinc2] = Direction['Right'];
					steps.push([[y + yinc1, x + xinc1], 'Left'], [[y + yinc2, x + xinc2], 'Right']);
					return;
				}
				default: {
					const [yinc, xinc] = Direction[dir];
					steps.push([[y + yinc, x + xinc], dir]);
					return;
				}
			}
		}
	}
}

steps.push([[0, 0], 'Right']);

let step;
while (step = steps.shift()) {
	follow(step[0], step[1])
}

console.log(energised.size)
