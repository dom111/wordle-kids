import Score, { ScoreList, ScoreType } from './Score';
import InvalidOptions from './InvalidOptions';

export enum Mode {
  FREE_PLAY,
  DAILY, // TODO
  THEMED,
  CUSTOM, // TODO
}

const modes = {
  [Mode.FREE_PLAY]: 'Free Play',
  [Mode.DAILY]: 'Daily',
  [Mode.THEMED]: 'Themed',
  [Mode.CUSTOM]: 'Custom',
};

type WordLengths = 3 | 4 | 5;

export enum WordDifficulty {
  EASY,
  NORMAL,
  HARD,
}

const difficulties = {
  [WordDifficulty.EASY]: 'Easy',
  [WordDifficulty.NORMAL]: 'Normal',
  [WordDifficulty.HARD]: 'Hard',
};

interface ThemeDetails {
  label: string;
  path: string;
}

export const themes: ThemeDetails[] = [
  {
    label: 'Animals',
    path: './lists/themes/animals.json',
  },
];

const wordLists: { [key: number]: string } = {
  3: './lists/3-letter.json',
  4: './lists/4-letter.json',
  5: './lists/5-letter.json',
};

interface ThemeDefinition {
  words: WordDefinition[];
}

interface WordDefinition {
  word: string;
  difficulty: WordDifficulty;
  clues: string[];
}

interface Options {
  difficulty?: WordDifficulty;
  lengths?: WordLengths[];
  mode: Mode;
  theme?: string;
}

export class Game {
  #currentTarget: WordDefinition;
  #difficulty: WordDifficulty;
  #letterStatuses: { [key: string]: ScoreType } = {};
  #mode: Mode;
  #theme: string = '';
  #validWords: string[] = [];

  private async addAllValidWords(lengths: WordLengths[]): Promise<void> {
    await Promise.all(lengths.map((length) => this.addValidWords(length)));
  }

  // TODO: Support dynamic list provision (pass data in via hash, URL/specific lists) to allow kids to practice specific
  //  spellings etc - backed up by a list of known - kid safe - words.
  private async addValidWords(length: WordLengths): Promise<void> {
    const response = await fetch(wordLists[length]);

    (await response.json()).forEach((word) =>
      this.#validWords.push(word.toUpperCase())
    );
  }

  currentWordLength(): WordLengths {
    return this.#currentTarget.word.length as WordLengths;
  }

  difficulty(): string {
    return difficulties[this.#difficulty];
  }

  async init(
    { difficulty, mode, lengths, theme }: Options = {
      difficulty: WordDifficulty.EASY,
      lengths: [3, 4, 5],
      mode: Mode.FREE_PLAY,
    }
  ): Promise<void> {
    this.#mode = mode;
    this.#difficulty = difficulty;

    if (mode === Mode.THEMED && !theme) {
      throw new InvalidOptions('Expected `theme` when using `Mode.THEMED`.');
    }

    if (mode === Mode.THEMED) {
      await this.setThemedGame(theme, difficulty);

      return;
    }

    if (mode === Mode.FREE_PLAY) {
      await this.setFreePlay(lengths);

      return;
    }
  }

  letterScore(letter: string): ScoreType {
    return this.#letterStatuses[letter] ?? Score.UNKNOWN;
  }

  mode(): string {
    return modes[this.#mode];
  }

  score(guess: string[]): ScoreList {
    const wordForScoring = [...this.#currentTarget.word];

    return wordForScoring
      .reduce((result: ScoreList, letter: string, index: number): ScoreList => {
        if (letter === guess[index]) {
          this.#letterStatuses[letter] = result[index] = Score.RIGHT;

          // Remove the letter from the word so it doesn't get scored in other places
          wordForScoring[index] = null;
        }

        return result;
      }, new Array(this.currentWordLength()).fill(Score.UNKNOWN))
      .map((score: ScoreType, index: number) => {
        if (score === Score.RIGHT) {
          return score;
        }

        const wordIndex = wordForScoring.indexOf(guess[index]);

        if (wordIndex > -1) {
          wordForScoring[wordIndex] = null;

          return (this.#letterStatuses[guess[index]] = Score.WRONG_PLACE);
        }

        return (this.#letterStatuses[guess[index]] = Score.WRONG);
      });
  }

  private async setFreePlay(lengths: WordLengths[]): Promise<void> {
    await this.addAllValidWords(lengths);

    const word =
      this.#validWords[
        Math.floor(this.#validWords.length * Math.random())
      ].toUpperCase();

    this.#currentTarget = {
      word,
      difficulty: 0,
      clues: [],
    };
  }

  private async setThemedGame(
    theme: string,
    difficulty: WordDifficulty
  ): Promise<void> {
    const [themeDetails] = themes.filter(
      (themeDetails) => themeDetails.path === theme
    );

    if (!themeDetails) {
      throw new InvalidOptions('Unknown theme `${theme}`.');
    }

    this.#theme = themeDetails.label;

    const details = (await (
      await fetch(themeDetails.path)
    ).json()) as ThemeDefinition;

    const possibleWords = details.words.filter(
      (word) => word.difficulty <= difficulty
    );

    const lengths = possibleWords.reduce((lengths: WordLengths[], { word }) => {
      if (!lengths.includes(word.length as WordLengths)) {
        lengths.push(word.length as WordLengths);
      }

      return lengths;
    }, []) as WordLengths[];

    await this.addAllValidWords(lengths);

    // For themed games (any custom games) there might be words that aren't dictionary words, so ensure these are in
    //  the valid words list too!
    possibleWords
      .map(({ word }) => word.toUpperCase())
      .forEach((word) => {
        if (!this.#validWords.includes(word)) {
          this.#validWords.push(word);
        }
      });

    const {
      word,
      difficulty: wordDifficulty,
      clues,
    } = possibleWords[Math.floor(possibleWords.length * Math.random())];

    this.#currentTarget = {
      word: word.toUpperCase(),
      difficulty: wordDifficulty,
      clues,
    };
  }

  theme(): string {
    return this.#theme;
  }

  validate(guess: string[]): boolean {
    return this.#validWords.includes(guess.join(''));
  }
}

export default Game;
