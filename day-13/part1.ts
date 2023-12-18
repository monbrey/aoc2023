import { readFile } from 'node:fs/promises';

const input = await readFile('day-13/input.txt', 'utf8');
const patterns = input.trim().split('\r\n\r\n').map(p => p.split('\r\n'))

const findReflectionPoints = (pattern: string[], start = 0): [number, number][] => {
	const points: [number, number][] = []
	for (let i = 0; i < pattern.length; i++) {
		if (pattern[i] === pattern[i + 1]) {
			// console.log(`${pattern[i]}\n${pattern[i + 1]}`)
			points.push([i, i + 1]);
		}
	}

	return points;
}

const testReflection = ([i, j]: [number, number], pattern: string[]) => {
	if (i === -1 && j === -1) return false;

	while (i >= 0 && j < pattern.length) {
		if (pattern[i] !== pattern[j]) {
			return false;
		}
		i--; j++;
	}

	return true;
}

const rotated = (pattern: string[]) => pattern.map(p => p.split(''))[0].map((_, colIndex) => pattern.map(row => row[colIndex])).map(p => p.join(''));

let sum = 0;
for (const p of patterns) {
	// Get and test horizontal reflection points
	const hrps = findReflectionPoints(p);
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
	for (const vr of vrps) {
		const reflects = testReflection(vr, pr);
		if (reflects) {
			sum += vr[0] + 1;
			break;
		}
	}
}

console.log(sum);