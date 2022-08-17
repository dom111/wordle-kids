import './style/app.scss';

import Difficulty from './Game/Difficulty';
import Game from './Game';
import Guesses from './components/Guesses';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Mode from './Game/Mode';
import { empty } from './components/Element';
import { wordLengths } from './Game/WordLists';

const game = new Game(() => {
  const header = new Header(game),
    guesses = new Guesses(game),
    keyboard = new Keyboard(guesses, game),
    appContainer = document.getElementById('app');

  empty(appContainer);

  appContainer.append(header.element(), guesses.element(), keyboard.element());
});

game.setDifficulty(Difficulty.EASY);
game.setLengths(wordLengths);
game.setMode(Mode.THEMED);
game.setTheme('./lists/themes/animals.json');
game.start();
