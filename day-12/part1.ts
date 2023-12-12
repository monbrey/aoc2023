import { readFile } from 'node:fs/promises';

const input = await readFile('day-12/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim())

type Row = {
	springs: string;
	groups: number[];

}

const data: Row[] = [];

for (const l of lines) {
	const [springs, g] = l.split(' ');
	const groups = g.split(',').map(Number);

	data.push({ springs, groups });
}

const getAllPermutations = ({ springs, groups }: Row) => {
	const base = groups.reduce((a, v, i) => a += ('#'.repeat(v)) + (i === groups.length - 1 ? '' : '.'), '');
	const gapDiff = springs.length-base.length;

	const gaps = []
	for(let i = 0; i < base.length; i++) {
		if(base[i] === '.') gaps.push(i);
	}

	
	console.log(perms);
}

const testOverlap = (test: string, springs: string, offset: number) => {
	return [...test].every((c,i) => {
		switch(c) {
			case '#': return ['#','?'].includes(springs[i+offset]);
			case '.': return ['.','?'].includes(springs[i+offset]);
		}
	})
};

const testPermutations = ({ springs, groups }: Row) => {
	const base = groups.reduce((a, v, i) => a += ('#'.repeat(v)) + (i === groups.length - 1 ? '' : '.'), '');

	let matches = 0;
	for(let i = 0; i <= springs.length - base.length; i++) {
		matches += testOverlap(base, springs, i) ? 1 : 0;
	}

	while(base.length <= springs.length) {}

	return matches;
}

for (const row of data.slice(1,2)) {
	console.log(row, getAllPermutations(row));
}
