// Various variables
var videoHalfWay = 0;
var formattedHalfWay = 0;

// Choice parts
var choicePart = 9;
var goodChoicePart = 9;
var badChoicePart = 7;
var goodChoiceChosen = false;

// Question variable
var question1Asked = false;
var btnClick = false;
var btnId = "";
var startTime;
var endTime;


var video1;

$(document).ready(function(){

	$.featherlight.defaults.afterClose = playPauseVideo;
	$.featherlight.defaults.afterOpen = stopHideModal;

	video1 = $('#video1');


	
	$('.boxx').on('click', function(){
		btnId = this.id;
		if(endTime == 28){
			if(btnId == "box1") {
				console.log(btnId);
				video1[0].pause();
				$.featherlight($('.reTryAlert'));
	
			} else if(btnId == "box2") {
				console.log(btnId);
				video1[0].pause();
				$.featherlight($('.reTryAlert'));
	
			} else {
				$(".correctAnswer").css("display", "block");
				video1[0].currentTime = endTime + 1;	
				video1[0].play();
			}
		} else if(endTime == 49) {
			if(btnId == "box1") {
				console.log(btnId);
				video1[0].pause();
				$.featherlight($('.reTryAlert'));
	
			} else if(btnId == "box2") {
				$(".correctAnswer").css("display", "block");
				video1[0].currentTime = endTime + 1;	
				video1[0].play();
	
			} else {
				console.log(btnId);
				video1[0].pause();
				$.featherlight($('.reTryAlert'));
			}
		}
	});

	$('.goodChoice').on('click', function(){
		goodChoiceChosen = true;
		$.featherlight.close();
		video1[0].currentTime = goodChoicePart;
	})

	$('.badChoice').on('click', function(){
		$.featherlight.close();
		video1[0].currentTime = badChoicePart;
		location.reload();
	})


	$('.reTryBtn').on('click', function(){
		if(endTime == 28) {
			$.featherlight.close();
			video1[0].currentTime = 20;
			// video1[0].play();
		} else if(endTime == 49) {
			$.featherlight.close();
			video1[0].currentTime = 43;
			// video1[0].play();
		}
	})

	$(video1).on('loadeddata', function(){
		videoHalfWay = Math.round(this.duration/2);
	})

	$(video1).on('timeupdate', function(){
		var currentTime = Math.round(this.currentTime);
		var durationNum = Math.round(this.duration);
		var formattedCurrentTime = secondsToHms(currentTime);
		var formattedDurationTime = secondsToHms(durationNum)
		onTrackedVideoFram(formattedCurrentTime, formattedDurationTime)
		
		if(currentTime == choicePart && question1Asked == false){
			question1Asked = true;
			video1[0].pause();
			$.featherlight($('.popUpQuestion1'))
		}

		if(currentTime == badChoicePart && goodChoiceChosen == true){
			video1[0].pause();
		}

		if(currentTime > 20 && currentTime < 37) {

			startTime = Math.round(20);
			endTime = Math.round(28);

			$(".boxx").css("display", "block");

			if(btnId == "") {
				if(currentTime > 27 && currentTime < 29) {
					video1[0].currentTime = endTime;
					video1[0].pause();
				}
			}

		} else if(currentTime > 43 && currentTime < 56) {

			startTime = Math.round(43);
			endTime = Math.round(49);

			$(".boxx").css("display", "block");

			if(btnId == "") {
				if(currentTime > 48 && currentTime < 50) {
					video1[0].currentTime = endTime;
					video1[0].pause();
				}
			}
	
		} else {
			$(".boxx").css("display", "none");
			$(".correctAnswer").css("display", "none");	
		}

		if(currentTime == videoHalfWay){
			// Halfway point
		}

		if(currentTime == durationNum){
			// Video complete
		}

	});

});




function reTry(){
	video1[0].pause();
	$.featherlight($('.reTryAlert'))
}

function onTrackedVideoFram(curretTime, duration){
	$('.current').text(curretTime);
	$('.duration').text(duration);
}

function secondsToHms(d) {
	d = Number(d);
	var h = Math.floor(d / 3600);
	var m = Math.floor(d % 3600 / 60);
	var s = Math.floor(d % 3600 % 60);
	return ((h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s); 
}

function playPauseVideo(popUp){
	if(video1[0].paused){
		video1[0].play();
	} else{
		video1[0].pause();
		$.featherlight($(popUp));
	}
}

function stopHideModal(){
	$(".featherlight-close-icon").css("display", "none");
}
	  
// function guessWho() {
// 	if 
// }