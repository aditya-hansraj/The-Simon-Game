const buttons = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let level = 0;
let expectedButton = 0;
let started = false;
let bgm;

$(document).ready(function() {
    $(document).keydown(function() {
        if(!started){
            startGame();
        }
    })
    $('.btn').click(function(){
        let clickedButton = $(this).attr('id');
        if(started){
            if(checkInput(clickedButton)) {
                press(clickedButton);
            }
        }
    })
    function startGame(){
        started = true;
        expectedButton = 0;
        setTimeout(nextSequence, 1500);
        console.log(`Game Started !`);
        $('#level-title').text('Level '+ level);
    }
    function endGame(){
        started = false;
        level = 0;
        expectedButton = 0;
        gamePattern = [];
        playSound('wrong');
        $('body').css('backgroundColor', 'red');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        setTimeout(function(){
            $('body').css('backgroundColor', '#011F3F');
        }, 200);
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
        var randomNumber = Math.floor(Math.random() * 4);
        var randomColor = buttons[randomNumber];
        gamePattern.push(randomColor);
        press(randomColor);
    }
})