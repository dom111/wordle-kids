import Element, { on, t } from '@dom111/element';
import { h } from '../lib/Element';

export class Tooltip extends Element {
  #content: string;
  #parent: HTMLElement;

  constructor(content: string, parent: HTMLElement) {
    super(h('div.tooltip'));

    this.#content = content;
    this.#parent = parent;

    this.append(t(this.#content));

    this.bindEvents();
  }

  bindEvents(): void {
    on(this.#parent, 'mouseenter', () => this.show());

    on(this.#parent, 'mouseleave', () => this.hide());
  }

  hide(): void {
    this.removeClass('show');

    requestAnimationFrame(() => this.position());
  }

  position(): void {
    this.element().style.setProperty(
      'top',
      `${this.#parent.offsetTop + this.#parent.offsetHeight + 10}px`
    );

    // Calculate the centered left position
    let left =
      this.#parent.offsetLeft +
      this.#parent.offsetWidth / 2 -
      this.element().offsetWidth / 2;

    // Clamp left to keep tooltip within viewport
    left = Math.max(
      0,
      Math.min(left, window.innerWidth - this.element().offsetWidth)
    );
    this.element().style.setProperty('left', `${left}px`);
  }

  show(): void {
    this.addClass('show');
  }
}

export default Tooltip;
