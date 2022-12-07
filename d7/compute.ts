/**
 * https://adventofcode.com/2022/day/7
 */
import { dropRight, filter, find, orderBy, reverse } from "lodash";
import produce from "immer";
import { concat, map, reduce, split, sum, toInteger } from "lodash";
import { data } from "./data";
import { testData } from "./testData";

type SystemFile = {
  subDirs: string[];
  totalFileSize: number;
  dir?: string[];
  key?: string;
};

const groupByCommand = (lines: string[]) => {
  return reduce(
    lines,
    (prev, line) => {
      if (line.startsWith("$ ")) {
        const parts = split(line, " ");
        if (parts[1] === "cd") {
          const runningDirs =
            parts[2] === ".."
              ? dropRight(prev.runningDirs)
              : concat(prev.runningDirs, parts[2].replace("/", ""));
          return {
            ...prev,
            runningDirs,
          };
        } else {
          return {
            ...prev,
            system: concat(prev.system, {
              dir: [...prev.runningDirs],
              key: prev.runningDirs.join("/") || "/",
              totalFileSize: 0,
              subDirs: [],
            }),
          };
        }
      } else {
        const parts = split(line, " ");
        if (parts[0] === "dir")
          return produce(prev, (draft) => {
            draft.system[draft.system.length - 1].subDirs.push(
              [...prev.runningDirs, parts[1]].join("/")
            );
          });
        else
          return produce(prev, (draft) => {
            draft.system[draft.system.length - 1].totalFileSize += toInteger(
              parts[0]
            );
          });
      }
    },
    { runningDirs: [], system: [] } as {
      runningDirs: string[];
      system: Array<SystemFile>;
    }
  );
};

interface FinalSize {
  [key: string]: number;
}
const completeSize = (system: SystemFile[]) => {
  const ordered = reverse(
    orderBy(system, (dirInfo) => dirInfo.dir?.length ?? 0)
  ).map((info) => [info.key, info]);
  return reduce(
    ordered,
    (prev, pair) => {
      const [key, info] = pair;
      const dirSize =
        sum(
          (info as SystemFile).subDirs.map((dirName) => prev[dirName] ?? 0)
        ) ?? 0;
      return {
        ...prev,
        [key as string]: (info as SystemFile).totalFileSize + dirSize,
      };
    },
    {} as FinalSize
  );
};

const runSet1 = (s: string) => {
  const system = groupByCommand(split(s, "\n")).system;
  const sizes = completeSize(system);
  console.log(sizes);
  const totalSize = sum(filter(sizes, (val) => val < 100000));
  return totalSize;
};

const runSet2 = (s: string) => {
  const system = groupByCommand(split(s, "\n")).system;
  const sizes = completeSize(system);
  const freeNow = 70000000 - sizes["/"];
  const minSize = 30000000 - freeNow;
  const sorted = orderBy(
    map(sizes, (key, val) => key),
    (el) => el
  );
  return find(sorted, (el) => el > minSize);
};

console.log("1) test data ", runSet1(testData));
console.log("1) input data ", runSet1(data));

console.log("2) test data ", runSet2(testData));
console.log("2) input data ", runSet2(data));
