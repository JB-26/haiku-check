import { syllable } from "syllable";

export default function countSyllables(word: string): number {
  try {
    return syllable(word);
  } catch (error) {
    console.error(error);
    return 0;
  }
}
