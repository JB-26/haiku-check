import getRandomIntInclusive from "../app/getRandomIntInclusive";

describe("getRandomIntInclusive", () => {
  it("should return a random integer between min and max", () => {
    const min = 1;
    const max = 10;
    const result = getRandomIntInclusive(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });
});
