import Element, { h, on, t } from './Element';
import Mode, { label as modeLabel } from '../Game/Mode';
import Game from '../Game';
import OptionsModal from './OptionsModal';
import { label as difficultyLabel } from '../Game/Difficulty';
import { label as themeLabel } from '../Game/Theme';

export class Header extends Element {
  constructor(game: Game) {
    super(
      'nav.header',
      h('header', h('h1', t('Wordle Kids')), h('section.actions')),
      h(
        'h3',
        t(
          modeLabel(game.mode()) +
            (game.mode() === Mode.THEMED
              ? ` (${themeLabel(game.theme())}) - ${difficultyLabel(
                  game.difficulty()
                )}`
              : '')
        )
      ),
      h('p', t('A kid-friendly Wordle clone with small words and clues.')),
      h('.clues')
    );

    const cluesContainer = this.element().querySelector('.clues'),
      optionsModal = new OptionsModal(game),
      actions = this.element().querySelector('section.actions'),
      newGame = h('button[title="New game"]', t('↻')),
      hint = h('button[title="Get a hint"]', t('?')),
      options = h('button[title="Options"]', t('⚙'));

    on(newGame, 'click', (event) => {
      game.start();

      event.preventDefault();
      event.stopPropagation();
    });

    on(hint, 'click', (event) => {
      const currentClues = cluesContainer.childNodes.length,
        clues = game.currentTarget().clues ?? [];

      event.preventDefault();
      event.stopPropagation();

      if (currentClues === clues.length) {
        cluesContainer.append(h('p', t('No more clues!')));
      }

      if (currentClues >= clues.length) {
        return;
      }

      cluesContainer.append(h('p', t(clues[currentClues])));
    });

    on(options, 'click', (event) => {
      optionsModal.open();

      event.preventDefault();
      event.stopPropagation();
    });

    actions.append(newGame, hint, options);
  }
}

export default Header;
