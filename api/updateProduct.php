<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$id = $_POST['id'];
$status = $_POST['statusProduct'];


$sql = "UPDATE `productlist` 
SET `statusProduct`='$status'  
WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode('success');
} else {
    echo json_encode($conn->error);
}

$conn->close();
