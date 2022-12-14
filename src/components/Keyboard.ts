import Element, { h, on, t } from './Element';
import Game from '../Game';
import Guesses from './Guesses';
import Letter from './Letter';

enum SpecialKey {
  BACKSPACE = 'Backspace',
  ENTER = 'Enter',
}

type SpecialKeys = SpecialKey.BACKSPACE | SpecialKey.ENTER;

const specialKeyIcons = {
  [SpecialKey.BACKSPACE]: '⌫',
};

export class Keyboard extends Element {
  #game: Game;
  #guesses: Guesses;
  #lookup: { [key: string]: Letter } = {};

  // TODO: Could this generated using https://developer.mozilla.org/en-US/docs/Web/API/KeyboardLayoutMap to match the
  //  user's layout?
  #rows: (string | SpecialKeys)[][] = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
    [SpecialKey.BACKSPACE, 'Z', 'X', 'C', 'V', 'B', 'N', 'M', SpecialKey.ENTER],
  ];

  constructor(guesses: Guesses, game: Game) {
    super('section.keyboard[autofocus]');

    this.append(
      ...this.#rows.map((keys) =>
        h(
          'section.row',
          ...keys.map((key: string | SpecialKeys) => {
            const letter = new Letter();

            this.#lookup[key] = letter;

            letter.setValue(key);
            letter.element().setAttribute('data-key', key);

            if (Object.prototype.hasOwnProperty.call(specialKeyIcons, key)) {
              letter.empty();
              letter.append(t(specialKeyIcons[key] ?? key));
            }

            letter.on('click', () => this.handleInput(key));

            return letter.element();
          })
        )
      )
    );

    this.#guesses = guesses;
    this.#game = game;

    this.bindKeyboard();
  }

  private bindKeyboard(): void {
    on(document, 'keydown', (event) => this.handleInput(event.key));
  }

  private handleInput(key: string): void {
    this.#guesses.onInput(key);

    this.#rows.flat().forEach((char) => {
      const letter = this.#lookup[char],
        score = this.#game.letterScore(char);

      letter.highlight(score);
    });
  }
}

export default Keyboard;
