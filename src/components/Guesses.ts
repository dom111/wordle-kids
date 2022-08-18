import Element from './Element';
import Game from '../Game';
import Guess from './Guess';
import Score from '../Game/Score';

export class Guesses extends Element {
  #complete: boolean = false;
  #game: Game;
  #guesses: Guess[] = [];

  constructor(game: Game) {
    super(
      'section.guesses[tabindex="0"][aria-label="Enter your guess"][autofocus]'
    );

    this.#game = game;

    this.addGuess();
  }

  private addGuess(): void {
    this.#guesses.push(new Guess(this.#game.currentWordLength()));
    this.append(this.currentGuess().element());

    this.element().scrollTo({
      top: this.element().scrollHeight,
    });
  }

  private currentGuess(): Guess {
    return this.#guesses[this.#guesses.length - 1];
  }

  onInput(key: string): void {
    if (this.#complete) {
      return;
    }

    const currentGuess = this.currentGuess().guess(),
      hasAllLetters =
        this.currentGuess().length() === this.#game.currentWordLength(),
      isGuessValid = this.#game.validate(currentGuess);

    if (key === 'Enter' && hasAllLetters && isGuessValid) {
      const score = this.#game.score(currentGuess);

      this.currentGuess().applyScore(score);

      if (score.every((score) => score === Score.RIGHT)) {
        // Do celebration!
        this.#complete = true;

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
