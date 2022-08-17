export type WordLengths = 3 | 4 | 5;

export const wordLengths: WordLengths[] = [3, 4, 5];

const wordLists: { [key: number]: string } = {
  3: './lists/3-letter.json',
  4: './lists/4-letter.json',
  5: './lists/5-letter.json',
};

export const load = (length: WordLengths) =>
  fetch(wordLists[length]).then((response) => response.json());
