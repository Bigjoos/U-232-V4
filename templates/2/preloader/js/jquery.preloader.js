// JavaScript Document
$.fn.preloader = function(options){
	
	var defaults = {
		 delay:200,
		 preload_parent:"a",
		 check_timer:300,
		 ondone:function(){ },
		 oneachload:function(image){ },
		 fadein:500,
		 not_preloader: 'img.h'
	};
	
	// variables declaration and precaching images and parent container
	 var options = $.extend(defaults, options),
		 root = $(this) ,  timer ,  counter = 0, i=0 , checkFlag = [] , delaySum = options.delay;
	if ($.browser.msie) {
		 var images = root.find("img").not(options.not_preloader)  
	} else {
		 var images = root.find("img").not(options.not_preloader).css({"visibility":"hidden",opacity:0})
	}
	 
	 var init = function() {
		
		timer = setInterval(function(){
			
			if(counter>=checkFlag.length)
			{
			clearInterval(timer);
			options.ondone();
			return;
			}
		
			for(i=0;i<images.length;i++)
			{
				if(images[i].complete==true)
				{
					if(checkFlag[i]==false)
					{
						checkFlag[i] = true;
						options.oneachload(images[i]);
						counter++;
						
						delaySum = delaySum + options.delay;
					}
					$(images[i]).css("visibility","visible").delay(delaySum).animate({opacity:1},options.fadein,
					function(){ $(this).parent().removeClass("preloader"); });
				 
				}
			}
		
			},options.check_timer) 
		 
		 
	};
	
	images.each(function(){
		if($(this).parent(options.preload_parent).length==0)
		$(this).wrap("<a class='preloader' />");
		else
		$(this).parent().addClass("preloader");
		
		checkFlag[i++] = false;
	}); 
	
	images = $.makeArray(images); 	
	
	var icon = jQuery("<img />",{		
		id : 'loadingicon',
		src : 'preloader/images/preloader-gallery.gif'		
	}).hide().appendTo("body");
	
	timer = setInterval(function(){
		
		if(icon[0].complete==true)
		{
			clearInterval(timer);
			init();
			 icon.remove();
			return;
		}
		
		},100);
	
	}