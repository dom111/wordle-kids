import Element, { emit } from '@dom111/element';
import Game from '../Game';
import Guess from './Guess';
import Score from '../Game/Score';
import { h } from '../lib/Element';

export class Guesses extends Element {
  #complete: boolean = false;
  #game: Game;
  #guesses: Guess[] = [];

  constructor(game: Game) {
    super(
      h(
        'section.guesses[tabindex="0"][aria-label="Enter your guess"][autofocus]'
      )
    );

    this.#game = game;

    this.addGuess();

    this.bindEvents();
  }

  private addGuess(): void {
    this.#guesses.push(new Guess(this.#game.currentWordLength()));
    this.append(this.currentGuess().element());

    this.scrollToBottom();
  }

  bindEvents(): void {
    const resizeObserver = new ResizeObserver(() => this.scrollToBottom());

    resizeObserver.observe(this.element());
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
        this.currentGuess().celebrate();

        emit(this.element().ownerDocument, new CustomEvent('complete'));

        return;
      }

      this.addGuess();

      emit(
        this.element().ownerDocument,
        new CustomEvent<{ guesses: number }>('incorrect-guess', {
          detail: {
            guesses: this.#guesses.length - 1,
          },
        })
      );

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

  scrollToBottom(): void {
    requestAnimationFrame(() =>
      this.element().scrollTo({
        top: this.element().scrollHeight,
      })
    );
  }
}

export default Guesses;
