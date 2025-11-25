"use client";
import { useState } from "react";
import checkHaiku from "./checkHaiku";
import countSyllables from "./countSyllables";

// TODO: find a font similar to font-family: Junicode,serif; - https://www.1001fonts.com/junicode-font.html
// TODO: pick a theme from DaisyUI or components from Shadcn
// TODO: add a favicon
// TODO: write tests in jest and (possibly) in playwright

export default function Home() {
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [haiku, setHaiku] = useState<boolean>();

  const readInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = checkHaiku([
      countSyllables(line1),
      countSyllables(line2),
      countSyllables(line3),
    ]);
    console.log(result);
    setHaiku(result);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1>Wait, is that a haiku?</h1>
      <p>Have you ever thought that?</p>
      <form className="flex flex-col" onSubmit={readInput}>
        <label htmlFor="line-one">Enter the first line of your haiku:</label>
        <input
          className="bg-blue-400"
          type="text"
          id="line-one"
          name="line-one"
          value={line1}
          onChange={(e) => setLine1(e.target.value)}
          placeholder="An old silent pond"
          required
          spellCheck
        />
        <label htmlFor="line-two">Enter the second line of your haiku:</label>
        <input
          className="bg-blue-400"
          type="text"
          id="line-two"
          name="line-two"
          value={line2}
          onChange={(e) => setLine2(e.target.value)}
          placeholder="A frog jumps into the pond"
          required
          spellCheck
        />
        <label htmlFor="line-three">Enter the third line of your haiku:</label>
        <input
          className="bg-blue-400"
          type="text"
          id="line-three"
          name="line-three"
          value={line3}
          onChange={(e) => setLine3(e.target.value)}
          placeholder="Splash! Silence again."
          required
          spellCheck
        />
        <p>The first line has {countSyllables(line1)} syllables.</p>
        <p>The second line has {countSyllables(line2)} syllables.</p>
        <p>The third line has {countSyllables(line3)} syllables.</p>
        <button type="submit" className="bg-emerald-600 m-2">
          Check it!
        </button>
        <div>
          {haiku === true ? (
            <div>
              <p className="text-green-600">Yes, it&apos;s a haiku!</p>
            </div>
          ) : haiku === false ? (
            <div>
              <p className="text-red-600">No, it&apos;s not a haiku.</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </form>
    </div>
  );
}
