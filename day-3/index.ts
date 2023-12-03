import { readFile } from 'node:fs/promises';

const input = await readFile('day-3/input.txt', 'utf8');
const schematic = input.split('\n').map(l => l.trim());

const redigit = /(\d+)/g;
const resymbol = /[\d\.]/;
let part_sum = 0;

function checkAdjacency(row: number, start: number, length: number) {
	for(let x = row - 1; x <= row + 1; x++) {
		for(let y = start - 1; y <= start+length; y++) {
			if(x < 0 || y < 0 || x >= schematic.length || y >= schematic[x].length) continue;
			if(!resymbol.test(schematic[x][y])) {
				return true;
			}
		}
	}
}

for(let i = 0; i < schematic.length; i++) {
	let next = redigit.exec(schematic[i]);
	while(next) {
		const part = checkAdjacency(i, next.index, next[0].length);
		if(part) {
			part_sum += Number(next[0]);
		}
		next = redigit.exec(schematic[i]);
	}
}

console.log(part_sum);

// Part 2

let ratio_sum = 0;

function checkAdjacentStar(row: number, start: number, length: number) {
	for(let x = row - 1; x <= row + 1; x++) {
		for(let y = start - 1; y <= start+length; y++) {
			if(x < 0 || y < 0 || x >= schematic.length || y >= schematic[x].length) continue;
			if(schematic[x][y] === '*') {
				return `${x},${y}`;
			}
		}
	}
}

const starmap = new Map<string,number[]>();

for(let i = 0; i < schematic.length; i++) {
	let next = redigit.exec(schematic[i]);
	while(next) {
		const star = checkAdjacentStar(i, next.index, next[0].length);
		if(star) {
			starmap.set(star, [...starmap.get(star) ?? [], Number(next[0])]);
		}
		next = redigit.exec(schematic[i]);
	}
}

for(const pairs of starmap.values()) {
	if(pairs.length === 2) {
		ratio_sum += pairs[0] * pairs[1];
	}
}

console.log(ratio_sum);