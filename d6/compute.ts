/**
 * https://adventofcode.com/2022/day/6
 */

import { slice, uniq } from "lodash";
import { data } from "./data";
import { testData } from "./testData";

const findMarker = (s: string, size: number = 4) => {
  for (let index = 0; index < s.length; index++) {
    if (uniq(slice(s, index, index + size)).length === size) {
      return index + size;
    }
  }
};

console.log(testData);
console.log(testData.map((row) => findMarker(row[0] as unknown as string, 4)));
console.log("input result " + findMarker(data, 4));
console.log(testData.map((row) => findMarker(row[0] as unknown as string, 14)));
console.log("input result " + findMarker(data, 14));
