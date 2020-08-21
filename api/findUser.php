<?php
require_once('../main/db.php');
header('Content-Type: application/json');

$email = $_GET['email'];

$sql = "SELECT * FROM users WHERE email = '$email'";
$result = $conn->query($sql);
if (!empty($result) && $result->num_rows > 0) {
    echo "false";
} else {
    echo 'true';
}
$conn->close();
