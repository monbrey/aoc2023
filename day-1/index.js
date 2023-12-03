import { readFile } from 'node:fs/promises';
const input = await readFile('day-1/input.txt', 'utf8');
const lines = input.split('\n');
const translate = {
    'one': 1,
    'two': 2,
    'three': 3,
    'four': 4,
    'five': 5,
    'six': 6,
    'seven': 7,
    'eight': 8,
    'nine': 9
};
const numbers = [];
for (const l of lines) {
    const re1 = /^.*?([0-9]|one|two|three|four|five|six|seven|eight|nine)/g;
    const first = re1.exec(l)?.[1];
    if (!first) {
        console.log(`No match for line ${l}`);
        continue;
    }
    const re2 = /^.*([0-9]|one|two|three|four|five|six|seven|eight|nine)/;
    const last = re2.exec(l)?.[1];
    if (!last) {
        console.log(`No match for line ${l}`);
        continue;
    }
    numbers.push(parseInt(`${translate[first] ?? first}${translate[last] ?? last}`));
}
console.log(numbers.reduce((a, b) => a + b, 0));
