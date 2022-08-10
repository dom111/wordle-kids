import './style/app.scss';

import Guesses from './components/Guesses';
import Header from './components/Header';
import Keyboard from './components/Keyboard';
import Game from "./Game";

const appContainer = document.getElementById('app'),
  header = new Header(),
  guesses = new Guesses(new Game()),
  keyboard = new Keyboard(guesses);

appContainer.append(header.element(), guesses.element(), keyboard.element());
