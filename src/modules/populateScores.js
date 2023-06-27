import { scoreList } from './scoreObject.js';
import { getGameScores } from './gameAPI.js';

const populateScores = async () => {
  const scores = await getGameScores();
  scoreList.innerHTML = '';
  scores.forEach((score) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${score.user}: ${score.score}`;
    scoreList.appendChild(listItem);
  });
};

export default populateScores;
