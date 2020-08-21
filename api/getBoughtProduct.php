<?php
require_once('../main/db.php');
header('Content-Type: application/json');

$email = $_GET['email'];
$sql = "SELECT * FROM boughtproducts WHERE email='$email' ORDER BY boughtproducts.Productname ASC";
$result = $conn->query($sql);
$boughtproducts = array();

while ($row = $result->fetch_assoc()) {
  $boughtproducts[] = $row;
}
echo json_encode($boughtproducts);
$conn->close();
