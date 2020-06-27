<?php
unset($_COOKIE['email']);
setcookie("email", "email", time() - 1);
// remove all session variables
session_start();
$_SESSION= array();
session_destroy();
 header("Location: index.php");
exit();
