
// $(".reg-button-click").click(function(){
// 	let name = $(".modal-register-post .modal-body input[name='name']").val()
// 	let email = $(".modal-register-post .modal-body input[name='email']").val()
// 	let password = $(".modal-register-post .modal-body input[name='password']").val()
// 	let con_password = $(".modal-register-post .modal-body input[name='uid']").val()
// 	console.log(name, email);

// 	let user = {
// 		name: name,
// 		email: email,
// 		password: password,
// 		uid: 123
// 	}

// 	axios.post({
// 		url: "http://amediatv.uz/auth/register",
// 		method: "POST",
// 		data: user
// 	})
// 	.then(response => {
// 		console.log(response)
// 	})
// 	.catch(err => {
// 		console.log(err)
// 	})
// });


$(document).ready(function(){

    $('.anime-carousel').owlCarousel({
	    // loop:true,
	    autoplay: true,
        margin: 0,
		loop: true,
	    nav: true,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items: 1,
	        },
	        700:{
                items: 1,
	        },
	        1000:{
	            items: 1
	        }
	    }
    });

	$('.banner-inner-carousel').owlCarousel({
	    // loop:true,
	    autoplay: false,
        margin: 15,
		loop: true,
	    nav: true,
		mouseDrag: false,
		touchDrag: false,
	    responsive:{
	        0:{
                items:1,
	        },
	        300:{
                items: 2,
	        },
	        700:{
                items: 5,
	        },
	        1000:{
	            items: 5
	        }
	    }
    });

	$(window).click(function(){
		$("header.header ul.menu-nav li.dropdown-li div.dropdown-content").slideUp(200);

	})

	$("header.header ul.menu-nav li.dropdown-li").click(function(e){
		$("header.header ul.menu-nav li.dropdown-li").not(this).find("div.dropdown-content").slideUp(200);
		$(this).find("div.dropdown-content").slideToggle(200);
		e.stopPropagation();

	})

	$(".click__left").click(function(){
		$("div.carousel-inner .owl-prev").click()
	});

	$(".click__right").click(function(){
		$("div.carousel-inner .owl-next").click()
	});

	$(".tab-animes ul li").click(function(){
        $(this).addClass("link__active");
        $(".tab-animes ul li").not(this).removeClass("link__active");
        $(".tab-animes div.tab-content aside").removeClass("__active").eq($(this).index()).addClass("__active");
        
    }); 

	$("span.header-bars").click(function(){
		$("header.header ul.menu-nav").css({
			"left": "0"
		});
	})
	$("ul.menu-nav .header_close").click(function(){
		$("header.header ul.menu-nav").css({
			"left": "-102%"
		});
	});

	var readURL = function(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                $('.profile-pic').attr('src', e.target.result);
            }
    
            reader.readAsDataURL(input.files[0]);
        }
    }
   
    $(".file-upload").on('change', function(){
        readURL(this);
    });
    
    $(".upload-button").on('click', function() {
       $(".file-upload").click();
    });

	   


}); 