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
    this.element().style.setProperty(
      'left',
      `${this.#parent.offsetLeft - this.element().offsetWidth / 2}px`
    );
  }

  show(): void {
    this.addClass('show');

    requestAnimationFrame(() => this.position());
  }
}

export default Tooltip;
