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
function docleanup($data)
{
    global $INSTALLER09, $queries;
    set_time_limit(0);
    ignore_user_abort(1);
    //== 09 Stats
    $XBT_Seeder = mysqli_fetch_assoc(sql_query("SELECT sum(seeders) AS seeders FROM torrents")) or sqlerr(__FILE__, __LINE__);
    $XBT_Leecher = mysqli_fetch_assoc(sql_query("SELECT sum(leechers) AS leechers FROM torrents")) or sqlerr(__FILE__, __LINE__);
    $registered = get_row_count('users');
    $unverified = get_row_count('users', "WHERE status='pending'");
    $torrents = get_row_count('torrents');
    $seeders = (XBT_TRACKER == true ? $XBT_Seeder : get_row_count('peers', "WHERE seeder='yes'"));
    $leechers = (XBT_TRACKER == true ? $XBT_Leecher : get_row_count('peers', "WHERE seeder='no'"));
    $torrentstoday = get_row_count('torrents', 'WHERE added > ' . TIME_NOW . ' - 86400');
    $donors = get_row_count('users', "WHERE donor ='yes'");
    $unconnectables = (XBT_TRACKER == true ? '0' : get_row_count("peers", " WHERE connectable='no'"));
    $forumposts = get_row_count("posts");
    $forumtopics = get_row_count("topics");
    $dt = TIME_NOW - 300; // Active users last 5 minutes
    $numactive = get_row_count("users", "WHERE last_access >= $dt");
    $torrentsmonth = get_row_count('torrents', 'WHERE added > ' . TIME_NOW . ' - 2592000');
    $gender_na = get_row_count('users', "WHERE gender='NA'");
    $gender_male = get_row_count('users', "WHERE gender='Male'");
    $gender_female = get_row_count('users', "WHERE gender='Female'");
    $powerusers = get_row_count('users', "WHERE class='1'");
    $disabled = get_row_count('users', "WHERE enabled='no'");
    $uploaders = get_row_count('users', "WHERE class='3'");
    $moderators = get_row_count('users', "WHERE class='4'");
    $administrators = get_row_count('users', "WHERE class='5'");
    $sysops = get_row_count('users', "WHERE class='6'");
    $seeders = (int)$XBT_Seeder['seeders'];
    $leechers = (int)$XBT_Leecher['leechers'];
    sql_query("UPDATE stats SET regusers = '$registered', unconusers = '$unverified', torrents = '$torrents', seeders = '$seeders', leechers = '$leechers', unconnectables = '$unconnectables', torrentstoday = '$torrentstoday', donors = '$donors', forumposts = '$forumposts', forumtopics = '$forumtopics', numactive = '$numactive', torrentsmonth = '$torrentsmonth', gender_na = '$gender_na', gender_male = '$gender_male', gender_female = '$gender_female', powerusers = '$powerusers', disabled = '$disabled', uploaders = '$uploaders', moderators = '$moderators', administrators = '$administrators', sysops = '$sysops' WHERE id = '1' LIMIT 1");
    if ($queries > 0) write_log("Stats clean-------------------- Stats cleanup Complete using $queries queries --------------------");
    if (false !== mysqli_affected_rows($GLOBALS["___mysqli_ston"])) {
        $data['clean_desc'] = mysqli_affected_rows($GLOBALS["___mysqli_ston"]) . " items updated";
    }
    if ($data['clean_log']) {
        cleanup_log($data);
    }
}
function cleanup_log($data)
{
    $text = sqlesc($data['clean_title']);
    $added = TIME_NOW;
    $ip = sqlesc($_SERVER['REMOTE_ADDR']);
    $desc = sqlesc($data['clean_desc']);
    sql_query("INSERT INTO cleanup_log (clog_event, clog_time, clog_ip, clog_desc) VALUES ($text, $added, $ip, {$desc})") or sqlerr(__FILE__, __LINE__);
}
?>
