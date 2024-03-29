import './style.css';
import { refresh, submitScore } from './modules/domElements.js';
import { saveScore } from './modules/gameAPI.js';
import populateScores from './modules/populateScores.js';

refresh.addEventListener('click', populateScores);
submitScore.addEventListener('click', saveScore);

(populateScores());