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
/*
  captcha.php
  jQuery Fancy Captcha
  www.webdesignbeach.com
  
  Created by Web Design Beach.
  Copyright 2009 Web Design Beach. All rights reserved.
*/
session_start(); /* starts session to save generated random number */
/* this compare captcha's number from POST and SESSION */
if ($_SERVER['REQUEST_METHOD'] == "POST" && isset($_POST['captcha']) && $_POST['captcha'] == $_SESSION['captcha']) {
    echo "Passed!"; /* YOUR CODE GOES HERE */
    unset($_SESSION['captcha']); /* this line makes session free, we recommend you to keep it */
} elseif ($_SERVER['REQUEST_METHOD'] == "POST" && !isset($_POST['captcha'])) {
    echo "Failed!";
}
/* in case that form isn't submitted this file will create a random number and save it in session */
else {
    $rand = rand(0, 4);
    $_SESSION['captcha'] = $rand;
    echo $rand;
}
?>



