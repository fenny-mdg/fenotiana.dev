const chunkArrayGen = function* <T = unknown>(arr: T[], n: number) {
  for (let i = 0; i < arr.length; i += n) {
    yield arr.slice(i, i + n);
  }
};

export const chunkArray = <T = unknown>(arr: T[], n: number) => {
  return Array.from(chunkArrayGen(arr, n));
};
