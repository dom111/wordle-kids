export enum Difficulty {
  EASY,
  NORMAL,
  HARD,
}

export const difficulties: Difficulty[] = [
  Difficulty.EASY,
  Difficulty.NORMAL,
  Difficulty.HARD,
];

export const labels = {
  [Difficulty.EASY]: 'Easy',
  [Difficulty.NORMAL]: 'Normal',
  [Difficulty.HARD]: 'Hard',
};

export const label = (mode: Difficulty | string | number) =>
  labels[mode] ?? 'Invalid';

export default Difficulty;
