'use strict';

let pathname = window.location.pathname; // Gets URL path and stores in pathname

$(document).ready(function() {
	console.log('document ready!');

	// For appending the 'active' class to nav
	$('.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');
	$('.dropdown-menu > li > a[href="'+pathname+'"]').addClass('active');

	// Initiate Slick
	$('.slider-example').slick({
		dots: true,
		mobileFirst: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1
	});



	const swiper = new Swiper('.swiper', {
		// Optional parameters
		//direction: 'vertical',
		loop: true,
	
		// If we need pagination
		pagination: {
			el: '.swiper-pagination',
		},
	
		// Navigation arrows
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
	
		// And if we need scrollbar
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});

});