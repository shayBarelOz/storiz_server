#!/usr/bin/php
<?php print "Well, here we are...  Now what?\n";

 $name       = 'aaa';
 $from       = 'bbb';
 $subject    = 'ccc';
 $message    = 'ddd';
 $to   		= 'local.storiz@gmail.com';

	$headers = "From: $from \r\n";
	$headers .= "Reply-To: $from \r\n";
	$headers .= "Return-Path: $from\r\n";
	$headers .= "X-Mailer: PHP \r\n";



mail($to, $subject, $message, $headers);


 ?>