$(function() {
	var mw = $('.main').width();
	$('.main').css({
	    'height': mw + 'px'
	});

	var bw = $('.button').width();
	$('.button').css({
		'height': bw + 'px'
	});
});