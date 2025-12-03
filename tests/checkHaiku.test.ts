import checkHaiku from "../app/checkHaiku";

describe("checkHaiku", () => {
  it("should return true for a valid haiku", () => {
    expect(checkHaiku([5, 7, 5])).toBe(true);
  });
  it("should return false for an invalid haiku", () => {
    expect(checkHaiku([1, 1, 1])).toBe(false);
  });
});
