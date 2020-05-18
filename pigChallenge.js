/*
YOUR 3 CHALLENGES
Change the game to follow these rules:

1. A player looses his ENTIRE score when he rolls two 6 in a row. After that, it's the next player's turn. (Hint: Always save the previous dice roll in a separate variable)
2. Add an input field to the HTML where players can set the winning score, 
so that they can change the predefined score of 100. (Hint: you can read that value with the .value property in JavaScript. 
This is a good oportunity to use google to figure this out :)
3. Add another dice to the game, so that there are two dices now. The player looses his current score when one of them is a 1. 
(Hint: you will need CSS to position the second dice, so take a look at the CSS code for the first one.)
*/




var scores, roundScore, activePlayer, gamePlaying, previousDiceRoll, count, setScore, winningScore;

hideDice();
init();



document.querySelector('.btn-roll').addEventListener('click', function() {
if(gamePlaying) {
//1. Random number
 var dice = Math.floor(Math.random() * 6) + 1;
 var dice2 = Math.floor(Math.random() * 6) + 1;

//2. Display the result
var diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'block';
diceDOM.src = 'dice-' + dice + '.png';

var diceDOM2 =document.querySelector('.dice2');
diceDOM2.style.display = 'block';
diceDOM2.src = 'dice-' + dice2 + '.png';

//IF two sixes in a row are rolled, next player's turn
if(dice === 6 || dice2 === 6){
  previousDiceRoll = 6;
  count += 1;
} else {
  previousDiceRoll = 0;
  count = 0;
}
//Player loses ENTIRE score
if(dice === 6 && previousDiceRoll === 6 && count === 2 || dice2 === 6 && previousDiceRoll === 6 && count === 2){
  scores[activePlayer] = 0;
  document.querySelector('#score-' + activePlayer).textContent = '0';
  nextPlayer();
}



  

//3. Update the round score IF 1 is not rolled
  if (dice !== 1 && dice2 !== 1) {
    //Add score
    roundScore += (dice + dice2);
    document.querySelector('#current-' + activePlayer).textContent = roundScore;
  } else {
    //Next Player
    nextPlayer();
  }

}

});


document.querySelector('.btn-hold').addEventListener('click', function() {
  if (gamePlaying) {
// Add CURRENT score to GLOBAL score
scores[activePlayer] += roundScore;

// Update the UI
document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

//Set the winning score
setScore = document.getElementById('input-score').value;

//Undefined, 0, null or "" are COERCED to false
//ANything else is COERCED to true
if(setScore) {
    winningScore = setScore;
} else {
    winningScore = 100;
}


//Check if player won the game
if (scores[activePlayer] >= winningScore) {
    document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
    hideDice();
    //document.querySelector('.dice').style.display = 'none';
    //document.querySelector('.dice2').style.display = 'none';
    document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
    gamePlaying = false;
} else {
    //Next player
    nextPlayer();  
}
  }  
  
}); 

//hide dice
function hideDice() {
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.dice2').style.display = 'none';
  } 

function nextPlayer() {
  //Next Player
  activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
  roundScore = 0;
  previousDiceRoll = 0;

  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');
  //document.querySelector('.dice').style.display = 'none';
  //document.querySelector('.dice2').style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);

function init() {
    scores = [0, 0];
    activePlayer = 0;
    roundScore = 0;
    previousDiceRoll = 0;
    count = 0;
    gamePlaying = true;
    
    //document.querySelector('.dice').style.display = 'none';
    //document.querySelector('.dice2').style.display = 'none';


    document.getElementById('score-0').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
    
}


































