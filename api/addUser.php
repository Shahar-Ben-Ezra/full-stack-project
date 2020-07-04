<?php
require_once('../main/db.php');
header('Content-Type: application/json');


$confirmPassword = $_POST['confirmPassword'];
$email = $_POST['email'];
$nickname = $_POST['nickname'];
$phone = $_POST['phone'];

$sql = "INSERT INTO `users`(`email`, `nickName`, `Phone`, `password`) 
VALUES ('$email','$nickname','$phone','$confirmPassword')";

if ($conn->query($sql) === TRUE) {
    echo json_encode($conn->insert_id);
} else {
    echo "didnt  created ";
}
$conn->close();
