// <![CDATA[
var elements_heading_font_style = '.logo, h2, h3, h1, p.but',
	header_google_font='Ruda',     //google name of font('Trebuchet+MS')
	header_font_style='Ruda';       //full name of font  ('Trebuchet MS')

function get_header_html_text() {
	var html_text = '<link href="//fonts.googleapis.com/css?family='+header_google_font+'" type="text/css" rel="stylesheet">'+
	'\n<style>'+ 
	'\n'+elements_heading_font_style+' { font-family:"'+header_font_style+'", "Lato", "Trebuchet MS", Arial, "Helvetica CY", "Nimbus Sans L", sans-serif; }'+
	'\n</style>';
	
	return (html_text);
}

document.writeln(get_header_html_text());

// ]]>

