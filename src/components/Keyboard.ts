import Element from './Element';
import { h } from '../lib/html';
import Guesses from './Guesses';

export class Keyboard extends Element {
  #guesses: Guesses;

  constructor(guesses: Guesses) {
    super(h('section.keyboard[autofocus]'));

    this.#guesses = guesses;

    this.bindKeyboard();
  }

  private bindKeyboard(): void {
    document.addEventListener('keydown', (event) =>
      this.#guesses.onInput(event.key)
    );
  }
}

export default Keyboard;
