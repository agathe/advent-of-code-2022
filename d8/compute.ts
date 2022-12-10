/**
 * https://adventofcode.com/2022/day/8
 */

import { findIndex, isEmpty, reverse, take, toInteger } from "lodash";
import { flatten, range } from "lodash";
import { data } from "./data";
import { testData } from "./testData";

const filterTreeSize = (tree: number, otherTrees: number[]) =>
  otherTrees.filter((t) => t >= tree);

const smallerCount = (tree: number, otherTrees: number[]) => {
  const indexTaller = findIndex(otherTrees, (t) => t >= tree);
  if (indexTaller < 0) return otherTrees;
  return [...take(otherTrees, 1 + indexTaller)];
};

const getInnerVisible = (
  s: string,
  fn: (tree: number, otherTrees: number[]) => number[],
  part: number
) => {
  const rows = s.split("\n");
  const cols = rows[0].length;
  let total = 0;
  let count = 0;
  for (let row = 1; row < rows.length - 1; row++) {
    for (let column = 1; column < cols - 1; column++) {
      const tree = toInteger(rows[row].charAt(column));
      const edges = [
        fn(
          tree,
          reverse(rows[row].substring(0, column).split("").map(toInteger))
        ),
        fn(
          tree,
          rows[row]
            .substring(column + 1, cols)
            .split("")
            .map(toInteger)
        ),
        fn(
          tree,
          reverse(
            range(0, row)
              .map((i) => rows[i].charAt(column))
              .map(toInteger)
          )
        ),
        fn(
          tree,
          range(row + 1, rows.length)
            .map((i) => rows[i].charAt(column))
            .map(toInteger)
        ),
      ];
      if (part === 1) {
        const visible = findIndex(edges, (edge) => isEmpty(edge)) >= 0;
        if (visible) {
          total += 1;
        }
      } else {
        const score = flatten(edges.map((edge) => edge.length)).reduce(
          (prev, current) => prev * current,
          1
        );
        if (score > total) {
          console.log(tree, edges, score);
          total = score;
        }
      }
    }
  }
  return part === 1 ? total + rows.length * 2 + cols * 2 - 4 : total;
};

console.log("1) test input: ", getInnerVisible(testData, filterTreeSize, 1));
console.log("1) data input: ", getInnerVisible(data, filterTreeSize, 1)); //1669
console.log("2) test input: ", getInnerVisible(testData, smallerCount, 2));
console.log("2) data input: ", getInnerVisible(data, smallerCount, 2)); // 331344
