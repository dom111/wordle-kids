import Element, { h, t } from './Element';
import Game from '../Game';

export class Header extends Element {
  constructor(game: Game) {
    super(
      'nav.header',
      h('h1', t('Wordle Kids')),
      h(
        'h3',
        t(
          `${game.mode()}${
            game.theme() ? ` (${game.theme()})` : ''
          } - ${game.difficulty()}`
        )
      ),
      h('p', t('A kid-friendly Wordle clone with small words.'))
    );
  }
}

export default Header;
