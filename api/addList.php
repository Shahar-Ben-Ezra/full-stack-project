<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$newList = $_POST['newList'];
$userEmail = $_POST['userEmail'];
$sql = "INSERT INTO `lists`(`listName`,`email`)
VALUES ('$newList','$userEmail')";
if ($conn->query($sql) === TRUE) {
    echo json_encode($conn->insert_id);
} else {
    echo "didnt  created ";
}
$conn->close();
