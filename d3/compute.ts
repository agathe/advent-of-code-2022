/**
 * https://adventofcode.com/2022/day/3
 */

import { chunk, flatten, intersection, map, split, sum } from "lodash";
import { data } from "./data";

const testData = `vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw`;

const findItems = (s: string) => {
  return flatten(
    split(s, "\n").map((line) => {
      const compartments = chunk(line, line.length / 2);
      return intersection(...compartments);
    })
  );
};

const score = (items: string[]) => {
  return items.map((item) => {
    return item.charCodeAt(0) - (!!item.match(/[a-z]/) ? 97 - 1 : 65 - 27);
  });
};

console.log("1) test data: " + sum(score(findItems(testData))));
console.log("1) input data: " + sum(score(findItems(data))));

const badges = (s: string) => {
  return flatten(
    map(chunk(split(s, "\n"), 3), (group) =>
      intersection(...map(group, (line) => split(line, "")))
    )
  );
};

console.log("2) test data: " + sum(score(badges(testData))));
console.log("2) input data: " + sum(score(badges(data))));
