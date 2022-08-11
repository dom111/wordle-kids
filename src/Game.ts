import { Score, ScoreList, ScoreType } from './Score';

export class Game {
  #currentWord: string[];
  #letterStatuses: { [key: string]: ScoreType } = {};
  #validWords: string[] = [];

  currentWordLength(): number {
    return this.#currentWord.length;
  }

  // TODO: implement options to determine required wordlists
  // TODO: extend the wordlists to include those that can be used as answers and those that can be selected as the
  //  target
  // TODO: Support dynamic list provision (pass data in via hash, URL/specific lists) to allow kids to practice specific
  //  spellings etc - backed up by a list of known - kid safe - words.
  private async getWordlist(): Promise<string[]> {
    const response = await fetch('./lists/3-letter.json');

    return (await response.json()).map((word) => word.toUpperCase());
  }

  async init(): Promise<void> {
    this.#validWords = await this.getWordlist();
    this.setCurrentWord();
  }

  letterScore(letter: string): ScoreType {
    return this.#letterStatuses[letter] ?? Score.UNKNOWN;
  }

  public score(guess: string[]): ScoreList {
    const wordForScoring = [...this.#currentWord];

    return wordForScoring
      .reduce((result: ScoreList, letter: string, index: number): ScoreList => {
        if (letter === guess[index]) {
          this.#letterStatuses[letter] = result[index] = Score.RIGHT;

          // Remove the word so it doesn't get scored in other places
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

  private setCurrentWord(): void {
    // TODO: check game mode
    this.#currentWord = [
      ...this.#validWords[
        Math.floor(this.#validWords.length * Math.random())
      ].toUpperCase(),
    ];
  }

  validate(guess: string[]): boolean {
    return this.#validWords.includes(guess.join(''));
  }
}

export default Game;
