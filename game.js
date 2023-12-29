const buttons = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];
let level = 0;
let expectedButton = 0;
let started = false;
let bgm;

$(document).ready(function() {
    $('#start-button').click(function() {
        $(this).animate({
            height: '-=2px',
            width: '-=5px'
        }, 100);
        setTimeout(function() {
            $('#start-button').animate({
                height: '+=2px',
                width: '+=5px'
            }, 100)
        }, 100)
        if(!started){
            startGame();
            $(this).text('RESTART');
            $(this).css('backgroundColor', 'grey');
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
    function startGame(){
        started = true;
        expectedButton = 0;
        $('body').css('backgroundColor', 'lightGreen');
        playSound('complete');
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
        playSound('wrong');
        $('body').css('backgroundColor', 'red');
        $('#level-title').text('GAME OVER, RESTART GAME !');
        setTimeout(function(){
            $('body').css('backgroundColor', '#011F3F');
        }, 200);
        $('#start-button').css('backgroundColor', 'red');
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
