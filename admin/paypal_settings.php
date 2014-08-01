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
require_once (CLASS_DIR . 'class_check.php');
$class = get_access(basename($_SERVER['REQUEST_URI']));
class_check($class);
$lang = array_merge($lang, load_language ('ad_paypal_settings'));
//get the config from db
$pconf = sql_query('SELECT * FROM paypal_config') or sqlerr(__FILE__, __LINE__);
while ($ac = mysqli_fetch_assoc($pconf)) 
$paypal_config[$ac['name']] = $ac['value'];
if ($_SERVER['REQUEST_METHOD'] == 'POST') {

    foreach ($paypal_config as $c_name => $c_value) if (isset($_POST[$c_name]) && $_POST[$c_name] != $c_value) $update[] = '(' . sqlesc($c_name) . ',' . sqlesc(is_array($_POST[$c_name]) ? join('|', $_POST[$c_name]) : $_POST[$c_name]) . ')';
    if (sql_query('INSERT INTO paypal_config(name,value) VALUES ' . join(',', $update) . ' ON DUPLICATE KEY update value=values(value)')) {
     $t = '$INSTALLER09';
$iconfigfile = "<" . "?php\n/**\n{$lang['paypal_file_created']}" . date('M d Y H:i:s') . ".\n{$lang['paypal_site']}.\n**/\n";
     $res = sql_query("SELECT * from paypal_config ");
     while ($arr = mysqli_fetch_assoc($res)) {
            $iconfigfile.= "" . $t . "['paypal_config']['$arr[name]'] = $arr[value];\n"; 
    }
    $iconfigfile.= "\n?" . ">";
    $filenum = fopen('./cache/paypal_settings.php', 'w');
    ftruncate($filenum, 0);
    fwrite($filenum, $iconfigfile);
    fclose($filenum);
    stderr($lang['paypal_success'], $lang['paypal_saved']);
    } else stderr($lang['paypal_err'], $lang['paypal_err1']);
    exit;
}

$HTMLOUT.= "<h2><b><i>{$lang['paypal_global_title']}</i></b></h2>
<form action='staffpanel.php?tool=paypal_settings' method='post'>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'>{$lang['paypal_donate']}</td><td class='table' align='left'>{$lang['paypal_yes']}<input class='table' type='radio' name='enable' value='1' " . ($paypal_config['enable'] ? 'checked=\'checked\'' : '') . " />{$lang['paypal_no']}<input class='table' type='radio' name='enable' value='0' " . (!$paypal_config['enable'] ? 'checked=\'checked\'' : '') . " /></td></tr>
<tr><td width='50%' class='table' align='left'>{$lang['paypal_email']}</td><td class='table' align='left'><input type='text' name='email' size='25' value='" . htmlsafechars($paypal_config['email']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'>{$lang['paypal_currency']}</td><td class='table' align='left'><input type='text' name='currency' size='4' value='" . htmlsafechars($paypal_config['currency']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'>{$lang['paypal_user_pm']}</td><td class='table' align='left'><input type='text' name='staff' size='2' value='" . htmlsafechars($paypal_config['staff']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'>{$lang['paypal_sandbox']}</td><td class='table' align='left'><input type='text' name='sandbox' size='9' value='" . htmlsafechars($paypal_config['sandbox']) . "' /></td></tr>
<tr><td colspan='2' class='table' align='center'><input type='submit' value='{$lang['paypal_apply']}' /></td></tr>
</table><br /><br />
<h2><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_title']}</h2>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_amount']}".$paypal_config['currency']."{$lang['paypal_donated']}</td><td class='table' align='left'><input type='text' name='gb_donated_1' size='3' value='" . htmlsafechars($paypal_config['gb_donated_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_vip']}</td><td class='table' align='left'><input type='text' name='vip_dur_1' size='2' value='" . htmlsafechars($paypal_config['vip_dur_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_donor_status']}</td><td class='table' align='left'><input type='text' name='donor_dur_1' size='2' value='" . htmlsafechars($paypal_config['donor_dur_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_freelech']}</td><td class='table' align='left'><input type='text' name='free_dur_1' size='2' value='" . htmlsafechars($paypal_config['free_dur_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_amount_gb']}</td><td class='table' align='left'><input type='text' name='up_amt_1' size='4' value='" . htmlsafechars($paypal_config['up_amt_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_amount_karma']}</td><td class='table' align='left'><input type='text' name='kp_amt_1' size='4' value='" . htmlsafechars($paypal_config['kp_amt_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_donor_until']}</td><td class='table' align='left'><input type='text' name='duntil_dur_1' size='2' value='" . htmlsafechars($paypal_config['duntil_dur_1']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_one']}</i></b>{$lang['paypal_immunity']}</td><td class='table' align='left'><input type='text' name='imm_dur_1' size='2' value='" . htmlsafechars($paypal_config['imm_dur_1']) . "' /></td></tr>
</table><br />
<h2><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_title']}</h2>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_amount']}".$paypal_config['currency']."{$lang['paypal_donated']}</td><td class='table' align='left'><input type='text' name='gb_donated_2' size='3' value='" . htmlsafechars($paypal_config['gb_donated_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_vip']}</td><td class='table' align='left'><input type='text' name='vip_dur_2' size='2' value='" . htmlsafechars($paypal_config['vip_dur_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_donor_status']}</td><td class='table' align='left'><input type='text' name='donor_dur_2' size='2' value='" . htmlsafechars($paypal_config['donor_dur_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_freelech']}</td><td class='table' align='left'><input type='text' name='free_dur_2' size='2' value='" . htmlsafechars($paypal_config['free_dur_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_amount_gb']}</td><td class='table' align='left'><input type='text' name='up_amt_2' size='4' value='" . htmlsafechars($paypal_config['up_amt_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_amount_karma']}</td><td class='table' align='left'><input type='text' name='kp_amt_2' size='4' value='" . htmlsafechars($paypal_config['kp_amt_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_donor_until']}</td><td class='table' align='left'><input type='text' name='duntil_dur_2' size='2' value='" . htmlsafechars($paypal_config['duntil_dur_2']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_two']}</i></b>{$lang['paypal_immunity']}</td><td class='table' align='left'><input type='text' name='imm_dur_2' size='2' value='" . htmlsafechars($paypal_config['imm_dur_2']) . "' /></td></tr></table><br />
<h2><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_title']}</h2>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_amount']}".$paypal_config['currency']."{$lang['paypal_donated']}</td><td class='table' align='left'><input type='text' name='gb_donated_3' size='3' value='" . htmlsafechars($paypal_config['gb_donated_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_vip']}</td><td class='table' align='left'><input type='text' name='vip_dur_3' size='2' value='" . htmlsafechars($paypal_config['vip_dur_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_donor_status']}</td><td class='table' align='left'><input type='text' name='donor_dur_3' size='2' value='" . htmlsafechars($paypal_config['donor_dur_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_freelech']}</td><td class='table' align='left'><input type='text' name='free_dur_3' size='2' value='" . htmlsafechars($paypal_config['free_dur_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_amount_gb']}</td><td class='table' align='left'><input type='text' name='up_amt_3' size='4' value='" . htmlsafechars($paypal_config['up_amt_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_amount_karma']}</td><td class='table' align='left'><input type='text' name='kp_amt_3' size='4' value='" . htmlsafechars($paypal_config['kp_amt_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_donor_until']}</td><td class='table' align='left'><input type='text' name='duntil_dur_3' size='2' value='" . htmlsafechars($paypal_config['duntil_dur_3']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_three']}</i></b>{$lang['paypal_immunity']}</td><td class='table' align='left'><input type='text' name='imm_dur_3' size='2' value='" . htmlsafechars($paypal_config['imm_dur_3']) . "' /></td></tr>
</table><br />
<h2><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_title']}</h2>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_amount']}".$paypal_config['currency']."{$lang['paypal_donated']}</td><td class='table' align='left'><input type='text' name='gb_donated_4' size='3' value='" . htmlsafechars($paypal_config['gb_donated_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_vip']}</td><td class='table' align='left'><input type='text' name='vip_dur_4' size='2' value='" . htmlsafechars($paypal_config['vip_dur_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_donor_status']}</td><td class='table' align='left'><input type='text' name='donor_dur_4' size='2' value='" . htmlsafechars($paypal_config['donor_dur_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_freelech']}</td><td class='table' align='left'><input type='text' name='free_dur_4' size='2' value='" . htmlsafechars($paypal_config['free_dur_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_amount_gb']}</td><td class='table' align='left'><input type='text' name='up_amt_4' size='4' value='" . htmlsafechars($paypal_config['up_amt_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_amount_karma']}</td><td class='table' align='left'><input type='text' name='kp_amt_4' size='4' value='" . htmlsafechars($paypal_config['kp_amt_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_donor_until']}</td><td class='table' align='left'><input type='text' name='duntil_dur_4' size='2' value='" . htmlsafechars($paypal_config['duntil_dur_4']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_four']}</i></b>{$lang['paypal_immunity']}</td><td class='table' align='left'><input type='text' name='imm_dur_4' size='2' value='" . htmlsafechars($paypal_config['imm_dur_4']) . "' /></td></tr>
</table><br />
<h2><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_title']}</h2>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_amount']}".$paypal_config['currency']."{$lang['paypal_donated']}</td><td class='table' align='left'><input type='text' name='gb_donated_5' size='3' value='" . htmlsafechars($paypal_config['gb_donated_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_vip']}</td><td class='table' align='left'><input type='text' name='vip_dur_5' size='2' value='" . htmlsafechars($paypal_config['vip_dur_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_donor_status']}</td><td class='table' align='left'><input type='text' name='donor_dur_5' size='2' value='" . htmlsafechars($paypal_config['donor_dur_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_freelech']}</td><td class='table' align='left'><input type='text' name='free_dur_5' size='2' value='" . htmlsafechars($paypal_config['free_dur_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_amount_gb']}</td><td class='table' align='left'><input type='text' name='up_amt_5' size='4' value='" . htmlsafechars($paypal_config['up_amt_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_amount_karma']}</td><td class='table' align='left'><input type='text' name='kp_amt_5' size='4' value='" . htmlsafechars($paypal_config['kp_amt_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_donor_until']}</td><td class='table' align='left'><input type='text' name='duntil_dur_5' size='2' value='" . htmlsafechars($paypal_config['duntil_dur_5']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_five']}</i></b>{$lang['paypal_immunity']}</td><td class='table' align='left'><input type='text' name='imm_dur_5' size='2' value='" . htmlsafechars($paypal_config['imm_dur_5']) . "' /></td></tr>
</table><br />
<h2><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_title']}</h2>
<table width='100%' border='1' cellpadding='5' cellspacing='0' >
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_amount']}".$paypal_config['currency']."{$lang['paypal_donated']}</td><td class='table' align='left'><input type='text' name='gb_donated_6' size='3' value='" . htmlsafechars($paypal_config['gb_donated_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_vip']}</td><td class='table' align='left'><input type='text' name='vip_dur_6' size='2' value='" . htmlsafechars($paypal_config['vip_dur_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_donor_status']}</td><td class='table' align='left'><input type='text' name='donor_dur_6' size='2' value='" . htmlsafechars($paypal_config['donor_dur_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_freelech']}</td><td class='table' align='left'><input type='text' name='free_dur_6' size='2' value='" . htmlsafechars($paypal_config['free_dur_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_amount_gb']}</td><td class='table' align='left'><input type='text' name='up_amt_6' size='4' value='" . htmlsafechars($paypal_config['up_amt_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_amount_karma']}</td><td class='table' align='left'><input type='text' name='kp_amt_6' size='4' value='" . htmlsafechars($paypal_config['kp_amt_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_donor_until']}</td><td class='table' align='left'><input type='text' name='duntil_dur_6' size='2' value='" . htmlsafechars($paypal_config['duntil_dur_6']) . "' /></td></tr>
<tr><td width='50%' class='table' align='left'><b><i>{$lang['paypal_array_six']}</i></b>{$lang['paypal_immunity']}</td><td class='table' align='left'><input type='text' name='imm_dur_6' size='2' value='" . htmlsafechars($paypal_config['imm_dur_6']) . "' /></td></tr>
<tr><td colspan='2' class='table' align='center'><input type='submit' value='{$lang['paypal_apply']}'' /></td></tr>
</table>
</form>";
echo stdhead($lang['paypal_stdhead']) . $HTMLOUT . stdfoot();
?>
