import Difficulty, {
  label as difficultyLabel,
  difficulties,
} from '../Game/Difficulty';
import Mode, { label as modeLabel, modes } from '../Game/Mode';
import { h, on, t } from './Element';
import Game from '../Game';
import Modal from './Modal';
import { themes } from '../Game/Theme';

const hideElement = (el: HTMLElement) => el.setAttribute('hidden', ''),
  showElement = (el: HTMLElement) => el.removeAttribute('hidden');

export class OptionsModal extends Modal {
  constructor(game: Game) {
    super(h('h2', t('Options')));

    const modeSelect = h<HTMLSelectElement>(
        'select#mode',
        ...modes.map((mode) =>
          h(
            `option[value="${mode}"]` +
              (mode === game.mode() ? '[selected]' : ''),
            t(modeLabel(mode))
          )
        )
      ),
      themeSelect = h<HTMLSelectElement>(
        'select#theme',
        ...themes.map(({ label, path }) =>
          h(
            `option[value="${path}"]` +
              (path === game.theme() ? '[selected]' : ''),
            t(label)
          )
        )
      ),
      difficultySelect = h<HTMLSelectElement>(
        'select#difficulty',
        ...difficulties.map((difficulty) =>
          h(
            `option[value="${difficulty}"]` +
              (difficulty === game.difficulty() ? '[selected]' : ''),
            t(difficultyLabel(difficulty))
          )
        )
      ),
      modeRow = h(
        'fieldset',
        h('label[for="mode"][aria-label="Choose game mode"]', t('Game mode')),
        modeSelect
      ),
      themeRow = h(
        'fieldset',
        h(
          'label[for="mode"][aria-label="Choose theme"]' +
            (game.mode() !== Mode.THEMED ? '[hidden]' : ''),
          t('Theme')
        ),
        themeSelect
      ),
      difficultyRow = h(
        'fieldset',
        h(
          'label[for="difficulty"][aria-label="Choose difficulty"]' +
            (game.mode() !== Mode.THEMED ? '[hidden]' : ''),
          t('Difficulty')
        ),
        difficultySelect
      ),
      applyButton = h('button', t('Apply'));

    const setMode = (mode: Mode) => {
        game.setMode(mode);

        if (mode === Mode.THEMED) {
          showElement(difficultyRow);
          showElement(themeRow);

          return;
        }

        hideElement(difficultyRow);
        hideElement(themeRow);
      },
      setTheme = (theme: string) => game.setTheme(theme),
      setDifficulty = (difficulty: Difficulty) =>
        game.setDifficulty(difficulty);

    on(modeSelect, 'change', () => setMode(parseInt(modeSelect.value) as Mode));
    on(themeSelect, 'change', () => setTheme(themeSelect.value));
    on(difficultySelect, 'change', () =>
      setDifficulty(parseInt(difficultySelect.value) as Difficulty)
    );
    on(applyButton, 'click', () => {
      game.start();

      this.close();
    });

    this.append(
      h('div', modeRow, themeRow, difficultyRow, h('fieldset', applyButton))
    );
  }
}

export default OptionsModal;
