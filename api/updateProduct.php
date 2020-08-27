<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$id = $_POST['id'];
$status = $_POST['statusProduct'];
$Productname = $_POST['productname'];
$email = $_POST['email'];

if ($status === 'bought') {
    $sql = "SELECT * FROM boughtproducts WHERE email = '$email' && Productname = '$Productname'";
    $result = $conn->query($sql);
    if (!(!empty($result) && $result->num_rows > 0)) {
        $sql = "INSERT INTO `boughtproducts`(`email`,`Productname`)
    VALUES ('$email','$Productname')";
        $conn->query($sql);
    }
}

$sql = "UPDATE `productlist` 
SET `statusProduct`='$status'  
WHERE id='$id'";

if ($conn->query($sql) === TRUE) {
    echo json_encode('success');
} else {
    echo json_encode($conn->error);
}
$conn->close();
