const start = performance.now();

import { readFileSync } from 'node:fs';

const log = process.argv.find(arg => arg === '--debug') ? console.log : () => null

const parse = (): [string, number][] => {
	const filename = process.argv.find(arg => arg === '--sample') ? 'sample.txt' : 'input.txt';
	const input = readFileSync(`day-18/${filename}`, 'utf8');
	const lines = input.trim().split('\r\n').map(_ => _.split(' '));

	return lines.map(([a, b, hex]) => {
		const dir = hex[hex.length - 2];
		const m = parseInt(hex.slice(2, hex.length - 2), 16);

		return [['R', 'D', 'L', 'U'][Number(dir)], m]
	});
}

const calcVertices = (data: [string, number][]) => {
	let y = 0, x = 0;
	const vertices: [number, number][] = [[0, 0]];

	for (const [dir, steps] of data) {
		switch (dir) {
			case 'R': vertices.push([y, x += steps]); break;
			case 'L': vertices.push([y, x -= steps]); break;
			case 'D': vertices.push([y += steps, x]); break;
			case 'U': vertices.push([y -= steps, x]); break;
		}
	}

	return vertices;
}

const calcArea = (v: [number, number][]) => {
	let area = 0;

	let prev = v.length - 1;
	for (let i = 0; i < v.length; i++) {
		area += (v[prev][1] + v[i][1]) * (v[prev][0] - v[i][0]);
		prev = i;
	}

	return Math.abs(area / 2);
}

// The area function isnt edge inclusive. Adding the right and down edge lengths fixes this by expanding it
const calcExtraPerimeter = (data: [string, number][]) => {
	let per = 1; //count the start point
	for (const [d, edge] of data) {

		if (['R', 'D'].includes(d))
			per += edge;
	}

	return per;
}

const data = parse();
const vertices = calcVertices(data);
const area = calcArea(vertices);
const perimeter = calcExtraPerimeter(data);

console.log(area);
console.log(perimeter);
console.log(area + perimeter);

const end = performance.now();
console.log(`Execution time: ${end - start} ms`);