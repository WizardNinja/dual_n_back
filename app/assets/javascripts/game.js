var image = 0;
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
var images = ['#cow_image', '#dog_image', '#pig_image', '#horse_image', '#rooster_image'];
var gameLoop;
var currentLevel = 1;
var gameState = "start"; //game states are start, play, and end

function hideImages() {
	$("#start_image").hide();
	$("#getready_image").hide();
	$("#cow_image").hide();
	$("#dog_image").hide();
	$("#horse_image").hide();
	$("#pig_image").hide();
	$("#rooster_image").hide();
	$("#gameover_image").hide();
}

//resets the game
function reset() {
	console.log("reset");
	// post the score to the score board
	$.post( "/scores/" + score.toString() + "/" + currentLevel.toString(), function(){
		console.log("posted score");
	});
	// reset all the stuff
	clearInterval(gameLoop);
	visualSequence = [6,7,8,9,10];
	audioSequence = [6,7,8,9,10];
	currentLevel = 1;
	score = 0;	
	muligans = 3;	
	$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
	hideImages();
	$("#start_image").show();
	gameState = "start";
}

// visual sequence keeps track of the past 5 images shown
function updateVisualSequence(num) {
	visualSequence[4] = visualSequence[3];
	visualSequence[3] = visualSequence[2];
	visualSequence[2] = visualSequence[1];
	visualSequence[1] = visualSequence[0];
	visualSequence[0] = num;
}

// audio sequence keeps track of the past 5 sounds played
function updateAudioSequence(snd) {
	audioSequence[4] = audioSequence[3];
	audioSequence[3] = audioSequence[2];
	audioSequence[2] = audioSequence[1];
	audioSequence[1] = audioSequence[0];
	audioSequence[0] = snd;
}

// returns true if there was an auditory match for the current level
function checkAudioSequence() {
	return (audioSequence[currentLevel] == sound);
}

// returns true if there was a visual match for the current level
function checkVisualSequence() {
	return (visualSequence[currentLevel] == image);
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
			hideImages();
			$("#gameover_image").show();
		}
	}
	if (checkAudioSequence() == true && audioClicked == false){
		muligans += -1;
		if (muligans >= 0){
			$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());
		}
		if (muligans <= 0){
			gameState = "end";
			hideImages();
			$("#gameover_image").show();
			console.log(gameState);
		}
	}

	if (gameState == "play"){
		if(score >= 10 && currentLevel < 4){
			score = 0;
			currentLevel += 1;
		}
		image = Math.floor(Math.random()*5);
		sound = Math.floor(Math.random()*5);
		updateVisualSequence(image);
		console.log(checkVisualSequence());
		updateAudioSequence(sound);
		visualClicked = false;
		audioClicked = false;
		hideImages();
		$(images[image]).show();
		sounds[sound].play();
		setTimeout(function(){
			$(images[image]).hide();
			sounds[sound].pause();
			sounds[sound].currentTime = 0;
		},1200);
	}

	if (gameState == "end"){
		reset();
	}
}

// The onload function. Run the game code here.
window.onload = function(){
	hideImages();
	$("#start_image").show();
	$("#score").text("N: " + currentLevel.toString() + " Score: " + score.toString() + " Chances: " + muligans.toString());

	$("#main_button").on("click", function(){
		if (gameState == "start") {
			hideImages();
			$("#getready_image").show();
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
					hideImages();
					$("#gameover_image").show();
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
				hideImages();
				$("#gameover_image").show();
				console.log(gameState);
			}
		}
		visualClicked = true;
	});
}




