// <![CDATA[
/*!
 * author: Bursak Alexandr
 * name: Side panel setting
 * version: 0.1.4
 */
$.boxSettings = function (options) {
	/* Default settings */
	var pathname =  window.location.pathname
	var now_path = pathname.split('/');

	/* Cookies settings */
	var path_to_cookie = 'cookie_setting'+now_path.slice(0,-1).join("_");
	var cookies = {};

	var box_setting = {
		// plugin style settings
		elements_body: 'body',
		elements_logo_style: '.logo, .logo span, .logo a',
		elements_heading_font_style: '.logo, h1, h2, h3, h4, h5, h6',
		elements_h1_style: 'h1, h1 span, h1 a',
		elements_h2_style: 'h2, h2 span, h2 a',
		elements_h3_style: 'h3, h3 span, h3 a',
		elements_content_style: 'body, code, input[type="text"], textarea',
		elements_content_href_style: 'a',
		elements_background_style: '.body_pattern',

		// plugin settings
		sideButtonOpen: '<img src="templates/1/box_setting/images/box/right_arrow.png" alt="Open" />', // example: '&raquo;'
		sideButtonClose: '<img src="templates/1/box_setting/images/box/left_arrow.png" alt="Close" />', // example: '&laquo;'
		sidePaletteOpen: '˅',
		sidePaletteClose: '˄',
		sidePaletteView: 6,
		sidePositionPanel: 'left', // right

		// heading style
		header_google_font:'Lato',
		header_font_style:'Lato',
		st_logo_font_color:'#ffffff',
		st_logo_font_size:'36',
		h1_font_color:'#777777',
		h1_font_size:'18',
		h2_font_color:'#4f4f4f',
		h2_font_size:'16',
		h3_font_color:'#3c3c3c',
		h3_font_size:'14',

		// content style
		content_font_style:'Arial',
		body_font_size:'12',
		body_line_spacing:'1.2', // em
		body_font_color:'#8b8b8e',
		body_links_font_color:'#4aaee1',

		// background style
		background_overlay:'0.2',
		background_color:'#ededee',
		background_Image:'none', // example: http://cdn.dcodes.net/backgrounds/4.jpg
		background_Full_Image: '', // if group Other than ''
		background_Image_Repeat:'repeat', //example: no-repeat/repeat-x/repeat-y/repeat
		background_Image_Size:'auto auto', // example: 'auto auto', '100% 100%', 'cover'

		// work setting
		debug: 0,
		th_image_width: 15,
		th_image_height: 10,
		font_heading_set:	['h1', 'h2', 'h3']
	};

	var default_color_palete = ['#333333','#f2f2f2','#666666','#727272','#cbb8a1','#a0a0a0',
							    '#a7033f','#db0440','#ef1f28','#ff4c36','#4c4880','#0059ab',
							    '#0a67ed','#0076be','#53a2d4','#00b2ef','#53a2d4','#00b2ef',
							    '#00736c','#00ab56','#00d14e','#27d000','#6ab11e','#8fc740'],
		listBackgroundImg =	['1.jpg',	'2.jpg',	'3.jpg',	'4.jpg',	'5.jpg',	'9.jpg',
							 '10.jpg',	'11.jpg',	'13.jpg',	'15.jpg',	'17.jpg',	'22.jpg',
							 '12.jpg',	'6.jpg',	'7.jpg',	'8.jpg',	'14.jpg',	'16.jpg',
							 '18.jpg',	'19.jpg',	'20.jpg',	'21.jpg',	'23.jpg',	'24.jpg'],
		listBackgroundImgPath =	['background: url("templates/1/box_setting/images/bg_images/backgrounds/1.jpg") repeat top center;',
						 		 'background: url("templates/1/box_setting/images/bg_images/backgrounds/2.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/3.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/4.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/5.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/9.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/10.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/11.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/13.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/15.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/17.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/22.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/12.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/6.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/7.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/8.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/14.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/16.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/18.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/19.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/20.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/21.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/23.jpg") repeat top center;',
								 'background: url("templates/1/box_setting/images/bg_images/backgrounds/24.jpg") repeat top center;'],
		listBackgroundColorImgPath={
			0:['Spotlight Navy','background:#3e525d url("templates/1/box_setting/images/bg_images/color/c1.jpg") no-repeat center top;','color/c1.jpg'],
			1:['Spotlight Gray','background:#4a4f53 url("templates/1/box_setting/images/bg_images/color/c2.jpg") no-repeat center top;','color/c2.jpg'],
			2:['Spotlight Pro Gray','background:#4c4952 url("templates/1/box_setting/images/bg_images/color/c3.jpg") no-repeat center top;','color/c3.jpg'],
			3:['Spotlight Blue','background:#295675 url("templates/1/box_setting/images/bg_images/color/c4.jpg") no-repeat center top;','color/c4.jpg'],
			4:['Spotlight Green','background:#507528 url("templates/1/box_setting/images/bg_images/color/c5.jpg") no-repeat center top;','color/c5.jpg'],
			5:['Spotlight Yellow','background:#746b28 url("templates/1/box_setting/images/bg_images/color/c6.jpg") no-repeat center top;','color/c6.jpg'],
			6:['Spotlight Red','background:#74282a url("templates/1/box_setting/images/bg_images/color/c7.jpg") no-repeat center top;','color/c7.jpg'],
			7:['Chalkboard','background:#1f3125 url("templates/1/box_setting/images/bg_images/color/c8.jpg") no-repeat center top;','color/c8.jpg'],
			8:['Aurora Atmosphere Purple','background:#28211b url("templates/1/box_setting/images/bg_images/color/c9.jpg") no-repeat center top;','color/c9.jpg'],
			9:['Aurora Atmosphere Red','background:#440f15 url("templates/1/box_setting/images/bg_images/color/c10.jpg") no-repeat center top;','color/c10.jpg'],
			10:['Aurora Atmosphere Blue','background:#011923 url("templates/1/box_setting/images/bg_images/color/c11.jpg") no-repeat center top;','color/c11.jpg'],
			11:['Underwater','background:#589ca7 url("templates/1/box_setting/images/bg_images/color/c12.jpg") no-repeat center top;','color/c12.jpg'],
			12:['Visionary Teal','background:#010204 url("templates/1/box_setting/images/bg_images/color/c13.jpg") no-repeat center top;','color/c13.jpg'],
			13:['Visionary Purple','background:#020202 url("templates/1/box_setting/images/bg_images/color/c14.jpg") no-repeat center top;','color/c14.jpg'],
			14:['Visionary Gold','background:#040203 url("templates/1/box_setting/images/bg_images/color/c15.jpg") no-repeat center top;','color/c15.jpg'],
			15:['Visionary Red','background:#090001 url("templates/1/box_setting/images/bg_images/color/c16.jpg") no-repeat center top;','color/c16.jpg'],
			16:['Bubble Orange','background:#fe5f03 url("templates/1/box_setting/images/bg_images/color/c17.jpg") no-repeat center top;','color/c17.jpg'],
			17:['Bubble Blue','background:#103786 url("templates/1/box_setting/images/bg_images/color/c18.jpg") no-repeat center top;','color/c18.jpg'],
			18:['Echo Blur','background:#191b0e url("templates/1/box_setting/images/bg_images/color/c19.jpg") no-repeat center top;','color/c19.jpg'],
			19:['Fantasy Blur','background:#12101d url("templates/1/box_setting/images/bg_images/color/c20.jpg") no-repeat center top;','color/c20.jpg'],
			20:['Steel Blur','background:#151618 url("templates/1/box_setting/images/bg_images/color/c21.jpg") no-repeat center top;','color/c21.jpg'],
			21:['Passionate Blur','background:#1c1012 url("templates/1/box_setting/images/bg_images/color/c22.jpg") no-repeat center top;','color/c22.jpg'],
			22:['Ocean Blur','background:#1a1114 url("templates/1/box_setting/images/bg_images/color/c23.jpg") no-repeat center top;','color/c23.jpg'],
			23:['Red Love','background-image:url("templates/1/box_setting/images/bg_images/color/c24.jpg");','color/c24.jpg'],
			24:['Green Wallpaper','background-image:url("templates/1/box_setting/images/bg_images/color/c25.jpg");','color/c25.jpg'],
			25:['Red Christmas','background-image:url("templates/1/box_setting/images/bg_images/color/c26.jpg");','color/c26.jpg'],
			26:['Historic Panel','background-image:url("templates/1/box_setting/images/bg_images/color/c27.jpg");','color/c27.jpg'],
			27:['Space','background:#060610 url("templates/1/box_setting/images/bg_images/color/c28.jpg") no-repeat center top;','color/c28.jpg']
		},
		countBackgroundColorImgPath = 27,
		listBackgroundDarkImgPath= {
			0:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d1.png");','dark/d1.png'],
			1:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d2.png");','dark/d2.png'],
			2:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d3.png");','dark/d3.png'],
			3:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d4.png");','dark/d4.png'],
			4:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d5.jpg");','dark/d5.jpg'],
			5:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d6.jpg");','dark/d6.jpg'],
			6:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d7.jpg");','dark/d7.jpg'],
			7:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d8.jpg");','dark/d8.jpg'],
			8:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d9.png");','dark/d9.png'],
			9:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d10.png");','dark/d10.png'],
			10:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d11.jpg");','dark/d11.jpg'],
			11:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d12.png");','dark/d12.png'],
			12:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d13.png");','dark/d13.png'],
			13:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d14.png");','dark/d14.png'],
			14:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d15.png");','dark/d15.png'],
			15:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d16.png");','dark/d16.png'],
			16:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d17.jpg");','dark/d17.jpg'],
			17:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d18.png");','dark/d18.png'],
			18:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d19.png");','dark/d19.png'],
			19:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d20.png");','dark/d20.png'],
			20:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d21.png");','dark/d21.png'],
			21:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d22.png");','dark/d22.png'],
			22:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d23.png");','dark/d23.png'],
			23:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d24.png");','dark/d24.png'],
			24:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d25.png");','dark/d25.png'],
			25:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d26.png");','dark/d26.png'],
			26:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d27.png");','dark/d27.png'],
			27:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d28.png");','dark/d28.png'],
			28:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d29.png");','dark/d29.png'],
			29:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d30.jpg");','dark/d30.jpg'],
			30:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d31.png");','dark/d31.png'],
			31:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d32.jpg");','dark/d32.jpg'],
			32:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d33.jpg");','dark/d33.jpg'],
			33:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d34.jpg");','dark/d34.jpg'],
			34:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d35.jpg");','dark/d35.jpg'],
			35:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d36.jpg");','dark/d36.jpg'],
			36:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d37.jpg");','dark/d37.jpg'],
			37:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d38.jpg");','dark/d38.jpg'],
			38:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d39.png");','dark/d39.png'],
			39:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d40.png");','dark/d40.png'],
			40:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d41.jpg");','dark/d41.jpg'],
			41:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d42.png");','dark/d42.png'],
			42:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d43.png");','dark/d43.png'],
			43:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d44.png");','dark/d44.png'],
			44:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d45.png");','dark/d45.png'],
			45:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d46.png");','dark/d46.png'],
			46:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d47.png");','dark/d47.png'],
			47:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d48.png");','dark/d48.png'],
			48:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d49.png");','dark/d49.png'],
			49:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d50.png");','dark/d50.png'],
			50:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d51.png");','dark/d51.png'],
			51:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d52.png");','dark/d52.png'],
			52:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d53.png");','dark/d53.png'],
			53:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d54.png");','dark/d54.png'],
			54:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d55.png");','dark/d55.png'],
			55:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d56.png");','dark/d56.png'],
			56:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d57.png");','dark/d57.png'],
			57:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d58.png");','dark/d58.png'],
			58:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d59.png");','dark/d59.png'],
			59:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d60.png");','dark/d60.png'],
			60:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d61.png");','dark/d61.png'],
			61:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d62.png");','dark/d62.png'],
			62:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d63.png");','dark/d63.png'],
			63:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d64.png");','dark/d64.png'],
			64:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d65.png");','dark/d65.png'],
			65:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d66.png");','dark/d66.png'],
			66:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d67.png");','dark/d67.png'],
			67:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d68.png");','dark/d68.png'],
			68:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d69.png");','dark/d69.png'],
			69:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d70.png");','dark/d70.png'],
			70:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d71.png");','dark/d71.png'],
			71:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d72.png");','dark/d72.png'],
			72:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d73.png");','dark/d73.png'],
			73:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d74.png");','dark/d74.png'],
			74:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d75.png");','dark/d75.png'],
			75:['','background-image:url("templates/1/box_setting/images/bg_images/dark/d76.png");','dark/d76.png'],
			76:['','background:#1f2d33 url("templates/1/box_setting/images/bg_images/dark/graph.png") repeat center top;','dark/graph.png'],
			77:['','background:#333333 url("templates/1/box_setting/images/bg_images/dark/graph.png") repeat center top;','dark/graph.png'],
			78:['','background:#2b76bb url("templates/1/box_setting/images/bg_images/dark/graph.png") repeat center top;','dark/graph.png']
		},
		countBackgroundDarkImgPath = 78,
		listBackgroundLightImgPath={
			0:['','background-image:url("templates/1/box_setting/images/bg_images/light/l1.png");','light/l1.png'],
			1:['','background-image:url("templates/1/box_setting/images/bg_images/light/l2.png");','light/l2.png'],
			2:['','background-image:url("templates/1/box_setting/images/bg_images/light/l3.jpg");','light/l3.jpg'],
			3:['','background-image:url("templates/1/box_setting/images/bg_images/light/l4.png");','light/l4.png'],
			4:['','background-image:url("templates/1/box_setting/images/bg_images/light/l5.png");','light/l5.png'],
			5:['','background-image:url("templates/1/box_setting/images/bg_images/light/l6.png");','light/l6.png'],
			6:['','background-image:url("templates/1/box_setting/images/bg_images/light/l7.png");','light/l7.png'],
			7:['','background-image:url("templates/1/box_setting/images/bg_images/light/l8.png");','light/l8.png'],
			8:['','background-image:url("templates/1/box_setting/images/bg_images/light/l9.png");','light/l9.png'],
			9:['','background-image:url("templates/1/box_setting/images/bg_images/light/l10.png");','light/l10.png'],
			10:['','background-image:url("templates/1/box_setting/images/bg_images/light/l11.png");','light/l11.png'],
			11:['','background-image:url("templates/1/box_setting/images/bg_images/light/l12.png");','light/l12.png'],
			12:['','background-image:url("templates/1/box_setting/images/bg_images/light/l13.png");','light/l13.png'],
			13:['','background-image:url("templates/1/box_setting/images/bg_images/light/l14.png");','light/l14.png'],
			14:['','background-image:url("templates/1/box_setting/images/bg_images/light/l15.png");','light/l15.png'],
			15:['','background-image:url("templates/1/box_setting/images/bg_images/light/l16.png");','light/l16.png'],
			16:['','background-image:url("templates/1/box_setting/images/bg_images/light/l17.png");','light/l17.png'],
			17:['','background-image:url("templates/1/box_setting/images/bg_images/light/l18.png");','light/l18.png'],
			18:['','background-image:url("templates/1/box_setting/images/bg_images/light/l19.png");','light/l19.png'],
			19:['','background-image:url("templates/1/box_setting/images/bg_images/light/l20.png");','light/l20.png'],
			20:['','background-image:url("templates/1/box_setting/images/bg_images/light/l21.png");','light/l21.png'],
			21:['','background-image:url("templates/1/box_setting/images/bg_images/light/l22.png");','light/l22.png'],
			22:['','background-image:url("templates/1/box_setting/images/bg_images/light/l23.png");','light/l23.png'],
			23:['','background-image:url("templates/1/box_setting/images/bg_images/light/l24.png");','light/l24.png'],
			24:['','background-image:url("templates/1/box_setting/images/bg_images/light/l25.png");','light/l25.png'],
			25:['','background-image:url("templates/1/box_setting/images/bg_images/light/l26.png");','light/l26.png'],
			26:['','background-image:url("templates/1/box_setting/images/bg_images/light/l27.png");','light/l27.png'],
			27:['','background-image:url("templates/1/box_setting/images/bg_images/light/l28.png");','light/l28.png'],
			28:['','background-image:url("templates/1/box_setting/images/bg_images/light/l29.png");','light/l29.png'],
			29:['','background-image:url("templates/1/box_setting/images/bg_images/light/l30.png");','light/l30.png'],
			30:['','background-image:url("templates/1/box_setting/images/bg_images/light/l31.png");','light/l31.png'],
			31:['','background-image:url("templates/1/box_setting/images/bg_images/light/l32.png");','light/l32.png'],
			32:['','background-image:url("templates/1/box_setting/images/bg_images/light/l33.png");','light/l33.png'],
			33:['','background-image:url("templates/1/box_setting/images/bg_images/light/l34.png");','light/l34.png'],
			34:['','background-image:url("templates/1/box_setting/images/bg_images/light/l35.png");','light/l35.png'],
			35:['','background-image:url("templates/1/box_setting/images/bg_images/light/l36.png");','light/l36.png'],
			36:['','background-image:url("templates/1/box_setting/images/bg_images/light/l37.png");','light/l37.png'],
			37:['','background-image:url("templates/1/box_setting/images/bg_images/light/l38.png");','light/l38.png'],
			38:['','background-image:url("templates/1/box_setting/images/bg_images/light/l39.png");','light/l39.png'],
			39:['','background-image:url("templates/1/box_setting/images/bg_images/light/l40.png");','light/l40.png'],
			40:['','background-image:url("templates/1/box_setting/images/bg_images/light/l41.png");','light/l41.png'],
			41:['','background-image:url("templates/1/box_setting/images/bg_images/light/l42.png");','light/l42.png'],
			42:['','background-image:url("templates/1/box_setting/images/bg_images/light/l43.png");','light/l43.png'],
			43:['','background-image:url("templates/1/box_setting/images/bg_images/light/l44.png");','light/l44.png'],
			44:['','background-image:url("templates/1/box_setting/images/bg_images/light/l45.png");','light/l45.png'],
			45:['','background-image:url("templates/1/box_setting/images/bg_images/light/l46.png");','light/l46.png'],
			46:['','background-image:url("templates/1/box_setting/images/bg_images/light/l47.jpg");','light/l47.jpg'],
			47:['','background-image:url("templates/1/box_setting/images/bg_images/light/l48.png");','light/l48.png'],
			48:['','background-image:url("templates/1/box_setting/images/bg_images/light/l49.png");','light/l49.png'],
			49:['','background-image:url("templates/1/box_setting/images/bg_images/light/l50.png");','light/l50.png'],
			50:['','background-image:url("templates/1/box_setting/images/bg_images/light/l51.png");','light/l51.png'],
			51:['','background-image:url("templates/1/box_setting/images/bg_images/light/l52.png");','light/l52.png'],
			52:['','background-image:url("templates/1/box_setting/images/bg_images/light/l53.png");','light/l53.png'],
			53:['','background-image:url("templates/1/box_setting/images/bg_images/light/l54.png");','light/l54.png'],
			54:['','background-image:url("templates/1/box_setting/images/bg_images/light/l55.png");','light/l55.png'],
			55:['','background-image:url("templates/1/box_setting/images/bg_images/light/l56.png");','light/l56.png'],
			56:['','background-image:url("templates/1/box_setting/images/bg_images/light/l57.png");','light/l57.png'],
			57:['','background-image:url("templates/1/box_setting/images/bg_images/light/l58.png");','light/l58.png'],
			58:['','background-image:url("templates/1/box_setting/images/bg_images/light/l59.png");','light/l59.png'],
			59:['','background-image:url("templates/1/box_setting/images/bg_images/light/l60.png");','light/l60.png'],
			60:['','background-image:url("templates/1/box_setting/images/bg_images/light/l61.png");','light/l61.png'],
			61:['','background-image:url("templates/1/box_setting/images/bg_images/light/l62.png");','light/l62.png'],
			62:['','background-image:url("templates/1/box_setting/images/bg_images/light/l63.png");','light/l63.png'],
			63:['','background-image:url("templates/1/box_setting/images/bg_images/light/l64.jpg");','light/l64.jpg'],
			64:['','background-image:url("templates/1/box_setting/images/bg_images/light/l65.png");','light/l65.png'],
			65:['','background-image:url("templates/1/box_setting/images/bg_images/light/l66.png");','light/l66.png'],
			66:['','background-image:url("templates/1/box_setting/images/bg_images/light/l67.png");','light/l67.png'],
			67:['','background-image:url("templates/1/box_setting/images/bg_images/light/l68.png");','light/l68.png'],
			68:['','background-image:url("templates/1/box_setting/images/bg_images/light/l69.png");','light/l69.png'],
			69:['','background-image:url("templates/1/box_setting/images/bg_images/light/l70.png");','light/l70.png'],
			70:['','background-image:url("templates/1/box_setting/images/bg_images/light/l71.png");','light/l71.png'],
			71:['','background-image:url("templates/1/box_setting/images/bg_images/light/l72.png");','light/l72.png'],
			72:['','background-image:url("templates/1/box_setting/images/bg_images/light/l73.png");','light/l73.png'],
			73:['','background-image:url("templates/1/box_setting/images/bg_images/light/l74.png");','light/l74.png'],
			74:['','background-image:url("templates/1/box_setting/images/bg_images/light/l75.png");','light/l75.png'],
			75:['','background-image:url("templates/1/box_setting/images/bg_images/light/l76.png");','light/l76.png'],
			76:['','background-image:url("templates/1/box_setting/images/bg_images/light/l77.png");','light/l77.png'],
			77:['','background-image:url("templates/1/box_setting/images/bg_images/light/l78.png");','light/l78.png'],
			78:['','background-image:url("templates/1/box_setting/images/bg_images/light/l79.png");','light/l79.png'],
			79:['','background-image:url("templates/1/box_setting/images/bg_images/light/l80.png");','light/l80.png'],
			80:['','background-image:url("templates/1/box_setting/images/bg_images/light/l81.png");','light/l81.png'],
			81:['','background-image:url("templates/1/box_setting/images/bg_images/light/l82.png");','light/l82.png'],
			82:['','background-image:url("templates/1/box_setting/images/bg_images/light/l83.png");','light/l83.png'],
			83:['','background-image:url("templates/1/box_setting/images/bg_images/light/l84.png");','light/l84.png'],
			84:['','background-image:url("templates/1/box_setting/images/bg_images/light/l85.png");','light/l85.png'],
			85:['','background-image:url("templates/1/box_setting/images/bg_images/light/l86.png");','light/l86.png'],
			86:['','background-image:url("templates/1/box_setting/images/bg_images/light/l87.png");','light/l87.png'],
			87:['','background-image:url("templates/1/box_setting/images/bg_images/light/l88.png");','light/l88.png'],
			88:['','background-image:url("templates/1/box_setting/images/bg_images/light/l89.png");','light/l89.png'],
			89:['','background-image:url("templates/1/box_setting/images/bg_images/light/l90.png");','light/l90.png'],
			90:['','background-image:url("templates/1/box_setting/images/bg_images/light/l91.png");','light/l91.png'],
			91:['','background-image:url("templates/1/box_setting/images/bg_images/light/l92.png");','light/l92.png'],
			92:['','background-image:url("templates/1/box_setting/images/bg_images/light/l93.png");','light/l93.png'],
			93:['','background-image:url("templates/1/box_setting/images/bg_images/light/l94.png");','light/l94.png'],
			94:['','background-image:url("templates/1/box_setting/images/bg_images/light/l95.png");','light/l95.png'],
			95:['','background-image:url("templates/1/box_setting/images/bg_images/light/l96.png");','light/l96.png'],
			96:['','background-image:url("templates/1/box_setting/images/bg_images/light/l97.png");','light/l97.png'],
			97:['','background-image:url("templates/1/box_setting/images/bg_images/light/l98.png");','light/l98.png'],
			98:['','background-image:url("templates/1/box_setting/images/bg_images/light/l99.png");','light/l99.png'],
			99:['','background-image:url("templates/1/box_setting/images/bg_images/light/l100.png");','light/l100.png'],
			100:['','background-image:url("templates/1/box_setting/images/bg_images/light/l101.png");','light/l101.png'],
			101:['','background-image:url("templates/1/box_setting/images/bg_images/light/l102.png");','light/l102.png'],
			102:['','background-image:url("templates/1/box_setting/images/bg_images/light/l103.png");','light/l103.png'],
			103:['','background-image:url("templates/1/box_setting/images/bg_images/light/l104.png");','light/l104.png'],
			104:['','background-image:url("templates/1/box_setting/images/bg_images/light/l105.png");','light/l105.png'],
			105:['','background-image:url("templates/1/box_setting/images/bg_images/light/l106.png");','light/l106.png'],
			106:['','background-image:url("templates/1/box_setting/images/bg_images/light/l107.png");','light/l107.png'],
			107:['','background-image:url("templates/1/box_setting/images/bg_images/light/l108.png");','light/l108.png'],
			108:['','background-image:url("templates/1/box_setting/images/bg_images/light/l109.png");','light/l109.png'],
			109:['','background-image:url("templates/1/box_setting/images/bg_images/light/l110.png");','light/l110.png']
		},
		countBackgroundLightImgPath = 109,
		listBackgroundWoodImgPath= {
			0:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w1.jpg");','wood/w1.jpg'],
			1:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w2.jpg");','wood/w2.jpg'],
			2:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w3.jpg");','wood/w3.jpg'],
			3:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w4.jpg");','wood/w4.jpg'],
			4:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w5.jpg");','wood/w5.jpg'],
			5:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w6.jpg");','wood/w6.jpg'],
			6:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w7.jpg");','wood/w7.jpg'],
			7:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w8.jpg");','wood/w8.jpg'],
			8:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w9.jpg");','wood/w9.jpg'],
			9:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w10.jpg");','wood/w10.jpg'],
			10:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w11.jpg");','wood/w11.jpg'],
			11:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w12.jpg");','wood/w12.jpg'],
			12:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w13.jpg");','wood/w13.jpg'],
			13:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w14.png");','wood/w14.png'],
			14:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w15.jpg");','wood/w15.jpg'],
			15:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w16.jpg");','wood/w16.jpg'],
			16:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w17.jpg");','wood/w17.jpg'],
			17:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w18.jpg");','wood/w18.jpg'],
			18:['','background-image:url("templates/1/box_setting/images/bg_images/wood/w19.jpg");','wood/w19.jpg']
		},
		countBackgroundWoodImgPath = 18;

	var systemFonts = ['Arial','Garamond','Georgia','Helvetica','Liberation sans','Palatino','Tahoma','Times New Roman','Trebuchet MS','Verdana','Calibri','Courier New','Comic Sans MS'];
	var googleFont = {
		// ============= standart list ===============
		//1: ['\'Liberation sans\', Arial, Helvetica, sans-serif','Liberation sans'],
		//2: ['\'Trebuchet MS\', Helvetica, Garuda, sans-serif','Trebuchet MS'],
		//3: ['Arial, Helvetica, \'Nimbus Sans L\', sans-serif','Arial'],
		//4: ['\'Comic Sans MS\', Monaco, \'TSCu_Comic\', cursive','Comic Sans MS'],
		//5: ['Georgia, Times, \'Century Schoolbook L\', serif','Georgia'],
		//6: ['Verdana, Geneva, \'DejaVu Sans\', sans-serif','Verdana'],
		//7: ['Tahoma, Geneva, Kalimati, sans-serif','Tahoma'],
		//8: ['\'Lucida Sans Unicode\', \'Lucida Grande\', Garuda, sans-serif','Lucida Sans Unicode'],
		//9: ['Calibri, \'AppleGothic\', \'MgOpen Modata\', sans-serif','Calibri'],
		//10: ['\'Times New Roman\', Times, \'Nimbus Roman No9 L\', serif','Times New Roman'],
		//11: ['\'Courier New\', Courier, \'Nimbus Mono L\', monospace','Courier New'],
		// ============= Google Font list ===============
		22: ['Abel','Abel'],
		23: ['Abril+Fatface','Abril Fatface'],
		24: ['Aclonica','Aclonica'],
		25: ['Acme','Acme'],
		26: ['Actor','Actor'],
		27: ['Adamina','Adamina'],
		28: ['Advent+Pro','Advent Pro'],
		29: ['Aguafina+Script','Aguafina Script'],
		30: ['Aladin','Aladin'],
		31: ['Aldrich','Aldrich'],
		32: ['Alegreya','Alegreya'],
		33: ['Alegreya+SC','Alegreya SC'],
		34: ['Alex+Brush','Alex Brush'],
		35: ['Alfa+Slab+One','Alfa Slab One'],
		36: ['Alice','Alice'],
		37: ['Alike','Alike'],
		38: ['Alike+Angular','Alike Angular'],
		39: ['Allan','Allan'],
		40: ['Allerta','Allerta'],
		41: ['Allerta+Stencil','Allerta Stencil'],
		42: ['Allura','Allura'],
		43: ['Almendra','Almendra'],
		44: ['Almendra+SC','Almendra SC'],
		45: ['Amaranth','Amaranth'],
		46: ['Amatic+SC','Amatic SC'],
		47: ['Amethysta','Amethysta'],
		48: ['Andada','Andada'],
		49: ['Andika','Andika'],
		50: ['Annie+Use+Your+Telescope','Annie Use Your Telescope'],
		51: ['Anonymous+Pro','Anonymous Pro'],
		52: ['Antic','Antic'],
		53: ['Antic+Didone','Antic Didone'],
		54: ['Antic+Slab','Antic Slab'],
		55: ['Anton','Anton'],
		56: ['Arapey','Arapey'],
		57: ['Arbutus','Arbutus'],
		58: ['Architects+Daughter','Architects Daughter'],
		59: ['Arimo','Arimo'],
		60: ['Arizonia','Arizonia'],
		61: ['Armata','Armata'],
		62: ['Artifika','Artifika'],
		63: ['Arvo','Arvo'],
		64: ['Asap','Asap'],
		65: ['Asset','Asset'],
		66: ['Astloch','Astloch'],
		67: ['Asul','Asul'],
		68: ['Atomic+Age','Atomic Age'],
		69: ['Aubrey','Aubrey'],
		70: ['Audiowide','Audiowide'],
		71: ['Average','Average'],
		72: ['Averia+Gruesa+Libre','Averia Gruesa Libre'],
		73: ['Averia+Libre','Averia Libre'],
		74: ['Averia+Sans+Libre','Averia Sans Libre'],
		75: ['Averia+Serif+Libre','Averia Serif Libre'],
		76: ['Bad+Script','Bad Script'],
		77: ['Balthazar','Balthazar'],
		78: ['Bangers','Bangers'],
		79: ['Basic','Basic'],
		80: ['Baumans','Baumans'],
		81: ['Belgrano','Belgrano'],
		82: ['Belleza','Belleza'],
		83: ['Bentham','Bentham'],
		84: ['Berkshire+Swash','Berkshire Swash'],
		85: ['Bevan','Bevan'],
		86: ['Bigshot+One','Bigshot One'],
		87: ['Bilbo','Bilbo'],
		88: ['Bilbo+Swash+Caps','Bilbo Swash Caps'],
		89: ['Bitter','Bitter'],
		90: ['Black+Ops+One','Black Ops One'],
		91: ['Bonbon','Bonbon'],
		92: ['Boogaloo','Boogaloo'],
		93: ['Bowlby+One','Bowlby One'],
		94: ['Bowlby+One+SC','Bowlby One SC'],
		95: ['Brawler','Brawler'],
		96: ['Bree+Serif','Bree Serif'],
		97: ['Bubblegum+Sans','Bubblegum Sans'],
		98: ['Buda:300','Buda'],
		99: ['Buenard','Buenard'],
		100: ['Butcherman','Butcherman'],
		101: ['Butterfly+Kids','Butterfly Kids'],
		102: ['Cabin','Cabin'],
		103: ['Cabin+Condensed','Cabin Condensed'],
		104: ['Cabin+Sketch','Cabin Sketch'],
		105: ['Caesar+Dressing','Caesar Dressing'],
		106: ['Cagliostro','Cagliostro'],
		107: ['Calligraffitti','Calligraffitti'],
		108: ['Cambo','Cambo'],
		109: ['Candal','Candal'],
		110: ['Cantarell','Cantarell'],
		111: ['Cantata+One','Cantata One'],
		112: ['Cardo','Cardo'],
		113: ['Carme','Carme'],
		114: ['Carter+One','Carter One'],
		115: ['Caudex','Caudex'],
		116: ['Cedarville+Cursive','Cedarville Cursive'],
		117: ['Ceviche+One','Ceviche One'],
		118: ['Changa+One','Changa One'],
		119: ['Chango','Chango'],
		120: ['Chau+Philomene+One','Chau Philomene One'],
		121: ['Chelsea+Market','Chelsea Market'],
		122: ['Cherry+Cream+Soda','Cherry Cream Soda'],
		123: ['Chewy','Chewy'],
		124: ['Chicle','Chicle'],
		125: ['Chivo','Chivo'],
		126: ['Coda','Coda'],
		127: ['Coda+Caption:800','Coda Caption'],
		128: ['Codystar','Codystar'],
		129: ['Comfortaa','Comfortaa'],
		130: ['Coming+Soon','Coming Soon'],
		131: ['Concert+One','Concert One'],
		132: ['Condiment','Condiment'],
		133: ['Contrail+One','Contrail One'],
		134: ['Convergence','Convergence'],
		135: ['Cookie','Cookie'],
		136: ['Copse','Copse'],
		137: ['Corben','Corben'],
		138: ['Cousine','Cousine'],
		139: ['Coustard','Coustard'],
		140: ['Covered+By+Your+Grace','Covered By Your Grace'],
		141: ['Crafty+Girls','Crafty Girls'],
		142: ['Creepster','Creepster'],
		143: ['Crete+Round','Crete Round'],
		144: ['Crimson+Text','Crimson Text'],
		145: ['Crushed','Crushed'],
		146: ['Cuprum','Cuprum'],
		147: ['Cutive','Cutive'],
		148: ['Damion','Damion'],
		149: ['Dancing+Script','Dancing Script'],
		150: ['Dawning+of+a+New+Day','Dawning of a New Day'],
		151: ['Days+One','Days One'],
		152: ['Delius','Delius'],
		153: ['Delius+Swash+Caps','Delius Swash Caps'],
		154: ['Delius+Unicase','Delius Unicase'],
		155: ['Della+Respira','Della Respira'],
		156: ['Devonshire','Devonshire'],
		157: ['Didact+Gothic','Didact Gothic'],
		158: ['Diplomata','Diplomata'],
		159: ['Diplomata+SC','Diplomata SC'],
		160: ['Doppio+One','Doppio One'],
		161: ['Dorsa','Dorsa'],
		162: ['Dosis','Dosis'],
		163: ['Dr+Sugiyama','Dr Sugiyama'],
		164: ['Droid+Sans','Droid Sans'],
		165: ['Droid+Sans+Mono','Droid Sans Mono'],
		166: ['Droid+Serif','Droid Serif'],
		167: ['Duru+Sans','Duru Sans'],
		168: ['Dynalight','Dynalight'],
		169: ['EB+Garamond','EB Garamond'],
		170: ['Eater','Eater'],
		171: ['Economica','Economica'],
		172: ['Electrolize','Electrolize'],
		173: ['Emblema+One','Emblema One'],
		174: ['Emilys+Candy','Emilys Candy'],
		175: ['Engagement','Engagement'],
		176: ['Enriqueta','Enriqueta'],
		177: ['Erica+One','Erica One'],
		178: ['Esteban','Esteban'],
		179: ['Euphoria+Script','Euphoria Script'],
		180: ['Ewert','Ewert'],
		181: ['Exo','Exo'],
		182: ['Expletus+Sans','Expletus Sans'],
		183: ['Fanwood+Text','Fanwood Text'],
		184: ['Fascinate','Fascinate'],
		185: ['Fascinate+Inline','Fascinate Inline'],
		186: ['Federant','Federant'],
		187: ['Federo','Federo'],
		188: ['Felipa','Felipa'],
		189: ['Fjord+One','Fjord One'],
		190: ['Flamenco','Flamenco'],
		191: ['Flavors','Flavors'],
		192: ['Fondamento','Fondamento'],
		193: ['Fontdiner+Swanky','Fontdiner Swanky'],
		194: ['Forum','Forum'],
		195: ['Francois+One','Francois One'],
		196: ['Fredericka+the+Great','Fredericka the Great'],
		197: ['Fredoka+One','Fredoka One'],
		198: ['Fresca','Fresca'],
		199: ['Frijole','Frijole'],
		200: ['Fugaz+One','Fugaz One'],
		201: ['Galdeano','Galdeano'],
		202: ['Gentium+Basic','Gentium Basic'],
		203: ['Gentium+Book+Basic','Gentium Book Basic'],
		204: ['Geo','Geo'],
		205: ['Geostar','Geostar'],
		206: ['Geostar+Fill','Geostar Fill'],
		207: ['Germania+One','Germania One'],
		208: ['Give+You+Glory','Give You Glory'],
		209: ['Glass+Antiqua','Glass Antiqua'],
		210: ['Glegoo','Glegoo'],
		211: ['Gloria+Hallelujah','Gloria Hallelujah'],
		212: ['Goblin+One','Goblin One'],
		213: ['Gochi+Hand','Gochi Hand'],
		214: ['Gorditas','Gorditas'],
		215: ['Goudy+Bookletter+1911','Goudy Bookletter 1911'],
		216: ['Graduate','Graduate'],
		217: ['Gravitas+One','Gravitas One'],
		218: ['Great+Vibes','Great Vibes'],
		219: ['Gruppo','Gruppo'],
		220: ['Gudea','Gudea'],
		221: ['Habibi','Habibi'],
		222: ['Hammersmith+One','Hammersmith One'],
		223: ['Handlee','Handlee'],
		224: ['Happy+Monkey','Happy Monkey'],
		225: ['Henny+Penny','Henny Penny'],
		226: ['Herr+Von+Muellerhoff','Herr Von Muellerhoff'],
		227: ['Holtwood+One+SC','Holtwood One SC'],
		228: ['Homemade+Apple','Homemade Apple'],
		229: ['Homenaje','Homenaje'],
		230: ['IM+Fell+DW+Pica','IM Fell DW Pica'],
		231: ['IM+Fell+DW+Pica+SC','IM Fell DW Pica SC'],
		232: ['IM+Fell+Double+Pica','IM Fell Double Pica'],
		233: ['IM+Fell+Double+Pica+SC','IM Fell Double Pica SC'],
		234: ['IM+Fell+English','IM Fell English'],
		235: ['IM+Fell+English+SC','IM Fell English SC'],
		236: ['IM+Fell+French+Canon','IM Fell French Canon'],
		237: ['IM+Fell+French+Canon+SC','IM Fell French Canon SC'],
		238: ['IM+Fell+Great+Primer','IM Fell Great Primer'],
		239: ['IM+Fell+Great+Primer+SC','IM Fell Great Primer SC'],
		240: ['Iceberg','Iceberg'],
		241: ['Iceland','Iceland'],
		242: ['Imprima','Imprima'],
		243: ['Inconsolata','Inconsolata'],
		244: ['Inder','Inder'],
		245: ['Indie+Flower','Indie Flower'],
		246: ['Inika','Inika'],
		247: ['Irish+Grover','Irish Grover'],
		248: ['Istok+Web','Istok Web'],
		249: ['Italiana','Italiana'],
		250: ['Italianno','Italianno'],
		251: ['Jim+Nightshade','Jim Nightshade'],
		252: ['Jockey+One','Jockey One'],
		253: ['Jolly+Lodger','Jolly Lodger'],
		254: ['Josefin+Sans','Josefin Sans'],
		255: ['Josefin+Slab','Josefin Slab'],
		256: ['Judson','Judson'],
		257: ['Julee','Julee'],
		258: ['Junge','Junge'],
		259: ['Jura','Jura'],
		260: ['Just+Another+Hand','Just Another Hand'],
		261: ['Just+Me+Again+Down+Here','Just Me Again Down Here'],
		262: ['Kameron','Kameron'],
		263: ['Karla','Karla'],
		264: ['Kaushan+Script','Kaushan Script'],
		265: ['Kelly+Slab','Kelly Slab'],
		266: ['Kenia','Kenia'],
		267: ['Knewave','Knewave'],
		268: ['Kotta+One','Kotta One'],
		269: ['Kranky','Kranky'],
		270: ['Kreon','Kreon'],
		271: ['Kristi','Kristi'],
		272: ['Krona+One','Krona One'],
		273: ['La+Belle+Aurore','La Belle Aurore'],
		274: ['Lancelot','Lancelot'],
		275: ['Lato','Lato'],
		276: ['League+Script','League Script'],
		277: ['Leckerli+One','Leckerli One'],
		278: ['Ledger','Ledger'],
		279: ['Lekton','Lekton'],
		280: ['Lemon','Lemon'],
		281: ['Lilita+One','Lilita One'],
		282: ['Limelight','Limelight'],
		283: ['Linden+Hill','Linden Hill'],
		284: ['Lobster','Lobster'],
		285: ['Lobster+Two','Lobster Two'],
		286: ['Londrina+Outline','Londrina Outline'],
		287: ['Londrina+Shadow','Londrina Shadow'],
		288: ['Londrina+Sketch','Londrina Sketch'],
		289: ['Londrina+Solid','Londrina Solid'],
		290: ['Lora','Lora'],
		291: ['Love+Ya+Like+A+Sister','Love Ya Like A Sister'],
		292: ['Loved+by+the+King','Loved by the King'],
		293: ['Lovers+Quarrel','Lovers Quarrel'],
		294: ['Luckiest+Guy','Luckiest Guy'],
		295: ['Lusitana','Lusitana'],
		296: ['Lustria','Lustria'],
		297: ['Macondo','Macondo'],
		298: ['Macondo+Swash+Caps','Macondo Swash Caps'],
		299: ['Magra','Magra'],
		300: ['Maiden+Orange','Maiden Orange'],
		301: ['Mako','Mako'],
		302: ['Marck+Script','Marck Script'],
		303: ['Marko+One','Marko One'],
		304: ['Marmelad','Marmelad'],
		305: ['Marvel','Marvel'],
		306: ['Mate','Mate'],
		307: ['Mate+SC','Mate SC'],
		308: ['Maven+Pro','Maven Pro'],
		309: ['Meddon','Meddon'],
		310: ['MedievalSharp','MedievalSharp'],
		311: ['Medula+One','Medula One'],
		312: ['Megrim','Megrim'],
		313: ['Merienda+One','Merienda One'],
		314: ['Merriweather','Merriweather'],
		315: ['Metamorphous','Metamorphous'],
		316: ['Metrophobic','Metrophobic'],
		317: ['Michroma','Michroma'],
		318: ['Miltonian','Miltonian'],
		319: ['Miltonian+Tattoo','Miltonian Tattoo'],
		320: ['Miniver','Miniver'],
		321: ['Miss+Fajardose','Miss Fajardose'],
		322: ['Modern+Antiqua','Modern Antiqua'],
		323: ['Molengo','Molengo'],
		324: ['Monofett','Monofett'],
		325: ['Monoton','Monoton'],
		326: ['Monsieur+La+Doulaise','Monsieur La Doulaise'],
		327: ['Montaga','Montaga'],
		328: ['Montez','Montez'],
		329: ['Montserrat','Montserrat'],
		330: ['Mountains+of+Christmas','Mountains of Christmas'],
		331: ['Mr+Bedfort','Mr Bedfort'],
		332: ['Mr+Dafoe','Mr Dafoe'],
		333: ['Mr+De+Haviland','Mr De Haviland'],
		334: ['Mrs+Saint+Delafield','Mrs Saint Delafield'],
		335: ['Mrs+Sheppards','Mrs Sheppards'],
		336: ['Muli','Muli'],
		337: ['Mystery+Quest','Mystery Quest'],
		338: ['Neucha','Neucha'],
		339: ['Neuton','Neuton'],
		340: ['News+Cycle','News Cycle'],
		341: ['Niconne','Niconne'],
		342: ['Nixie+One','Nixie One'],
		343: ['Nobile','Nobile'],
		344: ['Norican','Norican'],
		345: ['Nosifer','Nosifer'],
		346: ['Nothing+You+Could+Do','Nothing You Could Do'],
		347: ['Noticia+Text','Noticia Text'],
		348: ['Nova+Cut','Nova Cut'],
		349: ['Nova+Flat','Nova Flat'],
		350: ['Nova+Mono','Nova Mono'],
		351: ['Nova+Oval','Nova Oval'],
		352: ['Nova+Round','Nova Round'],
		353: ['Nova+Script','Nova Script'],
		354: ['Nova+Slim','Nova Slim'],
		355: ['Nova+Square','Nova Square'],
		356: ['Numans','Numans'],
		357: ['Nunito','Nunito'],
		358: ['Old+Standard+TT','Old Standard TT'],
		359: ['Oldenburg','Oldenburg'],
		360: ['Oleo+Script','Oleo Script'],
		361: ['Open+Sans','Open Sans'],
		362: ['Open+Sans+Condensed','Open Sans Condensed'],
		363: ['Orbitron','Orbitron'],
		364: ['Original+Surfer','Original Surfer'],
		365: ['Oswald','Oswald'],
		366: ['Over+the+Rainbow','Over the Rainbow'],
		367: ['Overlock','Overlock'],
		368: ['Overlock+SC','Overlock SC'],
		369: ['Ovo','Ovo'],
		370: ['Oxygen','Oxygen'],
		371: ['PT+Mono','PT Mono'],
		372: ['PT+Sans','PT Sans'],
		373: ['PT+Sans+Caption','PT Sans Caption'],
		374: ['PT+Sans+Narrow','PT Sans Narrow'],
		375: ['PT+Serif','PT Serif'],
		376: ['PT+Serif+Caption','PT Serif Caption'],
		377: ['Pacifico','Pacifico'],
		378: ['Parisienne','Parisienne'],
		379: ['Passero+One','Passero One'],
		380: ['Passion+One','Passion One'],
		381: ['Patrick+Hand','Patrick Hand'],
		382: ['Patua+One','Patua One'],
		383: ['Paytone+One','Paytone One'],
		384: ['Permanent+Marker','Permanent Marker'],
		385: ['Petrona','Petrona'],
		386: ['Philosopher','Philosopher'],
		387: ['Piedra','Piedra'],
		388: ['Pinyon+Script','Pinyon Script'],
		389: ['Plaster','Plaster'],
		390: ['Play','Play'],
		391: ['Playball','Playball'],
		392: ['Playfair+Display','Playfair Display'],
		393: ['Podkova','Podkova'],
		394: ['Poiret+One','Poiret One'],
		395: ['Poller+One','Poller One'],
		396: ['Poly','Poly'],
		397: ['Pompiere','Pompiere'],
		398: ['Pontano+Sans','Pontano Sans'],
		399: ['Port+Lligat+Sans','Port Lligat Sans'],
		400: ['Port+Lligat+Slab','Port Lligat Slab'],
		401: ['Prata','Prata'],
		402: ['Press+Start+2P','Press Start 2P'],
		403: ['Princess+Sofia','Princess Sofia'],
		404: ['Prociono','Prociono'],
		405: ['Prosto+One','Prosto One'],
		406: ['Puritan','Puritan'],
		407: ['Quantico','Quantico'],
		408: ['Quattrocento','Quattrocento'],
		409: ['Quattrocento+Sans','Quattrocento Sans'],
		410: ['Questrial','Questrial'],
		411: ['Quicksand','Quicksand'],
		412: ['Qwigley','Qwigley'],
		413: ['Radley','Radley'],
		414: ['Raleway','Raleway'],
		415: ['Rammetto+One','Rammetto One'],
		416: ['Rancho','Rancho'],
		417: ['Rationale','Rationale'],
		418: ['Redressed','Redressed'],
		419: ['Reenie+Beanie','Reenie Beanie'],
		420: ['Revalia','Revalia'],
		421: ['Ribeye','Ribeye'],
		422: ['Ribeye+Marrow','Ribeye Marrow'],
		423: ['Righteous','Righteous'],
		424: ['Rochester','Rochester'],
		425: ['Rock+Salt','Rock Salt'],
		426: ['Rokkitt','Rokkitt'],
		427: ['Ropa+Sans','Ropa Sans'],
		428: ['Rosario','Rosario'],
		429: ['Rosarivo','Rosarivo'],
		430: ['Rouge+Script','Rouge Script'],
		431: ['Ruda','Ruda'],
		432: ['Ruge+Boogie','Ruge Boogie'],
		433: ['Ruluko','Ruluko'],
		434: ['Ruslan+Display','Ruslan Display'],
		435: ['Russo+One','Russo One'],
		436: ['Ruthie','Ruthie'],
		437: ['Sail','Sail'],
		438: ['Salsa','Salsa'],
		439: ['Sancreek','Sancreek'],
		440: ['Sansita+One','Sansita One'],
		441: ['Sarina','Sarina'],
		442: ['Satisfy','Satisfy'],
		443: ['Schoolbell','Schoolbell'],
		444: ['Seaweed+Script','Seaweed Script'],
		445: ['Sevillana','Sevillana'],
		446: ['Shadows+Into+Light','Shadows Into Light'],
		447: ['Shadows+Into+Light+Two','Shadows Into Light Two'],
		448: ['Shanti','Shanti'],
		449: ['Share','Share'],
		450: ['Shojumaru','Shojumaru'],
		451: ['Short+Stack','Short Stack'],
		452: ['Sigmar+One','Sigmar One'],
		453: ['Signika','Signika'],
		454: ['Signika+Negative','Signika Negative'],
		455: ['Simonetta','Simonetta'],
		456: ['Sirin+Stencil','Sirin Stencil'],
		457: ['Six+Caps','Six Caps'],
		458: ['Slackey','Slackey'],
		459: ['Smokum','Smokum'],
		460: ['Smythe','Smythe'],
		461: ['Sniglet','Sniglet'],
		462: ['Snippet','Snippet'],
		463: ['Sofia','Sofia'],
		464: ['Sonsie+One','Sonsie One'],
		465: ['Sorts+Mill+Goudy','Sorts Mill Goudy'],
		466: ['Special+Elite','Special Elite'],
		467: ['Spicy+Rice','Spicy Rice'],
		468: ['Spinnaker','Spinnaker'],
		469: ['Spirax','Spirax'],
		470: ['Squada+One','Squada One'],
		471: ['Stardos+Stencil','Stardos Stencil'],
		472: ['Stint+Ultra+Condensed','Stint Ultra Condensed'],
		473: ['Stint+Ultra+Expanded','Stint Ultra Expanded'],
		474: ['Stoke','Stoke'],
		475: ['Sue+Ellen+Francisco','Sue Ellen Francisco'],
		476: ['Sunshiney','Sunshiney'],
		477: ['Supermercado+One','Supermercado One'],
		478: ['Swanky+and+Moo+Moo','Swanky and Moo Moo'],
		479: ['Syncopate','Syncopate'],
		480: ['Tangerine','Tangerine'],
		481: ['Telex','Telex'],
		482: ['Tenor+Sans','Tenor Sans'],
		483: ['The+Girl+Next+Door','The Girl Next Door'],
		484: ['Tienne','Tienne'],
		485: ['Tinos','Tinos'],
		486: ['Titan+One','Titan One'],
		487: ['Trade+Winds','Trade Winds'],
		488: ['Trocchi','Trocchi'],
		489: ['Trochut','Trochut'],
		490: ['Trykker','Trykker'],
		491: ['Tulpen+One','Tulpen One'],
		492: ['Ubuntu','Ubuntu'],
		493: ['Ubuntu+Condensed','Ubuntu Condensed'],
		494: ['Ubuntu+Mono','Ubuntu Mono'],
		495: ['Ultra','Ultra'],
		496: ['Uncial+Antiqua','Uncial Antiqua'],
		497: ['UnifrakturCook','UnifrakturCook'],
		498: ['UnifrakturMaguntia','UnifrakturMaguntia'],
		499: ['Unkempt','Unkempt'],
		500: ['Unlock','Unlock'],
		501: ['Unna','Unna'],
		502: ['VT323','VT323'],
		503: ['Varela','Varela'],
		504: ['Varela+Round','Varela Round'],
		505: ['Vast+Shadow','Vast Shadow'],
		506: ['Vibur','Vibur'],
		507: ['Vidaloka','Vidaloka'],
		508: ['Viga','Viga'],
		509: ['Voces','Voces'],
		510: ['Volkhov','Volkhov'],
		511: ['Vollkorn','Vollkorn'],
		512: ['Voltaire','Voltaire'],
		513: ['Waiting+for+the+Sunrise','Waiting for the Sunrise'],
		514: ['Wallpoet','Wallpoet'],
		515: ['Walter+Turncoat','Walter Turncoat'],
		516: ['Wellfleet','Wellfleet'],
		517: ['Wire+One','Wire One'],
		518: ['Yanone+Kaffeesatz','Yanone Kaffeesatz'],
		519: ['Yellowtail','Yellowtail'],
		520: ['Yeseva+One','Yeseva One'],
		521: ['Yesteryear','Yesteryear'],
		522: ['Zeyada','Zeyada']
	};
	var count_google_font = 523;

	var list_palete = '';
	for (var i=0; i<default_color_palete.length; i++) {
		list_palete += '<span style="background-color:'+default_color_palete[i]+';">&nbsp;</span>'+"\n";
	}

	/* extend settings */
	$.extend(true, box_setting, options);
	/* Read cookies */
	if ($.cookies) {
		cookies = $.cookies.get(path_to_cookie);
		/* Get cookies */
		$.extend(true, box_setting, cookies);
	}

	//Function to convert hex format to a rgb color
	$.rgb2hex = function(rgb){
		rgb_a = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
		if (rgb_a) { // check if rgb
			return "#" +
				("0" + parseInt(rgb_a[1],10).toString(16)).slice(-2) +
				("0" + parseInt(rgb_a[2],10).toString(16)).slice(-2) +
				("0" + parseInt(rgb_a[3],10).toString(16)).slice(-2);
		}
		return rgb;
	}

	// Funtion print debug data
	$.printOptions = function () {
		if (box_setting.debug) {
			$('.message_debug').html('');
			$('.message_debug').append('header_google_font: "'+box_setting.header_google_font+'"<br>');
			$('.message_debug').append('header_font_style: "'+box_setting.header_font_style+'"<br>');
			$('.message_debug').append('st_logo_font_color: "'+box_setting.st_logo_font_color+'"<br>');
			$('.message_debug').append('st_logo_font_size: "'+box_setting.st_logo_font_size+'"<br>');
			$('.message_debug').append('h1_font_color: "'+box_setting.h1_font_color+'"<br>');
			$('.message_debug').append('h1_font_size: "'+box_setting.h1_font_size+'"<br>');
			$('.message_debug').append('h2_font_color: "'+box_setting.h2_font_color+'"<br>');
			$('.message_debug').append('h2_font_size: "'+box_setting.h2_font_size+'"<br>');
			$('.message_debug').append('h3_font_color: "'+box_setting.h3_font_color+'"<br>');
			$('.message_debug').append('h3_font_size: "'+box_setting.h3_font_size+'"<br>');
			$('.message_debug').append('content_font_style: "'+box_setting.content_font_style+'"<br>');
			$('.message_debug').append('body_font_size: "'+box_setting.body_font_size+'"<br>');
			$('.message_debug').append('body_line_spacing: "'+box_setting.body_line_spacing+'"<br>');
			$('.message_debug').append('body_font_color: "'+box_setting.body_font_color+'"<br>');
			$('.message_debug').append('body_links_font_color: "'+box_setting.body_links_font_color+'"<br>');
			$('.message_debug').append('background_overlay: "'+box_setting.background_overlay+'"<br>');
			$('.message_debug').append('background_color: "'+box_setting.background_color+'"<br>');
			$('.message_debug').append('background_Image: "'+box_setting.background_Image+'"<br>');
		}
	}
	$.printOptions();

	var to_head_id = [
		'stBodyBackgroundColor', 'stHeadFontStyles', 'stFontColor_st_logo', 'stFontSize_st_logo',
		'stFontColor_h1', 'stFontSize_h1', 'stFontColor_h2', 'stFontSize_h2',
		'stFontColor_h3', 'stFontSize_h3', 'stBodyFontStyles', 'stFontSize_body',
		'stLineSpacing_body', 'stFontColor_body', 'stFontColor_body_links'
	];
	for (var i=0; i<to_head_id.length; i++) {
		$('<style id="'+to_head_id[i]+'"></style>').appendTo('head');
	}

	var sidePanel = '<div id="panel_setting_side" class="'+box_setting.sidePositionPanel+'">'+
    '<div class="panel_button"><a href="#" class="open"></a></div>'+
    '<div class="panel_box">'+
      '<div class="panel_box_title">Settings</div>'+
      '<hr>'+
      '<div class="stBlock"> <span class="panel_title_link" rel="side_background_block">Background</span>'+
        '<div class="side_background_block"> <span class="panel_title">Background Color <span class="open_palette" rel="bgColor">˅</span></span>'+
          '<div class="stColor bgColor">'+
		  list_palete+
		  '</div>'+
          '<span class="stColorNow bgColorNow">Custom Color <span id="bgColor" style="background-color:#ededee;">&nbsp;</span></span> <span class="panel_title">Overlay</span>'+
          '<div class="spinn_block bgPattern"><span class="spin_l">+</span>'+
            '<input type="text" name="background-overlay" id="background-overlay" value="0.40" />'+
            '<span class="spin_r">-</span></div>'+
      '<hr>'+
		'<span class="panel_title">Patterns &amp; Styles</span>'+
		'<div class="stChangeBgList"><span rel="other" class="active">Other</span><span rel="color">Color</span><span rel="dark">Dark</span><span rel="light">Light</span><span rel="wood">Wood</span></div>'+
		'<div class="stBgs">';
		for (var i=0; i<listBackgroundImg.length; i++) {
			sidePanel += '<a class="bg_t" href="http://cdn.dcodes.net/backgrounds/'+listBackgroundImg[i]+'" rel=""><img alt="" src="http://www.dcodes.net/thumb.php?src=http://www.dcodes.net/backgrounds/'+listBackgroundImg[i]+'&w='+box_setting.th_image_width+'&h='+box_setting.th_image_height+'&a=c" /></a>';
		}
		sidePanel += '</div><div class="clr"></div>'+
		'<span class="remove_background">remove background</span>'+
        '</div>'+
      '<div class="clr"></div></div>'+
      '<hr>'+
      '<div class="stBlock"> <span class="panel_title_link" rel="side_heading_block">Headings</span>'+
      '<div class="side_heading_block"> <span class="panel_title">Google Font</span>'+
      '<div class="header_fonts">'+
      '<select name="stHeaderFont" id="stHeaderFont">';
	  sidePanel += '<optgroup label="System Fonts">';
	  for (var i=0; i < systemFonts.length; i++) {
		  sidePanel += '<option value="'+systemFonts[i]+'" style="font-family:'+systemFonts[i]+';" class="systemFonts">'+systemFonts[i]+'</option>';
	  }
	  sidePanel += '</optgroup><optgroup label="Web Google Fonts">';
	  for (var i=22; i < count_google_font; i++) {
		  sidePanel += '<option value="'+googleFont[i][0]+'" style="font-family:'+googleFont[i][1]+';">'+googleFont[i][1]+'</option>';
	  }
	  sidePanel += '</optgroup>';
      sidePanel += '</select>'+
      '</div>';
	  sidePanel += '<hr>'+
	  '<span class="panel_title">Font Color Logo <span class="open_palette" rel="st_logo">˅</span></span>'+
	  '<div class="stColor header_font st_logo">'+
		  list_palete+
	  '</div>'+
	  '<span class="stColorNow header_font st_logo">Custom Color <span id="fontColor_st_logo" style="background-color:#ededee;">&nbsp;</span></span> <span class="panel_title">Font Size Logo</span>'+
	  '<div class="spinn_block header_size st_logo"><span class="spin_l">+</span>'+
	  '<input type="text" name="font_size_st_logo" id="font_size_st_logo" value="36" />'+
	  '<span class="spin_r">-</span></div>';
	  var temp_font_set = box_setting.font_heading_set;
	  for (var count_heading = 0; count_heading < temp_font_set.length; count_heading++ ) {
		  sidePanel += '<hr>'+
		  '<span class="panel_title">Font Color '+temp_font_set[count_heading]+' <span class="open_palette" rel="'+temp_font_set[count_heading]+'">˅</span></span>'+
		  '<div class="stColor header_font '+temp_font_set[count_heading]+'">'+
			  list_palete+
		  '</div>'+
		  '<span class="stColorNow header_font '+temp_font_set[count_heading]+'">Custom Color <span id="fontColor_'+temp_font_set[count_heading]+'" style="background-color:#ededee;">&nbsp;</span></span> <span class="panel_title">Font Size '+temp_font_set[count_heading]+'</span>'+
		  '<div class="spinn_block header_size '+temp_font_set[count_heading]+'"><span class="spin_l">+</span>'+
		  '<input type="text" name="font_size_'+temp_font_set[count_heading]+'" id="font_size_'+temp_font_set[count_heading]+'" value="36" />'+
		  '<span class="spin_r">-</span></div>';
	  }
      sidePanel += '</div>'+
      '</div>'+
      '<hr>';
      sidePanel += '<div class="stBlock"> <span class="panel_title_link" rel="side_content_block">Content</span>'+
      '<div class="side_content_block"> <span class="panel_title">Font Style</span>'+
      '<div class="body_fonts">';
      sidePanel += '<select name="stBodyFont" id="stBodyFont" style="margin-bottom:7px;">';
	  for (var i=0; i < systemFonts.length; i++) {
		  sidePanel += '<option value="'+systemFonts[i]+'" style="font-family:'+systemFonts[i]+';">'+systemFonts[i]+'</option>';
	  }
	  sidePanel += '</select>';
      sidePanel += '<hr>'+
      '<span class="panel_title">Font Size</span>'+
      '<div class="spinn_block font_size"><span class="spin_l">+</span>'+
      '<input type="text" name="font_size" id="font_size" value="12" />'+
      '<span class="spin_r">-</span></div>'+
      '<hr>'+
	  '<span class="panel_title">Line Spacing</span>'+
      '<div class="spinn_block line_spacing"><span class="spin_l">+</span>'+
      '<input type="text" name="line_spacing" id="line_spacing" value="1.2" />'+
      '<span class="spin_r">-</span></div>'+
      '<hr>'+
      '<span class="panel_title">Font Color <span class="open_palette" rel="body_font">˅</span></span>'+
      '<div class="stColor body_font">'+
		  list_palete+
      '</div>'+
      '<span class="stColorNow body_font">Custom Color <span id="fontColor_body" style="background-color:#8b8b8e;">&nbsp;</span></span>'+
      '<hr>'+
      '<span class="panel_title">Links Font Color <span class="open_palette" rel="body_links_font">˅</span></span>'+
      '<div class="stColor body_links_font">'+
		  list_palete+
      '</div>'+
      '<span class="stColorNow body_links_font">Custom Color <span id="fontColor_body_links" style="background-color:#4aaee1;">&nbsp;</span></span> </div>'+
      '</div>'+
      '</div>'+
      '<hr>'+
      '<div class="stBlock">'+
      '<button id="resetSetting">Reset</button>'+
      '<button id="saveSetting">Save</button>'+
      '<button id="viewSetting">View result</button>'+
      '</div>'+
      '<div class="message_debug"></div>'+
      '</div>';
     '</div>';
	$('body').append(sidePanel);

	/* Background-Color settings Start */
	$.SetBgColor = function (value) {
		$('#bgColor').css('backgroundColor', value);
		$(box_setting.elements_body).css('backgroundColor', value);
		var this_value = box_setting.elements_body+' { background-color:' + value + '; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stBodyBackgroundColor');
			styleObj.cssText = this_value;
		} else {
			$('style#stBodyBackgroundColor').text(this_value);
		}
		box_setting.background_color = value;
		$.printOptions();
	}
	$('.bgColorNow').ColorPicker({
		color: box_setting.background_color,
		onShow: function (colpkr) { $(colpkr).fadeIn(500); return false; },
		onHide: function (colpkr) { $(colpkr).fadeOut(500); return false; },
		onChange: function (hsb, hex, rgb) { $.SetBgColor('#' + hex); },
		onBeforeShow: function () { $(this).ColorPickerSetColor($('#bgColor').css('backgroundColor')); }
	});

	$('.bgColor span').mouseenter(function () {
		$('body').stop().animate({
			backgroundColor: $(this).css('backgroundColor')
		}, "fast");
	}).mouseleave(function () {		
		$('body').stop().animate({
			backgroundColor: $('#bgColor').css('backgroundColor')
		}, "fast");
	});
	$('.bgColor span').click(function () {
		var valueColor = $.rgb2hex($(this).css('backgroundColor'));
		console.log(valueColor);
		$.SetBgColor(valueColor);
	});
	/* Background-Color settings Ends */

	/* Header Fonts-Color settings Start */
	$.checkHeaderID = function (obj) {
		return (obj.parent('div').hasClass('h1')) ? 'h1'
					: (obj.parent('div').hasClass('h2')) ? 'h2'
						: (obj.parent('div').hasClass('h3')) ? 'h3'
							: 'st_logo';
	}
	$.SetHeadersColor = function (value, tags) {
		var class_tags = (tags == 'st_logo' ? 'logo' : tags);
		$('#fontColor_'+tags).css('backgroundColor', value);
		var this_value = box_setting['elements_'+class_tags+'_style'] + ' { color: ' + value + '; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stFontColor_'+tags);
			styleObj.cssText = this_value;
		} else {
			$('style#stFontColor_'+tags).text(this_value);
		}
		$(box_setting['elements_'+class_tags+'_style']).css('color', value);
		box_setting[tags+'_font_color'] = value;
		$.printOptions();
		return true;
	}

	$.createColorPicker = function (tags) {
		$('.stColorNow.'+tags).ColorPicker({
			color: box_setting[tags+'_font_color'],
			onShow: function (colpkr) { $(colpkr).fadeIn(500); return false; },
			onHide: function (colpkr) { $(colpkr).fadeOut(500); return false; },
			onChange: function (hsb, hex, rgb) {
				$.SetHeadersColor('#'+hex, tags);
			},
			onBeforeShow: function () {
				$(this).ColorPickerSetColor($('#fontColor_'+tags).css('backgroundColor'));
			}
		});
	}

	for (var count_heading = 0; count_heading < temp_font_set.length; count_heading++ ) {
		$.createColorPicker(temp_font_set[count_heading]);
	}
	$.createColorPicker('st_logo');

	$('.header_font span').mouseenter(function () {
		var header = $.checkHeaderID($(this));
		var class_tags = (header == 'st_logo' ? 'logo' : header);
		$(box_setting['elements_'+class_tags+'_style']).stop().animate({
			color: $(this).css('backgroundColor')
		}, "fast");
	}).mouseleave(function () {
		var header = $.checkHeaderID($(this));
		var class_tags = (header == 'st_logo' ? 'logo' : header);
		$(box_setting['elements_'+class_tags+'_style']).stop().animate({
			color: $('#fontColor_'+header).css('backgroundColor')
		}, "fast");
	});
	$('.header_font span').click(function () {
		var header = $.checkHeaderID($(this));
		var valueColor = $(this).css('backgroundColor');
		$.SetHeadersColor($.rgb2hex(valueColor), header);
	});
	/* Header Fonts-Color settings Ends */

	/* Body Fonts-Color settings Start */
	$.SetBodyColor = function (value) {
		$('#fontColor_body').css('backgroundColor', value);
		var this_value = box_setting.elements_body + ' { color: ' + value + '; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stFontColor_body');
			styleObj.cssText = this_value;
		} else {
			$('style#stFontColor_body').text(this_value);
		}
		$(box_setting.elements_body).css('color', value);
		box_setting.body_font_color = value;
		$.printOptions();
	}
	$('.stColorNow.body_font').ColorPicker({
		color: box_setting.body_font_color,
		onShow: function (colpkr) { $(colpkr).fadeIn(500); return false; },
		onHide: function (colpkr) { $(colpkr).fadeOut(500); return false; },
		onChange: function (hsb, hex, rgb) {
			$.SetBodyColor('#'+hex);
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor($('#fontColor_body').css('backgroundColor'));
		}
	});

	$('.body_font span').mouseenter(function () {
		$(box_setting.elements_body).stop().animate({
			color: $(this).css('backgroundColor')
		}, "fast");
	}).mouseleave(function () {
		$(box_setting.elements_body).stop().animate({
			color: $('#fontColor_body').css('backgroundColor')
		}, "fast");
	});
	$('.body_font span').click(function () {
		var valueColor = $(this).css('backgroundColor');
		$.SetBodyColor($.rgb2hex(valueColor));
	});
	/* Body Fonts-Color settings Ends */

	/* Body Fonts-Color-Link settings Start */
	$.SetBodyLinksColor = function (value) {
		$('#fontColor_body_links').css('backgroundColor', value);
		var this_value = box_setting.elements_content_href_style + ' { color: ' + value + '; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stFontColor_body_links');
			styleObj.cssText = this_value;
		} else {
			$('style#stFontColor_body_links').text(this_value);
		}
		$(box_setting.elements_content_href_style).css('color', value);
		box_setting.body_links_font_color = value;
		$.printOptions();
	}
	$('.stColorNow.body_links_font').ColorPicker({
		color: box_setting.body_font_color,
		onShow: function (colpkr) { $(colpkr).fadeIn(500); return false; },
		onHide: function (colpkr) { $(colpkr).fadeOut(500); return false; },
		onChange: function (hsb, hex, rgb) {
			$.SetBodyLinksColor('#'+hex);
		},
		onBeforeShow: function () {
			$(this).ColorPickerSetColor($('#fontColor_body_links').css('backgroundColor'));
		}
	});

	$('.body_links_font span').mouseenter(function () {
		$(box_setting.elements_content_href_style).stop().animate({
			color: $(this).css('backgroundColor')
		}, "fast");
	}).mouseleave(function () {
		$(box_setting.elements_content_href_style).stop().animate({
			color: $('#fontColor_body_links').css('backgroundColor')
		}, "fast");
	});
	$('.body_links_font span').click(function () {
		var valueColor = $(this).css('backgroundColor');
		$.SetBodyLinksColor($.rgb2hex(valueColor));
	});
	/* Body Fonts-Color-Link settings Ends */

	/* background overlay Start */
	$.SetBackgroundOverlay = function (value) {
		$(box_setting.elements_background_style).css({backgroundColor:'rgba(0, 0, 0, ' + value + ')'});
		$('.bgPattern input').val(value);
		box_setting.background_overlay = value;
		$.printOptions();
	}
	$('.bgPattern span').live('click',function () {
		var nov_val = parseFloat($('.bgPattern input').val(),3);
		var mat;
		if ($(this).hasClass('spin_l')) mat = 0.05; else mat = -0.05;
		if (nov_val + mat > 1) nov_val = 1; else if (nov_val + mat < 0) nov_val = 0; else nov_val += mat;
		nov_val = Math.round(nov_val*100)/100;
		$.SetBackgroundOverlay(nov_val);
		return false;
	});
	$('.bgPattern input').change(function () {
		$.SetBackgroundOverlay($(this).val());
	});
	/* background overlay Ends */

	/* background-image Start */
	$.SetBackgroundImage = function (value, full_path) {
		if (value === 'none') {
			$(box_setting.elements_background_style).css({backgroundImage:'none', backgroundPosition: '50% 0', backgroundRepeat:'repeat', backgroundSize:'auto'});
			$(box_setting.elements_background_style).css({background:'none'});
			$.SetBgColor(box_setting.background_color);
		} else if (full_path == '') {
			$(box_setting.elements_background_style).css({backgroundImage:'url('+value+')', backgroundPosition: '50% 0', backgroundRepeat:box_setting.background_Image_Repeat, backgroundSize:box_setting.background_Image_Size});
		} else {
			$(box_setting.elements_background_style).attr('style', full_path);
		}
		box_setting.background_Image = value;
		box_setting.background_Full_Image = full_path;
		$.printOptions();
	}
	$(document).on('click', 'span.remove_background', function () {
		$.SetBackgroundImage('none','');
		return false;
	})
	$('.stBgs a').live('click',function () {
		var nov_val = parseFloat($('.bgPattern input').val(),3);
		$.SetBackgroundImage($(this).attr('href'), $(this).attr('rel'));
		return false;
	});
	/* background-image Ends */

	/* Header font size Start */
	$.SetHeaderSize = function (value, tags) {
		var class_tags = (tags == 'st_logo' ? 'logo' : tags);
		$(box_setting['elements_'+class_tags+'_style']).css({'font-size':value+'px'});
		$('.header_size.'+tags+' input').val(value);
		var this_value = box_setting['elements_'+class_tags+'_style']+' { font-size:"' + value + 'px"; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stFontSize_'+tags);
			styleObj.cssText = this_value;
		} else {
			$('style#stFontSize_'+tags).text(this_value);
		}
		box_setting[tags+'_font_size'] = value;
		$.printOptions();
	}
	$('.header_size span').live('click',function () {
		var header = $.checkHeaderID($(this));
		var nov_val = parseFloat($('.header_size.'+header+' input').val(),3);
		var mat;
		if ($(this).hasClass('spin_l')) mat = 1; else mat = -1;
		if (nov_val + mat > 96) nov_val = 96; else if (nov_val + mat < 1) nov_val = 1; else nov_val += mat;
		$.SetHeaderSize(nov_val,header);
		return false;
	});
	$('.header_size input').change(function () {
		var header = $.checkHeaderID($(this));
		$.SetHeaderSize($(this).val(), header);
	});
	/* Header font size Ends */

	/* Font size content Start */
	$.SetContentFontSize = function (value) {
		$(box_setting.elements_body).css({'font-size':value+'px'});
		$('.font_size input').val(value);
		var this_value = box_setting.elements_body + ' { font-size:"' + value + 'px"; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stFontSize_body');
			styleObj.cssText = this_value;
		} else {
			$('style#stFontSize_body').text(this_value);
		}
		box_setting.body_font_size = value;
		$.printOptions();
	}
	$('.font_size span').live('click',function () {
		var nov_val = parseFloat($('.font_size input').val(),3);
		var mat;
		if ($(this).hasClass('spin_l')) mat = 1; else mat = -1;
		if (nov_val + mat > 96) nov_val = 96; else if (nov_val + mat < 1) nov_val = 1; else nov_val += mat;
		$.SetContentFontSize(nov_val);
		return false;
	});
	$('.font_size input').change(function () {
		$.SetContentFontSize($(this).val());
	});
	/* Font size content Ends */

	/* Line Spacing content Start */
	$.SetContentLineSpacing = function (value) {
		$(box_setting.elements_body).css({'line-height':value+'em'});
		$('.line_spacing input').val(value);
		var this_value = box_setting.elements_body+' { line-height:"' + value + 'em"; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stLineSpacing_body');
			styleObj.cssText = this_value;
		} else {
			$('style#stLineSpacing_body').text(this_value);
		}
		box_setting.body_line_spacing = value;
		$.printOptions();
	}
	$('.line_spacing span').live('click',function () {
		var nov_val = parseFloat($('.line_spacing input').val(),3);
		var mat;
		if ($(this).hasClass('spin_l')) mat = 0.1; else mat = -0.1;
		if (nov_val + mat > 5) nov_val = 5; else if (nov_val + mat < 0.1) nov_val = 0.1; else nov_val += mat;
		nov_val = Math.round(nov_val*100)/100;
		$.SetContentLineSpacing(nov_val);
		return false;
	});
	$('.line_spacing input').change(function () {
		$.SetContentLineSpacing($(this).val());
	});
	/* Line Spacing content Ends */

	/* Set fonts Starts */
	$.isnotSystemFont = function (font){
		var res=true;
		for(var i=0;i<systemFonts.length;i++){if(font==systemFonts[i]){res=false;}}
		return res;
	}
	$.SetHeaderFont = function (value, text) {
		$('#stHeaderFont option').each(function () {
			$(this).attr("selected",($(this).val() == value ? true : false));
		});
		//check if the font already loaded in head
		if ($.isnotSystemFont(text)){
			var fontLink = "http://fonts.googleapis.com/css?family="+$('#stHeaderFont option:selected').val().replace(' ','+');
			if($("link[href*='"+fontLink+"']").length<=0)
				$('head').append('<link rel="stylesheet" href="'+fontLink+'" media="all" />');
		}
		$(box_setting.elements_heading_font_style).css({ "font-family":"'"+text+"'"});
		box_setting.header_google_font = value;
		box_setting.header_font_style = text;
		$.printOptions();
	}
	$('#stHeaderFont').live('change',function(){
		$.SetHeaderFont($("#stHeaderFont option:selected").val(), $("#stHeaderFont option:selected").text());
	});

	$.SetBodyFont = function (value) {
		var this_value = box_setting.elements_content_style+' { font-family:' + value + '; }';
		if ($.browser.msie) { // IE 8 fixed
			styleObj = document.getElementById('stBodyFontStyles');
			styleObj.cssText = this_value;
		} else {
			$('style#stBodyFontStyles').text(this_value);
		}
		$(box_setting.elements_content_style).css({ "font-family":"'"+value+"'"});
		$('#stBodyFont option').each(function (i) {
			if ($(this).val() == value) {
				$(this).attr("selected",true);
			} else {
				$(this).attr("selected",false);
			}
		});
		box_setting.content_font_style = value;
		$.printOptions();
	}
	$('#stBodyFont').live('change',function(){
		$.SetBodyFont($("#stBodyFont option:selected").val());
	});
	/* Set fonts End */

	/* load box setings Start */
	$.setDefaultSetting = function () {
		$.SetBgColor(box_setting.background_color);
		$.SetBackgroundOverlay(box_setting.background_overlay);
		$.SetBackgroundImage(box_setting.background_Image, box_setting.background_Full_Image);

		$.SetBodyFont(box_setting.content_font_style);
		$.SetContentFontSize(box_setting.body_font_size);
		$.SetContentLineSpacing(box_setting.body_line_spacing);
		$.SetBodyColor(box_setting.body_font_color);
		$.SetBodyLinksColor(box_setting.body_links_font_color);

		$.SetHeaderFont(box_setting.header_google_font, box_setting.header_font_style);
		$.SetHeaderSize(box_setting.st_logo_font_size,'st_logo');
		$.SetHeadersColor(box_setting.st_logo_font_color,'st_logo');
		for (var count_heading = 0; count_heading < temp_font_set.length; count_heading++ ) {
			$.SetHeaderSize(box_setting[temp_font_set[count_heading]+'_font_size'],temp_font_set[count_heading]);
			$.SetHeadersColor(box_setting[temp_font_set[count_heading]+'_font_color'],temp_font_set[count_heading]);
		}
	}
	/* load default setings End */

	$.setDefaultSetting();

	var popup_fly = '<div class="popup_fly">'+
	'<div class="popup_close"><a href="#" class="close_popup">Close</a></div>'+
	'<div class="style_demo_title">Update the style CSS file with the following codes:</div>'+
    '<div class="style_demo_text"></div>'+
'</div>';
	var style_text = '';

	$.openViewCSSCode = function () {
		var style_text = '';
		if ($.isnotSystemFont(box_setting.header_google_font)){
			style_text = ''+
	'&lt;link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family='+box_setting.header_google_font+'"&gt;'+"\n<br>"+
	'&lt;style&gt;'+"\n<br>";
		}
style_text += ''+"&nbsp;&nbsp;"+box_setting.elements_body+' { font-size:"'+box_setting.body_font_size+'px"; line-height:"'+box_setting.body_line_spacing+'em"; color: '+box_setting.body_font_color+'; background-color:'+box_setting.background_color+'; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_heading_font_style+' { font-family:'+box_setting.header_font_style+'; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_logo_style+' { color: '+box_setting.st_logo_font_color+'; font-size:"'+box_setting.st_logo_font_size+'px"; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_h1_style+' { color: '+box_setting.h1_font_color+'; font-size:"'+box_setting.h1_font_size+'px"; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_h2_style+' { color: '+box_setting.h2_font_color+'; font-size:"'+box_setting.h2_font_size+'px"; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_h3_style+' { color: '+box_setting.h3_font_color+'; font-size:"'+box_setting.h3_font_size+'px"; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_content_style+' { font-family:'+box_setting.content_font_style+'; }'+"\n<br>"+
"&nbsp;&nbsp;"+box_setting.elements_content_href_style+' { color: '+box_setting.body_links_font_color+'; }'+"\n<br>";
if (box_setting.background_Image == 'none') {
	style_text += "&nbsp;&nbsp;"+box_setting.elements_background_style+' { background-color: rgba(0, 0, 0, '+box_setting.background_overlay+'); }'+"\n<br>";
} else if (box_setting.background_Full_Image == '') {
	style_text += "&nbsp;&nbsp;"+box_setting.elements_background_style+' { background-image: URL('+box_setting.background_Image+'); background-position: "50% 0" }'+"\n<br>";
} else {
	style_text += "&nbsp;&nbsp;"+box_setting.elements_background_style+' { ' + box_setting.background_Full_Image + ' }'+"\n<br>";
}
style_text += '&lt;/style&gt;';
		$(popup_fly).insertAfter('body');
		$('.popup_fly').css({display:'block'});
		$('.style_demo_text').html(style_text);
	}

	$('.stChangeBgList span').live('click', function () {
		$('.stChangeBgList span').removeClass('active');
		$(this).addClass('active');
		$('.stBgs').html('');
		var	backgroundSidePanel = '';
		if ($(this).attr('rel') == 'other') {
			for (var i=0; i<listBackgroundImg.length; i++) {
				backgroundSidePanel += '<a class="bg_t" href="http://cdn.dcodes.net/backgrounds/'+listBackgroundImg[i]+'" rel=""><img alt="" src="http://www.dcodes.net/thumb.php?src=http://www.dcodes.net/backgrounds/'+listBackgroundImg[i]+'&w='+box_setting.th_image_width+'&h='+box_setting.th_image_height+'&a=c" /></a>';
			}
		} else if ($(this).attr('rel') == 'color') {
			for (var i=0; i<=countBackgroundColorImgPath; i++) {
				backgroundSidePanel += '<a class="bg_t" href="templates/1/box_setting/images/bg_images/'+listBackgroundColorImgPath[i][2]+'" rel=\''+listBackgroundColorImgPath[i][1]+'\' title="'+listBackgroundColorImgPath[i][0]+'"><img alt="" src="templates/1/box_setting/images/bg_images/'+listBackgroundColorImgPath[i][2]+'" width="'+box_setting.th_image_width+'" height="'+box_setting.th_image_height+'" /></a>';
			}
		} else if ($(this).attr('rel') == 'dark') {
			for (var i=0; i<=countBackgroundDarkImgPath; i++) {
				backgroundSidePanel += '<a class="bg_t" href="templates/1/box_setting/images/bg_images/'+listBackgroundDarkImgPath[i][2]+'" rel=\''+listBackgroundDarkImgPath[i][1]+'\' title="'+listBackgroundDarkImgPath[i][0]+'"><img alt="" src="templates/1/box_setting/images/bg_images/'+listBackgroundDarkImgPath[i][2]+'" width="'+box_setting.th_image_width+'" height="'+box_setting.th_image_height+'" /></a>';
			}
		} else if ($(this).attr('rel') == 'light') {
			for (var i=0; i<=countBackgroundLightImgPath; i++) {
				backgroundSidePanel += '<a class="bg_t" href="templates/1/box_setting/images/bg_images/'+listBackgroundLightImgPath[i][2]+'" rel=\''+listBackgroundLightImgPath[i][1]+'\' title="'+listBackgroundLightImgPath[i][0]+'"><img alt="" src="templates/1/box_setting/images/bg_images/'+listBackgroundLightImgPath[i][2]+'" width="'+box_setting.th_image_width+'" height="'+box_setting.th_image_height+'" /></a>';
			}
		} else if ($(this).attr('rel') == 'wood') {
			for (var i=0; i<=countBackgroundWoodImgPath; i++) {
				backgroundSidePanel += '<a class="bg_t" href="templates/1/box_setting/images/bg_images/'+listBackgroundWoodImgPath[i][2]+'" rel=\''+listBackgroundWoodImgPath[i][1]+'\' title="'+listBackgroundWoodImgPath[i][0]+'"><img alt="" src="templates/1/box_setting/images/bg_images/'+listBackgroundWoodImgPath[i][2]+'" width="'+box_setting.th_image_width+'" height="'+box_setting.th_image_height+'" /></a>';
			}
		}
		$('.stBgs').html(backgroundSidePanel);
	});

	$('#resetSetting').live('click', function () {
		$.extend(true, box_setting, options);
		var expires = new Date();
		expires.setDate(expires.getDate() + 365);
		$.cookies.set(path_to_cookie, box_setting, {expiresAt: expires});
		$.setDefaultSetting();
		$.printOptions();
		return false;
	});
	closeSaveSettings = function () {
		$('#overlaySave').remove();
	}
	$.printSave = function () {
		$('body').append('<div id="overlaySave"></div>');
		$('#overlaySave').append('<div class="SaveSettingSubject">Settings Saved</div>');
		setTimeout(closeSaveSettings, 1000);
	}
	$('#saveSetting').live('click', function () {
		var expires = new Date();
		expires.setDate(expires.getDate() + 365);
		$.cookies.set(path_to_cookie, box_setting, {expiresAt: expires});
		if ($('.popup_fly').css("display")=='block'){
			$('.popup_fly').remove();
			$.openViewCSSCode();
		}
		$.printOptions();
		$.printSave();
		return false;
	});
	$('#viewSetting').live('click', function () {
		$('.popup_fly').remove();
		$.openViewCSSCode();
		return false;
	});

	$('.close_popup').live('click', function () {
		$('.popup_fly').remove();
		return false;
	});

	$('.panel_title_link').each(function () {
		$('.'+$(this).attr('rel')).hide();
	});

	$('.panel_title_link').click(function () {
		var this_box = $(this).attr('rel');
		$('.panel_title_link').each(function () {
			if (this_box == $(this).attr('rel')) {
				$('.'+$(this).attr('rel')).slideToggle();
			} else {
				$('.'+$(this).attr('rel')).slideUp();
			}
		});
		return false;
	})

	/* View palette Starts */
	$.paletteCountView = function (obj) {
		$(obj).children('span').each(function (i, data) {
			if (i >= box_setting.sidePaletteView) {
				$(this).css({display:'none'});
			}
		})
	}
	$('.stColor').each(function () {
		$.paletteCountView($(this));
	});
	$('.open_palette').live('click',function () {
		$('div.'+$(this).attr('rel')+' span').css({display:'block'});
		$(this).removeClass('open_palette').addClass('close_palette')
		$(this).text(box_setting.sidePaletteClose);
		return false;
	});
	$('.close_palette').live('click',function () {
		$.paletteCountView($('div.'+$(this).attr('rel')));
		$(this).removeClass('close_palette').addClass('open_palette')
		$(this).text(box_setting.sidePaletteOpen);
		return false;
	});
	/* View palette Ends */

	// Show/Hide box panel
	$('.panel_button a').click(function () {
		if ($(this).hasClass('open')) {
			$(this).removeClass('open')
				   .addClass('close')
				   .attr('title','Open Panel');
			if (box_setting.sidePositionPanel == 'left') {
				$(this).html(box_setting.sideButtonOpen);
				$('#panel_setting_side').animate({left: '-132px'});
			} else {
				$(this).html(box_setting.sideButtonClose);
				$('#panel_setting_side').animate({right: '-132px'});
			}
		} else {
			$(this).removeClass('close')
				   .addClass('open')
				   .attr('title','Close Panel');
			if (box_setting.sidePositionPanel == 'left') {
				$(this).html(box_setting.sideButtonClose);
				$('#panel_setting_side').animate({left: '0px'});
			} else {
				$(this).html(box_setting.sideButtonOpen);
				$('#panel_setting_side').animate({right: '0px'});
			}
		}
		return false;
	});

	// Start work panel
	$('.panel_button a').click();

}

// ]]>

