import Score, { ScoreList, ScoreType } from './Game/Score';
import { ThemeDefinition, WordDefinition, getThemeById } from './Game/Theme';
import { WordLengths, load as loadWordlist } from './Game/WordLists';
import Difficulty from './Game/Difficulty';
import InvalidOptions from './InvalidOptions';
import Mode from './Game/Mode';
import { defaultOptions, Options } from './components/OptionsModal';

export class Game {
  #currentTarget: WordDefinition;
  #difficulty: Difficulty = Difficulty.EASY;
  #lengths: WordLengths[];
  #letterStatuses: { [key: string]: ScoreType } = {};
  #mode: Mode;
  #onStart: () => void;
  #theme: string = '';
  #validWords: string[] = [];

  constructor(onStart: () => void) {
    this.#onStart = onStart;
  }

  private async addAllValidWords(lengths: WordLengths[]): Promise<void> {
    await Promise.all(lengths.map((length) => this.addValidWords(length)));
  }

  // TODO: Support dynamic list provision (pass data in via hash, URL/specific lists) to allow kids to practice specific
  //  spellings etc - backed up by a list of known - kid safe - words.
  private async addValidWords(length: WordLengths): Promise<void> {
    const wordlist = await loadWordlist(length);

    wordlist.forEach((word) => this.#validWords.push(word.toUpperCase()));
  }

  currentTarget(): WordDefinition {
    return this.#currentTarget;
  }

  currentWordLength(): WordLengths {
    return this.#currentTarget.word.length as WordLengths;
  }

  difficulty(): Difficulty {
    return this.#difficulty;
  }

  getOptions(): Options {
    return {
      ...defaultOptions,
      ...(JSON.parse(localStorage.getItem('options') || '{}') || {}),
    };
  }

  letterScore(letter: string): ScoreType {
    return this.#letterStatuses[letter] ?? Score.UNKNOWN;
  }

  mode(): Mode {
    return this.#mode;
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

  setDifficulty(difficulty: Difficulty): void {
    this.#difficulty = difficulty;
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

  setLengths(lengths: WordLengths[]): void {
    this.#lengths = lengths;
  }

  setMode(mode: Mode): void {
    this.#mode = mode;
  }

  setOptions(options: Options): void {
    localStorage.setItem('options', JSON.stringify(options));
  }

  private async setThemedGame(
    theme: string,
    difficulty: Difficulty
  ): Promise<void> {
    const themeDetails = getThemeById(theme);

    this.#theme = theme;

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

    // TODO: check if we've already loaded the wordlists
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
      difficulty: Difficulty,
      clues,
    } = possibleWords[Math.floor(possibleWords.length * Math.random())];

    this.#currentTarget = {
      word: word.toUpperCase(),
      difficulty: Difficulty,
      clues,
    };
  }

  setTheme(theme: string): void {
    this.#theme = theme;
  }

  async start(): Promise<void> {
    if (this.#mode === Mode.THEMED && !this.#theme) {
      throw new InvalidOptions('Expected `theme` when using `Mode.THEMED`.');
    }

    this.#letterStatuses = {};

    if (this.#mode === Mode.THEMED) {
      await this.setThemedGame(this.#theme, this.#difficulty);

      this.#onStart();

      return;
    }

    if (this.#mode === Mode.FREE_PLAY) {
      await this.setFreePlay(this.#lengths);

      this.#onStart();

      return;
    }
  }

  theme(): string {
    return this.#theme;
  }

  validate(guess: string[]): boolean {
    return this.#validWords.includes(guess.join(''));
  }
}

export default Game;
