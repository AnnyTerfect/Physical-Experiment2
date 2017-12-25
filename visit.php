<?php
header("Access-Control-Allow-origin:*");
session_start();
$filepath = 'count.txt';
if ($_SESSION['temp'] == '')
{
if (!file_exists($filepath))
{
$fp = fopen($filepath,'w');
fwrite($fp,0);
fclose($fp);
counter($filepath);
}else
{
counter($filepath);
}
$_SESSION['temp'] = 1;
}
echo file_get_contents($filepath);
function counter($f_value)
{
$fp = fopen($f_value,'r') or die('打开文件时出错。');
$countNum = fgets($fp,1024);
fclose($fp);
$countNum=$countNum+1;
$fpw = fopen($f_value,'w');
fwrite($fpw,$countNum);
fclose($fpw);
}
?>
