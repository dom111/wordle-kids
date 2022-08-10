export class Element {
  #element: HTMLElement;

  constructor(element: HTMLElement) {
    this.#element = element;
  }

  element(): HTMLElement {
    return this.#element;
  }
}

export default Element;
