// Manual mock for the syllable package
export const syllable = (text: string): number => {
  if (!text || text.trim().length === 0) return 0;

  // Remove punctuation and convert to lowercase
  const word = text.toLowerCase().replace(/[^a-z\s]/g, "");
  const words = word.split(/\s+/).filter((w) => w.length > 0);

  let totalCount = 0;

  for (const w of words) {
    let count = 0;
    let wasVowel = false;
    const vowels = "aeiouy";

    for (let i = 0; i < w.length; i++) {
      const isVowel = vowels.includes(w[i]);
      if (isVowel && !wasVowel) {
        count++;
      }
      wasVowel = isVowel;
    }

    // Handle silent e
    if (w.endsWith("e") && count > 1) {
      count--;
    }

    // Handle words ending in 'le'
    if (
      w.endsWith("le") &&
      w.length > 2 &&
      !"aeiouy".includes(w[w.length - 3])
    ) {
      count++;
    }

    // Ensure at least 1 syllable per word
    totalCount += Math.max(1, count);
  }

  return totalCount;
};
