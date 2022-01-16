

var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [] , userClickedPattern = [];

//keep track of whether if the game has started or not, so you only call nextSequence() on the first keypress.
var started = false;

//start at level 0.
var level = 0;

//generate a new random number between 0 and 3

$(document).keypress(function()
{
    //Use jQuery to detect when a keyboard key has been pressed, when that happens for the first time, call nextSequence().
    if(!started){
        //The h1 title starts out saying "Press A Key to Start", when the game has started, change this to say "Level 0".
        $("#level-title").text("Level "+(level));
        nextSequence();
        started = true;
    }
});

function nextSequence()
{
    //Once nextSequence() is triggered, reset the userClickedPattern to an empty array ready for the next level.
    userClickedPattern = [];

    level++;
    $("#level-title").text("level "+(level));

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}


//to detect when any of the buttons are clicked and trigger a handler function

$(".btn").click(function()
{
    //alert(this.id);
    var userChosenColour = this.id;             //another way var userChosenColour =  $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    //console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePass(userChosenColour);

    //Call checkAnswer() after a user has clicked and chosen their answer, passing in the index of the last answer in the user's sequence.
    checkAnswer(userClickedPattern.length-1);      
});

function playSound(name)
{
    var music = new Audio('sounds/'+name+'.mp3');
    music.play();
}


function animatePass(currentColour)
{
    var self = $("#"+currentColour);
    self.addClass("pressed");
    setTimeout(function () {
        self.removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel)
{
    // Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel])
    {
        console.log("Successs");
        //If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement
        if(userClickedPattern.length == gamePattern.length){
            //Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        console.log("Wrong");

        //wrong.mp3, play this sound if the user got one of the answers wrong.
        playSound("wrong");

        //In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
        
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        $("#level-title").text("Game Over, Press Any Key to Restart");

        //if the user gets the sequence wrong, restart the game.
        startOver();
    }
}


//Restart the Game
function startOver()
{
    level = 0;
    started = false;
    gamePattern = [];
}