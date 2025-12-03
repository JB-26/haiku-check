import pickRandomHaiku from "@/app/famousHaikus";
import getRandomIntInclusive from "@/app/getRandomIntInclusive";

// Mock the random number generator
jest.mock("@/app/getRandomIntInclusive");

describe("pickRandomHaiku", () => {
  const mockedGetRandomInt = getRandomIntInclusive as jest.MockedFunction<
    typeof getRandomIntInclusive
  >;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return the first haiku when random returns 0", () => {
    mockedGetRandomInt.mockReturnValue(0);

    const result = pickRandomHaiku();

    expect(result.lineOne).toBe("An old silent pond");
    expect(result.author).toBe("Matsuo Bashō");
    expect(mockedGetRandomInt).toHaveBeenCalledWith(0, 4);
  });

  it("should return the last haiku when random returns 4", () => {
    mockedGetRandomInt.mockReturnValue(4);

    const result = pickRandomHaiku();

    expect(result.lineOne).toBe("I was in that fire,");
    expect(result.author).toBe("Andrew Mancinelli");
  });

  it("should return a haiku from the middle of the array", () => {
    mockedGetRandomInt.mockReturnValue(2);

    const result = pickRandomHaiku();

    expect(result.author).toBe("Ravi Shankar");
  });

  it("should always return a valid Haiku object", () => {
    mockedGetRandomInt.mockReturnValue(1);

    const result = pickRandomHaiku();

    expect(result).toHaveProperty("lineOne");
    expect(result).toHaveProperty("lineTwo");
    expect(result).toHaveProperty("lineThree");
    expect(result).toHaveProperty("author");
    expect(typeof result.lineOne).toBe("string");
    expect(typeof result.author).toBe("string");
  });
});
