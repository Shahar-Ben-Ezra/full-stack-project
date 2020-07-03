<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$id = $_GET['id'];
$email = $_GET['email'];
$sql = "SELECT * FROM productlist WHERE  email = '$email' && NOT listId='$id'";
$result = $conn->query($sql);
$productlist = array();
while ($row = $result->fetch_assoc()) {
  $productlist[] = $row['Productname'];
}

echo json_encode($productlist);

$conn->close();
