<?php
function snatchtable($res)
{
    global $INSTALLER09, $lang, $CURUSER;
    $htmlout = '';
    $htmlout = "<table class='main' border='1' cellspacing='0' cellpadding='5'>
 <tr>
<td class='colhead'>{$lang['userdetails_s_cat']}</td>
<td class='colhead'>{$lang['userdetails_s_torr']}</td>
<td class='colhead'>{$lang['userdetails_s_up']}</td>
<td class='colhead'>{$lang['userdetails_rate']}</td>
" . ($INSTALLER09['ratio_free'] ? "" : "<td class='colhead'>{$lang['userdetails_downl']}</td>") . "
" . ($INSTALLER09['ratio_free'] ? "" : "<td class='colhead'>{$lang['userdetails_rate']}</td>") . "
<td class='colhead'>{$lang['userdetails_ratio']}</td>
<td class='colhead'>{$lang['userdetails_activity']}</td>
<td class='colhead'>{$lang['userdetails_s_fin']}</td>
</tr>";
    while ($arr = mysqli_fetch_assoc($res)) {
        $upspeed = ($arr["upspeed"] > 0 ? mksize($arr["upspeed"]) : ($arr["seedtime"] > 0 ? mksize($arr["uploaded"] / ($arr["seedtime"] + $arr["leechtime"])) : mksize(0)));
        $downspeed = ($arr["downspeed"] > 0 ? mksize($arr["downspeed"]) : ($arr["leechtime"] > 0 ? mksize($arr["downloaded"] / $arr["leechtime"]) : mksize(0)));
        $ratio = ($arr["downloaded"] > 0 ? number_format($arr["uploaded"] / $arr["downloaded"], 3) : ($arr["uploaded"] > 0 ? "Inf." : "---"));
        $XBT_or_PHP = (XBT_TRACKER == true ? $arr['fid'] : $arr['torrentid']);
        $XBT_or_PHP_TIME = (XBT_TRACKER == true ? $arr["completedtime"] : $arr["complete_date"]);
        $htmlout.= "<tr>
 <td style='padding: 0px'><img src='{$INSTALLER09['pic_base_url']}caticons/{$CURUSER['categorie_icon']}/" . htmlsafechars($arr["catimg"]) . "' alt='" . htmlsafechars($arr["catname"]) . "' width='42' height='42' /></td>
 <td><a href='details.php?id=" . (int)$XBT_or_PHP . "'><b>" . (strlen($arr["name"]) > 50 ? substr($arr["name"], 0, 50 - 3) . "..." : htmlsafechars($arr["name"])) . "</b></a></td>
 <td>" . mksize($arr["uploaded"]) . "</td>
 <td>$upspeed/s</td>
 " . ($INSTALLER09['ratio_free'] ? "" : "<td>" . mksize($arr["downloaded"]) . "</td>") . "
 " . ($INSTALLER09['ratio_free'] ? "" : "<td>$downspeed/s</td>") . "
 <td>$ratio</td>
 <td>" . mkprettytime($arr["seedtime"] + $arr["leechtime"]) . "</td>
 <td>" . ($XBT_or_PHP_TIME <> 0 ? "<font color='green'><b>{$lang['userdetails_yes']}</b></font>" : "<font color='red'><b>{$lang['userdetails_no']}</b></font>") . "</td>
 </tr>\n";
    }
    $htmlout.= "</table>\n";
    return $htmlout;
}
function maketable($res)
{
    global $INSTALLER09, $lang, $CURUSER;
   
    $htmlout = '';
    $htmlout.= "<table class='main' border='1' cellspacing='0' cellpadding='5'>" . "<tr><td class='colhead' align='center'>{$lang['userdetails_type']}</td>
         <td class='colhead'>{$lang['userdetails_name']}</td>
         <td class='colhead' align='center'>{$lang['userdetails_size']}</td>
         <td class='colhead' align='right'>{$lang['userdetails_se']}</td>
         <td class='colhead' align='right'>{$lang['userdetails_le']}</td>
         <td class='colhead' align='center'>{$lang['userdetails_upl']}</td>\n" . "" . ($INSTALLER09['ratio_free'] ? "" : "<td class='colhead' align='center'>{$lang['userdetails_downl']}</td>") . "
         <td class='colhead' align='center'>{$lang['userdetails_ratio']}</td></tr>\n";
    foreach ($res as $arr) {
        if ($arr["downloaded"] > 0) {
            $ratio = number_format($arr["uploaded"] / $arr["downloaded"], 3);
            $ratio = "<font color='" . get_ratio_color($ratio) . "'>$ratio</font>";
        } else if ($arr["uploaded"] > 0) $ratio = "{$lang['userdetails_inf']}";
        else $ratio = "---";
        $catimage = "{$INSTALLER09['pic_base_url']}caticons/{$CURUSER['categorie_icon']}/{$arr['image']}";
        $catname = htmlsafechars($arr["catname"]);
        $catimage = "<img src=\"" . htmlsafechars($catimage) . "\" title=\"$catname\" alt=\"$catname\" width='42' height='42' />";
        $size = str_replace(" ", "<br />", mksize($arr["size"]));
        $uploaded = str_replace(" ", "<br />", mksize($arr["uploaded"]));
        $downloaded = str_replace(" ", "<br />", mksize($arr["downloaded"]));
        $seeders = number_format($arr["seeders"]);
        $leechers = number_format($arr["leechers"]);
        $XBT_or_PHP = (XBT_TRACKER == true ? $arr['fid'] : $arr['torrent']);
        $htmlout.= "<tr><td style='padding: 0px'>$catimage</td>\n" . "<td><a href='details.php?id=" . (int)$XBT_or_PHP . "&amp;hit=1'><b>" . htmlsafechars($arr['torrentname']) . "</b></a></td><td align='center'>$size</td><td align='right'>$seeders</td><td align='right'>$leechers</td><td align='center'>$uploaded</td>\n" . "" . ($INSTALLER09['ratio_free'] ? "" : "<td align='center'>$downloaded</td>") . "<td align='center'>$ratio</td></tr>\n";
    }
    $htmlout.= "</table>\n";
    return $htmlout;
}
if ($user['paranoia'] < 2 || $user['opt1'] & user_options::HIDECUR || $CURUSER['id'] == $id || $CURUSER['class'] >= UC_STAFF) {
    if (isset($torrents)) $HTMLOUT.= "<tr valign=\"top\"><td class=\"rowhead\" width=\"10%\">{$lang['userdetails_uploaded_t']}</td><td align=\"left\" width=\"90%\"><a href=\"javascript: klappe_news('a')\"><img border=\"0\" src=\"pic/plus.png\" id=\"pica\" alt=\"Show/Hide\" /></a><div id=\"ka\" style=\"display: none;\">$torrents</div></td></tr>\n";
    /*
    if (isset($torrents)) {    
       $HTMLOUT .= "   <tr valign=\"top\">    
                        <td class=\"rowhead\" width=\"10%\">
                         {$lang['userdetails_uploaded_t']}   
                      </td>    
                      <td align=\"left\" width=\"90%\">    
                         <a href=\"#\" id=\"slick-toggle\">Show/Hide</a>       
                         <div id=\"slickbox\" style=\"display: none;\">{$torrents}</div>    
                      </td>    
                   </tr>";    
    } 
    */
    /*
    if (isset($seeding)) {    
       $HTMLOUT .= "   <tr valign=\"top\">    
                        <td class=\"rowhead\" width=\"10%\">
                         {$lang['userdetails_cur_seed']} 
                      </td>    
                      <td align=\"left\" width=\"90%\">    
                         <a href=\"#\" id=\"slick-toggle\">Show/Hide</a>       
                         <div id=\"slickbox\" style=\"display: none;\">".maketable($seeding)."</div>    
                      </td>    
                   </tr>";    
    } 
    */
    if (isset($seeding)) $HTMLOUT.= "<tr valign=\"top\"><td class=\"rowhead\" width=\"10%\">{$lang['userdetails_cur_seed']}</td><td align=\"left\" width=\"90%\"><a href=\"javascript: klappe_news('a1')\"><img border=\"0\" src=\"pic/plus.png\" id=\"pica1\" alt=\"Show/Hide\" /></a><div id=\"ka1\" style=\"display: none;\">" . maketable($seeding) . "</div></td></tr>\n";
    /*
    if (isset($leeching)) {    
       $HTMLOUT .= "   <tr valign=\"top\">    
                        <td class=\"rowhead\" width=\"10%\">
                         {$lang['userdetails_cur_leech']}
                      </td>    
                      <td align=\"left\" width=\"90%\">    
                         <a href=\"#\" id=\"slick-toggle\">Show/Hide</a>       
                         <div id=\"slickbox\" style=\"display: none;\">".maketable($leeching)."</div>    
                      </td>    
                   </tr>";    
    }
    */
    if (isset($leeching)) $HTMLOUT.= "<tr valign=\"top\"><td class=\"rowhead\" width=\"10%\">{$lang['userdetails_cur_leech']}</td><td align=\"left\" width=\"90%\"><a href=\"javascript: klappe_news('a2')\"><img border=\"0\" src=\"pic/plus.png\" id=\"pica2\" alt=\"Show/Hide\" /></a><div id=\"ka2\" style=\"display: none;\">" . maketable($leeching) . "</div></td></tr>\n";
    //==Snatched

    if (($user_snatches_data = $mc1->get_value('user_snatches_data_' . $id)) === false) {
        if (XBT_TRACKER === false) {
        $ressnatch = sql_query("SELECT s.*, t.name AS name, c.name AS catname, c.image AS catimg FROM snatched AS s INNER JOIN torrents AS t ON s.torrentid = t.id LEFT JOIN categories AS c ON t.category = c.id WHERE s.userid =" . sqlesc($user['id'])) or sqlerr(__FILE__, __LINE__);
        } else {
         $ressnatch = sql_query("SELECT x.*, t.name AS name, c.name AS catname, c.image AS catimg FROM xbt_files_users AS x INNER JOIN torrents AS t ON x.fid = t.id LEFT JOIN categories AS c ON t.category = c.id WHERE x.uid =" . sqlesc($user['id'])) or sqlerr(__FILE__, __LINE__);
        }
        $user_snatches_data = snatchtable($ressnatch);
        $mc1->cache_value('user_snatches_data_' . $id, $user_snatches_data, $INSTALLER09['expires']['user_snatches_data']);
    }
    /*
    if (isset($user_snatches_data)) 
       $HTMLOUT .= "   <tr valign=\"top\">    
                        <td class=\"rowhead\" width=\"10%\">
                         {$lang['userdetails_cur_snatched']}
                      </td>    
                      <td align=\"left\" width=\"90%\">    
                         <a href=\"#\" id=\"slick-toggle\">Show/Hide</a>       
                         <div id=\"slickbox\" style=\"display: none;\">$user_snatches_data</div>    
                      </td>    
                   </tr>";    
    //}
    */
    if (isset($user_snatches_data)) $HTMLOUT.= "<tr valign=\"top\"><td class=\"rowhead\" width=\"10%\">{$lang['userdetails_cur_snatched']}</td><td align=\"left\" width=\"90%\"><a href=\"javascript: klappe_news('a3')\"><img border=\"0\" src=\"pic/plus.png\" id=\"pica3\" alt=\"Show/Hide\" /></a><div id=\"ka3\" style=\"display: none;\">$user_snatches_data</div></td></tr>\n";
}
//==End
// End Class
// End File
