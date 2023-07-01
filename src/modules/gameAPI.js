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

const saveScore = async () => {
  const name = nameInput.value;
  const score = scoreInput.value;
  const isNotANumber = Number.isNaN(score);

  const isGreaterandLess = score > 0 || score < 0 || score === 0;
  if (name !== '' && !isNotANumber && isGreaterandLess) {
    try {
      const newScore = new Score(name, score);
      const response = await fetch(scoresEndpoint, {
        method: 'POST',
        body: JSON.stringify(newScore),
        headers: {
          'Content-type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      const responseData = await response.json();
      console.log(responseData); // Handle the response data as needed
    } catch (error) {
      console.error('Error:', error.message); // Handle the error
    }
  }

  nameInput.value = '';
  scoreInput.value = '';
};


submitScore.addEventListener('click', saveScore);

export { getGameScores, saveScore };
