<?php
require_once('../main/db.php');
header('Content-Type: application/json');

$id = $_GET['SelectedListId'];
$productname = $_GET['productname'];
$sql = "SELECT * FROM productlist WHERE listId = '$id' && Productname = '$productname'";
$result = $conn->query($sql);

if (!empty($result) && $result->num_rows > 0) {
    echo 'true';
} else {
    echo 'false';
}
$conn->close();
