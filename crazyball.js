
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
var settingBgm = new Audio('bgm/setting.mp3');


//설정에서 선택한 값들을 저장
var selectedList = [];

//몬스터(위치 관련)
var canvas;
var ctx;
var brickRowCount = 5; //벽돌 줄 수
var brickColumnCount = 0;
var brickPadding = 10; //벽돌 간의 간격
var brickOffsetTop = 4; //화면 위에서 떨어진 간격
var brickXIncrement = 0.1; // 벽돌이 왼쪽으로 이동하는 속도
var bricks = [];
//몬스터(이미지)
var imgs = [];
for(let i = 0; i < 6; i++) {
    imgs[i] = new Image();
    imgs[i].src = "./images/mon"+(i+1)+".png";
}
var imgs_boss = [];
for(let i = 0; i < 3; i++) {
    imgs_boss[i] = new Image();
    imgs_boss[i].src = "./images/boss"+(i+1)+".png";
} 
//몬스터 객체
var monsters = [];
monsters[0] = {m_img: imgs[0], m_width:50, m_height:55, m_status: 1};
monsters[1] = {m_img: imgs[1], m_width:50, m_height:55, m_status: 1};
monsters[2] = {m_img: imgs[2], m_width:100, m_height:110, m_status: 2};
monsters[3] = {m_img: imgs[3], m_width:50, m_height:55, m_status: 1};
monsters[4] = {m_img: imgs[4], m_width:50, m_height:55, m_status: 1};
monsters[5] = {m_img: imgs[5], m_width:75, m_height:83, m_status: 2};
//보스 객체
var boss = [];
boss[0] = {m_img: imgs_boss[0], m_width:300, m_height:330, m_status: 10, speed: 0.1};
boss[1] = {m_img: imgs_boss[1], m_width:300, m_height:330, m_status: 20, speed: 0.1};
boss[2] = {m_img: imgs_boss[2], m_width:300, m_height:330, m_status: 30, speed: 0.1};

//캐릭터 이미지
var imgs_char = [];
for(let i = 0; i < 3; i++) {
    imgs_char[i] = new Image();
    imgs_char[i].src = "./images/char"+(i+1)+".png";
}
//캐릭터 객체
var character = [];
character[0] = {img: imgs_char[0], characterWidth: 80, characterHeight: 100};
character[1] = {img: imgs_char[1], characterWidth: 80, characterHeight: 100};
character[2] = {img: imgs_char[2], characterWidth: 80, characterHeight: 100};
var MyChar = character[0]; //캐릭터 저장한거에 맞춰서 인덱스 바꿔야 됨

//물풍선 이미지
var imgs_ball = [];
for(let i = 0; i < 3; i++) {
    imgs_ball[i] = new Image();
    imgs_ball[i].src = "./images/ball"+(i+1)+".png";
}
//물풍선 객체
var ballDamage = 1;
var ball = [];
ball[0] = {img: imgs_ball[0], ballRadius: 20};
ball[1] = {img: imgs_ball[1], ballRadius: 20};
ball[2] = {img: imgs_ball[2], ballRadius: 20};

//공 관련
var MyBall = ball[0]; //물풍선 저장한거에 맞춰서 인덱스 바꿔야 됨
var ballX;
var ballY;
var ballDX;
var ballDY;
var ballSpeed = 3;
//생명관련
var life = 4;

//점수관련
var point = 0;

//난이도
var level;

//아이템 이미지
var imgs_item = [];
for(let i = 0; i < 3; i++) {
    imgs_item[i] = new Image();
    imgs_item[i].src = "./images/item"+(i+1)+".png";
}
//아이템
var item1_max = 4;
var item2_max = 10;
var item3_max = 4;
var item = [];
item[0] = {m_img: imgs_item[0], m_width:50, m_height:55};
item[1] = {m_img: imgs_item[1], m_width:50, m_height:55};
item[2] = {m_img: imgs_item[2], m_width:50, m_height:55};

//timer
var time = 60; //60초
var ANB; //addNewBricks
var timer;
var oneMinute;
var bossTimer;

//뒤로 돌아가기 버튼
function shiftMain(){
    hideAllSections();
    settingBgm.pause();
    startAudio.play();
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
    document.getElementById('Level').style.display = 'none';
    document.getElementById('endStory').style.display = 'none';
}

//아이템헤더
function itemHeader() {
    document.getElementById("item1").setAttribute("src", "./images/ballSize"+item1_max+".png");
    document.getElementById("item2").setAttribute("src", "./images/charSize"+item2_max+".png");
    document.getElementById("item3").setAttribute("src", "./images/ballDamage"+item3_max+".png");
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

    //캔버스
    canvas = document.querySelector(".game-area");
    ctx = canvas.getContext('2d');
    
    init();
});


function init(){
    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);

}


//물풍선 생성
function drawBalloon(){
    ctx.drawImage(MyBall.img, ballX - MyBall.ballRadius, ballY - MyBall.ballRadius, MyBall.ballRadius * 2, MyBall.ballRadius * 2);
}

//캐릭터 움직임(키보드 입력)
var upBtn = false;
var downBtn = false;
var characterX = 0;
var characterY = 0;



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
    } else if(downBtn && characterY < canvas.height - MyChar.characterHeight) {
        characterY += 7;
    }
    ctx.drawImage(MyChar.img, characterX, characterY, MyChar.characterWidth, MyChar.characterHeight);
}



//게임 시작
function gameStart(){
    hideAllSections();
    settingBgm.pause();
    startAudio.play();
    document.getElementById('mainMenu').style.display = 'block';
}

//시작 버튼
function showStart(){
    buttonPush.play();
    startAudio.pause();
    settingBgm.play();
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

    const selectedMap = document.querySelector('input[type=radio][name=map]:checked').parentElement.querySelector('img').getAttribute('src');
    const selectedBall = document.querySelector('input[type=radio][name=ball]:checked').parentElement.querySelector('img').getAttribute('src');
    const selectedChar = document.querySelector('input[type=radio][name=char]:checked').parentElement.querySelector('img').getAttribute('src');
    selectedList = [selectedMap, selectedBall,selectedChar];

    //test
    console.log("Selected List:", selectedList);

    //key-value로 저장 (localStorage)
    const mapVal = document.querySelector('input[type=radio][name=map]:checked').value;
    const ballVal = document.querySelector('input[type=radio][name=ball]:checked').value;
    const charVal = document.querySelector('input[type=radio][name=char]:checked').value;

    localStorage.setItem('map_key', mapVal);
    localStorage.setItem('ball_key', ballVal);
    localStorage.setItem('char_key', charVal);

    keepRadioBtn();

    shiftMain();
    
}

//라디오버튼 값들 유지
function keepRadioBtn(){
    const radioMap = localStorage.getItem('map_key');
    const radioBall = localStorage.getItem('ball_key');
    const radioChar = localStorage.getItem('char_key');

    if (radioMap) {
        const mapEle = document.querySelector(`input[type=radio][name=map][value="${radioMap}"]`);
        if (mapEle) {
            mapEle.checked = true;
            
        }
    }
    if (radioBall) {
        const ballEle = document.querySelector(`input[type=radio][name=ball][value="${radioBall}"]`);
        if (ballEle) {
            ballEle.checked = true;
        }
    }
    if (radioChar) {
        const charEle = document.querySelector(`input[type=radio][name=char][value="${radioChar}"]`);
        if (charEle) {
            charEle.checked = true;
        }
    }
    //test
    console.log("Selected List keepRadioBtn:", selectedList);
}

function resetBall() {
    ballX = MyChar.characterWidth + 10;
    ballY = canvas.height / 2;
    ballDX = ballSpeed;
    ballDY = -ballSpeed;
}

var nowLevel; //현재 레벨
var nowBoss; //현재 보스
function gameLevel(i){
        buttonPush.play();
        settingBgm.pause();
        hideAllSections(); 
        
        if (selectedList[0]) {
            canvas.style.backgroundImage = `url("./${selectedList[0]}")`;
        } else {
            canvas.style.backgroundImage = 'url("images/map1.png")'; // 기본 배경
        }

        // MyChar를 이미지 객체와 관련된 속성으로 설정
        for (let j = 0; j < imgs_char.length; j++) {
            if (imgs_char[j].src.includes(selectedList[2])) {
                MyChar = character[j];
                break;
            }
        }
        for (let j = 0; j < imgs_ball.length; j++) {
            if (imgs_ball[j].src.includes(selectedList[1])) {
                MyBall = ball[j];
                break;
            }
        }

        
        //test
        console.log("In gameLevel:", MyChar);
        console.log("In gameLevel:", MyChar.img);

        //새로운 벽돌을 추가
        resetBall();
        makebricks();
        addNewBricks();
        characterY = (canvas.height - MyChar.characterHeight) / 2;
    if (i =='1') {
        nowLevel = 1;
        nowBoss = boss[0];
        document.getElementById('Level').style.display = 'block';
        startAudio.pause();
        easyBgm.play();
        //새로운 벽돌을 추가
        level = "#Level";
        ANB = setInterval(addNewBricks, 10000); //10초마다
        brickXIncrement = 0.1;
    } else if (i =='2') {
        nowLevel = 2;
        nowBoss = boss[1];
        document.getElementById('Level').style.display = 'block';
        startAudio.pause();
        normalBgm.play();
        //새로운 벽돌을 추가
        level = "#Level";
        ANB = setInterval(addNewBricks, 6000); //6초마다
        brickXIncrement = 0.15;
    } else {
        nowLevel = 3;
        nowBoss = boss[2];
        document.getElementById('Level').style.display = 'block';
        startAudio.pause();
        hardBgm.play();
        //새로운 벽돌을 추가
        level = "#Level";
        ANB = setInterval(addNewBricks, 3000); //3초마다
        brickXIncrement = 0.2;
    }
    timer = setInterval(draw,10);
    oneMinute = setInterval(updateTimer, 1000)
    
    
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
                if(!(monster.speed))
                    bricks[r][c].x -= brickXIncrement; // 벽돌을 왼쪽으로 이동
                else
                    bricks[r][c].x -= monster.speed; // 보스 왼쪽으로 이동
                ctx.drawImage(monster.m_img, brickX, brickY - monster.m_height / 2, monster.m_width, monster.m_height);
                //끝까지 내려오면 라이프 감소
                if(bricks[r][c].x <= 0) {
                    if(monster == boss[0] || monster == boss[1] || monster == boss[2]) {
                        life = 1;
                        lossLife($(level));
                    }
                    else if(monster == item[0] || monster == item[1] || monster == item[2]) {
                        bricks[r][c].status = 0;                        
                    }
                    else{
                        bricks[r][c].status = 0;
                        lossLife($(level));
                    }
                }
            }
        }
    }
}
//새로운 벽돌 생성
function addNewBricks() {
    for (let r = 0; r < brickRowCount; r++) {
        if (Math.floor(Math.random()*2)) {
            if (Math.floor(Math.random()*10) >= 1) { //몬스터 90%
                var random_index = Math.floor(Math.random()*6);
                bricks[r].push({ type: monsters[random_index], x: canvas.width, y: (2 * r + 1) * (canvas.height - 2 * brickOffsetTop) / 10, status: monsters[random_index].m_status }); // 새로운 벽돌을 오른쪽에 추가
            }
            else{ //아이템 10%
                let i = 1;
                while (i) { 
                    if(item1_max <= 0 || item2_max <= 0 || item3_max <= 0)
                        break;
                    let random_3 = Math.floor(Math.random()*3)
                    if (random_3 == 0){
                        if(item1_max <= 0) //아이템1-공크기-+5(최대40)
                            continue;
                        bricks[r].push({ type: item[0], x: canvas.width, y: (2 * r + 1) * (canvas.height - 2 * brickOffsetTop) / 10, status: 1});
                        i = 0;
                    }
                    else if(random_3 == 1){
                        if(item2_max <= 0) //아이템2-캐릭터크기-+10(최대200)
                            continue;
                        bricks[r].push({ type: item[1], x: canvas.width, y: (2 * r + 1) * (canvas.height - 2 * brickOffsetTop) / 10, status: 1});
                        i = 0;
                    }
                    else{ //아이템3-공데미지+1(최대5)
                        if(item3_max <= 0)
                            continue;
                        bricks[r].push({ type: item[2], x: canvas.width, y: (2 * r + 1) * (canvas.height - 2 * brickOffsetTop) / 10, status: 1});
                        i = 0;
                    }
                }
            }
        } 
    }
}

function addBossBricks() {
    bricks[0].push({ type: nowBoss, x: canvas.width, y: canvas.height / 2, status: boss[0].m_status }); // 새로운 벽돌을 오른쪽에 추가
}

function collisionFunc() {
    //공이 조작 캐릭터와 맞을때
    if (ballX - MyBall.ballRadius < characterX + MyChar.characterWidth &&
        ballY + MyBall.ballRadius > characterY && ballY - MyBall.ballRadius < characterY + MyChar.characterHeight) {
        
        // 공이 캐릭터의 왼쪽이나 오른쪽에 부딪힌 경우
        if (ballX - ballDX + MyBall.ballRadius <= characterX || ballX - ballDX - MyBall.ballRadius >= characterX + MyChar.characterWidth) {
            //ballDX = -ballDX;
            const relativeY = ballY - (characterY + MyChar.characterHeight / 2);
            const maxBounceAngle = Math.PI / 3; // 60도
            const bounceAngle = (relativeY / (MyChar.characterHeight / 2)) * maxBounceAngle;
            ballDX = ballSpeed * Math.sqrt(2) * Math.cos(bounceAngle);
            ballDY = ballSpeed * Math.sqrt(2) * Math.sin(bounceAngle);
            ballX = MyBall.ballRadius + MyChar.characterWidth;
        }
        
        // 공이 벽돌의 위쪽이나 아래쪽에 부딪힌 경우
        if (ballY - ballDY + MyBall.ballRadius <= characterY || ballY - ballDY - MyBall.ballRadius >= characterY + MyChar.characterHeight) {
            ballDY = -ballDY;
        }
    }
    
    //오른쪽으로 나갈때
    if (ballX + ballDX > canvas.width - MyBall.ballRadius) {
        ballDX = -ballDX;
        //resetBall();
    }
    //공이 위, 아래 벽 맞을 때
    if (ballY + ballDY < MyBall.ballRadius || ballY + ballDY > canvas.height - MyBall.ballRadius) {
        ballDY = -ballDY;
    } 
    //공이 왼쪽으로 나갈 때
    if ( ballX + ballDX < MyBall.ballRadius) {
        //라이프 감소
        resetBall();
        lossLife($(level));
    }
    //벽돌 맞았을 때
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < bricks[r].length; c++) {
            var brickX = bricks[r][c].x;
            var brickY = bricks[r][c].y;
            var monster = bricks[r][c].type; //몬스터 타입
            var status = bricks[r][c].status; // 몬스터 목숨
            if (status >= 1) {
                if (ballX + MyBall.ballRadius > brickX && ballX - MyBall.ballRadius < brickX + monster.m_width &&
                    ballY + MyBall.ballRadius > brickY - monster.m_height / 2 && ballY - MyBall.ballRadius < brickY + monster.m_height / 2) {
                    
                    // 공이 벽돌의 왼쪽이나 오른쪽에 부딪힌 경우
                    if (ballX - ballDX + MyBall.ballRadius <= brickX || ballX - ballDX - MyBall.ballRadius >= brickX + monster.m_width) {
                        ballDX = -ballDX;
                    }
                    
                    // 공이 벽돌의 위쪽이나 아래쪽에 부딪힌 경우
                    if (ballY - ballDY + MyBall.ballRadius <= brickY - monster.m_height / 2 || ballY - ballDY - MyBall.ballRadius >= brickY + monster.m_height / 2) {
                        ballDY = -ballDY;
                    }
                    console.log(monster.m_img);
                    bricks[r][c].status -= ballDamage; // 몬스터 라이프 깎이게 하면 될듯 일단 1로 해났음
                    if(bricks[r][c].status <= 0) {
                        //아이템 먹었을 때
                        if(monster == item[0]){ //아이템1-공크기-+5(최대40)
                            if(MyBall.ballRadius < 40)
                                MyBall.ballRadius += 5;
                            console.log(MyBall.ballRadius);
                            item1_max--;
                            itemHeader();
                        }
                        else if(monster == item[1]) { //아이템2-캐릭터크기-+10(최대200)
                            if(MyChar.characterHeight < 200)
                                MyChar.characterHeight += 10;
                            console.log(MyChar.characterHeight);
                            item2_max--;
                            itemHeader();
                        }
                        else if(monster == item[2]) { //아이템3-공데미지+1(최대5)
                            if(ballDamage < 5)
                                ballDamage += 1;
                            console.log(ballDamage);
                            item3_max--;
                            itemHeader();
                        }
                        //점수 올리기
                        var score = $(level).find(".header .stats span").eq(0);
                        if(monster == monsters[0] || monster == monsters[1] || monster == monsters[3] || monster == monsters[4]){
                            point += 1000;
                        }
                        else if(monster == monsters[2]){
                            point += 2000;
                        }
                        else if(monster == monsters[5]){
                            point += 2000;
                        }
                        else if(monster == boss[0]){
                            point += 10000;
                        }
                        else if(monster == boss[1]){
                            point += 20000;
                        }
                        else if(monster == boss[2]){
                            point += 30000;
                        }
                        score.text("Point: " + String(point).padStart(6, "0"));
                    }
                    if(monster == boss[0] || monster == boss[1] || monster == boss[2])
                        if(bricks[r][c].status <= 0 ){
                            alert("clear!!\nTotal point : "+point);
                            resetGame();
                            if(nowLevel == 1) {
                                gameLevel('2');
                                easyBgm.pause();
                                normalBgm.play();
                            }
                            else if(nowLevel == 2) {
                                gameLevel('3');
                                normalBgm.pause();
                                hardBgm.play();
                            }
                            else{
                                //엔딩함수
                                point = 0;
                                $(level)
                                .find(".header .stats span").eq(0)
                                .text("Point: 000000");
                                MyBall.ballRadius = 20;
                                MyChar.characterHeight = 100;
                                ballDamage = 1;
                                item1_max = 4;
                                item2_max = 10;
                                item3_max = 4;
                                itemHeader();
                                gameStart();
                                endingStory();
                            }
                        }
                }
            }
        }
    }

    ballX += ballDX;
    ballY += ballDY;
}

//라이프 감소
function lossLife(level) {
    life--;
    var lifeStats = level.find(".header .stats span").eq(1);
    if (life == 3){
        lifeStats.text("HP: ♥ ♥ ♥");
    }
    else if (life == 2){
        lifeStats.text("HP: ♥ ♥");
    }
    else if (life == 1){
        lifeStats.text("HP: ♥");
    }
    else {
        lifeStats.text("HP:");
        alert("game over!!\nTotal point : "+point);//게임오버
        resetGame();
        point = 0;
        $(level)
        .find(".header .stats span").eq(0)
        .text("Point: 000000");
        MyBall.ballRadius = 20;
        MyChar.characterHeight = 100;
        ballDamage = 1;
        item1_max = 4;
        item2_max = 10;
        item3_max = 4;
        itemHeader();
        easyBgm.pause();
        normalBgm.pause();
        hardBgm.pause();
        //메인화면으로 돌아가기
        gameStart();
    }
}

//최종 그리기
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawCharacter();
    drawBalloon();
    collisionFunc();
}
//보스 시작
function bossTime() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  
    drawBricks();
    drawCharacter();
    drawBalloon();
    collisionFunc();
}

//hard clear시 스토리 마무리
function endingStory(){ 
    hideAllSections();
    hardBgm.pause();
    startAudio.pause();
    settingBgm.play();
    document.getElementById('endStory').style.display = 'block';

}

function updateTimer() {
    time--;
    if(time>=10)
        $(".timer").text("Timer: 00:"+time);
    else if(time > 0)
        $(".timer").text("Timer: 00:0"+time);
    else {
        time = 60; //시간 초기화
        $(".timer").text("Timer: 00:00");
        clearInterval(ANB);
        clearInterval(timer);
        clearInterval(oneMinute);
        addBossBricks();
        bossTimer = setInterval(bossTime,10);
    }    
}

function resetGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //시간 초기화
    time = 60;
    //벽돌 초기화
    for (let r = 0; r < brickRowCount; r++) {
        for (let c = 0; c < bricks[r].length; c++) {
            bricks[r].pop();
        }
    }
    //캐릭터 초기화
    characterY = (canvas.height - MyChar.characterHeight) / 2;
    //점수초기화
/*    point = 0;
    $(level)
    .find(".header .stats span").eq(0)
    .text("Point: 000000");*/
    //목숨초기화
    life = 4;
    $(level)
    .find(".header .stats span").eq(1)
    .text("HP: ♥ ♥ ♥ ♥");
    clearInterval(ANB);
    clearInterval(timer);
    clearInterval(oneMinute);
    clearInterval(bossTimer);
    //아이템 먹은거 초기화
/*    MyBall.ballRadius = 20;
    MyChar.characterHeight = 100;
    ballDamage = 1;
    item1_max = 4;
    item2_max = 10;
    item3_max = 4;
    itemHeader();*/
}