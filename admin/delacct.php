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
if (!defined('IN_INSTALLER09_ADMIN')) {
    $HTMLOUT = '';
    $HTMLOUT.= "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\"
		\"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\">
		<html xmlns='http://www.w3.org/1999/xhtml'>
		<head>
		<title>Error!</title>
		</head>
		<body>
	<div style='font-size:33px;color:white;background-color:red;text-align:center;'>Incorrect access<br />You cannot access this file directly.</div>
	</body></html>";
    echo $HTMLOUT;
    exit();
}
require_once (INCL_DIR . 'user_functions.php');
require_once (CLASS_DIR . 'class_check.php');
$class = get_access(basename($_SERVER['REQUEST_URI']));
class_check($class);
$lang = array_merge($lang, load_language('ad_delacct'));

//== Account delete function by Laffin
function account_delete($userid)
{
        $secs = 350 * 86400;
        $maxclass = UC_STAFF;
	$references = array(
		"id" => array("users","usersachiev"), // Do Not move this line
		"userid" => array("blackjack","blocks","bookmarks","casino","coins","freeslots","friends","happyhour","happylog","ips","peers","pmboxes","reputation","shoutbox","snatched","uploadapp","user_blocks","ustatus","userhits","usercomments"
			),
                "uid" => array("xbt_files_users","thankyou"),
                "user_id" => array("posts","topics","poll_voters"),
		"friendid" => array(
			"friends"
			),
		);
	$ctr = 1;
	foreach($references as $field => $tablelist)
	{
		foreach($tablelist as $table)
		{
			$tables[] = $tc = "t{$ctr}";
			$joins[] = ($ctr == 1) ? "users as {$tc}":"INNER JOIN {$table} as {$tc} on t0.id={$tc}.{$field}";
			$ctr++;
		}
	}
	return 'DELETE '. implode(', ',$tables) . " FROM " . implode(' ',$joins) . " WHERE t0.id='{$userid}'AND class < '{$maxclass}';";
}
//==
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = trim(htmlsafechars($_POST["username"]));
    $password = trim(htmlsafechars($_POST["password"]));
    if (!$username || !$password) stderr("{$lang['text_error']}", "{$lang['text_please']}");
    $res = sql_query("SELECT * FROM users WHERE username=" . sqlesc($username) . " AND passhash=md5(concat(secret,concat(" . sqlesc($password) . ",secret)))") or sqlerr(__FILE__, __LINE__);
    if (mysqli_num_rows($res) != 1) stderr("{$lang['text_error']}", "{$lang['text_bad']}");
    $arr = mysqli_fetch_assoc($res);
    $userid = (int)$arr['id'];
    //account_delete(sqlesc($userid));
    $res = sql_query("DELETE FROM users WHERE id=" . sqlesc($userid)) or sqlerr(__FILE__, __LINE__);
    $mc1->delete_value('MyUser_' . $userid);
    $mc1->delete_value('user' . $userid);
    if (mysqli_affected_rows($GLOBALS["___mysqli_ston"]) != 1) stderr("{$lang['text_error']}", "{$lang['text_unable']}");
    stderr("{$lang['stderr_success']}", "{$lang['text_success']}");
}
$HTMLOUT = "
    <h1>{$lang['text_delete']}</h1>
    <form method='post' action='staffpanel.php?tool=delacct&amp;action=delacct'>
    <table border='1' cellspacing='0' cellpadding='5'>
      <tr>
        <td class='rowhead'>{$lang['table_username']}</td>
        <td><input size='40' name='username' /></td>
      </tr>
      <tr>
        <td class='rowhead'>{$lang['table_password']}</td>
        <td><input type='password' size='40' name='password' /></td>
      </tr>
      <tr>
        <td colspan='2'><input type='submit' class='btn' value='{$lang['btn_delete']}' /></td>
      </tr>
    </table>
    </form>";
echo stdhead("{$lang['stdhead_delete']}") . $HTMLOUT . stdfoot();
?>
