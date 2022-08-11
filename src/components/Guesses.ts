import Element from './Element';
import Guess from './Guess';
import Game from '../Game';
import { Score } from '../Score';

export class Guesses extends Element {
  #game: Game;
  #guesses: Guess[] = [];

  constructor(game: Game) {
    super('section.guesses');

    this.#game = game;

    this.addGuess();
  }

  private addGuess(): void {
    this.#guesses.push(new Guess(this.#game.currentWordLength()));
    this.element().append(this.currentGuess().element());

    this.element().scrollTo({
      top: this.element().scrollHeight,
    });
  }

  private currentGuess(): Guess {
    return this.#guesses[this.#guesses.length - 1];
  }

  onInput(key: string): void {
    const currentGuess = this.currentGuess().guess(),
      hasAllLetters =
        this.currentGuess().length() === this.#game.currentWordLength(),
      isGuessValid = this.#game.validate(currentGuess);

    // TODO: Any other synonyms?
    if (key === 'Enter' && hasAllLetters && isGuessValid) {
      const score = this.#game.score(currentGuess);

      this.currentGuess().applyScore(score);

      if (score.every((score) => score === Score.RIGHT)) {
        // Do celebration!
        return;
      }

      this.addGuess();

      return;
    }

    if (key === 'Enter' && hasAllLetters && !isGuessValid) {
      this.currentGuess().highlightError();
    }

    if (key === 'Backspace') {
      this.currentGuess().onInput(key);
    }

    if (key.match(/^[A-Z]$/i)) {
      this.currentGuess().onInput(key.toUpperCase());
    }
  }
}

export default Guesses;
