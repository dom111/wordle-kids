import Element from './Element';

export class Modal extends Element {
  constructor(...childNodes: Node[]) {
    super('dialog', ...childNodes);

    document.body.append(this.element());
  }

  close(): void {
    this.element().removeAttribute('open');
  }

  open(): void {
    this.element().setAttribute('open', '');
  }
}

export default Modal;
