// setops.test.ts
import {
  getArrayUnion,
  getArrayIntersection,
  getUniqueArray,
} from "../lib/setops";

describe("getArrayUnion", () => {
  it("handles empty list", () => {
    const result = getArrayUnion([]);
    expect(result).toStrictEqual([]);
  });
  it("handles list of 1", () => {
    const result = getArrayUnion([["A"]]);
    expect(result).toStrictEqual(["A"]);
  });
  it("handles disjoint lists", () => {
    const result = getArrayUnion([["A"], ["B"]]);
    expect(result).toStrictEqual(["A", "B"]);
  });
  it("handles ordinary lists", () => {
    const result = getArrayUnion([
      ["A", "B"],
      ["A", "C"],
    ]);
    expect(result).toStrictEqual(["A", "B", "C"]);
  });
});

describe("getArrayIntersection", () => {
  it("handles empty list", () => {
    const result = getArrayIntersection([]);
    expect(result).toStrictEqual([]);
  });
  it("handles list of 1", () => {
    const result = getArrayIntersection([["A"]]);
    expect(result).toStrictEqual(["A"]);
  });
  it("handles disjoint lists", () => {
    const result = getArrayIntersection([["A"], ["B"]]);
    expect(result).toStrictEqual([]);
  });
  it("handles ordinary lists", () => {
    const result = getArrayIntersection([
      ["A", "B"],
      ["A", "C"],
    ]);
    expect(result).toStrictEqual(["A"]);
  });
});

describe("getUniqueArray", () => {
  it("handles empty list", () => {
    const result = getUniqueArray([]);
    expect(result).toStrictEqual([]);
  });
  it("handles list of 1", () => {
    const result = getUniqueArray(["A"]);
    expect(result).toStrictEqual(["A"]);
  });
  it("handles ordinary lists", () => {
    const result = getUniqueArray(["A", "B", "B"]);
    expect(result).toStrictEqual(["A", "B"]);
  });
});
