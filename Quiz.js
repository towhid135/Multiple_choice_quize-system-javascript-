const timeGauge = document.getElementById("timeGauge");
var progress = document.getElementById("progress");
var quSetIndex = 0,timeCount = 0,totalTime = 10,timeGaugeWidth = 150, increaseTimeBarWidth = timeGaugeWidth/totalTime;

var quSet = [ {question:'What is your Name?',
               imgSrc:'html.png',
			   choiceA:'Towhidul Islam',
			   choiceB:'Islam Towhid',
			   choiceC:'Borkotullah Bulu',
			   ans: 'A'
              },{question:'What is your Age?',
                imgSrc:'css.png',
			    choiceA:'21',
			    choiceB:'22',
			    choiceC:'23',
				ans: 'B'
			  }];
			  
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

$('#A').click(  function(){
	var q = quSet[quSetIndex];
	console.log(quSetIndex);
	if(q.ans == 'A') 
	{
		timeCount = 0;
		correctAns();
	}
	renderQuestion();
} );