import Element from '@dom111/element';
import { h } from '../lib/Element';

export class Modal extends Element {
  #contentArea: HTMLElement;

  constructor(...childNodes: Node[]) {
    super(h('dialog[tabindex="0"]'));

    this.#contentArea = h('.content', ...childNodes);

    this.element().append(this.#contentArea);

    document.body.append(this.element());

    this.bindEvents();
  }

  append(...childNodes: Node[]): void {
    this.#contentArea.append(...childNodes);
  }

  private bindEvents(): void {
    this.on('click', (event) => {
      if (event.target !== this.element()) {
        return;
      }

      this.close();
    });

    this.on('keydown', (event: KeyboardEvent) => {
      if (event.key !== 'Escape') {
        return;
      }

      this.close();
    });
  }

  close(): void {
    this.element().removeAttribute('open');
  }

  open(): void {
    this.element().setAttribute('open', '');

    this.element().focus();
  }

  setLabel(label: string): void {
    this.element().setAttribute('aria-label', label);
  }
}

export default Modal;
