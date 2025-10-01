import Element, { on, t } from '@dom111/element';
import Mode, { label as modeLabel } from '../Game/Mode';
import Game from '../Game';
import OptionsModal from './OptionsModal';
import { label as difficultyLabel } from '../Game/Difficulty';
import { label as themeLabel } from '../Game/Theme';
import { h } from '../lib/Element';
import Button from './Button';

export class Header extends Element {
  constructor(game: Game) {
    super(
      h(
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
      )
    );

    const cluesContainer = this.element().querySelector('.clues'),
      optionsModal = new OptionsModal(game),
      actions = new Element(
        this.element().querySelector('section.actions') as HTMLElement
      ),
      newGame = new Button('↻', 'New game'),
      hint = new Button('?', 'Get a hint'),
      options = new Button('⚙', 'Options');

    newGame.on('click', (event) => {
      game.start();

      event.preventDefault();
      event.stopPropagation();
    });

    hint.on('click', (event) => {
      const currentClues = cluesContainer.childNodes.length,
        clues = game.currentTarget().clues ?? [];

      event.preventDefault();
      event.stopPropagation();

      if (currentClues === clues.length) {
        cluesContainer.append(h('.clue.no-more', t('No more clues!')));
      }

      if (currentClues >= clues.length) {
        return;
      }

      cluesContainer.append(h('.clue', t(clues[currentClues])));
    });

    options.on('click', (event) => {
      optionsModal.open();

      event.preventDefault();
      event.stopPropagation();
    });

    actions.append(newGame, hint, options);
  }
}

export default Header;
