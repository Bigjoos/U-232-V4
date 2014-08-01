<?php
/**
 |--------------------------------------------------------------------------|
 |   https://github.com/Bigjoos/                			    |
 |--------------------------------------------------------------------------|
 |   Licence Info: GPL			                                    |
 |--------------------------------------------------------------------------|
 |   Copyright (C) 2010 U-232 V4					    |
 |--------------------------------------------------------------------------|
 |   A bittorrent tracker source based on TBDev.net/tbsource/bytemonsoon.   |
 |--------------------------------------------------------------------------|
 |   Project Leaders: Mindless,putyn.					    |
 |--------------------------------------------------------------------------|
  _   _   _   _   _     _   _   _   _   _   _     _   _   _   _
 / \ / \ / \ / \ / \   / \ / \ / \ / \ / \ / \   / \ / \ / \ / \
( U | - | 2 | 3 | 2 )-( S | o | u | r | c | e )-( C | o | d | e )
 \_/ \_/ \_/ \_/ \_/   \_/ \_/ \_/ \_/ \_/ \_/   \_/ \_/ \_/ \_/
 */
require_once (dirname(__FILE__) . DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR . 'bittorrent.php');
require_once (INCL_DIR . 'user_functions.php');
require_once (INCL_DIR . 'html_functions.php');
dbconn();
loggedinorreturn();
$lang = array_merge(load_language('global') , load_language('staff'));
$stdhead = array(
    /** include the css **/
    'css' => array(
        'staff'
    )
);
$support = $mods = $admin = $sysop = array();
$htmlout = $firstline = $support = '';
$query = sql_query("SELECT u.id, u.perms, u.username, u.support, u.supportfor, u.email, u.last_access, u.class, u.title, u.country, u.status, countries.flagpic, countries.name FROM users AS u LEFT  JOIN countries ON countries.id = u.country WHERE u.class >= " . UC_STAFF . " OR u.support='yes' AND u.status='confirmed' ORDER BY username") or sqlerr(__FILE__, __LINE__);
unset($support);
while ($arr2 = mysqli_fetch_assoc($query)) {
    if ($arr2["support"] == 'yes') $support[] = $arr2;
    if ($arr2["class"] == UC_MODERATOR) $mods[] = $arr2;
    if ($arr2["class"] == UC_ADMINISTRATOR) $admin[] = $arr2;
    if ($arr2["class"] == UC_SYSOP) $sysop[] = $arr2;
}
function DoStaff($staff, $staffclass, $cols = 2)
{
    global $INSTALLER09;
    $htmlout = '';
    $dt = TIME_NOW - 180;
    $counter = count($staff);
    $rows = ceil($counter / $cols);
    $cols = ($counter < $cols) ? $counter : $cols;
    $r = 0;
    $htmlout.= "<div class='global_text'><div class='headline'>{$staffclass}</div><table width='97%' border='0' cellpadding='3'>";
    for ($ia = 0; $ia < $rows; $ia++) {
        $htmlout.= "<tr>";
        for ($i = 0; $i < $cols; $i++) {
            if (isset($staff[$r])) {
                $htmlout.= "<td class='staff_username'><a href='userdetails.php?id=" . (int)$staff[$r]['id'] . "'><font color='#" . get_user_class_color($staff[$r]['class']) . "'><b>" . htmlsafechars($staff[$r]['username']) . "</b></font></a></td>" . "
            <td class='staff_online'><img style='vertical-align: middle;' src='images/staff" . ($staff[$r]['last_access'] > $dt && $staff[$r]['perms'] < bt_options::PERMS_STEALTH ? "/online.png" : "/offline.png") . "' border='0' height='16' alt='' /></td>" . "
            <td class='staff_online'><a href='pm_system.php?action=send_message&amp;receiver=" . (int)$staff[$r]['id'] . "&amp;returnto=" . urlencode($_SERVER['REQUEST_URI']) . "'><img style='vertical-align: middle;' src='{$INSTALLER09['pic_base_url']}mailicon.png' border='0' title=\"Personal Message\" alt='' /></a></td>" . "
            <td class='staff_online'><img style='vertical-align: middle;' height='16' src='{$INSTALLER09['pic_base_url']}flag/" . htmlsafechars($staff[$r]['flagpic']) . "' border='0' alt='" . htmlsafechars($staff[$r]['name']) . "' /></td>";
                $r++;
            } else {
                $htmlout.= "<td>&nbsp;</td>";
            }
        }
        $htmlout.= "</tr>";
    }
    $htmlout.= "</table></div>";
    return $htmlout;
}
$htmlout.= DoStaff($sysop, "Sysops");
$htmlout.= isset($admin) ? DoStaff($admin, "Administrator") : DoStaff($admin = false, "Administrator");
$htmlout.= isset($mods) ? DoStaff($mods, "Moderators") : DoStaff($mods = false, "Moderators");
$dt = TIME_NOW - 180;
if (!empty($support)) {
    foreach ($support as $a) {
        $firstline.= "<tr><td class='staff_username'><a href='userdetails.php?id=" . (int)$a['id'] . "'><font color='#" . get_user_class_color($a['class']) . "'><b>" . htmlsafechars($a['username']) . "</b></font></a></td>
        <td class='staff_online'><img style='vertical-align: middle;' src='{$INSTALLER09['pic_base_url']}" . ($a['last_access'] > $dt ? "online.png" : "offline.png") . "' border='0' alt='' /></td>" . "<td class='staff_online'><a href='pm_system.php?action=send_message&amp;receiver=" . (int)$a['id'] . "'>" . "<img style='vertical-align: middle;' src='{$INSTALLER09['pic_base_url']}mailicon.png' border='0' title=\"{$lang['alt_pm']}\" alt='' /></a></td>" . "<td class='staff_online'><img style='vertical-align: middle;' src='{$INSTALLER09['pic_base_url']}flag/" . htmlsafechars($a['flagpic']) . "' border='0' alt='" . htmlsafechars($a['name']) . "' /></td>" . "<td class='staff_online'>" . htmlsafechars($a['supportfor']) . "</td></tr>";
    }
    $htmlout.= "
        <div class='global_text'><div class='headline'>{$lang['header_fls']}</div><table width='97%' border='0' cellpadding='3'>
        <tr>
        <td class='staff_username' colspan='2'>{$lang['text_first']}<br /><br /></td>
        </tr>
        <tr>
        <td class='staff_username' align='left'><b>{$lang['first_name']}&nbsp;</b></td>
        <td class='staff_online'><b>{$lang['first_active']}&nbsp;&nbsp;&nbsp;</b></td>
        <td class='staff_online'><b>{$lang['first_contact']}&nbsp;&nbsp;&nbsp;&nbsp;</b></td>
        <td class='staff_online'><b>{$lang['first_lang']}</b></td>
        <td class='staff_online'><b>{$lang['first_supportfor']}</b></td>
        </tr>" . $firstline . "";
    $htmlout.= "</table></div>";
}
echo stdhead('Staff', true, $stdhead) . $htmlout . stdfoot();
?>
