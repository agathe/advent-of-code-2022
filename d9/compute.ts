/**
 * https://adventofcode.com/2022/day/9
 */

import produce from "immer";
import {
  chunk,
  concat,
  find,
  flatten,
  includes,
  intersection,
  last,
  map,
  range,
  reduce,
  slice,
  split,
  sum,
  toInteger,
  uniq,
} from "lodash";
import { data } from "./data";
import { testData, testData2 } from "./testData";

const convertToIndices = (s: string): number[][] => {
  const moves = split(s, "\n").map((line) => {
    const [move, count] = line.split(" ");
    const actions: number[][] = range(0, toInteger(count)).map((_i) => {
      switch (move) {
        case "U":
          return [0, 1];
        case "D":
          return [0, -1];
        case "R":
          return [1, 0];
        case "L":
          return [-1, 0];
      }
    }) as number[][];
    return actions;
  });
  return flatten(moves);
};

const getTailMove = (h: number[], t: number[]) => {
  const d = [h[0] - t[0], h[1] - t[1]];
  const diagonal = d[0] !== 0 && d[1] !== 0;
  const force0 = diagonal && Math.abs(d[1]) >= 2 && Math.abs(d[0]) < 2;
  const force1 = diagonal && Math.abs(d[0]) >= 2 && Math.abs(d[1]) < 2;
  const sign0 = Math.min(1, Math.max(-1, d[0]));
  const sign1 = Math.min(1, Math.max(-1, d[1]));
  const move = [d[0] - (force0 ? 0 : sign0), d[1] - (force1 ? 0 : sign1)];
  return move;
};

const executeMoves = (moves: number[][]) => {
  return reduce(
    moves,
    (prev, move) => {
      const h = prev.head;
      const t = prev.tail;
      const newH = [h[0] + move[0], h[1] + move[1]];
      const tMove = getTailMove(newH, t);
      const newT: number[] = [t[0] + tMove[0], t[1] + tMove[1]];

      return {
        head: newH,
        tail: newT,
        positions:
          find(
            prev.positions,
            (pos) => pos[0] === newT[0] && pos[1] === newT[1]
          ) !== undefined
            ? prev.positions
            : concat(prev.positions, [newT]),
      };
    },
    {
      head: [0, 0],
      tail: [0, 0],
      positions: [[0, 0]] as number[][],
    }
  );
};

const runPart1 = (s: string) => {
  const res = executeMoves(convertToIndices(s));
  //   console.log(res);
  return res.positions.length;
};

console.log(`1) test data: `, runPart1(testData));
console.log(`1) input data: `, runPart1(data));

const executeMoves2 = (moves: number[][], size: number) => {
  return reduce(
    moves,
    (prev, move) => {
      const newKnots = produce(prev.knots, (draft) => {
        for (let i = 0; i < size; i++) {
          if (i === 0) {
            const h = draft[0];
            const newH = [h[0] + move[0], h[1] + move[1]];
            draft[i] = newH;
          } else {
            const tMove = getTailMove(draft[i - 1], draft[i]);
            const newT: number[] = [
              draft[i][0] + tMove[0],
              draft[i][1] + tMove[1],
            ];
            draft[i] = newT;
          }
        }
      });
      const newT = last(newKnots)!;
      return {
        knots: newKnots,
        positions:
          find(
            prev.positions,
            (pos) => pos[0] === newT[0] && pos[1] === newT[1]
          ) !== undefined
            ? prev.positions
            : concat(prev.positions, [newT]),
      };
    },
    {
      knots: range(0, size).map((_) => [0, 0]),
      positions: [[0, 0]] as number[][],
    }
  );
};

const runPart2 = (s: string) => {
  const res = executeMoves2(convertToIndices(s), 10);
  // console.log(res);
  return res.positions.length;
};

console.log(`2) test data 2: `, runPart2(testData2));
console.log(`2) input Data: `, runPart2(data));
