// Масив кнопок який до якого ми звернемося
let buttonColors = ["red", "blue", "green", "yellow"]; 
// Масив в який ми заносимо вибрані кнопки при рандомі
let gamePattern = [];
// Масив для кнопок які ми натиснули
let userClickedPattern = [];

// Виявлення кнопок які були натиснуті
$(".btn").click(function() {
  let userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
  // console.log(userClickedPattern);
});

// Виявляємо чи натиснуто кнопку на клавіатурі там запускаємо функцію
var started = false;
var level = 0;
$(document).keydown(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});



function nextSequence(){
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);

  //  Вибираємо рандомне число від 0-3
  let randomNumber = Math.floor(Math.random() * 4);  
  // randomChosenColour заповнюється рандомними назвами кнопок
  let randomChosenColour = buttonColors[randomNumber];
  // заповнюємо масив вже згенерованимим кнопками
    gamePattern.push(randomChosenColour);
// Вибираємо кнопки з правильним індифікатором
$("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
playSound(randomChosenColour);
animatePress(randomChosenColour);
}

function playSound(name) {
  let audio = new Audio("sounds/" + name + ".mp3");
audio.play();
}

function animatePress(currentColour){
 $("#"+ currentColour).addClass("pressed");
 setTimeout(() => {
  $("#"+ currentColour).removeClass("pressed");
}, 100);
}




function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

      setTimeout(function () {
        nextSequence();
      }, 1000);

    }

  } else {
    
    $("#level-title").text("Game Over, Press Any Key to Restart");
playSound("wrong");
$("body").addClass("game-over")
setTimeout(()=>{
  $("body").removeClass("game-over")
},300)

    console.log("wrong");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
