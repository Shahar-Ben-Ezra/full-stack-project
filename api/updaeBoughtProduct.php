<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$id = $_POST['id'];
$Productname = $_POST['productname'];
$email = $_POST['email'];
$sql = "SELECT * FROM boughtproducts WHERE email='$email' && Productname='$Productname' ORDER BY boughtproducts.Productname ASC";
$result = $conn->query($sql);
if (empty($result)) {
    $sql = "UPDATE `boughtproducts` 
    SET `Productname`='$Productname'  
    WHERE id='$id'";

    if ($conn->query($sql) === TRUE) {
        echo json_encode('success');
    } else {
        echo json_encode($conn->error);
    }
} else {
    echo 'false';
}
$conn->close();
