import { readFile } from 'node:fs/promises';

const raw = await readFile('day-15/input.txt', 'utf8');
const input = raw.trim().split(',');

const hash = (input: string) => {
	let value = 0;
	for (let i = 0; i < input.length; i++) {
		value += input.charCodeAt(i);
		value *= 17;
		value %= 256;
	}
	return value
}

console.log(input.reduce((a,v) => a+=hash(v), 0))

