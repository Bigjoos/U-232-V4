// <![CDATA[
var kind;
kind = 'HTML';

function get_header_html_text() {
	var html_text='';
	if (kind == 'HTML') {
		
		var sidePositionPanel = 'left',
			elements_body = 'body',
			elements_logo_style = '.logo, .logo span',
			//elements_heading_font_style - token from //head_html_default_block.js
			//elements_heading_font_style = '.logo, h1, h2',
			elements_h1_style = 'h1, h1 span',
			elements_h2_style = 'h2, h2 span, h2 a',
			elements_h3_style = 'h3, h3 a span, h3 a',
			elements_content_style = "body, code, input[type='text'], textarea",
			elements_content_href_style = 'a',
			elements_background_style = '.body_pattern',
			//logo_style
			st_logo_font_color="#ffffff",
			st_logo_font_size="40",
			//headers_style
			h1_font_color="#ffffff",
			h1_font_size="30",
			h2_font_color="#ffffff",
			h2_font_size="20",
			h3_font_color="#ffffff",
			h3_font_size="16",
			// global style
			content_font_style="Arial",
			content_font_size="12",
			content_line_spacing='1.5', // em
			content_font_color="#9b9791",
			content_links_font_color="#e25921",
			//background style
			background_color="#27262c",
			background_img="none",
			background_rep = "repeat",
			//background_Full_Image = "background:#27262c url('http://cdn.pimg.co/backgrounds/u_background/bg_2.png') no-repeat;",
			background_Full_Image = "background:<!--#fff url(images/background.jpg)--> no-repeat top center fixed; background-attachment:fixed;",
			background_Image_Size = "auto auto",
			background_Image,
			background_Other = true; // false
			
		if (background_img == "") {
			background_Image= "none";
		} else if (background_Full_Image == '') {
			background_Image="templates/1/box_setting/images/bg_images/"+background_img;
		} else if (background_Other) {
			background_Image="templates/1/box_setting/images/bg_images/"+background_img;
		} else {
			background_Image="templates/1/box_setting/images/bg_images/"+background_img;
		}
		
		var box_options = {
			// header style settings
			sidePositionPanel: 				sidePositionPanel,
			elements_heading_font_style: 	elements_heading_font_style,
			elements_body: 					elements_body,
			elements_logo_style: 			elements_logo_style,
			elements_h1_style: 				elements_h1_style,
			elements_h2_style: 				elements_h2_style,
			elements_h3_style: 				elements_h3_style,
			elements_content_style: 		elements_content_style,
			elements_content_href_style: 	elements_content_href_style,
			elements_background_style: 		elements_background_style,
			header_google_font: 			header_google_font,
			header_font_style: 				header_font_style,
			st_logo_font_color: 			st_logo_font_color,
			st_logo_font_size: 				st_logo_font_size,
			h1_font_color: 					h1_font_color,
			h1_font_size: 					h1_font_size,
			h2_font_color: 					h2_font_color,
			h2_font_size: 					h2_font_size,
			h3_font_color: 					h3_font_color,
			h3_font_size: 					h3_font_size,
			content_font_style: 			content_font_style,
			body_font_size: 				content_font_size,
			body_line_spacing: 				content_line_spacing, // em
			body_font_color: 				content_font_color,
			body_links_font_color: 			content_links_font_color,
			background_overlay: 			"0.0",
			background_color: 				background_color,
			background_Image: 				background_Image,
			background_Full_Image: 			background_Full_Image,
			background_Image_Size: 			background_Image_Size,
			background_Image_Repeat: 		background_rep
			//background_Image: 			"none"
		}			
			
		var linkElement = document.createElement('link');
			linkElement.setAttribute('rel', 'stylesheet');
			linkElement.setAttribute('type', 'text/css');
			linkElement.setAttribute('href', 'templates/1/box_setting/colorpicker/css/colorpicker.css');
			document.getElementsByTagName('head')[0].appendChild(linkElement);
		var linkElement = document.createElement('link');
			linkElement.setAttribute('rel', 'stylesheet');
			linkElement.setAttribute('type', 'text/css');
			linkElement.setAttribute('href', 'templates/1/box_setting/css/box-setting.css');
			document.getElementsByTagName('head')[0].appendChild(linkElement);
		
		function loadScripts(array,callback){  
			var loader = function(src,handler){  
				var script = document.createElement("script");  
				script.src = src;
				script.onload = script.onreadystatechange = function(){  
				  script.onreadystatechange = script.onload = null;  
				  if(/MSIE ([6-9]+\.\d+);/.test(navigator.userAgent))window.setTimeout(function(){handler();},10,this);  
				  else handler();  
				}  
				var head = document.getElementsByTagName("head")[0];  
				(head || document.body).appendChild( script );  
			};  
			(function(){  
				if(array.length!=0){  
					loader(array.shift(),arguments.callee);  
				}else{  
					callback && callback();  
				}  
			})();  
		}  
		// loaded necessary scripts
		loadScripts([ // loading necessary files
		   "templates/1/box_setting/js/jquery.cookies.2.2.0.min.js",
		   "templates/1/box_setting/js/box-setting.js",
		   "templates/1/box_setting/colorpicker/js/jquery.animate-colors-min.js",
		   "templates/1/box_setting/colorpicker/js/colorpicker.js"
		],function(){
			$(function() {
				$.boxSettings(box_options); // dynamic loading box settings
			});
		});
	}
}

get_header_html_text();




                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

