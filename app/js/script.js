$(function() {

	function selectItem(item, word, wrapper) {
		var stringItem = String(item);
		$(item).html($(item).html().replace(word, '<span class="'+ wrapper +'">' + word + '</span>'));
	}

	selectItem('.portfolio p', 'consequat ut sed sem', 'wrapped-item');
	selectItem('.counter-text-bottom', 'design', 'counter-wrapped-text');

	$('.design-slider').slick({
		infinite: false,
  		slidesToShow: 1,
  		slidesToScroll: 1,
  		dots: true,
  		arrows: false,
  		draggable: false
	});

	$('.projects-slider').slick({
		infinite: false,
  		slidesToShow: 3,
  		slidesToScroll: 3,
  		dots: true,
  		arrows: false,
  		draggable: false,
  		responsive: [
    	{
	      	breakpoint: 992,
	      	settings: {
	        	slidesToShow: 2,
	        	slidesToScroll: 2
	    	}
      	},
      	{
	      	breakpoint: 768,
	      	settings: {
	        	slidesToShow: 1,
	        	slidesToScroll: 1,
	        	draggable: true
	    	}
      	}]
	});

	$('.team-members').slick({
		infinite: false,
  		slidesToShow: 3,
  		slidesToScroll: 3,
  		dots: true,
  		arrows: false,
  		draggable: false,
  		responsive: [
    	{
	      	breakpoint: 992,
	      	settings: {
	        	slidesToShow: 2,
	        	slidesToScroll: 2
	    	}
      	},
      	{
	      	breakpoint: 768,
	      	settings: {
	        	slidesToShow: 1,
	        	slidesToScroll: 1,
	        	draggable: true
	    	}
      	}]
	});

	$('.project-card').on('mouseenter', function(e) {
		$(this).addClass('hover-project');
		$(this).find('.mask').css('opacity', '0').animate({opacity: '0.7'}, 300);
		$(this).find('.hover-content').css('opacity', '0').animate({opacity: '1'}, 300);
	})

	$('.project-card').on('mouseleave', function(e) {
		$(this).find('.mask').animate({opacity: '0'}, 300);
		$(this).find('.hover-content').animate({opacity: '0'}, 300).removeClass('hover-project');
	})

	$('.burger').on('click', function(e) {
		$('.menu').toggleClass('menu-active');
		$('.burger').toggleClass('burger-active');
		if ($(this).hasClass('burger-active')) {
			$('.overlay').css('display', 'block').animate({opacity: '0.7'}, 400);
		} else {
			$('.overlay').css({'display': 'none', 'opacity': '0'});
		}
	})

	$('.overlay').on('click', function(e) {
		$('.menu').removeClass('menu-active');
		$('.burger').removeClass('burger-active');
		$('.overlay').css({'display': 'none', 'opacity': '0'});
	})

	$('.learn-more-btn').on('click', function(e) {
		$('html, body').animate({
        scrollTop: $('.portfolio').offset().top
     }, 500);
	})

	$('.counter .fa-angle-down').on('click', function(e) {
		$('html, body').animate({
        scrollTop: $('.projects').offset().top
     }, 500);
	})

	$('.team .team-card').hover(function(e) {
		$(this).toggleClass('team-card-hover');
	})

	$('.subscribe .fa-angle-up').on('click', function(e) {
		$('html, body').animate({
        scrollTop: $('.header').offset().top
     }, 700);
	})

	$('.contact-card').hover(function(e) {
		$(this).toggleClass('contact-card-hover');
	})

	$('.ignite a').click(function(e) {
		e.preventDefault();
	})

	$('input[name=send-btn]').on('click', ValidationEmail);

	function ValidationEmail() {
		var email = $('input[name=email]').val().trim();
		if(email.length < 3 || !email.includes('@') 
      	|| !email.includes('.')) {
      		errorEmailSend();				
    	} else {
       		subscribeAJAX();
    	}	
	}

	function errorEmailSend() {
		$('input[name="send-btn"]').addClass('error-email-button')
      							.delay(2000).queue(function() {
							 	$('input[name="send-btn"]').removeClass('error-email-button');
							 	$(this).dequeue();
							 });		
								 
      		$('input[name="email"]').addClass('error-email-text')
  								.delay(2000).queue(function() {
							 	$('input[name="email"]').removeClass('error-email-text');
							 	$(this).dequeue();
							 });		
	}

	function subscribeAJAX() {
		$.post(
			'server.php',
			{
				email: $('input[name=email]').val().trim()
			},
			successEmailSend);
	}

	function successEmailSend() {
		$('input[name="send-btn"]').addClass('success-email-button')
      							.delay(2000).queue(function() {
							 	$(this).removeClass('success-email-button');
							 	$(this).dequeue();
							 });		
								 
      	$('input[name="email"]').addClass('success-email-text')
  								.delay(2000).queue(function() {
							 	$(this).removeClass('success-email-text');
							 	$(this).val('');
							 	$(this).dequeue();
							 });		
	}
})