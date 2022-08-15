import './style/app.scss';

import Game, { Mode, WordDifficulty } from './Game';
import Guesses from './components/Guesses';
import Header from './components/Header';
import Keyboard from './components/Keyboard';

const game = new Game();

game
  // TODO: display options to configure the game modes
  .init({
    mode: Mode.THEMED,
    difficulty: WordDifficulty.EASY,
    theme: './lists/themes/animals.json',
  })
  .then(() => {
    const header = new Header(game),
      guesses = new Guesses(game),
      keyboard = new Keyboard(guesses, game),
      appContainer = document.getElementById('app');

    appContainer.append(
      header.element(),
      guesses.element(),
      keyboard.element()
    );
  });
