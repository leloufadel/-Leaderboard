import { nameInput, scoreInput, submitScore } from './domElements.js';

const myGameId = 'L0iNoCmhdpl';
const baseAPIUrl = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/';
const scoresEndpoint = `${`${baseAPIUrl}games/${myGameId}/scores/`}`;

class Score {
  constructor(name, score) {
    this.user = name;
    this.score = score;
  }
}

const getGameScores = async () => {
  const response = await fetch(scoresEndpoint);
  const data = await response.json();
  const myResponses = data.result;
  return myResponses;
};

const sendScore = async () => {
  const name = nameInput.value;
  const score = scoreInput.value;
  const isNotANumber = Number.isNaN(score);

  const isGreaterLess = score > 0 || score < 0 || score === 0;
  if (name !== '' && !isNotANumber && isGreaterLess) {
    const newScore = new Score(name, score);
    await fetch(scoresEndpoint, {
      method: 'POST',
      body: JSON.stringify(newScore),
      headers: {
        'Content-type': 'application/json',
      },
    })
      .then((response) => { response.json(); });
  }

  nameInput.value = '';
  scoreInput.value = '';
};

submitScore.addEventListener('click', sendScore);

export { getGameScores, sendScore };
