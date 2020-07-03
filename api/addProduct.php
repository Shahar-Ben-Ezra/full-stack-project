<?php
require_once('../main/db.php');
header('Content-Type: application/json');

$Productname = $_POST['productname'];
$amount = $_POST['amount'];
$email= $_POST['email'];
$SelectedListId = $_POST['SelectedListId'];
$sql = "INSERT INTO `productlist`(`Productname`,`amount`,`statusProduct`,`email`,`listId`)
VALUES ('$Productname','$amount','Need to buy','$email','$SelectedListId')";

if ($conn->query($sql) === TRUE) {
    echo json_encode($conn->insert_id);
} else {
    echo "didnt created ";
}
$conn->close();
