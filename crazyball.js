
//시작 버튼누르고, 선택된 이미지들은 game func에 바로 전달하기
/*
window.onload = function() {
    document.getElementById('mainMenu').style.display = 'block'; 
}
*/
var startAudio = new Audio('bgm/intro.mp3');
var buttonPush = new Audio('bgm/button_push.mp3');
var easyBgm = new Audio('bgm/easy.mp3');
var normalBgm = new Audio('bgm/normal.mp3');
var hardBgm = new Audio('bgm/hard.mp3');

var selectedList = [];

//몬스터(위치 관련)
var canvas;
var ctx;
var brickRowCount = 5; //벽돌 줄 수
var brickColumnCount = 0;
var brickWidth = 100; // 벽돌의 너비
var brickHeight = 110; // 벽돌의 높이
var brickPadding = 10; //벽돌 간의 간격
//var brickOffsetLeft;
var brickOffsetTop = 4; //화면 위에서 떨어진 간격
var brickXIncrement = 0.5; // 벽돌이 왼쪽으로 이동하는 속도
var bricks = [];
//몬스터(이미지)
var imgs = [];
for(let i = 0; i < 6; i++) {
    imgs[i] = new Image();
    imgs[i].src = "./images/mon"+(i+1)+".png";
}
//몬스터(정보 관련)
var monsters = [];
monsters[0] = {m_img: imgs[0], m_width:50, m_height:55, m_status: 1};
monsters[1] = {m_img: imgs[1], m_width:50, m_height:55, m_status: 1};
monsters[2] = {m_img: imgs[2], m_width:100, m_height:110, m_status: 3};
monsters[3] = {m_img: imgs[3], m_width:50, m_height:55, m_status: 1};
monsters[4] = {m_img: imgs[4], m_width:50, m_height:55, m_status: 1};
monsters[5] = {m_img: imgs[5], m_width:75, m_height:83, m_status: 2};

//공 관련
//공 관련
var ballRadius = 10;
var ballX = 10;
var ballY = 250;
var ballDX = 2;
var ballDY = -2;


//timer
var timer

const stopAudio = () => {
    track.pause(); // 오디오정지
    track.currentTime = 0; // 오디오 재생시간을 0으로 변경
    iconAnimation("stop"); // 정지 상태로 스타일 변경하는 함수
}


//뒤로 돌아가기 버튼
function shiftMain(){
    hideAllSections();
    document.getElementById('mainMenu').style.display = 'block';
    buttonPush.play();
}
function hideAllSections() {
    document.getElementById('start').style.display = 'none';
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('chooseLevel').style.display = 'none';
    document.getElementById('bgStory').style.display = 'none';
    document.getElementById('itemSettings').style.display = 'none';
    document.getElementById('introSection').style.display = 'none';
}



$(document).ready(function () {
    $("#start").click(function(){
        startAudio.play();
    });
    $("#mainBtn1").mouseover(function(){
        $(this).attr("src","images/start2.png");
    });
    $("#mainBtn1").mouseout(function(){
        $(this).attr("src","images/start1.png");
    });

    $("#mainBtn2").mouseover(function(){
        $(this).attr("src","images/guide2.png");
    });
    $("#mainBtn2").mouseout(function(){
        $(this).attr("src","images/guide1.png");
    });

    $("#mainBtn3").mouseover(function(){
        $(this).attr("src","images/setting2.png");
    });
    $("#mainBtn3").mouseout(function(){
        $(this).attr("src","images/setting1.png");
    });

    $("#introBtn").mouseover(function(){
        $(this).attr("src","images/back2.png");
    });
    $("#introBtn").mouseout(function(){
        $(this).attr("src","images/back1.png");
    });

    $("#optionBtn1").mouseover(function(){
        $(this).attr("src","images/save2.png");
    });
    $("#optionBtn1").mouseout(function(){
        $(this).attr("src","images/save1.png");
    });

    $("#optionBtn2").mouseover(function(){
        $(this).attr("src","images/back2.png");
    });
    $("#optionBtn2").mouseout(function(){
        $(this).attr("src","images/back1.png");
    });

    $("#backBtn").mouseover(function(){
        $(this).attr("src","images/back4.png");
    });
    $("#backBtn").mouseout(function(){
        $(this).attr("src","images/back3.png");
    });



    $("#easy").mouseover(function(){
        $(this).attr("src","images/easy2.png");
    });
    $("#easy").mouseout(function(){
        $(this).attr("src","images/easy1.png");
    });
    $("#normal").mouseover(function(){
        $(this).attr("src","images/normal2.png");
    });
    $("#normal").mouseout(function(){
        $(this).attr("src","images/normal1.png");
    });
    $("#hard").mouseover(function(){
        $(this).attr("src","images/hard2.png");
    });
    $("#hard").mouseout(function(){
        $(this).attr("src","images/hard1.png");
    });

    //몬스터
    canvas = document.querySelector(".game-area1");
    ctx = canvas.getContext('2d');
    //brickOffsetLeft = canvas.width;

    ballX = 10;
    ballY = 250;
    characterY = (canvas.height - characterHeight) / 2;
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    requestAnimationFrame(loopGame);

});




//물풍선 생성
function drawBalloon(){
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2,true);
    ctx.fillStyle = "red";
    ctx.fill();
}

//캐릭터 움직임(키보드 입력)
var upBtn = false;
var downBtn = false;
var characterHeight = 80;
var characterWidth = 10;
var characterX = 0;
var characterY = (canvas.height - characterHeight) / 2;



function keyDownHandler(e) {
    if (e.key == 38 || e.key == "ArrowUp") {
        upBtn = true;
    } else if (e.key == 40 || e.key == "ArrowDown") {
        downBtn = true;
    }
}

function keyUpHandler(e) {
    if (e.key == 38 || e.key == "ArrowUp") {
        upBtn = false;
    } else if (e.key == 40 || e.key == "ArrowDown") {
        downBtn = false;
    }
}

function drawCharacter() {
    if(upBtn && characterY > 0) {
        characterY -= 7;
    } else if(downBtn && characterY < canvas.height - characterHeight) {
        characterY += 7;
    }
    ctx.beginPath();
    ctx.rect(characterX, characterY, characterWidth, characterHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}



//게임 시작
function gameStart(){
    hideAllSections();
    document.getElementById('mainMenu').style.display = 'block';
}

//시작 버튼
function showStart(){
    buttonPush.play();
    hideAllSections();
    document.getElementById('bgStory').style.display = 'block';
}

//설명 버튼
function introGame(){
    buttonPush.play();
    hideAllSections();
    document.getElementById('introSection').style.display = 'block';
}

//설정 버튼
function showSettings(){
    buttonPush.play();
    hideAllSections();
    document.getElementById('itemSettings').style.display = 'block';
}

//skip button
function skipFunc(){
    buttonPush.play();
    hideAllSections();
    document.getElementById('chooseLevel').style.display = 'block';
}
//저장 버튼
function dataStore(){  //array만들어서 맵,캐릭터,물풍선 저장하는거 만들면 될듯
    //라디오 버튼에서 선택한 value가져옴

    const selectedMap = document.querySelector('input[name="map"]:checked').previousElementSibling.src;
    const selectedBall = document.querySelector('input[name="ball"]:checked').previousElementSibling.src;
    const selectedChar = document.querySelector('input[name="char"]:checked').previousElementSibling.src;
    selectedList = [selectedMap, selectedBall, selectedChar];
    shiftMain();
    
}



function gameLevel(i){
    if (i =='1') {
        buttonPush.play();
        hideAllSections();
        document.getElementById('easyLevel').style.display = 'block';
        //document.getElementById('gameArea1').style.backgroundImage = `url(${selectedList[0]})`;
        //document.getElementById('gameCharacter1').src = selectedList[2];
        startAudio.pause();
        easyBgm.play();
        makebricks();
        // 3초마다 새로운 벽돌을 추가
        addNewBricks();
        setInterval(addNewBricks, 3000);
        timer = setInterval(draw,10);
    } else if (i =='2') {
        buttonPush.play();
        hideAllSections();
        document.getElementById('normalLevel').style.display = 'block';
        document.getElementById('gameArea2').style.backgroundImage = `url(${selectedList[0]})`;
        document.getElementById('gameCharacter2').src = selectedList[2];
        startAudio.pause();
        normalBgm.play();
    } else {
        buttonPush.play();
        hideAllSections();
        document.getElementById('hardLevel').style.display = 'block';
        document.getElementById('gameArea2').style.backgroundImage = `url(${selectedList[0]})`;
        document.getElementById('gameCharacter2').src = selectedList[2];
        startAudio.pause();
        hardBgm.play();
    }
}
//첫 벽돌 생성(생성만 그리기X)
function makebricks() {
    for (let r = 0; r < brickRowCount; r++) {
        bricks[r] = [];
    }
}
//벽돌 그리기
function drawBricks() {
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < bricks[r].length; c++) {
            if (bricks[r][c].status >= 1) {
                var brickX = bricks[r][c].x;
                var brickY = bricks[r][c].y;
                var monster = bricks[r][c].type;
                console.log(monster.m_img);
                bricks[r][c].x -= brickXIncrement; // 벽돌을 왼쪽으로 이동
                ctx.drawImage(monster.m_img, brickX, brickY - monster.m_height / 2, monster.m_width, monster.m_height);
            }
        }
    }
}
//새로운 벽돌 생성
function addNewBricks() {
    for (let r = 0; r < brickRowCount; r++) {
        if (Math.floor(Math.random()*2)) {
            var random_index = Math.floor(Math.random()*6);
            bricks[r].push({ type: monsters[random_index], x: canvas.width, y: (2 * r + 1) * (canvas.height - 2 * brickOffsetTop) / 10, status: monsters[random_index].m_status }); // 새로운 벽돌을 오른쪽에 추가
        }
    }
}

function collisionDetection() {
    //공이 조작 캐릭터와 몬스터 맞을때
    if ( ballX + ballDX < ballRadius) { 
        ballDX = -ballDX;
    }
    //ballX > characterX && ballX < characterX + characterWidth

    //공이 위, 아래 벽 맞을 때
    if (ballY + ballDY < ballRadius || ballY + ballDY > canvas.height - ballRadius) {
        ballDY = -ballDY;
    } 
    //공이 밖으로 나갈 때 
    else{
        //라이프 감소

    }
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < bricks[r].length; c++) {
            var b = bricks[r][c];
            if (b.status == 1) {
                if (ballX > b.x && ballX < b.x + brickWidth && ballY > b.y && ballY < b.y + brickHeight) {
                    ballDX = -ballDX;
                    b.status = 1; // 몬스터 라이프 깎이게 하면 될듯 일단 1로 해났음
                }
            }
        }
    }

    ballX += ballDX;
    ballY += ballDY;
}


//최종 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawCharacter();
    drawBalloon();
    collisionDetection();
}

function loopGame() {
    draw();
    requestAnimationFrame(loopGame);
}