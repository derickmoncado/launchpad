'use strict';

let pathname = window.location.pathname; // Gets URL path and stores in pathname

$(document).ready(function() {
	console.log('document ready!');

	// For appending the 'active' class to nav
	$('.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');
	$('.dropdown-menu > li > a[href="'+pathname+'"]').addClass('active');

	// Init Swiper
	const swiper = new Swiper('.swiper', {
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