// <![CDATA[
$(function() {
	
//$('.content_box,.centercol,.btn a span').css({"border-radius":"5px", "-moz-border-radius":"5px", "-webkit-border-radius":"5px"});
//$('#now_slider').css({"-webkit-box-shadow": "0px -1px 3px #d7d7d7", "-moz-box-shadow":"0px -1px 3px #d7d7d7", "box-shadow":"0px -1px 3px #d7d7d7"});


/*
$('#contactform input,#contactform textarea').css({"border-radius":"4px", "-moz-border-radius":"4px", "-webkit-border-radius":"4px"});
*/

});	





$(function () {
/*	
	var arr_links = location.href.split('/');
	var length = arr_links.length;
	$('.menu li').each(function () {
		if ($(this).children('a').attr('href') == arr_links[(length-1)]) {
			$(this).addClass('active');
			$(this).children('a').addClass('active');
			$(this).parents('li').addClass('active');
			$(this).parents('li').children('a').addClass('active');
		}
	})
	
	$(function(){
		$("a[rel^='prettyPhoto']").prettyPhoto({
			social_tools: false,
		});
	});



	$().UItoTop();
	
	$("#gallery, #gallery-imgs").preloader({not_preloader:'.h2_arrows img,img.h, img.r_plus, img.r_plus_overlay, .showcase-slide img, .flickr img, .sidebar_flickr img, #now_slider img'});

    $("#ticker").tweet({
        username: "twitter", // define your twitter username
        page: 1,
        avatar_size: 16, // avatar size in px
        count: 20, // how many tweets to show
        loading_text: "loading ..."
    }).bind("loaded", function () {
        var ul = $(this).find(".tweet_list");
        var ticker = function () {
                setTimeout(function () {
                    ul.find('li:first').animate({
                        marginTop: '-4em'
                    }, 500, function () {
                        $(this).detach().appendTo(ul).removeAttr('style');
                    });
                    ticker();
                }, 8000); // duration before next tick (4000 = 4 secs)
            };
        ticker();
    });

	$('#contactform_main').submit(function(){				  
		var action = $(this).attr('action');
		$.post(action, { 
			name: $('#name').val(),
			email: $('#email').val(),
			company: $('#url').val(),
			subject: $('#subject').val(),
			message: $('#message').val()
		},
			function(data){
				$('#contactform_main #submit').attr('disabled','');
				$('.response').remove();
				$('#contactform_main').before('<p class="response">'+data+'</p>');
				$('.response').slideDown();
				if(data=='Message sent!') $('#contactform_main').slideUp();
			}
		); 
		return false;
	});


*/

});

$(document).ready (function (){
	$("a.oba1").mouseover(function () {$('img.oba1').fadeIn(400);});
	$("a.oba1").mouseleave(function () {$('img.oba1').fadeOut(400);});
	
	$("a.oba2").mouseover(function () {$('img.oba2').fadeIn(400);});
	$("a.oba2").mouseleave(function () {$('img.oba2').fadeOut(400);});
	
	$("a.oba3").mouseover(function () {$('img.oba3').fadeIn(400);});
	$("a.oba3").mouseleave(function () {$('img.oba3').fadeOut(400);});
	
	$("a.oba4").mouseover(function () {$('img.oba4').fadeIn(400);});
	$("a.oba4").mouseleave(function () {$('img.oba4').fadeOut(400);});
	
	$("a.oba5").mouseover(function () {$('img.oba5').fadeIn(400);});
	$("a.oba5").mouseleave(function () {$('img.oba5').fadeOut(400);});
	
	$("a.oba6").mouseover(function () {$('img.oba6').fadeIn(400);});
	$("a.oba6").mouseleave(function () {$('img.oba6').fadeOut(400);});
	
	
	})
// ]]>
