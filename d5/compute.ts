/**
 * https://adventofcode.com/2022/day/5
 */

import produce from "immer";
import { chunk, compact, concat, dropRight, first } from "lodash";

import { isEmpty, join, last, map, range, reduce } from "lodash";
import { reverse, split, take, takeRight, toInteger, trim } from "lodash";
import { data } from "./data";
import { testData } from "./testData";

const getLetterFromRow = (row: string[]) =>
  compact(row.filter((el) => trim(el) && el != "[" && el != "]"));

const getStacks = (s: string) => {
  const [stackData, _] = split(s, "\n\n");
  const stackLines = split(stackData, "\n").filter((l) => !isEmpty(l));
  const stackLinesData = map(take(stackLines, stackLines.length - 1), (line) =>
    chunk(line, 4).map((row) => getLetterFromRow(row))
  );
  const stacks = range(0, 9).map((_) => Array<string>());
  for (let stackI = 0; stackI < 10; stackI++) {
    for (let index = stackLinesData.length - 1; index >= 0; index--) {
      const el = first(stackLinesData[index][stackI]);
      if (el) stacks[stackI].push(el);
    }
  }
  return stacks;
};

const doMoves = (s: string, stacks: string[][], doReverse: boolean = true) => {
  const [_, moveData] = split(s, "\n\n");
  const moves = map(
    moveData.split("\n").filter((line) => !isEmpty(line)),
    (line) =>
      line
        .split(" ")
        .filter((el) => toInteger(el))
        .map((el, i) => toInteger(el) - (i === 0 ? 0 : 1))
  );

  return reduce(
    moves,
    (prev, move, i) => {
      const [count, from, to] = move;
      const newStacks = produce(prev, (draft) => {
        const els = takeRight(draft[from], count);
        draft[to] = concat(draft[to], doReverse ? reverse(els) : els);
        draft[from] = dropRight(draft[from], els.length);
      });
      return newStacks;
    },
    stacks
  );
};

const takeTops = (stacks: string[][]) => {
  return join(
    map(stacks, (stack) => last(stack)),
    ""
  );
};

console.log("test 1: " + takeTops(doMoves(testData, getStacks(testData))));
console.log(
  "test 2: " + takeTops(doMoves(testData, getStacks(testData), false))
);

console.log("input data 1:" + takeTops(doMoves(data, getStacks(data))));
console.log("input data 2:" + takeTops(doMoves(data, getStacks(data), false)));
