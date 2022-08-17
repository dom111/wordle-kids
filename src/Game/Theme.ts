import Difficulty from './Difficulty';
import InvalidOptions from '../InvalidOptions';

export interface ThemeDetails {
  label: string;
  path: string;
}

export const themes: ThemeDetails[] = [
  {
    label: 'Animals',
    path: './lists/themes/animals.json',
  },
];

export interface ThemeDefinition {
  words: WordDefinition[];
}

export interface WordDefinition {
  word: string;
  difficulty: Difficulty;
  clues: string[];
}

export const getThemeByPath = (path: string) => {
  const [themeDetails] = themes.filter(
    (themeDetails) => themeDetails.path === path
  );

  if (!themeDetails) {
    throw new InvalidOptions(`Unknown theme '${path}'.`);
  }

  return themeDetails;
};

export const label = (path: string) => getThemeByPath(path).label ?? 'Unknown';
