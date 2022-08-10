import Element from './Element';
import { h } from '../lib/html';
import Guess from "./Guess";
import Game from "../Game";

export class Guesses extends Element {
  #game: Game;
  #guesses: Guess[] = [];

  constructor(game: Game) {
    super(h('section.guesses'));

    this.#game = game;

    this.#guesses.push(new Guess());
    this.element().append(this.currentGuess().element());
  }

  private currentGuess(): Guess {
    return this.#guesses[this.#guesses.length - 1]
  }

  onInput(key: string): void {
    // TODO: Any other synonyms?
    if (key === 'Enter' && this.currentGuess().length() === 3) {
      const score = this.#game.score(this.currentGuess().guess());

      this.currentGuess().applyScore(score);

      this.#guesses.push(new Guess);
      this.element().append(this.currentGuess().element());

      return;
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
