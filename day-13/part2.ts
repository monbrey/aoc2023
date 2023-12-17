import { readFile } from 'node:fs/promises';
import { default as _ } from 'lodash';

const input = await readFile('day-13/input.txt', 'utf8');
const patterns = input.trim().split('\r\n\r\n').map(p => p.split('\r\n'))

const findReflectionPoints = (pattern: string[]): [number, number][] => {
	const points: [number, number][] = []
	for (let i = 0; i < pattern.length; i++) {
		if(pattern[i] === pattern[i + 1] || countMismatch(pattern[i], pattern[i + 1]) <= 1) {
			points.push([i, i + 1]);
		}
	}

	return points;
}

const countMismatch = (a: string, b: string) => a.split('').filter((c,i) => c !== b?.[i]).length;

const testReflection = ([i, j]: [number, number], pattern: string[]) => {
	if (i === -1 && j === -1) return false;
	
	// Instead of looking for a mismatch, count the number of characters that don't match as we go
	let mismatch = 0;
	while (i >= 0 && j < pattern.length) {
		mismatch += countMismatch(pattern[i], pattern[j])

		// If we've accumumlated more than one mismatch, this is a smudge-fixable reflection
		if (mismatch > 1) {
			return false;
		}
		i--; j++;
	}

	// If there's only 1 mismatch at the end, we found a smudged row
	// A 0 means we didn't fix a smudge, and we can rule that out
	return mismatch === 1;
}

const rotated = (pattern: string[]) => pattern.map(p => p.split(''))[0].map((_, colIndex) => pattern.map(row => row[colIndex])).map(p => p.join(''));

let sum = 0;
for (const p of patterns) {
	// Get and test horizontal reflection points
	const hrps = findReflectionPoints(p);
	console.log(hrps);
	for (const hr of hrps) {
		const reflects = testReflection(hr, p);
		if (reflects) {
			sum += 100 * (hr[0] + 1);
			break;
		}
	}

	// Rotate the pattern
	const pr = rotated(p);

	// Get and test vertical reflection points
	const vrps = findReflectionPoints(pr);
	console.log(vrps);
	for (const vr of vrps) {
		const reflects = testReflection(vr, pr);
		if (reflects) {
			sum += vr[0] + 1;
			break;
		}
	}
}

console.log(sum);