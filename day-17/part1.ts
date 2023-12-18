// const start = performance.now();

// import { readFileSync } from 'node:fs';

// type Edge = {
// 	node: string;
// 	cost: number;
// }

// const parse = () => {
// 	const input = readFileSync(`day-17/sample.txt`, 'utf8');
// 	return input.trim().split('\r\n').map(_ => _.split('').map(Number))
// }

// const nodeToKey = ([y, x]: [number, number]) => `${y},${x}`;
// const keyToNode = (key: string) => key.split(',').map(Number);

// const getNext = (distances: Map<string, number>, visited: Set<string>) => {
// 	let minD = Infinity, minV = null;
// 	for (let v of distances.keys()) {
// 		let distance = distances.get(v);
// 		if (distance !== undefined && distance < minD && !visited.has(v)) {
// 			minD = distance;
// 			minV = v;
// 		}
// 	}
// 	return minV;
// }

// const dijkstra = (nodes: number[][]) => {
// 	const distances = new Map<string, number>();
// 	const parents = new Map<string, string>();
// 	const visited = new Set<string>();

// 	for (const key of [...graph.keys()]) distances.set(key, Infinity);
// 	distances.set(`0,0`, 0);

// 	let curr, prev;
// 	while (curr = getNext(distances, visited)) {
// 		// Determine direction and steps
// 		let distance = distances.get(curr)!;
// 		let neighbours = graph.get(curr)!;

// 		for (const edge of neighbours) {
// 			const newD = distance + edge.cost;
// 			if ((distances.get(edge.node) ?? Infinity) > newD) {
// 				distances.set(edge.node, newD);
// 				parents.set(edge.node, curr);
// 			}
// 		}
// 		visited.add(curr);
// 		prev = curr;
// 	}

// 	console.log(distances);
	
// 	const path = Array(13).fill(0).map(_=>Array(13).fill('.'));
// 	let next;
// 	path[12][12] = '#';

// 	while(next = parents.get(next ?? '12,12')) {
// 		const [y,x] = keyNode(next);
// 		path[y][x] = '#';
// 	}

// 	console.log(path.map(p => p.join('')).join('\n'))
// }

// const nodes = parse();

// dijkstra(nodes);

// const end = performance.now();
// console.log(`Execution time: ${end - start} ms`);