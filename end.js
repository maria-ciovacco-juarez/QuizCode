const username = document.querySelector("#username");
const saveScoreBtn = document.querySelector("#saveScoreBtn");
const finalScore = document.querySelector("#finalScore");
const mostRecentScore = document.querySelector("#mostRecentScore");

const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

const maxHighScores = 5;

finalScore.textContent = mostRecentScore.textContent;

username.addEventListener('keyup', () => {
  saveScoreBtn.disabled = !username.value;
});

const saveHighScore = e => {
  e.preventDefault();
  const score = {
    score: mostRecentScore.textContent,
    name: username.value
  };

  highScores.push(score);

  highScores.sort((a, b) => {
    return b.score - a.score;
  });

  highScores.splice(maxHighScores);

  localStorage.setItem('highScores', JSON.stringify(highScores));
  window.location.href = '/highscores.html';
};
