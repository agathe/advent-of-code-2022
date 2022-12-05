import { sum } from "lodash";
/**
 * https://adventofcode.com/2022/day/4
 */

import {
  concat,
  difference,
  filter,
  intersection,
  isEmpty,
  range,
  split,
  toInteger,
} from "lodash";
import { data } from "./data";

const testData = `2-4,6-8
2-3,4-5
5-7,7-9
2-8,3-7
6-6,4-6
2-6,4-8`;

const fillArrays = (s: string) => {
  return split(s, "\n").map((line) => {
    return split(line, ",").map((sections) => {
      const headTail = split(sections, "-").map(toInteger);
      const expanded = concat([
        headTail[0],
        ...(headTail[1] > headTail[0]
          ? range(headTail[0] + 1, headTail[1])
          : []),
        headTail[1],
      ]);
      return expanded;
    });
  });
};

const fullOverlap = (pairs: number[][][]) => {
  return pairs.map((sets) => [
    sets,
    isEmpty(difference(sets[0], sets[1])) ||
      isEmpty(difference(sets[1], sets[0])),
  ]);
};

const simpleOverlap = (pairs: number[][][]) => {
  return pairs.map((sets) => [
    sets,
    !isEmpty(intersection(sets[0], sets[1])) ||
      !isEmpty(intersection(sets[1], sets[0])),
  ]);
};

console.log(
  "1) test data: " +
    filter(fullOverlap(fillArrays(testData)), (pair) => !!pair[1]).length
);
console.log(
  "1) input data: " +
    filter(fullOverlap(fillArrays(data)), (pair) => !!pair[1]).length
);
console.log(
  "2) test data: " +
    filter(simpleOverlap(fillArrays(testData)), (pair) => !!pair[1]).length
);
console.log(
  "2) input data: " +
    filter(simpleOverlap(fillArrays(data)), (pair) => !!pair[1]).length
);

// Trying something else - not working yet
console.log(
  sum(
    filter(
      split(data, "\n").map((line) => {
        const [a, b, c, d] = line.split(/[,-]/g);
        return (a <= c && c <= d && d <= b) || (c <= a && a <= b && b <= d);
      }),
      (a) => a
    )
  )
);
