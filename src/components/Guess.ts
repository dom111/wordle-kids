import Element from '@dom111/element';
import Letter from './Letter';
import { ScoreList } from '../Game/Score';
import { h } from '../lib/Element';

export class Guess extends Element {
  #letters: Letter[] = [];
  #maxLength: number;

  constructor(maxLength: number) {
    super(h('.guess'));

    this.#maxLength = maxLength;

    for (let i = 0; i < maxLength; i++) {
      this.#letters.push(new Letter());
    }

    this.append(...this.#letters.map((letter: Letter) => letter.element()));
  }

  applyScore(score: ScoreList): void {
    this.#letters.forEach((letter, index) => letter.highlight(score[index]));
  }

  celebrate() {
    this.addClass('dance');
  }

  clearError(): void {
    this.element().classList.remove('error');
  }

  guess(): string[] {
    return this.#letters.map((letter: Letter) => letter.value());
  }

  highlightError(): void {
    this.element().classList.add('error');
  }

  length(): number {
    return this.#letters.filter((letter: Letter): boolean => letter.hasValue())
      .length;
  }

  onInput(key: string): void {
    if (key === 'Backspace' && this.length() === 0) {
      return;
    }

    if (key === 'Backspace') {
      this.clearError();

      this.#letters[this.length() - 1].setValue('');

      return;
    }

    if (this.length() === this.#maxLength) {
      return;
    }

    this.#letters[this.length()].setValue(key);
  }
}

export default Guess;
