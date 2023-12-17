const start = performance.now();

import { readFile } from 'node:fs/promises';

const debug = process.argv[2] === '--debug';

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

const mapGroups = (groups: number[], springs: string, start: number = 0, matches: number = 0): number => {
	if (groups.length === 0) {
		// If there are no groups left to match, this is valid if there are no '#' left
		return springs.slice(start).includes('#') ? matches : matches + 1;
	}

	// The min length is the springs + a gap in between. The template must be this long to be testable
	const minLength = groups.reduce((acc, g) => acc += g, 0) + groups.length - 1;
	if (springs.slice(start).length < minLength) return matches;

	// Get the test segment
	const segment = springs.slice(start, start + groups[0]);
	const previous = (springs[start - 1] ?? '.') === '#';
	const next = (springs[start + groups[0]] ?? '.') === '#';

	if (debug) console.log(springs.slice(start), groups, start, segment, previous, next, segment.split('').every(c => ['#', '?'].includes(c)));

	// If the previous tile is a skipped '#', this mapping can never proceed to be correct in any combination
	if (previous) return matches;

	if (
		// Succeeded by a valid character
		!next &&
		// And that the contents are '#' or '?'
		segment.split('').every(c => c === '#' || c === '?')) {
		if (debug) console.log('Valid');
		// This segment is valid
		// Calculate the remaining groups if we lock this one in
		const a = mapGroups(groups.slice(1), springs, start + groups[0] + 1, matches);
		// and see if we could continue to match all these remaining groups further in the string
		const b = mapGroups(groups, springs, start + 1, matches);

		// And return the total
		return a + b;
	}

	// Otherwise, just continue to match the remaining groups
	return mapGroups(groups, springs, start + 1, matches);
}

console.log(data.reduce((acc, row) => acc += mapGroups(row.groups, row.springs), 0));

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);