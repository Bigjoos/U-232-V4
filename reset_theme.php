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
 //Theme Reset
require_once(dirname(__FILE__) . DIRECTORY_SEPARATOR . 'include' . DIRECTORY_SEPARATOR . 'bittorrent.php');
dbconn();
loggedinorreturn();
$lang = array_merge(load_language('global'));
global $mc1, $INSTALLER09;
$sid = 1;
if ($sid > 0 && $sid != $CURUSER['id'])
    sql_query('UPDATE users SET stylesheet=' . sqlesc($sid) . ' WHERE id = ' . sqlesc($CURUSER['id'])) or sqlerr(__FILE__, __LINE__);
$mc1->begin_transaction('MyUser_' . $CURUSER['id']);
$mc1->update_row(false, array(
    'stylesheet' => $sid
));
$mc1->commit_transaction($INSTALLER09['expires']['curuser']);
$mc1->begin_transaction('user' . $CURUSER['id']);
$mc1->update_row(false, array(
    'stylesheet' => $sid
));
$mc1->commit_transaction($INSTALLER09['expires']['user_cache']);
header("Location: {$INSTALLER09['baseurl']}/index.php");
?>