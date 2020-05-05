const timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var quSetIndex = 0,timeCount = 0,totalTime = 10,timeGaugeWidth = 150, increaseTimeBarWidth = timeGaugeWidth/totalTime,score=0;
var reactImgSrc = ['1.png','2.png','3.png','4.png','5.png'];
var range = [ {low:0,high:39},{low:40,high:59},{low:60,high:69},{low:70,high:79},{low:80,high:100} ];

var quSet = [{question:'Who is the man on the picture?',
               imgSrc:'sir.jpg',
			   choiceA:'Dr. Jamilur Reza Choudhury.',
			   choiceB:'Dr. Muhammed Zafar Iqbal.',
			   choiceC:'Dr. M. Kaykobad.',
			   ans: 'A'
              },{question:'When Dr. Jamilur Reza Choudhury was awarded ekushey padak ?',
               imgSrc:'Ekushey.jpg',
			   choiceA:'2016',
			   choiceB:'2015',
			   choiceC:'2017',
			   ans: 'C'
              },{question:'When Dr. Jamilur Reza Choudhury was  appointed as National Professor  ?',
               imgSrc:'prof.jpg',
			   choiceA:'2016',
			   choiceB:'2018',
			   choiceC:'2011',
			  ans: 'B'}];
			  
const qLen = quSet.length;
function start(){
	$('#start').hide();
	$('#quiz').toggle();
	renderQuestion();
	progressCircle();
	timeBar();
	timer = setInterval(timeBar,1000);
	
}

function renderQuestion(){
	var q = quSet[quSetIndex];
	$('#question').html('<p>'+q.question+'</p>');
	$('#qImg').html('<img src='+q.imgSrc+'>');
	$('#A').html(q.choiceA);
	$('#B').html(q.choiceB);
	$('#C').html(q.choiceC);
	
	/*question.innerHTML = '<p>'+q.question+'</p>';
    qImg.innerHTML = "<img src="+ q.imgSrc +">";
    choiceA.innerHTML = q.choiceA;
    choiceB.innerHTML = q.choiceB;
    choiceC.innerHTML = q.choiceC;*/
}

function timeBar(){
	    const qLen = quSet.length;
		if(timeCount <= totalTime){
		$('#counter').html(timeCount);
		timeGauge.style.width = (timeCount * increaseTimeBarWidth)+"px";
		timeCount++;
		}
		else{
			timeCount = 0;
			wrongAns();
			if(quSetIndex < qLen-1)
			{
				quSetIndex++;
				renderQuestion();
			}
			else{
				clearInterval(timer);
				showScore();
			}
			
		}
	
}

function progressCircle(){
	for(id = 0; id<=qLen-1; id++)
	{
	  //progress.innerHTML += "<div class='prog' id="+ id +"></div>";
	  $('#progress').append('<div class="prog" id = '+id+' ></div>'); 
	}
}
function wrongAns(){
	//document.getElementById(quSetIndex).style.backgroundColor = "#f00";
	$('#'+quSetIndex+'').css('background-color','#f00');
}
function correctAns(){
	//document.getElementById(quSetIndex).style.backgroundColor = "#f00";
	$('#'+quSetIndex+'').css('background-color','#0f0');
}

function checkAns(result)
{
	if(result == quSet[quSetIndex].ans) {
		score++;
		correctAns();
		if(quSetIndex < qLen-1){
			timeCount = 0;
			quSetIndex++;
			renderQuestion();
		}
		else{
			clearInterval(timer);
			showScore();
		}
	}
	else{
		wrongAns();
		if(quSetIndex < qLen){
			timeCount = 0;
			quSetIndex++;
			renderQuestion();
		}
		else{
			clearInterval(timer);
			showScore();
		}
	}
}

function showScore(){
	$('#scoreContainer').toggle();
	var totalQuestion = qLen;
	var percentage = (score * 100)/totalQuestion;
	//alert(percentage);
	var len = range.length;
	//alert(len);
	for(i=0; i<len; i++){
		if( percentage >= range[i].low && percentage <= range[i].high){
			$('#scoreContainer').append( '<img src = '+reactImgSrc[i]+' >' );
		    $('#scoreContainer').append( '<p>'+percentage+'%</p>' );
			break;
		}
	}
	
}