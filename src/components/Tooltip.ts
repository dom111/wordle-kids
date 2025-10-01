import Element, { emit, on, t } from '@dom111/element';
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

    on(this.element().ownerDocument, 'new-game', () => this.remove());
  }

  hide(): void {
    this.removeClass('show');
  }

  position(): void {
    this.element().style.setProperty(
      'top',
      `${this.#parent.offsetTop + this.#parent.offsetHeight + 10}px`
    );

    // Clamp left to keep tooltip within viewport
    const left = Math.max(
      0,
      Math.min(
        this.#parent.offsetLeft +
          this.#parent.offsetWidth / 2 -
          this.element().offsetWidth / 2,
        window.innerWidth - this.element().offsetWidth
      )
    );
    this.element().style.setProperty('left', `${left}px`);
  }

  show(): void {
    this.addClass('show');

    requestAnimationFrame(() => this.position());
  }
}

export default Tooltip;
