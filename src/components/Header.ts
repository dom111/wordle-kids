import Element from './Element';
import { h, t } from '../lib/html';

export class Header extends Element {
  constructor() {
    super(
      h(
        'nav',
        h('h1', t('Wordle Kids')),
        h('p', t('A kid-friendly Wordle clone with three-letter words.'))
      )
    );
  }
}

export default Header;
