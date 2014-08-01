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
if (empty($_GET['wantusername'])) {
    die('Silly Rabbit - Twix are for kids - You cant post nothing please enter a username !');
}
sleep(1);
require_once (dirname(__FILE__) . DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR . 'bittorrent.php');
dbconn();
$HTMLOUT = "";
$lang = array_merge(load_language('global') , load_language('takesignup'));
function validusername($username)
{
    global $lang;
    if ($username == "") return false;
    $namelength = strlen($username);
    if (($namelength < 3) OR ($namelength > 32)) {
        $HTMLOUT = "";
        $HTMLOUT.= "<font color='#cc0000'>{$lang['takesignup_username_length']}</font>";
        echo $HTMLOUT;
        exit();
    }
    // The following characters are allowed in user names
    $allowedchars = $lang['takesignup_allowed_chars'];
    for ($i = 0; $i < $namelength; ++$i) {
        if (strpos($allowedchars, $username[$i]) === false) return false;
    }
    return true;
}
if (!validusername($_GET["wantusername"])) {
    $HTMLOUT.= "<font color='#cc0000'>{$lang['takesignup_allowed_chars']}</font>";
    echo $HTMLOUT;
    exit();
}
if (strlen($_GET["wantusername"]) > 12) {
    $HTMLOUT.= "<font color='#cc0000'>{$lang['takesignup_username_length']}</font>";
    echo $HTMLOUT;
    exit();
}
$checkname = sqlesc($_GET["wantusername"]);
$sql = "SELECT username FROM users WHERE username = $checkname";
$result = sql_query($sql);
$numbers = mysqli_num_rows($result);
if ($numbers > 0) {
    while ($namecheck = mysqli_fetch_assoc($result)) {
        $HTMLOUT.= "<font color='#cc0000'><img src='{$INSTALLER09['pic_base_url']}cross.png' alt='Cross' title='Username  Not Available' align='absmiddle' /><b>Sorry... Username - " . htmlsafechars($namecheck["username"]) . " is already in use.</b></font>";
    }
} else {
    $HTMLOUT.= "<font color='#33cc33'><img src='{$INSTALLER09['pic_base_url']}tick.png' alt='Tick' title='Username Available' align='absmiddle' /><b>Username Available</b></font>";
}
echo $HTMLOUT;
exit();
?>
