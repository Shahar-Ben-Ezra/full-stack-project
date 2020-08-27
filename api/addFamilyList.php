<?php
require_once('../main/db.php');
header('Content-Type: application/json');

$listId = $_POST['listId'];
$userEmail = $_POST['userEmail'];
$listName = $_POST['listName'];

$sql = "INSERT INTO `FamilyLists`(`listId`,`idCreator`,`idUsers`,`listName`)VALUES ('$listId','$userEmail','$userEmail','$listName')";

if ($conn->query($sql) === TRUE) {
    echo json_encode($conn->insert_id);
} else {
    echo "didnt  created ";
}
$conn->close();
