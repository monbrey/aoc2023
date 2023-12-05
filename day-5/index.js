const start = performance.now();
import { readFile } from 'node:fs/promises';
const input = await readFile('day-5/input.txt', 'utf8');
const ranges = input
    .trim()
    .split('\n\n')
    .map(line => line.trim())
    .map(line => line.split(/:\s/)[1])
    .map(line => line.split('\n'));
const seeds = ranges.shift()[0].split(' ').map(Number);
const getRangeValue = (x, ranges, prevSkip = 1) => {
    for (const range of ranges) {
        const [dest, source, length] = range.split(' ').map(Number);
        if (x >= source && x < source + length) {
            return dest + (x - source);
        }
    }
    return x;
};
let lowest = Infinity;
let skippable = Infinity;
for (const seed of seeds) {
    let next = seed;
    for (const range of ranges) {
        next = getRangeValue(next, range);
    }
    lowest = Math.min(lowest, next);
}
// Part 1 - lowest location
console.log(lowest);
const end1 = performance.now();
console.log(`Part 2 execution time: ${end1 - start} ms`);
// Part 2 - parse seed ranges, maintaining a record of how many checks can be skipped
lowest = Infinity;
const getRangeAndSkipValue = (x, ranges, prevSkip) => {
    let sources = [];
    for (const range of ranges) {
        const [dest, source, length] = range.split(' ').map(Number);
        sources.push(source);
        if (x >= source && x < source + length) {
            // If found, the rest of this range is sequential
            // and could be skipped in future checks
            return [dest + (x - source), (source + length - 1) - x];
        }
    }
    // If no match is found, we could skip to the next range of sources
    const skip = sources.find(s => s > x) ?? prevSkip;
    return [x, skip];
};
for (let i = 0; i < seeds.length; i += 2) {
    const start = seeds[i];
    const end = seeds[i + 1];
    let skip;
    for (let offset = 0; offset < end; offset += (skippable == 0 ? 1 : skippable)) {
        skippable = end - offset;
        const seed = start + offset;
        let next = start + offset;
        for (const range of ranges) {
            [next, skip] = getRangeAndSkipValue(next, range, skippable);
            skippable = Math.min(skippable, skip);
        }
        lowest = Math.min(lowest, next);
    }
}
console.log(lowest);
const end2 = performance.now();
console.log(`Part 2 execution time: ${end2 - start} ms`);
