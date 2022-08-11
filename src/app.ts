import './style/app.scss';

import Guesses from './components/Guesses';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Game from './Game';

const game = new Game();

game.init().then(() => {
  const header = new Header(),
    guesses = new Guesses(game),
    keyboard = new Keyboard(guesses, game),
    appContainer = document.getElementById('app');

  appContainer.append(header.element(), guesses.element(), keyboard.element());
});
