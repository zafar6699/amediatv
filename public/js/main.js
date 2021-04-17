/** @format */

$(document).ready(function () {
	$(".carousel-series .__seria_right").click(function () {
		$(".carousel-series .owl-next").click()
	})
	$(".carousel-series .__seria_left").click(function () {
		$(".carousel-series .owl-prev").click()
	})

	$(".reply_button").click(function () {
		$(".reply_button")
			.not(this)
			.parent()
			.parent()
			.find(".reply_content")
			.addClass("none_cc")

		$(".reply_button")
			.not(this)
			.parent()
			.parent()
			.find(".reply_content textarea")
			.val("")
		$(this).parent().parent().find(".reply_content").removeClass("none_cc")
	})

	$(".video-player .carousel-series .item").click(function () {
		let src = $(this).find("input.video_hidden").val()
		let url = $(this).find("input.download_hidden").val()
		$(".video-player iframe").attr("src", src)
		$("a.serial_url").attr("href", url)

		$(".video-player .carousel-series .item")
			.not(this)
			.find("a")
			.removeClass("__active")

		$(this).find("a").addClass("__active")
	})

	$(".anime-carousel").owlCarousel({
		// loop:true,
		autoplay: true,
		margin: 0,
		loop: true,
		nav: true,
		responsive: {
			0: {
				items: 1,
			},
			300: {
				items: 1,
			},
			700: {
				items: 1,
			},
			1000: {
				items: 1,
			},
		},
	})

	$(".banner-inner-carousel").owlCarousel({
		// loop:true,
		autoplay: false,
		margin: 15,
		loop: true,
		nav: true,
		mouseDrag: false,
		touchDrag: false,
		responsive: {
			0: {
				items: 1,
			},
			300: {
				items: 2,
			},
			700: {
				items: 5,
			},
			1000: {
				items: 5,
			},
		},
	})

	$(".owl-kadr").owlCarousel({
		// loop:true,
		autoplay: false,
		margin: 15,
		loop: true,
		nav: true,
		responsive: {
			0: {
				items: 1,
			},
			300: {
				items: 2,
			},
			700: {
				items: 4,
			},
			1000: {
				items: 5,
			},
		},
	})
	$(".season-carousel").owlCarousel({
		// loop:true,
		autoplay: false,
		margin: 5,
		loop: false,
		nav: true,
		responsive: {
			0: {
				items: 2,
			},
			300: {
				items: 3,
			},
			700: {
				items: 4,
			},
			1000: {
				items: 6,
			},
		},
	})

	$(window).click(function () {
		$(
			"header.header ul.menu-nav li.dropdown-li div.dropdown-content"
		).slideUp(200)
	})

	$("header.header ul.menu-nav li.dropdown-li").click(function (e) {
		$("header.header ul.menu-nav li.dropdown-li")
			.not(this)
			.find("div.dropdown-content")
			.slideUp(200)
		$(this).find("div.dropdown-content").slideToggle(200)
		e.stopPropagation()
	})

	$(".click__left").click(function () {
		$("div.carousel-inner .owl-prev").click()
	})

	$(".click__right").click(function () {
		$("div.carousel-inner .owl-next").click()
	})
	$(".slider__prev").click(function () {
		$("div.banner .owl-prev").click()
	})

	$(".slider__next").click(function () {
		$("div.banner .owl-next").click()
	})

	$(".tab-animes ul.tab-li li").click(function () {
		$(this).addClass("link__active")
		$(".tab-animes ul.tab-li li").not(this).removeClass("link__active")
		$(".tab-animes div.tab-content aside")
			.removeClass("__active")
			.eq($(this).index())
			.addClass("__active")
	})

	$("span.header-bars").click(function () {
		$("header.header ul.menu-nav").css({
			left: "0",
		})
	})
	$("ul.menu-nav .header_close").click(function () {
		$("header.header ul.menu-nav").css({
			left: "-102%",
		})
	})

	var readURL = function (input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader()

			reader.onload = function (e) {
				$(".profile-pic").attr("src", e.target.result)
			}

			reader.readAsDataURL(input.files[0])
		}
	}

	$(".file-upload").on("change", function () {
		readURL(this)
	})

	$(".upload-button").on("click", function () {
		$(".file-upload").click()
	})

	$("div.password-eye button").click(function () {
		let x = $(this).parent().find("input")
		if (x.attr("type") === "password") {
			x.attr("type", "text")
		} else {
			x.attr("type", "password")
		}
		$(this).find("i").toggleClass("none-eye")
	})
})
