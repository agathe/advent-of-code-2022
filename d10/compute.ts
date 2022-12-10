/**
 * https://adventofcode.com/2022/day/10
 */

import {
  concat,
  flatten,
  includes,
  map,
  range,
  reduce,
  split,
  sum,
  toInteger,
} from "lodash";
import { data } from "./data";
import { testData } from "./testData";

const convertToInstructions = (s: string) => {
  const insts = split(s, "\n").map((line) => {
    const info = line.split(" ");
    if (info[0] === "noop") return [[1, 0]];
    return [
      [1, 0],
      [1, toInteger(info[1])],
    ];
  });
  return flatten(insts);
};

const run = (instructions: number[][]) => {
  return reduce(
    instructions,
    (prev, inst) => {
      const state = prev.state;
      const newState = [state[0] + inst[0], state[1] + inst[1]];
      const addState =
        newState[0] === 20 ||
        (newState[0] >= 60 && (newState[0] - 20) % 40 === 0);

      return {
        state: newState,
        cycles: addState
          ? concat(prev.cycles, [
              [newState[0], state[1], newState[0] * state[1]],
            ])
          : prev.cycles,
      };
    },
    { state: [0, 1], cycles: [] as number[][] }
  );
};

const run2 = (instructions: number[][], cycles: number[][]) => {
  let X = 1;
  return map(cycles, (cycleRow) => {
    return reduce(
      cycleRow,
      (line, cycle) => {
        const pixelI = cycle % 40;
        const hasPixel = includes(range(X - 1, X + 2), pixelI);
        const inst = instructions[cycle];
        const newX = X + inst[1];
        // console.log(cycle, inst, "x:", X, "pixel i:", pixelI, newX, hasPixel);
        X = newX;
        return line + (hasPixel ? "#" : ".");
      },
      ""
    );
  });
};
const runPart1 = (s: string) => {
  const res = run(convertToInstructions(s));
  return sum(res.cycles.map((info) => info[2]));
};

const runPart2 = (s: string) => {
  const cycles = range(0, 6).map((i) => range(0, 40).map((j) => j + i * 40));
  const inst = convertToInstructions(s);
  return run2(inst, cycles);
};
console.log("1) test data: ", runPart1(testData));
console.log("1) input data: ", runPart1(data));

console.log("2) test data: ", runPart2(testData));
console.log("2) input data: ", runPart2(data));

/** RKPJBPLA
 [
  '###..#..#.###....##.###..###..#.....##..',
  '#..#.#.#..#..#....#.#..#.#..#.#....#..#.',
  '#..#.##...#..#....#.###..#..#.#....#..#.',
  '###..#.#..###.....#.#..#.###..#....####.',
  '#.#..#.#..#....#..#.#..#.#....#....#..#.',
  '#..#.#..#.#.....##..###..#....####.#..#.'
]
 */
