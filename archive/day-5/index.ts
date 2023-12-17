const start = performance.now();

import { readFile } from 'node:fs/promises';

const input = await readFile('day-5/input.txt', 'utf8');
const ranges = input
	.trim()
	.split('\n\n')
	.map(line => line.trim())
	.map(line => line.split(/:\s/)[1])
	.map(line => line.split('\n'));

const seeds = ranges.shift()![0].split(' ').map(Number)

// Pretty simple - finds a value in a range, otherwise it returns the original value
const getRangeValue = (x: number, ranges: string[]) => {
	for (const range of ranges) {
		const [dest, source, length] = range.split(' ').map(Number);

		if (x >= source && x < source + length) {
			return dest + (x - source);
		}
	}
	return x;
}

let lowest = Infinity;
for (const seed of seeds) {
	let next = seed;
	for (const range of ranges) {
		next = getRangeValue(next, range);
	}
	lowest = Math.min(lowest, next);
}

// Part 1 - lowest location
console.log(lowest);
const end1 = performance.now();
console.log(`Part 2 execution time: ${end1 - start} ms`);


// Part 2 - parse seed ranges, maintaining a record of how many checks can be skipped
lowest = Infinity;

// Similar to the above, this additionally keeps a record of how many values were left in the range
const getRangeAndSkipValue = (x: number, ranges: string[]) => {
	// Keep a record of all source-range start points
	let sources = [];
	for (const range of ranges) {
		const [dest, source, length] = range.split(' ').map(Number);
		sources.push(source);
		if (x >= source && x < source + length) {
			// If found, we know the rest of this range is sequential
			// Return the remaining length to check if it can be skipped
			return [dest + (x - source), (source + length - 1) - x];
		}
	}
	// If no match is found, the "remaining" is until the next source range start point
	// If no range is found, we extend into Infinity
	const skip = sources.sort().find(s => s > x) ?? Infinity;
	return [x, skip];
}

let skippable = Infinity;
for (let i = 0; i < seeds.length; i += 2) {
	const start = seeds[i];
	const end = seeds[i + 1];

	// For each seed, iterate through its range, skipping values we know are bad
	for (let offset = 0; offset < end; offset += (skippable == 0 ? 1 : skippable)) {
		// Default the skippable to be reaching the end
		skippable = end - offset - 1;
		let next = start + offset, skip
		for (const range of ranges) {
			[next, skip] = getRangeAndSkipValue(next, range);
			// Numbers must be sequential across all maps, so keep the lowest skippable number
			skippable = Math.min(skippable, skip);
		}
		// Update the lowest location
		lowest = Math.min(lowest, next);
	}
}

console.log(lowest);
const end2 = performance.now();
console.log(`Part 2 execution time: ${end2 - start} ms`);