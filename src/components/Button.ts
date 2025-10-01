import Element, { t } from '@dom111/element';
import { h } from '../lib/Element';
import Tooltip from './Tooltip';

export class Button extends Element {
  constructor(label: string, title: string) {
    super(h('button.button', t(label)));

    this.append(new Tooltip(title, this.element()));
  }
}

export default Button;
