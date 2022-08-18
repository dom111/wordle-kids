export type WordLengths = 3 | 4 | 5;

export const wordLengths: WordLengths[] = [3, 4, 5];

const wordLists: { [key: number]: string } = {
  3: './lists/3-letter.json',
  4: './lists/4-letter.json',
  5: './lists/5-letter.json',
};

const wordListLoaders = new Map<number, Promise<string[]>>();

export const load = (length: WordLengths): Promise<string[]> => {
  if (!wordListLoaders.has(length)) {
    wordListLoaders.set(
      length,
      fetch(wordLists[length]).then(
        (response): Promise<string[]> => response.json()
      )
    );
  }

  return wordListLoaders.get(length);
};
