import { readFile } from 'node:fs/promises';
const input = await readFile('day-4/input.txt', 'utf8');
const lines = input.trim().split('\n');
const scores = [];
for (const game of lines) {
    const [a, b] = game.trim().split(": ")[1].split(" | ");
    const wins = a.trim().split(/ +/);
    const play = b.trim().split(/ +/);
    scores.push(wins.filter(w => play.includes(w)).length);
}
// Part 1
console.log(scores.reduce((a, v) => a += v > 0 ? 2 ** (v - 1) : 0, 0));
const copies = new Map();
for (let x = 0; x < scores.length; x++) {
    copies.set(x, 1);
}
for (const [i, score] of scores.entries()) {
    for (let c = 1; c <= score; c++) {
        copies.set(i + c, copies.get(i + c) + copies.get(i));
    }
}
// Part 2
console.log([...copies.values()].reduce((a, v) => a += v, 0));
