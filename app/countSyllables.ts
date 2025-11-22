import { syllable } from "syllable";

export default function countSyllables(word: string) {
  try {
    console.log(`The number of syllables in "${word}" is ${syllable(word)}`);
  } catch (error) {
    console.error(error);
  }
}
