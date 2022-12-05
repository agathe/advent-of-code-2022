/**
 * https://adventofcode.com/2022/day/2
 */

import { fromPairs, map, split, sum } from "lodash";
import { data } from "./data";

const testData = `A Y
B X
C Z`;

const scores = fromPairs([
  ["rock rock", 3 + 1],
  ["rock paper", 6 + 2],
  ["rock scissors", 0 + 3],

  ["paper rock", 0 + 1],
  ["paper paper", 3 + 2],
  ["paper scissors", 6 + 3],

  ["scissors rock", 6 + 1],
  ["scissors paper", 0 + 2],
  ["scissors scissors", 3 + 3],
]);

const transform = (s: string) => {
  return s
    .replace(/[AX]/g, "rock")
    .replace(/[BY]/g, "paper")
    .replace(/[CZ]/g, "scissors");
};

const getTotalScore = (
  transformFn: (s: string) => string,
  s: string,
  scoring: any
) => {
  const results = map(split(transformFn(s), "\n"), (play) => scoring[play]);
  return sum(results);
};

console.log(
  "1- test data score: " + getTotalScore(transform, testData, scores)
);
console.log("1- input data score: " + getTotalScore(transform, data, scores));

const transform2 = (s: string) => {
  return s
    .replace(/[A]/g, "rock")
    .replace(/[B]/g, "paper")
    .replace(/[C]/g, "scissors")
    .replace(/[X]/g, "lose")
    .replace(/[Y]/g, "draw")
    .replace(/[Z]/g, "win");
};

const scores2 = fromPairs([
  ["rock lose", 0 + 3],
  ["rock draw", 3 + 1],
  ["rock win", 6 + 2],

  ["paper lose", 0 + 1],
  ["paper draw", 3 + 2],
  ["paper win", 6 + 3],

  ["scissors lose", 0 + 2],
  ["scissors draw", 3 + 3],
  ["scissors win", 6 + 1],
]);

console.log(
  "2- test data score: " + getTotalScore(transform2, testData, scores2)
);
console.log("2- input data score: " + getTotalScore(transform2, data, scores2));
