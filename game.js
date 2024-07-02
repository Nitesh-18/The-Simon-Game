var started = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

// Get all buttons and add event listeners
var buttons = document.querySelectorAll('.btn');
buttons.forEach(function(button) {
  button.addEventListener('click', function() {
    var userChosenColour = button.id;
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    var size = userClickedPattern.length;
    checkAnswer(size - 1);
  });
});

// Add event listener to document for keydown
document.addEventListener('keydown', function() {
  if (!started) {
    document.getElementById('level-title').textContent = "Level 0";
    nextSequence();
    started = true;
  }
});

function checkAnswer(currentLevel) {
  if (
    currentLevel < gamePattern.length &&
    gamePattern[currentLevel] === userClickedPattern[currentLevel]
  ) {
    // console.log("Success");
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    // console.log("Fail...");
    var audio = new Audio("./sounds/wrong.mp3");
    audio.play();

    document.body.classList.add("game-over");
    setTimeout(function() {
      document.body.classList.remove("game-over");
    }, 200);
    document.querySelector('h1').textContent = "Game Over, Press Any Key to Restart";

    startOver();
  }
}

function nextSequence() {
  userClickedPattern = [];
  level = level + 1;
  document.getElementById('level-title').textContent = "Level " + level;

  var randomNumber = Math.random();
  randomNumber = randomNumber * 4;
  randomNumber = Math.floor(randomNumber);

  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  var button = document.getElementById(randomChosenColour);
  button.classList.add('fadeIn');
  setTimeout(function() {
    button.classList.remove('fadeIn');
  }, 100);
  playSound(randomChosenColour);
}

function playSound(name) {
  var audio = new Audio("./sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  var button = document.getElementById(currentColour);
  button.classList.add('pressed');

  setTimeout(function() {
    button.classList.remove('pressed');
  }, 100);
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  started = false;
}