import Element, { t } from '@dom111/element';
import Score, { ScoreType } from '../Game/Score';
import { h } from '../lib/Element';

export class Letter extends Element {
  #value: string = '';

  constructor() {
    super(h('span.letter[tabindex="-1"]'));
  }

  hasValue(): boolean {
    return this.#value !== '';
  }

  highlight(score: ScoreType): void {
    if (score === Score.RIGHT) {
      this.element().classList.add('right');

      return;
    }

    if (score === Score.WRONG_PLACE) {
      this.element().classList.add('wrong-place');

      return;
    }

    if (score === Score.WRONG) {
      this.element().classList.add('wrong');

      return;
    }
  }

  setValue(value: string): void {
    this.#value = value;

    this.empty();
    this.append(t(value));
  }

  value(): string {
    return this.#value;
  }
}

export default Letter;
