import fs from "fs";
import { extractTokens } from "./lib/tokens";
import { getArrayUnion, getArrayIntersection } from "./lib/setops";

type SearchOptions = {
  indexDir: string;
  containSearch?: boolean;
};

const search = ({ indexDir, containSearch }: SearchOptions) => {
  /**
   * A “derived” token is a token that is implied by another token
   * Say the user is searching for “app”; the token “application” is implied
   * If the `containSearch` flag is set, the token “slapped” would also
   * be implied, because it contains the string “app” inside.
   */
  const findAllDerivedTokens = (baseToken: string) => {
    const allTokens = fs.readdirSync(indexDir);
    return allTokens.filter((file) =>
      containSearch ? file.includes(baseToken) : file.startsWith(baseToken)
    );
  };

  // get all the files containing the given token exactly
  const loadMatchIndex = (token: string): string[] =>
    fs
      .readFileSync(`${indexDir}/${token}`, "utf8")
      .split("\n")
      .filter((match) => !!match);

  // get all the files containing the token or a derived token
  const findAllMatchesForToken = (baseToken: string): string[] => {
    const tokens = findAllDerivedTokens(baseToken);
    return getArrayUnion(tokens.map(loadMatchIndex));
  };

  // actually perform the search
  return (searchString: string) => {
    const tokens = extractTokens(searchString);
    const files = Array.from(tokens).map(findAllMatchesForToken);
    return getArrayIntersection(files);
  };
};

export default search;
