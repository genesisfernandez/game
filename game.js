
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(".btn").click(function(){

   var userChosenColour = $(this).attr("id");
   userClickedPattern.push(userChosenColour);

   
   checkAnswer(userClickedPattern.length-1);

   playSound(userChosenColour);

   animatePress(userChosenColour);

   

});

$(document).keypress(function(){

   if(!started){
      $("#level-title").text("Level " + level);
      nextSequence();
      started = true;
   }

});



function nextSequence() {

   userClickedPattern.length = 0;

   level++;
   $("#level-title").text("Level " + level);

   var randomNumber = Math.floor(Math.random()*4);
   var randomChosenColour = buttonColours[randomNumber];
   gamePattern.push(randomChosenColour);

   $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

   playSound(randomChosenColour);


}

function playSound(name) {
   var audio1 = new Audio("sounds/" + name + ".mp3");
   audio1.play();

}



function animatePress(currentColour) {
   $("#" + currentColour).addClass("pressed");

   setTimeout(function() {
      $("#" + currentColour).removeClass("pressed");
  }, 100);
   
}

function checkAnswer(currentLevel) {

   if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
      console.log("Success");

      if (gamePattern.length === userClickedPattern.length){

         setTimeout(function() { nextSequence(); }, 1000);
         
      }
   }
   else {
      console.log("Wrong");

      $("body").addClass("game-over");

      setTimeout(function() {
      $("body").removeClass("game-over");
      }, 200);

      $("#level-title").text("Game Over, Press Any Key to Restart");

      playSound("wrong");

      startOver();
   }

 
}

function startOver() {

   

   setTimeout(function(){ 
      level = 0;
      gamePattern = [];
      started = false;
   },2000);
   
  
}


