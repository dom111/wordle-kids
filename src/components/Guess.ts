import Element from './Element';
import { h } from '../lib/html';
import Letter from "./Letter";
import {ScoreList} from "../Score";

export class Guess extends Element {
  #letters: Letter[] = [];
  #values: [string, string, string] = ['', '', ''];

  constructor() {
    super(h('div.guess'));

    this.#letters.push(
      new Letter(),
      new Letter(),
      new Letter(),
    );

    this.element().append(
      ...this.#letters.map((letter: Letter) => letter.element())
    );
  }

  applyScore(score: ScoreList): void {
    this.#letters.forEach((letter, index) =>
      letter.highlight(score[index])
    );
  }

  guess(): [string, string, string] {
    return this.#letters.map((letter: Letter) => letter.value()) as [string, string, string];
  }

  length(): number {
    return this.#letters.filter((letter: Letter): boolean => letter.hasValue()).length;
  }

  onInput(key: string) {
    if (key === 'Backspace' && this.length() === 0) {
      return;
    }

    if (key === 'Backspace') {
      this.#letters[this.length() - 1].setValue('');

      return;
    }

    if (this.length() === 3) {
      return;
    }

    this.#letters[this.length()].setValue(key);
  }
}

export default Guess;
