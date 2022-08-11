import Element, { h } from './Element';
import Letter from './Letter';
import { ScoreList } from '../Score';

export class Guess extends Element {
  #letters: Letter[] = [];
  #maxLength: number;

  constructor(maxLength: number) {
    super('div.guess');

    this.#maxLength = maxLength;

    for (let i = 0; i < maxLength; i++) {
      this.#letters.push(new Letter());
    }

    this.element().append(
      ...this.#letters.map((letter: Letter) => letter.element())
    );
  }

  applyScore(score: ScoreList): void {
    this.#letters.forEach((letter, index) => letter.highlight(score[index]));
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

  onInput(key: string) {
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
