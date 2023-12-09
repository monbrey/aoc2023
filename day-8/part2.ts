import { readFile } from 'node:fs/promises';

const input = await readFile('day-8/input.txt', 'utf8');
const lines = input.trim().split('\n').map(l => l.trim())

const lr = lines.shift()!;
lines.shift();

const paths = new Map();
const nodes: string[] = [];

for (const l of lines) {
	const [a, bc] = l.split(' = ');
	const [b, c] = [...bc.matchAll(/([0-9A-Z]{3})/g)].map(m => m[0]);

	if (a.endsWith('A')) nodes.push(a);

	paths.set(a, [b, c]);
}

console.log(nodes);
const nodeSteps = Array(nodes.length).fill(0);

let i = 0, steps = 0;
while (!nodes.every(n => n.endsWith('Z'))) {
	for (const [index, n] of nodes.entries()) {
		if (n.endsWith('Z')) continue;
		if (i >= lr.length) i = 0;
		// console.log("Moving", lr[i], "from", n, "to", paths.get(n)[lr[i] == 'L' ? 0 : 1]);
		nodes[index] = paths.get(n)[lr[i] == 'L' ? 0 : 1];
		if (nodes[index].endsWith('Z') && nodeSteps[index] == 0) nodeSteps[index] = steps + 1;
	}
	i++;
	steps++;

}

const gcd = (a: number, b: number) => {
	while (b != 0) {
		const temp = b;
		b = a % b;
		a = temp;
	}
	return a;
}

const lcm = (a: number, b: number) => {
	return a * b / gcd(a, b);
}

const lcmRecurse = (args: number[]): number => {
	if(args.length == 2) return lcm(args[0], args[1]);
	const arg = args.shift()!;
	return lcm(arg, lcmRecurse(args));
}

console.log(nodeSteps);
console.log(lcmRecurse(nodeSteps));