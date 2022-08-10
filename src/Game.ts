import {Score, ScoreList, ScoreType} from "./Score";

export class Game {
  #currentWord: [string, string, string];
  #validWords: string[] = [];

  constructor() {
    this.getWordlist();
    this.setCurrentWord();
  }

  private getWordlist(): void {
    this.#validWords.push(
      'bat',
      'cat',
      'eat',
      'fat',
      'hat',
      'mat',
      'pat',
      'rat',
      'sat',
      'vat',
    );
  }

  public score(guess: [string, string, string]): ScoreList {
    const wordForScoring = [...this.#currentWord];

    return wordForScoring
      .reduce((result: [number, number, number], letter: string, index: number): ScoreList => {
        if (letter === guess[index]) {
          result[index] = 2;
          wordForScoring[index] = null;
        }

        return result;
      }, [Score.UNKNOWN, Score.UNKNOWN, Score.UNKNOWN] as ScoreList)
      .map((score: ScoreType, index: number) => {
        if (score === 2) {
          return score;
        }

        const wordIndex = wordForScoring.indexOf(guess[index]);

        if (wordIndex > -1) {
          wordForScoring[wordIndex] = null;
          return 1;
        }

        return score;
      }) as ScoreList;
  }

  private setCurrentWord(): void {
    // TODO: check game mode
    this.#currentWord = [...this.#validWords[
      Math.floor(this.#validWords.length * Math.random())
    ].toUpperCase()] as [string, string, string];
  }
}

export default Game;
