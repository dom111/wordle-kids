import Element from "./Element";
import {h, t} from "../lib/html";
import {Score, ScoreType} from "../Score";

export class Letter extends Element {
  #value: string = '';

  constructor() {
    super(h('span.letter'));
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
  }

  setValue(value: string): void {
    this.#value = value;

    this.element().childNodes.forEach((childNode) => childNode.remove());
    this.element().append(t(value));
  }

  value(): string {
    return this.#value;
  }
}

export default Letter;
