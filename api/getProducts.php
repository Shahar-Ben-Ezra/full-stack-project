<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$id = $_POST['id'];
$sql = "SELECT * FROM productlist WHERE listId=$id";
$result = $conn->query($sql);
$productlist = array();
while ($row = $result->fetch_assoc()) {
  $productlist[] = $row;
}

echo json_encode($productlist);

$conn->close();
