(function ($) {
	"use strict";
	jQuery(window).on("load", function () {
		$(".preloader").delay(1600).fadeOut("slow");
	});
	$(".sidebar-button").on("click", function () {
		$(this).toggleClass("active");
	});
	document
		.querySelector(".sidebar-button")
		.addEventListener("click", () =>
			document.querySelector(".main-menu").classList.toggle("show-menu")
		);
	$(".menu-close-btn").on("click", function () {
		$(".main-menu").removeClass("show-menu");
	});
	$(".sidebar-btn").on("click", function () {
		$(".sidebar-area").addClass("active");
	});
	$(".sidebar-menu-close").on("click", function () {
		$(".sidebar-area").removeClass("active");
	});
	jQuery(".dropdown-icon").on("click", function () {
		jQuery(this).toggleClass("active").next("ul").slideToggle();
		jQuery(this).parent().siblings().children("ul").slideUp();
		jQuery(this).parent().siblings().children(".active").removeClass("active");
	});
	jQuery(".dropdown-icon2").on("click", function () {
		jQuery(this).toggleClass("active").next(".submenu-list").slideToggle();
		jQuery(this).parent().siblings().children(".submenu-list").slideUp();
		jQuery(this).parent().siblings().children(".active").removeClass("active");
	});
	$(".counter").counterUp({ delay: 10, time: 1500 });
	$('[data-fancybox="gallery"]').fancybox({
		buttons: ["close"],
		loop: false,
		protect: true,
	});
	$(".video-player").fancybox({
		buttons: ["close"],
		loop: false,
		protect: true,
	});
	$("select").niceSelect();
	var swiper = new Swiper(".testimonial-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: { nextEl: ".next-1", prevEl: ".prev-1" },
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 2 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
		},
	});
	var swiper = new Swiper(".auction-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".auction-slider-next",
			prevEl: ".auction-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1200: { slidesPerView: 4 },
			1400: { slidesPerView: 4 },
		},
	});
	var swiper = new Swiper(".home1-category-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".category-slider-next",
			prevEl: ".category-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			375: { slidesPerView: 2, spaceBetween: 15 },
			576: { slidesPerView: 3, spaceBetween: 15 },
			768: { slidesPerView: 4 },
			992: { slidesPerView: 5, spaceBetween: 15 },
			1200: { slidesPerView: 6 },
			1400: { slidesPerView: 6 },
		},
	});
	var swiper = new Swiper(".home1-banner2-slider", {
		slidesPerView: 1,
		spaceBetween: 30,
		speed: 2000,
		loop: true,
		effect: "fade",
		fadeEffect: { crossFade: true },
		pagination: { el: ".swiper-pagination2", clickable: true },
	});
	var swiper = new Swiper(".home1-testimonial-slider", {
		slidesPerView: 1,
		spaceBetween: 10,
		speed: 1500,
		effect: "fade",
		fadeEffect: { crossFade: true },
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".testimonial-slider-next",
			prevEl: ".testimonial-slider-prev",
		},
	});
	var swiper = new Swiper(".home2-banner-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		slidesPerView: 1,
		centerSlides: true,
		loop: true,
		effect: "fade",
		autoplay: { delay: 3000, disableOnInteraction: false },
		navigation: { nextEl: ".next-4", prevEl: ".prev-4" },
		pagination: { el: ".paginations1", clickable: true },
	});
	var swiper = new Swiper(".home2-banner2-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		slidesPerView: 1,
		loop: true,
		effect: "fade",
		fadeEffect: { crossFade: true },
		autoplay: { delay: 3000, disableOnInteraction: false },
		pagination: { el: ".pagination2", clickable: true },
	});
	var swiper = new Swiper(".home2-upcoming-auction-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		autoplay: { delay: 2500, disableOnInteraction: false },
		pagination: { el: ".progress-pagination", type: "progressbar" },
		navigation: {
			nextEl: ".upcoming-slider-next",
			prevEl: ".upcoming-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 2 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 4 },
		},
	});
	var swiper = new Swiper(".home3-category-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		navigation: {
			nextEl: ".category-slider-next",
			prevEl: ".category-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			375: { slidesPerView: 1, spaceBetween: 15 },
			576: { slidesPerView: 2, spaceBetween: 15 },
			768: { slidesPerView: 3 },
			992: { slidesPerView: 4, spaceBetween: 15 },
			1200: { slidesPerView: 5 },
			1400: { slidesPerView: 5 },
		},
	});
	var swiper = new Swiper(".home2-popular-auction-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		pagination: { el: ".progress-pagination2", type: "progressbar" },
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 2 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
		},
	});
	var swiper = new Swiper(".home2-testimonial-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		navigation: {
			nextEl: ".home2-testimonial-slider-next",
			prevEl: ".home2-testimonial-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 2 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
		},
	});
	var swiper = new Swiper(".home3-testimonial-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		effect: "fade",
		fadeEffect: { crossFade: true },
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".home3-testimonial-slider-next",
			prevEl: ".home3-testimonial-slider-prev",
		},
	});
	var swiper = new Swiper(".home4-banner-img-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		effect: "fade",
		fadeEffect: { crossFade: true },
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".home4-banner-img-slider-next",
			prevEl: ".home4-banner-img-slider-prev",
		},
		pagination: { el: ".paginations1", type: "fraction" },
	});
	var swiper = new Swiper(".home4-category-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		navigation: {
			nextEl: ".category-slider-next",
			prevEl: ".category-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			375: { slidesPerView: 1, spaceBetween: 15 },
			576: { slidesPerView: 2, spaceBetween: 15 },
			768: { slidesPerView: 3 },
			992: { slidesPerView: 4, spaceBetween: 15 },
			1200: { slidesPerView: 5 },
			1400: { slidesPerView: 5 },
		},
	});
	var swiper = new Swiper(".home4-process-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
		},
	});
	var swiper = new Swiper(".home4-auction-close-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".auction-close-slider-next",
			prevEl: ".auction-close-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1200: { slidesPerView: 4 },
			1400: { slidesPerView: 4 },
		},
	});
	var swiper = new Swiper(".home5-banner-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		slidesPerView: 1,
		centerSlides: true,
		loop: true,
		effect: "fade",
		fadeEffect: { crossFade: true },
		autoplay: { delay: 3000, disableOnInteraction: false },
		navigation: {
			nextEl: ".home5-banner-slider-next",
			prevEl: ".home5-banner-slider-prev",
		},
		pagination: { el: ".paginations1", clickable: true },
	});
	var swiper = new Swiper(".home5-process-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		autoplay: { delay: 2500, disableOnInteraction: false },
		pagination: { el: ".progress-pagination", type: "progressbar" },
		navigation: {
			nextEl: ".home5-process-slider-next",
			prevEl: ".home5-process-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 2 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
		},
	});
	var swiper = new Swiper(".home5-category-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		navigation: {
			nextEl: ".category-slider-next",
			prevEl: ".category-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			375: { slidesPerView: 1, spaceBetween: 15 },
			576: { slidesPerView: 2, spaceBetween: 15 },
			768: { slidesPerView: 3 },
			992: { slidesPerView: 4, spaceBetween: 15 },
			1200: { slidesPerView: 5 },
			1400: { slidesPerView: 6 },
		},
	});
	var swiper = new Swiper(".home6-testimonial-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		navigation: {
			nextEl: ".home6-testimonial-slider-next",
			prevEl: ".home6-testimonial-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 1 },
			992: { slidesPerView: 2 },
			1200: { slidesPerView: 2 },
			1400: { slidesPerView: 2 },
		},
	});
	var swiper = new Swiper(".home6-blog-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		autoplay: { delay: 2500, disableOnInteraction: false },
		pagination: { el: ".paginations1", clickable: true },
		breakpoints: {
			280: { slidesPerView: 1 },
			375: { slidesPerView: 1, spaceBetween: 15 },
			576: { slidesPerView: 1, spaceBetween: 15 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3, spaceBetween: 15 },
			1200: { slidesPerView: 3 },
			1400: { slidesPerView: 3 },
		},
	});
	var swiper = new Swiper(".home7-auction-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		navigation: {
			nextEl: ".home7-auction-slider-next",
			prevEl: ".home7-auction-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1200: { slidesPerView: 4 },
			1400: { slidesPerView: 4 },
			1600: { slidesPerView: 5 },
		},
	});
	var swiper = new Swiper(".home7-new-arrival-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		navigation: {
			nextEl: ".home7-new-arrival-slider-next",
			prevEl: ".home7-new-arrival-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1200: { slidesPerView: 4 },
			1400: { slidesPerView: 4 },
			1600: { slidesPerView: 5 },
		},
	});
	var swiper = new Swiper(".home7-banner2-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		autoplay: { delay: 2500, disableOnInteraction: false },
		pagination: { el: ".paginations1", clickable: true },
		breakpoints: {
			280: { slidesPerView: 1 },
			375: { slidesPerView: 1, spaceBetween: 15 },
			576: { slidesPerView: 1, spaceBetween: 15 },
			768: { slidesPerView: 1 },
			992: { slidesPerView: 2, spaceBetween: 15 },
			1200: { slidesPerView: 2 },
			1400: { slidesPerView: 2 },
		},
	});
	var swiper = new Swiper(".home7-blog-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 25,
		navigation: {
			nextEl: ".home7-blog-slider-next",
			prevEl: ".home7-blog-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 1 },
			386: { slidesPerView: 1 },
			576: { slidesPerView: 1 },
			768: { slidesPerView: 2 },
			992: { slidesPerView: 3 },
			1200: { slidesPerView: 4 },
			1400: { slidesPerView: 4 },
		},
	});
	var swiper = new Swiper(".auction-details-nav-slider", {
		slidesPerView: 1,
		speed: 1500,
		spaceBetween: 15,
		grabCursor: true,
		autoplay: { delay: 2500, disableOnInteraction: false },
		navigation: {
			nextEl: ".category-slider-next",
			prevEl: ".category-slider-prev",
		},
		breakpoints: {
			280: { slidesPerView: 2 },
			350: { slidesPerView: 3, spaceBetween: 10 },
			576: { slidesPerView: 3, spaceBetween: 15 },
			768: { slidesPerView: 4 },
			992: { slidesPerView: 5, spaceBetween: 15 },
			1200: { slidesPerView: 5 },
			1400: { slidesPerView: 5 },
		},
	});
	document.addEventListener("DOMContentLoaded", function (event) {
		let offset = 50;
		let circleContainer = document.querySelector(".circle-container");
		let circlePath = document.querySelector(".circle-container path");
		let pathLength = circlePath.getTotalLength();
		circlePath.style.transition = circlePath.style.WebkitTransition = "none";
		circlePath.style.strokeDasharray = pathLength;
		circlePath.style.strokeDashoffset = pathLength;
		circlePath.getBoundingClientRect();
		circlePath.style.transition = circlePath.style.WebkitTransition =
			"stroke-dashoffset 10ms linear";
		let updateLoader = () => {
			let scrollTop = window.scrollY;
			let docHeight = document.body.offsetHeight;
			let winHeight = window.innerHeight;
			let height = docHeight - winHeight;
			let progress = pathLength - (scrollTop * pathLength) / height;
			circlePath.style.strokeDashoffset = progress;
			if (scrollTop > offset) {
				circleContainer.classList.add("active");
			} else {
				circleContainer.classList.remove("active");
			}
		};
		circleContainer.onclick = function () {
			window.scrollTo({ top: 0, behavior: "smooth" });
		};
		window.onscroll = () => {
			updateLoader();
		};
		updateLoader();
	});
	$(".language-btn").on("click", function (e) {
		let parent = $(this).parent();
		parent.find(".language-list").toggleClass("active");
		e.stopPropagation();
	});
	$(document).on("click", function (e) {
		if (!$(e.target).closest(".language-btn").length) {
			$(".language-list").removeClass("active");
		}
	});
	$(".search-btn").on("click", function (e) {
		let parent = $(this).parent();
		parent.find(".search-input").toggleClass("active");
		e.stopPropagation();
	});
	$(document).on("click", function (e) {
		if (
			!$(e.target).closest(
				".search-input, .search-btn, .sidebar-menu, .menu-icon"
			).length
		) {
			$(".search-input").removeClass("active");
			$(".sidebar-menu").removeClass("show-menu");
		}
	});
	$(".search-close").on("click", function (e) {
		$(".search-input").removeClass("active");
	});
	$(".btn-hover")
		.on("mouseenter", function (e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find("span").css({ top: 0, left: 0 });
			$(this).find("span").css({ top: relY, left: relX });
		})
		.on("mouseout", function (e) {
			var parentOffset = $(this).offset(),
				relX = e.pageX - parentOffset.left,
				relY = e.pageY - parentOffset.top;
			$(this).find("span").css({ top: 0, left: 0 });
			$(this).find("span").css({ top: relY, left: relX });
		});
	$("[data-countdown]").each(function () {
		var $deadline = new Date($(this).data("countdown")).getTime();
		var $dataDays = $(this).children("[data-days]");
		var $dataHours = $(this).children("[data-hours]");
		var $dataMinutes = $(this).children("[data-minutes]");
		var $dataSeconds = $(this).children("[data-seconds]");
		var x = setInterval(function () {
			var now = new Date().getTime();
			var t = $deadline - now;
			var days = Math.floor(t / (1000 * 60 * 60 * 24));
			var hours = Math.floor((t % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
			var minutes = Math.floor((t % (1000 * 60 * 60)) / (1000 * 60));
			var seconds = Math.floor((t % (1000 * 60)) / 1000);
			$dataDays.html(`${days} <span>Days</span> <span>Days</span>`);
			$dataHours.html(`${hours} <span>Hours</span> <span>Hours</span>`);
			$dataMinutes.html(`${minutes} <span>Mint</span> <span>Minutes</span>`);
			$dataSeconds.html(`${seconds} <span>Sec</span> <span>Seconds</span>`);
			if (t <= 0) {
				clearInterval(x);
				$dataDays.html("00 <span>Days</span> <span>Days</span>");
				$dataHours.html("00 <span>Hours</span> <span>Hours</span>");
				$dataMinutes.html("00 <span>Mint</span> <span>Minutes</span>");
				$dataSeconds.html("00 <span>Sec</span> <span>Seconds</span>");
			}
		}, 1000);
	});
	$(".grid-view li").on("click", function () {
		var clickedClass = $(this).attr("class");
		var className = clickedClass.replace("item-", "");
		var targetDiv = $(".list-grid-product-wrap");
		targetDiv
			.removeClass()
			.addClass("list-grid-product-wrap " + className + "-wrapper");
		$(this).siblings().removeClass("active");
		$(this).addClass("active");
	});
	$(".filter").on("click", function (e) {
		e.stopPropagation();
		$(".filter-sidebar, .filter-top").toggleClass("slide");
	});
	$(document).on("click", function (e) {
		if (!$(e.target).closest(".filter-sidebar, .filter-top, .filter").length) {
			$(".filter-sidebar, .filter-top").removeClass("slide");
		}
	});
	$(".select-input").on("click", function () {
		$(".custom-select-wrap").toggleClass("active");
	});
	$(".searchbox-input").each(function () {
		var $container = $(this);
		$container.find(".option-list li").on("click", function () {
			var destinationText = $(this).find(".destination h6, h6").text();
			$container.find(".select-input input").val(destinationText);
			$container.find(".custom-select-wrap").removeClass("active");
		});
		$(document).on("click", function (event) {
			if (!$(event.target).closest($container).length) {
				$container.find(".custom-select-wrap").removeClass("active");
			}
		});
		$container
			.find(".custom-select-search-area input")
			.on("input", function () {
				var searchText = $(this).val().toLowerCase();
				$container.find(".option-list li").each(function () {
					var destinationText = $(this)
						.find(".destination h6")
						.text()
						.toLowerCase();
					if (destinationText.includes(searchText)) {
						$(this).show();
					} else {
						$(this).hide();
					}
				});
			});
	});
	$(".quantity__minus").on("click", function (e) {
		e.preventDefault();
		var input = $(this).siblings(".quantity__input");
		var value = parseInt(input.val());
		if (value > 1) {
			value--;
		}
		input.val(value.toString().padStart(2, "0"));
	});
	$(".quantity__plus").on("click", function (e) {
		e.preventDefault();
		var input = $(this).siblings(".quantity__input");
		var value = parseInt(input.val());
		value++;
		input.val(value.toString().padStart(2, "0"));
	});
	const togglePassword = document.querySelector("#togglePassword");
	const password = document.querySelector("#password");
	if (togglePassword) {
		togglePassword.addEventListener("click", function (e) {
			const type =
				password.getAttribute("type") === "password" ? "text" : "password";
			password.setAttribute("type", type);
			this.classList.toggle("bi-eye");
		});
	}
	const togglePassword2 = document.getElementById("togglePassword2");
	const password2 = document.querySelector("#password2");
	if (togglePassword2) {
		togglePassword2.addEventListener("click", function (e) {
			const type =
				password2.getAttribute("type") === "password" ? "text" : "password";
			password2.setAttribute("type", type);
			this.classList.toggle("bi-eye");
		});
	}
	const togglePassword3 = document.getElementById("togglePassword3");
	const password3 = document.querySelector("#password3");
	if (togglePassword3) {
		togglePassword3.addEventListener("click", function (e) {
			const type =
				password3.getAttribute("type") === "password" ? "text" : "password";
			password3.setAttribute("type", type);
			this.classList.toggle("bi-eye");
		});
	}
	jQuery(window).on("load", function () {
		new WOW().init();
		window.wow = new WOW({
			boxClass: "wow",
			animateClass: "animated",
			offset: 0,
			mobile: true,
			live: true,
			offset: 80,
		});
		window.wow.init();
	});
	const marquee = document.querySelectorAll(".marquee_text");
	if (marquee) {
		$(".marquee_text").marquee({
			direction: "left",
			duration: 25000,
			gap: 50,
			delayBeforeStart: 0,
			duplicated: true,
			startVisible: true,
		});
	}
})(jQuery);
