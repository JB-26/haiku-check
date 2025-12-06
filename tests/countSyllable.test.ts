import countSyllables from "../app/countSyllables";

describe("countSyllables", () => {
  it("should count syllables correctly", () => {
    expect(countSyllables("An old silent pond")).toBe(5);
    expect(countSyllables("A frog jumps into the pond")).toBe(7);
    expect(countSyllables("Splash! Silence again.")).toBe(5);
  });
  it("should handle empty strings", () => {
    expect(countSyllables("")).toBe(0);
  });
  it("should handle strings with only one word", () => {
    expect(countSyllables("Hello")).toBe(2);
  });
});
