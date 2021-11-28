'use strict';

(function () {
	console.log('document ready!');

	// Appends the 'active' class to nav links
	let pathname = "." + window.location.pathname;
	document.querySelectorAll(`.navbar-nav > li > a[href='${pathname}']`).forEach(el => {
		el.classList.add('active');
	});

  // Init Swiper
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

	// Init Emergence
	emergence.init();

	// Init tooltips everywhere (popper.js)
	var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl)
	});
})();