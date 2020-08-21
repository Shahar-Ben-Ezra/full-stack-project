<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$listId = $_GET['SelectedListId'];

$sql = "SELECT * FROM FamilyLists WHERE listId = '$listId'";
$result = $conn->query($sql);
echo json_encode($result->fetch_assoc());

$conn->close();
