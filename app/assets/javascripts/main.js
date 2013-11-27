$(function(){
	$('#bt-menu').append('<div class"bt-overlay"></div>');
  $('#bt-menu').on('click', '.bt-overlay', function(){
    toggleClass('bt-menu-open');
  });
	$('.bt-menu-trigger').click(function() {
		$('#bt-menu').toggleClass('bt-menu-open');
	});

	$("#game").css("height", window.innerHeight + "px");
  $("#game").css("width", window.innerHeight * .7 + "px");
  $("#game_title").css("font-size", window.innerHeight * .05 + "px");
  $("#score").css("font-size", window.innerHeight * .03 + "px");
  $("#main_area").css("height", window.innerHeight * .5 + "px");
  $("#main_area").css("width", window.innerHeight * .5 + "px");
  $("#audio_button").css("height", window.innerHeight * .3 + "px");
  $("#audio_button").css("width", window.innerHeight * .3 + "px");
  $("#visual_button").css("height", window.innerHeight * .3 + "px");
  $("#visual_button").css("width", window.innerHeight * .3 + "px");
  $(document).scrollTop();
	window.onresize = function(){
    $("#game").css("height", window.innerHeight + "px");
    $("#game").css("width", window.innerHeight * .7 + "px");
    $("#game_title").css("font-size", window.innerHeight * .05 + "px");
    $("#score").css("font-size", window.innerHeight * .03 + "px");
    $("#main_area").css("height", window.innerHeight * .5 + "px");
    $("#main_area").css("width", window.innerHeight * .5 + "px");
    $("#audio_button").css("height", window.innerHeight * .3 + "px");
    $("#audio_button").css("width", window.innerHeight * .3 + "px");
    $("#visual_button").css("height", window.innerHeight * .3 + "px");
    $("#visual_button").css("width", window.innerHeight * .3 + "px");
    $(document).scrollTop();
	};

});