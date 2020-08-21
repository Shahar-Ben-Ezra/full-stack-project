<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$listName = $_GET['newList'];
$email = $_GET['userEmail'];

$sql = "SELECT * FROM lists WHERE listName = '$listName' && email = '$email'";
$result = $conn->query($sql);
if (!empty($result) && $result->num_rows > 0) {
    echo "false";
} else {
    // calling also to family list db
    $sql = "SELECT * FROM FamilyLists WHERE listName = '$listName' && idUsers = '$email'";
    $result = $conn->query($sql);
    if (!empty($result) && $result->num_rows > 0) {
        echo "false";
    } else {
        echo 'true';
    }
}
$conn->close();
