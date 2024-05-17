
//시작 버튼누르고, 선택된 이미지들은 game func에 바로 전달하기
/*
window.onload = function() {
    document.getElementById('mainMenu').style.display = 'block'; 
}*/

var startAudio = new Audio('bgm/intro.mp3');
var buttonPush = new Audio('bgm/button_push.mp3');
var easyBgm = new Audio('bgm/easy.mp3');
var normalBgm = new Audio('bgm/normal.mp3');
var hardBgm = new Audio('bgm/hard.mp3');

const stopAudio = () => {
    track.pause(); // 오디오정지
    track.currentTime = 0; // 오디오 재생시간을 0으로 변경
    iconAnimation("stop"); // 정지 상태로 스타일 변경하는 함수
}

$(document).ready(function () {
    $("#mainTitle").click(function(){
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
});

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
function dataStore(){
    buttonPush.play();
    hideAllSections();
    //array만들어서 맵,캐릭터,물풍선 저장하는거 만들면 될듯
}

//뒤로 돌아가기 버튼
function shiftMain(){
    buttonPush.play();
    hideAllSections();
    document.getElementById('mainMenu').style.display = 'block';
}

function hideAllSections() {
    document.getElementById('mainMenu').style.display = 'none';
    document.getElementById('chooseLevel').style.display = 'none';
    document.getElementById('bgStory').style.display = 'none';
    document.getElementById('itemSettings').style.display = 'none';
    document.getElementById('introSection').style.display = 'none';
}



function gameLevel(i){
    if (i =='1') {
        buttonPush.play();
        hideAllSections();
        document.getElementById('easyLevel').style.display = 'block';
        startAudio.pause();
        easyBgm.play();
    } else if (i =='2') {
        buttonPush.play();
        hideAllSections();
        document.getElementById('normalLevel').style.display = 'block';
        startAudio.pause();
        normalBgm.play();
    } else {
        buttonPush.play();
        hideAllSections();
        document.getElementById('hardLevel').style.display = 'block';
        startAudio.pause();
        hardBgm.play();
    }
}

function chooseMap(){

}

function chooseBall(){

}

function chooseChar(){

}




