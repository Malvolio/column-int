import fs from "fs";
import { extractTokens } from "./lib/tokens";
import { getArrayUnion, getArrayIntersection } from "./lib/setops";
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
