import Element, { h, t } from './Element';

export class Header extends Element {
  constructor() {
    super(
      'nav',
      h('h1', t('Wordle Kids')),
      h('p', t('A kid-friendly Wordle clone with small words.'))
    );
  }
}

export default Header;
