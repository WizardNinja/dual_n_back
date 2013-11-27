var number = 0;
var sound = 0;
var score = 0;
var muligans = 3;
var visualClicked = false;
var audioClicked = false;
// the sequences are filled with garbage data before the game starts
var visualSequence = [6,7,8,9,10];
var audioSequence = [6,7,8,9,10];
var sounds = [new Audio('Cow.wav'),
						  new Audio('Dog.wav'),
              new Audio('Hog.wav'),
              new Audio('Horse.wav'),
              new Audio('Rooster.wav')
              ];
var images = ['cow.png', 'dog.png', 'pig.png', 'horse.png', 'rooster.png'];
var gameLoop;
var currentLevel = 1;
var gameState = "start"; //game states are start, play, and end

function reset() {
	console.log("reset");
	// post the score to the score board
	$.post( "/scores/" + score.toString() + "/" + currentLevel.toString(), function(){
		console.log("posted score");
	});
	clearInterval(gameLoop);
	visualSequence = [6,7,8,9,10];
	audioSequence = [6,7,8,9,10];
	score = 0;	
	muligans = 3;	
	$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
	$("#main_image").attr("src", "start.png");
	$("#main_image").show();
	gameState = "start";
}

function updateVisualSequence(num) {
	visualSequence[4] = visualSequence[3];
	visualSequence[3] = visualSequence[2];
	visualSequence[2] = visualSequence[1];
	visualSequence[1] = visualSequence[0];
	visualSequence[0] = num;
}

function updateAudioSequence(snd) {
	audioSequence[4] = audioSequence[3];
	audioSequence[3] = audioSequence[2];
	audioSequence[2] = audioSequence[1];
	audioSequence[1] = audioSequence[0];
	audioSequence[0] = snd;
}

function checkAudioSequence() {
	return (audioSequence[currentLevel] == sound);
}

function checkVisualSequence() {
	return (visualSequence[currentLevel] == number);
}

//the game loop
function game() {
	//update for next interval
	if (checkVisualSequence() == true && visualClicked == false){
		muligans += -1;
		if (muligans >= 0){
			$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
		}
		if (muligans <= 0){
			gameState = "end";
			$("#main_image").attr("src", "gameover.png");
			$("#main_image").show();
			console.log(gameState);
		}
	}
	if (checkAudioSequence() == true && audioClicked == false){
		muligans += -1;
		if (muligans >= 0){
			$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
		}
		if (muligans <= 0){
			gameState = "end";
			$("#main_image").attr("src", "gameover.png");
			$("#main_image").show();
			console.log(gameState);
		}
	}

	if (gameState == "play"){
		number = Math.floor(Math.random()*5);
		sound = Math.floor(Math.random()*5);
		updateVisualSequence(number);
		updateAudioSequence(sound);
		visualClicked = false;
		audioClicked = false;
		$("#main_image").show();
		$("#main_image").attr("src", images[number]);
		sounds[sound].play();
		setTimeout(function(){
			$("#main_image").hide();
			sounds[sound].pause();
			sounds[sound].currentTime = 0;
		},1200);
	}

	if (gameState == "end"){
		reset();
	}
}

window.onload = function(){
	$("#currentLevel").text(currentLevel.toString() + " N");

	$("#main_button").on("click", function(){
		if (gameState == "start") {
			$("#main_image").attr("src", "getready.png");
			gameState = "play";
			//start the game
			gameLoop = setInterval(game, 4000);
		}
	});

	$("#audio_button").on("click", function(){
		if (gameState == "play") {
			if(checkAudioSequence() && audioClicked == false){
				score += 1;
				$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
			}
			else if(audioClicked == false){
				muligans += -1;
				if (muligans >= 0) {
					$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
				}
				if (muligans <= 0){
					gameState = "end";
					$("#main_image").attr("src", "gameover.png");
					$("#main_image").show();
					console.log(gameState);
				}
			}
			audioClicked = true;
		}
	});

	$("#visual_button").on("click", function(){
		if(checkVisualSequence() && visualClicked == false){
			score += 1;
			$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
		}
		else if (visualClicked == false){
			muligans += -1;
			if (muligans >= 0) {
				$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
			}
			if (muligans <= 0){
				gameState = "end";
				$("#main_image").attr("src", "gameover.png");
				$("#main_image").show();
				console.log(gameState);
			}
		}
		visualClicked = true;
	});
}




