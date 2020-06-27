<?php
 require_once('db.php');
 var_dump($_GET);

$confirmPassword=$_GET['confirmPassword'];
$email=$_GET['email'];
$nickname=$_GET['nickname'];
$phone=$_GET['phone'];

$sql="INSERT INTO `users`(`email`, `nickName`, `Phone`, `password`) 
VALUES ('$email','$nickname','$phone','$confirmPassword')";

if ($conn->query($sql) === TRUE) {
    echo "customer created ";
    header("Location: index.php");
}
else{
    echo "didnt  created ";

}

$conn->close();