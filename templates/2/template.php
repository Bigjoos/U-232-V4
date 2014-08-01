<?php
/**
 |------------------------------------------------------------------------------------------------------|
 |   https://github.com/Bigjoos/                			       
 |------------------------------------------------------------------------------------------------------|
 |   Licence Info: GPL							       
 |------------------------------------------------------------------------------------------------------|
 |   Copyright (C) 2010 U-232 V4											
 |------------------------------------------------------------------------------------------------------|
 |   A bittorrent tracker source based on TBDev.net/tbsource/bytemonsoon.	
 |------------------------------------------------------------------------------------------------------|
 |   Project Leaders: Mindless,putyn.								        
 |------------------------------------------------------------------------------------------------------|
 */
//==Template system by Terranova
function stdhead($title = "", $msgalert = true, $stdhead = false)
{
    global $CURUSER, $INSTALLER09, $lang, $free, $_NO_COMPRESS, $query_stat, $querytime, $mc1, $BLOCKS, $CURBLOCK, $mood;
    if (!$INSTALLER09['site_online']) die("Site is down for maintenance, please check back again later... thanks<br />");
    if ($title == "") $title = $INSTALLER09['site_name'] . (isset($_GET['tbv']) ? " (" . TBVERSION . ")" : '');
    else $title = $INSTALLER09['site_name'] . (isset($_GET['tbv']) ? " (" . TBVERSION . ")" : '') . " :: " . htmlsafechars($title);
    if ($CURUSER) {
        $INSTALLER09['stylesheet'] = isset($CURUSER['stylesheet']) ? "{$CURUSER['stylesheet']}.css" : $INSTALLER09['stylesheet'];
        $INSTALLER09['categorie_icon'] = isset($CURUSER['categorie_icon']) ? "{$CURUSER['categorie_icon']}" : $INSTALLER09['categorie_icon'];
        $INSTALLER09['language'] = isset($CURUSER['language']) ? "{$CURUSER['language']}" : $INSTALLER09['language'];
    }
    /** ZZZZZZZZZZZZZZZZZZZZZZZZZZip it! */
     if (!isset($_NO_COMPRESS))
     if (!ob_start('ob_gzhandler'))
     ob_start();
    //== Include js files needed only for the page being used by pdq
    $js_incl = '';
    //$js_incl.= '<!-- javascript goes here or in footer -->';
    if (!empty($stdhead['js'])) {
        foreach ($stdhead['js'] as $JS) $js_incl.= "<script type='text/javascript' src='{$INSTALLER09['baseurl']}/scripts/" . $JS . ".js'></script>";
    }
    //== Include css files needed only for the page being used by pdq
    $css_incl = '';
    //$css_incl.= '<!-- css goes here -->';
    $salty = md5("Th15T3xtis5add3dto66uddy6he@water..." . $CURUSER['username'] . "");
    if (!empty($stdhead['css'])) {
        foreach ($stdhead['css'] as $CSS) $css_incl.= "<link type='text/css' rel='stylesheet' href='{$INSTALLER09['baseurl']}/templates/{$CURUSER['stylesheet']}/css/" . $CSS . ".css' />";
    }
    if (isset($INSTALLER09['xhtml_strict'])) { //== Use strict mime type/doctype
        //== Only if browser/user agent supports xhtml
        if (isset($_SERVER['HTTP_ACCEPT']) && stristr($_SERVER['HTTP_ACCEPT'], 'application/xhtml+xml') && ($INSTALLER09['xhtml_strict'] === 1 || $INSTALLER09['xhtml_strict'] == $CURUSER['username'])) {
            header('Content-type:application/xhtml+xml; charset=' . charset());
             $doctype = '<?xml version="1.0" encoding="' . charset() . '"?>' . '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">' . '<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">';
        }
    }
    if (!isset($doctype)) {
        header('Content-type:text/html; charset=' . charset());
        $doctype = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN"' . ' "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">' . '<html xmlns="http://www.w3.org/1999/xhtml">';
    }
    //==
    $htmlout = $doctype . "<head>
        <meta http-equiv='Content-Language' content='en-us' />
        <meta content='text/html; charset=UTF-8' http-equiv='Content-Type'></meta>
        <meta content='width=device-width, initial-scale=1, maximum-scale=1' name='viewport'></meta>
        <!-- ####################################################### -->
        <!-- #   This website is powered by U-232 V4	           # -->
        <!-- #   Download and support at: https://forum.u-232.com  # -->
        <!-- #   Template Modded by U-232 Dev Team                 # -->
        <!-- ####################################################### -->
        <title>{$title}</title>
        <link rel='alternate' type='application/rss+xml' title='Latest Torrents' href='./rss.php?torrent_pass={$CURUSER['torrent_pass']}' />
     	<!-- favicon 
      	=================================================== -->
        <link rel='shortcut icon' href='favicon.ico' />
      	<!-- css 
      	=================================================== -->
		<link rel='stylesheet' href='templates/2/2.css' type='text/css' />
		<link rel='stylesheet' href='templates/2/css/bootstrap.css' type='text/css' />
		<link rel='stylesheet' href='templates/2/css/bootstrap-responsive.css' type='text/css' />
		<!--<link rel='stylesheet' href='templates/2/css/ios.css' type='text/css' />-->
		<link rel='stylesheet' href='templates/2/css/style.css'  type='text/css' />
		<link rel='stylesheet' href='templates/2/css/icons.css'  type='text/css' />
		<link rel='stylesheet' href='templates/2/css/menusm.css' type='text/css'  />
		<link rel='stylesheet' href='templates/2/css/skeleton.css' type='text/css' />
		<link rel='stylesheet' href='templates/2/css/layout.css' type='text/css' />
		<link rel='stylesheet' href='templates/2/preloader/css/preloader.css' type='text/css' />
	        <link rel='stylesheet' href='templates/2/css/bbcode.css' type='text/css' />
	        <link rel='stylesheet' href='templates/2/css/jquery.lightbox-0.5.css' type='text/css' />
	        <link rel='stylesheet' href='templates/2/toggles/toggles.css' type='text/css' />
		<script type='text/javascript' src='templates/2/toggles/toggles.min.js'></script>
		<script type='text/javascript' src='templates/2/toggles/toggles.js'></script>
		<script type='text/javascript' src='templates/2/js/jquery.min.js'></script>
		<script type='text/javascript' src='templates/2/js/jquery-migrate-1.2.1.min.js'></script>	
		<script type='text/javascript' src='./scripts/jquery.status.js'></script>
		<script type='text/javascript' src='./scripts/help.js'></script>
	    <script type='text/javascript'>
	        /*<![CDATA[*/
		// template changer function
		//================================================== -->
		function themes() {
	          window.open('take_theme.php','My themes','height=150,width=200,resizable=no,scrollbars=no,toolbar=no,menubar=no');
	        }
	
		// language changer function
		//================================================== -->
		function language_select() {
	          window.open('take_lang.php','My language','height=150,width=200,resizable=no,scrollbars=no,toolbar=no,menubar=no');
	        }
	
		// radio function
		//================================================== -->
	        function radio() {
	          window.open('radio_popup.php','My Radio','height=700,width=800,resizable=no,scrollbars=no,toolbar=no,menubar=no');
        }
         /*]]>*/
        </script> 
        {$js_incl}{$css_incl}
	    <!--[if lt IE 9]>
		<script type='text/javascript' src='templates/2/js/modernizr.custom.js'></script>
		<script type='text/javascript' src='http://ie7-js.googlecode.com/svn/version/2.1(beta4)/IE8.js'></script>
		<script type='text/javascript' src='templates/2/js/ie.js'></script>
		<![endif]-->
	<!-- javascript goes in footer -->
        </head>
        <body>
        <div class='body_pattern'>
        <div class='main'>
        <div class='header'>
	<div class='header_bg'>
		<div class='container'>
		<div class='header_resize'></div>";	
                if ($CURUSER) {
		$htmlout.="<div id='base_globelmessage'><!-- U-232 Source - Print Global Messages Start -->
                <div id='gm_taps'>
		<ul class='gm_taps'>
		<li><b>{$lang['gl_alerts']}</b></li>";
		
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_REPORTS && $BLOCKS['global_staff_report_on']) {
        require_once (BLOCK_DIR . 'global/report.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_UPLOADAPP && $BLOCKS['global_staff_uploadapp_on']) {
        require_once (BLOCK_DIR . 'global/uploadapp.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_HAPPYHOUR && $BLOCKS['global_happyhour_on'] && XBT_TRACKER == false) {
        require_once (BLOCK_DIR . 'global/happyhour.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_STAFF_MESSAGE && $BLOCKS['global_staff_warn_on']) {
        require_once (BLOCK_DIR . 'global/staffmessages.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_NEWPM && $BLOCKS['global_message_on']) {
	require_once (BLOCK_DIR . 'global/message.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_DEMOTION && $BLOCKS['global_demotion_on']) {
	require_once (BLOCK_DIR . 'global/demotion.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_FREELEECH && $BLOCKS['global_freeleech_on'] && XBT_TRACKER == false) {
        require_once (BLOCK_DIR . 'global/freeleech.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_CRAZYHOUR && $BLOCKS['global_crazyhour_on'] && XBT_TRACKER == false) {
	require_once (BLOCK_DIR . 'global/crazyhour.php');
     }
     if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_BUG_MESSAGE && $BLOCKS['global_bug_message_on']) {
	require_once (BLOCK_DIR . 'global/bugmessages.php');
     }
    if (curuser::$blocks['global_stdhead'] & block_stdhead::STDHEAD_FREELEECH_CONTRIBUTION && $BLOCKS['global_freeleech_contribution_on']) {
     require_once (BLOCK_DIR . 'global/freeleech_contribution.php');
     }
     $htmlout.= "
		</ul>
		</div>
		</div><!-- U-232 Source - Print Global Messages End -->";
     }
     $INSTALLER09['expires']['staff_check'] = 3600; //== test value
     if ($CURUSER['class'] >= UC_STAFF)
     {
        if (($mysql_data = $mc1->get_value('is_staff_' . $CURUSER['class'])) === false) {
        $res = sql_query('SELECT * FROM staffpanel WHERE av_class <= ' . sqlesc($CURUSER['class']) . ' ORDER BY page_name ASC') or sqlerr(__FILE__, __LINE__);
        while ($arr = mysqli_fetch_assoc($res)) $mysql_data[] = $arr;
        $mc1->cache_value('is_staff_' . $CURUSER['class'], $mysql_data, $INSTALLER09['expires']['staff_check']);
     }
       if ($mysql_data) { 
       $htmlout .= /*<![CDATA[*/'<div class="Staff_tools">Staff Tools:
	<div class="btn-group">
		<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
		User
		<span class="caret"></span>
		</a>
			<ul class="dropdown-menu">';
			foreach ($mysql_data as $key => $value){
			if ($value['av_class'] <= $CURUSER['class'] && $value['type'] == 'user')
			{
			$htmlout .= '
				<li><a href="'.htmlsafechars($value["file_name"]).'">'.htmlsafechars($value["page_name"]).'</a></li>
			';
			}
			}
			$htmlout .= '    
			</ul></div>';
	$htmlout .= '
	<div class="btn-group">
		<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
		Settings
		<span class="caret"></span>
		</a>
			<ul class="dropdown-menu">';
			foreach ($mysql_data as $key => $value){
			if ($value['av_class'] <= $CURUSER['class'] && $value['type'] == 'settings')
			{
			$htmlout .= '
				<li><a href="'.htmlsafechars($value["file_name"]).'">'.htmlsafechars($value["page_name"]).'</a></li>
			';
			}
			}
			$htmlout .= '    
			</ul></div>';
	$htmlout .= '
	<div class="btn-group">
		<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
		Stats
		<span class="caret"></span>
		</a>
			<ul class="dropdown-menu">';
			foreach ($mysql_data as $key => $value){
			if ((int)$value['av_class'] <= $CURUSER['class'] && htmlsafechars($value['type']) == 'stats')
			{
			$htmlout .= '
				<li><a href="'.htmlsafechars($value["file_name"]).'">'.htmlsafechars($value["page_name"]).'</a></li>
			';
			}
			}
			$htmlout .= '    
			</ul></div>';
	$htmlout .= '
	<div class="btn-group">
		<a class="btn dropdown-toggle" data-toggle="dropdown" href="#">
		Other
		<span class="caret"></span>
		</a>
			<ul class="dropdown-menu">';
			foreach ($mysql_data as $key => $value){
			if ((int)$value['av_class'] <= $CURUSER['class'] && htmlsafechars($value['type']) == 'other')
			{
			$htmlout .= '
				<li><a href="'.htmlsafechars($value["file_name"]).'">'.htmlsafechars($value["page_name"]).'</a></li>
			';
			}
			}
			$htmlout .= '    
			</ul></div></div>'/*]]>*/;
      }
      }
      $htmlout.= "<!-- U-232 Source - Print Global Messages End -->
			<!--/ statusbar start-->
			<div class='statusbar-container'>";
     if ($CURUSER) { $htmlout.= StatusBar() . "</div>";
      }
     $htmlout.= " <!--/ statusbar end-->
	      </div>
	      <div class='clr'></div>
	      </div>
              </div>
     <!--end of header_bg-->
     <div class='clr'></div>
     <div class='container'><!-- U-232 Source - Logo Start -->
     <div class='header_resize'>
     <!--logo-->
     <div class='logo'>
     <div>" . TBVERSION . "<h1><span>&nbsp;&nbsp;Code</span></h1></div>
     </div>
     <!--logo ends-->
     <div class='clr'></div>
     </div>
     </div>
     <div class='clr'></div>";

    if ($CURUSER) {
        $htmlout.= "
	<div class='container'>
		<div class='menu'>
			<ul id='menu-top-menu' class='sf-menu menusm l_tinynav1'>
			<li class='ms_first ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_first ms_top ms_havesubmenu' href='" . $INSTALLER09['baseurl'] . "/index.php'>
			<span>{$lang['gl_home']}</span>
			</a>
			</li>
			<li class='ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_top ms_havesubmenu' href='#'>
			<span>Personal</span>
			</a>
			<ul>
			<li class='ms_first'>
			<a class='ms_first' href='" . $INSTALLER09['baseurl'] . "/pm_system.php'>
			<span>{$lang['gl_pms']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/usercp.php?action=default'>
			<span>{$lang['gl_usercp']}</span>
			</a>
			</li>
			" . (isset($CURUSER) && $CURUSER['class'] >= UC_STAFF ? "
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/staffpanel.php'>
			<span>{$lang['gl_admin']}</span>
			</a>
			</li>" : "") . "
			<li>
			<a href='#' onclick='themes();'>
			<span>{$lang['gl_theme']}</span>
			</a>
			</li>
			<li>
			<a href='#' onclick='language_select();'>
			<span>{$lang['gl_language_select']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/friends.php'>
			<span>{$lang['gl_friends']}</span>
			</a>
			</li>
			<li class='ms_last'>
			<a class='ms_last' href='" . $INSTALLER09['baseurl'] . "/logout.php?hash_please={$salty}'>
			<span>{$lang['gl_logout']}</span>
			</a>
			</li>
			</ul>
			</li>
			<li class='ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_top ms_havesubmenu' href='#'>
			<span>Torrent</span>
			</a>
			<ul>
			<li class='ms_first'>
			<a class='ms_first' href='" . $INSTALLER09['baseurl'] . "/browse.php'>
			<span>{$lang['gl_torrents']}</span>
			</a>
			</li>
			<li>
			<a class='menu_navigation ms_havesubmenu' href='" . $INSTALLER09['baseurl'] . "/requests.php'>
			<span>{$lang['gl_requests']}</span>
			</a>
			</li>
			<li>
			<a  href='" . $INSTALLER09['baseurl'] . "/offers.php'>
			<span>{$lang['gl_offers']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/needseed.php?needed=seeders'>
			<span>{$lang['gl_nseeds']}</span>
			</a>
			</li>
			" . (isset($CURUSER) && $CURUSER['class'] <= UC_VIP ? "
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/uploadapp.php'>
			<span>{$lang['gl_uapp']}</span>
			</a>
			</li>" : "
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/upload.php'>
			<span>{$lang['gl_upload']}</span>
			</a>
			</li>") . "
			<li class='ms_last'>
			<a class='ms_last' href='" . $INSTALLER09['baseurl'] . "/bookmarks.php'>
			<span>{$lang['gl_bookmarks']}</span>
			</a>
			</li>
			</ul>
			</li>
			<li class='ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_top ms_havesubmenu' href='#'>
			<span>General</span>
			</a>
			<ul>
			<li class='ms_first'>
			<a class='ms_first' href='" . $INSTALLER09['baseurl'] . "/announcement.php'>
			<span>{$lang['gl_announcements']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/topten.php'>
			<span>{$lang['gl_stats']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/faq.php'>
			<span>{$lang['gl_faq']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/chat.php'>
			<span>{$lang['gl_irc']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/staff.php'>
			<span>{$lang['gl_staff']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/wiki.php'>
			<span>{$lang['gl_wiki']}</span>
			</a>
			</li>
			<li>
			<a href='#' onclick='radio();'>
			<span>{$lang['gl_radio']}</span>
			</a>
			</li>
			<li class='ms_last'>
			<a class='ms_last' href='./rsstfreak.php'>
			<span>{$lang['gl_tfreak']}</span>
			</a>
			</li>
			</ul>
			</li>
			<li class='ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_top ms_havesubmenu' href='#'>
			<span>{$lang['gl_games']}</span>
			</a>
			<ul>
			" . (isset($CURUSER) && $CURUSER['class'] >= UC_POWER_USER ? "
			<li class='ms_first'>
			<a class='ms_first' href='" . $INSTALLER09['baseurl'] . "/casino.php'>
			<span>{$lang['gl_casino']}</span>
			</a>
			</li>" : "") . "
			" . (isset($CURUSER) && $CURUSER['class'] >= UC_POWER_USER ? "
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/blackjack.php'>
			<span>{$lang['gl_bjack']}</span>
			</a>
			</li>" : "") . "
			<li class='ms_last'>
			<a class='ms_last' href='" . $INSTALLER09['baseurl'] . "/arcade.php'>
			<span>{$lang['gl_arcade']}</span>
			</a>
			</li>
			</ul>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/donate.php'>
			<span>{$lang['gl_donate']}</span>
			</a>
			</li>
			<li>
			<a href='" . $INSTALLER09['baseurl'] . "/forums.php'>
			<span>{$lang['gl_forums']}</span>
			</a>
			</li>
			<li class='ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_top ms_havesubmenu' href='#'>
			<span>Bugs</span>
			</a>
			<ul>
			 " . (isset($CURUSER) && $CURUSER['class'] < UC_STAFF ? "
			<li class='ms_first'>
			<a class='ms_first' href='" . $INSTALLER09['baseurl'] . "/bugs.php?action=add'>
			<span>{$lang['gl_breport']}</span>
			</a>
			</li>" : "
			<li class='ms_last'>
			<a class='ms_last'  href='" . $INSTALLER09['baseurl'] . "/bugs.php?action=bugs'>
			<span>{$lang['gl_brespond']}</span>
			</a>
			</li>") . "
			</ul>
			</li>
			<li class='ms_top ms_havesubmenu'>
			<a class='menu_navigation ms_top ms_havesubmenu' href='#'>
			<span>Staff Messages</span>
			</a>
			<ul>
			" . (isset($CURUSER) && $CURUSER['class'] < UC_STAFF ? "
			<li class='ms_last ms_top'>
			<a class='menu_navigation ms_last ms_top' href='" . $INSTALLER09['baseurl'] . "/contactstaff.php'>
			<span>{$lang['gl_cstaff']}</span>
			</a>
			</li>" : "
			<li class='ms_last'>
			<a class='ms_last'  href='" . $INSTALLER09['baseurl'] . "/staffbox.php'>
			<span>{$lang['gl_smessages']}</span>
			</a>
			</li>") . "
			</ul>
			</li>
			</ul>
		</div>
	</div>
       <div class='clr'></div>
       <!--/menu-->";
    }
    $htmlout.= "  
    <div class='clr'></div>
	<!-- Main Outer Container
        =================================================== -->
	<div class='content'>
	<div class='container'>";
 
    return $htmlout;
} // stdhead
function stdfoot($stdfoot = false)
{
    global $CURUSER, $INSTALLER09, $start, $query_stat, $mc1, $querytime, $lang;
    $debug = (SQL_DEBUG && in_array($CURUSER['id'], $INSTALLER09['allowed_staff']['id']) ? 1 : 0);
    $cachetime = ($mc1->Time / 1000);
    $seconds = microtime(true) - $start;
    $r_seconds = round($seconds, 5);
    //$phptime = $seconds - $cachetime;
    $phptime = $seconds - $querytime - $cachetime;
    $queries = count($query_stat); // sql query count by pdq
    $percentphp = number_format(($phptime / $seconds) * 100, 2);
    //$percentsql  = number_format(($querytime / $seconds) * 100, 2);
    $percentmc = number_format(($cachetime / $seconds) * 100, 2);
    if (($MemStats = $mc1->get_value('mc_hits')) === false) {
        $MemStats = $mc1->getStats();
        $MemStats['Hits'] = (($MemStats['get_hits'] / $MemStats['cmd_get'] < 0.7) ? '' : number_format(($MemStats['get_hits'] / $MemStats['cmd_get']) * 100, 3));
        $mc1->cache_value('mc_hits', $MemStats, 10);
    }
    // load averages - pdq
    if ($debug) {
        if (($uptime = $mc1->get_value('uptime')) === false) {
            $uptime = `uptime`;
            $mc1->cache_value('uptime', $uptime, 25);
        }
        preg_match('/load average: (.*)$/i', $uptime, $load);
    }
    $header = '';
    $header = '<b>' . $lang['gl_stdfoot_querys_mstat'] . '</b> ' . mksize(memory_get_peak_usage()) . ' ' . $lang['gl_stdfoot_querys_mstat1'] . ' ' . round($phptime, 2) . 's | ' . round($percentmc, 2) . '' . $lang['gl_stdfoot_querys_mstat2'] . '' . number_format($cachetime, 5) . 's ' . $lang['gl_stdfoot_querys_mstat3'] . '' . $MemStats['Hits'] . '' . $lang['gl_stdfoot_querys_mstat4'] . '' . (100 - $MemStats['Hits']) . '' . $lang['gl_stdfoot_querys_mstat5'] . '' . number_format($MemStats['curr_items']);
    $htmlfoot = '';
    //== query stats
    //== include js files needed only for the page being used by pdq
    //$htmlfoot.= '<!-- javascript goes here -->';
    if (!empty($stdfoot['js'])) {
        foreach ($stdfoot['js'] as $JS) $htmlfoot.= '<script type="text/javascript" src="' . $INSTALLER09['baseurl'] . '/scripts/' . $JS . '.js"></script>';
    }
    $querytime = 0;
    if ($CURUSER && $query_stat && $debug) {
        $htmlfoot.= "
		<div class='row-fluid'>
			<fieldset><legend>{$lang['gl_stdfoot_querys']}</legend>
				<div class='box-content'>
					<table class='table  table-bordered'>
						<thead>
							<tr>
								<th align='center'>{$lang['gl_stdfoot_id']}</th>
								<th align='center'>{$lang['gl_stdfoot_qt']}</th>
								<th align='left'>{$lang['gl_stdfoot_qs']}</th>
							</tr>
						</thead>";
        foreach ($query_stat as $key => $value) {
            $querytime+= $value['seconds']; // query execution time
            $htmlfoot.= "
						<tbody>
							<tr>
								<td>" . ($key + 1) . "</td>
								<td align='center'><b>" . ($value['seconds'] > 0.01 ? "<font color='red' title='{$lang['gl_stdfoot_ysoq']}'>" . $value['seconds'] . "</font>" : "<font color='green' title='{$lang['gl_stdfoot_qg']}'>" . $value['seconds'] . "</font>") . "</b></td>
								<td align='left'>" . htmlsafechars($value['query']) . "<br /></td>
							</tr>
						</tbody>";
        }
        $htmlfoot.= '
					</table>
				</div>
			</fieldset>
		</div>';
    }
    $htmlfoot.= "<!--</td></tr></table>-->";
    if ($CURUSER) {
    /** just in case **/
    $htmlfoot.= "
	
	<!--End main outer container
	======================================================= -->
<div class='clr'></div>
	 <!--footer -->
	<div class='footer'>
		<div>
			<div>
				<div class='pull-left cite text-left'>
				" . $INSTALLER09['site_name'] . " {$lang['gl_stdfoot_querys_page']}" . $r_seconds . " {$lang['gl_stdfoot_querys_seconds']}<br />" . "
				{$lang['gl_stdfoot_querys_server']}" . $queries . " {$lang['gl_stdfoot_querys_time']} " . ($queries != 1 ? "'s" : "") . "
				" . ($debug ? "<br /><b>" . $header . "</b><br /><b>{$lang['gl_stdfoot_uptime']}</b> " . $uptime . "" : " ") . "
				</div>
				<div class='pull-right cite text-right'>
				{$lang['gl_stdfoot_powered']}" . TBVERSION . "<br />
				{$lang['gl_stdfoot_using']}<b>{$lang['gl_stdfoot_using1']}</b><br />
				Support Forum Click <b><a href='https://forum.u-232.com/index.php'>here</a></b><br />
				" . ($debug ? "| <a title='System View' rel='external' href='/staffpanel.php?tool=system_view'>{$lang['gl_stdfoot_sview']}</a> | " . "<a rel='external' title='APC' href='/staffpanel.php?tool=apc'>{$lang['gl_stdfoot_apc']}</a> | " . "<a rel='external' title='Memcache' href='/staffpanel.php?tool=memcache'>{$lang['gl_stdfoot_memcache']}</a>" : "") . "";
			$htmlfoot.= "				
				</div>
			</div>
		</div>
	</div>";
   }
   $htmlfoot.= " <!-- Ends Footer-->
    </div><!--end of container-->
	</div><!--end of content--> 
	<!-- Placed at the end of the document so the pages load faster -->
	<!-- global javascript
      	================================================== -->
	<!-- template
	================================================== -->
	<script type='text/javascript' src='templates/2/js/menusm.js'></script>
	<script type='text/javascript' src='templates/2/js/scripts.js'></script>
	<script type='text/javascript' src='scripts/bootstrap.js'></script>
	<!-- Preloader Starts -->
	<script type='text/javascript' src='templates/2/preloader/js/jquery.preloader.js'></script>
	<!-- Preloader Ends -->
	<!-- Config User Intarface Box Import START -->
	<script type='text/javascript' src='templates/2/js/head_html_default_block.js' charset='utf-8'></script>
	<script type='text/javascript' src='templates/2/js/head_html_block.js'></script>
	<!-- Config User Intarface Box Import END -->
	<!-- Gallery Starts
	<script type='text/javascript' src='templates/2/js/gallery-masonry/jquery.masonry.min.js'></script>
	<script type='text/javascript' src='templates/2/js/gallery-masonry/modernizr-transitions.js'></script>
	<script type='text/javascript' src='templates/2/js/gallery-masonry/gallery-masonry.js'></script>
	Gallery Ends -->
	<script type='text/javascript'>
		$(function () {
			$('#menu-top-menu').tinyNav({
			active: 'selected',
			header: 'Navigation' 
		});
		});
	</script>
	<script type='text/javascript' src='templates/2/js/tinynav.min.js'></script>
	<script type='text/javascript' src='templates/2/js/tinynav.js'></script>
    </div>
    </div>
    </body>
    </html>";
    return $htmlfoot;
}
function stdmsg($heading, $text)
{
    $htmlout = "<table class='main' width='750' border='0' cellpadding='0' cellspacing='0'>
		<tr><td class='embedded'>\n";
    if ($heading) $htmlout.= "<h2>$heading</h2>\n";
    $htmlout.= "<table width='100%' border='1' cellspacing='0' cellpadding='10'>
		<tr><td class='text'>\n";
    $htmlout.= "{$text}</td></tr></table></td></tr>
    </table>\n";
    return $htmlout;
}
function hey()
{
    global $CURUSER, $lang;
    $now = date("H", TIME_NOW);
    switch ($now) {
    case ($now >= 7 && $now < 11):
        return "{$lang['gl_stdhey']}";
    case ($now >= 11 && $now < 13):
        return "{$lang['gl_stdhey1']}";
    case ($now >= 13 && $now < 17):
        return "{$lang['gl_stdhey2']}";
    case ($now >= 17 && $now < 19):
        return "{$lang['gl_stdhey3']}";
    case ($now >= 19 && $now < 21):
        return "{$lang['gl_stdhey4']}";
    case ($now >= 23 && $now < 0):
        return "{$lang['gl_stdhey5']}";
    case ($now >= 0 && $now < 7):
        return "{$lang['gl_stdhey6']}";
    default:
        return "{$lang['gl_stdhey7']}";
    }
}
function StatusBar()
{
    global $CURUSER, $INSTALLER09, $lang, $rep_is_on, $mc1, $msgalert;
    if (!$CURUSER) return "";
    $upped = mksize($CURUSER['uploaded']);
    $downed = mksize($CURUSER['downloaded']);
    //==Memcache unread pms
    $PMCount = 0;
    if (($unread1 = $mc1->get_value('inbox_new_sb_' . $CURUSER['id'])) === false) {
        $res1 = sql_query("SELECT COUNT(id) FROM messages WHERE receiver=" . sqlesc($CURUSER['id']) . " AND unread = 'yes' AND location = '1'") or sqlerr(__LINE__, __FILE__);
        list($PMCount) = mysqli_fetch_row($res1);
        $PMCount = (int)$PMCount;
        $unread1 = $mc1->cache_value('inbox_new_sb_' . $CURUSER['id'], $PMCount, $INSTALLER09['expires']['unread']);
    }
    $inbox = ($unread1 == 1 ? "$unread1&nbsp;{$lang['gl_msg_singular']}" : "$unread1&nbsp;{$lang['gl_msg_plural']}");
   //==Memcache peers
    if (XBT_TRACKER == true) {
    if (($MyPeersXbtCache = $mc1->get_value('MyPeers_XBT_'.$CURUSER['id'])) === false) {
        $seed['yes'] = $seed['no'] = 0;
        $seed['conn'] = 3;
        $r = sql_query("SELECT COUNT(uid) AS `count`, `left`, `active`, `connectable` FROM `xbt_files_users` WHERE uid= " . sqlesc($CURUSER['id'])." GROUP BY `left`") or sqlerr(__LINE__, __FILE__);
        while ($a = mysqli_fetch_assoc($r)) {
            $key = $a['left'] == 0 ? 'yes' : 'no';
            $seed[$key] = number_format(0 + $a['count']);
            $seed['conn'] = $a['connectable'] == 0 ? 1 : 2;
        }
        $mc1->cache_value('MyPeers_XBT_'.$CURUSER['id'], $seed, $INSTALLER09['expires']['MyPeers_xbt_']);
        unset($r, $a);
    } else {
        $seed = $MyPeersXbtCache;
    }
     // for display connectable  1 / 2 / 3
    if (!empty($seed['conn'])) {
        switch ($seed['conn']) {
        case 1:
            $connectable = "<img src='{$INSTALLER09['pic_base_url']}notcon.png' alt='Not Connectable' title='Not Connectable' />";
            break;

        case 2:
            $connectable = "<img src='{$INSTALLER09['pic_base_url']}yescon.png' alt='Connectable' title='Connectable' />";
            break;

        default:
            $connectable = "N/A";
        }
    } else $connectable = 'N/A';
} else {
    if (($MyPeersCache = $mc1->get_value('MyPeers_' . $CURUSER['id'])) === false) {
        $seed['yes'] = $seed['no'] = 0;
        $seed['conn'] = 3;
        $r = sql_query("SELECT COUNT(id) AS count, seeder, connectable FROM peers WHERE userid=" . sqlesc($CURUSER['id']) . " GROUP BY seeder");
        while ($a = mysqli_fetch_assoc($r)) {
            $key = $a['seeder'] == 'yes' ? 'yes' : 'no';
            $seed[$key] = number_format(0 + $a['count']);
            $seed['conn'] = $a['connectable'] == 'no' ? 1 : 2;
        }
        $mc1->cache_value('MyPeers_' . $CURUSER['id'], $seed, $INSTALLER09['expires']['MyPeers_']);
        unset($r, $a);
    } else {
        $seed = $MyPeersCache;
    }
    // for display connectable  1 / 2 / 3
    if (!empty($seed['conn'])) {
        switch ($seed['conn']) {
        case 1:
            $connectable = "<img src='{$INSTALLER09['pic_base_url']}notcon.png' alt='Not Connectable' title='Not Connectable' />";
            break;

        case 2:
            $connectable = "<img src='{$INSTALLER09['pic_base_url']}yescon.png' alt='Connectable' title='Connectable' />";
            break;

        default:
            $connectable = "N/A";
        }
    } else $connectable = 'N/A';
    }
    if (($Achievement_Points = $mc1->get_value('user_achievement_points_' . $CURUSER['id'])) === false) {
        $Sql = sql_query("SELECT users.id, users.username, usersachiev.achpoints, usersachiev.spentpoints FROM users LEFT JOIN usersachiev ON users.id = usersachiev.id WHERE users.id = " . sqlesc($CURUSER['id'])) or sqlerr(__FILE__, __LINE__);
        $Achievement_Points = mysqli_fetch_assoc($Sql);
        $Achievement_Points['id'] = (int)$Achievement_Points['id'];
        $Achievement_Points['achpoints'] = (int)$Achievement_Points['achpoints'];
        $Achievement_Points['spentpoints'] = (int)$Achievement_Points['spentpoints'];
        $mc1->cache_value('user_achievement_points_' . $CURUSER['id'], $Achievement_Points, 0);
    }
    $member_reputation = get_reputation($CURUSER);
    $usrclass = "";
    if ($CURUSER['override_class'] != 255) $usrclass = "&nbsp;<b>[" . get_user_class_name($CURUSER['class']) . "]</b>&nbsp;";
    else if ($CURUSER['class'] >= UC_STAFF) $usrclass = "&nbsp;<a href='./setclass.php'><b>[" . get_user_class_name($CURUSER['class']) . "]</b></a>&nbsp;";
    $StatusBar = $clock = '';
    $StatusBar.= "
       <!-- U-232 Source - Print Statusbar/User Menu -->
       <script type='text/javascript'>
       //<![CDATA[
       function showSlidingDiv(){
       $('#slidingDiv').animate({'height': 'toggle'}, { duration: 1000 });
       }
       //]]>
       </script>
       <div id='base_usermenu'>" . format_username($CURUSER) . " &nbsp;&nbsp;&nbsp;<span id='clock'>{$clock}</span>&nbsp;<span class='base_usermenu_arrow'><a href='#' onclick='showSlidingDiv(); return false;'><i class='icon-chevron-down'></i></a></span></div>
       <div id='slidingDiv'>
       <div class='slide_head'>{$lang['gl_pstats']}</div>
       <div class='slide_a'>{$lang['gl_uclass']}</div><div class='slide_b'>{$usrclass}</div>
       <div class='slide_c'>{$lang['gl_rep']}</div><div class='slide_d'>$member_reputation</div>
       <div class='slide_a'>{$lang['gl_invites']}</div><div class='slide_b'><a href='./invite.php'>{$CURUSER['invites']}</a></div>
       <div class='slide_c'>{$lang['gl_karma']}</div><div class='slide_d'><a href='./mybonus.php'>{$CURUSER['seedbonus']}</a></div>
       <div class='slide_a'>{$lang['gl_achpoints']}</div><div class='slide_b'><a href='./achievementhistory.php?id={$CURUSER['id']}'>" . (int)$Achievement_Points['achpoints'] . "</a></div>
       <div class='slide_head'>{$lang['gl_tstats']}</div>
       <div class='slide_a'>{$lang['gl_shareratio']}</div><div class='slide_b'>" . member_ratio($CURUSER['uploaded'], $INSTALLER09['ratio_free'] ? "0" : $CURUSER['downloaded']) . "</div>";
    if ($INSTALLER09['ratio_free']) {
        $StatusBar.= "<div class='slide_c'>{$lang['gl_uploaded']}</div><div class='slide_d'>$upped</div>";
    } else {
        $StatusBar.= "<div class='slide_c'>{$lang['gl_uploaded']}</div><div class='slide_d'>$upped</div>
       <div class='slide_a'>{$lang['gl_downloaded']}</div><div class='slide_b'>$downed</div>";
    }
    $StatusBar.= "<div class='slide_c'>{$lang['gl_seed_torrents']}</div><div class='slide_d'>{$seed['yes']}</div>
       <div class='slide_a'>{$lang['gl_leech_torrents']}</div><div class='slide_b'>{$seed['no']}</div>
       <div class='slide_c'>{$lang['gl_connectable']}</div><div class='slide_d'>{$connectable}</div>
        " . (isset($CURUSER) && $CURUSER['got_blocks'] == 'yes' ? "<div class='slide_head'>{$lang['gl_userblocks']}</div><div class='slide_a'>{$lang['gl_myblocks']}</div><div class='slide_b'><a href='./user_blocks.php'>{$lang['gl_click']}</a></div>" : "") . "
         " . (isset($CURUSER) && $CURUSER['got_moods'] == 'yes' ? "<div class='slide_c'>{$lang['gl_myunlocks']}</div><div class='slide_d'><a href='./user_unlocks.php'>{$lang['gl_click']}</a></div>" : "") . "
       </div>";
    $StatusBar.= '<script type="text/javascript">
      //<![CDATA[
      function refrClock(){
      var d=new Date();
      var s=d.getSeconds();
      var m=d.getMinutes();
      var h=d.getHours();
      var day=d.getDay();
      var date=d.getDate();
      var month=d.getMonth();
      var year=d.getFullYear();
      var am_pm;
      if (s<10) {s="0" + s}
      if (m<10) {m="0" + m}
      if (h>12) {h-=12;am_pm = "Pm"}
      else {am_pm="Am"}
      if (h<10) {h="0" + h}
      document.getElementById("clock").innerHTML=h + ":" + m + ":" + s + " " + am_pm;
      setTimeout("refrClock()",1000);
      }
      refrClock();
      //]]>
      </script>';
    return $StatusBar;
}
?>
