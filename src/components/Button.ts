import Element, { t } from '@dom111/element';
import { h } from '../lib/Element';
import Tooltip from './Tooltip';

export class Button extends Element {
  constructor(label: string, title: string) {
    super(h('button.button', t(label)));

    const tooltip = new Tooltip(title, this.element());

    this.element().ownerDocument.body.append(tooltip.element());

    this.on('click', () => this.element().blur());
  }
}

export default Button;
