import { readFile } from 'node:fs/promises';

const input = await readFile('day-7/input.txt', 'utf8');
const games: [string, number][] = input.trim().split('\n').map(l => l.split(' ')).map(g => ([g[0], Number(g[1].trim())]));

const HandTypeValue = {
	High: 1,
	Pair: 2,
	TwoPair: 3,
	ThreeKind: 4,
	FullHouse: 5,
	FourKind: 6,
	FiveKind: 7
}

const HighCardValue: { [key: string]: number } = {
	T: 10,
	J: 1,
	Q: 11,
	K: 12,
	A: 13
}

const getHandCounts = (hand: string) => {
	const counts = hand.split('').reduce((acc, val) => {
		acc.set(val, (acc.get(val) ?? 0) + 1);
		return acc;
	}, new Map());

	const preSorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
	let top = preSorted[0];

	// Five cant be improved
	if (top[1] == 5) return preSorted;
	if (top[0] == 'J') top = preSorted[1];

	const jokers = counts.get('J') ?? 0;
	counts.set(top[0], counts.get(top[0]) + jokers);
	counts.delete('J');

	return [...counts.entries()].sort((a, b) => b[1] - a[1]);
}

const getHandType = (hand: [string, number][]) => {
	switch (hand[0][1]) {
		case 5: return HandTypeValue.FiveKind;
		case 4: return HandTypeValue.FourKind;
		case 3: return hand[1][1] == 2 ? HandTypeValue.FullHouse : HandTypeValue.ThreeKind;
		case 2: return hand[1][1] == 2 ? HandTypeValue.TwoPair : HandTypeValue.Pair;
		default: return HandTypeValue.High;
	}
}

const compareHands = (a: string, b: string) => {
	for (let i = 0; i < 5; i++) {
		const diff = (HighCardValue[a[i]] ?? Number(a[i])) - (HighCardValue[b[i]] ?? Number(b[i]));
		if (diff !== 0) return diff;
	}

	return 0;
}

const typedGames: [string, number, number][] = games.map(g => {
	const counts = getHandCounts(g[0]);
	return [g[0], g[1], getHandType(counts)];
});

const rankedGames = typedGames.sort((a, b) => {
	return b[2] > a[2] ? -1 : (b[2] < a[2] ? 1 : compareHands(a[0], b[0]));
});

const score = rankedGames.reduce((acc, val, index) => {
	return acc += (val[1] * (index + 1));
}, 0);

console.log(score);