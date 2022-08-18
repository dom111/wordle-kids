import Difficulty, {
  label as difficultyLabel,
  difficulties,
  toDifficulty,
} from '../Game/Difficulty';
import Mode, { label as modeLabel, modes, toMode } from '../Game/Mode';
import { h, on, t } from './Element';
import Game from '../Game';
import Modal from './Modal';
import { themes } from '../Game/Theme';

const hideElement = (el: HTMLElement) => el.setAttribute('hidden', ''),
  showElement = (el: HTMLElement) => el.removeAttribute('hidden');

export class OptionsModal extends Modal {
  constructor(game: Game) {
    super(h('h2', t('Options')));

    this.addClass('options');
    this.setLabel('Options dialog. Close with Escape key');

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
        'fieldset' + (game.mode() !== Mode.THEMED ? '[hidden]' : ''),
        h('label[for="mode"][aria-label="Choose theme"]', t('Theme')),
        themeSelect
      ),
      difficultyRow = h(
        'fieldset' + (game.mode() !== Mode.THEMED ? '[hidden]' : ''),
        h(
          'label[for="difficulty"][aria-label="Choose difficulty"]',
          t('Difficulty')
        ),
        difficultySelect
      ),
      applyButton = h('button', t('Apply'));

    const setMode = (mode: any) => {
        mode = toMode(mode);

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
      setDifficulty = (difficulty: any) =>
        game.setDifficulty(toDifficulty(difficulty));

    on(modeSelect, 'change', () => setMode(modeSelect.value));
    on(themeSelect, 'change', () => setTheme(themeSelect.value));
    on(difficultySelect, 'change', () => setDifficulty(difficultySelect.value));
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
