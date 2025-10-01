import './style/app.scss';

import Game from './Game';
import Guesses from './components/Guesses';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import { empty } from '@dom111/element';

const game = new Game(() => {
  const header = new Header(game),
    guesses = new Guesses(game),
    keyboard = new Keyboard(guesses, game),
    appContainer = document.getElementById('app');

  empty(appContainer);

  appContainer.append(header.element(), guesses.element(), keyboard.element());
});

const options = game.getOptions();

game.setDifficulty(options.difficulty);
game.setLengths(options.wordLengths);
game.setMode(options.mode);
game.setTheme(options.theme);
game.start();
