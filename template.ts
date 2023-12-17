const start = performance.now();

import { readFileSync } from 'node:fs';

const parse = () => {
	const input = readFileSync(`input`, 'utf8');
	return input.trim()
}

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);