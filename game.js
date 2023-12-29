const buttons = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let level = 0;
let expectedButton = 0;
let started = false;
let bgm;
let highScore = 0;

function saveHighScore() {
    localStorage.setItem("HighScore", highScore);
}
function getHighScore(){
    return localStorage.getItem('HighScore');
    console.log(`getHighScore()->${localStorage.getItem('HighScore')}`)
}
function resetHighScore(){
    localStorage.setItem('HighScore', 0);
    highScore = getHighScore();
    console.log(`New HighScore: ${highScore}`);
}
function startGame(){
    if(level > highScore){
        highScore = level;
        saveHighScore();
        console.log('New High Score: ',highScore);
        $('#high-score span').text(highScore);
    }
    started = true;
    expectedButton = 0;
    $('body').css('backgroundColor', 'rgb(22, 222, 22)');
    playSound('complete');
    5
    setTimeout(function(){
        $('body').css('backgroundColor', '#011F3F');
    }, 100);
    setTimeout(nextSequence, 1500);
    console.log(`Game Started !`);
    $('#level-title').text('Level '+ level);
    
}
function endGame(){
    started = false;
    level = 0;
    expectedButton = 0;
    gamePattern = [];
    console.log('Game Ended !');
    playSound('wrong');
    $('body').css('backgroundColor', 'red');
    $('#level-title').text('GAME OVER, RESTART GAME !');
    setTimeout(function(){
        $('body').css('backgroundColor', '#011F3F');
    }, 200);
    $('#start-button').css('backgroundColor', 'red');
    $('#start-button').css('cursor', 'pointer');
}
function checkInput(pressedButton){
    if(pressedButton === gamePattern[expectedButton]){
        expectedButton++;
        if(expectedButton == gamePattern.length)
            startGame();
        return true;
    }else
        endGame();
    return false;
}
function press(button) {
    $('#' + button).addClass('pressed');
    playSound(button);
    setTimeout(() => {
        $('#' + button).removeClass('pressed');
    }, 100);
}
function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function nextSequence() {
    level++;
    console.log(highScore);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomColor = buttons[randomNumber];
    gamePattern.push(randomColor);
    press(randomColor);
}
function blinkById(elementId){
    let element = $('#'+elementId);
    let blinkInterval = setInterval(function(){
        element.css('visibility', 'hidden');
        setTimeout(function(){
            element.css('visibility', 'visible');
        }, 500)
    }, 500);
    setTimeout(function(){
        clearInterval(blinkInterval);
    },  3000);
}

$(document).ready(function() {

    highScore = getHighScore();
    $('#high-score span').text(highScore);

    $('#start-button').click(function() {
        $('.clickable').animate({
            height: '-=2px',
            width: '-=5px'
        }, 100);
        setTimeout(function() {
            $('.clickable').animate({
                height: '+=2px',
                width: '+=5px'
            }, 100)
        }, 100)
        if(!started){
            startGame();
            $(this).text('RESTART');
            $(this).css('backgroundColor', 'grey');
            $(this).css('cursor', 'auto');
            $(this).removeClass('pointer');

        }
    });
    $('.btn').click(function(){
        let clickedButton = $(this).attr('id');
        if(started){
            if(checkInput(clickedButton)) {
                press(clickedButton);
            }
        }
    })
    
    
})
