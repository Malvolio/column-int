import fs from "fs";
import { extractTokens } from "./lib/tokens";
const getArrayIntersection = (arrays: string[][]): string[] => {
  if (arrays.length === 0) {
    return [];
  }

  const [firstArray, ...remainingArrays] = arrays;
  return firstArray.filter((item) =>
    remainingArrays.every((array) => array.includes(item))
  );
};

const unique = (a: string[]) => Array.from(new Set(a));

const getArrayUnion = (arrays: string[][]): string[] => unique(arrays.flat());

const search = (indexDir: string) => {
  const findAllDerivedTokens = (baseToken: string) => {
    const files = fs.readdirSync(indexDir);
    return files.filter((file) => file.startsWith(baseToken));
  };

  const loadMatchIndex = (token: string): string[] =>
    fs.readFileSync(`${indexDir}/${token}`, "utf8").split("\n");

  const findAllMatches = (baseToken: string): string[] => {
    const tokens = findAllDerivedTokens(baseToken);
    return getArrayUnion(tokens.map(loadMatchIndex));
  };

  return (searchString: string) => {
    const tokens = extractTokens(searchString);
    const files = Array.from(tokens).map(findAllMatches);
    return getArrayIntersection(files);
  };
};

export default search;
