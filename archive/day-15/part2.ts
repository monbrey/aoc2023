import { readFile } from 'node:fs/promises';

const raw = await readFile('day-15/input.txt', 'utf8');
const input = raw.trim().split(',');

console.log(input);

const hash = (input: string) => {
	let value = 0;
	for (let i = 0; i < input.length; i++) {
		value += input.charCodeAt(i);
		value *= 17;
		value %= 256;
	}
	return value
}

const hashmap = new Map([...Array(256).fill(0).map(_ => new Map<string, number>()).entries()]);

for (const step of input) {
	const [label, focal] = step.split(/[=-]/);
	const box = hash(label);

	if (!focal) {
		hashmap.get(box)?.delete(label);
	} else {
		hashmap.get(box)?.set(label, Number(focal));
	}
}

console.log([...hashmap.values()].reduce(
	(total, lenses, box) => total += [...lenses.values()].reduce(
		(subtotal, focal, slot) => subtotal += (box + 1) * (slot + 1) * focal, 0), 0)
)