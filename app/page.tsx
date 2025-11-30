"use client";
import { useState } from "react";
import checkHaiku from "./checkHaiku";
import countSyllables from "./countSyllables";
import famousHaiku from "./famousHaikus";
import junicode from "./junicode.module.css";

// TODO: pick a theme from DaisyUI or components from Shadcn
// TODO: add a favicon
// TODO: write tests in jest and (possibly) in playwright

export default function Home() {
  // this is being stored in state so it doesn't get re-rendered on every keystroke
  const [randomHaiku] = useState(() => famousHaiku());
  const [line1, setLine1] = useState("");
  const [line2, setLine2] = useState("");
  const [line3, setLine3] = useState("");
  const [syllableCounts, setSyllableCounts] = useState({
    line1: 0,
    line2: 0,
    line3: 0,
  });
  const [haiku, setHaiku] = useState<boolean>();

  const readInput = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const count1 = countSyllables(line1);
    const count2 = countSyllables(line2);
    const count3 = countSyllables(line3);

    // updating syllable counts
    setSyllableCounts({ line1: count1, line2: count2, line3: count3 });

    const result = checkHaiku([count1, count2, count3]);
    console.log(result);
    setHaiku(result);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className={`text-6xl ${junicode.junicode}`}>
        Wait, is that a{" "}
        <span className={`text-orange-400 ${junicode.headerHaiku}`}>haiku</span>
        ?
      </h1>
      <h2 className={`text-4xl ${junicode.junicode}`}>
        Have you ever thought that?
      </h2>
      <p className={`text-3xl ${junicode.junicode}`}>
        Have you ever had the blind panic that you didn&apos;t know that the
        haiku was not a haiku? Well, I built this tool to help you answer the
        question,{" "}
        <span className={`text-orange-400 ${junicode.junicodeItalic}`}>
          &quot;Is this a haiku?&quot;
        </span>
      </p>
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

        <button type="submit" className="bg-emerald-600 m-2">
          Check it!
        </button>
        <div>
          {haiku === true ? (
            <div>
              <p className="text-green-600">Yes, it&apos;s a haiku!</p>
              <p>The first line has {syllableCounts.line1} syllables.</p>
              <p>The second line has {syllableCounts.line2} syllables.</p>
              <p>The third line has {syllableCounts.line3} syllables.</p>
            </div>
          ) : haiku === false ? (
            <div>
              <p className="text-red-600">No, it&apos;s not a haiku.</p>
              <p>The first line has {syllableCounts.line1} syllables.</p>
              <p>The second line has {syllableCounts.line2} syllables.</p>
              <p>The third line has {syllableCounts.line3} syllables.</p>
            </div>
          ) : (
            <div></div>
          )}
        </div>
        <h2>Random Haiku - refresh the page to see a different one!</h2>
        <div className={`${junicode.junicodeItalic}`}>
          <p>{randomHaiku.lineOne}</p>
          <p>{randomHaiku.lineTwo}</p>
          <p>{randomHaiku.lineThree}</p>
          <p>-{randomHaiku.author}</p>
        </div>
      </form>
    </div>
  );
}
