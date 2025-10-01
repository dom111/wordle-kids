import Difficulty from './Difficulty';
import InvalidOptions from '../InvalidOptions';

export interface ThemeDetails {
  id: string;
  label: string;
  path: string;
}

export const themes: ThemeDetails[] = [
  {
    id: 'animals',
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

export const getThemeById = (id: string) => {
  const [themeDetails] = themes.filter(
    (themeDetails) => themeDetails.id === id
  );

  if (!themeDetails) {
    throw new InvalidOptions(`Unknown theme '${id}'.`);
  }

  return themeDetails;
};

export const label = (path: string) => getThemeById(path).label ?? 'Unknown';
