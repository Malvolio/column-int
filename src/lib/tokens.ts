// a token is defined as any sequence of non-whitespace in the text, delimited by whitespace,
// with any non-alphanumerics removed and knocked down to lowercase, that is at least three characters long

import fs from "fs";

export const cleanToken = (s: string): string =>
  s.replace(/[^a-z0-9]/gi, "").toLowerCase();

export const isLegalToken = (s: string): boolean => s.length > 2;

export const extractTokens = (s: string): Set<string> =>
  new Set(s.split(/\s+/).map(cleanToken).filter(isLegalToken));

export const extractTokensFromFile = (fileName: string) => {
  const data = fs.readFileSync(fileName, "utf8");
  return extractTokens(data);
};
