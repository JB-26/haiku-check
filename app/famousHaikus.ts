import getRandomIntInclusive from "./getRandomIntInclusive";

interface Haiku {
  lineOne: string;
  lineTwo: string;
  lineThree: string;
  author: string;
}

const oldPond: Haiku = {
  lineOne: "An old silent pond",
  lineTwo: "A frog jumps into the pond—",
  lineThree: "Splash! Silence again.",
  author: "Matsuo Bashō",
};

const spring: Haiku = {
  lineOne: "Toward those short trees",
  lineTwo: "We saw a hawk descending",
  lineThree: "On a day in spring.",
  author: "Masaoka Shiki",
};

const clay: Haiku = {
  lineOne: "life’s little, our heads",
  lineTwo: "sad. Redeemed and wasting clay",
  lineThree: "this chance. Be of use.",
  author: "Ravi Shankar",
};

const january: Haiku = {
  lineOne: "Delightful display",
  lineTwo: "Snowdrops bow their pure white heads",
  lineThree: "To the sun's glory.",
  author: "Paul Holmes",
};

const fire: Haiku = {
  lineOne: "I was in that fire,",
  lineTwo: "The room was dark and somber.",
  lineThree: "I sleep peacefully",
  author: "Andrew Mancinelli",
};

const famousHaikus: Haiku[] = [oldPond, spring, clay, january, fire];

export default function pickRandomHaiku(): Haiku {
  const randomNumber = getRandomIntInclusive(0, famousHaikus.length - 1);
  return famousHaikus[randomNumber];
}
