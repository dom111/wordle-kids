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

export const label = (mode: Difficulty | string | number): string =>
  labels[mode] ?? 'Invalid';

export const toDifficulty = (value: any): Difficulty => {
  const intValue = parseInt(value);

  if (!difficulties.includes(intValue)) {
    throw new TypeError(`Invalid Difficulty: ${value}`);
  }

  return intValue;
};

export default Difficulty;
