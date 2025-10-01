import {
  label as difficultyLabel,
  difficulties,
  toDifficulty,
  Difficulty,
} from '../Game/Difficulty';
import Mode, { label as modeLabel, modes, toMode } from '../Game/Mode';
import { on, t } from '@dom111/element';
import Game from '../Game';
import Modal from './Modal';
import { themes } from '../Game/Theme';
import { h } from '../lib/Element';
import { wordLengths, WordLengths } from '../Game/WordLists';

const hideElement = (el: HTMLElement) => el.setAttribute('hidden', ''),
  showElement = (el: HTMLElement) => el.removeAttribute('hidden');

export interface Options {
  difficulty: Difficulty;
  mode: Mode;
  theme: string;
  wordLengths: WordLengths[];
}

export const defaultOptions: Options = {
  difficulty: Difficulty.EASY,
  mode: Mode.THEMED,
  theme: 'animals',
  wordLengths: wordLengths,
};

export class OptionsModal extends Modal {
  #options: Options = defaultOptions;

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
      wordLengthsSelect = h<HTMLSelectElement>(
        'select#wordLengths[multiple]',
        ...wordLengths.map((wordLength: WordLengths) =>
          h(
            `option[value="${wordLength}"]` +
              (this.#options.wordLengths.includes(wordLength)
                ? '[selected]'
                : ''),
            t(wordLength.toString())
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
      wordLengthsRow = h(
        'fieldset' + (game.mode() !== Mode.THEMED ? '' : '[hidden]'),
        h(
          'label[for="wordLengths"][aria-label="Choose word lengths"]',
          t('Word Lengths')
        ),
        wordLengthsSelect
      ),
      applyButton = h('button', t('Apply'));

    const setMode = (mode: any) => {
        mode = toMode(mode);

        game.setMode(mode);

        this.#options.mode = mode;

        game.setOptions(this.#options);

        if (mode === Mode.THEMED) {
          showElement(difficultyRow);
          showElement(themeRow);
          hideElement(wordLengthsRow);

          return;
        }

        hideElement(difficultyRow);
        hideElement(themeRow);
        showElement(wordLengthsRow);
      },
      setTheme = (theme: string) => {
        game.setTheme(theme);

        this.#options.theme = theme;

        game.setOptions(this.#options);
      },
      setDifficulty = (difficulty: any) => {
        game.setDifficulty(toDifficulty(difficulty));

        this.#options.difficulty = difficulty;

        game.setOptions(this.#options);
      },
      setWordLengths = (wordLengths: WordLengths[]) => {
        game.setLengths(wordLengths);

        this.#options.wordLengths = wordLengths;

        game.setOptions(this.#options);
      };

    on(modeSelect, 'change', () => setMode(modeSelect.value));
    on(themeSelect, 'change', () => setTheme(themeSelect.value));
    on(difficultySelect, 'change', () => setDifficulty(difficultySelect.value));
    on(wordLengthsSelect, 'change', () =>
      setWordLengths(
        [...wordLengthsSelect.options]
          .filter((option) => option.selected)
          .map((option) => parseInt(option.value) as WordLengths)
      )
    );
    on(applyButton, 'click', () => {
      game.start();

      this.close();
    });
    on(this.element().ownerDocument, 'new-game', () => this.remove());

    this.append(
      h(
        'div',
        modeRow,
        themeRow,
        difficultyRow,
        wordLengthsRow,
        h('fieldset', applyButton)
      )
    );
  }
}

export default OptionsModal;
