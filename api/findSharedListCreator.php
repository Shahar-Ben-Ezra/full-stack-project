<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$email = $_GET['email'];
$listId = $_GET['listId'];
$sql = "SELECT * FROM FamilyLists WHERE idCreator= '$email' AND listId='$listId' AND NOT  idUsers ='$email'";
$result = $conn->query($sql);
$shareUsers = array();
while ($row = $result->fetch_assoc()) {
    $shareUsers[] = $row;
}
echo json_encode($shareUsers);
$conn->close();
