import fs from "fs";
import { extractTokens } from "./lib/tokens";
import { getArrayUnion, getArrayIntersection } from "./lib/setops";

type SearchOptions = {
  indexDir: string;
  containSearch?: boolean;
};

const search = ({ indexDir, containSearch }: SearchOptions) => {
  const findAllDerivedTokens = (baseToken: string) => {
    const allTokens = fs.readdirSync(indexDir);
    return allTokens.filter((file) =>
      containSearch ? file.includes(baseToken) : file.startsWith(baseToken)
    );
  };

  const loadMatchIndex = (token: string): string[] =>
    fs
      .readFileSync(`${indexDir}/${token}`, "utf8")
      .split("\n")
      .filter((match) => !!match);

  const findAllMatchesForToken = (baseToken: string): string[] => {
    const tokens = findAllDerivedTokens(baseToken);
    return getArrayUnion(tokens.map(loadMatchIndex));
  };

  return (searchString: string) => {
    const tokens = extractTokens(searchString);
    const files = Array.from(tokens).map(findAllMatchesForToken);
    return getArrayIntersection(files);
  };
};

export default search;
