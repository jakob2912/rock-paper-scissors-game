let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElem();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  });


document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    showResetConfirmation();
  });

let isAutoplaying = false;
let intervalID;

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElem();
}

function autoPlay() {
  if (!isAutoplaying) {
    document.querySelector('.js-autoPlay-button')
      .innerText = 'Stop Playing';
    intervalID = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    },1000);
    isAutoplaying = true;
  } else {
    document.querySelector('.js-autoPlay-button')
      .innerText = 'Auto Play';
    clearInterval(intervalID);
    isAutoplaying = false;
  }
}

document.querySelector('.js-autoPlay-button')
  .addEventListener('click', () => {
    autoPlay();
  });


function pickComputerMove() {
  let computerMove = '';
  const randomNumber = Math.random();

  if (randomNumber >= 0 && randomNumber <1/3){
    computerMove = ('rock');
  } else if (randomNumber >= 1/3 && randomNumber < 2/3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2/3 && randomNumber <1){
    computerMove = 'scissors';
  } 
  return computerMove;
}

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('rock');
  } else if (event.key === 'p'){
    playGame('paper');
  } else if (event.key === 's') {
    playGame('scissors');
  } else if (event.key === 'a') {
    autoPlay();
  } else if (event.key === 'Backspace') {
    showResetConfirmation();
  }
})

function showResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = `Are you sure you want to reset the score? <button class = 'js-yes-confirmation confirm-button'>Yes</button><button class = 'js-no-confirmation confirm-button'>No</button>`


  document.querySelector('.js-yes-confirmation')
  .addEventListener('click', () => {
    resetScore();
    hideResetConfirmation();
  });

  document.querySelector('.js-no-confirmation')
  .addEventListener('click', () => {
    hideResetConfirmation();
  });
}
  
  

function hideResetConfirmation() {
  document.querySelector('.js-reset-confirmation')
    .innerHTML = '';
}


       
function playGame(playerMove) {
  
  const computerMove = pickComputerMove();

  let result = '';


  if (playerMove === 'scissors') {
    if(computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper'){
      result = 'You win.'
    } else if (computerMove === 'scissors') {
      result = 'Tie.'
    }

  } else if (playerMove === 'paper'){
    if(computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper'){
      result = 'Tie.'
    } else if (computerMove === 'scissors') {
      result = 'You lose.'
    }
    
  } else if (playerMove === 'rock' ){
    if(computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper'){
      result = 'You lose.'
    } else if (computerMove === 'scissors') {
      result = 'You win.'
    }
    
  }
  if (result === 'You win.') {
    score.wins ++;
  } else if (result === 'Tie.') {
    score.ties ++;
  } else if (result === 'You lose.') {
    score.losses++;
  }
  localStorage.setItem('score', JSON.stringify(score));

  updateScoreElem();

  document.querySelector('.js-result').innerHTML = result;

  document.querySelector('.js-moves').innerHTML = `You: <img src="images/${playerMove}-emoji.png" class= "move-icon"> 
  <img src="images/${computerMove}-emoji.png" class="move-icon"> Computer`;

}

function updateScoreElem() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`
}