// stripNonTokens.test.ts
import { cleanToken, extractTokens } from "../lib/tokens";

describe("cleanToken", () => {
  it("removes punctuation", () => {
    const result = cleanToken("a!b");
    expect(result).toBe("ab");
  });
  it("knocks down to lowercase", () => {
    const result = cleanToken("A!b");
    expect(result).toBe("ab");
  });
});

describe("extractTokens", () => {
  it("finds tokens", () => {
    const result = extractTokens("abcd efgh");
    expect(result).toEqual(new Set(["abcd", "efgh"]));
  });
});
