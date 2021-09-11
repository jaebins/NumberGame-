var moveDelayThread = null;
var gameScreenSizeX = window.innerWidth - 100;
var gameScreenSizeY = window.innerHeight - 100;

var canvas = null;// html 캔버스 요소
var gameScreen = null; // 게임 화면 가져오기 (캔버스) 
var lifeLabel = null // 목숨 라벨
var scoreLabel = null // 점수 라벨

var interval = 20;
var obsX = 0; // 숫자 위치 X
var obsY = gameScreenSizeY / 3; // 숫자 위치 Y
var randomNumber = 0; // 숫자 값

var speed = 0; // 플레이어 스피드
var isSuccess = false; // 성공 했는지에 대한 여부
var score = 0;
var life = 5;

function gameStart(diff){
    lifeLabel = document.getElementById('life');
    scoreLabel = document.getElementById('score');

    randomNumber = Math.floor(Math.random() * 10); //랜덤 수 생성

    $("#title").hide(); // UI 숨기기
    $('#buts').hide();
    $("#resultLabel").remove();
    lifeLabel.innerText = "목숨 : " + life;

    makeScreen(); // 게임화면 생성

    // 난이도 설정
    if(diff == 1){
        speed = 20;
    }
    else if(diff == 2){
        speed = 30;
    }
    else if(diff == 3){
        speed = 40;
    }

    moveNumber(); // 숫자 생성
}

function makeScreen(){
    var screen = document.getElementById('screen');

    canvas = document.createElement('canvas');
    canvas.setAttribute('id', "gameScreen");
    canvas.setAttribute("width", gameScreenSizeX);
    canvas.setAttribute("height", gameScreenSizeY);
    // canvas.setAttribute("style", "border: 1px solid gray;");
    screen.appendChild(canvas);

    gameScreen = canvas.getContext('2d');
}

function moveNumber(){
    moveDelayThread = setInterval(makeNumber, interval);
}

function makeNumber(){
    gameScreen.clearRect(0, 0, canvas.width, canvas.height); // 게임 화면 초기화
    getNumber(randomNumber); // 숫자 생성

    obsX += speed; // x축 증가

    if(isSuccess){
        resetNumber();

        isSuccess = false;
    }
    else if(obsX >= gameScreenSizeX - 50){
        resetNumber();

        life--;
        lifeLabel.innerText = "목숨 : " + life;
        if(life <= 0){
            gameOver();
        }
    }
}

function resetNumber(){
    obsX = 0;
    randomNumber = Math.floor(Math.random() * 10); // 랜덤 정수 생성
    gameScreen.clearRect(0, 0, canvas.width, canvas.height); // 게임 화면 초기화
}

function getNumber(number){
    var spriteY = 0;

    if(number > 5){
        number -= 5;
        spriteY = 110;
    }

    var img = new Image();
    img.src = "Images/numbers.png";
    img.onload = function(){
        gameScreen.drawImage(img, 105 * number, spriteY, 105, 100, obsX, obsY, 105, 100);
    };
}

function gameOver(){
    clearInterval(moveDelayThread);

    $('#buts').show();
    canvas = document.querySelector('#gameScreen');
    canvas.parentNode.removeChild(canvas);

    var resultScreen = document.getElementById('result');
    var resultLabel = document.createElement('div');
    resultLabel.setAttribute("id", "resultLabel");
    resultLabel.innerText = "-----------------" + score + "점" + "-----------------";
    resultScreen.appendChild(resultLabel);

    restSetting();
}

function restSetting(){     
    moveDelayThread = null;

    canvas = null;// html 캔버스 요소
    gameScreen = null; // 게임 화면 가져오기 (캔버스) 

    obsX = 0; // 숫자 위치 X
    randomNumber = 0; // 숫자 값

    diff = 0;
    speed = 0; // 플레이어 스피드
    isSuccess = false; // 성공 했는지에 대한 여부
    score = 0;
    life = 5;

    scoreLabel.innerText = "점수 : " + score;
    lifeLabel.innerText = "목숨 : " + life;
}

window.addEventListener("keydown", (e) =>{
    // 숫자 입력할 이벤트
    if(e.key == randomNumber && !isSuccess){
        score++;
        scoreLabel.innerText = "점수 : " + score;
        gameScreen.clearRect(0, 0, canvas.width, canvas.height);
        isSuccess = true;
    }
});

$(window).resize(function(){
    gameScreenSizeX = window.innerWidth - 100;
    gameScreenSizeY = window.innerHeight - 100;
    obsY = gameScreenSizeY / 3;
});