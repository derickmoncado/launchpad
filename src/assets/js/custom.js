'use strict';

let pathname = window.location.pathname; // Gets URL path and stores in pathname

//$(document).ready(function() {
	//console.log('document ready!');
	// For appending the 'active' class to nav
	//$('.navbar-nav > li > a[href="'+pathname+'"]').parent().addClass('active');
	//$('.dropdown-menu > li > a[href="'+pathname+'"]').addClass('active');
//});




const init = () => {
	console.log('document ready!');
	
	// Swiper
	const swiper = new Swiper('.swiper', {
		loop: true,
		pagination: {
			el: '.swiper-pagination',
		},
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		scrollbar: {
			el: '.swiper-scrollbar',
		},
	});

};

init();
