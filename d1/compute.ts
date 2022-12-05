/**
 * https://adventofcode.com/2022/day/1
 */

import {
  first,
  map,
  max,
  reverse,
  sortBy,
  split,
  sum,
  take,
  toInteger,
} from "lodash";
import { data } from "./data";

const sorted = sortBy(
  split(data, "\n\n").map((sublist, index) => [
    sum(split(sublist, "\n").map((s) => toInteger(s))),
    index,
  ]),
  (item) => item[0]
);
const res = first(reverse(sorted))?.[0];
console.log(res);

const res2 = sum(map(take(sorted, 3), (item) => item[0]));
console.log(res2);
