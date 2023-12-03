import { readFile } from 'node:fs/promises';

const input = await readFile('day-X/input.txt', 'utf8');
const lines = input.split('\n')