export const getArrayIntersection = (arrays: string[][]): string[] => {
  if (arrays.length === 0) {
    return [];
  }

  const [firstArray, ...remainingArrays] = arrays;
  return firstArray.filter((item) =>
    remainingArrays.every((array) => array.includes(item))
  );
};

export const getUniqueArray = (a: string[]) => Array.from(new Set(a));

export const getArrayUnion = (arrays: string[][]): string[] =>
  getUniqueArray(arrays.flat());
